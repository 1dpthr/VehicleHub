// Car Details Page JavaScript
// Handles individual car detail pages

const carDetailsData = {
    'corolla': {
        id: 'corolla',
        make: 'Toyota',
        model: 'Corolla',
        year: 2015,
        mileage: 50000,
        price: 1500000,
        image: 'Assets/Toyota Corolla.jpeg',
        thumbnail: 'Assets/Toyota Corolla.jpeg',
        fuel: 'Petrol',
        transmission: 'Manual',
        engine: '1300cc',
        color: 'White',
        location: 'Lahore',
        condition: 'Used',
        description: 'This Toyota Corolla is in excellent condition, with a clean interior and full service history. It\'s a reliable and fuel-efficient car, perfect for city driving.',
        features: ['Air Conditioning', 'Power Steering', 'Power Windows', 'ABS', 'CD Player'],
        postedDate: '2024-03-10'
    },
    'civic': {
        id: 'civic',
        make: 'Honda',
        model: 'Civic',
        year: 2018,
        mileage: 20000,
        price: 2000000,
            image: 'Assets/Honda civic.jpeg',
            thumbnail: 'Assets/Honda civic.jpeg',
        fuel: 'Petrol',
        transmission: 'Automatic',
        engine: '1800cc',
        color: 'Black',
        location: 'Karachi',
        condition: 'Used',
        description: 'This Honda Civic is in pristine condition with low mileage. Features include automatic transmission, leather seats, sunroof, and advanced safety features.',
        features: ['Leather Seats', 'Sunroof', 'Reverse Camera', 'Push Button Start', 'Climate Control', 'ABS', 'ESP'],
        postedDate: '2024-03-12'
    },
    'swift': {
        id: 'swift',
        make: 'Suzuki',
        model: 'Swift',
        year: 2017,
        mileage: 30000,
        price: 1200000,
        image: 'Assets/Suzuki Mehran.jpeg',
        thumbnail: 'Assets/Suzuki Mehran.jpeg',
        fuel: 'Petrol',
        transmission: 'Manual',
        engine: '1200cc',
        color: 'Silver',
        location: 'Islamabad',
        condition: 'Used',
        description: 'This Suzuki Swift is a compact and fuel-efficient hatchback. Perfect for city driving with excellent mileage.',
        features: ['Power Steering', 'Air Conditioning', 'Alloy Rims', 'Central Locking'],
        postedDate: '2024-03-08'
    },
    'mehran': {
        id: 'mehran',
        make: 'Suzuki',
        model: 'Mehran',
        year: 2017,
        mileage: 30000,
        price: 850000,
        image: 'Assets/Suzuki Mehran.jpeg',
        thumbnail: 'Assets/Suzuki Mehran.jpeg',
        fuel: 'Petrol',
        transmission: 'Manual',
        engine: '800cc',
        color: 'White',
        location: 'Lahore',
        condition: 'Used',
        description: 'This Suzuki Mehran is a reliable and economical compact car. Known for its low maintenance costs and fuel efficiency.',
        features: ['Economical', 'Low Maintenance', 'Easy to Drive', 'Good Fuel Average'],
        postedDate: '2024-03-05'
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Get car ID from filename - handle different page naming conventions
    const path = window.location.pathname;
    const filename = path.split('/').pop(); // Get filename from path
    
    // Map filenames to car IDs
    const filenameToCarId = {
        'Corolla.html': 'corolla',
        'corolla.html': 'corolla',
        'car-details-honda.html': 'civic',
        'car-details-suzuki.html': 'swift',
        'car-details-mehran.html': 'mehran'
    };
    
    const carId = filenameToCarId[filename] || 
                  Object.keys(carDetailsData).find(id => 
                      filename === `car-details-${id}.html` || 
                      path.includes(`car-details-${id}.html`)
                  );
    
    if (carId && carDetailsData[carId]) {
        renderCarDetails(carDetailsData[carId]);
    } else {
        showError();
    }
});

function renderCarDetails(vehicle) {
    const container = document.getElementById('carDetails');
    if (!container) return;
    
    const isInWishlist = Wishlist.isInWishlist(vehicle.id, 'cars');
    
    container.innerHTML = `
        <div class="details-image">
            <img src="${vehicle.image}" alt="${vehicle.make} ${vehicle.model}">
            <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" 
                    onclick="Wishlist.toggle('${vehicle.id}', 'cars')">
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
            <div class="spec-item"><span class="spec-label">Transmission</span><span class="spec-value">${vehicle.transmission}</span></div>
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
            <h2>Interested in this car?</h2>
            <button class="inquiry-btn" onclick="showInquiryModal('${vehicle.id}', 'cars')">Send Inquiry</button>
        </div>
        
        <a href="homePage.html" class="back-link">← Back to Listings</a>
    `;
    
    Wishlist.updateUI();
}

function showError() {
    const container = document.getElementById('carDetails');
    if (container) {
        container.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">🚗</span>
                <h3>Car not found</h3>
                <p>The car you're looking for doesn't exist</p>
                <a href="homePage.html" class="browse-btn">Browse Cars</a>
            </div>
        `;
    }
}

window.carDetailsFunctions = {
    renderCarDetails
};

