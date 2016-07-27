# -*- coding: utf-8 -*-

from __future__ import unicode_literals

from django.conf.urls import url, include
from django.conf import settings
from django.contrib.auth.decorators import login_required

from testapp.views import MainView

urlpatterns=[

    url(r'^$', login_required(MainView.as_view()), name='main-view'),
    url('^accounts/', include('django.contrib.auth.urls')),

]

