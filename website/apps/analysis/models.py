# -*- coding: utf-8 -*-
from django.db import models
from apps.home.models import Project


USER_ROLE_CHOICES = [
    (1, "等级1"),
    (2, "等级2"),
    (3, "等级3"),
]


class Group(models.Model):
    """
    组
    """
    project = models.ForeignKey(Project)

    name = models.CharField('组名', max_length=20)
    icon = models.CharField('Font Awesome图标', max_length=20)
    icon_font_size = models.CharField('Font Awesome图标大小', max_length=20)
    role = models.SmallIntegerField('权限', choices=USER_ROLE_CHOICES, default=1)
    order = models.IntegerField('排序')

    class Meta:
        verbose_name_plural = '组'
        ordering = ('-order',)

    def __unicode__(self):
        return '%s(%s)' % (self.name, self.project.name)


class Analysis(models.Model):
    """
    分析
    """
    group = models.ForeignKey(Group)

    name = models.CharField('分析名称', max_length=50)
    icon = models.CharField('Font Awesome图标', max_length=20)
    icon_font_size = models.CharField('Font Awesome图标大小', max_length=20)
    role = models.SmallIntegerField('权限', choices=USER_ROLE_CHOICES, default=1)
    order = models.IntegerField('排序')

    class Meta:
        verbose_name_plural = '分析来源'
        ordering = ('-order',)

    def __unicode__(self):
        return self.name

LOCATION_CHOICES = [
    ("0", "平铺"),
    ("1", "左边"),
    ("2", "右边"),
]

DISPLAY_CHOICES = [
    ("0", "图表"),
    ("1", "表格"),
    ("2", "饼图"),
    ("3", "月图表"),
    ("4", "纯图表"),
    ("5", "年图表"),
]


class AnalysisData(models.Model):
    """
    数据
    """
    analysis = models.ForeignKey(Analysis)

    name = models.CharField('数据名称', max_length=50)
    source = models.CharField('数据来源', max_length=200)
    display = models.CharField('数据格式', max_length=10, choices=DISPLAY_CHOICES)
    location = models.CharField('显示格式', max_length=10, choices=LOCATION_CHOICES)
    types = models.CharField('类型组', max_length=50)
    role = models.SmallIntegerField('权限', choices=USER_ROLE_CHOICES, default=1)
    order = models.IntegerField('排序')

    class Meta:
        ordering = ('-order',)

    def __unicode__(self):
        return self.name

