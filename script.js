// Enhanced Pakistan cities data with complete broker integration
const pakistanData = {
    Pakistan: {
        cities: [
            {
                name: 'Lahore',
                services: [
                    {
                        id: 'lahore-1',
                        type: 'Accommodation',
                        title: 'Luxury Villa in DHA Phase 5',
                        price_per_night: 12000,
                        location: 'DHA Phase 5, Lahore',
                        rating: 4.8,
                        picture:
                            'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
                        brokerId: 'broker_lahore_001',
                        brokerName: 'Ahmed Khan',
                        brokerPhone: '+92 300 1234567',
                        brokerEmail: 'ahmed@stayscape.com',
                        description:
                            'Luxurious villa with modern amenities in the heart of DHA Phase 5',
                        amenities: [
                            'WiFi',
                            'AC',
                            'Parking',
                            'Security',
                            'Garden',
                        ],
                        maxGuests: 8,
                        bedrooms: 4,
                        bathrooms: 3,
                    },
                    {
                        id: 'lahore-2',
                        type: 'Experience',
                        title: 'Old City Heritage Food Tour',
                        price: 3000,
                        location: 'Gawalmandi, Lahore',
                        rating: 4.9,
                        picture:
                            'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
                        brokerId: 'broker_lahore_002',
                        brokerName: 'Fatima Ali',
                        brokerPhone: '+92 301 2345678',
                        brokerEmail: 'fatima@stayscape.com',
                        description:
                            "Authentic food tour through Lahore's historic old city",
                        duration: '4 hours',
                        includes: ['Guide', 'Food Tastings', 'Transportation'],
                        maxGuests: 12,
                    },
                    {
                        id: 'lahore-3',
                        type: 'Transportation',
                        title: 'Premium Car Rental Service',
                        price_per_day: 4500,
                        location: 'City-wide, Lahore',
                        rating: 4.4,
                        picture:
                            'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
                        brokerId: 'broker_lahore_003',
                        brokerName: 'Muhammad Hassan',
                        brokerPhone: '+92 302 3456789',
                        brokerEmail: 'hassan@stayscape.com',
                        description:
                            'Premium car rental with professional driver',
                        carType: 'Luxury Sedan',
                        fuelIncluded: true,
                        driverIncluded: true,
                    },
                    {
                        id: 'lahore-4',
                        type: 'Wellness',
                        title: 'Spa & Wellness Center',
                        price_per_hour: 2500,
                        location: 'Gulberg, Lahore',
                        rating: 4.6,
                        picture:
                            'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg',
                        brokerId: 'broker_lahore_004',
                        brokerName: 'Dr. Ayesha Khan',
                        brokerPhone: '+92 303 4567890',
                        brokerEmail: 'ayesha@stayscape.com',
                        description: 'Premium spa and wellness treatments',
                        services: ['Massage', 'Facial', 'Aromatherapy'],
                        maxGuests: 2,
                    },
                    {
                        id: 'lahore-5',
                        type: 'Adventure',
                        title: 'River Rafting Adventure',
                        price: 5500,
                        location: 'River Ravi, Lahore',
                        rating: 4.7,
                        picture:
                            'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
                        brokerId: 'broker_lahore_005',
                        brokerName: 'Captain Ali',
                        brokerPhone: '+92 304 5678901',
                        brokerEmail: 'ali@stayscape.com',
                        description: 'Thrilling river rafting experience',
                        duration: '6 hours',
                        includes: ['Equipment', 'Guide', 'Safety Gear'],
                        maxGuests: 8,
                    },
                ],
            },
            {
                name: 'Karachi',
                services: [
                    {
                        id: 'karachi-1',
                        type: 'Accommodation',
                        title: 'Clifton Beach Luxury Apartment',
                        price_per_night: 8500,
                        location: 'Clifton Block 4, Karachi',
                        rating: 4.7,
                        picture:
                            'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg',
                        brokerId: 'broker_karachi_001',
                        brokerName: 'Zara Ahmed',
                        brokerPhone: '+92 305 1234567',
                        brokerEmail: 'zara@stayscape.com',
                        description:
                            'Luxury apartment with sea view in Clifton',
                        amenities: ['Sea View', 'WiFi', 'AC', 'Parking'],
                        maxGuests: 6,
                        bedrooms: 3,
                        bathrooms: 2,
                    },
                    {
                        id: 'karachi-2',
                        type: 'Experience',
                        title: 'Manora Island Deep Sea Fishing',
                        price: 4500,
                        location: 'Manora Island, Karachi',
                        rating: 4.8,
                        picture:
                            'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg',
                        brokerId: 'broker_karachi_002',
                        brokerName: 'Captain Rashid',
                        brokerPhone: '+92 306 2345678',
                        brokerEmail: 'rashid@stayscape.com',
                        description:
                            'Deep sea fishing experience around Manora Island',
                        duration: '6 hours',
                        includes: ['Boat', 'Equipment', 'Lunch', 'Guide'],
                        maxGuests: 8,
                    },
                    {
                        id: 'karachi-3',
                        type: 'Transportation',
                        title: 'Airport Transfer Service',
                        price_per_km: 25,
                        location: 'Karachi Airport',
                        rating: 4.5,
                        picture:
                            'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg',
                        brokerId: 'broker_karachi_003',
                        brokerName: 'Tariq Malik',
                        brokerPhone: '+92 307 3456789',
                        brokerEmail: 'tariq@stayscape.com',
                        description: 'Reliable airport transfer service',
                        carType: 'Sedan/SUV',
                        available24x7: true,
                    },
                    {
                        id: 'karachi-4',
                        type: 'Food & Dining',
                        title: 'Street Food Tour',
                        price: 2500,
                        location: 'Burns Road, Karachi',
                        rating: 4.9,
                        picture:
                            'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
                        brokerId: 'broker_karachi_004',
                        brokerName: 'Chef Salman',
                        brokerPhone: '+92 308 4567890',
                        brokerEmail: 'salman@stayscape.com',
                        description: 'Authentic Karachi street food experience',
                        duration: '3 hours',
                        includes: ['Guide', 'Food Tastings', 'Drinks'],
                        maxGuests: 10,
                    },
                ],
            },
            {
                name: 'Islamabad',
                services: [
                    {
                        id: 'islamabad-1',
                        type: 'Accommodation',
                        title: 'Margalla Hills Eco Resort',
                        price_per_night: 9500,
                        location: 'Margalla Hills, Islamabad',
                        rating: 4.9,
                        picture:
                            'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg',
                        brokerId: 'broker_islamabad_001',
                        brokerName: 'Dr. Sarah Khan',
                        brokerPhone: '+92 308 1234567',
                        brokerEmail: 'sarah@stayscape.com',
                        description:
                            'Eco-friendly resort in the Margalla Hills',
                        amenities: [
                            'Mountain View',
                            'Hiking Trails',
                            'Organic Food',
                        ],
                        maxGuests: 4,
                        bedrooms: 2,
                        bathrooms: 2,
                    },
                    {
                        id: 'islamabad-2',
                        type: 'Adventure',
                        title: 'Margalla Hills Hiking',
                        price: 1500,
                        location: 'Margalla Hills National Park',
                        rating: 4.6,
                        picture:
                            'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
                        brokerId: 'broker_islamabad_002',
                        brokerName: 'Hiking Guide Ahmad',
                        brokerPhone: '+92 309 2345678',
                        brokerEmail: 'ahmad@stayscape.com',
                        description: 'Guided hiking tours in Margalla Hills',
                        duration: '4 hours',
                        includes: ['Guide', 'Water', 'First Aid'],
                        maxGuests: 15,
                    },
                    {
                        id: 'islamabad-3',
                        type: 'Cultural',
                        title: 'Faisal Mosque & Monument Tour',
                        price: 2000,
                        location: 'Islamabad City',
                        rating: 4.8,
                        picture:
                            'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg',
                        brokerId: 'broker_islamabad_003',
                        brokerName: 'Tour Guide Fatima',
                        brokerPhone: '+92 310 3456789',
                        brokerEmail: 'fatima.guide@stayscape.com',
                        description: "Cultural tour of Islamabad's landmarks",
                        duration: '5 hours',
                        includes: ['Guide', 'Transportation', 'Entry Fees'],
                        maxGuests: 12,
                    },
                ],
            },
            {
                name: 'Peshawar',
                services: [
                    {
                        id: 'peshawar-1',
                        type: 'Accommodation',
                        title: 'Heritage Haveli in Old City',
                        price_per_night: 5500,
                        location: 'Qissa Khwani Bazaar, Peshawar',
                        rating: 4.6,
                        picture:
                            'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg',
                        brokerId: 'broker_peshawar_001',
                        brokerName: 'Khan Sahib',
                        brokerPhone: '+92 310 1234567',
                        brokerEmail: 'khan@stayscape.com',
                        description:
                            'Traditional haveli with authentic Peshawari hospitality',
                        amenities: [
                            'Traditional Architecture',
                            'Cultural Experience',
                        ],
                        maxGuests: 6,
                        bedrooms: 3,
                        bathrooms: 2,
                    },
                    {
                        id: 'peshawar-2',
                        type: 'Cultural',
                        title: 'Peshawar Museum & Bazaar Tour',
                        price: 2500,
                        location: 'Peshawar Old City',
                        rating: 4.7,
                        picture:
                            'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg',
                        brokerId: 'broker_peshawar_002',
                        brokerName: 'Cultural Guide Malik',
                        brokerPhone: '+92 311 2345678',
                        brokerEmail: 'malik@stayscape.com',
                        description:
                            "Explore Peshawar's rich cultural heritage",
                        duration: '6 hours',
                        includes: ['Guide', 'Museum Entry', 'Tea'],
                        maxGuests: 10,
                    },
                    {
                        id: 'peshawar-3',
                        type: 'Food & Dining',
                        title: 'Peshawari Cuisine Experience',
                        price: 3500,
                        location: 'Namak Mandi, Peshawar',
                        rating: 4.8,
                        picture:
                            'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
                        brokerId: 'broker_peshawar_003',
                        brokerName: 'Chef Gul Khan',
                        brokerPhone: '+92 312 3456789',
                        brokerEmail: 'gul@stayscape.com',
                        description:
                            'Authentic Peshawari food tasting experience',
                        duration: '3 hours',
                        includes: [
                            'Multiple Dishes',
                            'Traditional Tea',
                            'Guide',
                        ],
                        maxGuests: 8,
                    },
                ],
            },
            {
                name: 'Multan',
                services: [
                    {
                        id: 'multan-1',
                        type: 'Accommodation',
                        title: 'Sufi Heritage Boutique Hotel',
                        price_per_night: 6500,
                        location: 'Shah Rukn-e-Alam Area, Multan',
                        rating: 4.7,
                        picture:
                            'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg',
                        brokerId: 'broker_multan_001',
                        brokerName: 'Sufi Ahmad',
                        brokerPhone: '+92 311 1234567',
                        brokerEmail: 'sufi@stayscape.com',
                        description: 'Boutique hotel near Sufi shrines',
                        amenities: ['Spiritual Ambiance', 'Traditional Decor'],
                        maxGuests: 4,
                        bedrooms: 2,
                        bathrooms: 2,
                    },
                    {
                        id: 'multan-2',
                        type: 'Cultural',
                        title: 'Sufi Shrines Spiritual Tour',
                        price: 2000,
                        location: 'Multan Shrines',
                        rating: 4.9,
                        picture:
                            'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg',
                        brokerId: 'broker_multan_002',
                        brokerName: 'Spiritual Guide Qasim',
                        brokerPhone: '+92 312 2345678',
                        brokerEmail: 'qasim@stayscape.com',
                        description:
                            "Spiritual journey through Multan's famous shrines",
                        duration: '4 hours',
                        includes: [
                            'Guide',
                            'Transportation',
                            'Spiritual Experience',
                        ],
                        maxGuests: 15,
                    },
                    {
                        id: 'multan-3',
                        type: 'Shopping',
                        title: 'Multani Handicrafts Shopping',
                        price: 1500,
                        location: 'Multan Bazaar',
                        rating: 4.5,
                        picture:
                            'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg',
                        brokerId: 'broker_multan_003',
                        brokerName: 'Shopping Guide Noor',
                        brokerPhone: '+92 313 3456789',
                        brokerEmail: 'noor@stayscape.com',
                        description:
                            'Guided shopping tour for authentic Multani handicrafts',
                        duration: '3 hours',
                        includes: [
                            'Guide',
                            'Bargaining Help',
                            'Authentic Items',
                        ],
                        maxGuests: 6,
                    },
                ],
            },
            {
                name: 'Faisalabad',
                services: [
                    {
                        id: 'faisalabad-1',
                        type: 'Accommodation',
                        title: 'Business Hotel Downtown',
                        price_per_night: 4500,
                        location: 'Downtown Faisalabad',
                        rating: 4.4,
                        picture:
                            'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg',
                        brokerId: 'broker_faisalabad_001',
                        brokerName: 'Business Manager Ali',
                        brokerPhone: '+92 314 1234567',
                        brokerEmail: 'ali.business@stayscape.com',
                        description: 'Modern business hotel in city center',
                        amenities: [
                            'Business Center',
                            'WiFi',
                            'Conference Rooms',
                        ],
                        maxGuests: 4,
                        bedrooms: 2,
                        bathrooms: 2,
                    },
                    {
                        id: 'faisalabad-2',
                        type: 'Shopping',
                        title: 'Textile Market Tour',
                        price: 2000,
                        location: 'Faisalabad Textile Markets',
                        rating: 4.6,
                        picture:
                            'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg',
                        brokerId: 'broker_faisalabad_002',
                        brokerName: 'Textile Expert Hassan',
                        brokerPhone: '+92 315 2345678',
                        brokerEmail: 'hassan@stayscape.com',
                        description:
                            "Explore Pakistan's textile capital markets",
                        duration: '4 hours',
                        includes: ['Guide', 'Market Access', 'Quality Check'],
                        maxGuests: 8,
                    },
                ],
            },
            {
                name: 'Quetta',
                services: [
                    {
                        id: 'quetta-1',
                        type: 'Accommodation',
                        title: 'Mountain View Lodge',
                        price_per_night: 5000,
                        location: 'Quetta Hills',
                        rating: 4.5,
                        picture:
                            'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg',
                        brokerId: 'broker_quetta_001',
                        brokerName: 'Mountain Guide Baloch',
                        brokerPhone: '+92 316 1234567',
                        brokerEmail: 'baloch@stayscape.com',
                        description:
                            'Scenic mountain lodge with panoramic views',
                        amenities: [
                            'Mountain View',
                            'Hiking Access',
                            'Local Cuisine',
                        ],
                        maxGuests: 6,
                        bedrooms: 3,
                        bathrooms: 2,
                    },
                    {
                        id: 'quetta-2',
                        type: 'Adventure',
                        title: 'Ziarat Valley Trek',
                        price: 6000,
                        location: 'Ziarat Valley',
                        rating: 4.8,
                        picture:
                            'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
                        brokerId: 'broker_quetta_002',
                        brokerName: 'Trek Guide Karim',
                        brokerPhone: '+92 317 2345678',
                        brokerEmail: 'karim@stayscape.com',
                        description:
                            'Multi-day trekking adventure in Ziarat Valley',
                        duration: '2 days',
                        includes: ['Guide', 'Camping Equipment', 'Meals'],
                        maxGuests: 10,
                    },
                ],
            },
        ],
    },
};

