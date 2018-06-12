var STATE = {
    init: init,
    preload: preload,
    create: create,
    update: update,
};
var GAME_WIDTH = 1180;
var GAME_HEIGHT = 1920;
var OPENING = 524;
var GAME_ID = 'game-canvas';
var BACKGROUND_STEP = 1;
var CLOUD_STEP = 2;
var GAME_GRAVITY = 1900;
var WALL_MARGIN_LEFT = 270;
var WALL_VELOCITY = 200;
var ROAD_MARGIN_TOP = 1416;
var LAND_MARGIN_TOP = 1624;
var JET = 900;

var game = new Phaser.Game(
    GAME_WIDTH,
    GAME_HEIGHT,
    Phaser.CANVAS, // Phaser.AUTO,
    GAME_ID,
    STATE
);

var FONT = {
    font: "Bold 86px Arial", fill: '#ffffff'
};
function init() {
    game.STOPING = true;
    game.GAMEOVER = false;
}
function preload() {
    game.load.image("bg", "assets/imgs/bg.png");
    game.load.image("player", "assets/imgs/ch_gogi.png");
    game.load.image("bg_cloud", "assets/imgs/cloud.png");
    game.load.image("wall", "assets/imgs/hut-mui.png");
    game.load.image("meat", "assets/imgs/meat.png");
    game.load.image("bg_medium", "assets/imgs/medium.png");
    game.load.image("bg_road", "assets/imgs/road.png");
    game.load.image("bg_land", "assets/imgs/land.png");
    game.load.image("closeButton", "assets/imgs/closeButton.png");
    game.load.image("boxBack", "assets/imgs/boxBack.png");
}

function create() {
    //background
    game.scale.pageAlignHorizontally = true;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    //init physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = GAME_GRAVITY;

    //GAME.background = GAME.add.tileSprite(0,0,GAME.world.width, GAME.world.height,"bg");
    game.add.sprite(0, 0, "bg");
    game.bg_cloud = game.add.sprite(0, 100, "bg_cloud");
    game.bg_medium = game.add.sprite(0, 0, "bg_medium");

    game.bg_road = game.add.sprite(0, ROAD_MARGIN_TOP, "bg_road");
    game.bg_road1 = game.add.sprite(game.bg_road.width, game.bg_road.y, "bg_road");

    game.bg_medium.reset(0, GAME_HEIGHT - game.bg_road.height - game.bg_medium.height - 100);

    //wall
    game.meats = game.add.group();
    game.walls = game.add.group();
    for (var i = 0; i < 5; i++) {
        spaw_wall();
    }

    //land
    game.bg_land = game.add.sprite(0, LAND_MARGIN_TOP, "bg_land");
    game.bg_land1 = game.add.sprite(game.bg_land.width, LAND_MARGIN_TOP, "bg_land");
    game.physics.arcade.enableBody(game.bg_land, game);
    game.physics.arcade.enableBody(game.bg_land1, game);
    game.bg_land.body.allowGravity = false;
    game.bg_land1.body.allowGravity = false;
    game.bg_land.body.immovable = true;
    game.bg_land1.body.immovable = true;

    //player
    game.player = game.add.sprite(GAME_WIDTH / 2, GAME_HEIGHT / 2, "player");
    game.physics.arcade.enableBody(game.player);
    game.player.body.allowGravity = false;
    game.player.anchor.setTo(0.5, 0);
    game.player.body.collideWorldBounds = true;
    game.player.body.offset.y = -10;

    //score
    game.score = 0;
    game.txt_score = game.add.text(GAME_WIDTH / 2, 200, "score:" + game.score, FONT);
    game.txt_score.anchor.setTo(0.5, 0.5);

    //handler touch
    game.input.onDown.add(jump, game);
}
function update(delta) {
    move_bg();
    move_wall();
    move_meat();
    collide_meat();
    collide_wall();

    if (!game.GAMEOVER)
        game.txt_score.setText("score:" + game.score);

}
function jump() {
    if (game.GAMEOVER)
        return;
    if (game.STOPING) {
        game.STOPING = false;
        game.player.body.allowGravity = true;
        jump();
        return;
    }
    game.player.body.velocity.y -= JET;
}

