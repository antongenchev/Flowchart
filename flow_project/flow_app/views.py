from django.views.generic import TemplateView
from django.shortcuts import render
from .models import Node
from rest_framework import generics
from .serializers import NodeSerializer


class NodeList(TemplateView):
    template_name = 'node_list.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['nodes'] = Node.objects.all()
        return context
    



class NodeCreate(generics.CreateAPIView):
    queryset = Node.objects.all()
    serializer_class = NodeSerializer