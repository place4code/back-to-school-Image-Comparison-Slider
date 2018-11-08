"use strict";

function init() {
    
    console.log("init()");
    

    let x, i;

    x = document.getElementsByClassName("comp-overlay");

    
    for(i = 0; i < x.length; i++) {
        console.log("for");
        
        compare(x[i]);
    }

    function compare(img) {
        console.log("compare()");
        
        let slider, clicked = 0, w, h;
        
        w = img.offsetWidth;
        h = img.offsetHeight;

        img.style.width =  (w / 2) + "px"; 

        slider = document.createElement("DIV");
        slider.setAttribute("class", "comp-slider");

        console.log(img.parentElement);

        img.parentElement.insertBefore(slider, img); 

        slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
        slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
        
        slider.addEventListener("mousedown", slideReady);
        window.addEventListener("mouseup", slideFinish);
        slider.addEventListener("touchstart", slideReady);
        window.addEventListener("touchstop", slideFinish);


        function slideReady(e) {
            e.preventDefault();
            console.log("start");

            clicked = 1;

            window.addEventListener("mousemove", slideMove);
            window.addEventListener("touchmove", slideMove);

        }

        function slideFinish(e) {
            e.preventDefault();
            clicked = 0;
        }

        function slideMove(e) {

            let position;

            if(clicked == 0) return false;

            position = getCursorPos(e);

            if(position < 0) position = 0;
            if(position > w) position = w;

            slide(position);
        }

        function getCursorPos(e) {

            let a, x = 0;
            e = e || window.event;

            a = img.getBoundingClientRect();
            
            x = e.pageX - a.left;
            x = x - window.pageXOffset;
            return x;
        }

        function slide(x) {
            
            img.style.width = x + "px";
            
            slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
        }


    }

    

}



init();