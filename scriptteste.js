// =================== DADOS ===================
const producers = [
    { id: 1, name: 'Sítio Verde', city: 'Cabo Frio', desc: 'Agricultura familiar - frutas orgânicas', phone: '(21) 9xxxx-xxxx' },
    { id: 2, name: 'Horta da Maria', city: 'Niterói', desc: 'Hortaliças e verduras frescas', phone: '(21) 9yyyy-yyyy' },
    { id: 3, name: 'Laticínios Campo', city: 'Maricá', desc: 'Queijos artesanais e leite fresco', phone: '(22) 9zzzz-zzzz' }
];

const productsData = [
    { id: 101, producerId: 1, name: 'Manga Tommy (un)', category: 'frutas', price: 4.5, img: 'https://images.unsplash.com/photo-1510627498534-cf7e9002facc?auto=format&fit=crop&w=800&q=60' },
    { id: 102, producerId: 1, name: 'Banana Prata (kg)', category: 'frutas', price: 6.0, img: 'https://images.unsplash.com/photo-1574226516831-e1dff420e37d?auto=format&fit=crop&w=800&q=60' },
    { id: 103, producerId: 2, name: 'Alface (maço)', category: 'verduras', price: 3.0, img: 'https://images.unsplash.com/photo-1542444459-db2d9f9e3b5b?auto=format&fit=crop&w=800&q=60' },
    { id: 104, producerId: 2, name: 'Couve (maço)', category: 'verduras', price: 2.5, img: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=800&q=60' },
    { id: 105, producerId: 3, name: 'Queijo Minas (kg)', category: 'laticinios', price: 28.0, img: 'https://images.unsplash.com/photo-1596513007680-9b3b9d4b0c7f?auto=format&fit=crop&w=800&q=60' }
];

// Carrinho no localStorage
const CART_KEY = 'agrolocal_cart_v1';
let cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');

// Helpers
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

function saveCart() { localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartCount(); }
function updateCartCount() { $('#cartCount').textContent = cart.reduce((s, i) => s + i.qty, 0); }

// Render produtos
function renderProducts(list) {
    const el = $('#products'); el.innerHTML = '';
    if (!list.length) { el.innerHTML = '<p class="center muted">Nenhum produto encontrado</p>'; return }
    list.forEach(p => {
        const prod = document.createElement('article'); prod.className = 'card';
        prod.innerHTML = `
        <img src="${p.img}" alt="${p.name}" style="max-width:100%;border-radius:6px"/>
        <h3>${p.name}</h3>
        <p class="muted">${getProducerName(p.producerId)}</p>
        <div class="price">R$ ${p.price.toFixed(2)}</div>
        <button data-id="${p.id}">Adicionar ao carrinho</button>
      `;
        el.appendChild(prod);
    });
    $$('.card button').forEach(b => b.addEventListener('click', () => { addToCart(parseInt(b.dataset.id)); }))
}

function renderProducers() {
    const el = $('#producersList'); el.innerHTML = '';
    producers.forEach(p => {
        const div = document.createElement('div'); div.className = 'card';
        div.innerHTML = `
        <h3>${p.name}</h3>
        <p class="muted">${p.desc} — ${p.city}</p>
        <div style="margin-top:8px;display:flex;gap:8px">
          <button class="chip" data-producer="${p.id}">Ver produtos</button>
          <button class="chip" data-contact="${p.id}">Contato</button>
        </div>
      `;
        el.appendChild(div);
    });
    $$('[data-producer]').forEach(b => b.addEventListener('click', e => { showProducerProducts(parseInt(e.target.dataset.producer)); }))
    $$('[data-contact]').forEach(b => b.addEventListener('click', e => { showContact(parseInt(e.target.dataset.contact)); }))
}

function getProducerName(id) { const p = producers.find(x => x.id === id); return p ? p.name : 'Produtor' }

function addToCart(productId) {
    const prod = productsData.find(x => x.id === productId);
    if (!prod) return;
    const item = cart.find(i => i.id === productId);
    if (item) item.qty += 1; else cart.push({ id: productId, qty: 1, name: prod.name, price: prod.price, producerId: prod.producerId });
    saveCart();
    showNotification('Produto adicionado ao carrinho');
}

function showNotification(message) {
    const id = 'notify';
    if (document.getElementById(id)) return;
    const div = document.createElement('div'); div.id = id; div.textContent = message;
    div.style.position = 'fixed'; div.style.bottom = '80px'; div.style.left = '50%';
    div.style.transform = 'translateX(-50%)'; div.style.padding = '10px 16px';
    div.style.background = 'rgba(0,0,0,0.8)'; div.style.color = 'white';
    div.style.borderRadius = '8px'; div.style.zIndex = 9999;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 1500);
}

