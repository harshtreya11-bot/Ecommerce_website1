from django.urls import path
from . import views

urlpatterns = [
    path('', views.ProductListView.as_view()),
    path('<int:pk>/', views.ProductDetailView.as_view()),
    path('categories/', views.CategoryListView.as_view()),
    path('heroes/', views.HeroListView.as_view()),
    path('testimonials/', views.TestimonialListView.as_view()),
]