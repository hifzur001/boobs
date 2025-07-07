// Services page specific JavaScript with advanced filtering
let currentServices = [];
let filteredServices = [];
let currentFilters = {
    category: '',
    minPrice: null,
    maxPrice: null,
    rating: null,
    sortBy: '',
};
let currentView = 'grid';

const pakistanData = {
    Pakistan: {
        cities: [
            {
                name: 'Karachi',
                services: [
                    {
                        title: 'Service 1',
                        type: 'Type 1',
                        picture: 'image1.jpg',
                        location: 'Location 1',
                        rating: 4.5,
                        price_per_night: 1000,
                    },
                ],
            },
            {
                name: 'Lahore',
                services: [
                    {
                        title: 'Service 2',
                        type: 'Type 2',
                        picture: 'image2.jpg',
                        location: 'Location 2',
                        rating: 4.0,
                        price_per_day: 2000,
                    },
                ],
            },
        ],
    },
};

const serviceCategories = [
    { name: 'Type 1', icon: 'fas fa-tag' },
    { name: 'Type 2', icon: 'fas fa-tag' },
];

const bootstrap = {
    Tab: function (tabElement) {
        this.show = function () {
            tabElement.click();
        };
    },
};

const AOS = {
    refresh: function () {},
};

function getBadgeClass(serviceType) {
    return 'bg-primary';
}

function getPriceDisplay(service) {
    return `Price: ${getServicePrice(service)}`;
}

function generateStars(rating) {
    let stars = '';
    for (let i = 0; i < Math.floor(rating); i++) {
        stars += '<i class="fas fa-star text-warning"></i>';
    }
    if (rating % 1 !== 0) {
        stars += '<i class="fas fa-star-half-alt text-warning"></i>';
    }
    return stars;
}

function showServiceModal(serviceData) {
    console.log('Service Modal:', serviceData);
}

document.addEventListener('DOMContentLoaded', function () {
    // Initialize services page
    initializeServicesPage();

    // Set up event listeners
    setupServicesEventListeners();

    // Check URL parameters
    checkURLParameters();
});

function initializeServicesPage() {
    const cityDropdown = document.getElementById('cityDropdown');

    // Populate city dropdown
    if (cityDropdown) {
        pakistanData.Pakistan.cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city.name;
            option.textContent = city.name;
            cityDropdown.appendChild(option);
        });
    }

    // Populate category filters
    populateCategoryFilters();
}

function setupServicesEventListeners() {
    // City dropdown change
    const cityDropdown = document.getElementById('cityDropdown');
    if (cityDropdown) {
        cityDropdown.addEventListener('change', handleCitySelection);
    }

    // Rating filter change
    const ratingFilters = document.querySelectorAll(
        'input[name="ratingFilter"]'
    );
    ratingFilters.forEach(filter => {
        filter.addEventListener('change', applyRatingFilter);
    });

    // Price inputs
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    if (minPrice)
        minPrice.addEventListener('input', debounce(applyPriceFilter, 500));
    if (maxPrice)
        maxPrice.addEventListener('input', debounce(applyPriceFilter, 500));
}

function checkURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const city = urlParams.get('city');
    const category = urlParams.get('category');

    if (city) {
        document.getElementById('cityDropdown').value = city;
        handleCitySelection({ target: { value: city } });
    }

    if (category) {
        currentFilters.category = category;
        setTimeout(() => {
            applyCategoryFilter(category);
        }, 500);
    }
}

function handleCitySelection(event) {
    const selectedCity = event.target ? event.target.value : event;
    const welcomeMessage = document.getElementById('welcomeMessage');
    const servicesSection = document.getElementById('servicesSection');
    const filterSection = document.getElementById('filterSection');
    const resultsInfo = document.getElementById('resultsInfo');
    const cityTitle = document.getElementById('cityTitle');

    if (selectedCity) {
        const cityData = pakistanData.Pakistan.cities.find(
            city => city.name === selectedCity
        );
        currentServices = cityData.services.map(service => ({
            ...service,
            cityName: selectedCity,
        }));

        filteredServices = [...currentServices];

        cityTitle.textContent = `Services in ${selectedCity}`;
        welcomeMessage.style.display = 'none';
        servicesSection.style.display = 'block';
        filterSection.style.display = 'block';
        resultsInfo.style.display = 'block';

        // Apply any existing filters
        applyAllFilters();

        // Update results info
        updateResultsInfo();

        // Display services
        displayServices();
    } else {
        welcomeMessage.style.display = 'block';
        servicesSection.style.display = 'none';
        filterSection.style.display = 'none';
        resultsInfo.style.display = 'none';
        currentServices = [];
        filteredServices = [];
    }
}

