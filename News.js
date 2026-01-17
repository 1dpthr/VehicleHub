// News Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    renderNews(news);
});

function renderNews(newsToRender) {
    const container = document.getElementById('newsListing');
    if (!container) return;
    
    container.innerHTML = newsToRender.map(item => `
        <article class="news">
            <img src="${item.image}" alt="${item.title}">
            <h2>${item.title}</h2>
            <p class="date">${item.date}</p>
            <p>${item.summary}</p>
            <a href="#" onclick="showNewsModal(${item.id}); return false;">Read More</a>
        </article>
    `).join('');
}

function filterNews(category) {
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (event && event.target) {
        event.target.classList.add('active');
    }

    if (category === 'all') {
        renderNews(news);
    } else {
        const filtered = news.filter(item => item.category === category);
        renderNews(filtered);
    }
}

window.newsPageFunctions = {
    renderNews,
    filterNews
};

