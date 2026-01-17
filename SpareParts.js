// Spare Parts Page JavaScript

const partsData = [
    {
        id: 'oil',
        name: 'Engine Oil',
        category: 'Fluids',
        price: { min: 1500, max: 3000 },
        image: 'https://images.unsplash.com/photo-1508062562983-90a86dd263e3?w=400&h=300&fit=crop',
        description: 'Premium quality engine oils for all vehicle types',
        brands: ['Shell', 'Mobil', 'Castrol', 'Total']
    },
    {
        id: 'tires',
        name: 'Tires & Rims',
        category: 'Wheels',
        price: { min: 5000, max: 25000 },
        image: 'https://images.unsplash.com/photo-1569391570861-20c3b82a1c11?w=400&h=300&fit=crop',
        description: 'Wide range of tires and alloy rims for all vehicles',
        brands: ['Michelin', 'Bridgestone', 'Goodyear', 'Continental']
    },
    {
        id: 'battery',
        name: 'Batteries',
        category: 'Electrical',
        price: { min: 8000, max: 15000 },
        image: 'https://images.unsplash.com/photo-1626323938817-b25db28df46a?w=400&h=300&fit=crop',
        description: 'Long-lasting batteries for cars and bikes',
        brands: ['AGS', 'Exide', 'Volta', 'Phoenix']
    },
    {
        id: 'brakes',
        name: 'Brake Parts',
        category: 'Brakes',
        price: { min: 2000, max: 10000 },
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop',
        description: 'Brake pads, discs, and complete brake kits',
        brands: ['Bosch', 'Brembo', 'Aisin', 'Bendix']
    },
    {
        id: 'lights',
        name: 'Lighting',
        category: 'Electrical',
        price: { min: 500, max: 5000 },
        image: 'https://images.unsplash.com/photo-1552976584-1c12609244da?w=400&h=300&fit=crop',
        description: 'LED lights, bulbs, and complete lighting solutions',
        brands: ['Philips', 'Osram', 'Hella', 'Generic']
    },
    {
        id: 'interior',
        name: 'Interior Accessories',
        category: 'Interior',
        price: { min: 1000, max: 8000 },
        image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop',
        description: 'Seat covers, floor mats, and steering covers',
        brands: ['Michelin', '3M', 'HKS', 'Generic']
    }
];

document.addEventListener('DOMContentLoaded', function() {
    renderParts(partsData);
});

function renderParts(partsToRender) {
    const container = document.getElementById('partsListing');
    if (!container) return;
    
    container.innerHTML = partsToRender.map(part => `
        <article class="part">
            <div class="part-image">
                <img src="${part.image}" alt="${part.name}">
            </div>
            <h2>${part.name}</h2>
            <p class="part-category">${part.category}</p>
            <p>${part.description}</p>
            <p class="price">${formatPrice(part.price.min)} - ${formatPrice(part.price.max)}</p>
            <div class="part-brands">
                ${part.brands.map(brand => `<span class="brand-tag">${brand}</span>`).join('')}
            </div>
            <a href="#" onclick="inquirePart('${part.id}'); return false;">Inquire Now</a>
        </article>
    `).join('');
}

function filterParts(category) {
    document.querySelectorAll('.parts-categories .category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (event && event.target) {
        event.target.classList.add('active');
    }

    if (category === 'all') {
        renderParts(partsData);
    } else {
        const filtered = partsData.filter(part => part.category === category);
        renderParts(filtered);
    }
}

window.partsPageFunctions = {
    renderParts,
    filterParts
};

