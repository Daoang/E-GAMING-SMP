// Function to Open Discord Link
function openDiscord() {
    const discordLink = "https://discord.gg/JB6dkq5b"; 
    window.open(discordLink, '_blank');
}

/* --- SLIDESHOW LOGIC --- */
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function changeSlide() {
    if(slides.length > 0) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
}
setInterval(changeSlide, 3000);

/* --- PAYMENT MODAL LOGIC --- */
const modal = document.getElementById('paymentModal');
const paymentBody = document.getElementById('payment-body');
const successMsg = document.getElementById('success-message');

const rankSpan = document.getElementById('selected-rank');
const priceSpan = document.getElementById('price-tag');
const hiddenRank = document.getElementById('hidden-rank');
const hiddenPrice = document.getElementById('hidden-price');

function openPayment(rankName, price) {
    modal.style.display = "flex";
    
    // Reset Modal
    paymentBody.style.display = "block";
    successMsg.style.display = "none";
    
    // Set Values
    rankSpan.innerText = rankName;
    priceSpan.innerText = "₱" + price;
    if(hiddenRank && hiddenPrice) {
        hiddenRank.value = rankName;
        hiddenPrice.value = "₱" + price;
    }
}

function closePayment() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        closePayment();
    }
}

// --- Handle Form Submission (Email) ---
function submitForm(event) {
    event.preventDefault(); // Stop page refresh
    
    const form = document.getElementById('billing-form');
    const submitBtn = document.getElementById('submit-btn');
    const fileInput = document.getElementById('file-upload');
    const originalBtnText = submitBtn.innerText;

    // --- CRITICAL CHECK: Did they pick a file? ---
    if (fileInput.files.length === 0) {
        alert("⚠️ Please upload your GCash Screenshot Proof!");
        return; // STOP HERE. Do not send email.
    }

    // Change button text to show it's working
    submitBtn.innerText = "Uploading Proof...";
    submitBtn.disabled = true;

    const formData = new FormData(form);

    // Send data to FormSubmit
    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        // Hide Form, Show Success Message
        paymentBody.style.display = "none";
        successMsg.style.display = "block";
        
        // Reset form
        form.reset();
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
    })
    .catch(error => {
        alert("Something went wrong. Please try again.");
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
    });
}

/* --- SCROLL ANIMATION --- */
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
});
