document.addEventListener('DOMContentLoaded', function() {
    fetch('./data/section9/section9.json')
        .then(response => response.json())
        .then(data => {
            const profilesContainer = document.querySelector('.section9_profiles');
            data.Profiles.forEach(profile => {
                const profileDiv = document.createElement('div');
                profileDiv.className = 'section9_profile';
                profileDiv.innerHTML = `
                    <div class="section9_avatar">
                        <img src="${profile.image}" alt="${profile.name}" class="profile_img">
                    </div>
                    <div class="section9_info_container">
                        <div class="section9_info">
                            <h1>${profile.name}</h1>
                            <h2>${profile.position}</h2>
                            <p>${profile.description}</p>
                        </div>
                    </div>
                `;
                profileDiv.addEventListener('click', () => openModal(profile));
                profilesContainer.appendChild(profileDiv);
            });
        })
        .catch(error => console.error('Error loading the profiles:', error));
});

function openModal(profile) {
    const modal = document.querySelector('.section9_modal');
    const modalContent = modal.querySelector('.section9_modal-content');
    modalContent.innerHTML = `
        <span class="section9_close">&times;</span>
        <h2>${profile.name}</h2>
        <img src="${profile.image}" alt="${profile.name}">
        <h2>${profile.position}</h2>
        <p>在职时长: ${profile.duration}</p>
        <p>${profile.description}</p>
        <h3>擅长领域：</h3>
        <ul>${profile.skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
        <h3>联系方式：</h3>
        <ul>${profile.contact.map(contact => `<li>${contact.type}: ${contact.value}</li>`).join('')}</ul>
    `;
    modal.style.display = 'block';
    modal.querySelector('.section9_close').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}
