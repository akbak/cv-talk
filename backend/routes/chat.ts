import { Router } from 'express';
import { getLlmResponse } from '../services/gptService';

const router = Router();

// Type for messages sent to the frontend
interface ChatMessage {
    sender: 'user' | 'bot';
    text: string;
}

// Type for messages sent to the LLM
interface LlmMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

// Convert frontend message format to LLM format
const toLlmMessages = (history: ChatMessage[]): LlmMessage[] => {
    return history.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
    }));
}

router.post('/', async (req, res) => {
  const { cvText, history } = req.body;
  const EVALUATION_THRESHOLD = 3; // Start evaluation after 3 user answers

  try {
    let messagesForLlm: LlmMessage[];

    if (cvText) {
      // This is the first message to start the interview
      messagesForLlm = [
        {
          role: 'system',
          content: `You are an expert interviewer. I am providing the user's CV below. Ask them questions as if you were in a real job interview. Rules:\n- Keep questions short and clear.\n- After the 2nd question, go into technical depth.\n- Generate a new question based on each answer.\n\nCV TEXT:\n${cvText}`
        },
        {
            role: 'user',
            content: 'Hello, I am ready for the interview.'
        }
      ];
      const reply = await getLlmResponse(messagesForLlm);
      return res.json({ reply });

    } else if (history) {
      const userMessagesCount = history.filter((msg: ChatMessage) => msg.sender === 'user').length;
      messagesForLlm = toLlmMessages(history);

      if (userMessagesCount >= EVALUATION_THRESHOLD) {
        // Time to evaluate
        messagesForLlm.push({
          role: 'system',
          content: `This is the end of the interview. Your final task is to evaluate the candidate's performance based on the entire conversation.\nYou MUST respond with ONLY a valid JSON object, without any other text, explanation, or markdown formatting.\nThe JSON object must have two keys: "score" (a number between 0 and 100) and "feedback" (a string summarizing the evaluation).\n\nExample of a valid response:\n{\n  "score": 85,\n  "feedback": "The candidate demonstrated strong technical skills and provided clear, concise answers. They would be a great fit for the team."
}\n\nNow, provide your evaluation for the preceding interview in the specified JSON format.`
        });

        const llmJsonResponse = await getLlmResponse(messagesForLlm);
        try {
          const evaluation = JSON.parse(llmJsonResponse);
          const success = evaluation.score >= 75;
          const finalMessage = `${evaluation.feedback}\n\n**Hiring Probability: ${evaluation.score}%**\n\n**Outcome: ${success ? 'Successful' : 'Unsuccessful'}**`;
          
          return res.json({
            reply: finalMessage,
            interviewOver: true,
            score: evaluation.score,
            success: success
          });
        } catch (e) {
            console.error("Failed to parse LLM JSON response:", llmJsonResponse);
            // Fallback in case the LLM doesn't return valid JSON
            return res.json({ reply: "Thank you for your time. The interview is now complete.", interviewOver: true });
        }

      } else {
        // Continue the interview
        const reply = await getLlmResponse(messagesForLlm);
        return res.json({ reply });
      }

    } else {
      return res.status(400).json({ error: 'Bad request. Either cvText or history must be provided.' });
    }

  } catch (error) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({ error: 'Failed to get a response from the assistant.' });
  }
});

export default router;
