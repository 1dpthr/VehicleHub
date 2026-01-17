// VehicleHub - Main Application JavaScript

// ============================================
// DATA STORES
// ============================================

// Vehicle Data
const vehicles = {
    cars: [
        {
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
        {
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
            features: ['Leather Seats', 'Sunroof', 'Reverse Camera', 'Push Button Start', 'Climate Control'],
            postedDate: '2024-03-12'
        },
        {
            id: 'swift',
            make: 'Suzuki',
            model: 'Swift',
            year: 2017,
            mileage: 30000,
            price: 1200000,
            image: 'Assets/Suzuki swift.jpeg',
            thumbnail: 'Assets/Suzuki swift.jpeg',
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
        {
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
    ],
    bikes: [
        {
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
            features: ['Electric Start', 'Kick Start', 'Alloy Rims', 'Long Seat'],
            postedDate: '2024-03-14'
        },
        {
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
            description: 'This Suzuki GS 150 offers excellent performance and comfort. Features include disc brakes and alloy wheels.',
            features: ['Disc Brake', 'Electric Start', 'Alloy Rims', 'Digital Meter'],
            postedDate: '2024-03-11'
        },
        {
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
            description: 'This Yamaha YBR 125 is a sporty and reliable bike. Known for its smooth engine and comfortable riding position.',
            features: ['Sporty Design', 'Comfortable Seat', 'Good Mileage', 'Reliable Engine'],
            postedDate: '2024-03-09'
        },
        {
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
            description: 'This United US 125 is an economical choice for daily commuting. Good fuel average and low maintenance costs.',
            features: ['Economical', 'Easy Maintenance', 'Good Fuel Average', 'Comfortable'],
            postedDate: '2024-03-07'
        }
    ]
};

// News Data (Using placeholder images since no local news images available)
const news = [
    {
        id: 1,
        title: 'New Toyota Corolla Hybrid Launching Soon',
        date: 'March 15, 2024',
        image: 'Assets/Toyota Corolla.jpeg',
        summary: 'Toyota is set to launch the all-new Corolla Hybrid in Pakistan with improved fuel efficiency.',
        content: 'Toyota is set to launch the all-new Corolla Hybrid in Pakistan with improved fuel efficiency and modern features. The new model promises to deliver up to 25km/liter mileage, making it one of the most fuel-efficient vehicles in its segment.',
        category: 'New Launches'
    },
    {
        id: 2,
        title: 'Electric Vehicle Tax Relief Announced',
        date: 'March 10, 2024',
        image: 'Assets/Electric.jpeg',
        summary: 'Government announces new tax incentives for electric vehicle purchases.',
        content: 'The government has announced new tax incentives for electric vehicle purchases, making EVs more affordable for Pakistani consumers. This move is expected to boost EV adoption by 40% in the coming years.',
        category: 'Policy'
    },
    {
        id: 3,
        title: 'Honda Announces New Bike Models for 2024',
        date: 'March 5, 2024',
        image: 'Assets/honda new model.jpeg',
        summary: 'Honda unveils three new motorcycle models with advanced technology.',
        content: 'Honda has unveiled three new motorcycle models equipped with advanced technology and improved fuel efficiency. The new lineup includes sports, commuter, and premium bikes to cater to different customer segments.',
        category: 'Bikes'
    },
    {
        id: 4,
        title: 'Used Car Market Trends 2024',
        date: 'February 28, 2024',
        image: 'Assets/Suzuki Mehran.jpeg',
        summary: 'Analysis shows increasing demand for Japanese vehicles in used car market.',
        content: 'Analysis of the used car market shows increasing demand for Japanese vehicles, particularly Toyota and Honda models. Prices have stabilized after the initial import duty changes.',
        category: 'Market'
    },
    {
        id: 5,
        title: 'Road Safety Campaign Launched',
        date: 'February 20, 2024',
        image: 'Assets/road safety.jpeg',
        summary: 'Nationwide road safety campaign to reduce accidents.',
        content: 'A nationwide road safety campaign has been launched to reduce accidents and promote responsible driving. The initiative includes free helmet distributions and safety awareness programs.',
        category: 'Safety'
    },
    {
        id: 6,
        title: 'New Highway Connecting Major Cities',
        date: 'February 15, 2024',
        image: 'Assets/highway.jpeg',
        summary: 'New highway project to reduce travel time between cities.',
        content: 'Construction has begun on a new highway that will reduce travel time between Lahore and Karachi by 4 hours. The project is expected to be completed by 2026.',
        category: 'Infrastructure'
    }
];

// Spare Parts Data
const spareParts = [
    {
        id: 'oil',
        name: 'Engine Oil',
        category: 'Fluids',
        price: { min: 1500, max: 3000 },
        image: 'Assets/Engine Oil.jpeg',
        description: 'Premium quality engine oils for all vehicle types',
        brands: ['Shell', 'Mobil', 'Castrol', 'Total']
    },
    {
        id: 'tires',
        name: 'Tires & Rims',
        category: 'Wheels',
        price: { min: 5000, max: 25000 },
        image: 'Assets/Tire & Rims.jpeg',
        description: 'Wide range of tires and alloy rims for all vehicles',
        brands: ['Michelin', 'Bridgestone', 'Goodyear', 'Continental']
    },
    {
        id: 'battery',
        name: 'Batteries',
        category: 'Electrical',
        price: { min: 8000, max: 15000 },
        image: 'Assets/Batteries.jpeg',
        description: 'Long-lasting batteries for cars and bikes',
        brands: ['AGS', 'Exide', 'Volta', 'Phoenix']
    },
    {
        id: 'brakes',
        name: 'Brake Parts',
        category: 'Brakes',
        price: { min: 2000, max: 10000 },
        image: 'Assets/Brake parts.jpeg',
        description: 'Brake pads, discs, and complete brake kits',
        brands: ['Bosch', 'Brembo', 'Aisin', 'Bendix']
    },
    {
        id: 'lights',
        name: 'Lighting',
        category: 'Electrical',
        price: { min: 500, max: 5000 },
        image: 'Assets/Lighting.jpeg',
        description: 'LED lights, bulbs, and complete lighting solutions',
        brands: ['Philips', 'Osram', 'Hella', 'Generic']
    },
    {
        id: 'interior',
        name: 'Interior Accessories',
        category: 'Interior',
        price: { min: 1000, max: 8000 },
        image: 'Assets/Interior accessories.jpeg',
        description: 'Seat covers, floor mats, and steering covers',
        brands: ['Michelin', '3M', 'HKS', 'Generic']
    }
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatPrice(price) {
    return 'Rs. ' + price.toLocaleString('en-PK');
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-PK', options);
}

function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#4ecca3' : '#e94560'};
        color: white;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    `;
    
    // Add animation keyframes
    if (!document.getElementById('notificationStyles')) {
        const style = document.createElement('style');
        style.id = 'notificationStyles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// USER AUTHENTICATION
// ============================================

const UserAuth = {
    users: JSON.parse(localStorage.getItem('vehiclehub_users') || '[]'),
    currentUser: JSON.parse(localStorage.getItem('vehiclehub_currentUser') || 'null'),
    
    signup(username, email, password) {
        if (this.users.find(u => u.email === email)) {
            showNotification('Email already registered!', 'error');
            return false;
        }
        
        const newUser = {
            id: Date.now(),
            username,
            email,
            password,
            createdAt: new Date().toISOString()
        };
        
        this.users.push(newUser);
        localStorage.setItem('vehiclehub_users', JSON.stringify(this.users));
        showNotification('Account created successfully!');
        return true;
    },
    
    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
            this.currentUser = { ...user, password: undefined };
            localStorage.setItem('vehiclehub_currentUser', JSON.stringify(this.currentUser));
            showNotification('Welcome back, ' + user.username + '!');
            return true;
        }
        showNotification('Invalid email or password!', 'error');
        return false;
    },
    
    logout() {
        this.currentUser = null;
        localStorage.removeItem('vehiclehub_currentUser');
        showNotification('Logged out successfully!');
        setTimeout(() => window.location.reload(), 1000);
    },
    
    updateProfile(updates) {
        if (!this.currentUser) return false;
        
        this.currentUser = { ...this.currentUser, ...updates };
        localStorage.setItem('vehiclehub_currentUser', JSON.stringify(this.currentUser));
        
        // Update in users array
        const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
        if (userIndex !== -1) {
            this.users[userIndex] = { ...this.users[userIndex], ...updates };
            localStorage.setItem('vehiclehub_users', JSON.stringify(this.users));
        }
        
        showNotification('Profile updated successfully!');
        return true;
    }
};

// ============================================
// WISHLIST FUNCTIONALITY
// ============================================

const Wishlist = {
    items: JSON.parse(localStorage.getItem('vehiclehub_wishlist') || '[]'),
    
    add(vehicleId, type) {
        const id = `${type}_${vehicleId}`;
        if (!this.items.includes(id)) {
            this.items.push(id);
            localStorage.setItem('vehiclehub_wishlist', JSON.stringify(this.items));
            showNotification('Added to wishlist!');
            this.updateUI();
        }
    },
    
    remove(vehicleId, type) {
        const id = `${type}_${vehicleId}`;
        this.items = this.items.filter(item => item !== id);
        localStorage.setItem('vehiclehub_wishlist', JSON.stringify(this.items));
        showNotification('Removed from wishlist');
        this.updateUI();
    },
    
    toggle(vehicleId, type) {
        const id = `${type}_${vehicleId}`;
        if (this.items.includes(id)) {
            this.remove(vehicleId, type);
        } else {
            this.add(vehicleId, type);
        }
    },
    
    isInWishlist(vehicleId, type) {
        const id = `${type}_${vehicleId}`;
        return this.items.includes(id);
    },
    
    updateUI() {
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            const id = btn.dataset.id;
            const type = btn.dataset.type;
            if (this.isInWishlist(id, type)) {
                btn.classList.add('active');
                btn.innerHTML = '❤️';
            } else {
                btn.classList.remove('active');
                btn.innerHTML = '🤍';
            }
        });
        
        // Update wishlist count
        const countEl = document.getElementById('wishlistCount');
        if (countEl) {
            countEl.textContent = this.items.length;
        }
    }
};

// ============================================
// SEARCH & FILTER FUNCTIONS
// ============================================

function searchVehicles(query, type = 'all') {
    query = query.toLowerCase();
    let results = { cars: [], bikes: [] };
    
    if (type === 'all' || type === 'cars') {
        results.cars = vehicles.cars.filter(car => 
            car.make.toLowerCase().includes(query) ||
            car.model.toLowerCase().includes(query) ||
            car.description.toLowerCase().includes(query)
        );
    }
    
    if (type === 'all' || type === 'bikes') {
        results.bikes = vehicles.bikes.filter(bike => 
            bike.make.toLowerCase().includes(query) ||
            bike.model.toLowerCase().includes(query) ||
            bike.description.toLowerCase().includes(query)
        );
    }
    
    return results;
}

function filterVehicles(filters, type = 'all') {
    let results = { cars: [], bikes: [] };
    
    if (type === 'all' || type === 'cars') {
        results.cars = vehicles.cars.filter(car => {
            if (filters.make && car.make !== filters.make) return false;
            if (filters.yearMin && car.year < filters.yearMin) return false;
            if (filters.yearMax && car.year > filters.yearMax) return false;
            if (filters.priceMax && car.price > filters.priceMax) return false;
            if (filters.transmission && car.transmission !== filters.transmission) return false;
            return true;
        });
    }
    
    if (type === 'all' || type === 'bikes') {
        results.bikes = vehicles.bikes.filter(bike => {
            if (filters.make && bike.make !== filters.make) return false;
            if (filters.yearMin && bike.year < filters.yearMin) return false;
            if (filters.yearMax && bike.year > filters.yearMax) return false;
            if (filters.priceMax && bike.price > filters.priceMax) return false;
            return true;
        });
    }
    
    return results;
}

// ============================================
// RENDERING FUNCTIONS
// ============================================

function renderVehicleCard(vehicle, type) {
    const isInWishlist = Wishlist.isInWishlist(vehicle.id, type);
    const detailsPage = type === 'cars' ? `car-details-${vehicle.id}.html` : `bike-details.html?bike=${vehicle.id}`;
    
    return `
        <article class="vehicle-card ${type === 'cars' ? 'car' : 'bike'}">
            <div class="vehicle-image">
                <img src="${vehicle.thumbnail}" alt="${vehicle.make} ${vehicle.model}">
                <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" 
                        data-id="${vehicle.id}" 
                        data-type="${type}"
                        onclick="Wishlist.toggle('${vehicle.id}', '${type}')">
                    ${isInWishlist ? '❤️' : '🤍'}
                </button>
            </div>
            <div class="vehicle-info">
                <h3>${vehicle.make} ${vehicle.model}</h3>
                <p class="vehicle-year">${vehicle.year}</p>
                <p class="vehicle-mileage">${vehicle.mileage.toLocaleString()} km</p>
                <p class="vehicle-price">${formatPrice(vehicle.price)}</p>
                <a href="${detailsPage}" class="view-details-btn">View Details</a>
            </div>
        </article>
    `;
}

function renderFeaturedVehicles() {
    const container = document.getElementById('featuredVehicles');
    if (!container) return;
    
    const featuredCars = vehicles.cars.slice(0, 4);
    const featuredBikes = vehicles.bikes.slice(0, 4);
    
    container.innerHTML = `
        <section class="cars-section">
            <h2>Featured Cars</h2>
            <div class="vehicle-grid">
                ${featuredCars.map(car => renderVehicleCard(car, 'cars')).join('')}
            </div>
            <a href="homePage.html" class="view-all-btn">View All Cars</a>
        </section>
        <section class="bikes-section">
            <h2>Featured Bikes</h2>
            <div class="vehicle-grid">
                ${featuredBikes.map(bike => renderVehicleCard(bike, 'bikes')).join('')}
            </div>
            <a href="Bikes.html" class="view-all-btn">View All Bikes</a>
        </section>
    `;
}

function renderNewsCard(newsItem) {
    return `
        <article class="news-card">
            <img src="${newsItem.image}" alt="${newsItem.title}">
            <div class="news-content">
                <span class="news-category">${newsItem.category}</span>
                <h3>${newsItem.title}</h3>
                <p class="news-date">${newsItem.date}</p>
                <p class="news-summary">${newsItem.summary}</p>
                <a href="#" class="read-more-btn" onclick="showNewsModal(${newsItem.id}); return false;">Read More</a>
            </div>
        </article>
    `;
}

function renderPartCard(part) {
    return `
        <article class="part-card">
            <img src="${part.image}" alt="${part.name}">
            <div class="part-content">
                <h3>${part.name}</h3>
                <p class="part-category">${part.category}</p>
                <p class="part-description">${part.description}</p>
                <p class="part-price">${formatPrice(part.price.min)} - ${formatPrice(part.price.max)}</p>
                <div class="part-brands">
                    ${part.brands.map(brand => `<span class="brand-tag">${brand}</span>`).join('')}
                </div>
                <a href="#" class="inquire-btn" onclick="inquirePart('${part.id}'); return false;">Inquire Now</a>
            </div>
        </article>
    `;
}

// ============================================
// MODAL FUNCTIONS
// ============================================

function showNewsModal(newsId) {
    const item = news.find(n => n.id === newsId);
    if (!item) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content news-modal">
            <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
            <img src="${item.image}" alt="${item.title}">
            <div class="modal-body">
                <span class="news-category">${item.category}</span>
                <h2>${item.title}</h2>
                <p class="news-date">${item.date}</p>
                <p class="news-content">${item.content}</p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Close on outside click
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

function showInquiryModal(vehicleId, type) {
    const vehicle = type === 'cars' 
        ? vehicles.cars.find(v => v.id === vehicleId)
        : vehicles.bikes.find(v => v.id === vehicleId);
    
    if (!vehicle) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content inquiry-modal">
            <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
            <h2>Inquire About</h2>
            <h3>${vehicle.make} ${vehicle.model} (${vehicle.year})</h3>
            <form id="inquiryForm" onsubmit="submitInquiry(event, '${vehicleId}', '${type}')">
                <input type="text" name="name" placeholder="Your Name" required>
                <input type="email" name="email" placeholder="Your Email" required>
                <input type="tel" name="phone" placeholder="Phone Number" required>
                <textarea name="message" placeholder="Your Message" rows="4" required>I'm interested in this ${vehicle.make} ${vehicle.model}. Please contact me with more details.</textarea>
                <button type="submit" class="submit-btn">Send Inquiry</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
    
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

function inquirePart(partId) {
    const part = spareParts.find(p => p.id === partId);
    if (!part) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content inquiry-modal">
            <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
            <h2>Inquire About</h2>
            <h3>${part.name}</h3>
            <form id="partInquiryForm" onsubmit="submitPartInquiry(event, '${partId}')">
                <input type="text" name="name" placeholder="Your Name" required>
                <input type="email" name="email" placeholder="Your Email" required>
                <input type="tel" name="phone" placeholder="Phone Number" required>
                <textarea name="message" placeholder="Your Message" rows="4" required>I'm interested in ${part.name}. Please provide more information about pricing and availability.</textarea>
                <button type="submit" class="submit-btn">Send Inquiry</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
    
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

function submitInquiry(event, vehicleId, type) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    // Store inquiry (in a real app, this would be sent to a server)
    const inquiries = JSON.parse(localStorage.getItem('vehiclehub_inquiries') || '[]');
    inquiries.push({
        id: Date.now(),
        vehicleId,
        type,
        ...Object.fromEntries(formData),
        date: new Date().toISOString()
    });
    localStorage.setItem('vehiclehub_inquiries', JSON.stringify(inquiries));
    
    form.closest('.modal').remove();
    showNotification('Inquiry sent successfully! We will contact you soon.');
}

function submitPartInquiry(event, partId) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    const inquiries = JSON.parse(localStorage.getItem('vehiclehub_inquiries') || '[]');
    inquiries.push({
        id: Date.now(),
        partId,
        ...Object.fromEntries(formData),
        date: new Date().toISOString()
    });
    localStorage.setItem('vehiclehub_inquiries', JSON.stringify(inquiries));
    
    form.closest('.modal').remove();
    showNotification('Inquiry sent successfully! We will contact you soon.');
}

// ============================================
// NAVBAR FUNCTIONS
// ============================================

function updateNavbar() {
    const userSection = document.getElementById('userSection');
    if (!userSection) return;
    
    // Clear the userSection first
    userSection.innerHTML = '';
    
    if (UserAuth.currentUser) {
        // If logged in, show user menu with username and logout
        userSection.innerHTML = `
            <a href="#" class="user-link">
                <img src="Assets/Honda civic.jpeg" alt="User" class="user-avatar">
                <span>${UserAuth.currentUser.username}</span>
            </a>
            <ul class="user-dropdown">
                <li><a href="dashboard.html">My Dashboard</a></li>
                <li><a href="#" onclick="UserAuth.logout(); return false;">Logout</a></li>
            </ul>
        `;
        
        // Add user-menu class to parent li
        userSection.classList.add('user-menu');
    } else {
        // If NOT logged in, show Login and Sign Up links
        userSection.innerHTML = `
            <a href="login.html">Login</a>
        `;
        userSection.classList.remove('user-menu');
        
        // Add Sign Up button as a separate li after userSection
        const navbarUl = userSection.parentElement;
        // Remove any existing standalone signup buttons
        const existingSignup = navbarUl.querySelectorAll('li:not(#userSection) > .signup-btn');
        existingSignup.forEach(btn => btn.parentElement.remove());
        
        // Create new Sign Up li
        const signupLi = document.createElement('li');
        signupLi.innerHTML = '<a href="signup.html" class="signup-btn">Sign Up</a>';
        navbarUl.appendChild(signupLi);
    }
}

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Update navbar
    updateNavbar();
    
    // Update wishlist UI
    Wishlist.updateUI();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Setup search functionality
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = document.getElementById('searchInput').value;
            window.location.href = `index.html?search=${encodeURIComponent(query)}`;
        });
    }
    
    // Handle search from URL
    const searchQuery = getUrlParam('search');
    if (searchQuery) {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = searchQuery;
            const results = searchVehicles(searchQuery);
            // Display search results
            console.log('Search results:', results);
        }
    }
});

// Export for global use
window.VehicleHub = {
    UserAuth,
    Wishlist,
    searchVehicles,
    filterVehicles,
    formatPrice,
    showInquiryModal,
    inquirePart,
    showNotification
};

