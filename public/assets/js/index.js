        // Mobile Navigation
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');

        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Carousel functionality
        let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.carousel-dot');
        const totalSlides = slides.length;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        }

        // Auto-slide functionality
        setInterval(nextSlide, 5000);

        // Navigation buttons
        document.getElementById('nextBtn').addEventListener('click', nextSlide);
        document.getElementById('prevBtn').addEventListener('click', prevSlide);

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Search functionality
        const searchBar = document.getElementById('searchBar');
        const productItems = document.querySelectorAll('.product-item');

        searchBar.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            productItems.forEach(item => {
                const productName = item.getAttribute('data-name').toLowerCase();
                const productCard = item.closest('.offer-card') || item.closest('.product-card');
                
                if (productName.includes(searchTerm)) {
                    productCard.style.display = 'block';
                } else {
                    productCard.style.display = 'none';
                }
            });
        });

        // Add to Cart functionality
        function addToCart(productName, price) {
            console.log(`Added ${productName} ($${price}) to cart`);
            alert(`${productName} has been added to your cart!`);
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });