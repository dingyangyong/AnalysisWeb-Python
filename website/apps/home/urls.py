# -*- coding: utf-8 -*-
from django.conf.urls import patterns, url

urlpatterns = patterns(
    'apps.home.views',
    url(r'^$', 'index', name='home_index'),
    url(r'^(?P<app_id>\d+)/$', 'app', name='home_app'),
    url(r'^changepassword', 'changepassword', name='home_changepassword'),
    url(r'^login$', 'login', name='home_login'),
    url(r'^logout$', 'logout', name='home_logout'),
    url(r'^stat/(?P<app_id>\d+)/$', 'stat', name='home_stat'),
    url(r'^copy/(?P<app_id>\d+)/(?P<new_app_id>\d+)/$', 'copy', name='home_copy')
)