        const quantityInput = document.getElementById('quantity');
        const totalPriceSpan = document.getElementById('total-price');
        const basePrice = 32.99;

        function updateTotalPrice() {
            const quantity = parseInt(quantityInput.value);
            const total = (basePrice * quantity).toFixed(2);
            totalPriceSpan.textContent = total;
        }

        function increaseQuantity() {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue < 10) {
                quantityInput.value = currentValue + 1;
                updateTotalPrice();
            }
        }

        function decreaseQuantity() {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
                updateTotalPrice();
            }
        }

        function addToCart() {
            const quantity = parseInt(quantityInput.value);
            const total = (basePrice * quantity).toFixed(2);
            
            // Show notification
            const notification = document.getElementById('cart-notification');
            notification.classList.add('show');
            
            // Console message for simulation
            console.log(`Added to cart: ${quantity} lbs of Premium Ribeye Steak - Total: $${total}`);
            
            // Hide notification after 3 seconds
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // Update price when quantity input changes directly
        quantityInput.addEventListener('input', updateTotalPrice);

        // Ensure quantity stays within bounds
        quantityInput.addEventListener('change', function() {
            const value = parseInt(this.value);
            if (value < 1) this.value = 1;
            if (value > 10) this.value = 10;
            updateTotalPrice();
        });