document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const icon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // 2. Sticky Navbar & Active Link
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Sticky Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // 4. Contact Form Submission (Prevent default for UI demo)
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Mensaje Enviado';
                btn.classList.replace('btn-primary', 'btn-gold');
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.replace('btn-gold', 'btn-primary');
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // 5. Hero Carousel
    const track = document.querySelector('.carousel-track');
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.carousel-control.next');
        const prevButton = document.querySelector('.carousel-control.prev');
        
        // Determinar cuántas imágenes mostrar basado en el ancho de la pantalla
        let slidesVisible = window.innerWidth > 992 ? 3 : (window.innerWidth > 768 ? 2 : 1);
        let currentIndex = 0;
        
        window.addEventListener('resize', () => {
            slidesVisible = window.innerWidth > 992 ? 3 : (window.innerWidth > 768 ? 2 : 1);
            updateCarousel();
        });

        const updateCarousel = () => {
            const slideWidth = slides[0].getBoundingClientRect().width;
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        };

        nextButton.addEventListener('click', () => {
            if (currentIndex < slides.length - slidesVisible) {
                currentIndex++;
            } else {
                currentIndex = 0; // Volver al inicio
            }
            updateCarousel();
        });

        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = Math.max(0, slides.length - slidesVisible); // Ir al final
            }
            updateCarousel();
        });
        
        // Auto play (opcional)
        let autoPlayInterval = setInterval(() => {
            nextButton.click();
        }, 5000);
        
        // Pausar autoplay al hacer hover
        document.querySelector('.hero-carousel-container').addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        
        document.querySelector('.hero-carousel-container').addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(() => {
                nextButton.click();
            }, 5000);
        });
    }
});
