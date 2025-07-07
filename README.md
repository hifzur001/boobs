# StayScape Services - PHP SQL Backend

A complete travel booking platform for Pakistan with PHP backend, MySQL database, and modern frontend.

## Features

- **User Management**: Registration, login, profile management
- **Admin Panel**: Complete dashboard for managing bookings, users, and services
- **Broker Panel**: Interface for service providers to manage their offerings
- **Booking System**: Full booking flow with confirmation and management
- **Service Management**: CRUD operations for travel services
- **Authentication**: Secure session-based authentication
- **Responsive Design**: Mobile-first responsive design

## Technology Stack

### Backend
- **PHP 7.4+**: Server-side scripting
- **MySQL 5.7+**: Database management
- **PDO**: Database abstraction layer
- **RESTful APIs**: Clean API architecture

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties
- **JavaScript ES6+**: Interactive functionality
- **Bootstrap 5**: Responsive framework
- **Font Awesome**: Icon library

## Installation

### Prerequisites
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Web server (Apache/Nginx)
- Composer (optional)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stayscape-services
   ```

2. **Database Setup**
   ```bash
   # Create database
   mysql -u root -p
   CREATE DATABASE stayscape_db;
   
   # Import schema
   mysql -u root -p stayscape_db < database/schema.sql
   ```

3. **Configure Database Connection**
   Edit `config/database.php`:
   ```php
   private $host = "localhost";
   private $db_name = "stayscape_db";
   private $username = "your_username";
   private $password = "your_password";
   ```

4. **Set up Web Server**
   - Point document root to project directory
   - Ensure PHP is enabled
   - Enable URL rewriting if needed

5. **File Permissions**
   ```bash
   chmod 755 api/
   chmod 644 api/*.php
   ```

## API Endpoints

### Authentication
- `POST /api/auth.php?action=login` - User login
- `POST /api/auth.php?action=register` - User registration
- `POST /api/auth.php?action=admin-login` - Admin login
- `POST /api/auth.php?action=broker-login` - Broker login
- `POST /api/auth.php?action=logout` - Logout
- `GET /api/auth.php?action=verify-session` - Verify session

### Services
- `GET /api/services.php?action=get-cities` - Get all cities
- `GET /api/services.php?action=get-services` - Get services (with filters)
- `GET /api/services.php?action=get-service&id={id}` - Get single service
- `POST /api/services.php?action=add-service` - Add new service
- `GET /api/services.php?action=get-pakistan-data` - Get complete data structure

### Bookings
- `POST /api/bookings.php?action=create` - Create booking
- `GET /api/bookings.php?action=get-user-bookings&user_id={id}` - Get user bookings
- `GET /api/bookings.php?action=get-all-bookings` - Get all bookings (admin)
- `GET /api/bookings.php?action=get-booking&id={id}` - Get single booking
- `POST /api/bookings.php?action=update-status` - Update booking status
- `POST /api/bookings.php?action=cancel&id={id}` - Cancel booking

## Database Schema

### Tables
- **users**: User accounts and profiles
- **admins**: Administrator accounts
- **brokers**: Service provider accounts
- **cities**: Available cities
- **services**: Travel services and offerings
- **bookings**: Booking records
- **user_sessions**: Session management

### Key Relationships
- Users → Bookings (one-to-many)
- Services → Bookings (one-to-many)
- Brokers → Services (one-to-many)
- Cities → Services (one-to-many)

## Default Credentials

### Admin Panel
- **Email**: admin@stayscape.com
- **Password**: admin123

### Broker Panel
- **Email**: broker@stayscape.com
- **Password**: broker123

## File Structure

```
stayscape-services/
├── api/                    # API endpoints
│   ├── auth.php           # Authentication API
│   ├── services.php       # Services API
│   └── bookings.php       # Bookings API
├── config/                # Configuration files
│   └── database.php       # Database configuration
├── database/              # Database files
│   └── schema.sql         # Database schema
├── js/                    # JavaScript files
│   ├── api-client.js      # API client library
│   ├── script-updated.js  # Main application script
│   ├── booking-updated.js # Booking functionality
│   └── admin-updated.js   # Admin panel script
├── css/                   # Stylesheets
│   └── style.css          # Main stylesheet
├── *.html                 # HTML pages
└── README.md              # This file
```

## Security Features

- **Password Hashing**: bcrypt for secure password storage
- **Session Management**: Secure token-based sessions
- **SQL Injection Prevention**: PDO prepared statements
- **XSS Protection**: Input sanitization
- **CSRF Protection**: Token validation
- **Access Control**: Role-based permissions

## Development

### Adding New Features
1. Create API endpoint in appropriate file
2. Update database schema if needed
3. Add frontend functionality
4. Test thoroughly

### Database Migrations
- Always backup before schema changes
- Use transactions for complex operations
- Test on development environment first

## Deployment

### Production Checklist
- [ ] Update database credentials
- [ ] Enable HTTPS
- [ ] Set secure session settings
- [ ] Configure error logging
- [ ] Set up database backups
- [ ] Configure web server security headers

### Environment Variables
Consider using environment variables for:
- Database credentials
- API keys
- Session secrets
- Debug settings

## Troubleshooting

### Common Issues
1. **Database Connection Failed**
   - Check credentials in `config/database.php`
   - Verify MySQL service is running
   - Check firewall settings

2. **API Endpoints Not Working**
   - Verify web server configuration
   - Check file permissions
   - Enable error reporting for debugging

3. **Session Issues**
   - Check session configuration
   - Verify token generation
   - Clear browser cache

### Debug Mode
Enable debug mode by adding to API files:
```php
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Check existing documentation
- Review API endpoints and examples