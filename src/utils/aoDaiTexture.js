import * as THREE from 'three';

/**
 * Tạo bộ texture PBR (Color, Tangent-Space Normal Map, Roughness) 1024x1024
 * mô phỏng sợi dệt lụa tơ tằm, gấm nổi, nhung mịn và nếp nhăn vải tự nhiên.
 */
export function createAoDaiTextures({ baseHex, fabricId, motifId, monogram }) {
  const size = 1024;
  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = size;
  colorCanvas.height = size;
  const ctx = colorCanvas.getContext('2d');

  // Heightfield canvas used to compute a true RGB tangent-space normal map
  const heightCanvas = document.createElement('canvas');
  heightCanvas.width = size;
  heightCanvas.height = size;
  const hCtx = heightCanvas.getContext('2d');

  const roughCanvas = document.createElement('canvas');
  roughCanvas.width = size;
  roughCanvas.height = size;
  const rCtx = roughCanvas.getContext('2d');

  // 1. Base color & roughness
  ctx.fillStyle = baseHex;
  ctx.fillRect(0, 0, size, size);

  hCtx.fillStyle = '#808080';
  hCtx.fillRect(0, 0, size, size);

  const baseRough =
    fabricId === 'velvet' ? '#D8D8D8' : fabricId === 'brocade' ? '#929292' : '#5E5E5E';
  rCtx.fillStyle = baseRough;
  rCtx.fillRect(0, 0, size, size);

  const baseColor = new THREE.Color(baseHex);
  const lum = 0.299 * baseColor.r + 0.587 * baseColor.g + 0.114 * baseColor.b;
  const isDark = lum < 0.44;

  const motifStroke = isDark ? 'rgba(244, 228, 194, 0.84)' : 'rgba(138, 98, 64, 0.74)';
  const motifFill = isDark ? 'rgba(232, 206, 152, 0.36)' : 'rgba(181, 141, 103, 0.28)';
  const goldAccent = isDark ? 'rgba(242, 212, 142, 0.95)' : 'rgba(168, 118, 52, 0.92)';
  const petalTint = isDark ? 'rgba(252, 238, 224, 0.58)' : 'rgba(196, 128, 116, 0.40)';

  // 2. Fine silk diagonal twill weave + organic vertical drape wrinkles
  const weaveStep = fabricId === 'brocade' ? 5 : 3;
  hCtx.strokeStyle = 'rgba(255,255,255,0.12)';
  hCtx.lineWidth = 1;
  ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.028)' : 'rgba(48,43,40,0.022)';
  ctx.lineWidth = 1;

  for (let y = 0; y < size; y += weaveStep) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y);
    ctx.stroke();

    hCtx.beginPath();
    hCtx.moveTo(0, y);
    hCtx.lineTo(size, y);
    hCtx.stroke();
  }

  // Soft vertical cloth tension folds in heightmap for realistic light catching
  for (let i = 0; i < 14; i++) {
    const x = (i / 14) * size + (i % 2 === 0 ? 18 : -12);
    const grad = hCtx.createLinearGradient(x - 28, 0, x + 28, 0);
    grad.addColorStop(0, 'rgba(128,128,128,0)');
    grad.addColorStop(0.5, i % 2 === 0 ? 'rgba(175,175,175,0.28)' : 'rgba(85,85,85,0.25)');
    grad.addColorStop(1, 'rgba(128,128,128,0)');
    hCtx.fillStyle = grad;
    hCtx.fillRect(x - 28, 0, 56, size);
  }

  // Delicate gold hem border
  ctx.strokeStyle = goldAccent;
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(0, size * 0.965);
  ctx.lineTo(size, size * 0.965);
  ctx.stroke();

  rCtx.strokeStyle = '#2A2A2A';
  rCtx.lineWidth = 5;
  rCtx.beginPath();
  rCtx.moveTo(0, size * 0.965);
  rCtx.lineTo(size, size * 0.965);
  rCtx.stroke();

  // 3. Heritage Motifs
  if (motifId === 'damask') {
    const step = 112;
    for (let y = step / 2; y < size; y += step) {
      for (let x = step / 2; x < size; x += step) {
        drawDamaskMedallion(ctx, x, y, 38, motifStroke, motifFill);
        drawDamaskMedallion(hCtx, x, y, 38, 'rgba(245,245,245,0.75)', 'rgba(215,215,215,0.45)');
        drawDamaskMedallion(rCtx, x, y, 38, '#3D3D3D', '#525252');
      }
    }
  } else if (motifId === 'lotus') {
    ctx.strokeStyle = motifStroke;
    ctx.lineWidth = 2.2;
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(size * 0.16, size * (0.87 + i * 0.02));
      ctx.bezierCurveTo(
        size * 0.35,
        size * (0.85 + i * 0.02),
        size * 0.65,
        size * (0.89 + i * 0.02),
        size * 0.84,
        size * (0.87 + i * 0.02)
      );
      ctx.stroke();
    }

    drawLotusCluster(ctx, size * 0.54, size * 0.76, 1.15, motifStroke, goldAccent, petalTint);
    drawLotusCluster(ctx, size * 0.34, size * 0.84, 0.78, motifStroke, goldAccent, petalTint);
    drawCraneSilhouette(ctx, size * 0.44, size * 0.56, 0.95, goldAccent);

    drawLotusCluster(hCtx, size * 0.54, size * 0.76, 1.15, 'rgba(245,245,245,0.8)', 'rgba(255,255,255,0.9)', 'rgba(215,215,215,0.6)');
    drawCraneSilhouette(hCtx, size * 0.44, size * 0.56, 0.95, 'rgba(255,255,255,0.9)');

    drawLotusCluster(rCtx, size * 0.54, size * 0.76, 1.15, '#383838', '#262626', '#464646');
    drawCraneSilhouette(rCtx, size * 0.44, size * 0.56, 0.95, '#242424');
  } else if (motifId === 'apricot') {
    ctx.strokeStyle = motifStroke;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(size * 0.22, size * 0.94);
    ctx.bezierCurveTo(size * 0.38, size * 0.78, size * 0.55, size * 0.68, size * 0.74, size * 0.52);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(size * 0.45, size * 0.74);
    ctx.quadraticCurveTo(size * 0.35, size * 0.62, size * 0.28, size * 0.54);
    ctx.stroke();

    const blossoms = [
      [0.30, 0.56, 20],
      [0.36, 0.64, 24],
      [0.46, 0.73, 30],
      [0.58, 0.66, 26],
      [0.68, 0.57, 22],
      [0.52, 0.82, 32],
      [0.64, 0.79, 22],
      [0.38, 0.86, 25],
    ];
    blossoms.forEach(([rx, ry, r]) => {
      drawApricotBlossom(ctx, size * rx, size * ry, r, goldAccent, petalTint);
      drawApricotBlossom(hCtx, size * rx, size * ry, r, 'rgba(250,250,250,0.85)', 'rgba(220,220,220,0.6)');
      drawApricotBlossom(rCtx, size * rx, size * ry, r, '#282828', '#424242');
    });
  }

  // 4. Custom embroidered monogram near hem
  if (monogram && monogram.trim()) {
    const label = monogram.trim().slice(0, 14);
    ctx.save();
    ctx.font = 'italic 600 34px Alegreya, Georgia, serif';
    ctx.fillStyle = goldAccent;
    ctx.textAlign = 'center';
    ctx.fillText(label, size * 0.5, size * 0.935);
    ctx.restore();
  }

  // Convert heightCanvas into a true RGB Tangent-Space Normal Map
  const normalCanvas = heightToNormalCanvas(heightCanvas, fabricId === 'brocade' ? 2.4 : 1.35);

  const colorTex = new THREE.CanvasTexture(colorCanvas);
  colorTex.colorSpace = THREE.SRGBColorSpace;
  colorTex.anisotropy = 8;

  const normalTex = new THREE.CanvasTexture(normalCanvas);
  normalTex.anisotropy = 4;

  const roughTex = new THREE.CanvasTexture(roughCanvas);
  roughTex.anisotropy = 4;

  return { colorTex, normalTex, roughTex };
}

