from django.shortcuts import render
from .cnnmodel import  *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from .models import *
from rest_framework.permissions import AllowAny
# Create your views here.

#predict=trained_model()

class ImageSere(serializers.ModelSerializer):
	class Meta:
		model= Image
		fields='__all__'


class Cor(serializers.ModelSerializer):
	class Meta:
		model=Cordinates
		fields='__all__'






class Index(APIView):
	permission_classes = (AllowAny,)
	def get(self,request):
		return render(request,template_name="index.html")

	def post(self,request):
		x=ImageSere(data=request.data,context={"request": request})
		#import pdb;pdb.set_trace()
		x.is_valid(raise_exception=True)
		x.save()
		return Response({'data':x.data})
		#import pdb;pdb.set_trace()

class Review(APIView):
	permission_classes = (AllowAny,)
	def get(self,request):
		return render(request,template_name="review.html")


class Get_data(APIView):
	def get(self,request):
		data=Cordinates.objects.all()
		p=Image.objects.all()
		lis=[]
		data={}
		for x in p:
			data['image']=ImageSere(x,context={'request':request}).data
			data['cordinates']=Cor(Cordinates.objects.filter(image=x),many=True,context={'request':request}).data
			#import pdb;pdb.set_trace()
			lis.append(data)
			data={}
		#import pdb;pdb.set_trace()
		return Response(lis)





class cordinatesview(APIView):
	permission_classes = (AllowAny,)
	def post(self,request):
		x=Cor(data=request.data)
		x.is_valid(raise_exception=True)
		x.save()
		return Response({'data':x.data})



