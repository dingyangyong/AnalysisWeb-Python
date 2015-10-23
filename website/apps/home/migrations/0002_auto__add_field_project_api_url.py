# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'Project.api_url'
        db.add_column(u'home_project', 'api_url',
                      self.gf('django.db.models.fields.CharField')(default='', max_length=100),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting field 'Project.api_url'
        db.delete_column(u'home_project', 'api_url')


    models = {
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

    complete_apps = ['home']