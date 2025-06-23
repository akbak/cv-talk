import { useState, useRef, useEffect } from 'react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  loading: boolean;
  error: string | null;
}

export default function ChatInterface({ messages, onSendMessage, loading, error }: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !loading) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 overflow-hidden">
        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        )}
        <div className="flex-1 overflow-y-auto bg-white rounded-lg shadow-inner p-4 space-y-4">
            {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow ${msg.sender === 'user' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                        <p style={{whiteSpace: 'pre-wrap'}}>{msg.text}</p>
                    </div>
                </div>
            ))}
            {loading && (
                 <div className="flex justify-start">
                    <div className='max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow bg-gray-200 text-gray-800'>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse"></div>
                            <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse [animation-delay:0.2s]"></div>
                            <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse [animation-delay:0.4s]"></div>
                        </div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>
        <div className="mt-4">
            <form onSubmit={handleSubmit} className="flex items-center bg-white rounded-lg shadow p-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your answer here..."
                    className="flex-1 border-none focus:ring-0 p-2 text-gray-700"
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading || !inputValue.trim()}
                    className="ml-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300"
                >
                    Send
                </button>
            </form>
        </div>
    </div>
  );
}
