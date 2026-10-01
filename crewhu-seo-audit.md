# SEO Audit: crewhu.com

**Audit date:** 2026-10-01 (v2, updated with Semrush data)
**Site:** https://www.crewhu.com/ (employee recognition and CSAT software for MSPs)
**Overall health:** 🔴 Critical issues. The brand is strong, but non-branded organic search is weak and shrinking. Search brings Crewhu almost no new buyers.

> **How this audit was done.** The audit environment's network policy blocked direct access to `crewhu.com`, so I couldn't fetch raw HTML, robots.txt or the sitemap. The findings come from three sources:
> 1. Three **Semrush reports** (Domain Overview, Organic Positions, Organic Pages), US desktop, generated 1 Oct 2026.
> 2. What search engines have indexed (URLs, titles, snippets).
> 3. Competitor results and third-party listings.
>
> Items that need the raw HTML, like meta descriptions, H1s, schema and Core Web Vitals, are marked "Verify". Semrush traffic numbers are estimates. Use them for direction and relative size, and confirm against Google Search Console.

---

## 0. Semrush snapshot (US desktop, 1 Oct 2026)

| Metric | Value | What it means |
|---|---|---|
| Organic keywords (top 100) | **937** | Down from a peak of about **2,600 in mid-2023**, a fall of about 63% |
| Est. organic traffic | **1.6K / month** | Traffic cost $2.4K/month. No paid search at all. |
| Branded share of traffic | **81%** | Only about **300 visits a month** come from non-branded searches |
| Keywords in positions 1–3 | **19** | Mostly brand terms. 108 in 4–10, **179 in 11–20**, 165 in 21–30, 181 in 51–100 |
| Keywords by intent | Informational 749 (325 visits) · Navigational 114 (1.3K) · Commercial **90 (36 visits)** · Transactional 93 (1.3K, mostly brand/login) | Commercial searches bring roughly **36 visits a month** |
| Backlinks / referring domains | 15.2K / 1K | 86% follow links. **69% have an empty anchor** and 66% are image links. |
| Top linked page | `web.crewhu.com` (4,834 backlinks, 161 domains) | The CSAT widget on customer sites links to a **subdomain**, not to www |
| Semrush "top competitors" | senja.io, boast.io, minimadesigns.com, gillandrews.com | All are **testimonial/design** sites. SmileBack and Simplesat don't appear, so Crewhu barely overlaps with them on the keywords buyers use. |
| Branded traffic trend | Dipped in Mar–Apr 2026 (≈0.3K), recovered to ≈0.8K by Sep 2026 | Worth matching against GSC for a tracking change or an algorithm update |

**Where organic traffic lands (top pages):** homepage 52.5% · `/products` 15.9% (ranks for "crewhu store") · `web.crewhu.com` 8.8% · `/blog/how-to-start-a-points-system` 3.7% · `http://crewhu.com/` 3.3% · `/blog/understanding-customer-service-and-customer-care` 2.2% · `/blog/fostering-customer-loyalty-through-employee-loyalty` 1.6%. **Everything else gets under 1%.** The case studies get 0.24% or less.

---

## 1. Critical Issues 🔴

### 1.1 Non-branded visibility has collapsed, and it was never commercial
- Keyword count fell from about 2.6K (2023) to 937. Only **19 keywords rank in the top 3**, and they're mostly brand terms ("crewhu", "crewhu store", "crewhu login", "cruhu", plus "happy employees").
- The money keywords sit on page 2–5:

| Keyword | Pos | Volume | KD | CPC |
|---|---|---|---|---|
| employee recognition software | **20** | 1,900 | 46 | $44.89 |
| employee recognition programs | **41** | 5,400 | 50 | $35.39 |
| reward and recognition programme | 23 | 720 | 31 | $43.53 |
| customer surveys | 15 | 1,000 | 36 | $14.76 |
| csat software | **4** | 260 | 21 | $17.40 |
| reputation management program | 7 | 320 | 43 | $41.48 |

- Commercial-intent keywords (90 of them) bring an estimated **36 visits a month**.

**Fix:** Turn the strategy around. Stop publishing broad HR content and build MSP-specific commercial pages: comparisons (1.4), integrations (1.5), and solution pages for CSAT, recognition and gamification. Then refresh the striking-distance pages in §5.

