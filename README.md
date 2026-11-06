# Word Page View

Display your Obsidian notes as paginated book pages — with page cards, footnotes, colorful comments, highlights, and Word import.

## Features

- **Paginated view** — each note is split into page cards by `---`
- **Four themes** — white, milky, cream, black
- **Comments** — add colorful comments on any text, with tooltip and editing
- **Word import** — convert `.docx` files directly to notes
- **Page links** — `[[file#58]]` opens and scrolls to page 58 with highlight
- **Footnote editing** — footnotes are editable separately from main text
- **Page editing** — edit the whole page, footnotes stay intact
- **Backlinks** — files that link to this page are shown at the bottom
- **Text highlight** — right-click on a paragraph to highlight

## Usage

1. Create a note with this frontmatter:

    ---
    book-view: true
    ---

2. Separate pages with `---`:

    ---
    book-view: true
    ---

    # Lesson title

    (page 1)

    First page text...

    ---

    (page 2)

    Second page text...

3. Open the note in Preview mode — it renders as a book automatically.

## Word Import

1. Settings → Word Page View → Import from Word
2. Select a `.docx` file
3. A new note with auto-pagination is created

## Shortcuts

- **Right-click** on a paragraph → highlight
- **Cmd/Ctrl + Enter** in edit mode → save
- **Esc** in edit mode → cancel

## Settings

| Setting | Description |
|---------|-------------|
| Theme | White, milky, cream, black |
| Card width | Page card width (px) |
| Body font | Body text font and size |
| Header font | Header font and size |
| Footnote color | Footnote text and highlight color |
| Start page number | If numbers do not match Word |
| Show lesson title | Show H1 at top of each page |
| Show page number | Show number in header |

## Installation

### From Obsidian Community Plugins

Settings → Community Plugins → Browse → search: **Word Page View**

### Manual

1. Download from [Releases](https://github.com/sedghimohammadamin/word-page-view/releases)
2. Place `main.js`, `manifest.json`, `styles.css` in `.obsidian/plugins/word-page-view/`
3. Restart Obsidian
4. Settings → Community Plugins → Word Page View → Enable

### BRAT

1. Install BRAT
2. Add Beta Plugin → `sedghimohammadamin/word-page-view`

## License

MIT — [LICENSE](LICENSE)

## Author

Mohammad Amin Sedghi

---

<div dir="rtl">

## 📖 نسخه فارسی

نمایش صفحه‌بندی‌شده یادداشت‌های Obsidian به شکل کتاب — با کارت‌های صفحه، پاورقی، کامنت رنگی، هایلایت و ایمپورت از Word.

### ✨ امکانات

- **نمایش صفحه‌ای** — هر یادداشت با `---` به کارت‌های صفحه تقسیم می‌شود
- **چهار تم** — سفید، شیری، کرمی، سیاه
- **کامنت** — روی هر متن کامنت رنگی بگذار، با tooltip و ویرایش
- **ایمپورت Word** — فایل `.docx` را مستقیم به یادداشت تبدیل کن
- **لینک به صفحه** — `[[file#58]]` باز می‌کند و اسکرول می‌کند به صفحه ۵۸ با هایلایت
- **ویرایش پاورقی** — پاورقی‌ها جدا از متن اصلی قابل ویرایش‌اند
- **ویرایش صفحه** — کل صفحه را ویرایش کن، پاورقی‌ها دست‌نخورده می‌مانند
- **بک‌لینک** — فایل‌هایی که به این صفحه لینک دارند، ته کارت نمایش داده می‌شوند
- **هایلایت متن** — راست‌کلیک روی پاراگراف برای هایلایت

### 🚀 استفاده

۱. یک یادداشت با frontmatter زیر بساز:

    ---
    book-view: true
    ---

۲. صفحات را با `---` از هم جدا کن:

    ---
    book-view: true
    ---

    # عنوان درس

    (صفحه ۱)

    متن صفحه اول...

    ---

    (صفحه ۲)

    متن صفحه دوم...

۳. یادداشت را در حالت Preview باز کن — خودکار به شکل کتاب نمایش داده می‌شود.

### 🛠 نصب

Settings → Community Plugins → Browse → جستجو: **Word Page View**

### 📝 مجوز

MIT — [LICENSE](LICENSE)

### 👤 نویسنده

Mohammad Amin Sedghi

</div>