// Service categories for the categories section
const serviceCategories = [
    {
        name: 'Accommodation',
        icon: 'fas fa-bed',
        description: 'Comfortable stays',
    },
    {
        name: 'Experience',
        icon: 'fas fa-compass',
        description: 'Cultural adventures',
    },
    {
        name: 'Transportation',
        icon: 'fas fa-car',
        description: 'Easy mobility',
    },
    {
        name: 'Wellness',
        icon: 'fas fa-spa',
        description: 'Health & relaxation',
    },
    {
        name: 'Adventure',
        icon: 'fas fa-mountain',
        description: 'Thrilling activities',
    },
    {
        name: 'Food & Dining',
        icon: 'fas fa-utensils',
        description: 'Culinary delights',
    },
    { name: 'Cultural', icon: 'fas fa-mosque', description: 'Heritage tours' },
    {
        name: 'Shopping',
        icon: 'fas fa-shopping-bag',
        description: 'Local markets',
    },
    {
        name: 'Entertainment',
        icon: 'fas fa-music',
        description: 'Fun activities',
    },
    { name: 'Photography', icon: 'fas fa-camera', description: 'Photo tours' },
];

// Service features data for enhanced modal content
const serviceFeatures = {
    Accommodation: [
        'Free WiFi',
        'Air Conditioning',
        'Room Service',
        'Parking Available',
        'Security',
        'Clean Linens',
        'Private Bathroom',
        'Kitchen Access',
    ],
    Experience: [
        'Professional Guide',
        'Group Activity',
        'Cultural Immersion',
        'Photo Opportunities',
        'Local Insights',
        'Safety Equipment',
        'Refreshments',
        'Memorable Experience',
    ],
    Transportation: [
        'Licensed Driver',
        'Fuel Included',
        'Insurance Coverage',
        'GPS Navigation',
        'Clean Vehicle',
        'Pickup Service',
        'Flexible Timing',
        'Safe Travel',
    ],
    Wellness: [
        'Certified Therapist',
        'Premium Products',
        'Relaxing Environment',
        'Health Benefits',
        'Personalized Service',
        'Clean Facilities',
        'Stress Relief',
        'Rejuvenation',
    ],
    Adventure: [
        'Safety Equipment',
        'Expert Guidance',
        'Thrilling Experience',
        'Photo Opportunities',
        'Group Activity',
        'Insurance Coverage',
        'Equipment Provided',
        'Adventure Memories',
    ],
    'Food & Dining': [
        'Fresh Ingredients',
        'Local Cuisine',
        'Hygienic Preparation',
        'Cultural Experience',
        'Expert Chef',
        'Authentic Flavors',
        'Dietary Options',
        'Memorable Taste',
    ],
    Cultural: [
        'Expert Guide',
        'Historical Context',
        'Cultural Immersion',
        'Photo Opportunities',
        'Local Stories',
        'Heritage Sites',
        'Educational',
        'Authentic Experience',
    ],
    Shopping: [
        'Local Markets',
        'Authentic Products',
        'Bargaining Help',
        'Quality Assurance',
        'Expert Guide',
        'Best Prices',
        'Unique Items',
        'Cultural Shopping',
    ],
    Entertainment: [
        'Live Performances',
        'Cultural Shows',
        'Music & Dance',
        'Interactive Experience',
        'Professional Artists',
        'Traditional Arts',
        'Fun Activities',
        'Memorable Evening',
    ],
    Photography: [
        'Professional Guide',
        'Best Locations',
        'Perfect Timing',
        'Equipment Tips',
        'Composition Help',
        'Local Insights',
        'Stunning Views',
        'Photo Memories',
    ],
};

