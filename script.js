// script.js - JavaScript pour ElectroBénin sublime

document.addEventListener('DOMContentLoaded', () => {
    // 1. Menu hamburger mobile
    const hamburger = document.querySelector('.hamburger');
    const body = document.body;

    hamburger.addEventListener('click', () => {
        body.classList.toggle('menu-open');
        hamburger.textContent = body.classList.contains('menu-open') ? '✕' : '☰';
    });

    // 2. Panier
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.createElement('span');
    cartCount.className = 'cart-count';
    cartCount.textContent = cart.length;
    document.querySelector('.logo').appendChild(cartCount);

    // Mise à jour du compteur
    function updateCartCount() {
        cartCount.textContent = cart.length;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Boutons panier
    document.querySelectorAll('.btn-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = button.closest('.card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;

            cart.push({ name: productName, price: productPrice });
            updateCartCount();

            // Notification toast
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = `${productName} ajouté au panier ! 🛒`;
            document.body.appendChild(toast);

            setTimeout(() => {
                toast.classList.add('show');
            }, 100);

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
            const email = newsletterForm.querySelector('input[type="email"]').value;
            if (email) {
                alert(`Merci ! Vous êtes abonné avec ${email} 📧`);
                newsletterForm.reset();
            }
        });
    }
});