// const expand_btn = document.querySelector(".expand-btn");

// let activeIndex;

// expand_btn.addEventListener("click", () => {
//     document.body.classList.toggle("collapsed");
// });

// const current = window.location.href;

// const allLinks = document.querySelectorAll(".sidebar-links a");

// allLinks.forEach((elem) => {
//     elem.addEventListener("click", function () {
//         const hrefLinkClick = elem.href;
//         allLinks.forEach((link) => {
//             if (link.href === hrefLinkClick) {
//                 link.classList.add("active");
//             } else {
//                 link.classList.remove("active");
//             }
//         });
//     });
// });

// const searchInput = document.querySelector(".search__wrapper input");

// searchInput.addEventListener("focus", () => {
//     document.body.classList.remove("collapsed");
// });
const expand_btn = document.querySelector(".expand-btn");

let activeIndex;

expand_btn.addEventListener("click", () => {
    document.body.classList.toggle("collapsed");
});

const current = window.location.href;

const allLinks = document.querySelectorAll(".sidebar-links a");

allLinks.forEach((elem) => {
    elem.addEventListener("click", function () {
        const hrefLinkClick = elem.href;
        allLinks.forEach((link) => {
            if (link.href === hrefLinkClick) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    });
});

const searchInput = document.querySelector(".search__wrapper input");

searchInput.addEventListener("focus", () => {
    document.body.classList.remove("collapsed");
});

// 主题切换功能
const themeToggleBtn = document.querySelector("#theme-toggle");

themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");
});
