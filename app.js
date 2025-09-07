// Menu data
const menuData = {
  drinks: [
    {id: 1, name: "Cappuccino", price: 120, description: "Rich espresso with steamed milk and foam", image: "☕"},
    {id: 2, name: "Green Tea", price: 80, description: "Fresh organic green tea leaves", image: "🍵"},
    {id: 3, name: "Mango Smoothie", price: 150, description: "Fresh mango blended with yogurt", image: "🥭"},
    {id: 4, name: "Fresh Orange Juice", price: 100, description: "Freshly squeezed orange juice", image: "🍊"},
    {id: 5, name: "Iced Coffee", price: 130, description: "Cold brew coffee with ice and milk", image: "🧊"},
    {id: 6, name: "Hot Chocolate", price: 140, description: "Rich chocolate drink with whipped cream", image: "🍫"},
    {id: 7, name: "Lemonade", price: 90, description: "Fresh lemon with mint and soda", image: "🍋"},
    {id: 8, name: "Masala Chai", price: 60, description: "Traditional Indian spiced tea", image: "☕"}
  ],
  desserts: [
    {id: 9, name: "Chocolate Cake", price: 180, description: "Moist chocolate cake with ganache", image: "🍰"},
    {id: 10, name: "Cheesecake", price: 200, description: "Creamy New York style cheesecake", image: "🍰"},
    {id: 11, name: "Vanilla Ice Cream", price: 120, description: "Premium vanilla ice cream (2 scoops)", image: "🍨"},
    {id: 12, name: "Apple Pie", price: 160, description: "Homemade apple pie with cinnamon", image: "🥧"},
    {id: 13, name: "Brownie", price: 140, description: "Fudgy chocolate brownie with nuts", image: "🍫"},
    {id: 14, name: "Tiramisu", price: 220, description: "Classic Italian coffee-flavored dessert", image: "🍰"}
  ],
  sandwiches: [
    {id: 15, name: "Club Sandwich", price: 180, description: "Triple layer with chicken, bacon, lettuce", image: "🥪"},
    {id: 16, name: "Grilled Cheese", price: 120, description: "Melted cheese on toasted bread", image: "🥪"},
    {id: 17, name: "BLT Sandwich", price: 160, description: "Bacon, lettuce, tomato on sourdough", image: "🥪"},
    {id: 18, name: "Veggie Delight", price: 140, description: "Fresh vegetables with hummus spread", image: "🥪"},
    {id: 19, name: "Chicken Caesar", price: 200, description: "Grilled chicken with caesar dressing", image: "🥪"},
    {id: 20, name: "Tuna Melt", price: 170, description: "Tuna salad with melted cheese", image: "🥪"}
  ],
  pizza: [
    {id: 21, name: "Margherita Pizza", price: 250, description: "Tomato sauce, mozzarella, fresh basil", image: "🍕"},
    {id: 22, name: "Pepperoni Pizza", price: 300, description: "Pepperoni slices with mozzarella cheese", image: "🍕"},
    {id: 23, name: "Veggie Supreme", price: 280, description: "Mixed vegetables with cheese", image: "🍕"},
    {id: 24, name: "BBQ Chicken", price: 350, description: "BBQ chicken with onions and peppers", image: "🍕"},
    {id: 25, name: "Four Cheese", price: 320, description: "Mozzarella, cheddar, parmesan, goat cheese", image: "🍕"},
    {id: 26, name: "Hawaiian Pizza", price: 290, description: "Ham and pineapple with cheese", image: "🍕"}
  ],
  burgers: [
    {id: 27, name: "Classic Burger", price: 220, description: "Beef patty with lettuce, tomato, onion", image: "🍔"},
    {id: 28, name: "Cheese Burger", price: 250, description: "Beef patty with cheese and pickles", image: "🍔"},
    {id: 29, name: "Chicken Burger", price: 200, description: "Grilled chicken breast with mayo", image: "🍔"},
    {id: 30, name: "Veggie Burger", price: 180, description: "Plant-based patty with avocado", image: "🍔"},
    {id: 31, name: "BBQ Bacon Burger", price: 300, description: "Beef patty with bacon and BBQ sauce", image: "🍔"},
    {id: 32, name: "Fish Burger", price: 240, description: "Crispy fish fillet with tartar sauce", image: "🍔"}
  ]
};

