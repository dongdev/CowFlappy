var that;
var Login = {
    preload: function () {
        that = this;
        loadResourceLogin();
    },
    create: function () {
        dgame.scale.pageAlignHorizontally = true;
        dgame.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        dgame.physics.startSystem(Phaser.Physics.ARCADE);
        dgame.add.sprite(0, 0, "login_bg");

        var style = {font: "bold 44px mijas", fill: "#ea252a", boundsAlignH: "center", boundsAlignV: "middle"};
        dgame.textMsg = dgame.add.text(0, 0, "", style);
        dgame.textMsg.setTextBounds(0, 906, GAME_WIDTH, 54);

        dgame.add.button(369, 982, "sign_bt", function () {
            soundClick();

            var inputName = dgame.myInput.canvasInput.value();
            var inputId = dgame.myInput2.canvasInput.value();

            if (inputName == null || inputName.length == 0 || inputId == null || inputId.length == 0) {
                dgame.textMsg.setText("Không được để trống!");
                return;
            }

            if (inputId.includes("@")) {
                if (!validateEmail(inputId)) {
                    dgame.textMsg.setText("Email không hợp lệ!");
                    return;
                }
            }
            else if (!validatePhone(inputId)) {
                dgame.textMsg.setText("Số điện thoại không hợp lệ!");
                return;
            }
            playerName = inputName;
            playerId = inputId;
            playerPic = null;
            dgame.state.start(SCENE_MENU);

            log(inputName);
            log(inputId);
        }, this, 1, 0, 1, 0);

        dgame.add.button(243, 1200, "sign_fb_bt", function () {
            soundClick();
            checkLoginFB();
            //var text = prompt("Input text here !!!");
            //log(text);
        }, this, 1, 0, 1, 0);

        //textbox 1 243x645 -> size 603x93
        dgame.myInput = that.createInput(243, 645, "Tên đăng nhập");
        //dgame.myInput.anchor.set(0.5);
        dgame.myInput.canvasInput.value('');
        dgame.myInput.canvasInput.focus();

        //textbox 1 243x780-> size 603x93
        dgame.myInput2 = that.createInput(243, 780, "Email/số điện thoại");
        //dgame.myInput2.anchor.set(0.5);
        //dgame.myInput2.angle = -30;
        dgame.myInput2.canvasInput.value('');

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
    },
    inputFocus: function (sprite) {
        sprite.canvasInput.focus();
    },
    createInput: function (x, y, place_holder) {
        var bmd = dgame.add.bitmapData(603, 93);
        var myInput = dgame.add.sprite(x, y, bmd);

        myInput.canvasInput = new CanvasInput({
            canvas: bmd.canvas,
            fontSize: 40,
            fontFamily: 'mijas',
            fontColor: '#ffffff',
            fontWeight: 'bold',
            width: 603,
            height: 93,
            padding: 8,
            borderWidth: 1,
            borderColor: '#bc965e',
            backgroundColor: '#bc965e',
            borderRadius: 2,
            boxShadow: '1px 1px 0px #fff',
            innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            placeHolder: place_holder,
            placeHolderColor: '#ffffff'
        });
        myInput.inputEnabled = true;
        myInput.input.useHandCursor = true;
        myInput.events.onInputUp.add(that.inputFocus, that);

        return myInput;
    }
}