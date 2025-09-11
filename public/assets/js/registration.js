document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('registrationForm');
            const inputs = form.querySelectorAll('input');
            const successMessage = document.getElementById('successMessage');

            // Real-time validation
            inputs.forEach(input => {
                input.addEventListener('blur', () => validateField(input));
                input.addEventListener('input', () => clearError(input));
            });

            // Form submission
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                let isValid = true;
                inputs.forEach(input => {
                    if (!validateField(input)) {
                        isValid = false;
                    }
                });

                if (isValid) {
                    // Simulate successful registration
                    successMessage.style.display = 'block';
                    form.reset();
                    
                    // Scroll to top to show success message
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                }
            });

            // Login link click handler
            document.getElementById('loginLink').addEventListener('click', function(e) {
                e.preventDefault();
                alert('Redirecting to login page...');
            });

            function validateField(input) {
                const value = input.value.trim();
                const fieldName = input.name;
                let isValid = true;

                // Clear previous errors
                clearError(input);

                switch (fieldName) {
                    case 'fullName':
                        if (value.length < 2) {
                            showError(input, 'fullNameError', 'Please enter your full name (at least 2 characters)');
                            isValid = false;
                        }
                        break;

                    case 'email':
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(value)) {
                            showError(input, 'emailError', 'Please enter a valid email address');
                            isValid = false;
                        }
                        break;

                    case 'phone':
                        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                        if (!phoneRegex.test(value.replace(/[\s\-$$$$]/g, ''))) {
                            showError(input, 'phoneError', 'Please enter a valid phone number');
                            isValid = false;
                        }
                        break;

                    case 'password':
                        if (value.length < 8) {
                            showError(input, 'passwordError', 'Password must be at least 8 characters long');
                            isValid = false;
                        }
                        // Also validate confirm password if it has a value
                        const confirmPassword = document.getElementById('confirmPassword');
                        if (confirmPassword.value) {
                            validateField(confirmPassword);
                        }
                        break;

                    case 'confirmPassword':
                        const password = document.getElementById('password').value;
                        if (value !== password) {
                            showError(input, 'confirmPasswordError', 'Passwords do not match');
                            isValid = false;
                        }
                        break;
                }

                return isValid;
            }

            function showError(input, errorId, message) {
                input.classList.add('error');
                const errorElement = document.getElementById(errorId);
                errorElement.textContent = message;
                errorElement.style.display = 'block';
            }

            function clearError(input) {
                input.classList.remove('error');
                const errorId = input.name + 'Error';
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.style.display = 'none';
                }
            }
        });