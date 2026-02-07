/**
 * Valentine's Day Website - Main JavaScript
 * Handles navigation, interactive elements, and animations
 */

// DOM Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navigation
    initMobileNavigation();
    
    // Initialize interactive buttons if on proposal page
    if (document.querySelector('.proposal-section')) {
        initProposalButtons();
    }
    
    // Initialize image gallery if on memories page
    if (document.querySelector('.image-gallery')) {
        initImageGallery();
    }
    
    // Add smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Set active navigation based on current page
    setActiveNavigation();
});

/**
 * Mobile Navigation Toggle
 */
function initMobileNavigation() {
    const toggleButton = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (toggleButton && mainNav) {
        toggleButton.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.setAttribute('aria-expanded', mainNav.classList.contains('active'));
            
            // Update button icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.className = mainNav.classList.contains('active') 
                    ? 'fas fa-times' 
                    : 'fas fa-bars';
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.main-nav') && !event.target.closest('.mobile-nav-toggle')) {
                mainNav.classList.remove('active');
                toggleButton.setAttribute('aria-expanded', 'false');
                const icon = toggleButton.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        });
        
        // Close mobile menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mainNav.classList.remove('active');
                toggleButton.setAttribute('aria-expanded', 'false');
                const icon = toggleButton.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        });
    }
}

/**
 * Interactive Proposal Buttons
 */
function initProposalButtons() {
    const yesButtons = document.querySelectorAll('.btn-yes');
    const noButtons = document.querySelectorAll('.btn-no');
    
    // Yes button functionality
    yesButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create celebration effect
            createHeartExplosion();
            
            // Show success message
            showSuccessMessage();
            
            // Update button text
            this.innerHTML = 'YES! I Love You! <i class="fas fa-heart"></i>';
            this.style.background = 'linear-gradient(45deg, #ff2e7a, #ff7eb3)';
            this.style.transform = 'scale(1.1)';
            
            // Disable both buttons
            yesButtons.forEach(btn => btn.style.pointerEvents = 'none');
            noButtons.forEach(btn => btn.style.pointerEvents = 'none');
        });
    });
    
    // No button escape functionality
    noButtons.forEach(button => {
        button.addEventListener('mouseover', function() {
            moveNoButton(this);
        });
        
        button.addEventListener('touchstart', function(e) {
            moveNoButton(this);
            e.preventDefault();
        });
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            moveNoButton(this);
        });
    });
}

/**
 * Move the "No" button to a random position
 */
function moveNoButton(button) {
    const container = button.closest('.button-container') || button.parentElement;
    const containerRect = container.getBoundingClientRect();
    
    // Calculate available space
    const maxX = containerRect.width - button.offsetWidth - 20;
    const maxY = containerRect.height - button.offsetHeight - 20;
    
    // Generate random positions
    const randomX = Math.max(10, Math.floor(Math.random() * maxX));
    const randomY = Math.max(10, Math.floor(Math.random() * maxY));
    
    // Apply the new position
    button.style.position = 'absolute';
    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
    button.style.transition = 'left 0.3s ease, top 0.3s ease';
    
    // Add funny message
    const messages = [
        "Try again!",
        "Not so fast!",
        "Catch me!",
        "Almost!",
        "Too slow!",
        "Maybe later?",
        "Think again!",
        "I'm shy!"
    ];
    
    const originalText = button.textContent;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    button.textContent = randomMessage;
    
    // Reset message after delay
    setTimeout(() => {
        button.textContent = originalText;
    }, 800);
}

/**
 * Create heart explosion animation
 */
function createHeartExplosion() {
    const colors = ['#ff4d94', '#ff7eb3', '#ff2e7a', '#ff99c8'];
    
    for (let i = 0; i < 25; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤';
        heart.style.position = 'fixed';
        heart.style.fontSize = `${Math.random() * 25 + 15}px`;
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.zIndex = '9999';
        heart.style.pointerEvents = 'none';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        heart.style.opacity = '0';
        heart.style.transform = 'scale(0)';
        
        document.body.appendChild(heart);
        
        // Animate heart
        const animation = heart.animate([
            { opacity: 0, transform: 'scale(0) translateY(0)' },
            { opacity: 1, transform: 'scale(1) translateY(-20px)' },
            { opacity: 0, transform: 'scale(0.5) translateY(-100px)' }
        ], {
            duration: 1500,
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        });
        
        // Remove heart after animation
        animation.onfinish = () => heart.remove();
    }
}

/**
 * Show success message
 */
function showSuccessMessage() {
    // Create message overlay
    const overlay = document.createElement('div');
    overlay.className = 'success-overlay';
    overlay.innerHTML = `
        <div class="success-message">
            <h2>You Made My Day!</h2>
            <p>I'm the luckiest person in the world! 💕</p>
            <button class="btn btn-primary close-success">Continue</button>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .success-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            animation: fadeIn 0.5s ease;
        }
        
        .success-message {
            background: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            max-width: 500px;
            animation: popIn 0.5s ease 0.3s both;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes popIn {
            0% { transform: scale(0.5); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(overlay);
    
    // Add close functionality
    overlay.querySelector('.close-success').addEventListener('click', function() {
        overlay.remove();
        style.remove();
    });
}

/**
 * Initialize image gallery interactions
 */
function initImageGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            openLightbox(imgSrc);
        });
    });
}

/**
 * Open lightbox for images
 */
function openLightbox(imgSrc) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <img src="${imgSrc}" alt="Enlarged view">
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 90vh;
            border-radius: 10px;
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 2.5rem;
            cursor: pointer;
            transition: color 0.3s ease;
        }
        
        .lightbox-close:hover {
            color: #ff7eb3;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(lightbox);
    
    // Close lightbox on click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            lightbox.remove();
            style.remove();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            lightbox.remove();
            style.remove();
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}

/**
 * Initialize smooth scrolling
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href.startsWith('#') && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Set active navigation based on current page
 */
function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === '')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}