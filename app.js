let products = [
  {id:1,name:"Słuchawki bezprzewodowe",category:"Elektronika",price:129,old:179,store:"Przykładowy sklep",icon:"🎧",discount:28},
  {id:2,name:"Smartwatch sportowy",category:"Elektronika",price:189,old:249,store:"Przykładowy sklep",icon:"⌚",discount:24},
  {id:3,name:"Lampka biurkowa LED",category:"Dom",price:49,old:69,store:"Przykładowy sklep",icon:"💡",discount:29},
  {id:4,name:"Plecak turystyczny",category:"Sport",price:99,old:139,store:"Przykładowy sklep",icon:"🎒",discount:29},
  {id:5,name:"Buty trekkingowe",category:"Sport",price:219,old:299,store:"Przykładowy sklep",icon:"🥾",discount:27},
  {id:6,name:"Bluza klasyczna",category:"Moda",price:79,old:109,store:"Przykładowy sklep",icon:"🧥",discount:28},
  {id:7,name:"Powerbank 20000 mAh",category:"Elektronika",price:69,old:99,store:"Przykładowy sklep",icon:"🔋",discount:30},
  {id:8,name:"Kubek termiczny",category:"Dom",price:39,old:55,store:"Przykładowy sklep",icon:"☕",discount:29},
  {id:9,name:"Czapka zimowa",category:"Moda",price:29,old:45,store:"Przykładowy sklep",icon:"🧢",discount:36}
];

const grid = document.getElementById("productGrid");
const search = document.getElementById("searchInput");
const sort = document.getElementById("sortSelect");
const favoritesToggle = document.getElementById("favoritesToggle");
let category = "Wszystkie";
let favoritesOnly = false;

function loadFavorites() {
  try {
    const value = JSON.parse(localStorage.getItem("lowcaFavorites") || "[]");
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
function safeImage(value) {
  try { return new URL(value).protocol === "https:"; } catch { return false; }
}
function safeProductUrl(value) {
  try { return new URL(value).protocol === "https:"; } catch { return false; }
}
let liveCatalog = false;
async function loadLiveCatalog() {
  try {
    const response = await fetch("./products.json?cache=" + Date.now(), {cache:"no-store"});
    if (!response.ok) return;
    const payload = await response.json();
    const items = Array.isArray(payload) ? payload : payload.items;
    if (!Array.isArray(items) || !items.length) return;
    const normalized = items.filter(item =>
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
      icon: "🛍️"
    }));
    if (!normalized.length) return;
    products = normalized;
    liveCatalog = true;
    const note = document.querySelector(".demo-note");
    if (note) note.textContent = "Oferty partnerskie • katalog aktualizowany";
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

  if (sort.value === "price-asc") list.sort((a,b) => a.price - b.price);
  if (sort.value === "price-desc") list.sort((a,b) => b.price - a.price);
  if (sort.value === "discount") {
    if (liveCatalog) list.sort((a,b) => a.price - b.price);
    else list.sort((a,b) => b.discount - a.discount);
  }

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
      <div class="price-row"><span class="price">${money(product.price)}</span>${Number.isFinite(product.old) ? `<span class="old-price">${money(product.old)}</span>` : ""}</div>
      <div class="store">${safeStore} · ${liveCatalog ? "aktualizacja: " + (product.updatedAt ? formatDate(product.updatedAt) : "czas nieznany") : "dane przykładowe"}</div>
      ${safeProductUrl(product.productUrl) ? `<a class="offer-link" href="${escapeHTML(product.productUrl)}" target="_blank" rel="sponsored nofollow noopener"><span>Sprawdź cenę w sklepie ↗</span></a>` : `<div class="offer-link"><span>Oferta demonstracyjna — bez linku zakupu</span><span aria-hidden="true">ⓘ</span></div>`}
    </article>`;
  }).join("");

  const count = list.length;
  document.getElementById("resultCount").textContent = `${count} ${count === 1 ? "oferta" : count < 5 ? "oferty" : "ofert"}`;
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
  try { localStorage.setItem("lowcaFavorites", JSON.stringify(favorites)); } catch {}
  render();
});

document.getElementById("year").textContent = new Date().getFullYear();
render();
loadLiveCatalog();

const copyPromoButton = document.getElementById("copyPromoText");
if (copyPromoButton) {
  copyPromoButton.addEventListener("click", async () => {
    const promoText = "Sprawdź Łowcę Okazji — niezależny projekt z poradnikiem zakupowym i wybranymi linkami partnerskimi. Główny katalog produktów jest obecnie demonstracyjny.\nhttps://ryspyc-art.github.io/lowca-okazji/";
    const feedback = document.getElementById("shareFeedback");
    try {
      await navigator.clipboard.writeText(promoText);
      if (feedback) feedback.textContent = "Tekst skopiowany. Możesz wkleić go w wybranej grupie.";
    } catch {
      if (feedback) feedback.textContent = "Nie udało się skopiować automatycznie. Skopiuj adres strony: https://ryspyc-art.github.io/lowca-okazji/";
    }
  });
}
