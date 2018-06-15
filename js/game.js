var STATE = {
    init: init,
    preload: preload,
    create: create,
    update: update,
};

var dgame;

function startGame(FBInstant) {
    dgame = new Phaser.Game(
        GAME_WIDTH,
        GAME_HEIGHT,
        Phaser.CANVAS, // Phaser.AUTO,
        GAME_ID,
        STATE
    );
    dgame.FBInstant = FBInstant;
}

function init() {
    dgame.STOPING = true;
    dgame.GAMEOVER = false;
}
function preload() {
    loadResource();
}

function create() {
    //background
    dgame.scale.pageAlignHorizontally = true;
    dgame.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    //init physics
    dgame.physics.startSystem(Phaser.Physics.ARCADE);
    dgame.physics.arcade.gravity.y = GAME_GRAVITY;

    //GAME.background = GAME.add.tileSprite(0,0,GAME.world.width, GAME.world.height,"bg");
    dgame.add.sprite(0, 0, "bg");
    dgame.bg_cloud = dgame.add.sprite(0, CLOUD_MARGIN_TOP, "bg_cloud");
    dgame.sanvd = dgame.add.sprite(0, MEDIUM_MARGIN_TOP, "bg_san_vd");
    dgame.sanvd1 = dgame.add.sprite(dgame.cache.getImage("bg_san_vd").width, MEDIUM_MARGIN_TOP, "bg_san_vd");

    //wall
    dgame.meats = dgame.add.group();
    dgame.meats_right = dgame.add.group();
    dgame.walls = dgame.add.group();
    for (var i = 0; i < 5; i++) {
        spaw_wall();
    }

    dgame.bg_road = dgame.add.sprite(0, ROAD_MARGIN_TOP, "bg_road");
    dgame.bg_road1 = dgame.add.sprite(dgame.bg_road.width, dgame.bg_road.y, "bg_road");
    dgame.physics.arcade.enableBody(dgame.bg_road, dgame);
    dgame.physics.arcade.enableBody(dgame.bg_road1, dgame);
    dgame.bg_road.body.allowGravity = false;
    dgame.bg_road1.body.allowGravity = false;
    dgame.bg_road.body.immovable = true;
    dgame.bg_road1.body.immovable = true;

    dgame.bg_top = dgame.add.sprite(0, 0, "bg_top");
    dgame.bg_top.inputEnabled = true;
    dgame.bt_sound = dgame.add.sprite(32, 32, "bt_sound");
    dgame.bt_sound.frame = 0;
    dgame.bt_sound.inputEnabled = true;
    dgame.bt_sound.input.pixelPerfectOver = true;
    //  Enable the hand cursor
    dgame.bt_sound.input.useHandCursor = true;
    dgame.bt_sound.events.onInputDown.add(function () {
        if (dgame.bt_sound.frame == 0)
            dgame.bt_sound.frame = 1;
        else
            dgame.bt_sound.frame = 0;
    }, dgame);
    dgame.bt_pause = dgame.add.sprite(GAME_WIDTH - 32, 36, "bt_play");
    dgame.bt_pause.frame = 0;
    dgame.bt_pause.anchor.setTo(1, 0);
    dgame.bt_pause.inputEnabled = true;
    dgame.bt_pause.input.pixelPerfectOver = true;
    //  Enable the hand cursor
    dgame.bt_pause.input.useHandCursor = true;
    dgame.bt_pause.events.onInputDown.add(function () {
        if (dgame.bt_pause.frame == 0)
            dgame.bt_pause.frame = 1;
        else
            dgame.bt_pause.frame = 0;
    }, dgame);

    //player
    dgame.player = dgame.add.sprite(GAME_WIDTH / 2, PLAYER_DEFAULT_Y, "player");
    dgame.physics.arcade.enableBody(dgame.player);
    dgame.player.body.allowGravity = false;
    dgame.player.anchor.setTo(0.5, 0);
    dgame.player.body.collideWorldBounds = true;
    dgame.player.body.offset.y = -10;

    //score
    dgame.score = 0;
    dgame.txt_score = dgame.add.text(GAME_WIDTH / 2, 60, SCORE + dgame.score, FONT);
    dgame.txt_score.anchor.setTo(0.5, 0.5);

    //handler touch
    dgame.input.onDown.add(jump, dgame);
    dgame.input.maxPointers = 2;
    dgame.input.multiInputOverride = Phaser.Input.TOUCH_OVERRIDES_MOUSE;


}
function update(delta) {
    move_bg();
    move_wall();
    move_meat();
    collide_meat();
    collide_wall();

    if (!dgame.GAMEOVER)
        dgame.txt_score.setText(SCORE + dgame.score);

}
function jump() {
    if (dgame.GAMEOVER)
        return;
    if (dgame.STOPING) {
        dgame.STOPING = false;
        dgame.player.body.allowGravity = true;
        jump();
        return;
    }
    dgame.player.body.velocity.y -= JET;
}

