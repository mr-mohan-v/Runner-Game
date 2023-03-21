var stage = document.getElementById('box'), 
     ctx = stage.getContext('2d'),
     x = 10,
     y = 550, 
     wid = 50,
     hei = 50,
     color = '#FF0000',
     velx = 1,
     startbtn = document.getElementById('button'),
     obsx,obsy,obsw,obsh,
     dist = 0;
function drawRect(x,y,wid,hei,color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, wid, hei); 
}
drawRect(0,0,1525,150,'#211F1F');
drawRect(0,600,1525,150,'#211F1F');
drawRect(10,550,50,50,'#FF0000');
if( localStorage.getItem("highscore")){
  document.getElementById("highscores").innerHTML = localStorage.getItem("highscore");
}
startbtn.addEventListener("click",function start(){
  stage.onclick = function(event){
  jump();
  } 
  window.onkeydown = function(event) {
    var key = event.keyCode;
    if(key === 32){
       jump();
    }
  }
  function jump(){
    if(y === 550){ 
       y = 150;
    }
    else if(y === 150){
       y = 550;
    }
    ctx.clearRect(0, 150, 1525, 450);
    drawRect(x,y,wid,hei,'#FF0000');
  } 
  setInterval(function move(){
    if(x < 1450){
    x = x + velx;
    dist = dist + velx;
    ctx.clearRect(0, 150, 1525, 450);
    drawRect(x,y,wid,hei,'#FF0000');
    chk();
    }
    x = x+ velx;
    dist = dist + velx;
  },10);
  setInterval(function reset(){
    if(x >= 1450){
      x=10;
      ctx.clearRect(0, 150, 1525, 450);
      drawRect(x,y,wid,hei,'#FF0000');
      drawRect(0,600,1525,150,'#211F1F');
      drawRect(0,0,1525,150,'#211F1F');
      holes();
      if(velx < 10){
        velx = velx + 0.1;   
      } 
    }
  },10);
  function holes(){
    obsx = randnum(100,1000);
    var obsys = [600,0];
    obsy = obsys[randnum(0,1)];
    obsh = 150;
    obsw = randnum(80,200);
    drawRect(obsx,obsy,obsw,obsh,"#808080");
  }
  function chk(){
    if (y+50 == obsy || y-150 == obsy){
      if(x+25 >= obsx && x +25 <= obsx + obsw){
        dist = Math.floor(dist);
        alert("Game over");
        alert("Your score:" + dist);
        chkscore();
        window.location.reload();   
      }
    } 
  }
  function chkscore(){
    var highscore; 
    if(document.getElementById("highscores").innerHTML){
      localStorage.setItem("highscore",document.getElementById("highscores").innerHTML);
      highscore = JSON.parse(localStorage.getItem("highscore"));
    }
    else{
      highscore = null; 
    }
    if(highscore !== null){
      if(dist > highscore){
        localStorage.setItem("highscore",dist);
      }
    }
    else{
      localStorage.setItem("highscore",dist);
    }
  }
  function randnum(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
  }
},{once: true});