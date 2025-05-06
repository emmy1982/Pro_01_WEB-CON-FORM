document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper for Gallery
    const swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 1
            },
            768: {
                slidesPerView: 2
            },
            1024: {
                slidesPerView: 3
            }
        }
    });

    // Initialize Swiper for Testimonials
    const testimonialSwiper = new Swiper(".testimonialSwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2
            },
            1024: {
                slidesPerView: 3
            }
        },
        autoplay: {
            delay: 5000,
        }
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Fullscreen menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    const closeBtn = document.querySelector('.close-btn');
    const fullscreenMenu = document.querySelector('.fullscreen-menu');
    const navLinks = document.querySelectorAll('.nav-links li a');
    
    if (menuBtn && closeBtn && fullscreenMenu) {
        // Open menu
        menuBtn.addEventListener('click', () => {
            fullscreenMenu.classList.add('active');
            document.body.classList.add('no-scroll');
        });
        
        // Close menu
        closeBtn.addEventListener('click', () => {
            fullscreenMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
        
        // Close menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                fullscreenMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // Gallery filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.swiper-slide');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

            // Update Swiper after filtering
            swiper.update();
            swiper.slideTo(0);
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Appointment form validation and submission
    const appointmentForm = document.getElementById('appointmentForm');
    const successMessage = document.getElementById('success-message');
    
    if (appointmentForm) {
        // Set minimum date for appointment to today
        const preferredDateInput = document.getElementById('preferred-date');
        if (preferredDateInput) {
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            preferredDateInput.setAttribute('min', formattedDate);
        }
        
        // Validate form fields
        function validateField(field, errorId, validationFunction) {
            const errorElement = document.getElementById(errorId);
            if (!errorElement) return true; // Skip validation if error element doesn't exist
            
            const isValid = validationFunction(field.value);
            
            if (!isValid) {
                field.classList.add('input-error');
                errorElement.style.display = 'block';
                return false;
            } else {
                field.classList.remove('input-error');
                errorElement.style.display = 'none';
                return true;
            }
        }
        
        // Validation functions
        const validations = {
            name: value => value.trim().length > 2,
            email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            phone: value => /^[\d\s()+\-]{7,20}$/.test(value),
            'tattoo-style': value => value.trim().length > 0,
            'tattoo-size': value => value.trim().length > 0,
            budget: value => value.trim().length > 0,
            'preferred-date': value => value.trim().length > 0,
            'preferred-time': value => value.trim().length > 0,
            description: value => value.trim().length > 10,
            terms: value => value
        };
        
        // Form submission
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Fields to validate
            const fields = [
                { id: 'name', errorId: 'name-error' },
                { id: 'email', errorId: 'email-error' },
                { id: 'phone', errorId: 'phone-error' },
                { id: 'tattoo-style', errorId: 'tattoo-style-error' },
                { id: 'tattoo-size', errorId: 'tattoo-size-error' },
                { id: 'budget', errorId: 'budget-error' },
                { id: 'preferred-date', errorId: 'preferred-date-error' },
                { id: 'preferred-time', errorId: 'preferred-time-error' },
                { id: 'description', errorId: 'description-error' },
                { id: 'terms', errorId: 'terms-error' }
            ];
            
            // Validate all fields
            let isFormValid = true;
            fields.forEach(field => {
                const fieldElement = document.getElementById(field.id);
                if (fieldElement) {
                    const validationFunction = validations[field.id];
                    if (validationFunction) {
                        const isFieldValid = validateField(fieldElement, field.errorId, validationFunction);
                        if (!isFieldValid) {
                            isFormValid = false;
                        }
                    }
                }
            });
            
            // If all fields are valid, submit the form
            if (isFormValid) {
                // Collect form data
                const formData = new FormData(appointmentForm);
                
                // Show loading state
                const submitButton = appointmentForm.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.textContent;
                submitButton.textContent = 'Enviando...';
                submitButton.disabled = true;
                
                // Send data to server
                fetch('process_form.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    // Handle the response
                    if (data.success) {
                        // Show success message
                        appointmentForm.reset();
                        successMessage.textContent = data.message;
                        successMessage.style.display = 'block';
                        
                        // Scroll to success message
                        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        
                        // Hide success message after 5 seconds
                        setTimeout(() => {
                            successMessage.style.display = 'none';
                        }, 7000);
                    } else {
                        // Handle validation errors returned from server
                        if (data.errors) {
                            Object.keys(data.errors).forEach(field => {
                                const errorElement = document.getElementById(`${field}-error`);
                                const inputElement = document.getElementById(field);
                                if (errorElement && inputElement) {
                                    errorElement.textContent = data.errors[field];
                                    errorElement.style.display = 'block';
                                    inputElement.classList.add('input-error');
                                }
                            });
                        }
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Hubo un problema al enviar el formulario. Por favor, inténtalo de nuevo más tarde.');
                })
                .finally(() => {
                    // Reset button state
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                });
            }
        });
        
        // Add input event listeners for real-time validation
        const fieldIds = [
            'name', 'email', 'phone', 'description', 'terms',
            'tattoo-style', 'tattoo-size', 'budget', 'preferred-date', 'preferred-time'
        ];
        
        fieldIds.forEach(fieldId => {
            const fieldElement = document.getElementById(fieldId);
            if (fieldElement) {
                const eventType = fieldElement.type === 'checkbox' ? 'change' : 'input';
                fieldElement.addEventListener(eventType, function() {
                    validateField(this, `${fieldId}-error`, validations[fieldId]);
                });
            }
        });
    }

    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Add animate-on-scroll class to elements
    document.querySelectorAll('.section-title, .about-content, .team-member, .care-item').forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    // Video Modal
    const videoLinks = document.querySelectorAll('.video-link');
    const videoModal = document.getElementById('videoModal');
    const closeVideo = document.querySelector('.close-video');
    const iframe = document.getElementById('youtubeIframe');
    
    // Open modal when clicking on video link
    videoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const videoId = this.getAttribute('data-video-id');
            iframe.src = `https://www.youtube.com/embed/TP8N1a-edBE?autoplay=1&rel=0`;
            videoModal.style.display = 'block';
            document.body.classList.add('no-scroll');
        });
    });
    
    // Close modal when clicking on close button
    closeVideo.addEventListener('click', function() {
        videoModal.style.display = 'none';
        iframe.src = '';
        document.body.classList.remove('no-scroll');
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(e) {
        if (e.target == videoModal) {
            videoModal.style.display = 'none';
            iframe.src = '';
            document.body.classList.remove('no-scroll');
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.style.display === 'block') {
            videoModal.style.display = 'none';
            iframe.src = '';
            document.body.classList.remove('no-scroll');
        }
    });
}); 