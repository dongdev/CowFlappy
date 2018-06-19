var STATE = {
    //init: init,
    //preload: preload,
    //create: create
    // update: update,
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
    dgame.state.add(SCENE_PRELOAD, Preload);
    dgame.state.add(SCENE_MENU, Menu);
    dgame.state.add(SCENE_GAME, SceneGame);
    dgame.state.start(SCENE_PRELOAD);
}




