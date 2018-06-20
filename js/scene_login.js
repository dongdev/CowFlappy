var Login = {
    preload: function () {
        loadResourceLogin();
    },
    create: function () {
        dgame.scale.pageAlignHorizontally = true;
        dgame.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        dgame.physics.startSystem(Phaser.Physics.ARCADE);
        dgame.add.sprite(0, 0, "login_bg");

        dgame.add.button(369, 912, "sign_bt", function () {
            soundClick();
            playerId = "testId123";
            playerName = "User XXX";
            playerPic = null;
            dgame.state.start(SCENE_MENU);
        }, this, 1, 0, 1, 0);

        dgame.add.button(243, 1143, "sign_fb_bt", function () {
            soundClick();
            var text = prompt("Input text here !!!");
            log(text);
        }, this, 1, 0, 1, 0);

        //textbox 1 243x645 -> size 603x93
        //textbox 1 243x780-> size 603x93

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