# Digital Printing

A complete digital printing business website built with Next.js App Router, strict TypeScript, Tailwind CSS, Motion and Lucide React. It exports to static HTML, CSS and JavaScript for Cloudflare Pages. There is no database, authentication, server API, dashboard or contact form.

## Local setup

Use Node.js 24 LTS and npm. The `.node-version` file declares the build version.

```bash
cd digital-printing
npm install
npm run dev
```

Open <http://localhost:3000>. On Windows PowerShell, if execution policy blocks `npm.ps1`, use `npm.cmd install` and `npm.cmd run dev`; no policy changes are needed.

```bash
npm run lint
npm run typecheck
npm run format:check
npm run build
npm run check:export
npm run preview
```

`npm run build` generates the deployment-ready `out/` folder. `npm run preview` serves that folder at <http://localhost:3000>; stop the development server first if it uses that port. Use a different port for preview by setting the optional local `PORT` process variable. The application itself needs no environment variables. `next start` is not used with static export.

The build includes `scripts/finalize-export.mjs`, which adds the dot-separated navigation data filenames expected by Next.js when Windows exports nested filenames. It is a no-op on correctly generated Linux exports. Keep it in the build command so client navigation and prefetch work on the deployed static site.

## Pages and editable content

| File                             | Purpose                                                                             |
| -------------------------------- | ----------------------------------------------------------------------------------- |
| `src/data/business.ts`           | Business name, phone, WhatsApp number, email, address, hours and canonical site URL |
| `src/data/services.ts`           | All 12 services: descriptions, images, options, intended uses and metadata inputs   |
| `src/data/gallery.ts`            | Gallery images, captions, categories and layout hints                               |
| `src/data/navigation.ts`         | Main navigation links                                                               |
| `src/components/layout/Logo.tsx` | Reusable text wordmark; replace with the client's logo here                         |
| `src/app/globals.css`            | Shared design system and responsive styling                                         |
| `public/images/`                 | Optimized local WebP product imagery                                                |

Routes: `/`, `/services/`, `/services/[slug]/`, `/gallery/`, `/about/`, `/contact/`. All 12 service detail pages are generated from one reusable route with `generateStaticParams`. Unknown routes receive a designed 404 page.

The gallery supports live category filtering, a native modal lightbox, next/previous buttons, arrow keys, Escape, mobile swipes, focus trapping and focus restoration. The mobile navigation uses a native modal with Escape support. Motion respects reduced-motion preferences. Standard links, text and images remain available without JavaScript; interactive gallery filtering and lightboxes require JavaScript.

## Client details to replace

The client has not supplied business contact information. `src/data/business.ts` deliberately contains the requested editable placeholders. Replace the phone/WhatsApp numbers, email, address, opening hours and `siteUrl` with verified client details before promoting the site publicly. Confirm service and finishing availability as well.

- `phone`: the verified international number including `+94`. The Call Us buttons automatically become `tel:` links. Until configured they lead to the contact page, where phone details are shown as pending.
- `phoneDisplay`: the formatted number shown to visitors.
- `whatsapp`: verified international digits only, without `+` or spaces. Every WhatsApp button uses this one value. With no verified number, WhatsApp opens its recipient chooser with the prepared message; it cannot yet contact the business directly.
- `email`: the provided `hello@digitalprinting.lk` placeholder is already wired with `mailto:`; confirm the mailbox before launch.
- `address` and `directionsUrl`: the real business address and verified Google Maps URL. The Get Directions action appears when a URL is configured. There is no fabricated map or location.
- `hours`: confirm actual days and hours.
- `siteUrl`: set the actual deployed origin, without a trailing slash. This controls canonical URLs, Open Graph URLs, robots and sitemap. Rebuild after changing it.

The initial images illustrate printing products. They are not claimed to be completed client work or photographs of the client's premises. Replace them with actual business photography when available. Generation prompts and file locations are documented in [ASSETS.md](ASSETS.md).

## Create and push a GitHub repository

