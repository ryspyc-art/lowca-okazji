let products = [
  {id:"tanievo-001",name:"Apple AirPods 5 (MKFW4ZM/A)",category:"Elektronika",store:"Ceneo",icon:"🎧",image:"https://image.ceneostatic.pl/data/products/199946927/f-apple-airpods-5-z-bezprzewodowym-etui-ladujacym-mkfw4zm-a.jpg",productUrl:"https://www.ceneo.pl/199946527#cid=52090&crid=818403&pid=31443",linkType:"affiliate"},
  {id:"tanievo-002",name:"Telewizor QLED Sharp 65JT8765E 65 cali",category:"RTV",store:"Ceneo",icon:"📺",image:"https://image.ceneostatic.pl/offercandidates/9QDgAHRodHRwOi8vZjAxLmVzZnIucGwvZm90by8zLzE5MzcwMzU5NjE2OS81OTIwMjM3MjEzNWUzOTNiYTVlZGM5OWQzNmVjYjZhYS9zaGFycC10ZWxld2l6b3ItNjVqdDg3NjUsMTkzNzAzNTk2MTY5XzYud2VicA%3D%3D",productUrl:""},
  {id:"tanievo-003",name:"Karta graficzna MSI GeForce RTX 5080 Gaming Trio OC 16 GB GDDR7",category:"Elektronika",store:"Ceneo",icon:"🎮",image:"https://image.ceneostatic.pl/offercandidates/9QDgAGtodHRwczovL2Nkbi54LWtvbS5wbC9pL3NldHVwL2ltYWdlcy9wcm9kL2JpZy8xNTAweDE1MDAsLDIwMjUvMy9wcl8yMDI1XzNfMjRfMTFfMTNfMTVfMjJfMDAuanBnP2ZpbHRlcnM9dHJpbQ%3D%3D",productUrl:""},
  {id:"tanievo-004",name:"Hulajnoga elektryczna KuKirin G2",category:"Sport",store:"Ceneo",icon:"🛴",image:"https://image.ceneostatic.pl/offercandidates/9QDgAEVodHRwczovL2EuYWxsZWdyb2ltZy5jb20vb3JpZ2luYWwvMTEwYjk3Lzc4MmNiYzQ5NDFiMDkzNTMxOTJjNjc2ODgxNzc%3D",productUrl:""},
  {id:"tanievo-005",name:"Thermos Mountain FFX 0,5 l Matt Black Green",category:"Dom",store:"Ceneo",icon:"☕",image:"https://image.ceneostatic.pl/offercandidates/9QDgAF1odHRwczovL21lZGlhLmdyYW1pbm8uY29tL21lZHVzYS9UaGVybW9zLU1vdW50YWluLUZGWC1ibGFjay0wMS0wMU01NTFIWVlISEhRSEFKU01OMzVYMEo4OS5qcGc%3D",productUrl:""},
  {id:"tanievo-006",name:"Opony zimowe Dębica Frigo 2 205/55 R16 91T",category:"Motoryzacja",store:"Ceneo",icon:"🚗",image:"https://image.ceneostatic.pl/offercandidates/9QDgAEVodHRwczovL2EuYWxsZWdyb2ltZy5jb20vb3JpZ2luYWwvMTE3NjljL2Y1Yjc0OTFjNDcwODhiMDU1Y2U3NmExYWRkOWU%3D",productUrl:""},
  {id:"tanievo-007",name:"Wobell mata antyszronowa na przednią szybę",category:"Motoryzacja",store:"Ceneo",icon:"🚘",image:"https://image.ceneostatic.pl/offercandidates/9QDgAEVodHRwczovL2EuYWxsZWdyb2ltZy5jb20vb3JpZ2luYWwvMTE3ZmI2LzVmMTlmNjZhNGE0YmJjMjdiYTAzNjJkOGU0YzM%3D",productUrl:""},
  {id:"tanievo-008",name:"Wkrętarka akumulatorowa DeWALT DCD800N 18 V",category:"Narzędzia",store:"Ceneo",icon:"🛠️",image:"https://image.ceneostatic.pl/offercandidates/9QDgAEVodHRwczovL2EuYWxsZWdyb2ltZy5jb20vb3JpZ2luYWwvMTE3ZmUyL2Q4YzhiNDMzNGQwNjg2NzQyNmJjMTM4ZGQzMjY%3D",productUrl:""},
  {id:"tanievo-009",name:"Whiskas Adult Mix smaków 40 × 85 g",category:"Dla zwierząt",store:"Ceneo",icon:"🐾",image:"https://image.ceneostatic.pl/offercandidates/9QDgAEpodHRwczovL3pvb2FydC5jb20ucGwvaHBlY2lhaS82ZmFhZTk3ODM1ZjhkYzlkMGIyYjdmY2MxZGU1NDhiYS82NTY5NV8xLnBuZw%3D%3D",productUrl:""},
  {id:"tanievo-010",name:"DicloMAX Mobilat żel 100 g",category:"Zdrowie",store:"Ceneo",icon:"🧴",image:"https://image.ceneostatic.pl/offercandidates/9QDgAFVodHRwczovL2JhY2tlbmQuZHJtYXgucGwvbWVkaWEvY2F0YWxvZy9wcm9kdWN0LzIvOC8yODFkZGRkZWE2MmE2XzU5MDk5OTE1MjIzNjBfVDEuanBn",productUrl:""}
,
  {id:"tanievo-051",name:"Klawiatura SteelSeries Apex 3",category:"Komputery",store:"Ceneo",icon:"⌨️",productUrl:""},
  {id:"tanievo-052",name:"Helikon-Tex Wolfhound Hoodie Climashield Apex Black",category:"Odzież outdoor",store:"Ceneo",icon:"🧥",productUrl:""},
  {id:"tanievo-053",name:"Helikon-Tex Wolfhound Hoodie Climashield Apex Pencott Wildwood",category:"Odzież outdoor",store:"Ceneo",icon:"🧥",productUrl:""},
  {id:"tanievo-054",name:"Sudocrem Expert krem barierowy 400 g",category:"Zdrowie i higiena",store:"Ceneo",icon:"🧴",productUrl:""},
  {id:"tanievo-055",name:"LEGO City 60508 Napad na policyjny pociąg",category:"Zabawki",store:"Ceneo",icon:"🧩",productUrl:""},
  {id:"tanievo-056",name:"Pampers Premium Care rozmiar 1, 156 szt.",category:"Dziecko",store:"Ceneo",icon:"🍼",productUrl:""},
  {id:"tanievo-057",name:"Liqui Moly Diesel Spulung 500 ml (2666)",category:"Motoryzacja",store:"Ceneo",icon:"🚗",productUrl:""},
  {id:"tanievo-058",name:"Apple AirPods Pro 3",category:"Elektronika",store:"Amazon PartnerNet",icon:"🎧",image:"",price:951,productUrl:"https://www.amazon.pl/dp/B0FQF32239/ref=cm_sw_r_as_gl_api_gl_i_J6DA85MZ6MJAN3SJRE5D?linkCode=ml1&tag=tanievo-21&linkId=de2135f17c53b51a033f3a184f6574e6&gaOptInStatus=true",linkType:"affiliate"}
  ,{id:"tanievo-059",name:"Avast – oprogramowanie ochronne",category:"Oprogramowanie",store:"Avast · webePartners",icon:"🛡️",productUrl:"https://webep1.com/go/9febd7553f",linkType:"affiliate"}
  ,{id:"tanievo-060",name:"Bitdefender – pakiety antywirusowe i ochrona urządzeń",category:"Oprogramowanie",store:"Bitdefender · webePartners",icon:"🛡️",productUrl:"",linkType:"paused"}
];

