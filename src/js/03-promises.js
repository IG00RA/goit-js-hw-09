import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PromiseGenerator from './promis-generator';
const promiseGenerator = new PromiseGenerator();
const refs = {
    button: document.querySelector('button[type="submit"]'),
    form: document.querySelector('.form'),
    delay: document.querySelector('input[name="delay"]'),
    step: document.querySelector('input[name="step"]'),
    amount: document.querySelector('input[name="amount"]'),
};
let position = 0;
const onFormSubmit = event => {
    event.preventDefault();
    let amount = refs.amount.value;
    const step = Number(refs.step.value);
    let delay = Number(refs.delay.value);
    while (amount > 0) {
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
    refs.button.disabled = true;
    refs.form.reset();
    setTimeout(() => {
        refs.button.disabled = false;
    }, 2000);
};
refs.form.addEventListener('submit', onFormSubmit);