function heightToNormalCanvas(heightCanvas, strength) {
  const w = heightCanvas.width;
  const h = heightCanvas.height;
  const hData = heightCanvas.getContext('2d').getImageData(0, 0, w, h).data;

  const outCanvas = document.createElement('canvas');
  outCanvas.width = w;
  outCanvas.height = h;
  const outCtx = outCanvas.getContext('2d');
  const outImg = outCtx.createImageData(w, h);
  const dst = outImg.data;

  const sample = (x, y) => {
    const cx = (x + w) % w;
    const cy = Math.max(0, Math.min(h - 1, y));
    return hData[(cy * w + cx) * 4] / 255;
  };

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const dx = (sample(x + 1, y) - sample(x - 1, y)) * strength;
      const dy = (sample(x, y + 1) - sample(x, y - 1)) * strength;
      const nx = -dx;
      const ny = -dy;
      const nz = 1.0;
      const len = Math.hypot(nx, ny, nz) || 1;
      const idx = (y * w + x) * 4;
      dst[idx] = Math.round(((nx / len) * 0.5 + 0.5) * 255);
      dst[idx + 1] = Math.round(((ny / len) * 0.5 + 0.5) * 255);
      dst[idx + 2] = Math.round(((nz / len) * 0.5 + 0.5) * 255);
      dst[idx + 3] = 255;
    }
  }
  outCtx.putImageData(outImg, 0, 0);
  return outCanvas;
}

