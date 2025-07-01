// Mobile menu functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Parallax effect for gradient orbs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = 0.3 + (index * 0.1);
        const yPos = -(scrolled * speed);
        const xPos = (scrolled * speed * 0.5);
        orb.style.transform = `translate(${xPos}px, ${yPos}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Smooth scroll for navigation links
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

// Scroll indicator functionality
const scrollIndicator = document.querySelector('.scroll-indicator');
scrollIndicator.addEventListener('click', () => {
    const featuresSection = document.querySelector('.features-section');
    featuresSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.backdropFilter = 'blur(30px)';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.05)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    }
});

// Interactive app icons
document.querySelectorAll('.app-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.1)';
        this.style.background = 'rgba(255, 255, 255, 0.3)';
        this.style.borderColor = 'rgba(255, 255, 255, 0.5)';
        
        // Add glow effect
        this.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.3)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.background = 'rgba(255, 255, 255, 0.1)';
        this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        this.style.boxShadow = 'none';
    });
    
    icon.addEventListener('click', function() {
        const app = this.getAttribute('data-app');
        showAppPreview(app);
    });
});

// App preview functionality
function showAppPreview(appName) {
    const apps = {
        files: { name: 'Файлы', desc: 'Храните и управляйте всеми вашими файлами' },
        bitcoin: { name: 'Bitcoin', desc: 'Запустите собственную Bitcoin ноду' },
        media: { name: 'Медиа', desc: 'Стримите фильмы и музыку' },
        ai: { name: 'ИИ', desc: 'Запускайте AI модели локально' }
    };
    
    const app = apps[appName];
    if (app) {
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'app-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <h3>${app.name}</h3>
                <p>${app.desc}</p>
                <button class="btn btn-primary">Установить</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.hero-text, .hero-visual, .floating-card, .feature-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Button hover effects with enhanced animations
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
        
        // Add gradient animation
        if (this.classList.contains('btn-primary')) {
            this.style.background = 'linear-gradient(135deg, #ec4899, #6366f1)';
        }
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        
        // Restore original gradient
        if (this.classList.contains('btn-primary')) {
            this.style.background = 'linear-gradient(135deg, #6366f1, #ec4899)';
        }
    });
});

// Floating cards interaction with enhanced effects
document.querySelectorAll('.floating-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(2deg)';
        this.style.zIndex = '10';
        this.style.background = 'rgba(255, 255, 255, 0.2)';
        this.style.borderColor = 'rgba(255, 255, 255, 0.4)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
        this.style.zIndex = '1';
        this.style.background = 'rgba(255, 255, 255, 0.1)';
        this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    });
});

// Add some interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add click effect to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add dynamic content updates
    setInterval(() => {
        const statNumber = document.querySelector('.stat-number');
        if (statNumber) {
            const currentValue = parseInt(statNumber.textContent);
            const newValue = currentValue + Math.floor(Math.random() * 2);
            statNumber.textContent = newValue + 'TB';
        }
        
        const appsCount = document.querySelector('.apps-count');
        if (appsCount) {
            const currentValue = parseInt(appsCount.textContent);
            const newValue = currentValue + Math.floor(Math.random() * 3);
            appsCount.textContent = newValue + '+';
        }
    }, 5000);
    
    // Add mouse trail effect
    let mouseTrail = [];
    const maxTrailLength = 20;
    
    document.addEventListener('mousemove', (e) => {
        const dot = document.createElement('div');
        dot.className = 'mouse-trail';
        dot.style.left = e.pageX + 'px';
        dot.style.top = e.pageY + 'px';
        document.body.appendChild(dot);
        
        mouseTrail.push(dot);
        
        if (mouseTrail.length > maxTrailLength) {
            const oldDot = mouseTrail.shift();
            oldDot.remove();
        }
        
        setTimeout(() => {
            dot.remove();
            mouseTrail = mouseTrail.filter(d => d !== dot);
        }, 1000);
    });
});

// Add CSS for enhanced effects
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .app-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 16px;
        padding: 1.5rem;
        color: white;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 10000;
        max-width: 300px;
    }
    
    .app-notification.show {
        transform: translateX(0);
    }
    
    .notification-content h3 {
        margin-bottom: 0.5rem;
        color: white;
    }
    
    .notification-content p {
        margin-bottom: 1rem;
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.9rem;
    }
    
    .mouse-trail {
        position: fixed;
        width: 4px;
        height: 4px;
        background: linear-gradient(135deg, #6366f1, #ec4899);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: trail-fade 1s linear forwards;
    }
    
    @keyframes trail-fade {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
    
    .feature-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .feature-card.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = 0.3 + (index * 0.1);
        const yPos = -(scrolled * speed);
        const xPos = (scrolled * speed * 0.5);
        orb.style.transform = `translate(${xPos}px, ${yPos}px) rotate(${scrolled * 0.1}deg)`;
    });
}, 16)); // ~60fps

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate feature cards on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });
    
    featureCards.forEach(card => cardObserver.observe(card));
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add smooth reveal animation for hero elements
const heroElements = document.querySelectorAll('.hero-text > *');
heroElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        el.style.transition = 'all 0.8s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    }, index * 200);
}); 