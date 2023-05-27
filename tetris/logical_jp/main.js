/* global Image */
window.onload = () => {
 const canvas = document.getElementById("canvas");
 const scoreboard = document.getElementById("scoreboard");
 const startBtn = document.getElementById("start");
 const state = document.getElementById("state");
 const ctx = canvas.getContext("2d");
 
 /* 変更箇所 */
 const fps = 60.0; // 1秒あたりに何回描画するか
 const defSpeed = 30.0; // ブロックが落ちる初期速度
 const speedRate = 5.0; // 十字下キーを押したときの加速度
 const tileSize = 128; // ブロックの大きさ
 // imgフォルダの中に使いたい画像を追加した後、img: にその画像のパス、
 // score: に崩したときに得られる得点、chance: にそのブロックが出現する確率
 const tileData = [
  {img: "./img/jp1.jpg", score: 20, chance: 0.4},
  {img: "./img/jp2.png", score: 100, chance: 0.3},
  {img: "./img/jp3.jpg", score: 500, chance: 0.1},
  {img: "./img/jp4.jpg  ", score: 300, chance: 0.2}
 ];
 const backImg = new Image(); // 背景画像
 backImg.src = "../../img/blackboard.png";
 // ブロックの落ちてくる形を指定
 // 1以上の数字の場所が、ブロックが存在し、0の部分はブロックは存在しません
 const tileType = [
  [
   1, 1, 1, 1
  ],
  [
   1, 1, 0, 0,
   1, 1, 0, 0
  ],
  [
   1, 1, 0, 0,
   0, 1, 1, 0
  ],
  [
   1, 1, 1, 0,
   1, 0, 0, 0
  ],
  [
   1, 1, 1, 0,
   0, 1, 0, 0
  ]
 ];
 // ブロックがtileDataで指定した確立に沿って出現するかどうか
 // falseの場合、tileTypeの数字に沿ったブロックが出現します
 // 例えば、tileTypeで1の時は、tileDataの1番目の5円が落ちてくるようになります
 const randomTile = true;
 const tileLineLen = 4; // 落ちてくるブロックの幅
 const scoreUnit = "pt"; // 表示するスコアの単位
 /* ******************************************************** */

 const ts = tileSize; // <- tileSize
 const ls = Math.floor(canvas.width / ts); // <- lineSize
 const cs = Math.floor(canvas.height / ts); // <- columnSize
 let crrTileArr = []; // <- currentTileArray
 let tileArr = new Array(ls * cs).fill(0);
 const imgObjLst = [];
 tileData.forEach(e => {
  let img = new Image();
  img.src = e.img;
  imgObjLst.push(img);
 });
 const txtTime = 1.0;
 let txtArr = [];
 let tt = 0 // <- txtTick
 let t = 0;
 let score = 0;
 
 ctx.font = '50px Roboto medium';
 ctx.fillStyle = "#ffae52";
 scoreboard.innerHTML = "0 " + scoreUnit;

 startBtn.onclick = () => {
  scoreboard.innerHTML = "0 " + scoreUnit;
  state.innerHTML = "";
  tileArr = new Array(ls * cs).fill(0);
  crrTileArr = toTile(tileType[Math.floor(Math.random() * tileType.length)]);
  score = 0;
  t = 0;
 };

let speed = defSpeed;
document.addEventListener("keydown", e => {
 if (e.code == "ArrowUp") {
  rotate();
 } else if (e.code == "ArrowLeft") {
  slide(-1);
 } else if (e.code == "ArrowRight") {
  slide(1);
 } else if (e.code == "ArrowDown") {
  speed = defSpeed * speedRate;
 }
});

document.addEventListener("keyup", e => {
 if (e.code == "ArrowDown") {
  speed = defSpeed;
 }
});

function slide(offX) {
 for (let i = 0;i < crrTileArr.length;i++) {
  crrTileArr[i][0] += offX;
  crrTileArr[i][2] = getSurface(crrTileArr[i]);
 }
 if (offX < 0) {
  intoLBound(crrTileArr);
 } else {
  intoRBound(crrTileArr);
 }
}

function intoLBound(src) {
 src.sort((a, b) => a[0] - b[0]);
 let minX = src[0][0];
 let L = 0;

 src.forEach(e => {
  if (tileArr[toIdx(e[0], e[1])] != 0) {
   let l = getLeftWall(e);
   if (l > L) L = l;
  }
 });
 
 if (L - minX <= 0) return false;
 
 for (let i = 0;i < src.length;i++) {
  if (minX < L) src[i][0] += (L - minX);
  src[i][2] = getSurface(src[i]);
 }
 
 return true;
}

function intoRBound(src) {
 src.sort((a, b) => b[0] - a[0]);
 let maxX = src[0][0];
 let R = ls - 1;

 src.forEach(e => {
  if (tileArr[toIdx(e[0], e[1])] != 0) {
   let r = getRightWall(e);
   if (r < R) R = r;
  }
 });
 
 if (maxX - R < 0) return false;
 
 for (let i = 0;i < src.length;i++) {
  if (maxX > R) src[i][0] -= (maxX - R);
  src[i][2] = getSurface(src[i]);
 }
 
 return true;
}

function toIdx(x, y) {
 return x + ls * y;
}

function getSurface(tile) {
 for (let i = tile[1];i >= 0;i--) {
  if (i < cs && tileArr[toIdx(tile[0], i)] != 0) {
   return i + 1;
  }
 }
 return 0;
}

function getLeftWall(tile) {
  for (let i = tile[0];i < ls;i++) {
   if (tileArr[toIdx(i, tile[1])] == 0) {
    return i;
   }
  }

 return 0;
}

function getRightWall(tile) {
 for (let i = tile[0];i >= 0;i--) {
  if (tileArr[toIdx(i, tile[1])] == 0) {
   return i;
  }
 }
 return ls - 1;
}

function toTile(type) {
 let arr = [];
 for (let i = 0;i < type.length;i++) {
  if (type[i] != 0) {
   let x = Math.floor(ls / 2 - tileLineLen / 2 + (i % tileLineLen));
   let y = cs + 2 - Math.floor(i / tileLineLen);
   
   let p = Math.random();
   let sp = 0;
   let img = type[i];
   if (randomTile) {
    for (let j = 0;j < tileData.length;j++) {
     if (sp <= p && p < sp + tileData[j].chance) {
      img = j + 1;
      break;
     }
     sp += tileData[j].chance;
    }
   }
   
   let tile = [x, y, getSurface([x, y]), img];
   arr.push(tile);
  }
 }
 
 return arr;
}

function rotate() {
  let arr = [...crrTileArr];
  let n = arr.length, sx = 0, sy = 0;
  arr.forEach(e => {
    sx += e[0];  sy += e[1];
  });
  
  let gx = Math.floor(sx / n), gy = Math.floor(sy / n);
  for (let i = 0;i < arr.length;i++) {
   let e = arr[i];
   let x1  = e[0] - gx;
   let y1 = e[1] - gy;
   let x2 = -y1 + gx;
   let y2 = x1 + gy;
   let img = e[3];
   let sur = getSurface([x2, y2]);
   arr[i] = [x2, y2, sur, img];
  }

  if (intoLBound(arr) && intoRBound(arr)) return;
  crrTileArr = arr;
 }

 let render = () => {
  let sec = Math.floor((t / fps) * 100);
  let onSurface = false;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  ctx.drawImage(backImg, 0, 0, canvas.width, canvas.height);

  let temp = new Array(crrTileArr.length);
  for (let i = 0;i < crrTileArr.length;i++) {
   let e = crrTileArr[i];
   let x = e[0], y = e[1], sur = e[2], img = e[3];
   ctx.drawImage(imgObjLst[img - 1], x * ts, (cs - y - 2) * ts + t, ts, ts);
   if (y <= sur) {
    onSurface = true;
    if (y >= cs) {
     state.innerHTML = "GAME OVER";
     crrTileArr = [];
     break;
    }
   }
   temp[i] = [x, y - 1, sur, img];
  }

  for (let i = 0;i < tileArr.length;i++) {
   if (tileArr[i] != 0) {
    let x = i % ls;
    let y = Math.floor(i / ls);
    if (y < cs) {
     ctx.drawImage(imgObjLst[tileArr[i] - 1], x * ts, (cs - y - 1) * ts, ts, ts);
    }
   }
  }

  tt++;
  if (tt < fps * txtTime) {
     txtArr.forEach(e => {
    ctx.fillText(e[0], e[1], e[2]);
   });
  } else {
   tt = 0;
   txtArr = [];
  }

  if (t < ts) {
     t += speed;
     return;
  }

  if (onSurface) {
   crrTileArr.forEach(e => tileArr[toIdx(e[0], e[1])] = e[3]);

   let h = 0;
   for (let i = 0;i < cs;i++) {
    let tmpScore = score;
    let tmpTxtArr = [];
    let c = 0;
    for (let j = 0;j < ls;j++) {
     if (tileArr[toIdx(j, i)] != 0) {
      c++;
      let sc = tileData[tileArr[toIdx(j, i)] - 1].score;
      tmpTxtArr.push([sc > 0 ? "+" + sc : sc, j * ts, (cs - h - 1) * ts]);
      tmpScore += sc;
     }
    }
    
    h++;
    if (c != ls) continue;
    score = tmpScore;
    scoreboard.innerHTML = score + " " + scoreUnit;
    txtArr = txtArr.concat(tmpTxtArr);
    console.log(h);

    for (let k = i;k < cs;k++) {
     for (let l = 0;l < ls;l++) {
      let btm = toIdx(l, k);
      let top = toIdx(l, k + 1);
      tileArr[btm] = 0;
      if (top < tileArr.length && tileArr[top] != 0) {
       tileArr[btm] = tileArr[top];
       tileArr[top] = 0;
      }
     }
    }
    i--;
   }

   let rand = Math.floor(Math.random() * tileType.length);
   crrTileArr = toTile(tileType[rand]);
  } else {
   crrTileArr = temp;
  }
  
  t = 0;
 };

 setInterval(render, 1000 / fps);
};

