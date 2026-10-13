# SEO Audit: orbitalx.com

**Audit date:** 2026-10-13
**Site:** https://orbitalx.com/ (ABM and B2B pipeline agency for lean marketing teams, London + Cebu)
**Overall health:** 🟡 Needs work. The technical base is sound: HTTPS, clean canonicals, a working sitemap, unique titles and one H1 per page. The library holds about 50 solid long-form guides. But most of that content is set up badly for search. 96 pages use the same default meta description. About 100 articles can only be reached through the sitemap. The guides don't link to the service pages. And three pages compete for "account-based marketing services".

> **How this audit was done.** I crawled all **152 URLs in the sitemap** on 13 Oct 2026. For each page I extracted the status code, title, meta description, canonical, robots tag, Open Graph tags, headings, JSON-LD, images, internal links and word count. I also tested robots.txt, URL variants, pagination, the 404 page and the homepage assets.
> **Not covered** (no data in this session): keyword rankings and volumes, backlinks, traffic, index coverage and Core Web Vitals. See §7. A Semrush or Ahrefs export plus GSC access would let me add a keyword layer, as I did for the crewhu audit.
>
> The page-by-page data is in **`orbitalx-seo-audit.xlsx`**.

---

## 0. Crawl snapshot

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
- **The long-form library is substantial.** 52 guides of 2,000+ words target real commercial-informational terms: ABM tools, lead generation cost per lead, B2B GTM strategy, demand gen software, performance marketing tools.
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

Ordered by impact relative to effort. All of them can be done in the CMS by one person in 1–2 weeks.

| # | Action | Effort | Impact |
|---|---|---|---|
| 1 | **Write unique meta descriptions** for the 83 articles that use the default. Start with the 10 below, then the other 42 long-form guides. Set SEO Pro to fall back to the excerpt. | 1–2 days | CTR on every article listing and LinkedIn share |
| 2 | **301 the 3 exact duplicates** (gate/un-gate webinar, early-stage full-episodes, pipeline slump 2025) and merge the 4 near-duplicates in 1.3 | 2 hrs | Consolidates signals, removes thin pages |
| 3 | **Add 1–3 contextual links to a service page in each of the 52 long-form guides**, plus a service CTA block in the article template | 1–2 days | Sends authority from the content library to the money pages |
| 4 | **Fix the ABM cannibalization**: retitle the homepage, retitle `/resources/account-based-marketing-services` and `/resources/demand-gen-agency`, and point them at `/services/abm` and `/services/demand-generation` | 1 hr | Gives Google one clear page to rank for "ABM services" / "demand gen agency" |
| 5 | **Fix the 13 category and type pages**: proper names instead of slugs, a 150-word intro, a unique meta description | Half a day | Turns 13 thin pages into topic hubs |
| 6 | **Add BlogPosting + BreadcrumbList + author `Person` schema** in the article template and show a byline. Fix the Organization schema (logo on own domain, full addresses, valid properties, sameAs). | Half a day (dev) | E-E-A-T, rich results, AI citations |
| 7 | **Make `/resources` pagination crawlable** (real page 2+, self-canonicals) | Half a day (dev) | Gets about 100 near-orphaned articles crawled and linked |
| 8 | **Small technical fixes:** robots.txt sitemap host, change the `www.` internal links, link `/faqs` in the footer, rename the H2 paragraphs to `<p>` | 1 hr | Fewer redirect hops, cleaner crawl |

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
- **The podcast as a link engine:** guest pages, show notes with backlinks, and listings on Apple and Spotify that link to the site.

---

## 7. Still needs external verification

| Item | Tool |
|---|---|
| Keyword rankings, search volumes, striking-distance terms, competitor overlap | Semrush / Ahrefs (send an export and I'll add a keyword layer like the crewhu v2 audit) |
| Index coverage: how many of the 152 URLs are indexed, "Crawled – not indexed", "Discovered – not indexed" (likely for the orphaned articles) | Google Search Console → Pages |
| Core Web Vitals (LCP and CLS, given 570 KB+ HTML and images without dimensions) | PageSpeed Insights / CrUX / GSC → Core Web Vitals |
| Backlink profile and 404s on old URLs (possible Webflow migration) | Ahrefs → Best by links → 404 filter; GSC → Not found |
| Whether the logo at `cdn.prod.website-files.com` still loads (my access to that host was blocked) | Open the URL / Rich Results Test |
| HTTP → HTTPS redirect (I could only test HTTPS from the audit environment) | `curl -I http://orbitalx.com` |
| Google Business Profile status for London and Cebu | Google Business Profile Manager |
