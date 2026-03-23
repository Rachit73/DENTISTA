import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Hello! How can I help you with your dental needs today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize AI lazily to prevent app crash if API key is missing
  const ai = useMemo(() => {
    try {
      return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
    } catch (e) {
      console.error("Failed to initialize Gemini AI:", e);
      return null;
    }
  }, []);

  const [chat] = useState(() => {
    if (!ai) return null;
    try {
      return ai.chats.create({ 
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `You are the official AI assistant for "Dentista", a premium dental clinic. 
Your primary job is to assist patients with information about the clinic, its services, doctors, and contact details.
DO NOT answer any questions that are not related to the clinic, dentistry, or booking appointments. If a user asks an out-of-box or irrelevant question, politely decline and steer the conversation back to the clinic's services.

Clinic Information:
- Name: Dentista
- Location: 101, Premium Plaza, Sector 18, Noida, UP 201301
- Phone: +91 98765 43210
- Email: contact@dentista.in, support@dentista.in
- Timings: Mon-Sat, 9am - 6pm

Doctors:
1. Dr. Deval Naik: Co-founder & Dental Surgeon. Earned BDS from MGV Dental College & Hospital, Nasik in 2005. Specializes in Cosmetic & Restorative Dentistry.
2. Dr. Tejal Shah: Co-founder & Dental Surgeon. Earned BDS from Maharashtra University of Health Science (Nashik) in 2005. Specializes in Cosmetic & Restorative Dentistry.

Services Offered:
- Teeth Cleaning: Advanced ultrasonic cleaning.
- Root Canal: Pain-free, expert root canal therapy.
- Braces & Aligners: Customized orthodontic solutions.
- Teeth Whitening: Professional-grade whitening.
- Dental Implants: State-of-the-art permanent implants.
- Oral Surgery: Safe and comfortable surgical procedures.

Be polite, professional, and concise in your responses. Always encourage users to book an appointment or contact the clinic for specific medical advice.`
        }
      });
    } catch (e) {
      console.error("Failed to create chat:", e);
      return null;
    }
  });

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user' as const, text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    if (!chat) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Sorry, the chatbot is currently unavailable. Please check the API key configuration.' }]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await chat.sendMessage({ message: input });
      setMessages(prev => [...prev, { role: 'bot', text: response.text || 'Sorry, I could not understand that.' }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: 'Sorry, I encountered an error. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-80 h-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 border border-gray-100"
          >
            <div className="bg-dentista-pink text-white p-4 flex justify-between items-center">
              <h3 className="font-semibold">Dentista Assistant</h3>
              <button onClick={() => setIsOpen(false)}><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3 flex flex-col">
              {messages.map((m, i) => (
                <div key={i} className={`p-3 rounded-xl text-sm w-fit max-w-[85%] ${m.role === 'user' ? 'bg-pink-50 text-dentista-pink ml-auto border border-pink-100' : 'bg-gray-50 text-gray-700 border border-gray-100'}`}>
                  {m.text}
                </div>
              ))}
              {isLoading && (
                <div className="bg-gray-50 text-gray-700 border border-gray-100 p-3 rounded-xl text-sm w-fit max-w-[85%] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              )}
            </div>
            <div className="p-3 border-t flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-dentista-pink disabled:opacity-50 disabled:bg-gray-50"
                placeholder="Ask something..."
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
              />
              <button 
                onClick={handleSend} 
                disabled={isLoading || !input.trim()} 
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
        className="bg-dentista-pink text-white p-4 rounded-full shadow-xl hover:scale-105 transition-transform"
      >
        <MessageCircle />
      </button>
    </div>
  );
}
