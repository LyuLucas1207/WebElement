// 定义变量
let offset = 0;
const maxOffset = 0;
const minOffset = -3;
const slides = Array.from(document.querySelectorAll(".section32_card"));
const clock = document.querySelector(".section32_clock-table");
const startYear = 2024; // 起始年份

// 初始化时钟表盘
for (let i = 0, year = startYear; i < 360; i += 6) {
    addClockScale(i);
    if (i % 60 === 0) {
        addThickClockScale(i, year);
        year--;
    }
}

// 添加时钟刻度
function addClockScale(degree) {
    const invisibleClockTable = document.createElement("div");
    invisibleClockTable.className = "section32_invisible-table";
    invisibleClockTable.style.transform = `rotate(${degree}deg)`;
    const clockScale = document.createElement("div");
    clockScale.className = "section32_clock-scale";
    invisibleClockTable.appendChild(clockScale);
    clock.appendChild(invisibleClockTable);
}

// 添加粗刻度
function addThickClockScale(degree, time) {
    const invisibleClockTable = document.createElement("div");
    invisibleClockTable.className = "section32_invisible-table";
    invisibleClockTable.style.transform = `rotate(${degree}deg)`;
    const thickClockScale = document.createElement("div");
    thickClockScale.className = "section32_clock-thick";
    const scaleContent = document.createElement("span");
    scaleContent.textContent = `${time}`;
    thickClockScale.appendChild(scaleContent);
    invisibleClockTable.appendChild(thickClockScale);
    clock.appendChild(invisibleClockTable);
}

// 向前切换卡片
function slideToPrev() {
    offset = Math.min(maxOffset, offset + 1);
    updateSlidesAndClock();
}

// 向后切换卡片
function slideToNext() {
    offset = Math.max(minOffset, offset - 1);
    updateSlidesAndClock();
}

// 更新卡片和时钟表盘
function updateSlidesAndClock() {
    slides.forEach(slide => {
        slide.style.transform = `translateY(${offset * 100}%)`;
    });
    clockRotate(offset * 60);
}

// 旋转时钟表盘
function clockRotate(degree) {
    clock.style.transform = `rotate(${degree}deg)`;
}

// 添加滚轮事件监听器
const section32 = document.querySelector('.section32');
const section32Main = document.querySelector('.section32_main');

section32.addEventListener('wheel', function (e) {
    e.preventDefault(); // Prevent default scroll behavior
    e.stopPropagation(); // Stop event propagation

    const section32Rect = section32.getBoundingClientRect();
    const section32MainRect = section32Main.getBoundingClientRect();

    if (e.deltaY < 0 && section32MainRect.top >= section32Rect.top) {
        slideToPrev();
    } else if (e.deltaY > 0 && section32MainRect.bottom <= section32Rect.bottom) {
        slideToNext();
    } else {
        // Enable default scrolling
        section32.style.overflowY = 'auto';
    }
});

// 添加触摸事件监听器
let touchStartY = 0;

window.addEventListener("touchstart", function (event) {
    touchStartY = event.touches[0].clientY;
});

window.addEventListener("touchmove", function (event) {
    event.preventDefault(); // Prevent default scroll behavior

    const section32Rect = section32.getBoundingClientRect();
    const section32MainRect = section32Main.getBoundingClientRect();
    let touchEndY = event.touches[0].clientY;
    let touchDiff = touchStartY - touchEndY;

    if (touchDiff > 50 && section32MainRect.top >= section32Rect.top) {
        slideToNext();
        touchStartY = touchEndY;
    } else if (touchDiff < -50 && section32MainRect.bottom <= section32Rect.bottom) {
        slideToPrev();
        touchStartY = touchEndY;
    } else {
        // Enable default scrolling
        section32.style.overflowY = 'auto';
    }
});
