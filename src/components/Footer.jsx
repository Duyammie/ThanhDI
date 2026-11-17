import React from 'react';
import { ThanhDiLogo } from './ThanhDiLogo';
import { BRAND_INFO } from '../data/thanhDiData';

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--cream)',
        borderTop: '1px solid var(--line)',
        paddingBlock: '44px',
      }}
    >
      <div
        className="container footer-grid"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        <div>
          <ThanhDiLogo size={34} />
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px 18px',
              fontSize: '0.875rem',
              color: 'var(--ink-subtle)',
              marginTop: '10px',
            }}
          >
            <span>{BRAND_INFO.addressPlaceholder}</span>
            <span>{BRAND_INFO.hoursPlaceholder}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '0.875rem' }}>
          <a href="#bo-suu-tap" className="footer-link">Bộ sưu tập</a>
          <a href="#xuong-3d" className="footer-link">Xưởng 3D</a>
          <a href={BRAND_INFO.facebookPage} target="_blank" rel="noreferrer" className="footer-link">
            Fanpage Facebook
          </a>
          <a href={BRAND_INFO.ownerFacebook} target="_blank" rel="noreferrer" className="footer-link">
            Facebook Chủ shop
          </a>
        </div>
      </div>
    </footer>
  );
}
