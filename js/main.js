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
function calibrate(vid){
    document.querySelector("#playPause i").innerText = (vid.autoplay) ?  "pause_circle_filled" : "play_circle_filled";
    document.querySelector('#loopOrNot i').style.color = (vid.loop == true) ? "#8A4F7D" : "white";
    document.querySelector("#volShow i").innerText = (vid.volume === 0) ? "volume_off" : "volume_up";
    vol.value = vid.volume * 100;
    currVol.innerText = parseInt(vid.volume * 100) + "%";
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
    var volShow = document.querySelector('#volShow');
    var zoomControlsDisp = zoomControls.style;

    // Variables
    var zoom = 1;
    var zoomRate = 0.2;
    var moveRate = 5;
    var currentItem = 0;
    var lastVol = 1;
    zoomControlsDisp.display = 'none';

    // Playlist
    var playlist = ["https://vt.media.tumblr.com/tumblr_osck2jVczm1uz56c3.mp4",
                "https://vt.media.tumblr.com/tumblr_o2glssowzR1usg3as.mp4"];

    // Initial Actions.
    vid.style.left = 0;
    vid.style.top = 0;
    vid.src = playlist[0];
    vid.volume = 1;
    lastVol = (vid.volume === 1) ? 0 : 1;
    calibrate(vid);

    // Video Events.
    vid.addEventListener('progress', function(){
        loadStatus.innerText = "Load Status: " + parseInt(((vid.buffered.end(0) / vid.duration)* 100)) + "%";
    }, false);
    vid.addEventListener('loadeddata', function(){
        durationTime.innerText = getTotalTimeInHour(vid) + ":" + getTotalTimeInMin(vid) + ":" + getTotaltimeInSec(vid);
    });
    vid.addEventListener('timeupdate', function(){
        currTime.innerText = getTimePassedInHour(vid) + ":" + getTimePassedInMin(vid) + ":" + getTimePassedInSec(vid);
        slide.value = (vid.currentTime === 0) ? 0 : ((vid.currentTime) / vid.duration) * 100;
    });
    vid.addEventListener('ended', function(){
        if(!loopOrNot.checked){
            currentItem++;
            vid.src = playlist[currentItem % playlist.length];
            calibrate(vid);
        }
    });


    // Play/Pause Button.
    btnPlay.addEventListener('click', function(){
        document.querySelector("#playPause i").innerText = (vid.paused) ?  "pause_circle_filled" : "play_circle_filled";
        (vid.paused) ? vid.play() : vid.pause();
    });

    // Rewind to Start.
    btnRewind.addEventListener('click', function(){
        vid.currentTime = 0;
    });

    // Open or close Zoom Panel.
    zoomPanelSwitch.addEventListener('click', function(){
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
        vid.src = playlist[currentItem % playlist.length];
        calibrate(vid);
    });

    // Previous Video.
    prev.addEventListener('click', function(){
        currentItem--;
        vid.src = playlist[currentItem % playlist.length];
        calibrate(vid);
    });

    // Mute On/Off.
    volShow.addEventListener('click', function(){
        if(vid.volume != 0){
            lastVol = vid.volume;
            vid.volume = 0;
            vol.value = 0;
        }else{
            vid.volume = lastVol;
            vol.value = lastVol * 100;
        }
        currVol.innerText = parseInt(vid.volume * 100) + "%";
        document.querySelector("#volShow i").innerText = (vid.volume === 0) ? "volume_off" : "volume_up";
    });

    // Loop or Not Loop
    loopOrNot.addEventListener('click', function(){
        vid.loop = (vid.loop == true) ? false : true;
        document.querySelector('#loopOrNot i').style.color = (vid.loop == true) ? "#8A4F7D" : "white";
    }, false);

}
