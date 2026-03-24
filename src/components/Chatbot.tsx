import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Trash2, User, Bot } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Hello! How can I help you with your dental needs today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
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

      const contentType = response.headers.get("content-type");
      if (!contentType || contentType.indexOf("application/json") === -1) {
        const text = await response.text();
        console.error("Non-JSON response received:", text.substring(0, 100));
        throw new Error(`Server returned non-JSON response (${response.status} ${response.statusText})`);
      }

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

  const clearChat = () => {
    setMessages([{ role: 'bot', text: 'Hello! How can I help you with your dental needs today?' }]);
  };

  const quickActions = [
    "Book an appointment",
    "Clinic timings",
    "Services offered",
    "Location & Contact"
  ];

  const handleQuickAction = (action: string) => {
    setInput(action);
    // We'll call handleSend in the next tick to ensure input is updated
    setTimeout(() => {
      const sendBtn = document.getElementById('chat-send-btn');
      sendBtn?.click();
    }, 10);
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
            className="w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 border border-gray-100"
          >
            <div className="bg-dentista-pink text-white p-4 flex justify-between items-center shadow-md">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 p-1.5 rounded-lg">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Dentista Assistant</h3>
                  <p className="text-[10px] opacity-80">Online & Ready to help</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={clearChat} 
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  title="Clear chat"
                >
                  <Trash2 size={16} />
                </button>
                <button onClick={() => setIsOpen(false)} aria-label="Close chatbot" className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4 flex flex-col bg-gray-50/50" aria-live="polite">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${m.role === 'user' ? 'bg-dentista-pink text-white' : 'bg-dentista-teal text-white'}`}>
                    {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm max-w-[80%] shadow-sm ${m.role === 'user' ? 'bg-dentista-pink text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2 flex-row">
                  <div className="w-8 h-8 rounded-full bg-dentista-teal text-white flex items-center justify-center flex-shrink-0">
                    <Bot size={14} />
                  </div>
                  <div className="p-3 rounded-2xl bg-white text-gray-700 border border-gray-100 rounded-tl-none shadow-sm">
                    <div className="flex gap-1">
                      <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                      <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                      <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    </div>
                  </div>
                </div>
              )}
              {!isLoading && messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {quickActions.map((action, i) => (
                    <button 
                      key={i} 
                      onClick={() => handleQuickAction(action)}
                      className="text-[11px] bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:border-dentista-pink hover:text-dentista-pink transition-all shadow-sm"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t bg-white flex gap-2 items-center">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-dentista-pink/20 focus:border-dentista-pink disabled:opacity-50 disabled:bg-gray-50 transition-all"
                placeholder="Type your message..."
                aria-label="Chat message"
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                id="chat-send-btn"
                onClick={handleSend} 
                disabled={isLoading || !input.trim()} 
                aria-label="Send message"
                className="bg-dentista-teal text-white p-2.5 rounded-xl hover:bg-teal-600 transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chatbot"
        className="bg-dentista-pink text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all active:scale-95 flex items-center justify-center"
      >
        {isOpen ? <X /> : <MessageCircle />}
      </button>
    </div>
  );
}
