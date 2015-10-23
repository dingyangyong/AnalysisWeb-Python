# -*- coding: utf-8 -*-
from django.conf import settings
from apps.analysis.models import Analysis
from libs import memcache
from models import Project


def home(request):

    project_list = Project.objects.all()

    cache = memcache.Client(settings.MEMCACHE)
    update_date = cache.get('BiztechNews_AnalysisReportDate')

    if update_date:
        update_date = update_date.replace('"', '')

    return {
        'project_list': project_list,
        'update_date': update_date,
    }