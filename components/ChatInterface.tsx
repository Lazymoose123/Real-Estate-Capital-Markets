
import React, { useState, useRef, useEffect } from 'react';
import { createAssociateChat } from '../services/geminiService';
import { ChatMessage, DealMetrics, AssetType } from '../types';

interface ChatInterfaceProps {
  metrics: DealMetrics;
  assetType: AssetType;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ metrics, assetType }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Senior Associate here. I've reviewed the preliminary underwriting for the " + assetType + " asset. What would you like to drill into? I can vet the rent roll, normalize OpEx, or stress test the exit cap." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current = createAssociateChat();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const dealContext = `Current Deal: ${assetType}, Purchase Price: $${metrics.purchasePrice}, NOI: $${metrics.noi}, Exit Cap: ${metrics.exitCap}%. Question: ${input}`;
      const stream = await chatRef.current.sendMessageStream({ message: dealContext });
      
      let fullContent = '';
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      for await (const chunk of stream) {
        fullContent += (chunk as any).text;
        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1].content = fullContent;
          return newMsgs;
        });
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Error communicating with Gemini. Please check your API key and connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-160px)] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-4 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
        <div>
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Senior Associate AI - Online
          </h3>
          <p className="text-[10px] text-slate-500 font-mono">MODEL: GEMINI-3-PRO-PREVIEW</p>
        </div>
        <button 
          onClick={() => setMessages([{ role: 'assistant', content: "Chat cleared. Re-initializing session..." }])}
          className="text-[10px] text-slate-500 hover:text-slate-300 uppercase tracking-widest"
        >
          Reset Session
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950"
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-5 py-4 ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-800 border border-slate-700 text-slate-200'
            }`}>
              <div className="text-xs font-bold mb-1 opacity-50 uppercase tracking-widest">
                {msg.role === 'user' ? 'LP/MD Request' : 'Associate Response'}
              </div>
              <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap leading-relaxed">
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 w-32">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-950">
        <div className="relative flex items-center">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about the waterfall, OpEx benchmarking, or SOFR impact..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-5 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 pr-12"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2 text-blue-500 hover:text-blue-400 disabled:opacity-50 transition-colors"
          >
            <svg className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </div>
        <div className="mt-2 flex gap-4 overflow-x-auto pb-1 no-scrollbar">
          {["Vet the NOI", "Simulate Waterfall", "Student Turn Analysis", "Stress Test Debt"].map(chip => (
            <button 
              key={chip}
              onClick={() => setInput(chip)}
              className="whitespace-nowrap px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-[10px] text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-all uppercase tracking-tighter"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
