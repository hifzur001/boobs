<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Broker Panel - StayScape Services</title>
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
            rel="stylesheet"
        />
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
            rel="stylesheet"
        />
        <style>
            :root {
                --green-primary: #28a745;
                --green-secondary: #20c997;
                --dark-green: #1e7e34;
                --light-green: rgba(40, 167, 69, 0.1);
                --shadow-light: 0 2px 15px rgba(0, 0, 0, 0.08);
                --shadow-medium: 0 5px 25px rgba(0, 0, 0, 0.12);
                --shadow-heavy: 0 10px 40px rgba(0, 0, 0, 0.15);
                --border-radius: 15px;
                --transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }

            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont,
                    'Segoe UI', Roboto, sans-serif;
                background: #f8f9fa;
                color: #333;
            }

            .sidebar {
                background: linear-gradient(
                    135deg,
                    var(--green-primary) 0%,
                    var(--green-secondary) 100%
                );
                min-height: 100vh;
                width: 280px;
                position: fixed;
                left: 0;
                top: 0;
                z-index: 1000;
                transition: var(--transition);
                box-shadow: var(--shadow-medium);
            }

            .sidebar-header {
                padding: 2rem 1.5rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            }

            .sidebar-brand {
                font-size: 1.2rem;
                font-weight: 800;
                color: white;
                text-decoration: none;
                display: flex;
                align-items: center;
            }

            .sidebar-brand i {
                margin-right: 0.75rem;
                color: white;
            }

            .broker-info {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 1rem;
                margin-top: 1rem;
                backdrop-filter: blur(10px);
            }

            .broker-info h6 {
                color: white;
                margin-bottom: 0.5rem;
                font-weight: 600;
            }

            .broker-info small {
                color: rgba(255, 255, 255, 0.8);
            }

            .sidebar-nav {
                padding: 1rem 0;
            }

            .nav-item {
                margin: 0.25rem 1rem;
            }

            .nav-link {
                color: rgba(255, 255, 255, 0.9);
                padding: 1rem 1.5rem;
                border-radius: 12px;
                transition: var(--transition);
                display: flex;
                align-items: center;
                text-decoration: none;
                font-weight: 500;
            }

            .nav-link:hover {
                background: rgba(255, 255, 255, 0.15);
                color: white;
                transform: translateX(5px);
            }

            .nav-link.active {
                background: rgba(255, 255, 255, 0.2);
                color: white;
                box-shadow: var(--shadow-light);
            }

            .nav-link i {
                margin-right: 0.75rem;
                width: 20px;
                text-align: center;
            }

            .main-content {
                margin-left: 280px;
                min-height: 100vh;
                transition: var(--transition);
            }

            .top-navbar {
                background: white;
                padding: 1rem 2rem;
                box-shadow: var(--shadow-light);
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: sticky;
                top: 0;
                z-index: 999;
            }

            .page-title {
                font-size: 1.75rem;
                font-weight: 700;
                color: #333;
                margin: 0;
            }

            .city-selector {
                display: flex;
                align-items: center;
                gap: 1rem;
            }

            .city-selector select {
                border: 2px solid #e9ecef;
                border-radius: 25px;
                padding: 0.5rem 1rem;
                font-weight: 500;
                background: white;
                min-width: 150px;
            }

            .city-selector select:focus {
                border-color: var(--green-primary);
                box-shadow: 0 0 0 0.25rem rgba(40, 167, 69, 0.15);
            }

            .broker-info-top {
                display: flex;
                align-items: center;
                margin-left: auto;
            }

            .broker-avatar {
                width: 40px;
                height: 40px;
                background: linear-gradient(
                    135deg,
                    var(--green-primary),
                    var(--green-secondary)
                );
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 700;
                margin-right: 1rem;
            }

            .content-area {
                padding: 2rem;
            }

            .content-section {
                display: none;
            }

            .content-section.active {
                display: block;
            }

            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1.5rem;
                margin-bottom: 2rem;
            }

            .stat-card {
                background: white;
                border-radius: var(--border-radius);
                padding: 2rem;
                box-shadow: var(--shadow-light);
                transition: var(--transition);
                position: relative;
                overflow: hidden;
            }

            .stat-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(
                    90deg,
                    var(--green-primary),
                    var(--green-secondary)
                );
            }

            .stat-card:hover {
                transform: translateY(-5px);
                box-shadow: var(--shadow-medium);
            }

            .stat-icon {
                width: 60px;
                height: 60px;
                background: var(--light-green);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 1rem;
            }

            .stat-icon i {
                font-size: 1.5rem;
                color: var(--green-primary);
            }

            .stat-value {
                font-size: 2.5rem;
                font-weight: 800;
                color: #333;
                margin-bottom: 0.5rem;
            }

            .stat-label {
                color: #666;
                font-weight: 500;
            }

            .card {
                border: none;
                border-radius: var(--border-radius);
                box-shadow: var(--shadow-light);
                margin-bottom: 2rem;
            }

            .card-header {
                background: linear-gradient(
                    135deg,
                    var(--green-primary),
                    var(--green-secondary)
                );
                color: white;
                border: none;
                padding: 1.5rem 2rem;
                font-weight: 600;
                font-size: 1.1rem;
            }

            .card-body {
                padding: 2rem;
            }

            .service-card {
                background: white;
                border-radius: var(--border-radius);
                box-shadow: var(--shadow-light);
                transition: var(--transition);
                overflow: hidden;
                margin-bottom: 1.5rem;
            }

            .service-card:hover {
                transform: translateY(-5px);
                box-shadow: var(--shadow-medium);
            }

            .service-card img {
                height: 200px;
                object-fit: cover;
                width: 100%;
            }

            .service-actions {
                position: absolute;
                top: 10px;
                right: 10px;
                display: flex;
                gap: 0.5rem;
            }

            .btn {
                font-weight: 600;
                padding: 0.5rem 1.5rem;
                border-radius: 25px;
                border: none;
                transition: var(--transition);
                font-size: 0.875rem;
            }

            .btn-primary {
                background: linear-gradient(
                    135deg,
                    var(--green-primary),
                    var(--green-secondary)
                );
                box-shadow: var(--shadow-light);
            }

            .btn-primary:hover {
                background: linear-gradient(
                    135deg,
                    var(--dark-green),
                    var(--green-primary)
                );
                transform: translateY(-2px);
                box-shadow: var(--shadow-medium);
            }

            .btn-sm {
                padding: 0.375rem 1rem;
                font-size: 0.8rem;
            }

            .table {
                margin-bottom: 0;
            }

            .table th {
                border-top: none;
                border-bottom: 2px solid #e9ecef;
                font-weight: 600;
                color: #333;
                padding: 1rem 0.75rem;
            }

            .table td {
                border-top: 1px solid #f8f9fa;
                padding: 1rem 0.75rem;
                vertical-align: middle;
            }

            .badge {
                font-size: 0.75rem;
                padding: 0.5rem 1rem;
                border-radius: 25px;
                font-weight: 600;
            }

            .badge-confirmed {
                background: linear-gradient(135deg, #d4edda, #c3e6cb);
                color: #155724;
            }

            .badge-pending {
                background: linear-gradient(135deg, #fff3cd, #ffeaa7);
                color: #856404;
            }

            .badge-cancelled {
                background: linear-gradient(135deg, #f8d7da, #f5c6cb);
                color: #721c24;
            }

            .badge-active {
                background: linear-gradient(135deg, #d4edda, #c3e6cb);
                color: #155724;
            }

            .badge-inactive {
                background: linear-gradient(135deg, #f8d7da, #f5c6cb);
                color: #721c24;
            }

            .logout-btn {
                background: linear-gradient(135deg, #dc3545, #c82333);
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 25px;
                font-weight: 600;
                transition: var(--transition);
            }

            .logout-btn:hover {
                background: linear-gradient(135deg, #c82333, #a71e2a);
                transform: translateY(-2px);
                color: white;
            }

            .form-control,
            .form-select {
                border: 2px solid #e9ecef;
                border-radius: 12px;
                padding: 0.875rem 1rem;
                font-size: 0.95rem;
                transition: var(--transition);
                background: white;
            }

            .form-control:focus,
            .form-select:focus {
                border-color: var(--green-primary);
                box-shadow: 0 0 0 0.25rem rgba(40, 167, 69, 0.15);
                background: var(--light-green);
            }

            .form-label {
                font-weight: 600;
                color: #333;
                margin-bottom: 0.75rem;
            }

            .recent-activity {
                max-height: 400px;
                overflow-y: auto;
            }

            .activity-item {
                padding: 1rem 0;
                border-bottom: 1px solid #f8f9fa;
                display: flex;
                align-items: center;
            }

            .activity-item:last-child {
                border-bottom: none;
            }

            .activity-icon {
                width: 40px;
                height: 40px;
                background: var(--light-green);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 1rem;
            }

            .activity-icon i {
                color: var(--green-primary);
            }

            .activity-content h6 {
                margin-bottom: 0.25rem;
                font-weight: 600;
            }

            .activity-content small {
                color: #666;
            }

            .service-badge {
                font-size: 0.75rem;
                padding: 0.5rem 1rem;
                border-radius: 25px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                box-shadow: var(--shadow-light);
            }

            .badge-accommodation {
                background: linear-gradient(135deg, #007bff, #0056b3);
                color: white;
            }

            .badge-experience {
                background: linear-gradient(135deg, #28a745, #1e7e34);
                color: white;
            }

            .badge-transportation {
                background: linear-gradient(135deg, #ffc107, #e0a800);
                color: #333;
            }

            .badge-wellness {
                background: linear-gradient(135deg, #17a2b8, #138496);
                color: white;
            }

            .badge-adventure {
                background: linear-gradient(135deg, #dc3545, #c82333);
                color: white;
            }

            .price-tag {
                font-weight: 800;
                font-size: 1.1rem;
                background: linear-gradient(
                    135deg,
                    var(--green-primary),
                    var(--green-secondary)
                );
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .rating-stars {
                color: #ffc107;
                filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
            }

            @media (max-width: 768px) {
                .sidebar {
                    transform: translateX(-100%);
                }

                .sidebar.show {
                    transform: translateX(0);
                }

                .main-content {
                    margin-left: 0;
                }

                .stats-grid {
                    grid-template-columns: 1fr;
                }

                .content-area {
                    padding: 1rem;
                }

                .city-selector {
                    flex-direction: column;
                    gap: 0.5rem;
                }
            }
        </style>
    </head>
    <body>
        <!-- Sidebar -->
        <div class="sidebar" id="sidebar">
            <div class="sidebar-header">
                <a href="#" class="sidebar-brand">
                    <i class="fas fa-user-tie"></i>
                    StayScape Broker
                </a>
                <div class="broker-info">
                    <h6 id="brokerName">Loading...</h6>
                    <small
                        ><i class="fas fa-map-marker-alt me-1"></i
                        ><span id="brokerCity">Loading...</span></small
                    >
                </div>
            </div>
            <nav class="sidebar-nav">
                <div class="nav-item">
                    <a
                        href="#"
                        class="nav-link active"
                        onclick="showSection('dashboard')"
                    >
                        <i class="fas fa-tachometer-alt"></i>
                        Dashboard
                    </a>
                </div>
                <div class="nav-item">
                    <a
                        href="#"
                        class="nav-link"
                        onclick="showSection('my-services')"
                    >
                        <i class="fas fa-concierge-bell"></i>
                        My Services
                    </a>
                </div>
                <div class="nav-item">
                    <a
                        href="#"
                        class="nav-link"
                        onclick="showSection('bookings')"
                    >
                        <i class="fas fa-calendar-check"></i>
                        Bookings
                    </a>
                </div>
                <div class="nav-item">
                    <a
                        href="#"
                        class="nav-link"
                        onclick="showSection('earnings')"
                    >
                        <i class="fas fa-dollar-sign"></i>
                        Earnings
                    </a>
                </div>
                <div class="nav-item">
                    <a
                        href="#"
                        class="nav-link"
                        onclick="showSection('analytics')"
                    >
                        <i class="fas fa-chart-line"></i>
                        Analytics
                    </a>
                </div>
                <div class="nav-item">
                    <a
                        href="#"
                        class="nav-link"
                        onclick="showSection('customers')"
                    >
                        <i class="fas fa-users"></i>
                        Customers
                    </a>
                </div>
                <div class="nav-item">
                    <a
                        href="#"
                        class="nav-link"
                        onclick="showSection('add-service')"
                    >
                        <i class="fas fa-plus"></i>
                        Add Service
                    </a>
                </div>
                <div class="nav-item">
                    <a
                        href="#"
                        class="nav-link"
                        onclick="showSection('profile')"
                    >
                        <i class="fas fa-user-cog"></i>
                        Profile
                    </a>
                </div>
            </nav>
        </div>

        <!-- Main Content -->
        <div class="main-content">
            <!-- Top Navbar -->
            <div class="top-navbar">
                <h1 class="page-title me-4" id="pageTitle">Dashboard</h1>
                <div class="city-selector">
                    <label for="citySelect" class="form-label mb-0 d-none"
                        >View City Services:</label
                    >
                    <select
                        class="form-select"
                        id="citySelect"
                        onchange="loadCityServices()"
                    >
                        <option value="">Select City</option>
                        <option value="Lahore">Lahore</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Peshawar">Peshawar</option>
                        <option value="Multan">Multan</option>
                    </select>
                </div>
                <div class="broker-info-top">
                    <div class="broker-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div>
                        <div class="fw-bold" id="brokerNameTop">Loading...</div>
                        <small class="text-muted">Broker</small>
                    </div>
                    <button class="logout-btn ms-3" onclick="logout()">
                        <i class="fas fa-sign-out-alt me-1"></i>Logout
                    </button>
                </div>
            </div>

            <!-- Content Area -->
            <div class="content-area">
                <!-- Dashboard Section -->
                <div id="dashboard" class="content-section active">
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-concierge-bell"></i>
                            </div>
                            <div class="stat-value" id="myServices">0</div>
                            <div class="stat-label">My Services</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-calendar-check"></i>
                            </div>
                            <div class="stat-value" id="myBookings">0</div>
                            <div class="stat-label">Total Bookings</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-dollar-sign"></i>
                            </div>
                            <div class="stat-value" id="myEarnings">PKR 0</div>
                            <div class="stat-label">Total Earnings</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-users"></i>
                            </div>
                            <div class="stat-value" id="myCustomers">0</div>
                            <div class="stat-label">Customers</div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-8">
                            <div class="card">
                                <div class="card-header">
                                    <i class="fas fa-chart-bar me-2"></i>Recent
                                    Bookings
                                </div>
                                <div class="card-body">
                                    <div id="recentBookings">
                                        <p class="text-muted">
                                            Loading recent bookings...
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="card">
                                <div class="card-header">
                                    <i class="fas fa-eye me-2"></i>City Services
                                    View
                                </div>
                                <div class="card-body">
                                    <div id="cityServicesView">
                                        <p class="text-muted">
                                            Select a city from the dropdown
                                            above to view all services in that
                                            city.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- My Services Section -->
                <div id="my-services" class="content-section">
                    <div class="card">
                        <div class="card-header">
                            <i class="fas fa-concierge-bell me-2"></i>My
                            Services
                        </div>
                        <div class="card-body">
                            <div class="row" id="servicesGrid">
                                <div class="col-12 text-center text-muted">
                                    <p>Loading your services...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Bookings Section -->
                <div id="bookings" class="content-section">
                    <div class="card">
                        <div
                            class="card-header d-flex justify-content-between align-items-center"
                        >
                            <span
                                ><i class="fas fa-calendar-check me-2"></i>My
                                Bookings</span
                            >
                            <div>
                                <button
                                    class="btn btn-outline-light btn-sm me-2"
                                    onclick="filterMyBookings('all')"
                                >
                                    All
                                </button>
                                <button
                                    class="btn btn-outline-light btn-sm me-2"
                                    onclick="filterMyBookings('confirmed')"
                                >
                                    Confirmed
                                </button>
                                <button
                                    class="btn btn-outline-light btn-sm me-2"
                                    onclick="filterMyBookings('pending')"
                                >
                                    Pending
                                </button>
                                <button
                                    class="btn btn-outline-light btn-sm"
                                    onclick="filterMyBookings('cancelled')"
                                >
                                    Cancelled
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Customer</th>
                                            <th>Service</th>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Commission</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody id="myBookingsTable">
                                        <tr>
                                            <td
                                                colspan="8"
                                                class="text-center text-muted"
                                            >
                                                No bookings found
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Earnings Section -->
                <div id="earnings" class="content-section">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="stat-card">
                                <div class="stat-icon">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="stat-value" id="totalEarnings">
                                    PKR 0
                                </div>
                                <div class="stat-label">Total Earnings</div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="stat-card">
                                <div class="stat-icon">
                                    <i class="fas fa-clock"></i>
                                </div>
                                <div class="stat-value" id="pendingEarnings">
                                    PKR 0
                                </div>
                                <div class="stat-label">Pending Payout</div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="stat-card">
                                <div class="stat-icon">
                                    <i class="fas fa-check-circle"></i>
                                </div>
                                <div class="stat-value" id="paidEarnings">
                                    PKR 0
                                </div>
                                <div class="stat-label">Paid Out</div>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div
                            class="card-header d-flex justify-content-between align-items-center"
                        >
                            <span
                                ><i class="fas fa-money-bill-wave me-2"></i
                                >Earnings History</span
                            >
                            <button
                                class="btn btn-light btn-sm"
                                onclick="requestPayout()"
                            >
                                <i class="fas fa-hand-holding-usd me-1"></i
                                >Request Payout
                            </button>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Booking ID</th>
                                            <th>Service</th>
                                            <th>Commission</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody id="earningsTable">
                                        <tr>
                                            <td
                                                colspan="5"
                                                class="text-center text-muted"
                                            >
                                                No earnings data found
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Analytics Section -->
                <div id="analytics" class="content-section">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-header">
                                    <i class="fas fa-chart-pie me-2"></i>Service
                                    Performance
                                </div>
                                <div class="card-body">
                                    <div id="servicePerformance">
                                        <p class="text-muted">
                                            Loading performance data...
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-header">
                                    <i class="fas fa-chart-line me-2"></i
                                    >Monthly Earnings
                                </div>
                                <div class="card-body">
                                    <div id="monthlyEarnings">
                                        <p class="text-muted">
                                            Loading earnings data...
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Customers Section -->
                <div id="customers" class="content-section">
                    <div class="card">
                        <div class="card-header">
                            <i class="fas fa-users me-2"></i>My Customers
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Bookings</th>
                                            <th>Total Spent</th>
                                            <th>Last Booking</th>
                                        </tr>
                                    </thead>
                                    <tbody id="customersTable">
                                        <tr>
                                            <td
                                                colspan="6"
                                                class="text-center text-muted"
                                            >
                                                No customers found
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Add Service Section -->
                <div id="add-service" class="content-section">
                    <div class="card">
                        <div class="card-header">
                            <i class="fas fa-plus me-2"></i>Add New Service
                        </div>
                        <div class="card-body">
                            <form id="addServiceForm">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label
                                                for="serviceTitle"
                                                class="form-label"
                                                >Service Title</label
                                            >
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="serviceTitle"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label
                                                for="serviceType"
                                                class="form-label"
                                                >Service Type</label
                                            >
                                            <select
                                                class="form-select"
                                                id="serviceType"
                                                required
                                            >
                                                <option value="">
                                                    Select Type
                                                </option>
                                                <option value="Accommodation">
                                                    Accommodation
                                                </option>
                                                <option value="Experience">
                                                    Experience
                                                </option>
                                                <option value="Transportation">
                                                    Transportation
                                                </option>
                                                <option value="Wellness">
                                                    Wellness
                                                </option>
                                                <option value="Adventure">
                                                    Adventure
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label
                                                for="serviceLocation"
                                                class="form-label"
                                                >Location</label
                                            >
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="serviceLocation"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="mb-3">
                                            <label
                                                for="priceType"
                                                class="form-label"
                                                >Price Type</label
                                            >
                                            <select
                                                class="form-select"
                                                id="priceType"
                                                required
                                            >
                                                <option value="price">
                                                    Fixed Price
                                                </option>
                                                <option value="price_per_night">
                                                    Per Night
                                                </option>
                                                <option value="price_per_day">
                                                    Per Day
                                                </option>
                                                <option value="price_per_hour">
                                                    Per Hour
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="mb-3">
                                            <label
                                                for="servicePrice"
                                                class="form-label"
                                                >Price (PKR)</label
                                            >
                                            <input
                                                type="number"
                                                class="form-control"
                                                id="servicePrice"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label
                                                for="serviceImage"
                                                class="form-label"
                                                >Image URL</label
                                            >
                                            <input
                                                type="url"
                                                class="form-control"
                                                id="serviceImage"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label
                                                for="serviceRating"
                                                class="form-label"
                                                >Rating (1-5)</label
                                            >
                                            <input
                                                type="number"
                                                class="form-control"
                                                id="serviceRating"
                                                min="1"
                                                max="5"
                                                step="0.1"
                                                value="4.5"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label
                                        for="serviceDescription"
                                        class="form-label"
                                        >Description</label
                                    >
                                    <textarea
                                        class="form-control"
                                        id="serviceDescription"
                                        rows="3"
                                    ></textarea>
                                </div>
                                <div class="d-flex gap-2">
                                    <button
                                        type="submit"
                                        class="btn btn-primary"
                                    >
                                        <i class="fas fa-plus me-1"></i>Add
                                        Service
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-secondary"
                                        onclick="resetForm()"
                                    >
                                        <i class="fas fa-undo me-1"></i>Reset
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- Profile Section -->
                <div id="profile" class="content-section">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-header">
                                    <i class="fas fa-user me-2"></i>Profile
                                    Information
                                </div>
                                <div class="card-body">
                                    <form id="profileForm">
                                        <div class="mb-3">
                                            <label
                                                for="profileName"
                                                class="form-label"
                                                >Name</label
                                            >
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="profileName"
                                                required
                                            />
                                        </div>
                                        <div class="mb-3">
                                            <label
                                                for="profileEmail"
                                                class="form-label"
                                                >Email</label
                                            >
                                            <input
                                                type="email"
                                                class="form-control"
                                                id="profileEmail"
                                                readonly
                                            />
                                        </div>
                                        <div class="mb-3">
                                            <label
                                                for="profilePhone"
                                                class="form-label"
                                                >Phone</label
                                            >
                                            <input
                                                type="tel"
                                                class="form-control"
                                                id="profilePhone"
                                                required
                                            />
                                        </div>
                                        <div class="mb-3">
                                            <label
                                                for="profileCity"
                                                class="form-label"
                                                >City</label
                                            >
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="profileCity"
                                                readonly
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            class="btn btn-primary"
                                        >
                                            <i class="fas fa-save me-1"></i
                                            >Update Profile
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-header">
                                    <i class="fas fa-lock me-2"></i>Change
                                    Password
                                </div>
                                <div class="card-body">
                                    <form id="passwordForm">
                                        <div class="mb-3">
                                            <label
                                                for="currentPassword"
                                                class="form-label"
                                                >Current Password</label
                                            >
                                            <input
                                                type="password"
                                                class="form-control"
                                                id="currentPassword"
                                                required
                                            />
                                        </div>
                                        <div class="mb-3">
                                            <label
                                                for="newPassword"
                                                class="form-label"
                                                >New Password</label
                                            >
                                            <input
                                                type="password"
                                                class="form-control"
                                                id="newPassword"
                                                required
                                            />
                                        </div>
                                        <div class="mb-3">
                                            <label
                                                for="confirmNewPassword"
                                                class="form-label"
                                                >Confirm New Password</label
                                            >
                                            <input
                                                type="password"
                                                class="form-control"
                                                id="confirmNewPassword"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            class="btn btn-primary"
                                        >
                                            <i class="fas fa-key me-1"></i
                                            >Change Password
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        <script src="broker-script.js"></script>
    </body>
</html>
