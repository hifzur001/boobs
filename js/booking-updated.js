// Updated booking.js with API integration
let currentUser = null;
let selectedService = null;

document.addEventListener('DOMContentLoaded', function () {
    checkAuth();
    loadSelectedService();
    setupBookingForm();

    const today = new Date().toISOString().split('T')[0];
    document.getElementById('checkIn').min = today;
    document.getElementById('checkOut').min = today;
});

function checkAuth() {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
        window.location.href = 'index.html';
        return;
    }

    currentUser = JSON.parse(userData);
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('contactName').value = currentUser.name;
    document.getElementById('contactPhone').value = currentUser.phone || '';
}

function loadSelectedService() {
    const serviceData = localStorage.getItem('selectedService');
    if (!serviceData) {
        window.location.href = 'index.html';
        return;
    }

    selectedService = JSON.parse(serviceData);
    displayBookingSummary();
}

function displayBookingSummary() {
    const summaryContainer = document.getElementById('bookingSummary');
    const priceDisplay = getPriceDisplay(selectedService);

    summaryContainer.innerHTML = `
        <div class="text-center mb-3">
            <img src="${selectedService.picture}" alt="${
        selectedService.title
    }" class="img-fluid rounded" style="height: 150px; width: 100%; object-fit: cover;">
        </div>
        <h6 class="fw-bold">${selectedService.title}</h6>
        <p class="text-muted small mb-2">
            <i class="fas fa-map-marker-alt me-1"></i>
            ${selectedService.location}
        </p>
        <p class="text-muted small mb-2">
            <i class="fas fa-star text-warning me-1"></i>
            ${selectedService.rating} Rating
        </p>
        <p class="text-muted small mb-3">
            <i class="fas fa-user-tie me-1"></i>
            Broker: ${selectedService.brokerName || 'StayScape Partner'}
        </p>
        <hr>
        <div class="d-flex justify-content-between mb-2">
            <span>Base Price:</span>
            <span class="fw-bold" id="basePrice">${priceDisplay}</span>
        </div>
        <div class="d-flex justify-content-between mb-2">
            <span>Service Fee:</span>
            <span id="serviceFee">PKR 500</span>
        </div>
        <div class="d-flex justify-content-between mb-2" id="brokerCommissionRow" style="display: none;">
            <span>Broker Commission:</span>
            <span id="brokerCommission">PKR 0</span>
        </div>
        <hr>
        <div class="d-flex justify-content-between">
            <span class="fw-bold">Total:</span>
            <span class="fw-bold text-success" id="totalPrice">${priceDisplay}</span>
        </div>
    `;
}

function setupBookingForm() {
    const bookingForm = document.getElementById('bookingForm');

    document.getElementById('checkIn').addEventListener('change', function () {
        const checkInDate = new Date(this.value);
        const checkOutDate = new Date(checkInDate);
        checkOutDate.setDate(checkOutDate.getDate() + 1);

        document.getElementById('checkOut').min = checkOutDate
            .toISOString()
            .split('T')[0];

        if (document.getElementById('checkOut').value <= this.value) {
            document.getElementById('checkOut').value = checkOutDate
                .toISOString()
                .split('T')[0];
        }

        updateTotalPrice();
    });

    document
        .getElementById('checkOut')
        .addEventListener('change', updateTotalPrice);
    document
        .getElementById('guests')
        .addEventListener('change', updateTotalPrice);

    bookingForm.addEventListener('submit', handleBookingSubmission);
}

function updateTotalPrice() {
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const guests = parseInt(document.getElementById('guests').value) || 1;

    if (!checkIn || !checkOut) return;

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );

    let basePrice = 0;
    if (selectedService.price_per_night) {
        basePrice = selectedService.price_per_night * nights;
    } else if (selectedService.price_per_day) {
        basePrice = selectedService.price_per_day * nights;
    } else if (selectedService.price_per_hour) {
        basePrice = selectedService.price_per_hour * (nights * 24);
    } else if (selectedService.price_per_km) {
        basePrice = selectedService.price_per_km * 100; // Assume 100km default
    } else {
        basePrice = selectedService.price;
    }

    // Add guest multiplier for certain services
    if (
        guests > 2 &&
        ['Experience', 'Adventure', 'Food & Dining'].includes(
            selectedService.type
        )
    ) {
        basePrice *= guests;
    }

    const serviceFee = 500;
    const total = basePrice + serviceFee;

    // Update display
    document.getElementById(
        'basePrice'
    ).textContent = `PKR ${basePrice.toLocaleString()}`;
    document.getElementById(
        'totalPrice'
    ).textContent = `PKR ${total.toLocaleString()}`;
}

async function handleBookingSubmission(e) {
    e.preventDefault();

    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const guests = document.getElementById('guests').value;
    const specialRequests = document.getElementById('specialRequests').value;
    const contactName = document.getElementById('contactName').value;
    const contactPhone = document.getElementById('contactPhone').value;
    const paymentMethod = document.querySelector(
        'input[name="paymentMethod"]:checked'
    ).value;
    const totalPriceText = document.getElementById('totalPrice').textContent;

    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
    submitBtn.disabled = true;

    try {
        // Create booking data
        const bookingData = {
            userId: currentUser.id,
            serviceId: selectedService.id,
            checkIn: checkIn,
            checkOut: checkOut,
            guests: parseInt(guests),
            specialRequests: specialRequests,
            contactName: contactName,
            contactPhone: contactPhone,
            contactEmail: currentUser.email,
            paymentMethod: paymentMethod,
            totalPrice: totalPriceText
        };

        // Submit booking via API
        const response = await window.apiClient.createBooking(bookingData);
        
        if (response.success) {
            // Store current booking for confirmation page
            localStorage.setItem('currentBooking', JSON.stringify(response.booking));
            
            // Redirect to confirmation page
            window.location.href = 'confirmation.html';
        } else {
            throw new Error(response.error || 'Booking failed');
        }
    } catch (error) {
        console.error('Booking error:', error);
        alert('Booking failed: ' + error.message);
        
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

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

function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('sessionToken');
    window.location.href = 'index.html';
}