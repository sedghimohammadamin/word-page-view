import { unzipSync, strFromU8 } from "fflate";

const PAGE_MARKER = "XQZPAGEBREAKZQX";

/**
 * استخراج متن ساده از document.xml (بدون mammoth)
 * این تابع پاراگراف‌ها را از XML استخراج می‌کند.
 */
function extractTextFromDocxXml(xml: string): string {
	const paragraphs: string[] = [];
	// هر پاراگراف <w:p> ... </w:p>
	const paraRegex = /<w:p[ >][\s\S]*?<\/w:p>/g;
	let paraMatch: RegExpExecArray | null;

	while ((paraMatch = paraRegex.exec(xml)) !== null) {
		const paraXml = paraMatch[0];
		// استخراج متن‌های <w:t>...</w:t>
		const textParts: string[] = [];
		const textRegex = /<w:t[^>]*>([\s\S]*?)<\/w:t>/g;
		let textMatch: RegExpExecArray | null;
		while ((textMatch = textRegex.exec(paraXml)) !== null) {
			textParts.push(textMatch[1]);
		}
		const text = textParts.join("");
		// unescape XML entities
		const unescaped = text
			.replace(/&amp;/g, "&")
			.replace(/&lt;/g, "<")
			.replace(/&gt;/g, ">")
			.replace(/&quot;/g, '"')
			.replace(/&apos;/g, "'");
		paragraphs.push(unescaped);
	}

	return paragraphs.join("\n");
}

export async function wordToPages(
	buffer: ArrayBuffer,
	title: string
): Promise<string> {
	const u8 = new Uint8Array(buffer);
	const files = unzipSync(u8);

	const docFile = files["word/document.xml"];
	if (!docFile) throw new Error("فایل docx معتبر نیست");

	let xml = strFromU8(docFile);

	// جایگزینی page break ها با marker
	xml = xml.replace(
		/<w:br[^>]*w:type="page"[^>]*\/>/g,
		`</w:p><w:p><w:r><w:t>${PAGE_MARKER}</w:t></w:r></w:p><w:p>`
	);
	xml = xml.replace(
		/<w:lastRenderedPageBreak\/>/g,
		`</w:p><w:p><w:r><w:t>${PAGE_MARKER}</w:t></w:r></w:p><w:p>`
	);

	// استخراج متن ساده
	const text = extractTextFromDocxXml(xml);

	// حالا مثل قبل صفحه‌بندی کن
	const chunks = text.split(PAGE_MARKER);

	const out: string[] = [];
	out.push("---");
	out.push("book-view: true");
	out.push("---");
	out.push("");

	let isFirstPage = true;

	for (let i = 0; i < chunks.length; i++) {
		let pageText = chunks[i].trim();
		if (i === 0 && !pageText) continue;

		if (!isFirstPage) {
			out.push("");
			out.push("---");
			out.push("");
		}

		const h1Match = pageText.match(/^#\s+(.+)$/m);
		if (h1Match) {
			out.push(`# ${h1Match[1].trim()}`);
			out.push("");
			pageText = pageText.replace(/^#\s+.+$/m, "").trim();
		}

		pageText = pageText.replace(
			/^(\s*)\(?\s*صفحه\s*([۰-۹0-9]+)\s*\)?(\s*)$/m,
			`$1**(صفحه $2)**$3`
		);

		out.push(pageText);
		isFirstPage = false;
	}

	void title;
	return out.join("\n");
}
