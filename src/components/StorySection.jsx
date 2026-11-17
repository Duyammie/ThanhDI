import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { BRAND_INFO } from '../data/thanhDiData';

export function StorySection() {
  return (
    <section id="ve-thanh-di" className="section">
      <div className="container">
        <div
          className="story-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.95fr) minmax(0, 1.05fr)',
            gap: 'clamp(28px, 5vw, 60px)',
            alignItems: 'center',
            backgroundColor: 'var(--cream)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(24px, 4vw, 48px)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              border: '1px solid var(--line-strong)',
            }}
          >
            <img
              src="/images/atelier-silk.jpg"
              alt="Chất liệu lụa tơ tằm, gấm dệt và khuy ngọc trai tại xưởng may Thanh Di"
              style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover' }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-kicker">Câu chuyện thương hiệu</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.5rem)' }}>
              “Thanh” là sự thanh tao. “Di” là di sản được giữ gìn.
            </h2>
            <p style={{ color: 'var(--ink-muted)', marginBottom: '16px' }}>
              Thanh Di ra đời từ mong muốn đưa tà áo dài truyền thống trở lại gần hơn với nhịp sống
              đương đại — vẫn giữ chuẩn phom dáng kín đáo, mềm mại của người Việt, nhưng tinh giản
              chi tiết để bạn tự tin diện trong lễ Tết, ngày cưới hay những buổi gặp gỡ trang trọng.
            </p>
            <p style={{ color: 'var(--ink-muted)', marginBottom: '24px' }}>
              Mỗi thước lụa tơ tằm và gấm dệt đều được lựa chọn kỹ lưỡng về độ rủ và độ thoáng, đi kèm
              trải nghiệm thử phối 3D để mọi khách hàng ở xa đều cảm nhận trọn vẹn thiết kế trước khi
              đặt may.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <a
                href={BRAND_INFO.facebookPage}
                target="_blank"
                rel="noreferrer"
                className="btn btn--secondary"
              >
                Fanpage Thanh Di
                <ArrowUpRight size={16} />
              </a>
              <a
                href={BRAND_INFO.ownerFacebook}
                target="_blank"
                rel="noreferrer"
                className="btn btn--ghost"
              >
                Liên hệ chủ shop
                <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .story-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
