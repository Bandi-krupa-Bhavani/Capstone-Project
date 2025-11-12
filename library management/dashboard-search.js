(function () {
  // Ensure BOOKVERSE_DATA is available
  if (typeof BOOKVERSE_DATA === "undefined") {
    console.warn("BOOKVERSE_DATA not found; search will be disabled.");
    return;
  }

  const input = document.getElementById("searchInput");
  const resultsBox = document.getElementById("searchResults");

  function normalize(s) {
    return (s || "").toString().toLowerCase();
  }

  // Find matches by title or author
  function findMatches(query) {
    const q = normalize(query).trim();
    if (!q) return [];
    const matches = [];

    Object.keys(BOOKVERSE_DATA).forEach((domain) => {
      const subcats = BOOKVERSE_DATA[domain];
      Object.keys(subcats).forEach((sub) => {
        const arr = subcats[sub];
        arr.forEach((book) => {
          const hay = [book.title, book.author].join(" ").toLowerCase();
          if (hay.includes(q)) {
            matches.push({ ...book, domain, sub });
          }
        });
      });
    });

    return matches;
  }

  // Render results: show book title + author beside
  function renderResults(list) {
    resultsBox.innerHTML = "";
    if (!list.length) {
      resultsBox.hidden = true;
      return;
    }
    resultsBox.hidden = false;

    list.slice(0, 15).forEach((b) => {
      const item = document.createElement("div");
      item.className = "search-item";
      item.setAttribute("role", "option");
      item.tabIndex = 0;

      const title = document.createElement("span");
      title.className = "search-title";
      title.textContent = b.title;

      const author = document.createElement("span");
      author.className = "search-author";
      author.textContent = b.author ? ` — ${b.author}` : "";

      item.appendChild(title);
      item.appendChild(author);

      // Click redirects to page
      item.addEventListener("click", () => {
        openPage(b);
        resultsBox.hidden = true;
      });

      // Keyboard support
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openPage(b);
          resultsBox.hidden = true;
        }
      });

      resultsBox.appendChild(item);
    });
  }

  // Redirect to the book’s page
  function openPage(book) {
    if (!book) return;

    if (book.page) {
      window.location.href =
        book.page + "#" + encodeURIComponent(book.title.replace(/\s+/g, "-"));
      return;
    }

    const inferredMap = {
      "Computer Science": "cs.html",
      "Civil Engineering": "civil.html",
      "Electrical Engineering": "ee.html",
      "Mechanical Engineering": "mech.html",
    };

    const targetPage = inferredMap[book.domain] || "index.html";
    window.location.href =
      targetPage + "#" + encodeURIComponent(book.title.replace(/\s+/g, "-"));
  }

  // Debounced input
  let timer = null;
  input.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const q = input.value || "";
      const matches = findMatches(q);
      renderResults(matches);
    }, 160);
  });

  // Clickable search icon
  const searchIcon = document.querySelector(".search-box i");
  if (searchIcon) {
    searchIcon.addEventListener("click", () => {
      const query = input.value.trim();
      if (query) {
        const matches = findMatches(query);
        renderResults(matches);
      }
    });
  }

  // Hide when clicking outside
  document.addEventListener("click", (e) => {
    if (!resultsBox.contains(e.target) && e.target !== input) {
      resultsBox.hidden = true;
    }
  });

  // Escape closes results
  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      resultsBox.hidden = true;
      input.blur();
    }
  });
})();