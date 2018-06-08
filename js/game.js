var STATE = {
  init: init,
  preload: preload,
  create: create,
  update: update,
};
var GAME_WIDTH = 800;
var GAME_HEIGHT = 640;
var JET = 420;
var OPENING = 200;
var GAME_ID = 'game-canvas';

var GAME = null;

var game = new Phaser.Game(
  GAME_WIDTH,
  GAME_HEIGHT,
  Phaser.CANVAS, // Phaser.AUTO,
  GAME_ID,
  STATE
);

var GAME_FONT_STYLE = {
  fontSize: '24px',
  fill: '#fff',
  align: 'center'
};

function init()
{
  console.log("init function called");
  GAME = this;
  GAME.score = 0;
  GAME.isGameOver = false;
  GAME.isGameStarted = false;
}
function preload (){
  GAME.load.spritesheet("player","assets/imgs/player.png",48,48);
  GAME.load.image("bg","assets/imgs/background-texture.png");
  GAME.load.image("wall","assets/imgs/wall.png");
}

function create() {
  //background
  GAME.scale.pageAlignHorizontally = true;
  GAME.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  GAME.background = GAME.add.tileSprite(0,0,GAME.world.width, GAME.world.height,"bg");

  // set physics
  GAME.physics.startSystem(Phaser.Physics.ARCADE);
  GAME.physics.arcade.gravity.y = 900;

  //player
  GAME.player = GAME.add.sprite(GAME.world.centerX,GAME.world.centerY,"player");
  GAME.player.anchor.setTo(0.5,0.5);
  GAME.player.animations.add("fly",[0,1,2], 10, true);
  GAME.physics.arcade.enableBody(GAME.player);
  GAME.player.body.collideWorldBounds= true;
  GAME.player.body.allowGravity = true;

  //wall
  GAME.walls = GAME.add.group();

  //text ingame
  GAME.text1 = GAME.add.text(GAME.world.width/2,50,"Box Jump" , GAME_FONT_STYLE);
  GAME.text1.anchor.setTo(0.5,0);

  GAME.textScore = GAME.add.text(GAME.world.centerX + 100 , 50,"0" , GAME_FONT_STYLE);

  GAME.wallsTimer = GAME.game.time.events.loop(5000, spawnWalls , GAME);
  GAME.wallsTimer.timer.start();

  GAME.input.onDown.add(jump,GAME);

}

function gameOver()
{
  GAME.text1.setText("GAME OVER");
  GAME.isGameOver = true;
  GAME.walls.forEachAlive(function(wall){
    wall.body.velocity.x = 0;
  });
  GAME.player.frame = 3;
  GAME.player.body.velocity.x = 0;
  GAME.player.body.velocity.y = 0;
  GAME.background.autoScroll(0, 0);
}

function spawnWalls()
{
  if(!GAME.isGameStarted || GAME.isGameOver)
      return;
  var y = GAME.rnd.integerInRange(GAME_HEIGHT * 0.3 , GAME_HEIGHT*0.7);
  spawnWall(y);
  spawnWall(y , true);
}

function spawnWall(y,flipped)
{
    var y1;
    if(flipped)
        y1 = y - OPENING /2;
    else
        y1 = y + OPENING/2;

    //var wall = GAME.walls.create(GAME_WIDTH, y + (flipped ? - OPENING : OPENING) ,"wall");
    var wall = GAME.walls.create(GAME_WIDTH, y1 ,"wall");
    wall.scored = false;
    GAME.physics.arcade.enableBody(wall);
    wall.body.velocity.x = -50;
    wall.body.allowGravity = false;
    wall.body.immovable = true;
    if(flipped)
    {
      wall.scale.y =-1;
      wall.body.offset.y = -wall.body.height;
    }
}

function update (delta){

    if(GAME.isGameStarted)
    {
      if(GAME.player.body.velocity.y < -20 || GAME.isGameOver)
      {
        GAME.player.frame = 3;
      }
      else {
        GAME.player.animations.play("fly");
      }
      if(!GAME.isGameOver)
      {
        //collide
        if(GAME.player.body.bottom >= GAME.world.bounds.bottom || GAME.player.body.top <= GAME.world.bounds.top)
        {
          gameOver();
        }
        GAME.physics.arcade.collide(GAME.player, GAME.walls, function(wall){
          console.log("ping ping");
          gameOver();
        }, null, GAME);

        GAME.walls.forEachAlive(function(wall){
          if(wall.x + wall.width < GAME.world.bounds.left)
            wall.kill();
          else if(!wall.scored && wall.x < GAME.player.x)
          {
            wall.scored = true;
            GAME.score += 0.5;
            console.log(GAME.score);
            GAME.textScore.setText(GAME.score +"");
          }
        });
      }
    }
    else {
      if(!GAME.isGameOver)
      {
        GAME.player.y = GAME.world.centerY;
        GAME.player.body.velocity.y = 0
      }
    }
}

function jump() {
  if(!GAME.isGameStarted)
  {
    GAME.isGameStarted = true;
  }
  if(GAME.isGameOver)
  {
    GAME.player.y = GAME.world.centerY;
    GAME.score = 0;
    GAME.isGameOver = false;
    GAME.walls.removeAll();
    GAME.textScore.setText(0);
    GAME.text1.setText("Box Jump");

  }
  GAME.background.autoScroll(- 150, 0);
  GAME.player.body.velocity.y = -JET;
}
