// Destinations page specific JavaScript
const destinationImages = {
    'Lahore': 'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg',
    'Karachi': 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg',
    'Islamabad': 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg',
    'Peshawar': 'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg',
    'Multan': 'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg',
    'Faisalabad': 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg',
    'Quetta': 'https://images.pexels.com/photos/2827722/pexels-photo-2827722.jpeg',
    'Rawalpindi': 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg',
    'Murree': 'https://images.pexels.com/photos/2827722/pexels-photo-2827722.jpeg',
    'Skardu': 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg'
};

const destinationDescriptions = {
    'Lahore': 'The cultural capital of Pakistan, known for its rich history, magnificent architecture, and vibrant food scene.',
    'Karachi': 'The largest city and economic hub of Pakistan, offering beautiful beaches and diverse cultural experiences.',
    'Islamabad': 'The modern capital city nestled against the Margalla Hills, known for its planned layout and natural beauty.',
    'Peshawar': 'One of the oldest cities in the world, rich in history and gateway to the Khyber Pass.',
    'Multan': 'The city of saints, famous for its Sufi shrines, blue pottery, and traditional handicrafts.',
    'Faisalabad': 'The textile capital of Pakistan, known for its industrial heritage and agricultural significance.',
    'Quetta': 'The fruit garden of Pakistan, surrounded by mountains and known for its dry fruits and tribal culture.',
    'Rawalpindi': 'The twin city of Islamabad, rich in colonial history and traditional bazaars.',
    'Murree': 'A popular hill station offering cool climate, scenic views, and colonial architecture.',
    'Skardu': 'Gateway to some of the world\'s highest peaks, including K2, offering breathtaking mountain scenery.'
};

let destinationModal;
const bootstrap = window.bootstrap; // Declare bootstrap variable
const pakistanData = window.pakistanData; // Declare pakistanData variable
const getBadgeClass = function(category) {
    const badgeClassMap = {
        'Accommodation': 'primary',
        'Experience': 'secondary',
        'Transportation': 'success',
        'Wellness': 'danger',
        'Adventure': 'warning',
        'Food & Dining': 'info',
        'Cultural': 'light',
        'Shopping': 'dark',
        'Entertainment': 'pink',
        'Photography': 'orange'
    };
    return badgeClassMap[category] || 'default';
}; // Declare getBadgeClass function

document.addEventListener('DOMContentLoaded', function() {
    // Initialize destinations page
    initializeDestinationsPage();
    
    // Initialize modal
    destinationModal = new bootstrap.Modal(document.getElementById('destinationModal'));
    
    // Check URL parameters
    checkDestinationURLParameters();
});

function initializeDestinationsPage() {
    displayDestinations();
}

function checkDestinationURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const city = urlParams.get('city');
    
    if (city) {
        setTimeout(() => {
            showDestinationDetails(city);
        }, 500);
    }
}

function displayDestinations() {
    const destinationsContainer = document.getElementById('destinationsContainer');
    
    pakistanData.Pakistan.cities.forEach((city, index) => {
        const destinationCard = createDestinationCard(city, index);
        destinationsContainer.appendChild(destinationCard);
    });
}

