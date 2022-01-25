var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var gameOverImg;

var pinkCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("Capturar 5.PNG","Capturar 6.PNG","Capturar 7.PNG","Capturar 8.PNG");
  mainRacerImg2= loadAnimation("Capturar 5.PNG");
  
  oppPink1Img = loadAnimation("cachorro.png","cachorro1.png","cachorro2.png","cachorro3.png");
  oppPink2Img = loadAnimation("cachorro.png");
  
  
  gameOverImg = loadImage("gameOver.png");
}

function setup(){
  
createCanvas(1200,300);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
//set collider for mainCyclist

//mainCyclist.setCollission("rectangle",0,0,40,40);
mainCyclist.setCollider("rectangle",0,0,40,40);
//mainCyclist.setCollission("rectangle",0,0,40,40,50);
//mainCyclist.setCollider("rectangle",0,0,40,40,50);

  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
pinkCG = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
    //code to reset the background
    if(path.x < 0 ){
      path.x = width/2;
    }
    
      //code to play cycle bell sound
    if(keyDown("space")) {
      cycleBell.play();
    }
    
    //creating continous opponent player
    var select_oppPlayer = Math.round(random(1,3));
  
    if (World.frameCount % 150 == 0) {
      if (select_oppPlayer == 1) {
        pinkCyclists();
  
      }
    }
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("cachorro.png",oppPink2Img);
    }
    
 } else if (gameState === END) 
    {
      gameOver.visible = true;
    
      textSize(20);
      fill(255);
      text("Press Up Arrow to Restart the game!", 500,200);
    
      path.velocityX = 0;
      mainCyclist.velocityY = 0;
      mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
    
      pinkCG.setVelocityXEach(0);
      pinkCG.setLifetimeEach(-1);
      
      // if(keyDown("UP_ARROW")) {
      //   reset;
      // }

      // if(key("UP_ARROW")) {
      //   reset();
      // }

      // if(keyDown()) {
      //   reset();
      // }

      if(keyDown("UP_ARROW")) {
        reset();
      }
    }
}

function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  pinkCG.destroyEach();
  
  distance = 0;
 }