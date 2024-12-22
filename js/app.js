// Fshij shporten nga localStorage sa here qe faqja hapet
localStorage.removeItem('cart');

// Lista e produkteve qe do te jene ne shporte. Elementeve ju qasemi me ID.
let cart = []; // Krijo nje shporte te re bosh
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const showCartButton = document.getElementById('show-cart');
const closeCartButton = document.getElementById('close-cart');

// Funksioni per te ruajtur shporten ne localStorage
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Funksioni per te ngarkuar shporten nga localStorage dhe per te perditesuar modalin
function loadCart() {
    cartItems.innerHTML = ''; // Pastro listen para se te rishfaqet
    let totalPrice = 0;

    // Shto çdo produkt nga shporta ne modal
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)} 
            <button class="remove-btn" data-index="${index}">❌ Remove</button>
        `;
        cartItems.appendChild(li);
        totalPrice += item.price;
    });

    // Perditeso totalin
    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;

    // Shto event listener per butonat "Remove"
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            removeItemFromCart(index);
        });
    });
}

// Funksioni per te hequr nje produkt nga shporta
function removeItemFromCart(index) {
    cart.splice(index, 1); // Heq produktin nga array sipas indeksit
    saveCartToStorage(); // Ruaj ndryshimet në localStorage
    loadCart(); // Rifresko modalin
}

// Funksioni per te shtuar produkte ne shporte
document.querySelectorAll('.cart-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const card = event.target.closest('.menu-card') || event.target.closest('.product-card'); // Merr karten
        const productName = card.querySelector('h2').textContent; // Emri i produktit
        const productPrice = parseFloat(
            card.querySelector('.price').textContent.replace('$', '').replace(' ', '')
        ); // Çmimi i produktit

        // Shto produktin ne shporte dhe ruaje ne localStorage
        cart.push({ name: productName, price: productPrice });
        saveCartToStorage();

        // Trego perdoruesit qe kemi shtuar ne shporte produktin
        alert(`${productName} ($${productPrice}) added to cart!`);
    });
});

// Funksioni per te shfaqur modalin e shportes
showCartButton.addEventListener('click', () => {
    loadCart(); // Perditeso modalin me te dhenat e shportes
    cartModal.classList.remove('hidden'); // Shfaq modalin
});

// Funksioni per te mbyllur modalin
closeCartButton.addEventListener('click', () => {
    cartModal.classList.add('hidden'); // Fshihe modalin
});

// Ngarko shporten kur faqja hapet
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});

// Funksioni per pjesen e Contact

const contactForm = document.querySelector('.contact-section form');

contactForm.addEventListener('submit', (event) => {
    event.preventDefault(); 
    
    // I merr te dhenat nga inputet
    const name = contactForm.querySelector('input[placeholder="Name"]').value.trim();
    const email = contactForm.querySelector('input[placeholder="Email"]').value.trim();
    const phone = contactForm.querySelector('input[placeholder="Phone"]').value.trim();
    const message = contactForm.querySelector('textarea[placeholder="Message"]').value.trim();

    // Kontrollojme se a jane te mbushura te gjitha hapesirat ku do te shkruajme
    if (!name || !email || !message) {
        alert('All fields (except phone) must be filled out to send the message.');
        return;
    }

    // Nese jane te mbushura shfaq nje mesazh qe eshte derguar me sukses
    alert('Thank you! Your message has been sent successfully.');
    contactForm.reset(); // Pastron fushat e formes
});
