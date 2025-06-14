from django.shortcuts import render

def index(request):
    return render(request, 'index.html')


def submariner(request):
    return render(request, 'submariner.html')