document.addEventListener('DOMContentLoaded', async function() {
    await loadDataAndCreateElements('./data/section12/section12_1.json');
    await loadDataAndCreateElements('./data/section12/section12_2.json');
    await loadDataAndCreateElements('./data/section12/section12_3.json');
    await loadDataAndCreateElements('./data/section12/section12_4.json');
    await loadDataAndCreateElements('./data/section12/section12_5.json');
    changeParagraph('./data/section12/section12.json');
    setupLazyLoading(); // 确保在所有图片元素插入DOM后调用
});


function setupLazyLoading() {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1  // 调整阈值以确定何时开始加载图片
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        observer.observe(img);
    });
}


async function changeParagraph(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const categories = Object.keys(data);
            categories.forEach(category => {
                const para = document.getElementById(`p_${category}`);
                if (para) {
                    para.innerHTML = data[category][0].paragraph;
                } else {
                    console.error(`No paragraph with id p_${category} found.`);
                }
            });
        })
        .catch(error => console.error('Error loading the paragraph data:', error));
}

async function loadDataAndCreateElements(url) {
    const cards = document.querySelector('.section12_cards');
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            const categories = Object.keys(data);
            categories.forEach(category => {
                if (document.getElementById(`section12_cards_${category}`)) {
                    data[category].forEach(product => {
                        const id = `section12_cards_${category}`;
                        const cardsID = document.getElementById(id);
                        const card = createCard(product);
                        if (cardsID) {
                            cardsID.appendChild(card);
                        } else {
                            console.error(`No element with id ${id} found.`);
                        }
                    });
                    cards.appendChild(cardsID);
                } else {
                    console.error(`No element with id section12_cards_${category} found.`);
                }
            });
        })
        .catch(error => console.error('Error loading the products data:', error));
}


function createCard(product) {
    const card = document.createElement('div');
    card.className = 'section12_card';

    const anchor = document.createElement('a');
    anchor.href = '#';
    anchor.style.display = 'none';

    const img = document.createElement('img');
    img.src = './pic/data/loading.gif';
    img.alt = product.name;
    img.dataset.src = product.img;

    const cardText = document.createElement('div');
    cardText.className = 'section12_card_text';

    const h3 = document.createElement('h3');
    h3.textContent = product.name;
    const description = document.createElement('p');
    description.textContent = product.description;
    const price = document.createElement('p');
    price.textContent = `price:￥${product.price}`;

    cardText.appendChild(h3);
    cardText.appendChild(description);
    cardText.appendChild(price);

    anchor.appendChild(img);
    anchor.appendChild(cardText);

    card.appendChild(anchor);

    anchor.addEventListener('click', function (event) {
        event.preventDefault();
        showModal(product);
    });

    img.onload = () => {
        anchor.style.display = 'flex';
    };
    img.onerror = () => {
        anchor.innerHTML = '<p>Error loading image.</p>';
    };

    return card;
}

function showModal(product) {
    const modal = document.querySelector('.section12_modal');
    const modalContent = modal.querySelector('.section12_modal-content');

    // Clear previous content
    modalContent.innerHTML = '';

    const closeButton = document.createElement('span');
    closeButton.className = 'section12_close';
    closeButton.textContent = '×';
    closeButton.onclick = () => {
        modal.style.display = 'none';
    };

    const h2 = document.createElement('h2');
    h2.textContent = product.name;

    const img = document.createElement('img');
    img.loading = 'eager';
    img.src = product.img;
    img.alt = product.name;

    const description = document.createElement('p');
    description.textContent = product.description;

    const price = document.createElement('p');
    price.textContent = `￥${product.price}`;

    const detailedInfo = document.createElement('p');
    detailedInfo.textContent = product.detailed_info;

    modalContent.appendChild(closeButton);
    modalContent.appendChild(h2);
    modalContent.appendChild(img);
    modalContent.appendChild(description);
    modalContent.appendChild(price);
    modalContent.appendChild(detailedInfo);

    modal.style.display = 'block';

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}



// function createCard(product) {
//     const card = document.createElement('div');
//     card.className = 'section12_card';
//     card.innerHTML = `
//         <a href="#" style="display: none;">
//             <img src="./pic/data/loading.gif" alt="${product.name}" data-src="${product.img}">
//             <div class="section12_card_text">
//                 <h3>${product.name}</h3>
//                 <p>${product.description}</p>
//                 <p>price:￥${product.price}</p>
//             </div>
//         </a>
//     `;

