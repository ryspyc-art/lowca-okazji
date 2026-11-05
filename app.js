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
const grid=document.getElementById("productGrid"), search=document.getElementById("searchInput"), sort=document.getElementById("sortSelect");
let category="Wszystkie";
let favorites=JSON.parse(localStorage.getItem("lowcaFavorites")||"[]");
function render(){
  let list=products.filter(p=>(category==="Wszystkie"||p.category===category)&&(`${p.name} ${p.category}`.toLowerCase().includes(search.value.toLowerCase())));
  if(sort.value==="price-asc")list.sort((a,b)=>a.price-b.price);
  if(sort.value==="price-desc")list.sort((a,b)=>b.price-a.price);
  if(sort.value==="discount")list.sort((a,b)=>b.discount-a.discount);
  grid.innerHTML=list.map(p=>`<article class="product-card">
    <div class="product-visual"><span class="discount-pill">−${p.discount}%</span><span>${p.icon}</span>
    <button class="fav ${favorites.includes(p.id)?"saved":""}" data-fav="${p.id}" aria-label="Zapisz ${p.name}">${favorites.includes(p.id)?"♥":"♡"}</button></div>
    <div class="product-category">${p.category}</div><h3>${p.name}</h3>
    <div class="price-row"><span class="price">${p.price.toFixed(2).replace(".",",")} zł</span><span class="old-price">${p.old.toFixed(2).replace(".",",")} zł</span></div>
    <div class="store">${p.store} · przykład</div>
    <div class="offer-link"><span>Dane demonstracyjne</span><span>↗</span></div>
  </article>`).join("");
  document.getElementById("resultCount").textContent=`${list.length} ${list.length===1?"oferta":list.length<5?"oferty":"ofert"}`;
  document.getElementById("emptyState").hidden=list.length!==0;
  grid.hidden=list.length===0;
}
document.getElementById("categoryChips").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;category=b.dataset.category;document.querySelectorAll(".chip").forEach(x=>x.classList.toggle("active",x===b));render();});
search.addEventListener("input",render);sort.addEventListener("change",render);
document.getElementById("clearSearch").addEventListener("click",()=>{search.value="";render();search.focus();});
document.getElementById("resetFilters").addEventListener("click",()=>{category="Wszystkie";search.value="";sort.value="recommended";document.querySelectorAll(".chip").forEach(x=>x.classList.toggle("active",x.dataset.category==="Wszystkie"));render();});
grid.addEventListener("click",e=>{const b=e.target.closest("[data-fav]");if(!b)return;const id=Number(b.dataset.fav);favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];localStorage.setItem("lowcaFavorites",JSON.stringify(favorites));render();});
document.getElementById("year").textContent=new Date().getFullYear();
render();