### 1.2 Backlink equity from the CSAT widget goes to `web.crewhu.com`, not to www
Customer MSP sites embed the Crewhu CSAT widget ("…765 responses in the last 30 days, powered by Crewhu"). The widget link points to `https://web.crewhu.com/`. That gives `web.crewhu.com` **4,834 backlinks from 161 domains**, more than any page on www. Most are empty-anchor image links. `tigerhawktech.com` alone sends 6,230 sitewide links.

**Why it matters:** This is Crewhu's biggest link source. Its authority builds up on a subdomain that doesn't sell anything.
**Fix:**
- Make the widget's "Powered by Crewhu" credit a text link to `https://www.crewhu.com/` (or a dedicated `/csat-widget` landing page) with a **brand anchor** like "Powered by Crewhu".
- Don't use keyword-rich anchors. Google treats keyword-stuffed widget links as link spam. A brand credit is fine.
- If `web.crewhu.com/` is only a utility host, 301 its root to www.
- Coordinate with engineering so existing embeds update automatically.

### 1.3 Core commercial pages have generic, keyword-less titles
| URL | Current title (as indexed) | Problem |
|---|---|---|
| `/products` | Products | Gets 15.9% of traffic, but only from "crewhu store". No category keyword. |
| `/integrations` | Integrations | Loses "ConnectWise / Autotask / HaloPSA CSAT" searches to competitors |
| `/about-us` | About Us | No brand |
| `/collect-customer-feedback` | Collect Customer Feedback | Semrush shows **1 keyword, <0.01% traffic** |
| `/gamify-your-metrics` | Gamify Your Metrics | Doesn't rank |

Copy-paste rewrites are in §5.

### 1.4 Competitors rank for "Crewhu alternative" and comparison searches
- Simplesat has `simplesat.io/alternatives/crewhu-alternative` ranking for those searches. G2, Capterra, GetApp and SoftwareSuggest fill the rest, and some list outdated "$99/user" pricing.
- Crewhu has no comparison or alternatives page of its own.

**Fix:** Build `/compare/*` pages (see §4.2A).

### 1.5 No landing pages for "<PSA> CSAT survey" searches
For "ConnectWise CSAT survey integration", Simplesat, SmileBack and BizRatings rank. Crewhu doesn't. Its integration content lives only in the help center, and Semrush shows those articles getting single-keyword traffic. One example: "halopsa api documentation" at #8.

**Fix:** Create `/integrations/<psa>` pages (see §4.2B).

---

## 2. Important Issues 🟡

