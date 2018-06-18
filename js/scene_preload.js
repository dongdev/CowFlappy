function loadResoure() {
    that = this;
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
    /*TODO:BUTTON*/
    dgame.load.spritesheet("bt_sound", "assets/imgs/bt_sound.png", 92, 77);
    dgame.load.spritesheet("bt_play", "assets/imgs/bt_playgame.png", 62, 62);
    dgame.load.image("closeButton", "assets/imgs/closeButton.png");
    dgame.load.image("boxBack", "assets/imgs/boxBack.png");
    /*TODO: ENDGAME*/
    dgame.load.image("endgame_bg", "assets/imgs/endgame_bg.png");
    dgame.load.image("endgame_bg_rank", "assets/imgs/endgame_bg_rank.png");
    dgame.load.spritesheet("endgame_share", "assets/imgs/bt_share.png", 470, 93);
    dgame.load.spritesheet("endgame_gift", "assets/imgs/bt_nhanqua.png", 515, 167);
    dgame.load.spritesheet("endgame_replay", "assets/imgs/bt_choilai.png", 470, 93);
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

    load_sound();

    dgame.load.start();
    dgame.load.onFileComplete.add(function (progress, file_key, success, total_loaded_files, total_files) {
        if (!success)
            return;
        if (dgame.FBInstant != null) {
            if (progress < 0)
                progress = 0;
            else if (progress > 100)
                progress = 100;
            FBInstant.setLoadingProgress(progress);
        }
    });
}
function load_sound() {
    dgame.load.audio('bg', 'assets/snds/music_background.mp3');
    dgame.load.audio('coin', 'assets/snds/coin.mp3');
    dgame.load.audio('click', 'assets/snds/click.mp3');
    dgame.load.audio('crash', 'assets/snds/crash.mp3');
    dgame.load.audio('fall', 'assets/snds/fall.mp3');
    dgame.load.audio('flap', 'assets/snds/flap.mp3');
    dgame.load.audio('win', 'assets/snds/win.mp3');
}
