// Bike Details Page JavaScript

const bikeData = {
    'cd70': {
        id: 'cd70',
        make: 'Honda',
        model: 'CD 70',
        year: 2015,
        mileage: 20000,
        price: 80000,
        image: 'Assets/Honda CD 70.jpeg',
        thumbnail: 'Assets/Honda CD 70.jpeg',
        fuel: 'Petrol',
        engine: '70cc',
        color: 'Black',
        location: 'Lahore',
        condition: 'Used',
        description: 'This Honda CD 70 is a reliable and fuel-efficient motorcycle. Well maintained with regular service records.',
        features: ['Electric Start', 'Kick Start', 'Alloy Rims', 'Long Seat', 'Economical']
    },
    'gs150': {
        id: 'gs150',
        make: 'Suzuki',
        model: 'GS 150',
        year: 2018,
        mileage: 10000,
        price: 120000,
        image: 'Assets/Suzuki GS 150.jpeg',
        thumbnail: 'Assets/Suzuki GS 150.jpeg',
        fuel: 'Petrol',
        engine: '150cc',
        color: 'Red',
        location: 'Karachi',
        condition: 'Used',
        description: 'This Suzuki GS 150 offers excellent performance and comfort.',
        features: ['Disc Brake', 'Electric Start', 'Alloy Rims', 'Digital Meter', 'Sporty Design']
    },
    'ybr125': {
        id: 'ybr125',
        make: 'Yamaha',
        model: 'YBR 125',
        year: 2017,
        mileage: 15000,
        price: 90000,
        image: 'Assets/Yamaha YBR 125.jpeg',
        thumbnail: 'Assets/Yamaha YBR 125.jpeg',
        fuel: 'Petrol',
        engine: '125cc',
        color: 'Blue',
        location: 'Islamabad',
        condition: 'Used',
        description: 'This Yamaha YBR 125 is a sporty and reliable bike.',
        features: ['Sporty Design', 'Comfortable Seat', 'Good Mileage', 'Reliable Engine']
    },
    'us125': {
        id: 'us125',
        make: 'United',
        model: 'US 125',
        year: 2017,
        mileage: 15000,
        price: 85000,
        image: 'Assets/United US 125.jpeg',
        thumbnail: 'Assets/United US 125.jpeg',
        fuel: 'Petrol',
        engine: '125cc',
        color: 'Black',
        location: 'Lahore',
        condition: 'Used',
        description: 'This United US 125 is an economical choice for daily commuting.',
        features: ['Economical', 'Easy Maintenance', 'Good Fuel Average', 'Comfortable']
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const bikeId = urlParams.get('bike') || 'cd70';
    const vehicle = bikeData[bikeId];
    
    if (vehicle) {
        renderBikeDetails(vehicle);
        document.title = `${vehicle.make} ${vehicle.model} ${vehicle.year} - VehicleHub`;
    } else {
        showError();
    }
});

function renderBikeDetails(vehicle) {
    const container = document.getElementById('bikeDetails');
    if (!container) return;
    
    const isInWishlist = Wishlist.isInWishlist(vehicle.id, 'bikes');
    
    container.innerHTML = `
        <div class="details-image">
            <img src="${vehicle.image}" alt="${vehicle.make} ${vehicle.model}">
            <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" 
                    onclick="Wishlist.toggle('${vehicle.id}', 'bikes')">
                ${isInWishlist ? '❤️ Saved' : '🤍 Save'}
            </button>
        </div>
        
        <div class="details-header">
            <h1>${vehicle.make} ${vehicle.model}</h1>
            <p class="details-price">${formatPrice(vehicle.price)}</p>
        </div>
        
        <div class="details-specs">
            <div class="spec-item"><span class="spec-label">Year</span><span class="spec-value">${vehicle.year}</span></div>
            <div class="spec-item"><span class="spec-label">Mileage</span><span class="spec-value">${vehicle.mileage.toLocaleString()} km</span></div>
            <div class="spec-item"><span class="spec-label">Fuel</span><span class="spec-value">${vehicle.fuel}</span></div>
            <div class="spec-item"><span class="spec-label">Engine</span><span class="spec-value">${vehicle.engine}</span></div>
            <div class="spec-item"><span class="spec-label">Color</span><span class="spec-value">${vehicle.color}</span></div>
            <div class="spec-item"><span class="spec-label">Location</span><span class="spec-value">${vehicle.location}</span></div>
            <div class="spec-item"><span class="spec-label">Condition</span><span class="spec-value">${vehicle.condition}</span></div>
        </div>
        
        <div class="details-section">
            <h2>Description</h2>
            <p>${vehicle.description}</p>
        </div>
        
        <div class="details-section">
            <h2>Features</h2>
            <div class="features-list">
                ${vehicle.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
            </div>
        </div>
        
        <div class="inquiry-section">
            <h2>Interested in this bike?</h2>
            <button class="inquiry-btn" onclick="showInquiryModal('${vehicle.id}', 'bikes')">Send Inquiry</button>
        </div>
        
        <a href="Bikes.html" class="back-link">← Back to Listings</a>
    `;
    
    Wishlist.updateUI();
}

function showError() {
    const container = document.getElementById('bikeDetails');
    if (container) {
        container.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">🏍️</span>
                <h3>Bike not found</h3>
                <p>The bike you're looking for doesn't exist</p>
                <a href="Bikes.html" class="browse-btn">Browse Bikes</a>
            </div>
        `;
    }
}

window.bikeDetailsFunctions = {
    renderBikeDetails
};

