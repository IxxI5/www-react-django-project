# account/views.py

from django.contrib.auth import get_user_model
from rest_framework import response, decorators, permissions, status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserCreateSerializer

User = get_user_model()


@decorators.api_view(["POST"])
@decorators.permission_classes([permissions.AllowAny])
def register_user(request):
    serializer = UserCreateSerializer(data=request.data)
    if not serializer.is_valid():
        return response.Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    user = serializer.save()
    refresh = RefreshToken.for_user(user)
    res = {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }

    return response.Response(res, status.HTTP_201_CREATED)


@decorators.api_view(["POST"])
@decorators.permission_classes([permissions.IsAuthenticated])
def logout_user(request):
    try:
        token = RefreshToken(request.data.get("refresh"))
        token.blacklist()

        return response.Response(status=status.HTTP_200_OK)
    except Exception as e:
        return response.Response(status=status.HTTP_400_BAD_REQUEST)
