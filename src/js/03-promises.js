var _a;
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
const onFormSubmit = (event) => {
    var _a, _b, _c, _d;
    event.preventDefault();
    let amount = Number((_a = refs.amount) === null || _a === void 0 ? void 0 : _a.value);
    const step = Number((_b = refs.step) === null || _b === void 0 ? void 0 : _b.value);
    let delay = Number((_c = refs.delay) === null || _c === void 0 ? void 0 : _c.value);
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
    (_d = refs.form) === null || _d === void 0 ? void 0 : _d.reset();
};
(_a = refs.form) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', onFormSubmit);
