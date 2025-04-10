document.addEventListener("DOMContentLoaded", () => {
  // Show total price from cart
  const checkoutItems = JSON.parse(localStorage.getItem("checkoutItems")) || [];
  let total = 0;

  checkoutItems.forEach(item => {
    const price = parseFloat(item.price.replace(/[^\d.]/g, ""));
    total += price * item.quantity;
  });

  // Update total amount display
  const totalDisplay = document.getElementById("totalAmountDisplay");
  totalDisplay.innerText = `Total: ₹${total.toFixed(2)}`;

  // Element references
  const upiInput = document.getElementById("upiInput");
  const cardInput = document.getElementById("cardInput");
  const placeOrderBtn = document.querySelector(".place-order-btn");

  const radioButtons = document.querySelectorAll('input[name="payment"]');

  // Show/Hide relevant fields on payment option change
  radioButtons.forEach(radio => {
    radio.addEventListener("change", () => {
      // Hide all inputs by default
      upiInput.classList.add("hidden");
      cardInput.classList.add("hidden");

      // Show input only for UPI or Card
      if (radio.value === "upi") {
        upiInput.classList.remove("hidden");
      } else if (radio.value === "card") {
        cardInput.classList.remove("hidden");
      }
    });
  });

  // Confirm order
  placeOrderBtn.addEventListener("click", () => {
    const selected = document.querySelector('input[name="payment"]:checked');

    if (!selected) {
      alert("Please select a payment method.");
      return;
    }

    if (selected.value === "upi" && !upiInput.value.trim()) {
      alert("Please enter your UPI ID.");
      return;
    }

    if (selected.value === "card" && !cardInput.value.trim()) {
      alert("Please enter your Card Number.");
      return;
    }

    alert(`Payment via ${selected.value.toUpperCase()} received.\nOrder placed!`);
    localStorage.removeItem("cartItems");
    localStorage.removeItem("checkoutItems");
    window.location.href = "main_page.html";
  });

  // Initialize Google Pay
  window.onGooglePayLoaded = function () {
    const paymentsClient = new google.payments.api.PaymentsClient({ environment: "TEST" });

    const paymentRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [{
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["VISA", "MASTERCARD"]
        },
        tokenizationSpecification: {
          type: "PAYMENT_GATEWAY",
          parameters: {
            gateway: "example",
            gatewayMerchantId: "exampleGatewayMerchantId"
          }
        }
      }],
      merchantInfo: {
        merchantId: "12345678901234567890",
        merchantName: "Demo Coffee Shop"
      },
      transactionInfo: {
        totalPriceStatus: "FINAL",
        totalPriceLabel: "Total",
        totalPrice: total.toFixed(2),
        currencyCode: "INR",
        countryCode: "IN"
      }
    };

    const gpayButton = paymentsClient.createButton({
      onClick: () => {
        paymentsClient.loadPaymentData(paymentRequest).then(paymentData => {
          console.log("Google Pay Success", paymentData);
          alert("Payment successful via Google Pay.\nOrder placed!");
          localStorage.removeItem("cartItems");
          localStorage.removeItem("checkoutItems");
          window.location.href = "main_page.html";
        }).catch(err => {
          console.error("Google Pay Failed", err);
        });
      }
    });

    document.getElementById("gpay-button").appendChild(gpayButton);
  };
});
