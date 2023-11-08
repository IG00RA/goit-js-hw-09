export default class PromiseGenerator {
    constructor() { }
    createPromise(position, delay) {
        return new Promise((resolve, reject) => {
            const shouldResolve = Math.random() > 0.3;
            setTimeout(() => {
                if (shouldResolve) {
                    resolve({ position, delay });
                }
                else {
                    reject({ position, delay });
                }
            }, delay);
        });
    }
}
