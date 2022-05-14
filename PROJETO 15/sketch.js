var playerImg, roadImg,cashImg,diamondsImg,jewelryImg,swordImg;
var player, road, leftBorder, rightBorder;
var left_vel=0;
var right_vel=0;
var max_vel=20;
var acceleration=3;
var deceleration=4;
var counter = 0;
var treasureCollection = 0;
var highscore = 0;
var cashG,diamondsG,jewelryG,swordGroup;

var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  //imagens pré-carregadas
  playerImg = loadAnimation("Runner-1.png","Runner-1.png","Runner-2.png","Runner-2.png");
  roadImg = loadImage("path.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jewelryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("fimdeJogo.png");
}

function setup(){
  createCanvas(400,400);
  //crie sprite aqui
  road = createSprite(200,200);
  player = createSprite(200,300);
  road.addImage(roadImg);
  player.addAnimation("walking",playerImg);
  player.scale = 0.0625;
  leftBorder = createSprite(0,200,20,400)
  rightBorder = createSprite(400,200,20,400)
  leftBorder.visible = false;
  rightBorder.visible = false;
  player.setCollider("circle",0,0,565);
  //player.debug = true;

  cashG=new Group();
  diamondsG=new Group();
  jewelryG=new Group();
  swordGroup=new Group();

}

function draw() {

  if(highscore<=treasureCollection){
    highscore = treasureCollection;
  }

  road.depth = 0
  player.velocityX = right_vel - left_vel;
  
  player.collide(leftBorder);
  player.collide(rightBorder);
  
  if(gameState===PLAY){
  counter = counter + 0.001;
  background(0);
  road.velocityY = 5 + counter;
  console.log(road.velocityY);
  if(road.y>400){
    road.y=200
  }

  if (keyDown("left_arrow")& left_vel<=max_vel){
    left_vel = left_vel+acceleration;
  } else if(left_vel>0){
    left_vel = left_vel-deceleration;
  }
  if (keyDown("right_arrow")& right_vel<=max_vel){
    right_vel = right_vel+acceleration;
  } else if(right_vel>0){
    right_vel = right_vel-deceleration;
  }

  if(right_vel<0){
    right_vel=0;
  }
  if(left_vel<0){
    left_vel=0;
  }

    createCash();
    createDiamonds();
    createjewelry();
    createSword();

    if (cashG.isTouching(player)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(player)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+100;
      
    }else if(jewelryG.isTouching(player)) {
      jewelryG.destroyEach();
      treasureCollection= treasureCollection + 150;
      
    }else if(swordGroup.isTouching(player)) {
     gameState=END;
    
     player.addAnimation("walking",endImg);

      road.velocityY = 0;

    cashG.destroyEach();
    diamondsG.destroyEach();
    jewelryG.destroyEach();
    swordGroup.destroyEach();

    cashG.setVelocityYEach(0);
    diamondsG.setVelocityYEach(0);
    jewelryG.setVelocityYEach(0);
    swordGroup.setVelocityYEach(0);
    
    }
    drawSprites();
  } 

  if(gameState === END){
    player.scale=0.6;
    player.x=width/2;
    player.y=height/2;
    left_vel = right_vel;
    if(keyDown("SPACE")){
      gameState = PLAY;
      treasureCollection = 0;
      player.addAnimation("walking",playerImg);
      player.scale = 0.0625;
      player.y = 300;
      counter = 0;
    }
    drawSprites();

    textSize(20);
    fill(200,0,0);
    textAlign(CENTER,CENTER);
    text("aperte espaço",200,235);
  }

  textSize(20);
  fill(0,200,0);
  textAlign(CENTER,CENTER);
  text("pontos: "+ treasureCollection,player.x,350);
  text("recorde: "+ highscore,200,375);

}

function createCash() {
  if (World.frameCount % 100 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = road.velocityY;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 220 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = road.velocityY;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createjewelry() {
  if (World.frameCount % 310 == 0) {
  var jewelry = createSprite(Math.round(random(50, 350),40, 10, 10));
  jewelry.addImage(jewelryImg);
  jewelry.scale=0.13;
  jewelry.velocityY = road.velocityY;
  jewelry.lifetime = 150;
  jewelryG.add(jewelry);
  }
}

function createSword(){
  if (World.frameCount % 430 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = road.velocityY;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}