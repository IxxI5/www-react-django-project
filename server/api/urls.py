# api/urls.py
# from django.urls import re_path as url
from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import RecordViewSet, search

router = SimpleRouter()
router.register("records", RecordViewSet, basename="records")

urlpatterns = [
    path("search/", search, name="search"),
]

urlpatterns += router.urls
