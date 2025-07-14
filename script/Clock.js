function updateDigitalClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('digital-clock').innerText = timeString;
}

function updateAnalogClock() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hourDeg = (hours * 30) + (0.5 * minutes);
    const minuteDeg = (minutes * 6) + (0.1 * seconds);
    const secondDeg = seconds * 6;

    document.getElementById('hour-hand').style.transform = `rotate(${hourDeg}deg)`;
    document.getElementById('minute-hand').style.transform = `rotate(${minuteDeg}deg)`;
    document.getElementById('second-hand').style.transform = `rotate(${secondDeg}deg)`;
}

// Update the digital clock every second
setInterval(updateDigitalClock, 1000);

// Update the analog clock every second
setInterval(updateAnalogClock, 1000);

// Initial update
updateDigitalClock();
updateAnalogClock();