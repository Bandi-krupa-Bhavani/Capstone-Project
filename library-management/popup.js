// popup.js
// Simple welcome popup. Call window.showWelcomePopup() to display.

(function () {
  /* ---------- CONFIG ---------- */
  const IMAGE_PATHS = [
    "css/assets/popups/1.jpg",
    "css/assets/popups/2.jpg",
    "css/assets/popups/3.jpg",
    "css/assets/popups/4.jpg",
    "css/assets/popups/5.jpg",
    "css/assets/popups/6.jpg",
    "css/assets/popups/7.jpg",
    "css/assets/popups/8.jpg"
  ];

  const MESSAGES = [
    "📖 A book is a dream you hold in your hands.",
    "🌱 Read more, learn more, grow more.",
    "🔑 Knowledge is the key to unlocking your potential.",
    "🌍 Books are your passport to endless worlds.",
    "✨ Every page you read opens a new possibility.",
    "📚 Feed your mind, and your future will flourish.",
    "🌟 Great journeys begin with a single chapter.",
    "🧠 Reading sharpens the mind and softens the soul."
  ];

  /* ---------- DOM shortcuts ---------- */
  const overlay = document.getElementById("welcomePopup");
  const imgEl = document.getElementById("popupImage");
  const captionEl = document.getElementById("popupCaption");
  const closeBtn = document.getElementById("popupCloseBtn");

  if (!overlay || !imgEl || !captionEl || !closeBtn) {
    // missing markup — nothing to do
    return;
  }

  /* ---------- utility ---------- */
  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function preload(src, onOk, onErr) {
    const i = new Image();
    i.src = src;
    i.onload = () => onOk && onOk();
    i.onerror = () => onErr && onErr();
  }

  function showPopupWithImageAndMsg(imageSrc, message) {
    // caption start hidden (CSS anim handles)
    captionEl.textContent = message;
    captionEl.style.opacity = "0";
    captionEl.style.transform = "translateY(30px)";

    imgEl.src = imageSrc;

    overlay.style.display = "flex";
    overlay.setAttribute("aria-hidden", "false");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        captionEl.style.transition = "opacity 420ms ease, transform 420ms ease";
        captionEl.style.opacity = "1";
        captionEl.style.transform = "translateY(0)";
      });
    });

    try { closeBtn.focus(); } catch (e) {}
  }

  /* ---------- CLOSE POPUP ---------- */
  function hidePopup() {
    overlay.style.display = "none";
    overlay.setAttribute("aria-hidden", "true");
  }

  // X button (use delegation to be extra safe)
  document.addEventListener("click", (e) => {
    const closeEl = e.target.closest("#popupCloseBtn");
    if (closeEl) {
      e.preventDefault();
      e.stopPropagation();
      hidePopup();
    }
  });

  // click outside popup-content -> close
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      hidePopup();
    }
  });

  // ESC key closes popup
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.style.display === "flex") {
      hidePopup();
    }
  });

  /* ---------- PUBLIC: showWelcomePopup() ---------- */
  function showWelcomePopup() {
    const chosenImg = pick(IMAGE_PATHS);
    const chosenMsg = pick(MESSAGES);

    preload(
      chosenImg,
      () => {
        showPopupWithImageAndMsg(chosenImg, chosenMsg);
      },
      () => {
        const alt = IMAGE_PATHS.find((x) => x !== chosenImg);
        if (!alt) return;
        preload(alt, () => {
          showPopupWithImageAndMsg(alt, chosenMsg);
        }, () => {});
      }
    );
  }

  // expose globally
  window.showWelcomePopup = showWelcomePopup;
})();
