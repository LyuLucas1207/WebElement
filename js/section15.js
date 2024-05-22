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

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    function fetchLocationDetails(CompanyName){
        fetch('./data/section15/section15.json')
            .then(response => response.json())
            .then(data => {
                const locations = data.Locations;
                const location = locations.find(location => location.CompanyName === CompanyName);
                showModal(location);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function showModal(location) {
        document.getElementById('section15_modal-company-name').textContent = location.CompanyName;
        document.getElementById('section15_modal-image').src = location.ImageDetail;
        document.getElementById('section15_modal-founded').textContent = `Founded: ${location.Founded}`;
        document.getElementById('section15_modal-description').textContent = location.Description;
        document.getElementById('section15_modal-contact').textContent = `Contact: ${location.Contact}`;
        modal.style.display = 'block';
    }
});
