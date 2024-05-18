// function smoothScrollToTop(event){
//     event.preventDefault();
//     window.scrollTo({
//         top: 0,
//         behavior: 'smooth'
//     });
// }

// function smoothScrollToTop(duration) {
//     const totalScrollDistance = window.pageYOffset; // 获取当前滚动的垂直距离
//     let scrollY = totalScrollDistance, oldTimestamp = null;

//     function step(newTimestamp) {
//         if (oldTimestamp !== null) {
//             scrollY -= totalScrollDistance * (newTimestamp - oldTimestamp) / duration;
//             if (scrollY <= 0) return window.scrollTo(0, 0);
//             window.scrollTo(0, scrollY);
//         }
//         oldTimestamp = newTimestamp;
//         window.requestAnimationFrame(step);
//     }
//     window.requestAnimationFrame(step);
// }

function smoothScrollToTop(duration) {
    let start = null;
    const initialPos = window.pageYOffset;  // 获取当前页面的滚动位置
    const target = 0;  // 目标位置顶部，即0

    // 运行动画的步骤
    function step(timestamp) {
        if (!start) start = timestamp;  // 记录动画开始的时间
        const elapsed = timestamp - start;  // 计算已过去的时间
        const progress = elapsed / duration;  // 计算时间进度

        const amount = easeInOutCubic(progress);  // 应用缓动函数计算当前进度
        window.scrollTo(0, initialPos + (target - initialPos) * amount);  // 滚动到计算的位置

        if (elapsed < duration) {  // 如果时间未到，则继续动画
            window.requestAnimationFrame(step);
        } else {
            window.scrollTo(0, target);  // 确保滚动确实到达顶部
        }
    }

    window.requestAnimationFrame(step);  // 开始执行动画
}

// 缓动函数 - 使用三次方的缓动，开始和结束时速度较慢
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

