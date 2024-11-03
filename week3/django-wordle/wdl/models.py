from django.db import models

# Create your models here.

class Game(models.Model):
    playerName = models.CharField(max_length=50)
    guess = models.CharField(max_length=5)
    word = models.CharField(max_length=5)
    green = models.IntegerField(default=0)
    yellow = models.IntegerField(default=0)
    
    def compare_guess(self, player_guess, secret_word):
        correct = 0
        out_of_place = 0
        status = ['x' for _ in secret_word]
        for idx, guess in enumerate(player_guess):
            if guess == secret_word[idx]:
                correct += 1
                status[idx] = 'g'
            else:
                if guess in secret_word:
                    out_of_place += 1
                    status[idx] = 'y'
        return status, correct, out_of_place

    def make_guess(self, player_guess):
        self.guess = player_guess
        
    def __str__(self):
        result, self.green, self.yellow = self.compare_guess(self.guess, self.word)
        return " | ".join(result)

    def check_win(self):
        return self.green == 5
