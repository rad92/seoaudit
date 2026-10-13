# SEO Audit: orbitalx.com

**Audit date:** 2026-10-13 (v3, with Semrush, Google Search Console and competitor data)
**Site:** https://orbitalx.com/ (ABM and B2B pipeline agency for lean marketing teams, London + Cebu)
**Overall health:** 🔴 Critical. The technical base is sound: HTTPS, clean canonicals, a working sitemap, unique titles and one H1 per page. There are about 50 solid long-form guides. But **organic search brings in almost no new business.** Semrush estimates about **150 US visits a month, and 97% of them are people searching the brand name "orbital x"**. Not one service page ranks in the top 50 for a non-brand keyword. The crawl explains why: 96 pages share one meta description, about 100 articles can only be reached through the sitemap, the guides don't link to the service pages, and several pages compete for the same terms.

> **How this audit was done.**
> 1. **A full crawl of all 152 sitemap URLs** (13 Oct 2026). For each page I extracted the status code, title, meta description, canonical, robots tag, Open Graph tags, headings, JSON-LD, images, internal links and word count. I also tested robots.txt, URL variants, pagination, the 404 page, the homepage assets and the `app.` subdomain.
> 2. **Two Semrush exports** (Organic Positions and Organic Pages, **US** database, 12 Oct 2026): 97 ranking rows, 65 unique keywords, 39 pages.
>
> Semrush traffic numbers are estimates. Use them for direction and relative size, and confirm against Google Search Console. The data covers the **US only**. OrbitalX prices in £ and is based in London, so pull a **UK** export too (§7).
> Backlinks, index coverage and Core Web Vitals are still unverified (§7).
>
> The page-by-page data and the keyword tables are in **`orbitalx-seo-audit.xlsx`**.

---

## 0a. Semrush snapshot (US, 12 Oct 2026)

