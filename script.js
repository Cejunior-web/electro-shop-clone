// script.js - JavaScript pour ElectroBénin sublime

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const body = document.body;

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            body.classList.toggle('menu-open');
            hamburger.textContent = mobileNav.classList.contains('active') ? '✕' : '☰';
        });
    }

    document.querySelectorAll('.mobile-nav-links a, .main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav) mobileNav.classList.remove('active');
            if (body) body.classList.remove('menu-open');
            if (hamburger) hamburger.textContent = '☰';
        });
    });

    body.addEventListener('click', (e) => {
        if (body.classList.contains('menu-open') && mobileNav && !mobileNav.contains(e.target) && hamburger && !hamburger.contains(e.target)) {
            mobileNav.classList.remove('active');
            body.classList.remove('menu-open');
            hamburger.textContent = '☰';
        }
    });

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCounts = document.querySelectorAll('.cart-count');

    const updateCartCount = () => {
        cartCounts.forEach(count => count.textContent = cart.length);
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    updateCartCount();

    document.querySelectorAll('.btn-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const card = button.closest('.card');
            if (card) {
                const name = card.querySelector('h3')?.textContent || 'Produit';
                const price = card.querySelector('.price')?.textContent || '0 FCFA';

                cart.push({ name, price });
                updateCartCount();

                const toast = document.createElement('div');
                toast.className = 'toast';
                toast.textContent = `${name} ajouté au panier ! 🛒`;
                document.body.appendChild(toast);
                setTimeout(() => toast.classList.add('show'), 100);
                setTimeout(() => {
                    toast.classList.remove('show');
                    setTimeout(() => toast.remove(), 300);
                }, 3000);
            }
        });
    });

    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]')?.value.trim() || '';
            if (email) {
                alert(`Merci ! Vous êtes abonné avec ${email} 📧`);
                newsletterForm.reset();
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});