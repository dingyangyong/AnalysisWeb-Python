# -*- coding: utf-8 -*-
from django.contrib import admin
from models import Project


class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'app_id')
    filter_horizontal = ('roles',)


admin.site.register(Project, ProjectAdmin)