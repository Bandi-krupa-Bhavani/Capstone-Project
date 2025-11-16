// fav-api.js
// Central favourites API for ALL pages (domains + dashboard + library)

// =========================
//  LocalStorage Helpers
// =========================
const FKEY = "bookverse_favs";   // same key you already use

function getFavsLocal() {
  try {
    return JSON.parse(localStorage.getItem(FKEY) || "[]");
  } catch (e) {
    console.warn("[fav-api] getFavsLocal error", e);
    return [];
  }
}

function setFavsLocal(arr) {
  try {
    localStorage.setItem(FKEY, JSON.stringify(arr));
    // notify other tabs/pages
    localStorage.setItem("__fv_sync", Date.now().toString());
  } catch (e) {
    console.warn("[fav-api] setFavsLocal error", e);
  }
}

function normalizeBookForStore(book) {
  if (!book) return null;
  const rawId = book.id || book.bookId;
  const id = rawId || (typeof crypto !== "undefined" ? crypto.randomUUID() : "fav_" + Date.now());

  return {
    ...book,
    id,
    bookId: rawId || id,
    addedAt: book.addedAt || Date.now()
  };
}

// Helper for pages that only care about local
export function getLocalFavourites() {
  return getFavsLocal();
}

export function isFavouriteLocal(bookId) {
  if (!bookId) return false;
  return getFavsLocal().some(b => b.id === bookId || b.bookId === bookId);
}

// =========================
//  Firebase helpers (lazy)
// =========================
let fbCache = null;
let fsCache = null;

async function getFirebaseConfig() {
  if (fbCache !== null) return fbCache;

  try {
    // Try root path (dashboard, fav, etc. use this)
    fbCache = await import("./firebase-config.js");
    return fbCache;
  } catch (e1) {
    try {
      // Try /js/ path (some domain pages used this earlier)
      fbCache = await import("./js/firebase-config.js");
      return fbCache;
    } catch (e2) {
      console.warn("[fav-api] Cannot load firebase-config.js", e1, e2);
      fbCache = null;
      return null;
    }
  }
}

async function getFirestoreFns() {
  if (fsCache !== null) return fsCache;

  try {
    fsCache = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");
    return fsCache;
  } catch (e) {
    console.warn("[fav-api] Cannot load Firestore SDK", e);
    fsCache = null;
    return null;
  }
}

// =========================
//  Core API
// =========================

// Add favourite: always localStorage, plus Firestore if logged in.
export async function addFavourite(book) {
  const mapped = normalizeBookForStore(book);
  if (!mapped) return { ok: false, reason: "invalid_book" };

  // --- Local first ---
  const current = getFavsLocal();
  const exists = current.some(b => (b.id === mapped.id) || (b.bookId && b.bookId === mapped.bookId));

  if (!exists) {
    current.push(mapped);
    setFavsLocal(current);
  }

  // --- Remote Firestore (best effort) ---
  try {
    const fb = await getFirebaseConfig();
    if (!fb || !fb.auth || !fb.db) {
      // No Firebase available, but local is done
      return { ok: true, localOnly: true };
    }

    const user = fb.auth.currentUser;
    if (!user) {
      // user not logged in yet → local only
      return { ok: true, localOnly: true, reason: "no_auth_user" };
    }

    const fs = await getFirestoreFns();
    if (!fs) return { ok: true, localOnly: true, reason: "fs_not_loaded" };

    const { doc, setDoc } = fs;
    const favRef = doc(fb.db, "users", user.uid, "favorites", mapped.id);

    await setDoc(favRef, mapped, { merge: true });
    return { ok: true, localOnly: false };
  } catch (e) {
    console.warn("[fav-api] addFavourite Firestore error", e);
    return { ok: true, localOnly: true, reason: "fs_error" };
  }
}

// Remove favourite: local + Firestore (if logged in)
export async function removeFavourite(bookId) {
  if (!bookId) return { ok: false, reason: "no_id" };

  // --- Local ---
  const current = getFavsLocal();
  const filtered = current.filter(b => b.id !== bookId && b.bookId !== bookId);
  setFavsLocal(filtered);

  // --- Remote ---
  try {
    const fb = await getFirebaseConfig();
    if (!fb || !fb.auth || !fb.db) {
      return { ok: true, localOnly: true };
    }

    const user = fb.auth.currentUser;
    if (!user) {
      return { ok: true, localOnly: true, reason: "no_auth_user" };
    }

    const fs = await getFirestoreFns();
    if (!fs) return { ok: true, localOnly: true, reason: "fs_not_loaded" };

    const { doc, deleteDoc } = fs;
    const favRef = doc(fb.db, "users", user.uid, "favorites", bookId);
    await deleteDoc(favRef).catch(() => {});

    return { ok: true, localOnly: false };
  } catch (e) {
    console.warn("[fav-api] removeFavourite Firestore error", e);
    return { ok: true, localOnly: true, reason: "fs_error" };
  }
}

// Optional: helper to mirror remote favourites into local
// (you can call this from dashboard's favorites snapshot)
export function setLocalFavouritesFromRemote(remoteArr) {
  if (!Array.isArray(remoteArr)) return;
  setFavsLocal(remoteArr);
}
