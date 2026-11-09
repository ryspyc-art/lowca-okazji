let products = [
  {id:"tanievo-001",name:"Apple AirPods 5 (MKFW4ZM/A)",category:"Elektronika",store:"Ceneo",icon:"🎧",productUrl:"https://www.ceneo.pl/199946527#crid=818405&pid=31443"},
  {id:"tanievo-002",name:"Telewizor QLED Sharp 65JT8765E 65 cali",category:"RTV",store:"Ceneo",icon:"📺",productUrl:"https://www.ceneo.pl/202179594#crid=818406&pid=31443"},
  {id:"tanievo-003",name:"Fotel gamingowy Diablo X-Horn 2.0 Normal Size",category:"Gaming",store:"Diablo Chairs — link do weryfikacji",icon:"🪑",productUrl:""},
  {id:"tanievo-004",name:"Hulajnoga elektryczna KuKirin G2",category:"Sport",store:"Ceneo",icon:"🛴",productUrl:"https://www.ceneo.pl/176018202#crid=818408&pid=31443"},
  {id:"tanievo-005",name:"Thermos Mountain FFX 0,5 l Matt Black Green",category:"Dom",store:"Ceneo",icon:"☕",productUrl:"https://www.ceneo.pl/117967166#crid=818409&pid=31443"},
  {id:"tanievo-006",name:"Opony zimowe Dębica Frigo 2 205/55 R16 91T",category:"Motoryzacja",store:"Ceneo",icon:"🚗",productUrl:"https://www.ceneo.pl/705846#crid=818410&pid=31443"},
  {id:"tanievo-007",name:"Wobell mata antyszronowa na przednią szybę",category:"Motoryzacja",store:"Ceneo",icon:"🚘",productUrl:"https://www.ceneo.pl/196019290#crid=818412&pid=31443"},
  {id:"tanievo-008",name:"Wkrętarka akumulatorowa DeWALT DCD800N 18 V",category:"Narzędzia",store:"Ceneo",icon:"🛠️",productUrl:"https://www.ceneo.pl/175282068#crid=818413&pid=31443"},
  {id:"tanievo-009",name:"Whiskas Adult Mix smaków 40 × 85 g",category:"Dla zwierząt",store:"Ceneo",icon:"🐾",productUrl:"https://www.ceneo.pl/148943696#crid=818415&pid=31443"},
  {id:"tanievo-010",name:"DicloMAX Mobilat żel 100 g",category:"Zdrowie",store:"Ceneo",icon:"🧴",productUrl:"https://www.ceneo.pl/179816741#crid=818416&pid=31443"}
];

const grid = document.getElementById("productGrid");
const search = document.getElementById("searchInput");
const sort = document.getElementById("sortSelect");
const favoritesToggle = document.getElementById("favoritesToggle");
let category = "Wszystkie";
let favoritesOnly = false;