//     card.querySelector('a').addEventListener('click', function(event) {
//         event.preventDefault();
//         showModal(product);
//     });

//     const img = card.querySelector('img');
//     img.onload = () => {
//         card.querySelector('a').style.display = 'flex';
//     };
//     img.onerror = () => {
//         const loader = card.querySelector('a');
//         loader.innerHTML = '<p>Error loading image.</p>';
//     };

//     return card;
// }


// function showModal(product) {
//     const modal = document.querySelector('.section12_modal');
//     const modalContent = modal.querySelector('.section12_modal-content');
//     modalContent.innerHTML = `
//         <span class="section12_close">&times;</span>
//         <h2>${product.name}</h2>
//         <img loading="eager" src="${product.img}" alt="${product.name}">
//         <p>${product.description}</p>
//         <p>￥${product.price}</p>
//         <p>${product.detailed_info}</p>
//     `;
//     modal.style.display = 'block';
//     modal.querySelector('.section12_close').addEventListener('click', function() {
//         modal.style.display = 'none';
//     });
//     window.onclick = function(event) {
//         if (event.target === modal) {
//             modal.style.display = 'none';
//         }
//     };
// }






//when not use async
// document.addEventListener('DOMContentLoaded', function() {loadDataAndCreateElements('./data/section12/section12_1.json');});
// document.addEventListener('DOMContentLoaded', function() {loadDataAndCreateElements('./data/section12/section12_2.json');});
// document.addEventListener('DOMContentLoaded', function() {loadDataAndCreateElements('./data/section12/section12_3.json');});
// document.addEventListener('DOMContentLoaded', function() {loadDataAndCreateElements('./data/section12/section12_4.json');});
// document.addEventListener('DOMContentLoaded', function() {loadDataAndCreateElements('./data/section12/section12_5.json');});




// document.addEventListener('DOMContentLoaded', function() {
//     const container = document.querySelector('.section12_card_container');
//     fetch('./data/section12/section12.json')
//         .then(response => response.json())
//         .then(data => {
//             const categories = Object.keys(data);

//             categories.forEach(category => {
//                 const categoryDiv = document.createElement('div');
//                 categoryDiv.className = 'section12_category';

//                 const titleDiv = document.createElement('div');
//                 titleDiv.className = 'section12_title';

//                 titleDiv.innerHTML = `<h1 id="${category}">${category}</h1><p>各种产品任意选择</p>`;
//                 categoryDiv.appendChild(titleDiv);

//                 const cardDiv = document.createElement('div');
//                 cardDiv.className = 'section12_cards';
//                 cardDiv.id = `section12_cards_${category}`;
//                 categoryDiv.appendChild(cardDiv);
//                 container.appendChild(categoryDiv);

//             });
//         })
//         .catch(error => console.error(error));
// });




// document.addEventListener('DOMContentLoaded', function() {
//     loadDataAndCreateElements('./data/section12/section12_1.json');
//     loadDataAndCreateElements('./data/section12/section12_2.json');
//     loadDataAndCreateElements('./data/section12/section12_3.json');
//     loadDataAndCreateElements('./data/section12/section12_4.json');
//     loadDataAndCreateElements('./data/section12/section12_5.json');
//     changeParagraph('./data/section12/section12.json');
// });

// async function changeParagraph(url) {
//     fetch(url)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(data => {
//             const categories = Object.keys(data);
//             categories.forEach(category => {
//                 const para = document.getElementById(`p_${category}`);
//                 if (para) {  // Check if the paragraph element exists
//                     para.innerHTML = data[category][0].paragraph;
//                 } else {
//                     console.error(`No paragraph with id p_${category} found.`);
//                 }
//             });
//         })
//         .catch(error => console.error('Error loading the paragraph data:', error));
// }


// async function loadDataAndCreateElements(url) {
//     const cards = document.querySelector('.section12_cards');
//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             const categories = Object.keys(data);
//             categories.forEach(category => {
            
