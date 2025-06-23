import axios from 'axios';

const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export const getLlmResponse = async (messages: Message[]): Promise<string> => {
    const API_KEY = process.env.OPENROUTER_API_KEY;
    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
        console.error('OpenRouter API key not found. Please add it to your .env file.');
        // Return a mock response for development without a key
        return 'Hello! Let\'s start when you are ready. Could you please introduce yourself? (This is a test message because an API key was not found.)';
    }

    try {
        const response = await axios.post(
            API_URL,
            {
                model: 'anthropic/claude-3-haiku',
                messages: messages,
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.data.choices && response.data.choices.length > 0) {
            return response.data.choices[0].message.content;
        }

        throw new Error('No response from LLM.');
    } catch (error: any) {
        console.error('Error calling OpenRouter API:', error.response ? error.response.data : error.message);
        throw new Error('Failed to get response from LLM.');
    }
};