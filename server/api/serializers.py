# api/serializers.py

from rest_framework import serializers
from .models import Record


class RecordSerializer(serializers.ModelSerializer):
    # content = serializers.JSONField()

    class Meta:
        fields = ["record_id", "title", "content"]
        model = Record
