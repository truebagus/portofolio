const translations = {
    'About': '私について',
    'Skills': 'スキル',
    'Projects': 'プロジェクト',
    'Contact': 'お問い合わせ'
  };
  
  const japaneseChars = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん';
  
  function randomJapaneseChar() {
    return japaneseChars[Math.floor(Math.random() * japaneseChars.length)];
  }
  
  function createCharacterSpans(text, parentElement) {
    parentElement.innerHTML = '';
    const spans = [];
    
    for (let char of text) {
      const span = document.createElement('span');
      span.textContent = char;
      span.className = 'character';
      parentElement.appendChild(span);
      spans.push(span);
    }
    
    return spans;
  }
  
  function animateText(element, isToJapanese) {
    const originalText = element.getAttribute('data-original') || element.textContent;
    const targetText = isToJapanese ? translations[originalText] : originalText;
    
    if (!element.getAttribute('data-original')) {
      element.setAttribute('data-original', originalText);
    }
  
    // Simpan teks asli dan terjemahan
    const sourceText = isToJapanese ? originalText : targetText;
    const finalText = isToJapanese ? targetText : originalText;
  
    // Buat span untuk teks yang lebih panjang
    const maxLength = Math.max(sourceText.length, finalText.length);
    const chars = new Array(maxLength).fill(' ');
    
    // Isi dengan karakter asli
    for (let i = 0; i < sourceText.length; i++) {
      chars[i] = sourceText[i];
    }
  
    const spans = createCharacterSpans(chars, element);
  
    spans.forEach((span, index) => {
      let steps = 0;
      const maxSteps = 6;
      const interval = setInterval(() => {
        if (steps < maxSteps - 1) {
          span.textContent = randomJapaneseChar();
          span.classList.add('changing');
        } else if (steps === maxSteps - 1) {
          // Gunakan karakter dari teks target atau spasi jika tidak ada
          span.textContent = finalText[index] || '';
          span.classList.remove('changing');
        }
        steps++;
        
        if (steps >= maxSteps) {
          clearInterval(interval);
        }
      }, 100);
    });
  }
  
  function startInfiniteAnimation(element) {
    let isJapanese = false;
    
    function animate() {
      animateText(element, isJapanese);
      isJapanese = !isJapanese;
      
      setTimeout(animate, 4000);
    }
    
    animate();
  }
  
  // Mulai animasi untuk semua menu title dengan delay berbeda
  document.querySelectorAll('.menu-title').forEach((title, index) => {
    setTimeout(() => {
      startInfiniteAnimation(title);
    }, index * 1000);
  });