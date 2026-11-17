import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero({ onOpenStudio }) {
  return (
    <section
      id="top"
      style={{
        paddingTop: 'clamp(36px, 5vw, 68px)',
        paddingBottom: 'clamp(48px, 6vw, 84px)',
      }}
    >
      <div
        className="container hero-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.12fr) minmax(0, 0.88fr)',
          gap: 'clamp(32px, 5vw, 64px)',
          alignItems: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-kicker">Áo dài truyền thống, Di sản thanh lịch</span>

          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.1rem)',
              color: 'var(--wine)',
              lineHeight: 1.08,
              marginBottom: '20px',
              maxWidth: '16ch',
            }}
          >
            Giữ nét thanh lịch Việt trong từng tà áo dài.
          </h1>

          <p
            style={{
              fontSize: '1.0625rem',
              color: 'var(--ink-muted)',
              maxWidth: '50ch',
              marginBottom: '32px',
            }}
          >
            Thanh Di tuyển chọn chất liệu lụa tơ tằm và gấm dệt tinh tế, kết hợp phom dáng
            truyền thống cùng xưởng phối màu 3D để bạn tự tay kiến tạo tà áo vừa vặn cho riêng mình.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
            <button type="button" className="btn btn--primary" onClick={onOpenStudio}>
              <Sparkles size={17} strokeWidth={1.6} />
              Thử thiết kế áo dài 3D
            </button>
            <a href="#bo-suu-tap" className="btn btn--secondary">
              Khám phá bộ sưu tập
              <ArrowRight size={16} strokeWidth={1.6} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative', maxWidth: '460px', width: '100%', justifySelf: 'center' }}
        >
          <div className="arch-frame" style={{ boxShadow: 'var(--shadow-soft)' }}>
            <img
              src="/images/hero-aodai.jpg"
              alt="Người mẫu mặc áo dài lụa trắng ngà viền nâu đồng Thanh Di"
              style={{
                width: '100%',
                aspectRatio: '3 / 4',
                objectFit: 'cover',
              }}
            />
          </div>

          <div
            style={{
              marginTop: '14px',
              padding: '14px 18px',
              backgroundColor: 'var(--cream)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--ink)' }}>
                Tuyển tập Di Sản Thanh Lịch
              </p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--ink-subtle)' }}>
                Lụa tơ tằm ngà, viền nâu đồng thủ công
              </p>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.15rem',
                color: 'var(--bronze)',
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}
            >
              Thanh Di
            </span>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
