document.addEventListener("DOMContentLoaded", function() {
    loadDataAndCreateElements('./data/section33/section33.json');
});

function loadDataAndCreateElements(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.Devices.forEach(device => {
                createCard(device);
            });
            setupLazyLoading(); // 确保在卡片创建后再调用懒加载设置
        })
        .catch(error => console.error('Error loading data:', error));
}

function createCard(device) {
    const container = document.createElement('div');
    container.className = `section33_device_container section33_outer_${device.DeviceName}`;

    const infoDiv = document.createElement('div');
    infoDiv.className = `section33_device_info section33_${device.DeviceName}`;

    const title = document.createElement('h2');
    title.innerHTML = `${device.DeviceName} <span>${device.Location}</span>`;
    infoDiv.appendChild(title);

    const description = document.createElement('p');
    description.textContent = device.Description;
    infoDiv.appendChild(description);

    const description2 = document.createElement('p');
    description2.textContent = device.Description2;
    infoDiv.appendChild(description2);

    const picDiv = document.createElement('div');
    picDiv.className = `section33_device_pic section33_pic_${device.DeviceName}`;

    device.ImageDetail.forEach(image => {
        const img = document.createElement('img');
        img.setAttribute('data-src', image);
        img.src = './pic/data/loading.gif'; // Placeholder image before lazy loading
        picDiv.appendChild(img);
    });

    container.appendChild(infoDiv);
    container.appendChild(picDiv);

    document.querySelector('.section33_devices').appendChild(container);
}

function setupLazyLoading() {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const realSrc = img.getAttribute('data-src');
                console.log(`Loading image: ${realSrc}`); // 调试信息
                img.src = realSrc;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        observer.observe(img);
    });
}
