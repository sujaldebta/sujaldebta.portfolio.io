// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenuIcon = mobileMenuBtn.querySelector('i');
const navLinks = document.querySelector('.nav-links');

// 1. Theme Toggle Logic
// Check for saved theme preference, otherwise use system preference
const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return 'dark'; // Always default to dark mode on first visit
};

const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update Icon
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
};

// Initialize Theme
setTheme(getPreferredTheme());

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Reload particles if function exists
    if (typeof initParticles === 'function') {
        initParticles(newTheme);
    }
});

// 2. Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Change Icon
    if (navLinks.classList.contains('active')) {
        mobileMenuIcon.classList.remove('fa-bars');
        mobileMenuIcon.classList.add('fa-xmark');
    } else {
        mobileMenuIcon.classList.remove('fa-xmark');
        mobileMenuIcon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuIcon.classList.remove('fa-xmark');
            mobileMenuIcon.classList.add('fa-bars');
        }
    });
});

// 3. Scroll Reveal Animations
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Optional: if you only want it to reveal once
        }
    });
};

const revealOptions = {
    threshold: 0.1, // Element becomes visible when 10% of it is in viewport
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// 4. Initialize Typed.js
if (document.querySelector('.typed-text')) {
    new Typed('.typed-text', {
        strings: ['Python Full Stack Developer'],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 1500,
        loop: false,
        showCursor: true,
        cursorChar: '|'
    });
}

// 5. VanillaTilt fully removed ensuring cards and containers remain perfectly stable.

// 6. Space-Type Dots Interactive Background Setup
function initParticles(theme) {
    if (typeof particlesJS === 'undefined' || !document.getElementById('particles-js')) return;
    
    // Destroy previous particles to prevent overlap
    const container = document.getElementById('particles-js');
    container.innerHTML = '';
    
    // Set colors based on the theme
    const dotColors = theme === 'dark' ? 
        ["#ffffff", "#00f0ff", "#8a2be2"] : 
        ["#1e293b", "#3b82f6", "#ec4899"]; // Dark slate, blue, pink for light mode visibility

    particlesJS('particles-js', {
        particles: {
            number: { value: 180, density: { enable: true, value_area: 800 } },
            color: { value: dotColors },
            shape: { type: "circle" },
            opacity: { value: 0.8, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
            size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.1, sync: false } },
            line_linked: { enable: false }, // Removed lines to create pure "space dots"
            move: { enable: true, speed: 0.8, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: {
            detect_on: "window",
            events: { 
                onhover: { 
                    enable: true, 
                    mode: "repulse",
                    parallax: { enable: true, force: 100, smooth: 10 } // Real 3D space movement with cursor
                }, 
                onclick: { enable: true, mode: "push" }, 
                resize: true 
            },
            modes: { 
                repulse: { distance: 80, duration: 0.4 }, // Subtle avoid effect
                push: { particles_nb: 4 } 
            }
        },
        retina_detect: true
    });
}

// Initialize on first load with current theme
initParticles(getPreferredTheme());
