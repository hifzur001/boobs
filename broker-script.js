// Enhanced Broker Panel JavaScript - Master Broker with All Cities Access
let currentBroker = null;
let allBookings = [];
let allUsers = [];
let allServices = [];
let allCities = [];
let selectedCity = '';

// Import Bootstrap
const bootstrap = window.bootstrap;

// Initialize broker panel
document.addEventListener('DOMContentLoaded', () => {
    console.log('Broker panel initializing...');

    // Check authentication
    checkBrokerAuth();

    // Load all data
    loadAllData();

    // Initialize dashboard
    initializeDashboard();

    // Set up event listeners
    setupEventListeners();

    console.log('Broker panel initialized successfully');
});

// Check broker authentication
function checkBrokerAuth() {
    const brokerData = localStorage.getItem('currentBroker');
    if (!brokerData) {
        window.location.href = 'broker-login.html';
        return;
    }

    currentBroker = JSON.parse(brokerData);
    updateBrokerInfo();
}

// Update broker info in UI
function updateBrokerInfo() {
    const brokerNameElement = document.getElementById('brokerName');
    const brokerCityElement = document.getElementById('brokerCity');
    const brokerNameTopElement = document.getElementById('brokerNameTop');

    if (currentBroker) {
        if (brokerNameElement)
            brokerNameElement.textContent = currentBroker.name;
        if (brokerCityElement)
            brokerCityElement.textContent = currentBroker.city;
        if (brokerNameTopElement)
            brokerNameTopElement.textContent = currentBroker.name;
    }
}

// Load all data from localStorage and script.js
function loadAllData() {
    // Load bookings
    allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');

    // Load users
    allUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Load services from Pakistan data (from script.js)
    const pakistanData = JSON.parse(
        localStorage.getItem('pakistanData') || '{}'
    );
    allServices = [];
    allCities = [];

    if (pakistanData.Pakistan && pakistanData.Pakistan.cities) {
        pakistanData.Pakistan.cities.forEach(city => {
            allCities.push(city.name);
            city.services.forEach(service => {
                allServices.push({
                    ...service,
                    cityName: city.name,
                });
            });
        });
    }

    console.log('Data loaded:', {
        bookings: allBookings.length,
        users: allUsers.length,
        services: allServices.length,
        cities: allCities.length,
    });
}

// Initialize dashboard with statistics
function initializeDashboard() {
    updateStatistics();
    updateRecentBookings();
    populateCitySelector();
    loadCityServices();
}

// Update statistics cards with animations
function updateStatistics() {
    // Calculate broker-related statistics
    const myServices = allServices.length;
    const myBookings = allBookings.length;
    const myCustomers = [...new Set(allBookings.map(booking => booking.userId))]
        .length;

    // Calculate total earnings (commission from all bookings)
    let myEarnings = 0;
    allBookings.forEach(booking => {
        const amount = Number.parseFloat(
            booking.totalPrice?.replace(/[^\d]/g, '') || 0
        );
        const commission = (amount * (currentBroker?.commission || 10)) / 100;
        myEarnings += commission;
    });

    // Update UI with animations
    animateCounter('myServices', myServices);
    animateCounter('myBookings', myBookings);
    animateCounter('myEarnings', myEarnings, 'PKR ');
    animateCounter('myCustomers', myCustomers);

    // Update earnings section
    animateCounter('totalEarnings', myEarnings, 'PKR ');
    animateCounter('pendingEarnings', myEarnings * 0.7, 'PKR '); // 70% pending
    animateCounter('paidEarnings', myEarnings * 0.3, 'PKR '); // 30% paid
}

// Animate counter with smooth transition
function animateCounter(elementId, targetValue, prefix = '') {
    const element = document.getElementById(elementId);
    if (!element) return;

    const startValue = 0;
    const duration = 2000;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(
            startValue + (targetValue - startValue) * easeOutQuart
        );

        if (prefix.includes('PKR')) {
            element.textContent = prefix + currentValue.toLocaleString();
        } else {
            element.textContent = prefix + currentValue;
        }

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}

