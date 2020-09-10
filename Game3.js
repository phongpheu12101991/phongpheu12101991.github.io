let playscreen = `<div class="all" id="all">
<div id="endgame">
        <div id="winner">WWWWWWWWWWWW</div>
        <div id="imgwinner">
          <img src="win.gif" alt="" style="height: 30vh" />
        </div>
        <div id="reward">Gold +100</div>
        <button id="bend">Làm game nữa !!</button>
      </div>
<img src="vvv.gif" alt="" id="bgp" style="width: 100vw; height: 100vh" />
<div id="showminiturn">
  <div id="turn0">Lượt</div>
  <div id="turn1">Player 1</div>
  <div id="turn2">Player 2</div>
</div>
<div id="showturn"></div>
<div id="time"></div>
<div id="gamecontrol">
<div id="move">
<img
  class="arrow"
  src="left.png"
  alt=""
  style="width: 5vw"
  id="moveleft"
/>
<img
  class="arrow"
  src="send.png"
  alt=""
  style="width: 5vw"
  id="moveright"
/>
</div>
  <div id="power">
    <div class="powerslide">
      <input
        type="range"
        min="1"
        max="100"
        value="1"
        class="slider"
        id="powerRange"
      />
      <p id="ppower">Power: <span id="powerfire"></span></p>
    </div>
  </div>
  <div id="bullet">
    <div class="typeb" id="b1">b1</div>
    <div class="typeb" id="b2">b2</div>
    <div class="typeb" id="bs">bs</div>
  </div>
  <div id="angle">
    <button class="bangle" id="upangle">+</button>
    <div id="showangle"></div>
    <button class="bangle" id="downangle">-</button>
  </div>
</div>
<div id="gamemain">
<div id="ground"></div>
<img src="earth1.png" alt="" style="width: 300px" id="earth" />
  <div id="d1">
    <img
      id="d2"
      src="teeth.png"
      style="width: 20px; height: 20px"
      alt=""
    />
    <div id="player1">
      <div id="p1">
      <div id="iplayer1"><img src="c1.png" alt="" style="width: 50px;height: 50px;"/></div>
      <div id="p1name"></div>
        <div id="damage1"></div>
        <div id="hp1"><div id="misshp1"></div></div>
      </div>
    </div>
    <div id="player2">
      <div id="p2">
      <div id="iplayer2"><img src="r-c2.png" alt="" style="width: 50px;height: 50px;"/></div>
      <div id="p2name"></div>
        <div id="damage2"></div>
        <div id="hp2"><div id="misshp2"></div></div>
      </div>
    </div>

  </div>
</div>
</div>`;
let body = document.getElementById("body");
let email = localStorage.getItem("loginemail");
let password = localStorage.getItem("loginpassword");
let room = localStorage.getItem("room");
firebase.auth().signInWithEmailAndPassword(email, password);
firebase.auth().onAuthStateChanged(function (user) {
  if (user && user.emailVerified) {
    body.innerHTML = playscreen;
    db.collection("room")
      .doc(room)
      .get()
      .then(function (doc) {
        if (doc.data().start == true) {
          Setdata();
        }
      });
  } else {
    body.innerHTML = `Loading......`;
  }
});