//                 if(document.getElementById(`section12_cards_${category}`)){
//                     data[category].forEach(product => {
//                         const id = `section12_cards_${category}`;
//                         const cardsID = document.getElementById(id);
//                         const card = createCard(product);
//                         if (cardsID) {
//                             cardsID.appendChild(card);
//                         } else {
//                             console.error(`No element with id ${id} found.`);
//                         }
//                     });
//                     cards.appendChild(cardsID);
//                 }else{
//                     console.error(`No element with id section12_cards_${category} found.`);
//                 }
//             });
//         })
//         .catch(error => console.error('Error loading the products data:', error));
// }


// function createCard(product) {
//     const card = document.createElement('div');
//     card.className = 'section12_card';
//     card.innerHTML = `
        
//         <a href="#" style="display: none;">
//         <div class="section12_loader"><img src="./pic/data/loading.gif" alt="Loading..."></div>
//             <img src="${product.img}" alt="${product.name}">
//             <div class="section12_card_text">
//                 <h3>${product.name}</h3>
//                 <p>${product.description}</p>
//                 <p>price:￥${product.price}</p>
//             </div>
//         </a>
//     `;

//     card.querySelector('a').addEventListener('click', function(event) {
//         event.preventDefault();
//         showModal(product);
//     });

//     // Image loading management
//     const img = card.querySelector('img');
//     img.onload = () => {
//         card.querySelector('a').style.display = 'flex';
//         card.querySelectorAll('.section12_loader').forEach(loader => {
//             loader.style.display = 'none';
//         });
//     };
//     img.onerror = () => {
//         const loader = card.querySelector('.section12_loader');
//         loader.innerHTML = '<p>Error loading image.</p>';
//     };

//     return card;
// }

// function showModal(product) {
//     const modal = document.querySelector('.section12_modal');
//     const modalContent = modal.querySelector('.section12_modal-content');
//     modalContent.innerHTML = `
//         <span class="section12_close">&times;</span>
//         <h2>${product.name}</h2>
//         <img loading="eager" src="${product.img}" alt="${product.name}">
//         <p>${product.description}</p>
//         <p>￥${product.price}</p>
//         <p>${product.detailed_info}</p>
//     `;
//     modal.style.display = 'block';
//     modal.querySelector('.section12_close').addEventListener('click', function() {
//         modal.style.display = 'none';
//     });
//     //when click outside the modal, close the modal
//     window.onclick = function(event) {
//         if (event.target === modal) {
//             modal.style.display = 'none';
//         }
//     };
// }

/*
    <div class="section12">
        <div class="section12_card_container">
    
            <!-- 动态内容将被JavaScript脚本填充 --->
        </div>
    
        <!-- Modal example -->
        <div id="modal1" class="section12_modal">
            <div class="section12_modal-content">
                <!-- 模态内容会在 JavaScript 中动态填充 -->
            </div>
        </div>
    </div>




*/

// document.addEventListener('DOMContentLoaded', function() {
//     loadDataAndCreateElements('./data/section12/section12_1.json');
//     loadDataAndCreateElements('./data/section12/section12_2.json');
//     loadDataAndCreateElements('./data/section12/section12_3.json');
//     loadDataAndCreateElements('./data/section12/section12_4.json');
//     loadDataAndCreateElements('./data/section12/section12_5.json');
// });


// async function loadDataAndCreateElements(url) {
//     const container = document.querySelector('.section12_card_container');

//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             const categories = Object.keys(data);

//             categories.forEach(category => {
//                 const categoryDiv = document.createElement('div');
//                 categoryDiv.className = 'section12_category';

//                 const titleDiv = document.createElement('div');
//                 titleDiv.className = 'section12_title';
//                 titleDiv.innerHTML = `<h1 id="${category}">${category}</h1><p>各种产品任意选择</p>`;
//                 categoryDiv.appendChild(titleDiv);

//                 const cardDiv = document.createElement('div');
//                 cardDiv.className = 'section12_cards';

//                 data[category].forEach(product => {
//                     const card = createCard(product);
//                     cardDiv.appendChild(card);
//                 });

//                 categoryDiv.appendChild(cardDiv);
//                 container.appendChild(categoryDiv);
//             });
//         })
//         .catch(error => {
//             console.error('Error loading the products data:', error);
//         });
// }

