import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data/thanhDiData';

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="hoi-dap" className="section">
      <div className="container" style={{ maxWidth: '820px' }}>
        <div style={{ marginBottom: '36px' }}>
          <span className="section-kicker">Giải đáp thắc mắc</span>
          <h2 className="section-title">Câu hỏi thường gặp</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--line)' }}>
          {FAQS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={item.q} style={{ borderBottom: '1px solid var(--line)' }}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '20px 0',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.3rem',
                    fontWeight: 500,
                    color: isOpen ? 'var(--wine)' : 'var(--ink)',
                  }}
                >
                  <span>{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    style={{ flexShrink: 0, color: 'var(--ink-muted)' }}
                  >
                    <ChevronDown size={20} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p style={{ paddingBottom: '20px', color: 'var(--ink-muted)', fontSize: '0.95rem' }}>
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
