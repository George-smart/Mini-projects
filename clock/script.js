const secondsHand = document.querySelector('[data-seconds-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const hourHand = document.querySelector('[data-hour-hand]')

function timer(){
    const currentTime = new Date();

    const secondRatio = currentTime.getSeconds() / 60;
    const minuteRatio = (secondRatio + currentTime.getMinutes())  / 60;
    const hourRatio = (minuteRatio + currentTime.getHours()) / 12;

    displayClock(secondsHand, secondRatio)
    displayClock(minuteHand, minuteRatio)
    displayClock(hourHand, hourRatio)

}
timer()

function displayClock(element, property){
    element.style.setProperty('--rotation', property * 360)
}
setInterval(timer, 1000)