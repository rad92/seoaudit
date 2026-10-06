# UpKeep llms.txt audit (compared with MaintainX)

**Date:** 2026-10-06
**Trigger:** UpKeep's Perplexity brand-visibility score fell from 57% to 18% between 09/07 and 10/05/2026, while ChatGPT (≈65%) and Gemini (≈62%) held steady.
**Files reviewed:** https://upkeep.com/llms.txt and https://www.getmaintainx.com/llms.txt (both fetched 2026-10-06)

## Deliverables in this repo

| File | What it is |
|---|---|
| `upkeep-llms.txt` | Proposed replacement for https://upkeep.com/llms.txt. 105 hand-picked links plus company facts. All 107 UpKeep URLs in it returned 200 and were indexable when checked on 2026-10-06. |
| `upkeep-llms-txt-url-audit.csv` | All 2,600 unique URLs in the current llms.txt with HTTP status, final URL, noindex flag, canonical, issues found and the recommended action. Sorted with the worst problems first. |
| `upkeep-llms-txt-audit.md` | This report. |

## Side-by-side comparison

| | MaintainX | UpKeep (current) | UpKeep (proposed) |
|---|---|---|---|
| Size | 31 KB / 113 lines | **713 KB / 2,756 lines** | 19 KB |
| Links | 48, hand-picked | 2,631 (2,600 unique), auto-generated | 105, hand-picked |
| Company facts block | Yes (founded, HQ, leadership, socials) | No (one-sentence summary) | Yes |
| Link descriptions | A rich paragraph for every link | Meta description; 279 links have none | One line on what the page covers and why it matters |
| URLs that return 200 without a redirect | 42 / 48 | **20 / 2,600** | 105 / 105 |

## Issues found in UpKeep's current llms.txt

Counts come from `upkeep-llms-txt-url-audit.csv`.

| Issue | URLs | Notes |
|---|---|---|
| Redirect before the page loads (no trailing slash) | 2,436 | `/pricing` → `/pricing/`. One extra hop per link for every crawler. |
| Page is `noindex` | 202 | 82 blog posts, 79 pages, 35 podcasts. Includes `/product/asset-performance-management`, `/product/data-hub`, `/work-request-software`, `/warranty-tracking` and all `/demo/*` pages. |
| 404 Not Found | 93 | 39 pages, 33 events, 15 customer stories (Stericycle, Aesop, Kanuga, Scholle IPN, Qbic Hotels, Jet and others), 2 integrations, 2 learning articles. |
| Test, internal or placeholder page | 86 | `[System]`/`[Development]` component pages, `/-homepage-duplicate-test`, `/nova-duplicate`, `/example`, `/test-comparison-detail-page`, `-old`/`-deprecated` pages, ad landing pages (`/demo-tiktok`, `/demo-reddit`, `/demo-google`, `/demo-bing`), thank-you pages (`/success`, `/success5`). |
| Redirects to a different URL | 51 | Retired URLs still listed instead of their destination (for example `/upkeep-vs-maintainx` → `/product/compare/maintainx/`). |
| No description | 279 | Bare title and link, which gives an LLM nothing to work with. |
| Listed more than once | 28 | Mostly `/learning/*` articles. |
| Malformed URL (trailing or embedded space) | 2 | `/product/inventory-management- old`, `/work-order-software-deprecated `. |
| "Lorem ipsum" as the description | 6 | `/resources/assessments` and 3 subpages, `/test-comparison-detail-page`, `/customers/agriculturecoop`. |
| Stale placeholder | 1 | `[TBA 2/19]` in the UpKeep Intelligence description. The live page has since been fixed, which shows the file isn't regenerated from current content. |

**Recommended action breakdown (CSV column `recommended_action`):**
- Remove from llms.txt: 303 URLs. 19 of these are dead customer, product, integration or learning URLs that should also get a 301 to the closest live page.
- Keep only if curated: 2,297 URLs are live and indexable, but almost none belong in llms.txt. Use the proposed file instead.

## Issues on the site itself (beyond llms.txt)

These matter more than llms.txt for Perplexity, which retrieves and cites live pages.

1. **Live, indexable page with placeholder text.** `/customers/agriculturecoop/` has "Lorem ipsum dolor sit amet…" as its meta and OG description. Write a real description or unpublish the page.
2. **Customer stories removed without redirects.** 15 `/customers/*` URLs now return 404 instead of redirecting. If Perplexity cited them before September, those citations are gone. Restore them, or 301 each one to a matching live story or `/customers/`.
3. **Product pages marked noindex.** `/product/asset-performance-management/`, `/product/data-hub/`, `/features/floor-plan-software/`, `/features/time-cost-tracking-software/`, `/work-request-software/` and `/warranty-tracking/` are all `noindex`. Confirm each one is intentional.
4. **82 blog posts and 35 podcast episodes marked noindex.** If this was a deliberate content prune, check when it happened. If it was around early September, it lines up with the Perplexity drop.
5. **Duplicate comparison content.** `/product/compare/{maintainx,fiix,limble,emaint}/` and `/blog/{maintainx-vs-upkeep,fiix-vs-upkeep,upkeep-vs-limble,emaint-vs-upkeep}/` both return 200 and are indexable, so they compete for the same "UpKeep vs X" queries. Pick one per competitor and 301 or canonicalize the other.
6. **Learning Center template errors.** `/learning/preventive-maintenance/` has the title and description "Learning Center", which looks like a broken template. `/learning/how-to-choose-a-cmms/` has the same title and description as `/blog/best-cmms-software/`.
7. **Inconsistent customer counts.** The homepage and About page say 4,000+ companies and 40,000+ users, but `/reviews/` says "6,000+ Happy Customers". LLMs tend to repeat whichever number they find, so align them.

What checked out: robots.txt allows all crawlers, and the homepage returns 200 to PerplexityBot, Perplexity-User, OAI-SearchBot and Googlebot user agents. Those tests came from a cloud IP with a spoofed user agent, so they don't rule out Cloudflare blocking Perplexity's real IP ranges. See next steps.

## Is llms.txt causing the Perplexity drop?

Probably not on its own. No major answer engine has confirmed it uses llms.txt for ranking, and the file can't explain why only Perplexity dropped. The likelier causes are the site-level issues above (cited pages removed or noindexed) or crawler access. Perplexity depends more than ChatGPT or Gemini on live retrieval and citing specific URLs, so losing citable pages hits it first. The llms.txt cleanup is still worth doing, because it's cheap and removes conflicting signals.

## Next steps

1. **Cloudflare:** check Security → Events and bot analytics for blocks, challenges or rate limits on PerplexityBot and Perplexity-User since early September. This is the most common cause of a drop that only Perplexity shows.
2. **Timeline:** pull CMS publish and unpublish history for the 15 removed customer stories and the 202 noindexed URLs, and compare it with the 09/07 → 10/05 drop.
3. **Citation diff:** in the visibility tool, export the UpKeep URLs Perplexity cited before 09/07 and check them against the CSV (status and noindex).
4. **Replace llms.txt** with `upkeep-llms.txt` and serve it at `https://upkeep.com/llms.txt`. If it has to stay auto-generated, filter on: final status 200, no `noindex`, canonical equals self, trailing-slash URL, and no `[System]`, `test`, `example`, `-old` or `-deprecated` in the slug.
5. **Fix the site issues** (1–7 above), starting with the lorem ipsum customer story and the 404 customer stories.
6. **Re-measure** Perplexity visibility 2–3 weeks after the fixes ship.
