// https://javascript.info/websocket
// https://aria2.github.io/manual/en/html/aria2c.html#rpc-interface

if ("WebSocket" in window) {
    let ws = new WebSocket("ws://127.0.0.1:6800/jsonrpc");

    ws.onopen = function(e) {
        console.log("[open] Connection established");
        console.log("Sending to server");
        ws.send(JSON.stringify({
            'jsonrpc':'2.0',
            'id':'qwer',
            'token':'69',
            'method':'system.multicall',
            'params': [[

            {'methodName':'aria2.tellActive',
            'params':['token:69']},
            {'methodName':'aria2.tellWaiting',
            'params':['token:69',0,666]},
            {'methodName':'aria2.tellStopped',
            'params':['token:69',0,666]},

            // {'methodName':'system.listNotifications',
            // 'params':[['token:69']]},

            // {'methodName':'aria2.getVersion',
            // 'params':['token:69']},

            {'methodName':'aria2.getGlobalOption',
            'params':['token:69']},

            // {'methodName':'aria2.getPeers',
            // 'params':['token:69','40fc321f2f90ed96']},

        ]]
        }));
    }

    ws.onmessage = function(event) {
        // prints [Object object] string and not the object
        const rpc_respond = JSON.parse(event.data);
        console.log(`[message] Data received from server: ${event.data}`);
        // alert(rpc_respond.result);
        document.getElementById("one-panel").innerHTML = JSON.stringify(rpc_respond.result[0][0]);
        // document.getElementById("0").innerHTML = JSON.stringify(rpc_respond.result[0][0][0].infoHash) + " - " +  JSON.stringify(rpc_respond.result[0][0][0].bittorrent.info.name);
        document.getElementById("two-panel").innerHTML = JSON.stringify(rpc_respond.result[1]);
        document.getElementById("three-panel").innerHTML = JSON.stringify(rpc_respond.result[2]);
        document.getElementById("four-panel").innerHTML = JSON.stringify(rpc_respond.result[3][0]);
        
    };

    ws.onclose = function(event) {
        if (event.wasClean) {
            console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
            // e.g. server process killed or network down
            // event.code is usually 1006 in this case
            console.log('[close] Connection died');
        }
    };

    ws.onerror = function(error) {
        alert(`[error] ${error.message}`);
    };

}
else {
    // The browser doesn't support WebSocket
    alert("WebSocket is NOT supported by your Web browser!");
}