// function createCard(product) {
//     const card = document.createElement('div');
//     card.className = 'section12_card';
//     card.innerHTML = `
//         <div class="section12_loader"><img src="./pic/data/loading.gif" alt="Loading..."></div>
//         <a href="#" style="display: none;">
//             <img src="${product.img}" alt="${product.name}">
//             <div class="section12_card_text">
//                 <h3>${product.name}</h3>
//                 <p>${product.description}</p>
//                 <p>price:￥${product.price}</p>
//             </div>
//         </a>
//     `;

//     card.querySelector('a').addEventListener('click', function(event) {
//         event.preventDefault();
//         showModal(product);
//     });

//     // Image loading management
//     const img = card.querySelector('img');
//     img.onload = () => {
//         card.querySelector('a').style.display = 'flex';
//         card.querySelector('.section12_loader').style.display = 'none';
//     };
//     img.onerror = () => {
//         const loader = card.querySelector('.section12_loader');
//         loader.innerHTML = '<p>Error loading image.</p>';
//     };

//     return card;
// }

// function showModal(product) {
//     const modal = document.querySelector('.section12_modal');
//     const modalContent = modal.querySelector('.section12_modal-content');
//     modalContent.innerHTML = `
//         <span class="section12_close">&times;</span>
//         <h2>${product.name}</h2>
//         <img src="${product.img}" alt="${product.name}">
//         <p>${product.description}</p>
//         <p>￥${product.price}</p>
//         <p>${product.detailed_info}</p>
//     `;
//     modal.style.display = 'block';
//     modal.querySelector('.section12_close').addEventListener('click', function() {
//         modal.style.display = 'none';
//     });
//     //when click outside the modal, close the modal
//     window.onclick = function(event) {
//         if (event.target === modal) {
//             modal.style.display = 'none';
//         }
//     };
// }

// document.addEventListener("DOMContentLoaded", function() {
//     var triggers = document.querySelectorAll('.section12_cards .section12_card');
//     var modals = document.querySelectorAll('.section12_modal');
//     var spans = document.querySelectorAll('.section12_close');

//     triggers.forEach((trigger, index) => {
//         trigger.onclick = function() {
//             modals[index].style.display = "block";
//         };
//     });

//     spans.forEach(span => {
//         span.onclick = function() {
//             this.parentElement.parentElement.style.display = "none";
//         };
//     });

//     window.onclick = function(event) {
//         modals.forEach(modal => {
//             if (event.target === modal) {
//                 modal.style.display = "none";
//             }
//         });
//     };
// });

//following code is high probability to be random

// document.addEventListener('DOMContentLoaded', function() {
//     const container = document.querySelector('.section12_card_container');

//     fetch('./data/section12/section12_1.json')
//         .then(response => response.json())
//         .then(data => {
//             const categories = Object.keys(data);

//             categories.forEach(category => {
//                 const categoryDiv = document.createElement('div');
//                 categoryDiv.className = 'section12_category';

//                 const titleDiv = document.createElement('div');
//                 titleDiv.className = 'section12_title';
//                 titleDiv.innerHTML = `<h1>${category}</h1><p>各种产品任意选择</p>`;
//                 categoryDiv.appendChild(titleDiv);

//                 const cardDiv = document.createElement('div');
//                 cardDiv.className = 'section12_cards';

//                 data[category].forEach(product => {
//                     const card = document.createElement('div');
//                     card.className = 'section12_card';
//                     card.innerHTML = `
//                         <div class="section12_loader"><img src="./pic/data/loading.gif" alt="Loading..."></div>
//                         <a href="#" style="display: none;">
//                             <img src="${product.img}" alt="${product.name}">
//                             <div class="section12_card_text">
//                                 <h3>${product.name}</h3>
//                                 <p>${product.description}</p>
//                                 <p>price:￥${product.price}</p>
//                             </div>
//                         </a>
//                     `;
//                     cardDiv.appendChild(card);

//                     // Image loading management
//                     const img = card.querySelector('img');
//                     img.onload = () => {
//                         card.querySelector('a').style.display = 'flex'; // Show the card content
//                         card.querySelector('.section12_loader').style.display = 'none'; // Hide the section12_loader
//                     };
//                     img.onerror = () => {
//                         const loader = card.querySelector('.section12_loader');
//                         loader.innerHTML = '<p>Error loading image.</p>'; // Show error message
//                     };
//                 });

//                 categoryDiv.appendChild(cardDiv);
//                 container.appendChild(categoryDiv);
//             });
//         })
//         .catch(error => {
//             console.error('Error loading the products data:', error);
//         });
// });

