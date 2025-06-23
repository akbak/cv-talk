# CVTalk – AI Interview Simulator

CVTalk is a web application that allows you to practice for job interviews with an AI. Upload your CV, and the AI will ask you relevant questions based on your experience, then provide you with feedback and a hiring probability score.

## Features

- **CV Analysis:** Extracts text from your uploaded PDF resume.
- **AI-Powered Interviews:** Engages in a dynamic, conversational interview based on your CV.
- **Performance Evaluation:** At the end of the interview, the AI provides detailed feedback and a hiring probability score (0-100).
- **Success/Failure Simulation:** Displays a final result to simulate a real interview outcome.

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **AI:** OpenRouter API

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- Node.js (v18 or later)
- npm

### Installation & Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/akbak/cv-talk.git
   cd cv-talk

Install backend dependencies:

cd backend
npm install

Install frontend dependencies:

cd ../frontend
npm install

Set up environment variables:
The backend requires an API key from OpenRouter to connect to the AI models.


In the backend directory, create a new file named .env.

Open the .env file and add the following line, replacing YOUR_API_KEY_HERE with your actual key:
OPENROUTER_API_KEY=YOUR_API_KEY_HERE

You can get a free API key from the OpenRouter website.




Running the Application

You need to run both the backend and frontend servers in separate terminals.


Start the backend server:
(In the /backend directory)

npm start
The backend will be running at http://localhost:5001.


Start the frontend development server:
(In the /frontend directory)

npm run dev
Open your browser and navigate to http://localhost:3000 to use the application.