// Update recent bookings section
function updateRecentBookings() {
    const recentBookingsContainer = document.getElementById('recentBookings');
    if (!recentBookingsContainer) return;

    const recentBookings = allBookings
        .sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate))
        .slice(0, 5);

    if (recentBookings.length === 0) {
        recentBookingsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-calendar-times"></i>
                <h4>No Recent Bookings</h4>
                <p>No bookings have been made yet.</p>
            </div>
        `;
        return;
    }

    const bookingsHTML = recentBookings
        .map(
            booking => `
        <div class="activity-item">
            <div class="activity-icon">
                <i class="fas fa-calendar-check"></i>
            </div>
            <div class="activity-content flex-grow-1">
                <h6>${booking.service?.title || 'Unknown Service'}</h6>
                <small>
                    <i class="fas fa-user me-1"></i>
                    ${
                        booking.contactName ||
                        booking.customerInfo?.name ||
                        'Unknown Customer'
                    } • 
                    <i class="fas fa-map-marker-alt me-1"></i>
                    ${booking.service?.location || 'Unknown Location'}
                </small>
            </div>
            <div class="ms-auto">
                <span class="badge badge-${booking.status || 'pending'}">${(
                booking.status || 'pending'
            ).toUpperCase()}</span>
            </div>
        </div>
    `
        )
        .join('');

    recentBookingsContainer.innerHTML = bookingsHTML;
}

// Populate city selector dropdown
function populateCitySelector() {
    const citySelect = document.getElementById('citySelect');
    if (!citySelect) return;

    // Clear existing options except the first one
    citySelect.innerHTML = '<option value="">Select City</option>';

    allCities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });
}

// Load city services when city is selected
function loadCityServices() {
    const cityServicesView = document.getElementById('cityServicesView');
    if (!cityServicesView) return;

    if (!selectedCity) {
        cityServicesView.innerHTML = `
            <p class="text-muted">Select a city from the dropdown above to view all services in that city.</p>
        `;
        return;
    }

    const cityServices = allServices.filter(
        service => service.cityName === selectedCity
    );

    if (cityServices.length === 0) {
        cityServicesView.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-concierge-bell"></i>
                <h4>No Services in ${selectedCity}</h4>
                <p>No services are available in this city yet.</p>
            </div>
        `;
        return;
    }

    const servicesHTML = cityServices
        .slice(0, 3)
        .map(
            service => `
        <div class="mb-3 p-3 border rounded">
            <h6 class="mb-1">${service.title}</h6>
            <small class="text-muted">${service.type} • ${
                service.location
            }</small>
            <div class="mt-2">
                <span class="badge badge-${service.type
                    .toLowerCase()
                    .replace(/\s+/g, '-')}">${service.type}</span>
                <span class="text-success fw-bold ms-2">${getPriceDisplay(
                    service
                )}</span>
            </div>
        </div>
    `
        )
        .join('');

    cityServicesView.innerHTML = `
        <h6 class="text-success mb-3">${selectedCity} Services (${
        cityServices.length
    })</h6>
        ${servicesHTML}
        ${
            cityServices.length > 3
                ? `<p class="text-muted small">And ${
                      cityServices.length - 3
                  } more services...</p>`
                : ''
        }
    `;
}

// Setup event listeners
function setupEventListeners() {
    // City selector change
    const citySelect = document.getElementById('citySelect');
    if (citySelect) {
        citySelect.addEventListener('change', function () {
            selectedCity = this.value;
            loadCityServices();
        });
    }

    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const section = this.getAttribute('onclick')?.match(
                /showSection$$'(.+)'$$/
            )?.[1];
            if (section) {
                showSection(section);
            }
        });
    });

    // Add service form
    const addServiceForm = document.getElementById('addServiceForm');
    if (addServiceForm) {
        addServiceForm.addEventListener('submit', handleAddService);
    }

    // Profile form
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileUpdate);
        loadProfileData();
    }

    // Password form
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', handlePasswordChange);
    }
}

// Show section function
function showSection(sectionName) {
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    const activeLink = document.querySelector(
        `[onclick="showSection('${sectionName}')"]`
    );
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Update page title
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) {
        const titles = {
            dashboard: 'Dashboard',
            'my-services': 'My Services',
            bookings: 'Bookings Management',
            earnings: 'Earnings & Commission',
            analytics: 'Analytics & Reports',
            customers: 'Customer Management',
            'add-service': 'Add New Service',
            profile: 'Profile Settings',
        };
        pageTitle.textContent = titles[sectionName] || 'Dashboard';
    }

    // Load section-specific data
    switch (sectionName) {
        case 'my-services':
            loadMyServicesSection();
            break;
        case 'bookings':
            loadBookingsSection();
            break;
        case 'earnings':
            loadEarningsSection();
            break;
        case 'analytics':
            loadAnalyticsSection();
            break;
        case 'customers':
            loadCustomersSection();
            break;
    }
}

