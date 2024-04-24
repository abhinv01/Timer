const timerDisplay = document.querySelector(".display__time-left")
const endTimerDisplay = document.querySelector(".display__end-time")
const buttons = document.querySelectorAll(".buttons")
const inputMin = document.querySelector(".text-inp")
const inputBtn = document.querySelector(".input-button")
const playPause = document.querySelector(".play-pause")
let countDown;
let time;
let secondsLeft;

function timer(seconds){
    // console.log(seconds);
    let time = Date.now()
    // seconds converted to miliseconds
    let then = time + (seconds * 1000)
    let thenTime = new Date(then)
    displayTimeLeft(seconds);
    playPause.style.display= "inline-block"
    playPause.textContent = "⏸"
    endTimerDisplay.textContent =   "Ending countdown at : "+thenTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

    // console.log(new Date(then))
    clearInterval(countDown)
    countDown = setInterval(() => {
        secondsLeft = Math.round((then - Date.now())/1000)
        if(secondsLeft < 1) {   
            clearInterval(countDown)
            timerDisplay.textContent = `00:00:00`
            playPause.textContent = ""
            playPause.style.display= "none"
            endTimerDisplay.textContent = "Ending countdown at : 00:00:00"
            return;     
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds){
    let hrs = minimumTwoDigits(Math.floor(seconds/3600))
    let min = minimumTwoDigits(Math.floor((seconds % 3600) / 60));
    let sec = minimumTwoDigits(seconds%60);
    // console.log(`${hrs}:${min}:${sec}`);

    timerDisplay.textContent = `${hrs}:${min}:${sec}`
}

function minimumTwoDigits(val) {
    return val.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
}

function startTimer(e) {
    let time = parseInt(this.dataset.time)
    timer(time)
}

function startCustomTimer(e){
    time = parseInt(this.value * 60)
    if(this.value) inputBtn.style.display = 'block';
    else inputBtn.style.display = 'none';
}

function goCustomTimer(e) {
    timer(time)
    inputBtn.style.display = 'none';
    inputMin.value = ""
}

function stopClock(){
    console.log(countDown);
    if(countDown){
        clearInterval(countDown)
        countDown = undefined;
        this.textContent = "▶"
    }
    else if(countDown === undefined){
        if(secondsLeft > 0){
            timer(secondsLeft)
            this.textContent = "⏸" 

        }
    }
}

buttons.forEach(btn => {
    btn.addEventListener("click",startTimer)
})
playPause.addEventListener("click",stopClock)
inputMin.addEventListener("input",startCustomTimer)
inputBtn.addEventListener("click",goCustomTimer)

