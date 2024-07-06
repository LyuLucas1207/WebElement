// script.js
// document.addEventListener("DOMContentLoaded", () => {
//     const newsGrid = document.getElementsByClassName('section26_news-grid_id')[0];
    
//     fetch('./data/section26/section26.json')
//         .then(response => response.json())
//         .then(newsData => {
//             newsData.forEach(news => {
//                 const newsItem = document.createElement('div');
//                 newsItem.classList.add('section26_news-item');

//                 newsItem.innerHTML = `
//                     <div class="section26_news-item-img">
//                         <img src="${news.image}" alt="${news.title}">
//                         <div class="section26_overlay">
//                             <svg class="section26_like-icon" viewBox="0 0 24 24">
//                                 <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
//                             </svg>
//                         </div>
//                     </div>
//                     <div class="section26_news-item-content">
//                         <div class="section26_news-category">${news.category}</div>
//                         <div class="section26_news-title">${news.title}</div>
//                         <div class="section26_news-meta">
//                             <span>${news.date}</span> • <span>${news.views} views</span>
//                         </div>
//                     </div>
//                 `;
//                 const likeIcon = newsItem.querySelector('.section26_like-icon');
//                 likeIcon.addEventListener('click', () => {
//                     likeIcon.classList.toggle('clicked');
//                 });
                
//                 newsGrid.appendChild(newsItem);
//             });
//         });
// });

document.addEventListener("DOMContentLoaded", () => {
    const newsGrid = document.querySelector('.section26_news-grid_id');

    fetch('./data/section26/section26.json')
        .then(response => response.json())
        .then(newsData => {
            newsData.forEach(news => {
                const newsItem = document.createElement('div');
                newsItem.classList.add('section26_news-item');

                const newsItemImage = document.createElement('div');
                newsItemImage.classList.add('section26_news-item-img');
                const img = document.createElement('img');
                img.src = news.image;
                img.alt = news.title;
                newsItemImage.appendChild(img);

                const overlay = document.createElement('div');
                overlay.classList.add('section26_overlay');
                const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.classList.add('section26_like-icon');
                svg.setAttribute('viewBox', '0 0 24 24');
                const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                path.setAttribute('d', 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z');
                svg.appendChild(path);
                overlay.appendChild(svg);
                newsItemImage.appendChild(overlay);

                newsItem.appendChild(newsItemImage);

                const newsItemContent = document.createElement('div');
                newsItemContent.classList.add('section26_news-item-content');

                const newsCategory = document.createElement('div');
                newsCategory.classList.add('section26_news-category');
                newsCategory.textContent = news.category;

                const newsTitle = document.createElement('div');
                newsTitle.classList.add('section26_news-title');
                newsTitle.textContent = news.title;

                const newsMeta = document.createElement('div');
                newsMeta.classList.add('section26_news-meta');
                // newsMeta.innerHTML = `<span>${news.date}</span> • <span>${news.views} views</span>`;
                //DO NOT USE innerHTML here, use textContent instead
                const newsDate = document.createElement('span');
                newsDate.textContent = news.date;
                const newsViews = document.createElement('span');
                newsViews.textContent = `${news.views} views`;
                newsMeta.appendChild(newsDate);
                newsMeta.appendChild(document.createTextNode(' • '));
                newsMeta.appendChild(newsViews);
                

                newsItemContent.appendChild(newsCategory);
                newsItemContent.appendChild(newsTitle);
                newsItemContent.appendChild(newsMeta);

                newsItem.appendChild(newsItemContent);

                const likeIcon = newsItem.querySelector('.section26_like-icon');
                likeIcon.addEventListener('click', () => {
                    likeIcon.classList.toggle('clicked');
                });

                newsGrid.appendChild(newsItem);
            });
        });
});
