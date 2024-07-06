// document.addEventListener('DOMContentLoaded', function() {
//     fetch('./data/section9/section9.json')
//         .then(response => response.json())
//         .then(data => {
//             const profilesContainer = document.querySelector('.section9_profiles');
//             data.Profiles.forEach(profile => {
//                 const profileDiv = document.createElement('div');
//                 profileDiv.className = 'section9_profile';
//                 profileDiv.innerHTML = `
//                     <div class="section9_avatar">
//                         <img src="${profile.image}" alt="${profile.name}" class="profile_img">
//                     </div>
//                     <div class="section9_info_container">
//                         <div class="section9_info">
//                             <h1>${profile.name}</h1>
//                             <h2>${profile.position}</h2>
//                             <p>${profile.description}</p>
//                         </div>
//                     </div>
//                 `;
//                 profileDiv.addEventListener('click', () => openModal(profile));
//                 profilesContainer.appendChild(profileDiv);
//             });
//         })
//         .catch(error => console.error('Error loading the profiles:', error));
// });

// function openModal(profile) {
//     const modal = document.querySelector('.section9_modal');
//     const modalContent = modal.querySelector('.section9_modal-content');
//     modalContent.innerHTML = `
//         <span class="section9_close">&times;</span>
//         <h2>${profile.name}</h2>
//         <img src="${profile.image}" alt="${profile.name}">
//         <h2>${profile.position}</h2>
//         <p>在职时长: ${profile.duration}</p>
//         <p>${profile.description}</p>
//         <h3>擅长领域：</h3>
//         <ul>${profile.skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
//         <h3>联系方式：</h3>
//         <ul>${profile.contact.map(contact => `<li>${contact.type}: ${contact.value}</li>`).join('')}</ul>
//     `;
//     modal.style.display = 'block';
//     modal.querySelector('.section9_close').addEventListener('click', () => {
//         modal.style.display = 'none';
//     });
//     window.onclick = function(event) {
//         if (event.target == modal) {
//             modal.style.display = 'none';
//         }
//     };
// }


document.addEventListener('DOMContentLoaded', function () {
    fetch('./data/section9/section9.json')
        .then(response => response.json())
        .then(data => {
            const profilesContainer = document.querySelector('.section9_profiles');
            data.Profiles.forEach(profile => {
                const profileDiv = document.createElement('div');
                profileDiv.className = 'section9_profile';

                const avatarDiv = document.createElement('div');
                avatarDiv.className = 'section9_avatar';
                const img = document.createElement('img');
                img.src = profile.image;
                img.alt = profile.name;
                img.className = 'profile_img';
                avatarDiv.appendChild(img);

                const infoContainerDiv = document.createElement('div');
                infoContainerDiv.className = 'section9_info_container';
                const infoDiv = document.createElement('div');
                infoDiv.className = 'section9_info';

                const h1 = document.createElement('h1');
                h1.textContent = profile.name;
                const h2 = document.createElement('h2');
                h2.textContent = profile.position;
                const p = document.createElement('p');
                p.textContent = profile.description;

                infoDiv.appendChild(h1);
                infoDiv.appendChild(h2);
                infoDiv.appendChild(p);
                infoContainerDiv.appendChild(infoDiv);

                profileDiv.appendChild(avatarDiv);
                profileDiv.appendChild(infoContainerDiv);

                profileDiv.addEventListener('click', () => openModal(profile));
                profilesContainer.appendChild(profileDiv);
            });
        })
        .catch(error => console.error('Error loading the profiles:', error));
});

function openModal(profile) {
    const modal = document.querySelector('.section9_modal');
    const modalContent = modal.querySelector('.section9_modal-content');

    // Clear previous modal content
    modalContent.innerHTML = '';

    const closeBtn = document.createElement('span');
    closeBtn.className = 'section9_close';
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    const h2Name = document.createElement('h2');
    h2Name.textContent = profile.name;

    const img = document.createElement('img');
    img.src = profile.image;
    img.alt = profile.name;

    const h2Position = document.createElement('h2');
    h2Position.textContent = profile.position;

    const pDuration = document.createElement('p');
    pDuration.textContent = `在职时长: ${profile.duration}`;

    const pDescription = document.createElement('p');
    pDescription.textContent = profile.description;

    const h3Skills = document.createElement('h3');
    h3Skills.textContent = '擅长领域：';

    const ulSkills = document.createElement('ul');
    profile.skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        ulSkills.appendChild(li);
    });

    const h3Contact = document.createElement('h3');
    h3Contact.textContent = '联系方式：';

    const ulContact = document.createElement('ul');
    profile.contact.forEach(contact => {
        const li = document.createElement('li');
        li.textContent = `${contact.type}: ${contact.value}`;
        ulContact.appendChild(li);
    });

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(h2Name);
    modalContent.appendChild(img);
    modalContent.appendChild(h2Position);
    modalContent.appendChild(pDuration);
    modalContent.appendChild(pDescription);
    modalContent.appendChild(h3Skills);
    modalContent.appendChild(ulSkills);
    modalContent.appendChild(h3Contact);
    modalContent.appendChild(ulContact);

    modal.style.display = 'block';

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}
