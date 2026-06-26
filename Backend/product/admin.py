from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Product, Hero, Testimonial


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'category', 'is_top_rated', 'is_top_selling', 'created_at')
    list_filter = ('category', 'is_top_rated', 'is_top_selling')
    search_fields = ('name', 'description')


@admin.register(Hero)
class HeroAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'image_preview', 'created_at')
    search_fields = ('title', 'description')
    list_per_page = 10

    @admin.display(description='Image Preview')
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="80" height="80" style="object-fit:cover; border-radius:8px;" />', obj.image.url)
        return '-'


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'role', 'rating', 'image_preview', 'created_at')
    list_filter = ('rating',)
    search_fields = ('name', 'role', 'text')
    list_per_page = 10

    @admin.display(description='Image Preview')
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" style="object-fit:cover; border-radius:50%;" />', obj.image.url)
        return '-'
