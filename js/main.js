function init(){
    var btnZoomIn = document.querySelector('#zoomIn');
    var btnZoomOut = document.querySelector('#zoomOut');
    var btnPlay = document.querySelector("#play");
    var btnPause = document.querySelector('#pause');
    var btnRewind = document.querySelector('#rewind');
    var btnLeft = document.querySelector('#left');
    var btnRight = document.querySelector('#right');
    var btnUp = document.querySelector('#up');
    var btnDown = document.querySelector('#down');
    var vid = document.querySelector('#vid');
    var slide = document.querySelector('#slide');
    var zoom = 1;

    vid.style.left = 0;
    vid.style.top = 0;

    btnPlay.addEventListener('click', function(){
        vid.play();
    });

    btnPause.addEventListener('click', function(){
        vid.pause();
    });

    btnRewind.addEventListener('click', function(){
        vid.currentTime = 0;
    });

    btnZoomIn.addEventListener('click', function(){
        zoom = zoom + 0.2;
        vid.style['transform'] = 'scale('+zoom+')';
        console.log('Zoom: ' + zoom);
    });
    btnZoomOut.addEventListener('click', function(){
        zoom = zoom - 0.2;
        vid.style['transform'] = 'scale('+zoom+')';
        console.log('Zoom: ' + zoom);
    });
    btnUp.addEventListener('click', function(){
        vid.style.top = (parseInt(vid.style.top,10) + 5) + 'px';
        console.log(vid.style.top);
    });

    btnDown.addEventListener('click', function(){
        vid.style.top = (parseInt(vid.style.top,10) - 5) + 'px';
        console.log(vid.style.top);
    });

    btnLeft.addEventListener('click', function(){
        vid.style.left = (parseInt(vid.style.left,10) + 5) + 'px';
        console.log(vid.style.left);
    });

    btnRight.addEventListener('click', function(){
        vid.style.left = (parseInt(vid.style.left,10) - 5) + 'px';
        console.log(vid.style.left);
    });
    slide.addEventListener('input', function(){
        vid.currentTime = vid.duration * (slide.value / 100);
    });
    vid.addEventListener('timeupdate', function(){
        slide.value = ((vid.currentTime) / vid.duration) * 100;
    });
}
