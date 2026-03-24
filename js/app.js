/**
 * app.js - Core UI and Interaction Logic
 */

const API_BASE_URL = 'http://localhost:5000'; // Default to localhost for web development


document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize any globally needed UI elements
    initRipples();
    
    // 2. Add an entry animation to the main container
    const container = document.querySelector('.mobile-mockup-container, .dashboard-container, .app-container');
    if (container) {
        container.style.opacity = '0';
        container.style.transform = 'scale(0.99) translateY(5px)';
        container.style.transition = 'opacity 0.3s ease-out, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        requestAnimationFrame(() => {
            container.style.opacity = '1';
            container.style.transform = 'scale(1) translateY(0)';
        });
    }
});

/**
 * Global authentication check for protected pages
 */
function checkAuth() {
    const token = localStorage.getItem('AUTH_TOKEN');
    const isLoginPage = window.location.href.includes('login.html') || window.location.href.includes('register.html');
    
    if (!token && !isLoginPage) {
        // Redirect to login if no token and not already on login/register
        window.location.href = 'login.html';
    }
}

/**
 * Navigate to a different page with a brief transition effect
 * @param {string} url - The destination URL
 */
function navigateTo(url) {
    const container = document.querySelector('.mobile-mockup-container, .dashboard-container, .app-container');
    if (container) {
        container.style.opacity = '0';
        container.style.transform = 'scale(0.99)';
        setTimeout(() => {
            window.location.href = url;
        }, 250);
    } else {
        window.location.href = url;
    }
}

/**
 * Adds material-style ripple effects to buttons
 */
function initRipples() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            let ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}
/**
 * Global logout function
 */
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear EVERYTHING from localStorage to ensure no data leaks
        localStorage.clear();
        
        // Show success feedback
        alert('Logged out successfully');
        
        // Redirect to login
        window.location.href = 'login.html';
    }
}

/**
 * Handle logout from sidebar (can be alias for logout)
 */
function handleLogout() {
    logout();
}