// Dodatkowe pozycje katalogowe do wyszukania w Ceneo; nie są potwierdzonymi ofertami afiliacyjnymi.
const discoveryProducts = [["tanievo-011","Samsung Galaxy A56 5G","Telefony","📱"],["tanievo-012","Apple iPhone 16 128 GB","Telefony","📱"],["tanievo-013","Xiaomi Redmi Note 14 Pro 5G","Telefony","📱"],["tanievo-014","Sony WH-1000XM5","Elektronika","🎧"],["tanievo-015","JBL Tune 770NC","Elektronika","🎧"],["tanievo-016","Powerbank Xiaomi 20000 mAh","Elektronika","🔋"],["tanievo-017","Ładowarka Anker USB-C 30 W","Elektronika","🔌"],["tanievo-018","Monitor Dell 27 cali QHD","Komputery","🖥️"],["tanievo-019","Laptop Lenovo IdeaPad Slim 3","Komputery","💻"],["tanievo-020","SSD Samsung 990 EVO 1 TB","Komputery","💾"],["tanievo-021","Klawiatura Logitech K380","Komputery","⌨️"],["tanievo-022","Mysz Logitech MX Master 3S","Komputery","🖱️"],["tanievo-023","Sony PlayStation 5 Slim","Gaming","🎮"],["tanievo-024","Xbox Wireless Controller","Gaming","🎮"],["tanievo-025","Telewizor Samsung QLED 55 cali","RTV","📺"],["tanievo-026","Soundbar JBL Bar 500","RTV","🔊"],["tanievo-027","DeLonghi Magnifica S","AGD","☕"],["tanievo-028","Xiaomi Robot Vacuum S10","AGD","🤖"],["tanievo-029","Dyson V8","AGD","🧹"],["tanievo-030","Philips Airfryer 3000","AGD","🍟"],["tanievo-031","Blender Bosch VitaPower","AGD","🥤"],["tanievo-032","Czajnik Bosch Styline","AGD","🫖"],["tanievo-033","Zestaw garnków Tefal Ingenio","Dom","🍳"],["tanievo-034","Patelnia Tefal Unlimited 28 cm","Dom","🍳"],["tanievo-035","Pościel bawełniana 160 × 200 cm","Dom","🛏️"],["tanievo-036","Xiaomi Smart Air Purifier 4","Dom","🌬️"],["tanievo-037","Lampa biurkowa LED","Dom","💡"],["tanievo-038","Bosch Professional GSR 18V-55","Narzędzia","🛠️"],["tanievo-039","Szlifierka kątowa Makita 9558HNRG","Narzędzia","⚙️"],["tanievo-040","Zestaw kluczy nasadowych Yato","Narzędzia","🔧"],["tanievo-041","Kosiarka Bosch UniversalRotak","Ogród","🌱"],["tanievo-042","Myjka Kärcher K 4 Power Control","Ogród","🚿"],["tanievo-043","Kurtka trekkingowa softshell","Moda","🧥"],["tanievo-044","Adidas Terrex AX4","Obuwie","🥾"],["tanievo-045","Nike Revolution 7","Obuwie","👟"],["tanievo-046","Garmin Forerunner 165","Sport","⌚"],["tanievo-047","Mata fitness 180 cm","Sport","🧘"],["tanievo-048","Michelin Alpin 6 205/55 R16","Motoryzacja","🚗"],["tanievo-049","Wideorejestrator 70mai A500S","Motoryzacja","📹"],["tanievo-050","Legowisko wodoodporne dla psa","Dla zwierząt","🐾"]].map(([id,name,category,icon]) => ({id,name,category,icon,store:"Wyszukaj w Ceneo",productUrl:"https://www.ceneo.pl/;szukaj-" + encodeURIComponent(name),linkType:"search"}));
products = [...products, ...discoveryProducts];

