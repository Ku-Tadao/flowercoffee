// ===== Product Data =====
const coffeeProducts = [
    {
        id: 'espresso',
        name: 'Espresso',
        description: 'Rich and bold, the purest coffee experience. A concentrated shot of finely ground coffee.',
        price: 3.50,
        emoji: '☕',
        category: 'coffee'
    },
    {
        id: 'americano',
        name: 'Americano',
        description: 'Espresso with hot water, smooth and satisfying. Perfect for those who enjoy a milder taste.',
        price: 4.00,
        emoji: '☕',
        category: 'coffee'
    },
    {
        id: 'cappuccino',
        name: 'Cappuccino',
        description: 'Espresso with steamed milk and velvety foam. A classic Italian favorite.',
        price: 4.50,
        emoji: '☕',
        category: 'coffee'
    },
    {
        id: 'latte',
        name: 'Latte',
        description: 'Creamy espresso with plenty of steamed milk. Smooth, comforting, and delicious.',
        price: 5.00,
        emoji: '☕',
        category: 'coffee'
    }
];

const flowerProducts = [
    {
        id: 'rose-blush',
        name: 'Rose Blush',
        description: 'Soft pink roses with delicate baby\'s breath. A romantic and timeless arrangement.',
        price: 35.00,
        emoji: '🌹',
        category: 'flowers',
        includes: ['6 Pink Roses', 'Baby\'s Breath', 'Eucalyptus Leaves']
    },
    {
        id: 'sunny-day',
        name: 'Sunny Day',
        description: 'Bright sunflowers and cheerful daisies. Brings warmth and happiness to any space.',
        price: 30.00,
        emoji: '🌻',
        category: 'flowers',
        includes: ['3 Sunflowers', 'White Daisies', 'Green Filler']
    },
    {
        id: 'lavender-dreams',
        name: 'Lavender Dreams',
        description: 'Fragrant lavender with white lilies. Elegant and calming, perfect for relaxation.',
        price: 40.00,
        emoji: '💜',
        category: 'flowers',
        includes: ['Lavender Stems', '2 White Lilies', 'Purple Statice']
    },
    {
        id: 'spring-garden',
        name: 'Spring Garden',
        description: 'Mixed seasonal blooms in pastel colors. A fresh celebration of nature\'s beauty.',
        price: 45.00,
        emoji: '💐',
        category: 'flowers',
        includes: ['Mixed Seasonal Flowers', 'Pastel Roses', 'Greenery']
    }
];

// ===== State =====
let cart = [];
let currentProduct = null;
let currentPage = document.body.dataset.page || 'home';

// ===== DOM Elements =====
const elements = {
    // Navigation & Cart
    cartBtn: document.getElementById('cartBtn'),
    cartCount: document.getElementById('cartCount'),
    cartSidebar: document.getElementById('cartSidebar'),
    cartOverlay: document.getElementById('cartOverlay'),
    closeCart: document.getElementById('closeCart'),
    cartItems: document.getElementById('cartItems'),
    cartTotal: document.getElementById('cartTotal'),
    cartFooter: document.getElementById('cartFooter'),
    checkoutBtn: document.getElementById('checkoutBtn'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    mobileMenu: document.getElementById('mobileMenu'),
    
    // Modals
    modalOverlay: document.getElementById('modalOverlay'),
    orderModal: document.getElementById('orderModal'),
    closeModal: document.getElementById('closeModal'),
    orderForm: document.getElementById('orderForm'),
    orderSummary: document.getElementById('orderSummary'),
    confirmationModal: document.getElementById('confirmationModal'),
    confirmationDetails: document.getElementById('confirmationDetails'),
    confirmationClose: document.getElementById('confirmationClose'),
    
    // Product Modal (for coffee/flowers pages)
    productModal: document.getElementById('productModal'),
    closeProductModal: document.getElementById('closeProductModal'),
    productModalImage: document.getElementById('productModalImage'),
    productModalName: document.getElementById('productModalName'),
    productModalDescription: document.getElementById('productModalDescription'),
    productModalPrice: document.getElementById('productModalPrice'),
    selectedProductId: document.getElementById('selectedProductId'),
    orderTotal: document.getElementById('orderTotal'),
    
    // Page specific
    pickupDate: document.getElementById('pickupDate'),
    pickupTime: document.getElementById('pickupTime'),
    pickupHint: document.getElementById('pickupHint'),
    earliestPickup: document.getElementById('earliestPickup'),
    coffeeMenu: document.getElementById('coffeeMenu'),
    flowerMenu: document.getElementById('flowerMenu'),
    bouquetIncludes: document.getElementById('bouquetIncludes'),
    
    // Forms
    coffeeOrderForm: document.getElementById('coffeeOrderForm'),
    flowerOrderForm: document.getElementById('flowerOrderForm'),
    contactForm: document.getElementById('contactForm')
};

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromStorage();
    setupEventListeners();
    initializePage();
});

