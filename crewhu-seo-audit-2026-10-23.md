# SEO Audit: crewhu.com (v3, live crawl)

**Audit date:** 2026-10-23
**Site:** https://www.crewhu.com/ (employee recognition and CSAT software for MSPs, on HubSpot CMS)
**Overall health:** 🟡 Needs Work. The technical base is sound and the blog is now active again. But the pages that sell the product are thin and poorly tagged, and the blog posts have no article schema.

> **How this audit was done.** Unlike v1 and v2 (`crewhu-seo-audit.md`), this run could reach the site directly. I fetched the homepage, `robots.txt`, the XML sitemap and **all 372 sitemap URLs**, then pulled each one's status code, title, meta description, canonical, robots meta, headings, schema types and word count. The Semrush figures and off-site findings in v2 still stand; this version adds what the raw HTML shows. Core Web Vitals, index coverage and backlinks still need external tools (§6).

---

## Scorecard

| Area | Result |
|---|---|
| HTTPS, www and trailing-slash redirects | ✅ All single-hop 301s to `https://www.crewhu.com/…` |
| HSTS | ✅ `max-age=31536000` |
| 404 handling | ✅ Real 404 status |
| Sitemap URLs returning 200 | ✅ 372 / 372, no redirects |
| Unique titles | ✅ No duplicates |
| One H1 per page | ✅ 369 / 372 |
| Blog posts with Article/BlogPosting schema | ❌ **0 of 325** |
| Product pages with a real meta description | ❌ **0 of 6** (each one is just the page name) |
| Noindexed or test pages listed in the sitemap | ❌ 6 |
| Titles over 60 characters | ⚠️ 101 |
| Meta descriptions over 160 characters | ⚠️ 101 |

---

## 1. On-Page SEO

### 🔴 1.1 The product pages are thin and their meta descriptions are placeholders
The six pages that sell the product carry the least SEO weight on the site:

| Page | Title | Meta description | Words |
|---|---|---|---|
| `/products` | Products - Crewhu | "Products" | 545 |
| `/collect-customer-feedback` | Collect Customer Feedback | "Collect Customer Feedback" | 448 |
| `/gamify-your-metrics` | Gamify Your Metrics - Crewhu | "Gamify Your Metrics" | 336 |
| `/recognize-your-team` | Recognize your Team - Crewhu | "Recognize your Team" | 445 |
| `/reward-a-job-well-done` | Reward a job well done - Crewhu | "Reward a job well done" | 341 |
| `/improve-your-online-rep` | Improve Your Online Rep - Crewhu | "Improve Your Online Rep" | 353 |
| `/integrations` | Integrations - Crewhu | "Integrations" | 277 |
| `/about-us` | About Us - Crewhu | "About Us" | 390 |

Word counts include the navigation and footer, so the real body copy is smaller still. None of the titles name a keyword a buyer would search for. Compare `/pricing`, which already does this well: "Pricing & Plans: Employee Recognition Software | Crewhu".

**Fix (copy-paste ready):**

| Page | New title | New meta description |
|---|---|---|
| `/collect-customer-feedback` | CSAT Survey Software for MSPs \| Crewhu | One-click CSAT surveys inside every ConnectWise, Autotask and HaloPSA ticket. See responses in real time and act on unhappy clients fast. |
| `/gamify-your-metrics` | Help Desk Gamification for MSP Teams \| Crewhu | Turn SLAs, CSAT and ticket metrics into leaderboards and contests your technicians actually care about. Built on your PSA data. |
| `/recognize-your-team` | Employee Recognition Software for MSPs \| Crewhu | Peer-to-peer recognition tied to real customer feedback. Celebrate technicians publicly and cut turnover on your service desk. |
| `/reward-a-job-well-done` | Employee Rewards & Points Program for MSPs \| Crewhu | Give technicians points they can spend on gift cards and Crewhu store rewards, triggered automatically by CSAT and KPIs. |
| `/improve-your-online-rep` | Get More Google Reviews for Your MSP \| Crewhu | Turn happy CSAT responses into Google and G2 reviews automatically. GO2 Tech grew its reviews 600% with Crewhu. |
| `/integrations` | Crewhu Integrations: ConnectWise, Autotask, HaloPSA & More | Connect Crewhu to the PSA, RMM, documentation and chat tools your MSP already runs, including ConnectWise, Autotask, IT Glue and Slack. |
| `/products` | Crewhu Platform: CSAT, Recognition & Gamification for MSPs | One platform for client feedback, technician recognition, rewards and online reviews, built for managed service providers. |

