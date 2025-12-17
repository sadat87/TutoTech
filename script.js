// Cleaned main script for TutoTech
// Loads after DOMContentLoaded to ensure elements exist

document.addEventListener('DOMContentLoaded', () => {
  // Element references
  const navLinks = document.querySelectorAll('.nav-link');
  const hamburger = document.querySelector('.hamburger');
  const navbar = document.querySelector('.navbar');
  const header = document.querySelector('.header');
  const navLoginBtn = document.querySelector('.nav-login');
  const navSignupBtn = document.querySelector('.nav-signup');

  // Basic smooth scroll for anchor links (CSS also sets scroll-behavior)
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      // update active class
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      // close mobile menu if open
      if (navbar && navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
      }
    });
  });

  // Hamburger toggle
  if (hamburger && navbar) {
    hamburger.addEventListener('click', () => {
      navbar.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  // Header hide/show on scroll
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const st = window.scrollY || document.documentElement.scrollTop;
      if (st > lastScroll && st > 200) header.style.top = '-90px';
      else header.style.top = '0';
      lastScroll = st <= 0 ? 0 : st;
      // shadow
      header.style.boxShadow = (st > 60) ? '0 6px 24px rgba(0,0,0,0.35)' : 'none';
    });
    header.style.transition = 'top 0.28s ease, box-shadow 0.28s ease';
  }

  // Header auth buttons
  function safeShowLogin() { window.location.href = 'auth/login.html'; }
  function safeShowSignup() { window.location.href = 'auth/signup.html'; }

  if (navLoginBtn) navLoginBtn.addEventListener('click', (e) => { /* allow anchor default navigation when present */ if (navLoginBtn.tagName === 'A') return; e.preventDefault(); safeShowLogin(); });
  if (navSignupBtn) navSignupBtn.addEventListener('click', (e) => { /* allow anchor default navigation when present */ if (navSignupBtn.tagName === 'A') return; e.preventDefault(); safeShowSignup(); });

  // Buttons ripple
  const buttons = document.querySelectorAll('.btn, .nav-auth-btn, .class-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      createRippleEffect(btn, e);
    });
  });

  // Class enroll links: ensure they navigate to enroll page (they are anchors already)
  document.querySelectorAll('.class-btn').forEach(el => {
    // anchors already handle navigation; nothing special needed
  });

  // Auth small handlers (if present on page)
  // (Login/Signup pages have their own controller scripts)

  // Utility: create ripple effect
  function createRippleEffect(button, event) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = (event.clientX || rect.left + rect.width/2) - rect.left - size/2;
    const y = (event.clientY || rect.top + rect.height/2) - rect.top - size/2;
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }

  // Small notification helper (used across index page)
  window.showNotification = function(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `position:fixed; top:100px; right:20px; padding:12px 16px; background:${type==='success'?'rgba(0,212,255,0.95)':'rgba(255,0,110,0.95)'}; color:#000; border-radius:8px; z-index:9999;`;
    document.body.appendChild(notification);
    setTimeout(() => { notification.style.opacity = '0'; setTimeout(()=>notification.remove(), 400); }, 2600);
  };

  // Keyboard escape to close mobile nav
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbar && navbar.classList.contains('active')) {
      navbar.classList.remove('active');
      if (hamburger) hamburger.classList.remove('active');
    }
  });

  // Page load animations (stagger simple)
  const sections = document.querySelectorAll('section');
  sections.forEach((s, i) => { s.style.opacity = '0'; s.style.transform = 'translateY(8px)'; setTimeout(()=>{ s.style.transition='opacity 500ms ease, transform 500ms cubic-bezier(.2,.9,.3,1)'; s.style.opacity='1'; s.style.transform='none'; }, 150 + i*120); });

});

// Keep global console message
console.log('TutoTech script initialized');
// ==================== SMOOTH SCROLL ENHANCEMENT ==================== 
// Enhanced scroll behavior with momentum and easing
let scrollVelocity = 0;
let lastScrollTime = 0;
let targetScrollPos = 0;
let currentScrollPos = window.scrollY;

window.addEventListener('wheel', (e) => {
    e.preventDefault();
    const deltaY = e.deltaY;
    targetScrollPos += deltaY * 0.8;
    targetScrollPos = Math.max(0, Math.min(targetScrollPos, document.documentElement.scrollHeight - window.innerHeight));
}, { passive: false });

// Smooth scroll and active link highlighting
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            updateActiveLink(this);
        }
    });
});

function updateActiveLink(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Highlight nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile hamburger menu toggle
hamburger.addEventListener('click', () => {
    document.querySelector('.navbar').classList.toggle('active');
    hamburger.classList.toggle('active');
});

// ==================== HEADER AUTH BUTTONS ==================== 
const navLoginBtn = document.querySelector('.nav-login');
const navSignupBtn = document.querySelector('.nav-signup');

if (navLoginBtn) {
    navLoginBtn.addEventListener('click', () => {
        showNotification('Login form would open here! 🔐');
    });
}

if (navSignupBtn) {
    navSignupBtn.addEventListener('click', () => {
        showNotification('Sign up form would open here! ✨');
    });
}

// ==================== HEADER EFFECTS ==================== 
const header = document.querySelector('.header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    // Header shadow on scroll
    if (scrollTop > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0, 212, 255, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }

    // Hide/show header on scroll
    if (scrollTop > lastScrollTop && scrollTop > 300) {
        header.style.top = '-100px';
    } else {
        header.style.top = '0';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

header.style.transition = 'top 0.3s ease, box-shadow 0.3s ease';

// ==================== BUTTON INTERACTIONS ==================== 
const buttons = document.querySelectorAll('.btn, .cta-btn, .auth-btn, .newsletter-form button');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-3px)';
    });

    button.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });

    button.addEventListener('click', function () {
        createRippleEffect(this, event);
    });
});

