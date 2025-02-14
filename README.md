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
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
# Frontend (.env.local)
NEXT_PUBLIC_FIREBASE_CONFIG=your_firebase_config
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# Backend (.env)
DJANGO_SECRET_KEY=your_django_secret_key
```

5. Run the development servers:

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

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/) 