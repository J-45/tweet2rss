// https://javascript.info/websocket
// https://aria2.github.io/manual/en/html/aria2c.html#rpc-interface

// cd /home/groot/Documents/aria2_www/;aria2c --enable-rpc=true --rpc-secret=69 --rpc-listen-port=6800 --allow-overwrite=true --max-overall-download-limit=64K ubuntu-21.10-desktop-amd64.iso.torrent ubuntu-20.04.3-desktop-amd64.iso.torrent

if ("WebSocket" in window) {
    const ws = new WebSocket("ws://127.0.0.1:6800/jsonrpc");

    ws.onopen = function(_e) {
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
        document.getElementById("one-panel").innerHTML = JSON.stringify(rpc_respond.result[0][0], null, 4);
        // document.getElementById("0").innerHTML = JSON.stringify(rpc_respond.result[0][0][0].infoHash) + " - " +  JSON.stringify(rpc_respond.result[0][0][0].bittorrent.info.name);
        document.getElementById("two-panel").innerHTML = JSON.stringify(rpc_respond.result[1][0], null, 4);
        document.getElementById("three-panel").innerHTML = JSON.stringify(rpc_respond.result[2][0], null, 4);
        document.getElementById("four-panel").innerHTML = JSON.stringify(rpc_respond.result[3][0], null, 4);

        show_config(rpc_respond.result[3][0])
        
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

function show_config(options_arr) {
    document.getElementById("four-panel").innerHTML = "<form>";
    for (let [key, value] of Object.entries(options_arr)) {

        if (!isNaN(parseInt(value))) {
            value = `<input id="${key}" type="number" value="${value}">`;
        }else if (value === 'true') {
            value = `<input type="checkbox" id="${key}" name="${key}" checked>`;
        }else if (value === 'false') {
            value = `<input type="checkbox" id="${key}" name="${key}">`;
        }else{
            value = `<input type="text" id="${key}" name="${key}" value="${value}">`;
        }
        document.getElementById("four-panel").innerHTML += `${key}: ${value}<br>\n`
        console.log(`${key}: ${value}`);
      }
      document.getElementById("four-panel").innerHTML += "<br><input type='button' value='Save'>\n</form>";
}

// value = `<input type="checkbox" id="${key}" name="${key}" `
// if (value){
//     value += "checked>";
// }else{
//     value += ">";
// }
// break;
// case 'string':
// value = `<input type="text" id="${key}" name="${key}" value="${value}">`;
