import React, { useEffect, useRef, useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

const ORBIT_ORDER = ['full', 'angle', 'back'];

const LIGHTING_FILTERS = {
  studio: 'brightness(1) contrast(1.02) saturate(1)',
  warm: 'brightness(1.02) contrast(1.03) sepia(0.1) saturate(1.06)',
  evening: 'brightness(0.92) contrast(1.08) saturate(1.05)',
};

function resolveStudioImage({ cameraView, motifId, collarId, sleeveId, accessoryId }) {
  if (cameraView === 'angle') return 'studio-angle';
  if (cameraView === 'back') return 'studio-back';
  if (cameraView === 'collar') return 'studio-collar';

  if (motifId === 'lotus') return 'studio-lotus';
  if (motifId === 'apricot') return 'studio-apricot';
  if (collarId === 'boat' || sleeveId === 'threequarter' || accessoryId === 'pendant') {
    return 'studio-boat-34';
  }
  if (collarId === 'round' || accessoryId === 'man' || accessoryId === 'both') {
    return 'studio-round-man';
  }
  return 'studio-front';
}

export function AoDaiViewport3D({
  fabric,
  colorHex,
  collarId,
  sleeveId,
  pantsHex,
  motifId,
  accessoryId,
  lightingId,
  monogram,
  cameraView,
  onChangeView,
}) {
  const canvasRef = useRef(null);
  const assetCacheRef = useRef({});
  const [zoom, setZoom] = useState(1);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const dragStartRef = useRef(null);

  const imageBase = resolveStudioImage({
    cameraView,
    motifId,
    collarId,
    sleeveId,
    accessoryId,
  });

  useEffect(() => {
    let cancelled = false;

    const renderComposited = (asset) => {
      const canvas = canvasRef.current;
      if (!canvas || cancelled) return;

      const { w, h, srcPixels, maskPixels } = asset;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      const ctx = canvas.getContext('2d');
      const out = ctx.createImageData(w, h);
      const dst = out.data;

      const [tr, tg, tb] = hexToRgb(colorHex);
      const [pr, pg, pb] = hexToRgb(pantsHex || colorHex);
      const isWhiteAo = tr > 232 && tg > 225 && tb > 215;
      const isWhitePants = pr > 232 && pg > 225 && pb > 215;

      for (let i = 0; i < w * h; i++) {
        const idx = i * 4;
        const r = srcPixels[idx];
        const g = srcPixels[idx + 1];
        const b = srcPixels[idx + 2];

        const gw = maskPixels[idx] / 255;     // Red channel = Áo dài
        const pw = maskPixels[idx + 1] / 255; // Green channel = Quần lụa
        const fg = Math.min(1, gw + pw);

        if (fg <= 0.01) {
          dst[idx] = r;
          dst[idx + 1] = g;
          dst[idx + 2] = b;
          dst[idx + 3] = 255;
          continue;
        }

        const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        let shade = Math.min(1.06, lum / 0.88);
        let spec = 0;

        if (fabric.id === 'silk') {
          spec = Math.pow(Math.max(0, lum - 0.76) / 0.24, 1.55) * 58;
        } else if (fabric.id === 'velvet') {
          shade = Math.pow(shade, 1.62) * 0.84;
          spec = Math.pow(Math.max(0, 1 - Math.abs(lum - 0.58) * 3.2), 2) * 24;
        } else if (fabric.id === 'brocade' || motifId === 'damask') {
          const x = i % w;
          const y = (i / w) | 0;
          const jacquard =
            Math.sin(x * 0.22) * Math.cos(y * 0.22) * 0.065 +
            Math.sin((x + y) * 0.42) * 0.03;
          shade = shade * (1 + jacquard * (gw / fg));
          spec =
            Math.pow(Math.max(0, lum - 0.78) / 0.22, 1.7) * 38 +
            Math.max(0, jacquard) * 110 * (gw / fg);
        } else if (fabric.id === 'organza') {
          shade = shade * 0.78 + 0.22;
          spec = Math.pow(Math.max(0, lum - 0.72) / 0.28, 1.5) * 52;
        }

        const aoR = isWhiteAo ? r : Math.min(255, tr * shade + spec);
        const aoG = isWhiteAo ? g : Math.min(255, tg * shade + spec);
        const aoB = isWhiteAo ? b : Math.min(255, tb * shade + spec);

        const paR = isWhitePants ? r : Math.min(255, pr * Math.min(1.05, lum / 0.88) + spec * 0.5);
        const paG = isWhitePants ? g : Math.min(255, pg * Math.min(1.05, lum / 0.88) + spec * 0.5);
        const paB = isWhitePants ? b : Math.min(255, pb * Math.min(1.05, lum / 0.88) + spec * 0.5);

        const nr = (aoR * gw + paR * pw) / fg;
        const ng = (aoG * gw + paG * pw) / fg;
        const nb = (aoB * gw + paB * pw) / fg;

        dst[idx] = r * (1 - fg) + nr * fg;
        dst[idx + 1] = g * (1 - fg) + ng * fg;
        dst[idx + 2] = b * (1 - fg) + nb * fg;
        dst[idx + 3] = 255;
      }

      ctx.putImageData(out, 0, 0);

      if (cameraView !== 'collar' && monogram && monogram.trim()) {
        const isDark = (0.299 * tr + 0.587 * tg + 0.114 * tb) / 255 < 0.46;
        ctx.save();
        ctx.font = 'italic 600 14px Alegreya, Georgia, serif';
        ctx.fillStyle = isDark ? 'rgba(246, 224, 174, 0.9)' : 'rgba(149, 89, 48, 0.85)';
        ctx.textAlign = 'center';
        ctx.fillText(monogram.trim().slice(0, 14), w * 0.5, h * 0.815);
        ctx.restore();
      }

      setIsLoading(false);
    };

    const cached = assetCacheRef.current[imageBase];
    if (cached) {
      renderComposited(cached);
      return;
    }

    setIsLoading(true);
    const photo = new Image();
    const mask = new Image();
    photo.crossOrigin = 'anonymous';
    mask.crossOrigin = 'anonymous';

    let loadedCount = 0;
    const onBothLoaded = () => {
      loadedCount++;
      if (loadedCount < 2 || cancelled) return;

      const w = mask.naturalWidth;
      const h = mask.naturalHeight;

      const pCanvas = document.createElement('canvas');
      pCanvas.width = w;
      pCanvas.height = h;
      const pCtx = pCanvas.getContext('2d');
      pCtx.drawImage(photo, 0, 0, w, h);

      const mCanvas = document.createElement('canvas');
      mCanvas.width = w;
      mCanvas.height = h;
      const mCtx = mCanvas.getContext('2d');
      mCtx.drawImage(mask, 0, 0, w, h);

      const asset = {
        w,
        h,
        srcPixels: pCtx.getImageData(0, 0, w, h).data,
        maskPixels: mCtx.getImageData(0, 0, w, h).data,
      };
      assetCacheRef.current[imageBase] = asset;
      renderComposited(asset);
    };

    const onError = () => {
      if (!cancelled) setIsLoading(false);
    };

    photo.onload = onBothLoaded;
    mask.onload = onBothLoaded;
    photo.onerror = onError;
    mask.onerror = onError;
    photo.src = `/images/${imageBase}.jpg`;
    mask.src = `/images/masks/${imageBase}.png`;

    return () => {
      cancelled = true;
    };
  }, [imageBase, cameraView, fabric, colorHex, pantsHex, motifId, monogram]);

  const handlePointerDown = (e) => {
    dragStartRef.current = e.clientX;
  };

  const handlePointerUp = (e) => {
    if (dragStartRef.current === null) return;
    const dx = e.clientX - dragStartRef.current;
    dragStartRef.current = null;
    if (Math.abs(dx) > 48 && onChangeView) {
      const idx = ORBIT_ORDER.indexOf(cameraView);
      const currentIdx = idx === -1 ? 0 : idx;
      const nextIdx =
        dx < 0
          ? (currentIdx + 1) % ORBIT_ORDER.length
          : (currentIdx - 1 + ORBIT_ORDER.length) % ORBIT_ORDER.length;
      onChangeView(ORBIT_ORDER[nextIdx]);
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -ny * 4, ry: nx * 5.5 });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
    dragStartRef.current = null;
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '580px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: lightingId === 'evening' ? '#2B2421' : '#F3ECE4',
        cursor: 'grab',
        userSelect: 'none',
        perspective: '1400px',
        transition: 'background-color 320ms ease',
      }}
      aria-label="Ảnh người mẫu studio mặc áo dài, kéo ngang để xoay góc nhìn"
    >
      <div
        style={{
          transform: `scale(${zoom}) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: 'transform 260ms cubic-bezier(0.22, 1, 0.36, 1)',
          height: '100%',
          maxHeight: '610px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: LIGHTING_FILTERS[lightingId] || LIGHTING_FILTERS.studio,
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            maxHeight: '590px',
            maxWidth: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            opacity: isLoading ? 0.55 : 1,
            transition: 'opacity 220ms ease',
          }}
        />
      </div>

      {/* Live Spec Pill */}
      <div
        style={{
          position: 'absolute',
          top: '60px',
          right: '14px',
          maxWidth: '240px',
          background: 'rgba(248, 245, 242, 0.92)',
          backdropFilter: 'blur(8px)',
          border: '1px solid var(--line)',
          borderRadius: '6px',
          padding: '8px 12px',
          fontSize: '0.75rem',
          lineHeight: 1.45,
          color: 'var(--ink)',
          pointerEvents: 'none',
        }}
      >
        <div style={{ fontWeight: 600, color: 'var(--wine)', marginBottom: '2px' }}>
          Thông số thiết kế đang chọn:
        </div>
        <div>
          {collarId === 'traditional'
            ? 'Cổ tàu 3cm'
            : collarId === 'boat'
            ? 'Cổ thuyền'
            : 'Cổ tròn viền ngọc'}
          {' · '}
          {sleeveId === 'long' ? 'Tay dài' : 'Tay lỡ'}
        </div>
        <div style={{ color: 'var(--ink-muted)' }}>
          {accessoryId === 'none'
            ? 'Không phụ kiện kèm'
            : accessoryId === 'pendant'
            ? 'Ngọc bội tua rua'
            : accessoryId === 'man'
            ? 'Mấn đội đầu đồng bộ'
            : 'Mấn & Ngọc bội'}
        </div>
      </div>

      {/* Zoom Controls */}
      <div
        style={{
          position: 'absolute',
          right: '14px',
          bottom: '56px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          zIndex: 12,
        }}
      >
        <button
          type="button"
          aria-label="Phóng to"
          onClick={() => setZoom((z) => Math.min(1.75, +(z + 0.25).toFixed(2)))}
          className="zoom-btn"
        >
          <ZoomIn size={16} />
        </button>
        <button
          type="button"
          aria-label="Thu nhỏ"
          onClick={() => setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)))}
          className="zoom-btn"
        >
          <ZoomOut size={16} />
        </button>
        {zoom > 1 && (
          <button
            type="button"
            aria-label="Đặt lại thu phóng"
            onClick={() => setZoom(1)}
            className="zoom-btn"
          >
            <RotateCcw size={15} />
          </button>
        )}
      </div>

      <style>{`
        .zoom-btn {
          width: 34px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          border: 1px solid var(--line-strong);
          background: rgba(248, 245, 242, 0.92);
          color: var(--ink);
        }
      `}</style>
    </div>
  );
}

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const num = parseInt(clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}
