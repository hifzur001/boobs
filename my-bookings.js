// My Bookings page JavaScript
let currentUser = null;
let userBookings = [];
let selectedBookingId = null;

document.addEventListener('DOMContentLoaded', function () {
    // Check authentication
    checkAuth();

    // Load user bookings
    loadUserBookings();
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

function loadUserBookings() {
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    userBookings = allBookings.filter(
        booking => booking.userId === currentUser.id
    );

    displayBookings();
}

function displayBookings() {
    const bookingsContainer = document.getElementById('bookingsContainer');
    const noBookingsDiv = document.getElementById('noBookings');

    if (userBookings.length === 0) {
        bookingsContainer.style.display = 'none';
        noBookingsDiv.style.display = 'block';
        return;
    }

    bookingsContainer.style.display = 'block';
    noBookingsDiv.style.display = 'none';

    // Sort bookings by date (newest first)
    userBookings.sort(
        (a, b) => new Date(b.bookingDate) - new Date(a.bookingDate)
    );

    bookingsContainer.innerHTML = userBookings
        .map(booking => createBookingCard(booking))
        .join('');
}

function createBookingCard(booking) {
    const statusClass = getStatusClass(booking.status);
    const statusText = getStatusText(booking.status);

    return `
        <div class="card booking-card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${booking.service.picture}" alt="${
        booking.service.title
    }" class="img-fluid rounded">
                    </div>
                    <div class="col-md-6">
                        <h5 class="card-title mt-3">${
                            booking.service.title
                        }</h5>
                        <p class="text-muted mb-2">
                            <i class="fas fa-map-marker-alt me-2"></i>
                            ${booking.service.location}
                        </p>
                        <p class="text-muted mb-2">
                            <i class="fas fa-calendar me-2"></i>
                            ${formatDate(booking.checkIn)} - ${formatDate(
        booking.checkOut
    )}
                        </p>
                        <p class="text-muted mb-2">
                            <i class="fas fa-users me-2"></i>
                            ${booking.guests} Guest${
        booking.guests > 1 ? 's' : ''
    }
                        </p>
                        <span class="badge badge-${getBadgeClass(
                            booking.service.type
                        )} me-2">${booking.service.type}</span>
                        <span class="booking-status status-${
                            booking.status
                        }">${statusText}</span>
                    </div>
                    <div class="col-md-3 text-md-end">
                        <h5 class="text-success mb-2 mt-2">${
                            booking.totalPrice
                        }</h5>
                        <p class="text-muted small mb-3">Booking ID: ${
                            booking.id
                        }</p>
                        <div class="d-grid gap-2">
                            <button class="btn btn-outline-primary btn-sm" onclick="viewBookingDetails('${
                                booking.id
                            }')">
                                <i class="fas fa-eye me-1"></i>View Details
                            </button>
                            ${
                                booking.status === 'confirmed'
                                    ? `
                                <button class="btn btn-outline-danger btn-sm" onclick="cancelBooking('${booking.id}')">
                                    <i class="fas fa-times me-1"></i>Cancel
                                </button>
                            `
                                    : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function viewBookingDetails(bookingId) {
    const booking = userBookings.find(b => b.id === bookingId);
    if (!booking) return;

    selectedBookingId = bookingId;

    const modalBody = document.getElementById('modalBookingDetails');
    modalBody.innerHTML = `
        <div class="row mb-4">
            <div class="col-md-4">
                <img src="${booking.service.picture}" alt="${
        booking.service.title
    }" class="img-fluid rounded">
            </div>
            <div class="col-md-8">
                <h5 class="fw-bold">${booking.service.title}</h5>
                <p class="text-muted mb-2">
                    <i class="fas fa-map-marker-alt me-2"></i>
                    ${booking.service.location}
                </p>
                <p class="text-muted mb-2">
                    <i class="fas fa-star text-warning me-2"></i>
                    ${booking.service.rating} Rating
                </p>
                <span class="badge badge-${getBadgeClass(
                    booking.service.type
                )} me-2">${booking.service.type}</span>
                <span class="booking-status status-${
                    booking.status
                }">${getStatusText(booking.status)}</span>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <h6 class="fw-bold mb-3">Booking Details</h6>
                <table class="table table-sm">
                    <tr>
                        <td><strong>Booking ID:</strong></td>
                        <td>${booking.id}</td>
                    </tr>
                    <tr>
                        <td><strong>Check-in:</strong></td>
                        <td>${formatDate(booking.checkIn)}</td>
                    </tr>
                    <tr>
                        <td><strong>Check-out:</strong></td>
                        <td>${formatDate(booking.checkOut)}</td>
                    </tr>
                    <tr>
                        <td><strong>Guests:</strong></td>
                        <td>${booking.guests}</td>
                    </tr>
                    <tr>
                        <td><strong>Total Price:</strong></td>
                        <td class="text-success fw-bold">${
                            booking.totalPrice
                        }</td>
                    </tr>
                    <tr>
                        <td><strong>Payment:</strong></td>
                        <td>${formatPaymentMethod(booking.paymentMethod)}</td>
                    </tr>
                </table>
            </div>
            <div class="col-md-6">
                <h6 class="fw-bold mb-3">Contact Info</h6>
                <table class="table table-sm">
                    <tr>
                        <td><strong>Name:</strong></td>
                        <td>${booking.contactName}</td>
                    </tr>
                    <tr>
                        <td><strong>Phone:</strong></td>
                        <td>${booking.contactPhone}</td>
                    </tr>
                    <tr>
                        <td><strong>Booked on:</strong></td>
                        <td>${booking.bookingTime}</td>
                    </tr>
                </table>
                ${
                    booking.specialRequests
                        ? `
                    <h6 class="fw-bold mb-2">Special Requests</h6>
                    <p class="text-muted">${booking.specialRequests}</p>
                `
                        : ''
                }
            </div>
        </div>
    `;

    const modal = window.bootstrap.Modal.getOrCreateInstance(
        document.getElementById('bookingDetailsModal')
    );
    modal.show();
}

function cancelBooking(bookingId = null) {
    const idToCancel = bookingId || selectedBookingId;
    if (!idToCancel) return;

    if (!confirm('Are you sure you want to cancel this booking?')) {
        return;
    }

    // Update booking status
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const bookingIndex = allBookings.findIndex(b => b.id === idToCancel);

    if (bookingIndex !== -1) {
        allBookings[bookingIndex].status = 'cancelled';
        localStorage.setItem('bookings', JSON.stringify(allBookings));

        // Reload bookings
        loadUserBookings();

        // Close modal if open
        const modal = window.bootstrap.Modal.getInstance(
            document.getElementById('bookingDetailsModal')
        );
        if (modal) {
            modal.hide();
        }

        showAlert('Booking cancelled successfully!', 'success');
    }
}

// Utility functions
function getBadgeClass(type) {
    const typeMap = {
        Accommodation: 'accommodation',
        Experience: 'experience',
        Transportation: 'transportation',
        Wellness: 'wellness',
        Adventure: 'adventure',
        'Food & Dining': 'food-dining',
        Cultural: 'cultural',
        Shopping: 'shopping',
        Entertainment: 'entertainment',
        Photography: 'photography',
    };
    return typeMap[type] || 'accommodation';
}

function getStatusClass(status) {
    const statusMap = {
        confirmed: 'status-confirmed',
        pending: 'status-pending',
        cancelled: 'status-cancelled',
    };
    return statusMap[status] || 'status-pending';
}

function getStatusText(status) {
    const statusMap = {
        confirmed: 'Confirmed',
        pending: 'Pending',
        cancelled: 'Cancelled',
    };
    return statusMap[status] || 'Unknown';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

function formatPaymentMethod(method) {
    const methodMap = {
        'pay-on-arrival': 'Pay on Arrival',
        'bank-transfer': 'Bank Transfer',
        easypaisa: 'EasyPaisa',
    };
    return methodMap[method] || method;
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

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}
