# -*- coding: utf-8 -*-
import urllib
import urlparse
import logging
import datetime
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, Http404
from django.shortcuts import render
from django.conf import settings
from django.contrib.auth import login as auth_login, logout as auth_logout
from django.core.urlresolvers import reverse
from apps.analysis.models import Analysis, Group, AnalysisData
from apps.home.models import Project


logging = logging.getLogger('apps.analysis')


def get_url_html(url):
    u = urllib.urlopen(url)
    content = u.read()
    u.close()
    return content


@login_required
def analysis(request, project_id, group_id, analysis_id):
    """
    网站首页
    """
    # 时间
    if request.user.is_superuser:
        role = 3
    elif request.user.is_staff:
        role = 2
    else:
        role = 1

    analysis = Analysis.objects.get(id=analysis_id)
    if not analysis:
        Http404()

    group = Group.objects.get(id=group_id)
    project = Project.objects.get(id=project_id)

    html_dic = {}

    ajax = request.GET.get('ajax', 'false')

    if ajax == 'true':
        return render(request, 'analysis/index_ajax.html', locals())
    else:
        return render(request, 'analysis/index.html', locals())


def analysis_data_ajax(request, analysis_data_id):

    d = request.GET.get('d', '')

    if request.user.is_superuser:
        role = 3
    elif request.user.is_staff:
        role = 2
    else:
        role = 1

    analysis_data = AnalysisData.objects.get(id=analysis_data_id)

    if not analysis_data:
        Http404()

    if d == '1':
        start_date = (datetime.datetime.now()).date()
        end_date = datetime.datetime.now().date()
    elif d == '2':
        start_date = (datetime.datetime.now() + datetime.timedelta(days=-1)).date()
        end_date = (datetime.datetime.now() + datetime.timedelta(days=-1)).date()
    elif d == '3':
        start_date = (datetime.datetime.now() + datetime.timedelta(days=-14)).date()
        end_date = datetime.datetime.now().date()
    elif d == '4':
        start_date = (datetime.datetime.now() + datetime.timedelta(days=-29)).date()
        end_date = datetime.datetime.now().date()
    elif d == '5':
        start_date = (datetime.datetime.now() + datetime.timedelta(days=-179)).date()
        end_date = datetime.datetime.now().date()
    elif d == '10':
        start_date = (datetime.datetime.now() + datetime.timedelta(days=-29)).date()
        end_date = datetime.datetime.now().date()
    elif d == '11':
        start_date = (datetime.datetime.now() + datetime.timedelta(days=-59)).date()
        end_date = datetime.datetime.now().date()
    elif d == '12':
        start_date = (datetime.datetime.now() + datetime.timedelta(days=-149)).date()
        end_date = datetime.datetime.now().date()
    else:
        if analysis_data.display == "3":
            start_date = (datetime.datetime.now() + datetime.timedelta(days=-59)).date()
            end_date = datetime.datetime.now().date()
        elif analysis_data.display == "5":
            start_date = (datetime.datetime.now() + datetime.timedelta(days=-364)).date()
            end_date = datetime.datetime.now().date()
        else:
            start_date = (datetime.datetime.now() + datetime.timedelta(days=-6)).date()
            end_date = datetime.datetime.now().date()

    # 类型
    type = request.GET.get('type', '')

    types = analysis_data.types.split(',')

    if not type and type not in types:
        type = types[0]

    url_data = {
        'startdate': start_date,
        'enddate': end_date,
        'type': type,
        'ismarkup': role == 1
    }

    data = get_url_html(analysis_data.analysis.group.project.api_url + analysis_data.source % urllib.urlencode(url_data))

    return render(request, 'analysis/analysis_data_ajax.html', locals())