function Setdata() {
  let d1 = document.getElementById("d1");
  let d2 = document.getElementById("d2");

  let gamemain = document.getElementById("gamemain");
  let iplayer1 = document.getElementById("iplayer1");
  let iplayer2 = document.getElementById("iplayer2");

  let p1name = document.getElementById("p1name");
  let p2name = document.getElementById("p2name");

  let player1 = document.getElementById("player1");
  let player2 = document.getElementById("player2");
  let posp1x = 100;
  let posp1y = 1426 - 75 - 50;
  let posp2x = 1058 - 100 - 50;
  let posp2y = 1426 - 75 - 50;
  let z;
  let zz;
  let data;
  let update;
  let newupdate;
  let dx;
  let dy;
  let atk;
  let winner = document.getElementById("winner");
  let endgame = document.getElementById("endgame");

  let moveleft = document.getElementById("moveleft");
  let moveright = document.getElementById("moveright");

  let bend = document.getElementById("bend");
  bend.addEventListener("click", goacc);
  function goacc() {
    if (pos == 1) {
      item.update({
        player1: {},
      });
    } else if (pos == 2) {
      item.update({
        player2: {},
      });
    }

    location.replace("index2.html");
    firebase.auth().signInWithEmailAndPassword(email, password);
  }

  console.log(screen.height);
  console.log(window.innerHeight);
  let sh = 0;
  let sw = 0;
  if (screen.height > 700) {
    sh = window.innerHeight;
    sw = window.innerWidth;
  } else {
    sh = screen.height;
    sw = screen.width;
    if (sh > sw) {
      [sh, sw] = [sw, sh];
    }
  }
  let scale = sh / (713 / 2);
  // set full view start
  let scalefullmap = sw / 1058;
  gamemain.style.transform = `scale(${scalefullmap},${scalefullmap})`;
  gamemain.style.left = `${-(1058 - sw) / 2}px`;
  gamemain.style.bottom = `${(1426 * scalefullmap - 1426) / 2}px`;
  // set text start
  let showturn = document.getElementById("showturn");
  showturn.style.fontSize = "4vw";
  showturn.innerText = "-=START=-";
  showturn.style.visibility = "visible";
  setTimeout(setviewscale, 1000);

  function setviewscale() {
    showturn.style.fontSize = "0vw";
    gamemain.style.transform = `scale(${scale},${scale})`;
    gamemain.style.left = `${-(1058 - sw) / 2}px`;
    gamemain.style.bottom = `${(1426 * scale - 1426) / 2}px`;
    subdata();
    db.collection("room")
      .doc("ss")
      .get()
      .then(function (doc) {
        console.log(doc.data());
        if (doc.data().change !== "turn") {
          db.collection("room").doc("ss").update({
            change: "turn",
          });
        }
      });
  }
  // del text turn, add event fire
  function delturn() {
    showturn.style.visibility = "hidden";
    showturn.style.fontSize = "0vw";
    showturn.innerText = "";
    timeout = 20;
    if (data.turn == pos) {
      slider.addEventListener("mousedown", mousefire);

      moveleft.addEventListener("click", goleft);

      moveright.addEventListener("click", goright);

      slider.disabled = false;
      caltime();
      addangle();
    }
    miniturn();
    console.log(z);
    console.log(zz);
    console.log(data.player1.side);
    console.log(data.player2.side);
  }

  // move <= =>

  // function doSomething() {

  // }
  function goleft() {
    moveleft.removeEventListener("click", goleft);
    moveright.removeEventListener("click", goright);
    if (data.turn == pos && pos == 1) {
      posp1x -= 20;
      player1.style.left = `${posp1x}px`;
      z = posp1x + 50;
      zz = posp1x;
      console.log(data.player1.char.length);
      if (data.player1.char.length == 6) {
        item.update({
          "player1.char": `r-${data.player1.char}`,
          change: "move",
          pchange: pos,
        });
      }
      item.update({
        "player1.x": posp1x,
        "player1.y": posp1y,
        change: "move",
        "player1.side": "left",
        pchange: pos,
      });
    } else if (data.turn == pos && pos == 2) {
      posp2x -= 20;
      player2.style.left = `${posp2x}px`;
      z = posp2x + 50;
      zz = posp2x;
      if (data.player2.char.length == 6) {
        item.update({
          "player2.char": `r-${data.player2.char}`,
          change: "move",
          pchange: pos,
        });
      }
      item.update({
        "player2.x": posp2x,
        "player2.y": posp2y,
        change: "move",
        "player2.side": "left",
        pchange: pos,
      });
    }
  }
  function goright() {
    moveleft.removeEventListener("click", goleft);

    moveright.removeEventListener("click", goright);
    if (data.turn == pos && pos == 1) {
      posp1x += 20;
      player1.style.left = `${posp1x}px`;
      z = posp1x + 50;
      zz = posp1x;
      if (data.player1.char.length == 8) {
        item.update({
          "player1.char": `${data.player1.char.slice(2, 8)}`,
          change: "move",
          pchange: pos,
        });
      }
      item.update({
        "player1.x": posp1x,
        "player1.y": posp1y,
        change: "move",
        "player1.side": "right",
        pchange: pos,
      });
    } else if (data.turn == pos && pos == 2) {
      posp2x += 20;
      player2.style.left = `${posp2x}px`;
      z = posp2x + 50;
      zz = posp2x;
      if (data.player2.char.length == 8) {
        item.update({
          "player2.char": `${data.player2.char.slice(2, 8)}`,
          change: "move",
          pchange: pos,
        });
      }
      item.update({
        "player2.x": posp2x,
        "player2.y": posp2y,
        change: "move",
        "player2.side": "right",
        pchange: pos,
      });
    }
  }

  // function move(event) {
  //   if (data.turn == pos && pos == 1) {
  //     if (event.keyCode == 65) {
  //       posp1x -= 1;
  //       player1.style.left = `${posp1x}px`;
  //       z = posp1x + 50;
  //       zz = posp1x;
  //       console.log(data.player1.char.length);
  //       if (data.player1.char.length == 6) {
  //         item.update({ "player1.char": `r-${data.player1.char}` });
  //       }
  //       item.update({
  //         "player1.x": posp1x,
  //         "player1.y": posp1y,
  //         change: "move",
  //         "player1.side": "left",
  //         pchange: pos,
  //       });
  //     }
  //     if (event.keyCode == 68) {
  //       posp1x += 1;
  //       player1.style.left = `${posp1x}px`;
  //       z = posp1x + 50;
  //       zz = posp1x;
  //       if (data.player1.char.length == 8) {
  //         item.update({ "player1.char": `${data.player1.char.slice(2, 8)}` });
  //       }
  //       item.update({
  //         "player1.x": posp1x,
  //         "player1.y": posp1y,
  //         change: "move",
  //         "player1.side": "right",
  //         pchange: pos,
  //       });
  //     }
  //   } else if (data.turn == pos && pos == 2) {
  //     if (event.keyCode == 65) {
  //       posp2x -= 1;
  //       player2.style.left = `${posp2x}px`;
  //       z = posp2x + 50;
  //       zz = posp2x;
  //       if (data.player2.char.length == 6) {
  //         item.update({ "player2.char": `r-${data.player2.char}` });
  //       }
  //       item.update({
  //         "player2.x": posp2x,
  //         "player2.y": posp2y,
  //         change: "move",
  //         "player2.side": "left",
  //         pchange: pos,
  //       });
  //     }
  //     if (event.keyCode == 68) {
  //       posp2x += 1;
  //       player2.style.left = `${posp2x}px`;
  //       z = posp2x + 50;
  //       zz = posp2x;
  //       if (data.player2.char.length == 8) {
  //         item.update({ "player2.char": `${data.player2.char.slice(2, 8)}` });
  //       }
  //       item.update({
  //         "player2.x": posp2x,
  //         "player2.y": posp2y,
  //         change: "move",
  //         "player2.side": "right",
  //         pchange: pos,
  //       });
  //     }
  //   }
  // }
  // end

  // add slide to fire
  function mousefire() {
    moveleft.removeEventListener("click", goleft);
    moveright.removeEventListener("click", goright);
    document.addEventListener("mouseup", exfire);
  }

  function exfire() {
    if (pos == 1) {
      if (data.player1.side == "left") {
        item.update({
          "fire.rad": nowangle,
          "fire.power": nowpower,
          "fire.dx": dx,
          "fire.atk": data.player2.atk,
          change: "fire2",
          pchange: pos,
        });
        player2fire(nowangle, nowpower, dx, data.player1.atk);
      } else if (data.player1.side == "right") {
        item.update({
          "fire.rad": nowangle,
          "fire.power": nowpower,
          "fire.dx": dx,
          "fire.atk": data.player2.atk,
          change: "fire1",
          pchange: pos,
        });
        player1fire(nowangle, nowpower, dx, data.player1.atk);
      }
    } else if (pos == 2) {
      if (data.player2.side == "left") {
        item.update({
          "fire.rad": nowangle,
          "fire.power": nowpower,
          "fire.dx": dx,
          "fire.atk": data.player2.atk,
          change: "fire2",
          pchange: pos,
        });
        player2fire(nowangle, nowpower, dx, data.player2.atk);
      } else if (data.player2.side == "right") {
        item.update({
          "fire.rad": nowangle,
          "fire.power": nowpower,
          "fire.dx": dx,
          "fire.atk": data.player2.atk,
          change: "fire1",
          pchange: pos,
        });
        player1fire(nowangle, nowpower, dx, data.player2.atk);
      }
    }
  }

  // time mỗi lượt
  let time = document.getElementById("time");
  let timeout = 20;
  function endtime() {
    moveleft.removeEventListener("click", goleft);
    moveright.removeEventListener("click", goright);
    removeangle();
    slider.disabled = true;

    slider.removeEventListener("mousedown", mousefire);
    document.removeEventListener("mouseup", exfire);
    document.removeEventListener("touchend", exfire);
    time.innerText = null;
    timeout = 20;
    if (data.turn == pos) {
      if (pos == 1) {
        item.update({
          turn: 2,
          change: "turn",
          pchange: pos,
        });
      } else if (pos == 2) {
        item.update({
          turn: 1,
          change: "turn",
          pchange: pos,
        });
      }
    }
  }
  let ii;
  function caltime() {
    timeout--;
    time.innerText = `${timeout}`;
    ii = setTimeout(caltime, 1000);
    if (timeout == 0) {
      clearTimeout(ii);
      setTimeout(endtime, 1000);
    }
  }
  // end

  // show turn

  console.log(sh);
  function setviewtop2() {
    showturn.style.visibility = "visible";
    showturn.style.fontSize = "4vw";
    showturn.innerText = "-=Player 2=-";
    gamemain.style.transition = "all 0.5s";
    gamemain.style.left = `${-(1058 - sw) / 2 - (posp2x - 1058 / 2) * scale}px`;
    gamemain.style.bottom = `${
      (1426 * scale - 1426) / 2 - ((1426 - posp2y) * scale - sh / 2)
    }px`;
    // gamemain.style.left = `${sw - (1058 * scale + 1058) / 2}px`;
    // gamemain.style.bottom = `${(1426 * scale - 1426) / 2}px`;
    d2.style.visibility = "hidden";
    setTimeout(delturn, 1000);
  }
  function setviewtop1() {
    showturn.style.visibility = "visible";
    showturn.style.fontSize = "4vw";
    showturn.innerText = "-=Player 1=-";
    gamemain.style.transition = "all 0.5s";
    // gamemain.style.left = `${(1058 * scale - 1058) / 2}px`;
    // gamemain.style.bottom = `${(1426 * scale - 1426) / 2}px`;
    gamemain.style.left = `${-(1058 - sw) / 2 - (posp1x - 1058 / 2) * scale}px`;
    gamemain.style.bottom = `${
      (1426 * scale - 1426) / 2 - ((1426 - posp1y) * scale - sh / 2)
    }px`;
    d2.style.visibility = "hidden";
    setTimeout(delturn, 1000);
  }
  // mini turn
  let turn1 = document.getElementById("turn1");
  let turn2 = document.getElementById("turn2");
  function miniturn() {
    if (data.turn == 1) {
      turn1.style.backgroundColor = "rgba(255, 250, 240, 0.692)";
      turn2.style.backgroundColor = null;
    } else {
      turn2.style.backgroundColor = "rgba(255, 250, 240, 0.692)";
      turn1.style.backgroundColor = null;
    }
  }
  // end

  function deldamage1() {
    document.getElementById("damage1").innerText = ``;
    document.getElementById("damage1").style.bottom = "65px";
  }

  function deldamage2() {
    document.getElementById("damage2").innerText = ``;
    document.getElementById("damage2").style.bottom = "65px";
  }
  gamemain.addEventListener("click", viewmap);
  function viewmap(event) {
    let px = event.pageX;
    let py = event.pageY;
    console.log(px, py);
    // console.log(firebase.auth().currentUser);
    // console.log(sh / 2 - py);
    gamemain.style.transition = "all 0.5s";
    gamemain.style.left = `${
      Number(gamemain.style.left.substring(0, gamemain.style.left.length - 2)) -
      px +
      sw / 2
    }px`;

    gamemain.style.bottom = `${
      Number(
        gamemain.style.bottom.substring(0, gamemain.style.bottom.length - 2)
      ) -
      (sh / 2 - py) / scale
    }px`;
    function deltrans() {
      gamemain.style.transition = null;
    }
    setTimeout(deltrans, 500);
  }

  let whp2 = document.getElementById("misshp2").style.width;
  let whp1 = document.getElementById("misshp1").style.width;
  console.log(sh, sw);

  // power slide
  let slider = document.getElementById("powerRange");
  slider.disabled = true;
  let output = document.getElementById("powerfire");
  output.innerHTML = slider.value;
  let nowpower = slider.value;
  slider.oninput = function () {
    output.innerHTML = this.value;
    nowpower = Number(this.value);
  };

  // end

  // function tinh toan cac loai
  function fulldistance(tangle) {
    let distance = 29.5;
    let alld = 0;
    for (let x = 89; x >= tangle; x--) {
      distance += 0.5;
      alld = alld + distance;
    }
    return alld;
  }
  function fullpowermaxheight(rad) {
    let sum = 0;
    for (let i = 1; i <= 90; i++) {
      sum = sum + i;
    }
    let changeheight = 100 / sum;
    let fpmh = 0;
    let allch = 10;
    for (let i = 1; i <= rad; i++) {
      allch = allch + changeheight;
      fpmh = fpmh + allch;
    }
    return fpmh;
  }
  function tinhheso(rad) {
    let fulldis = fulldistance(rad);
    let fullhei = fullpowermaxheight(rad);
    let heso = fullhei / ((fulldis / 2) * (fulldis / 2));
    return heso;
  }
  function fire1(rad, power, dx) {
    let y =
      (100 / power) *
        tinhheso(rad) *
        (z - (dx + 50)) *
        (z - (dx + 50) - fulldistance(rad) * (power / 100)) +
      1426 -
      125;
    return y;
  }
  function fire2(rad, power, dx) {
    let y =
      (100 / power) *
        tinhheso(rad) *
        (zz - dx) *
        (zz - (dx - fulldistance(rad) * (power / 100))) +
      1426 -
      125;
    return y;
  }
  // endddddddd

  // thẻ angle
  let showangle = document.getElementById("showangle");
  let upangle = document.getElementById("upangle");
  let downangle = document.getElementById("downangle");
  let nowangle = 75;
  let upaxx;
  let downaxx;
  showangle.innerText = `${nowangle}`;
  function addangle() {
    upangle.addEventListener("mousedown", upa);
    upangle.addEventListener("touchstart", upa);
    upangle.addEventListener("touchend", endupa);
    upangle.addEventListener("mouseup", endupa);
    upangle.addEventListener("mouseout", endupa);
    downangle.addEventListener("touchstart", downa);
    downangle.addEventListener("touchend", enddowna);
    downangle.addEventListener("mousedown", downa);
    downangle.addEventListener("mouseup", enddowna);
    downangle.addEventListener("mouseout", enddowna);
  }
  function removeangle() {
    upangle.removeEventListener("touchstart", upa);
    upangle.removeEventListener("touchend", endupa);
    upangle.removeEventListener("mousedown", upa);
    upangle.removeEventListener("mouseup", endupa);
    upangle.removeEventListener("mouseout", endupa);
    downangle.removeEventListener("touchstart", downa);
    downangle.removeEventListener("touchend", enddowna);
    downangle.removeEventListener("mousedown", downa);
    downangle.removeEventListener("mouseup", enddowna);
    downangle.removeEventListener("mouseout", enddowna);
  }
  function upa() {
    nowangle = nowangle + 1;
    showangle.innerText = `${nowangle}`;
    if (nowangle >= 90) {
      nowangle = 90;
      showangle.innerText = `${nowangle}`;
    }
    upaxx = setTimeout(upa, 100);
  }
  function endupa() {
    clearTimeout(upaxx);
  }
  function enddowna() {
    clearTimeout(downaxx);
  }
  function downa() {
    nowangle--;
    showangle.innerText = `${nowangle}`;
    if (nowangle <= 0) {
      nowangle = 0;
      showangle.innerText = `${nowangle}`;
    }
    downaxx = setTimeout(downa, 100);
  }

  function player1fire(rad, power, dx, atk) {
    clearTimeout(ii);
    removeangle();
    slider.disabled = true;
    document.removeEventListener("keydown", move);
    slider.removeEventListener("mousedown", mousefire);
    document.removeEventListener("mouseup", exfire);

    gamemain.style.transition = null;
    let y = fire1(rad, power, dx);
    let x = z;
    d2.style.visibility = "visible";

    d2.style.left = `${x}px`;
    d2.style.top = `${y}px`;

    d2.style.transform = `rotate(${z * 5}deg)`;
    if (sw <= 1058) {
      // gamemain.style.left = `${(sw / 2 - x) * scale}px`;
      gamemain.style.left = `${-(1058 - sw) / 2 - (x - 1058 / 2) * scale}px`;
    } else {
      gamemain.style.left = `${(sw - 1058) / 2 - (x - 1058 / 2) * scale}px`;
    }

    if (sh <= 1426) {
      // gamemain.style.bottom = `${(y - 1426 + sh / 2) * scale}px`;
      gamemain.style.bottom = `${
        (1426 * scale - 1426) / 2 - ((1426 - y) * scale - sh / 2)
      }px`;
    } else {
      gamemain.style.bottom = `${
        (sh / 2 - 1426 + y) * scale - (sh - 1426) / 2
      }px`;
    }
    // z++;
    z += 1;
    console.log(x, y);
    let xx = setTimeout(() => {
      player1fire(rad, power, dx, atk);
    }, 10);

    if (
      x >= posp2x + 3 - 10 &&
      x <= posp2x + 47 - 10 &&
      y >= 1426 - 125 - 10 &&
      y <= 1426 - 75 - 10
    ) {
      clearTimeout(xx);
      // z = 150;
      document.getElementById("damage2").innerText = `-${atk}`;
      document.getElementById("damage2").style.bottom = "75px";

      let caldamage = (50 * atk) / 1000;
      whp2 = `${Number(whp2.substring(0, whp2.length - 2)) + caldamage}px`;
      document.getElementById("misshp2").style.width = whp2;

      if (data.turn == pos) {
        item.update({
          "player2.hp": data.player2.hp - atk,
          change: "hp",
          pchange: pos,
        });
      }

      setTimeout(deldamage2, 1000);
      if (data.turn == pos) {
        if (pos == 1) {
          setTimeout(() => {
            item.update({
              turn: 2,
              change: "turn",
              pchange: pos,
            });
          }, 1000);
        } else if (pos == 2) {
          setTimeout(() => {
            item.update({
              turn: 1,
              change: "turn",
              pchange: pos,
            });
          }, 1000);
        }
      }

      // turn = 0;
      time.innerText = null;
    }
    if (
      x >= posp1x + 3 - 10 &&
      x <= posp1x + 47 - 10 &&
      y >= 1426 - 125 - 10 &&
      y <= 1426 - 75 - 10
    ) {
      clearTimeout(xx);
      // zz = 908;
      document.getElementById("damage1").innerText = `-${atk}`;
      document.getElementById("damage1").style.bottom = "75px";

      let caldamage = (50 * atk) / 1000;
      whp1 = `${Number(whp1.substring(0, whp1.length - 2)) + caldamage}px`;
      document.getElementById("misshp1").style.width = whp1;
      if (data.turn == pos) {
        item.update({
          "player1.hp": data.player1.hp - atk,
          change: "hp",
          pchange: pos,
        });
      }
      setTimeout(deldamage1, 1000);
      if (data.turn == pos) {
        if (pos == 1) {
          setTimeout(() => {
            item.update({
              turn: 2,
              change: "turn",
              pchange: pos,
            });
          }, 1000);
        } else if (pos == 2) {
          setTimeout(() => {
            item.update({
              turn: 1,
              change: "turn",
              pchange: pos,
            });
          }, 1000);
        }
      }
      time.innerText = null;
    }

    if (x >= 1058 - 10 || y >= 1426 - 85 || x <= 0) {
      clearTimeout(xx);
      // z = 150;
      // setviewtop2();
      // turn = 0;
      time.innerText = null;
      if (data.turn == pos) {
        if (pos == 1) {
          setTimeout(() => {
            item.update({
              turn: 2,
              change: "turn",
              pchange: pos,
            });
          }, 1000);
        } else if (pos == 2) {
          setTimeout(() => {
            item.update({
              turn: 1,
              change: "turn",
              pchange: pos,
            });
          }, 1000);
        }
      }
    }
  }
  // player1fire();

  function player2fire(rad, power, dx, atk) {
    clearTimeout(ii);
    removeangle();
    slider.disabled = true;
    // document.removeEventListener("keydown", move);
    slider.removeEventListener("mousedown", mousefire);
    document.removeEventListener("mouseup", exfire);

    gamemain.style.transition = null;
    let y = fire2(rad, power, dx);
    let x = zz;
    d2.style.visibility = "visible";

    d2.style.left = `${x - 10}px`;
    d2.style.top = `${y}px`;

    d2.style.transform = `rotate(${zz * 5}deg)`;

    if (sw <= 1058) {
      // gamemain.style.left = `${(-x + sw / 2) * scale}px`;
      gamemain.style.left = `${-(1058 - sw) / 2 - (x - 1058 / 2) * scale}px`;
    } else {
      gamemain.style.left = `${(sw - 1058) / 2 - (x - 1058 / 2) * scale}px`;
    }

    if (sh <= 1426) {
      gamemain.style.bottom = `${
        (1426 * scale - 1426) / 2 - ((1426 - y) * scale - sh / 2)
      }px`;
    } else {
      gamemain.style.bottom = `${
        (sh / 2 - 1426 + y) * scale - (sh - 1426) / 2
      }px`;
    }
    zz--;
    console.log(x, y);
    let xxx = setTimeout(() => {
      player2fire(rad, power, dx, atk);
    }, 10);

    if (
      x >= posp2x + 3 &&
      x <= posp2x + 47 &&
      y >= 1426 - 125 - 10 &&
      y <= 1426 - 75 - 10
    ) {
      clearTimeout(xxx);
      // z = 150;
      document.getElementById("damage2").innerText = `-${atk}`;
      document.getElementById("damage2").style.bottom = "75px";

      let caldamage = (50 * atk) / 1000;
      whp2 = `${Number(whp2.substring(0, whp2.length - 2)) + caldamage}px`;
      document.getElementById("misshp2").style.width = whp2;

      if (data.turn == pos) {
        item.update({
          "player2.hp": data.player2.hp - atk,
          change: "hp",
          pchange: pos,
        });
      }

      setTimeout(deldamage2, 1000);
      if (data.turn == pos) {
        if (pos == 1) {
          setTimeout(() => {
            item.update({
              turn: 2,
              change: "turn",
              pchange: pos,
            });
          }, 1000);
        } else if (pos == 2) {
          setTimeout(() => {
            item.update({
              turn: 1,
              change: "turn",
              pchange: pos,
            });
          }, 1000);
        }
      }

      // turn = 0;
      time.innerText = null;
    }

    if (
      x >= posp1x + 3 &&
      x <= posp1x + 47 &&
      y >= 1426 - 125 - 10 &&
      y <= 1426 - 75 - 10
    ) {
      clearTimeout(xxx);
      // zz = 908;
      document.getElementById("damage1").innerText = `-${atk}`;
      document.getElementById("damage1").style.bottom = "75px";

      let caldamage = (50 * atk) / 1000;
      whp1 = `${Number(whp1.substring(0, whp1.length - 2)) + caldamage}px`;
      document.getElementById("misshp1").style.width = whp1;
      if (data.turn == pos) {
        item.update({
          "player1.hp": data.player1.hp - atk,
          change: "hp",
          pchange: pos,
        });
      }
      setTimeout(deldamage1, 1000);
      if (data.turn == pos) {
        if (pos == 1) {
          setTimeout(() => {
            item.update({
              turn: 2,
              change: "turn",
              pchange: pos,
            });
          }, 1000);
        } else if (pos == 2) {
          setTimeout(() => {
            item.update({
              turn: 1,
              change: "turn",
              pchange: pos,
            });
          }, 1000);
        }
      }
      time.innerText = null;
    }
    if (x >= 1058 - 10 || y >= 1426 - 85 || x <= 0) {
      clearTimeout(xxx);
      zz = 908;
      // setviewtop1();

      time.innerText = null;
      if (data.turn == pos) {
        if (pos == 1) {
          setTimeout(() => {
            item.update({
              turn: 2,
              change: "turn",
              pchange: pos,
            });
          }, 1000);
        } else if (pos == 2) {
          setTimeout(() => {
            item.update({
              turn: 1,
              change: "turn",
              pchange: pos,
            });
          }, 1000);
        }
      }
    }
  }
  // set view start random player
  function endgamess() {
    endgame.style.visibility = "visible";
  }
  // let turn = Math.floor(Math.random() * 2);
  let item = db.collection("room").doc(`${room}`);
  let pos;

  async function subdata() {
    db.collection("room")
      .where("roomname", "==", `${room}`)
      .onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          data = change.doc.data();
          console.log(data.roomname);
          // newupdate = data.change;

          // render
          p1name.innerText = data.player1.name;
          p2name.innerText = data.player2.name;

          iplayer1.innerHTML = `<img src="${data.player1.char}" alt="" style="width: 50px;height: 50px;"/>`;
          iplayer2.innerHTML = `<img src="${data.player2.char}" alt="" style="width: 50px;height: 50px;"/>`;

          // checkpos
          if (data.player1.name == firebase.auth().currentUser.displayName) {
            pos = 1;
          } else if (
            data.player2.name == firebase.auth().currentUser.displayName
          ) {
            pos = 2;
          } else if (
            data.player3.name == firebase.auth().currentUser.displayName
          ) {
            pos = 3;
          } else if (
            data.player4.name == firebase.auth().currentUser.displayName
          ) {
            pos = 4;
          }

          if (data.change == "fire1" && data.pchange !== pos) {
            player1fire(
              data.fire.rad,
              data.fire.power,
              data.fire.dx,
              data.fire.atk
            );
          }
          if (data.change == "fire2" && data.pchange !== pos) {
            player2fire(
              data.fire.rad,
              data.fire.power,
              data.fire.dx,
              data.fire.atk
            );
          }

          if (data.change == "move" && data.pchange !== pos) {
            if (pos == 1) {
              player2.style.left = `${data.player2.x}px`;
              player2.style.bottom = `${1426 - 50 - data.player2.y}px`;
              posp2x = data.player2.x;
              posp2y = data.player2.y;
              dx = data.player2.x;
              dy = data.player2.y;
              z = dx + 50;
              zz = dx;
              atk = data.player2.atk;
            } else if (pos == 2) {
              player1.style.left = `${data.player1.x}px`;
              player1.style.bottom = `${1426 - 50 - data.player1.y}px`;
              posp1x = data.player1.x;
              posp1y = data.player1.y;
              dx = data.player1.x;
              dy = data.player1.y;
              z = dx + 50;
              zz = dx;
              atk = data.player1.atk;
            }
          }
          // if (data.change == 'hp' && data.pchange !== pos ) {

          // }
          if (data.player1.hp <= 0) {
            winner.innerHTML = `${data.player2.name} Winnnnnnnn!`;
            item.update({
              "player1.char": "die.png",
              pchange: pos,
              change: "end",
              turn: 0,
            });
          } else if (data.player2.hp <= 0) {
            winner.innerHTML = `${data.player1.name} Winnnnnnnn!`;
            item.update({
              "player2.char": "die.png",
              pchange: pos,
              change: "end",
              turn: 0,
            });
          }

          if (data.change == "end" && data.pchange == pos) {
            setTimeout(endgamess, 1000);
          }
          if (data.change == "turn") {
            // update = newupdate;
            // console.log("???");
            if (data.turn == 1) {
              dx = data.player1.x;
              dy = data.player1.y;
              z = dx + 50;
              zz = dx;
              atk = data.player1.atk;
              setviewtop1();
            } else if (data.turn == 2) {
              dx = data.player2.x;
              dy = data.player2.y;
              z = dx + 50;
              zz = dx;
              atk = data.player2.atk;
              setviewtop2();
            }
          }

          if (
            data.player1.name == undefined &&
            data.player2.name == undefined
          ) {
            item.delete();
          }
        });
      });
  }
}

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
