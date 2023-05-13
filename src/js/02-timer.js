import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const resetButton = document.querySelector('[data-reset]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let timer;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function displayTimeLeft(timeLeft) {
  const { days, hours, minutes, seconds } = convertMs(timeLeft);

  daysValue.textContent = days.toString().padStart(2, '0');
  hoursValue.textContent = hours.toString().padStart(2, '0');
  minutesValue.textContent = minutes.toString().padStart(2, '0');
  secondsValue.textContent = seconds.toString().padStart(2, '0');
}

function isDateValid(date) {
  return date instanceof Date && !isNaN(date);
}

function countDown() {
  const targetDate = new Date(datePicker.value).getTime();

  if (isNaN(targetDate)) {
    Notiflix.Notify.failure('Invalid date');
    return;
  }

  let timeLeft = targetDate - Date.now();

  if (timeLeft < 0) {
    timeLeft = 0;
  }

  displayTimeLeft(timeLeft);

  if (timeLeft === 0) {
    clearInterval(timer);
    stopCountDown();
  }
}

function stopCountDown() {
  clearInterval(timer);
  Notiflix.Notify.warning('The timer has finished counting down.');
  localStorage.setItem('startButtonDisabled', 'true');
  datePicker.removeAttribute('disabled');
}

if (localStorage.getItem('startButtonDisabled')) {
  startButton.setAttribute('disabled', true);
  startButton.style.opacity = '0.5';
}

startButton.addEventListener('click', () => {
  const selectedDate = new Date(datePicker.value);

  if (selectedDate <= new Date()) {
    Notiflix.Notify.failure('Please choose a date in the future.');
    return;
  }

  countDown();
  timer = setInterval(countDown, 1000);
  startButton.setAttribute('disabled', true);
  startButton.style.opacity = '0.5';
  Notiflix.Notify.success('Congratulations! Your timer has started.');
  datePicker.setAttribute('disabled', true);

  setTimeout(() => {
    stopCountDown();
    startButton.setAttribute('disabled', true);
    startButton.style.opacity = '0.5';
  }, selectedDate - Date.now());
});

flatpickr(datePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const flatpickrObj = datePicker._flatpickr;
  
    if (isDateValid(selectedDates[0])) {
      startButton.removeAttribute('disabled');
      startButton.style.opacity = '1';
      flatpickrObj._input.blur();
    } else {
      startButton.setAttribute('disabled', true);
  startButton.style.opacity = '0.5';
  Notiflix.Notify.failure('Please choose a valid date');
}

},
});

resetButton.addEventListener('click', () => {
  location.reload();
});

