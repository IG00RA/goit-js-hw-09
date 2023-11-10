import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PromiseGenerator from './promis-generator';
const promiseGenerator = new PromiseGenerator();

interface Refs {
  button: HTMLButtonElement | null;
  form: HTMLFormElement | null;
  delay: HTMLInputElement | null;
  step: HTMLInputElement | null;
  amount: HTMLInputElement | null;
}

const refs: Refs = {
  button: document.querySelector('button[type="submit"]'),
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

let position: number = 0;

const onFormSubmit = (event: SubmitEvent): void => {
  event.preventDefault();
  let amount = Number(refs.amount?.value);
  const step = Number(refs.step?.value);
  let delay = Number(refs.delay?.value);
  while (amount && amount > 0) {
    amount -= 1;
    position++;
    promiseGenerator
      .createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
  position = 0;
  if (refs.button) {
    refs.button.disabled = true;
  }
  setTimeout(() => {
    if (refs.button) {
      refs.button.disabled = false;
    }
  }, 2000);
  refs.form?.reset();
};

refs.form?.addEventListener('submit', onFormSubmit);
