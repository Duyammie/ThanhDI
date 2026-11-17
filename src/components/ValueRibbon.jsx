import React from 'react';
import { Check } from 'lucide-react';
import { VALUE_PILLARS } from '../data/thanhDiData';

export function ValueRibbon() {
  return (
    <div
      style={{
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        backgroundColor: 'var(--ivory-elevated)',
        paddingBlock: '20px',
      }}
    >
      <div
        className="container value-ribbon-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: '20px',
        }}
      >
        {VALUE_PILLARS.map((item) => (
          <div
            key={item}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              fontSize: '0.875rem',
              color: 'var(--ink-muted)',
              lineHeight: 1.5,
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '20px',
                height: '20px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'var(--cream)',
                border: '1px solid var(--line-strong)',
                color: 'var(--wine)',
                flexShrink: 0,
                marginTop: '2px',
              }}
            >
              <Check size={12} strokeWidth={2.2} />
            </span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 960px) {
          .value-ribbon-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 540px) {
          .value-ribbon-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