// Global variables
let currentUser = null;
let selectedService = null;
let loginModal, registerModal, serviceModal;
const bootstrap = window.bootstrap; // Declare bootstrap variable

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');

    // Initialize Pakistan data in localStorage if not exists
    if (!localStorage.getItem('pakistanData')) {
        localStorage.setItem('pakistanData', JSON.stringify(pakistanData));
        console.log('Pakistan data initialized');
    }

    // Initialize brokers data
    initializeBrokersData();

    // Initialize Bootstrap modals
    initializeModals();

    // Check if user is logged in
    checkAuthStatus();

    // Initialize page elements
    initializePage();

    // Set up event listeners
    setupEventListeners();

    console.log('Application initialized');
});

// Initialize Bootstrap modals
function initializeModals() {
    const loginModalElement = document.getElementById('loginModal');
    const registerModalElement = document.getElementById('registerModal');
    const serviceModalElement = document.getElementById('serviceModal');

    if (bootstrap) {
        if (loginModalElement) {
            loginModal = new bootstrap.Modal(loginModalElement);
            console.log('Login modal initialized');
        }
        if (registerModalElement) {
            registerModal = new bootstrap.Modal(registerModalElement);
            console.log('Register modal initialized');
        }
        if (serviceModalElement) {
            serviceModal = new bootstrap.Modal(serviceModalElement);
            console.log('Service modal initialized');
        }
    }
}

