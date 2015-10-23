# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'AnalysisData'
        db.create_table(u'analysis_analysisdata', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('analysis', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['analysis.Analysis'])),
            ('source', self.gf('django.db.models.fields.CharField')(max_length=200)),
            ('display', self.gf('django.db.models.fields.CharField')(max_length=10)),
            ('location', self.gf('django.db.models.fields.CharField')(max_length=10)),
            ('types', self.gf('django.db.models.fields.CharField')(max_length=50)),
            ('order', self.gf('django.db.models.fields.IntegerField')()),
        ))
        db.send_create_signal(u'analysis', ['AnalysisData'])

        # Deleting field 'Analysis.source'
        db.delete_column(u'analysis_analysis', 'source')

        # Deleting field 'Analysis.types'
        db.delete_column(u'analysis_analysis', 'types')


    def backwards(self, orm):
        # Deleting model 'AnalysisData'
        db.delete_table(u'analysis_analysisdata')

        # Adding field 'Analysis.source'
        db.add_column(u'analysis_analysis', 'source',
                      self.gf('django.db.models.fields.CharField')(default='', max_length=200),
                      keep_default=False)

        # Adding field 'Analysis.types'
        db.add_column(u'analysis_analysis', 'types',
                      self.gf('django.db.models.fields.CharField')(default='', max_length=50),
                      keep_default=False)


    models = {
        u'analysis.analysis': {
            'Meta': {'ordering': "('-order',)", 'object_name': 'Analysis'},
            'group': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['analysis.Group']"}),
            'icon': ('django.db.models.fields.CharField', [], {'max_length': '20'}),
            'icon_font_size': ('django.db.models.fields.CharField', [], {'max_length': '20'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'}),
            'order': ('django.db.models.fields.IntegerField', [], {})
        },
        u'analysis.analysisdata': {
            'Meta': {'ordering': "('-order',)", 'object_name': 'AnalysisData'},
            'analysis': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['analysis.Analysis']"}),
            'display': ('django.db.models.fields.CharField', [], {'max_length': '10'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'location': ('django.db.models.fields.CharField', [], {'max_length': '10'}),
            'order': ('django.db.models.fields.IntegerField', [], {}),
            'source': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'types': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        u'analysis.group': {
            'Meta': {'ordering': "('-order',)", 'object_name': 'Group'},
            'icon': ('django.db.models.fields.CharField', [], {'max_length': '20'}),
            'icon_font_size': ('django.db.models.fields.CharField', [], {'max_length': '20'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '20'}),
            'order': ('django.db.models.fields.IntegerField', [], {}),
            'project': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['home.Project']"})
        },
        u'home.project': {
            'Meta': {'ordering': "('-order',)", 'object_name': 'Project'},
            'api_url': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'app_id': ('django.db.models.fields.SmallIntegerField', [], {}),
            'icon': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'}),
            'order': ('django.db.models.fields.IntegerField', [], {})
        }
    }

    complete_apps = ['analysis']