function initializePage() {
    updateCartCount();
    renderCart();
    
    if (currentPage === 'home') {
        setRandomHeroVideo();
    }
    
    switch (currentPage) {
        case 'coffee':
            renderCoffeeMenu();
            updateEarliestPickup('coffee');
            break;
        case 'flowers':
            renderFlowerMenu();
            updateEarliestPickup('flowers');
            break;
        case 'contact':
            setupContactForm();
            break;
    }
}

// ===== Hero Video Function =====
function setRandomHeroVideo() {
    const videos = [
        'landing-page-video-1.webp',
        'landing-page-video-2.webp',
        'landing-page-video-3.webp',
        'landing-page-video-4.webp',
        'landing-page-video-5.webp',
        'landing-page-video-6.webp'
    ];
    
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    const heroVideo = document.querySelector('.hero-video');
    
    if (heroVideo) {
        heroVideo.style.backgroundImage = `url('assets/${randomVideo}')`;
    }
}

// ===== Render Functions =====
function renderCoffeeMenu() {
    if (!elements.coffeeMenu) return;
    
    elements.coffeeMenu.innerHTML = coffeeProducts.map(product => `
        <div class="menu-card" data-product-id="${product.id}" onclick="openProductModal('${product.id}')">
            <div class="menu-card-image"><img src="assets/${product.id}.jpg" alt="${product.name}"></div>
            <div class="menu-card-content">
                <h3 class="menu-card-name">${product.name}</h3>
                <p class="menu-card-description">${product.description}</p>
                <div class="menu-card-footer">
                    <span class="menu-card-price">$${product.price.toFixed(2)}</span>
                    <span class="menu-card-btn">Customize</span>
                </div>
            </div>
        </div>
    `).join('');
}

function renderFlowerMenu() {
    if (!elements.flowerMenu) return;
    
    elements.flowerMenu.innerHTML = flowerProducts.map(product => `
        <div class="menu-card" data-product-id="${product.id}" onclick="openProductModal('${product.id}')">
            <div class="menu-card-image"><img src="assets/${product.id}.jpg" alt="${product.name}"></div>
            <div class="menu-card-content">
                <h3 class="menu-card-name">${product.name}</h3>
                <p class="menu-card-description">${product.description}</p>
                <div class="menu-card-footer">
                    <span class="menu-card-price">$${product.price.toFixed(2)}</span>
                    <span class="menu-card-btn">Select</span>
                </div>
            </div>
        </div>
    `).join('');
}

