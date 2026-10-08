import re, sys
src, out = sys.argv[1], sys.argv[2]
h = open(src, encoding="utf-8").read()

# 1. Strip third-party / tracking scripts (keep the site's own UI modules)
def drop(m):
    s = m.group(0)
    keys = ["googletagmanager", "cookiepro", "OptanonWrapper", "hsforms", "hbspt",
            "chilipiper", "cloudflareinsights", "CHILIPIPER"]
    return "" if any(k in s for k in keys) else s
h = re.sub(r"<script\b[^>]*>.*?</script>", drop, h, flags=re.S)
h = re.sub(r"<noscript>.*?</noscript>", "", h, flags=re.S)

# 2. Point root-relative asset/link URLs at the live site
h = re.sub(r'(href|src)="/(?!/)', r'\1="https://upkeep.com/', h)
h = h.replace("url('/", "url('https://upkeep.com/")

# 3. Replace the Preventive Maintenance card with the stretched-link version
old = re.search(r'<a class="product-card reveal" href="https://upkeep.com/product/preventive-maintenance/"[^>]*>.*?</a>', h, flags=re.S)
assert old, "PM card not found"
cid = "data-astro-cid-7vr4vlc4"
new = f'''<div class="product-card product-card--anchored reveal" {cid}> <span class="product-head" {cid}> <h3 class="product-name" {cid}>Preventive Maintenance</h3> </span> <span class="product-body-wrap" {cid}> <p class="product-body" {cid}>Schedule <a class="product-card-link" href="https://upkeep.com/product/preventive-maintenance/"><strong>preventive maintenance for campuses</strong></a> on dates or meter readings, so HVAC and boilers are serviced before term starts.</p> <span class="product-link" aria-hidden="true" {cid}>Explore &rarr;</span> </span> </div>'''
h = h[:old.start()] + new + h[old.end():]

# 4. Stretched-link CSS
css = '''<style id="stretched-link-test">
.product-card--anchored{position:relative;cursor:pointer}
.product-card--anchored .product-name{margin:0}
.product-card--anchored .product-body{margin-top:0}
.product-card-link{color:inherit;text-decoration:none}
.product-card-link strong{font-weight:700;color:var(--color-gray-900)}
.product-card-link::after{content:"";position:absolute;inset:0;z-index:1}
.product-card--anchored:hover .product-card-link strong{text-decoration:underline;text-underline-offset:2px}
.product-card--anchored:focus-within{outline:2px solid var(--brand);outline-offset:3px}
.product-card-link:focus-visible{outline:none}
</style>'''
h = h.replace("</head>", css + "</head>", 1)
h = h.replace("<title>", "<title>[PREVIEW] ", 1)
h = h.replace('<meta name="description"', '<meta name="robots" content="noindex"><meta name="description"', 1)
open(out, "w", encoding="utf-8").write(h)
print("ok", len(h))