function loadFavorites() {
  try {
    const value = JSON.parse(localStorage.getItem("tanievoFavorites") || localStorage.getItem("lowcaFavorites") || localStorage.getItem("cenolotFavorites") || "[]");
    return Array.isArray(value) ? value.filter(v => Number.isInteger(v) || typeof v === "string").map(String) : [];
  } catch {
    return [];
  }
}
let favorites = loadFavorites();

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
}
function formatDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "czas nieznany" : date.toLocaleString("pl-PL", {dateStyle:"short",timeStyle:"short"});
}
function isSafeExternalHttpsUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      Boolean(url.hostname) &&
      !url.username &&
      !url.password &&
      (url.port === "" || url.port === "443");
  } catch {
    return false;
  }
}
function safeImage(value) {
  return isSafeExternalHttpsUrl(value);
}
function safeProductUrl(value) {
  return isSafeExternalHttpsUrl(value);
}
let liveCatalog = false;
["price-asc", "price-desc", "discount"].forEach(value => {
  const option = sort.querySelector('option[value="' + value + '"]');
  if (option) option.hidden = true;
});
async function loadLiveCatalog() {
  try {
    const response = await fetch("./products.json?cache=" + Date.now(), {cache:"no-store"});
    if (!response.ok) return;
    const payload = await response.json();
    const items = Array.isArray(payload) ? payload : payload.items;
    if (!Array.isArray(items) || !items.length) return;
    const now = Date.now();
    const maxAgeMs = 72 * 60 * 60 * 1000;
    const normalized = items.filter(item => {
      if (!item || !item.updatedAt) return false;
      const updated = Date.parse(item.updatedAt);
      return Number.isFinite(updated) && now - updated >= 0 && now - updated <= maxAgeMs;
    }).filter(item =>
      item && (typeof item.id === "string" || Number.isInteger(item.id)) &&
      typeof item.name === "string" && Number.isFinite(Number(item.price)) &&
      Number(item.price) > 0 && safeProductUrl(item.productUrl)
    ).map(item => ({
      id: String(item.id),
      name: item.name,
      category: typeof item.category === "string" ? item.category : "Inne",
      price: Number(item.price),
      store: typeof item.merchant === "string" ? item.merchant : "Sklep partnerski",
      productUrl: item.productUrl,
      image: item.image || "",
      updatedAt: item.updatedAt || payload.fetchedAt || "",
      availability: typeof item.availability === "string" ? item.availability : "Sprawdź u sprzedawcy",
      icon: "🛍️"
    }));
    if (!normalized.length) return;
    products = normalized;
    liveCatalog = true;
    const note = document.querySelector(".demo-note");
    if (note) note.textContent = "Oferty partnerskie • " + normalized.length + " aktualnych produktów";
    const chipContainer = document.getElementById("categoryChips");
    if (chipContainer) {
      const categories = ["Wszystkie", ...new Set(normalized.map(item => item.category).filter(Boolean))];
      chipContainer.innerHTML = categories.map((name, index) =>
        '<button class="chip ' + (index === 0 ? 'active' : '') + '" data-category="' + escapeHTML(name) + '" aria-pressed="' + (index === 0 ? 'true' : 'false') + '">' + escapeHTML(name) + '</button>'
      ).join("");
      category = "Wszystkie";
    }
    ["price-asc", "price-desc", "discount"].forEach(value => {
      const option = sort.querySelector('option[value="' + value + '"]');
      if (option) option.hidden = false;
    });
    const discountOption = sort.querySelector('option[value="discount"]');
    if (discountOption) discountOption.hidden = true;
    if (sort.value === "discount") sort.value = "recommended";
    const disclaimer = document.querySelector(".disclaimer");
    if (disclaimer) disclaimer.textContent = "Ceny i dostępność mogą się zmieniać. Przed zakupem sprawdź aktualne warunki u sprzedawcy. Linki partnerskie mogą przynieść stronie prowizję.";
    render();
  } catch (error) {
    console.warn("Nie udało się pobrać katalogu live; pozostaje katalog demonstracyjny.", error);
  }
}

function money(value) {
  return value.toFixed(2).replace(".", ",") + " zł";
}

function render() {
  let list = products.filter(product => {
    const matchesCategory = category === "Wszystkie" || product.category === category;
    const matchesSearch = (product.name + " " + product.category).toLocaleLowerCase("pl").includes(search.value.trim().toLocaleLowerCase("pl"));
    const matchesFavorites = !favoritesOnly || favorites.includes(String(product.id));
    return matchesCategory && matchesSearch && matchesFavorites;
  });

  if (liveCatalog && sort.value === "price-asc") list.sort((a,b) => a.price - b.price);
  if (liveCatalog && sort.value === "price-desc") list.sort((a,b) => b.price - a.price);
  if (liveCatalog && sort.value === "discount") list.sort((a,b) => a.price - b.price);

  grid.innerHTML = list.map(product => {
    const safeName = escapeHTML(product.name);
    const safeCategory = escapeHTML(product.category);
    const safeStore = escapeHTML(product.store || product.merchant || "Sklep partnerski");
    const saved = favorites.includes(String(product.id));
    return `<article class="product-card">
      <div class="product-visual">
        ${Number.isFinite(product.discount) ? `<span class="discount-pill">−${product.discount}%</span>` : ""}
        ${safeImage(product.image) ? `<img class="product-image" src="${escapeHTML(product.image)}" alt="" loading="lazy">` : `<span aria-hidden="true">${escapeHTML(product.icon || "🛍️")}</span>`}
        <button class="fav ${saved ? "saved" : ""}" data-fav="${escapeHTML(String(product.id))}" aria-label="${saved ? "Usuń z" : "Dodaj do"} ulubionych: ${safeName}" aria-pressed="${saved}">${saved ? "♥" : "♡"}</button>
      </div>
      <div class="product-category">${safeCategory}</div>
      <h3>${safeName}</h3>
      ${liveCatalog ? `<div class="price-row"><span class="price">${money(product.price)}</span></div>` : `<div class="demo-price-note">Sprawdź aktualną cenę u partnera</div>`}
      <div class="store">${safeStore} · ${product.productUrl ? "link partnerski" : "weryfikacja linku w toku"}</div>
      ${liveCatalog && product.availability ? `<div class="store">Dostępność: ${escapeHTML(product.availability)}</div>` : ""}
      ${safeProductUrl(product.productUrl) ? `<a class="offer-link" href="${escapeHTML(product.productUrl)}" target="_blank" rel="sponsored nofollow noopener"><span>Sprawdź produkt ↗</span></a>` : `<div class="offer-link"><span>Brak aktywnego linku</span><span aria-hidden="true">ⓘ</span></div>`}
    </article>`;
  }).join("");

  const count = list.length;
  document.getElementById("resultCount").textContent = `${count} ${count === 1 ? "produkt" : count < 5 ? "produkty" : "produktów"}`;
  document.getElementById("emptyState").hidden = count !== 0;
  grid.hidden = count === 0;
  favoritesToggle.setAttribute("aria-pressed", String(favoritesOnly));
  favoritesToggle.classList.toggle("active", favoritesOnly);
  favoritesToggle.innerHTML = `${favoritesOnly ? "♥" : "♡"} Tylko zapisane <span>${favorites.length}</span>`;
  const favoritesCount = document.getElementById("favoritesCount");
  if (favoritesCount) favoritesCount.textContent = String(favorites.length);
}

