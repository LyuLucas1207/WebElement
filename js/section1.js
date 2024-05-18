$(document).ready(function() {
    //The following code is for the navigation bar
    /*
    First $("#section1_nav  a") is the id of the navigation bar
    Then .on("click", function() is the function that will be executed when the user clicks on the navigation bar
    Then let position = $(this).parent().position(); is the position of the navigation bar
    Then let width = $(this).parent().width(); is the width of the navigation bar
    Then $("#section1_nav .section1_slide1").css({ is the css of the navigation bar
    Then opacity: 1, is the opacity of the navigation bar
    Then left: +position.left, is the left position of the navigation bar
    Then width: width is the width of the navigation bar

    In addition, addClass("section1_squeeze"); is the class that will be added to the navigation bar
    removeClass("section1_squeeze"); is the class that will be removed from the navigation bar
    */
    setTimeout(function() {
        $('#section1_header').addClass('animated');
    },0); // 页面加载500毫秒后开始动画



    $("#section1_nav  a").on("click", function() {
        let position = $(this).parent().position();
        let width = $(this).parent().width();
        $("#section1_nav .section1_slide1").css({
            opacity: 1,
            left: +position.left,
            width: width
        });
    });
    $("#section1_nav a").on("mouseover", function() {
        let position = $(this).parent().position();
        let width = $(this).parent().width();
        $("#section1_nav .section1_slide2").css({
            opacity: 1,
            left: +position.left,
            width: width
        }).addClass("section1_squeeze");
    }); 
    $("#section1_nav a").on("mouseout", function() {
        $("#section1_nav .section1_slide2").css({
            opacity: 0
        }).removeClass("section1_squeeze");
    });
    /*
    First let currentWidth = $("#section1_nav li:nth-of-type(3) a").parent("li").width(); 
    li:nth-of-type(3) a is the third element of the navigation bar
    left: +current.left, means that the left position of the navigation bar is the same as the third element of the navigation bar
    width: currentWidth is the width of the navigation bar

    */

    let currentWidth = $("#section1_nav li:nth-of-type(3) a").parent("li").width();
    let current = $("li:nth-of-type(3) a").position();
    $("#section1_nav .section1_slide1").css({
        left: +current.left,
        width: currentWidth
    });
});