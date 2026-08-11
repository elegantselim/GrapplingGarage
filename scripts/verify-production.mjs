import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const out = path.join(root, "out");
const expectedDomain = "https://grapplinggarage.tn";
const verificationToken = "IarFT5-k_ad2kMlerxg38_GDOVTBoKa1EiZXrlCSZ_s";
const failures = [];

async function read(relativePath) {
  try {
    return await readFile(path.join(root, relativePath), "utf8");
  } catch (error) {
    failures.push(`${relativePath}: ${error.message}`);
    return "";
  }
}

function requireMatch(name, value, pattern) {
  if (!pattern.test(value)) {
    failures.push(name);
  }
}

function requireText(name, value, expected) {
  if (!value.includes(expected)) {
    failures.push(name);
  }
}

const [index, arabic, english, employee, robots, sitemap, llms, rules, htaccess] = await Promise.all([
  read("out/index.html"),
  read("out/ar/index.html"),
  read("out/en/index.html"),
  read("out/espace-employe/index.html"),
  read("out/robots.txt"),
  read("out/sitemap.xml"),
  read("out/llms.txt"),
  read("firestore.rules"),
  read("out/.htaccess"),
]);

requireText("Homepage canonical URL is missing or wrong", index, `<link rel="canonical" href="${expectedDomain}/"`);
requireText("Arabic canonical URL is missing or wrong", arabic, `<link rel="canonical" href="${expectedDomain}/ar/"`);
requireText("English canonical URL is missing or wrong", english, `<link rel="canonical" href="${expectedDomain}/en/"`);
requireMatch("French page has the wrong document language", index, /<html lang="fr"/);
requireMatch("Arabic page has the wrong document language or direction", arabic, /<html lang="ar" dir="rtl"/);
requireMatch("English page has the wrong document language", english, /<html lang="en" dir="ltr"/);
requireText("Arabic page is missing its localized H1", arabic, "نادي جيوجيتسو وغرابلينغ ومصارعة في تونس");
requireText("English page is missing its localized H1", english, "BJJ, grappling and wrestling club in Tunis");
requireText("Arabic page is missing its localized title", arabic, "نادي جيوجيتسو وغرابلينغ في تونس | Grappling Garage");
requireText("English page is missing its localized title", english, "BJJ and Grappling Club in Tunis | Grappling Garage");
requireText(
  "Arabic page is missing its localized description",
  arabic,
  "نادي جيوجيتسو برازيلي وغرابلينغ ومصارعة في حي الرفاهة، تونس",
);
requireText(
  "English page is missing its localized description",
  english,
  "BJJ, grappling and wrestling club in Hay Rafaha, Tunis",
);
requireText("French page is missing the honest MMA FAQ", index, "ne propose pas de cours de MMA");
requireText("Arabic page is missing the honest MMA FAQ", arabic, "لا يقدم Grappling Garage حصص MMA");
requireText("English page is missing the honest MMA FAQ", english, "does not offer MMA classes");
requireText(
  "llms.txt must clarify that MMA classes are not offered",
  llms,
  "Grappling Garage does not offer MMA classes",
);

