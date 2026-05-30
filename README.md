# TƠ MỘNG HẮC NẠP · Trailer giới thiệu Lâm Thương Khung

Project dựng video **trailer dọc 9:16, dài 48 giây**, sử dụng [Remotion](https://www.remotion.dev/) và render tự động bằng **GitHub Actions**.

## Trailer gồm những cảnh gì?

1. Tựa truyện: *Tơ Mộng Hắc Nạp*.
2. Đông Hải Thành và buổi sáng tuổi thơ.
3. Gia đình của Lâm Thương Khung.
4. Ngày thức tỉnh võ hồn.
5. Phệ Mộng Tằm xuất hiện.
6. Hắc Nạp thức tỉnh.
7. Thương Khung trưởng thành.
8. Cảnh chiến đấu và trạng thái đỉnh phong.
9. Khung kết với câu thoại: “Ta chỉ cất đi khả năng thắng của ngươi thôi.”

## Cách chạy trên GitHub, không cần cài phần mềm

1. Tạo một repository mới trên GitHub.
2. Giải nén thư mục này rồi tải toàn bộ file lên repository.
3. Mở tab **Actions**.
4. Chọn workflow **Render trailer MP4**.
5. Bấm **Run workflow**.
6. Khi chạy xong, tải file ở mục **Artifacts** tên `to-mong-hac-nap-trailer-mp4`.

Video đầu ra: `out/to-mong-hac-nap-trailer.mp4`.

## Chạy trên máy tính hoặc GitHub Codespaces

```bash
npm install
npm run start
```

Remotion Studio sẽ mở để xem trước và chỉnh sửa.

Xuất video HD dọc:

```bash
npm run render
```

Xuất bản xem thử nhẹ hơn:

```bash
npm run render:preview
```

## Thay ảnh

Tất cả hình nằm trong `public/images/`. Có thể thay file nhưng giữ nguyên tên:

- `cover.png`
- `city-page.png`
- `family-page.png`
- `academy-page.png`
- `awakening-page.png`
- `older-form.png`
- `battle.png`
- `ultimate.png`

## Chỉnh chữ và thời lượng

Mở file `src/trailerData.ts`. Mỗi cảnh có:

- `title`: dòng chữ lớn.
- `subtitle`: dòng chữ nhỏ.
- `duration`: số frame, 30 frame tương đương 1 giây.
- `motion`: kiểu zoom/lướt camera.
- `threads`: bật hiệu ứng tơ bạc.

## Thêm nhạc nền

Đặt file nhạc bản quyền an toàn của bạn vào `public/audio/music.mp3`, sau đó thêm component `Audio` trong `src/Trailer.tsx`:

```tsx
import {Audio, staticFile} from 'remotion';
// Đặt bên trong component Trailer:
<Audio src={staticFile('audio/music.mp3')} volume={0.4} />
```

Không kèm nhạc mặc định để bạn chủ động chọn âm thanh được phép sử dụng khi đăng video.

## Định dạng video

- Tỷ lệ: `1080 × 1920` (TikTok, Shorts, Reels).
- FPS: `30`.
- Thời lượng: `48 giây`.
- Composition ID: `TMMN-Trailer`.