// document.addEventListener('DOMContentLoaded', function() {
//     const container = document.querySelector('.section12_card_container');

//     fetch('./data/section12/section12_2.json')
//         .then(response => response.json())
//         .then(data => {
//             const categories = Object.keys(data);

//             categories.forEach(category => {
//                 const categoryDiv = document.createElement('div');
//                 categoryDiv.className = 'section12_category';

//                 const titleDiv = document.createElement('div');
//                 titleDiv.className = 'section12_title';
//                 titleDiv.innerHTML = `<h1>${category}</h1><p>各种产品任意选择</p>`;
//                 categoryDiv.appendChild(titleDiv);

//                 const cardDiv = document.createElement('div');
//                 cardDiv.className = 'section12_cards';

//                 data[category].forEach(product => {
//                     const card = document.createElement('div');
//                     card.className = 'section12_card';
//                     card.innerHTML = `
//                         <div class="section12_loader"><img src="./pic/data/loading.gif" alt="Loading..."></div>
//                         <a href="#" style="display: none;">
//                             <img src="${product.img}" alt="${product.name}">
//                             <div class="section12_card_text">
//                                 <h3>${product.name}</h3>
//                                 <p>${product.description}</p>
//                                 <p>price:￥${product.price}</p>
//                             </div>
//                         </a>
//                     `;
//                     cardDiv.appendChild(card);

//                     // Image loading management
//                     const img = card.querySelector('img');
//                     img.onload = () => {
//                         card.querySelector('a').style.display = 'flex'; // Show the card content
//                         card.querySelector('.section12_loader').style.display = 'none'; // Hide the section12_loader
//                     };
//                     img.onerror = () => {
//                         const loader = card.querySelector('.section12_loader');
//                         loader.innerHTML = '<p>Error loading image.</p>'; // Show error message
//                     };
//                 });

//                 categoryDiv.appendChild(cardDiv);
//                 container.appendChild(categoryDiv);
//             });
//         })
//         .catch(error => {
//             console.error('Error loading the products data:', error);
//         });

    
// });

// document.addEventListener('DOMContentLoaded', function() {
//     const container = document.querySelector('.section12_card_container');

//     fetch('./data/section12/section12_3.json')
//         .then(response => response.json())
//         .then(data => {
//             const categories = Object.keys(data);

//             categories.forEach(category => {
//                 const categoryDiv = document.createElement('div');
//                 categoryDiv.className = 'section12_category';

//                 const titleDiv = document.createElement('div');
//                 titleDiv.className = 'section12_title';
//                 titleDiv.innerHTML = `<h1>${category}</h1><p>各种产品任意选择</p>`;
//                 categoryDiv.appendChild(titleDiv);

//                 const cardDiv = document.createElement('div');
//                 cardDiv.className = 'section12_cards';

//                 data[category].forEach(product => {
//                     const card = document.createElement('div');
//                     card.className = 'section12_card';
//                     card.innerHTML = `
//                         <div class="section12_loader"><img src="./pic/data/loading.gif" alt="Loading..."></div>
//                         <a href="#" style="display: none;">
//                             <img src="${product.img}" alt="${product.name}">
//                             <div class="section12_card_text">
//                                 <h3>${product.name}</h3>
//                                 <p>${product.description}</p>
//                                 <p>price:￥${product.price}</p>
//                             </div>
//                         </a>
//                     `;
//                     cardDiv.appendChild(card);

//                     // Image loading management
//                     const img = card.querySelector('img');
//                     img.onload = () => {
//                         card.querySelector('a').style.display = 'flex'; // Show the card content
//                         card.querySelector('.section12_loader').style.display = 'none'; // Hide the section12_loader
//                     };
//                     img.onerror = () => {
//                         const loader = card.querySelector('.section12_loader');
//                         loader.innerHTML = '<p>Error loading image.</p>'; // Show error message
//                     };
//                 });

//                 categoryDiv.appendChild(cardDiv);
//                 container.appendChild(categoryDiv);
//             });
//         })
//         .catch(error => {
//             console.error('Error loading the products data:', error);
//         });
// });

// document.addEventListener('DOMContentLoaded', function() {
//     const container = document.querySelector('.section12_card_container');

//     fetch('./data/section12/section12_4.json')
//         .then(response => response.json())
//         .then(data => {
//             const categories = Object.keys(data);

