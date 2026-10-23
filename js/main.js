/*
  ======================================================
  INDKAN World Wide Exim Pvt. Ltd. - Main JavaScript
  Developer: Sakshi Jindam (sakshijindam17@gmail.com)
  Pre-Interview Practical Assignment Submission
  Handles PWA Service Worker, offline caching, 
  Enquiry List (localStorage), Catalogue filtering,
  Product Detail loader, Forms validation, and Accordion.
  ======================================================
*/

// ==========================================
// 1. SERVICE WORKER & PWA INSTALLATION
// ==========================================

// Register Service Worker for offline capabilities
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then((registration) => {
        console.log('INDKAN PWA Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.log('INDKAN PWA Service Worker registration failed:', error);
      });
  });
}

// Variable to store the beforeinstallprompt event
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent browser's mini-infobar from automatically displaying
  e.preventDefault();
  // Store the event so it can be triggered by the user
  deferredPrompt = e;
  console.log('PWA: beforeinstallprompt event captured');

  // Ensure install banner is visible if not dismissed
  const banner = document.getElementById('pwaInstallBanner');
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  if (banner && !isStandalone && sessionStorage.getItem('pwa_banner_dismissed') !== 'true') {
    banner.style.display = 'block';
  }
});

// Hide install banner when app is successfully installed
window.addEventListener('appinstalled', () => {
  console.log('PWA: INDKAN Apparel was installed successfully');
  const banner = document.getElementById('pwaInstallBanner');
  if (banner) banner.style.display = 'none';
  deferredPrompt = null;
});

