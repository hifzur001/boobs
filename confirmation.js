// Confirmation page JavaScript
let currentUser = null;
let currentBooking = null;

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuth();
    
    // Load booking details
    loadBookingDetails();
});

function checkAuth() {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
        window.location.href = 'index.html';
        return;
    }
    
    currentUser = JSON.parse(userData);
    document.getElementById('userName').textContent = currentUser.name;
}

function loadBookingDetails() {
    const bookingData = localStorage.getItem('currentBooking');
    if (!bookingData) {
        window.location.href = 'index.html';
        return;
    }
    
    currentBooking = JSON.parse(bookingData);
    displayConfirmationDetails();
    
    // Clear the current booking from localStorage
    localStorage.removeItem('currentBooking');
}

function displayConfirmationDetails() {
    const detailsContainer = document.getElementById('confirmationDetails');
    
    detailsContainer.innerHTML = `
        <div class="row mb-4">
            <div class="col-md-4">
                <img src="${currentBooking.service.picture}" alt="${currentBooking.service.title}" class="img-fluid rounded">
            </div>
            <div class="col-md-8">
                <h5 class="fw-bold">${currentBooking.service.title}</h5>
                <p class="text-muted mb-2">
                    <i class="fas fa-map-marker-alt me-2"></i>
                    ${currentBooking.service.location}
                </p>
                <p class="text-muted mb-2">
                    <i class="fas fa-star text-warning me-2"></i>
                    ${currentBooking.service.rating} Rating
                </p>
                <span class="badge badge-${getBadgeClass(currentBooking.service.type)}">${currentBooking.service.type}</span>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-6">
                <h6 class="fw-bold mb-3">Booking Information</h6>
                <table class="table table-borderless">
                    <tr>
                        <td><strong>Booking ID:</strong></td>
                        <td>${currentBooking.id}</td>
                    </tr>
                    <tr>
                        <td><strong>Check-in:</strong></td>
                        <td>${formatDate(currentBooking.checkIn)}</td>
                    </tr>
                    <tr>
                        <td><strong>Check-out:</strong></td>
                        <td>${formatDate(currentBooking.checkOut)}</td>
                    </tr>
                    <tr>
                        <td><strong>Guests:</strong></td>
                        <td>${currentBooking.guests}</td>
                    </tr>
                    <tr>
                        <td><strong>Total Price:</strong></td>
                        <td class="text-success fw-bold">${currentBooking.totalPrice}</td>
                    </tr>
                    <tr>
                        <td><strong>Payment Method:</strong></td>
                        <td>${formatPaymentMethod(currentBooking.paymentMethod)}</td>
                    </tr>
                    <tr>
                        <td><strong>Status:</strong></td>
                        <td><span class="badge bg-success">Confirmed</span></td>
                    </tr>
                </table>
            </div>
            <div class="col-md-6">
                <h6 class="fw-bold mb-3">Contact Information</h6>
                <table class="table table-borderless">
                    <tr>
                        <td><strong>Name:</strong></td>
                        <td>${currentBooking.contactName}</td>
                    </tr>
                    <tr>
                        <td><strong>Phone:</strong></td>
                        <td>${currentBooking.contactPhone}</td>
                    </tr>
                    <tr>
                        <td><strong>Email:</strong></td>
                        <td>${currentUser.email}</td>
                    </tr>
                    <tr>
                        <td><strong>Booking Date:</strong></td>
                        <td>${currentBooking.bookingTime}</td>
                    </tr>
                </table>
                
                ${currentBooking.specialRequests ? `
                    <h6 class="fw-bold mb-2">Special Requests</h6>
                    <p class="text-muted">${currentBooking.specialRequests}</p>
                ` : ''}
            </div>
        </div>
        
        <div class="alert alert-info mt-4">
            <h6 class="alert-heading"><i class="fas fa-info-circle me-2"></i>Important Information</h6>
            <ul class="mb-0">
                <li>Please save your booking ID: <strong>${currentBooking.id}</strong></li>
                <li>You will receive a confirmation call within 24 hours</li>
                <li>Cancellation is free up to 24 hours before check-in</li>
                <li>Please carry a valid ID for verification</li>
            </ul>
        </div>
    `;
}

function getBadgeClass(type) {
    const typeMap = {
        'Accommodation': 'accommodation',
        'Experience': 'experience',
        'Transportation': 'transportation',
        'Wellness': 'wellness',
        'Adventure': 'adventure',
        'Food & Dining': 'food-dining',
        'Cultural': 'cultural',
        'Shopping': 'shopping',
        'Entertainment': 'entertainment',
        'Photography': 'photography'
    };
    return typeMap[type] || 'accommodation';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatPaymentMethod(method) {
    const methodMap = {
        'pay-on-arrival': 'Pay on Arrival',
        'bank-transfer': 'Bank Transfer',
        'easypaisa': 'EasyPaisa'
    };
    return methodMap[method] || method;
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}