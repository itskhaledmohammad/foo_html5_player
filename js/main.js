// Functions.
function getTotalTimeInHour(vid){
    return parseInt((vid.duration) / 3600);
}
function getTotalTimeInMin(vid){
     return parseInt((vid.duration) / 60);
}
function getTotaltimeInSec(vid){
    return parseInt((vid.duration) - (60 * parseInt((vid.duration) / 60)));
}
function getTimePassedInHour(vid){
    return parseInt((vid.currentTime) / 3600);
}
function getTimePassedInMin(vid){
    return parseInt((vid.currentTime) / 60);
}
function getTimePassedInSec(vid){
    return parseInt((vid.currentTime) - (60 * parseInt((vid.currentTime) / 60)));
}

function init(){
    // Elements.
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
    var loadStatus = document.querySelector('#loadStatus');
    var loopOrNot = document.querySelector('#loopOrNot');
    var waitTillFull = document.querySelector('#waitTillFull');

    // Variables
    var zoom = 1;
    var zoomRate = 0.2;
    var moveRate = 5;
    var currentItem = 0;

    // Playlist
    var playlist = ["https://vt.media.tumblr.com/tumblr_os685vybSY1vt68ub_480.mp4",
                "https://vt.media.tumblr.com/tumblr_os96woC8tI1tk7ffb_480.mp4"];

    // Initial Actions.
    vid.style.left = 0;
    vid.style.top = 0;
    vid.src = playlist[0];
    vid.volume = 0;


    // Video Events.
    vid.addEventListener('progress', function(){
        loadStatus.innerText = "Load Status: " + parseInt(((vid.buffered.end(0) / vid.duration)* 100)) + "%";
    }, false);
    vid.addEventListener('loadeddata', function(){
        durationTime.innerText = "Time: " + getTotalTimeInHour(vid) + " : " + getTotalTimeInMin(vid) + " : " + getTotaltimeInSec(vid);
    });
    vid.addEventListener('timeupdate', function(){
        currTime.innerText = "Current Time: " + getTimePassedInHour(vid) + " : " + getTimePassedInMin(vid) + " : " + getTimePassedInSec(vid);
        slide.value = ((vid.currentTime) / vid.duration) * 100;
    });
    vid.addEventListener('ended', function(){
        if(!loopOrNot.checked){
            currentItem++;
            vid.src = playlist[currentItem % playlist.length];
            bufferpos  = 0;
        }
    });


    // Play Button.
    btnPlay.addEventListener('click', function(){
        vid.play();
    });

    // Pause Button.
    btnPause.addEventListener('click', function(){
        vid.pause();
    });

    // Rewind to Start.
    btnRewind.addEventListener('click', function(){
        vid.currentTime = 0;
    });

    // Zoom In.
    btnZoomIn.addEventListener('click', function(){
        zoom = zoom + zoomRate;
        vid.style['transform'] = 'scale('+zoom+')';
    });

    // Zoom out.
    btnZoomOut.addEventListener('click', function(){
        zoom = zoom - zoomRate;
        vid.style['transform'] = 'scale('+zoom+')';
    });

    // Move Up.
    btnUp.addEventListener('click', function(){
        vid.style.top = (parseInt(vid.style.top,10) + moveRate) + 'px';
    });

    // Move Down.
    btnDown.addEventListener('click', function(){
        vid.style.top = (parseInt(vid.style.top,10) - moveRate) + 'px';
    });

    // Move Left.
    btnLeft.addEventListener('click', function(){
        vid.style.left = (parseInt(vid.style.left,10) + moveRate) + 'px';
    });

    // Move Right.
    btnRight.addEventListener('click', function(){
        vid.style.left = (parseInt(vid.style.left,10) - moveRate) + 'px';
    });

    // Seek.
    slide.addEventListener('input', function(){
        vid.currentTime = vid.duration * (slide.value / 100);
    });

    // Update the Current Time.
    vol.addEventListener('input', function(){
        vid.volume = vol.value / 100;
        currVol.innerText = "Current Volume: " + parseInt(vid.volume * 100);
    });

    // Next Video.
    next.addEventListener('click', function(){
        currentItem++;
        console.log(currentItem);
        vid.src = playlist[currentItem % playlist.length];
    });

    // Previous Video.
    prev.addEventListener('click', function(){
        currentItem--;
        vid.src = playlist[currentItem % playlist.length];
    });

    // Check box(Loop or Not Loop).
    loopOrNot.addEventListener('click', function(){
        vid.loop = (loopOrNot.checked == true) ? true : false;
    }, false);
}
