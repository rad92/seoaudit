# Schema for service, sector and other inner pages

## Short answer

**Don't paste the full homepage Organization block onto the service pages.** Define the organization **once**, with all its detail, under `"@id": "https://durhamlane.com/#organization"`. Every other page should **reference** it by that `@id` and describe what the page itself is: a **Service** (service pages), a **WebPage**, and a **BreadcrumbList**.

Why:
- The `@id` is how Google connects every page to one entity. Repeating the full block adds page weight and creates a risk that the copies drift apart (an old address left on one page, for example). It adds no ranking benefit.
- Yoast **already outputs** a small `Organization` node with this same `@id` on every page. If you put the full details into Yoast's node (the `wpseo_schema_organization` filter, or Yoast settings → Site representation), they appear consistently sitewide automatically. That's fine, because it's the same entity. Just don't add a **second**, hand-coded Organization block on top of it.

**Breadcrumbs: yes, on every page except the homepage.** Yoast already generates a `BreadcrumbList` on every page. It only needs two fixes (see section 3).

---

## 1. Service page template

This example is for `/proactive-outbound-sales-development-teams/`. Yoast already outputs the `WebPage`, `WebSite`, `Organization` and `BreadcrumbList` nodes. What's missing is the **`Service`** node, plus `mainEntity` on the WebPage pointing at it.

