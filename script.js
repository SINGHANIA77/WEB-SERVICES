// Calculator functionality
let string = "";
let buttons = document.querySelectorAll('.button');

// Toggle calculator visibility
function toggleCalculator() {
    const calculator = document.getElementById('calculator-section');
    if (calculator.style.display === 'flex') {
        calculator.style.display = 'none';
        document.body.style.overflow = 'auto';
    } else {
        calculator.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Calculator button functionality
Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.innerHTML;
        
        if (buttonText === '=') {
            try {
                // Replace display operators with JavaScript operators
                let expression = string.replace(/×/g, '*').replace(/÷/g, '/');
                string = eval(expression).toString();
                document.querySelector('#inputBox').value = string;
            } catch (error) {
                document.querySelector('#inputBox').value = "Error";
                string = "";
            }
        } else if (buttonText === 'AC') {
            string = "";
            document.querySelector('#inputBox').value = string;
        } else if (buttonText === 'DEL') {
            string = string.substring(0, string.length - 1);
            document.querySelector('#inputBox').value = string;
        } else {
            // Handle operators display
            let displayText = buttonText;
            if (buttonText === '*') displayText = '×';
            if (buttonText === '/') displayText = '÷';
            
            string = string + buttonText;
            document.querySelector('#inputBox').value = string;
        }
    });
});

// Close calculator when clicking outside
document.getElementById('calculator-section').addEventListener('click', function(e) {
    if (e.target === this) {
        toggleCalculator();
    }
});

// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Switch between login and signup modals
function switchModal(toLogin = false) {
    if (toLogin) {
        closeModal('signupModal');
        openModal('loginModal');
    } else {
        closeModal('loginModal');
        openModal('signupModal');
    }
}

// Close modals when clicking outside
document.querySelectorAll('.modal-container').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal(this.id);
        }
    });
});

// Mobile menu functionality
function toggleMobileMenu() {
    const mobileDropdown = document.getElementById('mobileDropdown');
    mobileDropdown.classList.toggle('hidden');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const mobileDropdown = document.getElementById('mobileDropdown');
    const mobileIcon = document.querySelector('.mobile-menu-icon');
    
    if (!mobileIcon.contains(e.target) && !mobileDropdown.contains(e.target)) {
        mobileDropdown.classList.add('hidden');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            document.getElementById('mobileDropdown').classList.add('hidden');
        }
    });
});

// Form submissions
document.querySelector('#contact form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Contact form submitted! (This would send an email in a real implementation)');
});

document.querySelector('#signupModal form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Signup functionality would be implemented here');
    closeModal('signupModal');
});

document.querySelector('#contact form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Contact form submitted! (This would send an email in a real implementation)');
});

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav a[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Keyboard support for calculator
document.addEventListener('keydown', function(e) {
    const calculator = document.getElementById('calculator-section');
    
    // Only handle keyboard input when calculator is open
    if (calculator.style.display !== 'flex') return;
    
    const key = e.key;
    
    // Numbers and operators
    if ('0123456789+-*/.'.includes(key)) {
        e.preventDefault();
        string += key;
        document.querySelector('#inputBox').value = string;
    }
    
    // Enter key for equals
    if (key === 'Enter') {
        e.preventDefault();
        try {
            string = eval(string).toString();
            document.querySelector('#inputBox').value = string;
        } catch (error) {
            document.querySelector('#inputBox').value = "Error";
            string = "";
        }
    }
    
    // Backspace for delete
    if (key === 'Backspace') {
        e.preventDefault();
        string = string.substring(0, string.length - 1);
        document.querySelector('#inputBox').value = string;
    }
    
    // Escape to close calculator
    if (key === 'Escape') {
        e.preventDefault();
        toggleCalculator();
    }
    
    // Clear with 'c' key
    if (key.toLowerCase() === 'c') {
        e.preventDefault();
        string = "";
        document.querySelector('#inputBox').value = string;
    }
});

// Close modals with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-container').forEach(modal => {
            if (modal.style.display === 'flex') {
                closeModal(modal.id);
            }
        });
    }
});

// Add loading animation to buttons
document.querySelectorAll('button[type="submit"]').forEach(button => {
    button.addEventListener('click', function() {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        this.disabled = true;
        
        setTimeout(() => {
            this.innerHTML = originalText;
            this.disabled = false;
        }, 2000);
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Set initial calculator display
    document.getElementById('calculator-section').style.display = 'none';
    
    // Set initial modal displays
    document.querySelectorAll('.modal-container').forEach(modal => {
        modal.style.display = 'none';
    });
    
    // Add fade-in animation to cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards for animation
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    
    console.log('Website initialized successfully!');
});

// Add these functions to your script.js file

// Theme toggle functionality
function toggleTheme() {
    const html = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    const currentTheme = html.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        html.setAttribute('data-theme', 'light');
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    }
}

// Initialize theme on page load
function initializeTheme() {
    const html = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    const savedTheme = localStorage.getItem('theme');
    
    // Check for saved theme or default to light
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    } else {
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            html.setAttribute('data-theme', 'dark');
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            html.setAttribute('data-theme', 'light');
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        }
    }
}

