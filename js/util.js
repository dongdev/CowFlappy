//constant
var ERROR = "an error";
var LOGIN_FAIL = "login fail!!!"
var NOT_LOGIN = "not_authorized"
var SCORE = "SCORE: "
//TODO: Scene name
var SCENE_PRELOAD = "preload";
var SCENE_MENU = "menu";
var SCENE_GAME = "ingame";
//var
//var GAME_WIDTH = window.innerWidth;
//var GAME_HEIGHT = window.innerHeight;
var GAME_WIDTH = 1080;
var GAME_HEIGHT = 1920;
var OPENING = 500;//524
var GAME_ID = 'game-canvas';
var BACKGROUND_STEP = 2;
var CLOUD_STEP = 2;
var BOTTOM_STEP = 4;
var GAME_GRAVITY = 2200;
var WALL_MARGIN_LEFT = 370;
var WALL_VELOCITY = 200;
var WALL_VELOCITY_MAX = 200;
var WALL_VELOCITY_MIN = 400;
//margin
var PLAYER_DEFAULT_Y = 712;
var CLOUD_MARGIN_TOP = 160;
var MEDIUM_MARGIN_TOP = 921;
var ROAD_MARGIN_TOP = 1572;
var JET = 900;
var EASY = 20;
var FONT = {
    font: "86px mijas", fill: '#ffffff'
};

function log(msg) {
    console.log(msg);
}