Then expand each product page to **at least 800 words of body copy**: who the feature is for, how it works with the PSA, a screenshot, one customer result, an FAQ block and a demo CTA. Give `/integrations` its own section, or better a child page, for each integration (see 3.3).

### 🟡 1.2 The homepage H1 has no keywords
- **H1:** "MOTIVATE YOUR TEAM WOW YOUR CUSTOMERS". It's catchy, but it names neither the category nor the audience.
- The title and meta description are good: "Crewhu: Employee Recognition & CSAT Software for MSPs".
- The homepage has about 490 words, most of them navigation and "LEARN MORE" buttons.

**Fix:** Keep the slogan as a visual eyebrow line, and make the H1 something like **"Employee Recognition & CSAT Software Built for MSPs"**. Add a 150–250 word intro paragraph that names the PSA integrations and the core result (CSAT, retention, reviews).

### 🟡 1.3 Every case study has the H1 "Case Study"
All six case studies use the same generic H1, and several meta descriptions are copied from the title ("How Crewhu Helped Kraft Technology Group Achieve 45 Growth", where the % sign is missing). `/case-study/msp-sees-10x-roi-and-doubles-revenue-with-crewhu1` also has a stray `1` in its URL.

**Fix:** Make the H1 the result headline (for example, "How Kraft Technology Group Achieved 45% Growth with Crewhu"), keep "Case Study" as a label above it, and write a real 140–155 character meta description for each. Leave the `…crewhu1` URL alone unless you also add a 301.

### 🟡 1.4 Blog posts repeat the H1 as an H2 and have empty headings
In the posts I sampled (`/blog/customer-feedback-software`, `/blog/how-to-start-a-points-system`), the template shows the title as the H1, repeats it as the first H2, and outputs empty `<h3></h3>` elements. The sidebar widgets ("Recent Posts", "Contact Us") are also marked up as H2/H3.

**Fix:** In the HubSpot blog post template, drop the duplicate H2, remove the empty H3s, and change the sidebar titles to styled `<p>` or `<div>` elements so each post's outline is only its own content.

### 🟡 1.5 Titles and meta descriptions are often too long or too short
- **101 titles are over 60 characters** and will be cut off in results. Many are long blog headlines that also add "| Crewhu".
- **101 meta descriptions are over 160 characters**, and 18 are under 70.
- Some titles have errors. For example: "How to Start an Employee Points Reward Systems: Recognize and Gamify Employee Performance " (plural "Systems", trailing space, 89 characters). This is the #4 organic landing page in v2's Semrush data, so fix it first: **"How to Start an Employee Points System (Step-by-Step) | Crewhu"**.

**Fix:** Export titles and meta descriptions (HubSpot → Content → Blog → export, or a Screaming Frog crawl) and rewrite them in batches. Start with the pages that get traffic.

### 🟡 1.6 Missing alt text on images
On the homepage, **17 of 40 images** have empty alt text, including all the main integration logos (ConnectWise, Autotask, BrightGauge, IT Glue) and the "Why Crewhu" feature graphics. Other alt text is just file names ("Screenshot 2023-06-14 at 5.22.21 PM", "Mask Group 46"). Blog posts are similar: 8–9 of every 15–16 images have no alt text.

