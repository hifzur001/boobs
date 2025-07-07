<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Admin Panel - StayScape Services</title>
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
                --gradient-primary: linear-gradient(
                    135deg,
                    #667eea 0%,
                    #764ba2 100%
                );
                --gradient-success: linear-gradient(
                    135deg,
                    #11998e 0%,
                    #38ef7d 100%
                );
                --gradient-info: linear-gradient(
                    135deg,
                    #667eea 0%,
                    #764ba2 100%
                );
                --gradient-warning: linear-gradient(
                    135deg,
                    #f093fb 0%,
                    #f5576c 100%
                );
            }

            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont,
                    'Segoe UI', Roboto, sans-serif;
                background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                color: #333;
                overflow-x: hidden;
            }

            .sidebar {
                background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
                min-height: 100vh;
                width: 280px;
                position: fixed;
                left: 0;
                top: 0;
                z-index: 1000;
                transition: var(--transition);
                box-shadow: var(--shadow-heavy);
                border-right: 1px solid rgba(255, 255, 255, 0.1);
            }

            .sidebar::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(
                    135deg,
                    rgba(40, 167, 69, 0.1) 0%,
                    rgba(32, 201, 151, 0.1) 100%
                );
                pointer-events: none;
            }

            .sidebar-header {
                padding: 2rem 1.5rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                position: relative;
                z-index: 2;
            }

            .sidebar-brand {
                font-size: 1.2rem;
                font-weight: 800;
                color: white;
                text-decoration: none;
                display: flex;
                align-items: center;
                transition: var(--transition);
            }

            .sidebar-brand:hover {
                color: var(--green-secondary);
                transform: scale(1.05);
            }

            .sidebar-brand i {
                margin-right: 0.75rem;
                color: var(--green-primary);
                font-size: 1.8rem;
            }

            .sidebar-nav {
                padding: 1rem 0;
                position: relative;
                z-index: 2;
            }

            .nav-item {
                margin: 0.25rem 1rem;
            }

            .nav-link {
                color: rgba(255, 255, 255, 0.8);
                padding: 1rem 1.5rem;
                border-radius: 12px;
                transition: var(--transition);
                display: flex;
                align-items: center;
                text-decoration: none;
                font-weight: 500;
                position: relative;
                overflow: hidden;
            }

            .nav-link::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(
                    90deg,
                    transparent,
                    rgba(255, 255, 255, 0.1),
                    transparent
                );
                transition: var(--transition);
            }

            .nav-link:hover::before {
                left: 100%;
            }

            .nav-link:hover {
                background: rgba(255, 255, 255, 0.1);
                color: white;
                transform: translateX(5px);
                box-shadow: var(--shadow-light);
            }

            .nav-link.active {
                background: linear-gradient(
                    135deg,
                    var(--green-primary),
                    var(--green-secondary)
                );
                color: white;
                box-shadow: var(--shadow-medium);
                transform: translateX(5px);
            }

            .nav-link i {
                margin-right: 0.75rem;
                width: 20px;
                text-align: center;
                font-size: 1.1rem;
            }

            .main-content {
                margin-left: 280px;
                min-height: 100vh;
                transition: var(--transition);
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            }

            .top-navbar {
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(20px);
                padding: 1.5rem 2rem;
                box-shadow: var(--shadow-medium);
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: sticky;
                top: 0;
                z-index: 999;
                border-bottom: 1px solid rgba(40, 167, 69, 0.1);
            }

            .page-title {
                font-size: 2rem;
                font-weight: 800;
                background: linear-gradient(
                    135deg,
                    var(--green-primary),
                    var(--green-secondary)
                );
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin: 0;
            }

            .admin-info {
                display: flex;
                align-items: center;
                margin-left: auto;
                background: rgba(255, 255, 255, 0.8);
                padding: 0.75rem 1.5rem;
                border-radius: 50px;
                box-shadow: var(--shadow-light);
                backdrop-filter: blur(10px);
            }

            .admin-avatar {
                width: 45px;
                height: 45px;
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
                box-shadow: var(--shadow-light);
            }

            .content-area {
                padding: 2.5rem;
            }

            .content-section {
                display: none;
                animation: fadeInUp 0.6s ease-out;
            }

            .content-section.active {
                display: block;
            }

            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 2rem;
                margin-bottom: 3rem;
            }

            .stat-card {
                background: rgba(255, 255, 255, 0.9);
                backdrop-filter: blur(20px);
                border-radius: var(--border-radius);
                padding: 2.5rem;
                box-shadow: var(--shadow-medium);
                transition: var(--transition);
                position: relative;
                overflow: hidden;
                border: 1px solid rgba(255, 255, 255, 0.2);
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

            .stat-card::after {
                content: '';
                position: absolute;
                top: -50%;
                right: -50%;
                width: 100%;
                height: 100%;
                background: linear-gradient(
                    45deg,
                    transparent,
                    rgba(255, 255, 255, 0.1),
                    transparent
                );
                transform: rotate(45deg);
                transition: var(--transition);
                opacity: 0;
            }

            .stat-card:hover {
                transform: translateY(-10px) scale(1.02);
                box-shadow: var(--shadow-heavy);
            }

            .stat-card:hover::after {
                opacity: 1;
                animation: shimmer 1.5s ease-in-out;
            }

            @keyframes shimmer {
                0% {
                    transform: translateX(-100%) translateY(-100%) rotate(45deg);
                }
                100% {
                    transform: translateX(100%) translateY(100%) rotate(45deg);
                }
            }

            .stat-icon {
                width: 70px;
                height: 70px;
                background: var(--light-green);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 1.5rem;
                position: relative;
                box-shadow: var(--shadow-light);
            }

            .stat-icon::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: linear-gradient(
                    135deg,
                    var(--green-primary),
                    var(--green-secondary)
                );
                opacity: 0;
                transition: var(--transition);
            }

            .stat-card:hover .stat-icon::before {
                opacity: 0.1;
            }

            .stat-icon i {
                font-size: 1.8rem;
                color: var(--green-primary);
                z-index: 1;
                position: relative;
            }

            .stat-value {
                font-size: 3rem;
                font-weight: 900;
                background: linear-gradient(135deg, #333, #555);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin-bottom: 0.5rem;
                line-height: 1;
            }

            .stat-label {
                color: #666;
                font-weight: 600;
                font-size: 1.1rem;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .card {
                border: none;
                border-radius: var(--border-radius);
                box-shadow: var(--shadow-medium);
                margin-bottom: 2rem;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(20px);
                overflow: hidden;
                transition: var(--transition);
            }

            .card:hover {
                transform: translateY(-5px);
                box-shadow: var(--shadow-heavy);
            }

            .card-header {
                background: linear-gradient(
                    135deg,
                    var(--green-primary),
                    var(--green-secondary)
                );
                color: white;
                border: none;
                padding: 2rem;
                font-weight: 700;
                font-size: 1.2rem;
                position: relative;
                overflow: hidden;
            }

            .card-header::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(
                    90deg,
                    transparent,
                    rgba(255, 255, 255, 0.2),
                    transparent
                );
                transition: var(--transition);
            }

            .card-header:hover::before {
                left: 100%;
            }

            .card-body {
                padding: 2.5rem;
            }

            .table {
                margin-bottom: 0;
                background: transparent;
            }

            .table th {
                border-top: none;
                border-bottom: 2px solid rgba(40, 167, 69, 0.1);
                font-weight: 700;
                color: #333;
                padding: 1.5rem 1rem;
                background: rgba(40, 167, 69, 0.05);
                text-transform: uppercase;
                letter-spacing: 0.5px;
                font-size: 0.9rem;
            }

            .table td {
                border-top: 1px solid rgba(0, 0, 0, 0.05);
                padding: 1.5rem 1rem;
                vertical-align: middle;
                transition: var(--transition);
            }

            .table tbody tr {
                transition: var(--transition);
            }

            .table tbody tr:hover {
                background: rgba(40, 167, 69, 0.05);
                transform: scale(1.01);
            }

            .btn {
                font-weight: 600;
                padding: 0.75rem 2rem;
                border-radius: 50px;
                border: none;
                transition: var(--transition);
                font-size: 0.9rem;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                position: relative;
                overflow: hidden;
            }

            .btn::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transition: var(--transition);
                transform: translate(-50%, -50%);
            }

            .btn:hover::before {
                width: 300px;
                height: 300px;
            }

            .btn-primary {
                background: linear-gradient(
                    135deg,
                    var(--green-primary),
                    var(--green-secondary)
                );
                box-shadow: var(--shadow-medium);
            }

            .btn-primary:hover {
                background: linear-gradient(
                    135deg,
                    var(--dark-green),
                    var(--green-primary)
                );
                transform: translateY(-3px);
                box-shadow: var(--shadow-heavy);
            }

            .btn-sm {
                padding: 0.5rem 1.5rem;
                font-size: 0.8rem;
            }

            .badge {
                font-size: 0.8rem;
                padding: 0.6rem 1.2rem;
                border-radius: 50px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                box-shadow: var(--shadow-light);
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
                padding: 0.75rem 1.5rem;
                border-radius: 50px;
                font-weight: 600;
                transition: var(--transition);
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .logout-btn:hover {
                background: linear-gradient(135deg, #c82333, #a71e2a);
                transform: translateY(-3px);
                color: white;
                box-shadow: var(--shadow-heavy);
            }

            .recent-activity {
                max-height: 500px;
                overflow-y: auto;
                padding-right: 1rem;
            }

            .recent-activity::-webkit-scrollbar {
                width: 6px;
            }

            .recent-activity::-webkit-scrollbar-track {
                background: rgba(40, 167, 69, 0.1);
                border-radius: 10px;
            }

            .recent-activity::-webkit-scrollbar-thumb {
                background: linear-gradient(
                    135deg,
                    var(--green-primary),
                    var(--green-secondary)
                );
                border-radius: 10px;
            }

            .activity-item {
                padding: 1.5rem 0;
                border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                display: flex;
                align-items: center;
                transition: var(--transition);
            }

            .activity-item:hover {
                background: rgba(40, 167, 69, 0.05);
                border-radius: 12px;
                padding-left: 1rem;
                padding-right: 1rem;
            }

            .activity-item:last-child {
                border-bottom: none;
            }

            .activity-icon {
                width: 50px;
                height: 50px;
                background: var(--light-green);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 1.5rem;
                box-shadow: var(--shadow-light);
            }

            .activity-icon i {
                color: var(--green-primary);
                font-size: 1.2rem;
            }

            .activity-content h6 {
                margin-bottom: 0.5rem;
                font-weight: 700;
                color: #333;
            }

            .activity-content small {
                color: #666;
                font-weight: 500;
            }

            .view-btn {
                background: linear-gradient(135deg, #17a2b8, #138496);
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 25px;
                font-size: 0.8rem;
                font-weight: 600;
                transition: var(--transition);
                cursor: pointer;
            }

            .view-btn:hover {
                background: linear-gradient(135deg, #138496, #117a8b);
                transform: translateY(-2px);
                box-shadow: var(--shadow-medium);
            }

            .modal-content {
                border: none;
                border-radius: var(--border-radius);
                box-shadow: var(--shadow-heavy);
                backdrop-filter: blur(20px);
            }

            .modal-header {
                background: linear-gradient(
                    135deg,
                    var(--green-primary),
                    var(--green-secondary)
                );
                color: white;
                border: none;
                border-radius: var(--border-radius) var(--border-radius) 0 0;
                padding: 2rem;
            }

            .modal-title {
                font-weight: 800;
                font-size: 1.5rem;
            }

            .modal-body {
                padding: 2.5rem;
                background: rgba(255, 255, 255, 0.95);
            }

            .detail-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem 0;
                border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            }

            .detail-row:last-child {
                border-bottom: none;
            }

            .detail-label {
                font-weight: 700;
                color: #333;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                font-size: 0.9rem;
            }

            .detail-value {
                font-weight: 500;
                color: #666;
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
                    gap: 1.5rem;
                }

                .content-area {
                    padding: 1.5rem;
                }

                .top-navbar {
                    padding: 1rem;
                }

                .page-title {
                    font-size: 1.5rem;
                }

                .admin-info {
                    padding: 0.5rem 1rem;
                }
            }

            .loading-spinner {
                display: inline-block;
                width: 20px;
                height: 20px;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                border-top-color: #fff;
                animation: spin 1s linear infinite;
            }

            @keyframes spin {
                to {
                    transform: rotate(360deg);
                }
            }

            .empty-state {
                text-align: center;
                padding: 4rem 2rem;
                color: #666;
            }

            .empty-state i {
                font-size: 4rem;
                margin-bottom: 2rem;
                opacity: 0.3;
            }

            .empty-state h4 {
                margin-bottom: 1rem;
                font-weight: 700;
            }

            .empty-state p {
                font-size: 1.1rem;
                line-height: 1.6;
            }
        </style>
    </head>
    <body>
        <!-- Sidebar -->
        <div class="sidebar" id="sidebar">
            <div class="sidebar-header">
                <a href="#" class="sidebar-brand">
                    <i class="fas fa-shield-alt"></i>
                    StayScape Admin
                </a>
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
                        onclick="showSection('bookings')"
                    >
                        <i class="fas fa-calendar-check"></i>
                        Bookings
                    </a>
                </div>
                <div class="nav-item">
                    <a href="#" class="nav-link" onclick="showSection('users')">
                        <i class="fas fa-users"></i>
                        Users
                    </a>
                </div>
                <div class="nav-item">
                    <a
                        href="#"
                        class="nav-link"
                        onclick="showSection('brokers')"
                    >
                        <i class="fas fa-user-tie"></i>
                        Brokers
                    </a>
                </div>
                <div class="nav-item">
                    <a
                        href="#"
                        class="nav-link"
                        onclick="showSection('services')"
                    >
                        <i class="fas fa-concierge-bell"></i>
                        Services
                    </a>
                </div>
                <div class="nav-item">
                    <a
                        href="#"
                        class="nav-link"
                        onclick="showSection('revenue')"
                    >
                        <i class="fas fa-chart-line"></i>
                        Revenue
                    </a>
                </div>
            </nav>
        </div>

        <!-- Main Content -->
        <div class="main-content">
            <!-- Top Navbar -->
            <div class="top-navbar">
                <h1 class="page-title" id="pageTitle">Dashboard</h1>
                <div class="admin-info">
                    <div class="admin-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div>
                        <div class="fw-bold" id="adminName">
                            System Administrator
                        </div>
                        <small class="text-muted">Super Admin</small>
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
                                <i class="fas fa-calendar-check"></i>
                            </div>
                            <div class="stat-value" id="totalBookings">0</div>
                            <div class="stat-label">Total Bookings</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-users"></i>
                            </div>
                            <div class="stat-value" id="totalUsers">0</div>
                            <div class="stat-label">Total Users</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-user-tie"></i>
                            </div>
                            <div class="stat-value" id="activeBrokers">0</div>
                            <div class="stat-label">Active Brokers</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-dollar-sign"></i>
                            </div>
                            <div class="stat-value" id="totalRevenue">
                                PKR 0
                            </div>
                            <div class="stat-label">Total Revenue</div>
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
                                    <i class="fas fa-bell me-2"></i>System
                                    Activity
                                </div>
                                <div class="card-body">
                                    <div
                                        class="recent-activity"
                                        id="systemActivity"
                                    >
                                        <div class="activity-item">
                                            <div class="activity-icon">
                                                <i class="fas fa-user-plus"></i>
                                            </div>
                                            <div class="activity-content">
                                                <h6>System Initialized</h6>
                                                <small
                                                    >Admin panel is ready</small
                                                >
                                            </div>
                                        </div>
                                    </div>
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
                                ><i class="fas fa-calendar-check me-2"></i>All
                                Bookings</span
                            >
                            <div>
                                <button
                                    class="btn btn-outline-light btn-sm me-2"
                                    onclick="filterBookings('all')"
                                >
                                    All
                                </button>
                                <button
                                    class="btn btn-outline-light btn-sm me-2"
                                    onclick="filterBookings('confirmed')"
                                >
                                    Confirmed
                                </button>
                                <button
                                    class="btn btn-outline-light btn-sm me-2"
                                    onclick="filterBookings('pending')"
                                >
                                    Pending
                                </button>
                                <button
                                    class="btn btn-outline-light btn-sm"
                                    onclick="filterBookings('cancelled')"
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
                                            <th>Location</th>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody id="bookingsTable">
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

                <!-- Users Section -->
                <div id="users" class="content-section">
                    <div class="card">
                        <div class="card-header">
                            <i class="fas fa-users me-2"></i>All Users
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Registered</th>
                                            <th>Bookings</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody id="usersTable">
                                        <tr>
                                            <td
                                                colspan="7"
                                                class="text-center text-muted"
                                            >
                                                No users found
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Brokers Section -->
                <div id="brokers" class="content-section">
                    <div class="card">
                        <div
                            class="card-header d-flex justify-content-between align-items-center"
                        >
                            <span
                                ><i class="fas fa-user-tie me-2"></i>All
                                Brokers</span
                            >
                            <button
                                class="btn btn-light btn-sm"
                                onclick="showAddBrokerModal()"
                            >
                                <i class="fas fa-plus me-1"></i>Add Broker
                            </button>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>City</th>
                                            <th>Services</th>
                                            <th>Commission</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody id="brokersTable">
                                        <tr>
                                            <td
                                                colspan="8"
                                                class="text-center text-muted"
                                            >
                                                No brokers found
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Services Section -->
                <div id="services" class="content-section">
                    <div class="card">
                        <div
                            class="card-header d-flex justify-content-between align-items-center"
                        >
                            <span
                                ><i class="fas fa-concierge-bell me-2"></i>All
                                Services</span
                            >
                            <select
                                class="form-select w-auto"
                                id="cityFilter"
                                onchange="filterServicesByCity()"
                            >
                                <option value="">All Cities</option>
                            </select>
                        </div>
                        <div class="card-body">
                            <div class="row" id="servicesGrid">
                                <div class="col-12 text-center text-muted">
                                    <p>Loading services...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Revenue Section -->
                <div id="revenue" class="content-section">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="stat-card">
                                <div class="stat-icon">
                                    <i class="fas fa-calendar-day"></i>
                                </div>
                                <div class="stat-value" id="todayRevenue">
                                    PKR 0
                                </div>
                                <div class="stat-label">Today's Revenue</div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="stat-card">
                                <div class="stat-icon">
                                    <i class="fas fa-calendar-week"></i>
                                </div>
                                <div class="stat-value" id="monthRevenue">
                                    PKR 0
                                </div>
                                <div class="stat-label">This Month</div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="stat-card">
                                <div class="stat-icon">
                                    <i class="fas fa-calendar-alt"></i>
                                </div>
                                <div class="stat-value" id="yearRevenue">
                                    PKR 0
                                </div>
                                <div class="stat-label">This Year</div>
                            </div>
                        </div>
                    </div>

                    <div class="card mt-4">
                        <div class="card-header">
                            <i class="fas fa-chart-pie me-2"></i>Revenue
                            Breakdown
                        </div>
                        <div class="card-body">
                            <div id="revenueChart">
                                <p class="text-muted">
                                    Loading revenue data...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Booking Details Modal -->
        <div class="modal fade" id="bookingModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-calendar-check me-2"></i>
                            Booking Details
                        </h5>
                        <button
                            type="button"
                            class="btn-close btn-close-white"
                            data-bs-dismiss="modal"
                        ></button>
                    </div>
                    <div class="modal-body" id="bookingModalBody">
                        <!-- Content will be populated by JavaScript -->
                    </div>
                </div>
            </div>
        </div>

        <!-- User Details Modal -->
        <div class="modal fade" id="userModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-user me-2"></i>
                            User Details
                        </h5>
                        <button
                            type="button"
                            class="btn-close btn-close-white"
                            data-bs-dismiss="modal"
                        ></button>
                    </div>
                    <div class="modal-body" id="userModalBody">
                        <!-- Content will be populated by JavaScript -->
                    </div>
                </div>
            </div>
        </div>

        <!-- Broker Details Modal -->
        <div class="modal fade" id="brokerModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-user-tie me-2"></i>
                            Broker Details
                        </h5>
                        <button
                            type="button"
                            class="btn-close btn-close-white"
                            data-bs-dismiss="modal"
                        ></button>
                    </div>
                    <div class="modal-body" id="brokerModalBody">
                        <!-- Content will be populated by JavaScript -->
                    </div>
                </div>
            </div>
        </div>

        <!-- Service Details Modal -->
        <div class="modal fade" id="serviceDetailsModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-concierge-bell me-2"></i>
                            Service Details
                        </h5>
                        <button
                            type="button"
                            class="btn-close btn-close-white"
                            data-bs-dismiss="modal"
                        ></button>
                    </div>
                    <div class="modal-body" id="serviceDetailsModalBody">
                        <!-- Content will be populated by JavaScript -->
                    </div>
                </div>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        <script src="admin-script.js"></script>
    </body>
</html>