Option A: add only the Service node. This is recommended, because Yoast keeps the rest.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://durhamlane.com/proactive-outbound-sales-development-teams/#service",
  "name": "Outbound Sales Development",
  "alternateName": ["Outsourced SDR teams", "Outbound SDR outsourcing"],
  "serviceType": "Outsourced sales development (SDR) services",
  "description": "Build a consistent B2B pipeline with outbound sales development. Outsourced SDR teams deliver qualified opportunities and accelerate revenue.",
  "url": "https://durhamlane.com/proactive-outbound-sales-development-teams/",
  "mainEntityOfPage": { "@id": "https://durhamlane.com/proactive-outbound-sales-development-teams/" },
  "provider": { "@id": "https://durhamlane.com/#organization" },
  "brand": { "@id": "https://durhamlane.com/#organization" },
  "category": "B2B sales outsourcing",
  "audience": { "@type": "BusinessAudience", "audienceType": "B2B companies with long, complex sales cycles" },
  "areaServed": [
    { "@type": "Country", "name": "United Kingdom" },
    { "@type": "Place", "name": "Europe" },
    { "@type": "Country", "name": "United States" }
  ],
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://durhamlane.com/contact/",
    "servicePhone": { "@type": "ContactPoint", "telephone": "+44 191 481 3800", "contactType": "sales" }
  },
  "isRelatedTo": [
    { "@type": "Service", "name": "Inbound lead conversion", "url": "https://durhamlane.com/inbound-lead-conversion-services/" },
    { "@type": "Service", "name": "New customer acquisition", "url": "https://durhamlane.com/customer-acquisition-services/" }
  ]
}
</script>
```

Option B: a full graph, if you replace Yoast's output on these pages. Use the same Service node as above, plus:

```json
{
  "@type": "WebPage",
  "@id": "https://durhamlane.com/proactive-outbound-sales-development-teams/",
  "url": "https://durhamlane.com/proactive-outbound-sales-development-teams/",
  "name": "Outsourced Sales Development Services | Outbound SDR Experts",
  "inLanguage": "en-GB",
  "isPartOf": { "@id": "https://durhamlane.com/#website" },
  "about": { "@id": "https://durhamlane.com/#organization" },
  "mainEntity": { "@id": "https://durhamlane.com/proactive-outbound-sales-development-teams/#service" },
  "breadcrumb": { "@id": "https://durhamlane.com/proactive-outbound-sales-development-teams/#breadcrumb" }
},
{
  "@type": "BreadcrumbList",
  "@id": "https://durhamlane.com/proactive-outbound-sales-development-teams/#breadcrumb",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://durhamlane.com/" },
    { "@type": "ListItem", "position": 2, "name": "Outbound Sales Development" }
  ]
}
```

Leave the FAQPage on the outbound page as it is. It no longer earns rich results for commercial sites, but it's harmless and AI answers use it.

### Values for each service page

Use the same template and swap these values. The descriptions are each page's current meta description.

| Page | `name` / breadcrumb name | `serviceType` | `description` |
|---|---|---|---|
| /proactive-outbound-sales-development-teams/ | Outbound Sales Development | Outsourced sales development (SDR) services | Build a consistent B2B pipeline with outbound sales development. Outsourced SDR teams deliver qualified opportunities and accelerate revenue. |
| /inbound-lead-conversion-services/ | Inbound Lead Conversion | Inbound lead qualification and conversion services | Turn inbound demand into sales opportunities with durhamlane lead conversion services. Our SDRs follow up fast, qualify leads, and boost SQLs. |
| /customer-acquisition-services/ | New Customer Acquisition | B2B new business development services | Fuel growth with customer acquisition services from durhamlane. Our SDR teams deliver sales opportunities, to help you win net new customers. |
| /customer-expansion-services/ | Customer Expansion | Account expansion, upsell and cross-sell services | Grow revenue faster with durhamlane's customer expansion services. Our SDR teams help B2B brands uncover upsell and cross-sell opportunities. |
| /event-sales-support/ | Event Sales Support | Pre- and post-event sales follow-up services | Our expert SDR teams ensure that every event delivers ROI through pre- and post-event follow-up, converting interest into sales opportunities. |
| /b2b-sales-audit-diagnostic/ | Sales Audit & Diagnostic | B2B sales audit and consultancy | Uncover gaps with a sales audit & diagnostic that benchmarks performance, exposes pipeline risks, and reveals insights for revenue growth. |
| /go-to-market-strategy/ | Go-to-Market Strategy | Go-to-market strategy consultancy | Unlock your market potential with our go-to-market strategy services. From research to execution, we help you target, message, and drive ROI. |
| /digital-campaigns/ | Digital Campaigns | B2B demand generation campaigns | Generate quality MQLs, engage buyers, and convert leads with expert SDR integration for maximum ROI. |
| /sales-outsourcing/ (new hub) | Sales Outsourcing | B2B sales outsourcing | (write it when the page is built) |

### Sector pages

For pages like `/manufacturing-sales/`, `/pharma-life-sciences/`, `/healthcare-technology/`, `/financial-services/`, `/insurtech/` and `/professional-services/`, use the same `Service` type with a sector audience. For example:

```json
"name": "Outsourced SDR Teams for Manufacturing",
"serviceType": "Outsourced sales development for manufacturing and industrial companies",
"audience": { "@type": "BusinessAudience", "audienceType": "Manufacturing and industrial technology companies" }
```

The breadcrumb name becomes "Manufacturing", "Pharma & Life Sciences" and so on (see section 3).

---

## 2. Which schema goes on which page type

| Page type | Schema to output | Organization |
|---|---|---|
| Homepage | Organization (full), WebSite, WebPage. **No breadcrumb.** | Full details |
| Service pages | WebPage + **Service** + BreadcrumbList (+ FAQPage where there are FAQs) | Reference by `@id` only |
| Sector pages | WebPage + **Service** (sector audience) + BreadcrumbList | Reference by `@id` |
| Blog posts | BlogPosting (already output by Yoast) + **Person author with LinkedIn `sameAs`** + BreadcrumbList | `publisher` by `@id` |
| Case studies | WebPage + Article (`about` the client, `mentions` the Service) + BreadcrumbList | Reference by `@id` |
| Podcast episodes | PodcastEpisode (`partOfSeries` → PodcastSeries) + BreadcrumbList | Reference by `@id` |
| Webinars | VideoObject or Event (`eventStatus`, `eventAttendanceMode` = online) + BreadcrumbList | Reference by `@id` |
| About / Team | AboutPage, plus Person nodes for the leadership team | Reference by `@id` |
| Careers | WebPage + **JobPosting** for each open role + BreadcrumbList | `hiringOrganization` by `@id` |
| Contact | ContactPage + BreadcrumbList | Reference by `@id` |

---

## 3. Breadcrumbs: what to fix

Yoast already outputs a `BreadcrumbList` everywhere. Two problems:

**a) Service and sector pages show internal admin titles.** These are what Google displays in the breadcrumb trail:

| Page | Current breadcrumb (live) | Set it to |
|---|---|---|
| /proactive-outbound-sales-development-teams/ | Home › **Services – Outbound Sales Development** | Home › Outbound Sales Development |
| /customer-acquisition-services/ | Home › **Services – New Customer Acquisition** | Home › New Customer Acquisition |
| /manufacturing-sales/ | Home › **Selling into – Manufacturing** | Home › Manufacturing |
| (same pattern on every service and sector page) | Services – … / Selling into – … | Short, clean name from the table above |

Fix: in each page's Yoast panel → Advanced → **Breadcrumbs title**, enter the clean name. Or rename the WordPress page titles, which Yoast uses as the default.

**b) There's no middle level, because the hub pages don't exist.** `/services/` 301s to the outbound page, and there's no `/sectors/` or `/industries/` page. Don't add a "Services" crumb that points to a redirect. Two options:
- Keep two levels (Home › Service). This is correct as things stand.
- **Better:** build real hub pages and add the middle level:
  - `Home › Services › Outbound Sales Development` (hub at `/services/`)
  - `Home › Industries › Manufacturing` (hub at `/industries/`)
  - `Home › Sales Outsourcing › FAQs` (once the FAQ page moves under the new hub)

  Then turn `/services/` from a redirect into a real page.

Blog posts, case studies and podcasts are already correct (Home › Blog › Post, Home › Case Studies › Study). Leave them.

**Show breadcrumbs on the page too.** Blog posts and case studies display a visible breadcrumb trail. Service and sector pages don't. Google's guidance is that breadcrumb markup should reflect what users see, so add the visible Yoast breadcrumb block to the service and sector templates as well.

---

## 4. Notes on the updated homepage block

- **Address:** the new address (Generator Studios, Trafalgar Street, Newcastle upon Tyne NE1 2LA) matches the live contact page. Update it everywhere else too: Yoast's Organization settings, the footer, Google Business Profile, LinkedIn, Companies House (registered office, if it changed) and directories such as Clutch and Cybo. The old Deltic House, Wallsend address was still in the homepage's hand-coded schema when I checked on 11 Nov, and it's still on Cybo's directory listings.
- **Phone format:** `"+441914813800"` on the organization and `"+44 191 481 3800"` in contactPoint are both valid, but use one format throughout.
- **G2 in `sameAs`:** only include it if https://www.g2.com/products/durhamlane/reviews is a live, claimed profile. I couldn't open G2 from this environment to check. Clutch, Sortlist and Companies House are worth adding once confirmed.
- Breadcrumb correctly removed from the homepage.
