// Данные гитар
const guitarsData = [
    {
        id: 1,
        brand: "Fender",
        name: "Stratocaster '62 Reissue",
        price: 185000,
        image: "/img/guitars/fender_stratocaster.jpg",
        description: "Винтажная модель 1962 года"
    },
    {
        id: 2,
        brand: "Gibson",
        name: "Les Paul Standard '59",
        price: 320000,
        image: "/img/guitars/gibson_lespaul.jpg",
        description: "Классика рок-музыки"
    },
    {
        id: 3,
        brand: "Ibanez",
        name: "Iceman IC-420",
        price: 95000,
        image: "/img/guitars/ibanez_rg550.jpg",
        description: "Икона метал-сцены с удобным грифом"
    },
    {
        id: 4,
        brand: "Yamaha",
        name: "SG-200",
        price: 90000,
        image: "/img/guitars/yamaha_pacifica.jpg",
        description: "Легендарная гитара русского рока"
    },
    {
        id: 5,
        brand: "Jackson",
        name: "Soloist SL2",
        price: 145000,
        image: "/img/guitars/jackson_soloist.jpg",
        description: "Агрессивный дизайн для тяжелой музыки"
    },
    {
        id: 6,
        brand: "ESP",
        name: "E-II Horizon",
        price: 175000,
        image: "/img/guitars/esp_horizon.jpg",
        description: "Премиальное качество для сцены и студии"
    },
    {
        id: 7,
        brand: "Fender",
        name: "Telecaster Custom",
        price: 155000,
        image: "/img/guitars/fender_telecaster.jpg",
        description: "Вечная классика с уникальным тембром"
    },
    {
        id: 8,
        brand: "Gibson",
        name: "SG Standard",
        price: 195000,
        image: "/img/guitars/gibson_sg.jpg",
        description: "Легендарный дизайн и мощное звучание"
    }
];

let currentPage = 1;
const itemsPerPage = 6;
let filteredGuitars = [...guitarsData];

// Инициализация каталога
function initCatalog() {
    renderGuitars();
    updatePagination();
}

// Рендер гитар
function renderGuitars() {
    const catalog = document.getElementById('guitarsCatalog');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentGuitars = filteredGuitars.slice(startIndex, endIndex);

    catalog.innerHTML = '';

    if (currentGuitars.length === 0) {
        catalog.innerHTML = `
            <div class="no-results">
                <h3>Ничего не найдено</h3>
                <p>Попробуйте изменить параметры поиска или фильтры</p>
            </div>
        `;
        return;
    }

    currentGuitars.forEach(guitar => {
        const card = document.createElement('div');
        card.className = 'guitar-card';
        card.innerHTML = `
        <div class="guitar-image">
            <img src="${guitar.image}" alt="${guitar.brand} ${guitar.name}" 
                 onerror="this.src='/img/guitars/placeholder.jpg'">
        </div>
        <div class="guitar-info">
            <div class="guitar-brand">${guitar.brand}</div>
            <h3 class="guitar-name">${guitar.name}</h3>
            <div class="guitar-price">${formatPrice(guitar.price)} руб</div>
            <p class="guitar-description">${guitar.description}</p>
            <button class="add-to-cart-btn" onclick="addToCart(${guitar.id})">
                Добавить в корзину
            </button>
        </div>
    `;
        catalog.appendChild(card);
    });
}

// Форматирование цены
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Поиск гитар
function searchGuitars() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    filteredGuitars = guitarsData.filter(guitar => 
        guitar.name.toLowerCase().includes(searchTerm) ||
        guitar.brand.toLowerCase().includes(searchTerm) ||
        guitar.description.toLowerCase().includes(searchTerm)
    );
    
    currentPage = 1;
    renderGuitars();
    updatePagination();
}

// Сортировка
function sortGuitars() {
    const sortValue = document.getElementById('sortSelect').value;
    
    filteredGuitars.sort((a, b) => {
        switch (sortValue) {
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            default:
                return 0;
        }
    });
    
    currentPage = 1;
    renderGuitars();
    updatePagination();
}

