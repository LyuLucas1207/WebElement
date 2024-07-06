// function preloadImages() {
//     const images = [
//         "../pic/pic7.jpg",
//         "../pic/pic32.jpg",
//         "../pic/pic36.jpg",
//         "../pic/pic16.jpg",
//         "../pic/pic20.jpg",
//         "../pic/pic21.jpg",
//         "../pic/pic22.jpg",
//         "../pic/pic17.jpg",
//         "../pic/pic31.jpg",
//     ];
//     images.forEach(image => {
//         const img = new Image();
//         img.src = image;
//     });
// }

// document.addEventListener("DOMContentLoaded", preloadImages);




// const container = document.querySelector('.section8_slider_container');
// const slides = document.querySelectorAll('.section8_slide');
// const arrLeft = document.querySelector('.section8_arrow-left');
// const arrRight = document.querySelector('.section8_arrow-right');

// let offset = 0;//Offset value for the slides container
// let slideIncrement = 0;//Index of the current slide
// let slideDecrement = slides.length - 1;//Index of the last slide

// arrRight.addEventListener('click', () => {
//     arrRight.disabled = true;
//     offset = slides[0].offsetWidth;
//     container.style.transition = "transform 500ms ease-in-out";
//     container.style.transform = "translateX(-" + offset + "px)";

//     setTimeout(() => {
//         container.style.transition = "none";
//         slides[slideIncrement].style.order = slides.length - 1;
//         container.style.transform = "translateX(0)";
//         slideIncrement++;
//         slideDecrement = slideIncrement - 1;

//         if(slideIncrement == slides.length){
//             slideIncrement = 0;
//             slides.forEach(slide => {
//                 slide.style.order = "initial";
//             });
//         }

//         arrRight.disabled = false;
//     }, 500);
// });

// arrLeft.addEventListener('click', () => {
//     arrLeft.disabled = true;
//     offset = slides[0].offsetWidth;
//     container.style.transition = "none";
//     if(slideDecrement < 0){
//         slides.forEach(slide => {
//             slide.style.order = "initial";
//         });
//         slideDecrement = slides.length - 1;
//     }
//     slides[slideDecrement].style.order = "-1";
//     container.style.transform = "translateX(-" + offset + "px)";
//     setTimeout(() => {
//         container.style.transition = "transform 500ms ease-in-out";
//         container.style.transform = "translateX(0)";
//     },1);
//     setTimeout(() => {
//         slideDecrement--;
//         slideIncrement = slideDecrement + 1;
//         arrLeft.disabled = false;
//     }, 500);
// });


document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.section8_slider_container');

    fetch('./data/section8/section8.json') // Replace this URL with the actual URL to fetch data
        .then(response => response.json())
        .then(data => {
            let size = data.sliders.length;
            container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
            data.sliders.forEach(slider => {
                const slide = document.createElement('div');
                slide.className = 'section8_slide';

                const card = document.createElement('div');
                card.className = 'section8_card';

                const link = document.createElement('a');
                link.href = `${slider.url_a}#${slider.category}`;

                const img = document.createElement('img');
                img.src = slider.img;
                img.alt = slider.name;
                link.appendChild(img);

                const h2 = document.createElement('h2');
                h2.textContent = slider.name;

                const p = document.createElement('p');
                p.textContent = slider.description;

                card.appendChild(link);
                card.appendChild(h2);
                card.appendChild(p);
                slide.appendChild(card);
                container.appendChild(slide);
            });
            initSlider(); // Initialize the slider functionality
        })
        .catch(error => console.error('Error loading the slider data:', error));

    function initSlider() {
        const slides = document.querySelectorAll('.section8_slide');
        const arrLeft = document.querySelector('.section8_arrow-left');
        const arrRight = document.querySelector('.section8_arrow-right');

        let offset = 0;
        let slideIncrement = 0;
        let slideDecrement = slides.length - 1;

        arrRight.addEventListener('click', () => {
            arrRight.disabled = true;
            offset = slides[0].offsetWidth;
            container.style.transition = "transform 500ms ease-in-out";
            container.style.transform = "translateX(-" + offset + "px)";

            setTimeout(() => {
                container.style.transition = "none";
                slides[slideIncrement].style.order = slides.length - 1;
                container.style.transform = "translateX(0)";
                slideIncrement++;
                slideDecrement = slideIncrement - 1;

                if(slideIncrement == slides.length){
                    slideIncrement = 0;
                    slides.forEach(slide => {
                        slide.style.order = "initial";
                    });
                }
                arrRight.disabled = false;
            }, 500);
        });

        arrLeft.addEventListener('click', () => {
            arrLeft.disabled = true;
            offset = slides[0].offsetWidth;
            container.style.transition = "none";
            if(slideDecrement < 0){
                slides.forEach(slide => {
                    slide.style.order = "initial";
                });
                slideDecrement = slides.length - 1;
            }
            slides[slideDecrement].style.order = "-1";
            container.style.transform = "translateX(-" + offset + "px)";
            setTimeout(() => {
                container.style.transition = "transform 500ms ease-in-out";
                container.style.transform = "translateX(0)";
            },1);
            setTimeout(() => {
                slideDecrement--;
                slideIncrement = slideDecrement + 1;
                arrLeft.disabled = false;
            }, 500);
        });
    }
});