//             categories.forEach(category => {
//                 const categoryDiv = document.createElement('div');
//                 categoryDiv.className = 'section12_category';

//                 const titleDiv = document.createElement('div');
//                 titleDiv.className = 'section12_title';
//                 titleDiv.innerHTML = `<h1>${category}</h1><p>各种产品任意选择</p>`;
//                 categoryDiv.appendChild(titleDiv);

//                 const cardDiv = document.createElement('div');
//                 cardDiv.className = 'section12_cards';

//                 data[category].forEach(product => {
//                     const card = document.createElement('div');
//                     card.className = 'section12_card';
//                     card.innerHTML = `
//                         <div class="section12_loader"><img src="./pic/data/loading.gif" alt="Loading..."></div>
//                         <a href="#" style="display: none;">
//                             <img src="${product.img}" alt="${product.name}">
//                             <div class="section12_card_text">
//                                 <h3>${product.name}</h3>
//                                 <p>${product.description}</p>
//                                 <p>price:￥${product.price}</p>
//                             </div>
//                         </a>
//                     `;
//                     cardDiv.appendChild(card);

//                     // Image loading management
//                     const img = card.querySelector('img');
//                     img.onload = () => {
//                         card.querySelector('a').style.display = 'flex'; // Show the card content
//                         card.querySelector('.section12_loader').style.display = 'none'; // Hide the section12_loader
//                     };
//                     img.onerror = () => {
//                         const loader = card.querySelector('.section12_loader');
//                         loader.innerHTML = '<p>Error loading image.</p>'; // Show error message
//                     };
//                 });

//                 categoryDiv.appendChild(cardDiv);
//                 container.appendChild(categoryDiv);
//             });
//         })
//         .catch(error => {
//             console.error('Error loading the products data:', error);
//         });
// });

// document.addEventListener('DOMContentLoaded', function() {
//     const container = document.querySelector('.section12_card_container');

//     fetch('./data/section12/section12_5.json')
//         .then(response => response.json())
//         .then(data => {
//             const categories = Object.keys(data);

//             categories.forEach(category => {
//                 const categoryDiv = document.createElement('div');
//                 categoryDiv.className = 'section12_category';

//                 const titleDiv = document.createElement('div');
//                 titleDiv.className = 'section12_title';
//                 titleDiv.innerHTML = `<h1>${category}</h1><p>各种产品任意选择</p>`;
//                 categoryDiv.appendChild(titleDiv);

//                 const cardDiv = document.createElement('div');
//                 cardDiv.className = 'section12_cards';

//                 data[category].forEach(product => {
//                     const card = document.createElement('div');
//                     card.className = 'section12_card';
//                     card.innerHTML = `
//                         <div class="section12_loader"><img src="./pic/data/loading.gif" alt="Loading..."></div>
//                         <a href="#" style="display: none;">
//                             <img src="${product.img}" alt="${product.name}">
//                             <div class="section12_card_text">
//                                 <h3>${product.name}</h3>
//                                 <p>${product.description}</p>
//                                 <p>price:￥${product.price}</p>
//                             </div>
//                         </a>
//                     `;
//                     cardDiv.appendChild(card);

//                     // Image loading management
//                     const img = card.querySelector('img');
//                     img.onload = () => {
//                         card.querySelector('a').style.display = 'flex'; // Show the card content
//                         card.querySelector('.section12_loader').style.display = 'none'; // Hide the section12_loader
//                     };
//                     img.onerror = () => {
//                         const loader = card.querySelector('.section12_loader');
//                         loader.innerHTML = '<p>Error loading image.</p>'; // Show error message
//                     };
//                 });

//                 categoryDiv.appendChild(cardDiv);
//                 container.appendChild(categoryDiv);
//             });
//         })
//         .catch(error => {
//             console.error('Error loading the products data:', error);
//         });
// });


//failed code

// document.addEventListener('DOMContentLoaded', function() {
//     const container = document.querySelector('.section12_card_container');

//     fetch('./data/section12/section12.json')
//         .then(response => response.json())
//         .then(data => {
//             const categories = Object.keys(data);

//             categories.forEach(category => {
//                 const categoryDiv = document.createElement('div');
//                 categoryDiv.className = 'section12_category';