function populateCategoryFilters() {
    const categoryFilters = document.getElementById('categoryFilters');
    if (!categoryFilters) return;

    serviceCategories.forEach(category => {
        const col = document.createElement('div');
        col.className = 'col-md-4 col-sm-6';

        col.innerHTML = `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="${
                    category.name
                }" id="cat-${category.name.replace(
            /\s+/g,
            '-'
        )}" onchange="toggleCategoryFilter('${category.name}')">
                <label class="form-check-label" for="cat-${category.name.replace(
                    /\s+/g,
                    '-'
                )}">
                    <i class="${category.icon} me-2"></i>${category.name}
                </label>
            </div>
        `;

        categoryFilters.appendChild(col);
    });
}

function toggleCategoryFilter(category) {
    const checkbox = document.getElementById(
        `cat-${category.replace(/\s+/g, '-')}`
    );

    if (checkbox.checked) {
        currentFilters.category = category;
    } else {
        currentFilters.category = '';
    }

    // Uncheck other checkboxes (single selection)
    const allCheckboxes = document.querySelectorAll(
        '#categoryFilters input[type="checkbox"]'
    );
    allCheckboxes.forEach(cb => {
        if (cb !== checkbox) cb.checked = false;
    });

    applyAllFilters();
}

function applyCategoryFilter(category) {
    currentFilters.category = category;

    // Update UI
    const checkbox = document.getElementById(
        `cat-${category.replace(/\s+/g, '-')}`
    );
    if (checkbox) checkbox.checked = true;

    applyAllFilters();
}

function applyPriceFilter() {
    const minPrice =
        parseFloat(document.getElementById('minPrice').value) || null;
    const maxPrice =
        parseFloat(document.getElementById('maxPrice').value) || null;

    currentFilters.minPrice = minPrice;
    currentFilters.maxPrice = maxPrice;

    applyAllFilters();
}

function setPriceRange(min, max) {
    document.getElementById('minPrice').value = min;
    document.getElementById('maxPrice').value = max === 999999 ? '' : max;

    currentFilters.minPrice = min;
    currentFilters.maxPrice = max === 999999 ? null : max;

    applyAllFilters();
}

function applyRatingFilter() {
    const selectedRating = document.querySelector(
        'input[name="ratingFilter"]:checked'
    ).value;
    currentFilters.rating = selectedRating ? parseFloat(selectedRating) : null;

    applyAllFilters();
}

function applySorting() {
    const sortBy = document.getElementById('sortBy').value;
    currentFilters.sortBy = sortBy;

    applyAllFilters();
}

function applyAllFilters() {
    if (!currentServices.length) return;

    filteredServices = [...currentServices];

    // Apply category filter
    if (currentFilters.category) {
        filteredServices = filteredServices.filter(
            service => service.type === currentFilters.category
        );
    }

    // Apply price filter
    if (currentFilters.minPrice !== null || currentFilters.maxPrice !== null) {
        filteredServices = filteredServices.filter(service => {
            const price = getServicePrice(service);
            const minCheck =
                currentFilters.minPrice === null ||
                price >= currentFilters.minPrice;
            const maxCheck =
                currentFilters.maxPrice === null ||
                price <= currentFilters.maxPrice;
            return minCheck && maxCheck;
        });
    }

    // Apply rating filter
    if (currentFilters.rating !== null) {
        filteredServices = filteredServices.filter(
            service => service.rating >= currentFilters.rating
        );
    }

    // Apply sorting
    if (currentFilters.sortBy) {
        applySortingToServices();
    }

    updateResultsInfo();
    displayServices();
}

function applySortingToServices() {
    switch (currentFilters.sortBy) {
        case 'price-low':
            filteredServices.sort(
                (a, b) => getServicePrice(a) - getServicePrice(b)
            );
            break;
        case 'price-high':
            filteredServices.sort(
                (a, b) => getServicePrice(b) - getServicePrice(a)
            );
            break;
        case 'rating-high':
            filteredServices.sort((a, b) => b.rating - a.rating);
            break;
        case 'rating-low':
            filteredServices.sort((a, b) => a.rating - b.rating);
            break;
        case 'name-az':
            filteredServices.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'name-za':
            filteredServices.sort((a, b) => b.title.localeCompare(a.title));
            break;
    }
}

function getServicePrice(service) {
    return (
        service.price_per_night ||
        service.price_per_day ||
        service.price_per_hour ||
        service.price ||
        0
    );
}

