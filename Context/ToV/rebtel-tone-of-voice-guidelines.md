# Rebtel copy guidelines

Use this document as the single source of truth for all copy written in Rebtel prototypes, UI designs, and product interfaces. Every string of text—from a button label to an onboarding screen—should follow these rules.

---

## Tone of voice

### Core attributes

**Proud and celebratory.** We elevate and celebrate our users' pride in their heritage. We uplift diverse stories and cultures, and we can draw on our own experiences as dual-culture people. Dual-culture people often become more closely identified with their birth culture when they're outside of it. Our tone should never be prescriptive—we're not in the business of telling people how to feel—but it can celebrate and reflect back their pride.

**Warm and supportive without sacrificing clarity.** Dual-culture people live complicated lives. Our job is to understand their needs and make their lives just a little easier and more connected. This is not about empathy—it's disingenuous to suggest we feel what they feel. Our mission is to provide a utility that brings their worlds together. Being supportive means being clear.

**Good humored and just a bit mischievous.** Our voice is about real people making real connections. Real people have a sense of humor, and so do we. This doesn't mean we're cracking jokes—it means we write and speak like real people talking to real people. A bit of mischief honors our own rebellious heritage. Humor and mischief bring our tone to life, but should be used wisely and sparingly.

### The spectrum

| We are… | But not… |
|---|---|
| Proud | Cocky |
| Celebratory | Dramatic |
| Warm | Simpering |
| Supportive | Condescending |
| Clear | Harsh |
| Good humored | Jokey |
| Just a bit mischievous | Rude |

---

## Writing basics

### Spelling

Use standard American English spelling and grammar—"color" not "colour," "Rebtel is" not "Rebtel are." When in doubt, consult Merriam-Webster.

### Sentence case

Always use sentence case, never title case. It is cleaner and more reflective of a mature tech organization. In a title, only capitalize the first letter of the first word (plus any proper nouns).

### Punctuation

- **Hyphen [-]:** Only to connect two words, e.g. "top-up."
- **En dash [–]:** Use where you'd use a colon, for a more elegant look. Always include a space on either side.
- **Em dash [—]:** Use where you'd use a semicolon, for a sleeker style and more air. Never include spaces on either side. Use with intention and caution—AI models tend to overuse them.
- **Oxford comma [,]:** Always use the final comma before "and" in a list of three or more items.
- **Ampersand [&]:** Use in titles that contain "and."

### Perspective

Always center the user's perspective. It doesn't matter what we think of our work or what internal terminology we use. What the user needs to know and do always comes first.

### No acronyms in UI copy

Never expose internal acronyms to users. While it may be "MTU" internally, it's always a "top-up" (or a recharge) for the user. Always use the full term for clarity.

---

## Terminology

### Top-up

The standard international term for a mobile top-up sent by the user to the recipient (B-side). Always spell it lowercase, hyphenated: **top-up**. This term cannot be used for anything the user does for themselves.

Localized variants (use only for specific markets):
- **Recharge** – e.g. Afghanistan
- **Airtime** – e.g. Zimbabwe

### Autopay for credits

A feature the user can toggle on/off to automatically purchase credits when their balance falls below a threshold. This is explicitly **not** an "auto top-up"—the term "top-up" is reserved for sending to the B-side.

### Rebtel Credits

A proper noun. Always capitalize both words.

### International Number

A proper noun. Always capitalize both words.

---

## Proper nouns and capitalization

Proper nouns get initial caps on each word:
- Rebtel
- Rebtel Credits
- International Number

Non-proper nouns follow sentence case (capitalize only at the start of a sentence or heading):
- top-up
- mobile top-up
- international calling

---

## Date & time

Default to American conventions—localize when the market requires it.

### Format

- American default: mm/dd/yy
- Localized alternative: dd/mm/yy
- Preferred (where space allows): "August 25" or "Aug 25"

### Time

- Use AM and PM (capitalized), e.g. 1 PM or 1:15 PM
- Omit minutes for times on the hour
- Use 24-hour time when localizing for markets that require it

### Relative timestamps (activity cards)

| Condition | Display |
|---|---|
| Same day, under an hour | `5 minutes ago` |
| Same day, over an hour | `4 hours ago` |
| 1–2 days ago | `2 days ago` |
| 3–7 days ago | Day of the week, e.g. `Wednesday` |
| More than a week ago | Abbreviated month + day, e.g. `Aug 22` |

---

## Currencies

- Use the proper currency symbol in its correct position relative to the number—e.g. $12 or 12€.
- Never use currency codes (USD, EUR, etc.) in customer-facing copy.
- Omit decimals on whole numbers. Include decimals for amounts with cents.
- In English, use a period as the decimal separator—e.g. $12.50 or 12.50€.
- Other languages may use a comma as the decimal separator and a space before the symbol—e.g. 12,50 €.

### Reference formats

| Currency | Format | Notes |
|---|---|---|
| Australian dollar (AUD) | $123,000.50 | Symbol before number. Also written A$. Comma for thousands, period for decimal. |
| Polish złoty (PLN) | 123 000,50 zł | Space for thousands, comma for decimal, space before symbol. |
| British pound (GBP) | £123,000.50 | Symbol before number. Comma for thousands, period for decimal. |
| US dollar (USD) | $123,000.50 | Symbol before number. Comma for thousands, period for decimal. |
| Euro (EUR) | 123.000,50 € | Period for thousands (space in French), comma for decimal, space before symbol. |

---

## Quick checklist for prototype copy

1. Is it in sentence case?
2. Is it written from the user's perspective?
3. Does it use "top-up" (hyphenated, lowercase) correctly?
4. Are proper nouns capitalized? Are non-proper nouns not?
5. Is there an Oxford comma in every list?
6. Are dates and currencies formatted for the target market?
7. Does it sound warm and clear—not harsh, not simpering?
8. Would a real person say this to another real person?
9. Is there zero jargon or internal acronyms?
10. If there's humor, is it light and earned—not forced?