**Fix:** Give logos alt text like "ConnectWise PSA integration". Describe feature graphics in a few words. Leave alt empty (`alt=""`) only for purely decorative images.

### 🟢 1.7 Smaller homepage fixes
- **No `og:image`** on the homepage, so links shared on LinkedIn or Slack show no preview image. Add a 1200×630 branded image.
- The phone link is wrong: the footer shows **954-231-3443**, but its `tel:` link dials **954-399-3499**. Use one number in both places.
- The LinkedIn footer link points to `linkedin.com/company/3855610/admin/`, the admin URL. Change it to `https://www.linkedin.com/company/crewhu/`.
- The two blog teasers end mid-sentence ("How to Improve Employee." and "Employees leave for predictable reasons like inadequate pay and poor."). Use the full title and a proper excerpt.
- The industry badges are from 2021–2022. Swap in current G2 or Capterra badges if you have them, because stale badges weaken trust.

---

## 2. Technical SEO

### 🔴 2.1 Blog posts have no Article schema, and most core pages have no schema at all
- **None of the 325 `/blog/` posts** have `BlogPosting` or `Article` structured data. They only have a hand-added `Organization` block. Oddly, the 19 *Ask Ashley* and *Weekly Win* posts **do** have full `BlogPosting` + `Person` + `WebPage` markup, so the right template already exists in the portal.
- **The homepage, `/pricing`, `/products`, every product page, `/integrations` and `/about-us` have no Organization or SoftwareApplication schema.** The homepage only has two `VideoObject` blocks.
- The `Organization` block on blog posts lists only LinkedIn in `sameAs`, and it points the logo to an SVG named `Group 452.svg`.