// Zweryfikowane zdjęcia produktów — przypisujemy tylko do zgodnych modeli.
// Pozostałe karty zachowują czytelny placeholder zamiast przypadkowej fotografii.
const verifiedProductImages = {
  "Apple AirPods Pro 3": "https://cdn.newtime.ua/upload/2025-09/navushniki-apple-airpods-pro-3_2400.webp",
  "Samsung Galaxy Buds3 Pro": "https://www.callme.dk/globalassets/olympus/inriver/samsung-galaxy-buds3-pro-silver_1.png?w=480",
  "Apple iPhone 17 Pro 256 GB": "https://www.mediazone.ma/product/images/18044-O4NyMHRz/apple-iphone-17-pro-256go-bleu-intense-maroc.webp",
  "Wkrętarka akumulatorowa DeWALT DCD800N 18 V": "https://narzedziownia.shop/701169-large_default/wkretarka-18v-xr-90nm-2-biegowa-dewalt-dcd800n.jpg"
};
for (const product of products) {
  if (!product.image && verifiedProductImages[product.name]) {
    product.image = verifiedProductImages[product.name];
  }
}

// Ujednolicenie nazw kategorii: kafelki i filtry muszą wskazywać te same pozycje.
function normalizeCategory(value) {
  const aliases = {
    "Odzież outdoor": "Moda",
    "Zdrowie i higiena": "Zdrowie",
    "Smartfony": "Telefony",
    "Słuchawki": "Elektronika"
  };
  return aliases[value] || value;
}
products.forEach(product => {
  product.category = normalizeCategory(product.category);
});

// Ceneo potwierdziło możliwość używania wspólnych parametrów afiliacyjnych
// PID/CRID/CID dla różnych produktów, jeśli nie wymagamy statystyk per produkt.
// AirPods 5 zachowuje dokładny link wygenerowany w panelu; pozostałe produkty
// kierują do wyszukiwania swojej nazwy w Ceneo z tymi samymi parametrami.
const ceneoTracking = "cid=52090&crid=818403&pid=31443";
for (const product of products) {
  if (!product.productUrl) {
    product.productUrl = "https://www.ceneo.pl/;szukaj-" + encodeURIComponent(product.name);
    product.linkType = "search";
  }
  if (product.id !== "tanievo-001" && product.linkType === "search") {
    const baseUrl = product.productUrl.split("#")[0];
    product.productUrl = baseUrl + "#" + ceneoTracking;
    product.linkType = "affiliate";
  } else if (!product.linkType) {
    product.linkType = "affiliate";
  }
  if (!product.store) product.store = "Ceneo";
}

