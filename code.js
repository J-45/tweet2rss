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
            {'methodName':'system.listMethods',
            'params':[['token:69']]},
            {'methodName':'system.listNotifications',
            'params':[['token:69']]},
            {'methodName':'aria2.tellActive',
            'params':['token:69']},
            {'methodName':'aria2.tellWaiting',
            'params':['token:69',0,666]},
            {'methodName':'aria2.tellStopped',
            'params':['token:69',0,666]},
        ]]
        }));

    ws.onmessage = function(event) {
        // prints [Object object] string and not the object
        alert(`[message] Data received from server: ${event.data}`);
    };

    ws.onclose = function() {   
        // websocket is closed.
        console.log("Connection is closed..."); 
    };
    }
}
else {
    // The browser doesn't support WebSocket
    alert("WebSocket is NOT supported by your Web browser!");
 }