/* cart.js – panier simple avec localStorage */
const STORAGE_KEY = 'alynia_cart_v1';

function readCart(){ try{ return JSON.parse(localStorage.getItem(STORAGE_KEY))||[] }catch{ return [] } }
function saveCart(cart){ localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)) }

function addToCart(item){
  const cart = readCart();
  const found = cart.find(p => p.sku === item.sku);
  if(found){ found.qty += 1; } else { cart.push({...item, qty:1}); }
  saveCart(cart);
}

function handleClick(e){
  const card = e.target.closest('.add-to-cart');
  if(!card) return;

  // infos produit depuis data-*
  const sku   = card.dataset.sku;
  const name  = card.dataset.name;
  const price = parseFloat(card.dataset.price);
  const image = card.dataset.image;
  if(!sku || !name || !price || !image) return;

  addToCart({ sku, name, price, image });

  // petit toast visuel
  showToast('Ajouté au panier');

  // on laisse le lien aller vers cart.html (progressive enhancement)
}

function showToast(txt){
  let t = document.querySelector('.toast');
  if(!t){
    t = document.createElement('div');
    t.className = 'toast';
    t.style.cssText = `
      position:fixed; left:50%; bottom:20px; transform:translateX(-50%);
      background:#222; color:#fff; padding:10px 14px; border-radius:999px;
      font:600 14px/1.2 system-ui, Arial; z-index:9999; opacity:.95;`;
    document.body.appendChild(t);
  }
  t.textContent = txt;
  t.style.display = 'block';
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(()=> t.style.display='none', 1200);
}

document.addEventListener('click', handleClick);

/* pour cart.html */
window.CartAPI = { readCart, saveCart };
