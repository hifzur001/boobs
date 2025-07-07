// Updated main script.js with API integration
// Pakistan data will be loaded from API
let pakistanData = { Pakistan: { cities: [] } };
let currentUser = null;
let selectedService = null;

// Load Pakistan data from API
async function loadPakistanData() {
    try {
        const response = await window.apiClient.getPakistanData();
        if (response.success) {
            pakistanData = response.data;
            localStorage.setItem('pakistanData', JSON.stringify(pakistanData));
            return pakistanData;
        }
    } catch (error) {
        console.error('Failed to load Pakistan data:', error);
        // Fallback to localStorage if API fails
        const stored = localStorage.getItem('pakistanData');
        if (stored) {
            pakistanData = JSON.parse(stored);
        }
    }
    return pakistanData;
}

// Initialize application
document.addEventListener('DOMContentLoaded', async function() {
    // Load Pakistan data first
    await loadPakistanData();
    
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // Check authentication
    checkAuthentication();
    
    // Initialize page-specific functionality
    initializePage();
    
    // Setup event listeners
    setupEventListeners();
});

// Check authentication status
async function checkAuthentication() {
    const sessionToken = localStorage.getItem('sessionToken');
    if (sessionToken) {
        try {
            const isValid = await window.checkUserSession();
            if (isValid) {
                // Load user data from localStorage (will be updated by login)
                const userData = localStorage.getItem('currentUser');
                if (userData) {
                    currentUser = JSON.parse(userData);
                    updateAuthUI();
                }
            } else {
                // Clear invalid session
                clearUserSession();
            }
        } catch (error) {
            console.error('Authentication check failed:', error);
            clearUserSession();
        }
    }
}

// Clear user session
function clearUserSession() {
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentAdmin');
    localStorage.removeItem('currentBroker');
    currentUser = null;
    updateAuthUI();
}

// Update authentication UI
function updateAuthUI() {
    const authButtons = document.getElementById('authButtons');
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');

    if (currentUser && authButtons && userMenu && userName) {
        authButtons.classList.add('d-none');
        userMenu.classList.remove('d-none');
        userName.textContent = currentUser.name;
    } else if (authButtons && userMenu) {
        authButtons.classList.remove('d-none');
        userMenu.classList.add('d-none');
    }
}

// Initialize page-specific functionality
function initializePage() {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch (currentPage) {
        case 'index.html':
        case '':
            initializeHomePage();
            break;
        case 'services.html':
            initializeServicesPage();
            break;
        case 'my-bookings.html':
            initializeMyBookingsPage();
            break;
    }
}

// Initialize home page
function initializeHomePage() {
    populateCityDropdown();
    displayCategories();
    setupCityDropdownHandler();
}

// Initialize services page
function initializeServicesPage() {
    if (typeof initializeServicesPageSpecific === 'function') {
        initializeServicesPageSpecific();
    }
}

// Initialize my bookings page
async function initializeMyBookingsPage() {
    if (currentUser) {
        await loadUserBookings();
    }
}

// Populate city dropdown
function populateCityDropdown() {
    const cityDropdown = document.getElementById('cityDropdown');
    if (!cityDropdown || !pakistanData.Pakistan) return;

    cityDropdown.innerHTML = '<option value="">Select a City</option>';
    
    pakistanData.Pakistan.cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.name;
        option.textContent = city.name;
        cityDropdown.appendChild(option);
    });
}

// Display service categories
function displayCategories() {
    const categoriesContainer = document.getElementById('categoriesContainer');
    if (!categoriesContainer || !pakistanData.Pakistan) return;

    const categories = new Set();
    pakistanData.Pakistan.cities.forEach(city => {
        city.services.forEach(service => {
            categories.add(service.type);
        });
    });

    const categoryIcons = {
        'Accommodation': 'fas fa-bed',
        'Experience': 'fas fa-compass',
        'Transportation': 'fas fa-car',
        'Wellness': 'fas fa-spa',
        'Adventure': 'fas fa-mountain',
        'Food & Dining': 'fas fa-utensils',
        'Cultural': 'fas fa-mosque',
        'Shopping': 'fas fa-shopping-bag',
        'Entertainment': 'fas fa-music',
        'Photography': 'fas fa-camera'
    };

    categoriesContainer.innerHTML = '';
    
    Array.from(categories).forEach(category => {
        const col = document.createElement('div');
        col.className = 'col-lg-2 col-md-3 col-sm-4 col-6';
        
        col.innerHTML = `
            <div class="category-card" onclick="filterByCategory('${category}')">
                <div class="category-icon">
                    <i class="${categoryIcons[category] || 'fas fa-star'} fa-2x text-green-primary"></i>
                </div>
                <h6>${category}</h6>
                <p class="small text-muted">Explore ${category.toLowerCase()} services</p>
            </div>
        `;
        
        categoriesContainer.appendChild(col);
    });
}

