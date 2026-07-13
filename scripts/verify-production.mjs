import { readFile, stat } from "node:fs/promises";
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

const [index, employee, robots, sitemap, llms, rules] = await Promise.all([
  read("out/index.html"),
  read("out/espace-employe/index.html"),
  read("out/robots.txt"),
  read("out/sitemap.xml"),
  read("out/llms.txt"),
  read("firestore.rules"),
]);

requireText("Homepage canonical URL is missing or wrong", index, `<link rel="canonical" href="${expectedDomain}/"`);
requireText(
  "Google verification meta tag is missing or wrong",
  index,
  `<meta name="google-site-verification" content="${verificationToken}"`,
);
requireText("robots.txt has the wrong host", robots, `Host: ${expectedDomain}`);
requireText("robots.txt has the wrong sitemap", robots, `Sitemap: ${expectedDomain}/sitemap.xml`);
requireText("robots.txt does not exclude the employee page", robots, "Disallow: /espace-employe");
requireText("sitemap.xml does not contain the canonical homepage", sitemap, `<loc>${expectedDomain}</loc>`);
requireMatch("sitemap.xml must contain exactly one indexable URL", sitemap, /^((?!<url>).)*<url>((?!<url>).)*<\/url>((?!<url>).)*$/s);
requireMatch("Employee page must be noindex", employee, /<meta name="robots" content="noindex, nofollow"/);
requireMatch("llms.txt is missing its H1 title", llms, /^# Grappling Garage\s*$/m);
requireMatch("llms.txt is missing its blockquote summary", llms, /^> \S.+$/m);
requireMatch("llms.txt is missing canonical Markdown resource links", llms, /^- \[[^\]]+\]\(https:\/\/grapplinggarage\.tn\/[^​)]*\): .+$/m);
requireMatch("Firestore schedule validation is missing", rules, /allow create, update: if validSchedule\(\);/);

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
