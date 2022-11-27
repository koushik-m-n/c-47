var bg,bgImg
var bottomGround
var topGround
var balloon,balloonImg
var obstacleTop
var obsTop1,obsTop2
var obstacleBottom
var obsBottom1,obsBottom2,obsBottom3
var gameOver,gameOverImg
var restart,restartImg
var score=0
var PLAY=1
var END=0
var gameState=PLAY

function preload(){
    bgImg=loadImage("assets/bg.png")
    balloonImg=loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
    obsTop1=loadImage("assets/obsTop1.png")
    obsTop2=loadImage("assets/obsTop2.png")
    obsBottom1=loadImage("assets/obsBottom1.png")
    obsBottom2=loadImage("assets/obsBottom2.png")
    obsBottom3=loadImage("assets/obsBottom3.png")
    gameOverImg=loadImage("assets/gameOver.png")
    restartImg=loadImage("assets/restart.png")

}

function setup(){
    createCanvas(400,400)
    bg=createSprite(165,485,1,1)
    bg.addImage(bgImg)
    bg.scale=1.3

    bottomGround=createSprite(200,390,800,20)
    bottomGround.visible=false

    topGround=createSprite(100,200,800,20)
    topGround.visible=false

    balloon=createSprite(100,200,20,50)
    balloon.setAnimation("balloon",balloonImg)
    balloon.scale=0.2
    balloon.debug=true

    topObstaclesGroup=new Group()
    bottomObstaclesGroup=new Group()

    barGroup=new Group()

    gameOver=createSprite(220,200)
    gameOver.addImage(gameOverImg)
    gameOver.scale=0.5
    gameOver.visible=false

    restart=createSprite(220,240)
    restart.addImage(restartImg)
    restart.scale=0.5
    restart.visible=false

}

function draw(){

    backgroundColour("black")

    if (gameState===PLAY){
        if(keyDown("space")){
            balloon.velocityY=-6

        }
        balloon.velocityY=balloon.velocityY+2

        Bar()
        spawnObstaclesTop()
        spawnObstaclesBottom()

        if(topObstaclesGroup.isTouching(balloon)||bottomObstaclesGroup.isTouching(balloon)||balloon.isTouching(topGround)||balloon.isTouching(bottomGround)){
          gameState=END
        }
    }
    if(gameState===END){
    gameOver.visible=true
    gameOver.depth=gameOver.depth+1
    restart.visible=true
    restart.depth=restart.depth+1

    balloon.velocityX=0
    bolloon.velocityY=0

    topObstaclesGroup.setVelocityXEach(0)
    bottomObstaclesGroup.setVelocityXEach(0)
    barGroup.setVelocityXEach(0)

    topObstaclesGroup.setLifetimeEach(-1)
    bottomObstaclesGroup.setLifetimeEach(-1)
    balloon.y=200
    }


    drawSprites()
}