//TODO: CREATE WALL
function spaw_wall() {
    var y0 = dgame.rnd.integerInRange(960, 1364) - 308;
    var y1 = y0 + OPENING / 2;
    var y2 = y0 - OPENING / 2;
    //get first deal and remove
    while (dgame.walls.getFirstDead()) {
        dgame.walls.remove(dgame.walls.getFirstDead());
    }

    //get last wall
    var x = GAME_WIDTH;
    if (dgame.walls.length > 0) {
        var lastWall = dgame.walls.children[dgame.walls.length - 1];
        if (lastWall != null)
            x = lastWall.x + lastWall.width + WALL_MARGIN_LEFT;
    }
    var wall1 = dgame.walls.create(x, y1, "wall");
    var wall2 = dgame.walls.create(x, y2, "wall");
    //add physic
    dgame.physics.arcade.enableBody(wall1);
    dgame.physics.arcade.enableBody(wall2);
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

    //TODO: Meat center
    var meat = dgame.meats.getFirstDead();
    if (!meat) {
        meat = dgame.meats.create(0, 0, "meat");
        dgame.physics.arcade.enableBody(meat);
        meat.body.allowGravity = false;
        meat.body.offset.setTo(30, 30);
    }
    var yMeat = y1 - OPENING / 2 - meat.height / 2;
    var xMeat = x + wall1.width / 2 - meat.width / 2;
    meat.reset(xMeat, yMeat);

    //TODO: Meat right
    var item = dgame.rnd.integerInRange(-2, 2);
    if (item == 1 || item == 2) {
        var nextMeat = dgame.meats_right.getFirstDead();
        if (!nextMeat) {
            if (item == 1)
                item = "ball";
            else
                item = "coca";
            nextMeat = dgame.meats_right.create(0, 0, item);
            dgame.physics.arcade.enableBody(nextMeat);
            nextMeat.body.allowGravity = false;
            nextMeat.body.offset.setTo(30, 30);
        }
        yMeat = dgame.rnd.integerInRange(200, GAME_HEIGHT - nextMeat.height - 200);
        xMeat = x + wall1.width + WALL_MARGIN_LEFT / 2 - nextMeat.width / 2;
        nextMeat.reset(xMeat, yMeat);
    }

    if (OPENING > 340)
        OPENING -= 10;
}

//TODO:MOVE
function move_wall() {
    var spawWall = false;
    dgame.walls.forEachAlive(function (wall) {
        wall.body.velocity.x = dgame.STOPING ? 0 : -WALL_VELOCITY;
        if (wall.x + wall.width < dgame.world.bounds.left) {
            wall.kill();
            //wall.destroy();
            if (dgame.walls.countLiving() % 2 == 0) {
                spawWall = true;
            }
        }
        else if (!wall.collected && wall.x < dgame.player.x) {
            dgame.score += .5;
            wall.collected = true;
        }
    })
    if (spawWall) {
        spaw_wall();
    }
}
function move_meat() {
    dgame.meats.forEachAlive(function (meat) {
        meat.body.velocity.x = dgame.STOPING ? 0 : -WALL_VELOCITY;
        if (meat.x + meat.width < dgame.world.bounds.left) {
            meat.kill();
        }
    });
    dgame.meats_right.forEachAlive(function (meat) {
        meat.body.velocity.x = dgame.STOPING ? 0 : -WALL_VELOCITY;
        if (meat.x + meat.width < dgame.world.bounds.left) {
            meat.kill();
        }
    });
}
function move_bg() {
    if (!dgame.STOPING) {
        //TODO: road
        if (0 > dgame.bg_road.x + dgame.bg_road.width) {
            dgame.bg_road.x = dgame.bg_road1.x + dgame.bg_road.width - BOTTOM_STEP;
        }
        else {
            dgame.bg_road.x -= BOTTOM_STEP;
        }
        //road 1
        if (0 > dgame.bg_road1.x + dgame.bg_road.width) {
            dgame.bg_road1.x = dgame.bg_road.x + dgame.bg_road.width - BOTTOM_STEP;
        }
        else {
            dgame.bg_road1.x -= BOTTOM_STEP;
        }
        //TODO: san vd
        if (0 > dgame.sanvd.x + dgame.sanvd.width) {
            dgame.sanvd.x = dgame.sanvd1.x + dgame.sanvd.width - BACKGROUND_STEP;
        }
        else {
            dgame.sanvd.x -= BACKGROUND_STEP;
        }
        //san vd1
        if (0 > dgame.sanvd1.x + dgame.sanvd1.width) {
            dgame.sanvd1.x = dgame.sanvd.x + dgame.sanvd1.width - BACKGROUND_STEP * 2;
        }
        else {
            dgame.sanvd1.x -= BACKGROUND_STEP;
        }
    }

    //move cloud
    if (dgame.bg_cloud.x + dgame.bg_cloud.width < 0)
        dgame.bg_cloud.x = GAME_WIDTH;
    else
        dgame.bg_cloud.x -= CLOUD_STEP;
}