// Show device-specific install guide modal
function showPwaInstallModal() {
  const existingModal = document.getElementById('pwaInstallModal');
  if (existingModal) existingModal.remove();

  const isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
  const isAndroid = /android/.test(window.navigator.userAgent.toLowerCase());

  let instructionsHtml = '';
  if (isIos) {
    instructionsHtml = `
      <li class="pwa-modal-step">
        <span class="pwa-step-num">1</span>
        <p>In Safari, tap the <strong>Share</strong> button <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle;"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg> at the bottom of the screen.</p>
      </li>
      <li class="pwa-modal-step">
        <span class="pwa-step-num">2</span>
        <p>Scroll down the share menu and tap <strong>"Add to Home Screen"</strong>.</p>
      </li>
      <li class="pwa-modal-step">
        <span class="pwa-step-num">3</span>
        <p>Tap <strong>"Add"</strong> in the top-right corner. The INDKAN icon is pinned to your home screen.</p>
      </li>
    `;
  } else if (isAndroid) {
    instructionsHtml = `
      <li class="pwa-modal-step">
        <span class="pwa-step-num">1</span>
        <p>Tap the Chrome browser menu (<strong>⋮</strong> three vertical dots in the top right).</p>
      </li>
      <li class="pwa-modal-step">
        <span class="pwa-step-num">2</span>
        <p>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</p>
      </li>
      <li class="pwa-modal-step">
        <span class="pwa-step-num">3</span>
        <p>Tap <strong>"Install"</strong> to add INDKAN Apparel to your app drawer.</p>
      </li>
    `;
  } else {
    instructionsHtml = `
      <li class="pwa-modal-step">
        <span class="pwa-step-num">1</span>
        <p>Look at your browser address bar on the right side for the <strong>Install icon (⊕)</strong>.</p>
      </li>
      <li class="pwa-modal-step">
        <span class="pwa-step-num">2</span>
        <p>Click the icon, or open the browser menu (<strong>⋮</strong>) and click <strong>"Install INDKAN Apparel"</strong>.</p>
      </li>
      <li class="pwa-modal-step">
        <span class="pwa-step-num">3</span>
        <p>Click <strong>"Install"</strong> to run INDKAN in its own dedicated standalone window.</p>
      </li>
    `;
  }

  const modalHtml = `
    <div class="pwa-modal-backdrop" id="pwaInstallModal">
      <div class="pwa-modal-card">
        <button type="button" class="pwa-modal-close" id="pwaModalClose" aria-label="Close">&times;</button>
        <div class="pwa-modal-header">
          <img src="assets/icons/icon-192.png" alt="INDKAN Icon" onerror="this.src='assets/img/final_logo.png'" />
          <div>
            <h3>Install INDKAN Apparel</h3>
            <span style="font-size: 12px; color: #718096;">Offline-Ready Mobile &amp; Desktop App</span>
          </div>
        </div>
        <p style="font-size: 13.5px; color: #4a5568; margin-bottom: 8px;">
          Install this application on your device for instant offline access to the garment catalogue, export prices, and wholesale enquiry cart.
        </p>
        <ul class="pwa-modal-steps">
          ${instructionsHtml}
        </ul>
        <button type="button" class="pwa-modal-btn" id="pwaModalGotIt">Got It</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const modal = document.getElementById('pwaInstallModal');
  const closeBtn = document.getElementById('pwaModalClose');
  const gotItBtn = document.getElementById('pwaModalGotIt');

  const closeModal = () => {
    if (modal) modal.remove();
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (gotItBtn) gotItBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
}

// Function to trigger PWA install
function triggerPwaInstall() {
  const banner = document.getElementById('pwaInstallBanner');
  if (deferredPrompt) {
    // Show native browser install prompt
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      console.log('User install choice:', choiceResult.outcome);
      if (choiceResult.outcome === 'accepted') {
        if (banner) banner.style.display = 'none';
      }
      deferredPrompt = null;
    });
  } else {
    // Show device-specific install guide modal
    showPwaInstallModal();
  }
}

// Handle Install button click and DOM readiness
document.addEventListener('DOMContentLoaded', () => {
  const btnInstall = document.getElementById('btnInstallPwa');
  const btnDismiss = document.getElementById('btnDismissPwa');
  const banner = document.getElementById('pwaInstallBanner');

  // Check standalone mode (already installed)
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

  if (banner) {
    if (!isStandalone && sessionStorage.getItem('pwa_banner_dismissed') !== 'true') {
      banner.style.display = 'block';
    } else {
      banner.style.display = 'none';
    }
  }

  if (btnInstall) {
    btnInstall.addEventListener('click', triggerPwaInstall);
  }

  // Bind any button with class .trigger-pwa-install or specific IDs
  document.querySelectorAll('.trigger-pwa-install, #navInstallBtn, #topbarInstallBtn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerPwaInstall();
    });
  });

  if (btnDismiss && banner) {
    btnDismiss.addEventListener('click', () => {
      banner.style.display = 'none';
      sessionStorage.setItem('pwa_banner_dismissed', 'true');
    });
  }

  // Initialize all page features
  initMobileNav();
  initEnquiryStorage();
  initHomePage();
  initCataloguePage();
  initProductDetailPage();
  initEnquiryListPage();
  initWholesaleForm();
  initFaqAccordion();
});

// ==========================================
// 1.5 HOME PAGE LOGIC (4 Featured Products)
// ==========================================
function initHomePage() {
  const grid = document.getElementById('featuredGrid');
  if (!grid || typeof products === 'undefined') return;

  // Select 4 popular featured items
  const featuredIds = [1, 2, 8, 13];
  const featuredItems = featuredIds.map(id => getProductById(id)).filter(Boolean);

  grid.innerHTML = featuredItems.map(item => `
    <div class="product-card">
      <a href="product.html?id=${item.id}" class="product-img-wrap">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
        <span class="card-category-tag">${capitalize(item.category)}</span>
      </a>
      <div class="product-card-body">
        <h3 class="product-card-title">
          <a href="product.html?id=${item.id}">${item.name}</a>
        </h3>
        <div class="product-card-price">${item.price}</div>
        <p class="product-card-moq"><strong>MOQ:</strong> ${item.moq}</p>
        <p class="product-card-fabric"><small>${item.fabric}</small></p>
        
        <div class="card-btn-row">
          <a href="product.html?id=${item.id}" class="btn btn-outline btn-sm">View Details</a>
          <button type="button" class="btn btn-primary btn-sm" onclick="addToEnquiryList(${item.id}, 100)">
            + Enquiry
          </button>
        </div>
      </div>
    </div>
  `).join('');
}


// ==========================================
// 2. MOBILE NAVIGATION TOGGLE
// ==========================================
function initMobileNav() {
  const hamburger = document.getElementById('hamburgerToggle');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
  }
}


// ==========================================
// 3. ENQUIRY LIST (LOCAL STORAGE MANAGER)
// ==========================================
const ENQUIRY_STORAGE_KEY = 'indkan_enquiry_list';

// Get current array of enquiry items from localStorage
function getEnquiryList() {
  try {
    const data = localStorage.getItem(ENQUIRY_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading enquiry list from localStorage:', e);
    return [];
  }
}

// Save enquiry items back to localStorage
function saveEnquiryList(list) {
  try {
    localStorage.setItem(ENQUIRY_STORAGE_KEY, JSON.stringify(list));
    updateEnquiryBadges();
  } catch (e) {
    console.error('Error saving enquiry list to localStorage:', e);
  }
}

// Add a product to the enquiry list
function addToEnquiryList(productId, qty = 100) {
  const product = typeof getProductById === 'function' ? getProductById(productId) : null;
  if (!product) {
    console.error('Product not found for ID:', productId);
    return;
  }

  const list = getEnquiryList();
  const existingIndex = list.findIndex(item => item.id == product.id);

  const cleanQty = parseInt(qty, 10) || 100;

  if (existingIndex > -1) {
    // If item already exists, increase requested quantity
    list[existingIndex].quantity += cleanQty;
  } else {
    // Add new product item
    list.push({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      moq: product.moq,
      fabric: product.fabric,
      sizes: product.sizes,
      image: product.image,
      quantity: cleanQty
    });
  }

  saveEnquiryList(list);
  showEnquiryToast(`"${product.name}" added to Enquiry List!`);
}

// Remove an item from the enquiry list
function removeFromEnquiryList(productId) {
  let list = getEnquiryList();
  list = list.filter(item => item.id != productId);
  saveEnquiryList(list);

  // If on enquiry.html, re-render the list immediately
  if (typeof renderEnquiryItems === 'function') {
    renderEnquiryItems();
  }
}

// Update quantity for a specific item
function updateEnquiryQty(productId, newQty) {
  const list = getEnquiryList();
  const item = list.find(i => i.id == productId);
  if (item) {
    item.quantity = Math.max(10, parseInt(newQty, 10) || 10);
    saveEnquiryList(list);
  }
}

// Clear all items in enquiry list
function clearEnquiryList() {
  saveEnquiryList([]);
  if (typeof renderEnquiryItems === 'function') {
    renderEnquiryItems();
  }
}

// Update all enquiry counter badges on page
function updateEnquiryBadges() {
  const list = getEnquiryList();
  const count = list.length;

  const navBadge = document.getElementById('navEnquiryBadge');
  const bottomBadge = document.getElementById('bottomEnquiryBadge');

  if (navBadge) {
    navBadge.textContent = count;
    navBadge.style.display = count > 0 ? 'inline-block' : 'none';
  }
  if (bottomBadge) {
    bottomBadge.textContent = count;
    bottomBadge.style.display = count > 0 ? 'flex' : 'none';
  }
}

// Show a temporary floating toast confirmation
function showEnquiryToast(message) {
  const toast = document.getElementById('enquiryToast');
  const msgEl = document.getElementById('toastMsg');
  if (!toast) return;

  if (msgEl) msgEl.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

function initEnquiryStorage() {
  updateEnquiryBadges();
}


// ==========================================
// 4. CATALOGUE PAGE LOGIC
// ==========================================
function initCataloguePage() {
  const grid = document.getElementById('catalogueGrid');
  if (!grid || typeof products === 'undefined') return;

  const searchInput = document.getElementById('catalogueSearch');
  const sortSelect = document.getElementById('catalogueSort');
  const filterBtns = document.querySelectorAll('.cat-filter-btn, .filter-btn');

  // Check URL param ?cat=...
  const urlParams = new URLSearchParams(window.location.search);
  let activeCategory = urlParams.get('cat') || urlParams.get('category') || 'all';

  // Highlight active button
  filterBtns.forEach(btn => {
    const btnCat = btn.getAttribute('data-cat') || btn.getAttribute('data-category') || 'all';
    if (btnCat.toLowerCase() === activeCategory.toLowerCase()) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }

    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-cat') || btn.getAttribute('data-category') || 'all';
      renderCatalogue();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => renderCatalogue());
  }
  if (sortSelect) {
    sortSelect.addEventListener('change', () => renderCatalogue());
  }

  function renderCatalogue() {
    let filtered = products.slice();

    // 1. Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
    }

    // 2. Filter by search query
    if (searchInput && searchInput.value.trim() !== '') {
      const q = searchInput.value.toLowerCase().trim();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.fabric.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // 3. Sort items
    if (sortSelect) {
      const sortVal = sortSelect.value;
      if (sortVal === 'price-low') {
        filtered.sort((a, b) => a.priceMin - b.priceMin);
      } else if (sortVal === 'price-high') {
        filtered.sort((a, b) => b.priceMin - a.priceMin);
      } else if (sortVal === 'moq-low') {
        filtered.sort((a, b) => parseInt(a.moq) - parseInt(b.moq));
      } else if (sortVal === 'name-asc') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      }
    }

    // Update count display
    const countEl = document.getElementById('catalogueCount');
    if (countEl) {
      countEl.textContent = `Showing ${filtered.length} export apparel items`;
    }

    // Render cards
    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; padding: 40px 20px;">
          <p>No products match your search. Try resetting the filters.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(item => `
      <div class="product-card">
        <a href="product.html?id=${item.id}" class="product-img-wrap">
          <img src="${item.image}" alt="${item.name}" loading="lazy" />
          <span class="card-category-tag">${capitalize(item.category)}</span>
        </a>
        <div class="product-card-body">
          <h3 class="product-card-title">
            <a href="product.html?id=${item.id}">${item.name}</a>
          </h3>
          <div class="product-card-price">${item.price}</div>
          <p class="product-card-moq"><strong>MOQ:</strong> ${item.moq}</p>
          <p class="product-card-fabric"><small>${item.fabric}</small></p>
          
          <div class="card-btn-row">
            <a href="product.html?id=${item.id}" class="btn btn-outline btn-sm">View Details</a>
            <button type="button" class="btn btn-primary btn-sm" onclick="addToEnquiryList(${item.id}, 100)">
              + Enquiry
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Initial render
  renderCatalogue();
}


