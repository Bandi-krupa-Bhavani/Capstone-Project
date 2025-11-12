(function(){
  // Safe guard: BOOKVERSE_DATA should be defined in books.js
  if (typeof BOOKVERSE_DATA === 'undefined') {
    console.warn('BOOKVERSE_DATA not found; search will be disabled.');
    return;
  }

  const input = document.getElementById('searchInput');
  const resultsBox = document.getElementById('searchResults');

  function normalize(s){ return (s||'').toString().toLowerCase(); }

  function findMatches(query){
    const q = normalize(query).trim();
    if(!q) return [];
    const matches = [];
    Object.keys(BOOKVERSE_DATA).forEach(domain => {
      const subcats = BOOKVERSE_DATA[domain];
      Object.keys(subcats).forEach(sub => {
        const arr = subcats[sub];
        arr.forEach(book => {
          const hay = [book.title, book.author, domain, sub, book.year].join(' ').toLowerCase();
          if(hay.includes(q)){
            matches.push(Object.assign({}, book, {domain, sub}));
          }
        });
      });
    });
    return matches;
  }

  function renderResults(list){
    resultsBox.innerHTML = '';
    if(!list.length){
      resultsBox.hidden = true;
      return;
    }
    resultsBox.hidden = false;
    list.slice(0, 12).forEach((b, idx)=>{
      const item = document.createElement('div');
      item.className = 'search-item';
      item.setAttribute('role','option');
      item.tabIndex = 0;

      const img = document.createElement('img');
      img.className = 'search-thumb';
      img.src = b.cover || '';
      img.alt = b.title + ' cover';

      const meta = document.createElement('div');
      meta.className = 'search-meta';
      const title = document.createElement('div');
      title.className = 'search-title';
      title.textContent = b.title;
      const sub = document.createElement('div');
      sub.className = 'search-sub';
      sub.textContent = b.author + (b.year?(' • '+b.year):'') + ' — ' + b.domain + ' / ' + b.sub;

      const openBtn = document.createElement('button');
      openBtn.className = 'search-open';
      openBtn.textContent = 'Open PDF';
      openBtn.addEventListener('click', (ev)=>{ ev.stopPropagation(); openPdf(b.href); });

      meta.appendChild(title);
      meta.appendChild(sub);
      item.appendChild(img);
      item.appendChild(meta);
      item.appendChild(openBtn);

      // clicking the row opens PDF as well
      item.addEventListener('click', ()=> openPdf(b.href));

      // keyboard support
      item.addEventListener('keydown', (e)=>{
        if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPdf(b.href); }
      });

      resultsBox.appendChild(item);
    });
  }

  function openPdf(href){
    if(!href) return;
    // Open in new tab; hrefs in data already URL-encoded
    window.open(href, '_blank');
  }

  // simple debounced input
  let timer = null;
  input.addEventListener('input', ()=>{
    clearTimeout(timer);
    timer = setTimeout(()=>{
      const q = input.value || '';
      const matches = findMatches(q);
      renderResults(matches);
    }, 160);
  });

  // close on outside click
  document.addEventListener('click', (e)=>{
    if(!resultsBox.contains(e.target) && e.target !== input){ resultsBox.hidden = true; }
  });

  // support Escape to close
  input.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') { resultsBox.hidden = true; input.blur(); }
  });

})();
