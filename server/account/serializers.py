# account/serializers.py

from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, style={"input_type": "password"}
    )
    password2 = serializers.CharField(
        style={"input_type": "password"}, write_only=True, label="Confirm password"
    )

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

        if (
            email
            and User.objects.filter(email=email).exclude(username=username).exists()
        ):
            raise serializers.ValidationError(
                {"email": "Email addresses must be unique."}
            )
        if password != password2:
            raise serializers.ValidationError({"password": "The two passwords differ."})
        user = User(username=username, email=email)
        user.set_password(password)
        user.save()
        return user