// ==========================================
// 5. PRODUCT DETAIL PAGE LOGIC
// ==========================================
function initProductDetailPage() {
  const container = document.getElementById('productDetailContainer');
  if (!container || typeof products === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || '1';
  const product = getProductById(productId) || products[0];

  if (!product) return;

  // Set page title
  document.title = `${product.name} | INDKAN World Wide Exim Pvt. Ltd.`;

  // Populate elements
  const imgEl = document.getElementById('detailImg');
  const catEl = document.getElementById('detailCategory');
  const nameEl = document.getElementById('detailName');
  const priceEl = document.getElementById('detailPrice');
  const descEl = document.getElementById('detailDesc');
  const moqEl = document.getElementById('detailMoq');
  const fabricEl = document.getElementById('detailFabric');
  const sizesEl = document.getElementById('detailSizes');
  const bcCat = document.getElementById('breadcrumbCategory');
  const bcName = document.getElementById('breadcrumbName');
  const enquiryProductInput = document.getElementById('enquiryProductName');
  const qtyInput = document.getElementById('detailOrderQty');

  if (imgEl) {
    imgEl.src = product.image;
    imgEl.alt = product.name;
  }
  if (catEl) catEl.textContent = `${capitalize(product.category)}'s Apparel`;
  if (nameEl) nameEl.textContent = product.name;
  if (priceEl) priceEl.textContent = product.price;
  if (descEl) descEl.textContent = product.description;
  if (moqEl) moqEl.textContent = product.moq;
  if (fabricEl) fabricEl.textContent = product.fabric;
  if (sizesEl) sizesEl.textContent = product.sizes;
  if (bcCat) bcCat.textContent = capitalize(product.category);
  if (bcName) bcName.textContent = product.name;
  if (enquiryProductInput) {
    enquiryProductInput.value = `${product.name} (MOQ: ${product.moq})`;
  }

  // Set default quantity to MOQ number if possible
  const defaultMoqNum = parseInt(product.moq, 10) || 100;
  if (qtyInput) {
    qtyInput.value = defaultMoqNum;
    qtyInput.min = Math.max(10, Math.floor(defaultMoqNum / 2));
  }

  // Stepper handlers
  const btnMinus = document.getElementById('btnQtyMinus');
  const btnPlus = document.getElementById('btnQtyPlus');
  if (btnMinus && qtyInput) {
    btnMinus.addEventListener('click', () => {
      const cur = parseInt(qtyInput.value, 10) || defaultMoqNum;
      qtyInput.value = Math.max(10, cur - 25);
    });
  }
  if (btnPlus && qtyInput) {
    btnPlus.addEventListener('click', () => {
      const cur = parseInt(qtyInput.value, 10) || defaultMoqNum;
      qtyInput.value = cur + 25;
    });
  }

  // "Add to Enquiry List" button
  const btnAdd = document.getElementById('btnAddToEnquiryList');
  if (btnAdd) {
    btnAdd.addEventListener('click', () => {
      const qty = qtyInput ? parseInt(qtyInput.value, 10) || defaultMoqNum : defaultMoqNum;
      addToEnquiryList(product.id, qty);
    });
  }

  // Quick enquiry form submission
  const quickForm = document.getElementById('quickEnquiryForm');
  const quickAlert = document.getElementById('quickEnquiryAlert');
  if (quickForm && quickAlert) {
    quickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('qName')?.value.trim();
      const email = document.getElementById('qEmail')?.value.trim();
      const phone = document.getElementById('qPhone')?.value.trim();

      if (!name || !email || !phone) {
        quickAlert.className = 'form-alert error';
        quickAlert.textContent = 'Please fill in all required fields (Name, Email, Phone).';
        quickAlert.style.display = 'block';
        return;
      }

      quickAlert.className = 'form-alert success';
      quickAlert.innerHTML = `<strong>Enquiry Sent!</strong> Thank you ${name}. Our Kolkata export manager will email proforma pricing to <strong>${email}</strong> within 24 hours.`;
      quickAlert.style.display = 'block';
      quickForm.reset();
      if (enquiryProductInput) {
        enquiryProductInput.value = `${product.name} (MOQ: ${product.moq})`;
      }
    });
  }
}


