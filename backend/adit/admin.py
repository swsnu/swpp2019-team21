from django.contrib import admin
from .models import AditUser, InterestedTags, PostImage, AdPost, AdReception

# Register your models here.
admin.site.register(AditUser)
admin.site.register(InterestedTags)
admin.site.register(PostImage)
admin.site.register(AdPost)
admin.site.register(AdReception)