function renderCart() {
    if (!elements.cartItems) return;
    
    if (cart.length === 0) {
        elements.cartItems.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">🛒</div>
                <p>Your cart is empty</p>
            </div>
        `;
        if (elements.cartFooter) elements.cartFooter.style.display = 'none';
        return;
    }
    
    if (elements.cartFooter) elements.cartFooter.style.display = 'block';
    
    elements.cartItems.innerHTML = cart.map(item => {
        const product = getProductById(item.productId);
        const sizeLabel = item.size ? ` (${capitalizeFirst(item.size)})` : '';
        const itemTotal = calculateItemPrice(item);
        
        return `
            <div class="cart-item" data-item-id="${item.id}">
                <div class="cart-item-image">
                    <img src="assets/${product.id}.jpg" alt="${product.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${product.name}${sizeLabel}</div>
                    ${item.notes ? `<div class="cart-item-notes">${item.notes}</div>` : ''}
                    <div class="cart-item-price">$${itemTotal.toFixed(2)}</div>
                    <div class="cart-item-actions">
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">−</button>
                        <span class="cart-item-quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                        <button class="remove-item-btn" onclick="removeFromCart('${item.id}')" aria-label="Remove item">🗑</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    updateCartTotal();
}

function updateCartCount() {
    if (!elements.cartCount) return;
    
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    elements.cartCount.textContent = count;
    elements.cartCount.style.display = count > 0 ? 'flex' : 'none';
}

function updateCartTotal() {
    if (!elements.cartTotal) return;
    
    const total = cart.reduce((sum, item) => sum + calculateItemPrice(item), 0);
    elements.cartTotal.textContent = `$${total.toFixed(2)}`;
}

function calculateItemPrice(item) {
    const product = getProductById(item.productId);
    let price = product.price;
    
    // Add size modifier for coffee
    if (item.size) {
        const sizeModifiers = { small: 0, medium: 0.50, large: 1.00 };
        price += sizeModifiers[item.size] || 0;
    }
    
    return price * item.quantity;
}

// ===== Product Modal Functions =====
function openProductModal(productId) {
    currentProduct = getProductById(productId);
    if (!currentProduct || !elements.productModal) return;
    
    elements.productModalImage.innerHTML = `<img src="assets/${currentProduct.id}.jpg" alt="${currentProduct.name}">`;
    elements.productModalName.textContent = currentProduct.name;
    elements.productModalDescription.textContent = currentProduct.description;
    elements.productModalPrice.textContent = `$${currentProduct.price.toFixed(2)}`;
    elements.selectedProductId.value = productId;
    
    // Show bouquet includes for flowers
    if (currentProduct.category === 'flowers' && elements.bouquetIncludes) {
        elements.bouquetIncludes.innerHTML = `
            <p><strong>Includes:</strong></p>
            <p>${currentProduct.includes.join(', ')}</p>
        `;
    }
    
    // Update order total
    updateOrderTotal();
    
    // Show modal
    elements.modalOverlay.classList.add('active');
    elements.productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    if (!elements.productModal) return;
    
    elements.modalOverlay.classList.remove('active');
    elements.productModal.classList.remove('active');
    document.body.style.overflow = '';
    currentProduct = null;
    
    // Reset forms
    if (elements.coffeeOrderForm) elements.coffeeOrderForm.reset();
    if (elements.flowerOrderForm) elements.flowerOrderForm.reset();
    
    // Reset quick notes
    document.querySelectorAll('.quick-note-btn').forEach(btn => btn.classList.remove('active'));
}

function updateOrderTotal() {
    if (!currentProduct || !elements.orderTotal) return;
    
    let total = currentProduct.price;
    
    // Add size modifier for coffee
    if (currentPage === 'coffee') {
        const selectedSize = document.querySelector('input[name="size"]:checked');
        if (selectedSize) {
            total += parseFloat(selectedSize.dataset.priceModifier) || 0;
        }
    }
    
    elements.orderTotal.textContent = `$${total.toFixed(2)}`;
}

// ===== Cart Functions =====
function addToCart(productId, options = {}) {
    const product = getProductById(productId);
    if (!product) return;
    
    const cartItem = {
        id: generateId(),
        productId: productId,
        quantity: 1,
        size: options.size || null,
        notes: options.notes || '',
        giftMessage: options.giftMessage || ''
    };
    
    cart.push(cartItem);
    updateCartCount();
    renderCart();
    saveCartToStorage();
    showToast(`${product.name} added to cart`);
}

function updateQuantity(itemId, change) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            renderCart();
            updateCartCount();
            saveCartToStorage();
        }
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    renderCart();
    updateCartCount();
    saveCartToStorage();
}