const grid = document.getElementById("productGrid");
const search = document.getElementById("searchInput");
const sort = document.getElementById("sortSelect");
const favoritesToggle = document.getElementById("favoritesToggle");
let catalogCategories = [...new Set(products.map(p => p.category))].sort((a,b) => a.localeCompare(b,"pl"));
let category = "Wszystkie";
let favoritesOnly = false;
function buildCategoryNavigation(){catalogCategories=[...new Set(products.map(p=>p.category))].sort((a,b)=>a.localeCompare(b,"pl"));const chips=document.getElementById("categoryChips");if(chips)chips.innerHTML=["Wszystkie",...catalogCategories].map((name,i)=>'<button class="chip '+(i===0?"active":"") + '" data-category="'+escapeHTML(name)+'" aria-pressed="'+(i===0?"true":"false")+'">'+escapeHTML(name)+'</button>').join("");document.querySelectorAll("[data-category-jump]").forEach(tile=>{const n=products.filter(p=>p.category===tile.dataset.categoryJump).length;const s=tile.querySelector("small");if(s)s.textContent=n+(n===1?" produkt":n<5?" produkty":" produktów")});const statusCount=document.getElementById("catalogStatusCount");if(statusCount)statusCount.textContent=products.length;const note=document.querySelector(".demo-note");if(note)note.textContent=products.length+" produktów w katalogu";}

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
async function loadAmazonOffers() {
  try {
    const response = await fetch("./amazon-offers.json?cache=" + Date.now(), {cache:"no-store"});
    if (!response.ok) return;
    const payload = await response.json();
    if (!payload || !Array.isArray(payload.offers)) return;
    const imported = payload.offers.filter(item => {
      if (!item || typeof item.id !== "string" || typeof item.name !== "string" || typeof item.productUrl !== "string" || !isSafeExternalHttpsUrl(item.productUrl)) return false;
      const url = new URL(item.productUrl);
      if (item.linkType === "comparison") return url.hostname === "www.ceneo.pl" && typeof item.amazonSearchUrl === "string" && isSafeExternalHttpsUrl(item.amazonSearchUrl) && new URL(item.amazonSearchUrl).hostname === "www.amazon.pl" && new URL(item.amazonSearchUrl).searchParams.get("tag") === "tanievo-21" && Number.isFinite(Number(item.price)) && Number(item.price) > 0;
      return url.hostname === "www.amazon.pl" && url.searchParams.get("tag") === "tanievo-21" && typeof item.asin === "string" && url.pathname.includes("/dp/" + item.asin);
    }).map(item => ({
      id:item.id, name:item.name, category:normalizeCategory(item.category || "Inne"),
      price:Number.isFinite(Number(item.price)) && Number(item.price) > 0 ? Number(item.price) : null, priceSource:item.priceSource || "", priceCheckedAt:item.priceCheckedAt || "", store:item.merchant || "Amazon", productUrl:item.productUrl,
      linkType:item.linkType === "comparison" ? "comparison" : "affiliate", amazonSearchUrl:item.amazonSearchUrl || "", ceneoUrl:item.ceneoUrl || "",
      image:safeImage(item.image) ? item.image : "", availability:item.availability || "Sprawdź u sprzedawcy", icon:"🛍️"
    }));
    for (const offer of imported) {
      const index = products.findIndex(product => String(product.id) === offer.id);
      if (index >= 0) {
        // Nie pozwól, aby błędny lub powielony identyfikator nadpisał inną ofertę.
        if (products[index].name !== offer.name) {
          console.warn("Pominięto ofertę z kolizją ID:", offer.id, offer.name);
          continue;
        }
        products[index] = {...products[index], ...offer};
      } else {
        products.unshift(offer);
      }
    }
    buildCategoryNavigation();
    render();
  } catch (error) {
    console.warn("Nie udało się wczytać ofert Amazon PartnerNet.", error);
  }
}

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
      category: normalizeCategory(typeof item.category === "string" ? item.category : "Inne"),
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


