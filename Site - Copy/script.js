// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Form submission handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Te rugăm să completezi toate câmpurile obligatorii.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Te rugăm să introduci o adresă de email validă.');
            return;
        }
        
        // Simulate form submission
        alert('Mulțumim pentru mesaj! Te vom contacta în cel mai scurt timp.');
        
        // Reset form
        contactForm.reset();
    });
}

// Intersection Observer for fade-in animations
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
    const animateElements = document.querySelectorAll('.car-card, .feature-card, .service-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// CASCO checkbox price update
const cascoCheckbox = document.getElementById('cascoCheckbox');
const carPrice = document.getElementById('carPrice');

if (cascoCheckbox && carPrice) {
    cascoCheckbox.addEventListener('change', function() {
        if (this.checked) {
            carPrice.textContent = '79';
        } else {
            carPrice.textContent = '60';
        }
    });
}

// CASCO checkbox price update for second car
const cascoCheckbox2 = document.getElementById('cascoCheckbox2');
const carPrice2 = document.getElementById('carPrice2');

if (cascoCheckbox2 && carPrice2) {
    cascoCheckbox2.addEventListener('change', function() {
        if (this.checked) {
            carPrice2.textContent = '79';
        } else {
            carPrice2.textContent = '60';
        }
    });
}

// CASCO checkbox price update for third car
const cascoCheckbox3 = document.getElementById('cascoCheckbox3');
const carPrice3 = document.getElementById('carPrice3');

if (cascoCheckbox3 && carPrice3) {
    cascoCheckbox3.addEventListener('change', function() {
        if (this.checked) {
            carPrice3.textContent = '79';
        } else {
            carPrice3.textContent = '60';
        }
    });
}

// Reservation Modal
const reservationModal = document.getElementById('reservationModal');
const reserveButtons = document.querySelectorAll('.btn-reserve');
const modalClose = document.querySelector('.modal-close');
const modalCarName = document.getElementById('modalCarName');
const reservationForm = document.getElementById('reservationForm');
const reservationDateInput = document.getElementById('reservationDate');

// Set minimum date to today
if (reservationDateInput) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    reservationDateInput.min = `${year}-${month}-${day}`;
}

// Open modal when reserve button is clicked
reserveButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const carName = this.getAttribute('data-car');
        if (modalCarName) {
            modalCarName.textContent = carName;
        }
        // Set hidden car name field
        const formCarName = document.getElementById('formCarName');
        if (formCarName) {
            formCarName.value = carName;
        }
        // Set form subject
        const formSubject = document.getElementById('formSubject');
        if (formSubject) {
            formSubject.value = `Nouă Cerere de Rezervare - ${carName}`;
        }
        if (reservationModal) {
            reservationModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
if (modalClose) {
    modalClose.addEventListener('click', function() {
        if (reservationModal) {
            reservationModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === reservationModal) {
        reservationModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Handle form submission with Web3Forms
if (reservationForm) {
    reservationForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const date = document.getElementById('reservationDate').value;
        const name = document.getElementById('clientName').value;
        const days = document.getElementById('rentalDays').value;
        const phone = document.getElementById('clientPhone').value;
        const carName = modalCarName ? modalCarName.textContent : '';
        const formResult = document.getElementById('form-result');
        const submitButton = this.querySelector('button[type="submit"]');
        
        // Validation
        if (!date || !name || !days || !phone) {
            if (formResult) {
                formResult.textContent = 'Te rugăm să completezi toate câmpurile obligatorii.';
                formResult.style.color = '#ef4444';
                formResult.style.display = 'block';
            }
            return;
        }
        
        if (parseInt(days) < 1) {
            if (formResult) {
                formResult.textContent = 'Durata închirierii trebuie să fie de cel puțin 1 zi.';
                formResult.style.color = '#ef4444';
                formResult.style.display = 'block';
            }
            return;
        }
        
        // Phone validation (simple)
        const phoneRegex = /^[0-9\s\-\+\(\)]+$/;
        if (!phoneRegex.test(phone)) {
            if (formResult) {
                formResult.textContent = 'Te rugăm să introduci un număr de telefon valid.';
                formResult.style.color = '#ef4444';
                formResult.style.display = 'block';
            }
            return;
        }
        
        // Update hidden car name field and subject before submission
        const formCarName = document.getElementById('formCarName');
        const formSubject = document.getElementById('formSubject');
        if (formCarName) {
            formCarName.value = carName;
        }
        if (formSubject) {
            formSubject.value = `Nouă Cerere de Rezervare - ${carName}`;
        }
        
        // Disable submit button during submission
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Se trimite...';
        }
        
        // Clear previous result message
        if (formResult) {
            formResult.style.display = 'none';
        }
        
        // Prepare form data
        const formData = new FormData(this);
        
        // Send form data to Web3Forms
        try {
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Success message
                if (formResult) {
                    formResult.textContent = 'Cererea ta a fost trimisă cu succes! Te vom contacta în cel mai scurt timp.';
                    formResult.style.color = '#10b981';
                    formResult.style.display = 'block';
                }
                
                // Reset form
                this.reset();
                
                // Close modal after delay
                setTimeout(() => {
                    if (reservationModal) {
                        reservationModal.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                    if (formResult) {
                        formResult.style.display = 'none';
                    }
                }, 3000);
            } else {
                throw new Error(result.message || 'A apărut o eroare.');
            }
        } catch (error) {
            console.error('Error:', error);
            if (formResult) {
                formResult.textContent = 'A apărut o eroare la trimiterea cererii. Te rugăm să încerci din nou.';
                formResult.style.color = '#ef4444';
                formResult.style.display = 'block';
            }
        } finally {
            // Re-enable submit button
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Trimite Cererea';
            }
        }
    });
}