// Setup city dropdown handler
function setupCityDropdownHandler() {
    const cityDropdown = document.getElementById('cityDropdown');
    if (cityDropdown) {
        cityDropdown.addEventListener('change', function() {
            const selectedCity = this.value;
            if (selectedCity) {
                displayCityServices(selectedCity);
            } else {
                hideCityServices();
            }
        });
    }
}

// Display services for selected city
function displayCityServices(cityName) {
    const city = pakistanData.Pakistan.cities.find(c => c.name === cityName);
    if (!city) return;

    const welcomeMessage = document.getElementById('welcomeMessage');
    const servicesSection = document.getElementById('servicesSection');
    const cityTitle = document.getElementById('cityTitle');
    const servicesContainer = document.getElementById('servicesContainer');

    if (welcomeMessage) welcomeMessage.style.display = 'none';
    if (servicesSection) servicesSection.style.display = 'block';
    if (cityTitle) cityTitle.textContent = `Services in ${cityName}`;

    if (servicesContainer) {
        servicesContainer.innerHTML = '';
        
        city.services.forEach((service, index) => {
            const serviceCard = createServiceCard(service, index);
            servicesContainer.appendChild(serviceCard);
        });
    }
}

// Hide city services
function hideCityServices() {
    const welcomeMessage = document.getElementById('welcomeMessage');
    const servicesSection = document.getElementById('servicesSection');

    if (welcomeMessage) welcomeMessage.style.display = 'block';
    if (servicesSection) servicesSection.style.display = 'none';
}

// Create service card
function createServiceCard(service, index) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';
    col.setAttribute('data-aos', 'fade-up');
    col.setAttribute('data-aos-delay', (index % 3) * 100);

    const badgeClass = getBadgeClass(service.type);
    const priceDisplay = getPriceDisplay(service);

    col.innerHTML = `
        <div class="card service-card h-100" onclick="showServiceModal(${JSON.stringify(service).replace(/"/g, '&quot;')})">
            <img src="${service.picture}" class="card-img-top" alt="${service.title}">
            <div class="card-body">
                <span class="badge service-badge ${badgeClass} mb-2">${service.type}</span>
                <h5 class="card-title">${service.title}</h5>
                <p class="card-text">
                    <i class="fas fa-map-marker-alt text-green-primary me-2"></i>
                    ${service.location}
                </p>
                <div class="d-flex justify-content-between align-items-center mt-auto">
                    <div class="rating-stars">
                        ${generateStars(service.rating)}
                        <span class="text-muted ms-1">${service.rating}</span>
                    </div>
                    <div class="price-tag">
                        ${priceDisplay}
                    </div>
                </div>
            </div>
        </div>
    `;

    return col;
}

// Get badge class for service type
function getBadgeClass(serviceType) {
    const typeMap = {
        'Accommodation': 'badge-accommodation',
        'Experience': 'badge-experience',
        'Transportation': 'badge-transportation',
        'Wellness': 'badge-wellness',
        'Adventure': 'badge-adventure',
        'Food & Dining': 'badge-food-dining',
        'Cultural': 'badge-cultural',
        'Shopping': 'badge-shopping',
        'Entertainment': 'badge-entertainment',
        'Photography': 'badge-photography'
    };
    return typeMap[serviceType] || 'badge-accommodation';
}

// Get price display for service
function getPriceDisplay(service) {
    if (service.price_per_night) {
        return `PKR ${service.price_per_night.toLocaleString()}/night`;
    } else if (service.price_per_day) {
        return `PKR ${service.price_per_day.toLocaleString()}/day`;
    } else if (service.price_per_hour) {
        return `PKR ${service.price_per_hour.toLocaleString()}/hour`;
    } else if (service.price_per_km) {
        return `PKR ${service.price_per_km.toLocaleString()}/km`;
    } else if (service.price) {
        return `PKR ${service.price.toLocaleString()}`;
    }
    return 'Contact for Price';
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';

    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star text-warning"></i>';
    }

    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt text-warning"></i>';
    }

    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
        starsHTML += '<i class="far fa-star text-warning"></i>';
    }

    return starsHTML;
}