// Modal
const modal = $('#modal'); const sheet = $('#sheetContent');
function openModal(html) { sheet.innerHTML = html; modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); }
function closeModal() { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); }
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

function showProducerProducts(producerId) {
    const prods = productsData.filter(p => p.producerId === producerId);
    let html = `<h2>Produtos de ${getProducerName(producerId)}</h2>`;
    if (!prods.length) html += '<p class="muted">Nenhum produto cadastrado.</p>';
    prods.forEach(p => {
        html += `
        <div class="row">
          <div><strong>${p.name}</strong><div class="muted">R$ ${p.price.toFixed(2)}</div></div>
          <div><button class="btn" data-add="${p.id}">Adicionar</button></div>
        </div>`;
    });
    html += '<div style="margin-top:12px"><button class="chip" id="closeSheet">Fechar</button></div>';
    openModal(html);
    sheet.querySelectorAll('[data-add]').forEach(b => b.addEventListener('click', e => { addToCart(parseInt(e.target.dataset.add)); }));
    sheet.querySelector('#closeSheet').addEventListener('click', () => closeModal());
}

function showContact(producerId) {
    const p = producers.find(x => x.id === producerId);
    let html = `
      <h2>${p.name}</h2>
      <p class="muted">${p.desc}</p>
      <p class="muted">Cidade: ${p.city}</p>
      <p class="muted">Telefone: ${p.phone}</p>
      <div style="margin-top:12px"><button class="btn" id="closeContact">Fechar</button></div>`;
    openModal(html);
    sheet.querySelector('#closeContact').addEventListener('click', closeModal);
}

// Carrinho
function openCart() {
    if (cart.length === 0) {
        openModal('<h2>Carrinho</h2><p class="muted">Seu carrinho está vazio.</p><div style="margin-top:12px"><button class="chip" id="closeCart">Fechar</button></div>');
        sheet.querySelector('#closeCart').addEventListener('click', closeModal);
        return
    }
    let html = '<h2>Carrinho</h2>';
    cart.forEach(item => {
        html += `
        <div class="row">
          <div><strong>${item.name}</strong><div class="muted">Produtor: ${getProducerName(item.producerId)}</div></div>
          <div>
            <div style="text-align:right">
              R$ ${(item.price * item.qty).toFixed(2)}
              <div style="margin-top:6px">
                <button class="chip" data-minus="${item.id}">-</button>
                <span style="padding:0 8px">${item.qty}</span>
                <button class="chip" data-plus="${item.id}">+</button>
              </div>
            </div>
          </div>
        </div>`;
    });
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    html += `<hr><div class="row"><strong>Total</strong><strong>R$ ${total.toFixed(2)}</strong></div>
    <div style="margin-top:12px"><button class="btn" id="confirmBuy">Confirmar compra</button> <button class="chip" id="closeCart2">Continuar comprando</button></div>`;
    openModal(html);
    sheet.querySelectorAll('[data-plus]').forEach(b => b.addEventListener('click', e => { changeQty(parseInt(e.target.dataset.plus), 1); }));
    sheet.querySelectorAll('[data-minus]').forEach(b => b.addEventListener('click', e => { changeQty(parseInt(e.target.dataset.minus), -1); }));
    sheet.querySelector('#confirmBuy').addEventListener('click', confirmPurchase);
    sheet.querySelector('#closeCart2').addEventListener('click', closeModal);
}

function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
    saveCart();
    openCart();
}

function confirmPurchase() {
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const html = `<h2>Compra confirmada</h2><p class="muted">Total: R$ ${total.toFixed(2)}</p><p class="muted">Obrigado por apoiar a produção local!</p><div style="margin-top:12px"><button class="chip" id="closeThanks">Fechar</button></div>`;
    cart = []; saveCart(); openModal(html);
    sheet.querySelector('#closeThanks').addEventListener('click', closeModal);
}

// Busca e filtros
function applySearchAndFilter() {
    const q = $('#search').value.trim().toLowerCase();
    const active = $$('.filters .chip.active')[0]?.dataset.filter || 'all';
    let list = productsData.filter(p => (active === 'all' || p.category === active) && (p.name.toLowerCase().includes(q) || getProducerName(p.producerId).toLowerCase().includes(q)));
    renderProducts(list);
}

$$('.filters .chip').forEach(ch => {
    ch.addEventListener('click', () => {
        $$('.filters .chip').forEach(x => x.classList.remove('active'));
        ch.classList.add('active');
        applySearchAndFilter();
    })
});

// Bindings
$('#btnSearch').addEventListener('click', applySearchAndFilter);
$('#search').addEventListener('keyup', (e) => { if (e.key === 'Enter') applySearchAndFilter(); });
$('#openCart').addEventListener('click', openCart);

// Initialize
function init() { renderProducts(productsData); renderProducers(); updateCartCount(); }
init();