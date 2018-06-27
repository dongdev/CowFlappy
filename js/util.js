//constant
var ERROR = "an error";
var LOGIN_FAIL = "login fail!!!"
var NOT_LOGIN = "not_authorized"
var CONNECTED = "connected!!!"
var SCORE = "SCORE: "
//TODO: Scene name
var SCENE_PRELOAD = "preload";
var SCENE_MENU = "menu";
var SCENE_GAME = "ingame";
var SCENE_LOGIN = "login";

//TODO: Save
var UID = "fc_id";
var UNAME = "fc_name"
//var
//var GAME_WIDTH = window.innerWidth;
//var GAME_HEIGHT = window.innerHeight;
var isFNInstant = false;
var DEBUG = false;
var LOG = true;
var SOURCE = ["fbm", "gstand"];
var GAME_WIDTH = 1080;
var GAME_HEIGHT = 1920;
var OPENING = 600;//524
var GAME_ID = 'game-canvas';
var GAME_ID2 = 'game-canvas';//asd//
var SHARE_URL = 'https://gogi.icod.mobi/';//asd//
var APP_ID = 1972872269694359;//asd//
var BACKGROUND_STEP = 2;
var CLOUD_STEP = 2;
var BOTTOM_STEP = 4;
var GAME_GRAVITY = 2200;
var WALL_MARGIN_LEFT = 370;
var WALL_VELOCITY = 200;
var WALL_VELOCITY_MAX = 200;
var WALL_VELOCITY_MIN = 400;
var WALL_SIZE = 3;
//
var playerName = null;
var playerPic = null;
var playerEmail = null;
var playerId = null;
var sessionId = null;
//margin
var PLAYER_DEFAULT_Y = 712;
var CLOUD_MARGIN_TOP = 160;
var MEDIUM_MARGIN_TOP = 921;
var ROAD_MARGIN_TOP = 1572;
var JET = 850;
var EASY = 20;
var FONT = {
    font: "86px mijas", fill: '#ffffff'
};

function log(msg) {
    if (LOG)
        console.log(msg);
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
function validatePhone(phone) {
    var re = /[0][0-9]{9,10}/;
    return re.test(phone);
}
function scaleGame() {
    dgame.scale.pageAlignHorizontally = true;
    dgame.scale.scaleMode = isFNInstant ? Phaser.ScaleManager.EXACT_FIT : Phaser.ScaleManager.SHOW_ALL;
}

