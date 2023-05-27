/* global Image */
window.onload = () => {
 const canvas = document.getElementById("moneytris");
 const timer = document.getElementById("timer");
 const ctx = canvas.getContext("2d");
 const fps = 60.0;
 const speed = 1;
 const tileSize = 15;
 const lineSize = parseInt(canvas.width / tileSize);
 const columnSize = parseInt(canvas.height / tileSize);
 let currentTile = [];
 let tileArray = new Array(lineSize * columnSize).fill(0);
 currentTile.push([0, 0, canvas.height]);

 const tileType = [
   [
    1, 1, 1, 1,
    0, 0, 0, 0
   ],
   [
    1, 1, 0, 0,
    1, 1, 0, 0
   ],
   [
    1, 1, 1, 0,
    1, 0, 0, 0
   ],
   [
    1, 1, 1, 1,
    0, 0, 0, 1
   ],
   [
    1, 1, 1, 0,
    0, 1, 0, 0
   ]
  ];

 function getSurface(x) {
  for (let i = 0;i < columnSize;i++) {
   let idx = lineSize * (columnSize - i - 1) + parseInt(x / tileSize);
   if (tileArray[idx] == 1) {
    return canvas.height - (parseInt(idx / lineSize) * tileSize) - tileSize;
   }
  }
  
  return canvas.height;
 }
 
 function toTile(type) {
  let arr = new Array(8);
  for (let i = 0;i < 8;i++) {
   if (type[i] == 1) {
    let x = i % 4 * tileSize;
    let y = parseInt(i / 4) * tileSize;
    let tile = [x, y, getSurface(x)];
    arr[i] = tile;
   }
  }
  
  return arr;
 }
 
 function toLoc(i) {
  return [i % lineSize, parseInt(i / lineSize)];
 }
 
 function toIdx(x, y) {
  return x + tileArray.length - lineSize * y;
 }
 
 function lotate(source) {
  let arr = new Array(8);
  for (let i = 0;i < 8;i++) {
   let x1 = i % 8;
   let y1 = parseInt(i / 8);
   let x2 = -y1 + 4;
   let y2 = -x1; 
   
  }
 }
  
 let t = 0;
 let render = () => {
  let sec = parseInt((t / fps) * 100);
  timer.innerHTML = parseInt(sec / 100) + ":" + sec % 100;
  t++;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  
  for (let i = currentTile.length - 1;i >= 0;i--) {
   let e = currentTile[i];
   if (e == null) continue;
   console.log(i);
   let x = e[0];
   let y = e[1];
   let surface = e[2];
   
   if (y + tileSize < surface && y + tileSize + speed >= surface) {
    let dif = (surface - 1 - tileSize) - y;
    currentTile.forEach(e => {
     tileArray[parseInt(e[0] / tileSize) + 
     tileArray.length - (lineSize * parseInt((e[1] + 1 + dif) / tileSize + 1))] = 1;
     console.log(dif);
    });

    let rand = parseInt(Math.random() * tileType.length);
    currentTile = toTile(tileType[rand]);
    break;
   }
  }
  
  currentTile.forEach(e => {
   let x = e[0];
   let y = e[1] + tileSize + speed < e[2] ? e[1] + speed : e[1];
   ctx.rect(x, y, tileSize, tileSize);
   ctx.fill();
   e[1] = y;
  });
  
  for (let i = 0;i < tileArray.length;i++) {
   if (tileArray[i] == 1) {
    ctx.rect(i % lineSize * tileSize, canvas.height - (parseInt(i / lineSize) + 1) * tileSize,
    tileSize, tileSize);
    ctx.fill();
   }
  }
 };

 setInterval(render, 1000 / fps);
 
/*
const tile = new Image();
 tile.src = '../img/100yen.png';
 tile.onload = () => {
     ctx.drawImage(tile, 0, 0, tile.width / 3, tile.height / 3);
 }
 */
};

