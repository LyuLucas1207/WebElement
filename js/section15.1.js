//No Button
// document.addEventListener('DOMContentLoaded', () => {
//     // Fetch the JSON data
//     fetch('./data/section15/section15.json')
//         .then(response => response.json())
//         .then(data => {
//             const locations = data.Locations;
//             const locationContainer = document.getElementsByClassName('section15_location_container')[0];
            
//             locations.forEach(location => {
//                 const card = document.createElement('div');
//                 card.className = 'section15_location_card';
//                 card.innerHTML = `
//                     <img src="${location.Image}" alt="Location Image">
//                     <h2>${location.Name}</h2>
//                     <h3>${location.SpecificLocation}</h3>
//                     <p><a href="#" class="section15_more-info" data-id="${location.CompanyName}">获取更多信息 =></a></p>
//                 `;
//                 locationContainer.appendChild(card);
//             });

//             // Add event listeners to 'more-info' links
//             document.querySelectorAll('.section15_more-info').forEach(link => {
//                 link.addEventListener('click', (event) => {
//                     event.preventDefault();
//                     const companyName = event.target.getAttribute('data-id');
//                     fetchLocationDetails(companyName);
//                 });
//             });
//         })
//         .catch(error => console.error('Error fetching data:', error));

//     const modal = document.getElementsByClassName('section15_modal')[0];
//     const closeModal = document.getElementsByClassName('section15_close')[0];

//     closeModal.addEventListener('click', () => {
//         modal.style.display = 'none';
//     });

//     window.addEventListener('click', (event) => {
//         if (event.target == modal) {
//             modal.style.display = 'none';
//         }
//     });

//     function fetchLocationDetails(CompanyName){
//         fetch('./data/section15/section15.json')
//             .then(response => response.json())
//             .then(data => {
//                 const locations = data.Locations;
//                 const location = locations.find(location => location.CompanyName === CompanyName);
//                 showModal(location);
//             })
//             .catch(error => console.error('Error fetching data:', error));
//     }

//     function showModal(location) {
//         document.getElementById('section15_modal-company-name').textContent = location.CompanyName;
//         document.getElementById('section15_modal-image').src = location.ImageDetail;
//         document.getElementById('section15_modal-founded').textContent = `Founded: ${location.Founded}`;
//         document.getElementById('section15_modal-description').textContent = location.Description;
//         document.getElementById('section15_modal-contact').textContent = `Contact: ${location.Contact}`;
//         modal.style.display = 'block';
//     }
// });
document.addEventListener('DOMContentLoaded', () => {
    // Fetch the JSON data
    fetch('./data/section15/section15.json')
        .then(response => response.json())
        .then(data => {
            const locations = data.Locations;
            const locationContainer = document.getElementsByClassName('section15_location_container')[0];
            
            locations.forEach(location => {
                const card = document.createElement('div');
                card.className = 'section15_location_card';
                card.innerHTML = `
                    <img src="${location.Image}" alt="Location Image">
                    <h2>${location.Name}</h2>
                    <h3>${location.SpecificLocation}</h3>
                    <p><a href="#" class="section15_more-info" data-id="${location.CompanyName}">获取更多信息 =></a></p>
                `;
                locationContainer.appendChild(card);
            });

            // Add event listeners to 'more-info' links
            document.querySelectorAll('.section15_more-info').forEach(link => {
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    const companyName = event.target.getAttribute('data-id');
                    fetchLocationDetails(companyName);
                });
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    const modal = document.getElementsByClassName('section15_modal')[0];
    const closeModal = document.getElementsByClassName('section15_close')[0];
    let currentImageIndex = 0;
    let imageDetails = [];

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    function fetchLocationDetails(companyName){
        fetch('./data/section15/section15.json')
            .then(response => response.json())
            .then(data => {
                const locations = data.Locations;
                const location = locations.find(location => location.CompanyName === companyName);
                showModal(location);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function showModal(location) {
        document.getElementById('section15_modal-company-name').textContent = location.CompanyName;
        imageDetails = location.ImageDetail;
        currentImageIndex = 0;
        updateModalImage();
        document.getElementById('section15_modal-founded').textContent = `Founded: ${location.Founded}`;
        document.getElementById('section15_modal-description').textContent = location.Description;
        document.getElementById('section15_modal-contact').textContent = `Contact: ${location.Contact}`;
        modal.style.display = 'block';
    }

    function updateModalImage() {
        const modalImage1 = document.getElementById('section15_modal-image1');
        const modalImage2 = document.getElementById('section15_modal-image2');
        modalImage1.src = imageDetails[currentImageIndex];
        modalImage1.classList.remove('section15_hidden');
        modalImage2.classList.add('section15_hidden');
    }

    function switchImages(next) {
        const modalImage1 = document.getElementById('section15_modal-image1');
        const modalImage2 = document.getElementById('section15_modal-image2');
        const outgoingImage = modalImage1.classList.contains('section15_hidden') ? modalImage2 : modalImage1;
        const incomingImage = modalImage1.classList.contains('section15_hidden') ? modalImage1 : modalImage2;
        
        outgoingImage.classList.remove('section15_slide-in-left', 'section15_slide-in-right', 'section15_slide-out-left', 'section15_slide-out-right');
        incomingImage.classList.remove('section15_slide-in-left', 'section15_slide-in-right', 'section15_slide-out-left', 'section15_slide-out-right');
        
        outgoingImage.classList.add(next ? 'section15_slide-out-left' : 'section15_slide-out-right');
        incomingImage.src = imageDetails[currentImageIndex];
        incomingImage.classList.remove('section15_hidden');
        incomingImage.classList.add(next ? 'section15_slide-in-right' : 'section15_slide-in-left');
        
        outgoingImage.addEventListener('animationend', function() {
            outgoingImage.classList.add('section15_hidden');
            outgoingImage.classList.remove('section15_slide-out-left', 'section15_slide-out-right');
        }, { once: true });
    }

    document.getElementById('section15_prev-image').addEventListener('click', () => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
        } else {
            currentImageIndex = imageDetails.length - 1; // 循环到最后一张图片
        }
        switchImages(false);
    });

    document.getElementById('section15_next-image').addEventListener('click', () => {
        if (currentImageIndex < imageDetails.length - 1) {
            currentImageIndex++;
        } else {
            currentImageIndex = 0; // 循环到第一张图片
        }
        switchImages(true);
    });
});