// Фильтрация по бренду
function filterByBrand() {
    const brand = document.getElementById('brandFilter').value;
    
    if (brand === 'all') {
        filteredGuitars = [...guitarsData];
    } else {
        filteredGuitars = guitarsData.filter(guitar => guitar.brand === brand);
    }
    
    currentPage = 1;
    renderGuitars();
    updatePagination();
}

// Фильтрация по цене
function filterByPrice() {
    const priceRange = document.getElementById('priceFilter').value;
    
    if (priceRange === 'all') {
        filteredGuitars = [...guitarsData];
    } else {
        const [min, max] = priceRange.split('-').map(Number);
        
        filteredGuitars = guitarsData.filter(guitar => {
            if (priceRange.endsWith('+')) {
                return guitar.price >= 200000;
            }
            return guitar.price >= min && guitar.price <= max;
        });
    }
    
    currentPage = 1;
    renderGuitars();
    updatePagination();
}

// Пагинация
function changePage(direction) {
    const totalPages = Math.ceil(filteredGuitars.length / itemsPerPage);
    const newPage = currentPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        renderGuitars();
        updatePagination();
    }
}

function updatePagination() {
    const totalPages = Math.ceil(filteredGuitars.length / itemsPerPage);
    document.getElementById('currentPage').textContent = `${currentPage} / ${totalPages}`;
    
    const prevButton = document.querySelector('.pagination button:first-child');
    const nextButton = document.querySelector('.pagination button:last-child');
    
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages || totalPages === 0;
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', initCatalog);

// Поиск при нажатии Enter
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchGuitars();
    }
});

// Функции для корзины
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Добавление в корзину
function addToCart(guitarId) {
    const guitar = guitarsData.find(g => g.id === guitarId);
    if (!guitar) return;

    const existingItem = cart.find(item => item.id === guitarId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...guitar,
            quantity: 1
        });
    }
    
    updateCart();
    showAddedToCartMessage(guitar.name);
}

// Показать сообщение о добавлении
function showAddedToCartMessage(productName) {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #0B7309;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    message.textContent = `${productName} добавлен в корзину!`;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Обновление корзины
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

// Обновление счетчика корзины
function updateCartCount() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalCount;
}

// Рендер товаров в корзине
function renderCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <h3>Корзина пуста</h3>
                <p>Добавьте товары из каталога</p>
            </div>
        `;
        cartTotal.textContent = '0 руб';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.brand} ${item.name}"
                     onerror="this.src='/img/guitars/placeholder.jpg'">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-brand">${item.brand}</div>
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${formatPrice(item.price)} руб</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="changeQuantity(${index}, -1)">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" 
                           min="1" onchange="changeQuantityInput(${index}, this.value)">
                    <button class="quantity-btn" onclick="changeQuantity(${index}, 1)">+</button>
                    <button class="remove-item" onclick="removeFromCart(${index})">×</button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = `${formatPrice(total)} руб`;
}

// Изменение количества
function changeQuantity(index, delta) {
    cart[index].quantity += delta;
    
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    
    updateCart();
}

function changeQuantityInput(index, value) {
    const quantity = parseInt(value) || 1;
    cart[index].quantity = Math.max(1, quantity);
    updateCart();
}

// Удаление из корзины
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Управление модальным окном корзины
function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    const overlay = document.getElementById('cartOverlay');
    
    cartModal.classList.toggle('open');
    overlay.classList.toggle('open');
}

function closeCart() {
    const cartModal = document.getElementById('cartModal');
    const overlay = document.getElementById('cartOverlay');
    
    cartModal.classList.remove('open');
    overlay.classList.remove('open');
}

// Оформление заказа
function checkout() {
    if (cart.length === 0) {
        alert('Корзина пуста!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Заказ оформлен! Сумма: ${formatPrice(total)} руб\nСпасибо за покупку!`);
    
    // Очистка корзины после оформления
    cart = [];
    updateCart();
    closeCart();
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    initCatalog();
    updateCartCount();
    renderCartItems();
});

// Закрытие корзины по ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeCart();
    }
});


// Загрузка данных из PHP API
async function loadGuitarsFromPHP() {
    try {
        const response = await fetch('/api/get_guitars.php');
        return await response.json();
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        return [];
    }
}
