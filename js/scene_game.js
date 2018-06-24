var that;
var yBonus = 0;
var SceneGame = {

    //TODO:MOVE
    move_wall: function (move) {
        var spawWall = false;
        dgame.walls.forEachAlive(function (wall) {
            wall.body.velocity.x = move ? -WALL_VELOCITY : 0;
            if (wall.x + wall.width < dgame.world.bounds.left) {
                wall.kill();
                //wall.destroy();
                if (dgame.walls.countLiving() % 2 == 0) {
                    spawWall = true;
                }
            }
            else if (!wall.collected && wall.x < dgame.player.x) {
                //dgame.score += .5;
                wall.collected = true;
            }
        })
        if (spawWall) {
            that.spaw_wall();
        }
    }
    ,
    move_meat: function (move) {
        dgame.meats.forEachAlive(function (meat) {
            meat.body.velocity.x = move ? -WALL_VELOCITY : 0;
            if (meat.x + meat.width < dgame.world.bounds.left) {
                meat.kill();
            }
        });
        dgame.meats_right.forEachAlive(function (meat) {
            meat.body.velocity.x = move ? -WALL_VELOCITY : 0;
            if (meat.x + meat.width < dgame.world.bounds.left) {
                meat.kill();
            }
        });
    }
    ,
    move_bg: function (move) {
        //TODO: road
        if (move) {
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
    ,

    //TODO: check collide
    collide_meat: function () {
        dgame.physics.arcade.collide(dgame.player, dgame.meats, function (player, meat) {
            //that.move_bonus(meat.x + meat.width / 2, meat.y - meat.height / 2)
            meat.kill();
            dgame.score += 1;
            dgame.player.body.velocity.x = 0;
            soundCoin();

        }, null, dgame);

        dgame.physics.arcade.collide(dgame.player, dgame.meats_right, function (player, meat) {
            that.move_bonus(meat.x + meat.width / 2, meat.y - meat.height / 2);
            meat.kill();
            dgame.score += 2;
            dgame.player.body.velocity.x = 0;
            soundCoin();
        }, null, dgame);
    }
    ,

    collide_wall: function () {
        //collide
        if (dgame.player.body.bottom >= dgame.world.bounds.bottom || dgame.player.body.top <= dgame.world.bounds.top) {
            that.game_over();
        }
        dgame.physics.arcade.collide(dgame.player, dgame.walls, function (player, wall) {
            that.game_over();
        }, null, dgame);

        //
        dgame.physics.arcade.collide(dgame.player, dgame.bg_road, function () {
            that.game_over();
        }, null, dgame);
        dgame.physics.arcade.collide(dgame.player, dgame.bg_road1, function () {
            that.game_over();
        }, null, dgame);
    }
    ,

    //TODO: change game state
    restart_game: function () {
        OPENING = 524;
        dgame.score = 0;
        dgame.STARTED = false;
        dgame.GAMEOVER = false;
        dgame.PAUSE = false;
        dgame.player.x = GAME_WIDTH / 2;
        dgame.player.y = PLAYER_DEFAULT_Y;
        dgame.player.body.allowGravity = false;
        dgame.meats.callAll("kill");
        dgame.meats_right.callAll("kill");
        dgame.walls.callAll("kill");
        for (var i = 0; i < 5; i++) {
            that.spaw_wall();
        }
    }
    ,

    game_over: function () {
        if (!dgame.STARTED)
            return;
        log("stop game")
        dgame.STARTED = false;
        dgame.player.body.velocity.x = 0;
        dgame.player.body.velocity.y = 0;
        dgame.GAMEOVER = true;
        soundCrash();
    }
    ,

    pause_game: function () {
        if (!dgame.STARTED)
            return;

        log("pause click");

        if (!dgame.PAUSE) {
            dgame.bt_pause.frame = 1;
            dgame.PAUSE = true;
            dgame.player.body.velocity.y = 0;
            dgame.player.body.allowGravity = false;
        }
        else {
            dgame.bt_pause.frame = 0;
            dgame.PAUSE = false;
            dgame.player.body.allowGravity = true;
        }
    }
    ,

    init: function () {
        dgame.STARTED = false;
        dgame.GAMEOVER = false;
        dgame.PAUSE = false;
        dgame.dialogEndShow = false;
    }
    ,
    preload: function () {
        that = this;
        loadResourcePlay();
        loadRourceEndGame();
    },

    render: function () {
        if (DEBUG) {
            dgame.debug.body(dgame.player);
            dgame.meats.forEachAlive(function (meat, b) {
                dgame.debug.body(meat);
            });
            dgame.meats_right.forEachAlive(function (meat, b) {
                dgame.debug.body(meat);
            });
        }
    },

    create: function () {
        //init physics
        scaleGame();
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
            that.spaw_wall();
        }

        dgame.bg_road = dgame.add.sprite(0, ROAD_MARGIN_TOP, "bg_road");
        dgame.bg_road1 = dgame.add.sprite(dgame.bg_road.width, dgame.bg_road.y, "bg_road");
        dgame.physics.arcade.enableBody(dgame.bg_road, dgame);
        dgame.physics.arcade.enableBody(dgame.bg_road1, dgame);
        dgame.bg_road.body.allowGravity = false;
        dgame.bg_road1.body.allowGravity = false;
        dgame.bg_road.body.immovable = true;
        dgame.bg_road1.body.immovable = true;
        //top
        dgame.bg_top = dgame.add.sprite(0, 0, "bg_top");
        dgame.bg_top.inputEnabled = true;
        //sound
        dgame.bt_sound = dgame.add.sprite(32, 32, "bt_sound");
        dgame.bt_sound.frame = 0;
        dgame.bt_sound.inputEnabled = true;
        dgame.bt_sound.input.pixelPerfectOver = true;
        dgame.bt_sound.input.useHandCursor = true;
        dgame.bt_sound.events.onInputDown.add(function () {
            if (dgame.bt_sound.frame == 0) {
                dgame.bt_sound.frame = 1;
                mute(true);
            }
            else {
                dgame.bt_sound.frame = 0;
                mute(false);
            }
        }, dgame);
        dgame.bt_sound.frame = dgame.sound.mute ? 1 : 0;
        //pause
        dgame.bt_pause = dgame.add.sprite(GAME_WIDTH - 32, 36, "bt_play");
        dgame.bt_pause.frame = 0;
        dgame.bt_pause.anchor.setTo(1, 0);
        dgame.bt_pause.inputEnabled = true;
        dgame.bt_pause.input.pixelPerfectOver = true;
        //  Enable the hand cursor
        dgame.bt_pause.input.useHandCursor = true;
        dgame.bt_pause.events.onInputDown.add(that.pause_game, dgame);

        //player
        dgame.player = dgame.add.sprite(GAME_WIDTH / 2, PLAYER_DEFAULT_Y, "player");
        dgame.physics.arcade.enableBody(dgame.player);
        dgame.player.body.allowGravity = false;
        dgame.player.anchor.setTo(0.5, 0);
        dgame.player.body.collideWorldBounds = true;
        dgame.player.body.offset.setTo(-10, -10);

        //score
        dgame.score = 0;
        dgame.txt_score = dgame.add.text(GAME_WIDTH / 2, 60, SCORE + dgame.score, FONT);
        dgame.txt_score.anchor.setTo(0.5, 0.5);

        //image bonus
        yBonus = GAME_HEIGHT / 3;
        dgame.img_bonus = dgame.add.sprite(GAME_WIDTH / 2 - dgame.cache.getImage("bonus").width / 2, yBonus, "bonus");
        dgame.img_bonus.anchor.setTo(0.5, 1);
        dgame.img_bonus.visible = false;

        //handler touch
        dgame.input.onDown.add(that.jump, dgame);
        //dgame.input.maxPointers = 2;
        //dgame.input.multiInputOverride = Phaser.Input.TOUCH_OVERRIDES_MOUSE;

        soundBg();
        removeMenuAsset();
    },
    move_bonus: function (x, y) {
        dgame.img_bonus.x = x;
        var t = 2000;

        if (dgame.img_bonus.y === yBonus) {
            dgame.img_bonus.y = y;
            dgame.img_bonus.visible = true;
            dgame.add.tween(dgame.img_bonus).to({
                x: GAME_WIDTH / 2,
                y: 0,
            }, t, Phaser.Easing.Linear.None, true);
            var tween = dgame.add.tween(dgame.img_bonus.scale).to({x: 0.3, y: 0.3}, t, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(function () {
                dgame.img_bonus.y = yBonus;
                dgame.img_bonus.scale.x = 1;
                dgame.img_bonus.scale.y = 1;
                dgame.img_bonus.visible = false;
            }, this)
        }
    }
    ,
    update: function (delta) {
        var move = true;
        if (dgame.GAMEOVER || dgame.PAUSE || !dgame.STARTED)
            move = false;
        that.move_bg(move);
        that.move_wall(move);
        that.move_meat(move);
        that.collide_meat();
        that.collide_wall();

        if (!dgame.GAMEOVER)
            dgame.txt_score.setText(SCORE + dgame.score);
        else {
            if ((dgame.player.y + dgame.player.height >= ROAD_MARGIN_TOP
                || dgame.player.body.velocity.y == 0 && dgame.player.body.touching.down == true)
                && !dgame.dialogEndShow) {
                log("show end game " + dgame.dialogEndShow);
                boxEndGame(dgame.score);
                soundFall();
            }
        }

    }
    ,
    jump: function () {
        var x = dgame.input.activePointer.x;
        var y = dgame.input.activePointer.y;
        if (y < 500)
            return;
        if (dgame.GAMEOVER)
            return;

        if (!dgame.STARTED) {
            dgame.STARTED = true;
            dgame.player.body.allowGravity = true;
            dgame.player.body.velocity.y -= JET;
            var source = isFNInstant ? SOURCE[0] : SOURCE[1];
            if (playerId != null) {
                var pack = JSON.stringify({
                    "id": "gamestart",
                    "player_id": playerId,
                    "display_name": playerName,
                    "avatar": playerPic == null ? "" : playerPic,
                    "source": source
                });
                sendMs(pack);
            }
            return;
        }
        else if (dgame.PAUSE) {
            that.pause_game();
            return;
        }
        dgame.player.body.velocity.y -= JET;
        soundJump();
    }
    ,

    //TODO: CREATE WALL
    spaw_wall: function () {

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
        var wall2 = dgame.walls.create(x, y2 - dgame.cache.getImage("wall1").height, "wall1");
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

        //TODO: Not working 2.6.2
        /*wall2.scale.y = -1;
         wall2.body.offset.y = -wall2.body.height;*/

        //TODO: Meat center
        var meat = dgame.meats.getFirstDead();
        if (!meat) {
            meat = dgame.meats.create(0, 0, "meat");
            meat.anchor.setTo(0.5, 0.5);
            dgame.physics.arcade.enableBody(meat);
            meat.body.allowGravity = false;
            meat.body.setSize(200, 100, 50, 50); //w h x y
        }
        var yMeat = y1 - OPENING / 2;
        var xMeat = x + wall1.width / 2;
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
                nextMeat.anchor.set(0.5, 0.5);
                dgame.physics.arcade.enableBody(nextMeat);
                nextMeat.body.allowGravity = false;
                //nextMeat.body.offset.setTo(-50, -50);
                nextMeat.body.setSize(150, 150, 50, 50); //w h x y
            }
            yMeat = dgame.rnd.integerInRange(250, GAME_HEIGHT - nextMeat.height - 400);
            xMeat = x + wall1.width + WALL_MARGIN_LEFT / 2;
            nextMeat.reset(xMeat, yMeat);
        }

        //change open
        if (OPENING > 340)
            OPENING -= 5;

        //change volocity
        if (dgame.score < EASY) {
            WALL_VELOCITY = WALL_VELOCITY_MAX;
        }
        else {
            if (WALL_VELOCITY < WALL_VELOCITY_MIN)
                WALL_VELOCITY += 5;
        }
    }
}