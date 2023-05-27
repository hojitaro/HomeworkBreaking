/* global Image */
window.onload = () => {
 const canvas = document.getElementById("moneytris");
 const timer = document.getElementById("timer");
 const ctx = canvas.getContext("2d");
 const fps = 60.0;
 const tileSize = 5;
 const rowSize = canvas.width / tileSize;
 let tileArray = new Array(rowSize * (canvas.height / tileSize));
 tileArray.push([0, 0]);

 const tileType = [
   [1], [1, 1] [1, 1, 1]
  ];

 let t = 0;
 let render = () => {
  let sec = parseInt((t / fps) * 100);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  
  
   for (let i = 0;i < tileArray.length;i++) {
    let e = tileArray[i];
    if (e == null) continue;
    let x = e[0];
    let y = e[1];
    
    let underTile = i >= rowSize ? tileArray[i - rowSize] : null;
    let surface = underTile == null ? canvas.height : underTile[1];
    
    
    if (y + tileSize < surface && y + tileSize + 1 >= surface) {
     let rand = parseInt(Math.random() * tileType.length);
     tileArray[i + rowSize] = [0, 0];
     y = surface - tileSize;
    } else if (y + tileSize + 1 < surface) {
     y++;
    }
 
    ctx.rect(x, y, tileSize, tileSize);
    ctx.fill();
    e[1] = y;
   }
   
   timer.innerHTML = parseInt(sec / 100) + ":" + sec % 100;
   t++;
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

