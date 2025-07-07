// Admin Panel JavaScript with Enhanced UI and Modal Functionality
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

// Load all data from localStorage
function loadAllData() {
    // Load bookings
    allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');

    // Load users
    allUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Load brokers
    allBrokers = JSON.parse(localStorage.getItem('brokers') || '[]');

    // Load services from Pakistan data
    const pakistanData = JSON.parse(
        localStorage.getItem('pakistanData') || '{}'
    );
    allServices = [];
    if (pakistanData.Pakistan && pakistanData.Pakistan.cities) {
        pakistanData.Pakistan.cities.forEach(city => {
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
        brokers: allBrokers.length,
        services: allServices.length,
    });
}

// Initialize dashboard with statistics
function initializeDashboard() {
    updateStatistics();
    updateRecentBookings();
    updateSystemActivity();
    populateCityFilter();
}

// Update statistics cards with animations
function updateStatistics() {
    // Calculate statistics
    const totalBookings = allBookings.length;
    const totalUsers = allUsers.length;
    const activeBrokers = allBrokers.filter(
        broker => broker.status === 'active'
    ).length;

    // Calculate total revenue
    let totalRevenue = 0;
    allBookings.forEach(booking => {
        const amount = Number.parseFloat(
            booking.totalPrice?.replace(/[^\d]/g, '') || 0
        );
        totalRevenue += amount;
    });

    // Calculate today's revenue
    const today = new Date().toDateString();
    let todayRevenue = 0;
    allBookings
        .filter(
            booking => new Date(booking.bookingDate).toDateString() === today
        )
        .forEach(booking => {
            const amount = Number.parseFloat(
                booking.totalPrice?.replace(/[^\d]/g, '') || 0
            );
            todayRevenue += amount;
        });

    // Calculate this month's revenue
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    let monthRevenue = 0;
    allBookings
        .filter(booking => {
            const bookingDate = new Date(booking.bookingDate);
            return (
                bookingDate.getMonth() === currentMonth &&
                bookingDate.getFullYear() === currentYear
            );
        })
        .forEach(booking => {
            const amount = Number.parseFloat(
                booking.totalPrice?.replace(/[^\d]/g, '') || 0
            );
            monthRevenue += amount;
        });

    // Calculate this year's revenue
    let yearRevenue = 0;
    allBookings
        .filter(
            booking =>
                new Date(booking.bookingDate).getFullYear() === currentYear
        )
        .forEach(booking => {
            const amount = Number.parseFloat(
                booking.totalPrice?.replace(/[^\d]/g, '') || 0
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
                    <i class="fas fa-clock me-1"></i>
                    ${new Date(booking.bookingDate).toLocaleDateString()}
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
            title: `${allUsers.length} Total Users`,
            time: 'System Statistics',
        },
        {
            icon: 'fas fa-user-tie',
            title: `${allBrokers.length} Total Brokers`,
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

// Populate city filter dropdown
function populateCityFilter() {
    const cityFilter = document.getElementById('cityFilter');
    if (!cityFilter) return;

    const cities = [...new Set(allServices.map(service => service.cityName))];
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        cityFilter.appendChild(option);
    });
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
                booking.contactName || booking.customerInfo?.name || 'Unknown'
            }</td>
            <td>${booking.service?.title || 'Unknown Service'}</td>
            <td>${booking.service?.location || 'Unknown Location'}</td>
            <td>${new Date(booking.bookingDate).toLocaleDateString()}</td>
            <td><strong>${booking.totalPrice || 'N/A'}</strong></td>
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

// Load users section
function loadUsersSection() {
    const usersTable = document.getElementById('usersTable');
    if (!usersTable) return;

    if (allUsers.length === 0) {
        usersTable.innerHTML = `
            <tr>
                <td colspan="7" class="text-center">
                    <div class="empty-state">
                        <i class="fas fa-users"></i>
                        <h4>No Users Found</h4>
                        <p>No users have registered yet.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    const usersHTML = allUsers
        .map(user => {
            const userBookings = allBookings.filter(
                booking => booking.userId === user.id
            ).length;
            return `
            <tr>
                <td><strong>#${user.id.slice(-6)}</strong></td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone || 'N/A'}</td>
                <td>${new Date(user.registeredAt).toLocaleDateString()}</td>
                <td><span class="badge badge-confirmed">${userBookings}</span></td>
                <td>
                    <button class="view-btn" onclick="viewUserDetails('${
                        user.id
                    }')">
                        <i class="fas fa-eye me-1"></i>View
                    </button>
                </td>
            </tr>
        `;
        })
        .join('');

    usersTable.innerHTML = usersHTML;
}

// Load brokers section
function loadBrokersSection() {
    const brokersTable = document.getElementById('brokersTable');
    if (!brokersTable) return;

    if (allBrokers.length === 0) {
        brokersTable.innerHTML = `
            <tr>
                <td colspan="8" class="text-center">
                    <div class="empty-state">
                        <i class="fas fa-user-tie"></i>
                        <h4>No Brokers Found</h4>
                        <p>No brokers have been registered yet.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    const brokersHTML = allBrokers
        .map(broker => {
            const brokerServices = allServices.filter(
                service => service.brokerId === broker.id
            ).length;
            return `
            <tr>
                <td><strong>#${broker.id.slice(-6)}</strong></td>
                <td>${broker.name}</td>
                <td>${broker.email}</td>
                <td>${broker.city}</td>
                <td><span class="badge badge-confirmed">${brokerServices}</span></td>
                <td>${broker.commission}%</td>
                <td><span class="badge badge-${
                    broker.status
                }">${broker.status.toUpperCase()}</span></td>
                <td>
                    <button class="view-btn" onclick="viewBrokerDetails('${
                        broker.id
                    }')">
                        <i class="fas fa-eye me-1"></i>View
                    </button>
                </td>
            </tr>
        `;
        })
        .join('');

    brokersTable.innerHTML = brokersHTML;
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
                    <h4>No Services Found</h4>
                    <p>No services are available yet.</p>
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
                        <button class="view-btn" onclick="viewServiceDetails('${
                            service.id
                        }')">
                            <i class="fas fa-eye me-1"></i>View
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
        )
        .join('');

    servicesGrid.innerHTML = servicesHTML;
}

// Load revenue section
function loadRevenueSection() {
    // Revenue section is already updated in updateStatistics
    const revenueChart = document.getElementById('revenueChart');
    if (!revenueChart) return;

    // Create a simple revenue breakdown
    const revenueByCity = {};
    allBookings.forEach(booking => {
        const city =
            booking.service?.location?.split(',').pop()?.trim() || 'Unknown';
        const amount = Number.parseFloat(
            booking.totalPrice?.replace(/[^\d]/g, '') || 0
        );
        revenueByCity[city] = (revenueByCity[city] || 0) + amount;
    });

    const chartHTML = Object.entries(revenueByCity)
        .map(
            ([city, revenue]) => `
        <div class="row mb-3">
            <div class="col-6">
                <strong>${city}</strong>
            </div>
            <div class="col-6 text-end">
                <strong>PKR ${revenue.toLocaleString()}</strong>
            </div>
        </div>
    `
        )
        .join('');

    revenueChart.innerHTML =
        chartHTML || '<p class="text-muted">No revenue data available</p>';
}

// Generate stars for rating
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
function viewBookingDetails(bookingId) {
    const booking = allBookings.find(b => b.id === bookingId);
    if (!booking) return;

    const modalBody = document.getElementById('bookingModalBody');
    if (!modalBody) return;

    const customerInfo = booking.customerInfo || {};
    const bookingDetails = booking.bookingDetails || {};

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
                        booking.bookingDate
                    ).toLocaleDateString()}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Total Amount</span>
                    <span class="detail-value"><strong>${
                        booking.totalPrice || 'N/A'
                    }</strong></span>
                </div>
            </div>
            <div class="col-md-6">
                <h6 class="text-success mb-3"><i class="fas fa-user me-2"></i>Customer Information</h6>
                <div class="detail-row">
                    <span class="detail-label">Name</span>
                    <span class="detail-value">${
                        booking.contactName || customerInfo.name || 'N/A'
                    }</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Email</span>
                    <span class="detail-value">${
                        booking.contactEmail || customerInfo.email || 'N/A'
                    }</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Phone</span>
                    <span class="detail-value">${
                        booking.contactPhone || customerInfo.phone || 'N/A'
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
                        booking.checkIn || bookingDetails.checkIn || 'N/A'
                    }</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Check-out</span>
                    <span class="detail-value">${
                        booking.checkOut || bookingDetails.checkOut || 'N/A'
                    }</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Guests</span>
                    <span class="detail-value">${
                        booking.guests || bookingDetails.guests || 'N/A'
                    }</span>
                </div>
                ${
                    booking.specialRequests || bookingDetails.specialRequests
                        ? `
                <div class="detail-row">
                    <span class="detail-label">Special Requests</span>
                    <span class="detail-value">${
                        booking.specialRequests ||
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

// View user details in modal
function viewUserDetails(userId) {
    const user = allUsers.find(u => u.id === userId);
    if (!user) return;

    const modalBody = document.getElementById('userModalBody');
    if (!modalBody) return;

    const userBookings = allBookings.filter(
        booking => booking.userId === userId
    );
    const totalSpent = userBookings.reduce((sum, booking) => {
        return (
            sum +
            Number.parseFloat(booking.totalPrice?.replace(/[^\d]/g, '') || 0)
        );
    }, 0);

    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <h6 class="text-success mb-3"><i class="fas fa-user me-2"></i>User Information</h6>
                <div class="detail-row">
                    <span class="detail-label">User ID</span>
                    <span class="detail-value">#${user.id}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Name</span>
                    <span class="detail-value">${user.name}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Email</span>
                    <span class="detail-value">${user.email}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Phone</span>
                    <span class="detail-value">${user.phone || 'N/A'}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Registered</span>
                    <span class="detail-value">${new Date(
                        user.registeredAt
                    ).toLocaleDateString()}</span>
                </div>
            </div>
            <div class="col-md-6">
                <h6 class="text-success mb-3"><i class="fas fa-chart-bar me-2"></i>Statistics</h6>
                <div class="detail-row">
                    <span class="detail-label">Total Bookings</span>
                    <span class="detail-value"><strong>${
                        userBookings.length
                    }</strong></span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Total Spent</span>
                    <span class="detail-value"><strong>PKR ${totalSpent.toLocaleString()}</strong></span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Last Booking</span>
                    <span class="detail-value">${
                        userBookings.length > 0
                            ? new Date(
                                  userBookings[
                                      userBookings.length - 1
                                  ].bookingDate
                              ).toLocaleDateString()
                            : 'Never'
                    }</span>
                </div>
            </div>
        </div>
        ${
            userBookings.length > 0
                ? `
        <hr class="my-4">
        <div class="row">
            <div class="col-12">
                <h6 class="text-success mb-3"><i class="fas fa-history me-2"></i>Recent Bookings</h6>
                <div class="table-responsive">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${userBookings
                                .slice(-5)
                                .map(
                                    booking => `
                                <tr>
                                    <td>${
                                        booking.service?.title || 'Unknown'
                                    }</td>
                                    <td>${new Date(
                                        booking.bookingDate
                                    ).toLocaleDateString()}</td>
                                    <td>${booking.totalPrice || 'N/A'}</td>
                                    <td><span class="badge badge-${
                                        booking.status || 'pending'
                                    }">${(
                                        booking.status || 'pending'
                                    ).toUpperCase()}</span></td>
                                </tr>
                            `
                                )
                                .join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        `
                : ''
        }
    `;

    const modal = new bootstrap.Modal(document.getElementById('userModal'));
    modal.show();
}

// View broker details in modal
function viewBrokerDetails(brokerId) {
    const broker = allBrokers.find(b => b.id === brokerId);
    if (!broker) return;

    const modalBody = document.getElementById('brokerModalBody');
    if (!modalBody) return;

    const brokerServices = allServices.filter(
        service => service.brokerId === brokerId
    );
    const brokerBookings = allBookings.filter(
        booking => booking.service?.brokerId === brokerId
    );
    const totalEarnings = brokerBookings.reduce((sum, booking) => {
        const amount = Number.parseFloat(
            booking.totalPrice?.replace(/[^\d]/g, '') || 0
        );
        return sum + (amount * broker.commission) / 100;
    }, 0);

    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <h6 class="text-success mb-3"><i class="fas fa-user-tie me-2"></i>Broker Information</h6>
                <div class="detail-row">
                    <span class="detail-label">Broker ID</span>
                    <span class="detail-value">#${broker.id}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Name</span>
                    <span class="detail-value">${broker.name}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Email</span>
                    <span class="detail-value">${broker.email}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Phone</span>
                    <span class="detail-value">${broker.phone || 'N/A'}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">City</span>
                    <span class="detail-value">${broker.city}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Status</span>
                    <span class="badge badge-${
                        broker.status
                    }">${broker.status.toUpperCase()}</span>
                </div>
            </div>
            <div class="col-md-6">
                <h6 class="text-success mb-3"><i class="fas fa-chart-line me-2"></i>Performance</h6>
                <div class="detail-row">
                    <span class="detail-label">Total Services</span>
                    <span class="detail-value"><strong>${
                        brokerServices.length
                    }</strong></span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Total Bookings</span>
                    <span class="detail-value"><strong>${
                        brokerBookings.length
                    }</strong></span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Commission Rate</span>
                    <span class="detail-value"><strong>${
                        broker.commission
                    }%</strong></span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Total Earnings</span>
                    <span class="detail-value"><strong>PKR ${totalEarnings.toLocaleString()}</strong></span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Joined</span>
                    <span class="detail-value">${new Date(
                        broker.createdAt
                    ).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
        ${
            brokerServices.length > 0
                ? `
        <hr class="my-4">
        <div class="row">
            <div class="col-12">
                <h6 class="text-success mb-3"><i class="fas fa-concierge-bell me-2"></i>Services Offered</h6>
                <div class="row">
                    ${brokerServices
                        .slice(0, 6)
                        .map(
                            service => `
                        <div class="col-md-4 mb-3">
                            <div class="card">
                                <div class="card-body p-3">
                                    <h6 class="card-title">${service.title}</h6>
                                    <p class="card-text small text-muted">${service.type}</p>
                                    <p class="card-text small">${service.location}</p>
                                </div>
                            </div>
                        </div>
                    `
                        )
                        .join('')}
                </div>
                ${
                    brokerServices.length > 6
                        ? `<p class="text-muted">And ${
                              brokerServices.length - 6
                          } more services...</p>`
                        : ''
                }
            </div>
        </div>
        `
                : ''
        }
    `;

    const modal = new bootstrap.Modal(document.getElementById('brokerModal'));
    modal.show();
}

// View service details in modal
function viewServiceDetails(serviceId) {
    const service = allServices.find(s => s.id === serviceId);
    if (!service) return;

    const modalBody = document.getElementById('serviceDetailsModalBody');
    if (!modalBody) return;

    const serviceBookings = allBookings.filter(
        booking => booking.serviceId === serviceId
    );
    const broker = allBrokers.find(b => b.id === service.brokerId);

    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${
                    service.picture
                }" class="img-fluid rounded mb-3" alt="${service.title}">
                <h6 class="text-success mb-3"><i class="fas fa-info-circle me-2"></i>Service Information</h6>
                <div class="detail-row">
                    <span class="detail-label">Service ID</span>
                    <span class="detail-value">#${service.id}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Title</span>
                    <span class="detail-value">${service.title}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Type</span>
                    <span class="badge badge-${service.type
                        .toLowerCase()
                        .replace(/\s+/g, '-')}">${service.type}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Location</span>
                    <span class="detail-value">${service.location}, ${
        service.cityName
    }</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Rating</span>
                    <span class="detail-value">
                        <span class="text-warning">${generateStars(
                            service.rating
                        )}</span>
                        ${service.rating}
                    </span>
                </div>
            </div>
            <div class="col-md-6">
                <h6 class="text-success mb-3"><i class="fas fa-user-tie me-2"></i>Broker Information</h6>
                ${
                    broker
                        ? `
                <div class="detail-row">
                    <span class="detail-label">Broker Name</span>
                    <span class="detail-value">${broker.name}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Contact</span>
                    <span class="detail-value">${broker.phone}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Email</span>
                    <span class="detail-value">${broker.email}</span>
                </div>
                `
                        : '<p class="text-muted">Broker information not available</p>'
                }
                
                <h6 class="text-success mb-3 mt-4"><i class="fas fa-chart-bar me-2"></i>Statistics</h6>
                <div class="detail-row">
                    <span class="detail-label">Total Bookings</span>
                    <span class="detail-value"><strong>${
                        serviceBookings.length
                    }</strong></span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Revenue Generated</span>
                    <span class="detail-value"><strong>PKR ${serviceBookings
                        .reduce(
                            (sum, booking) =>
                                sum +
                                Number.parseFloat(
                                    booking.totalPrice?.replace(/[^\d]/g, '') ||
                                        0
                                ),
                            0
                        )
                        .toLocaleString()}</strong></span>
                </div>
            </div>
        </div>
        <hr class="my-4">
        <div class="row">
            <div class="col-12">
                <h6 class="text-success mb-3"><i class="fas fa-align-left me-2"></i>Description</h6>
                <p>${service.description || 'No description available'}</p>
                
                ${
                    service.amenities && service.amenities.length > 0
                        ? `
                <h6 class="text-success mb-3 mt-4"><i class="fas fa-check-circle me-2"></i>Amenities</h6>
                <div class="row">
                    ${service.amenities
                        .map(
                            amenity => `
                        <div class="col-md-6 mb-2">
                            <i class="fas fa-check text-success me-2"></i>${amenity}
                        </div>
                    `
                        )
                        .join('')}
                </div>
                `
                        : ''
                }
                
                ${
                    service.includes && service.includes.length > 0
                        ? `
                <h6 class="text-success mb-3 mt-4"><i class="fas fa-gift me-2"></i>Includes</h6>
                <div class="row">
                    ${service.includes
                        .map(
                            item => `
                        <div class="col-md-6 mb-2">
                            <i class="fas fa-plus text-success me-2"></i>${item}
                        </div>
                    `
                        )
                        .join('')}
                </div>
                `
                        : ''
                }
            </div>
        </div>
    `;

    const modal = new bootstrap.Modal(
        document.getElementById('serviceDetailsModal')
    );
    modal.show();
}

// Filter functions
function filterBookings(status) {
    currentFilter = status;
    const filteredBookings =
        status === 'all'
            ? allBookings
            : allBookings.filter(booking => booking.status === status);

    const bookingsTable = document.getElementById('bookingsTable');
    if (!bookingsTable) return;

    if (filteredBookings.length === 0) {
        bookingsTable.innerHTML = `
            <tr>
                <td colspan="8" class="text-center">
                    <div class="empty-state">
                        <i class="fas fa-calendar-times"></i>
                        <h4>No ${
                            status === 'all'
                                ? ''
                                : status.charAt(0).toUpperCase() +
                                  status.slice(1)
                        } Bookings Found</h4>
                        <p>No bookings match the selected filter.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    const bookingsHTML = filteredBookings
        .map(
            booking => `
        <tr>
            <td><strong>#${booking.id.slice(-6)}</strong></td>
            <td>${
                booking.contactName || booking.customerInfo?.name || 'Unknown'
            }</td>
            <td>${booking.service?.title || 'Unknown Service'}</td>
            <td>${booking.service?.location || 'Unknown Location'}</td>
            <td>${new Date(booking.bookingDate).toLocaleDateString()}</td>
            <td><strong>${booking.totalPrice || 'N/A'}</strong></td>
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

// Filter services by city
function filterServicesByCity() {
    const cityFilter = document.getElementById('cityFilter');
    const selectedCity = cityFilter.value;

    const filteredServices = selectedCity
        ? allServices.filter(service => service.cityName === selectedCity)
        : allServices;

    const servicesGrid = document.getElementById('servicesGrid');
    if (!servicesGrid) return;

    if (filteredServices.length === 0) {
        servicesGrid.innerHTML = `
            <div class="col-12">
                <div class="empty-state">
                    <i class="fas fa-concierge-bell"></i>
                    <h4>No Services Found</h4>
                    <p>No services are available in ${
                        selectedCity || 'the selected city'
                    }.</p>
                </div>
            </div>
        `;
        return;
    }

    const servicesHTML = filteredServices
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
                        <button class="view-btn" onclick="viewServiceDetails('${
                            service.id
                        }')">
                            <i class="fas fa-eye me-1"></i>View
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
        )
        .join('');

    servicesGrid.innerHTML = servicesHTML;
}

// Logout function
function logout() {
    localStorage.removeItem('currentAdmin');
    window.location.href = 'admin-login.html';
}

// Make functions globally available
window.showSection = showSection;
window.viewBookingDetails = viewBookingDetails;
window.viewUserDetails = viewUserDetails;
window.viewBrokerDetails = viewBrokerDetails;
window.viewServiceDetails = viewServiceDetails;
window.filterBookings = filterBookings;
window.filterServicesByCity = filterServicesByCity;
window.logout = logout;
