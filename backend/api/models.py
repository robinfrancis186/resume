from django.db import models
from django.contrib.auth.models import User

class Resume(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    template = models.CharField(max_length=50, default='modern')
    ats_score = models.FloatField(null=True, blank=True)

    def __str__(self):
        return self.title

class PersonalInfo(models.Model):
    resume = models.OneToOneField(Resume, on_delete=models.CASCADE, related_name='personal_info')
    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    location = models.CharField(max_length=200)
    linkedin = models.URLField(blank=True)
    portfolio = models.URLField(blank=True)

    def __str__(self):
        return self.full_name

class ResumeSection(models.Model):
    SECTION_TYPES = [
        ('education', 'Education'),
        ('experience', 'Experience'),
        ('skills', 'Skills'),
        ('projects', 'Projects'),
        ('certifications', 'Certifications'),
    ]

    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='sections')
    type = models.CharField(max_length=50, choices=SECTION_TYPES)
    order = models.IntegerField(default=0)
    content = models.JSONField()

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.resume.title} - {self.type}"
