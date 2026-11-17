import React from 'react';

/**
 * Logo chính thức của Thanh Di (Di sản thanh lịch),
 * dùng mix-blend-mode: multiply để nền trắng hòa vào nền kem ngà của website.
 */
export function ThanhDiLogo({ size = 48, showText = true }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
      <img
        src="/images/thanh-di-logo.jpg"
        alt="Logo Thanh Di — Di sản thanh lịch"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          objectFit: 'contain',
          mixBlendMode: 'multiply',
          flexShrink: 0,
        }}
      />
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.35rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              color: 'var(--bronze)',
            }}
          >
            THANH DI
          </span>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              color: 'var(--ink-subtle)',
              marginTop: '2px',
            }}
          >
            Di sản thanh lịch
          </span>
        </div>
      )}
    </div>
  );
}
