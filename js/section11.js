

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


document.addEventListener("DOMContentLoaded", function() {
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
            trigger.innerHTML = `<strong>${question.question}</strong> ${question.specific}`;
            container.appendChild(trigger);

            // 添加点击事件以显示模态窗口
            trigger.onclick = function() {
                modalContent.innerHTML = `
                    <span class="section11_close">&times;</span>
                    <h2>${question.question}</h2>
                    <img src="${question.img}" alt="问题图片${index + 4}">
                    <p>${question.answer}</p>
                `;
                modal.style.display = 'block'; // 显示模态的背景层
                document.querySelector('.section11_close').onclick = () => {
                    modal.style.display = 'none'; // 点击关闭按钮隐藏模态窗口
                };
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = 'none'; // 点击背景层隐藏模态窗口
                    }
                };
            };
        });

        

        const lastTrigger = document.createElement('p');
        lastTrigger.innerHTML = '<a href="contact.html"><strong>·还有其他问题？</strong> 请联系我们。</a>';
        container.appendChild(lastTrigger);
        
    })
    .catch(error => {
        console.error('Failed to load section11 data:', error);
    });
});