// Initialize brokers data from Pakistan data
function initializeBrokersData() {
    const existingBrokers = JSON.parse(localStorage.getItem('brokers') || '[]');
    const brokerIds = existingBrokers.map(b => b.id);
    const newBrokers = [];

    pakistanData.Pakistan.cities.forEach(city => {
        city.services.forEach(service => {
            if (service.brokerId && !brokerIds.includes(service.brokerId)) {
                const broker = {
                    id: service.brokerId,
                    name: service.brokerName,
                    email: service.brokerEmail,
                    phone: service.brokerPhone,
                    city: city.name,
                    commission: 10,
                    password: 'broker123',
                    status: 'active',
                    createdAt: new Date().toISOString(),
                    totalServices: 0,
                    totalBookings: 0,
                    totalEarnings: 0,
                };
                newBrokers.push(broker);
                brokerIds.push(service.brokerId);
            }
        });
    });

    if (newBrokers.length > 0) {
        const allBrokers = [...existingBrokers, ...newBrokers];
        localStorage.setItem('brokers', JSON.stringify(allBrokers));
        console.log(
            'Brokers data initialized:',
            newBrokers.length,
            'new brokers'
        );
    }
}

// Check authentication status
function checkAuthStatus() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        currentUser = JSON.parse(userData);
        updateAuthUI(true);
        console.log('User logged in:', currentUser.name);
    } else {
        updateAuthUI(false);
        console.log('No user logged in');
    }
}

