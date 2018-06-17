class fbinstantsdk {
    constructor() {

    }

    share() {

    }

    getImage() {
        var playerImage = new Image();
        playerImage.crossOrigin = 'anonymous';
        playerImage.src = FBInstant.player.getPhoto();
    }
}