// Load my services section
function loadMyServicesSection() {
    const servicesGrid = document.getElementById('servicesGrid');
    if (!servicesGrid) return;

    if (allServices.length === 0) {
        servicesGrid.innerHTML = `
            <div class="col-12">
                <div class="empty-state">
                    <i class="fas fa-concierge-bell"></i>
                    <h4>No Services Available</h4>
                    <p>No services are currently available across all cities.</p>
                </div>
            </div>
        `;
        return;
    }

    const servicesHTML = allServices
        .map(
            service => `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card service-card h-100">
                <img src="${service.picture}" class="card-img-top" alt="${
                service.title
            }" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <span class="badge service-badge badge-${service.type
                        .toLowerCase()
                        .replace(/\s+/g, '-')} mb-2">${service.type}</span>
                    <h5 class="card-title">${service.title}</h5>
                    <p class="card-text">
                        <i class="fas fa-map-marker-alt text-success me-2"></i>
                        ${service.location}, ${service.cityName}
                    </p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="rating-stars text-warning">
                            ${generateStars(service.rating)}
                            <span class="text-muted ms-1">${
                                service.rating
                            }</span>
                        </div>
                        <div class="price-tag">
                            ${getPriceDisplay(service)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
        )
        .join('');

    servicesGrid.innerHTML = servicesHTML;
}

// Load bookings section
function loadBookingsSection() {
    const bookingsTable = document.getElementById('myBookingsTable');
    if (!bookingsTable) return;

    if (allBookings.length === 0) {
        bookingsTable.innerHTML = `
            <tr>
                <td colspan="8" class="text-center">
                    <div class="empty-state">
                        <i class="fas fa-calendar-times"></i>
                        <h4>No Bookings Found</h4>
                        <p>No bookings have been made yet.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    const bookingsHTML = allBookings
        .map(booking => {
            const amount = Number.parseFloat(
                booking.totalPrice?.replace(/[^\d]/g, '') || 0
            );
            const commission =
                (amount * (currentBroker?.commission || 10)) / 100;

            return `
        <tr>
            <td><strong>#${booking.id.slice(-6)}</strong></td>
            <td>${
                booking.contactName || booking.customerInfo?.name || 'Unknown'
            }</td>
            <td>${booking.service?.title || 'Unknown Service'}</td>
            <td>${new Date(booking.bookingDate).toLocaleDateString()}</td>
            <td><strong>${booking.totalPrice || 'N/A'}</strong></td>
            <td><strong class="text-success">PKR ${commission.toLocaleString()}</strong></td>
            <td><span class="badge badge-${booking.status || 'pending'}">${(
                booking.status || 'pending'
            ).toUpperCase()}</span></td>
            <td>
                <button class="view-btn" onclick="viewBookingDetails('${
                    booking.id
                }')">
                    <i class="fas fa-eye me-1"></i>View
                </button>
            </td>
        </tr>
    `;
        })
        .join('');

    bookingsTable.innerHTML = bookingsHTML;
}

// Load earnings section
function loadEarningsSection() {
    const earningsTable = document.getElementById('earningsTable');
    if (!earningsTable) return;

    if (allBookings.length === 0) {
        earningsTable.innerHTML = `
            <tr>
                <td colspan="5" class="text-center">
                    <div class="empty-state">
                        <i class="fas fa-money-bill-wave"></i>
                        <h4>No Earnings Data</h4>
                        <p>No bookings have been made yet to generate earnings.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    const earningsHTML = allBookings
        .map(booking => {
            const amount = Number.parseFloat(
                booking.totalPrice?.replace(/[^\d]/g, '') || 0
            );
            const commission =
                (amount * (currentBroker?.commission || 10)) / 100;

            return `
        <tr>
            <td>${new Date(booking.bookingDate).toLocaleDateString()}</td>
            <td>#${booking.id.slice(-6)}</td>
            <td>${booking.service?.title || 'Unknown Service'}</td>
            <td><strong class="text-success">PKR ${commission.toLocaleString()}</strong></td>
            <td><span class="badge badge-pending">Pending</span></td>
        </tr>
    `;
        })
        .join('');

    earningsTable.innerHTML = earningsHTML;
}

// Load analytics section
function loadAnalyticsSection() {
    const servicePerformance = document.getElementById('servicePerformance');
    const monthlyEarnings = document.getElementById('monthlyEarnings');

    // Service performance by type
    const serviceTypes = {};
    allServices.forEach(service => {
        serviceTypes[service.type] = (serviceTypes[service.type] || 0) + 1;
    });

    if (servicePerformance) {
        const performanceHTML = Object.entries(serviceTypes)
            .map(
                ([type, count]) => `
        <div class="row mb-3">
            <div class="col-8">
                <strong>${type}</strong>
            </div>
            <div class="col-4 text-end">
                <span class="badge badge-confirmed">${count}</span>
            </div>
        </div>
      `
            )
            .join('');

        servicePerformance.innerHTML =
            performanceHTML ||
            '<p class="text-muted">No service data available</p>';
    }

    // Monthly earnings calculation
    const monthlyData = {};
    allBookings.forEach(booking => {
        const month = new Date(booking.bookingDate).toLocaleDateString(
            'en-US',
            { year: 'numeric', month: 'short' }
        );
        const amount = Number.parseFloat(
            booking.totalPrice?.replace(/[^\d]/g, '') || 0
        );
        const commission = (amount * (currentBroker?.commission || 10)) / 100;
        monthlyData[month] = (monthlyData[month] || 0) + commission;
    });

    if (monthlyEarnings) {
        const earningsHTML = Object.entries(monthlyData)
            .map(
                ([month, earnings]) => `
        <div class="row mb-3">
            <div class="col-6">
                <strong>${month}</strong>
            </div>
            <div class="col-6 text-end">
                <strong class="text-success">PKR ${earnings.toLocaleString()}</strong>
            </div>
        </div>
      `
            )
            .join('');

        monthlyEarnings.innerHTML =
            earningsHTML ||
            '<p class="text-muted">No earnings data available</p>';
    }
}

// Load customers section
function loadCustomersSection() {
    const customersTable = document.getElementById('customersTable');
    if (!customersTable) return;

    if (allUsers.length === 0) {
        customersTable.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">
                    <div class="empty-state">
                        <i class="fas fa-users"></i>
                        <h4>No Customers Found</h4>
                        <p>No customers have registered yet.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    const customersHTML = allUsers
        .map(user => {
            const userBookings = allBookings.filter(
                booking => booking.userId === user.id
            );
            const totalSpent = userBookings.reduce((sum, booking) => {
                return (
                    sum +
                    Number.parseFloat(
                        booking.totalPrice?.replace(/[^\d]/g, '') || 0
                    )
                );
            }, 0);
            const lastBooking =
                userBookings.length > 0
                    ? new Date(
                          userBookings[userBookings.length - 1].bookingDate
                      ).toLocaleDateString()
                    : 'Never';

            return `
        <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone || 'N/A'}</td>
            <td><span class="badge badge-confirmed">${
                userBookings.length
            }</span></td>
            <td><strong>PKR ${totalSpent.toLocaleString()}</strong></td>
            <td>${lastBooking}</td>
        </tr>
    `;
        })
        .join('');

    customersTable.innerHTML = customersHTML;
}

// Handle add service form
function handleAddService(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const serviceData = {
        id: 'service_' + Date.now(),
        title: formData.get('serviceTitle'),
        type: formData.get('serviceType'),
        location: formData.get('serviceLocation'),
        price: Number.parseFloat(formData.get('servicePrice')),
        picture: formData.get('serviceImage'),
        rating: Number.parseFloat(formData.get('serviceRating')),
        description: formData.get('serviceDescription'),
        brokerId: currentBroker.id,
        brokerName: currentBroker.name,
        brokerPhone: currentBroker.phone,
        brokerEmail: currentBroker.email,
        createdAt: new Date().toISOString(),
    };

    // Add price type
    const priceType = formData.get('priceType');
    if (priceType !== 'price') {
        serviceData[priceType] = serviceData.price;
        delete serviceData.price;
    }

    // Add to localStorage (this would normally be sent to a server)
    showAlert(
        'Service added successfully! (Note: This is a demo - service not permanently saved)',
        'success'
    );
    e.target.reset();
}

// Handle profile update
function handleProfileUpdate(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const updatedBroker = {
        ...currentBroker,
        name: formData.get('profileName'),
        phone: formData.get('profilePhone'),
    };

    localStorage.setItem('currentBroker', JSON.stringify(updatedBroker));
    currentBroker = updatedBroker;
    updateBrokerInfo();

    showAlert('Profile updated successfully!', 'success');
}

// Handle password change
function handlePasswordChange(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const currentPassword = formData.get('currentPassword');
    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmNewPassword');

    if (currentPassword !== 'broker123') {
        showAlert('Current password is incorrect!', 'danger');
        return;
    }

    if (newPassword !== confirmPassword) {
        showAlert('New passwords do not match!', 'danger');
        return;
    }

    showAlert(
        'Password changed successfully! (Note: This is a demo)',
        'success'
    );
    e.target.reset();
}

// Load profile data
function loadProfileData() {
    if (!currentBroker) return;

    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const profilePhone = document.getElementById('profilePhone');
    const profileCity = document.getElementById('profileCity');

    if (profileName) profileName.value = currentBroker.name || '';
    if (profileEmail) profileEmail.value = currentBroker.email || '';
    if (profilePhone) profilePhone.value = currentBroker.phone || '';
    if (profileCity) profileCity.value = currentBroker.city || '';
}

// Utility functions
function getPriceDisplay(service) {
    if (service.price_per_night) {
        return `PKR ${service.price_per_night.toLocaleString()}/night`;
    } else if (service.price_per_day) {
        return `PKR ${service.price_per_day.toLocaleString()}/day`;
    } else if (service.price_per_hour) {
        return `PKR ${service.price_per_hour.toLocaleString()}/hour`;
    } else if (service.price_per_km) {
        return `PKR ${service.price_per_km.toLocaleString()}/km`;
    } else {
        return `PKR ${service.price.toLocaleString()}`;
    }
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';

    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }

    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }

    return starsHTML;
}

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText =
        'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
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

function viewBookingDetails(bookingId) {
    const booking = allBookings.find(b => b.id === bookingId);
    if (!booking) return;

    const amount = Number.parseFloat(
        booking.totalPrice?.replace(/[^\d]/g, '') || 0
    );
    const commission = (amount * (currentBroker?.commission || 10)) / 100;

    const details = `
Booking Details:

ID: ${booking.id}
Customer: ${booking.contactName || booking.customerInfo?.name || 'Unknown'}
Email: ${booking.contactEmail || booking.customerInfo?.email || 'N/A'}
Phone: ${booking.contactPhone || booking.customerInfo?.phone || 'N/A'}

Service: ${booking.service?.title || 'Unknown Service'}
Location: ${booking.service?.location || 'Unknown Location'}
Check-in: ${booking.checkIn || booking.bookingDetails?.checkIn || 'N/A'}
Check-out: ${booking.checkOut || booking.bookingDetails?.checkOut || 'N/A'}
Guests: ${booking.guests || booking.bookingDetails?.guests || 'N/A'}

Total Amount: ${booking.totalPrice || 'N/A'}
Your Commission: PKR ${commission.toLocaleString()}
Status: ${booking.status || 'Pending'}
Booking Date: ${new Date(booking.bookingDate).toLocaleDateString()}

Special Requests: ${
        booking.specialRequests ||
        booking.bookingDetails?.specialRequests ||
        'None'
    }
  `;

    alert(details);
}

function filterMyBookings(status) {
    // This function would filter bookings by status
    loadBookingsSection();
}

function requestPayout() {
    showAlert(
        'Payout request submitted successfully! (Note: This is a demo)',
        'success'
    );
}

function resetForm() {
    const addServiceForm = document.getElementById('addServiceForm');
    if (addServiceForm) {
        addServiceForm.reset();
    }
}

function logout() {
    localStorage.removeItem('currentBroker');
    window.location.href = 'broker-login.html';
}

// Make functions globally available
window.showSection = showSection;
window.viewBookingDetails = viewBookingDetails;
window.filterMyBookings = filterMyBookings;
window.requestPayout = requestPayout;
window.resetForm = resetForm;
window.logout = logout;
