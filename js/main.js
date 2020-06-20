$(function () {
    $("#accordion").accordion({ animate: 1200, heightStyle: "content" });
    $('.blauweKnop').hide();

    $(".rozeKnop, .blauweKnop").click(function (event) {
        event.preventDefault();
        $("html, body").toggleClass("dark");
        $("nav, .CTA, .hok, .support").toggleClass("blueMode");
        $("h1, h2, h3, h4, p").toggleClass("whiteMode");
        $(".kop, footer").toggleClass("faderBlue");
        $('.rozeKnop, .blauweKnop').toggle()
    })


    'use strict';
    // Vars
    var width = 720,
        slidingTime = 1000,
        showTime = 6000,
        slideNum = 1,
        slideClick = 300,
        slides = $('.slides'),
        slide = slides.find('.slide'),
        left = $('.left'),
        right = $('.right'),
        bullet = $('.bullets .bullet'),
        sliding;

    // Sliding Function
    function slideMe() {
        right.fadeOut();
        left.fadeOut();
        slides.animate({ 'margin-left': '-=' + width }, slidingTime, function () {
            right.fadeIn();
            left.fadeIn();
            slideNum++;
            bullet.removeClass('active');
            $('#bullet' + (slideNum)).addClass('active');
            if (slideNum === slide.length) {
                slideNum = 1;
                $('#bullet' + (slideNum)).addClass('active');
                slides.css('margin-left', 0);
            }
        });
    }

    // Right Navigator
    right.on("click", function () {
        right.fadeOut(100);
        left.fadeOut(100);
        slides.animate({ 'margin-left': '-=' + width }, slideClick, function () {
            right.fadeIn();
            left.fadeIn();
            slideNum++;
            bullet.removeClass('active');
            $('#bullet' + (slideNum)).addClass('active');
            if (slideNum === slide.length) {
                slideNum = 1;
                $('#bullet' + (slideNum)).addClass('active');
                slides.css('margin-left', 0);
            }
        });
    });
    // Left Navigator
    left.on("click", function () {
        right.fadeOut(100);
        left.fadeOut(100);
        slides.animate({ 'margin-left': '+=' + width }, slideClick, function () {
            right.fadeIn();
            left.fadeIn();
            slideNum--;
            bullet.removeClass('active');
            $('#bullet' + (slideNum)).addClass('active');
            if (slideNum === 0) {
                slideNum = (slide.length - 1);
                slides.css('margin-left', "-" + (width * (slide.length - 2)) + "px");
            }
        });
    });

    // Firing up Sliding
    function letMeSlide() {
        sliding = setInterval(function () {
            slideMe();
        }, showTime);
    }

    function stopMe() { clearInterval(sliding); }

    slides.on('mouseenter', stopMe).on('mouseleave', letMeSlide);

    bullet.on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        slideNum = $(this).data('slide');
        if ($(this).hasClass('active')) {
            slides.animate({ 'margin-left': (bullet.length - $(this).data('image')) * width }, slideClick);
        }
    });

    letMeSlide();


});





videojs.getPlayer("myPlayerID").ready(function () {
    var myPlayer = this,
        jumpAmount = 5,
        controlBar,
        insertBeforeNode,
        newElementBB = document.createElement("div"),
        newElementFB = document.createElement("div"),
        newImageBB = document.createElement("img"),
        newImageFB = document.createElement("img");

    newElementBB.id = "backButton";
    newElementFB.id = "forwardButton";

    newImageBB.setAttribute(
        "src",
        "//learning-services-media.brightcove.com/doc-assets/player-development/samples/back-forward-buttons/back-button.png"
    );
    newElementBB.appendChild(newImageBB);
    newImageFB.setAttribute(
        "src",
        "//learning-services-media.brightcove.com/doc-assets/player-development/samples/back-forward-buttons/forward-button.png"
    );
    newElementFB.appendChild(newImageFB);

    controlBar = myPlayer.$(".vjs-control-bar");
    insertBeforeNode = myPlayer.$(".vjs-volume-panel");

    controlBar.insertBefore(newElementBB, insertBeforeNode);
    controlBar.insertBefore(newElementFB, insertBeforeNode);

    newElementBB.addEventListener("click", function () {
        var newTime,
            rewindAmt = jumpAmount,
            videoTime = myPlayer.currentTime();
        if (videoTime >= rewindAmt) {
            newTime = videoTime - rewindAmt;
        } else {
            newTime = 0;
        }
        myPlayer.currentTime(newTime);
    });

    newElementFB.addEventListener("click", function () {
        var newTime,
            forwardAmt = jumpAmount,
            videoTime = myPlayer.currentTime(),
            videoDuration = myPlayer.duration();
        if (videoTime + forwardAmt <= videoDuration) {
            newTime = videoTime + forwardAmt;
        } else {
            newTime = videoDuration;
        }
        myPlayer.currentTime(newTime);
    });
});

//     document.getElementById('myPlayerID').addEventListener('ended', myHandler, false);
//     function myHandler(e) {
//         alert("The audio has ended");

//     }
// });
