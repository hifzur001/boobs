// API Client for StayScape Application
class APIClient {
    constructor() {
        this.baseURL = '/api';
        this.sessionToken = localStorage.getItem('sessionToken');
    }

    // Set session token
    setSessionToken(token) {
        this.sessionToken = token;
        localStorage.setItem('sessionToken', token);
    }

    // Clear session token
    clearSessionToken() {
        this.sessionToken = null;
        localStorage.removeItem('sessionToken');
    }

    // Make HTTP request
    async makeRequest(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        // Add authorization header if token exists
        if (this.sessionToken) {
            config.headers['Authorization'] = `Bearer ${this.sessionToken}`;
        }

        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Request failed');
            }
            
            return data;
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    }

    // Authentication methods
    async login(email, password) {
        const response = await this.makeRequest('/auth.php?action=login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        
        if (response.success && response.user.sessionToken) {
            this.setSessionToken(response.user.sessionToken);
        }
        
        return response;
    }

    async register(userData) {
        const response = await this.makeRequest('/auth.php?action=register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
        
        if (response.success && response.user.sessionToken) {
            this.setSessionToken(response.user.sessionToken);
        }
        
        return response;
    }

    async adminLogin(email, password) {
        const response = await this.makeRequest('/auth.php?action=admin-login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        
        if (response.success && response.admin.sessionToken) {
            this.setSessionToken(response.admin.sessionToken);
        }
        
        return response;
    }

    async brokerLogin(email, password) {
        const response = await this.makeRequest('/auth.php?action=broker-login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        
        if (response.success && response.broker.sessionToken) {
            this.setSessionToken(response.broker.sessionToken);
        }
        
        return response;
    }

    async logout() {
        const response = await this.makeRequest('/auth.php?action=logout', {
            method: 'POST'
        });
        
        this.clearSessionToken();
        return response;
    }

    async verifySession() {
        return await this.makeRequest('/auth.php?action=verify-session');
    }

    // Services methods
    async getCities() {
        return await this.makeRequest('/services.php?action=get-cities');
    }

    async getServices(city = '', type = '', limit = 50) {
        const params = new URLSearchParams();
        if (city) params.append('city', city);
        if (type) params.append('type', type);
        if (limit) params.append('limit', limit);
        
        return await this.makeRequest(`/services.php?action=get-services&${params.toString()}`);
    }

    async getService(serviceId) {
        return await this.makeRequest(`/services.php?action=get-service&id=${serviceId}`);
    }

    async getPakistanData() {
        return await this.makeRequest('/services.php?action=get-pakistan-data');
    }

    async addService(serviceData) {
        return await this.makeRequest('/services.php?action=add-service', {
            method: 'POST',
            body: JSON.stringify(serviceData)
        });
    }

    // Bookings methods
    async createBooking(bookingData) {
        return await this.makeRequest('/bookings.php?action=create', {
            method: 'POST',
            body: JSON.stringify(bookingData)
        });
    }

    async getUserBookings(userId) {
        return await this.makeRequest(`/bookings.php?action=get-user-bookings&user_id=${userId}`);
    }

    async getAllBookings() {
        return await this.makeRequest('/bookings.php?action=get-all-bookings');
    }

    async getBooking(bookingId) {
        return await this.makeRequest(`/bookings.php?action=get-booking&id=${bookingId}`);
    }

    async updateBookingStatus(bookingId, status) {
        return await this.makeRequest('/bookings.php?action=update-status', {
            method: 'POST',
            body: JSON.stringify({ booking_id: bookingId, status })
        });
    }

    async cancelBooking(bookingId) {
        return await this.makeRequest(`/bookings.php?action=cancel&id=${bookingId}`, {
            method: 'POST'
        });
    }
}

// Create global API client instance
window.apiClient = new APIClient();

// Helper functions for backward compatibility
window.completeBooking = async function(bookingData) {
    try {
        const response = await window.apiClient.createBooking(bookingData);
        if (response.success) {
            return response.booking;
        } else {
            throw new Error(response.error || 'Booking failed');
        }
    } catch (error) {
        console.error('Booking error:', error);
        throw error;
    }
};

// Session management
window.checkUserSession = async function() {
    try {
        const response = await window.apiClient.verifySession();
        return response.valid;
    } catch (error) {
        return false;
    }
};

// Initialize session check on page load
document.addEventListener('DOMContentLoaded', async function() {
    const sessionToken = localStorage.getItem('sessionToken');
    if (sessionToken) {
        try {
            const isValid = await window.checkUserSession();
            if (!isValid) {
                localStorage.removeItem('sessionToken');
                localStorage.removeItem('currentUser');
                localStorage.removeItem('currentAdmin');
                localStorage.removeItem('currentBroker');
            }
        } catch (error) {
            console.error('Session verification failed:', error);
        }
    }
});