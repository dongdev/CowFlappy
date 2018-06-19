function canPlay() {
    //return dgame.playSound;
    return true;
}
function soundBg() {
    if (!canPlay())
        return;
    if (dgame.soundBg != null) {
        dgame.soundBg.stop();
        dgame.soundBg = null;
    }
    if (dgame.soundWin != null) {
        dgame.soundWin.stop();
    }
    var sound = dgame.add.audio('bg', 1, true);
    sound.allowMultiple = true;
    sound.loop = true;
    sound.play("", 0, 1, true);
    dgame.soundBg = sound;
}
function pauseBg() {
    dgame.soundBg.pause();
}
function soundCoin() {
    if (!canPlay())
        return;
    if (dgame.soundCoin == null) {
        var sound = dgame.add.audio('coin');
        sound.play();
        dgame.soundCoin = sound;
    }
    else {
        dgame.soundCoin.play();
    }

}
function soundJump() {
    if (!canPlay())
        return;
    if (dgame.soundJump == null) {
        var sound = dgame.add.audio('flap');
        sound.play();
        dgame.soundJump = sound;
    }
    else {
        dgame.soundJump.play();
    }
}
function soundCrash() {
    if (!canPlay())
        return;
    if (dgame.soundCrash == null) {
        var sound = dgame.add.audio('crash');
        sound.play();
        dgame.soundCrash = sound;
    }
    else {
        dgame.soundCrash.play();
    }
}
function soundClick() {
    if (!canPlay())
        return;
    if (dgame.soundClick == null) {
        var sound = dgame.add.audio('click');
        sound.play();
        dgame.soundClick = sound;
    }
    else {
        dgame.soundClick.play();
    }
}
function soundWin() {
    if (!canPlay())
        return;
    if (dgame.soundWin == null) {
        var sound = dgame.add.audio('win');
        sound.play();
        dgame.soundWin = sound;
    }
    else {
        dgame.soundWin.play();
    }
}
function soundFall() {
    if (!canPlay())
        return;
    if (dgame.soundFall == null) {
        var sound = dgame.add.audio('fall');
        sound.play();
        dgame.soundFall = sound;
    }
    else {
        dgame.soundFall.play();
    }
}
function mute(mute) {
    dgame.sound.mute = mute;
}