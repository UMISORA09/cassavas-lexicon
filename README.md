# Cassavas Lexicon - Ứng dụng Từ điển Cá nhân Ngoại ngữ Thông minh

> **Đồ án môn Lập trình Thiết bị Di động (Mobile Application Development)**  
> **Sinh viên thực hiện:** Văn Nguyễn Xuân Hòa  
> **Nền tảng:** Android Native (Kotlin, XML, Room SQLite, TextToSpeech, Spaced Repetition SM-2) & Web Interactive Prototype (React, Vite, Tailwind CSS)

---

## 🌐 Trải nghiệm trực tuyến (Live Demo Online)
Ứng dụng Web Prototype đã được triển khai trực tiếp trên Vercel:
* **Live Demo:** [https://rapid-bismuth-mtdqlb0.tmp.now](https://rapid-bismuth-mtdqlb0.tmp.now)

---

## 📱 12 Màn hình Chức năng cốt lõi
1. **Đăng nhập phân quyền (Login Screen):** Hỗ trợ chuyển đổi vai trò linh hoạt giữa Học viên (`USER`) và Quản trị viên (`ADMIN`), tích hợp Chế độ Ngoại tuyến (Offline SQLite Mode).
2. **Đăng ký tài khoản (Register Screen):** Thiết lập mục tiêu số từ học mỗi ngày (10, 20 hoặc 30 từ/ngày) và chọn cặp ngôn ngữ chính (`EN-VI`, `JA-VI`, `KO-VI`).
3. **Trang chủ Dashboard (Home Dashboard):** Trung tâm điều khiển học tập cá nhân hóa với theo dõi mục tiêu ngày (14/20 từ, 70%), chuỗi Streak 18 ngày, lưới 5 lối tắt nhanh, thẻ "Từ vựng của ngày" kèm âm thanh US/UK, hàng đợi ôn tập SM-2 đến hạn, biểu đồ đường cong trí nhớ.
4. **Tra cứu tức thì (Instant Search):** Tìm kiếm thời gian thực (Search-as-you-type < 10ms), nhận diện giọng nói Voice Search AI, quét Camera OCR tài liệu IT, bộ lọc từ loại, lưu lịch sử tra cứu gần đây.
5. **Chi tiết từ vựng (Word Detail):** Ngữ âm IPA kép, 2 nút phát âm US/UK, câu ví dụ song ngữ, từ đồng/trái nghĩa, khu vực ghi chú mẹo nhớ Mnemonic cá nhân.
6. **Sổ tay chuyên đề (Notebooks):** Phân loại từ vựng theo danh mục (IT, Giao tiếp, IELTS), lọc từ theo trạng thái (Mới thêm, Đang học, Đã thuộc sâu).
7. **BottomSheet Thêm từ mới (Add Word Modal):** Thêm từ nhanh, đính kèm mẹo nhớ và tùy chọn đóng góp từ lên Kho hệ thống cho Admin duyệt.
8. **Flashcard 3D Spaced Repetition (SM-2):** Lật thẻ 3D xoay trục Y qua `ObjectAnimator` với 4 nút đánh giá phản xạ (Quên, Khó, Tốt, Dễ) tự động tính toán khoảng cách ngày ôn tập tiếp theo ($I_n$).
9. **Trắc nghiệm phản xạ 4 đáp án (Quiz Screen):** Sinh câu hỏi tự động từ kho từ vựng cá nhân, chấm điểm và thưởng điểm kinh nghiệm XP.
10. **Thống kê học tập (Stats Screen):** Biểu đồ cột ôn tập 7 ngày trong tuần, phân tích tỷ lệ nắm vững từ vựng và cấp bậc danh hiệu.
11. **Hồ sơ cá nhân & Đăng xuất (Profile Screen):** Cài đặt giọng đọc TTS, thông báo nhắc nhở giờ học qua `AlarmManager`, sao lưu dữ liệu SQLite/CSV.
12. **Phân hệ Quản trị hệ thống (Admin CMS):** 3 Sub-tab chuyên sâu gồm Kiểm duyệt từ vựng đề xuất (Moderation), Quản lý học viên & Khóa tài khoản (Users Management), Phát hành bộ từ vựng mẫu & Tiếp nhận báo lỗi (Decks & Bug Reports).

---

## 🛠 Hướng dẫn chạy cục bộ (Local Development)
```bash
# Cài đặt thư viện
npm install

# Khởi chạy server phát triển
npm run dev

# Đóng gói sản phẩm (Production Build)
npm run build
```

---

## 📄 Báo cáo Đồ án Học thuật
Toàn bộ thuyết minh đồ án chuẩn tốt nghiệp đại học được lưu trữ tại:
* File Word hoàn chỉnh: `BAO_CAO_DO_AN_TU_DIEN_CA_NHAN_FINAL.docx` (~4.39 MB, đầy đủ 22 hình ảnh sắc nét, 11 bảng biểu).
* File Markdown đồng bộ: `BAO_CAO_DO_AN_TU_DIEN_CA_NHAN.md`.
