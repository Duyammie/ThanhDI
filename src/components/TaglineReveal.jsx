import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TAGLINE_WORDS =
  'Tà áo dài không chỉ là trang phục, mà là ký ức thanh lịch của người phụ nữ Việt được dệt nên cho hôm nay.'.split(
    ' '
  );

function WordReveal({ word, progress, range }) {
  const opacity = useTransform(progress, range, [0.24, 1]);
  return (
    <motion.span style={{ opacity, display: 'inline-block', marginRight: '0.26em' }}>
      {word}
    </motion.span>
  );
}

export function TaglineReveal() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.45'],
  });

  return (
    <section
      ref={containerRef}
      style={{
        paddingBlock: 'clamp(64px, 9vw, 112px)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div className="container">
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.85rem, 3.8vw, 3.1rem)',
            lineHeight: 1.24,
            color: 'var(--ink)',
            maxWidth: '24ch',
            marginInline: 'auto',
            textAlign: 'center',
          }}
        >
          {TAGLINE_WORDS.map((word, index) => {
            const start = index / TAGLINE_WORDS.length;
            const end = start + 1 / TAGLINE_WORDS.length;
            return (
              <WordReveal
                key={`${word}-${index}`}
                word={word}
                progress={scrollYProgress}
                range={[start, end]}
              />
            );
          })}
        </p>
      </div>
    </section>
  );
}
