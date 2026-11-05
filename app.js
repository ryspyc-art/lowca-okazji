const products = [
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
const favoritesCount = document.getElementById("favoritesCount");
let category = "Wszystkie";
let favoritesOnly = false;

function loadFavorites() {
  try {
    const value = JSON.parse(localStorage.getItem("lowcaFavorites") || "[]");
    return Array.isArray(value) ? value.filter(Number.isInteger) : [];
  } catch {
    return [];
  }
}
let favorites = loadFavorites();

function money(value) {
  return value.toFixed(2).replace(".", ",") + " zł";
}

function render() {
  let list = products.filter(product => {
    const matchesCategory = category === "Wszystkie" || product.category === category;
    const matchesSearch = (product.name + " " + product.category).toLocaleLowerCase("pl").includes(search.value.trim().toLocaleLowerCase("pl"));
    const matchesFavorites = !favoritesOnly || favorites.includes(product.id);
    return matchesCategory && matchesSearch && matchesFavorites;
  });

  if (sort.value === "price-asc") list.sort((a,b) => a.price - b.price);
  if (sort.value === "price-desc") list.sort((a,b) => b.price - a.price);
  if (sort.value === "discount") list.sort((a,b) => b.discount - a.discount);

  grid.innerHTML = list.map(product => {
    const saved = favorites.includes(product.id);
    return `<article class="product-card">
      <div class="product-visual">
        <span class="discount-pill">−${product.discount}%</span>
        <span aria-hidden="true">${product.icon}</span>
        <button class="fav ${saved ? "saved" : ""}" data-fav="${product.id}" aria-label="${saved ? "Usuń z" : "Dodaj do"} ulubionych: ${product.name}" aria-pressed="${saved}">${saved ? "♥" : "♡"}</button>
      </div>
      <div class="product-category">${product.category}</div>
      <h3>${product.name}</h3>
      <div class="price-row"><span class="price">${money(product.price)}</span><span class="old-price">${money(product.old)}</span></div>
      <div class="store">${product.store} · dane przykładowe</div>
      <div class="offer-link"><span>Oferta demonstracyjna — bez linku zakupu</span><span aria-hidden="true">ⓘ</span></div>
    </article>`;
  }).join("");

  const count = list.length;
  document.getElementById("resultCount").textContent = `${count} ${count === 1 ? "oferta" : count < 5 ? "oferty" : "ofert"}`;
  document.getElementById("emptyState").hidden = count !== 0;
  grid.hidden = count === 0;
  favoritesCount.textContent = favorites.length;
  favoritesToggle.setAttribute("aria-pressed", String(favoritesOnly));
  favoritesToggle.classList.toggle("active", favoritesOnly);
  favoritesToggle.innerHTML = `${favoritesOnly ? "♥" : "♡"} Tylko zapisane <span id="favoritesCount">${favorites.length}</span>`;
}

document.getElementById("categoryChips").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  category = button.dataset.category;
  document.querySelectorAll(".chip").forEach(chip => chip.classList.toggle("active", chip === button));
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
  document.querySelectorAll(".chip").forEach(chip => chip.classList.toggle("active", chip.dataset.category === "Wszystkie"));
  render();
});

grid.addEventListener("click", event => {
  const button = event.target.closest("[data-fav]");
  if (!button) return;
  const id = Number(button.dataset.fav);
  favorites = favorites.includes(id) ? favorites.filter(value => value !== id) : [...favorites, id];
  try { localStorage.setItem("lowcaFavorites", JSON.stringify(favorites)); } catch {}
  render();
});

document.getElementById("year").textContent = new Date().getFullYear();
render();
