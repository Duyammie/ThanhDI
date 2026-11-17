import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { ThanhDiLogo } from './ThanhDiLogo';

const NAV_LINKS = [
  { href: '#bo-suu-tap', label: 'Bộ sưu tập' },
  { href: '#xuong-3d', label: 'Xưởng 3D' },
  { href: '#ve-thanh-di', label: 'Về Thanh Di' },
  { href: '#quy-trinh', label: 'May đo & Size' },
  { href: '#hoi-dap', label: 'Hỏi đáp' },
];

export function Navbar({ onOpenStudio }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: scrolled ? 'var(--surface-glass)' : 'var(--ivory)',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: '1px solid var(--line)',
          transition: 'background-color 280ms var(--ease-editorial)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '76px',
            gap: '20px',
          }}
        >
          <a href="#top" aria-label="Trang chủ Thanh Di">
            <ThanhDiLogo size={36} />
          </a>

          <nav
            aria-label="Điều hướng chính"
            className="desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '28px',
            }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                style={{
                  fontSize: '0.9375rem',
                  fontWeight: 400,
                }}
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              className="btn btn--primary"
              onClick={onOpenStudio}
              style={{ padding: '10px 18px', fontSize: '0.875rem' }}
            >
              <Sparkles size={16} strokeWidth={1.6} />
              Thiết kế 3D
            </button>
          </nav>

          <button
            type="button"
            className="mobile-menu-btn"
            aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            style={{
              display: 'none',
              background: 'transparent',
              border: '1px solid var(--line-strong)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px',
              color: 'var(--ink)',
            }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              top: '77px',
              zIndex: 95,
              backgroundColor: 'var(--surface-glass-strong)',
              backdropFilter: 'blur(18px)',
              padding: '32px var(--gutter)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {NAV_LINKS.map((link, idx) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: Math.min(idx * 0.06, 0.3),
                  duration: 0.36,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.75rem',
                  color: 'var(--ink)',
                  borderBottom: '1px solid var(--line)',
                  paddingBottom: '12px',
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => {
                setMobileOpen(false);
                onOpenStudio();
              }}
              style={{ marginTop: '12px', width: '100%' }}
            >
              <Sparkles size={18} strokeWidth={1.6} />
              Mở Xưởng thiết kế 3D
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: inline-flex !important; }
        }
      `}</style>
    </>
  );
}
