// document.addEventListener("DOMContentLoaded", function() {
//     // Simulate content loading time
//     setTimeout(function() {
//         const loadingScreen = document.querySelector('.loading');
//         const content = document.querySelectorAll('body > div:not(.loading)');

//         // Hide the loading screen
//         loadingScreen.style.display = 'none';

//         // Show the content with animation
//         content.forEach(section => {
//             section.classList.remove('hidden');
//             section.classList.add('visible');
//         });
//     }, 3000); // Adjust time as needed
// });

document.addEventListener("DOMContentLoaded", function() {
    const loadingScreen = document.querySelector('.loading');
    const content = document.querySelectorAll('body > div:not(.loading)');
    
    // Check if the page has been loaded before in this session
    if (!sessionStorage.getItem('pageLoaded')) {
        // Display loading screen and hide content initially
        loadingScreen.style.display = 'flex';
        content.forEach(section => {
            section.classList.add('hidden');
        });

        // Simulate content loading time
        setTimeout(function() {
            // Hide the loading screen
            loadingScreen.style.display = 'none';

            // Show the content with animation
            content.forEach(section => {
                section.classList.remove('hidden');
                section.classList.add('visible');
            });

            // Mark the page as loaded in this session
            sessionStorage.setItem('pageLoaded', 'true');
        }, 3000); // Adjust time as needed
    } else {
        // If page is already loaded in this session, show content immediately
        loadingScreen.style.display = 'none';
        content.forEach(section => {
            section.classList.remove('hidden');
            section.classList.add('visible');
        });
    }
});
