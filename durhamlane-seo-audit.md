# SEO Audit: durhamlane.com

**Audit date:** 2026-11-04
**Site:** https://durhamlane.com/ (B2B sales outsourcing and outsourced SDR teams, Newcastle/North Tyneside, UK)
**Overall health:** 🟡 Needs work. The technical base is sound (WordPress + Yoast on Kinsta/Cloudflare, clean canonicals, no accidental noindex). The problems are a very heavy homepage, a broken podcast redirect rule, sitewide cannibalisation across about 230 blog posts, and commercial pages that get almost no non-brand search traffic. **87% of identifiable clicks are brand searches.** Non-brand search sends roughly 30 clicks a month.

> **How this audit was done**
> 1. **Live crawl** of all 355 URLs in the XML sitemaps, plus 209 URLs that appear in GSC but not in the sitemap, plus 53 internal-link targets that aren't in the sitemap. I extracted status codes, redirect hops, titles, metas, H1–H6, canonicals, robots, schema, internal links and images.
> 2. **Google Search Console**, Performance on Search, last 6 months (2 May – 2 Nov 2026): queries, pages, countries, devices, daily chart.
> 3. **Semrush**: Organic Positions (US), Organic Pages (US) and Domain Overview trend (Worldwide), exported 2–4 Nov 2026.
> 4. **Lab performance check** in headless Chromium (Moto G4 profile, throttled 4G/CPU). PageSpeed Insights API quota was exhausted, so these figures are indicative only.
>
> ⚠️ **The Semrush position export is for the US database, but 59% of GSC clicks come from the UK.** It only holds 83 keywords and ~213 visits/month. Re-export Organic Positions and Pages for the **UK database** before you prioritise keywords on Semrush data alone. GSC is the primary source in this audit.

---

## 0. Snapshot

| Metric | Value | What it means |
|---|---|---|
| GSC clicks / impressions (6 mo) | **2,780 / 278,147** | CTR 1.0%, avg position 10.7 |
| Monthly trend | Clicks 441 (May) → 502 (Oct). Impressions 53.3K → 40.2K. CTR 0.83% → 1.25% | Clicks are flat to slightly up. Impressions fell about 25%, partly because bot/LLM-agent queries dropped off (see 1.6) |
| Brand share | Brand queries: **1,254 clicks** of 1,434 clicks in the top-1,000 queries (**87%**) | "durhamlane" 713, "durham lane" 442, "durhamlane limited" 55, "durhamlane jobs" 22 |
| Non-brand clicks | **~180 in 6 months** from 961 non-brand queries with 118K impressions | Non-brand CTR is **0.15%**. Search brings almost no new buyers. |
| Countries | UK 1,653 clicks (CTR 2.3%) · India 233 · **US 206 clicks from 121,923 impressions (CTR 0.17%)** | US impressions are mostly bot/LLM-agent noise and non-buyer queries |
| Devices | Desktop 1,797 · Mobile 969 · Tablet 14 | |
| Semrush (Worldwide) | Traffic 2,440 → low of **1,580 (23 Jun)** → 2,260 now. Keywords 287 → low of **168 (12 Jul)** → 240 | Step-downs on ~5 Jun and ~16 Jun 2026, partly recovered from Sep |
| Semrush (US) | 83 keywords, 159 ranking positions, ~213 visits. 18 in top 3, 27 in 4–10, 22 in 11–20 | Thin. Use the UK database. |
| Indexable URLs in sitemap | 355: 231 posts, 57 podcast, 27 pages, 22 case studies, 13 webinars, 4 categories, 1 author | Every post is attributed to **one author** (Richard Lane) |
| GSC pages with impressions | **583**, of which **209 are not in the sitemap** (legacy URLs, PDFs, pagination) | 79 clicks / 19.8K impressions on these |

**Where clicks land (GSC):** homepage 1,415 (51%) · `/blog/10-sales-marketing-mantras/` 339 (mostly Spanish/Hindi "mantra para vender" searches) · `/about/careers/` 150 · `/about/` 116 · `/about/team/` 99 · `/blog/7-reasons-why-sales-is-a-great-career/` 57 · `/blog/best-sales-outsourcing-companies-uk/` 49. **The main commercial service page, `/proactive-outbound-sales-development-teams/`, got 18 clicks in 6 months.** `/inbound-lead-conversion-services/`, `/customer-expansion-services/` and `/event-sales-support/` got 0 each.

---

## 1. Critical Issues 🔴

### 1.1 The homepage loads about 27 MB of media, all eagerly
| Asset | Size | Loading |
|---|---|---|
| Lead Converter conveyor GIF: https://durhamlane.com/app/uploads/2024/11/Homepage-Animation-2-Compressed.gif | **11.95 MB** | Eager, in the HTML **twice** (desktop and mobile copies) |
| Skyline / telescope GIF: https://durhamlane.com/app/uploads/2024/11/Homepage-Animation-3_Compressed.gif | **7.23 MB** | Eager, in the HTML twice |
| **Hero background video:** https://durhamlane.com/app/uploads/2025/05/durhamlane-Website-Banner.mp4 | **7.04 MB** | `autoplay muted loop` with no `poster` and no `preload="none"` |
| Icon GIFs: https://durhamlane.com/app/uploads/2024/08/Technology_Icon-Animated-Test-3.gif, https://durhamlane.com/app/uploads/2024/08/Icon_Data-Pacific-Blue.gif, https://durhamlane.com/app/uploads/2024/08/People_Icon-Animated.gif | 0.93 + 0.40 + 0.09 MB | Eager |

In a throttled mobile test the homepage **never fired its `load` event within 90 seconds**. The service and blog pages loaded in 9–10 s. 59 of the homepage's 84 images have no width/height attributes, and only 9 are lazy-loaded. Measured CLS was low (0.002), so layout shift isn't the problem. The problem is weight and bandwidth contention on mobile, which pushes back LCP and interactivity on the page that takes 51% of all clicks.

