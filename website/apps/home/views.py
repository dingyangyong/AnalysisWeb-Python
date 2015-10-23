# -*- coding: utf-8 -*-
import json
import urllib
import urlparse
import logging
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, Http404, HttpResponse
from django.shortcuts import render
from apps.analysis.models import Group, Analysis, AnalysisData
from apps.home.models import Project
from forms import LoginForm, ChangePasswordForm
from django.conf import settings
from django.contrib.auth import login as auth_login, logout as auth_logout
from django.core.urlresolvers import reverse


logging = logging.getLogger('apps.home')


def get_url_html(url):
    u = urllib.urlopen(url)
    content = u.read()
    u.close()
    return content


@login_required
def index(request):
    """
    网站首页
    """
    print dir(request.user)
    if request.user.is_superuser:
        role = 3
    elif request.user.is_staff:
        role = 2
    else:
        role = 1

    project = None
    for pro in Project.objects.all():
        if request.user in pro.roles.all():
            project = Project.objects.get(app_id=pro.app_id)
            break

    if not project:
        raise Http404()

    return render(request, 'home/index.html', locals())


@login_required
def app(request, app_id):
    if request.user.is_superuser:
        role = 3
    elif request.user.is_staff:
        role = 2
    else:
        role = 1

    project = Project.objects.get(app_id=app_id)

    if request.user not in project.roles.all():
        raise Http404()

    return render(request, 'home/index.html', locals())


def login(request):
    """
    网站登录
    """
    redirect_to = request.REQUEST.get('next', '')

    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():

            expired = request.POST.get('aotologin')
            if expired:
                request.session.set_expiry(settings.LOGIN_COOKIE_AGE)
            else:
                request.session.set_expiry(0)

            netloc = urlparse.urlparse(redirect_to)[1]
            if not redirect_to:
                redirect_to = settings.LOGIN_REDIRECT_URL
            elif netloc and netloc != request.get_host():
                redirect_to = settings.LOGIN_REDIRECT_URL

            auth_login(request, form.get_user())

            logging.info('用户%s登录系统' % form.cleaned_data.get('username'))

            return HttpResponseRedirect(redirect_to)
    else:
        form = LoginForm()

    cxt = {
        'form': form,
        'next': redirect_to,
    }

    return render(request, 'home/login.html', cxt)


def logout(request):
    """
    退出登录
    """
    logging.info('用户%s退出系统' % request.user.username)
    auth_logout(request)
    return HttpResponseRedirect(reverse('home_login'))


@login_required
def changepassword(request):
    project = Project.objects.get(app_id=6)

    msg = ''
    logging.info('用户%s进入修改密码页面' % request.user.username)
    if request.method == 'POST':
        form = ChangePasswordForm(user=request.user, data= request.POST)
        if form.is_valid():
            form.save()
            msg = '修改密码成功！'
            logging.info('用户%s修改密码成功' % request.user.username)
    else:
        form = ChangePasswordForm(user=request.user)

    return render(request, 'home/changepassword.html', locals())


def stat(request, app_id):
    project = Project.objects.get(app_id=app_id)

    groups = project.group_set.all()

    group_list = []
    for g in groups:
        analysiss = g.analysis_set.all()

        analysis_list = []
        for a in analysiss:
            datas = a.analysisdata_set.all()

            data_list = []
            for d in datas:
                data = {
                    'name': d.name,
                    # 'url': d.source,
                    'level': d.role
                }
                data_list.append(data)

            analysis = {
                'name': a.name,
                'level': a.role,
                'data': data_list
            }
            analysis_list.append(analysis)

        group = {
            'name': g.name,
            'level': g.role,
            'data': analysis_list
        }
        group_list.append(group)

    return HttpResponse(json.dumps(group_list))


@login_required
def copy(request, app_id, new_app_id):
    project = Project.objects.get(app_id=app_id)

    project_new = Project.objects.create(
        name='新项目',
        app_id=new_app_id,
        icon='',
        api_url='',
        order=0
    )

    groups = project.group_set.all()

    for g in groups:

        group_new = Group.objects.create(
            project=project_new,
            name=g.name,
            icon=g.icon,
            icon_font_size=g.icon_font_size,
            role=g.role,
            order=g.order
        )

        analysiss = g.analysis_set.all()

        for a in analysiss:
            analysis_new = Analysis.objects.create(
                group=group_new,
                name=a.name,
                icon=a.icon,
                icon_font_size=a.icon_font_size,
                role=a.role,
                order=a.order
            )

            datas = a.analysisdata_set.all()

            for d in datas:
                AnalysisData.objects.create(
                    analysis=analysis_new,
                    name=d.name,
                    source=d.source,
                    display=d.display,
                    location=d.location,
                    types=d.types,
                    role=d.role,
                    order=d.order
                )

    return HttpResponse("ok")
