var monkey, monkey_running, monkey_go;
var banana, banana_image, obstacle, obstacle_image
var foodgroup, enemygroup;
var score, ground, time;
var PLAY = 1
var END = 0
var gameState = PLAY;
var bg

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  bg=loadImage("Frest.jpg")
  banana_image = loadImage("banana.png");
  obstacle_image = loadImage("obstacle.png");
  monkey_go = loadAnimation("sprite_0.png");
}



function setup() {
  createCanvas(windowWidth, 500)
  score = 0


  monkey = createSprite(100, 400, 10, 10)
  monkey.addAnimation("running", monkey_running);
  monkey.velocityX=6+(score/4)
  monkey.addAnimation("ded", monkey_go)
  monkey.scale = 0.15

 
  
  

  foodgroup = createGroup();
  enemygroup = createGroup();
}


function draw() {
  background(bg);
  ground = createSprite(0, 450, 100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, 10)
  ground.visible=true
  console.clear()
  fakeGround=createSprite(monkey.x,450,windowWidth*2,10)

  monkey.velocityY = monkey.velocityY + 0.6
  camera.position.x=monkey.x+(windowWidth/2)-50
  monkey.collide(fakeGround)
  

  if (gameState === PLAY) {
    
    if (keyDown("space") && monkey.y > 350) {
      monkey.velocityY = -25
    }
    if (keyDown("down") && monkey.y < 410) {
      monkey.velocityY = 15
    }
    if (frameCount % 125 === 0) {
      banana = createSprite(monkey.x+windowWidth, Math.random(100,200), 10, 10)
      banana.scale = 0.15
      banana.addImage(banana_image)
      banana.lifetime = 900
      foodgroup.add(banana)
    }
    if (monkey.isTouching(foodgroup)) {
      score = score + 10
      foodgroup.destroyEach();
    }
    if (frameCount % 200 === 0) {
      obstacle = createSprite(monkey.x+windowWidth, 350, 10, 10)
     
      obstacle.scale = 0.45
      obstacle.debug = false
      
      obstacle.collide(ground);
      obstacle.addImage(obstacle_image)
      obstacle.lifetime = 900
      enemygroup.add(obstacle)
      enemygroup.setColliderEach("rectangle", 0, 0, 500, 400)
    }
    if (monkey.isTouching(enemygroup)) {
      monkey.changeAnimation("ded", monkey_go);
      gameState = END

    }
  }
  if (gameState === END) {
    enemygroup.setLifetimeEach(-1);
    foodgroup.setLifetimeEach(-1);

    monkey.velocityX=0
    textSize(45)
    fill("white")
    text("Game Over", monkey.x+500, 200)
    text("R to restart", monkey.x+500, 275)
    if (keyDown("r")) {
      Reset();
    }
  }
  drawSprites();
  fill(0)
  stroke(0)
  textSize(20)

  
  text("score=" + score, monkey.x+60, 30)

}

function Reset() {

  gameState=PLAY
  monkey.changeAnimation("running",monkey_running)
 
  enemygroup.destroyEach();
  foodgroup.destroyEach();
  
  score=0
}