// Show service modal
function showServiceModal(service) {
    selectedService = service;
    
    const modal = document.getElementById('serviceModal');
    if (!modal) return;

    // Populate modal content
    document.getElementById('modalImage').src = service.picture;
    document.getElementById('modalTitle').textContent = service.title;
    document.getElementById('modalLocation').textContent = service.location;
    document.getElementById('modalRating').textContent = service.rating;
    document.getElementById('modalRatingOverlay').textContent = service.rating;
    document.getElementById('modalPrice').textContent = getPriceDisplay(service);
    document.getElementById('modalServiceTypeText').textContent = service.type;
    
    const modalBadge = document.getElementById('modalBadge');
    modalBadge.textContent = service.type;
    modalBadge.className = `badge service-badge ${getBadgeClass(service.type)}`;

    // Populate features
    const featuresContainer = document.getElementById('serviceFeatures');
    if (featuresContainer) {
        featuresContainer.innerHTML = '';
        
        const features = service.amenities || service.includes || [];
        features.forEach(feature => {
            const featureDiv = document.createElement('div');
            featureDiv.className = 'col-md-6';
            featureDiv.innerHTML = `<div class="feature-item"><i class="fas fa-check text-success me-2"></i>${feature}</div>`;
            featuresContainer.appendChild(featureDiv);
        });
    }

    // Show modal
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
}

// Initiate booking process
function initiateBooking() {
    if (!currentUser) {
        showLoginModal();
        return;
    }

    if (!selectedService) {
        alert('Please select a service first');
        return;
    }

    // Store selected service and redirect to booking page
    localStorage.setItem('selectedService', JSON.stringify(selectedService));
    window.location.href = 'booking.html';
}

// Filter by category
function filterByCategory(category) {
    // Redirect to services page with category filter
    window.location.href = `services.html?category=${encodeURIComponent(category)}`;
}