function drawDamaskMedallion(ctx, cx, cy, r, stroke, fill) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.strokeStyle = stroke;
  ctx.fillStyle = fill;
  ctx.lineWidth = 1.6;
  for (let i = 0; i < 8; i++) {
    ctx.rotate(Math.PI / 4);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(r * 0.45, -r * 0.5, 0, -r);
    ctx.quadraticCurveTo(-r * 0.45, -r * 0.5, 0, 0);
    ctx.fill();
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.16, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawLotusCluster(ctx, cx, cy, scale, stroke, gold, fill) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);

  ctx.strokeStyle = stroke;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, 145);
  ctx.quadraticCurveTo(-18, 52, 0, -10);
  ctx.stroke();

  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.ellipse(-42, 62, 34, 14, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  const angles = [-0.62, -0.32, 0, 0.32, 0.62];
  angles.forEach((ang, idx) => {
    ctx.save();
    ctx.translate(0, -14);
    ctx.rotate(ang);
    ctx.fillStyle = idx === 2 ? gold : fill;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(24, -46, 0, -86);
    ctx.quadraticCurveTo(-24, -46, 0, 0);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  });

  ctx.restore();
}

function drawCraneSilhouette(ctx, cx, cy, scale, gold) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);
  ctx.strokeStyle = gold;
  ctx.fillStyle = gold;
  ctx.lineWidth = 2.4;

  ctx.beginPath();
  ctx.moveTo(-55, -18);
  ctx.quadraticCurveTo(-22, -46, 4, -10);
  ctx.quadraticCurveTo(28, -42, 62, -22);
  ctx.quadraticCurveTo(26, -8, 6, 8);
  ctx.quadraticCurveTo(-18, -4, -55, -18);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(4, -6);
  ctx.quadraticCurveTo(18, 12, 34, 16);
  ctx.stroke();
  ctx.restore();
}

function drawApricotBlossom(ctx, cx, cy, r, stroke, fill) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 2;
  for (let i = 0; i < 5; i++) {
    ctx.rotate((Math.PI * 2) / 5);
    ctx.beginPath();
    ctx.ellipse(0, -r * 0.58, r * 0.34, r * 0.48, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.16, 0, Math.PI * 2);
  ctx.fillStyle = stroke;
  ctx.fill();
  ctx.restore();
}
