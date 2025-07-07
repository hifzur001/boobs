// Enhanced Booking page JavaScript with complete data flow
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

    // Calculate broker commission (for display purposes)
    const brokers = JSON.parse(localStorage.getItem('brokers') || '[]');
    const broker = brokers.find(b => b.id === selectedService.brokerId);
    const brokerCommissionRate = broker ? broker.commission : 10;
    const brokerCommissionAmount = (basePrice * brokerCommissionRate) / 100;

    // Update display
    document.getElementById(
        'basePrice'
    ).textContent = `PKR ${basePrice.toLocaleString()}`;
    document.getElementById(
        'totalPrice'
    ).textContent = `PKR ${total.toLocaleString()}`;

    // Show broker commission for transparency
    if (broker) {
        document.getElementById('brokerCommissionRow').style.display = 'flex';
        document.getElementById(
            'brokerCommission'
        ).textContent = `PKR ${brokerCommissionAmount.toLocaleString()} (${brokerCommissionRate}%)`;
    }
}

function handleBookingSubmission(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
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

    // Create comprehensive booking data
    const bookingData = {
        id: 'BK' + Date.now(),
        userId: currentUser.id,
        serviceId: selectedService.id,
        service: {
            ...selectedService,
            brokerInfo: {
                brokerId: selectedService.brokerId,
                brokerName: selectedService.brokerName,
                brokerEmail: selectedService.brokerEmail,
                brokerPhone: selectedService.brokerPhone,
            },
        },
        customerInfo: {
            userId: currentUser.id,
            name: contactName,
            email: currentUser.email,
            phone: contactPhone,
        },
        bookingDetails: {
            checkIn: checkIn,
            checkOut: checkOut,
            guests: parseInt(guests),
            specialRequests: specialRequests,
            paymentMethod: paymentMethod,
        },
        pricing: {
            basePrice: parseFloat(
                document
                    .getElementById('basePrice')
                    .textContent.replace(/[^\d]/g, '')
            ),
            serviceFee: 500,
            totalAmount: parseFloat(totalPriceText.replace(/[^\d]/g, '')),
            brokerCommission: parseFloat(
                document
                    .getElementById('brokerCommission')
                    .textContent.replace(/[^\d]/g, '') || 0
            ),
        },
        // Legacy fields for compatibility
        checkIn: checkIn,
        checkOut: checkOut,
        guests: guests,
        specialRequests: specialRequests,
        contactName: contactName,
        contactPhone: contactPhone,
        paymentMethod: paymentMethod,
        totalPrice: totalPriceText,
        status: 'confirmed',
        bookingDate: new Date().toISOString(),
        bookingTime: new Date().toLocaleString(),
        createdAt: new Date().toISOString(),
    };

    // Process booking with complete data flow
    const processedBooking = window.completeBooking
        ? window.completeBooking(bookingData)
        : completeBookingLocal(bookingData);

    // Store current booking for confirmation page
    localStorage.setItem('currentBooking', JSON.stringify(processedBooking));

    // Redirect to confirmation page
    window.location.href = 'confirmation.html';
}

// Local booking completion if main script not available
function completeBookingLocal(bookingData) {
    // Save booking
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    allBookings.push(bookingData);
    localStorage.setItem('bookings', JSON.stringify(allBookings));

    // Update user stats
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex].totalBookings =
            (users[userIndex].totalBookings || 0) + 1;
        users[userIndex].totalSpent =
            (users[userIndex].totalSpent || 0) +
            bookingData.pricing.totalAmount;
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Update broker stats
    const brokers = JSON.parse(localStorage.getItem('brokers') || '[]');
    const brokerIndex = brokers.findIndex(
        b => b.id === selectedService.brokerId
    );
    if (brokerIndex !== -1) {
        brokers[brokerIndex].totalBookings =
            (brokers[brokerIndex].totalBookings || 0) + 1;
        brokers[brokerIndex].totalEarnings =
            (brokers[brokerIndex].totalEarnings || 0) +
            bookingData.pricing.brokerCommission;
        localStorage.setItem('brokers', JSON.stringify(brokers));
    }

    return bookingData;
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
    window.location.href = 'index.html';
}
