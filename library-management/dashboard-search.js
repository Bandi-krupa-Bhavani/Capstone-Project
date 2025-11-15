// dashboard-search.js — smarter navigation (open correct subpage & anchor), small thumbs
(function () {
  const MAX_WAIT_MS = 3000;
  const POLL_INTERVAL = 80;

  function log(...args) { console.debug('[search]', ...args); }

  function onReady(fn) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') setTimeout(fn, 0);
    else document.addEventListener('DOMContentLoaded', fn);
  }

  function waitForBookData(timeout = MAX_WAIT_MS) {
    return new Promise((resolve) => {
      const start = Date.now();
      (function poll() {
        if (window && typeof window.BOOKVERSE_DATA !== 'undefined') {
          resolve(window.BOOKVERSE_DATA);
          return;
        }
        if (Date.now() - start >= timeout) {
          resolve(null);
          return;
        }
        setTimeout(poll, POLL_INTERVAL);
      })();
    });
  }

  /***** SUB-PAGE MAP: map domain -> subcategory -> page *****/
  const subPageMap = {
    "Computer Science": {
      "CS Fundamentals": "cs-fund.html",
      "Programming": "prog.html",
      "Advanced Topics": "adv-topics.html"
    },
    "Engineering": {
      "Civil Engineering": "civil.html",
      "Electrical Engineering": "electrical.html",
      "Mechanical Engineering": "mechanical.html"
    },
    "Others": {
      "Eco-Social": "environment.html",
      "Lifestyle & Wellness": "lifestyle.html",
      "Research Papers": "research-papers.html"
    }
  };

  // fallback domain-level map (used if sub not present)
  const domainFallback = {
    "Computer Science": "cs-fund.html",
    "Engineering": "index.html",
    "Others": "index.html"
  };

  // slugify title for anchor
  function slugifyTitle(title) {
    return String(title || '').trim().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
  }

  onReady(async () => {
    const BOOK_DATA = await waitForBookData();
    if (!BOOK_DATA) {
      console.warn('[search] BOOKVERSE_DATA not found within timeout. Make sure books.js is loaded before this script.');
    } else {
      log('BOOKVERSE_DATA loaded — top keys:', Object.keys(BOOK_DATA).length);
    }

    const input = document.getElementById('searchInput');
    const resultsBox = document.getElementById('searchResults');

    if (!input || !resultsBox) {
      console.error('[search] Missing DOM elements:', { inputExists: !!input, resultsBoxExists: !!resultsBox });
      return;
    }

    function getAuthorString(book) {
      if (!book) return '';
      if (typeof book.author === 'string') return book.author;
      if (Array.isArray(book.authors)) return book.authors.join(', ');
      return book.author || book.authors || '';
    }

    function normalize(s) { return (s || '').toString().toLowerCase(); }

    function bookHaystack(book) {
      const parts = [];
      if (book.title) parts.push(book.title);
      const a = getAuthorString(book);
      if (a) parts.push(a);
      if (Array.isArray(book.tags)) parts.push(book.tags.join(' '));
      if (book.year) parts.push(String(book.year));
      return parts.join(' ').toLowerCase();
    }

    // iterate books regardless of nested or flat shapes
    function iterateAllBooks(callback) {
      const data = window.BOOKVERSE_DATA || BOOK_DATA || {};
      Object.keys(data).forEach((domainKey) => {
        const val = data[domainKey];
        if (Array.isArray(val)) {
          val.forEach(book => callback(book, domainKey, null));
          return;
        }
        if (val && typeof val === 'object') {
          Object.keys(val).forEach(subKey => {
            const arr = val[subKey];
            if (Array.isArray(arr)) arr.forEach(book => callback(book, domainKey, subKey));
            else if (arr && typeof arr === 'object') callback(arr, domainKey, subKey);
          });
        }
      });
    }

    function findMatches(query) {
      const q = normalize(query).trim();
      if (!q) return [];
      const matches = [];
      iterateAllBooks((book, domainName, subName) => {
        const hay = (bookHaystack(book) + ' ' + (domainName || '') + ' ' + (subName || '')).toLowerCase();
        if (hay.includes(q)) matches.push(Object.assign({}, book, { domain: domainName, sub: subName }));
      });
      return matches;
    }

    // show/hide helpers (force display override)
    function clearResults() {
      resultsBox.innerHTML = '';
      resultsBox.hidden = true;
      resultsBox.style.display = 'none';
      resultsBox.removeAttribute('aria-activedescendant');
    }

    function renderResults(list) {
      resultsBox.innerHTML = '';
      if (!list || list.length === 0) {
  resultsBox.hidden = false;
  resultsBox.style.display = 'block';
  resultsBox.innerHTML = `
    <div style="
      padding: 12px;
      color: #6b7280;
      font-size: 0.95rem;
      text-align: center;
      background: #f3f4f6;
      border-radius: 6px;
    ">
      No results found
    </div>
  `;
  return;
}
      resultsBox.hidden = false;
      resultsBox.style.display = 'block';

      list.slice(0, 15).forEach((b, idx) => {
        const item = document.createElement('div');
        item.className = 'search-item';
        item.setAttribute('role', 'option');
        item.tabIndex = 0;
        item.id = `search-item-${idx}`;

        // compact horizontal layout
        item.style.display = 'flex';
        item.style.alignItems = 'center';
        item.style.gap = '10px';
        item.style.padding = '8px';
        item.style.cursor = 'pointer';

        if (b.cover) {
          const thumb = document.createElement('img');
          thumb.className = 'search-thumb';
          thumb.src = b.cover;
          thumb.alt = b.title ? `${b.title} cover` : 'cover';
          thumb.style.width = '44px';
          thumb.style.height = '58px';
          thumb.style.objectFit = 'cover';
          thumb.style.borderRadius = '6px';
          thumb.style.flex = '0 0 auto';
          thumb.style.boxShadow = '0 4px 10px rgba(0,0,0,0.06)';
          item.appendChild(thumb);
        }

        const meta = document.createElement('div');
        meta.className = 'search-meta';
        meta.style.display = 'flex';
        meta.style.flexDirection = 'column';
        meta.style.justifyContent = 'center';
        meta.style.flex = '1 1 auto';
        meta.style.minWidth = '0';

        const title = document.createElement('div');
        title.className = 'search-title';
        title.textContent = b.title || 'Untitled';
        title.style.fontWeight = '700';
        title.style.whiteSpace = 'nowrap';
        title.style.overflow = 'hidden';
        title.style.textOverflow = 'ellipsis';

        const author = document.createElement('div');
        author.className = 'search-sub';
        const authorStr = getAuthorString(b);
        author.textContent = authorStr ? `— ${authorStr}` : `— ${b.domain || ''}${b.sub ? ' • ' + b.sub : ''}`;
        author.style.fontSize = '0.9rem';
        author.style.color = '#6b7280';
        author.style.whiteSpace = 'nowrap';
        author.style.overflow = 'hidden';
        author.style.textOverflow = 'ellipsis';

        meta.appendChild(title);
        meta.appendChild(author);
        item.appendChild(meta);

        // interactions
        item.addEventListener('click', () => { openPage(b); clearResults(); });
        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPage(b); clearResults(); return; }
          if (e.key === 'ArrowDown') { e.preventDefault(); const next = item.nextElementSibling; if (next) next.focus(); }
          if (e.key === 'ArrowUp') { e.preventDefault(); const prev = item.previousElementSibling; if (prev) prev.focus(); else input.focus(); }
        });

        resultsBox.appendChild(item);
      });
    }

    /**
     * Decide final page to open:
     * - Prefer explicit book.page (if present)
     * - Else prefer subPageMap[domain][sub]
     * - If book.href exists and is a PDF, prefer opening the parent page (with anchor) when mapping exists; otherwise open PDF directly
     * - Fallback to domainFallback
     */
  function openPage(book) {
  if (!book) return;

  const slug = slugifyTitle(book.title);
  const hash = slug ? ('#' + encodeURIComponent(slug)) : '';

  // 1. explicit page or book.page field
  if (book.page && typeof book.page === 'string') {
    window.location.href = book.page + hash;
    return;
  }

  // 2. if book.href is HTML file (.html)
  if (book.href && typeof book.href === 'string' && /\.html?$/i.test(book.href)) {
    window.location.href = book.href + hash;
    return;
  }

  const domain = book.domain || '';
  const sub = book.sub || '';

  // 3. subpage map (best & most accurate)
  if (domain && sub && subPageMap[domain] && subPageMap[domain][sub]) {
    window.location.href = subPageMap[domain][sub] + hash;
    return;
  }

  // 4. PDF book: open parent page instead of PDF
  if (book.href && /\.pdf$/i.test(book.href)) {
    if (domain && subPageMap[domain]) {
      const subKeys = Object.keys(subPageMap[domain]);
      if (subKeys.length >= 1) {
        window.location.href = subPageMap[domain][subKeys[0]] + hash;
        return;
      }
    }
    if (domain && domainFallback[domain]) {
      window.location.href = domainFallback[domain] + hash;
      return;
    }
    // last fallback: open PDF itself
    window.location.href = book.href;
    return;
  }

  // 5. domain fallback
  if (domain && domainFallback[domain]) {
    window.location.href = domainFallback[domain] + hash;
    return;
  }

  // 6. last resort
  if (book.href) {
    window.location.href = book.href;
    return;
  }

  window.location.href = 'index.html' + hash;
}

    // debounce and wiring
    let timer = null;
    input.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const q = input.value || '';
        if (!q.trim()) { clearResults(); return; }
        const matches = findMatches(q);
        renderResults(matches);
      }, 160);
    });

    const searchIcon = document.querySelector('.search-box i');
    if (searchIcon) {
      searchIcon.addEventListener('click', () => {
        const q = input.value.trim();
        if (!q) { clearResults(); return; }
        renderResults(findMatches(q));
      });
    }

    document.addEventListener('click', (e) => {
      if (!resultsBox.contains(e.target) && e.target !== input && !e.target.closest('.search-box')) clearResults();
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { clearResults(); input.blur(); }
      if (e.key === 'ArrowDown') {
        const first = resultsBox.querySelector('.search-item');
        if (first) { e.preventDefault(); first.focus(); }
      }
    });

    clearResults();
    log('search ready — smart nav enabled');
  });
})();