// Application state
let cart = [];
let quantities = {};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  renderMenuItems();
  setupEventListeners();
  updateCartDisplay();
}

// Setup all event listeners
function setupEventListeners() {
  // Get DOM elements
  const cartIcon = document.getElementById('cartIcon');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartOverlay = document.getElementById('cartOverlay');
  const closeCart = document.getElementById('closeCart');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const checkoutModal = document.getElementById('checkoutModal');
  const closeCheckout = document.getElementById('closeCheckout');
  const checkoutForm = document.getElementById('checkoutForm');
  const confirmationModal = document.getElementById('confirmationModal');
  const newOrderBtn = document.getElementById('newOrderBtn');

  // Cart functionality
  if (cartIcon) {
    cartIcon.addEventListener('click', function(e) {
      e.preventDefault();
      toggleCart();
    });
  }
  
  if (closeCart) {
    closeCart.addEventListener('click', function(e) {
      e.preventDefault();
      toggleCart();
    });
  }
  
  if (cartOverlay) {
    cartOverlay.addEventListener('click', function(e) {
      e.preventDefault();
      toggleCart();
    });
  }
  
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openCheckout();
    });
  }
  
  // Modal functionality
  if (closeCheckout) {
    closeCheckout.addEventListener('click', function(e) {
      e.preventDefault();
      closeCheckoutModal();
    });
  }
  
  if (newOrderBtn) {
    newOrderBtn.addEventListener('click', function(e) {
      e.preventDefault();
      resetApp();
    });
  }
  
  // Form submission
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handleCheckout);
  }
  
  // Navigation smooth scrolling - Fix the navigation
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const navbarHeight = 120; // Account for fixed navbar
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
          window.scrollTo({ 
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Close modals when clicking outside
  if (checkoutModal) {
    checkoutModal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeCheckoutModal();
      }
    });
  }
  
  if (confirmationModal) {
    confirmationModal.addEventListener('click', function(e) {
      if (e.target === this) {
        resetApp();
      }
    });
  }

  // Handle escape key to close modals
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (checkoutModal && !checkoutModal.classList.contains('hidden')) {
        closeCheckoutModal();
      } else if (cartSidebar && cartSidebar.classList.contains('open')) {
        toggleCart();
      } else if (confirmationModal && !confirmationModal.classList.contains('hidden')) {
        resetApp();
      }
    }
  });
}

// Render menu items
function renderMenuItems() {
  Object.keys(menuData).forEach(category => {
    const grid = document.getElementById(`${category}Grid`);
    if (grid) {
      grid.innerHTML = menuData[category].map(item => createMenuItemHTML(item)).join('');
    }
  });
  
  // Add event listeners to quantity controls and add to cart buttons after rendering
  setTimeout(() => {
    addMenuItemEventListeners();
  }, 100);
}

// Add event listeners to menu items
function addMenuItemEventListeners() {
  const quantityBtns = document.querySelectorAll('.quantity-btn');
  quantityBtns.forEach(btn => {
    btn.addEventListener('click', handleQuantityChange);
  });
  
  const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', handleAddToCart);
  });
}

// Create menu item HTML
function createMenuItemHTML(item) {
  const quantity = quantities[item.id] || 0;
  
  return `
    <div class="menu-item" data-id="${item.id}">
      <div class="item-header">
        <div class="item-image">${item.image}</div>
        <div class="item-info">
          <h3 class="item-name">${item.name}</h3>
          <p class="item-price">₹${item.price}</p>
        </div>
      </div>
      <p class="item-description">${item.description}</p>
      <div class="item-controls">
        <div class="quantity-controls">
          <button class="quantity-btn" data-id="${item.id}" data-action="decrease" ${quantity <= 0 ? 'disabled' : ''}>−</button>
          <span class="quantity-display" data-id="${item.id}">${quantity}</span>
          <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
        </div>
        <button class="add-to-cart-btn" data-id="${item.id}" ${quantity <= 0 ? 'disabled' : ''}>
          Add to Cart
        </button>
      </div>
    </div>
  `;
}