// ==========================================
// 6. ENQUIRY LIST PAGE (enquiry.html)
// ==========================================
function initEnquiryListPage() {
  const container = document.getElementById('enquiryItemsContainer');
  if (!container) return;

  renderEnquiryItems();

  // Clear list button
  const btnClear = document.getElementById('btnClearEnquiryList');
  if (btnClear) {
    btnClear.addEventListener('click', () => {
      if (confirm('Are you sure you want to remove all garments from your enquiry list?')) {
        clearEnquiryList();
      }
    });
  }

  // Commercial enquiry form submission
  const form = document.getElementById('enquiryForm');
  if (form) {
    form.addEventListener('submit', handleEnquiryFormSubmit);
  }
}

// Render all items currently in the enquiry list
function renderEnquiryItems() {
  const container = document.getElementById('enquiryItemsContainer');
  const emptyState = document.getElementById('enquiryEmptyState');
  const layout = document.getElementById('enquiryLayout');
  const totalCountEl = document.getElementById('enquiryTotalItemsCount');
  const summaryTotalItems = document.getElementById('summaryTotalItems');
  const summaryTotalPieces = document.getElementById('summaryTotalPieces');

  if (!container) return;

  const list = getEnquiryList();

  if (list.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
    if (layout) layout.style.display = 'none';
    if (totalCountEl) totalCountEl.textContent = '0';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (layout) layout.style.display = 'grid';

  let totalPieces = 0;

  container.innerHTML = list.map(item => {
    totalPieces += item.quantity;
    return `
      <div class="enquiry-item-row" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="enquiry-item-thumb" />
        <div class="enquiry-item-details">
          <h4><a href="product.html?id=${item.id}">${item.name}</a></h4>
          <p class="item-meta">
            <span><strong>Category:</strong> ${capitalize(item.category)}</span> &bull; 
            <span><strong>Fabric:</strong> ${item.fabric}</span>
          </p>
          <p class="item-price">${item.price}</p>
          <p class="item-moq"><small>Standard Export MOQ: ${item.moq}</small></p>
        </div>
        <div class="enquiry-item-qty">
          <label><small>Pieces:</small></label>
          <input type="number" 
                 class="form-control qty-input" 
                 value="${item.quantity}" 
                 min="10" 
                 step="10" 
                 onchange="handleEnquiryQtyChange(${item.id}, this.value)" />
        </div>
        <div class="enquiry-item-remove">
          <button type="button" 
                  class="btn-icon-danger" 
                  onclick="removeFromEnquiryList(${item.id})" 
                  title="Remove item" 
                  aria-label="Remove item">&times;</button>
        </div>
      </div>
    `;
  }).join('');

  if (totalCountEl) totalCountEl.textContent = list.length;
  if (summaryTotalItems) summaryTotalItems.textContent = `${list.length} Designs`;
  if (summaryTotalPieces) summaryTotalPieces.textContent = `${totalPieces.toLocaleString('en-IN')} pcs`;
}

// Global handler for quantity input change
window.handleEnquiryQtyChange = function(productId, val) {
  updateEnquiryQty(productId, val);
  renderEnquiryItems();
};

// Handle commercial enquiry form submission
function handleEnquiryFormSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('contactName')?.value.trim();
  const company = document.getElementById('companyName')?.value.trim();
  const country = document.getElementById('country')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const phone = document.getElementById('phone')?.value.trim();

  let hasError = false;

  // Clear previous errors
  ['Name', 'Company', 'Country', 'Email', 'Phone'].forEach(f => {
    const err = document.getElementById(`err${f}`);
    if (err) err.textContent = '';
  });

  if (!name) {
    showInputError('errName', 'Please enter your full name.');
    hasError = true;
  }
  if (!company) {
    showInputError('errCompany', 'Please enter your business or company name.');
    hasError = true;
  }
  if (!country) {
    showInputError('errCountry', 'Please specify the destination country.');
    hasError = true;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showInputError('errEmail', 'Please enter a valid business email address.');
    hasError = true;
  }
  if (!phone || phone.length < 7) {
    showInputError('errPhone', 'Please enter a valid phone or WhatsApp number with country code.');
    hasError = true;
  }

  if (hasError) return;

  // Generate reference number
  const refCode = 'IND-EXIM-' + Math.floor(1000 + Math.random() * 9000);

  // Show success screen
  const successBox = document.getElementById('enquirySuccessBox');
  const activeSection = document.getElementById('enquiryActiveSection');
  const refText = document.getElementById('successRefText');

  if (refText) {
    refText.innerHTML = `Your official enquiry reference number is: <strong>${refCode}</strong>`;
  }
  if (activeSection) activeSection.style.display = 'none';
  if (successBox) successBox.style.display = 'block';

  // Clear list upon successful submission
  clearEnquiryList();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showInputError(elementId, msg) {
  const el = document.getElementById(elementId);
  if (el) el.textContent = msg;
}


// ==========================================
// 7. WHOLESALE & BULK ORDERS FORM
// ==========================================
function initWholesaleForm() {
  const form = document.getElementById('wholesaleForm');
  const alertBox = document.getElementById('wholesaleAlert');
  if (!form || !alertBox) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('wsName')?.value.trim();
    const company = document.getElementById('wsCompany')?.value.trim();
    const country = document.getElementById('wsCountry')?.value.trim();
    const email = document.getElementById('wsEmail')?.value.trim();
    const phone = document.getElementById('wsPhone')?.value.trim();
    const qty = document.getElementById('wsQty')?.value.trim();

    if (!name || !company || !country || !email || !phone || !qty) {
      alertBox.className = 'form-alert error';
      alertBox.textContent = 'Please fill out all required fields marked with an asterisk (*).';
      alertBox.style.display = 'block';
      alertBox.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const refId = 'WS-BULK-' + Math.floor(10000 + Math.random() * 90000);
    alertBox.className = 'form-alert success';
    alertBox.innerHTML = `
      <strong>Wholesale RFQ Submitted Successfully!</strong><br />
      Reference ID: <strong>${refId}</strong>.<br />
      Thank you, ${name} (${company}). Our export team in New Town, Kolkata has received your enquiry for ${qty} garments and will email your customized proforma sheet within 24 business hours.
    `;
    alertBox.style.display = 'block';
    form.reset();
    alertBox.scrollIntoView({ behavior: 'smooth' });
  });
}


// ==========================================
// 8. FAQ ACCORDION (export-info.html)
// ==========================================
function initFaqAccordion() {
  const accordions = document.querySelectorAll('.faq-accordion-header');
  accordions.forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      const isOpen = parent.classList.contains('open');

      // Close all other FAQs for clean look
      document.querySelectorAll('.faq-accordion-item').forEach(item => {
        item.classList.remove('open');
      });

      // Toggle clicked item
      if (!isOpen) {
        parent.classList.add('open');
      }
    });
  });
}


// ==========================================
// 9. HELPER UTILITY FUNCTIONS
// ==========================================
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