1. Sign into GitHub and [create an empty repository](https://github.com/new), for example `digital-printing`. Leave its README, license and `.gitignore` unselected since these files are already in this project.
2. Run the following from the directory containing `package.json`, replacing the repository URL with your own. A separate `github` remote preserves any existing Sites hosting remote.

```bash
git init
git add .
git commit -m "Build Digital Printing business website"
git branch -M main
git remote add github https://github.com/YOUR_USERNAME/digital-printing.git
git push -u github main
```

Authenticate through GitHub's supported Git credential manager or SSH flow. Never place tokens in source files or remote URLs. Commit `package-lock.json` and all `public/` assets. The ignore file excludes dependencies, build output, local asset metadata and screenshots.

## Deploy on Cloudflare Pages through GitHub

The current production project is **digital-printing**, hosted at <https://digital-printing-b62.pages.dev>. It uses Direct Upload. Run `npm run deploy:cloudflare` after authenticating with `npx wrangler login` to update it. The script explicitly deploys the `main` production branch.

For automatic GitHub builds, create a separate Git-integrated Pages project using the steps below; a Direct Upload project cannot be converted to Git integration.

1. Sign into the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. Open **Workers & Pages → Create application → Pages → Import an existing Git repository**.
3. Connect GitHub, authorize the repository and select `digital-printing`.
4. Use these settings:

| Setting                           | Value                                                 |
| --------------------------------- | ----------------------------------------------------- |
| Framework preset                  | Next.js (Static HTML Export)                          |
| Production branch                 | `main`                                                |
| Root directory                    | Repository root (directory containing `package.json`) |
| Build command                     | `npm run build`                                       |
| Build output directory            | `out`                                                 |
| Node.js                           | `24`, as declared in `.node-version`                  |
| Application environment variables | None                                                  |

If the whole parent folder is committed instead, set Root directory to `digital-printing`. The preset's default `npx next build` should be replaced by `npm run build` to include the Windows navigation compatibility step. `wrangler.toml` also declares the Pages output directory.

5. Select **Save and Deploy**. Cloudflare installs dependencies, builds the static export and publishes it at the assigned `*.pages.dev` URL.
6. Set `businessInfo.siteUrl` to that URL, commit and push. Cloudflare rebuilds automatically. A later custom domain replaces this value.
7. Check the homepage, a directly loaded service URL, client navigation, gallery filtering/lightbox and the contact links at the deployed URL.

The `public/_headers` file adds security and static asset caching headers to the export. Keep the generated root `404.html` so unknown routes return the proper 404 response. No SPA catch-all redirect, Worker function, `@cloudflare/next-on-pages`, OpenNext adapter or image optimization server is needed. Next/Image uses a static custom loader that selects locally prepared 384px, 640px, 960px or original WebP files. The development and build scripts automatically prepare missing or updated image variants.

Reference: [Cloudflare's Next.js static deployment guide](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/) and [Next.js static export documentation](https://nextjs.org/docs/app/guides/static-exports).

## Optional direct deployment with Wrangler

For a new Cloudflare Pages project configured for direct upload, authenticate once and run the following. The current `digital-printing` project already exists, so skip its creation command and use `npm run deploy:cloudflare` for updates.

```bash
npx wrangler login
npx wrangler@4.151.0 pages project create digital-printing --production-branch main --force
npm run deploy:cloudflare
```

The deploy script runs the complete build and uploads `out/` using the project name in `wrangler.toml`. Replace that name consistently if you choose another. Use the Git integration above when you want automatic rebuilds from GitHub. The client must supply their own Cloudflare account access to deploy under their account; the codebase does not include account credentials.

## Add a custom domain later

1. Buy or use the client's domain.
2. Open the Pages project and choose **Custom domains → Set up a custom domain**.
3. Enter the apex domain or subdomain and follow Cloudflare's domain verification and DNS instructions. An apex domain normally needs its zone and nameservers managed in the same Cloudflare account; a subdomain can use the prescribed CNAME from another DNS provider.
4. Wait for the domain and HTTPS certificate to become active.
5. Update `businessInfo.siteUrl` to the preferred HTTPS custom domain, commit and push. The next build updates all canonical and social metadata, `robots.txt` and `sitemap.xml`.
6. If using both apex and `www`, configure the alternate hostname to redirect to the preferred one through Cloudflare's redirect settings.

Reference: [Cloudflare Pages custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/).

## Browser checks

The automated browser checks cover all pages and images, WCAG AA findings, horizontal overflow at 320/390/768/1024/1440px, mobile navigation, filtering, lightbox focus and controls, direct contact link construction, reduced motion and 404 handling. Automated accessibility checks complement manual review; they do not certify complete accessibility conformance.

In one terminal, run `npm run preview`. In another:

```bash
npx playwright install chromium
npm run check:browser
```

Or use installed Chrome without downloading a browser. On PowerShell:

```powershell
$env:BROWSER_CHANNEL = 'chrome'
npm.cmd run check:browser
```

Screenshots and accessibility reports are written to ignored `artifacts/`. `PREVIEW_URL` optionally targets another preview address; it is only a test setting, not an application requirement.

## Replace or optimize images

Keep descriptive filenames and alt text. For a new photo:

```bash
node scripts/optimize-images.mjs path/to/photo.jpg public/images/services/business-card-printing.webp 1400
```

Gallery images lazy-load. The hero image is preloaded with high fetch priority, the Manrope variable Google Font is self-hosted through `next/font/local` and its SIL license is included in `public/fonts/OFL.txt`. Motion features load separately through LazyMotion, and the lightbox is loaded only when needed. The static image loader selects responsive variants without a server. Do not add remote background videos or large image files without optimizing them.
