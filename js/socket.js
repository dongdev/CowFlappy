function socketIO(pack) {
    if ("WebSocket" in window) {
        //ws = new WebSocket("wss://bongda.vnnplus.vn:8443/one2many");
        ws = new WebSocket("wss://icod.mobi:8443/");
        ws.onopen = function () {
            var ms = "Socket Open";
            console.log(ms);
            sendMs(JSON.stringify({'id': 'ping'}))
            if (pack != null) {
                sendMs(pack);
            }
            //pingpong
            interval = setInterval("sendMs(JSON.stringify({'id':'ping'}))", 30000);

            $("p").text(ms);
        };

        ws.onmessage = function (evt) {
            callback(evt);
            log("Received:" + evt.data);
            $("p").text(evt.data);
        };

        ws.onclose = function () {
            ws = null;
            clearInterval(interval);
            log("Closed.");
        };
        ws.onerror = function () {
            log("Error.");
            ws = null;
        }

    } else {
        var ms = "WebSocket NOT supported by your Browser!";
        log(ms);
        $("p").text(ms);
    }
}

var interval;
//ranking data;
var ws;
var jTopRank;
var panelBoxRank;
var panelParentBoxRank;
var pageRankSize = 4;

//endgame data
var panelBoxEndGame;

//gift
var textGift;
var oldVoucher;

//cart
var jVouchers;
var panelBoxVoucher;
var panelParentBoxVoucher;
var pageCartSize = 8;

function callback(ev) {
    var id = JSON.parse(ev.data).id;
    switch (id) {
        case "fc_gamestartResponse":
        {
            var jRoot = JSON.parse(ev.data);
            sessionId = jRoot.session_id;
            log("sessionId:" + sessionId);
            break;
        }
        case "fc_getTopResponse":
        {
            log("fc_getTopResponse_ui");
            var jRoot = JSON.parse(ev.data);
            var top = jRoot.top;
            jTopRank = top;
            panelBoxRank = dgame.add.group();
            panelParentBoxRank.add(panelBoxRank);
            bindRank(top, 0, pageRankSize, panelBoxRank);
            break;
        }
        case "fc_gameendResponse":
        {
            //size of frame 200x244
            var x1 = 172;
            var x2 = 432;
            var x3 = 724;
            var y = 1596;
            var key_ava = "end_ava_key";

            var jRoot = JSON.parse(ev.data)
            var top = jRoot.top;
            top.forEach(function (p1, p2, p3) {
                if (p2 < 3) {
                    //var avatar = "http://phaser.io/images/img.png";
                    var avatar = p1.avatar;
                    if (avatar == null || avatar.includes("null")) {
                        count += 1;
                    }
                    else {
                        var rand = dgame.rnd.integerInRange(0, 36890);
                        var regex = avatar.includes("?") ? "&v=" + rand : "?v=" + rand;
                        dgame.load.image(key_ava + p2, avatar + regex, true);
                        dgame.load.start();
                    }
                }
            });
            var count = 0;
            dgame.load.onFileComplete.add(function (progress, file_key, success, total_loaded_files, total_files) {
                if (file_key.includes(key_ava)) {
                    count += 1;
                    var pos = file_key.replace(key_ava, "");
                    var ava_rank1 = dgame.add.sprite(pos == 0 ? x1 : pos == 1 ? x2 : x3, y, success ? file_key : "davatar");
                    var cache_ava_rank1 = dgame.cache.getImage(success ? file_key : "davatar");
                    ava_rank1.scale.setTo(200 / cache_ava_rank1.width, 244 / cache_ava_rank1.height);
                    panelBoxEndGame.add(ava_rank1);
                    if (count == 3) {
                        var endgame_bg_rank1 = dgame.add.sprite(87, 1536, "endgame_bg_rank");
                        panelBoxEndGame.add(endgame_bg_rank1);
                    }
                }
            });
            break;
        }
        case "fc_getRewardsResponse":
        {
            var jRoot = JSON.parse(ev.data);
            var status = jRoot.status;
            if (status != -1 || (status == -1 && oldVoucher != null)) {
                var vouchers = jRoot.vouchers;
                if (status == -1)
                    vouchers = oldVoucher;
                else
                    oldVoucher = vouchers;
                var text = "";
                if (vouchers != null && vouchers.length > 0) {
                    vouchers.forEach(function (item, pos, arr) {
                        if (pos == 0) {
                            text += ("E-Coupon " + item.code);
                        }
                        else {
                            text += "\n và " + item.code;
                        }
                    });
                }
                textGift.setText(text);
            }
            break;
        }
        case "fc_getMyRewardsResponse":
        {
            var jRoot = JSON.parse(ev.data);
            var vouchers = jRoot.rewards;
            jVouchers = vouchers;
            panelBoxVoucher = dgame.add.group();
            panelParentBoxVoucher.add(panelBoxVoucher);
            bindCart(vouchers, 0, pageCartSize, panelBoxVoucher);
            break;
        }
    }
}
function sendMs(pack) {
    if (ws == null) {
        //ws = initSocket(pack);
        log("Websocket not exist!!!");
    }
    else {
        ws.send(pack);
        log("Sent:" + pack);
    }
}

