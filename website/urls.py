from django.conf.urls import patterns, include, url, static
import settings
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns(
    '',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^', include('apps.home.urls')),
    url(r'^analysis/', include('apps.analysis.urls')),
)

urlpatterns += static.static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)