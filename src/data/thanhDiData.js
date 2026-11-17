export const BRAND_INFO = {
  name: 'Thanh Di',
  tagline: 'Di sản thanh lịch',
  subtitle: 'Áo dài truyền thống',
  facebookPage: 'https://www.facebook.com/profile.php?id=61591544337004',
  ownerFacebook: 'https://www.facebook.com/duong.trang811',
  phonePlaceholder: '09xx xxx xxx (Điền số Zalo shop)',
  addressPlaceholder: 'Địa chỉ showroom / xưởng may Thanh Di',
  hoursPlaceholder: '09:00 – 21:00 hằng ngày',
};

export const VALUE_PILLARS = [
  'Lụa tơ tằm & gấm tuyển chọn thoáng nhẹ',
  'Phom dáng chuẩn Việt, tôn eo dịu dàng',
  'Trải nghiệm phối màu & chất liệu 3D trực quan',
  'Nhận may đo theo số đo riêng & chỉnh sửa vừa vặn',
];

export const COLLECTIONS = [
  {
    id: 'ngoc-mai',
    name: 'Áo dài Lụa Ngọc Mai',
    category: 'Lễ Tết',
    price: 1850000,
    priceLabel: '1.850.000đ (Mẫu tham khảo)',
    fabricId: 'silk',
    colorId: 'ivory',
    collarId: 'traditional',
    sleeveId: 'long',
    motifId: 'lotus',
    description:
      'Sắc trắng ngà tinh khôi trên nền lụa tơ tằm rủ mềm, viền tà nâu đồng nhã nhặn cho những ngày lễ đầu năm.',
    imageKey: 'hero',
  },
  {
    id: 'son-tra',
    name: 'Áo dài Nhung Sơn Trà',
    category: 'Cưới hỏi',
    price: 2650000,
    priceLabel: '2.650.000đ (Mẫu tham khảo)',
    fabricId: 'velvet',
    colorId: 'wine',
    collarId: 'boat',
    sleeveId: 'long',
    motifId: 'damask',
    description:
      'Sắc đỏ rượu vang trầm ấm kết hợp khuy ngọc trai thủ công, tôn nét quý phái trong lễ ăn hỏi và tiệc trọng đại.',
    imageKey: 'wine',
  },
  {
    id: 'thanh-van',
    name: 'Áo dài Gấm Thanh Vân',
    category: 'Dạo phố',
    price: 2150000,
    priceLabel: '2.150.000đ (Mẫu tham khảo)',
    fabricId: 'brocade',
    colorId: 'bronze',
    collarId: 'round',
    sleeveId: 'threequarter',
    motifId: 'apricot',
    description:
      'Chất gấm dệt hoa văn chìm ánh đồng thanh thoát, tay lỡ hiện đại dễ cử động khi dạo phố hay dự sự kiện.',
    imageKey: 'atelier',
  },
];

export const STUDIO_FABRICS = [
  {
    id: 'silk',
    name: 'Lụa tơ tằm',
    note: 'Mềm rủ, óng nhẹ tự nhiên',
    priceDelta: 0,
    roughness: 0.34,
    metalness: 0.05,
    sheen: 0.85,
    sheenRoughness: 0.35,
    opacity: 1,
  },
  {
    id: 'brocade',
    name: 'Gấm dệt hoa',
    note: 'Đứng phom, họa tiết dệt nổi',
    priceDelta: 350000,
    roughness: 0.48,
    metalness: 0.16,
    sheen: 0.65,
    sheenRoughness: 0.45,
    opacity: 1,
  },
  {
    id: 'velvet',
    name: 'Nhung tuyết',
    note: 'Trầm ấm, bắt sáng mịn',
    priceDelta: 450000,
    roughness: 0.82,
    metalness: 0.02,
    sheen: 0.95,
    sheenRoughness: 0.6,
    opacity: 1,
  },
  {
    id: 'organza',
    name: 'Tơ Organza',
    note: 'Bay bổng, ánh tơ thanh thoát',
    priceDelta: 280000,
    roughness: 0.28,
    metalness: 0.08,
    sheen: 0.75,
    sheenRoughness: 0.25,
    opacity: 0.93,
  },
];

export const STUDIO_COLORS = [
  { id: 'ivory', name: 'Trắng ngà', hex: '#F3EDE2' },
  { id: 'wine', name: 'Đỏ rượu vang', hex: '#720000' },
  { id: 'bronze', name: 'Nâu đồng Di sản', hex: '#8A6240' },
  { id: 'olive', name: 'Xanh rêu cổ', hex: '#5D694D' },
  { id: 'blush', name: 'Hồng phấn xưa', hex: '#D8B4AE' },
  { id: 'amber', name: 'Vàng cúc thu', hex: '#C69749' },
  { id: 'jade', name: 'Lam ngọc', hex: '#3D6266' },
  { id: 'obsidian', name: 'Đen huyền', hex: '#231F1E' },
];

