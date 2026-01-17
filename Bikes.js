// Bikes Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    renderBikes(vehicles.bikes);
    Wishlist.updateUI();
});

function renderBikes(bikesToRender) {
    const container = document.getElementById('bikeListing');
    if (!container) return;
    
    if (bikesToRender.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <span class="empty-icon">🏍️</span>
                <h3>No bikes found</h3>
                <p>Try adjusting your filters</p>
                <button class="browse-btn" onclick="resetFilters()">Reset Filters</button>
            </div>
        `;
        return;
    }

    container.innerHTML = bikesToRender.map(bike => `
        <article class="bike">
            <div class="vehicle-image">
                <img src="${bike.thumbnail}" alt="${bike.make} ${bike.model}">
                <button class="wishlist-btn ${Wishlist.isInWishlist(bike.id, 'bikes') ? 'active' : ''}" 
                        data-id="${bike.id}" 
                        data-type="bikes"
                        onclick="Wishlist.toggle('${bike.id}', 'bikes')">
                    ${Wishlist.isInWishlist(bike.id, 'bikes') ? '❤️' : '🤍'}
                </button>
            </div>
            <h2>${bike.make} ${bike.model}</h2>
            <p>${bike.year}, ${bike.mileage.toLocaleString()} km</p>
            <p class="price">${formatPrice(bike.price)}</p>
            <a href="bike-details.html?bike=${bike.id}">View Details</a>
        </article>
    `).join('');
}

function applyFilters() {
    const make = document.getElementById('filterMake')?.value || '';
    const yearMin = parseInt(document.getElementById('filterYearMin')?.value) || 0;
    const yearMax = parseInt(document.getElementById('filterYearMax')?.value) || 9999;
    const priceMax = parseInt(document.getElementById('filterPrice')?.value) || Infinity;

    const filteredBikes = vehicles.bikes.filter(bike => {
        if (make && bike.make !== make) return false;
        if (bike.year < yearMin) return false;
        if (bike.year > yearMax) return false;
        if (bike.price > priceMax) return false;
        return true;
    });

    renderBikes(filteredBikes);
}

function resetFilters() {
    const filterIds = ['filterMake', 'filterYearMin', 'filterYearMax', 'filterPrice'];
    filterIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    renderBikes(vehicles.bikes);
}

window.bikesPageFunctions = {
    renderBikes,
    applyFilters,
    resetFilters
};

