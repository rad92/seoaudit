# SEO Audit: salesroads.com

**Audit date:** 2026-10-01
**Site:** https://salesroads.com/ (B2B sales outsourcing: appointment setting, outsourced SDRs, lead generation, cold calling)
**Stack:** WordPress + Elementor Pro, Rank Math SEO, WP Engine hosting behind Cloudflare
**Overall health:** 🟡 Needs Work. The content library is large and it's indexable, and the pricing is unusually transparent. But sitewide title templating, schema hygiene, cannibalization between blog posts and service pages, and indexed campaign/thank-you pages are holding the commercial pages back.

> **How this audit was done.** I crawled all 390 HTML URLs in the XML sitemaps (41 pages, 1 landing page, 348 posts) plus the 39 internal-link targets outside the sitemap. For each URL I parsed the raw HTML: title, meta description, H1–H6, canonical, robots meta, Open Graph, JSON-LD, images and links. I also read robots.txt and all 5 sub-sitemaps, measured cached and uncached server response times, and checked the competitive results pages for the core money keywords. Where a finding rests on something I couldn't verify (rankings, traffic, Core Web Vitals field data), it's marked **Verify**.

---

## Scorecard

| Area | Status | Headline |
|---|---|---|
| Crawlability & indexing | 🟡 | All 390 sitemap URLs return 200 and are indexable. That's the problem: thank-you, opt-in, PPC and duplicate pages are indexable too. |
| Titles & meta | 🔴 | 153 titles carry a 74-character brand suffix. 315 of 390 titles are over 60 characters. 43 pages have no meta description. |
| Headings | 🟡 | 4 key pages have no H1. 15 have multiple H1s. The phone number is marked up as an H3 on every page. |
| Structured data | 🔴 | A junk username is published as the author. Product/review markup is self-serving and partly invalid. 340 of 347 posts have no `datePublished`. |
| Content | 🟡 | Strong volume (348 posts) but heavy keyword cannibalization. Stale years appear in 17 titles. Some content targets job seekers rather than buyers. |
| Performance | 🟡 | Cached pages respond fast (~0.4s). Uncached pages take 2–3s TTFB (6–9s observed). HTML is 260–400 KB, there are 18 render-blocking scripts, and all images are PNG/JPG. |
| E-E-A-T / trust | 🟡 | Real case studies (33), named authors, and public pricing. But "years of experience" claims contradict each other across the site. |

---

## 1. Critical Issues 🔴

### 1.1 A 74-character "site name" is appended to 153 page titles
Rank Math is appending `- Sales Outsourcing Company | Outsourced Sales Team Services - SalesRoads` to every page that has no custom SEO title. Examples:

| URL | Current title (chars) |
|---|---|
| `/manufacturing-industry-landing-page/` | Manufacturing Industry Landing Page - Sales Outsourcing Company \| Outsourced Sales Team Services - SalesRoads (109) |
| `/logistics-supply-chain-industry/` | Logistics & Supply Chain Industry - Sales Outsourcing Company \| … (107) |
| `/compliance-services-industry-page/` | Compliance Services Industry **Page** - Sales Outsourcing Company \| … (107) |
| `/inbound-appointment-setting/` | Inbound Appointment Setting - Sales Outsourcing Company \| … (101) |
| `/outbound-email-services/` | Outbound Email Services - Sales Outsourcing Company \| … (97) |
| `/account-reactivation/` | Account Reactivation - Sales Outsourcing Company \| … (94) |

**Why it matters:** Google cuts titles off at roughly 580px (about 60 characters), so searchers see "Outbound Email Services - Sales Outsourcing Comp…". The keyword phrase "sales outsourcing company" is also stuffed into 150+ titles. That dilutes relevance and makes every page compete with the homepage for that term. Some titles also leak internal names ("Industry **Page**", "**Landing Page**").

**Fix (5 minutes, sitewide):**
1. **Settings → General → Site Title** (or Rank Math → Titles & Meta → Global Meta → *Website Name*): set it to **`SalesRoads`**.
2. Keep the Rank Math title format as `%title% %sep% %sitename%` with `|` as the separator.
3. Then give the commercial pages custom titles. Rewrites are in §5.

### 1.2 A junk WordPress username is published as the "author" in schema, and the user API is open
Rank Math outputs `Article` schema on 16 core pages, including the **homepage**, with `"author": {"name": "jjUplds9j0das0"}` and a Person entity of the same name. This is the WP login username of whoever built those pages.

**Why it matters:**
- **SEO:** An Article authored by a random string is a negative E-E-A-T signal, and the homepage isn't an article in the first place.
- **Security:** It publishes half of an admin login. `/wp-json/wp/v2/users` also returns 200, which makes user enumeration trivial.

