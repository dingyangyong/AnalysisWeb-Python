# -*- coding: utf-8 -*-
from django.contrib.auth.models import User
from django.db import models


class Project(models.Model):
    """
    项目
    """
    name = models.CharField('项目名称', max_length=50)
    app_id = models.SmallIntegerField('项目ID')
    icon = models.CharField('图标地址', max_length=100)
    api_url = models.CharField('API的URL前缀', max_length=100)
    order = models.IntegerField('排序')

    roles = models.ManyToManyField(User, verbose_name='权限', null=True, blank=True)

    class Meta:
        verbose_name_plural = '项目'
        ordering = ('-order',)

    def __unicode__(self):
        return self.name