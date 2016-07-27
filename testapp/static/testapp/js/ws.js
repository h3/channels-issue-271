var WsHandler = function(){
  var $self = this;
  var ws = window.location.protocol == 'https:' ? 'wss' : 'ws';
  $self.callbacks = [];

  $self.invokeCallback = function(e, payload) {
    for (var i = 0; i < $self.callbacks.length; i++) {
      var cb = $self.callbacks[i];
      if (cb.eventName == payload.eventName) {
        cb.callback(e, payload);
      }
    }
  };

  $self.connect = function() {
    $self.socket = new WebSocket(ws + '://' + window.location.host + '/');
    $self.socket.onopen = function(e) {
      $self.ready = true;
      $self.invokeCallback(e, {eventName: 'connected', data: {}})
    };

    $self.socket.onclose = function(e) {
      $self.ready = false;
      console.log('ONCLOSE');
      $self.invokeCallback(e, {eventName: 'disconnected', data: {}})
    };

    $self.socket.onerror = function(e) {
      $self.ready = false;
      console.log('ONERROR');
      $self.invokeCallback(e, {eventName: 'error', data: e})
    };

    $self.socket.onmessage = function(e) {
      var payload = JSON.parse(e.data);
      $self.invokeCallback(e, payload);
    };
  };

  $self.connect();

  return {
    ws: $self.socket,
    connect: function() {
      if (!$self.ready) {
        $self.connect();
      }
    },
    send: function(j) {
      if (!$self.ready) {
        $self.connect();
      }
      $self.socket.send(JSON.stringify(j));
    },
    on: function(eventName, callback){
      $self.callbacks.push({eventName: eventName, callback: callback});
    }
  }

};