**Fix:**
- Convert both large GIFs to **MP4/WebM** (`<video autoplay muted loop playsinline>`). This usually cuts size by 90–95%. Or use animated WebP/Lottie, or a static WebP with the animation on hover.
- Output the desktop/mobile duplicate blocks **once** and make them responsive with CSS, instead of shipping both copies.
- Hero video: add a lightweight `poster` WebP, `preload="none"` or `metadata`, and a mobile source under 1.5 MB (or a static image on mobile). Re-encode to H.264/H.265 at about 1–2 Mbps.
- Add `loading="lazy"` to everything below the fold and `fetchpriority="high"` to the LCP element.
- Then confirm in PageSpeed Insights and in the GSC Core Web Vitals report (field data).

### 1.2 Broken podcast redirect rule: a 2-hop chain on every legacy episode, and the old hub goes to a random episode
The podcast was renamed from "The Insiders" to "Inside the Funnel". The redirect rule adds a stray `/s/` segment:

```
https://durhamlane.com/podcast/the-insiders/<slug>/              301 →
https://durhamlane.com/podcast/inside-the-funnel/s/<slug>/       301 →   ← the chain happens here (stray /s/)
https://durhamlane.com/podcast/inside-the-funnel/<slug>/         200
```

Example: https://durhamlane.com/podcast/the-insiders/managing-the-risk-of-buyers-remorse/ → https://durhamlane.com/podcast/inside-the-funnel/s/managing-the-risk-of-buyers-remorse/ → https://durhamlane.com/podcast/inside-the-funnel/managing-the-risk-of-buyers-remorse/

- **48 legacy podcast URLs** with GSC impressions go through this 2-hop chain. The workbook's **Redirect Fixes** tab lists every source, intermediate and final URL in full.
- One non-podcast chain does the same thing: https://durhamlane.com/sales-recruitment/ → https://durhamlane.com/services/ → https://durhamlane.com/proactive-outbound-sales-development-teams/ (698 impressions).
- The old **hub** `/podcast/the-insiders/` and its `/page/2/` and `/page/3/` redirect to a **single episode** (`/selling-smarter-in-a-world-of-smarter-buyers/`) instead of the hub `/podcast/inside-the-funnel/`.
- The podcast hub's paginated pages still carry the old name in their title: "The Insiders Podcast | B2B …".

**Fix:** Change the regex so that `^/podcast/the-insiders/(.+)$` → `/podcast/inside-the-funnel/$1` in one hop, and `^/podcast/the-insiders/?(page/\d+/?)?$` → `/podcast/inside-the-funnel/`. Then add a separate rule that sends `/podcast/inside-the-funnel/s/(.*)` → `/podcast/inside-the-funnel/$1` for anything already cached. Fix the archive title template.

**Where the chained URLs are linked from.** I checked every link on 420 pages of the site (all sitemap URLs plus every blog, category, author, podcast and case-study archive page). **None of the 49 two-hop URLs is linked from durhamlane.com itself.** They're reached from Google's index and from links outside the site. These are the external links I found:

| Page containing the link | What the link is | Redirecting URL it points to |
|---|---|---|
| https://www.youtube.com/shorts/mM5Wec7IzFw (durhamlane YouTube Short) | Description: "Listen to the full episode here: https://durhamlane.com/podcast/the-insiders" | https://durhamlane.com/podcast/the-insiders → `/inside-the-funnel/s` → a single episode, not the hub |
| https://www.youtube.com/shorts/VQZCk1TFsLc (durhamlane YouTube Short) | Description: "Listen to the full conversation: https://durhamlane.com/podcast/the-insiders" | same as above |
| https://www.linkedin.com/posts/durhamlane_marketing-and-sales-one-revenue-team-activity-7356707742738182145-PKsN | Bare URL in the durhamlane post | https://durhamlane.com/podcast/the-insiders/getting-more-from-marketing/ |
| https://www.linkedin.com/posts/durhamlane_gravitas-wins-calls-richard-lane-breaks-activity-7361056255617945600-h0Mk | Bare URL in the durhamlane post | https://durhamlane.com/podcast/the-insiders/cold-calling-in-the-age-of-ai/ |
| https://www.linkedin.com/posts/durhamlane_marketing-isnt-a-colouring-department-it-activity-7336440421952237569-Xt3N | Bare URL in the durhamlane post | https://durhamlane.com/podcast/the-insiders/making-marketing-a-revenue-center-from-colouring-book-to-cheque-book/ |
| https://www.linkedin.com/posts/durhamlane_active-listening-sounds-simple-but-its-activity-7366480093734400001-3lIW | Bare URL in the durhamlane post | https://durhamlane.com/podcast/the-insiders/reinventing-sales-conversations-why-listening-and-curiosity-win/ |
| https://www.linkedin.com/posts/durhamlane_for-the-first-time-richard-lane-stepped-activity-7359293119504285699-6ftc | Bare URL in the durhamlane post | same as above |
| https://www.linkedin.com/posts/richardmatthewlane_something-from-our-recent-podcast-episode-activity-7436796002340286464-p6ZF | Bare URL in Richard Lane's post | https://durhamlane.com/podcast/the-insiders/state-of-sales-coaching-2026-what-leaders-get-wrong/ |
| https://www.linkedin.com/posts/richardmatthewlane_something-jessica-said-early-in-our-conversation-activity-7439353567053811712-Z3rB | Bare URL in Richard Lane's post | https://durhamlane.com/podcast/the-insiders/how-to-build-a-high-performing-marketing-organisation/ |
| https://www.linkedin.com/posts/sascha-rahman-19968a156_how-does-ifm-drive-successful-and-safe-activity-6963148025561059328-v7Bj | Bare URL in a guest's post | https://durhamlane.com/podcast/the-insiders/managing-the-risk-of-buyers-remorse/ |
| durhamlane Facebook video (Catherine Dutton, Pegasystems) | URL in the video description | https://durhamlane.com/podcast/the-insiders/making-marketing-your-most-valuable-asset/ |
| https://yellowpages-tl.cybo.com/GB/wallsend/recruiter (and other Cybo regional pages) | Website field of the listing "durhamlane Sales Recruitment Agency", phone 0191 336 1490 | https://durhamlane.com/sales-recruitment/ |

