var Menu = {
    create: function () {
        scaleGame();
        dgame.physics.startSystem(Phaser.Physics.ARCADE);
        var bg = dgame.add.sprite(0, 0, "menu_bg");
        bg.scale.setTo(2);
        dgame.add.sprite(96, 128, "menu_logo");
        var bt_play = dgame.add.button((GAME_WIDTH - dgame.cache.getImage("menu_play").width / 2 ) / 2, 1184, "menu_play", function () {
            dgame.state.start(SCENE_GAME);
        }, this, 1, 0, 1, 0);

        var bt_rank = dgame.add.button(148, 1488, "menu_rank", function () {
            boxRank();
            soundClick();
        }, this, 1, 0, 1, 0);
        var bt_gift = dgame.add.button(444, 1572, "menu_gift", function () {
            boxCartGift();
            soundClick();

        }, this, 1, 0, 1, 0);
        var bt_tut = dgame.add.button(760, 1488, "menu_tutorial", function () {
            boxRule();
            soundClick();
        }, this, 1, 0, 1, 0);

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
    }
}