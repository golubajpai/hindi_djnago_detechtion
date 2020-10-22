from django.db import models

# Create your models here.


class Image(models.Model):
	image=models.ImageField()
	approve=models.BooleanField(default=False)


class Cordinates(models.Model):
	first= models.CharField(max_length=200)
	second= models.CharField(max_length=200)
	third= models.CharField(max_length=200)
	forth= models.CharField(max_length=200)
	spacial=models.BooleanField(default=False)
	underline=models.BooleanField(default=False)
	image=models.ForeignKey(Image,on_delete=models.CASCADE)


