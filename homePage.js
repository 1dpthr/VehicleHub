// Home Page JavaScript
// Initialize home page functionality

document.addEventListener('DOMContentLoaded', function() {
    renderFeaturedCars();
    renderFeaturedBikes();
    renderLatestNews();
    Wishlist.updateUI();
    
    // Search form handler
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = document.getElementById('searchInput').value;
            const type = document.getElementById('searchType').value;
            
            if (type === 'cars' || type === 'all') {
                window.location.href = 'index.html?search=' + encodeURIComponent(query);
            } else if (type === 'bikes') {
                window.location.href = 'Bikes.html?search=' + encodeURIComponent(query);
            } else {
                window.location.href = 'SpareParts.html?search=' + encodeURIComponent(query);
            }
        });
    }
});

function renderFeaturedCars() {
    const container = document.getElementById('featuredCars');
    if (!container) return;
    
    const cars = vehicles.cars.slice(0, 4);
    
    // Map car IDs to their detail page URLs
    const carPageMap = {
        'corolla': 'Corolla.html',
        'civic': 'car-details-honda.html',
        'swift': 'car-details-suzuki.html',
        'mehran': 'car-details-mehran.html'
    };
    
    container.innerHTML = cars.map(car => `
        <article class="vehicle-card car">
            <div class="vehicle-image">
                <img src="${car.thumbnail}" alt="${car.make} ${car.model}">
                <button class="wishlist-btn ${Wishlist.isInWishlist(car.id, 'cars') ? 'active' : ''}" 
                        data-id="${car.id}" 
                        data-type="cars"
                        onclick="Wishlist.toggle('${car.id}', 'cars')">
                    ${Wishlist.isInWishlist(car.id, 'cars') ? '❤️' : '🤍'}
                </button>
            </div>
            <div class="vehicle-info">
                <h3>${car.make} ${car.model}</h3>
                <p class="vehicle-year">${car.year}</p>
                <p class="vehicle-mileage">${car.mileage.toLocaleString()} km</p>
                <p class="vehicle-price">${formatPrice(car.price)}</p>
                <a href="${carPageMap[car.id] || 'car-details-' + car.id + '.html'}" class="view-details-btn">View Details</a>
            </div>
        </article>
    `).join('');
}

function renderFeaturedBikes() {
    const container = document.getElementById('featuredBikes');
    if (!container) return;
    
    const bikes = vehicles.bikes.slice(0, 4);
    
    container.innerHTML = bikes.map(bike => `
        <article class="vehicle-card bike">
            <div class="vehicle-image">
                <img src="${bike.thumbnail}" alt="${bike.make} ${bike.model}">
                <button class="wishlist-btn ${Wishlist.isInWishlist(bike.id, 'bikes') ? 'active' : ''}" 
                        data-id="${bike.id}" 
                        data-type="bikes"
                        onclick="Wishlist.toggle('${bike.id}', 'bikes')">
                    ${Wishlist.isInWishlist(bike.id, 'bikes') ? '❤️' : '🤍'}
                </button>
            </div>
            <div class="vehicle-info">
                <h3>${bike.make} ${bike.model}</h3>
                <p class="vehicle-year">${bike.year}</p>
                <p class="vehicle-mileage">${bike.mileage.toLocaleString()} km</p>
                <p class="vehicle-price">${formatPrice(bike.price)}</p>
                <a href="bike-details.html?bike=${bike.id}" class="view-details-btn">View Details</a>
            </div>
        </article>
    `).join('');
}

function renderLatestNews() {
    const container = document.getElementById('latestNews');
    if (!container) return;
    
    const latest = news.slice(0, 3);
    
    container.innerHTML = latest.map(item => `
        <article class="news-card">
            <img src="${item.image}" alt="${item.title}">
            <div class="news-content">
                <span class="news-category">${item.category}</span>
                <h3>${item.title}</h3>
                <p class="news-date">${item.date}</p>
                <p class="news-summary">${item.summary}</p>
                <a href="#" class="read-more-btn" onclick="showNewsModal(${item.id}); return false;">Read More</a>
            </div>
        </article>
    `).join('');
}

// Export functions for global use
window.homePageFunctions = {
    renderFeaturedCars,
    renderFeaturedBikes,
    renderLatestNews
};

