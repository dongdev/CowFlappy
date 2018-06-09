var STATE = {
  init: init,
  preload: preload,
  create: create,
  update: update,
};
var GAME_WIDTH = 1080;
var GAME_HEIGHT = 1920;
var JET = 420;
var OPENING = 200;
var GAME_ID = 'game-canvas';
var BACKGROUND_STEP = 1;
var CLOUD_STEP= 2;
var GAME_GRAVITY = 900;

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
function init() {

}
function preload (){
  game.load.image("bg","assets/imgs/bg.png");
  game.load.image("player","assets/imgs/ch_gogi.png");
  game.load.image("bg_cloud","assets/imgs/cloud.png");
  game.load.image("wall","assets/imgs/hut-mui.png");
  game.load.image("meat","assets/imgs/meat.png");
  game.load.image("bg_medium","assets/imgs/medium.png");
  game.load.image("bg_road","assets/imgs/road.png");
}

function create() {
  //background
  game.scale.pageAlignHorizontally = true;
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  //GAME.background = GAME.add.tileSprite(0,0,GAME.world.width, GAME.world.height,"bg");
  game.add.sprite(0,0,"bg");
  game.bg_cloud = game.add.sprite(0,100,"bg_cloud");
  game.bg_medium = game.add.sprite(0,0,"bg_medium");
  game.bg_road =game.add.sprite(0,0,"bg_road");
  game.bg_road1 = game.add.sprite(0,0,"bg_road");
  game.bg_road.reset(0,GAME_HEIGHT - game.bg_road.height);
  game.bg_road1.reset(game.bg_road.width , game.bg_road.y);
  game.bg_medium.reset(0,GAME_HEIGHT - game.bg_road.height - game.bg_medium.height - 100);

  //init physics
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.gravity.y = GAME_GRAVITY;

  //player
  game.player =  game.add.sprite(GAME_WIDTH/2 , GAME_HEIGHT/2,"player");
  game.physics.arcade.enableBody(game.player);
  game.player.body.allowGravity = true;
  game.player.body.collideWorldBounds= true;

  //handler touch
  game.input.onDown.add(jump,game);
}
function update (delta){
  move_bg();
}

function jump() {
  game.player.body.velocity.y -= 900;
}

function move_bg()
{
  //move road
  if(0 > game.bg_road.x  +  game.bg_road.width )
  {
    game.bg_road.x = game.bg_road.width - BACKGROUND_STEP * 2;
  }
  else
  {
    game.bg_road.x -= BACKGROUND_STEP;
  }
  //road 1
  if(0 > game.bg_road1.x  +  game.bg_road.width )
  {
    game.bg_road1.x = game.bg_road.width- BACKGROUND_STEP * 2;
  }
  else
  {
    game.bg_road1.x -= BACKGROUND_STEP;
  }

  //move cloud
  if(game.bg_cloud.x  +  game.bg_cloud.width < 0)
    game.bg_cloud.x = GAME_WIDTH;
  else
    game.bg_cloud.x -= CLOUD_STEP;
}
