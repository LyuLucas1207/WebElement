$(document).ready(function() {
    let items = document.getElementsByClassName('section3_item');
    for(let i = 0; i < items.length; i++){
        let item = items[i];
        let frame = item.getElementsByClassName('section3_frame')[0];
        let frontBox = frame.getElementsByClassName('section3_front')[0];
        let leftBox = frame.getElementsByClassName('section3_left')[0];
        let rightBox = frame.getElementsByClassName('section3_right')[0];
 
 
        frontBox.style.backgroundImage = 'url(img/index_section2/'+(i+1).toString().padStart(2,'0')+'.jpg)';
        leftBox.style.backgroundImage = 'url(img/index_section2/'+(i+1).toString().padStart(2,'0')+'.jpg)';
        rightBox.style.backgroundImage = 'url(img/index_section2/'+(i+1).toString().padStart(2,'0')+'.jpg)';
        }
    (function(){
        "use strict";
        let shell = document.getElementsByClassName('section3_shell')[0];
        let slider = shell.getElementsByClassName('section3_shellslider')[0];
        let items = shell.getElementsByClassName('section3_item');
        let prevBtn = shell.getElementsByClassName('section3_prev')[0];
        let nextBtn = shell.getElementsByClassName('section3_next')[0];
 
        let width, height, totalWidth, margin = 20,
            currentIndex = 0,
            interval, intervalTime = 5000;
        function init(){
            resize();
            move(Math.floor(items.length / 2));
            bindEvent();
            timer();
        }
        function resize(){
            //窗口大小变化
            width = Math.max(window.innerWidth * 0.2, 275);
            height = window.innerHeight* 0.50;
            totalWidth = width * items.length;
            //设置slider的宽
            slider.style.width = totalWidth + 'px';
            //设置item的宽
            for(let i = 0; i < items.length; i++){
                let item = items[i];
                item.style.width = (width -(margin * 2)) + 'px';
                item.style.height = height + 'px';
            }
        }
        function bindEvent(){
            window.onresize = resize;
            prevBtn.addEventListener('click', () => {
                prev();
            });
            nextBtn.addEventListener('click', () => {
                next();
            });
        }
 
        init();
        function move(index){
            if(index < 1){
                index = items.length;
            }
            if(index > items.length){
                index = 1;
            }
            currentIndex = index;
            for(let i = 0; i < items.length; i++){
                let item = items[i],box = item.getElementsByClassName('section3_frame')[0];
                if(i == (index - 1)){
                    item.classList.add('section3_item--active');
                    box.style.transform = "perspective(1200px)";
                }else{
                    item.classList.remove('section3_item--active');
                    box.style.transform = "perspective(1200px) rotateY(" + (i<(index -1) ? 40 : -40) + "deg)";
                }
            }
            slider.style.transform = "translate3d(" + ((index * -width) + (width * 0.5) + window.innerWidth/2) + "px,0,0)";
            let frontBox = items[index - 1].getElementsByClassName('section3_front')[0];
           //  document.body.style.backgroundImage = frontBox.style.backgroundImage;
           shell.style.backgroundImage = frontBox.style.backgroundImage;
        }
        function timer(){
            clearInterval(interval);
            interval = setInterval(() => {
                move(currentIndex + 1);
            }, intervalTime);
        }
 
        function prev(){
            move(currentIndex - 1);
            timer();
        }
        function next(){
            move(currentIndex + 1);
            timer();
        }
 
    })();   
});