// document.addEventListener("DOMContentLoaded", function() {
//     var modal = document.getElementById("myModal");
//     var span = document.getElementsByClassName("close")[0];

//     document.querySelectorAll('.info p').forEach(item => {
//         item.onclick = function() {
//             document.getElementById('modal-text').textContent = this.textContent;
//             modal.style.display = "block";
//         }
//     });

//     span.onclick = function() {
//         modal.style.display = "none";
//     };

//     window.onclick = function(event) {
//         if (event.target == modal) {
//             modal.style.display = "none";
//         }
//     };
// });
// document.addEventListener("DOMContentLoaded", function() {
//     var modal = document.getElementById("myModal");
//     var modalContent = document.querySelector(".modal-content");
//     var span = document.getElementsByClassName("close")[0];

//     document.querySelectorAll('.info p').forEach(item => {
//         item.onclick = function() {
//             document.getElementById('modal-text').textContent = this.textContent;
//             modal.style.display = "block";
//             modalContent.classList.add("modal-open");
//         }
//     });

//     span.onclick = function() {
//         modal.style.display = "none";
//         modalContent.classList.remove("modal-open");
//     };

//     window.onclick = function(event) {
//         if (event.target == modal) {
//             modal.style.display = "none";
//             modalContent.classList.remove("modal-open");
//         }
//     };
// });

// document.addEventListener("DOMContentLoaded", function() {
//     var modal = document.getElementById("myModal");
//     var modalContent = document.querySelector(".modal-content");
//     var span = document.getElementsByClassName("close")[0];

//     document.querySelectorAll('.info p').forEach(item => {
//         item.onclick = function() {
//             document.getElementById('modal-text').textContent = this.textContent;
//             modal.style.display = "block";
//             modalContent.classList.add("modal-open");
//         }
//     });

//     span.onclick = function() {
//         modal.style.display = "none";
//         modalContent.classList.remove("modal-open");
//     };

//     window.onclick = function(event) {
//         if (event.target == modal) {
//             modal.style.display = "none";
//             modalContent.classList.remove("modal-open");
//         }
//     };
// });


document.addEventListener("DOMContentLoaded", function() {
    var triggers = document.querySelectorAll('.section11_info p');
    var modals = document.querySelectorAll('.section11_modal');
    var spans = document.querySelectorAll('.section11_close');

    triggers.forEach((trigger, index) => {
        trigger.onclick = function() {
            modals[index].style.display = "block";
        };
    });

    spans.forEach(span => {
        span.onclick = function() {
            this.parentElement.parentElement.style.display = "none";
        };
    });

    window.onclick = function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    };
});