// Update authentication UI
function updateAuthUI(isLoggedIn) {
    const authButtons = document.getElementById('authButtons');
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');

    if (isLoggedIn && currentUser) {
        if (authButtons) authButtons.classList.add('d-none');
        if (userMenu) userMenu.classList.remove('d-none');
        if (userName) userName.textContent = currentUser.name;
    } else {
        if (authButtons) authButtons.classList.remove('d-none');
        if (userMenu) userMenu.classList.add('d-none');
    }
}

// Initialize page elements
function initializePage() {
    const cityDropdown = document.getElementById('cityDropdown');
    const categoriesContainer = document.getElementById('categoriesContainer');

    // Populate city dropdown
    if (cityDropdown) {
        console.log('Populating city dropdown');
        const currentPakistanData = JSON.parse(
            localStorage.getItem('pakistanData') || '{}'
        );
        if (
            currentPakistanData.Pakistan &&
            currentPakistanData.Pakistan.cities
        ) {
            currentPakistanData.Pakistan.cities.forEach(city => {
                const option = document.createElement('option');
                option.value = city.name;
                option.textContent = city.name;
                cityDropdown.appendChild(option);
            });
            console.log(
                'City dropdown populated with',
                currentPakistanData.Pakistan.cities.length,
                'cities'
            );
        }
    }

    // Populate categories section
    if (categoriesContainer) {
        populateCategories();
    }

    // Check if on my-bookings page and handle redirect
    if (window.location.pathname.includes('my-bookings')) {
        handleMyBookingsPage();
    }
}

// Handle My Bookings page logic
function handleMyBookingsPage() {
    if (!currentUser) {
        showAlert('Please login to view your bookings!', 'warning');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        return;
    }

    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const currentUserBookings = allBookings.filter(
        booking => booking.userId === currentUser.id
    );

    if (currentUserBookings.length === 0) {
        showNoBookingsMessage();
    } else {
        displayUserBookings(currentUserBookings);
    }
}

