# -*- coding: utf-8 -*-
import os
import sys
from os.path import join

# 设置编码
reload(sys)
sys.setdefaultencoding('utf-8')

# 项目主目录
root_path = os.path.abspath(os.path.dirname(__file__))

DEBUG = True
TEMPLATE_DEBUG = DEBUG

ADMINS = (
    # ('Your Name', 'your_email@example.com'),
)

MANAGERS = ADMINS

# 设置数据库连接
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'anysis',
        'USER': 'root',
        'PASSWORD': '123',
        'HOST': '127.0.0.1',
        'PORT': '3306',
    }
}

# 设置缓存
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'LOCATION': 'unique-snowflake'
    }
}

#Debug Tools
INTERNAL_IPS = ('127.0.0.1',)

# Hosts/domain names that are valid for this site; required if DEBUG is False
# See https://docs.djangoproject.com/en/1.4/ref/settings/#allowed-hosts
ALLOWED_HOSTS = []

# 设置时区
TIME_ZONE = 'Asia/Shanghai'

# 设置语言
LANGUAGE_CODE = 'zh-cn'

SITE_ID = 1

# 不使用国际化
USE_I18N = True
USE_L10N = True
USE_TZ = False

# 用户上传路径
MEDIA_ROOT = join(root_path, 'uploads/').replace('\\', '/')
MEDIA_URL = '/uploads/'

# 资源文件路径
STATIC_ROOT = ''
STATIC_URL = '/static/'
STATICFILES_DIRS = (
    join(root_path, 'static').replace('\\', '/'),
    join(root_path, 'static/images').replace('\\', '/'),
)

# List of finder classes that know how to find static files in
# various locations.
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    #'django.contrib.staticfiles.finders.DefaultStorageFinder',
)

# Make this unique, and don't share it with anybody.
SECRET_KEY = '@h5g5+&dzr40t7)52f@z%#pp3tp_ht^0l&w=ua%g+)yy$5v-6g'

# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
    #'django.template.loaders.eggs.Loader',
)

TEMPLATE_CONTEXT_PROCESSORS = (
    'django.core.context_processors.debug',
    'django.core.context_processors.i18n',
    'django.core.context_processors.media',
    'django.core.context_processors.static',
    'django.core.context_processors.request',
    'django.contrib.auth.context_processors.auth',
    'django.contrib.messages.context_processors.messages',
    'apps.home.context_processors.home',
)

MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.transaction.TransactionMiddleware',
    #'debug_toolbar.middleware.DebugToolbarMiddleware',
    # Uncomment the next line for simple clickjacking protection:
    # 'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'urls'

# Python dotted path to the WSGI application used by Django's runserver.
WSGI_APPLICATION = 'wsgi.application'

TEMPLATE_DIRS = (os.path.join(os.path.dirname(__file__), '', 'templates').replace('\\', '/'),)

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.admin',
    #'raven.contrib.django.raven_compat',
   'south',
    'debug_toolbar',
    'bootstrap_toolkit',

    #项目
    'apps.core',
    'apps.home',
    'apps.analysis',
)

#配置日志
import logging
import datetime

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(levelname)s %(module)s.%(funcName)s Line:%(lineno)d %(message)s',
    filename=join(root_path, 'log/%s.log' % datetime.datetime.now().strftime('%Y-%m-%d')).replace('\\', '/')
)

#登录配置
LOGIN_URL = '/login'
LOGIN_REDIRECT_URL = '/'

# RAVEN_CONFIG = {
#     'dsn': 'http://18646b5147dd4faaa4d125a0d028f322:93745bc1ed094db096f7be763282f326@yun.eebochina.com:9000/3',
# }

# kill SESSION_COOKIE_DOMAIN = 'adminportal.eebochina.com'
# SESSION_COOKIE_PATH = '/adminportal/'

#保持登录状态时间， 默认为30天
LOGIN_COOKIE_AGE = 2592000

#Bootstrap_Toolkit配置
BOOTSTRAP_BASE_URL = STATIC_URL
MEMCACHE = ['42.62.29.109:11211',]