//TODO: CREATE WALL
function spaw_wall() {
    var y0 = game.rnd.integerInRange(960, 1364) - 308;
    var y1 = y0 + OPENING / 2;
    var y2 = y0 - OPENING / 2;
    //get first deal and remove
    while (game.walls.getFirstDead()) {
        game.walls.remove(game.walls.getFirstDead());
    }

    //get last wall
    var x = GAME_WIDTH;
    if (game.walls.length > 0) {
        var lastWall = game.walls.children[game.walls.length - 1];
        if (lastWall != null)
            x = lastWall.x + lastWall.width + WALL_MARGIN_LEFT;
    }
    var wall1 = game.walls.create(x, y1, "wall");
    var wall2 = game.walls.create(x, y2, "wall");
    //add physic
    game.physics.arcade.enableBody(wall1);
    game.physics.arcade.enableBody(wall2);
    //gravity
    wall1.body.allowGravity = false;
    wall2.body.allowGravity = false;
    //
    wall1.body.immovable = true;
    wall2.body.immovable = true;
    //
    wall1.collected = false;
    wall2.collected = false;

    wall2.scale.y = -1;
    wall2.body.offset.y = -wall2.body.height;

    //meat
    // if (game.rnd.integerInRange(-1, 1) == 1) {
    var meat = game.meats.getFirstDead();
    if (!meat) {
        meat = game.meats.create(0, 0, "meat");
        game.physics.arcade.enableBody(meat);
        meat.body.allowGravity = false;
    }

    var yMeat = game.rnd.integerInRange(y1 - meat.height, (y1 - OPENING ) + meat.height);
    var xMeat = x + game.rnd.integerInRange(-WALL_MARGIN_LEFT, WALL_MARGIN_LEFT);
    //meat.body.immovable = true;
    meat.reset(xMeat, yMeat);
    // }
}

//TODO:MOVE
function move_wall() {
    var spawWall = false;
    game.walls.forEachAlive(function (wall) {
        wall.body.velocity.x = game.STOPING ? 0 : -WALL_VELOCITY;
        if (wall.x + wall.width < game.world.bounds.left) {
            wall.kill();
            //wall.destroy();
            if (game.walls.countLiving() % 2 == 0) {
                spawWall = true;
            }
        }
        else if (!wall.collected && wall.x < game.player.x) {
            game.score += .5;
            wall.collected = true;
        }
    })
    if (spawWall) {
        spaw_wall();
    }
}
function move_meat() {
    game.meats.forEachAlive(function (meat) {
        meat.body.velocity.x = game.STOPING ? 0 : -WALL_VELOCITY;
        if (meat.x + meat.width < game.world.bounds.left) {
            meat.kill();
        }
    })
}
function move_bg() {
    if (!game.STOPING) {
        //TODO: road
        if (0 > game.bg_road.x + game.bg_road.width) {
            game.bg_road.x = game.bg_road.width - BACKGROUND_STEP * 2;
        }
        else {
            game.bg_road.x -= BACKGROUND_STEP;
        }
        //road 1
        if (0 > game.bg_road1.x + game.bg_road.width) {
            game.bg_road1.x = game.bg_road.width - BACKGROUND_STEP * 2;
        }
        else {
            game.bg_road1.x -= BACKGROUND_STEP;
        }
        //TODO: land
        if (0 > game.bg_land.x + game.bg_land.width) {
            game.bg_land.x = game.bg_land.width - BACKGROUND_STEP * 2;
        }
        else {
            game.bg_land.x -= BACKGROUND_STEP;
        }
        //road 1
        if (0 > game.bg_land1.x + game.bg_land1.width) {
            game.bg_land1.x = game.bg_land1.width - BACKGROUND_STEP * 2;
        }
        else {
            game.bg_land1.x -= BACKGROUND_STEP;
        }
    }

    //move cloud
    if (game.bg_cloud.x + game.bg_cloud.width < 0)
        game.bg_cloud.x = GAME_WIDTH;
    else
        game.bg_cloud.x -= CLOUD_STEP;
}

