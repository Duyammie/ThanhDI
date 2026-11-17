import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Check,
  Copy,
  Sparkles,
  X,
  Ruler,
  Palette,
  Scissors,
  Flower2,
} from 'lucide-react';
import { AoDaiViewport3D } from './AoDaiViewport3D';
import {
  STUDIO_FABRICS,
  STUDIO_COLORS,
  STUDIO_COLLARS,
  STUDIO_SLEEVES,
  STUDIO_PANTS,
  STUDIO_MOTIFS,
  STUDIO_ACCESSORIES,
  STUDIO_LIGHTING,
} from '../data/thanhDiData';

const TABS = [
  { id: 'fabric', label: 'Vải & Màu', icon: Palette },
  { id: 'cut', label: 'Cổ & Tay', icon: Scissors },
  { id: 'motif', label: 'Họa tiết', icon: Flower2 },
  { id: 'sizing', label: 'Số đo', icon: Ruler },
];

const CAMERA_BUTTONS = [
  { id: 'full', label: 'Toàn thân' },
  { id: 'angle', label: 'Góc nghiêng' },
  { id: 'collar', label: 'Cận cổ & khuy' },
  { id: 'back', label: 'Mặt sau' },
];

export function Studio3D({ config, setConfig }) {
  const [activeTab, setActiveTab] = useState('fabric');
  const [cameraView, setCameraView] = useState('full');
  const [orderOpen, setOrderOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const fabric = STUDIO_FABRICS.find((f) => f.id === config.fabricId) || STUDIO_FABRICS[0];
  const color = STUDIO_COLORS.find((c) => c.id === config.colorId) || STUDIO_COLORS[0];
  const collar = STUDIO_COLLARS.find((c) => c.id === config.collarId) || STUDIO_COLLARS[0];
  const sleeve = STUDIO_SLEEVES.find((s) => s.id === config.sleeveId) || STUDIO_SLEEVES[0];
  const pants = STUDIO_PANTS.find((p) => p.id === config.pantsId) || STUDIO_PANTS[0];
  const motif = STUDIO_MOTIFS.find((m) => m.id === config.motifId) || STUDIO_MOTIFS[0];
  const accessory =
    STUDIO_ACCESSORIES.find((a) => a.id === config.accessoryId) || STUDIO_ACCESSORIES[0];

  const basePrice = 1850000;
  const monogramDelta = config.monogram.trim() ? 150000 : 0;
  const totalPrice =
    basePrice +
    fabric.priceDelta +
    collar.priceDelta +
    motif.priceDelta +
    accessory.priceDelta +
    monogramDelta;

  const formatVND = (val) => val.toLocaleString('vi-VN') + 'đ';

  const summaryText = [
    'MẪU ÁO DÀI THIẾT KẾ 3D — THANH DI',
    `- Chất liệu: ${fabric.name}`,
    `- Màu áo: ${color.name}`,
    `- Kiểu cổ: ${collar.name}`,
    `- Kiểu tay: ${sleeve.name}`,
    `- Quần lụa: ${pants.name}`,
    `- Họa tiết: ${motif.name}`,
    accessory.id !== 'none' ? `- Phụ kiện: ${accessory.name}` : null,
    config.monogram.trim() ? `- Thêu tên riêng: "${config.monogram.trim()}"` : null,
    `- Hình thức chọn size: ${
      config.sizeMode === 'custom'
        ? `May đo riêng (Cao ${config.height || '?'}cm, Nặng ${config.weight || '?'}kg, Vòng ${config.bust || '?'}-${config.waist || '?'}-${config.hip || '?'})`
        : `Size chuẩn ${config.standardSize}`
    }`,
    `- Giá dự kiến: ${formatVND(totalPrice)}`,
  ]
    .filter(Boolean)
    .join('\n');

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="xuong-3d" className="section section--cream">
      <div className="container">
        <div style={{ maxWidth: '64ch', marginBottom: '36px' }}>
          <span className="section-kicker">Xưởng thiết kế 3D Thanh Di</span>
          <h2 className="section-title">Tự tay phối chất liệu, sắc màu và phom áo của riêng bạn.</h2>
          <p className="section-lead">
            Xoay 360 độ để ngắm từng nếp lụa, chọn kiểu cổ, tay áo và họa tiết truyền thống trước khi gửi số đo cho thợ may Thanh Di.
          </p>
        </div>

        <div
          className="studio-layout"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.32fr) minmax(0, 0.92fr)',
            gap: '28px',
            alignItems: 'stretch',
          }}
        >
          {/* Left: 3D Interactive Viewport */}
          <div
            style={{
              position: 'relative',
              backgroundColor: '#F3ECE4',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--line-strong)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '560px',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            {/* Top Viewport Toolbar */}
            <div
              style={{
                position: 'absolute',
                top: '14px',
                left: '14px',
                right: '14px',
                zIndex: 10,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                gap: '8px',
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                  pointerEvents: 'auto',
                  backgroundColor: 'rgba(248, 245, 242, 0.88)',
                  backdropFilter: 'blur(8px)',
                  padding: '5px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--line)',
                }}
              >
                {CAMERA_BUTTONS.map((btn) => (
                  <button
                    key={btn.id}
                    type="button"
                    onClick={() => setCameraView(btn.id)}
                    style={{
                      padding: '6px 10px',
                      fontSize: '0.78rem',
                      fontWeight: 500,
                      borderRadius: 'var(--radius-sm)',
                      border: 'none',
                      backgroundColor: cameraView === btn.id ? 'var(--wine)' : 'transparent',
                      color: cameraView === btn.id ? 'var(--on-dark)' : 'var(--ink-muted)',
                      transition: 'background-color 180ms ease, color 180ms ease',
                    }}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              {/* Architectural Specification Badge */}
              <div
                aria-live="polite"
                style={{
                  pointerEvents: 'auto',
                  backgroundColor: 'rgba(248, 245, 242, 0.92)',
                  backdropFilter: 'blur(8px)',
                  padding: '7px 11px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--line-strong)',
                  maxWidth: '275px',
                  fontSize: '0.74rem',
                  lineHeight: 1.4,
                  color: 'var(--ink)',
                  boxShadow: '0 2px 8px rgba(48,43,40,0.06)',
                }}
              >
                <div
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: 'var(--wine)',
                    marginBottom: '2px',
                  }}
                >
                  Thông số thiết kế đang chọn:
                </div>
                <div style={{ color: 'var(--ink)', fontWeight: 500 }}>
                  {collar.name} · {sleeve.name}
                </div>
                <div style={{ color: 'var(--ink-muted)', marginTop: '1px' }}>
                  {accessory.id !== 'none' ? `Phụ kiện: ${accessory.name}` : 'Không phụ kiện kèm'}
                </div>
              </div>
            </div>

            <AoDaiViewport3D
              fabric={fabric}
              colorHex={color.hex}
              pantsHex={pants.hex}
              motifId={motif.id}
              lightingId={config.lightingId}
              monogram={config.monogram}
              cameraView={cameraView}
              onChangeView={setCameraView}
            />

            {/* Bottom Viewport Hint & Lighting Switcher */}
            <div
              style={{
                position: 'absolute',
                bottom: '14px',
                left: '14px',
                right: '14px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '8px',
                pointerEvents: 'none',
                fontSize: '0.78rem',
                color: 'var(--ink-muted)',
              }}
            >
              <span
                style={{
                  backgroundColor: 'rgba(248, 245, 242, 0.9)',
                  padding: '5px 10px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--line)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Camera size={13} />
                Kéo ngang để xoay góc nhìn · Di chuột để nghiêng 3D
              </span>

              <div
                style={{
                  display: 'inline-flex',
                  gap: '4px',
                  pointerEvents: 'auto',
                  backgroundColor: 'rgba(248, 245, 242, 0.9)',
                  padding: '4px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--line)',
                }}
              >
                {STUDIO_LIGHTING.map((lt) => (
                  <button
                    key={lt.id}
                    type="button"
                    onClick={() => setConfig((c) => ({ ...c, lightingId: lt.id }))}
                    style={{
                      padding: '4px 8px',
                      fontSize: '0.74rem',
                      borderRadius: '3px',
                      border: 'none',
                      backgroundColor: config.lightingId === lt.id ? 'var(--bronze)' : 'transparent',
                      color: config.lightingId === lt.id ? 'var(--on-dark)' : 'var(--ink-muted)',
                    }}
                  >
                    {lt.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: 4-Step Hockerty-inspired Customizer Panel */}
          <div
            style={{
              backgroundColor: 'var(--ivory-elevated)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--line-strong)',
              padding: '22px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '20px',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div>
              {/* Step Tabs */}
              <div
                role="tablist"
                aria-label="Các bước tùy chỉnh áo dài"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                  gap: '6px',
                  padding: '5px',
                  backgroundColor: 'var(--cream)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--line)',
                  marginBottom: '22px',
                }}
              >
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      role="tab"
                      aria-selected={active}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '9px 6px',
                        borderRadius: 'var(--radius-sm)',
                        border: 'none',
                        backgroundColor: active ? 'var(--ivory-elevated)' : 'transparent',
                        color: active ? 'var(--wine)' : 'var(--ink-muted)',
                        fontSize: '0.78rem',
                        fontWeight: active ? 600 : 400,
                        boxShadow: active ? '0 2px 8px rgba(48,43,40,0.06)' : 'none',
                      }}
                    >
                      <Icon size={16} strokeWidth={1.7} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {activeTab === 'fabric' && (
                  <motion.div
                    key="fabric"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                  >
                    <div>
                      <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '10px' }}>
                        Chọn chất liệu vải
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '10px' }}>
                        {STUDIO_FABRICS.map((item) => {
                          const selected = config.fabricId === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setConfig((c) => ({ ...c, fabricId: item.id }))}
                              style={{
                                textAlign: 'left',
                                padding: '12px',
                                borderRadius: 'var(--radius-md)',
                                border: selected ? '1.5px solid var(--wine)' : '1px solid var(--line)',
                                backgroundColor: selected ? 'var(--cream)' : 'transparent',
                              }}
                            >
                              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink)' }}>
                                {item.name}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--ink-subtle)', marginTop: '2px' }}>
                                {item.note}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--wine)', marginTop: '4px', fontWeight: 500 }}>
                                {item.priceDelta === 0 ? 'Tiêu chuẩn' : `+${formatVND(item.priceDelta)}`}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '10px' }}>
                        Chọn sắc màu di sản ({color.name})
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '10px' }}>
                        {STUDIO_COLORS.map((item) => {
                          const selected = config.colorId === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setConfig((c) => ({ ...c, colorId: item.id }))}
                              aria-label={item.name}
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '8px 4px',
                                borderRadius: 'var(--radius-md)',
                                border: selected ? '1.5px solid var(--wine)' : '1px solid var(--line)',
                                backgroundColor: selected ? 'var(--cream)' : 'transparent',
                              }}
                            >
                              <span
                                style={{
                                  width: '28px',
                                  height: '28px',
                                  borderRadius: 'var(--radius-pill)',
                                  backgroundColor: item.hex,
                                  border: '1px solid rgba(48,43,40,0.2)',
                                }}
                              />
                              <span style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', textAlign: 'center' }}>
                                {item.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <FabricSwatchPreview fabric={fabric} color={color} />
                  </motion.div>
                )}

                {activeTab === 'cut' && (
                  <motion.div
                    key="cut"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
                  >
                    <div>
                      <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px' }}>Kiểu cổ áo</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {STUDIO_COLLARS.map((item) => {
                          const selected = config.collarId === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => {
                                setConfig((c) => ({ ...c, collarId: item.id }));
                                setCameraView('full');
                              }}
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '11px 14px',
                                borderRadius: 'var(--radius-md)',
                                border: selected ? '1.5px solid var(--wine)' : '1px solid var(--line)',
                                backgroundColor: selected ? 'var(--cream)' : 'transparent',
                                fontSize: '0.875rem',
                              }}
                            >
                              <span>{item.name}</span>
                              <span style={{ color: 'var(--wine)', fontSize: '0.78rem', fontWeight: 500 }}>
                                {item.priceDelta === 0 ? 'Tiêu chuẩn' : `+${formatVND(item.priceDelta)}`}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px' }}>Độ dài tay áo</p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '8px' }}>
                        {STUDIO_SLEEVES.map((item) => {
                          const selected = config.sleeveId === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => {
                                setConfig((c) => ({ ...c, sleeveId: item.id }));
                                setCameraView('full');
                              }}
                              style={{
                                padding: '11px 12px',
                                borderRadius: 'var(--radius-md)',
                                border: selected ? '1.5px solid var(--wine)' : '1px solid var(--line)',
                                backgroundColor: selected ? 'var(--cream)' : 'transparent',
                                fontSize: '0.84rem',
                              }}
                            >
                              {item.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px' }}>Quần lụa phối kèm</p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '8px' }}>
                        {STUDIO_PANTS.map((item) => {
                          const selected = config.pantsId === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setConfig((c) => ({ ...c, pantsId: item.id }))}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '9px 12px',
                                borderRadius: 'var(--radius-md)',
                                border: selected ? '1.5px solid var(--wine)' : '1px solid var(--line)',
                                backgroundColor: selected ? 'var(--cream)' : 'transparent',
                                fontSize: '0.8125rem',
                              }}
                            >
                              <span
                                style={{
                                  width: '16px',
                                  height: '16px',
                                  borderRadius: 'var(--radius-pill)',
                                  backgroundColor: item.hex || color.hex,
                                  border: '1px solid rgba(48,43,40,0.25)',
                                  flexShrink: 0,
                                }}
                              />
                              <span>{item.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'motif' && (
                  <motion.div
                    key="motif"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
                  >
                    <div>
                      <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px' }}>
                        Họa tiết trên tà áo
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '10px' }}>
                        {STUDIO_MOTIFS.map((item) => {
                          const selected = config.motifId === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => {
                                setConfig((c) => ({ ...c, motifId: item.id }));
                                setCameraView('full');
                              }}
                              style={{
                                textAlign: 'left',
                                padding: '12px',
                                borderRadius: 'var(--radius-md)',
                                border: selected ? '1.5px solid var(--wine)' : '1px solid var(--line)',
                                backgroundColor: selected ? 'var(--cream)' : 'transparent',
                              }}
                            >
                              <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{item.name}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--wine)', marginTop: '4px' }}>
                                {item.priceDelta === 0 ? 'Tiêu chuẩn' : `+${formatVND(item.priceDelta)}`}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px' }}>
                        Phụ kiện truyền thống
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '8px' }}>
                        {STUDIO_ACCESSORIES.map((item) => {
                          const selected = config.accessoryId === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setConfig((c) => ({ ...c, accessoryId: item.id }))}
                              style={{
                                textAlign: 'left',
                                padding: '10px 12px',
                                borderRadius: 'var(--radius-md)',
                                border: selected ? '1.5px solid var(--wine)' : '1px solid var(--line)',
                                backgroundColor: selected ? 'var(--cream)' : 'transparent',
                              }}
                            >
                              <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>{item.name}</div>
                              <div style={{ fontSize: '0.73rem', color: 'var(--wine)', marginTop: '2px' }}>
                                {item.priceDelta === 0 ? 'Không kèm' : `+${formatVND(item.priceDelta)}`}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="monogram-input"
                        style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '6px' }}
                      >
                        Thêu chữ ký / tên riêng ở chân tà (+150.000đ)
                      </label>
                      <input
                        id="monogram-input"
                        type="text"
                        maxLength={14}
                        placeholder="Ví dụ: Thanh Di hoặc tên riêng..."
                        value={config.monogram}
                        onChange={(e) => setConfig((c) => ({ ...c, monogram: e.target.value }))}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--line-strong)',
                          backgroundColor: 'var(--ivory)',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.875rem',
                          color: 'var(--ink)',
                        }}
                      />
                    </div>
                  </motion.div>
                )}

                {activeTab === 'sizing' && (
                  <motion.div
                    key="sizing"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => setConfig((c) => ({ ...c, sizeMode: 'standard' }))}
                        style={{
                          padding: '10px',
                          borderRadius: 'var(--radius-md)',
                          border: config.sizeMode === 'standard' ? '1.5px solid var(--wine)' : '1px solid var(--line)',
                          backgroundColor: config.sizeMode === 'standard' ? 'var(--cream)' : 'transparent',
                          fontSize: '0.84rem',
                          fontWeight: 500,
                        }}
                      >
                        Chọn size chuẩn (S–XL)
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfig((c) => ({ ...c, sizeMode: 'custom' }))}
                        style={{
                          padding: '10px',
                          borderRadius: 'var(--radius-md)',
                          border: config.sizeMode === 'custom' ? '1.5px solid var(--wine)' : '1px solid var(--line)',
                          backgroundColor: config.sizeMode === 'custom' ? 'var(--cream)' : 'transparent',
                          fontSize: '0.84rem',
                          fontWeight: 500,
                        }}
                      >
                        May đo số đo riêng
                      </button>
                    </div>

                    {config.sizeMode === 'standard' ? (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '8px' }}>
                        {['S', 'M', 'L', 'XL'].map((sz) => (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => setConfig((c) => ({ ...c, standardSize: sz }))}
                            style={{
                              padding: '12px',
                              borderRadius: 'var(--radius-md)',
                              border:
                                config.standardSize === sz ? '1.5px solid var(--wine)' : '1px solid var(--line)',
                              backgroundColor: config.standardSize === sz ? 'var(--cream)' : 'transparent',
                              fontWeight: 600,
                            }}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '10px' }}>
                        {[
                          { key: 'height', label: 'Chiều cao (cm)', ph: '160' },
                          { key: 'weight', label: 'Cân nặng (kg)', ph: '50' },
                          { key: 'bust', label: 'Vòng ngực (cm)', ph: '84' },
                          { key: 'waist', label: 'Vòng eo (cm)', ph: '66' },
                          { key: 'hip', label: 'Vòng mông (cm)', ph: '90' },
                        ].map((field) => (
                          <div key={field.key}>
                            <label
                              style={{
                                display: 'block',
                                fontSize: '0.76rem',
                                color: 'var(--ink-muted)',
                                marginBottom: '4px',
                              }}
                            >
                              {field.label}
                            </label>
                            <input
                              type="text"
                              placeholder={field.ph}
                              value={config[field.key] || ''}
                              onChange={(e) => setConfig((c) => ({ ...c, [field.key]: e.target.value }))}
                              style={{
                                width: '100%',
                                padding: '8px 10px',
                                borderRadius: 'var(--radius-sm)',
                                border: '1px solid var(--line-strong)',
                                backgroundColor: 'var(--ivory)',
                                fontSize: '0.84rem',
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Summary & CTA */}
            <div
              style={{
                borderTop: '1px solid var(--line)',
                paddingTop: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--ink-muted)' }}>
                  Giá dự kiến (bản mẫu tham khảo)
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.75rem',
                    fontWeight: 600,
                    color: 'var(--wine)',
                  }}
                >
                  {formatVND(totalPrice)}
                </span>
              </div>
              <button
                type="button"
                className="btn btn--primary"
                style={{ width: '100%' }}
                onClick={() => setOrderOpen(true)}
              >
                <Sparkles size={17} />
                Lưu thiết kế & Gửi đặt may
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary Modal */}
      <AnimatePresence>
        {orderOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 150,
              backgroundColor: 'rgba(48, 43, 40, 0.48)',
              backdropFilter: 'blur(6px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
            onClick={() => setOrderOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Phiếu thiết kế áo dài 3D"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setOrderOpen(false);
              }}
              style={{
                width: '100%',
                maxWidth: '520px',
                backgroundColor: 'var(--ivory-elevated)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--line-strong)',
                padding: '28px',
                boxShadow: 'var(--shadow-soft)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--wine)' }}>Phiếu thiết kế áo dài 3D</h3>
                <button
                  type="button"
                  aria-label="Đóng hộp thoại"
                  onClick={() => setOrderOpen(false)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--ink-muted)', padding: '4px' }}
                >
                  <X size={20} />
                </button>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--ink-muted)', marginBottom: '14px' }}>
                Bạn có thể sao chép thông số thiết kế bên dưới để gửi trực tiếp qua Fanpage Facebook hoặc Zalo của Thanh Di:
              </p>
              <pre
                style={{
                  backgroundColor: 'var(--cream)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.84rem',
                  lineHeight: 1.65,
                  whiteSpace: 'pre-wrap',
                  marginBottom: '18px',
                  color: 'var(--ink)',
                }}
              >
                {summaryText}
              </pre>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <button type="button" className="btn btn--primary" onClick={handleCopySummary} style={{ flex: 1 }}>
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'Đã sao chép thông số' : 'Sao chép thông số'}
                </button>
                <a
                  href="https://www.facebook.com/profile.php?id=61591544337004"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--secondary"
                >
                  Nhắn Fanpage Thanh Di
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 980px) {
          .studio-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

const FABRIC_WEAVE_SPECS = {
  silk: 'Dệt vân chéo mịn · Độ rủ mềm, ánh lụa tự nhiên',
  brocade: 'Dệt gấm hoa nổi · Đứng phom, phản chiếu ánh tơ',
  velvet: 'Sợi tuyết dày mịn · Hấp thụ sáng sâu, viền ánh phấn',
  organza: 'Sợi tơ mảnh đan thưa · Bay bổng, xuyên sáng nhẹ',
};

function FabricSwatchPreview({ fabric, color }) {
  const swatchRef = useRef(null);

  useEffect(() => {
    const canvas = swatchRef.current;
    if (!canvas) return;
    const size = 160;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const imgData = ctx.createImageData(size, size);
    const data = imgData.data;

    const clean = color.hex.replace('#', '');
    const num = parseInt(clean, 16);
    const tr = (num >> 16) & 255;
    const tg = (num >> 8) & 255;
    const tb = num & 255;

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const i = (y * size + x) * 4;
        const nx = x / size;
        const ny = y / size;
        // Soft studio drape fold across the swatch
        const fold = 0.86 + Math.sin((nx * 1.4 + ny * 0.7) * Math.PI) * 0.14;
        let shade = fold;
        let spec = 0;

        if (fabric.id === 'silk') {
          const twill = Math.sin((x + y) * 1.6) * 0.03 + Math.sin((x - y) * 2.4) * 0.015;
          shade += twill;
          spec = Math.pow(Math.max(0, fold - 0.86) / 0.14, 1.6) * 42;
        } else if (fabric.id === 'brocade') {
          const medallion =
            Math.sin(x * 0.22) * Math.cos(y * 0.22) * 0.12 +
            Math.cos((x - y) * 0.34) * Math.sin((x + y) * 0.34) * 0.07;
          const thread = Math.sin(x * 1.5) * Math.sin(y * 1.5) * 0.03;
          shade += medallion + thread;
          spec = Math.max(0, medallion) * 145;
        } else if (fabric.id === 'velvet') {
          const pile = (((x * 37 + y * 91) ^ (x * 13 - y * 53)) & 15) / 15 - 0.5;
          shade = Math.pow(fold, 1.75) * 0.78 + pile * 0.045;
          const rim = Math.pow(Math.max(0, 1 - Math.abs(fold - 0.88) * 6), 2) * 32;
          spec = rim;
        } else if (fabric.id === 'organza') {
          const meshX = Math.abs(Math.sin(x * 1.15));
          const meshY = Math.abs(Math.sin(y * 1.15));
          const filament = (meshX + meshY) * 0.5;
          shade = fold * 0.72 + 0.24 + (filament - 0.6) * 0.08;
          spec = Math.pow(Math.max(0, fold - 0.85) / 0.15, 1.4) * 48;
        }

        data[i] = Math.max(0, Math.min(255, Math.round(tr * shade + spec)));
        data[i + 1] = Math.max(0, Math.min(255, Math.round(tg * shade + spec)));
        data[i + 2] = Math.max(0, Math.min(255, Math.round(tb * shade + spec)));
        data[i + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }, [fabric.id, color.hex]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '12px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--line-strong)',
        backgroundColor: 'var(--cream)',
      }}
    >
      <canvas
        ref={swatchRef}
        aria-label={`Mẫu cận cảnh chất liệu ${fabric.name} màu ${color.name}`}
        style={{
          width: '74px',
          height: '74px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid rgba(48,43,40,0.22)',
          flexShrink: 0,
          boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.12)',
        }}
      />
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: '0.7rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: 'var(--wine)',
          }}
        >
          Cận cảnh bề mặt vải
        </div>
        <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--ink)', marginTop: '2px' }}>
          {fabric.name} · {color.name}
        </div>
        <div style={{ fontSize: '0.76rem', color: 'var(--ink-muted)', marginTop: '3px', lineHeight: 1.4 }}>
          {FABRIC_WEAVE_SPECS[fabric.id] || fabric.note}
        </div>
      </div>
    </div>
  );
}
