// Constructing Video Players:
let sportsType = "Yoga";
let videoID = "tbz14K0lOZs";

async function getVideo(sportsType) {
    const res = await fetch(`/youtubevideo/${sportsType}`)
    result = await res.json();
    videoNew = result[0].video_link;
}

let sports = document.querySelectorAll('.selectVideo');
for (let sport of sports) {
    sport.addEventListener('click', async (event) => {
        //console.log(event.target)
        sportsType = event.currentTarget.textContent;

        await getVideo(sportsType)
        // console.log(videoID);
        videoID = videoNew
        player.cueVideoById(videoID)
        clearInterval(int);
        [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
        millisecondsCounter = 0;
        timerRef.innerHTML = '00 : 00 : 00 : 000 ';
        stopVideo();
    })
}


// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: "100%",
        width: "100%",
        videoId: videoID,
        playerVars: {
            'playsinline': 1
        },
        events: {
            // 'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }

    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    // if (event.data == YT.PlayerState.PLAYING && !done) {
    //     setTimeout(stopVideo, 6000);
    //     done = true;
    // }
}
function stopVideo() {
    player.stopVideo();
}

function playVideo() {
    player.playVideo();
}
function pauseVideo() {
    player.pauseVideo();
}

// Stop Watch:

let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let millisecondsCounter = 0;
let timerRef = document.querySelector('.timerDisplay');
let int = null;

let totalTime = 0;

document.querySelector('#startTimer').addEventListener('click', () => {
    if (int !== null) {
        clearInterval(int);
    }
    int = setInterval(displayTimer, 10);
    playVideo();
});

document.querySelector('#pauseTimer').addEventListener('click', () => {
    clearInterval(int);
    pauseVideo();
});

document.querySelector('#resetTimer').addEventListener('click', () => {
    clearInterval(int);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    millisecondsCounter = 0;
    timerRef.innerHTML = '00 : 00 : 00 : 000 ';
    stopVideo();
});

document.querySelector('#submitTimer').addEventListener('click', () => {
    clearInterval(int);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    millisecondsCounter = 0;
    timerRef.innerHTML = '00 : 00 : 00 : 000 ';
    // console.log(totalTime,sportsType);
    returnTime(totalTime, sportsType);
    stopVideo();
    totalTime = 0;
})


async function returnTime(totalTime, sportsType) {
    try {

        if (totalTime == 0) {
            new swal({
                icon: 'error',
                title: 'Sports Log Not Recorded',
                html: '<span class="error-swal">Any log under 1 minute will not be recorded.</span><br><br>You should work harder!'
            })
        } else {
            const res = await fetch(`/autorecordtime/${totalTime}/autorecordtype/${sportsType}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const result = await res.json();

            if (result.success) {
                new swal({
                    icon: 'success',
                    title: 'Sports Log Recorded',
                    html: `You worked hard on <span class="success-swal">${sportsType}</span> for <span class="success-swal">${totalTime}</span> minutes.`
                })
                setTimeout(function replace() { window.location.replace("/profile.html") }, 2000) // Redirect to profile page after recording successfully
            } else {
                new swal({
                    icon: 'error',
                    title: 'Sports Log Not Recorded.',
                    text: result.error
                })
            }

        }
    } catch (error) {
        console.log(error);
    }

    // 1。要諗點彈出個box
    // 2。fetch返個value
}

function displayTimer() {
    milliseconds += 10;
    millisecondsCounter += 10;
    if (milliseconds == 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
            if (minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
    }

    // Time on Stop Watch:
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

    timerRef.innerHTML = ` ${h} : ${m} : ${s} : ${ms}`;

    // Total Time in Minutes:
    totalTime = Math.floor((millisecondsCounter) / 1000 / 60);
    // console.log(totalTime)
}