**Fix:**
1. Switch the main blog to the same post template (or schema module) that Ask Ashley uses, so every post outputs `BlogPosting` with `headline`, `author` (Person), `datePublished`, `dateModified` and `image`.
2. Add sitewide `Organization` schema with every social profile in `sameAs` (Facebook, X, LinkedIn, Instagram, YouTube, G2, Capterra), plus a PNG logo at least 112×112.
3. Add `SoftwareApplication` schema to the homepage and `/pricing`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Crewhu",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "Employee recognition, gamification and CSAT survey software built for MSPs.",
  "url": "https://www.crewhu.com/",
  "publisher": { "@type": "Organization", "name": "Crewhu", "url": "https://www.crewhu.com/" }
}
</script>
```
Add `aggregateRating` only if it matches reviews shown on the page, because Google penalizes ratings it can't verify. Add `offers` only with the real prices from `/pricing`.

### 🔴 2.2 Test, legacy and noindexed pages are in the sitemap
The sitemap lists these URLs:

| URL | Status |
|---|---|
| `/test-blog` | noindex, no title, no H1, 35 words |
| `/test-blog/test` | noindex, title "Test" |
| `/test-new-blog` | **indexable**, title "Test New Blog", 61 words |
| `/crewhu-blog-old` | noindex, duplicate of `/blog` |
| `/event` | noindex, 213 words |
| `/blog/2018-business-blog-index` | indexable, outdated index page |

A sitemap is a list of pages you want indexed. Listing noindexed pages sends Google mixed signals, and `/test-new-blog` is a live page Google can index.

**Fix:** In HubSpot, delete or unpublish the test blogs and `crewhu-blog-old` (301 them to `/blog`), and turn off "Include in sitemap" for any page you keep noindexed. Decide whether `/event` should exist; if it should, index it and give it real content.

### 🟡 2.3 Listing pages are missing canonicals and descriptions
`/blog`, `/ask-ashley`, `/the-weekly-win`, `/test-new-blog` and `/event` have **no canonical tag**, and `/blog` has **no meta description**. These are the hub pages that pass link equity to every post.

**Fix:** Add a self-referencing canonical to each listing template, and give `/blog` a description like: "Guides and benchmarks on CSAT, employee recognition and gamification for MSP service desks, from the Crewhu team."

### 🟡 2.4 Content sits in three separate blogs
Recognition and CSAT content is split across `/blog/` (325 posts), `/ask-ashley/` (14) and `/the-weekly-win/` (7). Some topics overlap: "Shining Stars: Creating an Effective Employee Recognition Program" sits in Ask Ashley while the employee-recognition posts sit in `/blog/`. This divides internal links and makes topical authority harder to build.

**Fix:** Keep Ask Ashley as a branded series, but tag and link its posts from the matching `/blog/` hub pages. Consider moving The Weekly Win (customer spotlights) into `/case-study/` or a `/blog/tag/customer-stories` tag.

### 🟡 2.5 An encoded character in a URL
`/blog/how-msps-can-get-more-value-out-of-connectwise%C3%B2` ends in "ò" (`ò`, probably a stray "®"), and the canonical tag uses the raw character. Create `/blog/how-msps-can-get-more-value-out-of-connectwise`, 301 the old URL to it, and update the sitemap.

### 🟢 2.6 Page weight and scripts
The homepage loads 13 external scripts: jQuery 1.11.2 (from 2014), HubSpot forms (both the v2 and legacy loaders), a third-party testimonial widget, Magnific Popup, GA4, plus Facebook, LinkedIn and Bing tracking pixels. None are deferred, and there's no `preconnect` hint for the HubSpot CDN domains. Run PageSpeed Insights (see §6). If LCP or INP is poor, start by deferring the testimonial widget and the duplicate form loader.

### 🟢 2.7 No `llms.txt`
`/llms.txt` returns 404. It's optional and has no proven effect on rankings. But for a B2B SaaS that buyers increasingly research through AI assistants, a short file listing the product pages, pricing, integrations and comparison posts costs little.

### ✅ What's working
- `http://`, non-www and trailing-slash variants all 301 in one hop to the canonical `https://www.` URL.
- HSTS is enabled. Unknown URLs return a real 404.
- `robots.txt` is clean: it only blocks HubSpot preview and preference URLs, and it declares the sitemap.
- All 372 sitemap URLs return 200 with no redirect chains.
- No duplicate titles across the site.
- The sitemap is fresh: 167 URLs have a 2026 `lastmod`, and new posts are going up weekly (`/blog/customer-feedback-software`, `/blog/customer-feedback-loop` and `/blog/improve-employee-retention` all on 20 Oct 2026).

---

## 3. Content & Keywords

### 🟢 Progress since v2
The 1 Oct audit (v2) said to stop publishing generic HR content and build commercial, MSP-specific pages. The blog has moved that way: recent posts include **`/blog/customer-feedback-software`** (5,200 words, an 8-platform comparison), `/blog/csat-benchmarks-by-industry`, `/blog/what-is-csat`, `/blog/good-csat-score` and `/blog/how-to-boost-msp-culture`. Track these in Search Console for the next 60–90 days.

### 🔴 3.1 There are still no head-to-head competitor pages
`/crewhu-vs-smileback` returns 404, and the sitemap has no "vs" or "alternative" URLs except `/blog/nps-vs-csat-analysis`. Yet `/video-library` already says: *"From Badass Raving Fans including those who switched from Smileback, Customer Thermometer, and SimpleSat."* That switching story is the strongest commercial asset on the site, and no landing page targets it.

**Fix:** Create these pages, each with a comparison table, a migration section and the matching switcher video:
- `/compare/crewhu-vs-smileback` (target: "smileback alternative", "crewhu vs smileback")
- `/compare/crewhu-vs-simplesat`
- `/compare/crewhu-vs-customer-thermometer`
- `/compare/smileback-alternatives`, a roundup that includes Crewhu.

