// ===========================
// NAVBAR FUNCTIONALITY
// ===========================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

const EMAILJS_CONFIG = {
    publicKey: 'amaMIFSUWFxndNwzb',
    serviceId: 'service_12t7un7',
    templateId: 'template_l5601zs'  // ✅ add the template_ prefix (use exact ID from dashboard)
};

function isEmailJSConfigured() {
    return !Object.values(EMAILJS_CONFIG).some(value => value.startsWith('YOUR_'));
}

function initEmailJS() {
    if (window.emailjs && isEmailJSConfigured()) {
        emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
        return true;
    }

    return false;
}

const emailServiceReady = initEmailJS();

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===========================
// SMOOTH SCROLLING
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// NAVBAR BACKGROUND ON SCROLL
// ===========================

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(236, 42, 112, 0.08)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.96)';
        navbar.style.boxShadow = '0 4px 20px rgba(236, 42, 112, 0.05)';
    }

    lastScroll = currentScroll;
});

// ===========================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===========================

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
document.querySelectorAll('.about-text, .skill-category, .project-card, .cert-card, .contact-method').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===========================
// CONTACT FORM HANDLING
// ===========================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!emailServiceReady) {
            showNotification('Add your EmailJS public key, service ID, and template ID in script.js first.', 'error');
            return;
        }

        const name = this.querySelector('input[name="name"]').value.trim();
        const email = this.querySelector('input[name="email"]').value.trim();
        const message = this.querySelector('textarea[name="message"]').value.trim();

        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email', 'error');
            return;
        }

        const submitButton = this.querySelector('button[type="submit"]');
        const originalLabel = submitButton.textContent;
        const templateParams = {
            name,
            email,
            message,
            title: this.querySelector('input[name="title"]').value
        };

        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            templateParams,
            { publicKey: EMAILJS_CONFIG.publicKey }
        )
            .then(() => {
                this.reset();
                showNotification('Message sent! I\'ll get back to you soon.', 'success');
            })
            .catch((error) => {
                console.error('EmailJS error:', error);
                const details = error?.text || error?.message || error?.status || 'unknown error';
                showNotification(`Message could not be sent (${details}). Please check your EmailJS setup.`, 'error');
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalLabel;
            });
    });
}

// ===========================
// NOTIFICATION FUNCTION
// ===========================

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#06d6a0' : '#ff006e'};
        color: white;
        border-radius: 8px;
        font-weight: 600;
        z-index: 9999;
        animation: slideInRight 0.5s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// ===========================
// ACTIVE NAV LINK TRACKING
// ===========================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (pageYOffset >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.style.color = 'var(--primary-pink)';
        } else {
            link.style.color = 'var(--text-secondary)';
        }
    });
});

// ===========================
// PAGE LOAD ANIMATION
// ===========================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// ===========================
// PARTICLE EFFECT (Optional Enhancement)
// ===========================

function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    document.body.appendChild(particleContainer);
}

// ===========================
// LAZY LOADING IMAGES
// ===========================

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));

// ===========================
// SKILL HOVER EFFECT
// ===========================

document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.setAttribute('role', 'button');
    tag.setAttribute('tabindex', '0');

    const toggleActiveState = () => {
        tag.classList.toggle('is-active');
    };

    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(2deg)';
    });

    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });

    tag.addEventListener('click', toggleActiveState);

    tag.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleActiveState();
        }
    });
});

// ===========================
// PROJECT CARD HOVER EFFECT
// ===========================

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===========================
// DARK MODE PREFERENCE
// ===========================

function checkSystemPreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
    }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    checkSystemPreference();
});

// ===========================
// DOWNLOAD RESUME FUNCTIONALITY
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    // Add download resume button functionality if needed
    const resumeLink = document.querySelector('a[href*="resume"], a[href*="pdf"]');
    if (resumeLink) {
        resumeLink.addEventListener('click', function(e) {
            // Track click or add analytics
            console.log('Resume download clicked');
        });
    }
});

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===========================
// CUSTOM CURSOR EFFECT (Optional)
// ===========================

document.addEventListener('mousemove', (e) => {
    // Add cursor effect if needed
});

// ===========================
// CONSOLE EASTER EGG
// ===========================

console.log('%c✨ Welcome to Ruhani\'s Portfolio!', 'color: #ff006e; font-size: 20px; font-weight: bold;');
console.log('%cLet\'s build something amazing together! 🚀', 'color: #ff4b8e; font-size: 14px;');
console.log('%cEmail: ruhanigera7@gmail.com', 'color: #b0b8c8; font-size: 12px;');
console.log('%cGitHub: https://github.com/CodeWithRuhani', 'color: #b0b8c8; font-size: 12px;');
