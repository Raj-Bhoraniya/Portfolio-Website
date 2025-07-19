// Get DOM elements
const header = document.getElementById('header');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const currentYearSpan = document.getElementById('current-year');
const contactForm = document.getElementById('contact-form');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

const resumeBtn = document.querySelector('.resume-btn');
const githubLinks = document.querySelectorAll('.github-link');
const linkedinLinks = document.querySelectorAll('.fa-linkedin-in');
const socialIcons = document.querySelectorAll('.social-icon');



// Resume button click handler
if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Replace with your actual resume file path
        const resumeUrl = 'assets/resume.pdf';
        
        // Create a temporary anchor element to trigger download
        const link = document.createElement('a');
        link.href = resumeUrl;
        link.download = 'Raj_Bhoraniya_Resume.pdf'; // Set the filename for download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

// GitHub links click handler
githubLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // Replace with your GitHub profile URL
        window.open('https://github.com/Raj-Bhoraniya', '_blank');
    });
});

// LinkedIn links click handler
linkedinLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // Replace with your LinkedIn profile URL
        window.open('https://linkedin.com/in/raj-bhoraniya-b13a5724a/', '_blank');
    });
});

// Social icons click handlers (general approach)
socialIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = icon.querySelector('i').classList[1];
        
        switch(platform) {
            case 'fa-github':
                window.open('https://github.com/Raj-Bhoraniya', '_blank');
                break;
            case 'fa-linkedin-in':
                window.open('https://linkedin.com/in/raj-bhoraniya-b13a5724a/', '_blank');
                break;
            case 'fa-envelope':
                 window.location.href = 'mailto:rajbhoraniya454@gmail.com';
                break;
            // Add more social platforms as needed
            default:
                break;
        }
    });
});

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't open if user clicked on a link inside the card
        if (e.target.closest('a')) return;
        
        // Get URL from data attribute
        const projectUrl = card.getAttribute('data-project-url');
        if (projectUrl) {
            window.open(projectUrl, '_blank');
        }
    });
});




// Set current year in footer
currentYearSpan.textContent = new Date().getFullYear();

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a navigation link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Projects filter
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Get filter value
        const filter = btn.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Form validation
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form inputs
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    // Reset previous error messages
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
    
    // Validate form
    let isValid = true;
    
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Name is required');
        isValid = false;
    }
    
    if (emailInput.value.trim() === '') {
        showError(emailInput, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email');
        isValid = false;
    }
    
    if (subjectInput.value.trim() === '') {
        showError(subjectInput, 'Subject is required');
        isValid = false;
    }
    
    if (messageInput.value.trim() === '') {
        showError(messageInput, 'Message is required');
        isValid = false;
    } else if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'Message must be at least 10 characters');
        isValid = false;
    }
    
    if (isValid) {
        // Form is valid, show success message
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (in a real app, you would send data to a server)
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Your message has been sent successfully!';
            successMessage.style.color = '#10b981';
            successMessage.style.padding = '1rem';
            successMessage.style.marginTop = '1rem';
            successMessage.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
            successMessage.style.borderRadius = '4px';
            successMessage.style.textAlign = 'center';
            
            // Add success message to form
            contactForm.appendChild(successMessage);
            
            // Reset button
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }, 1500);
    }
});

// Helper function to show error messages
function showError(input, message) {
    const errorMessage = input.nextElementSibling;
    errorMessage.textContent = message;
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Scroll animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .skill-card, .project-card, .testimonial-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Add initial styles for scroll animations
document.querySelectorAll('.service-card, .skill-card, .project-card, .testimonial-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Run on scroll
window.addEventListener('scroll', animateOnScroll);
// Run once on page load
window.addEventListener('load', animateOnScroll);