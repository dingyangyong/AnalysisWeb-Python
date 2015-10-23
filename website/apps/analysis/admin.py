# -*- coding: utf-8 -*-
from django.contrib import admin
from models import Analysis, Group, AnalysisData


class GroupAdmin(admin.ModelAdmin):
    list_display = ('name', 'project_name')
    list_filter = ('project__name',)

    def project_name(self, obj):
        return obj.project.name
    project_name.short_description = 'Project Name'


class AnalysisDataInline(admin.TabularInline):
    model = AnalysisData


class AnalysisAdmin(admin.ModelAdmin):
    list_display = ('name', 'project_name')
    list_filter = ('group__project__name',)

    def project_name(self, obj):
        return obj.group.project.name
    project_name.short_description = 'Project Name'

    inlines = [
        AnalysisDataInline,
    ]


admin.site.register(Group, GroupAdmin)
admin.site.register(Analysis, AnalysisAdmin)