function clearCart() {
    cart = [];
    renderCart();
    updateCartCount();
    saveCartToStorage();
}

// ===== Storage Functions =====
function saveCartToStorage() {
    localStorage.setItem('flowercoffee-cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('flowercoffee-cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
        } catch (e) {
            cart = [];
        }
    }
}

// ===== Helper Functions =====
function getProductById(id) {
    return [...coffeeProducts, ...flowerProducts].find(p => p.id === id);
}

function hasFlowersInCart() {
    return cart.some(item => {
        const product = getProductById(item.productId);
        return product && product.category === 'flowers';
    });
}

function hasCoffeeOnlyInCart() {
    return cart.length > 0 && cart.every(item => {
        const product = getProductById(item.productId);
        return product && product.category === 'coffee';
    });
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ===== Date/Time Functions =====
function updateEarliestPickup(type) {
    if (!elements.earliestPickup) return;
    
    const today = new Date();
    let earliestDate;
    
    if (type === 'flowers') {
        // Flowers require at least 1 day advance
        earliestDate = new Date(today);
        earliestDate.setDate(earliestDate.getDate() + 1);
    } else {
        // Coffee can be same day
        earliestDate = today;
    }
    
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    const timeStr = type === 'flowers' ? 'from 7:00 AM' : getNextAvailableTime();
    
    elements.earliestPickup.textContent = `${earliestDate.toLocaleDateString('en-US', options)} ${timeStr}`;
}

function getNextAvailableTime() {
    const now = new Date();
    const currentHour = now.getHours();
    const dayOfWeek = now.getDay();
    
    // Shop hours
    const startHour = (dayOfWeek === 0 || dayOfWeek === 6) ? 8 : 7;
    const endHour = (dayOfWeek === 0 || dayOfWeek === 6) ? 18 : 19;
    
    let nextHour = currentHour + 1;
    
    if (nextHour < startHour) nextHour = startHour;
    if (nextHour >= endHour) return 'Tomorrow';
    
    return `at ${formatTime12Hour(nextHour, 0)}`;
}

function setupPickupDateTime() {
    if (!elements.pickupDate || !elements.pickupTime) return;
    
    const today = new Date();
    const hasFlowers = hasFlowersInCart();
    
    // Set minimum date based on cart contents
    let minDate;
    if (hasFlowers) {
        minDate = new Date(today);
        minDate.setDate(minDate.getDate() + 1);
        if (elements.pickupHint) {
            elements.pickupHint.textContent = '💐 Flower orders require at least 1 day advance notice.';
        }
    } else {
        minDate = today;
        if (elements.pickupHint) {
            elements.pickupHint.textContent = '☕ Same-day pickup available for coffee orders.';
        }
    }
    
    // Format date for input
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    elements.pickupDate.min = formatDate(minDate);
    elements.pickupDate.value = formatDate(minDate);
    
    // Set max date (2 weeks from now)
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 14);
    elements.pickupDate.max = formatDate(maxDate);
    
    // Update available times
    updateAvailableTimes();
}

function updateAvailableTimes() {
    if (!elements.pickupDate || !elements.pickupTime) return;
    
    const selectedDate = new Date(elements.pickupDate.value);
    const today = new Date();
    const isToday = selectedDate.toDateString() === today.toDateString();
    const dayOfWeek = selectedDate.getDay();
    
    // Shop hours: Mon-Fri 7am-7pm, Sat-Sun 8am-6pm
    let startHour, endHour;
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        startHour = 8;
        endHour = 18;
    } else {
        startHour = 7;
        endHour = 19;
    }
    
    // If today, start from current hour + 1
    if (isToday) {
        const currentHour = today.getHours();
        startHour = Math.max(startHour, currentHour + 1);
    }
    
    // Generate time slots
    elements.pickupTime.innerHTML = '<option value="">Select time</option>';
    
    if (startHour >= endHour) {
        elements.pickupTime.innerHTML = '<option value="">No times available</option>';
        return;
    }
    
    for (let hour = startHour; hour < endHour; hour++) {
        const time24 = `${String(hour).padStart(2, '0')}:00`;
        const time12 = formatTime12Hour(hour, 0);
        elements.pickupTime.innerHTML += `<option value="${time24}">${time12}</option>`;
        
        // Add 30-minute slot
        if (hour < endHour - 1) {
            const time24Half = `${String(hour).padStart(2, '0')}:30`;
            const time12Half = formatTime12Hour(hour, 30);
            elements.pickupTime.innerHTML += `<option value="${time24Half}">${time12Half}</option>`;
        }
    }
}

