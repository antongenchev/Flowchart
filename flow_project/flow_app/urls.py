from django.urls import path
from .views import NodeList, NodeCreate


urlpatterns = [
    path('nodes/', NodeList.as_view()),
    path('nodes/create/', NodeCreate.as_view()),
]