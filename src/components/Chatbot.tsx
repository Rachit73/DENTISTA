import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Hello! How can I help you with your dental needs today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user' as const, text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.text }))
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }
      
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'bot', text: data.response }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: error instanceof Error ? error.message : 'Sorry, I encountered an error.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chatbot-window"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-80 h-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 border border-gray-100"
          >
            <div className="bg-dentista-pink text-white p-4 flex justify-between items-center">
              <h3 className="font-semibold">Dentista Assistant</h3>
              <button onClick={() => setIsOpen(false)} aria-label="Close chatbot"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3 flex flex-col" aria-live="polite">
              {messages.map((m, i) => (
                <div key={i} className={`p-3 rounded-xl text-sm w-fit max-w-[85%] ${m.role === 'user' ? 'bg-pink-50 text-dentista-pink ml-auto border border-pink-100' : 'bg-gray-50 text-gray-700 border border-gray-100'}`}>
                  {m.text}
                </div>
              ))}
            </div>
            <div className="p-3 border-t flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-dentista-pink disabled:opacity-50 disabled:bg-gray-50"
                placeholder="Ask something..."
                aria-label="Chat message"
                onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
              />
              <button 
                onClick={handleSend} 
                disabled={isLoading || !input.trim()} 
                aria-label="Send message"
                className="bg-dentista-teal text-white p-2 rounded-full hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chatbot"
        className="bg-dentista-pink text-white p-4 rounded-full shadow-xl hover:scale-105 transition-transform"
      >
        <MessageCircle />
      </button>
    </div>
  );
}
