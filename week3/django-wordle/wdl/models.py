from django.db import models

# Create your models here.

class Game(models.Model):
    playerName = models.CharField(max_length=50)
    guess = models.CharField(max_length=5)
    word = models.CharField(max_length=5)
    green = models.IntegerField(default=0)
    yellow = models.IntegerField(default=0)