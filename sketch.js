END=1;
PLAY=0;
var gameState= PLAY;
var deaths=0;
var monkey, monkey_walking,monkey_stopped;
var banana, bananaImage; 
var obstacle,obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var b=0;
var rockdestroyed;
var road;
var survivalTime;
function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  
  monkey_stopped=loadAnimation("sprite_0.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  
  FoodGroup=new Group();
  obstacleGroup=new Group();
}



function setup() {
createCanvas(600,600)
monkey=createSprite(50,500) 
 monkey.addAnimation("walking",monkey_running)
  monkey.addAnimation("stopped",monkey_stopped)
  monkey.scale=0.10
  
  road=createSprite(10,530,1200,10)
  road.velocityX=-5;

}


function draw() {
background("white")

 
 if(road.x<0){
   road.x=road.width/2;
 } 
   monkey.collide(road);
  
 if(gameState===PLAY) {
 if(keyDown("space")||mousePressedOver(monkey)||keyDown("enter")){
    monkey.velocityY=-12;
    
  }
   monkey.velocityY=monkey.velocityY+1;
      survivalTime=Math.ceil(frameCount/frameRate())
   
     if(FoodGroup.isTouching(monkey)) {
    FoodGroup.destroyEach();
    score=score+5;
    b=b+1; 
  
  }  
  if(obstacleGroup.isTouching(monkey)) {
    obstacleGroup.destroyEach(); 
     deaths=deaths+1;
  } 
   if(deaths===20){ 
    gameState=END; 
   }
 }
else if(gameState===END){
  obstacleGroup.setVelocityEach(0,0)
  FoodGroup.setVelocityEach(0,0)
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  monkey.changeAnimation("stopped",monkey_stopped)
  textSize(20)
  fill("red")
 
  b=0;
  score=0;
  survivalTime=0;
}
  
  

   
  obstacles();  
  food();
 //console.log(bananataken)
  drawSprites();
    fill("black")
  textSize(25)
  text("Score: "+score,450,50)
   
  
  
  fill("red")
  textSize(20)
  text("Survival Time: "+survivalTime,200,50)
   
  fill("yellow")
  text("Banana Taken =  "+b,300,100)
  
  fill("pink")
  text("No. of Times hit  by a rock : "+deaths,200,200)
}
  
function food(){
 
 if(frameCount%100===0) {
   
  banana=createSprite(600,Math.round(random(120,300)))
  banana.addImage(bananaImage) 
  banana.scale=0.10;
  banana.velocityX=-6-score/10;
  banana.lifetime=300;
   FoodGroup.add(banana)   
 }     
}

function obstacles(){
  if(frameCount%200==0){
  obstacle=createSprite(Math.round(random(200,600)),490)
  obstacle.addImage(obstacleImage)
  obstacle.scale=0.20;
  obstacle.velocityX=-4-score/10;
  obstacle.lifetime=300;
  obstacleGroup.add(obstacle);
  } 
  
}