//TODO: check collide
function collide_meat() {
    dgame.physics.arcade.collide(dgame.player, dgame.meats, function (player, meat) {
        meat.kill();
        dgame.score += 1;
        dgame.player.body.velocity.x = 0;
    }, null, dgame);

    dgame.physics.arcade.collide(dgame.player, dgame.meats_right, function (player, meat) {
        meat.kill();
        dgame.score += 2;
        dgame.player.body.velocity.x = 0;
    }, null, dgame);
}

function collide_wall() {
    //collide
    if (dgame.player.body.bottom >= dgame.world.bounds.bottom || dgame.player.body.top <= dgame.world.bounds.top) {
        stop_game();
    }
    dgame.physics.arcade.collide(dgame.player, dgame.walls, function (player, wall) {
        stop_game();
    }, null, dgame);

    //
    dgame.physics.arcade.collide(dgame.player, dgame.bg_road, function () {
        stop_game();
    }, null, dgame);
    dgame.physics.arcade.collide(dgame.player, dgame.bg_road1, function () {
        stop_game();
    }, null, dgame);
}

//TODO: change game state
function restart_game() {
    OPENING = 524;
    dgame.STOPING = false;
    dgame.GAMEOVER = false;
    jump();
    dgame.player.x = GAME_WIDTH / 2;
    dgame.player.y = PLAYER_DEFAULT_Y;
    dgame.meats.callAll("kill");
    dgame.meats_right.callAll("kill");
    dgame.walls.callAll("kill");
    for (var i = 0; i < 5; i++) {
        spaw_wall();
    }
}

function stop_game() {
    if (dgame.STOPING)
        return;
    dgame.score = 0;
    dgame.STOPING = true;
    dgame.player.body.velocity.x = 0;
    dgame.player.body.velocity.y = 0;
    dgame.GAMEOVER = true;
    showMessageBox("GAME OVER", 600, 600);
    //game.player.body.allowGravity = false;
}

//TODO: dialog
function showMessageBox(text, w, h) {
    console.log("game over");
    //just in case the message box already exists
    //destroy it
    if (dgame.msgBox) {
        dgame.msgBox.destroy();
    }
    var msgBox = dgame.add.group();
    var back = dgame.add.sprite(0, 0, "boxBack");
    var closeButton = dgame.add.sprite(0, 0, "closeButton");
    var text1 = dgame.add.text(0, 0, text);
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
    closeButton.y = back.height - closeButton.height * 1.5;
    //enable the button for input
    closeButton.inputEnabled = true;
    closeButton.input.pixelPerfectOver = true;
    closeButton.input.useHandCursor = true;
    //add a listener to destroy the box when the button is pressed
    closeButton.events.onInputDown.add(hideBox, this);

    //set the message box in the center of the screen
    msgBox.x = dgame.width / 2 - msgBox.width / 2;
    msgBox.y = dgame.height / 2 - msgBox.height / 2;
    //
    //set the text in the middle of the message box
    text1.x = back.width / 2 - text1.width / 2;
    text1.y = back.height / 2 - text1.height / 2;
    //make a state reference to the messsage box
    dgame.msgBox = msgBox;

    // game.load.crossOrigin = true;
    /*dgame.load.crossOrigin = "Anonymous"
     dgame.load.json('json', "http://apidev.footballtip.live:8028/incoming/inithomepage?version=1.0.0&platform=android", true);
     //game.load.image("boom", "http://cmsdev.footballtip.live:8028/uploads/2018/06/12/a6b2943dba002c09bb52fe88d52db157_bannerwc.jpg", true);
     dgame.load.onFileComplete.add(function (progress, key, success, total_loaded_files, total_files) {
     console.log(key);
     if (key == "boom") {
     dgame.add.sprite(0, 0, "boom");
     }
     else if (key == "json") {
     console.log(dgame.cache.getJson("json"));
     }

     });*/
    dgame.load.start();

    //var url = "http://apidev.footballtip.live:8028/incoming/inithomepage?version=1.0.0&platform=android";
    //$.ajax({
    //    url: url,
    //    data: null,
    //    dataType: 'jsonp',
    //    complete: function () {
    //        alert(this.url)
    //    },
    //    success: function (xml) {
    //        alert(xml)
    //    }
    //});
}

function hideBox() {
    //destroy the box when the button is pressed
    console.log("hide boxx");
    dgame.msgBox.destroy();
    restart_game();
}

