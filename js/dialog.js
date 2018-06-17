var style = {font: "bold 80px mijas", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};
var style_gift = {font: "bold 80px mijas", fill: "#f15858", boundsAlignH: "center", boundsAlignV: "middle"};
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
    dgame.load.json('end_json', 'http://sv.trachanhquan.com/test.php');
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
function leaderBoard() {
}
function tutorial() {
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
        soundClick();
    }, this, 0, 0, 0);
    var text = dgame.add.text(0, 0, "E-Coupon  ABC", style_gift);
    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    text.setTextBounds(164, 623, 737, 54);
    //
    //Load the plugin
    // var params = ({
    //     horizontalScroll: horizontalScroll,
    //     verticalScroll: verticalScroll,
    //     kineticMovement: kineticMovement
    // });


    const parent = dgame.world
    const bounds = new Phaser.Rectangle(0, 0, 300, 400)
    const options = {
        direction: 'y',
        overflow: 100,
        padding: 10
    }


    var textStyle = {font: "30px Arial", fill: "#ffff00"};
    var text = dgame.make.text(0, 0, "" +
        "* Điều kiện áp dụng E-voucher:\n" +
        "-        Mã e-voucher có giá trị giảm 100.000đ cho hóa đơn 500.000đ trở lên (chưa bao gồm VAT)\n" +
        "-        Mã e-vocuher được áp dụng lũy kế (giảm 100.000vnđ cho hóa đơn 500.000đ, giảm 200.000đ cho hóa đơn 1.000.000đ (nếu khách hàng có 2 mã e-voucher)\n" +
        "-        Không được áp dụng đồng thới với các chương trình khuyến mãi và giảm giá khác.\n" +
        "-        Mã e-voucher được áp dụng trên toàn hệ thống GoGi từ Nam ra Bắc.\n" +
        "-        Mã e-voucher không có giá trị qui đổi thành tiền mặt, hoàn lại tiền thừa hay các dịch vụ khác.\n" +
        "-        Không áp dụng cho sử dụng Ví, được tích điểm và tích ví G-People.\n" +
        "Vui lòng chụp lại màn hình này để đổi quà tặng tại nhà hàng", textStyle);

    //var player = prompt("Please enter your name", "name");
    var input = new CanvasInput({
        canvas: document.getElementById('canvas'),
        fontSize: 18,
        fontFamily: 'Arial',
        fontColor: '#212121',
        fontWeight: 'bold',
        width: 300,
        padding: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 3,
        boxShadow: '1px 1px 0px #fff',
        innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
        placeHolder: 'Enter message here...'
    });

    box.add(bg);
    box.add(close);
    box.add(text);
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
    var bg_info = dgame.add.sprite(204, 552, "rank_info_bg");
    var close = dgame.add.button(900, 412, "bt_close", function () {
        dgame.boxRank.destroy();
        dgame.boxRank = null;
        soundClick();
    }, this, 0, 0, 0);
    var btPrev = dgame.add.button(288, 1472, "bt_prev", function () {

    }, this, 0);
    var btNext = dgame.add.button(740, 1472, "bt_next", function () {

    }, this, 0);
    //load json

    var y1 = 621;
    var y2 = 807;
    var y3 = 1008;
    var y4 = 1197;
    var x = 288;
    //text
    var tx_x = 444;
    var tx1_y1 = 651;
    var tx1_y2 = 708;
    var tx2_y1 = 840;
    var tx2_y2 = 903;
    var tx3_y1 = 1041;
    var tx3_y2 = 1098;
    var tx4_y1 = 1230;
    var tx4_y2 = 1287;

    var end_rank_ava = [
        "https://www.androidpolice.com/wp-content/uploads/2017/05/nexus2cee_photobooks-1-728x403.png",
        "http://phaser.io/images/img.png",
        "http://phaser.io/images/img.png",
        "http://cmsdev.footballtip.live:8028/uploads/2018/06/12/a6b2943dba002c09bb52fe88d52db157_bannerwc.jpg"]
    end_rank_ava.forEach(function (p1, p2, p3) {
        var rand = dgame.rnd.integerInRange(0, 36890);
        var regex = p1.includes("?") ? "&v=" + rand : "?v=" + rand;
        dgame.load.image("rank_key" + p2, p1 + regex, true);
    });
    dgame.load.json('rank_json', 'http://phaser.io/version.json');
    dgame.load.start();
    var count;
    dgame.load.onFileComplete.add(function (progress, file_key, success, total_loaded_files, total_files) {
        if (!success)
            return;
        if (file_key.includes("rank_key")) {
            var ava_rank1 = dgame.add.sprite(x, file_key == "rank_key" + 0 ? y1 : file_key == "rank_key" + 1 ? y2 : file_key == "rank_key" + 2 ? y3 : y4, file_key);
            var cache_ava_rank1 = dgame.cache.getImage(file_key);
            ava_rank1.scale.setTo(129 / cache_ava_rank1.width, 144 / cache_ava_rank1.height);
            box.add(ava_rank1);
            if (count == end_rank_ava.size) {
                var endgame_bg_rank1 = dgame.add.sprite(204, 552, "rank_info_bg");
                box.add(endgame_bg_rank1);
                //add text
            }
            else {
                count += 1;
            }
        }
        else if (file_key.includes("rank_json")) {
            log(dgame.cache.getText("rank_json"));
        }
    });

    box.add(bg);
    box.add(close);
    box.add(bg_info);
    box.add(btPrev);
    box.add(btNext);
    dgame.boxRank = box;
}