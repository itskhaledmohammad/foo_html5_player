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
    var vol = document.querySelector('#vol');
    var currVol = document.querySelector('#currVol');
    var durationTime = document.querySelector('#duration');
    var currTime = document.querySelector('#currTime');
    var next = document.querySelector('#next');
    var prev = document.querySelector('#prev');
    var zoom = 1;
    var playlist = ["https://vt.media.tumblr.com/tumblr_os685vybSY1vt68ub_480.mp4",
                "https://vt.media.tumblr.com/tumblr_os96woC8tI1tk7ffb_480.mp4"];
    var currentItem = 0;
    vid.style.left = 0;
    vid.style.top = 0;
    vid.src = playlist[1];
    vid.volume = 0;
    vid.addEventListener('loadeddata', function(){
        durationTime.innerText = "Time: " + parseInt((vid.duration) / 60) + " : " + parseInt((vid.duration) - (60 * parseInt((vid.duration) / 60)));
    });
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
        currTime.innerText = "Current Time: " + parseInt((vid.currentTime) / 60) + " : " + parseInt((vid.currentTime) - (60 * parseInt((vid.currentTime) / 60)));
        slide.value = ((vid.currentTime) / vid.duration) * 100;
    });

    vol.addEventListener('input', function(){
        vid.volume = vol.value / 100;
        currVol.innerText = "Current Volume: " + parseInt(vid.volume * 100);
    });
    next.addEventListener('click', function(){
        currentItem++;
        vid.src = playlist[currentItem % playlist.length];
    });
    prev.addEventListener('click', function(){
        currentItem--;
        vid.src = playlist[currentItem % playlist.length];
    });

}