// Handle quantity changes
function handleQuantityChange(e) {
  e.preventDefault();
  const itemId = parseInt(e.target.dataset.id);
  const action = e.target.dataset.action;
  
  if (!quantities[itemId]) quantities[itemId] = 0;
  
  if (action === 'increase') {
    quantities[itemId]++;
  } else if (action === 'decrease' && quantities[itemId] > 0) {
    quantities[itemId]--;
  }
  
  updateQuantityDisplay(itemId);
  updateAddToCartButton(itemId);
}

// Update quantity display
function updateQuantityDisplay(itemId) {
  const quantityDisplay = document.querySelector(`[data-id="${itemId}"].quantity-display`);
  const decreaseBtn = document.querySelector(`[data-id="${itemId}"][data-action="decrease"]`);
  const addToCartBtn = document.querySelector(`[data-id="${itemId}"].add-to-cart-btn`);
  
  if (quantityDisplay) {
    quantityDisplay.textContent = quantities[itemId] || 0;
  }
  
  if (decreaseBtn) {
    decreaseBtn.disabled = (quantities[itemId] || 0) <= 0;
  }
  
  if (addToCartBtn) {
    addToCartBtn.disabled = (quantities[itemId] || 0) <= 0;
  }
}

// Update add to cart button
function updateAddToCartButton(itemId) {
  const addToCartBtn = document.querySelector(`[data-id="${itemId}"].add-to-cart-btn`);
  if (addToCartBtn) {
    addToCartBtn.disabled = (quantities[itemId] || 0) <= 0;
  }
}

// Handle add to cart
function handleAddToCart(e) {
  e.preventDefault();
  const itemId = parseInt(e.target.dataset.id);
  const quantity = quantities[itemId] || 0;
  
  if (quantity <= 0) return;
  
  const item = findItemById(itemId);
  if (!item) return;
  
  const existingItem = cart.find(cartItem => cartItem.id === itemId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      ...item,
      quantity: quantity
    });
  }
  
  // Reset quantity for this item
  quantities[itemId] = 0;
  updateQuantityDisplay(itemId);
  
  updateCartDisplay();
  
  // Show success feedback
  showToast(`${item.name} added to cart!`);
}

// Find item by ID
function findItemById(id) {
  for (const category of Object.values(menuData)) {
    const item = category.find(item => item.id === id);
    if (item) return item;
  }
  return null;
}

// Toggle cart sidebar
function toggleCart() {
  const cartSidebar = document.getElementById('cartSidebar');
  const cartOverlay = document.getElementById('cartOverlay');
  
  if (cartSidebar && cartOverlay) {
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('active');
    document.body.style.overflow = cartSidebar.classList.contains('open') ? 'hidden' : 'auto';
  }
}

// Update cart display
function updateCartDisplay() {
  updateCartCount();
  renderCartItems();
  updateCartTotal();
}

// Update cart count
function updateCartCount() {
  const cartCount = document.getElementById('cartCount');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCount) {
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'block' : 'none';
  }
}