### 🟡 3.2 The new comparison post leaves out the real competitors
`/blog/customer-feedback-software` compares Crewhu with SurveyMonkey, Typeform, Canny, HubSpot, AskNicely, Qualtrics and Medallia. Those are general survey tools that MSP buyers don't shortlist. Its `og:image` is also the *CSAT Benchmarks by Industry* graphic, a copy-paste leftover.

**Fix:** Add a "Best CSAT tools for MSPs" section (or a separate post) covering SmileBack, Simplesat, Customer Thermometer and the native ConnectWise/Autotask surveys, and give the post its own social image.

### 🟡 3.3 One integrations page for 15+ integrations
`/integrations` has about 277 words for ConnectWise, Autotask, Kaseya BMS, HaloPSA, IT Glue, BrightGauge, Hudu, ScalePad, CloudRadial, Slack, Freshdesk and more. Searches like "connectwise csat survey" and "autotask customer satisfaction survey" are high-intent and have little competition.

**Fix:** Create a short child page for each of the 4–5 largest integrations: `/integrations/connectwise`, `/integrations/autotask`, `/integrations/halopsa`, `/integrations/kaseya-bms`. Each should be about 600 words covering setup, which data syncs, a screenshot and a CTA.

### 🟡 3.4 Blog posts don't show an author or date in a way search engines can read
I found no `datePublished` or `article:published_time` in either post I sampled. Each has an author name, Stephen Spiegel, but no author page or bio. For "best software" and benchmark content, that undercuts E-E-A-T.

**Fix:** This is solved mostly by 2.1 (BlogPosting schema). Also show "Published / Updated" dates on each post, and link the author name to a bio page that states their MSP or CX experience.

### 🟢 3.5 Prune or merge outdated posts
The sitemap still includes posts with `lastmod` dates of 2014–2016 (30 URLs), `/blog/2018-business-blog-index`, `/blog/employee-engagement-2019` and `/blog/our-new-video-is-here` (340 words). Update the ones that still match a search topic, merge near-duplicates (there are at least five testimonial-gathering posts, e.g. `how-to-gather-customer-testimonials`, `strategies-to-gather-client-testimonials`, `dos-and-donts-of-customer-testimonials`), and 301 the rest to the best matching page.

---

## 5. Quick Wins (do these first)

1. **Rewrite the titles and meta descriptions on the 8 product/core pages** using the table in 1.1. About an hour in HubSpot, on the pages that sell.
2. **Remove the test and old-blog pages from the sitemap** and 301 them (2.2). About 15 minutes.
3. **Apply the Ask Ashley BlogPosting schema to the main blog template** (2.1). One template change fixes 325 pages.
4. **Fix the homepage H1, the phone-number mismatch, the LinkedIn admin link and the missing og:image** (1.2, 1.7).
5. **Publish `/compare/crewhu-vs-smileback`** with the existing switcher video (3.1). It's the highest-intent page you don't have.

---

## 6. Flagged for External Tools

| Check | Why I couldn't verify it | Tool |
|---|---|---|
| Core Web Vitals (LCP, INP, CLS) | Needs real-browser and field data | PageSpeed Insights, plus the CWV report in Search Console |
| Index coverage: how many of the 372 URLs are actually indexed | Not visible from outside | Search Console → Pages |
| Whether the new Oct 2026 posts are ranking | Too new for third-party data | Search Console → Performance, filtered by page |
| Backlinks and the `web.crewhu.com` widget link (v2 §1.2) | No backlink access in this run | Semrush, Ahrefs, or Search Console → Links |
| Rich-result eligibility after the schema fixes | Needs Google's renderer | Rich Results Test, Schema Markup Validator |
| Mobile rendering | Needs a rendered page | Lighthouse mobile audit in Chrome DevTools |

*Note:* `web.crewhu.com` (the login and widget host that v2 found collects most of the backlinks) returns a page with an **empty `<title>` and an empty meta description**. Even if it stays a utility host, give it a title like "Crewhu Login" so the links pointing to it at least carry brand context.
