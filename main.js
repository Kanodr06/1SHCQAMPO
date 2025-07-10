// =====================
// SHCQAMPO Website JavaScript
// =====================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSearchTags();
    initContactForm();
    initScrollAnimations();
    initMobileMenu();
    initGalleryInteraction();
    initProgressBar();
    initSmoothScroll();
});

// Search tags functionality
function initSearchTags() {
    const searchInput = document.getElementById('searchInput');
    const searchTags = document.querySelectorAll('.search-tag');
    
    searchTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const tagValue = this.dataset.tag || this.textContent.trim();
            if (searchInput) {
                searchInput.value = tagValue;
                searchInput.focus();
            }
        });
    });
    
    // Add keyboard navigation for search tags
    searchTags.forEach((tag, index) => {
        tag.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
            if (e.key === 'ArrowRight' && index < searchTags.length - 1) {
                searchTags[index + 1].focus();
            }
            if (e.key === 'ArrowLeft' && index > 0) {
                searchTags[index - 1].focus();
            }
        });
        
        // Make tags focusable
        tag.setAttribute('tabindex', '0');
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (validateForm(data)) {
                submitForm(data);
            }
        });
    }
}

function validateForm(data) {
    const errors = [];
    
    // Validate required fields
    if (!data.nombre || data.nombre.trim().length < 2) {
        errors.push('El nombre debe tener al menos 2 caracteres');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Ingrese un correo electrónico válido');
    }
    
    if (!data.telefono || data.telefono.length < 10) {
        errors.push('Ingrese un teléfono válido');
    }
    
    if (!data.servicio) {
        errors.push('Seleccione un servicio');
    }
    
    if (!data.mensaje || data.mensaje.trim().length < 10) {
        errors.push('El mensaje debe tener al menos 10 caracteres');
    }
    
    if (errors.length > 0) {
        showAlert('Por favor corrija los siguientes errores:\n' + errors.join('\n'), 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function submitForm(data) {
    // Show loading state
    const submitButton = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showAlert('¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.', 'success');
    }, 2000);
}

function showAlert(message, type = 'info') {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md transition-all duration-300 transform translate-x-full`;
    
    // Set alert style based on type
    switch (type) {
        case 'success':
            alert.className += ' bg-green-100 border border-green-400 text-green-700';
            break;
        case 'error':
            alert.className += ' bg-red-100 border border-red-400 text-red-700';
            break;
        default:
            alert.className += ' bg-blue-100 border border-blue-400 text-blue-700';
    }
    
    alert.innerHTML = `
        <div class="flex items-center">
            <div class="flex-1">${message}</div>
            <button class="ml-4 text-gray-500 hover:text-gray-700" onclick="this.parentElement.parentElement.remove()">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(alert);
    
    // Animate in
    setTimeout(() => {
        alert.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        alert.classList.add('translate-x-full');
        setTimeout(() => {
            if (alert.parentElement) {
                alert.remove();
            }
        }, 300);
    }, 5000);
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-up');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Mobile menu functionality
function initMobileMenu() {
    // This would be implemented if there was a mobile menu toggle
    // For now, we'll add responsive behavior for the navigation
    
    const nav = document.querySelector('nav');
    const navLinks = nav?.querySelectorAll('a');
    
    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('text-green-600'));
                // Add active class to clicked link
                this.classList.add('text-green-600');
            });
        });
    }
}

// Gallery interaction
function initGalleryInteraction() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                openLightbox(img.src, img.alt);
            }
        });
        
        // Add keyboard navigation
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Make gallery items focusable
        item.setAttribute('tabindex', '0');
    });
}

function openLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4';
    
    lightbox.innerHTML = `
        <div class="max-w-4xl max-h-full">
            <img src="https://hatchcanvas.com/_/assets/ab_DiUi8iBJRKYIq1h9SUxfn/keys//${src}" alt="${alt}" class="max-w-full max-h-full object-contain">
            <button class="absolute top-4 right-4 text-white text-4xl hover:text-gray-300" onclick="this.parentElement.parentElement.remove()">
                &times;
            </button>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Close on click outside
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.remove();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.parentElement) {
            lightbox.remove();
        }
    });
}

// Progress bar animation
function initProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    
    if (progressFill) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate progress to 70% (representing water efficiency)
                    const targetProgress = 0.7;
                    const circumference = 2 * Math.PI * 90; // radius is 90
                    const dashOffset = circumference - (targetProgress * circumference);
                    
                    progressFill.style.strokeDashoffset = dashOffset;
                }
            });
        });
        
        observer.observe(progressFill);
    }
}

// Smooth scroll for navigation links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Utility functions
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
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Reinitialize components that might need adjustment on resize
    initProgressBar();
}, 250));

// Performance optimization: lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[src*="keys/"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Add loading class
                img.classList.add('opacity-50');
                
                // Simulate image load
                setTimeout(() => {
                    img.classList.remove('opacity-50');
                    img.classList.add('opacity-100');
                }, 500);
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
initLazyLoading();

// Error handling
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
});

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Add focus indicators for keyboard navigation
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add CSS for keyboard navigation
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #22c55e !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(style);