/* global location */

const e1 = document.getElementById("join");
e1.addEventListener('animationend', () => e1.remove());

const url = "./tetris/gamepanel.html";
const e2 = document.getElementById("math");
e2.onclick = () => location.href = `${url}?sbj=math`;

const e3 = document.getElementById("chemistry");
e3.onclick = () => location.href = `${url}?sbj=chemistry`;

const e4 = document.getElementById("english");
e4.onclick = () => location.href = `${url}?sbj=english`;

const e5 = document.getElementById("geography");
e5.onclick = () => location.href = `${url}?sbj=geography`;

const e6 = document.getElementById("logical_jp");
e6.onclick = () => location.href = `${url}?sbj=logical_jp`;

const e7 = document.getElementById("physics");
e7.onclick = () => location.href = `${url}?sbj=physics`;