var ws = new WsHandler();

function log(msg) {
  $('<li>'+ msg +'</li>').appendTo('#logs');
}

ws.on('connected', function(e, resp){
  log('Socket <b>connected</b>, querying current user')
  ws.send({command: 'get-user'});
});

ws.on('on-get-user', function(e, resp){
  log('Got user <b>'+ resp.data +'</b>');
  log('Getting state');
  setTimeout(function(){
    ws.send({command: 'get-state'});
  }, 2000);
});

ws.on('on-get-state', function(e, resp){
  log('State is <b>'+ resp.data +'</b>');
  if (resp.data == 'None') {
    log('Setting session state <b>{"sky": "blue"}</b>');
    ws.send({command: 'set-state', data: {sky: "blue"}});
  }
});

ws.on('disconnected',  function(e, resp){
  log('Socketd dropped, reconnecting in 2s...');
  setTimeout(function(){
      ws.connect();
  }, 2000);
});

