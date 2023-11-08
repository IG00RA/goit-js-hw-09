import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

interface Refs {
  button: HTMLButtonElement | null;
  days: HTMLSpanElement | null;
  hours: HTMLSpanElement | null;
  minutes: HTMLSpanElement | null;
  seconds: HTMLSpanElement | null;
  timerWrap: HTMLDivElement | null;
  fieldWrap: NodeListOf<HTMLDivElement> | null;
  body: HTMLBodyElement | null;
}

interface Options {
  enableTime: boolean;
  time_24hr: boolean;
  defaultDate: Date;
  minuteIncrement: number;
  onClose(selectedDates: Date): void;
}

const refs: Refs = {
  button: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  timerWrap: document.querySelector('.timer'),
  fieldWrap: document.querySelectorAll('.field'),
  body: document.querySelector('body'),
};

function wrapStyle(): void {
  refs.body && (refs.body.style.backgroundColor = 'black');
  refs.timerWrap &&
    (refs.timerWrap.style.cssText =
      'position: absolute;top: 50%; left: 50%;transform: translateX(-50%) translateY(-50%);color: #17D4FE;font-size: 50px;letter-spacing: 1px;display: flex; gap: 30px;');
  if (refs.fieldWrap) {
    for (let i = 0; i < refs.fieldWrap.length; i++) {
      refs.fieldWrap[i].style.cssText =
        'display: flex;flex-direction : column;gap:10px; text-align: center;    font-family: fantasy;text-transform: uppercase;';
    }
  }
}
wrapStyle();

refs.button && (refs.button.disabled = true);

let userDate = 0;
let datenow = 0;
let timerId: number;

const options: Options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    datenow = Date.now();
    userDate = selectedDates[0].getTime();
    if (datenow > userDate) {
      Notify.failure('Please choose a date in the future', {
        position: 'center-top',
      });
    } else {
      refs.button && (refs.button.disabled = false);
    }
  },
};

const datetimePicker: HTMLInputElement | null =
  document.querySelector('#datetime-picker');
if (datetimePicker) {
  flatpickr(datetimePicker as Node, options);
}
refs.button?.addEventListener('click', onButtonClick);

function onButtonClick() {
  clearInterval(timerId);
  refs.button && (refs.button.disabled = true);
  let timeToEnd = userDate - datenow;
  function start() {
    const finalTime = convertMs(timeToEnd);
    refs.seconds && (refs.seconds.textContent = finalTime.seconds);
    refs.minutes && (refs.minutes.textContent = finalTime.minutes);
    refs.hours && (refs.hours.textContent = finalTime.hours);
    refs.days && (refs.days.textContent = finalTime.days);
    timeToEnd -= 1000;
    if (timeToEnd < 0) {
      clearInterval(timerId);
    }
  }
  timerId = setInterval(start, 1000);
  Notify.success('Well done - starting the timer', {
    position: 'center-top',
  });
}

function pad(params) {
  return String(params).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
