const countdownDate = new Date("December 31, 2024 22:30:00").getTime();
let previousValues = { days: null, hours: null, minutes: null, seconds: null }; // Store previous values

const countdownFunction = () => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update each unit only if it has changed
    updateClock("days", days, previousValues.days);
    updateClock("hours", hours, previousValues.hours);
    updateClock("minutes", minutes, previousValues.minutes);
    updateClock("seconds", seconds, previousValues.seconds);

    // Update previous values
    previousValues = { days, hours, minutes, seconds };

    // If countdown is complete, show a message
    if (distance < 0) {
        clearInterval(x);
        document.querySelector(".row").innerHTML = "<h1>Countdown Finished!</h1>";
    }
};

// Update the digit and apply animation if the value has changed
const updateClock = (id, newValue, oldValue) => {
    if (newValue !== oldValue) { // Only update if value has changed
        const digitElement = document.getElementById(id);
        digitElement.classList.remove("animate");
        void digitElement.offsetWidth; // Trigger reflow to restart the animation
        digitElement.innerText = newValue; // Update the digit
        digitElement.classList.add("animate");
    }
};

// Run the countdown every second
const x = setInterval(countdownFunction, 1000);
