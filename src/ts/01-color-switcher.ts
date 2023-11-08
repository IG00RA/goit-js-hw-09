function getRandomHexColor(): string {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

interface Refs {
  body: HTMLElement | null;
  startBtn: HTMLButtonElement | null;
  stopBtn: HTMLButtonElement | null;
}

const refs: Refs = {
  body: document.body,
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

refs.startBtn?.addEventListener('click', onStartBtnClick);
if (refs.stopBtn) {
  refs.stopBtn.addEventListener('click', onStopBtnClick);
  refs.stopBtn.disabled = true;
}

let switcherID: number;

function onStartBtnClick(): void {
  refs.stopBtn && (refs.stopBtn.disabled = false);
  refs.startBtn && (refs.startBtn.disabled = true);
  if (refs.body?.classList.contains('cls')) return;
  refs.body?.classList.add('cls');
  switcherID = setInterval(() => {
    const backgroundColor: string = getRandomHexColor();
    refs.body && (refs.body.style.backgroundColor = backgroundColor);
  }, 1000);
}

function onStopBtnClick(): void {
  clearInterval(switcherID);
  refs.body?.classList.remove('cls');
  refs.stopBtn && (refs.stopBtn.disabled = true);
  refs.startBtn && (refs.startBtn.disabled = false);
}
