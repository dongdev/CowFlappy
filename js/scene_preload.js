var that;
var Preload = {
    preload: function () {
        that = this;
        dgame.load.image("davatar", "assets/imgs/davatar.png");
        /*TODO:BUTTON*/
        dgame.load.spritesheet("bt_sound", "assets/imgs/bt_sound.png", 92, 77);
        dgame.load.spritesheet("bt_play", "assets/imgs/bt_playgame.png", 62, 62);
        dgame.load.image("closeButton", "assets/imgs/closeButton.png");

        /*TODO: MENU*/
        dgame.load.image("menu_bg", "assets/imgs/menu_bg.png");
        dgame.load.image("menu_logo", "assets/imgs/logo.png");
        dgame.load.spritesheet("menu_play", "assets/imgs/bt_play.png", 325, 319);
        dgame.load.spritesheet("menu_tutorial", "assets/imgs/bt_huongdan.png", 202, 197);
        dgame.load.spritesheet("menu_gift", "assets/imgs/bt_gio-qua.png", 202, 197);
        dgame.load.spritesheet("menu_rank", "assets/imgs/bt_bxh.png", 199, 197);
        /*TODO: RULE*/
        dgame.load.image("rule_bg", "assets/imgs/rule_bg.png");
        dgame.load.image("bt_close", "assets/imgs/bt_close.png");
        /*TODO: GIFT*/
        dgame.load.image("gift_bg", "assets/imgs/gift_bg.png");
        dgame.load.image("gift_text", "assets/imgs/text-phan-thuong.png");
        /*TODO: RANK*/
        dgame.load.image("rank_bg", "assets/imgs/rank_bg.png");
        dgame.load.image("bt_prev", "assets/imgs/rank_bt_back.png");
        dgame.load.image("bt_next", "assets/imgs/rank_bt_next.png");
        dgame.load.image("rank_bg_temp", "assets/imgs/rank_bg_temp.png");
        /*TODO: CART*/
        dgame.load.image("cart_bg", "assets/imgs/cart_bg.png");

        loadSound();

        dgame.load.onFileComplete.add(function (progress, file_key, success, total_loaded_files, total_files) {
            if (!success)
                return;
            try {
                if (dgame.FBInstant != null) {
                    if (progress < 0)
                        progress = 0;
                    else if (progress > 100)
                        progress = 100;
                    FBInstant.setLoadingProgress(Math.floor(progress));
                }
            }
            catch (e) {
                log(e);
            }
        });
    },

    create: function () {
        if (isFNInstant && dgame.FBInstant != null) {
            dgame.FBInstant.setLoadingProgress(100);
            dgame.FBInstant.startGameAsync().then(function () {
                var contextId = FBInstant.context.getID();
                var contextType = FBInstant.context.getType();
                playerName = FBInstant.player.getName();
                playerPic = FBInstant.player.getPhoto();
                playerId = FBInstant.player.getID();
                log(contextId + "/" + playerName + "/" + playerPic);

                dgame.state.start(SCENE_MENU);
            });
        }
        else {
            dgame.state.start(SCENE_LOGIN);
        }

        socketIO();
    }
}
function loadResourcePlay() {
    /*TODO:PLAY*/
    dgame.load.image("bg", "assets/imgs/bg.png");
    dgame.load.image("player", "assets/imgs/gogi.png");
    dgame.load.image("bg_cloud", "assets/imgs/nui_may.png");
    dgame.load.image("wall", "assets/imgs/hut-mui.png");
    dgame.load.image("wall1", "assets/imgs/hut-mui1.png");
    dgame.load.image("meat", "assets/imgs/thit.png");
    dgame.load.image("ball", "assets/imgs/bong.png");
    dgame.load.image("coca", "assets/imgs/coke.png");
    dgame.load.image("bg_san_vd", "assets/imgs/san-vd.png");
    dgame.load.image("bg_road", "assets/imgs/nen.png");
    dgame.load.image("bg_top", "assets/imgs/red-line.png");
    dgame.load.image("bonus", "assets/imgs/bonus.png");
    loadRourceEndGame();
}
function loadResourceLogin() {
    dgame.load.image("login_bg", "assets/imgs/sign_bg.png");
    dgame.load.spritesheet("sign_bt", "assets/imgs/bt_dn.png", 353, 111);
    dgame.load.spritesheet("sign_fb_bt", "assets/imgs/bt_fb.png", 606, 120);
}
function loadRourceEndGame() {
    /*TODO: ENDGAME*/
    dgame.load.image("endgame_bg", "assets/imgs/endgame_bg.png");
    dgame.load.image("endgame_bg_rank", "assets/imgs/endgame_bg_rank.png");
    dgame.load.spritesheet("endgame_share", "assets/imgs/bt_share.png", 470, 93);
    dgame.load.spritesheet("endgame_gift", "assets/imgs/bt_nhanqua.png", 515, 167);
    dgame.load.spritesheet("endgame_replay", "assets/imgs/bt_choilai.png", 470, 93);
}
function loadSound() {
    var type = "mp3";
    // if (dgame.device.iOS || dgame.device.mobileSafari)
    //     type = "m4a";
    dgame.load.audio('bg', 'assets/snds/music_background.' + type);
    dgame.load.audio('coin', 'assets/snds/coin.' + type);
    dgame.load.audio('click', 'assets/snds/click.' + type);
    dgame.load.audio('crash', 'assets/snds/crash.' + type);
    dgame.load.audio('fall', 'assets/snds/fall.' + type);
    dgame.load.audio('flap', 'assets/snds/flap.' + type);
    dgame.load.audio('win', 'assets/snds/win.' + type);
}
function removeMenuAsset() {
    // dgame.cache.removeImage("menu_bg");
    // dgame.cache.removeImage("menu_logo");
    // dgame.cache.removeImage("menu_play");
    // dgame.cache.removeImage("menu_tutorial");
    // dgame.cache.removeImage("menu_gift");
    // dgame.cache.removeImage("menu_rank");
    // //RULE
    // dgame.cache.removeImage("rule_bg");
}
