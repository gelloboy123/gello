// ==========================================
// THEME TOGGLE (DARK MODE / LIGHT MODE)
// ==========================================

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

// Theme toggle function
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Update icon
    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// ==========================================
// SMOOTH SCROLLING & NAVIGATION
// ==========================================

// Get navigation elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    // Add scrolled class to navbar
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==========================================
// SKILLS SECTION - SCROLL ANIMATIONS
// ==========================================

const skillCards = document.querySelectorAll('.skill-card');
const progressBars = document.querySelectorAll('.progress-fill');

// Intersection Observer for skill cards
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate progress bars
            const progressBar = entry.target.querySelector('.progress-fill');
            if (progressBar) {
                const progress = progressBar.getAttribute('data-progress');
                setTimeout(() => {
                    progressBar.style.width = progress + '%';
                }, 200);
            }
            
            skillObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

skillCards.forEach(card => {
    skillObserver.observe(card);
});

// ==========================================
// PROJECT MODAL FUNCTIONALITY
// ==========================================

const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');

// Open modal function
function openModal(projectId) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Hide all project content
    const allProjects = document.querySelectorAll('.modal-project');
    allProjects.forEach(project => {
        project.classList.remove('active');
    });
    
    // Show selected project content
    const selectedProject = document.getElementById(projectId + 'Content');
    if (selectedProject) {
        selectedProject.classList.add('active');
    }
}

// Close modal function
function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});

// ==========================================
// CONTACT FORM VALIDATION
// ==========================================

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const successMessage = document.getElementById('successMessage');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validate individual field
function validateField(input, errorId, validationFn) {
    const errorElement = document.getElementById(errorId);
    const value = input.value.trim();
    
    if (!value) {
        errorElement.textContent = 'This field is required';
        errorElement.classList.add('show');
        input.style.borderColor = '#e74c3c';
        return false;
    } else if (validationFn && !validationFn(value)) {
        errorElement.textContent = 'Please enter a valid value';
        errorElement.classList.add('show');
        input.style.borderColor = '#e74c3c';
        return false;
    } else {
        errorElement.classList.remove('show');
        input.style.borderColor = '#27ae60';
        return true;
    }
}

// Real-time validation
nameInput.addEventListener('blur', () => {
    validateField(nameInput, 'nameError');
});

emailInput.addEventListener('blur', () => {
    validateField(emailInput, 'emailError', (value) => emailRegex.test(value));
});

messageInput.addEventListener('blur', () => {
    validateField(messageInput, 'messageError');
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateField(nameInput, 'nameError');
    const isEmailValid = validateField(emailInput, 'emailError', (value) => emailRegex.test(value));
    const isMessageValid = validateField(messageInput, 'messageError');
    
    // If all fields are valid
    if (isNameValid && isEmailValid && isMessageValid) {
        // Hide form and show success message
        contactForm.style.display = 'none';
        successMessage.classList.add('show');
        
        // Reset form after 3 seconds
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'flex';
            successMessage.classList.remove('show');
            
            // Reset input borders
            [nameInput, emailInput, messageInput].forEach(input => {
                input.style.borderColor = '';
            });
        }, 3000);
        
        // In a real application, you would send the form data to a server here
        console.log('Form submitted successfully!');
        console.log({
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value
        });
    }
});

// Remove error messages when user starts typing
[nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
        const errorId = input.id + 'Error';
        const errorElement = document.getElementById(errorId);
        errorElement.classList.remove('show');
        input.style.borderColor = '';
    });
});

// ==========================================
// SCROLL TO TOP ON PAGE LOAD
// ==========================================

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// ==========================================
// BACK TO TOP BUTTON
// ==========================================

const backToTopButton = document.getElementById('backToTop');

// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// Scroll to top when button is clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// ADDITIONAL ANIMATIONS
// ==========================================

// Fade in elements on scroll
const fadeElements = document.querySelectorAll('.project-card');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
});

// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log('%c👋 Welcome to Jolly-Ann Guarin\'s Portfolio!', 'color: #ffd700; font-size: 20px; font-weight: bold;');
console.log('%c💻 Built with HTML, CSS, and Vanilla JavaScript', 'color: #00d4ff; font-size: 14px;');
console.log('%c📧 Contact: jollyannguarin@gmail.com', 'color: #1a1a2e; font-size: 12px;');