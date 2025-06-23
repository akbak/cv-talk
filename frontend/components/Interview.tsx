import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import ChatInterface from './ChatInterface';
import Image from 'next/image';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export default function Interview() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [interviewOver, setInterviewOver] = useState(false);
  const [successStatus, setSuccessStatus] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const cvText = sessionStorage.getItem('cvText');
    if (!cvText) {
      router.push('/');
      return;
    }

    const startInterview = async () => {
      try {
        setMessages([]);
        setLoading(true);
        const response = await axios.post('http://localhost:5001/api/chat', {
          cvText: cvText,
        });
        setMessages([{ sender: 'bot', text: response.data.reply }]);
      } catch (err) {
        console.error('Error starting interview:', err);
        setError('An error occurred while starting the interview. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    startInterview();
  }, []);

  const handleSendMessage = async (text: string) => {
    const newMessages: Message[] = [...messages, { sender: 'user', text }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5001/api/chat', {
        history: newMessages,
      });
      const { reply, interviewOver: isOver, success } = response.data;

      setMessages([...newMessages, { sender: 'bot', text: reply }]);
      if (isOver) {
        setInterviewOver(true);
        setSuccessStatus(success);
        setShowResult(true);
      }
    } catch (err) {
      console.error('Error sending message:', err);
      const errorMessage = { sender: 'bot' as const, text: 'Sorry, an error occurred. Please try again.' };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full">
      <ChatInterface
          messages={messages}
          onSendMessage={handleSendMessage}
          loading={loading || interviewOver}
          error={error}
      />

      {interviewOver && showResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-xl text-center">
                <button
                    onClick={() => setShowResult(false)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 z-10 p-1 rounded-full"
                    aria-label="Close"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <Image
                    src={successStatus ? '/images/happy.png' : '/images/unhappy.png'}
                    alt={successStatus ? 'Successful Interview' : 'Unsuccessful Interview'}
                    width={400}
                    height={400}
                    className="mx-auto rounded-lg"
                    priority
                />
            </div>
        </div>
      )}
    </div>
  );
}