// Update your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme first
    initializeTheme();
    
    // Set initial calculator display
    document.getElementById('calculator-section').style.display = 'none';
    
    // Set initial modal displays
    document.querySelectorAll('.modal-container').forEach(modal => {
        modal.style.display = 'none';
    });
    
    // Add fade-in animation to cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards for animation
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    
    console.log('Website initialized successfully!');
});

// Listen for system theme changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        const savedTheme = localStorage.getItem('theme');
        if (!savedTheme) {
            if (e.matches) {
                document.documentElement.setAttribute('data-theme', 'dark');
                document.getElementById('theme-icon').className = 'fas fa-sun';
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                document.getElementById('theme-icon').className = 'fas fa-moon';
            }
        }
    });
}

$(document).ready(function () {
  const validationConfig = {
    name: {
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-Z\s'-]+$/,
      messages: {
        required: 'Name is required',
        minLength: 'Name must be at least 2 characters long',
        maxLength: 'Name cannot exceed 50 characters',
        pattern: 'Only letters, spaces, hyphens, apostrophes allowed',
      }
    },
    email: {
      maxLength: 100,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      messages: {
        required: 'Email is required',
        pattern: 'Enter a valid email address',
        maxLength: 'Email cannot exceed 100 characters'
      }
    },
    message: {
      minLength: 10,
      maxLength: 500,
      messages: {
        required: 'Message is required',
        minLength: 'Message must be at least 10 characters',
        maxLength: 'Message cannot exceed 500 characters'
      }
    }
  };

  function showError(field, message) {
    const formGroup = field.closest('.form-group');
    formGroup.addClass('has-error').removeClass('has-success');
    formGroup.find('.error-message').remove();
    field.after(`<div class="error-message">${message}</div>`);
    field.addClass('shake');
    setTimeout(() => field.removeClass('shake'), 500);
  }

  function showSuccess(field) {
    const formGroup = field.closest('.form-group');
    formGroup.removeClass('has-error').addClass('has-success');
    formGroup.find('.error-message').fadeOut(200, function () { $(this).remove(); });
  }

  function validateField(fieldId, value) {
    const field = $(`#${fieldId}`);
    let type = '';
    if (fieldId.includes('Name')) type = 'name';
    if (fieldId.includes('Email')) type = 'email';
    if (fieldId.includes('Message')) type = 'message';

    const config = validationConfig[type];
    if (!config) return true;

    if (value === '') {
      showError(field, config.messages.required);
      return false;
    }
    if (config.minLength && value.length < config.minLength) {
      showError(field, config.messages.minLength);
      return false;
    }
    if (config.maxLength && value.length > config.maxLength) {
      showError(field, config.messages.maxLength);
      return false;
    }
    if (config.pattern && !config.pattern.test(value)) {
      showError(field, config.messages.pattern);
      return false;
    }

    showSuccess(field);
    return true;
  }

  function clearValidation() {
    $('.form-group').removeClass('has-error has-success');
    $('.error-message').remove();
  }

  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    clearValidation();

    const name = $('#contactName').val().trim();
    const email = $('#contactEmail').val().trim();
    const message = $('#contactMessage').val().trim();

    const validName = validateField('contactName', name);
    const validEmail = validateField('contactEmail', email);
    const validMessage = validateField('contactMessage', message);

    if (validName && validEmail && validMessage) {
      $('#contactSubmit').html('<i class="fas fa-spinner fa-spin"></i> Sending...').prop('disabled', true);

      setTimeout(() => {
        $('#contactForm')[0].reset();
        $('#contactSubmit').html('Send Message').prop('disabled', false);
        clearValidation();

        alert('Message sent successfully!');

        if (!$('#successMessage').length) {
          $('#contactForm').before(`
            <div class="success-message" id="successMessage">
              <i class="fas fa-check-circle"></i> Message sent successfully!
            </div>
          `);
        }
        setTimeout(() => {
          $('#successMessage').fadeOut(500, function () { $(this).remove(); });
        }, 4000);
      }, 1500);
    }
  });

  $('#contactName, #contactEmail, #contactMessage').on('input blur', function () {
    const id = $(this).attr('id');
    validateField(id, $(this).val().trim());
  });

  $('#contactMessage').on('input', function () {
    const len = $(this).val().length;
    const max = 500;
    let counter = $('#messageCounter');
    if (counter.length === 0) {
      $(this).after(`<div id="messageCounter" class="character-counter"></div>`);
      counter = $('#messageCounter');
    }
    counter.text(`${len}/${max} characters`);
    if (len > max) counter.addClass('over-limit');
    else if (len > 450) counter.addClass('warning').removeClass('over-limit');
    else counter.removeClass('warning over-limit');
  });
});
