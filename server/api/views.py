# api/views.py

from rest_framework import viewsets, response, status
from rest_framework import permissions, decorators
from project.settings import API_KEY
from .models import Record
from .serializers import RecordSerializer
from rest_framework.exceptions import PermissionDenied
from newsapi import NewsApiClient

newsapi = NewsApiClient(api_key=API_KEY)


@decorators.api_view(["GET"])
@decorators.permission_classes([permissions.IsAuthenticated])
def search(request):
    try:
        category = request.GET.get("category", None)
        q = request.GET.get("q", None)
        start_date = request.GET.get("start_date", None)
        end_date = request.GET.get("end_date", None)

        articles = None

        if category == "everything":
            # 3rd party API e.g. GET http://127.0.0.1:8000/api/search/?category=everything&q=bitcoin&start_date=2023-04-01&end_date=2023-04-16
            articles = newsapi.get_everything(
                q=q,
                from_param=start_date,
                to=end_date,
                language="en",
                sort_by="relevancy",
            )
        else:
            # 3rd party API e.g. GET http://127.0.0.1:8000/api/search/?category=science&q=quantum&start_date=2023-04-01&end_date=2023-04-16
            articles = newsapi.get_top_headlines(
                q=q,
                category=category,
                language="en",
            )

        return response.Response(articles)
    except:
        return response.Response("Invalid Query", status.HTTP_400_BAD_REQUEST)


# IsOwner = True IF Stored Records Owner == Loggedin User
class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner_id == request.auth.payload["user_id"]


# GET/POST Records only for the Loggedin User
class RecordViewSet(viewsets.ModelViewSet):
    serializer_class = RecordSerializer
    permission_classes = (IsOwner,)

    # Ensure a user sees only own Record objects.
    def get_queryset(self):
        user = self.request.user
        record_id = ""
        if self.kwargs:
            record_id = self.kwargs["pk"]

        if user.is_authenticated:
            if record_id:
                return Record.objects.filter(owner=user.id).filter(
                    record_id=record_id
                )  # GET single Record by id (owner=user)
            else:
                return Record.objects.filter(owner=user.id).values(
                    "record_id", "title", "owner"
                )  # GET a list of objects with values("record_id", "title")
        raise PermissionDenied()

    # Save Record and set user as owner of a Record object.
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
