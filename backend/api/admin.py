from django.contrib import admin
from .models import Resume, PersonalInfo, ResumeSection

@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'template', 'ats_score', 'created_at', 'updated_at')
    list_filter = ('template', 'created_at')
    search_fields = ('title', 'user__username')

@admin.register(PersonalInfo)
class PersonalInfoAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'phone', 'location')
    search_fields = ('full_name', 'email')

@admin.register(ResumeSection)
class ResumeSectionAdmin(admin.ModelAdmin):
    list_display = ('resume', 'type', 'order')
    list_filter = ('type',)
    search_fields = ('resume__title', 'type')
