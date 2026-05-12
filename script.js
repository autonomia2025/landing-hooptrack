document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for fixed navbar height (approx 80px)
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Mobile menu toggle (simple implementation)
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            // Very basic toggle, in real life we might want a nicer animation
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'rgba(8, 10, 15, 0.95)';
                navLinks.style.padding = '20px';
                navLinks.style.borderBottom = '1px solid #27272A';
            }
        });
    }

    // FAQ Accordion
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Close other items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Form submission prevention (demo only)
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.textContent = '¡Enviado con éxito!';
            btn.style.backgroundColor = '#22c55e';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
                form.reset();
            }, 3000);
        });
    }

    // Scroll Animations (Intersection Observer)
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .feature-card, .problem-card, .price-card, .use-case-box, .timeline-step, .tactical-separator');
    
    // Add slide-up class to those elements that don't have fade-in or slide-up yet
    animatedElements.forEach(el => {
        if (!el.classList.contains('fade-in') && !el.classList.contains('slide-up') && !el.classList.contains('tactical-separator')) {
            el.classList.add('slide-up');
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    });

    animatedElements.forEach(el => observer.observe(el));
    
    // Simple parallax effect for tactical separators
    window.addEventListener('scroll', () => {
        const separators = document.querySelectorAll('.tactical-separator');
        separators.forEach(sep => {
            const rect = sep.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                sep.classList.add('parallax-active');
            } else {
                sep.classList.remove('parallax-active');
            }
        });
    });
});
