// script.js - JavaScript pour ElectroBénin sublime

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;

    // 1. Menu hamburger
    hamburger.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        body.classList.toggle('menu-open');
        hamburger.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
    });

    // Fermer le menu au clic sur un lien
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            body.classList.remove('menu-open');
            hamburger.textContent = '☰';
        });
    });

    // Fermer le menu au clic sur l'overlay
    body.addEventListener('click', (e) => {
        if (body.classList.contains('menu-open') && !mainNav.contains(e.target) && !hamburger.contains(e.target)) {
            mainNav.classList.remove('active');
            body.classList.remove('menu-open');
            hamburger.textContent = '☰';
        }
    });

    // 2. Panier
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.createElement('span');
    cartCount.className = 'cart-count';
    cartCount.textContent = cart.length;
    document.querySelector('.logo').appendChild(cartCount);

    function updateCartCount() {
        cartCount.textContent = cart.length;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    document.querySelectorAll('.btn-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = button.closest('.card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;

            cart.push({ name: productName, price: productPrice });
            updateCartCount();

            // Toast notification
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = `${productName} ajouté au panier ! 🛒`;
            document.body.appendChild(toast);

            setTimeout(() => toast.classList.add('show'), 100);
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        });
    });

    // 3. Formulaire newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value.trim();
            if (email) {
                alert(`Merci ! Vous êtes abonné avec ${email} 📧`);
                newsletterForm.reset();
            }
        });
    }

    // 4. Smooth scroll pour les liens internes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});