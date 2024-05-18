document.addEventListener('DOMContentLoaded', function() {
    const products = document.querySelector('.section5_dropdown');
    fetch('./data/section12/section12.json')
        .then(response => response.json())
        .then(data => {
            const categories = Object.keys(data);
            categories.forEach(category => {
                const link = document.createElement('a');
                link.href = `./product.html#${category}`;
                link.textContent = category;
                products.appendChild(link);
            });
        }
    ).catch(error => console.error(error));
});