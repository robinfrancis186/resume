from rest_framework import serializers
from .models import Resume, PersonalInfo, ResumeSection

class PersonalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalInfo
        fields = ['full_name', 'email', 'phone', 'location', 'linkedin', 'portfolio']

class ResumeSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeSection
        fields = ['id', 'type', 'order', 'content']

class ResumeSerializer(serializers.ModelSerializer):
    personal_info = PersonalInfoSerializer()
    sections = ResumeSectionSerializer(many=True)

    class Meta:
        model = Resume
        fields = ['id', 'title', 'template', 'ats_score', 'personal_info', 'sections', 'created_at', 'updated_at']

    def create(self, validated_data):
        personal_info_data = validated_data.pop('personal_info')
        sections_data = validated_data.pop('sections')
        
        resume = Resume.objects.create(**validated_data)
        PersonalInfo.objects.create(resume=resume, **personal_info_data)
        
        for section_data in sections_data:
            ResumeSection.objects.create(resume=resume, **section_data)
        
        return resume

    def update(self, instance, validated_data):
        personal_info_data = validated_data.pop('personal_info', None)
        sections_data = validated_data.pop('sections', None)

        # Update resume instance
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update personal info
        if personal_info_data:
            personal_info = instance.personal_info
            for attr, value in personal_info_data.items():
                setattr(personal_info, attr, value)
            personal_info.save()

        # Update sections
        if sections_data:
            instance.sections.all().delete()
            for section_data in sections_data:
                ResumeSection.objects.create(resume=instance, **section_data)

        return instance 