// Show no bookings message
function showNoBookingsMessage() {
    const bookingsContainer = document.getElementById('bookingsContainer');
    if (bookingsContainer) {
        bookingsContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <div class="mb-4">
                    <i class="fas fa-calendar-times fa-5x text-muted opacity-50"></i>
                </div>
                <h3 class="mb-3">No Bookings Yet</h3>
                <p class="text-muted mb-4">You haven't made any bookings yet. Explore our amazing services and book your first experience!</p>
                <a href="index.html" class="btn btn-success btn-lg">
                    <i class="fas fa-search me-2"></i>Browse Services
                </a>
            </div>
        `;
    }
}

// Display user bookings
function displayUserBookings(bookings) {
    const bookingsContainer = document.getElementById('bookingsContainer');
    if (!bookingsContainer) return;

    bookingsContainer.innerHTML = '';
    bookings.forEach(booking => {
        const bookingCard = createBookingCard(booking);
        bookingsContainer.appendChild(bookingCard);
    });
}

// Create booking card
function createBookingCard(booking) {
    const div = document.createElement('div');
    div.className = 'col-md-6 col-lg-4 mb-4';

    const statusClass = getStatusClass(booking.status);
    const statusText = getStatusText(booking.status);

    div.innerHTML = `
        <div class="card booking-card h-100">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h6 class="mb-0">Booking #${booking.id.slice(-6)}</h6>
                <span class="booking-status ${statusClass}">${statusText}</span>
            </div>
            <div class="card-body">
                <h5 class="card-title">${booking.service.title}</h5>
                <p class="card-text">
                    <i class="fas fa-map-marker-alt text-success me-2"></i>
                    ${booking.service.location}
                </p>
                <div class="mb-3">
                    <small class="text-muted">
                        <i class="fas fa-calendar me-2"></i>
                        ${new Date(booking.bookingDate).toLocaleDateString()}
                    </small>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="price-tag">
                        ${booking.totalPrice}
                    </div>
                    <button class="btn btn-outline-success btn-sm" onclick="viewBookingDetails('${
                        booking.id
                    }')">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    `;

    return div;
}

// Get status class and text
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
    return statusMap[status] || 'Pending';
}

