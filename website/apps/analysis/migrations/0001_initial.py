# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Group'
        db.create_table(u'analysis_group', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('project', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['home.Project'])),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=20)),
            ('icon', self.gf('django.db.models.fields.CharField')(max_length=20)),
            ('icon_font_size', self.gf('django.db.models.fields.CharField')(max_length=20)),
            ('order', self.gf('django.db.models.fields.IntegerField')()),
        ))
        db.send_create_signal(u'analysis', ['Group'])

        # Adding model 'Analysis'
        db.create_table(u'analysis_analysis', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('group', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['analysis.Group'])),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=50)),
            ('source', self.gf('django.db.models.fields.CharField')(max_length=200)),
            ('icon', self.gf('django.db.models.fields.CharField')(max_length=20)),
            ('icon_font_size', self.gf('django.db.models.fields.CharField')(max_length=20)),
            ('types', self.gf('django.db.models.fields.CharField')(max_length=50)),
            ('order', self.gf('django.db.models.fields.IntegerField')()),
        ))
        db.send_create_signal(u'analysis', ['Analysis'])


    def backwards(self, orm):
        # Deleting model 'Group'
        db.delete_table(u'analysis_group')

        # Deleting model 'Analysis'
        db.delete_table(u'analysis_analysis')


    models = {
        u'analysis.analysis': {
            'Meta': {'ordering': "('-order',)", 'object_name': 'Analysis'},
            'group': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['analysis.Group']"}),
            'icon': ('django.db.models.fields.CharField', [], {'max_length': '20'}),
            'icon_font_size': ('django.db.models.fields.CharField', [], {'max_length': '20'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'}),
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
            'app_id': ('django.db.models.fields.SmallIntegerField', [], {}),
            'icon': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'}),
            'order': ('django.db.models.fields.IntegerField', [], {})
        }
    }

    complete_apps = ['analysis']