# Đấu La 3 Đồng Nhân — Chap 1: Người Nhìn Thấy Quá Nhiều

Fan-comic production package cho tuyến nhân vật mới **Lâm Mặc**, giữ Đường Vũ Lân, Tạ Giải và Vũ Trường Không ở vai trò gốc.

## Mục tiêu

- 16 trang webcomic/storyboard màu.
- Mỹ thuật: manhua huyền huyễn học viện, line mảnh, cel-shading mềm, bảng màu lam–tím lạnh, hồn lực vàng kim/bạc.
- Không sao chép panel/trang truyện gốc và không mô phỏng từng nét riêng của một họa sĩ cụ thể.
- Có dữ liệu đủ để nối AI Comic Builder / ComfyUI / StoryDiffusion / IP-Adapter / ControlNet.

## Cấu trúc

- `index.html` — bản xem Chap 1 trực tiếp.
- `style.css` — layout comic, FX và typography.
- `chapter-data.js` — 16 trang, panel, thoại, camera, FX.
- `art-bible.json` — quy tắc tạo hình và continuity.
- `prompts.json` — prompt render từng trang/panel cho pipeline ảnh.

## Dùng nhanh

Mở `index.html` trong Codespaces hoặc chạy web server tĩnh:

```bash
python -m http.server 8080
```

Sau đó mở:

```text
http://localhost:8080/chapters/chapter-01/
```

## Pipeline render đề xuất

```text
chapter-data.js
  ↓
AI Comic Builder / ai-comic-studio
  ↓ character refs + storyboard
StoryDiffusion
  ↓ long-range identity consistency
ComfyUI
  ├─ IP-Adapter: character reference
  ├─ ControlNet OpenPose: pose
  ├─ ControlNet Lineart/HED: composition + clean line
  └─ Depth: academy/background perspective
  ↓
Krita AI Diffusion: sửa mắt/tay/tóc + inpaint
  ↓
Layout + bubble + SFX
```

## Quy tắc cốt truyện

- Đường Vũ Lân vẫn là trung tâm tuyến truyện nguyên tác.
- Lâm Mặc không thay thế thành viên Sử Lai Khắc Thất Quái.
- Thiên Nhãn mạnh ở quan sát/dự đoán nhưng không biến nhân vật thành vô địch.
- Chap 1 chỉ gieo bí mật Kim Long; không tiết lộ quá sớm toàn bộ thân phận/huyết mạch.
