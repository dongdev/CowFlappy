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
    if (dgame.soundBg != null)
        dgame.soundBg.stop();
}
function soundCoin() {
    if (!canPlay())
        return;
    if (dgame.soundCoin == null) {
        var sound = dgame.add.audio('coin');
        sound.allowMultiple = true;
        sound.play();
        dgame.soundCoin = sound;
    }
    else {
        dgame.soundCoin.stop();
        dgame.soundCoin.play();
    }

}
function soundJump() {
    if (!canPlay())
        return;
    if (dgame.soundJump == null) {
        var sound = dgame.add.audio('flap');
        sound.allowMultiple = true;
        sound.play();
        dgame.soundJump = sound;
    }
    else {
        dgame.soundJump.stop();
        dgame.soundJump.play();
    }
}
function soundCrash() {
    if (!canPlay())
        return;
    if (dgame.soundCrash == null) {
        var sound = dgame.add.audio('crash');
        sound.allowMultiple = true;
        sound.play();
        dgame.soundCrash = sound;
    }
    else {
        dgame.soundCrash.stop();
        dgame.soundCrash.play();
    }
}
function soundClick() {
    if (!canPlay())
        return;
    if (dgame.soundClick == null) {
        var sound = dgame.add.audio('click');
        sound.allowMultiple = true;
        sound.play();
        dgame.soundClick = sound;
    }
    else {
        dgame.soundClick.stop();
        dgame.soundClick.play();
    }
}
function soundWin() {
    if (!canPlay())
        return;
    if (dgame.soundWin == null) {
        var sound = dgame.add.audio('win');
        sound.allowMultiple = true;
        sound.play();
        dgame.soundWin = sound;
    }
    else {
        dgame.soundWin.stop();
        dgame.soundWin.play();
    }
}
function soundFall() {
    if (!canPlay())
        return;
    if (dgame.soundFall == null) {
        var sound = dgame.add.audio('fall');
        sound.allowMultiple = true;
        sound.play();
        dgame.soundFall = sound;
    }
    else {
        dgame.soundFall.stop();
        dgame.soundFall.play();
    }
}
function mute(mute) {
    dgame.sound.mute = mute;
}