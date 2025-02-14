from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
import google.generativeai as genai
from django.conf import settings
from .models import Resume
from .serializers import ResumeSerializer

class ResumeViewSet(viewsets.ModelViewSet):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer

    @action(detail=True, methods=['post'])
    def enhance_content(self, request, pk=None):
        resume = self.get_object()
        section_id = request.data.get('section_id')
        content = request.data.get('content')

        if not section_id or not content:
            return Response(
                {'error': 'section_id and content are required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            section = resume.sections.get(id=section_id)
            
            # Initialize Google Gemini
            genai.configure(api_key=settings.GEMINI_API_KEY)
            model = genai.GenerativeModel('gemini-pro')

            # Prepare the prompt
            prompt = f"""
            Enhance the following resume {section.type} content to be more impactful and professional:
            {content}
            
            Please provide:
            1. More action-oriented language
            2. Quantifiable achievements where possible
            3. Industry-relevant keywords
            4. Clear and concise phrasing
            """

            # Generate enhanced content
            response = model.generate_content(prompt)
            enhanced_content = response.text

            # Update the section content
            section.content = enhanced_content
            section.save()

            return Response({'enhanced_content': enhanced_content})

        except Resume.DoesNotExist:
            return Response(
                {'error': 'Section not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=True, methods=['post'])
    def calculate_ats_score(self, request, pk=None):
        resume = self.get_object()
        job_description = request.data.get('job_description')

        if not job_description:
            return Response(
                {'error': 'job_description is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Initialize Google Gemini
            genai.configure(api_key=settings.GEMINI_API_KEY)
            model = genai.GenerativeModel('gemini-pro')

            # Prepare resume content
            resume_content = {
                'personal_info': resume.personal_info.__dict__,
                'sections': [section.__dict__ for section in resume.sections.all()]
            }

            # Prepare the prompt
            prompt = f"""
            Analyze this resume against the job description and provide an ATS score (0-100) and improvement suggestions:

            Job Description:
            {job_description}

            Resume:
            {resume_content}

            Please provide:
            1. ATS compatibility score (0-100)
            2. Missing keywords
            3. Format improvements
            4. Content suggestions
            """

            # Generate analysis
            response = model.generate_content(prompt)
            analysis = response.text

            # Extract score from analysis (assuming the AI includes it in a parseable format)
            # This is a simplified example - you might need more sophisticated parsing
            try:
                score_line = [line for line in analysis.split('\n') if 'score' in line.lower()][0]
                score = float(score_line.split(':')[1].strip().split('/')[0])
            except:
                score = 0

            # Update resume ATS score
            resume.ats_score = score
            resume.save()

            return Response({
                'score': score,
                'analysis': analysis
            })

        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
