from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, Product, Hero, Testimonial
from .serializers import CategorySerializer, ProductSerializer, HeroSerializer, TestimonialSerializer

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description', 'category__name']

    def get_queryset(self):
        qs = Product.objects.all()
        category = self.request.query_params.get('category')
        top_rated = self.request.query_params.get('top_rated')
        top_selling = self.request.query_params.get('top_selling')
        if category:
            qs = qs.filter(category__slug=category)
        if top_rated == 'true':
            qs = qs.filter(is_top_rated=True)
        if top_selling == 'true':
            qs = qs.filter(is_top_selling=True)
        return qs

class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class HeroListView(generics.ListAPIView):
    queryset = Hero.objects.all()
    serializer_class = HeroSerializer

class TestimonialListView(generics.ListAPIView):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
