

// document.addEventListener("DOMContentLoaded", function() {
//     var triggers = document.querySelectorAll('.section11_info p');
//     var modals = document.querySelectorAll('.section11_modal');
//     var spans = document.querySelectorAll('.section11_close');

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


// document.addEventListener("DOMContentLoaded", function() {
//     // 加载 JSON 数据
//     fetch('./data/section11/section11.json')
//     .then(response => response.json())
//     .then(data => {
//         const container = document.querySelector('.section11_info');
//         const modal = document.querySelector('.section11_modal'); // 获取模态窗口的背景层
//         const modalContent = document.querySelector('.section11_modal-content');
//         data.Questions.forEach((question, index) => {
//             // 创建问题触发器
//             const trigger = document.createElement('p');
//             trigger.innerHTML = `<strong>${question.question}</strong> ${question.specific}`;
//             container.appendChild(trigger);

//             // 添加点击事件以显示模态窗口
//             trigger.onclick = function() {
//                 modalContent.innerHTML = `
//                     <span class="section11_close">&times;</span>
//                     <h2>${question.question}</h2>
//                     <img src="${question.img}" alt="问题图片${index + 4}">
//                     <p>${question.answer}</p>
//                 `;
//                 modal.style.display = 'block'; // 显示模态的背景层
//                 document.querySelector('.section11_close').onclick = () => {
//                     modal.style.display = 'none'; // 点击关闭按钮隐藏模态窗口
//                 };
//                 window.onclick = function(event) {
//                     if (event.target == modal) {
//                         modal.style.display = 'none'; // 点击背景层隐藏模态窗口
//                     }
//                 };
//             };
//         });

        

//         const lastTrigger = document.createElement('p');
//         lastTrigger.innerHTML = '<a href="contact.html"><strong>·还有其他问题？</strong> 请联系我们。</a>';
//         container.appendChild(lastTrigger);
        
//     })
//     .catch(error => {
//         console.error('Failed to load section11 data:', error);
//     });
// });

document.addEventListener("DOMContentLoaded", function () {
    // 加载 JSON 数据
    fetch('./data/section11/section11.json')
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.section11_info');
            const modal = document.querySelector('.section11_modal'); // 获取模态窗口的背景层
            const modalContent = document.querySelector('.section11_modal-content');
            data.Questions.forEach((question, index) => {
                // 创建问题触发器
                const trigger = document.createElement('p');
                const strong = document.createElement('strong');
                strong.textContent = question.question;
                trigger.appendChild(strong);
                trigger.append(` ${question.specific}`);
                container.appendChild(trigger);

                // 添加点击事件以显示模态窗口
                trigger.onclick = function () {
                    modalContent.innerHTML = ''; // Clear previous content

                    const closeButton = document.createElement('span');
                    closeButton.className = 'section11_close';
                    closeButton.textContent = '×';
                    closeButton.onclick = () => {
                        modal.style.display = 'none'; // 点击关闭按钮隐藏模态窗口
                    };

                    const h2 = document.createElement('h2');
                    h2.textContent = question.question;

                    const img = document.createElement('img');
                    img.src = question.img;
                    img.alt = `问题图片${index + 4}`;

                    const p = document.createElement('p');
                    p.textContent = question.answer;

                    modalContent.appendChild(closeButton);
                    modalContent.appendChild(h2);
                    modalContent.appendChild(img);
                    modalContent.appendChild(p);

                    modal.style.display = 'block'; // 显示模态的背景层

                    window.onclick = function (event) {
                        if (event.target == modal) {
                            modal.style.display = 'none'; // 点击背景层隐藏模态窗口
                        }
                    };
                };
            });

            const lastTrigger = document.createElement('p');
            const lastLink = document.createElement('a');
            lastLink.href = 'contact.html';
            const strongLast = document.createElement('strong');
            strongLast.textContent = '·还有其他问题？';
            lastLink.appendChild(strongLast);
            lastLink.append(' 请联系我们。');
            lastTrigger.appendChild(lastLink);
            container.appendChild(lastTrigger);

        })
        .catch(error => {
            console.error('Failed to load section11 data:', error);
        });
});


