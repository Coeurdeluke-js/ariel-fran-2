document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // Enhanced menu toggle with fade in/out and slide effects
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        if (navLinks.classList.contains('active')) {
            // Add closing animation class (fade out and slide up)
            navLinks.classList.add('closing');
            
            // Wait for animation to complete before removing 'active'
            setTimeout(function() {
                navLinks.classList.remove('active');
                navLinks.classList.remove('closing');
            }, 500); // Match your CSS animation duration
        } else {
            // Add active class to show menu (fade in and slide down)
            navLinks.classList.add('active');
        }
    });
    
    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.add('closing');
                    setTimeout(function() {
                        navLinks.classList.remove('active');
                        navLinks.classList.remove('closing');
                    }, 500);
                }
            }
        });
    });
    
    // Rest of your existing code...
    // Back to top button, testimonial slider, video player, stats counter...
    
    // Back to top button click
    const backToTop = document.querySelector('.back-to-top');
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Testimonial slider
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.nav-dot');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.classList.remove('prev');
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Verificar que los elementos existen antes de manipularlos
        if (slides[index]) slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
        
        if (index === 0) {
            if (slides[slides.length - 1]) slides[slides.length - 1].classList.add('prev');
        } else {
            if (slides[index - 1]) slides[index - 1].classList.add('prev');
        }
    }
    
    if (dots.length > 0 && slides.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
        
        // Auto slide change
        setInterval(function() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }
    
    // Video player
    const videoContainer = document.querySelector('.video-container');
    const video = document.querySelector('.video-container video');
    const playButton = document.querySelector('.play-button');
    
    if (playButton && video) {
        playButton.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                playButton.style.opacity = '0';
            } else {
                video.pause();
                playButton.style.opacity = '1';
            }
        });
        
        video.addEventListener('ended', function() {
            playButton.style.opacity = '1';
        });
    }

    // Contador ascendente para la sección "Sobre mí"
    const statsSection = document.querySelector('#sobre-mi');
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(statNumber => {
                    const target = parseInt(statNumber.dataset.target);
                    let current = 0;
                    const duration = 2000; // Duración total de la animación en milisegundos
                    const startTime = performance.now();

                    function updateNumber(time) {
                        const elapsedTime = time - startTime;
                        if (elapsedTime > duration) {
                            statNumber.textContent = target + (target === 500 ? '+' : '');
                            return;
                        }
                        const progress = elapsedTime / duration;
                        current = Math.round(target * progress);
                        statNumber.textContent = current + (target === 500 ? '+' : '');
                        requestAnimationFrame(updateNumber);
                    }

                    requestAnimationFrame(updateNumber);
                });
                observer.unobserve(statsSection); // Detener la observación después de la animación
            }
        });
    }, { threshold: 0.5 }); // Activar cuando el 50% de la sección sea visible

    observer.observe(statsSection);
});