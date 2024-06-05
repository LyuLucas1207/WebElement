// 当点击按钮（class为btn的元素）时执行以下代码
//<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
// $('.btn').click(function () {
//     // 切换当前按钮的类名为active，如果已经有active类名则移除，如果没有则添加
//     $(this).toggleClass('active');
//     // 切换所有class为box的元素的类名为open，如果已经有open类名则移除，如果没有则添加
//     $('.box').toggleClass('open');
// });

//write by myself to achieve the same function without jQuery

// Path: WebElement/js/section24.js
// 当点击按钮（class为btn的元素）时执行以下代码

document.querySelector('.btn').addEventListener('click', function () {
    // 切换当前按钮的类名为active，如果已经有active类名则移除，如果没有则添加
    this.classList.toggle('active');
    // 切换所有class为box的元素的类名为open，如果已经有open类名则移除，如果没有则添加
    document.querySelectorAll('.box').forEach(function (item) {
        item.classList.toggle('open');
    });
});

