var monkey , monkey_running;
var banana ,bananasImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);
  
  monkey = createSprite(80,515);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(600,550,1300,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  score = 0;
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  
  background("lightblue");
  
  if(ground.x < 0){
    ground.x = ground.width/2;
  }
  
  if(keyDown("space") && monkey.y >= 370){
    monkey.velocityY = -12;
  }
  
  if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
    score = score + 1;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  drawSprites();
  food();
  spawnObstacles();
  
  if(monkey.isTouching(obstacleGroup)){
    ground.velocityX = 0;
    obstacle.velocityX = 0;
    banana.velocityX = 0;
    textSize(30);
    textFont("Lucida Calligraphy");
    fill("blue");
    text("GAME OVER",200,300);
  }
  
  textSize(18);
  textFont("Comic Sans MS");
  fill("white");
  text("score: "+ score,500,50);
  
  var survivalTime = 0;
  textSize(20);
  fill("black");
  textFont("Franklin Gothic Heavy");
  survivalTime = Math.ceil(frameCount/frameRate);
  text("Survival Time: "+ survivalTime,100,50);
}

function food() {
  if(frameCount % 120 === 0){
    banana = createSprite(520,515);
    banana.scale = 0.1;
    banana.y = Math.round(random(250,450));
    banana.addImage(bananaImage);
    banana.velocityX = -4;
    banana.setLifetime = 100;
    foodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(600,515);
    obstacle.scale = 0.175;
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -4;
    obstacle.setLifetime = 50;
    obstacleGroup.add(obstacle);
  }
}






