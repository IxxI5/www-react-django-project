# [**JWT Auth with Django REST API**](https://medium.com/swlh/jwt-auth-with-djangorest-api-9fb32b99b33c)

_Instructions on how to create a Django Web API with JWT Authentication, Login, Logout, Register and Notes endpoints along with SQLite CRUD Operations from Scratch. As a data model example is used a **Note** Class._

## Table of Contents

- [Step 1 - Create a Django Project, Structure and Install Django REST Framework](#step-1---create-a-django-project-structure-and-install-django-rest-framework)
- [Step 2 - Create a Django App (JWT Authentication)](#step-2---create-a-django-app-jwt-authentication)

- [Step 3 - Create a Django App (Web API)](#step-3---create-a-django-app-web-api)

- [Step 4 - Install CORS, Simple JWT and Swagger UI Tools](#step-4---install-cors-simple-jwt-and-swagger-ui-tools)

- [Step 5 - Register the Created Apps and Tools in Project Settings](#step-5---register-the-created-apps-and-tools-in-project-settings)

- [Step 6 - Configure the Created Apps and Tools in Project Settings](#step-6---configure-the-created-apps-and-tools-in-project-settings)

- [Step 7 - Create an Empty SQLite Database](#step-7---create-an-empty-sqlite-database)

- [Step 8 - Register the Account Endpoints in Account Urls](#step-8---register-the-account-endpoints-in-account-urls)

- [Step 9 - Register the API Endpoints in API Urls](#step-9---register-the-api-endpoints-in-api-urls)

- [Step 10 - Register the API, Account and Tools Complete URLs in Project Urls](#step-10---register-the-api-account-and-tools-complete-urls-in-project-urls)

- [Step 11 - Create User Object Serializer in Account Serializers](#step-11---create-user-object-serializer-in-account-serializers)

- [Step 12 - Create Register and Logout Views in Accout Views](#step-12---create-register-and-logout-views-in-account-views)

- [Step 13 - Create the Note Model in API Models](#step-13---create-the-note-model-in-api-models)

- [Step 14 - Create the Note Model Serializer in API Serializers](#step-14---create-the-note-model-serializer-in-api-serializers)

- [Step 15 - Create the Note (GET/POST Notes) View in API Views](#step-15---create-the-note-getpost-notes-view-in-api-views)

- [Step 16 - Make Migrations and Migrate](#step-16---make-migrations-and-migrate)

- [Step 17 - Create a Super User](#step-17---create-a-super-user)

- [Step 18 - Create or Install the Requirements.txt](#step-18---create-or-install-the-requirementstxt)

- [Step 19 - Check the Django API with Swagger UI](#step-19---check-the-django-api-with-swagger-ui)

### [**Step 1 - Create a Django Project, Structure and Install Django REST Framework**](#table-of-contents)

**VS Code Command Prompt**

```
mkdir server

cd server

python -m venv venv

cd venv/scripts

.\activate

cd ..\..\

pip install Django

pip install djangorestframework

django-admin startproject project
```

**VS Code Command Prompt - Simplify Project Structure (non-mandatory)**

```
move project\manage.py .\

move project\project\* project

rmdir project\project\
```

Resulted Structure:

```
server
  │
  ├── project
  ├── venv
  │
  └── manage.py
```

### [**Step 2 - Create a Django App (JWT Authentication)**](#table-of-contents)

Create a Django App (**account**) for authenticating users through JWT Authentication.

**VS Code Command Prompt**

```
django-admin startapp account
```

### [**Step 3 - Create a Django App (Web API)**](#table-of-contents)

Create a Django App (**api**) for accessing (GET/POST) data.

**VS Code Command Prompt**

```
django-admin startapp api
```

Resulted Structure:

```
server
  │
  ├── account
  ├── api
  ├── project
  ├── venv
  │
  └── manage.py
```

### [**Step 4 - Install CORS, Simple JWT and Swagger UI Tools**](#table-of-contents)

**VS Code Command Prompt**

```
pip install --upgrade django-cors-headers

pip install --upgrade djangorestframework-simplejwt

pip install --upgrade drf-spectacular
```

### [**Step 5 - Register the Created Apps and Tools in Project Settings**](#table-of-contents)

```python
# project/settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework', # new
    'rest_framework_simplejwt.token_blacklist', # new
    'corsheaders', # new
    'drf_spectacular', # new
    'api', # new
    'account', # new
]

```

### [**Step 6 - Configure the Created Apps and Tools in Project Settings**](#table-of-contents)

```python
# project/settings.py

# MIDDLEWARE = [...] # below MIDDLEWARE, add:

CORS_ORIGIN_ALLOW_ALL = True # new

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.IsAuthenticated",],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ],
    "DEFAULT_PARSER_CLASSES": ["rest_framework.parsers.JSONParser",],
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
} # new

SPECTACULAR_SETTINGS = {
    'TITLE': 'Your Project API',
    'DESCRIPTION': 'Your project description',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
    # OTHER SETTINGS
} # new

```

### [**Step 7 - Create an Empty SQLite Database**](#table-of-contents)

**VS Code Command Prompt**

```
python manage.py migrate
```

Resulted Structure:

```
server
  │
  ├── account
  ├── api
  ├── project
  ├── venv
  │
  ├── db.sqlite3
  └── manage.py
```

### [**Step 8 - Register the Account Endpoints in Account Urls**](#table-of-contents)

```python
# account/urls.py (create it)
# change Python Interpreter to Global,
# otherwise rest_framework_simplejwt.views cannot be imported

from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import register_user, logout_user

urlpatterns = [
    path("register/", register_user, name="register"),
    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("logout/", logout_user, name="logout"),
]
```

### [**Step 9 - Register the API Endpoints in API Urls**](#table-of-contents)

```python
# api/urls.py (create it)

from django.urls import path
from rest_framework.routers import SimpleRouter
from .views import NoteViewSet

router = SimpleRouter()
router.register('notes', NoteViewSet, basename="notes")
urlpatterns = router.urls
```

### [**Step 10 - Register the API, Account and Tools Complete URLs in Project Urls**](#table-of-contents)

```python
# project/urls.py

from django.contrib import admin
from django.urls import path, include # new
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView # new
 
urlpatterns = [
    # Admin, API, Auth and Account Complete URLs

    path('admin/', admin.site.urls),
    path('api/', include('api.urls')), # new
    path('auth/', include('rest_framework.urls')), # new
    path('api/account/', include('account.urls'), name='account'), # new

    # API Tools (Viewers) Complete URLs

    path('api/schema/swagger-ui/',
    SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'), # new
    path('api/schema/redoc/',
    SpectacularRedocView.as_view(url_name='schema'), name='redoc'), # new
    path('api/schema/',
    SpectacularAPIView.as_view(), name='schema'), # new
]
```

### [**Step 11 - Create User Object Serializer in Account Serializers**](#table-of-contents)

```python
# account/serializers.py (create it)

from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={
                                     "input_type":   "password"})
    password2 = serializers.CharField(
        style={"input_type": "password"}, write_only=True, label="Confirm password")

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password",
            "password2",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        # https://stackoverflow.com/questions/67131340/keyerror-drf-when-posting
        # if the key "username" is not available
        # validated_data["username"]        returns KeyError
        # validated_data.get("username")    returns None

        username = validated_data.get("username", None)
        email = validated_data.get("email", None)
        password = validated_data.get("password", None)
        password2 = validated_data.get("password2", None)

        # check for NULL, means a field is not available in request e.g. username
        if username == None or email == None or password == None or password2 == None:
            raise serializers.ValidationError({"fieldvalue": "None"})

        if (email and User.objects.filter(email=email).exclude(username=username).exists()):
            raise serializers.ValidationError(
                {"email": "Email addresses must be unique."})
        if password != password2:
            raise serializers.ValidationError(
                {"password": "The two passwords differ."})
        user = User(username=username, email=email)
        user.set_password(password)
        user.save()
        return user
```

### [**Step 12 - Create Register and Logout Views in Account Views**](#table-of-contents)

```python
# account/views.py

from rest_framework import response, decorators, permissions, status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserCreateSerializer

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
```

### [**Step 13 - Create the Note Model in API Models**](#table-of-contents)

```python
# api/models.py

from django.db import models
from django.contrib.auth.models import User


class Note(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
```

### [**Step 14 - Create the Note Model Serializer in API Serializers**](#table-of-contents)

```python
# api/serializers.py (create it)

from rest_framework import serializers
from .models import Note


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ("id", "title", "content", "created", "updated")
        model = Note
```

### [**Step 15 - Create the Note (GET/POST Notes) View in API Views**](#table-of-contents)

```python
# api/views.py

from rest_framework import viewsets
from rest_framework import permissions
from .models import Note
from .serializers import NoteSerializer
from rest_framework.exceptions import PermissionDenied

# IsOwner = True IF Stored Notes Owner == Loggedin User
class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user

# GET/POST Notes only for the Loggedin User
class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    permission_classes = (IsOwner,)

    # Ensure a user sees only own Note objects.
    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Note.objects.filter(owner=user) # GET List of Notes (owner=user)
        raise PermissionDenied()

    # Set user as owner of a Notes object.
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
```

### [**Step 16 - Make Migrations and Migrate**](#table-of-contents)

```
python manage.py makemigrations

python manage.py migrate
```

### [**Step 17 - Create a Super User**](#table-of-contents)

```
python manage.py createsuperuser
```

**Super User Details Example**

```
Username: user1234
Email address: user1234@gmail.com
Password: PassWord1234
Password (again): PassWord1234
```

### [**Step 18 - Create or Install the Requirements.txt**](#table-of-contents)

**Create the requirements.txt**

Go to **server** Folder and then execute the following command in the VS Code Command Prompt:

```
pip freeze > requirements.txt
```

**Results** (Example)

```
asgiref==3.6.0
attrs==22.2.0
black==23.1.0
click==8.1.3
colorama==0.4.6
Django==4.1.7
django-cors-headers==3.14.0
django-rest-framework==0.1.0
djangorestframework==3.14.0
djangorestframework-simplejwt==5.2.2
drf-spectacular==0.26.1
inflection==0.5.1
jsonschema==4.17.3
mypy-extensions==1.0.0
packaging==23.0
pathspec==0.11.1
platformdirs==3.1.1
PyJWT==2.6.0
pyrsistent==0.19.3
pytz==2022.7.1
PyYAML==6.0
sqlparse==0.4.3
tzdata==2023.2
uritemplate==4.1.1
```

**Install the requirements.txt (Not Applicable for this Instructions)**

After having downloaded an entire django project from Github, go to the root Folder e.g. **server** and execute the following commands in VS Code Command Prompt in order to install the corresponding packages (see above):

```
python -m venv venv

cd venv/scripts

.\activate

cd ..\..\

pip install -r requirements.txt
```

### [**Step 19 - Check the Django API with Swagger UI**](#table-of-contents)

```
python manage.py runserver
```

```python
"""
Starting development server at http://127.0.0.1:8000

Open the Browser and enter: http://127.0.0.1:8000/api/schema/swagger-ui/

Your Project API
Your Project descrription

api

no-auth [POST]      /api/account/login/
auth    [POST]      /api/account/logout/
no-auth [POST]      /api/account/refresh/
auth    [POST]      /api/account/register/
auth    [GET]       /api/notes/
auth    [POST]      /api/notes/
auth    [GET]       /api/notes/{id}/
auth    [PUT]       /api/notes/{id}/
auth    [PATCH]     /api/notes/{id}/
auth    [DELETE]    /api/notes/{id}/
"""
```
