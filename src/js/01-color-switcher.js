var _a;
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const refs = {
    body: document.body,
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
};
(_a = refs.startBtn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', onStartBtnClick);
if (refs.stopBtn) {
    refs.stopBtn.addEventListener('click', onStopBtnClick);
    refs.stopBtn.disabled = true;
}
let switcherID;
function onStartBtnClick() {
    var _a, _b;
    refs.stopBtn && (refs.stopBtn.disabled = false);
    refs.startBtn && (refs.startBtn.disabled = true);
    if ((_a = refs.body) === null || _a === void 0 ? void 0 : _a.classList.contains('cls'))
        return;
    (_b = refs.body) === null || _b === void 0 ? void 0 : _b.classList.add('cls');
    switcherID = setInterval(() => {
        const backgroundColor = getRandomHexColor();
        refs.body && (refs.body.style.backgroundColor = backgroundColor);
    }, 1000);
}
function onStopBtnClick() {
    var _a;
    clearInterval(switcherID);
    (_a = refs.body) === null || _a === void 0 ? void 0 : _a.classList.remove('cls');
    refs.stopBtn && (refs.stopBtn.disabled = true);
    refs.startBtn && (refs.startBtn.disabled = false);
}
