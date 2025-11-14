// domain-hash-filter.js — very robust: waits for grid/cards, self-heals data-slug, waits for matching card
(function () {
  const MAX_WAIT_MS = 6000;   // total wait for a matching card
  const CHECK_INTERVAL = 100; // poll interval while waiting
  const LOG_PREFIX = '[domain-hash-filter]';

  function log(...a){ try { console.debug(LOG_PREFIX, ...a); } catch(e){} }
  function warn(...a){ try { console.warn(LOG_PREFIX, ...a); } catch(e){} }

  function slugify(text){
    return String(text || '').trim().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
  }

  function getRawHash(){
    return (location.hash || '').slice(1);
  }

  function getGrid(){
    return document.getElementById('grid');
  }

  function getCards(){
    const g = getGrid();
    return g ? Array.from(g.querySelectorAll('article.card')) : [];
  }

  function ensureSlugs(cards){
    cards.forEach(card => {
      if (!card.dataset || !card.dataset.slug) {
        const titleEl = card.querySelector('.card-title');
        const title = titleEl ? titleEl.textContent.trim() : (card.dataset.title || '');
        const s = slugify(title);
        if (s) card.dataset.slug = s;
      }
    });
  }

  function extractTitle(card){
    const t = card.querySelector && card.querySelector('.card-title');
    if (t && t.textContent.trim()) return t.textContent.trim();
    if (card.dataset && card.dataset.title) return card.dataset.title;
    return (card.textContent || '').trim().split('\n').map(l=>l.trim()).filter(Boolean)[0] || '';
  }

  function hideAllExcept(cardToShow){
    const cards = getCards();
    cards.forEach(c => {
      if (c === cardToShow){
        c.style.display = '';
        c.style.transition = 'all 220ms ease';
        c.style.boxShadow = '0 10px 30px rgba(124,58,237,0.12)';
        c.style.border = '1px solid rgba(124,58,237,0.12)';
      } else {
        c.style.display = 'none';
      }
    });
  }

  function scrollAndPulse(el){
    try { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch(e){}
    try {
      el.animate([{ boxShadow: '0 0 0 rgba(124,58,237,0)' }, { boxShadow: '0 10px 30px rgba(124,58,237,0.18)' }], { duration: 650, easing: 'ease-out' });
    } catch(e){}
  }

  function triggerLocalSearch(q){
    if(!q) return false;
    const input = document.getElementById('q') || document.querySelector('.search-input') || document.querySelector('input[aria-label*="search"]');
    if(!input) return false;
    input.value = q;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    return true;
  }

  async function waitForMatchingCard(rawHash) {
    const start = Date.now();
    return new Promise((resolve) => {
      const check = () => {
        const cards = getCards();
        if (cards.length) ensureSlugs(cards); // ensure slug for whatever is present

        // Build candidate arrays
        const candidatesRaw = [rawHash, decodeURIComponent(rawHash)].filter(Boolean);
        const slugCands = candidatesRaw.map(s => slugify(s)).filter(Boolean);

        // try to find match: data-slug exact, then computed slug, then substring title
        let found = null;
        for (const c of cards) {
          const ds = c.dataset && c.dataset.slug ? c.dataset.slug : null;
          if (ds) {
            for (const sc of slugCands) {
              if (ds.toLowerCase() === sc.toLowerCase()) { found = c; break; }
            }
            if (found) break;
          }
        }

        if (!found && cards.length) {
          for (const c of cards) {
            const computed = slugify(extractTitle(c));
            for (const sc of slugCands) {
              if (computed && computed.toLowerCase() === sc.toLowerCase()) { found = c; break; }
            }
            if (found) break;
          }
        }

        if (!found && cards.length) {
          for (const c of cards) {
            const title = (extractTitle(c) || '').toLowerCase();
            for (const rc of candidatesRaw) {
              if (rc && title.includes(rc.toLowerCase())) { found = c; break; }
            }
            if (found) break;
          }
        }

        if (found) {
          resolve(found);
          return;
        }

        if (Date.now() - start >= MAX_WAIT_MS) {
          resolve(null);
          return;
        }

        setTimeout(check, CHECK_INTERVAL);
      };

      check();
    });
  }

  async function run() {
    const rawHash = getRawHash();
    if (!rawHash) {
      log('no hash in URL — nothing to do');
      return;
    }
    log('hash present:', rawHash);

    // Wait for the grid node to exist
    const grid = getGrid();
    if (!grid) {
      // wait for grid to be added (small observer)
      const gridPromise = new Promise(res => {
        const docObserver = new MutationObserver(() => {
          const g = getGrid();
          if (g) { docObserver.disconnect(); res(g); }
        });
        docObserver.observe(document.documentElement, { childList: true, subtree: true });
        // fallback timeout 2s
        setTimeout(() => { docObserver.disconnect(); res(getGrid()); }, 2000);
      });
      await gridPromise;
    }

    // Wait for a matching card (with retries)
    log('waiting up to', MAX_WAIT_MS, 'ms for matching card...');
    const matched = await waitForMatchingCard(rawHash);

    if (matched) {
      log('matched card:', matched.querySelector('.card-title')?.textContent || matched.dataset.slug || matched);
      hideAllExcept(matched);
      scrollAndPulse(matched);
      return;
    }

    // if not matched, try local page search fallback
    log('no direct match found — trying local search fallback');
    const did = triggerLocalSearch(rawHash) || triggerLocalSearch(decodeURIComponent(rawHash));
    if (did) {
      // wait short while for results then pick best match
      setTimeout(() => {
        const cardsAfter = getCards();
        ensureSlugs(cardsAfter);
        let best = null;
        for (const c of cardsAfter) {
          const title = extractTitle(c);
          if (title && title.toLowerCase().includes(rawHash.toLowerCase())) { best = c; break; }
        }
        if (best) {
          log('found match after local search:', best.querySelector('.card-title')?.textContent);
          hideAllExcept(best);
          scrollAndPulse(best);
        } else {
          log('no match after local search fallback; leaving full list visible');
        }
      }, 350);
      return;
    }

    log('no match found and no local search available; leaving full list visible');
  }

  // run after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

})();
