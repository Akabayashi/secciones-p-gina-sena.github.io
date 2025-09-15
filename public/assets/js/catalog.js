        // Sample product data
        const products = [
            {
                id: 1,
                name: "Premium Ribeye Steak",
                description: "Marbled perfection, aged 28 days for ultimate tenderness",
                price: 32.99,
                category: "beef",
                image: "🥩"
            },
            {
                id: 2,
                name: "Free-Range Chicken Breast",
                description: "Organic, hormone-free chicken breast fillets",
                price: 12.99,
                category: "chicken",
                image: "🐔"
            },
            {
                id: 3,
                name: "Wild Atlantic Salmon",
                description: "Fresh caught, sustainably sourced salmon fillets",
                price: 24.99,
                category: "fish",
                image: "🐟"
            },
            {
                id: 4,
                name: "Heritage Pork Chops",
                description: "Thick-cut, bone-in pork chops from heritage breeds",
                price: 18.99,
                category: "pork",
                image: "🐷"
            },
            {
                id: 5,
                name: "Wagyu Ground Beef",
                description: "Premium ground beef from authentic Wagyu cattle",
                price: 28.99,
                category: "beef",
                image: "🥩"
            },
            {
                id: 6,
                name: "Organic Turkey Breast",
                description: "Farm-raised organic turkey breast, perfect for roasting",
                price: 16.99,
                category: "chicken",
                image: "🦃"
            },
            {
                id: 7,
                name: "Fresh Tuna Steaks",
                description: "Sushi-grade yellowfin tuna steaks",
                price: 29.99,
                category: "fish",
                image: "🐟"
            },
            {
                id: 8,
                name: "Bacon-Wrapped Filet",
                description: "Tender filet mignon wrapped in premium bacon",
                price: 42.99,
                category: "beef",
                image: "🥩"
            },
            {
                id: 9,
                name: "BBQ Pork Ribs",
                description: "St. Louis style pork ribs, perfect for grilling",
                price: 22.99,
                category: "pork",
                image: "🐷"
            },
            {
                id: 10,
                name: "Lobster Tails",
                description: "Cold water lobster tails, flash frozen for freshness",
                price: 34.99,
                category: "fish",
                image: "🦞"
            }
        ];

        let filteredProducts = [...products];
        let cartCount = 0;

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            displayProducts(products);
            setupEventListeners();
        });

        function setupEventListeners() {
            // Search functionality
            document.getElementById('searchInput').addEventListener('input', handleSearch);
            
            // Price filter functionality
            document.getElementById('minPrice').addEventListener('input', applyFilters);
            document.getElementById('maxPrice').addEventListener('input', applyFilters);
            
            // Category filter functionality
            document.querySelectorAll('.category-filter').forEach(checkbox => {
                checkbox.addEventListener('change', applyFilters);
            });
        }

        function displayProducts(productsToShow) {
            const productGrid = document.getElementById('productGrid');
            
            if (productsToShow.length === 0) {
                productGrid.innerHTML = '<div class="no-results">No products found matching your criteria.</div>';
                return;
            }
            
            productGrid.innerHTML = productsToShow.map(product => `
                <div class="product-card" onclick="goToProductDetail(${product.id})">
                    <div class="product-image">${product.image}</div>
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <button class="add-to-cart" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            `).join('');
        }

            function goToProductDetail(productId) {
    // Redirige pasando el ID del producto como query param
                window.location.href = `product-detail.html?id=${productId}`;
            }
        function handleSearch() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            applyFilters();
        }

        function applyFilters() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
            const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
            const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked'))
                .map(checkbox => checkbox.value);

            filteredProducts = products.filter(product => {
                const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                                    product.description.toLowerCase().includes(searchTerm);
                const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
                const matchesCategory = selectedCategories.length === 0 || 
                                      selectedCategories.includes(product.category);

                return matchesSearch && matchesPrice && matchesCategory;
            });

            displayProducts(filteredProducts);
        }

        function clearAllFilters() {
            document.getElementById('searchInput').value = '';
            document.getElementById('minPrice').value = '';
            document.getElementById('maxPrice').value = '';
            document.querySelectorAll('.category-filter').forEach(checkbox => {
                checkbox.checked = false;
            });
            
            filteredProducts = [...products];
            displayProducts(filteredProducts);
        }

        function addToCart(productId, productName, price) {
            cartCount++;
            
            // Update cart count in navigation
            const cartLink = document.querySelector('a[href="#cart"]');
            if (cartLink) {
                cartLink.textContent = `Cart (${cartCount})`;
            }
            
            // Show success message
            alert(`${productName} added to cart! ($${price.toFixed(2)})`);
            
            // Console log for debugging
            console.log(`Added to cart: ${productName} - $${price.toFixed(2)}`);
        }

        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const closeBtn = sidebar.querySelector('.sidebar-close');
            
            sidebar.classList.toggle('active');
            
            if (sidebar.classList.contains('active')) {
                closeBtn.style.display = 'block';
                document.body.style.overflow = 'hidden';
            } else {
                closeBtn.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(event) {
            const sidebar = document.getElementById('sidebar');
            const toggleBtn = document.querySelector('.sidebar-toggle');
            
            if (window.innerWidth <= 768 && 
                sidebar.classList.contains('active') && 
                !sidebar.contains(event.target) && 
                !toggleBtn.contains(event.target)) {
                toggleSidebar();
            }
        });