// Obsługa niedziałających zdjęć: zamieniamy je na lokalny, estetyczny placeholder.
grid.addEventListener("error", event => {
  const image = event.target;
  if (!(image instanceof HTMLImageElement) || !image.classList.contains("product-image")) return;
  const fallback = document.createElement("span");
  fallback.className = "product-image-fallback";
  fallback.setAttribute("aria-label", "Zdjęcie produktu niedostępne");
  fallback.textContent = image.closest(".product-visual")?.querySelector(".fav")?.getAttribute("aria-label")?.includes("słuch") ? "🎧" : "🛍️";
  image.replaceWith(fallback);
}, true);

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
        ${safeImage(product.image) ? `<img class="product-image" src="${escapeHTML(product.image)}" alt="${safeName}" loading="lazy" decoding="async">` : `<span aria-hidden="true">${escapeHTML(product.icon || "🛍️")}</span>`}
        <button class="fav ${saved ? "saved" : ""}" data-fav="${escapeHTML(String(product.id))}" aria-label="${saved ? "Usuń z" : "Dodaj do"} ulubionych: ${safeName}" aria-pressed="${saved}">${saved ? "♥" : "♡"}</button>
      </div>
      <div class="product-category">${safeCategory}</div>
      <h3>${safeName}</h3>
      ${Number.isFinite(product.price) ? `<div class="price-row"><span class="price">${money(product.price)}</span></div>` : `<div class="demo-price-note">${product.priceSource ? "Cena niepotwierdzona — sprawdź u sprzedawcy" : "Sprawdź aktualną cenę u partnera"}</div>`}
      <div class="store">${safeStore} · ${product.linkType === "paused" ? "oferta chwilowo niedostępna" : product.linkType === "search" ? "wyszukiwanie produktu" : product.productUrl ? "link partnerski" : "weryfikacja linku w toku"}</div>
      ${liveCatalog && product.availability ? `<div class="store">Dostępność: ${escapeHTML(product.availability)}</div>` : ""}
      ${safeProductUrl(product.productUrl) ? `<a class="offer-link" href="${escapeHTML(product.productUrl)}" target="_blank" rel="${product.linkType === "affiliate" ? "sponsored nofollow noopener" : "nofollow noopener"}"><span>${product.linkType === "search" ? "Szukaj w Ceneo ↗" : product.linkType === "comparison" ? "Sprawdź Ceneo ↗" : "Sprawdź produkt ↗"}</span></a>` : `<div class="offer-link"><span>${product.linkType === "paused" ? "Oferta chwilowo niedostępna" : "Brak aktywnego linku"}</span><span aria-hidden="true">ⓘ</span></div>`}
      ${product.ceneoUrl && product.ceneoUrl !== product.productUrl && safeProductUrl(product.ceneoUrl) && new URL(product.ceneoUrl).hostname === "www.ceneo.pl" ? `<a class="offer-link" href="${escapeHTML(product.ceneoUrl)}" target="_blank" rel="nofollow noopener"><span>Porównaj ceny na Ceneo ↗</span></a>` : ""}
      ${product.amazonSearchUrl && safeProductUrl(product.amazonSearchUrl) && new URL(product.amazonSearchUrl).hostname === "www.amazon.pl" ? `<a class="offer-link" href="${escapeHTML(product.amazonSearchUrl)}" target="_blank" rel="sponsored nofollow noopener"><span>Szukaj na Amazon ↗</span></a>` : ""}
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

document.querySelector(".category-grid")?.addEventListener("click", event => {
  const tile = event.target.closest("[data-category-jump]");
  if (!tile) return;
  category = tile.dataset.categoryJump;
  favoritesOnly = false;
  search.value = "";
  document.querySelectorAll(".chip").forEach(chip => {
    const active = chip.dataset.category === category;
    chip.classList.toggle("active", active);
    chip.setAttribute("aria-pressed", String(active));
  });
  render();
  document.getElementById("oferty").scrollIntoView({behavior:"smooth", block:"start"});
});

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
buildCategoryNavigation();
render();
// Jeśli zatwierdzony workflow opublikuje products.json, strona pobierze aktualny katalog.
// Brak pliku oznacza pozostawienie bezpiecznego katalogu demonstracyjnego.
loadLiveCatalog();
loadAmazonOffers();

const copyPromoButton = document.getElementById("copyPromoText");
if (copyPromoButton) {
  copyPromoButton.addEventListener("click", async () => {
    const promoText = "Sprawdź Tanievo.pl — katalog produktów, wyszukiwanie w Ceneo i praktyczne poradniki zakupowe.\nhttps://tanievo.pl/";
    const feedback = document.getElementById("shareFeedback");
    try {
      await navigator.clipboard.writeText(promoText);
      if (feedback) feedback.textContent = "Tekst skopiowany. Możesz wkleić go w wybranej grupie.";
    } catch {
      if (feedback) feedback.textContent = "Nie udało się skopiować automatycznie. Skopiuj adres strony: https://tanievo.pl/";
    }
  });
}
