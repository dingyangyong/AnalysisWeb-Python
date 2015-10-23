# -*- coding: utf-8 -*-
from django.conf.urls import patterns, url

urlpatterns = patterns(
    'apps.analysis.views',
    url(r'^analysis_data_ajax/(?P<analysis_data_id>\w+)/$', 'analysis_data_ajax', name='analysis_data_ajax'),
    url(r'^(?P<project_id>\w+)/(?P<group_id>\w+)/(?P<analysis_id>\w+)/$',
        'analysis', name='analysis_view'),
)