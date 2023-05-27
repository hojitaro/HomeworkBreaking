/* global location */

const e1 = document.getElementById("join");
e1.addEventListener('animationend', () => e1.remove());

const e2 = document.getElementById("math");
e2.onclick = () => location.href = "./tetris/math/gamepanel.html";

const e3 = document.getElementById("chemistry");
e3.onclick = () => location.href = "./tetris/chemistry/gamepanel.html";

const e4 = document.getElementById("english");
e4.onclick = () => location.href = "./tetris/english/gamepanel.html";

const e5 = document.getElementById("geography");
e5.onclick = () => location.href = "./tetris/geography/gamepanel.html";

const e6 = document.getElementById("logical_jp");
e6.onclick = () => location.href = "./tetris/logical_jp/gamepanel.html";

const e7 = document.getElementById("physics");
e7.onclick = () => location.href = "./tetris/physics/gamepanel.html";