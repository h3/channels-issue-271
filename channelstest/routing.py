from channels.routing import route
from testapp.consumers import ws_on_connect, ws_on_message, ws_on_disconnect

channel_routing = [
    route('websocket.connect',    ws_on_connect),
    route('websocket.receive',    ws_on_message),
    route('websocket.disconnect', ws_on_disconnect),
]
