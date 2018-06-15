function loadResource() {
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

    //addbutton button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);
}