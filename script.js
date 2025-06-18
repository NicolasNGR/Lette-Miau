document.addEventListener('DOMContentLoaded', function () {
    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const navLinks = document.querySelectorAll('.nav-link-mobile');

    if (mobileMenuBtn && mobileNav) {
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function () {
            mobileNav.classList.toggle('active');

            // Animate hamburger menu
            const hamburgers = mobileMenuBtn.querySelectorAll('.hamburger');
            if (mobileNav.classList.contains('active')) {
                hamburgers[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                hamburgers[1].style.opacity = '0';
                hamburgers[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                hamburgers[0].style.transform = 'none';
                hamburgers[1].style.opacity = '1';
                hamburgers[2].style.transform = 'none';
            }
        });

        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileNav.classList.remove('active');
                const hamburgers = mobileMenuBtn.querySelectorAll('.hamburger');
                hamburgers[0].style.transform = 'none';
                hamburgers[1].style.opacity = '1';
                hamburgers[2].style.transform = 'none';
            });
        });
    }

    // --- Smooth Scrolling for all Navigation Links (adjusting for fixed header) ---
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    const header = document.querySelector('.header'); // Get header for height

    allNavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = header ? header.offsetHeight : 0; // Get header height, default to 0 if not found
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic validation before submission
            let formIsValid = true;
            const formInputs = this.querySelectorAll('input, select, textarea');
            formInputs.forEach(input => {
                if (!validateField(input)) {
                    formIsValid = false;
                }
            });

            if (!formIsValid) {
                alert('Por favor, preencha todos os campos obrigatórios corretamente.');
                return; // Stop submission if validation fails
            }

            // Simulate form submission
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.innerHTML = 'Enviando... ⏳';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                // Show success message
                submitBtn.innerHTML = 'Mensagem Enviada! ✅';
                submitBtn.style.backgroundColor = '#4CAF50'; // Green for success

                // Reset form and button after a delay
                setTimeout(() => {
                    this.reset(); // Reset form fields
                    submitBtn.innerHTML = originalText; // Restore original text
                    submitBtn.disabled = false; // Enable button
                    submitBtn.style.backgroundColor = '#532800'; // Restore original color

                    alert('Obrigado pela sua mensagem! Entraremos em contato em breve. 🐱');
                }, 2000); // 2 seconds after success message
            }, 1500); // Simulate 1.5 seconds for API call
        });
    }

    // --- Form Validation Functions ---
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');

    formInputs.forEach(input => {
        input.addEventListener('blur', function () {
            validateField(this);
        });

        input.addEventListener('input', function () {
            // Re-validate instantly if it's currently showing an error
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });

    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling and message
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Validation rules
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Este campo é obrigatório.';
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor, insira um e-mail válido.';
            }
        }

        if (!isValid) {
            field.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = errorMessage;
            field.parentNode.appendChild(errorDiv);
        }

        return isValid;
    }

    // --- Header background change on scroll (simpler implementation) ---
    const headerElement = document.querySelector('.header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) { // Change threshold to 50px
            headerElement.style.backgroundColor = 'rgba(255, 251, 234, 0.95)';
            headerElement.style.backdropFilter = 'blur(5px)'; // Slightly less blur
        } else {
            headerElement.style.backgroundColor = '#fffbea';
            headerElement.style.backdropFilter = 'none';
        }
    });

    // --- Initial Fade-in for key sections using CSS classes ---
    // (This part replaces the IntersectionObserver for complex animations)
    // Add a class to elements that should initially fade in (e.g., in HTML add class `fade-in-on-load`)
    // And add CSS for that class:
    // .fade-in-on-load { opacity: 0; transform: translateY(20px); transition: opacity 0.8s ease-out, transform 0.8s ease-out; }
    // .fade-in-on-load.visible { opacity: 1; transform: translateY(0); }

    // For simplicity, we'll apply it directly here without separate classes for initial load,
    // assuming they are initially invisible in CSS or have a `display: none`
    // (If the elements are already visible by default, this will just re-apply opacity/transform)

    // Simplified scroll-triggered animation (replacing the more complex IntersectionObserver for cards)
    const animateOnScrollElements = document.querySelectorAll('.about-card, .service-card, .testimonial-card, .differential-item, .differentials-highlight');

    const basicObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out'; // Ensure transition is applied
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }); // Adjust rootMargin as needed

    animateOnScrollElements.forEach(el => {
        el.style.opacity = '0'; // Start invisible
        el.style.transform = 'translateY(30px)'; // Start slightly below
        basicObserver.observe(el);
    });

    console.log('🐱 Lette e Miau website loaded successfully (simplified JS)!');
});