function clearAllFilters() {
    // Reset filters object
    currentFilters = {
        category: '',
        minPrice: null,
        maxPrice: null,
        rating: null,
        sortBy: '',
    };

    // Reset UI elements
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    document.getElementById('sortBy').value = '';

    // Reset checkboxes
    const categoryCheckboxes = document.querySelectorAll(
        '#categoryFilters input[type="checkbox"]'
    );
    categoryCheckboxes.forEach(cb => (cb.checked = false));

    // Reset rating filter
    document.getElementById('ratingAll').checked = true;

    // Reapply filters (which will show all services)
    applyAllFilters();

    // Switch to "All Services" tab
    const allTab = document.getElementById('all-tab');
    if (allTab) {
        const tab = new bootstrap.Tab(allTab);
        tab.show();
    }
}

function updateResultsInfo() {
    const resultsCount = document.getElementById('resultsCount');
    const activeFilters = document.getElementById('activeFilters');

    if (resultsCount) {
        resultsCount.textContent = filteredServices.length;
    }

    // Show active filters
    const filters = [];
    if (currentFilters.category)
        filters.push(`Category: ${currentFilters.category}`);
    if (currentFilters.minPrice !== null || currentFilters.maxPrice !== null) {
        const priceRange = `Price: ${currentFilters.minPrice || 0} - ${
            currentFilters.maxPrice || '∞'
        }`;
        filters.push(priceRange);
    }
    if (currentFilters.rating !== null)
        filters.push(`Rating: ${currentFilters.rating}+ stars`);
    if (currentFilters.sortBy) {
        const sortLabels = {
            'price-low': 'Price ↑',
            'price-high': 'Price ↓',
            'rating-high': 'Rating ↓',
            'rating-low': 'Rating ↑',
            'name-az': 'Name A-Z',
            'name-za': 'Name Z-A',
        };
        filters.push(`Sort: ${sortLabels[currentFilters.sortBy]}`);
    }

    if (activeFilters) {
        if (filters.length > 0) {
            activeFilters.innerHTML = `<small class="text-muted">Active filters: ${filters.join(
                ', '
            )}</small>`;
        } else {
            activeFilters.innerHTML = '';
        }
    }
}

function displayServices() {
    const servicesContainer = document.getElementById('servicesContainer');
    const noResults = document.getElementById('noResults');

    if (filteredServices.length === 0) {
        servicesContainer.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';
    servicesContainer.innerHTML = '';

    filteredServices.forEach((service, index) => {
        const serviceCard = createServiceCard(service, index);
        servicesContainer.appendChild(serviceCard);
    });

    // Reinitialize AOS for new elements
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

function createServiceCard(service, index) {
    const col = document.createElement('div');
    col.className = currentView === 'grid' ? 'col-md-6 col-lg-4' : 'col-12';
    col.setAttribute('data-aos', 'fade-up');
    col.setAttribute('data-aos-delay', (index % 6) * 100);

    const badgeClass = getBadgeClass(service.type);
    const priceDisplay = getPriceDisplay(service);
    const locationDisplay = service.cityName
        ? `${service.location}, ${service.cityName}`
        : service.location;

    if (currentView === 'list') {
        col.innerHTML = `
            <div class="card service-card h-100 mb-3" data-service='${JSON.stringify(
                service
            )}'>
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${
                            service.picture
                        }" class="img-fluid h-100" alt="${
            service.title
        }" style="object-fit: cover;">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <span class="badge service-badge ${badgeClass} mb-2">${
            service.type
        }</span>
                            <h5 class="card-title">${service.title}</h5>
                            <p class="card-text">
                                <i class="fas fa-map-marker-alt text-green-primary me-2"></i>
                                ${locationDisplay}
                            </p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="rating-stars">
                                    ${generateStars(service.rating)}
                                    <span class="text-muted ms-1">${
                                        service.rating
                                    }</span>
                                </div>
                                <div class="price-tag">
                                    ${priceDisplay}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
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
                        <i class="fas fa-map-marker-alt text-green-primary me-2"></i>
                        ${locationDisplay}
                    </p>
                    <div class="d-flex justify-content-between align-items-center mt-auto">
                        <div class="rating-stars">
                            ${generateStars(service.rating)}
                            <span class="text-muted ms-1">${
                                service.rating
                            }</span>
                        </div>
                        <div class="price-tag">
                            ${priceDisplay}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    col.querySelector('.service-card').addEventListener('click', function () {
        const serviceData = JSON.parse(this.dataset.service);
        showServiceModal(serviceData);
    });

    return col;
}

function toggleView(view) {
    currentView = view;

    // Update button states
    const gridBtn = document.getElementById('gridView');
    const listBtn = document.getElementById('listView');

    if (view === 'grid') {
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
    } else {
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
    }

    // Redisplay services with new view
    displayServices();
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
