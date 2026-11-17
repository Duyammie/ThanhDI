import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { COLLECTIONS } from '../data/thanhDiData';

const IMAGE_MAP = {
  hero: '/images/hero-aodai.jpg',
  wine: '/images/collection-wine.jpg',
  atelier: '/images/atelier-silk.jpg',
};

const CATEGORIES = ['Tất cả', 'Lễ Tết', 'Cưới hỏi', 'Dạo phố'];

export function CollectionGrid({ onLoadPreset }) {
  const [selectedCat, setSelectedCat] = useState('Tất cả');

  const items =
    selectedCat === 'Tất cả'
      ? COLLECTIONS
      : COLLECTIONS.filter((c) => c.category === selectedCat);

  return (
    <section id="bo-suu-tap" className="section">
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div>
            <span className="section-kicker">Bộ sưu tập tiêu biểu</span>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              Những tà áo dài mang dấu ấn Thanh Di
            </h2>
          </div>

          <div role="group" aria-label="Lọc theo dịp mặc" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {CATEGORIES.map((cat) => {
              const active = selectedCat === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedCat(cat)}
                  className={active ? 'filter-pill filter-pill--active' : 'filter-pill'}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="collection-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '28px',
          }}
        >
          {items.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: 'var(--ivory-elevated)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-lg)',
                padding: '16px',
              }}
            >
              <div>
                <div
                  className="arch-frame"
                  style={{
                    marginBottom: '16px',
                    aspectRatio: '3 / 4',
                    borderRadius: 'var(--radius-arch-sm)',
                  }}
                >
                  <img
                    src={IMAGE_MAP[item.imageKey]}
                    alt={item.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 520ms var(--ease-editorial)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '6px',
                    fontSize: '0.8rem',
                    color: 'var(--olive)',
                    fontWeight: 500,
                  }}
                >
                  <span>{item.category}</span>
                  <span style={{ color: 'var(--wine)', fontWeight: 600 }}>{item.priceLabel}</span>
                </div>

                <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{item.name}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', marginBottom: '16px' }}>
                  {item.description}
                </p>
              </div>

              <button
                type="button"
                className="btn btn--secondary"
                style={{ width: '100%' }}
                onClick={() => onLoadPreset(item)}
              >
                <Sparkles size={15} />
                Phối thử mẫu này trên 3D
              </button>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 920px) {
          .collection-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 600px) {
          .collection-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