// Render cart items
function renderCartItems() {
  const cartItems = document.getElementById('cartItems');
  const checkoutBtn = document.getElementById('checkoutBtn');
  
  if (!cartItems) return;
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="empty-cart">🛒<br>Your cart is empty</div>';
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }
  
  if (checkoutBtn) checkoutBtn.disabled = false;
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p class="cart-item-price">₹${item.price} × ${item.quantity}</p>
      </div>
      <div class="cart-item-controls">
        <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, -1)">−</button>
        <span>${item.quantity}</span>
        <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
        <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
      </div>
    </div>
  `).join('');
}

// Update cart quantity - Global function for onclick handlers
window.updateCartQuantity = function(itemId, change) {
  const item = cart.find(cartItem => cartItem.id === itemId);
  if (!item) return;
  
  item.quantity += change;
  
  if (item.quantity <= 0) {
    removeFromCart(itemId);
  } else {
    updateCartDisplay();
  }
};

// Remove from cart - Global function for onclick handlers
window.removeFromCart = function(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  updateCartDisplay();
};

// Update cart total
function updateCartTotal() {
  const totalAmount = document.getElementById('totalAmount');
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (totalAmount) {
    totalAmount.textContent = total;
  }
}

// Open checkout modal
function openCheckout() {
  if (cart.length === 0) return;
  
  renderOrderSummary();
  const checkoutModal = document.getElementById('checkoutModal');
  if (checkoutModal) {
    checkoutModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

// Close checkout modal
function closeCheckoutModal() {
  const checkoutModal = document.getElementById('checkoutModal');
  if (checkoutModal) {
    checkoutModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

// Render order summary
function renderOrderSummary() {
  const orderSummary = document.getElementById('orderSummary');
  const finalTotal = document.getElementById('finalTotal');
  
  if (!orderSummary || !finalTotal) return;
  
  const summary = cart.map(item => `
    <div class="summary-item">
      <span>${item.name} × ${item.quantity}</span>
      <span>₹${item.price * item.quantity}</span>
    </div>
  `).join('');
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  orderSummary.innerHTML = summary;
  finalTotal.textContent = total;
}

// Handle checkout form submission
function handleCheckout(e) {
  e.preventDefault();
  
  const customerName = document.getElementById('customerName').value.trim();
  const customerPhone = document.getElementById('customerPhone').value.trim();
  const tableNumber = document.getElementById('tableNumber').value.trim();
  
  // Basic validation
  if (!customerName || !customerPhone || !tableNumber) {
    showToast('Please fill in all required fields', 'error');
    return;
  }
  
  if (!/^\d{10}$/.test(customerPhone.replace(/\D/g, ''))) {
    showToast('Please enter a valid 10-digit phone number', 'error');
    return;
  }
  
  // Generate order ID
  const orderID = generateOrderID();
  
  // Show confirmation
  const orderIDElement = document.getElementById('orderID');
  const confirmTableNumberElement = document.getElementById('confirmTableNumber');
  
  if (orderIDElement) orderIDElement.textContent = orderID;
  if (confirmTableNumberElement) confirmTableNumberElement.textContent = tableNumber;
  
  closeCheckoutModal();
  
  const confirmationModal = document.getElementById('confirmationModal');
  if (confirmationModal) {
    confirmationModal.classList.remove('hidden');
  }
  
  // Clear cart
  cart = [];
  quantities = {};
  updateCartDisplay();
  
  // Close cart sidebar
  const cartSidebar = document.getElementById('cartSidebar');
  const cartOverlay = document.getElementById('cartOverlay');
  if (cartSidebar) cartSidebar.classList.remove('open');
  if (cartOverlay) cartOverlay.classList.remove('active');
  
  showToast('Order placed successfully!', 'success');
}

// Generate order ID
function generateOrderID() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `CC${timestamp}${random}`.toUpperCase();
}

// Reset app for new order
function resetApp() {
  const confirmationModal = document.getElementById('confirmationModal');
  const checkoutForm = document.getElementById('checkoutForm');
  
  if (confirmationModal) {
    confirmationModal.classList.add('hidden');
  }
  
  document.body.style.overflow = 'auto';
  
  // Reset form
  if (checkoutForm) {
    checkoutForm.reset();
  }
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show toast notification
function showToast(message, type = 'info') {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'error' ? '#ff5555' : type === 'success' ? '#50C878' : '#8B4513'};
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    font-weight: 500;
    max-width: 300px;
    word-wrap: break-word;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s ease;
  `;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3000);
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(255, 248, 220, 0.95)';
      navbar.style.boxShadow = '0 4px 20px rgba(139, 69, 19, 0.15)';
    } else {
      navbar.style.background = 'rgba(255, 248, 220, 0.9)';
      navbar.style.boxShadow = '0 2px 8px rgba(139, 69, 19, 0.1)';
    }
  }
});

// Initialize enhanced UX
function initializeEnhancedUX() {
  // Add loading states for buttons
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
      if (!this.disabled) {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
      }
    });
  });
}

// Call enhanced UX initialization after a short delay
setTimeout(initializeEnhancedUX, 200);