//TODO: check collide
function collide_meat() {
    game.physics.arcade.collide(game.player, game.meats, function (player, meat) {
        meat.kill();
        game.score += 2;
        game.player.body.velocity.x = 0;
    }, null, game);
}

function collide_wall() {
    //collide
    if (game.player.body.bottom >= game.world.bounds.bottom || game.player.body.top <= game.world.bounds.top) {
        stop_game();
    }
    game.physics.arcade.collide(game.player, game.walls, function (player, wall) {
        stop_game();
    }, null, game);

    //
    game.physics.arcade.collide(game.player, game.bg_land, function () {
        stop_game();
    }, null, game);
    game.physics.arcade.collide(game.player, game.bg_land1, function () {
        stop_game();
    }, null, game);
}

//TODO: change game state
function restart_game() {
    game.STOPING = false;
    game.GAMEOVER = false;
    jump();
    game.player.x = GAME_WIDTH / 2;
    game.player.y = GAME_HEIGHT / 2;
    game.meats.callAll("kill");
    game.walls.callAll("kill");
    for (var i = 0; i < 5; i++) {
        spaw_wall();
    }
}

function stop_game() {
    if (game.STOPING)
        return;
    game.score = 0;
    game.STOPING = true;
    game.player.body.velocity.x = 0;
    game.player.body.velocity.y = 0;
    game.GAMEOVER = true;
    showMessageBox("GAME OVER", 300, 300);
    //game.player.body.allowGravity = false;
}

//TODO: dialog
function showMessageBox(text, w, h) {
    console.log("game over");
    //just in case the message box already exists
    //destroy it
    if (game.msgBox) {
        game.msgBox.destroy();
    }
    var msgBox = game.add.group();
    var back = game.add.sprite(0, 0, "boxBack");
    var closeButton = game.add.sprite(0, 0, "closeButton");
    var text1 = game.add.text(0, 0, text);
    //set the textfeild to wrap if the text is too long
    //text1.wordWrap = true;
    //make the width of the wrap 90% of the width
    //of the message box
    //text1.wordWrapWidth = w * .9;
    //set the width and height passed
    back.width = w;
    back.height = h;

    //add the elements to the group
    msgBox.add(back);
    msgBox.add(closeButton);
    msgBox.add(text1);

    closeButton.x = back.width / 2 - closeButton.width / 2;
    closeButton.y = back.height - closeButton.height;
    //enable the button for input
    closeButton.inputEnabled = true;
    //add a listener to destroy the box when the button is pressed
    closeButton.events.onInputDown.add(hideBox, this);
    //set the message box in the center of the screen
    msgBox.x = game.width / 2 - msgBox.width / 2;
    msgBox.y = game.height / 2 - msgBox.height / 2;
    //
    //set the text in the middle of the message box
    text1.x = back.width / 2 - text1.width / 2;
    text1.y = back.height / 2 - text1.height / 2;
    //make a state reference to the messsage box
    game.msgBox = msgBox;

    //load json

    game.load.json('json', 'http://phaser.io/version.json');
    game.load.onFileComplete.add(function (key) {
        console.log(key + ' loaded');
        console.log(game.cache.getJson("json"));
        alert(game.cache.getText("json"));

    });
    game.load.crossOrigin = true;
    game.load.start();

}
function hideBox() {
    //destroy the box when the button is pressed
    console.log("hide boxx");
    game.msgBox.destroy();
    restart_game();
}

