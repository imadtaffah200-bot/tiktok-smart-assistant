<<<<<<< HEAD
# TikTok Smart Assistant

An AI-powered web application for TikTok content creators. Generate viral video ideas, catchy hooks, professional descriptions, trending hashtags, and get personalized growth insights through AI-powered chat assistance.

![TikTok Smart Assistant](https://img.shields.io/badge/TikTok-Smart%20Assistant-FF0050?style=for-the-badge&logo=tiktok&logoColor=white)

## Features

### 🎯 Video Ideas Generator
Generate viral TikTok video ideas based on your niche. Get creative concepts with viral potential ratings, best posting times, and engagement predictions.

### 🪝 Catchy Hooks Generator
Create attention-grabbing hooks for your videos. Choose from various styles including shocking, humorous, emotional, educational, relatable, and mystery.

### 📝 Description Generator
Write professional video descriptions with engaging CTAs. Customize length and tone to match your brand voice.

### #️⃣ Hashtag Generator
Get trending hashtags categorized by niche, trending, broad, and brand. Maximize your video reach with optimized hashtag strategies.

### 📊 Channel Analyzer
Analyze your TikTok channel for growth insights. Get detailed recommendations for content strategy, posting times, and engagement optimization.

### 💬 AI Chat Assistant
Get personalized TikTok growth tips and advice through our AI-powered chat. Ask anything about content creation, growth strategies, and analytics.

## Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express.js** - API server
- **OpenAI API** - AI-powered features

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key

### Installation

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=5000
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### API Health Check
```bash
curl http://localhost:5000/api/health
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/ideas/generate` | Generate video ideas |
| POST | `/api/generator/hooks` | Generate catchy hooks |
| POST | `/api/generator/description` | Generate descriptions |
| POST | `/api/generator/hashtags` | Generate hashtags |
| POST | `/api/analyzer/analyze` | Analyze TikTok channel |
| POST | `/api/chat/message` | AI chat message |
| DELETE | `/api/chat/clear` | Clear chat history |

### Example Requests

**Generate Ideas**
```bash
curl -X POST http://localhost:5000/api/ideas/generate \
  -H "Content-Type: application/json" \
  -d '{"niche": "cooking", "count": 5}'
```

**Generate Hooks**
```bash
curl -X POST http://localhost:5000/api/generator/hooks \
  -H "Content-Type: application/json" \
  -d '{"topic": "quick breakfast recipes", "count": 5, "style": "educational"}'
```

**Generate Hashtags**
```bash
curl -X POST http://localhost:5000/api/generator/hashtags \
  -H "Content-Type: application/json" \
  -d '{"topic": "fitness tips", "count": 10}'
```

**Analyze Channel**
```bash
curl -X POST http://localhost:5000/api/analyzer/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "channelName": "FitnessCreator",
    "followerCount": 50000,
    "totalLikes": 2500000,
    "avgViews": 75000
  }'
```

**Chat Message**
```bash
curl -X POST http://localhost:5000/api/chat/message \
  -H "Content-Type: application/json" \
  -d '{"message": "How can I increase my engagement rate?", "sessionId": "user123"}'
```

## Project Structure

```
tiktok-smart-assistant/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── context/          # React context
│   │   ├── utils/             # Utilities (API calls)
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── server/                    # Express backend
│   ├── routes/               # API routes
│   ├── middleware/           # Express middleware
│   └── index.js              # Server entry point
├── .env.example              # Environment template
├── package.json
└── README.md
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |
| `PORT` | Server port (default: 5000) | No |
| `NODE_ENV` | Environment mode | No |
| `FRONTEND_URL` | Frontend URL for CORS | No |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend and backend |
| `npm run server` | Start backend only |
| `npm run client` | Start frontend only |
| `npm run build` | Build frontend for production |
| `npm run install:all` | Install all dependencies |

## Deployment

### Backend (Production)

1. Set `NODE_ENV=production` in environment
2. Build frontend: `npm run build`
3. Start server: `npm start`

### Frontend (Vercel/Netlify)

Set API URL environment variable to your deployed backend URL.

## Troubleshooting

### Common Issues

**"OPENAI_API_KEY is not set"**
- Make sure you have a valid OpenAI API key in `.env`

**CORS errors**
- Verify `FRONTEND_URL` matches your frontend URL

**Connection refused**
- Make sure the backend server is running on the correct port

## License

MIT License - feel free to use this project for personal or commercial purposes.

---

Built with ❤️ for TikTok creators everywhere
=======
# tiktok-smart-assistant
>>>>>>> 82883375849b1aa7de2e79e4a4c57991e4830725