// Scroll to services section
function scrollToServices() {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Load user bookings
async function loadUserBookings() {
    if (!currentUser) return;

    try {
        const response = await window.apiClient.getUserBookings(currentUser.id);
        if (response.success) {
            displayUserBookings(response.bookings);
        }
    } catch (error) {
        console.error('Failed to load user bookings:', error);
    }
}

// Display user bookings
function displayUserBookings(bookings) {
    const bookingsContainer = document.getElementById('bookingsContainer');
    const noBookings = document.getElementById('noBookings');

    if (!bookingsContainer) return;

    if (bookings.length === 0) {
        if (bookingsContainer) bookingsContainer.style.display = 'none';
        if (noBookings) noBookings.style.display = 'block';
        return;
    }

    if (bookingsContainer) bookingsContainer.style.display = 'block';
    if (noBookings) noBookings.style.display = 'none';

    bookingsContainer.innerHTML = bookings.map(booking => createBookingCard(booking)).join('');
}

// Create booking card
function createBookingCard(booking) {
    const statusClass = getStatusClass(booking.status);
    const statusText = getStatusText(booking.status);

    return `
        <div class="card booking-card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${booking.service.picture}" alt="${booking.service.title}" class="img-fluid rounded">
                    </div>
                    <div class="col-md-6">
                        <h5 class="card-title mt-3">${booking.service.title}</h5>
                        <p class="text-muted mb-2">
                            <i class="fas fa-map-marker-alt me-2"></i>
                            ${booking.service.location}
                        </p>
                        <p class="text-muted mb-2">
                            <i class="fas fa-calendar me-2"></i>
                            ${formatDate(booking.check_in)} - ${formatDate(booking.check_out)}
                        </p>
                        <p class="text-muted mb-2">
                            <i class="fas fa-users me-2"></i>
                            ${booking.guests} Guest${booking.guests > 1 ? 's' : ''}
                        </p>
                        <span class="badge ${getBadgeClass(booking.service.type)} me-2">${booking.service.type}</span>
                        <span class="booking-status ${statusClass}">${statusText}</span>
                    </div>
                    <div class="col-md-3 text-md-end">
                        <h5 class="text-success mb-2 mt-2">${booking.total_price}</h5>
                        <p class="text-muted small mb-3">Booking ID: ${booking.id}</p>
                        <div class="d-grid gap-2">
                            <button class="btn btn-outline-primary btn-sm" onclick="viewBookingDetails('${booking.id}')">
                                <i class="fas fa-eye me-1"></i>View Details
                            </button>
                            ${booking.status === 'confirmed' ? `
                                <button class="btn btn-outline-danger btn-sm" onclick="cancelBooking('${booking.id}')">
                                    <i class="fas fa-times me-1"></i>Cancel
                                </button>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Utility functions
function getStatusClass(status) {
    const statusMap = {
        'confirmed': 'status-confirmed',
        'pending': 'status-pending',
        'cancelled': 'status-cancelled'
    };
    return statusMap[status] || 'status-pending';
}

function getStatusText(status) {
    const statusMap = {
        'confirmed': 'Confirmed',
        'pending': 'Pending',
        'cancelled': 'Cancelled'
    };
    return statusMap[status] || 'Unknown';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

// View booking details
async function viewBookingDetails(bookingId) {
    try {
        const response = await window.apiClient.getBooking(bookingId);
        if (response.success) {
            showBookingDetailsModal(response.booking);
        }
    } catch (error) {
        console.error('Failed to load booking details:', error);
        alert('Failed to load booking details');
    }
}

// Show booking details modal
function showBookingDetailsModal(booking) {
    // Implementation depends on your modal structure
    console.log('Booking details:', booking);
}

// Cancel booking
async function cancelBooking(bookingId) {
    if (!confirm('Are you sure you want to cancel this booking?')) {
        return;
    }

    try {
        const response = await window.apiClient.cancelBooking(bookingId);
        if (response.success) {
            alert('Booking cancelled successfully');
            await loadUserBookings(); // Reload bookings
        }
    } catch (error) {
        console.error('Failed to cancel booking:', error);
        alert('Failed to cancel booking');
    }
}

// Setup event listeners
function setupEventListeners() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Go to top button
    setupGoToTopButton();

    // Navbar scroll effect
    setupNavbarScrollEffect();
}

// Handle contact form submission
function handleContactForm(e) {
    e.preventDefault();
    
    // Simulate form submission
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! We will get back to you soon.');
        e.target.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Handle login
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const response = await window.apiClient.login(email, password);
        if (response.success) {
            currentUser = response.user;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            updateAuthUI();
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            if (modal) modal.hide();
            
            // Show success message
            showAlert('Login successful!', 'success');
        }
    } catch (error) {
        showAlert(error.message || 'Login failed', 'danger');
    }
}

// Handle registration
async function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        showAlert('Passwords do not match', 'danger');
        return;
    }
    
    try {
        const response = await window.apiClient.register({ name, email, phone, password });
        if (response.success) {
            currentUser = response.user;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            updateAuthUI();
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
            if (modal) modal.hide();
            
            // Show success message
            showAlert('Registration successful!', 'success');
        }
    } catch (error) {
        showAlert(error.message || 'Registration failed', 'danger');
    }
}

// Show/hide modals
function showLoginModal() {
    const modal = new bootstrap.Modal(document.getElementById('loginModal'));
    modal.show();
}

function showRegisterModal() {
    const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    if (loginModal) loginModal.hide();
    
    const modal = new bootstrap.Modal(document.getElementById('registerModal'));
    modal.show();
}

// Logout function
async function logout() {
    try {
        await window.apiClient.logout();
    } catch (error) {
        console.error('Logout error:', error);
    }
    
    clearUserSession();
    window.location.href = 'index.html';
}

// Show alert
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Setup go to top button
function setupGoToTopButton() {
    const goToTopBtn = document.getElementById('goToTop');
    if (!goToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            goToTopBtn.style.display = 'block';
            goToTopBtn.classList.add('show');
        } else {
            goToTopBtn.classList.remove('show');
            setTimeout(() => {
                if (!goToTopBtn.classList.contains('show')) {
                    goToTopBtn.style.display = 'none';
                }
            }, 300);
        }
    });

    goToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Setup navbar scroll effect
function setupNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Make functions globally available
window.showServiceModal = showServiceModal;
window.initiateBooking = initiateBooking;
window.filterByCategory = filterByCategory;
window.scrollToServices = scrollToServices;
window.showLoginModal = showLoginModal;
window.showRegisterModal = showRegisterModal;
window.logout = logout;
window.viewBookingDetails = viewBookingDetails;
window.cancelBooking = cancelBooking;