document.getElementById("categoryChips").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  category = button.dataset.category;
  document.querySelectorAll(".chip").forEach(chip => {
    const active = chip === button;
    chip.classList.toggle("active", active);
    chip.setAttribute("aria-pressed", String(active));
  });
  render();
});

search.addEventListener("input", render);
sort.addEventListener("change", render);
favoritesToggle.addEventListener("click", () => {
  favoritesOnly = !favoritesOnly;
  render();
});

document.getElementById("clearSearch").addEventListener("click", () => {
  search.value = "";
  render();
  search.focus();
});

document.getElementById("resetFilters").addEventListener("click", () => {
  category = "Wszystkie";
  favoritesOnly = false;
  search.value = "";
  sort.value = "recommended";
  document.querySelectorAll(".chip").forEach(chip => {
    const active = chip.dataset.category === "Wszystkie";
    chip.classList.toggle("active", active);
    chip.setAttribute("aria-pressed", String(active));
  });
  render();
});

grid.addEventListener("click", event => {
  const button = event.target.closest("[data-fav]");
  if (!button) return;
  const id = button.dataset.fav;
  if (!products.some(product => String(product.id) === id)) return;
  favorites = favorites.includes(id) ? favorites.filter(value => value !== id) : [...favorites, id];
  try { localStorage.setItem("tanievoFavorites", JSON.stringify(favorites)); localStorage.removeItem("lowcaFavorites"); } catch {}
  render();
});


const mobileNavToggle = document.getElementById("mobileNavToggle");
const mainNav = document.getElementById("main-nav");
if (mobileNavToggle && mainNav) {
  mobileNavToggle.addEventListener("click", () => {
    const expanded = mobileNavToggle.getAttribute("aria-expanded") === "true";
    mobileNavToggle.setAttribute("aria-expanded", String(!expanded));
    mainNav.classList.toggle("is-open", !expanded);
    mobileNavToggle.innerHTML = !expanded ? 'Zamknij <span aria-hidden="true">×</span>' : 'Menu <span aria-hidden="true">☰</span>';
  });
  mainNav.addEventListener("click", event => {
    if (event.target.closest("a")) {
      mainNav.classList.remove("is-open");
      mobileNavToggle.setAttribute("aria-expanded", "false");
      mobileNavToggle.innerHTML = 'Menu <span aria-hidden="true">☰</span>';
    }
  });
}

document.getElementById("year").textContent = new Date().getFullYear();
render();
// Katalog live pozostaje wyłączony do czasu przyznania API i potwierdzenia przez Ceneo zasad prezentacji oraz przetwarzania danych.

const copyPromoButton = document.getElementById("copyPromoText");
if (copyPromoButton) {
  copyPromoButton.addEventListener("click", async () => {
    const promoText = "Sprawdź Tanievo.pl — poradniki zakupowe i wybrane linki partnerskie do produktów.\nhttps://ryspyc-art.github.io/lowca-okazji/";
    const feedback = document.getElementById("shareFeedback");
    try {
      await navigator.clipboard.writeText(promoText);
      if (feedback) feedback.textContent = "Tekst skopiowany. Możesz wkleić go w wybranej grupie.";
    } catch {
      if (feedback) feedback.textContent = "Nie udało się skopiować automatycznie. Skopiuj adres strony: https://ryspyc-art.github.io/lowca-okazji/";
    }
  });
}
