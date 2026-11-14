(() => {
  "use strict";
  const dataUrl = "./porownania.json";
  const root = document.getElementById("comparisonResults");
  const status = document.getElementById("comparisonStatus");
  const sort = document.getElementById("comparisonSort");
  const allowedHosts = new Set(["www.amazon.pl", "www.x-kom.pl"]);
  const money = value => new Intl.NumberFormat("pl-PL", {style:"currency",currency:"PLN"}).format(value);
  const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, char => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[char]));
  const date = value => {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? "brak danych" : new Intl.DateTimeFormat("pl-PL",{dateStyle:"medium",timeStyle:"short"}).format(d);
  };
  const safeUrl = value => {
    try {
      const u = new URL(value);
      return u.protocol === "https:" && allowedHosts.has(u.hostname) && !u.username && !u.password ? u.href : "";
    } catch { return ""; }
  };
  const total = offer => Number.isFinite(offer.shipping) ? offer.price + offer.shipping : null;
  function render(products) {
    const mode = sort.value;
    root.innerHTML = products.map(product => {
      const now = Date.now();
      const maxAgeMs = 72 * 60 * 60 * 1000;
      const offers = [...product.offers].filter(o => {
        const checked = Date.parse(o.checkedAt);
        return safeUrl(o.url) && Number.isFinite(Number(o.price)) && Number(o.price) > 0 &&
          Number.isFinite(checked) && checked <= now && now - checked <= maxAgeMs;
      }).sort((a,b) => {
        if (mode === "price") return a.price - b.price;
        const at = total(a), bt = total(b);
        if (at === null && bt !== null) return 1;
        if (at !== null && bt === null) return -1;
        return at === null ? a.price - b.price : at - bt;
      });
      const rows = offers.map(offer => {
        const knownTotal = total(offer);
        const href = safeUrl(offer.url);
        return `<article class="offer-row">
          <div class="offer-main"><strong>${escapeHTML(offer.store)}</strong><span class="offer-condition">${escapeHTML(offer.condition)}</span><p>${escapeHTML(offer.availability)}</p></div>
          <div class="offer-price"><strong>${money(offer.price)}</strong><span>Cena produktu</span></div>
          <div class="offer-delivery"><strong>${offer.shipping === null ? "Do potwierdzenia" : offer.shipping === 0 ? "0,00 zł" : money(offer.shipping)}</strong><span>Dostawa</span></div>
          <div class="offer-total"><strong>${knownTotal === null ? "Nieznany" : money(knownTotal)}</strong><span>Łącznie</span></div>
          <div class="offer-action"><a href="${href}" target="_blank" rel="${offer.affiliate ? "sponsored nofollow noopener noreferrer" : "nofollow noopener noreferrer"}">Przejdź do sklepu ↗</a></div>
          <p class="offer-checked">Aktualizacja danych: ${date(offer.checkedAt)} · ${escapeHTML(offer.shippingNote)}</p>
        </article>`;
      }).join("");
      return `<section class="product-compare">
        <div class="product-heading"><div><span class="eyebrow">DOPASOWANIE MODELU</span><h2>${escapeHTML(product.name)}</h2><p>Producent: ${escapeHTML(product.manufacturer)} · Kod: <b>${escapeHTML(product.modelCode)}</b> · EAN: <b>${escapeHTML(product.ean)}</b></p><p>${escapeHTML(product.variant)}</p></div><span class="offer-count">${offers.length} bezpośrednie oferty</span></div>
        <div class="offer-list">${rows || "<p>Brak aktualnych ofert spełniających warunki walidacji (dane starsze niż 72 godziny są ukrywane).</p>"}</div>
      </section>`;
    }).join("");
    const count = products.reduce((n,p)=>n+p.offers.filter(o=>safeUrl(o.url)).length,0);
    status.textContent = `Modele: ${products.length} · ${count} aktualnych ofert (dane starsze niż 72 godziny są ukrywane). Sortowanie: ${mode === "price" ? "cena produktu" : "znany koszt całkowity (cena + dostawa)"}.`;
  }
  fetch(dataUrl + "?v=" + encodeURIComponent(Date.now()), {cache:"no-store"})
    .then(r => { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
    .then(data => {
      if (!data || !Array.isArray(data.products)) throw new Error("Nieprawidłowy format katalogu porównań.");
      render(data.products);
      sort.addEventListener("change", () => render(data.products));
      document.getElementById("dataUpdated").textContent = date(data.updatedAt);
    })
    .catch(error => {
      status.textContent = "Nie udało się wczytać porównań. " + error.message;
      root.innerHTML = '<p class="empty-note">Katalog porównań jest chwilowo niedostępny. Nie pokazujemy niezweryfikowanych cen.</p>';
    });
})();