// Auth button click handlers
const authButtons = document.querySelectorAll('.auth-btn');
authButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const isTeacher = this.closest('.auth-box').querySelector('.auth-icon').textContent.includes('👨‍🏫');
        const buttonText = this.textContent;
        const userType = isTeacher ? 'Teacher' : 'Student';
        showNotification(`${userType} ${buttonText} modal would open here! 🎓`);
    });
});

// Class card click handlers
const classButtons = document.querySelectorAll('.class-btn');
classButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const classCard = this.closest('.class-card');
        const className = classCard.querySelector('h3').textContent;
        const badge = classCard.querySelector('.class-badge').textContent;
        showNotification(`Welcome to ${className} (${badge})! 📚`);
    });
});

function createRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

// ==================== FEATURE CARDS INTERACTION ==================== 
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach((card, index) => {
    // Stagger animation on load
    card.style.animation = `slideIn 0.6s ease forwards`;
    card.style.animationDelay = `${index * 0.1}s`;
    card.style.opacity = '0';

    card.addEventListener('mouseenter', function () {
        this.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.2)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.boxShadow = 'none';
    });
});

// ==================== SERVICE CARDS INTERACTION ==================== 
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach((card, index) => {
    card.style.animation = `slideInUp 0.6s ease forwards`;
    card.style.animationDelay = `${index * 0.15}s`;
    card.style.opacity = '0';
});

// ==================== FLOATING CARDS PARALLAX ==================== 
const floatingCards = document.querySelectorAll('.floating-card');

window.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    floatingCards.forEach((card, index) => {
        const moveX = (x - 0.5) * 20 * (index + 1);
        const moveY = (y - 0.5) * 20 * (index + 1);
        card.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
    });
});

// ==================== NEWSLETTER FORM ==================== 
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        if (email) {
            showNotification('Successfully subscribed!');
            this.reset();
        } else {
            showNotification('Please enter a valid email', 'error');
        }
    });
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'rgba(0, 212, 255, 0.9)' : 'rgba(255, 0, 110, 0.9)'};
        color: white;
        border-radius: 5px;
        z-index: 9999;
        animation: slideInRight 0.5s ease;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = `${entry.target.style.animationName || 'none'}`;
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .service-card').forEach(el => {
    observer.observe(el);
});

// ==================== KEYBOARD NAVIGATION ==================== 
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelector('.navbar').classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ==================== THEME AND PERFORMANCE ==================== 
// Prefers reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.style.scrollBehavior = 'auto';
    document.documentElement.style.scrollBehavior = 'auto';
}

// ==================== CTA BUTTON HOVER EFFECT ==================== 
const ctaBtn = document.querySelector('.cta-btn');
if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
        const heroSection = document.querySelector('.body-1');
        heroSection.scrollIntoView({ behavior: 'smooth' });
    });
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .nav-link.active {
        color: var(--primary-color);
    }

    .nav-link.active::after {
        width: 100%;
    }

    /* Smooth scroll timeline */
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-track {
        background: rgba(10, 14, 39, 0.5);
    }

    ::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, var(--primary-color), var(--secondary-color));
        border-radius: 10px;
        transition: all 0.3s ease;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, var(--primary-color), var(--accent-gold));
        box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
    }

    /* Firefox scrollbar */
    * {
        scrollbar-width: thin;
        scrollbar-color: var(--primary-color) rgba(10, 14, 39, 0.5);
    }

    @media (max-width: 768px) {
        .navbar {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(10, 14, 39, 0.98);
            flex-direction: column;
            padding: 2rem;
            border-bottom: 1px solid var(--border-color);
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }

        .navbar.active {
            max-height: 400px;
        }

        .nav-links {
            flex-direction: column;
            gap: 1rem;
        }

        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(10px, 10px);
        }

        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
        }
    }
`;

document.head.appendChild(style);lay = `${index * 0.2}s`;
    });

    // Animate auth boxes specifically
    const authBoxes = document.querySelectorAll('.auth-box');
    authBoxes.forEach((box, index) => {
        box.style.opacity = '0';
        box.style.animation = `slideInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`;
        box.style.animationDelay = `${0.4 + index * 0.15}s`;
    });

    // Animate class cards with stagger
    const classCards = document.querySelectorAll('.class-card');
    classCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `slideInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`;
        card.style.animationDelay = `${0.6 + index * 0.08}s`;
    });
});==================== PAGE LOAD ANIMATIONS ==================== 
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Add subtle entrance animation
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.animation = `slideInUp 0.8s ease forwards`;
        section.style.animationDelay = `${index * 0.2}s`;
    });
});

// Initialize page
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

console.log('🚀 TutoTech site loaded successfully! Premium, realistic, and futuristic design active.');
