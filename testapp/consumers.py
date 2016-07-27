# -*- coding: utf-8 -*-

import json
import datetime

from channels.sessions import channel_session
from channels.auth import channel_session_user, channel_session_user_from_http


@channel_session_user_from_http
def ws_on_connect(message):
    ip, port = message.content.get('client')
    headers = dict(message.get('headers'))
    print
    print "---[SOCKET CONNECTED]-----------------------------------------------"
    print "HEADERS: %s" % headers
    print "USER: %s" % message.user
    print "STATE: %s" % message.channel_session.get('state')
    print "--------------------------------------------------------------------"
    print


@channel_session_user
def ws_on_message(message):
    payload = json.loads(message['text'])

    if payload['command'] == 'get-user':
        message.reply_channel.send({'text': json.dumps({
          'eventName': 'on-get-user',
          'data': '%s' % message.user,
        })})

    elif payload['command'] == 'set-state':
        message.channel_session['state'] = payload['data']

    elif payload['command'] == 'get-state':
        message.reply_channel.send({'text': json.dumps({
          'eventName': 'on-get-state',
          'data': '%s' % message.channel_session.get('state'),
        })})

    print
    print "---[SOCKET MESSAGE]-------------------------------------------------"
    print "PAYLOAD: %s" % payload
    print "USER: %s" % message.user
    print "STATE: %s" % message.channel_session.get('state')
    print "--------------------------------------------------------------------"
    print


@channel_session_user
def ws_on_disconnect(message):
    message.reply_channel.send({'text': json.dumps({
        "command": 'disconnect'
    })})