| # | Finding | Evidence | Fix |
|---|---|---|---|
| 2.1 | **Host duplicates rank on their own** | `http://crewhu.com/` has 3.3% of traffic and 3 keywords. Backlinks point to `https://crewhu.com/` (223 domains) and `http://crewhu.com/` (166 domains). | Make sure every host and protocol variant goes to `https://www.crewhu.com/` in a **single 301**. Check that canonical tags use the www HTTPS URL. |
| 2.2 | **Blog cannibalization** (several posts competing for the same intent) | SMART goals: `3-smart-goals-examples-to-improve-your-kpis`, `smart-goal-examples-for-employees`, `3-rock-star-smart-goals-examples-...`, `how-to-create-measurable-goals-...`. EBITDA: `ebitda-for-msps`, `improve-msp-ebitda`, `ebitda-strategies-msp-profit-boost`. Reviews: `how-to-get-more-google-reviews`, `best-software-for-managing-google-reviews`, `reputation-management-encouraging-customers-to-leave-reviews`, `how-to-identify-and-get-quality-reviews`, `msp-online-review-software`. CSAT: `csat-survey`, `how-to-use-csat-surveys-...`, `successful-customer-satisfaction-surveys`, `how-to-manage-the-customer-satisfaction-process`, `csat-software-for-msps`. Recognition: `employee-recognition-software`, `a-guide-to-employee-recognition-platforms-...`. | Merge each cluster into one strong page and 301 the rest into it (see the Blog Cleanup tab in the workbook). |
| 2.3 | **179 keywords sit at positions 11–20** (striking distance) | e.g. "what is the customer care" #11 (1,900), "and customer care" #9 (1,000), "customer care and" #13 (880), "customer surveys" #15, "competitive benchmarking" #18 (1,300), "importance of customer service" #11, "daily huddle" #11, "empower employees" #11, "employee retention services" #12 | Refresh the top pages first (see §5). Put the biggest effort into **relevant** ones like recognition, CSAT and customer surveys, not EBITDA. |
| 2.4 | **The top traffic posts don't lead readers anywhere** (verify) | `/blog/how-to-start-a-points-system` (39 kw, 3.7%), `/blog/6-types-of-employee-recognition-and-rewards-programs-that-really-work` (83 kw), `/blog/strategies-to-gather-client-testimonials` (62 kw), `/blog/6-types-of-benchmarking-your-business-should-use` (52 kw), `/blog/importance-of-customer-service` (45 kw) | Add an in-content CTA, a product module ("Run a points system with Crewhu") and links to the matching product page on each one |
| 2.5 | **Thin or utility URLs are indexed** | `/case-study/author/adam-radulovic` (ranks for a person's name), `iam.crewhu.com/forgot-password`, help articles such as "How to enable MFA", "Employee ID" | Noindex author archives and login/IAM pages. Leave help articles indexed but link them to marketing pages. |
| 2.6 | **Duplicate free-trial / demo pages are indexed** | `/start-free-trial`, `/free-trial-3`, `/free-trial-g2`, `/book-a-crewhu-demo-today`. Semrush shows they get almost no traffic, so the risk is low, but it's still clutter. | Noindex the campaign variants and keep one canonical `/free-trial` and one `/demo`. Remove the variants from the sitemap. |
| 2.7 | **The topic mix pulls Crewhu away from MSP CSAT** | Semrush's closest competitors are testimonial tools (senja.io, boast.io). Posts on EBITDA, keap integrations and "warehouse gamification" rank, but they don't match what Crewhu sells. | Make MSP + CSAT/recognition the core topic. Refresh drifting posts with an MSP angle or prune them. |
| 2.8 | **Case studies get almost no search traffic** | `/case-study/go2-tech` 0.24%, `/case-study/succurri` <0.01%. Kraft and ACE IT have no indexed pages. | Build a `/customers` hub with metric-led titles and link to it from product and blog pages |
| 2.9 | **Integration docs live on `get-help-tnt.crewhu.com`** | zendesk.com is a top referring domain (799 links), and help articles rank for long-tail searches | Link each article to its `/integrations/<psa>` page. Consider moving to `help.crewhu.com`. |
| 2.10 | Non-descriptive slugs / "Ask Ashley" titles | `/gamify-your-metrics`, `/ask-ashley/ask-ashley-take-one` | Retitle the posts. Change slugs only with 301s. |
| 2.11 | Structured data (verify) | — | SoftwareApplication with offers ($119/$239/$399), Organization + sameAs, BlogPosting + author, BreadcrumbList |
| 2.12 | Outdated pricing on review sites | Capterra/GetApp/Software Advice: "$99/user" | Claim the profiles and update them |

**Nice-to-have 🟢:**
- Brand misspellings: "crewhub" #10 and "crew web" #13. Add "Crewhu (sometimes spelled Crewhub)" to the About page and Organization `alternateName`.
- Measure Core Web Vitals.
- Run a test with "CSAT" first in the homepage title.

---

## 3. What's working
- **Brand demand is healthy.** "crewhu" gets 1,000 searches a month at #1, "crewhu store" 320, "crewhu login" 170.
- **"csat software" ranks #4** (CPC $17.40) through `/blog/csat-software-for-msps`. One push could get it into the top 3.
- **The backlink base is solid**: 1K referring domains, 86% follow. The widget links prove that Crewhu shows up on customer sites, and fixing their target (1.2) makes them count.
- **Some blog posts reach a lot of keywords**: points system, recognition program types, testimonial strategies, benchmarking types. They show the domain can rank informational content.
- **There's proof to use**: GO2 Tech (600% more Google reviews), Kraft (45% YoY growth), ACE IT (99% CSAT) and 4.7★ on G2.

> **Correction to v1:** v1 said `/blog/how-to-get-more-google-reviews` "ranks #1" and `/blog/employee-recognition-software` ranks for "employee recognition software for MSPs". Those came from a web-search tool, not from Google rankings. Semrush shows the reviews post isn't among the pages that get traffic. The recognition post ranks **#20** for "employee recognition software" (26 keywords, 0.62% of traffic).

---

## 4. Content Strategy

### 4.1 Priorities (in order)
1. **Protect and grow commercial pages.** Rewrite the titles, then build these pages:
   - `/csat-surveys` (the "csat software" #4 term is the anchor keyword)
   - `/employee-recognition` (goes after "employee recognition software", #20 and $44.89 CPC)
   - `/gamification`
   - `/google-review-generation`
2. **Bottom-of-funnel pages**: comparisons and integrations (4.2A/B).
3. **Refresh and merge the blog** (2.2, 2.3, 2.4).
4. **Build linkable assets** (4.2E) to bring back authority lost since 2023.

### 4.2 Pages to build
**A. Comparison / alternatives**
- `/compare/crewhu-vs-simplesat`, `-vs-smileback`, `-vs-bonusly`, `-vs-nicereply`
- `/smileback-alternatives`, `/simplesat-alternatives`

Use one template: a positioning statement ("feedback-only vs. feedback + recognition + gamification"), a feature table, a pricing table, best fit for each tool, customer quotes and FAQs. Be fair to competitors.

**B. Integration pages**
- `/integrations/connectwise`, `/autotask`, `/halopsa`, `/kaseya-bms`, `/syncro`, `/zendesk`, `/freshdesk`, `/cloudradial`, plus Teams, Slack, BrightGauge, IT Glue, Power BI.
- Cover what syncs, the write-back to notes or custom fields, setup steps and a screenshot, and link to the help article.

**C. Solution pages**
- Google review generation for MSPs (GO2 Tech proof; say clearly that review gating isn't allowed).
- Technician retention and burnout.
- NPS for MSPs.
- Gamification.
- **Points & rewards system.** `/blog/how-to-start-a-points-system` is the #2 blog page by traffic, so build a product page to match it.

**D. Customer hub**: `/customers`, with Kraft and ACE IT as their own pages and metric-led titles.

**E. Linkable assets**
- An annual MSP CSAT & NPS Benchmark Report from anonymized platform data.
- An NPS calculator.
- A Google review link/QR generator.
- CSAT survey templates.

### 4.3 Keyword clusters (with Semrush data where available)
| Cluster | Keywords (pos / volume) | Target page |
|---|---|---|
| Recognition software | employee recognition software (#20 / 1,900), best employee recognition software 2026 (#6 / 40), peer-to-peer recognition software (#7 / 70) | `/employee-recognition` + `/blog/employee-recognition-software` |
| Recognition programs | employee recognition programs (#41 / 5,400), reward and recognition programme (#23 / 720), recognition and rewards (#8 / 110), types of rewards (#8 / 170) | Merged recognition-programs guide |
| Points / rewards | how does the point system work (#5 / 210), employee points reward system (#9 / 140), recognition points (#6 / 90) | Points-system blog post + new product page |
| CSAT / surveys | csat software (#4 / 260), customer surveys (#15 / 1,000), customer feedback emails (#9 / 70) | `/csat-surveys` + `/blog/csat-software-for-msps` |
| Reviews / reputation | reputation management program (#7 / 320), how to get customers to leave a review (#2 / 50), software to increase google reviews from staff (#3 / 50) | Merged reviews guide + review-generation page |
| Testimonials | how to get testimonials from customers (#4 / 90), testimonial request (#8 / 140) | `/blog/strategies-to-gather-client-testimonials` |
| Customer service | what is the customer care (#11 / 1,900), and customer care (#9 / 1,000), importance of customer service (#11 / 390) | Customer service/care posts, linked to CSAT |
| Gamification | employee leaderboard (#5 / 90), onboarding gamification (#5 / 50), gamification as a service (#7 / 90) | `/gamification` |
| Comparisons | crewhu vs smileback, simplesat alternative (not ranking) | `/compare/*` |

---

## 5. Quick Wins (do these first)

1. **Point the CSAT widget's "Powered by Crewhu" link at `www.crewhu.com`** with a brand anchor, and 301 the `web.crewhu.com` root if it isn't needed. This moves equity from about 4.8K backlinks onto the main site.
2. **Check that host redirects are clean.** Every `http://` and non-www variant should 301 straight to `https://www.crewhu.com/`. Also noindex `/case-study/author/*`, `iam.crewhu.com` and the campaign trial pages.
3. **Rewrite the generic titles and metas:**
   - `/products`: **Title** `Crewhu Products: CSAT, Recognition & Gamification for MSPs` · **Meta** `One platform for MSP client feedback and team engagement: one-click CSAT and NPS surveys, peer recognition, badges, rewards and PSA-powered contests.`
   - `/integrations`: **Title** `Crewhu Integrations: ConnectWise, Autotask, HaloPSA & More` · **Meta** `Connect Crewhu to ConnectWise, Autotask, HaloPSA, Syncro, Zendesk, Teams, Slack and BrightGauge. Surveys sync to tickets; wins reach your team.`
   - `/collect-customer-feedback`: **Title** `CSAT & NPS Survey Software for MSPs | Crewhu` · **Meta** `Send one-click CSAT surveys on every closed ticket and automated NPS surveys, then turn happy clients into Google reviews. Built for MSPs.`
   - `/gamify-your-metrics`: **Title** `Help Desk Gamification & Technician Leaderboards | Crewhu` · **Meta** `Run contests and leaderboards on real PSA KPIs (CSAT, closed tickets, time entries) to motivate MSP technicians.`
   - `/about-us`: **Title** `About Crewhu: Built by an MSP Veteran for MSPs` · **Meta** `Founded in 2013 by Stephen Spiegel, Crewhu helps MSPs delight clients and engage their teams with CSAT, recognition and gamification.`
4. **Refresh the striking-distance pages that matter commercially:**
   - `/blog/csat-software-for-msps`: aim for top 3 on "csat software".
   - `/blog/employee-recognition-software`: aim for page 1 on "employee recognition software" (#20, 1,900 searches, $44.89 CPC).
   - The customer-care post: the "customer care" variants at #9–13 add up to about 3.8K searches.
   - For each: update the content, add FAQs, link internally from related posts, and set dateModified.
5. **Add product CTAs to the top 5 traffic blog posts** (2.4).

---

## 6. Off-Site
- Update the outdated pricing on Capterra, GetApp, SourceForge and Software Advice, and encourage new G2/Capterra reviews.
- Get integration listings on ConnectWise Marketplace, Kaseya, HaloPSA and Pax8 that link to the `/integrations/<psa>` pages.
- **69% of backlinks use an empty anchor.** Build editorial links with brand and descriptive anchors: pitch the benchmark report to ChannelPro, SmarterMSP and MSP Insights. The zippia.com link to `/blog/training-with-gamification` shows that data-driven content earns citations. Check that URL still resolves; it doesn't appear in the top pages.

---

## 7. Still Needs External Verification
| What | Tool |
|---|---|
| Meta descriptions, H1s, canonicals, alt text, schema | Screaming Frog, Rich Results Test |
| Redirects for http / non-www / web.crewhu.com | Screaming Frog or `curl -I` |
| Real clicks and impressions (Semrush figures are estimates) | Google Search Console → Performance |
| Cause of the 2023→2026 keyword decline and the Mar–Apr 2026 dip | GSC date comparison against Google update dates |
| Core Web Vitals | PageSpeed Insights / CrUX |
| Link gap vs simplesat.io and smileback.com | Semrush Backlink Gap |

---

### Sources
- Semrush: Domain Overview, Organic Research (Positions), Organic Research (Pages) for crewhu.com, US desktop, generated 1 Oct 2026 (supplied by the client)
- Indexed pages: [Homepage](https://www.crewhu.com/), [Products](https://www.crewhu.com/products), [Integrations](https://www.crewhu.com/integrations), [Pricing](https://www.crewhu.com/pricing), [GO2 Tech](https://www.crewhu.com/case-study/go2-tech), [Help center integrations](https://get-help-tnt.crewhu.com/hc/en-us/sections/360000298233-Integrations)
- Competitors: [Simplesat Crewhu alternative](https://www.simplesat.io/alternatives/crewhu-alternative), [Simplesat ConnectWise](https://www.simplesat.io/integrations/connectwise), [ConnectWise Customer Feedback](https://www.connectwise.com/platform/business-management/smileback)
- Listings: [Capterra](https://www.capterra.com/p/140426/CrewHu/), [GetApp](https://www.getapp.com/hr-employee-management-software/a/crewhu/), [G2 alternatives](https://www.g2.com/products/crewhu/competitors/alternatives)
- Stats: [NetSuite MSP challenges 2026](https://www.netsuite.com/portal/resource/articles/business-strategy/msp-challenges.shtml), [LTVplus technician burnout](https://www.ltvplus.com/msp/msp-technician-burnout/)
