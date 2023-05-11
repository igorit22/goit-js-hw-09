import Notiflix from 'notiflix';

// Функція createPromise з поверненням промісу
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// Відправка форми
document.getElementById("promise-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const delay = Number(event.target.elements.delay.value);
  if (Number.isNaN(delay)) {
    notiflix.Notify.failure('Invalid delay value!');
    return;
  }

  const step = Number(event.target.elements.step.value);
  if (Number.isNaN(step)) {
    notiflix.Notify.failure('Invalid step value!');
    return;
  }

  const amount = Number(event.target.elements.amount.value);
  if (Number.isNaN(amount)) {
    notiflix.Notify.failure('Invalid amount value!');
    return;
  }

  // Створення масиву промісів
  const promises = [];
  for (let i = 1; i <= amount; i++) {
    const position = i;
    const promiseDelay = delay + (i - 1) * step;
    const promise = createPromise(position, promiseDelay);

    promises.push(promise);
  }

  // Відображення повідомлень користувачеві
  Promise.allSettled(promises).then((results) => {
    results.forEach((result) => {
      const { position, delay } = result.value || result.reason;
      if (result.status === "fulfilled") {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      } else {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      }
    });
  });
});
