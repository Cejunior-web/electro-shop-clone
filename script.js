// script.js - JavaScript pour ElectroBénin sublime

document.addEventListener('DOMContentLoaded', () => {
    // Sélection des éléments
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const body = document.body;

    // 1. Menu hamburger (mobile)
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            body.classList.toggle('menu-open');
            hamburger.textContent = mobileNav.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Fermer le menu au clic sur un lien
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav) mobileNav.classList.remove('active');
            if (body) body.classList.remove('menu-open');
            if (hamburger) hamburger.textContent = '☰';
        });
    });

    // Fermer le menu au clic sur l'overlay
    body.addEventListener('click', (e) => {
        if (body.classList.contains('menu-open') && 
            mobileNav && !mobileNav.contains(e.target) && 
            hamburger && !hamburger.contains(e.target)) {
            mobileNav.classList.remove('active');
            body.classList.remove('menu-open');
            hamburger.textContent = '☰';
        }
    });

    // 2. Panier
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCounts = document.querySelectorAll('.cart-count');

    // Mise à jour du compteur (desktop + mobile)
    const updateCartCount = () => {
        cartCounts.forEach(count => {
            count.textContent = cart.length;
        });
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    updateCartCount(); // Initialisation au chargement

    // Ajout au panier
    document.querySelectorAll('.btn-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const card = button.closest('.card');
            if (!card) return;

            const name = card.querySelector('h3')?.textContent || 'Produit';
            const price = card.querySelector('.price')?.textContent || '0 FCFA';

            cart.push({ name, price });
            updateCartCount();

            // Toast notification
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = `${name} ajouté au panier ! 🛒`;
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
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput?.value.trim();

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
            if (href === '#' || href === '') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Fermer le menu mobile après clic
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    body.classList.remove('menu-open');
                    if (hamburger) hamburger.textContent = '☰';
                }
            }
        });
    });
});