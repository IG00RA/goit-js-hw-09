!function(){var t,n={body:document.body,startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")};n.startBtn.addEventListener("click",(function(){if(n.stopBtn.disabled=!1,n.startBtn.disabled=!0,n.body.classList.contains("cls"))return;n.body.classList.add("cls"),t=setInterval((function(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16));n.body.style.backgroundColor=t}),1e3)})),n.stopBtn.addEventListener("click",(function(){clearInterval(t),n.body.classList.remove("cls"),n.stopBtn.disabled=!0,n.startBtn.disabled=!1})),n.stopBtn.disabled=!0}();
//# sourceMappingURL=01-color-switcher.6948120c.js.map