function createDestinationCard(city, index) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6';
    col.setAttribute('data-aos', 'fade-up');
    col.setAttribute('data-aos-delay', (index % 3) * 100);
    
    const serviceCount = city.services.length;
    const avgRating = (city.services.reduce((sum, service) => sum + service.rating, 0) / serviceCount).toFixed(1);
    const image = destinationImages[city.name] || 'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg';
    const description = destinationDescriptions[city.name] || 'Discover the beauty and culture of this amazing destination.';
    
    col.innerHTML = `
        <div class="destination-card-detailed" onclick="showDestinationDetails('${city.name}')">
            <div class="destination-image-container">
                <img src="${image}" alt="${city.name}" class="img-fluid">
                <div class="destination-overlay-gradient"></div>
                <div class="destination-info-overlay">
                    <h4 class="text-white fw-bold">${city.name}</h4>
                    <div class="destination-stats">
                        <span class="badge bg-light text-dark me-2">
                            <i class="fas fa-concierge-bell me-1"></i>${serviceCount} Services
                        </span>
                        <span class="badge bg-light text-dark">
                            <i class="fas fa-star text-warning me-1"></i>${avgRating}
                        </span>
                    </div>
                </div>
            </div>
            <div class="destination-card-body">
                <p class="text-muted mb-3">${description}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="destination-categories">
                        ${getTopCategories(city.services).map(cat => 
                            `<span class="badge badge-${getBadgeClass(cat)} me-1">${cat}</span>`
                        ).join('')}
                    </div>
                    <button class="btn btn-outline-primary btn-sm">
                        Explore <i class="fas fa-arrow-right ms-1"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

function getTopCategories(services) {
    const categories = {};
    services.forEach(service => {
        categories[service.type] = (categories[service.type] || 0) + 1;
    });
    
    return Object.entries(categories)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([category]) => category);
}

function showDestinationDetails(cityName) {
    const city = pakistanData.Pakistan.cities.find(c => c.name === cityName);
    if (!city) return;
    
    const modalTitle = document.getElementById('destinationModalTitle');
    const modalContent = document.getElementById('destinationModalContent');
    
    modalTitle.textContent = cityName;
    
    const serviceCount = city.services.length;
    const avgRating = (city.services.reduce((sum, service) => sum + service.rating, 0) / serviceCount).toFixed(1);
    const image = destinationImages[cityName] || 'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg';
    const description = destinationDescriptions[cityName] || 'Discover the beauty and culture of this amazing destination.';
    
    // Group services by category
    const servicesByCategory = {};
    city.services.forEach(service => {
        if (!servicesByCategory[service.type]) {
            servicesByCategory[service.type] = [];
        }
        servicesByCategory[service.type].push(service);
    });
    
    modalContent.innerHTML = `
        <div class="destination-hero-image">
            <img src="${image}" alt="${cityName}" class="img-fluid w-100" style="height: 300px; object-fit: cover;">
            <div class="destination-hero-overlay">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h2 class="text-white fw-bold mb-2">${cityName}</h2>
                            <div class="destination-hero-stats">
                                <span class="badge bg-light text-dark me-3">
                                    <i class="fas fa-concierge-bell me-1"></i>${serviceCount} Services Available
                                </span>
                                <span class="badge bg-light text-dark me-3">
                                    <i class="fas fa-star text-warning me-1"></i>${avgRating} Average Rating
                                </span>
                                <span class="badge bg-light text-dark">
                                    <i class="fas fa-map-marker-alt me-1"></i>Pakistan
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="p-4">
            <div class="row">
                <div class="col-md-8">
                    <h5 class="fw-bold mb-3">About ${cityName}</h5>
                    <p class="text-muted mb-4">${description}</p>
                    
                    <h6 class="fw-bold mb-3">Available Services by Category</h6>
                    <div class="row g-3">
                        ${Object.entries(servicesByCategory).map(([category, services]) => `
                            <div class="col-md-6">
                                <div class="category-summary-card">
                                    <div class="d-flex align-items-center mb-2">
                                        <i class="${getCategoryIcon(category)} text-green-primary me-2"></i>
                                        <h6 class="mb-0">${category}</h6>
                                        <span class="badge bg-light text-dark ms-auto">${services.length}</span>
                                    </div>
                                    <div class="category-services">
                                        ${services.slice(0, 2).map(service => `
                                            <div class="small text-muted mb-1">
                                                <i class="fas fa-check me-1"></i>${service.title}
                                            </div>
                                        `).join('')}
                                        ${services.length > 2 ? `<div class="small text-muted">+${services.length - 2} more...</div>` : ''}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="col-md-4">
                    <div class="destination-quick-stats">
                        <h6 class="fw-bold mb-3">Quick Stats</h6>
                        <div class="stat-item mb-3">
                            <div class="d-flex justify-content-between">
                                <span>Total Services:</span>
                                <strong>${serviceCount}</strong>
                            </div>
                        </div>
                        <div class="stat-item mb-3">
                            <div class="d-flex justify-content-between">
                                <span>Average Rating:</span>
                                <strong>${avgRating} <i class="fas fa-star text-warning"></i></strong>
                            </div>
                        </div>
                        <div class="stat-item mb-3">
                            <div class="d-flex justify-content-between">
                                <span>Categories:</span>
                                <strong>${Object.keys(servicesByCategory).length}</strong>
                            </div>
                        </div>
                        
                        <h6 class="fw-bold mb-3 mt-4">Price Range</h6>
                        ${getPriceRangeInfo(city.services)}
                        
                        <div class="d-grid gap-2 mt-4">
                            <a href="services.html?city=${cityName}" class="btn btn-primary">
                                <i class="fas fa-search me-2"></i>View All Services
                            </a>
                            <button class="btn btn-outline-primary" onclick="destinationModal.hide()">
                                <i class="fas fa-times me-2"></i>Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    destinationModal.show();
}

function getCategoryIcon(category) {
    const iconMap = {
        'Accommodation': 'fas fa-bed',
        'Experience': 'fas fa-compass',
        'Transportation': 'fas fa-car',
        'Wellness': 'fas fa-spa',
        'Adventure': 'fas fa-mountain',
        'Food & Dining': 'fas fa-utensils',
        'Cultural': 'fas fa-mosque',
        'Shopping': 'fas fa-shopping-bag',
        'Entertainment': 'fas fa-music',
        'Photography': 'fas fa-camera'
    };
    return iconMap[category] || 'fas fa-star';
}

function getPriceRangeInfo(services) {
    const prices = services.map(service => {
        return service.price_per_night || service.price_per_day || service.price_per_hour || service.price || 0;
    });
    
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const avgPrice = Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length);
    
    return `
        <div class="price-range-info">
            <div class="d-flex justify-content-between mb-2">
                <span class="small">Minimum:</span>
                <strong class="text-success">PKR ${minPrice.toLocaleString()}</strong>
            </div>
            <div class="d-flex justify-content-between mb-2">
                <span class="small">Average:</span>
                <strong class="text-primary">PKR ${avgPrice.toLocaleString()}</strong>
            </div>
            <div class="d-flex justify-content-between">
                <span class="small">Maximum:</span>
                <strong class="text-warning">PKR ${maxPrice.toLocaleString()}</strong>
            </div>
        </div>
    `;
}