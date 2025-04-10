document.addEventListener("DOMContentLoaded", function () {
    // Navigation links
    const signUpLink = document.getElementById("signuplink");
    const loginLink = document.getElementById("loginLink");

    if (signUpLink) {
        signUpLink.addEventListener("click", function (event) {
            event.preventDefault();
            window.location.href = "sign_up.html";
        });
    }

    if (loginLink) {
        loginLink.addEventListener("click", function (event) {
            event.preventDefault();
            window.location.href = "login_page.html";
        });
    }

    // Cart Sidebar & Backdrop
    const cartToggle = document.querySelector(".cart-toggle");
    const cartSidebar = document.querySelector(".cart-sidebar");
    const cartClose = document.querySelector(".cart-close");
    const cartBackdrop = document.querySelector(".cart-backdrop");

    // Open Cart
    if (cartToggle && cartSidebar) {
        cartToggle.addEventListener("click", () => {
            cartSidebar.classList.add("open");
            if (cartBackdrop) cartBackdrop.classList.add("open");
        });
    }

    // Close Cart
    function closeCartSidebar() {
        cartSidebar.classList.remove("open");
        if (cartBackdrop) cartBackdrop.classList.remove("open");
    }

    if (cartClose && cartSidebar) {
        cartClose.addEventListener("click", closeCartSidebar);
    }

    if (cartBackdrop) {
        cartBackdrop.addEventListener("click", closeCartSidebar);
    }

    // Scroll animation
    const fadeElements = document.querySelectorAll(".fade-up");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el));
});

// Go to Checkout page
function goToCheckout() {
    window.location.href = "checkout.html";
}
