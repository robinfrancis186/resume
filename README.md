# AI Resume Builder

A modern, AI-powered resume builder with real-time preview and intelligent content suggestions.

## Features

- 🤖 AI-Powered Resume Suggestions
- 📝 Real-time Resume Preview
- 📄 Upload & Parse Resume
- 🎯 ATS Score Checker
- ✨ AI-Based Enhancements
- 💾 Download & Export
- 🌙 Dark Mode Support

## Tech Stack

- **Frontend**: Next.js (React)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Backend**: Django
- **Database**: Firebase
- **AI Model**: Google Gemini
- **Resume Parsing**: Resume-Parser (Python)
- **ATS Score Checking**: Custom NLP implementation

## Getting Started

### Prerequisites

- Node.js 18+ 
- Python 3.8+
- Firebase account
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/robinfrancis186/resume.git
cd resume
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
```

4. Set up environment variables:

Frontend (.env.local):
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_FIREBASE_CONFIG={
    "apiKey": "your-api-key",
    "authDomain": "your-auth-domain",
    "projectId": "your-project-id",
    "storageBucket": "your-storage-bucket",
    "messagingSenderId": "your-messaging-sender-id",
    "appId": "your-app-id"
}
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key
```

Backend (.env):
```bash
DEBUG=True
DJANGO_SECRET_KEY=your-django-secret-key
GEMINI_API_KEY=your-gemini-api-key
```

5. Initialize the database:
```bash
cd backend
python manage.py migrate
python manage.py createsuperuser
```

6. Run the development servers:

Frontend:
```bash
cd frontend
npm run dev
```

Backend:
```bash
cd backend
python manage.py runserver
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api
- Admin Interface: http://localhost:8000/admin

## Deployment

### Frontend Deployment (Vercel)

1. Create a Vercel account and install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy to Vercel:
```bash
cd frontend
vercel
```

3. Add environment variables in the Vercel dashboard.

### Backend Deployment (Railway/Heroku)

1. Create a Railway account and install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Initialize Railway project:
```bash
cd backend
railway init
```

3. Add environment variables in Railway dashboard.

4. Deploy to Railway:
```bash
railway up
```

### Database Setup

1. Create a Firebase project
2. Set up Firebase Authentication
3. Create a Firestore database
4. Add Firebase configuration to environment variables

## Contributing

1. Fork the repository
2. Create your feature branch:
```bash
git checkout -b feature/amazing-feature
```
3. Commit your changes:
```bash
git commit -m 'Add some amazing feature'
```
4. Push to the branch:
```bash
git push origin feature/amazing-feature
```
5. Open a Pull Request

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Support

For support, email robinfrancis186@gmail.com or open an issue in the repository. 