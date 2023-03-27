from django.db import models


class Node(models.Model):
    content = models.TextField()
    