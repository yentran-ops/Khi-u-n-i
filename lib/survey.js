// Bộ câu hỏi khảo sát phân cấp (drill-down). Mục con hiện khi Tổng quan < 5 sao.
export const SECTIONS = [
  { cat: 'I. CHẤT LƯỢNG PHÒNG TẬP', sub: 'Khu vực Vệ sinh',
    overall: { id: 'CSVC_VeSinh_Overall', label: 'Tổng quan Vệ sinh', micro: 'Mức độ hài lòng chung về vệ sinh tại Club?' },
    details: [
      { id: 'CSVC_VeSinh_Chung', label: 'Vệ sinh chung', micro: 'Vệ sinh tổng thể phòng tập?' },
      { id: 'CSVC_VeSinh_Tap', label: 'Khu vực tập luyện', micro: 'Độ sạch sẽ khu vực sàn & máy tập?' },
      { id: 'CSVC_VeSinh_Locker', label: 'Locker & Phòng thay đồ', micro: 'Vệ sinh locker & phòng thay đồ?' },
      { id: 'CSVC_VeSinh_WC', label: 'Toilet & Phòng tắm', micro: 'Vệ sinh toilet & phòng tắm?' },
    ] },
  { cat: 'I. CHẤT LƯỢNG PHÒNG TẬP', sub: 'Không gian & Môi trường',
    overall: { id: 'CSVC_KhongGian_Overall', label: 'Tổng quan Không gian', micro: 'Cảm nhận chung về không gian & môi trường tập?' },
    details: [
      { id: 'CSVC_KhongGian_RongRai', label: 'Không gian tập', micro: 'Độ rộng rãi, thoáng đãng của phòng tập?' },
      { id: 'CSVC_KhongGian_BoTri', label: 'Bố trí khu vực', micro: 'Cách sắp xếp & phân chia các khu vực tập?' },
      { id: 'CSVC_KhongGian_NhietDo', label: 'Nhiệt độ & Điều hòa', micro: 'Nhiệt độ & độ thông thoáng khi tập?' },
      { id: 'CSVC_KhongGian_AnhSang', label: 'Ánh sáng', micro: 'Hệ thống ánh sáng tại các khu vực tập?' },
      { id: 'CSVC_KhongGian_AmNhac', label: 'Âm nhạc & Âm lượng', micro: 'Thể loại nhạc & âm lượng tại Club?' },
      { id: 'CSVC_KhongGian_MuiHuong', label: 'Mùi hương & Không khí', micro: 'Chất lượng không khí & mùi hương phòng tập?' },
    ] },
  { cat: 'I. CHẤT LƯỢNG PHÒNG TẬP', sub: 'Dụng cụ & Máy tập',
    overall: { id: 'CSVC_MayTap_Overall', label: 'Tổng quan Máy tập', micro: 'Đánh giá chung về máy móc & dụng cụ tập luyện?' },
    details: [
      { id: 'CSVC_MayTap_ChatLuong', label: 'Chất lượng máy', micro: 'Tình trạng hoạt động & độ mới của máy tập?' },
      { id: 'CSVC_MayTap_SoLuong', label: 'Số lượng máy', micro: 'Số lượng máy tập có đủ đáp ứng nhu cầu?' },
      { id: 'CSVC_MayTap_BaoTri', label: 'Bảo trì & Sửa chữa', micro: 'Tốc độ khắc phục & bảo trì máy lỗi?' },
      { id: 'CSVC_MayTap_SapXep', label: 'Sắp xếp & Chọn máy', micro: 'Sự ngăn nắp, dễ tìm kiếm dụng cụ cần dùng?' },
      { id: 'CSVC_MayTap_ChoGiao', label: 'Thời gian chờ máy', micro: 'Mức độ chờ máy vào các giờ cao điểm?' },
    ] },
  { cat: 'I. CHẤT LƯỢNG PHÒNG TẬP', sub: 'Tiện ích phụ trợ',
    overall: { id: 'CSVC_TienIch_Overall', label: 'Tổng quan Tiện ích', micro: 'Đánh giá chung về các tiện ích dịch vụ phụ trợ?' },
    details: [
      { id: 'CSVC_TienIch_Locker', label: 'Tủ Locker', micro: 'Độ tiện lợi, rộng rãi & an toàn của locker?' },
      { id: 'CSVC_TienIch_PhongTam', label: 'Phòng tắm', micro: 'Áp lực nước & hệ thống nước nóng?' },
      { id: 'CSVC_TienIch_DichVuPhu', label: 'Tiện ích kèm theo', micro: 'Đầy đủ tiện ích (nước uống, máy sấy, gương...)?' },
      { id: 'CSVC_TienIch_DiChuyen', label: 'Di chuyển nội bộ', micro: 'Lối di chuyển kết nối giữa các khu vực?' },
    ] },
  { cat: 'II. ĐỘI NGŨ NHÂN VIÊN', sub: 'Lễ tân & CSKH',
    overall: { id: 'NV_LeTan_Overall', label: 'Tổng quan Lễ tân/MS', micro: 'Đánh giá chung về bộ phận Lễ tân & Tư vấn?' },
    details: [
      { id: 'NV_LeTan_ThaiDo', label: 'Thái độ đón tiếp', micro: 'Sự thân thiện, lịch sự & chuyên nghiệp?' },
      { id: 'NV_LeTan_ChuDong', label: 'Chủ động hỗ trợ', micro: 'Sự nhiệt tình chăm sóc & hướng dẫn hội viên?' },
      { id: 'NV_LeTan_TocDo', label: 'Tốc độ xử lý', micro: 'Tốc độ giải quyết thắc mắc/yêu cầu?' },
      { id: 'NV_LeTan_MinhBang', label: 'Tư vấn minh bạch', micro: 'Độ rõ ràng về gói tập & chính sách dịch vụ?' },
    ] },
  { cat: 'II. ĐỘI NGŨ NHÂN VIÊN', sub: 'Huấn luyện viên (PT)',
    overall: { id: 'NV_PT_Overall', label: 'Tổng quan HLV (PT)', micro: 'Đánh giá chung về Huấn luyện viên cá nhân (PT)?' },
    details: [
      { id: 'NV_PT_ChuyenMon', label: 'Trình độ chuyên môn', micro: 'Kiến thức & năng lực huấn luyện của PT?' },
      { id: 'NV_PT_AnToan', label: 'Hướng dẫn an toàn', micro: 'Mức độ hướng dẫn bài tập chi tiết, an toàn?' },
      { id: 'NV_PT_LoTrinh', label: 'Lộ trình cá nhân', micro: 'Sự thấu hiểu mục tiêu & thể trạng hội viên?' },
      { id: 'NV_PT_DongHanh', label: 'Sự đồng hành', micro: 'Mức độ theo sát, nhắc nhở & thúc đẩy tiến độ?' },
    ] },
  { cat: 'II. ĐỘI NGŨ NHÂN VIÊN', sub: 'Quản lý Club',
    overall: { id: 'NV_QuanLy_Overall', label: 'Tổng quan Quản lý', micro: 'Đánh giá chung về sự hỗ trợ từ Quản lý Club?' },
    details: [
      { id: 'NV_QuanLy_KetNoi', label: 'Dễ dàng kết nối', micro: 'Sự hiện diện & khả năng tiếp cận Quản lý khi cần?' },
      { id: 'NV_QuanLy_LangNghe', label: 'Thái độ lắng nghe', micro: 'Tinh thần lắng nghe & cầu thị với đóng góp?' },
      { id: 'NV_QuanLy_SuCo', label: 'Giải quyết sự cố', micro: 'Khả năng xử lý khiếu nại & sự cố thỏa đáng?' },
    ] },
  { cat: 'II. ĐỘI NGŨ NHÂN VIÊN', sub: 'Giáo viên Group X',
    overall: { id: 'NV_GroupX_Overall', label: 'Tổng quan GroupX', micro: 'Đánh giá chung về đội ngũ Giáo viên Group X?' },
    details: [
      { id: 'NV_GroupX_ChuyenMon', label: 'Trình độ chuyên môn', micro: 'Kỹ năng đứng lớp & chất lượng bài dạy?' },
      { id: 'NV_GroupX_KyThuat', label: 'Hướng dẫn kỹ thuật', micro: 'Mức độ theo dõi & chỉnh sửa động tác?' },
      { id: 'NV_GroupX_NangLuong', label: 'Năng lượng lớp học', micro: 'Không khí tích cực & khả năng truyền cảm hứng?' },
      { id: 'NV_GroupX_TuongTac', label: 'Tương tác học viên', micro: 'Sự quan tâm đồng đều tới mọi người trong lớp?' },
    ] },
  { cat: 'III. CẢM NHẬN & LOYALTY', sub: 'Môi trường & Thương hiệu',
    overall: { id: 'Brand_Overall', label: 'Tổng quan Thương hiệu', micro: 'Cảm nhận chung của bạn về The New Gym?' },
    details: [
      { id: 'Brand_ThoaiMai', label: 'Thoải mái', micro: 'Bạn thấy thoải mái, tự nhiên khi tập tại đây?' },
      { id: 'Brand_ChaoDon', label: 'Sự chào đón', micro: 'Bạn cảm thấy luôn được đón tiếp nồng hậu?' },
      { id: 'Brand_DongLuc', label: 'Môi trường động lực', micro: 'Không khí club tạo cho bạn năng lượng tập luyện?' },
      { id: 'Brand_ThauHieu', label: 'Thấu hiểu khách hàng', micro: 'The New Gym thấu hiểu nhu cầu của bạn?' },
      { id: 'Brand_AnTam', label: 'Sự an tâm', micro: 'Bạn tin tưởng và an tâm khi sử dụng dịch vụ?' },
    ] },
  { cat: 'III. CẢM NHẬN & LOYALTY', sub: 'Mức độ Gắn bó', hasNps: true,
    overall: { id: 'Loyalty_Overall', label: 'Tổng quan Gắn bó', micro: 'Mức độ bạn muốn đồng hành lâu dài cùng Club?' },
    details: [
      { id: 'Loyalty_ChonLai', label: 'Đánh giá lựa chọn', micro: 'Bạn vẫn chọn The New Gym nếu chọn lại từ đầu?' },
      { id: 'Loyalty_GiaHan', label: 'Gia hạn dịch vụ', micro: 'Ý định tiếp tục gia hạn gói tập trong thời gian tới?' },
    ] },
];
export const NPS = { id: 'Loyalty_NPS', label: 'Giới thiệu bạn bè (NPS)', micro: 'Khả năng bạn giới thiệu Club cho người thân? (0–10)' };
export const FEEDBACK = [
  { id: 'Feedback_HaiLong', label: 'Điều hài lòng nhất', micro: 'Điều bạn HÀI LÒNG NHẤT tại phòng tập?' },
  { id: 'Feedback_CaiThien', label: 'Đóng góp cải thiện', micro: 'Một điều bạn muốn The New Gym CẢI THIỆN?' },
];
// map id -> nhãn (cho báo cáo)
export const LABELS = (() => {
  const m = {};
  for (const s of SECTIONS) { m[s.overall.id] = `${s.sub} · ${s.overall.label}`; for (const d of s.details) m[d.id] = `${s.sub} · ${d.label}`; }
  m[NPS.id] = NPS.label;
  return m;
})();