| Metric | Value | What it means |
|---|---|---|
| Ranking keywords (top 100) | **65 unique** (97 rows, because some keywords rank with more than one URL) | Very small footprint for 150 indexed pages |
| Est. organic traffic | **~150 visits/month** | **136 (91%) go to the homepage for "orbital x"**, and 10 more go to `www.orbitalx.com` for the same term |
| Non-brand traffic | **~3 visits/month** | From "larger market formula" (#2), "performance marketing job category signals" (#11) and "withorbital" (#14) |
| Best-position distribution | 1–3: **4** · 4–10: **0** · 11–20: **9** · 21–50: **24** · 51–100: **28** | Most rankings sit on pages 3–10 |
| Pages with any traffic | **6 of 39** ranking pages | 33 pages rank for something but get no clicks |
| Service pages | `/services/abm` ranks for one keyword ("abx campaign", **#80**). The other service pages rank only for "orbital x", at #61–92. | **The money pages are invisible.** |
| Keyword intent (unique) | Informational 41 · Commercial 9 · Commercial + informational 8 · Navigational 7 | The commercial terms all rank #17–85 |
| Top keyword page | `/resources/account-based-marketing-tools`: **15 keywords, all ranking #41–85** | Includes "account based marketing platform" (#73, CPC **$91.81**), "account based marketing vendors" (#76, vol 320), "account based marketing planning services" (#69, vol 170) |
| AI answer engines | `demand-gen-vs-performance-max` (Google), `b2b-account-based-marketing` (Google AI Overview, #1 for "programmatic advertising b2b"), `demand-gen-funnel` (SearchGPT) | Some AI citations already happen, so there's a base for AI search work |
| Lost ground | `/resources/b2b-marketing-strategies`: traffic change **-3** (it now ranks for nothing) | |

**Brand searches are messy.** "orbital x" (170/mo) ranks #1, but Google also shows `www.orbitalx.com` (#10, knowledge panel), `app.orbitalx.com` (#84, #88) and nine other site pages. The site also turns up for look-alike names it shouldn't care about: "orbitx" (4,400/mo, #52, via `app.`), "orbit x", "orbital inc.", "orbital software", "orbital tech", "orbital company", "asteroidx", "billionx".

---

## 0c. Google Search Console (11 Jul – 10 Oct 2026)

| Metric | Value | What it means |
|---|---|---|
| Clicks / impressions | **886 / 31,342** (CTR 2.83%) | |
| Avg position, first 30 days → last 30 days | **20.9 → 11.6** | Rankings improved a lot, but clicks rose only ~19% (249 → 296) |
| Clicks to brand pages (home, team, www, contact) | **779 of 900 page clicks (87%)** | Confirms the Semrush picture: search traffic is almost all brand |
| Blog (`/resources/*`) | **25,411 impressions, 77 clicks (0.30% CTR)** | Google already shows the content. The snippets don't earn clicks (see 1.1). |
| Page-1 pages with <1% CTR | `demand-gen-vs-performance-max` (3,004 impr, pos 7.8, 0.6%), `how-to-measure-marketing-qualified-leads-effectively` (1,700, pos 7.0, 0.06%), StackOne case study (1,010, pos 8.6, 0 clicks), `the-larger-market-formula…` (715, pos 7.6, 0.4%) | Fastest wins: rewrite titles and metas, then refresh the content |
| Service pages | `/services/ai-agents` pos 2.6, 1,423 impr, 0.21% CTR. `/services` pos 3.3, 0.19%. `/platform` pos 3.3, 0.23%. | These impressions come from brand sitelinks, not from non-brand rankings |
| Countries | UK: 38% of clicks, 9.8% CTR. US: **48% of impressions** but 0.76% CTR (pos 20). | The UK is the market that converts. Get a UK Semrush export. |
| 404 URLs still in Google | `/services/earned` (4 clicks, 67 impr), `/resources-v2`, `/resources/demand-net-vs-performance-max`, `/resources/account-abased-marketing-tools`, `/blog-categories/brand-storytelling` | 301 them (Redirect Map tab) |
| Subdomains in Google | `app.` (487 impr), `www.` (630), `domorewithless.` + `episode4/5/6.`, `marketingunderattack-uk/au.`, `fixcoldoutbound.` | Noindex `app.`. Fix or retire the microsites; their SSL handshake failed from the audit environment. |

## 0d. Competitors (search results, 13 Oct 2026)
- **Direct UK ABM competitors:** strategicabm (ABM-only, strategy and enablement, G2 presence) and Gripped (content-led SaaS agency that ranks its own ABM agency guide). Directive (performance-led, with a UK subfolder) competes on demand gen.
- **Roundups and directories dominate the shortlist searches.** Results for "best ABM agencies" and "best demand generation agencies UK" are almost all roundups (Blend, Polaris, B2B Marketing, Directive UK, Digital Litmus, OneMetrik, GTM 8020, RevvGrowth, Growth Syndicate, bestabmagencies, PipeRocket, 310 Creative). **OrbitalX isn't listed in any of them.** It has a Clutch profile, but no G2, salesforge or syncgtm listing.
- **Open ground:** results for "GTM engineering agency" are mostly job posts and fractional firms. A pillar page plus a service page could rank early.
- The full competitor table, the results landscape and the outreach list are in the workbook.

## 0b. Crawl snapshot

| Metric | Value | Comment |
|---|---|---|
| URLs in sitemap | 152 (121 `/resources/*`, 9 blog categories, 4 resource types, 7 services, 11 other) | All return 200 with no redirects ✅ |
| Self-referencing canonicals | 152 / 152 | ✅ Trailing-slash and `?utm` variants canonicalise correctly |
| One H1 per page | 152 / 152 | ✅ |
| Unique titles | 151 / 152 | One duplicate pair (see 1.3) |
| **Pages using the sitewide default meta description** | **96** (83 articles + all 13 category and type pages) | 🔴 See 1.1 |
| Structured data | `Organization` only, on every page | No Article, BreadcrumbList, Service, Person or FAQ markup |
| Open Graph image | **1 image for all 152 pages** | Every shared article looks the same on LinkedIn |
| Articles under 600 words | 30 of 120 | Mostly podcast, webinar and download stubs |
| Long-form guides (2,000+ words) | 52 | Median of **0 in-body links to a service page** |
| Pages with ≤1 internal link pointing to them | 26 | Effectively orphaned (see 1.2) |
| Homepage HTML size | 572 KB (176 KB of inline SVG, 168 `<img>`, 138 PNG) | Service pages are 570–585 KB each |

---

## 1. Critical issues 🔴

### 1.1 96 pages share one generic meta description
Every page below uses the same default:
> "OrbitalX builds profitable pipeline for lean B2B marketing teams. An entire team, AI system, and performance for the price of one marketing hire."

That covers **83 articles**, including all the big SEO guides (`account-based-marketing-tools`, `b2b-go-to-market-strategy`, `lead-generation-cost-per-lead`, `performance-marketing-tools`, `demand-gen-agency`, `b2b-marketing-plan`…), plus all 9 `/blog-categories/*` and 4 `/resource-types/*` pages.

**Why it matters:** Google usually rewrites a meta description that doesn't match the query, but a page-specific one still affects click-through rate and is what shows when people share the link. With 96 identical descriptions, every SERP listing and LinkedIn share looks the same and says nothing about the article.
**Fix:** The CMS is **Statamic with SEO Pro** (`?p=seo_pro_og` in the OG image URL). Set up SEO Pro to fall back to the entry's excerpt or summary field instead of the site default. Then hand-write descriptions for the 52 long-form guides first. Drafts for the top 10 are in §5.

### 1.2 About 100 articles are effectively orphaned, because pagination doesn't work for crawlers
- `/resources` links to **20 articles**. `/resources?page=2` returns **the same 20 articles** and canonicalises to `/resources`. The rest of the library loads in a way a crawler can't follow.
- **26 sitemap pages have only one internal link pointing to them** (category pages, podcast and webinar pages, `how-lean-marketing-teams-can-still-dominate-their-market`, `marketing-under-attack-*`, the "flywheel" posts and others). `/faqs` has just one link pointing to it.
- The categories `actionable-strategies` and `education` aren't linked from the `/resources` hub at all.

**Why it matters:** Pages that Google finds only through the sitemap get little internal PageRank and get recrawled less often. The 50 long-form guides you've invested in are hidden two or three levels deep.
**Fix:**
1. Make pagination real: `/resources?page=2` (or `/resources/page/2`) should list articles 21–40, use a **self-referencing canonical** and be linked with plain `<a href>` links. If you keep a "Load more" button, it also needs a crawlable `href` fallback.
2. Link the `/faqs` page from the footer and from every FAQ block.
3. Add "Related articles" (3–5 links on the same topic) to each article template.

### 1.3 Duplicate and near-duplicate pages
| Keep | Retire (301 → keep) | Text overlap |
|---|---|---|
| `/resources/to-gate-or-un-gate-strategies-on-how-to-make-your-b2b-brand-binge-able` | `…-binge-able-webinar` (same title, 278 words) | **100%** |
| `/resources/early-stage-critical-moments-podcast` | `/resources/early-stage-critical-moments-full-episodes` | 87% |
| `/resources/how-to-prevent-a-pipeline-performance-slump-without-increasing-spend` | `…-slump-in-2025-without-increasing-spend` (dated) | 77% |
| `/resources/how-not-to-get-fired-as-a-cmo` (886 words) | `/resources/marketing-under-attack-how-not-to-get-fired-as-a-cmo` (440 words) | Same topic. Merge, or cross-link if one is the video version. |
| `/resources/the-4-step-flywheel-effect-a-proven-evergreen-framework-for-gtm-success` | `/resources/the-four-step-flywheel-effect-that-is-defining-gtm-success-in-2025` | Same topic. Merge. |
| `/resources/marketing-per-marketer-how-b2b-will-measure-success-for-the-next-decade` | `/resources/the-future-b2b-marketing-metric-marketing-per-marketer-mpm` | Same topic. Merge. |
| `/resources/the-portfolio-pipeline-marketing-blueprint` | `/resources/portfolio-pipeline-blueprint-pe-backed-growth` | Same asset. Pick one. |

Remove the retired URLs from the sitemap once the 301s are live.

### 1.4 Three pages compete for "account-based marketing services"
| Page | Title / H1 |
|---|---|
| `/` | H1: **"The ABM agency for lean B2B teams"**. Title: "B2B Pipeline Marketing for Lean Teams" |
| `/services/abm` | "Account-Based Marketing Services \| 1:Many, 1:Few & 1:1 ABM" |
| `/resources/account-based-marketing-services` | "Account-Based Marketing Services: Why B2B Teams Need a Signal-Based System" |

The same thing happens with demand generation: `/services/demand-generation` ("B2B Demand Generation Agency") and `/resources/demand-gen-agency` ("Choosing a Demand Gen Agency…") target the same "demand gen agency" intent.

On top of that, **46–63% of the text on each of the four main service pages is copied from the homepage** ("B2B marketing is broken", "One system that runs your entire pipeline engine", "What it costs to build this yourself", testimonials and FAQs).

**Why it matters:** When several URLs compete for one query, Google often rotates between them and none ranks well. Heavy template duplication also makes the service pages look less distinct.
**Fix:**
- Make `/services/abm` the ABM money page. Point the homepage at the brand plus a broader term. Suggested title: `OrbitalX | ABM & Demand Generation Agency for Lean B2B Teams`. Link the homepage's ABM section to `/services/abm` with the anchor "account-based marketing services".
- Retitle the blog post to informational intent, for example "What to Expect From Account-Based Marketing Services (and How to Evaluate Them)". Make it link to `/services/abm`. Do the same for `/resources/demand-gen-agency` → `/services/demand-generation`.
- Rewrite at least the "broken", "how it works" and FAQ blocks on each service page so they're specific to that service. Keep the shared proof bar and testimonials.

**Semrush shows the cannibalization in action:**
| Keyword (vol, CPC) | Ranking URL(s) | Should rank |
|---|---|---|
| demand gen company (480, $39.51) | `/blog-categories/demand-generation` **#25**, a category page with 640 words and the default meta description | `/services/demand-generation` |
| demand gen firm (110) | `/resources/demand-gen-agency` #59, #60 | `/services/demand-generation` |
| account based marketing planning services (170) | `/resources/account-based-marketing-tools` #69, #74 | `/services/abm` |
| leading account-based marketing consulting options… (40) | `/resources/account-based-marketing-tools` #85 | `/services/abm` |
| top services for scaling account-based marketing (50) | `/resources/account-based-marketing-tools` #39 | `/services/abm` |
| abm personalization tools (70) | `account-based-marketing-personalization` #46 **and** #78, plus `account-based-marketing-tools` #52 | One page (the tools post) |
| performance marketing job category signals (210) | `performance-marketing-tools` #11, #21, plus `demand-gen-software` #38, #54 | `performance-marketing-tools` |
| demand gen vs. lead gen (40) | `demand-gen-vs-performance-max` **#38** (wrong page) | `lead-generation-vs-demand-generation…` (#69, #92) |
| demandx (50) | `/blog-categories/demand-generation` #26, `demand-gen-software` #70 | — (brand look-alike) |

### 1.5 The service pages rank for nothing, and blog posts take their commercial searches
- Across 6 service pages plus `/services`, the only non-brand ranking is `/services/abm` at **#80 for "abx campaign"**.
- Searches with clear service intent ("…planning services", "…consulting options", "demand gen company", "demand gen firm") go to a **blog post or a category page** instead, at positions #25–85.
- The causes are all in the crawl: the service pages share 46–63% of their text with the homepage (1.4), get no in-text links from the guides (2.1), are linked only from the nav and footer, and are thin for money pages (`/services/paid` 568 words, `/services/owned` 850).

**Fix (in this order):**
1. Make the service pages distinct from the homepage (1.4).
2. Add links from the guides that Google already associates with these terms, using descriptive anchors. Example: `account-based-marketing-tools` (15 ranking keywords) → `/services/abm` with the anchor "account-based marketing services". `demand-gen-agency` and `/blog-categories/demand-generation` → `/services/demand-generation` with "B2B demand generation agency".
3. Give `/blog-categories/demand-generation` a proper intro that sends readers to `/services/demand-generation`, so Google can tell the hub from the money page.
4. Add commercial sections to each service page: pricing and engagement models, "ABM agency vs in-house", process timeline, client logos for that service, and service-specific FAQs with `FAQPage` / `Service` schema.

### 1.6 `app.orbitalx.com` (a white-labelled Smartlead app) is indexed and ranks for the brand
- `https://app.orbitalx.com/` returns 200 with the title **"Smartlead"** and no `noindex`. Its robots.txt explicitly allows `/`, `/login` and `/sign-up`.
- Semrush shows it ranking for "orbital x" (#84, #88), "orbitx" (#52, 4,400/mo), "orbit x" (#51) and "orbit-x" (#46).

**Why it matters:** A third-party product name shows up in brand search results. The page competes with the main site for brand terms, and the login page is a poor result for someone searching "orbital x".
**Fix:** Send `X-Robots-Tag: noindex` (Netlify `_headers` file) on every `app.` route. Keep crawling allowed until the pages drop out of Google, then you can add a disallow. Change the app's `<title>` to "OrbitalX Platform Login".

### 1.7 `www.orbitalx.com` still shows in Google
Semrush records `https://www.orbitalx.com/` ranking #10 for "orbital x" (knowledge panel), with about 10 visits/month (6.7% of all traffic). The site 301s www to non-www correctly. The likely cause is the knowledge panel or Google Business Profile still pointing at the www URL, together with the `www.` sitemap line in robots.txt (2.10) and the `www.` internal links (2.11).
**Fix:** Fix 2.10 and 2.11. Update the website URL in Google Business Profile, LinkedIn and the other `sameAs` profiles to `https://orbitalx.com/`. In GSC, check that the non-www property is the one that's indexed.

---

## 2. Important issues 🟡

| # | Finding | Evidence | Fix |
|---|---|---|---|
| 2.1 | **The guides don't pass authority to the service pages** | The 52 guides of 2,000+ words have a median of **0 in-body links** to `/services/*`. They link to services only through the nav and footer. | Add 1–3 contextual links in each guide, e.g. `account-based-marketing-tools` → `/services/abm`, `b2b-marketing-automation` → `/services/ai-agents`, `gtm-systems` → `/services/gtm-engineering`. Add an end-of-article CTA module for each service. |
| 2.2 | **No Article, author or breadcrumb schema, and no visible bylines** | Every page has only `Organization` JSON-LD. Articles show a date but **no author**. | Add `BlogPosting` (headline, datePublished, dateModified, image, author → `Person`) and `BreadcrumbList`. Show an author box with a bio. The founders (Stuart Dale, James Ford, Joshua Arnold) are obvious bylines, and this matters for E-E-A-T and for citations in AI search. |
| 2.3 | **Organization schema has errors and gaps** | `services` isn't a valid Organization property. `founders` is superseded by `founder`. `logo` points to **`cdn.prod.website-files.com`** (an old Webflow CDN, apparently left over from a migration). The address has no street, but the footer shows "12 Red Lion Square, London WC1R 4QH". The only phone is the PH number `+63…`. `sameAs` lists only LinkedIn. | Host the logo on orbitalx.com. Switch to `hasOfferCatalog` / `makesOffer`. Add the full London and Cebu addresses (two `PostalAddress` / `location` entries). Add `sameAs` for the podcast, YouTube and founders' LinkedIn profiles. Validate in the Rich Results Test. |
| 2.4 | **Category and type pages are thin and unlabelled** | Titles and H1s are raw slugs: `actionable-strategies \| OrbitalX`, `education \| OrbitalX`. None of the 13 taxonomy pages has intro copy or a unique meta description. `content-and-brand` (124 words), `gtm-engineering` (156) and `pipeline-plays` (173) are near-empty. | Give each one a proper name ("Actionable B2B Marketing Strategies"), a 100–200 word intro linking to the matching service, and a unique meta description. Noindex or merge any category with fewer than 3 posts. |
| 2.5 | **30 thin resource pages** | Under 600 words each: `orbitalx-culture` (267), `james-demand-generation-playbook` (269), `go-to-market-memo-by-stuart…` (265), `founder-diaries-orbitalx-in-the-philippines` (273), the `marketing-under-attack-*` episodes, download pages for blueprints. | For video and podcast pages, add a summary, key takeaways and a transcript (and `VideoObject` / `PodcastEpisode` schema). For download pages, put 400–600 words of real preview content above the form. Noindex purely internal culture posts, or fold them into `/team`. |
| 2.6 | **Weak H1s on key pages** | `/case-studies`: "Why investing in OrbitalX pays off". `/how-it-works`: "How OrbitalX powers growth". `/resources`: "OrbitalX Resources". `/contact`: "Get in touch". `/platform`: no "DemandWEBS" in the H1. | Use H1s with keywords: "B2B Marketing Case Studies: Pipeline Results From Lean Teams", "How Our ABM & Demand Gen System Works", "B2B Marketing Resources: ABM, Demand Gen & GTM Guides", "DemandWEBS™: The B2B Pipeline Engine". |
| 2.7 | **Paragraphs marked up as H2s** | `/services`, `/how-it-works`, `/platform` and every `/services/*` page use a long intro sentence or paragraph as an H2 (the `/services` H2 is 130 words). `/resources` has an empty H2 "Results for “ ”". | Change these to `<p>`. Use H2s only for section headings that describe the section. |
| 2.8 | **Case studies are thin and split from the hub** | `/case-studies` has 476 words. The 8 case studies sit under `/resources/` at 547–1,012 words, and some titles hide the client and the result (`how-a-legal-pioneer-flipped-a-switch…`). | Lead with the metric in titles ("Levanta: 8x More Meetings With ABM"). Add a results summary table to `/case-studies`. Link each case study from the matching service page. |
| 2.9 | **Missing commercial pages** | No `/services/earned`, though the FAQ has an "Earned FAQ" section and the services meta mentions earned media. No pricing, about, industry (SaaS, PE portfolio companies) or comparison pages. `/about` and `/pricing` return 404. | Build: `/services/earned` (or remove the earned references), `/pricing` (or "What ABM costs", since the homepage already has a "What it costs to build this yourself" section), `/industries/saas` and `/industries/private-equity` (you already have PE content and the Cylindo case study), and `/compare/abm-agency-vs-in-house`. |
| 2.10 | **robots.txt points to the wrong sitemap host** | `Sitemap: https://www.orbitalx.com/sitemap.xml` 301s to the non-www URL | Change it to `https://orbitalx.com/sitemap.xml` |
| 2.11 | **Internal links to `www.` URLs (redirect hops)** | Content links to `www.orbitalx.com/how-it-works`, `/resources`, `/resources/demandwebs-your-simple-path-to-b2b-growth`, `…levantas-journey…`, `…occy…`, `…mqls-reframed…` | Search the CMS for `www.orbitalx.com` and change those links to relative URLs |
| 2.12 | **Image weight and layout shift** | Homepage: 168 images, 138 PNG, **102 without width/height**, 176 KB of inline SVG in the HTML. Service pages are about 580 KB of HTML each. | Serve WebP/AVIF through Glide (`fm="webp"` or `fm="avif"` on the `{{ glide }}` tag). Add width and height. Move repeated logo SVGs into `<img>` or a sprite so they can be cached. |
| 2.13 | **The same OG image everywhere** | All 152 pages use `og-image--15-(1).png` | Use the article's hero image as `og:image`. SEO Pro can map it from the entry's image field. |

**Nice-to-have 🟢:**
- **96 titles run past 60 characters.** Most are fine. Trim the ones where the important words get cut, e.g. "Big Uncommon Thinking: How top C-Suite leaders…" (123 characters) and "How a legal pioneer flipped a switch…" (102).
- **Client-logo images have empty `alt`** (161 of 168 on the homepage). Decorative is technically valid, but adding the client name ("Yieldify logo") adds relevance and trust. Fix `alt="image 51"` and hash-named alts.
- **Trailing-slash URLs** (`/services/abm/`) return 200 with a correct canonical. Better: 301 them to the slash-less URL.
- **The sitemap marks everything `priority 0.5 / monthly`, and 111 URLs have a September 2026 `lastmod`**, which looks like a bulk re-save. Google ignores `lastmod` when it isn't reliable, so only update it when the content actually changes.
- Set `lang="en-GB"` if the UK is the primary market (prices are in £). Spelling is currently mixed ("optimise" vs "prioritization").
- A tracker loads from **`stdemandwebseustage…`** (a staging blob store) on production. Confirm this is intended.
- Add `/llms.txt` and an AI-friendly summary of services. This is low effort and helps LLM citations.
- Older URLs like `/blog` and `/about` return 404, and the logo still lives on Webflow's CDN, which suggests a past migration from Webflow. Check GSC and backlink tools for old Webflow URLs that still have links, and 301 them (see §7).

---

## 3. What's working
- **Technically clean:** HTTPS, www → non-www in one 301, consistent self-canonicals, parameter URLs canonicalised, a real 404 page, every sitemap URL returns 200, no stray `noindex`.
- **Titles are unique and contain keywords.** Every page has one H1, and the service pages have strong commercial titles ("B2B Demand Generation Agency", "GTM Engineering Services | CRM, Routing & Integrations").
- **The long-form library is substantial and Google is starting to pick it up.** 52 guides of 2,000+ words target real commercial-informational terms. `account-based-marketing-tools` already ranks for 15 keywords, including high-CPC ones ($91.81 "account based marketing platform"). `demand-gen-software` (#17) and `demand-gen-vs-performance-max` (#20) are close to page 1.
- **Some content already shows up in AI search.** `b2b-account-based-marketing` holds #1 in Google's AI Overview for "programmatic advertising b2b", `demand-gen-vs-performance-max` is cited by Google's answer engine, and `demand-gen-funnel` is cited by SearchGPT.
- **The brand term is under control.** The homepage holds #1 for "orbital x" with a knowledge panel and sitelinks.
- **There's strong proof material:** "11.7x ROI · £300M pipeline · 100+ B2B companies", named case studies (Yieldify, Levanta, StackOne, Cylindo, Bold Commerce, occy, EngageTech), a podcast, and a free Competitor Intelligence Report as a lead magnet (a good fit for link building).
- **The service pages have FAQ sections.** They're a good base for FAQ schema and for AI-search answer extraction.

---

## 4. Content strategy

### 4.1 Topic clusters (pillar → supporting posts)
| Cluster | Pillar (money page) | Supporting posts already live | Gaps to fill |
|---|---|---|---|
| ABM | `/services/abm` | `b2b-account-based-marketing`, `account-based-marketing-tools`, `-software`, `-tactics`, `-personalization`, `-analytics`, `how-to-measure-account-based-marketing`, `enterprise-account-based-marketing`, `abm-vs-lead-generation` | "ABM agency" comparison page, "ABM for SaaS", "ABM pricing/cost", "ABM examples" |
| Demand gen | `/services/demand-generation` | `b2b-demand-generation-marketing`, `demand-gen-strategy`, `demand-gen-funnel`, `demand-generation-programs`, `demand-gen-software`, `what-is-demand-generation`, `lead-generation-vs-demand-generation…` | Merge `what-is-demand-generation` (1,018 words) and `lead-gen-vs-demand-gen` (1,423) into one definitive explainer |
| GTM engineering | `/services/gtm-engineering` | `gtm-systems`, `b2b-go-to-market-strategy`, `b2b-marketing-and-sales-alignment` | "What is GTM engineering", "HubSpot–Salesforce routing", "lead routing" guides. The `gtm-engineering` category has only 156 words. |
| AI agents | `/services/ai-agents` | `ai-lead-generation`, `lead-generation-chatbot`, `b2b-marketing-automation(-examples)`, `abm-for-lean-teams-ai-agents…` | "AI SDR / AI agents for B2B marketing" guide, use-case pages |
| Paid / Owned | `/services/paid`, `/services/owned` (568 and 850 words, both thin for money pages) | `performance-marketing-tools`, `-optimization`, `demand-gen-vs-performance-max`, `b2b-marketing-webinars`, `webinar-lead-generation` | Expand both service pages to 1,500+ words. Add a "LinkedIn Ads for B2B" guide. |

### 4.2 Content you can turn into links
- **Competitor Intelligence Report.** Publish an annual "State of B2B Pipeline for Lean Teams" report built on the anonymised 100+ client dataset. It's a natural target for links from SaaS, PE and marketing publications.
- **The "Marketing per Marketer (MPM)" metric.** You own this concept. Consolidate the posts into one definitive page and pitch it as a new benchmark.
- **Do More With Less podcast.** Each guest is a link and a share opportunity: give guests an embed or badge and a page with a transcript.

---

## 5. Quick wins (do these first)

Ordered by impact relative to effort. All of them can be done in the CMS by one person, plus a little dev time, in 1–2 weeks.

| # | Action | Effort | Impact |
|---|---|---|---|
| 1 | **Noindex `app.orbitalx.com`** (`X-Robots-Tag: noindex` in Netlify `_headers`) and rename its title from "Smartlead" | 15 min (dev) | Removes a third-party brand from "orbital x" results (1.6) |
| 2 | **Push the 9 striking-distance and high-value keywords** (table below): refresh the content, title and H2s, and add internal links | 2–3 days | The quickest path to the first non-brand traffic |
| 3 | **Fix the cannibalization**: retitle the homepage, retitle `/resources/account-based-marketing-services` and `/resources/demand-gen-agency`, and add intro copy on `/blog-categories/demand-generation` that links to `/services/demand-generation` | 2 hrs | Gives "demand gen company" (480/mo, #25) and the ABM service terms one clear target (1.4, 1.5) |
| 4 | **Add 1–3 in-text links to a service page in each of the 52 long-form guides**. Start with `account-based-marketing-tools`, `demand-gen-agency`, `demand-gen-software` and `b2b-account-based-marketing`, which already rank. | 1–2 days | Moves authority from pages that rank to the money pages |
| 5 | **Write unique meta descriptions** for the 83 articles that use the default (drafts for the top 10 below). Set SEO Pro to fall back to the excerpt. | 1–2 days | CTR on every listing and share |
| 6 | **301 the 3 exact duplicates** and merge the 4 near-duplicates (1.3) | 2 hrs | Consolidates signals |
| 7 | **Small technical fixes:** robots.txt sitemap host, the `www.` internal links, update the `sameAs` and GBP website URL to non-www, link `/faqs` in the footer | 1 hr | Gets `www.` out of the index (1.7) and cuts redirect hops |
| 8 | **Schema and crawlability:** BlogPosting + BreadcrumbList + `Person` author, fixed Organization markup, crawlable `/resources` pagination | 1 day (dev) | E-E-A-T, AI citations, ~100 near-orphaned articles found |
| 9 | **Fix the 13 category and type pages**: proper names, a 150-word intro, unique meta descriptions | Half a day | Turns thin pages into topic hubs |

**Striking-distance and high-value keywords (Semrush, US):**

| Keyword | Vol | KD | CPC | Pos | URL | Action |
|---|---|---|---|---|---|---|
| demand gen vs performance max | 140 | 10 | $34.95 | **20** | `/resources/demand-gen-vs-performance-max` | Low KD and already cited by Google's answer engine. Add a comparison table at the top, a "when to use which" section and an FAQ. Retitle it "Demand Gen vs Performance Max: Which Google Ads Campaign for B2B?" Also targets "demand gen vs pmax" (#28) and "google ads demand gen vs performance max optimization" (#47). |
| demand gen software | 140 | 23 | $19.25 | **17** | `/resources/demand-gen-software` | Add a ranked tool list with a comparison table and pricing. Put "Demand Gen Software" first in the title. Link to `/services/demand-generation`. |
| performance marketing job category signals | 210 | 9 | — | **11** | `/resources/performance-marketing-tools` | Odd query, but low KD. Add a short section on job-change and hiring signals. Remove the competing section from `demand-gen-software`. |
| ai marketing agent qualify intent book meetings | 50 | 1 | — | 13 | `/resources/ai-lead-generation` | Add an "AI agents that qualify intent and book meetings" H2. Link to `/services/ai-agents`. |
| b2b accounts | 140 | 20 | $10.91 | 20 | `/resources/b2b-account-based-marketing` | Broad query. Add a short "What are B2B accounts?" definition section. Low priority. |
| demand gen company | 480 | 43 | **$39.51** | 25 | `/blog-categories/demand-generation` | Make `/services/demand-generation` the target. Add "demand generation company" to its H2 and FAQ, and link from the category page (1.5). |
| demand generation program | 260 | 34 | $25.16 | 38 | `/resources/demand-generation-programs` | Write a unique meta description, add a program template or download, and link from the category page. |
| account based marketing vendors | 320 | 47 | $29.05 | 76 | `/resources/account-based-marketing-tools` | Use "ABM vendors" and "ABM platforms" in the H2s. This is the cluster page. |
| account based marketing platform | 170 | 57 | **$91.81** | 73 | `/resources/account-based-marketing-tools` | The same refresh: add "best ABM platforms" comparison rows. |

**Draft meta descriptions for the top 10 guides** (under 155 characters; check them against each article's actual angle):

| URL | Proposed meta description |
|---|---|
| `/resources/account-based-marketing-tools` | Compare 17 account-based marketing tools for intent data, ads, orchestration and analytics, and learn how to build an ABM stack that fits your team. |
| `/resources/b2b-go-to-market-strategy` | Build a B2B go-to-market strategy that turns into pipeline: ICP, positioning, channel mix and the decisions lean teams get wrong. |
| `/resources/lead-generation-cost-per-lead` | B2B cost per lead benchmarks by channel, the CPL formula, and why a "good" CPL depends on pipeline quality, not just price. |
| `/resources/performance-marketing-tools` | The performance marketing tools B2B teams need for attribution, ads, analytics and CRM, and how to build a stack that shows real revenue impact. |
| `/resources/demand-gen-agency` | How to choose a B2B demand generation agency: what to ask, red flags, pricing models and how to measure pipeline impact. |
| `/resources/b2b-demand-generation-marketing` | A complete guide to B2B demand generation: strategy, channels, content and metrics for building predictable pipeline. |
| `/resources/lead-generation-strategies` | B2B lead generation strategies ranked by pipeline impact, from ABM and webinars to outbound and SEO, with what works for lean teams. |
| `/resources/b2b-marketing-plan` | Build a B2B marketing plan that scales pipeline: a step-by-step template for lean teams covering goals, budget, channels and measurement. |
| `/resources/how-to-measure-account-based-marketing` | The ABM metrics that matter: account engagement, pipeline velocity, win rate and ROI. Here's how to measure and report ABM success. |
| `/resources/gtm-systems` | What a GTM system is and how to build one: the data, routing, CRM and feedback loops that connect marketing and sales to revenue. |

**Homepage title/meta rewrite:**
- Title: `OrbitalX | ABM & Demand Generation Agency for Lean B2B Teams` (58 characters)
- Meta: `Account-based marketing and demand gen for lean B2B teams. 11.7x average ROI and £300M+ pipeline generated, with a full team and AI system for the cost of one hire.`

---

## 6. Off-site and local
- **NAP consistency:** the footer lists London (12 Red Lion Square, WC1R 4QH) and Cebu. The schema has London without a street and only a Philippine phone number. Line these up, and create or verify **Google Business Profiles** for both offices if you want visibility in local and branded map results.
- **Agency directories:** Clutch, G2 (Marketing Services), DesignRush, Sortlist, The Manifest and GoodFirms. In these categories (ABM agency, demand gen agency), listings often rank on page 1 and pass referral traffic.
- **Brand name confusion:** "OrbitalX" sits close to Orbital Inc., OrbitX and other "Orbital" companies, and Semrush shows the site appearing for seven look-alike brand searches. Keep the name written as one word, "OrbitalX", everywhere. Add `alternateName: ["Orbital X", "OrbitalX Agency"]` to the Organization schema, and use "OrbitalX, the ABM agency" in profile bios so Google ties the brand to the category.
- **The podcast as a link engine:** guest pages, show notes with backlinks, and listings on Apple and Spotify that link to the site.

---

## 7. Still needs external verification

| Item | Tool |
|---|---|
| **UK rankings** (the primary market: £ pricing, London HQ). This audit uses the **US** Semrush database only. | Semrush Organic Positions + Pages, **UK** database |
| Competitor overlap and keyword gap against other ABM and demand gen agencies | Semrush → Competitive Research / Keyword Gap |
| Real clicks, impressions and queries, including brand vs non-brand (Semrush estimates ~150 visits/month) | Google Search Console → Performance |
| Index coverage: how many of the 152 URLs are indexed, "Crawled – not indexed", "Discovered – not indexed" (likely for the orphaned articles) | Google Search Console → Pages |
| Core Web Vitals (LCP and CLS, given 570 KB+ HTML and images without dimensions) | PageSpeed Insights / CrUX / GSC → Core Web Vitals |
| Backlink profile (referring domains, anchors) and 404s on old URLs (possible Webflow migration) | Ahrefs → Best by links → 404 filter; GSC → Not found |
| Whether the logo at `cdn.prod.website-files.com` still loads (my access to that host was blocked) | Open the URL / Rich Results Test |
| HTTP → HTTPS redirect (I could only test HTTPS from the audit environment) | `curl -I http://orbitalx.com` |
| Google Business Profile status for London and Cebu | Google Business Profile Manager |
