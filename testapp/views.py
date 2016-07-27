# -*- coding: utf-8 -*-

from __future__ import unicode_literals

import os

from django.conf import settings
from django.views.generic import TemplateView


class MainView(TemplateView):
    template_name = 'testapp/main.html'

    def get_context_data(self, **kwargs):
        context = super(MainView, self).get_context_data(**kwargs)
        return context