The search index only shows part of LinkedIn, YouTube and Facebook, so expect more old episode links in other posts. Fixing the redirect rule on the server covers all of them, wherever they are. Also edit the YouTube descriptions, because the bare `/podcast/the-insiders` link currently lands on one random episode. The Cybo listing is copied from a business profile. Look for a Google Business Profile or directory listing called "durhamlane Sales Recruitment Agency" and update its website and phone number, which differs from +44 (0)191 481 3800.

### 1.3 No real commercial page for "sales outsourcing". The old service URL redirects to a blog post
GSC shows **188 non-brand "sales outsourcing / outsourced SDR" queries with 15,008 impressions and only 28 clicks** (CTR 0.19%, avg position 8.6). Examples:

| Query | Impr. | Pos. |
|---|---|---|
| sales outsourcing uk | 851 | 9.8 |
| b2b outsourced inside sales | 509 | 8.4 |
| sales outsourcing | 443 | 10.0 |
| uk sales outsourcing | 437 | 8.1 |
| sales outsourcing in the uk / sales outsourcing companies uk | 386 / 386 | 8.4 / 9.8 |
| sdr outsourcing | 314 | 10.7 |
| outsource sales uk | 283 | 11.2 |
| b2b inside sales outsourcing | 244 | 5.6 |
| outsourced sales team uk / outsourced sales uk | 230 / 220 | 14.4 / 13.2 |
| b2b sales outsourcing | 209 | 8.2 |
| sdr agency | 133 (10 clicks) | 6.7 |

The rankings are split between a listicle (`/blog/best-sales-outsourcing-companies-uk/`), `/blog/sales-outsourcing/`, `/blog/sales-outsourcing-companies/`, `/blog/how-sales-outsourcing-in-europe-the-uk-can-increase-sales/`, `/home/sales-outsourcing-faqs/` and the homepage. Meanwhile **`/sales-outsourcing/` (1,377 impressions in GSC) 301-redirects to `/blog/sales-outsourcing/`**, a post titled "3 Reasons B2B Brands Turn to Sales Outsourcing". 15 internal links still point to `/sales-outsourcing/`. `/sales-recruitment/` goes through a 2-hop chain to the outbound page.

**Fix:** Bring back **`/sales-outsourcing/` as a commercial service page**: "Sales Outsourcing UK | Outsourced B2B Sales & SDR Teams". Include the service model, pricing approach (link the SDR cost calculator), sectors, case studies, an FAQ and a CTA. Point the cluster's internal links and the "best companies" listicle at it with "sales outsourcing" anchors. Move the 3-reasons post to a distinct slug (for example `/blog/why-b2b-brands-outsource-sales/`). Section 2.1 covers the rest of the cluster.

### 1.4 Sitewide cannibalisation: many posts chase the same intent
Duplicate titles, near-identical topics and podcast or webinar recaps republished as blog posts split relevance and links. The clearest groups:

