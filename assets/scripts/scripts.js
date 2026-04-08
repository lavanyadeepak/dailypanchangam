 // Initialize on load and set default date/persistence
  window.addEventListener('DOMContentLoaded', () => {
    loadFromStorage();
    setupAutoSuggest();
    
    const dateInput = document.getElementById('f_date');
    if (!dateInput.value) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.value = tomorrow.toISOString().split('T')[0];
    }

    document.querySelector('.form-grid').addEventListener('input', saveToStorage);
  });

  function setupAutoSuggest() {
    const mapping = {
      'list_months': typeof tamilMonths !== 'undefined' ? tamilMonths : [],
      'list_years': typeof tamilYears !== 'undefined' ? tamilYears : [],
      'list_ayanams': typeof tamilAyanams !== 'undefined' ? tamilAyanams : [],
      'list_rutus': typeof tamilRutus !== 'undefined' ? tamilRutus : [],
      'list_paksha': typeof tamilPakshe !== 'undefined' ? tamilPakshe : [],
      'list_thithis': typeof tamilThithis !== 'undefined' ? tamilThithis : [],
      'list_vasara': typeof tamilVasara !== 'undefined' ? tamilVasara : [],
      'list_stars': typeof tamilStars !== 'undefined' ? tamilStars : [],
      'list_yogas': typeof tamilYogas !== 'undefined' ? tamilYogas : [],
      'list_karanams': typeof tamilKaranams !== 'undefined' ? tamilKaranams : []
    };

    Object.keys(mapping).forEach(listId => {
      const datalist = document.getElementById(listId);
      if (datalist) {
        datalist.innerHTML = '';
        // Deduplicate values using a Set
        const uniqueValues = [...new Set(mapping[listId])];
        uniqueValues.forEach(val => {
          const option = document.createElement('option');
          option.value = val;
          datalist.appendChild(option);
        });
      }
    });
  }

  function saveToStorage() {
    const fields = document.querySelectorAll('.form-grid input, .form-grid textarea');
    const data = {};
    fields.forEach(f => { if (f.id) data[f.id] = f.value; });
    localStorage.setItem('panchangam_persist_data', JSON.stringify(data));
  }

  function loadFromStorage() {
    const saved = localStorage.getItem('panchangam_persist_data');
    if (saved) {
      const data = JSON.parse(saved);
      Object.keys(data).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = data[id];
      });
    }
  }

  function showTab(name) {
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + name).classList.add('active');
    document.querySelectorAll('.tab-btn')[name === 'form' ? 0 : 1].classList.add('active');
  }

  function v(id) { return document.getElementById(id).value.trim(); }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
  }

  function generateCard() {
    const date     = v('f_date');
    const day      = v('f_day');
    const month    = v('f_month');
    const thiNo    = v('f_thithi_no');
    const samvat   = v('f_samvat');
    const ayanam   = v('f_ayanam');
    const ruthu    = v('f_ruthu');
    const maasam   = v('f_maasam');
    const paksha   = v('f_paksha');
    const thithi   = v('f_thithi');
    const thithi2  = v('f_thithi2');
    const vasara   = v('f_vasara');
    const star     = v('f_star');
    const star2    = v('f_star2');
    const yoga     = v('f_yoga');
    const yoga2    = v('f_yoga2');
    const karanam  = v('f_karanam');
    const karanam2 = v('f_karanam2');
    const place    = v('f_place');
    const sunrise  = v('f_sunrise');
    const sunset   = v('f_sunset');
    const sunYoga  = v('f_sun_yoga');
    const nallAM   = v('f_nalla_morning');
    const nallPM   = v('f_nalla_evening');
    const rahu     = v('f_rahu');
    const yama     = v('f_yama');
    const kuligai  = v('f_kuligai');
    const srartha  = v('f_srartha');
    const vathyar  = v('f_vathyar');
    const phone1   = v('f_phone1');
    const phone2   = v('f_phone2');

    const dateDisplay = formatDate(date);

    // Build main paragraph
    let mainPara = '';
    if (samvat)   mainPara += `${samvat} நாம சம்வத்சரே - `;
    if (ayanam)   mainPara += `${ayanam} - `;
    if (ruthu)    mainPara += `${ruthu} - `;
    if (maasam)   mainPara += `${maasam} - `;
    if (paksha)   mainPara += `${paksha} - `;

    // Thithi with highlight
    if (thithi) {
      const m = thithi.match(/^(.*?)\s*(\(.*?\))\s*(.*)$/);
      if (m) {
        mainPara += `${m[1]} <span class="hl-orange">${m[2]}</span> `;
        if (thithi2) mainPara += `<span class="hl-orange">(${thithi2})</span> `;
      } else {
        mainPara += `${thithi} `;
      }
    }

    mainPara += `சுப / புண்ய திதெள - `;
    if (vasara) mainPara += `வாஸர: ${vasara} - `;

    // Star with highlight
    if (star) {
      const m = star.match(/^(.*?)\s*(\(.*?\))\s*(.*)$/);
      if (m) {
        mainPara += `${m[1]} <span class="hl-orange">${m[2]}</span> `;
        if (star2) mainPara += `<span class="hl-blue">(${star2})</span> `;
      } else {
        mainPara += `${star} `;
      }
    }
    mainPara += `நக்ஷத்ர யுக்தாயாம் - `;

    // Yoga
    if (yoga) {
      const m = yoga.match(/^(.*?)\s*(\(.*?\))\s*(.*)$/);
      if (m) {
        mainPara += `வரியான் <span class="hl-orange">${m[2]}</span> `;
        if (yoga2) mainPara += `<span class="hl-blue">(${yoga2})</span> `;
      } else {
        mainPara += `${yoga} `;
      }
    }
    mainPara += `யோக - `;

    // Karanam
    if (karanam) {
      const m = karanam.match(/^(.*?)\s*(\(.*?\))\s*(.*)$/);
      if (m) {
        mainPara += `${m[1]} <span class="hl-orange">${m[2]}</span> `;
        if (karanam2) mainPara += `<span class="hl-blue">(${karanam2})</span> `;
      } else {
        mainPara += `${karanam} `;
      }
    }
    mainPara += `கரண யுக்தாயாம் ஏவங்குன விசேஷண விசிஷ்டாயாம் அஸ்யாம் ஷஷ்ட்யாம் சுப / புண்ய திதெள ஸ்ரீ பகவதாஜ்ஞுயா....`;

    // Phone display
    const phoneStr = [phone1, phone2].filter(Boolean).join(' & ');

    const html = `
      <div class="deity-row">🦚 ☸ 🪷 ☸ 🦚</div>

      <div class="shloka">
        <div class="sri"><b>ஸ்ரீ:</b></div>
        ஸ்ரீலக்ஷ்மிந்ருஸிம்ஹ பரப்ரஹ்மணே நமஹ:<br>
        ஸ்ரீமதே ராமாநுஜாய நம:<br>
        ஸ்ரீமதே நிஹமாந்த மஹரா தேஶிகாய நமஹ:<br>
        ஸ்ரீமத்தாதிவன் ஸடகோப யதீந்த்ர மஹரா தேஶிகாய நம:<br>
        ஸ்ரீவண்ஸடகோப ஸ்ரீ ரங்கநாத யதீந்த்ர மஹாதேஶிகாய நமஹ:
      </div>

      ${vathyar ? `
      <div class="vathyar-box">
        <div class="vathyar-name">${vathyar}.</div>
        ${phoneStr ? `<div class="vathyar-phone">Ph : ${phoneStr}</div>` : ''}
      </div>` : ''}

      <div class="date-row">
        <span>${dateDisplay}</span>
        ${(month && thiNo) ? `<span>( ${month} : ${thiNo} )</span>` : ''}
        <span>${day}</span>
      </div>

      <div class="pancha-body">${mainPara}</div>

      <div class="timings">
        ${place ? `<div class="t-row"><span class="t-label">சூர்யன் (${place})</span><span class="t-value">: உதயம் : ${sunrise}, அஸ்த : ${sunset},</span></div>` : ''}
        ${sunYoga ? `<div class="t-row"><span class="t-label">யோகம்</span><span class="t-value">: ${sunYoga},</span></div>` : ''}
        ${(nallAM || nallPM) ? `<div class="t-row"><span class="t-label">நல்ல நேரம்</span><span class="t-value">: காலை : ${nallAM},&nbsp; மாலை : ${nallPM}.</span></div>` : ''}
        ${rahu ? `<div class="t-row"><span class="t-label">ராகு காலம்</span><span class="t-value">: மாலை : ${rahu},</span></div>` : ''}
        ${yama ? `<div class="t-row"><span class="t-label">எமகண்டம்</span><span class="t-value">: காலை : ${yama},</span></div>` : ''}
        ${kuligai ? `<div class="t-row"><span class="t-label">குளிகை</span><span class="t-value">: மதியம் : ${kuligai},</span></div>` : ''}
        ${srartha ? `<div class="t-row"><span class="t-label">ஸ்ராத்த திதி</span><span class="t-value">: ${srartha}.</span></div>` : ''}
      </div>

      <div class="footer-line">* ★☸ ஶுபமஸ்து நித்யம் ☸★ *</div>
      <div class="footer-deco">·:*·:═·:*:*:·═·:*:·</div>
    `;

    document.getElementById('pcard-output').innerHTML = html;
    showTab('preview');
  }