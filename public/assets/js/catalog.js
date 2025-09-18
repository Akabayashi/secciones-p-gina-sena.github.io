
        // Sample product data
        const products = [
            {
                id: 1,
                name: "Filete de Costilla Premium",
                description: "Perfección marmolada, añejada durante 28 días para una ternura máxima.",
                price: 32.99,
                category: "beef",
                image: "<img src= '/public/assets/img/imgRes/Filete_de_Costilla.png' height = '200px' width = '400px'/>"
            },
            {
                id: 2,
                name: "Pechuga de pollo de corral",
                description: "Filetes de pechuga de pollo orgánicos y sin hormonas.",
                price: 12.99,
                category: "chicken",
                image: "<img src= '/public/assets/img/imgPollo/Filete_de_Pechga.png' height = '200px' width = '400px'/>"
            },
            {
                id: 3,
                name: "Salmón Salvaje Atlántico ",
                description: "Filetes de salmón recién capturados y de origen sostenible.",
                price: 24.99,
                category: "fish",
                image: "<img src= '/public/assets/img/imgPescado/filete_de_trucha.png' height = '200px' width = '400px'/>"
            },
            {
                id: 4,
                name: "Chuletas de Cerdo Tradicionales",
                description: "Chuletas de cerdo de corte grueso y con hueso de razas tradicionales.",
                price: 18.99,
                category: "pork",
                image: "<img src= '/public/assets/img/imgCerdo/Chuleta_Tradicional.png' height = '200px' width = '400px'/>"
            },
            {
                id: 5,
                name: "Carne molida de Wagyu",
                description: "Carne molida de primera calidad de auténtico ganado Wagyu.",
                price: 28.99,
                category: "beef",
                image: "<img src= '/public/assets/img/imgRes/Carne5.png' height = '200px' width = '400px'/>"
            },
            {
                id: 6,
                name: "Pechuga De Pavo Orgánica",
                description: "Pechuga de pavo orgánica criada en granja, perfecta para asar.",
                price: 16.99,
                category: "chicken",
                image: "<img src= '/public/assets/img/imgPollo/Pechga_de_Pavo.png' height = '200px' width = '400px'/>"
            },
            {
                id: 7,
                name: "Filetes de Atún Fresco",
                description: "Filetes de aleta de atún amarilla de calidad para sushi.",
                price: 29.99,
                category: "fish",
                image: "<img src= '/public/assets/img/imgPescado/Filete_de_Atun.png' height = '200px' width = '400px'/>"
            },
            {
                id: 8,
                name: "Filete Envuelto en Tocino",
                description: "Tierno filete mignon envuelto en tocino de primera calidad.",
                price: 42.99,
                category: "beef",
                image: "<img src= '/public/assets/img/imgRes/Filete_envuelto_tocino.png' height = '200px' width = '400px'/>"
            },
            {
                id: 9,
                name: "Costillas de Cerdo a la Barbacoa",
                description: "Costillas de cerdo al estilo San Luis, perfectas para asar a la parrilla.",
                price: 22.99,
                category: "pork",
                image: "<img src= '/public/assets/img/imgCerdo/Costillas_a_La_Barbacoa.png' height = '200px' width = '400px'/>"
            },
            {
                id: 10,
                name: "Colas de Langosta",
                description: "Colas de langosta de agua fría, congeladas rápidamente para mayor frescura.",
                price: 34.99,
                category: "fish",
                image: "<img src= '/public/assets/img/imgPescado/Cola_de_Langosta.png' height = '200px' width = '400px'/>"
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
                            Agregar al Carrito
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