function formatTime12Hour(hour, minutes) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    const minuteStr = String(minutes).padStart(2, '0');
    return `${hour12}:${minuteStr} ${period}`;
}

function formatTime12HourFromString(time24) {
    const [hour, minutes] = time24.split(':').map(Number);
    return formatTime12Hour(hour, minutes);
}

// ===== Modal Functions =====
function openCart() {
    if (!elements.cartSidebar) return;
    
    elements.cartSidebar.classList.add('active');
    elements.cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCartSidebar() {
    if (!elements.cartSidebar) return;
    
    elements.cartSidebar.classList.remove('active');
    elements.cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function openOrderModal() {
    closeCartSidebar();
    
    if (!elements.orderModal) return;
    
    // Render order summary
    renderOrderSummary();
    
    // Setup pickup date/time
    setupPickupDateTime();
    
    // Show modal
    elements.modalOverlay.classList.add('active');
    elements.orderModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
    if (!elements.orderModal) return;
    
    elements.modalOverlay.classList.remove('active');
    elements.orderModal.classList.remove('active');
    document.body.style.overflow = '';
}

function renderOrderSummary() {
    if (!elements.orderSummary) return;
    
    const items = cart.map(item => {
        const product = getProductById(item.productId);
        const sizeLabel = item.size ? ` (${capitalizeFirst(item.size)})` : '';
        const itemTotal = calculateItemPrice(item);
        
        return `
            <div class="order-summary-item">
                <span>${product.name}${sizeLabel} × ${item.quantity}</span>
                <span>$${itemTotal.toFixed(2)}</span>
            </div>
        `;
    }).join('');
    
    const total = cart.reduce((sum, item) => sum + calculateItemPrice(item), 0);
    
    elements.orderSummary.innerHTML = `
        ${items}
        <div class="order-summary-total">
            <span>Total</span>
            <span>$${total.toFixed(2)}</span>
        </div>
    `;
}

function showConfirmation(orderData) {
    closeOrderModal();
    
    if (!elements.confirmationModal) return;
    
    const date = new Date(orderData.pickupDate);
    const formattedDate = date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
    });
    
    const total = cart.reduce((sum, item) => sum + calculateItemPrice(item), 0);
    
    elements.confirmationDetails.innerHTML = `
        <p><strong>Name:</strong> ${orderData.name}</p>
        <p><strong>Phone:</strong> ${orderData.phone}</p>
        <p><strong>Pickup:</strong> ${formattedDate} at ${formatTime12HourFromString(orderData.pickupTime)}</p>
        <p><strong>Total:</strong> $${total.toFixed(2)}</p>
        ${orderData.notes ? `<p><strong>Notes:</strong> ${orderData.notes}</p>` : ''}
    `;
    
    elements.confirmationModal.classList.add('active');
    elements.modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeConfirmationModal() {
    if (!elements.confirmationModal) return;
    
    elements.confirmationModal.classList.remove('active');
    elements.modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    clearCart();
}

// ===== Contact Form =====
function setupContactForm() {
    if (!elements.contactForm) return;
    
    elements.contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // In a real app, this would submit to a backend
        showToast('Message sent! We\'ll get back to you soon.');
        elements.contactForm.reset();
    });
}