export const STUDIO_COLLARS = [
  { id: 'traditional', name: 'Cổ tàu truyền thống (3cm)', priceDelta: 0 },
  { id: 'boat', name: 'Cổ thuyền thanh lịch', priceDelta: 0 },
  { id: 'round', name: 'Cổ tròn viền ngọc', priceDelta: 120000 },
];

export const STUDIO_SLEEVES = [
  { id: 'long', name: 'Tay dài truyền thống', priceDelta: 0 },
  { id: 'threequarter', name: 'Tay lỡ hiện đại', priceDelta: 0 },
];

export const STUDIO_PANTS = [
  { id: 'ivory', name: 'Quần lụa trắng ngà', hex: '#F5EFE6' },
  { id: 'cream', name: 'Quần lụa kem cát', hex: '#E4D8C8' },
  { id: 'black', name: 'Quần lụa đen huyền', hex: '#24201F' },
  { id: 'match', name: 'Đồng bộ màu áo', hex: null },
];

export const STUDIO_MOTIFS = [
  { id: 'solid', name: 'Trơn tinh giản', priceDelta: 0 },
  { id: 'damask', name: 'Gấm chìm Di sản', priceDelta: 180000 },
  { id: 'lotus', name: 'Hoa sen & Hạc vàng', priceDelta: 320000 },
  { id: 'apricot', name: 'Hoa mai dát kim', priceDelta: 380000 },
];

export const STUDIO_ACCESSORIES = [
  { id: 'none', name: 'Không phụ kiện', priceDelta: 0 },
  { id: 'pendant', name: 'Ngọc bội tua rua', priceDelta: 220000 },
  { id: 'man', name: 'Mấn đội đầu đồng bộ', priceDelta: 280000 },
  { id: 'both', name: 'Mấn & Ngọc bội', priceDelta: 460000 },
];

export const STUDIO_LIGHTING = [
  { id: 'studio', name: 'Ánh sáng Studio' },
  { id: 'warm', name: 'Nắng chiều ấm' },
  { id: 'evening', name: 'Dạ tiệc sang trọng' },
];

export const SIZE_CHART = [
  { size: 'S', height: '1m50 – 1m58', weight: '42 – 47 kg', bust: '80 – 83', waist: '62 – 65', hip: '86 – 89' },
  { size: 'M', height: '1m55 – 1m63', weight: '48 – 53 kg', bust: '84 – 87', waist: '66 – 69', hip: '90 – 93' },
  { size: 'L', height: '1m58 – 1m66', weight: '54 – 59 kg', bust: '88 – 91', waist: '70 – 74', hip: '94 – 97' },
  { size: 'XL', height: '1m60 – 1m68', weight: '60 – 66 kg', bust: '92 – 96', waist: '75 – 79', hip: '98 – 102' },
];

export const TAILORING_STEPS = [
  {
    step: '01',
    title: 'Chọn mẫu & Phối thử trên 3D',
    desc: 'Xoay 360° để chọn chất liệu lụa, gấm, sắc màu, kiểu cổ và họa tiết đúng với dáng người và dịp mặc của bạn.',
  },
  {
    step: '02',
    title: 'Gửi số đo hoặc chọn size chuẩn',
    desc: 'Chọn size S–XL có sẵn hoặc điền số đo 3 vòng để thợ may Thanh Di cắt rập riêng theo phom cơ thể.',
  },
  {
    step: '03',
    title: 'Hoàn thiện & Chỉnh sửa vừa vặn',
    desc: 'Áo dài được kiểm tra từng đường khuy, tà áo trước khi giao và hỗ trợ chỉnh sửa miễn phí nếu cần ôm sát hơn.',
  },
];

export const FAQS = [
  {
    q: 'Khách ở xa có đặt may đo theo số đo riêng được không?',
    a: 'Có. Sau khi bạn chọn thiết kế trên Xưởng 3D, Thanh Di sẽ gửi hướng dẫn tự đo 5 thông số cơ bản (chiều cao, cân nặng, ngực, eo, mông) qua Zalo/Messenger để thợ cắt may chuẩn phom.',
  },
  {
    q: 'Màu sắc và chất liệu trên mô hình 3D có sát với vải thật không?',
    a: 'Xưởng 3D mô phỏng độ bóng của lụa, độ đứng của gấm và sắc độ gần sát nhất với bảng vải tại tiệm. Khi tư vấn, Thanh Di sẽ gửi thêm ảnh/video quay vải thật dưới ánh sáng tự nhiên để bạn yên tâm.',
  },
  {
    q: 'Thời gian may đo và giao hàng mất bao lâu?',
    a: 'Các mẫu may sẵn theo size giao trong 2–3 ngày. Với đơn đặt may đo hoặc thêu tên riêng, thời gian hoàn thiện dự kiến từ 7–10 ngày.',
  },
  {
    q: 'Áo dài lụa tơ tằm cần giặt và bảo quản như thế nào?',
    a: 'Nên giặt tay nhẹ bằng nước lạnh với dầu gội dịu nhẹ hoặc sữa tắm, không vắt xoắn mạnh và phơi trong bóng râm để giữ độ óng của sợi tơ.',
  },
];
