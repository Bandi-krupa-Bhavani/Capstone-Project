// dashboard-search.js (drop-in replacement — non-module)
import { BOOKVERSE_DATA } from './books.js'; // adjust path
// then use BOOKVERSE_DATA variable directly (no window.)

(function () {
  const searchInput = document.getElementById("searchInput");
  const resultsBox = document.getElementById("searchResults");

  if (!searchInput || !resultsBox) {
    console.error("dashboard-search.js: Missing #searchInput or #searchResults in DOM.");
    return;
  }
  console.info("dashboard-search.js loaded.");

  // --- Ensure BOOKVERSE_DATA exists as global ---
  if (!window.BOOKVERSE_DATA) {
    console.error("dashboard-search.js: window.BOOKVERSE_DATA not found. Make sure books.js is included BEFORE dashboard-search.js");
    resultsBox.innerHTML = "<div class='no-result'>Search unavailable — books data missing.</div>";
    return;
  }

  // --- Flatten nested data ---
  function flattenData(nested) {
    const flat = [];
    Object.entries(nested || {}).forEach(([category, sections]) => {
      if (!sections || typeof sections !== "object") return;
      Object.entries(sections).forEach(([sectionName, booksArr]) => {
        if (!Array.isArray(booksArr)) return;
        booksArr.forEach(book => {
          flat.push({
            id: book.id || `${category}::${sectionName}::${book.title}`,
            title: book.title || "",
            authors: book.authors || (book.author ? [book.author] : []),
            authorStr: book.author || (Array.isArray(book.authors) ? book.authors.join(", ") : ""),
            tags: (book.tags || []).map(String),
            href: book.href || "",
            category,
            section: sectionName,
            raw: book
          });
        });
      });
    });
    return flat;
  }

  const FLAT = flattenData(window.BOOKVERSE_DATA || {});
  console.info("dashboard-search.js: Flattened books count =", FLAT.length);

  // --- Helpers ---
  function normalize(s) { return String(s || "").toLowerCase(); }
  function matches(item, q) {
    if (!q) return false;
    q = q.toLowerCase();
    if (normalize(item.title).includes(q)) return true;
    if (normalize(item.authorStr).includes(q)) return true;
    if ((item.authors || []).some(a => normalize(a).includes(q))) return true;
    if (normalize((item.tags || []).join(" ")).includes(q)) return true;
    if (normalize(item.category).includes(q)) return true;
    if (normalize(item.section).includes(q)) return true;
    return false;
  }

  // --- Section -> page mapping (edit filenames if different) ---
  const SECTION_TO_PAGE = {
    "CS Fundamentals": "cs-fund.html",
    "Programming": "prog.html",
    "Advanced Topics": "adv-topics.html",
    "Civil Engineering": "civil.html",
    "Electrical Engineering": "electrical.html",
    "Mechanical Engineering": "mechanical.html",
    "Eco-Social": "environment.html",
    "Lifestyle & Wellness": "lifestyle.html",
    "Research Papers": "research-papers.html"
  };
  function sectionToPage(section) {
    if (!section) return null;
    if (SECTION_TO_PAGE[section]) return SECTION_TO_PAGE[section];
    const slug = (section || "").toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return slug ? `${slug}.html` : null;
  }

  // --- Render results (minimal markup) ---
  function renderResults(list) {
    resultsBox.innerHTML = "";
    // Force results visible over any overlay (temporary)
    resultsBox.style.zIndex = 9999;
    resultsBox.style.background = "rgba(255,255,255,0.98)";
    resultsBox.style.maxHeight = "400px";
    resultsBox.style.overflow = "auto";
    resultsBox.style.border = "1px solid rgba(0,0,0,0.06)";
    resultsBox.style.padding = "6px";
    resultsBox.style.boxShadow = "0 6px 18px rgba(2,6,23,0.08)";

    if (!list || list.length === 0) {
      const nr = document.createElement("div");
      nr.className = "no-result";
      nr.textContent = "No results found";
      resultsBox.appendChild(nr);
      return;
    }

    list.slice(0, 50).forEach(item => {
      const row = document.createElement("div");
      row.className = "result-item";
      row.tabIndex = 0;
      row.style.padding = "8px 10px";
      row.style.cursor = "pointer";
      row.style.borderRadius = "8px";
      row.style.marginBottom = "6px";

      row.addEventListener("mouseenter", () => row.style.background = "rgba(0,0,0,0.04)");
      row.addEventListener("mouseleave", () => row.style.background = "transparent");

      const title = document.createElement("div");
      title.className = "res-title";
      title.textContent = item.title || "(no title)";
      title.style.fontWeight = "700";

      const sub = document.createElement("div");
      sub.className = "res-sub";
      sub.textContent = item.authorStr || `${item.category} › ${item.section}`;
      sub.style.fontSize = ".92rem";
      sub.style.color = "#374151";

      row.appendChild(title);
      row.appendChild(sub);

      row.addEventListener("click", () => {
        // 1) if href is .html go direct
        if (item.href && typeof item.href === "string" && item.href.trim().toLowerCase().endsWith(".html")) {
          window.location.href = item.href;
          return;
        }
        // 2) try section -> page
        const page = sectionToPage(item.section);
        if (page) {
          window.location.href = page;
          return;
        }
        // 3) fallback to href (pdf)
        if (item.href) {
          window.location.href = item.href;
          return;
        }
        console.warn("No navigation for item", item);
      });

      row.addEventListener("keydown", (e) => { if (e.key === "Enter") row.click(); });

      resultsBox.appendChild(row);
    });
  }

  // --- Input handling (debounced) ---
  let timer = null;
  searchInput.addEventListener("input", () => {
    const q = searchInput.value.trim();
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (!q) {
        resultsBox.innerHTML = "";
        return;
      }
      const filtered = FLAT.filter(item => matches(item, q));
      console.info("Search:", q, "→ matches:", filtered.length);
      renderResults(filtered);
    }, 100);
  });

  // Escape clears
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      searchInput.value = "";
      resultsBox.innerHTML = "";
      searchInput.blur();
    }
  });

  // optional: close when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-box")) {
      // resultsBox.innerHTML = ""; // keep commented while debugging
    }
  });

})();