**Fix:**
- Rank Math → Titles & Meta → **Pages** → Schema Type: change **Article → None/WebPage**. Do the same for the Elementor library and landing pages.
- In that user's profile, set the **Nickname / "Display name publicly as"** to a real name, for example "SalesRoads Team".
- Block the users REST endpoint for unauthenticated requests (WP Engine, Wordfence or a small snippet can do it). Consider renaming the account.

### 1.3 Thank-you, opt-in, PPC and duplicate pages are indexable and in the sitemap
Every sitemap URL is `index, follow`. These pages shouldn't be:

| URL | What it is | Action |
|---|---|---|
| `/request-received/` | Form thank-you page (4 H1s, duplicate meta description) | `noindex`, remove from sitemap. It also pollutes conversion tracking when people land on it from search. |
| `/meet-the-team/` | Calendly booking-confirmation page ("Thank You for Reaching Out!") | `noindex`, remove from sitemap |
| `/communication-opt-in-settings/` | Email preference page (no H1, no description) | `noindex`, remove from sitemap |
| `/vsa/` | Acquisition landing page. 16 of its 20 headings duplicate the homepage, including the H1 "sales outsourcing agency". | `noindex`, or 301 to `/` and handle the VSA messaging with a banner |
| `/appointment-setting-landing-page/` | PPC copy of `/appointment-setting-services/` (same H1) | `noindex` (they're orphaned anyway, with no internal links) |
| `/lead-generation-landing-page/` | PPC copy of `/lead-generation-services/` | `noindex` |
| `/sales-outsourcing-landing-page/` | PPC copy of the homepage | `noindex` |
| `/manufacturing-industry-landing-page/` | PPC copy of `/manufacturing-industry-page/` | `noindex` |
| `/healthcare-industry-landing-page/` | PPC copy of `/healthcare-industry/` | `noindex` |
| `/all-industry-pages/` | Hub page with no H1 and a title that's an internal name | Keep it, but rename it to `/industries/` (301) with a real H1 and title |

**Why it matters:** The PPC duplicates compete directly with the real service pages for "B2B appointment setting services" and "lead generation services". Google then has to choose between them, and it may choose the thinner one.

### 1.4 Blog posts compete with the service pages for the money keywords (cannibalization)
The site has **40 URLs** targeting "appointment setting", **55** targeting "lead generation", **20** targeting "cold calling" and **43** targeting "outsourcing". Many of these overlap directly with a service page:

| Money keyword | Service page that should rank | Competing URLs |
|---|---|---|
| lead generation services | `/lead-generation-services/` | `/outsourcing/lead-generation-services/` (**same slug!**), `/outsourcing/outsourced-lead-generation/`, `/outsourcing/outsource-lead-generation/`, `/lead-generation-landing-page/` |
| appointment setting services | `/appointment-setting-services/` | `/outsourcing/outsourced-appointment-setting/`, `/outsourcing/everything-to-know-about-b2b-appointment-setting/`, `/outsourcing/call-center-appointment-setting/`, `/appointment-setting-landing-page/` |
| SDR outsourcing | `/outsourced-sdr-services/` | `/outsourcing/sdr-outsourcing/`, `/outsourcing/sales-development-services/` |
| sales outsourcing cost | `/pricing/` | `/outsourcing/sales-outsourcing-pricing/`, `/outsourcing/how-much-does-salesroads-sales-outsourcing-actually-cost/`, `/outsourcing/sales-agency-pricing-models/` |
| lead gen vs appointment setting | one guide | `/tactics/lead-generation-vs-appointment-setting-whats-the-difference/`, `/outsourcing/lead-generation-vs-appointment-setting/`, `/outsourcing/salesroads-program-appointment-setting-or-lead-generation/` |
| lead generation guide | one pillar | `/tactics/lead-generation/`, `/tactics/ultimate-guide-lead-generation/`, `/tactics/b2b-lead-generation/`, `/tactics/b2b-lead-generation-meaning/` |
| lead gen strategies / tips | one post each | `/tactics/b2b-lead-generation-strategies/`, `/tactics/lead-generation-strategies/`, `/tactics/lead-generation-tips/`, `/tactics/b2b-lead-generation-tips/`, `/tactics/generating-b2b-leads/` |
| cold calling scripts | one post | `/tactics/cold-calling-scripts/`, `/tactics/b2b-cold-calling-script/` |
| cold calling questions | one post | `/tactics/cold-call-questions/`, `/tactics/cold-calling-questions/` |
| lead gen funnel | one post | `/tactics/lead-generation-funnel/`, `/tactics/lead-gen-funnel-template/` |

**Fix:**
1. In Google Search Console → Performance, filter by each money query and see which URLs get impressions. Where two URLs alternate, that's cannibalization.
2. **Merge and 301** the duplicates into the strongest URL. Combine the best sections and keep the URL with more backlinks.
3. **Re-angle** the blog posts that should stay so they target informational ("how to…", "cost of…", "vs") rather than commercial intent. Each should link to its service page with exact-match anchor text.
4. Most urgent: rename `/outsourcing/lead-generation-services/` (for example to `/outsourcing/outbound-lead-generation-guide/`, with a 301) or merge it into the service page.

### 1.5 Uncached pages are slow to respond
Cached responses are fast (median 0.39s), but WP Engine only caches HTML for 10 minutes (`cache-control: max-age=600`). On a cache miss, the server took **1.9–3.2s TTFB** on every page I tested, and **6–9s** during the first crawl (`/logistics-supply-chain-industry/` 9.3s, `/compliance-services-industry-page/` 9.7s, `/saas-industry/` 8.5s). Googlebot crawls the long tail of 348 posts and mostly hits cold cache. Slow responses lower crawl rate and hurt LCP for real users.

Robots.txt also sets `Crawl-delay: 10`. Google ignores it, but Bing and others will crawl at most one page every 10 seconds.

**Fix:**
- Turn on **Cloudflare APO** (or a "Cache Everything" rule with bypass on cookie) so HTML is served from the edge, and raise the HTML TTL to hours or days with purge-on-publish.
- Profile the origin with Query Monitor or New Relic on WP Engine. Common culprits are Elementor dynamic widgets (post grids with related posts), the chat widget plugin, and Asset CleanUp.
- Remove `Crawl-delay: 10` from robots.txt.

---

## 2. On-Page SEO

| Priority | Finding | Recommendation |
|---|---|---|
| 🔴 | Titles over 60 chars: **315 of 390**. Over 70: **236**. | Fix the site name (1.1), then trim post titles. Rank Math → Titles & Meta → Posts → set the format to `%title% \| SalesRoads`. |
| 🔴 | Generic or internal titles on key pages: `Blog`, `About Us`, `Careers`, `Why Choose Us`, `Methodology`, `Client Success`, `Sales Executives`, `Request a Quote`, "Fintech Industry", "Insurtech Industry **Page**" | Rewrites in §5. |
| 🔴 | **43 pages have no meta description**: 25 podcast episodes, 5 outsourcing posts, 5 leadership posts, 4 case studies (Clutch, Bold Penguin, Rudholm, ZoomIn) and the VSA announcement | Write them. Case studies should lead with the result ("How SalesRoads booked 937 meetings for AchieveIt…"). |
| 🟡 | **130 descriptions over 160 chars** (truncated). 15 are too short or junk: `/about-us/` = "SALESROADS", `/request-a-quote/` = "BOOK A CALL", `/pricing/` = "SalesRoads Pricing", `/fed-sled-industry/` = "FED&SLED INDUSTRY" | Rewrite to 140–155 chars with keyword + proof + CTA. Examples in §5. |
| 🟡 | Industry descriptions are templated ("We have +19 years of experience in the X industry.") | Make each one specific: who the buyers are, a client result, the offer. |
| 🔴 | **No H1** on `/blog/`, `/request-a-quote/`, `/all-industry-pages/`, `/communication-opt-in-settings/` | Add one. For the blog: "B2B Sales & Outbound Prospecting Blog". |
| 🟡 | **Multiple H1s** on 15 pages. `/outbound-email-services/` and `/sales-feud/` repeat the same H1 twice. `/lead-generation-services/` has "B2b Lead Generation…" plus "Outsourced Lead Generation…". | Keep one H1. Change the others to H2 in Elementor. Fix the "B2b" capitalisation. |
| 🟡 | The homepage H1 is lowercase "sales outsourcing agency", visually a small eyebrow label. The real headline "We'll build your dream pipeline." is the H2. | Make the H1 descriptive and keyword-led: **"B2B Sales Outsourcing & Appointment Setting That Builds Your Pipeline"**. Keep the eyebrow as a `<p>`. |
| 🟡 | Headings misused as styling sitewide: the phone number `1-800-836-4033` is an H3 (twice per page), "Request a Quote" is an H5, and team member names on `/about-us/` alternate between H2, H4 and H6. The CTA block "Wave 'Goodbye' to Your Empty Pipeline" appears twice on the homepage. | Change these to `<p>`/`<div>` in the Elementor header, footer and CTA templates. This cleans the outline on all 390 pages at once. |
| 🟡 | **14 template images have no alt text** on every page (menu icons such as `appointment-setting.png`, `lead-gen.png`, `case-studies.png` and others) | Add alt text in the Media Library, or `alt=""` if decorative. That's a single template fix. |
| 🟢 | Internal links use UTM parameters: `/pricing/?utm_source=pricing…` (14), `/request-a-quote/?utm_source=…`, `/careers/?utm_…` | UTMs on internal links reset the GA4 session source. Use GA4 events or `data-` attributes for CTA tracking. The canonical tag already protects SEO. |
| 🟢 | 6 internal links go through 301s (for example `/tactics/cold-call-structure/` → `/tactics/cold-calling-scripts/`, `/advanced-account-research/` → `/sales-intent-data/`). 1 links to a **noindex** post (`/leadership/the-3-ai-lessons-every-sales-leader-needs-to-learn-right-now/`). 5 date-archive links redirect to the homepage. | Update the links to point at the final URLs. Publish or remove the noindexed post. |

---

## 3. Technical SEO

| Priority | Finding | Recommendation |
|---|---|---|
| 🟢 Good | HTTPS, `http://` → `https://` 301, self-referencing canonicals on all 390 URLs, correct 404s, valid viewport, OG + Twitter cards on 384 of 390, Rank Math sitemap index with video sitemap | Keep. |
| 🔴 | Schema: **Article** type on static pages, including the homepage (see 1.2) | Change Pages to WebPage. Set the homepage to `Organization` + `WebSite`, and service pages to `Service` (with `provider` → Organization and `areaServed: US`). |
| 🔴 | Self-serving review markup: `/reviews/` uses `Product` + `AggregateRating` (4.9, 24 reviews), and `/appointment-setting-services/` uses `"@type": "product"` / `"aggregateRating"` in **lowercase**, which is invalid because schema types are case-sensitive. The `/reviews/` Product `image` is a `.webm` video file. | Google doesn't show review stars for a business's reviews of itself, and marking a service up as a "Product" to get stars can lead to a structured-data manual action. Remove the Product/AggregateRating wrappers, or keep `Review` items only if Clutch/G2 attribution is shown. Fix the casing or delete the lowercase block. |
| 🔴 | **340 of 347 BlogPostings have no `datePublished` / `dateModified`**, and posts don't show their own publish or updated date on the page | Enable dates in Rank Math (Titles & Meta → Posts → Schema) and display an "Updated {date}" line in the Elementor single-post template. Freshness matters for sales "how-to" and "cost" queries, and AI Overviews use dates to judge recency. |
| 🟡 | Organization schema: `name` is "SalesRoads \| America's Most-Trusted Sales Outsourcing Partner", the description is "All Things Sales Outsourcing", the logo is `Untitled-Project-38.png`, and there's no `sameAs` | Set `name: "SalesRoads"`, `legalName: "Homebase-USA, Inc."` (per the privacy policy), `foundingDate`, and `sameAs` (LinkedIn, Clutch, G2, YouTube, podcast). Rename the logo file. |
| 🟡 | **Unidentified third-party script** loaded synchronously on all 390 pages: `consortiumventure24.com/js/812387.js` plus a `<noscript>` pixel. The domain sits on a shared host with dozens of similar "consortium…" domains. That pattern matches B2B visitor-identification trackers such as Lead Forensics. | **Confirm with marketing that this tool is intentional and still under contract.** If it's in use, load it via GTM with `async`. If not, remove it immediately: an unknown render-blocking script is both a performance and a security risk. |
| 🟡 | Front-end weight: 260–400 KB HTML per page, 19 stylesheets, 18 render-blocking scripts (jQuery, jQuery UI, Elementor, smartmenus, sticky, numerator, Agentman chat widget, and more), 54 KB of inline CSS, 107 inline SVGs. Fonts load from both Google and **fonts.bunny.net** (three families). **All 43 homepage images are PNG/JPG** (no WebP/AVIF). | Enable Elementor "Optimized DOM output", "Improved asset loading" and "Inline font icons". Defer the jQuery-dependent scripts. Delay the chat widget until user interaction. Self-host one font family. Convert images to WebP/AVIF (WP Engine's or Cloudflare's image optimizer). **Verify** in PageSpeed Insights (mobile). |
| 🟡 | Blog pagination (`/blog/?e-page-fdfa077=2`) canonicalises to `/blog/`, so older posts are reachable only via the sitemap and related-post widgets. Category archives (`/category/tactics/` etc.) are indexable but **not** in the sitemap, and their titles are the bare category slug. | Make the categories the real hubs: add them to the sitemap, write 150–300 words of intro, and set titles like "Sales Tactics: Cold Calling, Email & Prospecting Guides \| SalesRoads". Use real paginated URLs (`/blog/page/2/`). |
| 🟡 | Tag archives are inconsistent: 9 tags are `noindex`, but `/tag/hiring/` is `index` | Noindex `/tag/hiring/` to match. |
| 🟢 | **Video sitemap:** 17 of 114 videos use YouTube's boilerplate description ("Enjoy the videos and music you love…"), and 20 video titles carry the long site-name suffix | Write a one-sentence description per video. Fixing 1.1 cleans the titles. |
| 🟢 | `www.salesroads.com` returned 403 from this audit environment, so I couldn't confirm how it redirects | **Verify:** `www` should 301 to `https://salesroads.com/` in one hop. |
| 🟢 | No `/llms.txt`. The site has "Ask ChatGPT / Claude / Perplexity / Grok / Gemini" share buttons, so AI visibility clearly matters to the team. | Add an `llms.txt` that lists the service, pricing, industries and case-study hub URLs (Rank Math can generate it). |

---

## 4. Content & Keyword Strategy

### 4.1 What's working
- **Public pricing** on `/pricing/` (figures from $5,000 to $43,150 shown, with an in-house cost comparison). Most competitors hide pricing, and it's a real advantage for "cost" queries.
- **33 case studies** with named clients (Shell, Paylocity, Parker Hannifin, Clutch, Crewhu…) and a Challenge → Solution → Results structure.
- **Original formats:** the *Sell Like a Leader* podcast (42 episodes), *Sales Feud*, a white paper on SDR hiring, and a monthly newsletter.
- **Industry coverage:** 8 industry pages plus matching "Best X appointment setting companies" listicles for SaaS, healthcare, manufacturing and FED/SLED.
- SalesRoads **ranks on page 1 for "sales outsourcing company"** with the homepage.

### 4.2 Where competitors are winning
Results-page checks on core terms (US, October 2026):

| Query | Who ranks | SalesRoads |
|---|---|---|
| sales outsourcing company | Sales Focus, Clutch, salespanel, **SalesRoads**, Wikipedia | ✅ Homepage, page 1 |
| B2B appointment setting services | Sales Focus, AnswerNet, UnboundB2B, Superhuman Prospecting, Launch Leads, Punch, Concept, LevelUp Leads | ❌ Not in the top 9 |
| outsourced SDR services | Callbox, SalesBread, Sales Focus, memoryBlue, Martal, Launch Leads, Leadium | ❌ Not in the top 9 |
| B2B cold calling services | Upcall, Abstrakt, EBQ, Sales Focus, Superhuman Prospecting | ❌ Not in the top 9 |
| B2B appointment setting cost | Belkins, Leadium, LeadSpot, Only-B2B and others (all blog guides) | ❌ Even though SalesRoads publishes real prices |
| SalesRoads reviews / alternatives | **G2, Cleverly, SalesBread, Salesforge, OutboundSalesPro, Alleyoop, RemoteAides**, all competitors' pages | ❌ No SalesRoads page answers this |

**Takeaway:** The service pages (appointment setting, SDR, cold calling) are being outranked by competitors with fewer case studies and less content. The reasons are the issues above: diluted titles, cannibalizing blog posts, PPC duplicates, and service pages that are thin compared with what competitors offer (~1,400–1,900 words including boilerplate). **Verify** exact positions in GSC or Semrush, because these results-page checks are a point-in-time sample.

### 4.3 Content to build, in priority order

| # | Page | Target keywords | Brief |
|---|---|---|---|
| 1 | **SalesRoads Reviews & Alternatives** (`/salesroads-reviews/`, or expand `/reviews/`) | salesroads reviews, salesroads alternatives, salesroads pricing | Competitors own the brand's reviews and alternatives results. Some quote outdated pricing ("$9,950 per four weeks"). Publish an honest page: Clutch/G2 ratings with links, current pricing, who SalesRoads is **not** a fit for, and how it compares on onshore reps, contract terms and reporting. Mark up as `WebPage` + `FAQPage`. |
| 2 | **Comparison pages:** SalesRoads vs memoryBlue / SalesHive / Belkins / Callbox / Martal | "<competitor> vs salesroads", "<competitor> alternative" | G2 already hosts "SalesRoads vs memoryBlue". One page per competitor with a feature/pricing/contract table, onshore vs offshore, minimum term, and who each is best for. |
| 3 | **Rebuild `/appointment-setting-services/` into the pillar** | b2b appointment setting services, outsourced appointment setting, appointment setting company | Merge the best of `/outsourcing/outsourced-appointment-setting/` and `/outsourcing/everything-to-know-about-b2b-appointment-setting/` (301 both). Add: process timeline (weeks 1–6, borrowed from `/outsourcing/outbound-sales-program-expectation/`), pricing summary with a link to `/pricing/`, 3 case-study results, an industries grid, FAQs. Target 2,000+ words of unique copy. |
| 4 | **Same treatment for `/outsourced-sdr-services/` and `/outbound-calling-services/`** | outsourced sdr services, sdr as a service, b2b cold calling services | Merge `/outsourcing/sdr-outsourcing/` and `/outsourcing/sales-development-services/` into the SDR page. Add an "In-house vs outsourced SDR cost" calculator built from `/outsourcing/in-house-sdr-costs/` data. |
| 5 | **"B2B Appointment Setting Cost (2026)" guide** | appointment setting cost, cost per appointment, appointment setting pricing | Competitors rank with guesses, and SalesRoads has real numbers. Merge `/outsourcing/appointment-setting-pricing-models/`, `/outsourcing/sales-outsourcing-pricing/` and `/tactics/lead-generation-pricing/` into one definitive guide covering pay-per-appointment vs retainer vs SDR-pod pricing, with SalesRoads' own price shown. |
| 6 | **Industry pages, second wave** | "<industry> appointment setting" / "<industry> lead generation" | Each existing industry page should get: an industry-specific H1 with the keyword, 2 case studies from that industry, typical buyer titles, compliance notes (HIPAA, FedRAMP), and a link to the matching "Best <industry> appointment setting companies" post. Add new pages where case studies exist: **IT/MSP** (Crewhu, Pantheon), **Professional services/AEC** (Factor), **Staffing/HR tech** (Paylocity, Beneflex). |
| 7 | **Case-study hub with filters** (`/case-studies/`) | b2b appointment setting case study, outsourced sdr results | The 33 case studies have no indexable hub (`/client-success/` is a logo wall). Build a filterable hub (by industry or service) and add 300–500 more words to the thinnest studies (Copperweld, Factor, Agility, Safecor and Shell are around 550–620 words including boilerplate). Lead each one with metrics. |

### 4.4 Refresh and clean up the blog
- **Remove stale years from 17 titles**, for example "2024: 9 Best B2B Lead Generation Courses", "Is Cold Calling Still Effective in **2024**?", "Lead Generation Specialist Salary: Updated **2024**", "Social Selling Strategies… in **2023**", and "Best Sales and Leadership Strategies for 2025" (whose URL says 2024). Update the content, then either use the current year or drop it.
- **Consolidate the clusters in 1.4.** Expect to merge roughly 20–25 posts into 8–10 stronger ones.
- **Reconsider job-seeker content.** Posts like `/leadership/sdr-resume-guide/`, `/leadership/sdr-cover-letter-sample/`, `/leadership/appointment-setting-jobs/`, `/leadership/lead-generation-interview-questions/` and `/leadership/appointment-setting-quotes/` attract job seekers, not buyers. Keep them only if they feed `/careers/` recruiting (link them there). Otherwise consolidate them, since they dilute topical focus.
- **Podcast pages:** 25 of 42 episodes have no meta description. Add a 300–600-word summary, key takeaways and a transcript to each. Transcripts are easy long-tail content and E-E-A-T (named experts like Aaron Ross, Mark Roberge, Jake Dunlap).
- **Authors:** 162 posts are by "SalesRoads Content Team". Move the best-performing ones to named practitioners (for example David Kreiger), and give each author a bio page with credentials and LinkedIn `sameAs`.

### 4.5 Internal linking
- Each blog cluster should link to its service page using the money anchor: "B2B appointment setting services" → `/appointment-setting-services/`, "outsourced SDR services" → `/outsourced-sdr-services/`. Today most blog CTAs go to `/pricing/` and `/request-a-quote/`.
- Link the industry pages ↔ the "Best <industry> appointment setting companies" posts ↔ industry case studies, in both directions.
- Add a "Services" and "Industries" block to the blog sidebar or footer. The global footer already gets crawled on all 390 pages, so it's the cheapest place to signal priority.

### 4.6 Fix contradictory trust claims
The site claims different track records in different places: "+19 years" (37 times), "19+ years" (16), "17+ years" (8), "15+ years" (10, including the appointment-setting meta description and Product schema), "18+ years" (6), "since 2007" (`/reviews/`). Third-party profiles say it was founded in 2006. Pick one fact (for example "Since 2007"), which doesn't go out of date the way "N years" does, and replace it everywhere, including meta descriptions and schema.

---

## 5. Copy-Paste Rewrites

> Check every proof point (client names, numbers, "cancel anytime", Clutch rating) against current contracts and published sources before going live. They come from the site and third-party profiles as of the audit date.

### Titles (≤ 60 characters) and meta descriptions (≤ 155 characters)

| URL | New title | New meta description |
|---|---|---|
| `/` | B2B Sales Outsourcing & Appointment Setting \| SalesRoads | US-based SDR teams that book qualified B2B meetings for you. Trusted by Shell, Paylocity & Clutch. Transparent pricing, cancel anytime. Get a quote. |
| `/appointment-setting-services/` | B2B Appointment Setting Services \| SalesRoads | Onshore SDRs who book qualified meetings with decision-makers. 937 appointments for AchieveIt. See pricing and case studies, then request a quote. |
| `/outsourced-sdr-services/` | Outsourced SDR Services: Dedicated US Reps \| SalesRoads | Get a fully managed outbound SDR team (reps, coaching, data ops and training) for less than the cost of hiring in-house. See pricing. |
| `/outbound-calling-services/` | B2B Cold Calling Services by US-Based SDRs \| SalesRoads | Experienced onshore callers who reach decision-makers, qualify interest and book meetings with B2B decision-makers. Get a quote. |
| `/lead-generation-services/` | B2B Lead Generation Services \| SalesRoads | Researched, phone-verified B2B leads and market-research lead generation that fill your pipeline with real buyers. See case studies and pricing. |
| `/pricing/` | SalesRoads Pricing: Outsourced SDR & Appointment Setting | See exactly what an outsourced SDR program costs and how it compares with building in-house. Plans, what's included and FAQs. |
| `/blog/` | B2B Sales Blog: Cold Calling, SDR & Lead Gen \| SalesRoads | Practical guides on cold calling, outbound email, SDR management and lead generation from the team that has booked thousands of B2B meetings. |
| `/about-us/` | About SalesRoads: US-Based Sales Development Since 2007 | Meet the onshore sales development team behind 33+ published client wins, 3× Inc. 5000 and a 4.9 Clutch rating. Our story, mission and people. |
| `/why-us/` | Why SalesRoads: Onshore SDRs & Proven Results | Senior US-based reps, transparent reporting, no long-term contracts. See how SalesRoads differs from other appointment setting agencies. |
| `/reviews/` | SalesRoads Reviews: 4.9★ Client Ratings & Testimonials | Read verified client reviews of SalesRoads' appointment setting and SDR services from Clutch and G2, plus answers to common questions. |
| `/inbound-appointment-setting/` | Inbound Appointment Setting & Lead Response \| SalesRoads | Stop letting ready buyers slip through the cracks. Our SDRs follow up on inbound leads and turn them into booked meetings. |
| `/outbound-email-services/` | Outbound Email Services: B2B Cold Email \| SalesRoads | Personalized B2B cold email campaigns written and run by SDRs, with deliverability managed and replies converted into meetings. |
| `/account-reactivation/` | Account Reactivation Services: Win Back Clients \| SalesRoads | Turn dormant and lapsed accounts back into revenue with a dedicated reactivation team. Typical results and how the program works. |
| `/saas-industry/` | SaaS Appointment Setting & Lead Generation \| SalesRoads | SDRs who understand SaaS buying committees and book demos with qualified decision-makers. See SaaS case studies and results. |
| `/healthcare-industry/` | Healthcare Appointment Setting & B2B Lead Gen \| SalesRoads | Reach decision-makers at IDNs, hospitals and private practices with SDRs trained in healthcare buying cycles. See healthcare case studies. |
| `/manufacturing-industry-page/` | Manufacturing Lead Generation & Appointment Setting | SDRs who speak the language of manufacturing, from the plant floor to procurement. Book meetings with engineering and ops buyers. |
| `/fintech-industry/` | Fintech Lead Generation & Appointment Setting \| SalesRoads | Book meetings with banks, credit unions and fintech buyers. Compliance-aware SDRs with fintech case studies to prove it. |
| `/fed-sled-industry/` | Government (FED & SLED) Appointment Setting \| SalesRoads | Reach federal, state, local and education buyers. SDRs who navigate public-sector procurement and book qualified meetings. |
| `/insurtech-industry-page/` | Insurtech Lead Generation & Appointment Setting | Book meetings with carriers, MGAs and agencies. SDRs experienced in insurtech sales cycles. See Bold Penguin and InnSure results. |
| `/logistics-supply-chain-industry/` | Logistics Lead Generation & Appointment Setting | Reach shippers, 3PLs and supply-chain leaders with SDRs who know the industry. See Unishippers results. |
| `/compliance-services-industry-page/` | Compliance Services Lead Generation \| SalesRoads | Book meetings with risk, legal and compliance buyers. See how SalesRoads delivered 807 opportunities for Protecht. |
| `/all-industry-pages/` → `/industries/` | Industries We Serve: B2B Appointment Setting \| SalesRoads | Appointment setting and lead generation tailored to SaaS, healthcare, fintech, manufacturing, government and more. |
| `/client-success/` | Client Success Stories & Case Studies \| SalesRoads | How SalesRoads booked 937 appointments for AchieveIt, 807 opportunities for Protecht and more. Browse results by industry. |
| `/methodology/` | Our Outbound Sales Methodology \| SalesRoads | How we research, message, call and qualify to book meetings that close: the SalesRoads process, step by step. |
| `/careers/` | Sales Development Careers at SalesRoads | Join a sales development team built for growth: training, coaching and a culture that feels like home. See open SDR roles. |

---

## 6. Quick Wins (do these first)

| # | Action | Effort | Impact |
|---|---|---|---|
| 1 | Change the WordPress **Site Title to "SalesRoads"** to remove the 74-character suffix from 153 titles (1.1) | 5 min | 🔴 High |
| 2 | **Noindex and de-sitemap** `/request-received/`, `/meet-the-team/`, `/communication-opt-in-settings/`, `/vsa/`, and the 5 `*-landing-page` URLs (1.3) | 15 min | 🔴 High |
| 3 | Change the Rank Math **Pages schema type from Article to WebPage**, set a real display name for user `jjUplds9j0das0`, and block `/wp-json/wp/v2/users` (1.2) | 15 min | 🔴 High (SEO + security) |
| 4 | **Identify or remove the `consortiumventure24.com` script** | 15 min | 🟡 Security + speed |
| 5 | Paste in the **titles and descriptions from §5** for the 25 commercial pages | 1–2 h | 🔴 High |
| 6 | **Fix headings in the Elementor templates:** phone/CTA H3/H5 → `<p>`, one H1 per page, add H1 to blog/quote/industries | 1 h | 🟡 |
| 7 | **Delete or fix the self-serving Product/AggregateRating schema** on `/reviews/` and `/appointment-setting-services/` | 30 min | 🟡 Avoids manual action |
| 8 | **Enable `datePublished`/`dateModified`** in BlogPosting schema and show "Updated" dates on posts | 30 min | 🟡 |
| 9 | Rename or merge `/outsourcing/lead-generation-services/` so it stops competing with `/lead-generation-services/` | 30 min | 🟡 |
| 10 | Turn on **Cloudflare APO / edge HTML caching** and remove `Crawl-delay` | 1 h | 🟡 |

---

## 7. 90-Day Roadmap

| Weeks | Focus |
|---|---|
| 1–2 | All Quick Wins. Submit the updated sitemap in GSC and Bing Webmaster Tools. Use URL Inspection to request re-crawl of the top 25 commercial pages. |
| 3–6 | Cannibalization merges (1.4, 4.4) with 301 redirects. Rebuild the appointment-setting and SDR pillars (4.3 #3–4). Write the appointment-setting cost guide (#5). Refresh the 17 stale-year titles. |
| 7–10 | SalesRoads Reviews & Alternatives page and the first 3 comparison pages (4.3 #1–2). Case-study hub. Category hub pages. |
| 11–13 | Industry page second wave. Podcast transcripts. Front-end performance work (Elementor asset loading, WebP, scripts). Re-run this crawl and compare. |

**KPIs to track:** GSC impressions and clicks for the non-brand queries "appointment setting services", "outsourced sdr", "cold calling services" and "lead generation services"; average position of the 6 core service URLs; number of URLs ranking per money query (should fall to 1); demo requests from organic.

---

## 8. Flagged for External Tools

| What | Why I couldn't check it | Tool |
|---|---|---|
| Core Web Vitals (LCP, INP, CLS), field data | Needs Chrome UX Report / real-user data | PageSpeed Insights, GSC → Core Web Vitals |
| Index coverage, which URLs Google has excluded, cannibalization by query | Needs Search Console access | GSC → Pages, Performance (filter by query → Pages tab) |
| Exact rankings and search volume | Results-page checks above are a point-in-time sample | Semrush / Ahrefs position tracking |
| Backlink profile; which duplicate URLs have links (decides which URL survives a merge) | No backlink data | Ahrefs (there's already an `ahrefs-site-verification` tag) / GSC Links |
| `www` → apex redirect | The audit proxy blocked `www.salesroads.com` | `curl -I https://www.salesroads.com/` |
| What `consortiumventure24.com/js/812387.js` actually is | The audit proxy blocked the domain | Tag Assistant / ask marketing ops |
| Rendered DOM, JavaScript-dependent content | Raw-HTML crawl only | Screaming Frog with JS rendering, GSC URL Inspection |

---

### Sources consulted
- Live crawl of https://salesroads.com/ (robots.txt, sitemap_index.xml and 5 sub-sitemaps, 390 sitemap URLs + 39 linked URLs), 2026-10-01
- SERP checks: "B2B appointment setting services", "sales outsourcing company", "outsourced SDR services", "B2B cold calling services company", "how much does appointment setting cost per appointment B2B", "SalesRoads reviews alternatives", "SalesRoads vs memoryBlue vs SalesHive"
- Third-party pages about SalesRoads: [G2 alternatives](https://www.g2.com/products/salesroads/competitors/alternatives), [G2 SalesRoads vs memoryBlue](https://www.g2.com/compare/salesroads-vs-memoryblue), [Cleverly review](https://www.cleverly.co/blog/salesroads-reviews), [SalesBread review](https://salesbread.com/salesroads/), [Salesforge review](https://www.salesforge.ai/blog/salesroads-review), [OutboundSalesPro review](https://outboundsalespro.com/salesroads-review/), [Alleyoop alternative](https://alleyoop.io/salesroads-alternative/), [RemoteAides](https://www.remoteaides.com/salesroads-reviews-and-best-cold-calling-agency-alternatives/)
- Competitor results: [Sales Focus](https://www.salesfocusinc.com/sales-outsourcing/appointment-setting/), [UnboundB2B](https://www.unboundb2b.com/blog/best-b2b-appointment-setting-companies-in-the-usa/), [Callbox](https://www.callboxinc.com/outsourced-sdr-services/), [memoryBlue](https://memoryblue.com/sdr-services/), [Belkins pricing guide](https://belkins.io/blog/appointment-setting-costs-pricing-models), [Leadium](https://www.leadium.com/blog/appointment-setting-services), [Clutch sales outsourcing rankings](https://clutch.co/us/call-centers/sales-outsourcing)
- [Shodan host record](https://www.shodan.io/host/51.11.20.152) for the consortiumventure24.com domain
