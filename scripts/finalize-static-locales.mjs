import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const out = path.join(process.cwd(), "out");
const locales = [
  { file: path.join(out, "ar", "index.html"), language: "ar", direction: "rtl" },
  { file: path.join(out, "en", "index.html"), language: "en", direction: "ltr" },
];

for (const locale of locales) {
  const html = await readFile(locale.file, "utf8");
  const localized = html.replace(
    /<html lang="fr"/,
    `<html lang="${locale.language}" dir="${locale.direction}"`,
  );

  if (localized === html) {
    throw new Error(`Could not set the document language for ${locale.file}`);
  }

  await writeFile(locale.file, localized);
}

console.log("Static locale document languages finalized.");
