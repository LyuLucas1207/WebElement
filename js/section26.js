// script.js
document.addEventListener("DOMContentLoaded", () => {
    const newsGrid = document.getElementsByClassName('section26_news-grid_id')[0];
    
    fetch('./data/section26/section26.json')
        .then(response => response.json())
        .then(newsData => {
            newsData.forEach(news => {
                const newsItem = document.createElement('div');
                newsItem.classList.add('section26_news-item');

                newsItem.innerHTML = `
                    <div class="section26_news-item-img">
                        <img src="${news.image}" alt="${news.title}">
                        <div class="section26_overlay">
                            <svg class="section26_like-icon" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        </div>
                    </div>
                    <div class="section26_news-item-content">
                        <div class="section26_news-category">${news.category}</div>
                        <div class="section26_news-title">${news.title}</div>
                        <div class="section26_news-meta">
                            <span>${news.date}</span> • <span>${news.views} views</span>
                        </div>
                    </div>
                `;
                
                newsGrid.appendChild(newsItem);
            });
        });
});
