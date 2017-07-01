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
    var btnPlay = document.querySelector("#playPause");
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
    var zoomControls = document.querySelector('#zoomControls');
    var resetZoom = document.querySelector('#resetZoom');
    var zoomPanelSwitch = document.querySelector('#zoomPanelSwitch');

    // Variables
    var zoom = 1;
    var zoomRate = 0.2;
    var moveRate = 5;
    var currentItem = 0;

    // Playlist
    var playlist = ["https://vt.media.tumblr.com/tumblr_osck2jVczm1uz56c3.mp4",
                "https://vt.media.tumblr.com/tumblr_o2glssowzR1usg3as.mp4"];

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
        durationTime.innerText = getTotalTimeInHour(vid) + ":" + getTotalTimeInMin(vid) + ":" + getTotaltimeInSec(vid);
    });
    vid.addEventListener('timeupdate', function(){
        currTime.innerText = getTimePassedInHour(vid) + ":" + getTimePassedInMin(vid) + ":" + getTimePassedInSec(vid);
        slide.value = ((vid.currentTime) / vid.duration) * 100;
    });
    vid.addEventListener('ended', function(){
        if(!loopOrNot.checked){
            currentItem++;
            vid.src = playlist[currentItem % playlist.length];
            bufferpos  = 0;
        }
    });


    // Play/Pause Button.
    btnPlay.addEventListener('click', function(){
        if(vid.paused){
            document.querySelector("#playPause i").innerText = "pause_circle_filled";
            vid.play();
        }else{
            document.querySelector("#playPause i").innerText = "play_circle_filled";
            vid.pause();
        }
    });

    // Rewind to Start.
    btnRewind.addEventListener('click', function(){
        vid.currentTime = 0;
    });

    // Open or close Zoom Panel.
    zoomPanelSwitch.addEventListener('click', function(){
        var zoomControlsDisp = zoomControls.style;
        if(zoomControlsDisp.display === 'none'){
            zoomControlsDisp.display = 'flex';
        }else{
            zoomControlsDisp.display = 'none';
        }
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
        vid.style.left = (parseInt(vid.style.left,10) - moveRate) + 'px';
    });

    // Move Right.
    btnRight.addEventListener('click', function(){
        vid.style.left = (parseInt(vid.style.left,10) + moveRate) + 'px';
    });

    // Reset Zoom
    resetZoom.addEventListener('click', function(){
        vid.style.top = 0 + 'px';
        vid.style.left = 0 + 'px';
        zoom = 1;
        vid.style['transform'] = 'scale('+zoom+')';
    });

    // Seek.
    slide.addEventListener('input', function(){
        vid.currentTime = vid.duration * (slide.value / 100);
    });

    // Update the Volume.
    vol.addEventListener('input', function(){
        vid.volume = vol.value / 100;
        currVol.innerText = parseInt(vid.volume * 100) + "%";
        document.querySelector("#volShow i").innerText = (vid.volume === 0) ? "volume_off" : "volume_up";
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
