-- StayScape Database Schema
CREATE DATABASE IF NOT EXISTS stayscape_db;
USE stayscape_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_bookings INT DEFAULT 0,
    total_spent DECIMAL(10,2) DEFAULT 0.00,
    status ENUM('active', 'inactive') DEFAULT 'active'
);

-- Admins table
CREATE TABLE IF NOT EXISTS admins (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);

-- Brokers table
CREATE TABLE IF NOT EXISTS brokers (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    city VARCHAR(100),
    commission DECIMAL(5,2) DEFAULT 10.00,
    password VARCHAR(255) NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    access_level VARCHAR(50) DEFAULT 'broker',
    total_bookings INT DEFAULT 0,
    total_earnings DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cities table
CREATE TABLE IF NOT EXISTS cities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    type VARCHAR(100) NOT NULL,
    location VARCHAR(200) NOT NULL,
    city_id INT,
    city_name VARCHAR(100),
    picture VARCHAR(255),
    rating DECIMAL(3,2) DEFAULT 0.00,
    price DECIMAL(10,2),
    price_per_night DECIMAL(10,2),
    price_per_day DECIMAL(10,2),
    price_per_hour DECIMAL(10,2),
    price_per_km DECIMAL(10,2),
    description TEXT,
    amenities JSON,
    includes_items JSON,
    broker_id VARCHAR(50),
    broker_name VARCHAR(100),
    broker_phone VARCHAR(20),
    broker_email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE SET NULL,
    FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE SET NULL
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    service_id VARCHAR(50) NOT NULL,
    service_data JSON,
    customer_info JSON,
    booking_details JSON,
    pricing JSON,
    check_in DATE,
    check_out DATE,
    guests INT,
    special_requests TEXT,
    contact_name VARCHAR(100),
    contact_phone VARCHAR(20),
    contact_email VARCHAR(100),
    payment_method VARCHAR(50),
    total_price VARCHAR(50),
    status ENUM('confirmed', 'pending', 'cancelled') DEFAULT 'confirmed',
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

-- Sessions table for managing user sessions
CREATE TABLE IF NOT EXISTS user_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50),
    user_type ENUM('user', 'admin', 'broker') NOT NULL,
    session_token VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (session_token),
    INDEX (user_id)
);

-- Insert default admin
INSERT INTO admins (id, name, email, password, role) VALUES 
('admin_001', 'System Administrator', 'admin@stayscape.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'super_admin');

-- Insert default broker
INSERT INTO brokers (id, name, email, phone, city, commission, password, status, access_level) VALUES 
('broker_master_001', 'Master Broker', 'broker@stayscape.com', '+92 300 0000000', 'All Cities', 10.00, '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'active', 'master');

-- Insert sample cities
INSERT INTO cities (name, description, image_url) VALUES 
('Karachi', 'The largest city and economic hub of Pakistan', 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg'),
('Lahore', 'The cultural capital of Pakistan', 'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg'),
('Islamabad', 'The modern capital city', 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg'),
('Peshawar', 'One of the oldest cities in the world', 'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg'),
('Multan', 'The city of saints', 'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg'),
('Faisalabad', 'The textile capital of Pakistan', 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg'),
('Quetta', 'The fruit garden of Pakistan', 'https://images.pexels.com/photos/2827722/pexels-photo-2827722.jpeg'),
('Rawalpindi', 'The twin city of Islamabad', 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg'),
('Murree', 'A popular hill station', 'https://images.pexels.com/photos/2827722/pexels-photo-2827722.jpeg'),
('Skardu', 'Gateway to the highest peaks', 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg');