// Fonctions principales
document.addEventListener('DOMContentLoaded', function() {
    console.log('ÉlectroBénin chargé');
    
    // Gestion du panier (exemple)
    const cartButtons = document.querySelectorAll('.add-to-cart');
    if (cartButtons) {
        cartButtons.forEach(button => {
            button.addEventListener('click', function() {
                alert('Produit ajouté au panier');
            });
        });
    }
    
    // Animation au scroll
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    }, observerOptions);
    
    // Observer les éléments
    document.querySelectorAll('.feature-icon').forEach(el => {
        observer.observe(el);
    });
});

// Fonction pour le suivi
function trackOrder(phoneNumber) {
    if (!phoneNumber) {
        alert('Veuillez entrer un numéro de téléphone');
        return;
    }
    console.log('Recherche commande pour:', phoneNumber);
    // À connecter avec ton backend
}