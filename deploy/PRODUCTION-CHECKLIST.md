# Production checklist

The only production domain is `https://grapplinggarage.tn` without a hyphen.

## 1. Plesk HTTPS

The live certificate currently covers both `grapplinggarage.tn` and
`www.grapplinggarage.tn`. HTTP and `www` permanently redirect to the canonical
HTTPS domain.

1. In Plesk, open Websites & Domains > `grapplinggarage.tn` > SSL/TLS
   Certificates > Let's Encrypt.
2. Issue one certificate covering `grapplinggarage.tn` and
   `www.grapplinggarage.tn`.
3. In Hosting Settings, select that certificate, set the preferred domain to
   `grapplinggarage.tn`, and enable the permanent HTTP-to-HTTPS redirect.
4. In Apache & nginx Settings, paste
   `deploy/plesk/additional-nginx-directives.conf` into Additional nginx
   directives and apply.

## 2. Google Search Console DNS

The authoritative DNS servers are `ns24.topnet.tn` and `ns54.topnet.tn`. Their
live TXT response contains the Google verification value. Keep this TXT record
alongside the existing SPF record:

```text
Type: TXT
Host/Name: @
Value: google-site-verification=IarFT5-k_ad2kMlerxg38_GDOVTBoKa1EiZXrlCSZ_s
TTL: 3600 (or provider default)
```

This command must continue to print the exact Google value:

```bash
dig +short TXT grapplinggarage.tn
```

## 3. Build and upload

```bash
npm install && npm run lint && npm run build
```

Copy everything inside `out/` directly into the Plesk document root. Do not
copy the `out` folder as an extra nested directory.

Deploy the Firestore validation rules once:

```bash
npx firebase-tools@latest login && npx firebase-tools@latest use grapplinggarage && npx firebase-tools@latest deploy --only firestore:rules
```

## 4. Google indexing

After HTTPS works and the TXT record is verified, submit
`https://grapplinggarage.tn/sitemap.xml` in Search Console. Use URL Inspection
for `https://grapplinggarage.tn/` and select Request indexing. Verification
proves ownership; it does not automatically submit the page for indexing.
