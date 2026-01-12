// ElectroBénin - Script Principal
class ElectroBeninApp {
    constructor() {
        this.products = [];
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.init();
    }

    async init() {
        console.log('⚡ ElectroBénin - Initialisation...');
        
        // Mettre à jour le compteur panier
        this.updateCartCounter();
        
        // Charger les produits
        await this.loadProducts();
        
        // Configurer les écouteurs
        this.setupEventListeners();
        
        // Charger les produits dans la page
        this.displayProducts();
    }

    async loadProducts() {
        try {
            const response = await fetch('/api/products');
            if (!response.ok) throw new Error('Erreur réseau');
            
            this.products = await response.json();
            console.log(`✅ ${this.products.length} produits chargés`);
        } catch (error) {
            console.error('❌ Erreur:', error);
            // Données par défaut en cas d'échec
            this.products = this.getDefaultProducts();
        }
    }

    getDefaultProducts() {
        return [
            {
                _id: '1',
                name: 'Arduino Uno R3',
                description: 'Carte de développement idéale pour débutants',
                price: 12000,
                stock: 50,
                category: 'Microcontrôleurs',
                image: 'https://store-usa.arduino.cc/cdn/shop/files/A000073_00.front_1200x900.jpg',
                tag: 'POPULAIRE'
            },
            {
                _id: '2',
                name: 'LCD 16×2 avec I2C',
                description: 'Écran LCD avec interface simplifiée',
                price: 6500,
                stock: 35,
                category: 'Afficheurs',
                image: 'https://m.media-amazon.com/images/I/71z8VnS2bAL._AC_SL1500_.jpg',
                tag: 'POPULAIRE'
            },
            {
                _id: '3',
                name: 'ESP32 Dev Board',
                description: 'WiFi + Bluetooth intégré',
                price: 18000,
                stock: 25,
                category: 'Microcontrôleurs',
                image: 'https://m.media-amazon.com/images/I/61Y9EwKCj1L._AC_SL1500_.jpg'
            },
            {
                _id: '4',
                name: 'Capteur HC-SR04',
                description: 'Capteur ultrasonique de distance',
                price: 3500,
                stock: 100,
                category: 'Capteurs',
                image: 'https://m.media-amazon.com/images/I/61R1A7CuHTL._AC_SL1500_.jpg',
                tag: 'POPULAIRE'
            },
            {
                _id: '5',
                name: 'Pack Résistances 500pcs',
                description: 'Assortiment de résistances',
                price: 2500,
                stock: 30,
                category: 'Résistances',
                image: 'https://m.media-amazon.com/images/I/71YtGZ2PqRL._AC_SL1500_.jpg',
                tag: 'NOUVEAU'
            },
            {
                _id: '6',
                name: 'Module Relais 5V',
                description: 'Contrôle de charges AC/DC',
                price: 2800,
                stock: 60,
                category: 'Modules',
                image: 'https://m.media-amazon.com/images/I/71O-7U58WGL._AC_SL1500_.jpg'
            }
        ];
    }

    displayProducts(filter = 'all', search = '') {
        const container = document.getElementById('products-container');
        if (!container) return;

        // Filtrer les produits
        let filteredProducts = this.products;
        
        if (filter !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.category === filter);
        }
        
        if (search) {
            const searchLower = search.toLowerCase();
            filteredProducts = filteredProducts.filter(p => 
                p.name.toLowerCase().includes(searchLower) ||
                p.description.toLowerCase().includes(searchLower) ||
                p.category.toLowerCase().includes(searchLower)
            );
        }

        // Afficher les produits
        if (filteredProducts.length === 0) {
            container.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-search"></i>
                    <h3>Aucun produit trouvé</h3>
                    <p>Essayez d'autres termes de recherche</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredProducts.map(product => `
            <div class="product-card" data-id="${product._id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" 
                         onerror="this.src='https://via.placeholder.com/400x300/FF6B35/FFFFFF?text=${encodeURIComponent(product.name.substring(0, 20))}'">
                    ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ''}
                </div>
                
                <div class="product-content">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    
                    <div class="product-price">${product.price.toLocaleString()} FCFA</div>
                    
                    <div class="product-stock ${product.stock > 20 ? 'in-stock' : 'low-stock'}">
                        <i class="fas ${product.stock > 20 ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                        ${product.stock > 20 ? 'En stock' : 'Stock limité'} (${product.stock})
                    </div>
                    
                    <button class="add-to-cart" data-id="${product._id}">
                        <i class="fas fa-cart-plus"></i> Ajouter au panier
                    </button>
                </div>
            </div>
        `).join('');

        // Ajouter les écouteurs d'événements
        this.setupProductButtons();
    }

    setupProductButtons() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.closest('[data-id]').dataset.id;
                const product = this.products.find(p => p._id === productId);
                
                if (product) {
                    this.addToCart(product);
                }
            });
        });
    }

    addToCart(product) {
        const existingItem = this.cart.find(item => item._id === product._id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }
        
        // Sauvegarder dans localStorage
        localStorage.setItem('cart', JSON.stringify(this.cart));
        
        // Mettre à jour le compteur
        this.updateCartCounter();
        
        // Afficher une notification
        this.showNotification(`${product.name} ajouté au panier`, 'success');
        
        // Animation du bouton
        const button = document.querySelector(`[data-id="${product._id}"] .add-to-cart`);
        if (button) {
            button.classList.add('added');
            setTimeout(() => button.classList.remove('added'), 1000);
        }
    }

    updateCartCounter() {
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        
        document.querySelectorAll('.cart-count').forEach(counter => {
            counter.textContent = totalItems;
            counter.style.display = totalItems > 0 ? 'flex' : 'none';
        });
    }

    showNotification(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    setupEventListeners() {
        // Recherche
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const filter = document.querySelector('.filter-btn.active')?.dataset.category || 'all';
                this.displayProducts(filter, e.target.value);
            });
        }

        // Filtres par catégorie
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                // Retirer active de tous les boutons
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Ajouter active au bouton cliqué
                e.target.classList.add('active');
                
                // Filtrer les produits
                const search = searchInput?.value || '';
                this.displayProducts(e.target.dataset.category, search);
            });
        });

        // Newsletter
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('input').value;
                
                this.showNotification(`Merci ! Vous êtes inscrit avec : ${email}`);
                newsletterForm.reset();
            });
        }
    }
}

// Démarrer l'application
const app = new ElectroBeninApp();

// Exposer au global pour les autres pages
window.ElectroBeninApp = app;