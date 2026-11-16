# FlipMe Srbija: Facebook/Instagram ad test

5 creatives × 3 formats = 15 images in `png/`.

| Format | Size | Where to use it |
|---|---|---|
| `_1x1` | 1080 × 1080 | Feed (fallback) |
| `_4x5` | 1080 × 1350 | Feed on Facebook + Instagram (preferred, takes more screen) |
| `_9x16` | 1080 × 1920 | Stories + Reels (text is kept out of the top/bottom UI zones) |

In Ads Manager, upload the 4:5 as the main image and use **"Customize placements"** to swap in the 9:16 for Stories/Reels.

To change the brand name or CTA on every image: edit `BRAND` / `CTA` at the top of `build.js` and run `node build.js`.

---

## The 5 ads (copy in Serbian)

Each ad tests a different angle. A and E use the **same photo with a different hook**, so you can see whether the "how it works" or the "lost revenue" message pulls more.

### A · Kako radi (`A-konobar-dolazi`)
**Primarni tekst:**
> Vaš gost više ne mora da maše konobaru. 👋
>
> FlipMe je stona lampa koja celo veče daje toplo svetlo. Kada gostu nešto zatreba, on je samo okrene. Svetlo postane crveno i ceo tim odmah vidi koji sto ih čeka.
>
> ✔ Bez aplikacije i Wi-Fi mreže
> ✔ Baterija traje celu smenu (12–15 h)
> ✔ Postavljanje za 10 minuta
>
> Pošaljite broj stolova i dobijte ponudu za jedan radni dan.

**Naslov:** Gost okrene lampu. Konobar dolazi.
**Opis:** Lampa za poziv konobara · Isporuka u celoj Srbiji
**Dugme:** Zatraži ponudu (Get Quote)

### B · Diskretno, za fine dining i hotele (`B-diskretan-signal`)
**Primarni tekst:**
> Zvono i pejdžeri ne pripadaju lepom restoranu.
>
> FlipMe lampa izgleda kao deo enterijera. Kada gost želi nešto, okrene je i ona tiho zasvetli crveno. Vaš tim zna gde da priđe, a ostali gosti ne primećuju ništa.
>
> Bez zvuka. Bez mahanja. Bez ekrana na stolu.

**Naslov:** Diskretan poziv. Ambijent ostaje isti.
**Opis:** Za restorane, hotele i vinske barove
**Dugme:** Zatraži ponudu

### C · Dizajn i 7 boja (`C-7-boja`)
**Primarni tekst:**
> Stona lampa i poziv za konobara u jednom.
>
> Izaberite jednu od 7 boja i 5 jačina svetla da se uklopi u vaš prostor, temu ili večerašnji događaj. Sve lampe u sali svetle isto, a crveni signal se pojavi samo na stolu koji zove.
>
> Nerđajući čelik, bežična, puni se na magnetnom doku za 25 lampi.

**Naslov:** 7 boja. Jedna lampa.
**Opis:** Uklapa se u svaki enterijer
**Dugme:** Saznaj više (Learn More)

### D · Poređenje (`D-poredjenje`)
**Primarni tekst:**
> Već kupujete stone lampe? Uzmite onu koja radi i kao poziv za konobara.
>
> 🔔 Gost je okrene i pozove konobara, bez aplikacije i dugmića
> 👀 Ceo tim vidi koji sto ih treba
> 🎨 7 boja za vaš prostor
> ✍️ Vaš logo graviran na lampi (od 50 komada)

**Naslov:** Zašto ne obična lampa?
**Opis:** FlipMe lampa za ugostitelje u Srbiji
**Dugme:** Zatraži ponudu

### E · Izgubljen promet (`E-manji-racun`)
**Primarni tekst:**
> Petak, 21 h, sala puna. Na stolu 7 prazne čaše već 15 minuta, a konobar je okrenut leđima.
>
> Gost koji čeka ne poruči drugu turu, dezert ni kafu.
>
> Sa FlipMe lampom gost samo okrene lampu, a ceo tim vidi koji sto ih treba. Brži servis bez novog zapošljavanja.

**Naslov:** Gost koji čeka konobara poruči manje.
**Opis:** Ponuda za vaš lokal za 1 radni dan
**Dugme:** Zatraži ponudu

---

## Suggested test setup

**Goal:** find out whether Serbian venue owners are interested, before buying stock.

- **Campaign objective:** Leads, with an **Instant Form** (people sign up without leaving Facebook, and the website doesn't need to be live yet). Switch to Traffic → okreni.rs once the site is online.
- **Structure:** 1 campaign → 1 ad set → all 5 ads. Let Meta show the better ones more.
- **Location:** Serbia. **Age:** 25–60. **Language:** Serbian (Latin and Cyrillic, both show as "Serbian").
- **Audience:** detailed targeting, broad and B2B-leaning. Look for interests such as restaurant management, hospitality industry, restaurants, bars, hotels and small business owners. Meta's exact interest names change, so pick what Ads Manager suggests for these terms.
- **Placements:** Advantage+ (automatic), with the 9:16 images set for Stories/Reels.
- **Budget:** about 2,000–3,000 RSD/day for 7 days (roughly €120–180 total). Don't change anything for the first 3 days.

**Instant Form questions (Serbian):**
1. Naziv objekta *(short answer)*
2. Tip objekta: Restoran / Kafić ili bar / Kafana / Hotel / Bašta ili splav / Drugo
3. Broj stolova: Do 15 / 16–25 / 26–50 / Više od 50
4. Grad *(short answer)*
5. Ime, telefon, e-pošta *(auto-filled by Facebook)*

Use the **"Higher intent"** form type (adds a confirmation step) so you get fewer but more serious leads.

**How to read the results after 7 days** (rules of thumb, not guarantees):
- **Link CTR above ~1%** means the message gets attention.
- **Leads that pick 16+ tables** are the real signal. Call every lead within 24 h and note who would actually take a trial.
- Compare the 5 ads on **cost per lead**, not likes. Pause the weakest two, put the budget on the best ones and test new hooks against the winner.

---

## Before you run these

1. **Image rights.** These photos are FlipMe's marketing material. Get written permission from the manufacturer to use them in your ads (and their product name), especially since image 4 shows identifiable people.
2. **Alcohol policy (ad B).** The champagne bottle in ad B can trigger Meta's alcohol rules and limit delivery. Serbian law also restricts alcohol advertising. If B gets rejected or limited, drop it or crop the bottle out.
3. **Brand name.** `okreni.rs` is still the placeholder name from the website. Change `BRAND` in `build.js` and re-render if you choose another one.
4. **Promises.** The copy mentions delivery across Serbia, a quote within one working day and free logo engraving from 50 lamps. Make sure you can keep these.