// ===== Toast Notification =====
function showToast(message) {
    const container = document.getElementById('toastContainer') || document.body;
    
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Hide toast after 2.5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// ===== Event Listeners =====
function setupEventListeners() {
    // Cart sidebar
    if (elements.cartBtn) {
        elements.cartBtn.addEventListener('click', openCart);
    }
    if (elements.closeCart) {
        elements.closeCart.addEventListener('click', closeCartSidebar);
    }
    if (elements.cartOverlay) {
        elements.cartOverlay.addEventListener('click', closeCartSidebar);
    }
    
    // Checkout
    if (elements.checkoutBtn) {
        elements.checkoutBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                openOrderModal();
            }
        });
    }
    
    // Order modal
    if (elements.closeModal) {
        elements.closeModal.addEventListener('click', closeOrderModal);
    }
    
    // Product modal
    if (elements.closeProductModal) {
        elements.closeProductModal.addEventListener('click', closeProductModal);
    }
    
    // Modal overlay clicks
    if (elements.modalOverlay) {
        elements.modalOverlay.addEventListener('click', (e) => {
            if (e.target === elements.modalOverlay) {
                closeProductModal();
                closeOrderModal();
                closeConfirmationModal();
            }
        });
    }
    
    // Pickup date change
    if (elements.pickupDate) {
        elements.pickupDate.addEventListener('change', updateAvailableTimes);
    }
    
    // Coffee order form
    if (elements.coffeeOrderForm) {
        // Size selection changes
        elements.coffeeOrderForm.querySelectorAll('input[name="size"]').forEach(input => {
            input.addEventListener('change', updateOrderTotal);
        });
        
        // Quick note buttons
        elements.coffeeOrderForm.querySelectorAll('.quick-note-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
                const notesField = document.getElementById('coffeeNotes');
                const note = btn.dataset.note;
                
                if (btn.classList.contains('active')) {
                    notesField.value = notesField.value ? `${notesField.value}, ${note}` : note;
                } else {
                    notesField.value = notesField.value.replace(note, '').replace(/^, |, $|, ,/g, '').trim();
                }
            });
        });
        
        // Form submission
        elements.coffeeOrderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const productId = elements.selectedProductId.value;
            const size = document.querySelector('input[name="size"]:checked')?.value || 'medium';
            const notes = document.getElementById('coffeeNotes')?.value || '';
            
            addToCart(productId, { size, notes });
            closeProductModal();
        });
    }
    
    // Flower order form
    if (elements.flowerOrderForm) {
        elements.flowerOrderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const productId = elements.selectedProductId.value;
            const notes = document.getElementById('flowerNotes')?.value || '';
            const giftMessage = document.getElementById('giftMessage')?.value || '';
            
            addToCart(productId, { notes, giftMessage });
            closeProductModal();
        });
    }
    
    // Main order form submission
    if (elements.orderForm) {
        elements.orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('customerName').value,
                phone: document.getElementById('customerPhone').value,
                email: document.getElementById('customerEmail')?.value || '',
                pickupDate: elements.pickupDate.value,
                pickupTime: elements.pickupTime.value,
                notes: document.getElementById('specialNotes')?.value || ''
            };
            
            // In a real app, this would submit to a backend
            console.log('Order submitted:', formData, cart);
            
            showConfirmation(formData);
            elements.orderForm.reset();
        });
    }
    
    // Confirmation modal
    if (elements.confirmationClose) {
        elements.confirmationClose.addEventListener('click', closeConfirmationModal);
    }
    
    // Mobile menu
    if (elements.mobileMenuBtn && elements.mobileMenu) {
        elements.mobileMenuBtn.addEventListener('click', () => {
            elements.mobileMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.mobile-nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                elements.mobileMenu.classList.remove('active');
            });
        });
    }
    
    // Keyboard accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCartSidebar();
            closeProductModal();
            closeOrderModal();
            closeConfirmationModal();
            if (elements.mobileMenu) {
                elements.mobileMenu.classList.remove('active');
            }
        }
    });
}
