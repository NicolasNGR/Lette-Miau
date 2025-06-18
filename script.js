document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const navLinks = document.querySelectorAll('.nav-link-mobile');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileNav.classList.toggle('active');

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

    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    const header = document.querySelector('.header');

    allNavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let formIsValid = true;
            const formInputs = this.querySelectorAll('input, select, textarea');
            formInputs.forEach(input => {
                if (!validateField(input)) {
                    formIsValid = false;
                }
            });

            if (!formIsValid) {
                alert('Por favor, preencha todos os campos obrigatórios corretamente.');
                return;
            }

            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = 'Enviando... ⏳';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = 'Mensagem Enviada! ✅';
                submitBtn.style.backgroundColor = '#4CAF50';

                setTimeout(() => {
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '#532800';

                    alert('Obrigado pela sua mensagem! Entraremos em contato em breve. 🐱');
                }, 2000);
            }, 1500);
        });
    }

    const formInputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');

    formInputs.forEach(input => {
        input.addEventListener('blur', function () {
            validateField(this);
        });

        input.addEventListener('input', function () {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });

    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

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

    const headerElement = document.querySelector('.header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            headerElement.style.backgroundColor = 'rgba(255, 251, 234, 0.95)';
            headerElement.style.backdropFilter = 'blur(5px)';
        } else {
            headerElement.style.backgroundColor = '#fffbea';
            headerElement.style.backdropFilter = 'none';
        }
    });

    const animateOnScrollElements = document.querySelectorAll('.about-card, .service-card, .testimonial-card, .differential-item, .differentials-highlight');

    const basicObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    animateOnScrollElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        basicObserver.observe(el);
    });
});
