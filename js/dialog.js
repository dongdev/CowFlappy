var style_score = {font: "bold 80px mijas", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};
var style_rank1 = {font: "bold 65px mijas", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"};
var style_rank2 = {font: "bold 45px mijas", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"};
function boxEndGame(score) {
    if (dgame.boxEnd != null)
        return;
    console.log("game over");
    dgame.dialogEndShow = true;
    var box = dgame.add.group();
    var bg = dgame.add.sprite(0, 0, "endgame_bg")
    var text = dgame.add.text(0, 0, score + " ĐIỂM", style_score);
    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    text.setTextBounds(210, 714, 640, 147);
    //share
    var btReplay = dgame.add.button(303, 900, 'endgame_replay', function () {
        dgame.boxEnd.destroy();
        dgame.boxEnd = null;
        dgame.state.getCurrentState().restart_game();
        dgame.dialogEndShow = false;
        soundClick();
        soundBg();
    }, this, 1, 0, 1, 0);
    var btShare = dgame.add.button(303, 1021, 'endgame_share', function () {
        if (isFNInstant) {
            if (dgame.FBInstant != null) {
                //intent can be "INVITE", "REQUEST", "CHALLENGE" or "SHARE"
                var myImg = playerPic == null ? '' : window.btoa(playerPic);
                log(myImg);
                // FBInstant.shareAsync({
                //     intent: 'INVITE',
                //     image: "https%3A//scontent.fhan2-3.fna.fbcdn.net/v/t1.0-1/p320x320/23434885_1488621997890318_690721878521796166_n.jpg%3F_nc_cat%3D0%26oh%3D7e09e834e20abb8e1695354baed14a00%26oe%3D5BB5A317",
                //     text: 'Nào hãy chơi game cùng mình nhé!',
                //     data: {'': '...'},
                // }).then(function () {
                //     // continue with the game.
                //     log("share callback")
                // });
                dgame.FBInstant.context.chooseAsync();
            }
        }
        else {
            shareFb();
        }

        soundClick();
    }, this, 1, 0, 1, 0);
    var btGift = dgame.add.button(285, 1146, 'endgame_gift', function () {
        boxGift();
        soundClick();
    }, this, 1, 0, 1, 0);
    var endgame_bg_rank = dgame.add.sprite(87, 1536, "endgame_bg_rank");
    panelBoxEndGame = box;

    box.add(bg);
    box.add(text);
    box.add(btReplay);
    box.add(btShare);
    box.add(btGift);
    box.add(endgame_bg_rank);
    dgame.boxEnd = box;
    pauseBg();
    soundWin();

    if (sessionId != null) {
        sendMs(JSON.stringify({
            "id": "gameend",
            "session_id": sessionId,
            "points": score
        }));
    }
}

function boxRule() {
    if (dgame.boxRule != null)
        return;
    var box = dgame.add.group();
    var bg = dgame.add.sprite(0, 0, "rule_bg");
    var close = dgame.add.button(888, 456, "bt_close", function () {
        dgame.boxRule.destroy();
        dgame.boxRule = null;
        soundClick();
    }, this, 0, 0, 0);

    box.add(bg);
    box.add(close);
    dgame.boxRule = box;
}

function boxGift() {
    if (dgame.boxGift != null)
        return;
    var box = dgame.add.group();
    var bg = dgame.add.sprite(0, 0, "gift_bg");
    bg.inputEnabled = true;
    bg.events.onInputDown.add(function () {

    });
    var close = dgame.add.button(884, 388, "bt_close", function () {
        dgame.boxGift.destroy();
        dgame.boxGift = null;
        dgame.scrollText = null;
        soundClick();
    }, this, 0, 0, 0);
    var style_gift = {
        font: "bold 60px mijas",
        fill: "#f15858",
        wordWrap: true,
        wordWrapWidth: GAME_WIDTH,
        align: "center"
    };
    var text = dgame.add.text(GAME_WIDTH / 2, 658, "", style_gift);
    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    //text.setTextBounds(164, 623, 737, 80);//54
    text.anchor.setTo(0.5);
    textGift = text;

    var imgText = dgame.add.sprite(237, 795, "gift_text");

    //var player = prompt("Please enter your name", "name");
    var scrollMask = dgame.add.graphics(0, 0);
    var bounds = new Phaser.Rectangle(230, 468, 600, 1452);
    scrollMask.beginFill(0xffffff);
    scrollMask.drawRect(237, 795, 594, 795);
    scrollMask.endFill();
    imgText.mask = scrollMask;
    //enable input
    imgText.inputEnabled = true;
    imgText.input.enableDrag(false, true);
    imgText.input.allowHorizontalDrag = false;
    imgText.input.boundsRect = bounds;

    if (sessionId != null) {
        sendMs(JSON.stringify({"id": "getRewards", "session_id": sessionId}));
    }

    box.add(bg);
    box.add(close);
    box.add(text);
    box.add(imgText);
    box.add(scrollMask);

    dgame.boxGift = box;
}

//TODO: Cart Gift
function boxCartGift() {
    if (dgame.boxCart != null)
        return;
    var box = dgame.add.group();
    var bg = dgame.add.sprite(0, 0, "cart_bg");
    bg.inputEnabled = true;
    bg.events.onInputDown.add(function () {

    });
    var close = dgame.add.button(900, 412, "bt_close", function () {
        dgame.boxCart.destroy();
        dgame.boxCart = null;
        soundClick();
    }, this, 0, 0, 0);
    var btPrev = dgame.add.button(256, 1472, "bt_prev", function () {
        soundClick();
        var prevPage = box.page - 1;
        if (prevPage < 0)
            return;
        box.page = prevPage;
        bindCart(jVouchers, box.page, pageCartSize, panelBoxVoucher);
    }, this, 0);
    var btNext = dgame.add.button(736, 1472, "bt_next", function () {
        soundClick();
        var nextpage = box.page + 1;
        if (jVouchers == null || jVouchers.length < nextpage * pageCartSize)
            return;
        box.page = nextpage;
        bindCart(jVouchers, box.page, pageCartSize, panelBoxVoucher);
    }, this, 0);

    //json
    if (playerId != null) {
        panelParentBoxVoucher = box;
        sendMs(JSON.stringify({"id": "getMyRewards", "player_id": playerId}));
    }

    box.add(bg);
    box.add(close);
    box.add(btPrev);
    box.add(btNext);
    box.page = 0;
    dgame.boxCart = box;
}

function bindCart(arr, page, page_size, box) {
    if (arr == null)
        return;
    var key = "cart_v_key";
    var x = 248;
    var y = 612;
    var w = 600;
    var h = 92;
    box.callAll("kill");

    arr.forEach(function (p1, pos, p3) {
        log("foreach:" + p1.code);
        if (pos >= page * page_size && pos < (page + 1) * page_size) {
            var text = dgame.add.text(0, 0, p1.code, style_rank2);
            text.setTextBounds(x, y + h * (pos - page * page_size), w, h);
            box.add(text);
        }
    });

}

//TODO: Rank
function boxRank() {
    if (dgame.boxRank != null)
        return;
    var box = dgame.add.group();
    var bg = dgame.add.sprite(0, 0, "rank_bg");
    bg.inputEnabled = true;
    bg.events.onInputDown.add(function () {

    });
    var close = dgame.add.button(900, 412, "bt_close", function () {
        dgame.boxRank.destroy();
        dgame.boxRank = null;
        soundClick();
    }, this, 0, 0, 0);
    var btPrev = dgame.add.button(288, 1472, "bt_prev", function () {
        var prevPage = box.page - 1;
        if (prevPage < 0)
            return;
        box.page = prevPage;
        bindRank(jTopRank, box.page, pageRankSize, panelBoxRank);
        soundClick();
    }, this, 0);
    var btNext = dgame.add.button(730, 1472, "bt_next", function () {
        var nextPage = box.page + 1;
        log("nexxtpage:" + nextPage + " length:" + jTopRank.length);
        if (nextPage * pageRankSize >= jTopRank.length)
            return;
        box.page = nextPage;
        bindRank(jTopRank, box.page, pageRankSize, panelBoxRank);
        soundClick();
    }, this, 0);
    //load json
    panelParentBoxRank = box;

    sendMs(JSON.stringify({"id": "getTop"}));

    box.add(bg);
    box.add(close);
    box.add(btPrev);
    box.add(btNext);
    box.page = 0;
    dgame.boxRank = box;
}

function bindRank(arr, page, page_size, box) {
    if (arr == null)
        return;
    box.callAll("kill");
    var key = "rank_key";
    var y1 = 621;
    var y2 = 807;
    var y3 = 1008;
    var y4 = 1197;
    //text
    var tx_x = 444;
    var tx_y = ["631|711", "810|890", "1011|1091", "1200|1280"]

    var count = 0;
    dgame.load.onFileComplete.add(function (progress, file_key, success, total_loaded_files, total_files) {
        if (file_key.includes(key)) {
            count += 1;
            var pos = file_key.replace(key, "");
            pos = pos >= page_size ? pos % page_size : pos;
            //log("load_image_rank_cb:" + file_key + " pos:" + pos);
            var image = dgame.add.sprite(288, pos == 0 ? y1 : pos == 1 ? y2 : pos == 2 ? y3 : y4, success ? file_key : "davatar");
            var cache_image = dgame.cache.getImage(success ? file_key : "davatar");
            image.scale.setTo(129 / cache_image.width, 144 / cache_image.height);
            box.add(image);
            if (count == page_size) {
                //add vertical bg
                var x = 242;
                var y = 572;
                var temBg = dgame.add.sprite(x, y, "rank_bg_temp");
                box.add(temBg);
            }
        }
    });

    arr.forEach(function (p1, pos, p3) {
        if (pos >= page * page_size && pos < (page + 1) * page_size) {
            var y = tx_y[pos - page * page_size].split("|");
            var player = arr[pos];
            var text1 = dgame.add.text(tx_x, parseInt(y[0]), pos + 1, style_rank1);
            text1.stroke = '#000000';
            text1.strokeThickness = 6;
            var text2 = dgame.add.text(tx_x, parseInt(y[1]), player.display_name, style_rank2);
            box.add(text1);
            box.add(text2);

            //var avatar = "http://phaser.io/images/img.png";
            var avatar = p1.avatar;
            if (avatar == null || avatar.includes("null")) {
                count += 1;
            }
            else {
                var rand = dgame.rnd.integerInRange(0, 36890);
                var regex = avatar.includes("?") ? "&v=" + rand : "?v=" + rand;
                dgame.load.image(key + pos, avatar + regex, true);
                dgame.load.start();
            }
        }
    });

}