import React from 'react';
import { motion } from 'framer-motion';
import { TAILORING_STEPS, SIZE_CHART } from '../data/thanhDiData';

export function ProcessAndSizing() {
  return (
    <section id="quy-trinh" className="section section--cream">
      <div className="container">
        <div style={{ maxWidth: '60ch', marginBottom: '40px' }}>
          <span className="section-kicker">Quy trình may đo & Bảng size</span>
          <h2 className="section-title">Ba bước để có tà áo dài vừa vặn</h2>
        </div>

        <div
          className="process-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '24px',
            marginBottom: '56px',
          }}
        >
          {TAILORING_STEPS.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.48, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{
                backgroundColor: 'var(--ivory-elevated)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  fontWeight: 600,
                  color: 'var(--bronze)',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                {item.step}
              </span>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '8px' }}>{item.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)' }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Size Chart */}
        <div
          style={{
            backgroundColor: 'var(--ivory-elevated)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(20px, 3vw, 32px)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: '12px',
              marginBottom: '18px',
            }}
          >
            <h3 style={{ fontSize: '1.5rem' }}>Bảng size chuẩn tham khảo (đơn vị: cm)</h3>
            <span style={{ fontSize: '0.84rem', color: 'var(--ink-subtle)' }}>
              Nếu số đo nằm giữa hai size, bạn nên chọn mục “May đo riêng” trong Xưởng 3D
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                minWidth: '520px',
                borderCollapse: 'collapse',
                fontSize: '0.9rem',
                textAlign: 'left',
              }}
            >
              <thead>
                <tr style={{ borderBottom: '1px solid var(--line-strong)', color: 'var(--ink-subtle)' }}>
                  <th style={{ padding: '12px 10px', fontWeight: 500 }}>Size</th>
                  <th style={{ padding: '12px 10px', fontWeight: 500 }}>Chiều cao</th>
                  <th style={{ padding: '12px 10px', fontWeight: 500 }}>Cân nặng</th>
                  <th style={{ padding: '12px 10px', fontWeight: 500 }}>Vòng ngực</th>
                  <th style={{ padding: '12px 10px', fontWeight: 500 }}>Vòng eo</th>
                  <th style={{ padding: '12px 10px', fontWeight: 500 }}>Vòng mông</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_CHART.map((row) => (
                  <tr key={row.size} style={{ borderBottom: '1px solid var(--line)' }}>
                    <td style={{ padding: '12px 10px', fontWeight: 600, color: 'var(--wine)' }}>{row.size}</td>
                    <td style={{ padding: '12px 10px' }}>{row.height}</td>
                    <td style={{ padding: '12px 10px' }}>{row.weight}</td>
                    <td style={{ padding: '12px 10px' }}>{row.bust}</td>
                    <td style={{ padding: '12px 10px' }}>{row.waist}</td>
                    <td style={{ padding: '12px 10px' }}>{row.hip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .process-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