for (const [name, page] of [["French", index], ["Arabic", arabic], ["English", english]]) {
  requireMatch(`${name} page is not explicitly indexable`, page, /<meta name="robots" content="index, follow"/);
  requireText(`${name} page is missing French hreflang`, page, `hrefLang="fr-TN" href="${expectedDomain}/"`);
  requireText(`${name} page is missing Arabic hreflang`, page, `hrefLang="ar-TN" href="${expectedDomain}/ar/"`);
  requireText(`${name} page is missing English hreflang`, page, `hrefLang="en" href="${expectedDomain}/en/"`);
  requireText(`${name} page is missing x-default hreflang`, page, `hrefLang="x-default" href="${expectedDomain}/"`);
}
requireText(
  "Google verification meta tag is missing or wrong",
  index,
  `<meta name="google-site-verification" content="${verificationToken}"`,
);
requireText("robots.txt has the wrong host", robots, `Host: ${expectedDomain}`);
requireText("robots.txt has the wrong sitemap", robots, `Sitemap: ${expectedDomain}/sitemap.xml`);
requireText("robots.txt does not exclude the employee page", robots, "Disallow: /espace-employe");
requireText("sitemap.xml does not contain the canonical homepage", sitemap, `<loc>${expectedDomain}/</loc>`);
if ((sitemap.match(/<url>/g) || []).length !== 3) {
  failures.push("sitemap.xml must contain exactly three localized URLs");
}
requireText("sitemap.xml is missing the Arabic URL", sitemap, `<loc>${expectedDomain}/ar/</loc>`);
requireText("sitemap.xml is missing the English URL", sitemap, `<loc>${expectedDomain}/en/</loc>`);
if ((sitemap.match(/<xhtml:link rel="alternate"/g) || []).length !== 12) {
  failures.push("sitemap.xml must contain four reciprocal language alternates for each localized URL");
}
requireMatch("Employee page must be noindex", employee, /<meta name="robots" content="noindex, nofollow"/);
requireMatch("llms.txt is missing its H1 title", llms, /^# Grappling Garage\s*$/m);
requireMatch("llms.txt is missing its blockquote summary", llms, /^> \S.+$/m);
requireMatch("llms.txt is missing canonical Markdown resource links", llms, /^- \[[^\]]+\]\(https:\/\/grapplinggarage\.tn\/[^​)]*\): .+$/m);
requireMatch("Firestore schedule validation is missing", rules, /allow create, update: if validSchedule\(\);/);
requireText("HTTPS redirect is missing from .htaccess", htaccess, "RewriteCond %{HTTPS} !=on");
requireText("HSTS is missing from .htaccess", htaccess, "Strict-Transport-Security");
requireText("Content Security Policy is missing from .htaccess", htaccess, "Content-Security-Policy");
requireText("CSP does not upgrade insecure requests", htaccess, "upgrade-insecure-requests");
requireText("Long-lived immutable asset caching is missing", htaccess, "max-age=31536000, immutable");
requireText(
  "Exact Grappling Garage address is missing",
  index,
  "Hay Rafaha, Rue Abdallah, Rue Farhat Hached, Tunis 2094, Tunisie",
);
requireText(
  "Google Maps directions link is missing",
  index,
  "https://www.google.com/maps/dir/?api=1&amp;destination=Grappling%20Garage%2C%20Hay%20Rafaha",
);
requireText("Responsive AVIF media is missing", index, 'type="image/avif"');
requireText("Responsive WebP media is missing", index, 'type="image/webp"');
requireText("First-viewport media priority is missing", index, 'fetchPriority="high"');
requireText("Below-the-fold media lazy loading is missing", index, 'loading="lazy"');

try {
  const mediaFiles = (await readdir(path.join(out, "media"))).filter((file) => /\.(?:avif|webp)$/.test(file));
  if (mediaFiles.length !== 72) {
    failures.push(`Expected 72 responsive media variants, found ${mediaFiles.length}`);
  }
  for (const file of mediaFiles) {
    const mediaStat = await stat(path.join(out, "media", file));
    if (mediaStat.size > 100 * 1024) {
      failures.push(`${file} exceeds the 100 KB media budget`);
    }
  }
} catch {
  failures.push("Responsive media directory is missing");
}

if ([index, arabic, english].some((page) => /\b(?:src|href)=["']http:\/\//i.test(page) || /\bws:\/\//i.test(page))) {
  failures.push("A localized homepage export contains an insecure resource URL");
}

if (index.includes("grappling-garage.tn") || robots.includes("grappling-garage.tn") || sitemap.includes("grappling-garage.tn")) {
  failures.push("Export still contains the invalid hyphenated domain");
}

if (/Connexion à l’agenda|Se connecter|Identifiants Firebase/.test(employee)) {
  failures.push("Employee export still contains the removed Firebase login form");
}

try {
  const staticDirectory = await stat(path.join(out, "_next", "static"));
  if (!staticDirectory.isDirectory()) {
    failures.push("Static Next.js assets are missing");
  }
} catch {
  failures.push("Static Next.js assets are missing");
}

try {
  const htaccess = await stat(path.join(out, ".htaccess"));
  if (!htaccess.isFile()) {
    failures.push("Plesk .htaccess fallback is missing");
  }
} catch {
  failures.push("Plesk .htaccess fallback is missing");
}

if (failures.length > 0) {
  console.error("Production verification failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Production verification passed.");
console.log("llms.txt: 3/3 (H1 title, blockquote summary, linked resources).");
console.log(`Canonical production URL: ${expectedDomain}`);
