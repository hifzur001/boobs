// Updated admin-script.js with API integration
let currentAdmin = null;
let allBookings = [];
let allUsers = [];
let allBrokers = [];
let allServices = [];
let currentFilter = 'all';

// Import Bootstrap
const bootstrap = window.bootstrap;

// Initialize admin panel
document.addEventListener('DOMContentLoaded', () => {
    console.log('Admin panel initializing...');

    // Check authentication
    checkAdminAuth();

    // Load all data
    loadAllData();

    // Initialize dashboard
    initializeDashboard();

    // Set up event listeners
    setupEventListeners();

    console.log('Admin panel initialized successfully');
});

// Check admin authentication
function checkAdminAuth() {
    const adminData = localStorage.getItem('currentAdmin');
    if (!adminData) {
        window.location.href = 'admin-login.html';
        return;
    }

    currentAdmin = JSON.parse(adminData);
    updateAdminInfo();
}

// Update admin info in UI
function updateAdminInfo() {
    const adminNameElement = document.getElementById('adminName');
    if (adminNameElement && currentAdmin) {
        adminNameElement.textContent = currentAdmin.name;
    }
}

// Load all data from API
async function loadAllData() {
    try {
        // Load bookings
        const bookingsResponse = await window.apiClient.getAllBookings();
        if (bookingsResponse.success) {
            allBookings = bookingsResponse.bookings;
        }

        // Load Pakistan data (includes services)
        const pakistanResponse = await window.apiClient.getPakistanData();
        if (pakistanResponse.success) {
            allServices = [];
            pakistanResponse.data.Pakistan.cities.forEach(city => {
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
            services: allServices.length,
        });
    } catch (error) {
        console.error('Failed to load data:', error);
    }
}

// Initialize dashboard with statistics
function initializeDashboard() {
    updateStatistics();
    updateRecentBookings();
    updateSystemActivity();
}

// Update statistics cards with animations
function updateStatistics() {
    // Calculate statistics
    const totalBookings = allBookings.length;
    const totalUsers = [...new Set(allBookings.map(b => b.user_id))].length;
    const activeBrokers = [...new Set(allServices.map(s => s.broker_id).filter(Boolean))].length;

    // Calculate total revenue
    let totalRevenue = 0;
    allBookings.forEach(booking => {
        const amount = Number.parseFloat(
            booking.total_price?.replace(/[^\d]/g, '') || 0
        );
        totalRevenue += amount;
    });

    // Calculate today's revenue
    const today = new Date().toDateString();
    let todayRevenue = 0;
    allBookings
        .filter(
            booking => new Date(booking.booking_date).toDateString() === today
        )
        .forEach(booking => {
            const amount = Number.parseFloat(
                booking.total_price?.replace(/[^\d]/g, '') || 0
            );
            todayRevenue += amount;
        });

    // Calculate this month's revenue
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    let monthRevenue = 0;
    allBookings
        .filter(booking => {
            const bookingDate = new Date(booking.booking_date);
            return (
                bookingDate.getMonth() === currentMonth &&
                bookingDate.getFullYear() === currentYear
            );
        })
        .forEach(booking => {
            const amount = Number.parseFloat(
                booking.total_price?.replace(/[^\d]/g, '') || 0
            );
            monthRevenue += amount;
        });

    // Calculate this year's revenue
    let yearRevenue = 0;
    allBookings
        .filter(
            booking =>
                new Date(booking.booking_date).getFullYear() === currentYear
        )
        .forEach(booking => {
            const amount = Number.parseFloat(
                booking.total_price?.replace(/[^\d]/g, '') || 0
            );
            yearRevenue += amount;
        });

    // Update UI with animations
    animateCounter('totalBookings', totalBookings);
    animateCounter('totalUsers', totalUsers);
    animateCounter('activeBrokers', activeBrokers);
    animateCounter('totalRevenue', totalRevenue, 'PKR ');
    animateCounter('todayRevenue', todayRevenue, 'PKR ');
    animateCounter('monthRevenue', monthRevenue, 'PKR ');
    animateCounter('yearRevenue', yearRevenue, 'PKR ');
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
        .sort((a, b) => new Date(b.booking_date) - new Date(a.booking_date))
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
                        booking.contact_name ||
                        booking.user_name ||
                        'Unknown Customer'
                    } • 
                    <i class="fas fa-clock me-1"></i>
                    ${new Date(booking.booking_date).toLocaleDateString()}
                </small>
            </div>
            <div class="ms-auto">
                <button class="view-btn" onclick="viewBookingDetails('${
                    booking.id
                }')">
                    <i class="fas fa-eye me-1"></i>View
                </button>
            </div>
        </div>
    `
        )
        .join('');

    recentBookingsContainer.innerHTML = bookingsHTML;
}

// Update system activity
function updateSystemActivity() {
    const systemActivityContainer = document.getElementById('systemActivity');
    if (!systemActivityContainer) return;

    const activities = [
        {
            icon: 'fas fa-users',
            title: `${[...new Set(allBookings.map(b => b.user_id))].length} Total Users`,
            time: 'System Statistics',
        },
        {
            icon: 'fas fa-user-tie',
            title: `${[...new Set(allServices.map(s => s.broker_id).filter(Boolean))].length} Total Brokers`,
            time: 'Active Partners',
        },
        {
            icon: 'fas fa-concierge-bell',
            title: `${allServices.length} Total Services`,
            time: 'Available Services',
        },
        {
            icon: 'fas fa-chart-line',
            title: 'System Running Smoothly',
            time: 'All systems operational',
        },
    ];

    const activitiesHTML = activities
        .map(
            activity => `
        <div class="activity-item">
            <div class="activity-icon">
                <i class="${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <h6>${activity.title}</h6>
                <small>${activity.time}</small>
            </div>
        </div>
    `
        )
        .join('');

    systemActivityContainer.innerHTML = activitiesHTML;
}

// Setup event listeners
function setupEventListeners() {
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
            bookings: 'Bookings Management',
            users: 'Users Management',
            brokers: 'Brokers Management',
            services: 'Services Management',
            revenue: 'Revenue Analytics',
        };
        pageTitle.textContent = titles[sectionName] || 'Dashboard';
    }

    // Load section-specific data
    switch (sectionName) {
        case 'bookings':
            loadBookingsSection();
            break;
        case 'users':
            loadUsersSection();
            break;
        case 'brokers':
            loadBrokersSection();
            break;
        case 'services':
            loadServicesSection();
            break;
        case 'revenue':
            loadRevenueSection();
            break;
    }
}

// Load bookings section
function loadBookingsSection() {
    const bookingsTable = document.getElementById('bookingsTable');
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
        .map(
            booking => `
        <tr>
            <td><strong>#${booking.id.slice(-6)}</strong></td>
            <td>${
                booking.contact_name || booking.user_name || 'Unknown'
            }</td>
            <td>${booking.service?.title || 'Unknown Service'}</td>
            <td>${booking.service?.location || 'Unknown Location'}</td>
            <td>${new Date(booking.booking_date).toLocaleDateString()}</td>
            <td><strong>${booking.total_price || 'N/A'}</strong></td>
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
    `
        )
        .join('');

    bookingsTable.innerHTML = bookingsHTML;
}

// Load services section
function loadServicesSection() {
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

// View booking details in modal
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

function showBookingDetailsModal(booking) {
    const modalBody = document.getElementById('bookingModalBody');
    if (!modalBody) return;

    const customerInfo = booking.customerInfo || JSON.parse(booking.customer_info || '{}');
    const bookingDetails = booking.bookingDetails || JSON.parse(booking.booking_details || '{}');

    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <h6 class="text-success mb-3"><i class="fas fa-info-circle me-2"></i>Booking Information</h6>
                <div class="detail-row">
                    <span class="detail-label">Booking ID</span>
                    <span class="detail-value">#${booking.id}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Status</span>
                    <span class="badge badge-${booking.status || 'pending'}">${(
        booking.status || 'pending'
    ).toUpperCase()}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Booking Date</span>
                    <span class="detail-value">${new Date(
                        booking.booking_date
                    ).toLocaleDateString()}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Total Amount</span>
                    <span class="detail-value"><strong>${
                        booking.total_price || 'N/A'
                    }</strong></span>
                </div>
            </div>
            <div class="col-md-6">
                <h6 class="text-success mb-3"><i class="fas fa-user me-2"></i>Customer Information</h6>
                <div class="detail-row">
                    <span class="detail-label">Name</span>
                    <span class="detail-value">${
                        booking.contact_name || customerInfo.name || 'N/A'
                    }</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Email</span>
                    <span class="detail-value">${
                        booking.contact_email || customerInfo.email || 'N/A'
                    }</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Phone</span>
                    <span class="detail-value">${
                        booking.contact_phone || customerInfo.phone || 'N/A'
                    }</span>
                </div>
            </div>
        </div>
        <hr class="my-4">
        <div class="row">
            <div class="col-12">
                <h6 class="text-success mb-3"><i class="fas fa-concierge-bell me-2"></i>Service Information</h6>
                <div class="detail-row">
                    <span class="detail-label">Service</span>
                    <span class="detail-value">${
                        booking.service?.title || 'Unknown Service'
                    }</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Location</span>
                    <span class="detail-value">${
                        booking.service?.location || 'Unknown Location'
                    }</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Check-in</span>
                    <span class="detail-value">${
                        booking.check_in || bookingDetails.checkIn || 'N/A'
                    }</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Check-out</span>
                    <span class="detail-value">${
                        booking.check_out || bookingDetails.checkOut || 'N/A'
                    }</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Guests</span>
                    <span class="detail-value">${
                        booking.guests || bookingDetails.guests || 'N/A'
                    }</span>
                </div>
                ${
                    booking.special_requests || bookingDetails.specialRequests
                        ? `
                <div class="detail-row">
                    <span class="detail-label">Special Requests</span>
                    <span class="detail-value">${
                        booking.special_requests ||
                        bookingDetails.specialRequests
                    }</span>
                </div>
                `
                        : ''
                }
            </div>
        </div>
    `;

    const modal = new bootstrap.Modal(document.getElementById('bookingModal'));
    modal.show();
}

function logout() {
    localStorage.removeItem('currentAdmin');
    localStorage.removeItem('sessionToken');
    window.location.href = 'admin-login.html';
}

// Make functions globally available
window.showSection = showSection;
window.viewBookingDetails = viewBookingDetails;
window.logout = logout;