//                 const titleDiv = document.createElement('div');
//                 titleDiv.className = 'section12_title';
//                 titleDiv.innerHTML = `<h1>${category}</h1><p>各种产品任意选择</p>`;
//                 categoryDiv.appendChild(titleDiv);

//                 const cardDiv = document.createElement('div');
//                 cardDiv.className = 'section12_cards';

//                 data[category].forEach(product => {
//                     const card = document.createElement('div');
//                     card.className = 'section12_card';
//                     card.innerHTML = `
//                         <div class="section12_loader"><img src="./pic/data/loading.gif" alt="Loading..."></div>
//                         <a href="#" style="display: none;">
//                             <img src="${product.img}" alt="${product.name}">
//                             <div class="section12_card_text">
//                                 <h3>${product.name}</h3>
//                                 <p>${product.description}</p>
//                                 <p>price:￥${product.price}</p>
//                             </div>
//                         </a>
//                     `;
//                     cardDiv.appendChild(card);

//                     // Image loading management
//                     const img = card.querySelector('img');
//                     img.onload = () => {
//                         card.querySelector('a').style.display = 'flex'; // Show the card content
//                         card.querySelector('.section12_loader').style.display = 'none'; // Hide the section12_loader
//                     };
//                     img.onerror = () => {
//                         const loader = card.querySelector('.section12_loader');
//                         loader.innerHTML = '<p>Error loading image.</p>'; // Show error message
//                     };
//                 });

//                 categoryDiv.appendChild(cardDiv);
//                 container.appendChild(categoryDiv);
//             });
//         })
//         .catch(error => {
//             console.error('Error loading the products data:', error);
//         });
// });




// document.addEventListener('DOMContentLoaded', function() {
//     // 获取容器
//     const container = document.querySelector('.section12_card_container');

//     // 第一阶段：加载GIF
//     fetch('./data/section12/section12.json')
//         .then(response => response.json())
//         .then(data => {
//             const categories = Object.keys(data);

//             const promises = categories.map(category => {
//                 return new Promise((resolve, reject) => {
//                     const categoryDiv = document.createElement('div');
//                     categoryDiv.className = 'section12_category';

//                     const titleDiv = document.createElement('div');
//                     titleDiv.className = 'section12_title';
//                     titleDiv.innerHTML = `<h1>${category}</h1><p>各种产品任意选择</p>`;
//                     categoryDiv.appendChild(titleDiv);

//                     const cardDiv = document.createElement('div');
//                     cardDiv.className = 'section12_cards';

//                     data[category].forEach(product => {
//                         const card = document.createElement('div');
//                         card.className = 'section12_card';
//                         card.innerHTML = `
//                             <div class="section12_loader"><img src="./pic/data/loading.gif" alt="Loading..."></div>
//                             <a href="#" style="display: none;">
//                             </a>
//                         `;
//                         cardDiv.appendChild(card);
//                     });

//                     categoryDiv.appendChild(cardDiv);
//                     container.appendChild(categoryDiv);

//                     resolve(); // 表示该 category 完成加载
//                 });
//             });

//             // 等待所有 category 加载完成后再执行第二阶段
//             Promise.all(promises)
//                 .then(() => {
//                     loadCardContent(data);
//                 });
//         })
//         .catch(error => {
//             console.error('Error loading the products data:', error);
//         });
// });

// function loadCardContent(data) {
//     const links = document.querySelectorAll('.section12_card a');

//     const categories = Object.keys(data);

//     categories.forEach((category, index) => {
//         const products = data[category];
//         products.forEach((product, productIndex) => {
//             const link = links[index * products.length + productIndex];
//             const img = new Image();
//             img.src = product.img;
//             img.alt = product.name;
//             img.onload = () => {
//                 // 构建卡片内容
//                 link.innerHTML = `
//                     <img src="${product.img}" alt="${product.name}">
//                     <div class="section12_card_text">
//                         <h3>${product.name}</h3>
//                         <p>${product.description}</p>
//                         <p>price:￥${product.price}</p>
//                     </div>
//                 `;
//                 link.previousElementSibling.style.display = 'none';  // 隐藏加载动画
//                 link.style.display = 'flex';  // 显示内容
//             };
//             img.onerror = () => {
//                 link.previousElementSibling.innerHTML = '<p>Error loading image.</p>'; // 显示错误信息
//             };
//         });
//     });
// }