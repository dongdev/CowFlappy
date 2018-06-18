var style = {font: "bold 80px mijas", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};
var style_gift = {font: "bold 80px mijas", fill: "#f15858", boundsAlignH: "center", boundsAlignV: "middle"};
var style_rank1 = {font: "bold 65pt mijas", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"};
var style_rank2 = {font: "bold 45pt mijas", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"};
function boxEndGame(score) {
    if (dgame.boxEnd != null)
        return;
    console.log("game over");
    dgame.dialogEndShow = true;
    var box = dgame.add.group();
    var bg = dgame.add.sprite(0, 0, "endgame_bg")
    var text = dgame.add.text(0, 0, score + " ĐIỂM", style);
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
        if (dgame.FBInstant != null) {
            //intent can be "INVITE", "REQUEST", "CHALLENGE" or "SHARE"
            FBInstant.shareAsync({
                intent: 'INVITE',
                text: 'X is asking for your help!',
                data: {myReplayData: '...'},
            }).then(function () {
                // continue with the game.
            });
        }
        soundClick();
    }, this, 1, 0, 1, 0);
    var btGift = dgame.add.button(285, 1146, 'endgame_gift', function () {
        boxGift();
        soundClick();
    }, this, 1, 0, 1, 0);

//rank
//size of frame 200x244

    var x1 = 172;
    var x2 = 432;
    var x3 = 724;
    var y = 1596;

    var end_rank_ava = [
        "https://www.androidpolice.com/wp-content/uploads/2017/05/nexus2cee_photobooks-1-728x403.png",
        "http://phaser.io/images/img.png",
        "http://cmsdev.footballtip.live:8028/uploads/2018/06/12/a6b2943dba002c09bb52fe88d52db157_bannerwc.jpg"]
    end_rank_ava.forEach(function (p1, p2, p3) {
        var rand = dgame.rnd.integerInRange(0, 36890);
        var regex = p1.includes("?") ? "&v=" + rand : "?v=" + rand;
        dgame.load.image("end_ava_key" + p2, p1 + regex, true);
    });

    var link = 'http://gogi.icod.mobi/gogiApi/gameend?session_id=' + dgame.session_id + "&points=" + score;
    log(link);
    dgame.load.json('end_notify_json', link);
    dgame.load.start();
    var count;
    dgame.load.onFileComplete.add(function (progress, file_key, success, total_loaded_files, total_files) {
        if (!success)
            return;
        if (file_key.includes("end_ava_key")) {
            var ava_rank1 = dgame.add.sprite(file_key == "end_ava_key" + 0 ? x1 : file_key == "end_ava_key" + 1 ? x2 : x3, y, file_key);
            var cache_ava_rank1 = dgame.cache.getImage(file_key);
            ava_rank1.scale.setTo(200 / cache_ava_rank1.width, 244 / cache_ava_rank1.height);
            box.add(ava_rank1);
            if (count == end_rank_ava.size) {
                var endgame_bg_rank1 = dgame.add.sprite(87, 1536, "endgame_bg_rank");
                box.add(endgame_bg_rank1);
            }
            else {
                count += 1;
            }
        }
        else if (file_key.includes("end_json")) {
            log(dgame.cache.getJSON("end_json"));
        } else if (file_key.includes("end_notify_json")) {
            log(dgame.cache.getJSON("end_notify_json"));
        }
    });

    var endgame_bg_rank = dgame.add.sprite(87, 1536, "endgame_bg_rank");

    box.add(bg);
    box.add(text);
    box.add(btReplay);
    box.add(btShare);
    box.add(btGift);
    box.add(endgame_bg_rank);

    dgame.boxEnd = box;
    pauseBg();
    soundWin();
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
    var text = dgame.add.text(0, 0, "", style_gift);
    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    text.setTextBounds(164, 623, 737, 54);

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

    var link = 'http://gogi.icod.mobi/gogiApi/getRewards?session_id=' + dgame.session_id;
    log(link);
    dgame.load.json('gift_json', link);
    dgame.load.start();
    dgame.load.onFileComplete.add(function (progress, file_key, success, total_loaded_files, total_files) {
        if (!success)
            return;
        if (file_key.includes("gift_json")) {
            var msg = dgame.cache.getJSON("gift_json").msg;
            if (new String(msg).valueOf() == new String("wrong session").valueOf()) {
                text.setText("" + msg);
            }
            else {
                text.setText("E-Coupon " + msg);
            }

        }
    });

    box.add(bg);
    box.add(close);
    box.add(text);
    box.add(imgText);
    box.add(scrollMask);

    dgame.boxGift = box;
}

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

    }, this, 0);
    var btNext = dgame.add.button(736, 1472, "bt_next", function () {

    }, this, 0);
    box.add(bg);
    box.add(close);
    box.add(btPrev);
    box.add(btNext);

    dgame.boxCart = box;
}

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
        box.page -= 1;
        if (box.page < 0)
            box.page = 0;
        bindRank(box.jTop, box.page, box);
    }, this, 0);
    var btNext = dgame.add.button(740, 1472, "bt_next", function () {
        box.page += 1;
        bindRank(box.jTop, box.page, box);
    }, this, 0);
    //load json
    var link = 'http://gogi.icod.mobi/gogiApi/top';
    log(link);
    dgame.load.json('rank_json', link);
    dgame.load.start();
    dgame.load.onFileComplete.add(function (progress, file_key, success, total_loaded_files, total_files) {
        if (!success)
            return;
        if (file_key.includes("rank_json")) {
            log(dgame.cache.getJSON("rank_json"));
            var jRoot = dgame.cache.getJSON("rank_json");
            var top = jRoot.top;
            box.jTop = top;
            bindRank(top, 0, box);
        }
    });

    box.add(bg);
    box.add(close);
    box.add(btPrev);
    box.add(btNext);
    boxRank.page = 0;
    dgame.boxRank = box;
}

function bindRank(arr, page, box) {
    if (arr == null)
        return;
    var key = "rank_key";
    var y1 = 621;
    var y2 = 807;
    var y3 = 1008;
    var y4 = 1197;
    //text
    var tx_x = 444;
    var tx_y = ["631|711", "810|890", "1011|1091", "1200|1280"]

    arr.forEach(function (p1, pos, p3) {
        if (pos >= page && pos < (page + 1) * 4) {
            var y = tx_y[pos].split("|");
            var player = arr[pos];
            var text1 = dgame.add.text(tx_x, y[0], pos + 1, style_rank1);
            text1.stroke = '#000000';
            text1.strokeThickness = 6;
            var text2 = dgame.add.text(tx_x, y[1], player.display_name, style_rank2);
            box.add(text1);
            box.add(text2);

            //var avatar = "http://phaser.io/images/img.png";
            var avatar = p1.avatar;
            if (avatar == null) {
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

    var count;
    dgame.load.onFileComplete.add(function (progress, file_key, success, total_loaded_files, total_files) {
        if (!success)
            return;
        if (file_key.includes(key)) {
            var ava_rank1 = dgame.add.sprite(288, file_key == key + 0 ? y1 : file_key == key + 1 ? y2 : file_key == key + 2 ? y3 : y4, file_key);
            var cache_ava_rank1 = dgame.cache.getImage(file_key);
            ava_rank1.scale.setTo(129 / cache_ava_rank1.width, 144 / cache_ava_rank1.height);
            box.add(ava_rank1);
            if (count == arr.size) {
                //add vertical bg
                var x = 244;
                var y = 572;
                var temBg = dgame.add.sprite(x, y, "rank_bg_temp");
                box.add(temBg);
            }
        }
        count += 1;
    });
}