// Set up event listeners
function setupEventListeners() {
    const cityDropdown = document.getElementById('cityDropdown');
    if (cityDropdown) {
        cityDropdown.addEventListener('change', handleCitySelection);
        console.log('City dropdown event listener added');
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        console.log('Login form event listener added');
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
        console.log('Register form event listener added');
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    const goToTopBtn = document.getElementById('goToTop');
    if (goToTopBtn) {
        window.addEventListener('scroll', handleScroll);
        goToTopBtn.addEventListener('click', scrollToTop);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Handle city selection
function handleCitySelection() {
    const selectedCity = this.value;
    const welcomeMessage = document.getElementById('welcomeMessage');
    const servicesSection = document.getElementById('servicesSection');
    const cityTitle = document.getElementById('cityTitle');

    console.log('City selected:', selectedCity);

    if (selectedCity) {
        const currentPakistanData = JSON.parse(
            localStorage.getItem('pakistanData') || '{}'
        );
        const cityData = currentPakistanData.Pakistan.cities.find(
            city => city.name === selectedCity
        );

        if (cityData) {
            console.log(
                'Found city data:',
                cityData.name,
                'with',
                cityData.services.length,
                'services'
            );
            displayServices(cityData.services);
            if (cityTitle)
                cityTitle.textContent = `Services in ${selectedCity}`;
            if (welcomeMessage) welcomeMessage.style.display = 'none';
            if (servicesSection) servicesSection.style.display = 'block';

            const servicesElement = document.getElementById('services');
            if (servicesElement) {
                servicesElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    } else {
        if (welcomeMessage) welcomeMessage.style.display = 'block';
        if (servicesSection) servicesSection.style.display = 'none';
    }
}

// Populate categories
function populateCategories() {
    const categoriesContainer = document.getElementById('categoriesContainer');
    if (!categoriesContainer) return;

    categoriesContainer.innerHTML = '';
    serviceCategories.forEach(category => {
        const categoryCard = createCategoryCard(category);
        categoriesContainer.appendChild(categoryCard);
    });
    console.log('Categories populated');
}

// Create category card
function createCategoryCard(category) {
    const col = document.createElement('div');
    col.className = 'col-lg-2 col-md-3 col-sm-4 col-6';

    col.innerHTML = `
        <div class="category-card" onclick="window.filterByCategory('${category.name}')">
            <div class="category-icon">
                <i class="${category.icon} fa-2x text-success"></i>
            </div>
            <h6 class="fw-bold mb-2">${category.name}</h6>
            <p class="text-muted small mb-0">${category.description}</p>
        </div>
    `;

    return col;
}

// Display services
function displayServices(services) {
    const servicesContainer = document.getElementById('servicesContainer');
    if (!servicesContainer) return;

    servicesContainer.innerHTML = '';
    services.forEach((service, index) => {
        const serviceCard = createServiceCard(service, index);
        servicesContainer.appendChild(serviceCard);
    });
    console.log('Services displayed:', services.length);
}

// Create service card
function createServiceCard(service, index) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 mb-4';

    const badgeClass = getBadgeClass(service.type);
    const priceDisplay = getPriceDisplay(service);
    const locationDisplay = service.cityName
        ? `${service.location}, ${service.cityName}`
        : service.location;

    col.innerHTML = `
        <div class="card service-card h-100" data-service='${JSON.stringify(
            service
        )}'>
            <img src="${service.picture}" class="card-img-top" alt="${
        service.title
    }">
            <div class="card-body">
                <span class="badge service-badge ${badgeClass} mb-2">${
        service.type
    }</span>
                <h5 class="card-title">${service.title}</h5>
                <p class="card-text">
                    <i class="fas fa-map-marker-alt text-success me-2"></i>
                    ${locationDisplay}
                </p>
                <div class="d-flex justify-content-between align-items-center mt-auto">
                    <div class="rating-stars">
                        ${generateStars(service.rating)}
                        <span class="text-muted ms-1">${service.rating}</span>
                    </div>
                    <div class="price-tag">
                        ${priceDisplay}
                    </div>
                </div>
            </div>
        </div>
    `;

    col.querySelector('.service-card').addEventListener('click', function () {
        const serviceData = JSON.parse(this.dataset.service);
        showServiceModal(serviceData);
    });

    return col;
}

// Authentication functions
function showLoginModal() {
    console.log('Showing login modal');
    if (registerModal) registerModal.hide();
    if (loginModal) loginModal.show();
}

function showRegisterModal() {
    console.log('Showing register modal');
    if (loginModal) loginModal.hide();
    if (registerModal) registerModal.show();
}

function handleLogin(e) {
    e.preventDefault();
    console.log('Handling login');

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateAuthUI(true);
        if (loginModal) loginModal.hide();
        showAlert('Login successful!', 'success');
        console.log('Login successful for:', user.name);
    } else {
        showAlert('Invalid email or password!', 'danger');
        console.log('Login failed for email:', email);
    }
}

function handleRegister(e) {
    e.preventDefault();
    console.log('Handling registration');

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        showAlert('Passwords do not match!', 'danger');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find(u => u.email === email)) {
        showAlert('User with this email already exists!', 'danger');
        return;
    }

    const newUser = {
        id: 'user_' + Date.now(),
        name,
        email,
        phone,
        password,
        registeredAt: new Date().toISOString(),
        totalBookings: 0,
        totalSpent: 0,
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    updateAuthUI(true);
    if (registerModal) registerModal.hide();
    showAlert('Registration successful!', 'success');
    console.log('Registration successful for:', newUser.name);
}

function logout() {
    console.log('Logging out user:', currentUser?.name);
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI(false);
    showAlert('Logged out successfully!', 'info');

    if (
        window.location.pathname.includes('booking') ||
        window.location.pathname.includes('my-bookings')
    ) {
        window.location.href = 'index.html';
    }
}

// Booking functions
function initiateBooking() {
    console.log('Initiating booking for service:', selectedService?.title);

    if (!currentUser) {
        if (serviceModal) serviceModal.hide();
        showLoginModal();
        showAlert('Please login to book services!', 'warning');
        return;
    }

    localStorage.setItem('selectedService', JSON.stringify(selectedService));
    window.location.href = 'booking.html';
}

// Complete booking process with full data flow
function completeBooking(bookingData) {
    console.log('Completing booking:', bookingData);

    // Generate unique booking ID
    bookingData.id = 'BK' + Date.now();
    bookingData.bookingDate = new Date().toISOString();
    bookingData.bookingTime = new Date().toLocaleString();
    bookingData.status = 'confirmed';

    // Get all existing bookings
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');

    // Add new booking
    allBookings.push(bookingData);
    localStorage.setItem('bookings', JSON.stringify(allBookings));

    // Update user statistics
    updateUserStats(bookingData.userId, bookingData);

    // Update broker statistics
    if (bookingData.service?.brokerId) {
        updateBrokerStats(bookingData.service.brokerId, bookingData);
    }

    // Update service statistics
    updateServiceStats(bookingData.serviceId, bookingData);

    // Store current booking for confirmation page
    localStorage.setItem('currentBooking', JSON.stringify(bookingData));

    console.log('Booking completed successfully:', bookingData.id);
    return bookingData;
}

// Update user statistics
function updateUserStats(userId, bookingData) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        users[userIndex].totalBookings =
            (users[userIndex].totalBookings || 0) + 1;
        const amount = Number.parseFloat(
            bookingData.totalPrice.replace(/[^\d]/g, '') || 0
        );
        users[userIndex].totalSpent =
            (users[userIndex].totalSpent || 0) + amount;
        users[userIndex].lastBooking = bookingData.bookingDate;

        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Update broker statistics
function updateBrokerStats(brokerId, bookingData) {
    const brokers = JSON.parse(localStorage.getItem('brokers') || '[]');
    const brokerIndex = brokers.findIndex(b => b.id === brokerId);

    if (brokerIndex !== -1) {
        brokers[brokerIndex].totalBookings =
            (brokers[brokerIndex].totalBookings || 0) + 1;
        const amount = Number.parseFloat(
            bookingData.totalPrice.replace(/[^\d]/g, '') || 0
        );
        const commission = (amount * brokers[brokerIndex].commission) / 100;
        brokers[brokerIndex].totalEarnings =
            (brokers[brokerIndex].totalEarnings || 0) + commission;
        brokers[brokerIndex].lastBooking = bookingData.bookingDate;

        localStorage.setItem('brokers', JSON.stringify(brokers));
    }
}

// Update service statistics
function updateServiceStats(serviceId, bookingData) {
    const pakistanData = JSON.parse(
        localStorage.getItem('pakistanData') || '{}'
    );

    if (pakistanData.Pakistan && pakistanData.Pakistan.cities) {
        pakistanData.Pakistan.cities.forEach(city => {
            const serviceIndex = city.services.findIndex(
                s => s.id === serviceId
            );
            if (serviceIndex !== -1) {
                city.services[serviceIndex].totalBookings =
                    (city.services[serviceIndex].totalBookings || 0) + 1;
                city.services[serviceIndex].lastBooking =
                    bookingData.bookingDate;
            }
        });

        localStorage.setItem('pakistanData', JSON.stringify(pakistanData));
    }
}

// Utility functions
function getBadgeClass(type) {
    const typeMap = {
        Accommodation: 'badge-accommodation',
        Experience: 'badge-experience',
        Transportation: 'badge-transportation',
        Wellness: 'badge-wellness',
        Adventure: 'badge-adventure',
        'Food & Dining': 'badge-food-dining',
        Cultural: 'badge-cultural',
        Shopping: 'badge-shopping',
        Entertainment: 'badge-entertainment',
        Photography: 'badge-photography',
    };
    return typeMap[type] || 'badge-accommodation';
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

function showServiceModal(service) {
    console.log('Showing service modal for:', service.title);
    selectedService = service;
    const badgeClass = getBadgeClass(service.type);
    const priceDisplay = getPriceDisplay(service);
    const locationDisplay = service.cityName
        ? `${service.location}, ${service.cityName}`
        : service.location;

    const modalImage = document.getElementById('modalImage');
    const modalBadge = document.getElementById('modalBadge');
    const modalTitle = document.getElementById('modalTitle');
    const modalTitle2 = document.getElementById('modalTitle2');
    const modalLocation = document.getElementById('modalLocation');
    const modalRating = document.getElementById('modalRating');
    const modalPrice = document.getElementById('modalPrice');

    if (modalImage) modalImage.src = service.picture;
    if (modalBadge) {
        modalBadge.className = `badge service-badge ${badgeClass}`;
        modalBadge.textContent = service.type;
    }
    if (modalTitle) modalTitle.textContent = service.title;
    if (modalTitle2) modalTitle2.textContent = service.title;
    if (modalLocation) modalLocation.textContent = locationDisplay;
    if (modalRating) modalRating.textContent = service.rating;
    if (modalPrice) modalPrice.textContent = priceDisplay;

    const featuresContainer = document.getElementById('serviceFeatures');
    if (featuresContainer) {
        featuresContainer.innerHTML = '';

        const features =
            serviceFeatures[service.type] || serviceFeatures['Experience'];
        features.slice(0, 8).forEach(feature => {
            const featureItem = document.createElement('div');
            featureItem.className = 'feature-item';
            featureItem.textContent = feature;
            featuresContainer.appendChild(featureItem);
        });
    }

    if (serviceModal) serviceModal.show();
}

function handleContactForm(e) {
    e.preventDefault();
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        showAlert(
            'Thank you for your message! We will get back to you soon.',
            'success'
        );
        e.target.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function handleScroll() {
    const goToTopBtn = document.getElementById('goToTop');
    if (goToTopBtn) {
        if (window.pageYOffset > 300) {
            goToTopBtn.style.display = 'block';
        } else {
            goToTopBtn.style.display = 'none';
        }
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToServices() {
    const servicesElement = document.getElementById('services');
    if (servicesElement) {
        servicesElement.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToCategories() {
    const categoriesElement = document.getElementById('categories');
    if (categoriesElement) {
        categoriesElement.scrollIntoView({ behavior: 'smooth' });
    }
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

function viewBookingDetails(bookingId) {
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const booking = allBookings.find(b => b.id === bookingId);

    if (booking) {
        const customerInfo = booking.customerInfo || {};
        const bookingDetails = booking.bookingDetails || {};
        const pricing = booking.pricing || {};

        const details = `
Booking Details:

ID: ${booking.id}
Customer: ${customerInfo.name || booking.contactName}
Email: ${customerInfo.email || 'N/A'}
Phone: ${customerInfo.phone || booking.contactPhone}

Service: ${booking.service?.title}
Check-in: ${booking.checkIn || bookingDetails.checkIn}
Check-out: ${booking.checkOut || bookingDetails.checkOut}
Guests: ${booking.guests || bookingDetails.guests}

Total Amount: ${
            pricing.totalAmount
                ? `PKR ${pricing.totalAmount.toLocaleString()}`
                : booking.totalPrice
        }
Status: ${booking.status}
Booking Date: ${new Date(booking.bookingDate).toLocaleDateString()}

Special Requests: ${
            booking.specialRequests || bookingDetails.specialRequests || 'None'
        }
    `;

        alert(details);
    }
}

// Make functions globally available
window.showLoginModal = showLoginModal;
window.showRegisterModal = showRegisterModal;
window.logout = logout;
window.initiateBooking = initiateBooking;
window.scrollToServices = scrollToServices;
window.scrollToCategories = scrollToCategories;
window.completeBooking = completeBooking;
window.viewBookingDetails = viewBookingDetails;
