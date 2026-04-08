# 📜 Panchangam Generator

A Tamil Panchangam daily sheet generator built as a standalone HTML utility. Designed for Vathyars (Hindu priests) and practitioners to quickly compose and print daily Panchangam sheets in the traditional format.

---

## ✨ Features

- **Two-tab interface** — Enter details in the form, then preview the formatted Panchangam
- **Auto-suggest dropdowns** — Tamil months, Samvatsaras, Nakshatras, Thithis, Yogas, Karanams, and more are pre-loaded as datalist suggestions
- **Persistent form data** — Entered values are auto-saved to `localStorage` and restored on next visit, so you don't re-type recurring fields
- **Traditional output format** — Preview matches the classic printed Panchangam layout with proper Tamil text, color-coded highlights, and structured sections
- **Print-ready** — One-click print button outputs a clean, form-free Panchangam card
- **Single-file (standalone) or multi-file** — Works both as a single HTML file or as a structured project with separate CSS, JS, and data files

---

## 📁 Project Structure

```
panchangam/
├── index.html                  # Main HTML (or standalone panchangam.html)
├── README.md
└── assets/
    ├── styles/
    │   └── styles.css          # All styling
    ├── scripts/
    │   └── scripts.js          # Form logic, card generation, storage
    └── data/
        └── data.js             # Tamil lookup arrays (months, stars, yogas, etc.)
```

> The standalone `panchangam.html` bundles everything into a single file for easy sharing.

---

## 🚀 Getting Started

### Option 1 — Standalone File
Simply open `panchangam.html` in any modern browser. No server or installation needed.

### Option 2 — Multi-file Project
1. Clone or download the project folder
2. Open `index.html` in a browser
3. All assets are loaded via relative paths — works offline

---

## 📝 How to Use

1. **Open the file** in your browser
2. Go to the **"Enter Details"** tab
3. Fill in the Panchangam details for the day:
   - Date, Tamil day (கிழமை), Tamil month
   - Samvatsara, Ayanam, Ruthu, Maasam, Paksha
   - Thithi, Vasara, Nakshatra, Yoga, Karanam (with end times and next values)
   - Sunrise, Sunset, Rahu Kalam, Yama Gandam, Kuligai, Nalla Neram
   - Srartha Thithi, Vathyar name & phone numbers
4. Click **"📜 Generate Panchangam"**
5. Review the output in the **"Panchangam Preview"** tab
6. Click **"🖨️ Print"** to print or save as PDF

> **Tip:** Fields like Nakshatra, Thithi, Yoga, etc. have auto-suggest — start typing to see Tamil suggestions.

---

## 📋 Form Fields Reference

| Field | Tamil | Description |
|---|---|---|
| Date | தேதி | Gregorian date |
| Day | கிழமை | Day of week in Tamil |
| Tamil Month | மாதம் | e.g. பங்குனி |
| Thithi No | திதி எண் | Tamil calendar date number |
| Samvatsara | சம்வத்சரம் | 60-year cycle name |
| Ayanam | ஆயணம் | Uttarayanam / Dakshinayanam |
| Ruthu | ருது | Season (6 seasons) |
| Maasam | மாஸம் | Sanskrit lunar month |
| Paksha | பக்ஷம் | Shukla (waxing) / Krishna (waning) |
| Thithi | திதி | Lunar day with end time |
| Vasara | வாஸரம் | Day deity |
| Nakshatra | நக்ஷத்ரம் | Star with end time |
| Yoga | யோகம் | Yoga with end time |
| Karanam | கரணம் | Half-tithi with end time |
| Sunrise / Sunset | உதயம் / அஸ்தம் | Sun timings for the location |
| Rahu Kalam | ராகு காலம் | Inauspicious time |
| Yama Gandam | எமகண்டம் | Inauspicious time |
| Kuligai | குளிகை | Inauspicious time |
| Nalla Neram | நல்ல நேரம் | Auspicious time slots |
| Srartha Thithi | ஸ்ராத்த திதி | Suitable tithi for ancestral rites |
| Vathyar | வாத்யார் | Priest name, location & contact |

---

## 🔤 Pre-loaded Tamil Data

The following lists are bundled in `data.js` for auto-suggest:

- **Tamil Months** — சித்திரை to பங்குனி (12 months)
- **Samvatsaras** — All 60 Tamil year names
- **Ayanams** — உத்தராயணம், தட்சிணாயணம்
- **Ruthus** — 6 seasons
- **Paksha** — சுக்ல பக்ஷம், கிருஷ்ண பக்ஷம்
- **Thithis** — பிரதமை to அமாவாசை (30 thithis)
- **Vasaras** — All 7 days in Tamil
- **Nakshatras** — All 27 stars
- **Yogas** — All 27 yogas
- **Karanams** — 11 karanams

---

## 🖨️ Printing Tips

- Use **Chrome or Edge** for best print results
- Select **"Save as PDF"** in the print dialog to get a digital copy
- Set margins to **"None"** or **"Minimum"** for a clean output
- The print stylesheet automatically hides the form and tab bar

---

## 🛠️ Customization

- **Shloka block** — Edit the Sanskrit/Tamil invocation lines in the `generateCard()` function or directly in the HTML template string
- **Vathyar details** — Pre-fill the Vathyar name and phone fields; they persist via localStorage so you only need to enter them once
- **Colors** — Adjust the CSS variables at the top of the stylesheet:
  ```css
  --red: #cc0000;
  --blue: #0000cc;
  --green: #007700;
  --orange: #cc6600;
  ```
- **Tamil terminology** — All Tamil arrays in `data.js` can be edited to match regional or sampradaya-specific usage

---

## 🌐 Browser Compatibility

| Browser | Support |
|---|---|
| Chrome / Edge | ✅ Full support |
| Firefox | ✅ Full support |
| Safari | ✅ Full support |
| Mobile Chrome | ✅ Responsive |

---

## 📌 Notes

- This tool does **not** auto-calculate Panchangam values from the date. All astronomical values (Thithi, Nakshatra, Yoga, etc.) must be entered manually from a Panchangam almanac or a calculation source.
- Data entered in the form is stored only in your browser's `localStorage` — nothing is sent to any server.

---

## 🙏 Credits

Designed for traditional Vaishnava Panchangam usage following the Sri Vaishnava sampradaya format.

```
ஸ்ரீமதே ராமாநுஜாய நம:
ஶுபமஸ்து நித்யம்
```