| Cluster | Competing URLs | Evidence | Recommendation |
|---|---|---|---|
| **Sales outsourcing** | `/blog/sales-outsourcing/`, `/blog/sales-outsourcing-companies/` (5.4K words), `/blog/best-sales-outsourcing-companies-uk/`, `/blog/sales-team-outsourcing/`, `/blog/sales-process-outsourcing/`, `/blog/how-sales-outsourcing-in-europe-the-uk-can-increase-sales/` (3.7K impr, pos 12.9, **0 internal links**), `/blog/what-to-expect-when-you-outsource-b2b-sales/`, `/blog/dont-believe-everything-you-hear-about-outsourcing/`, `/blog/why-outsourcing-external-partnerships-can-increase-sales/`, `/blog/the-true-cost-of-managing-a-sales-operation-and-why-you-should-consider-outsourcing/`, `/blog/how-to-buy-a-sales-outsourcing-solution/` **and** `…-solution-2/`, `/home/sales-outsourcing-faqs/` | Semrush: "uk sales outsourcing" #6 listicle vs #29 Europe/UK post; "outsource sales uk" #12 vs #36 | One commercial hub (1.3). Keep the listicle (comparison intent) and `sales-outsourcing-companies` (how-to-choose intent). Merge Europe/UK, sales-team-outsourcing and the 2 how-to-buy posts into the hub. 301 the thin ones (<1K words). |
| **Sales as a career** | `/blog/7-reasons-why-sales-is-a-great-career/` (18.7K impr, pos 12.5), `/blog/is-sales-a-good-career-choice/` (3.0K impr, pos 17.9), `/blog/graduate-jobs-for-international-students/` | Semrush: "is sales a good career" #19 vs #50. "is sales a good job" #18 vs #47/#49. "are sales jobs worth it" #10 vs #43. Both open with the same stat (7% vs 8% of UK workforce). | **Merge** `is-sales-a-good-career-choice` into `7-reasons…` and 301 it. Link the merged page to `/about/careers/` (recruitment value). |
| **Cost of an SDR team** | `/blog/the-true-cost-of-building-an-sdr-team/` (949 words) and `/blog/the-true-cost-of-sdr-teams-and-what-leaders-overlook/` (1,852 words) share **the exact same `<title>`**. Also `/sdr-cost-calculator/`, `/blog/enterprise-sales-development-representative-salary/`, `/blog/build-or-buy-sdr-team/` (already 301s) | | 301 the shorter post into the longer one. Make the longer post link to the calculator. |
| **Sales mis-hire** | `/blog/what-a-sales-miss-hire-actually-costs-you/` (923 words) and `…-and-how-to-avoid-it/` (1,357 words) | Near-duplicate slugs and H1s. Note the slug typo "miss-hire". | Merge into one and 301 |
| **Demand gen performance reports** | `/blog/demand-generation-performance-report/`, `…-q2-2022/`, `…-q1-2023-2/`, `/blog/the-demand-generation-performance-report-2022/`, `…-2023/` | 5 thin (~700-word) gated-report teasers, all near 0 impressions | Merge into one evergreen `/blog/demand-generation-performance-report/` with an archive section. 301 the rest. |
| **Demand vs lead generation** | `/blog/demand-generation-vs-lead-generation/` (22K impr, **pos 19.8, 0.02% CTR**), `/blog/top-trumps-lead-generation-outsourced-sales-vs-demand-generation-vs-abm/`, `/blog/12-reasons-to-engage-a-demand-lead-generation-partner-in-2022/`, `/blog/demand-generation-the-art-of-aligned-sales-marketing-3/` | Query cluster: 16.4K impressions, 0 clicks | Make the main post the definitive guide (refresh it, see 3.2). 301 the "-3" and top-trumps posts into it. |
| **B2B lead generation** | `/blog/b2b-lead-generation/` (13.2K impr, pos 9.3), `/blog/b2b-lead-generation-strategies/`, `/blog/4-reasons-your-lead-generation-strategy-isnt-working/`, `/blog/6-lead-generation-challenges-for-marketing-leaders/` (696 words, 0 links) | | Keep 1 pillar (`b2b-lead-generation`) and 1 strategies post. Merge the two thin "reasons/challenges" posts. |
| **Sales training** | `/blog/b2b-sales-training/` (5.0K words), `/blog/b2b-sales-training-programs/` (6.0K words), `/blog/sales-development-training/` | Training vs training-programs is the same intent | Make the `-programs` listicle the pillar. Re-angle `b2b-sales-training` as a "how to build a programme" guide, or merge it. |
| **Sales handoff** | `/blog/marketing-sales-handoff/`, `/blog/sales-handoff-process/` | | Merge |
| **Sales coaching** | `/blog/why-sales-coaching-is-essential-for-success/` (pos 40), `/blog/why-sales-coaching-isnt-working/`, `/blog/6-steps-to-great-sales-coaching/` (689 words), `/blog/4-ways-video-coaching-…/` | | Merge into one coaching guide |
| **Enterprise sales** | `/blog/enterprise-sales-vs-b2b-sales/`, `/blog/b2b-sales-strategies-enterprise/` ("b2b enterprise sales" #17), `/blog/enterprise-sales-strategy-development/` (0 impr), `/blog/b2b-enterprise-sales-complexity-indicators/`, `/blog/high-performance-sellers/` (title "Enterprise Sales: …") | | Give each a clear distinct intent. Retitle `high-performance-sellers`. |
| **Blog vs podcast vs webinar copies** | Siemens Healthineers: `/blog/siemens-healthineers-demand-generation/` and `/podcast/inside-the-funnel/siemens-healthineers-demand-generation/` (**same title and meta**). Cold calling: `/blog/cold-calling-in-the-age-of-ai/` and podcast episode (same H1). Digital manufacturing: `/blog/digital-manufacturing-sales-strategy/` and `/webinars/digital-manufacturing-buying-process-webinar/` (same meta). Also Ebsta report, SDR KPIs, build-an-SDR-team, call-to-connect, adaptive leadership, storytelling, customer-first. | | Pick one canonical home per topic. The podcast/webinar page holds the media and transcript. The blog post becomes a distinct written article with a different angle and title, or gets a `rel=canonical` to the media page. |

The Excel workbook has the full list (tab **Cannibalisation**).

---

## 2. Important Issues 🟡

| # | Finding | Evidence | Fix |
|---|---|---|---|
| 2.1 | **33 podcast episodes share one title tag** | All are "Inside the Funnel Podcast \| B2B Sales Podcast by durhamlane". 3 episodes have **no H1** (`ai-native-revenue-engine-mark-boothe`, `why-channel-is-disappearing-from-b2b-sales`, `joey-gilkey-on-the-shift-to-precision`). | In Yoast → Content types → Podcast, set the title template to `%%title%% \| Inside the Funnel Podcast`. Write custom titles for the episodes that get impressions. Add the H1 to the 3 episodes. |
| 2.2 | **Indexed PDFs with no site navigation** | `/app/uploads/2021/01/Deloitte-Propel-case-study.pdf` (1,003 impr, 16 clicks; "deloitte propel" 199 impr, pos 5.5), `/app/uploads/2020/12/12-reasons-to-use-sales-outsourcing-ebook.pdf` (1,033 impr), `/app/uploads/2024/10/Magic-35-Example_Oct-2024.pdf` (462 impr) | Turn Deloitte Propel into an HTML case study (it isn't in `/case-studies/`). Then 301 the PDF, or send `X-Robots-Tag: noindex` plus a `Link: rel=canonical` header pointing to the HTML page. |
| 2.3 | **Deleted resources redirect to a category page (soft 404s)** | 8+ old gated posts (`/blog/demand-gen-report-2024/`, `/blog/marketing-challenges-2023/`, `/blog/6-blind-spots-for-new-in-role-sales-leaders/`, `/blog/account-based-marketing-to-sales-based-engagement/`, `/blog/the-ultimate-saas-recruitment-guide-2/`, `/blog/outsourced-demand-generation-checklist/`, `/blog/land-expand-accelerate-sales-in-new-b2b-markets/`, `/blog/drive-revenue-from-your-post-funding-growth-strategy/`) all 301 to `/blog/category/resources/` | Google usually treats redirects to an unrelated archive as soft 404s. Redirect each to the closest **topical** post, or return 410 if there's none. |
| 2.4 | **Internal links point to redirects** | 99 links on 56 pages point to 36 redirecting URLs. The **homepage** stat links are an example, all pointing at old case-study paths: "£700,000 estimated pipeline" → `/case-studies/enterprise/rs-industria/`, "2559% ROI delivered" → `/case-studies/demand-generation/hybrid-selling-for-medical-technology/`, "£680,000 closed-won revenue" → `/case-studies/demand-generation/intertrust-group/`, "£3m+ average contract value" → `/case-studies/demand-generation/g4s-sales/`, "Doubled the SQL target" → `/case-studies/demand-generation/fluke/`, "£13m revenue generated" → `/case-studies/demand-generation/sodexo/`, "84 Sales Qualified Leads" → `/case-studies/enterprise/omron-healthcare/`, "£40m estimated pipeline" → `/case-studies/demand-generation/konica-minolta/`. `/sales-outsourcing/` is linked from 15 pages. The workbook tab **Redirect Link Sources** lists every one with the page URL, anchor text and href as written. | Change each href to its final URL |
| 2.5 | **46 sitemap URLs have no contextual internal links** | Among them: 9 case studies (Sodexo, KPN, TigerGraph, Graphnet, InsurerCore, Teesside University, Clarity Informatics, AdvisorStream, Trail), `/blog/how-sales-outsourcing-in-europe-the-uk-can-increase-sales/` (3.7K impr), old news posts, 5 podcast episodes. They're reachable only through deep pagination (`/blog/page/20/`). | Link the case studies from sector and service pages. Add "related posts" by topic, not by date. Prune or noindex old news (2018–2021 company news posts). |
| 2.6 | **`healthcare-technology-2` slug** | `/healthcare-technology-2/` (904 impr, pos 24). `/healthcare-technology/` returns **404**. | Rename the slug to `/healthcare-technology/` and 301 the `-2` URL to it. |
| 2.7 | **Odd URL structure for the FAQ page** | `/home/sales-outsourcing-faqs/` is a child of a page called "home". It ranks for brand-noise queries ("durhamlane.com email domain type"). | Move it to `/sales-outsourcing/faqs/` (under the new hub) or `/faqs/` and 301 it |
| 2.8 | **Case-study tag filters canonicalise to blog tag archives** | `/case-studies/?tag=energy` → canonical `/blog/tag/energy/` (also healthcare, manufacturing, finance, professional-services, technology-saas). One case study is also reachable under 2 category paths (`/case-studies/inbound-lead-conversion/clarity-informatics/` = 200, with a canonical to `/new-customer-acquisition/`). | Make the filter canonicalise to `/case-studies/` itself. Better still, build proper sector case-study hubs (`/case-studies/manufacturing/`). Force a single category path with a 301. |
| 2.9 | **E-E-A-T: every one of 230 posts is attributed to Richard Lane** | Includes employee pieces ("Five Minutes with SDR Lauren Robinson", "Life at durhamlane: musings from a sales executive"), podcast recaps and guest content. The Person schema `sameAs` holds only `durhamlane.com` (no LinkedIn). | Create real author profiles (Lee Durham, Richard Lane, SDR leads, marketing team) with bios, LinkedIn `sameAs` and headshots. Reattribute posts correctly. "lee durham" (442 impr) and "guy rubin" (222 impr) are already searched. |
| 2.10 | **Duplicate Organization entities on the homepage** | Yoast's `Organization` (`#organization`, logo PNG, Facebook/X/Instagram) plus a second hand-coded `Organization` (SVG logo, YouTube/LinkedIn, address, phone) | Merge them into one entity with the Yoast `@id`. Include `address`, `telephone`, `sameAs` (LinkedIn, YouTube, X, Instagram, Facebook, Companies House), `founder`, `foundingDate`, `areaServed`. Consider `ProfessionalService` as an additional type. |
| 2.11 | **Service pages lack Service schema and have weak titles** | Service pages only carry WebPage + FAQPage. Generic titles: `/why-us/` "Why Us \| durhamlane", `/about/` "Accelerate Sales Performance \| durhamlane", `/about/careers/` "Careers - durhamlane", `/digital-campaigns/` "Digital Campaigns \| durhamlane", `/go-to-market-strategy/` "Go-to-Market Strategy \| durhamlane". | Add `Service` schema (provider = Organization, areaServed = GB/EU). Rewrite the titles (see the Title & Meta tab). Note: FAQ rich results only show for gov/health sites now. Keep the FAQs for users and AI answers, but don't expect SERP stars. |
| 2.12 | **Homepage heading structure** | H2s "Build your sales pipeline" and "Maximise lead conversion" each appear **twice** (desktop and mobile duplicate blocks). H3s render without spaces in the source: "New CustomerAcquisition", "InstallBase Retention", "Account-basedSales Development", "MaximiseEvents" (also on the outbound page and FAQ page: "The durhamlanedifference", "Become adurhamlaner"). | Output each block once. Replace `<br>` line breaks inside headings with a real space plus CSS wrapping. |
| 2.13 | **Duplicate H1s on 4 posts** | `/blog/the-true-cost-of-building-an-sdr-team/` ("…Buildingan SDR Team"), `/blog/how-to-buy-a-sales-outsourcing-solution/`, `/blog/what-a-sales-miss-hire-actually-costs-you/`, `/blog/sales-and-marketing-insights-you-missed/` | Keep one H1. Make the hero banner text a `<p>` or `<div>`. |
| 2.14 | **Sitemap `lastmod` has been bulk-reset** | 212 of 231 posts show `lastmod` 2026-10-22, the day of a template change rather than a content change | Google ignores `lastmod` once it proves unreliable. Only bump it on real content edits. |
| 2.15 | **Irrelevant traffic inflates top pages** | `/blog/10-sales-marketing-mantras/` gets 339 clicks, but mostly from "mantra para vender", "बिक्री बढ़ाने का मंत्र", "grahak bulane ka mantra" (43 queries, 8.3K impr). It shows as a "Translated result" (10.7K impr). `/pharma-life-sciences/` gets 13.1K impressions for "life sciences procurement" (pos 52–61), which isn't a buyer query. | That's fine to keep, but **leave it out of KPI reporting**. Add a CTA to the mantras post for UK sales leaders (newsletter or Magic 35 toolkit). |
| 2.16 | Webinars hub | `/webinars/` has **no meta description** and the title "Webinars Archive - durhamlane" | Title: "B2B Sales & Marketing Webinars On Demand \| durhamlane". Add a description and an intro paragraph. |

**Nice-to-have 🟢**
- **robots.txt** has two `User-agent: *` groups (a custom one plus the Yoast block). Google merges them, but consolidate into one.
- `/blog/` (the posts page) isn't in any sitemap, and its H1 "Insights" doesn't match its title "Advice & Knowledge | Sales Excellence". Align them, e.g. "B2B Sales & Marketing Insights".
- 54 titles are over 60 characters, mostly because " | durhamlane" pushes them over. Drop the brand suffix on long post titles.
- Category archive titles: `/blog/category/resources/` is titled "Reports - durhamlane". Give category pages real titles and intros, or noindex them.
- Slug typos: "miss-hire", "durhmlane Blog" (in the **title** of `/blog/7-reasons-why-sales-is-a-great-career/`, the page with the second-most impressions).
- 404s with residual impressions: `/blog/7-reason-why-sales-is-a-great-career`, `/blog/best-sales-outsourced-companies-uk-for-b2b/`, `/blog/sales-process-audit/` (→ `/blog/sales-audit-process/`), `/blog/why-august-and-december-are-not-the-quietest-months-for-sdr-pipeline-building/` (→ `/blog/the-truth-about-selling-in-august-and-december/`), `/blog-programs/`. Add 301s.
- Old news posts from 2018–2022 ("How did we perform in 2018", pandemic growth, contract renewals) have no links and almost no impressions. Noindex them, or consolidate them into an "Our story / milestones" page.
- `llms.txt` exists (Yoast-generated). It lists only 5 posts and omits sector pages. Curate it to include sector pages, case studies and the calculator.

---

## 3. Content & Keywords

### 3.1 What's working
- **Strong brand SERP**: "durhamlane" #1 with Knowledge Panel and sitelinks. "durhamlane limited" CTR 45%.
- **The about, team and careers pages rank at positions 3–4** with healthy CTR. Recruitment search intent is real ("durhamlane jobs" 265 impr, but **pos 11**).
- The **UK listicle** (`/blog/best-sales-outsourcing-companies-uk/`) ranks #1 in the US Semrush database for "sales outsourcing uk" and "uk sales outsourcing agency". In GSC it's at pos 6.1 with 13.5K impressions. It's the best commercial-intent asset on the site.
- **The Magic 35 toolkit** (`/blog/magic-35-diagnostic-toolkit/`) has a **6.9% CTR**, and the SDR cost calculator gets clicks for "sdr calculator". Tools and assets win clicks.
- Content depth is good: many posts run 2–6K words. The site has real proof: PwC, Sodexo, Konica Minolta, Fluke, Hexagon, Centrica, G4S.
- Clean technical base: HTTPS, www and http both 301 to `https://durhamlane.com/` in one hop, self-referencing canonicals on all 355 sitemap URLs, no noindex mistakes, `lang="en-GB"`, Article/BlogPosting schema with dates, breadcrumbs, OG/Twitter tags.

### 3.2 Striking-distance opportunities (GSC, positions 4–20, non-brand, bot noise removed)
| Query (cluster) | Impr. | Clicks | Pos. | Page to push | Action |
|---|---|---|---|---|---|
| what is demand generation vs lead generation (+15 variants) | 16.4K (cluster) | 0 | 15–22 | `/blog/demand-generation-vs-lead-generation/` | Rewrite: comparison table in the first screen, definitions, a "when to use each" decision guide, examples, FAQ. Title: "Demand Generation vs Lead Generation: Key Differences". Merge the "-3" and top-trumps posts into it. |
| mql to sql conversion / rate / how to improve mql | 4.6K (cluster) | 0 | 4–15 | `/blog/how-to-improve-mql-to-sql-conversion/` | Add **benchmark rates by industry** (the query wants a number), a formula and a calculator. Title: "MQL to SQL Conversion Rate: Benchmarks & How to Improve It". Link to `/inbound-lead-conversion-services/`. |
| is sales a good career / why sales / working in sales | 7.3K (cluster) | 15 | 10–18 | `/blog/7-reasons-why-sales-is-a-great-career/` (after merging 1.4) | Merge, fix the "durhmlane" typo, add pros and cons, salary data (link to the SDR salary post) and a careers CTA |
| customer onboarding outsourcing | 1,174 | 0 | 6.3 | `/blog/why-onboarding-matters-in-sales-outsourcing/` | This post is about onboarding **with** an outsourcer, but the query means outsourcing **customer onboarding**. Write a new section or page if it's a real service, otherwise ignore. |
| lead generation model | 1,157 | 0 | 5.9 | `/blog/b2b-lead-generation/` | Add a "lead generation models" section (in-house, agency, pay-per-lead, retainer) and link to `/blog/pay-per-lead-uk-sdr-retainers/` |
| b2b lead generation / b2b lead gen / lead generation b2b | ~1.5K | 2 | 7–9 | `/blog/b2b-lead-generation/` | Title: "B2B Lead Generation: Strategies, Channels & Benchmarks (2026)". Add more original data. |
| sdr team / sdr teams / building an sdr team / how to build an sdr team | ~1.5K | 1 | 7–10 | `/blog/sdr-teams-what-high-performance-really-looks-like/`, `/blog/sdr-team-structure/`, `/webinars/how-to-build-an-sdr-team-from-scratch/` | Pick a pillar ("How to Build an SDR Team"). Make it a full written guide, then link the webinar and structure posts to it. |
| sdr kpis / sdr performance | 792 | 2 | 10–11 | `/blog/sdr-kpis-that-drive-revenue-not-just-reports/` | Add a KPI table with benchmark ranges and a downloadable scorecard |
| sdr calculator | 244 | 9 | 9.8 | `/sdr-cost-calculator/` (600 words) | Title: "SDR Cost Calculator: In-House vs Outsourced SDR Costs (UK)". Add 600–1,000 words of methodology and assumptions, plus FAQ. Link it from every SDR post. |
| durhamlane jobs | 265 | 22 | **11.2** | `/about/careers/` | Title: "Sales & SDR Jobs at durhamlane \| Careers". Add `JobPosting` schema to open roles. **This one is easy.** |
| b2b objection handling / b2b sales objections | ~600 | 0 | 4–12 | `/blog/objection-handling-101-for-b2b-salespeople/` | Add an objection → response table and an FAQ |
| how to increase sales during recession | 437 | 0 | 5.9 | `/blog/sales-targets-recession/` | Freshen the year/date and the H2s that match the query |
| b2b enterprise sales | 521 | 4 | 11.8 | `/blog/b2b-sales-strategies-enterprise/` | After the enterprise cluster is resolved, rework the intro to define enterprise B2B sales |
| deloitte propel | 199 | 5 | 5.5 | PDF → new HTML case study | See 2.2 |

### 3.3 Sector pages get impressions but almost no clicks
| Page | Impr. | Clicks | Pos. |
|---|---|---|---|
| `/pharma-life-sciences/` | 13,132 | 9 | 24.3 |
| `/insurtech/` | 1,173 | 6 | 15.4 |
| `/manufacturing-sales/` | 1,123 | 3 | 11.6 |
| `/healthcare-technology-2/` | 904 | 4 | 24.1 |
| `/financial-services/` | 512 | 2 | 8.2 |
| `/professional-services/` | 419 | 2 | 10.1 |

These are about 1.1–1.5K words and get few internal links. **Fix:** give each page a "<sector> lead generation / outsourced SDRs for <sector>" focus. Embed 2–3 sector case studies (for example manufacturing: Fluke, Hexagon, Belden, RS Industria; healthcare: Omron, Graphnet, Clarity; FS: Intertrust, PwC). Add sector stats, a sector FAQ and links from every related blog post. Fix the healthcare slug (2.6).

### 3.4 Content gaps (pages to build)
1. `/sales-outsourcing/`: commercial hub (see 1.3)
2. **"<sector> lead generation"** variants built into each sector page (see 3.3)
3. **Comparison / alternatives pages**: "outsourced SDR vs in-house SDR" (merge the cost posts here), "pay-per-lead vs retainer", "SDR agency vs appointment setting agency". The site already has `b2b-appointment-setting-vs-sales`. Comparisons against named competitors are optional. The listicle already covers the market.
4. **Pricing page**: "How much does sales outsourcing cost in the UK?" `/blog/sales-outsourcing-pricing/` exists (217 impr, pos 7.6). Promote it to a `/pricing/` explainer linked from the hub and calculator.
5. **Deloitte Propel** case study in HTML, plus metric-led titles on all case studies (e.g. "Fluke: 2× SQL Target in 6 Months | Case Study").
6. **Multilingual / EMEA SDR** page: "multilingual lead generation" is a real differentiator, and a case study already exists (`/blog/multilingual-lead-generation-europe-case-study/`).

---

## 4. Technical SEO summary

| Check | Result |
|---|---|
| HTTPS / host canonicalisation | ✅ `http://` and `www.` both 301 to `https://durhamlane.com/` in one hop |
| robots.txt | ✅ Allows crawling (only `/wp/wp-admin/` blocked) and references `sitemap_index.xml`. 🟢 Two `User-agent: *` groups. |
| XML sitemaps | ✅ 7 Yoast sitemaps, 355 URLs, all 200, all self-canonical. 🟡 `lastmod` bulk-reset. 🟢 `/blog/` missing. |
| Canonicals | ✅ Self-referencing on all 355. 🟡 Case-study tag filters canonicalise to blog tags. |
| Indexability | ✅ No noindex on sitemap URLs. 🟡 Paginated archives (`/blog/page/2–20/`, author pages 3–19, category pages) are indexed and get impressions. That's acceptable, but give them unique titles ("Page 2"). |
| Redirects | 🔴 Podcast 2-hop chains (49 URLs) and hub → single episode. 🟡 `/sales-recruitment/` 2 hops. 🟡 Redirects to the resources category (soft 404). 🟡 99 internal links (56 pages) point to redirects. |
| 404s | 🟢 8 legacy 404s with residual impressions (listed in 2). No internal links point to 404s. |
| Page speed | 🔴 Homepage ~27 MB of GIF/MP4 (1.1). Other templates: lab LCP ≈ 2.0–2.2 s on throttled mobile, CLS < 0.03, 0.7–0.9 MB transfer. |
| Structured data | ✅ Yoast graph: WebSite, Organization, BreadcrumbList, Article/BlogPosting with dates, FAQPage on service pages. 🟡 Duplicate Organization. No `Service`, `PodcastEpisode`, `JobPosting`, or `Person` with sameAs. |
| hreflang | n/a. Single language (en-GB), no regional variants. Fine as-is. If the North America push grows, consider `/us/` pages only with real localised content. |
| Mobile | Viewport is set, and mobile CTR (1.48%) beats desktop (0.85%). 🔴 Homepage weight hurts mobile most. |
| Tracking | GTM, GA4 gtag, HubSpot, LinkedIn Insight, Microsoft Clarity. 25–26 script tags per page. Audit GTM for unused tags. |
| AI/LLM visibility | `llms.txt` is present. Semrush flags ChatGPT/Gemini citing the homepage, the MQL→SQL post and the career post. GSC is full of **LLM-agent prompts** used as search queries ("you are a strict icp-fit verifier…", `{ "icp fit": "no" … }`): 108 queries, **24.2K impressions**, 1 click, mostly on `/blog/icp-understanding/` (45K impr) and `/pharma-life-sciences/` ("terrapinn"). **Filter these out of reporting.** They make US impressions look large and pull the site CTR down. |

---

## 5. Quick Wins (do these first)

| # | Action | Effort | Expected impact |
|---|---|---|---|
| 1 | **Replace the 2 giant homepage GIFs with MP4/WebP, output each block once, and add a poster/preload to the hero video** | ½–1 day dev | Cuts ~25 MB from the page that gets 51% of clicks. Better mobile LCP/INP and conversion rate. |
| 2 | **Fix the podcast redirect regex** (one hop, hub → hub) | 30 min | Consolidates link equity for 48 legacy podcast URLs. Stops the hub from pointing at one episode. |
| 3 | **Podcast title template** `%%title%% \| Inside the Funnel Podcast`, and add H1s to the 3 episodes missing them | 15 min | 33 duplicate titles become unique. The episodes can rank for guest and topic names. |
| 4 | **Bring back `/sales-outsourcing/` as a service page** and repoint its 15 internal links | 2–3 days content | Targets 15K impressions a month of commercial queries at pos ~8.6 that currently get 0.19% CTR |
| 5 | **Merge the duplicate pairs**: SDR cost (same title), sales career (2 posts), mis-hire (2 posts), how-to-buy (2 posts), demand gen reports (5 posts) | 1–2 days | Ends cannibalisation and concentrates links on one URL per intent |
| 6 | **Title fixes**: careers ("durhamlane jobs" pos 11), SDR cost calculator, `7-reasons…` typo, demand vs lead gen, MQL→SQL, why-us, about, webinars (+ meta) | 1 hr | CTR gains on pages already getting 60K+ impressions |
| 7 | **Update internal links that hit redirects**, especially the 8 old case-study links on the homepage | 1–2 hrs | Cleaner crawl paths. Full equity reaches the case studies. |
| 8 | **Rename `/healthcare-technology-2/` → `/healthcare-technology/`** (with 301) | 10 min | Fixes a 404 on the obvious URL and gives a cleaner slug |
| 9 | **Deloitte Propel HTML case study** and canonicalise or 301 the PDF | ½ day | Captures the existing "deloitte propel" demand (pos 5.5) on a page with a CTA |
| 10 | **Point the 8 "→ resources category" redirects at the closest topical posts** | 30 min | Avoids soft 404s |

---

## 6. Off-site & authority (not measured: no backlink export supplied)
- Pull Semrush or Ahrefs **Backlinks for the root domain**. Check referring domains over time against the June 2026 dip, and check for links to old URLs (case-study category paths, `/the-insiders/`, PDFs) so the redirects are correct.
- **Digital PR**: the site has proprietary data (Demand Gen Performance Report, Magic 35, SDR cost model, call-to-connect benchmarks). Package it as an annual "UK B2B Pipeline Benchmark" and pitch it to trade press. Original data is also what LLMs cite.
- **Review platforms**: get Clutch, G2 (Outsourced Sales category), Sortlist and DesignRush profiles up to date. These rank for "best sales outsourcing companies UK" and feed the AI Overviews that appear on almost every target SERP (Semrush SERP features).
- Podcast guests and webinar partners (Ebsta, Hyperbound, Salesloft, Siemens Healthineers, Hexagon): ask for a link back from their sites and LinkedIn posts to the episode page.
- Get consistent NAP (Deltic House, Kingfisher Way, Silverlink Business Park, Wallsend; +44 (0)191 481 3800) on Google Business Profile, Companies House, Clutch and LinkedIn.

---

## 7. Needs external verification

| Check | Why it isn't verified here | Tool |
|---|---|---|
| Core Web Vitals (field data) | The PSI API quota was exhausted. Figures here come from a lab test. | PageSpeed Insights, GSC → Core Web Vitals, CrUX |
| Index coverage: indexed vs submitted, "Crawled – not indexed" | Not in the Performance export | GSC → Pages report |
| June 2026 visibility drop | Semrush shows step-downs on ~5 Jun and ~16 Jun. GSC clicks stayed flat. | Compare GSC daily non-brand clicks with Google update dates. Check the GSC Pages report for deindexing. |
| UK keyword rankings | The Semrush export is US-only | Semrush Organic Positions, **UK database** |
| Query × page mapping (confirms cannibalisation) | The GSC export has queries and pages as separate tabs | GSC → filter by query, then the Pages tab (or Looker Studio / BigQuery bulk export) |
| Backlink profile | No export supplied | Semrush Backlinks, Ahrefs, GSC → Links |
| Rendered-DOM issues (JS-injected content) | The crawl parsed server HTML | Screaming Frog with JS rendering, URL Inspection |
| Google Business Profile | Can't be checked externally | GBP dashboard |

---

### Sources
- Live crawl of https://durhamlane.com/ (sitemap_index.xml + legacy GSC URLs), 4 Nov 2026
- `https___durhamlane.com_-Performance-on-Search-2026-11-04.xlsx` (GSC, last 6 months)
- `durhamlane.com-organic.Positions-us-20261102` (Semrush, US)
- `durhamlane.com-organic.PagesV3-us-20261102` (Semrush, US)
- `overview-trend-2026-11-04` (Semrush Domain Overview, Worldwide, May–Nov 2026)
