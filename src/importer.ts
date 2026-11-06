import * as mammoth from "mammoth";
import { unzipSync, zipSync, strFromU8, strToU8 } from "fflate";

const PAGE_MARKER = "XQZPAGEBREAKZQX";

interface MammothResult {
	value: string;
}

interface MammothModule {
	convertToMarkdown: (opts: { arrayBuffer: ArrayBuffer }) => Promise<MammothResult>;
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

	xml = xml.replace(
		/<w:br[^>]*w:type="page"[^>]*\/>/g,
		`<w:t xml:space="preserve">${PAGE_MARKER}</w:t>`
	);
	xml = xml.replace(
		/<w:lastRenderedPageBreak\/>/g,
		`<w:t xml:space="preserve">${PAGE_MARKER}</w:t>`
	);
	xml = xml.replace(
		/<w:sectPr[^>]*w:type="nextPage"[^>]*>/g,
		`<w:t xml:space="preserve">${PAGE_MARKER}</w:t><w:sectPr>`
	);

	files["word/document.xml"] = strToU8(xml);
	const newU8 = zipSync(files);
	const newBuf = newU8.buffer.slice(
		newU8.byteOffset,
		newU8.byteOffset + newU8.byteLength
	) as ArrayBuffer;

	const mammothMod = mammoth as unknown as MammothModule;
	const result = await mammothMod.convertToMarkdown({
		arrayBuffer: newBuf,
	});
	let md: string = result.value || "";

	md = md.replace(/<a\s+id="[^"]*"\s*><\/a>/g, "");
	md = md.replace(/XQZ\\?_?PAGEBREAK\\?_?ZQX/g, PAGE_MARKER);
	md = md.replace(new RegExp(`(${PAGE_MARKER}\\s*){2,}`, "g"), PAGE_MARKER);

	const chunks = md.split(PAGE_MARKER);

	const out: string[] = [];
	out.push("---");
	out.push("book-view: true");
	out.push("---");
	out.push("");

	let isFirstPage = true;

	for (let i = 0; i < chunks.length; i++) {
		let text = chunks[i].trim();
		if (i === 0 && !text) continue;

		if (!isFirstPage) {
			out.push("");
			out.push("---");
			out.push("");
		}

		const h1Match = text.match(/^#\s+(.+)$/m);
		if (h1Match) {
			out.push(`# ${h1Match[1].trim()}`);
			out.push("");
			text = text.replace(/^#\s+.+$/m, "").trim();
		}

		text = text.replace(
			/^(\s*)\(?\s*صفحه\s*([۰-۹0-9]+)\s*\)?(\s*)$/m,
			`$1**(صفحه $2)**$3`
		);

		out.push(text);
		isFirstPage = false;
	}

	void title;
	return out.join("\n");
}
