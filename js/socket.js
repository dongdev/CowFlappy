function DSocket(pack, callback) {

    if ("WebSocket" in window) {
        console.log("WebSocket is supported by your Browser!");

        // Let us open a web socket
        // var ws = new WebSocket("wss://bongda.vnnplus.vn:8443/one2many");
        var ws = new WebSocket("wss://icod.mobi:8443/");
        ws.onopen = function () {
            // Web Socket is connected, send data using send()
            ws.send(pack);
            var ms = "Sent:" + pack;
            console.log(ms);
            $("p").text(ms);
        };

        ws.onmessage = function (evt) {
            var received_msg = evt.data;
            console.log("Received:" + evt.data);
            callback(evt);
            ws.close();
            $("p").text(evt.data);
        };

        ws.onclose = function () {
            // websocket is closed.
            console.log("Closed.");
        };

    } else {

        // The browser doesn't support WebSocket
        var ms = "WebSocket NOT supported by your Browser!";
        console.log(ms);
        $("p").text(ms);
    }
}

