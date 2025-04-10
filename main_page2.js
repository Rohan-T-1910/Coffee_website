document.addEventListener("DOMContentLoaded", () => {
    const cart = [];

    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItemsContainer = document.querySelector(".cart-items");
    const checkoutBtn = document.querySelector(".checkout-btn");

    // Handle Quantity Increment/Decrement
    document.querySelectorAll(".quantity-selector").forEach((selector) => {
        const decreaseBtn = selector.querySelector(".quantity-btn:first-child");
        const increaseBtn = selector.querySelector(".quantity-btn:last-child");
        const quantityDisplay = selector.querySelector("span");

        if (decreaseBtn && increaseBtn && quantityDisplay) {
            decreaseBtn.addEventListener("click", () => {
                let quantity = parseInt(quantityDisplay.innerText);
                if (quantity > 1) {
                    quantityDisplay.innerText = quantity - 1;
                }
            });

            increaseBtn.addEventListener("click", () => {
                let quantity = parseInt(quantityDisplay.innerText);
                quantityDisplay.innerText = quantity + 1;
            });
        }
    });

    // Add product to cart
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const productCard = button.closest(".product-card");
            const title = productCard.querySelector(".product-title").innerText;
            const sizeSelect = productCard.querySelector(".product-size");
            const sugarSelect = productCard.querySelector(".product-sugar");
            const size = sizeSelect ? sizeSelect.value : "Default";
            const sugar = sugarSelect ? sugarSelect.value : "Default";
            const quantity = productCard.querySelector(".quantity-selector span")?.innerText || "1";
            const price = productCard.querySelector(".product-price").innerText;

            const product = {
                title,
                size,
                sugar,
                quantity: parseInt(quantity),
                price
            };

            cart.push(product);
            updateCartUI();
            alert(`${title} (${size}, ${sugar}) x${quantity} added to cart!`);
        });
    });

    // Update Cart Sidebar UI
    function updateCartUI() {
        cartItemsContainer.innerHTML = "";

        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <div>
                    <h4>${item.title}</h4>
                    <p>Size: ${item.size}, Sugar: ${item.sugar}, Quantity: ${item.quantity}</p>
                    <p>${item.price}</p>
                </div>
                <button class="remove-from-cart" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // Save to localStorage
        localStorage.setItem("cartItems", JSON.stringify(cart));

        // Remove button events
        document.querySelectorAll(".remove-from-cart").forEach((button) => {
            button.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                cart.splice(index, 1);
                updateCartUI();
            });
        });
    }

    // Go to checkout page
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            localStorage.setItem("checkoutItems", JSON.stringify(cart));
            window.location.href = "checkout.html";
        });
    }
});
