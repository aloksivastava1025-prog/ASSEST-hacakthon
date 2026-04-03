import { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, Bot, User, Trash2, Cpu, ShieldAlert, Mic, Volume2, VolumeX } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ProviderInfo {
  provider: string;
  model: string;
}

interface AgentChatProps {
  agentId: string;
  agentName: string;
  providerInfo: ProviderInfo;
  onBack: () => void;
  onNewAgent: () => void;
  onDeploy: () => void;
}

export default function AgentChat({
  agentId,
  agentName,
  providerInfo,
  onBack,
  onNewAgent,
  onDeploy,
}: AgentChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Voice feature states
  const [isListening, setIsListening] = useState(false);
  const [isVoiceResponseEnabled, setIsVoiceResponseEnabled] = useState(true);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const speak = (text: string) => {
    if (!isVoiceResponseEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      if (isListening) return; // Prevent double trigger
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => setIsListening(true);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => prev + (prev ? ' ' : '') + transcript);
        setIsListening(false);
      };
      
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      
      recognition.start();
    } else {
      alert("Browser doesn't support Web Speech API.");
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`/api/agents/${agentId}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent_id: agentId,
          message: input,
          provider: providerInfo.provider,
          model: providerInfo.model,
        }),
      });
      const data = await response.json();
      const replyText = data.reply || 'No response from agent.';
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: replyText
      }]);
      speak(replyText);
    } catch (error) {
      console.error(error);
      const errText = 'System Error: Latent space connection severed.';
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: errText
      }]);
      speak(errText);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#050505] flex flex-col font-sans relative overflow-hidden">
      {/* Background Atmosphere - Misty Forest River */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 z-0 pointer-events-none grayscale-[0.3]" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2541&auto=format&fit=crop')" }}
      />
      {/* Dark overlay to ensure text legibility over medium opacity background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/40 to-[#050505]/95 z-0 pointer-events-none" />
      
      {/* Premium Header */}
      <header className="px-6 py-6 md:px-12 border-b border-white/[0.04] flex justify-between items-center bg-[#050505]/95 backdrop-blur-2xl sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => {
              window.speechSynthesis.cancel();
              onBack();
            }} 
            className="w-10 h-10 rounded-full border border-white/5 bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-luxury"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="text-[10px] font-mono tracking-[0.3em] text-cyan-400 uppercase mb-1 font-bold animate-pulse">Live Inference Stream</div>
            <h1 className="text-2xl font-serif text-white tracking-tight leading-none">{agentName}</h1>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {/* Deploy Button */}
          <button
            onClick={() => {
              window.speechSynthesis.cancel();
              onDeploy();
            }}
            className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full bg-cyan-500 text-black font-bold text-[11px] uppercase tracking-widest hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-luxury"
          >
            Deploy Agent
          </button>

          {/* Voice Response Toggle */}
          <button
            onClick={() => setIsVoiceResponseEnabled(!isVoiceResponseEnabled)}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-luxury ${isVoiceResponseEnabled ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400' : 'border-white/5 bg-white/5 text-white/40'}`}
            title={isVoiceResponseEnabled ? 'Voice Responses Enabled' : 'Voice Responses Muted'}
          >
            {isVoiceResponseEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-full border border-white/[0.05] bg-white/[0.03] shadow-inner">
            <Cpu size={14} className="text-white/40" />
            <span className="text-[11px] font-mono tracking-widest text-white/50 uppercase font-bold">{providerInfo.model}</span>
          </div>

          <button 
            onClick={() => {
              window.speechSynthesis.cancel();
              onNewAgent();
            }} 
            className="text-white/40 hover:text-white transition-luxury flex items-center gap-2 group ml-2"
          >
            <Trash2 size={16} className="group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-bold uppercase tracking-widest hidden md:block">Reset</span>
          </button>
        </div>
      </header>

      {/* Main Chat Interface */}
      <main className="flex-1 overflow-y-auto pt-12 pb-48 scroll-pane relative z-10" ref={scrollRef}>
        <div className="max-w-4xl mx-auto w-full px-4 md:px-6 space-y-10">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-center group">
               <div className="w-24 h-24 rounded-full border border-white/5 bg-white/[0.03] flex items-center justify-center mb-8 animate-float group-hover:scale-110 transition-all shadow-2xl backdrop-blur-md">
                  <Bot size={48} className="text-white/20" />
               </div>
               <h3 className="text-3xl font-serif text-white/40 mb-3 drop-shadow-lg">Briefing Session</h3>
               <p className="text-[14px] font-mono tracking-widest text-white/20 uppercase">Awaiting commander protocols & voice input</p>
            </div>
          )}
          
          {messages.map((msg, index) => (
            <div key={index} className={`flex w-full animate-fade-in group ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-4 max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                
                {/* Avatar */}
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-[1rem] flex items-center justify-center shrink-0 border shadow-2xl backdrop-blur-md transition-luxury ${msg.role === 'assistant' ? 'border-white/10 bg-white/5 text-white/60' : 'border-white/5 bg-transparent text-white/30'}`}>
                  {msg.role === 'assistant' ? <Bot size={20} /> : <User size={20} />}
                </div>

                {/* Message Bubble */}
                <div className={`flex flex-col space-y-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`text-[10px] font-bold uppercase tracking-[0.2em] px-2 ${msg.role === 'user' ? 'text-white/30' : 'text-white/40'}`}>
                    {msg.role === 'assistant' ? agentName : 'Commander'}
                  </div>
                  
                  <div className={`relative px-6 py-4 md:px-8 md:py-5 rounded-[1.5rem] text-[15px] md:text-[17px] leading-relaxed font-light whitespace-pre-wrap selection:bg-white selection:text-black shadow-2xl backdrop-blur-md transition-all ${
                    msg.role === 'assistant' 
                      ? 'bg-[#111111]/80 border border-white/[0.08] text-white/90 rounded-tl-sm' 
                      : 'bg-white/10 border border-white/10 text-white rounded-tr-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>

              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex w-full justify-start animate-fade-in">
              <div className="flex gap-4 max-w-[85%] md:max-w-[75%]">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-[1rem] flex items-center justify-center shrink-0 border border-white/10 bg-white/5 text-white/40 shadow-2xl backdrop-blur-md">
                  <Bot size={20} />
                </div>
                <div className="flex flex-col space-y-2 items-start">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] px-2 text-cyan-400/50 animate-pulse">
                    Synthesizing
                  </div>
                  <div className="px-6 py-5 rounded-[1.5rem] rounded-tl-sm bg-[#111111]/80 border border-white/[0.08] backdrop-blur-md shadow-2xl">
                    <div className="flex gap-2 items-center h-full">
                      <div className="w-2 h-2 bg-white/30 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-2 h-2 bg-white/30 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-2 h-2 bg-white/30 rounded-full animate-bounce" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Input Terminal Shell */}
      <div className="absolute bottom-0 w-full px-4 md:px-6 py-8 md:pb-12 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent z-50 pointer-events-none">
        <div className="max-w-4xl mx-auto w-full relative pointer-events-auto">
          <form onSubmit={handleSend} className="relative group flex items-center gap-3">
            {/* Input Field */}
            <div className="relative flex-1">
              <div className="absolute inset-0 bg-white/[0.03] blur-2xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
              <input 
                type="text"
                className="relative w-full bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-2xl px-6 py-6 md:px-8 text-[16px] md:text-xl outline-none focus:border-white/30 transition-luxury placeholder:text-white/20 font-light pr-32 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                placeholder={`Communicate with ${agentName}...`}
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={isLoading}
              />
              
              {/* Internal Action Buttons */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleListening}
                  title="Voice Input"
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-luxury disabled:opacity-30 ${isListening ? 'bg-red-500/20 text-red-500 border border-red-500/30 animate-pulse' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'}`}
                >
                  <Mic size={20} />
                </button>

                <button 
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white text-black flex items-center justify-center hover:scale-[1.08] active:scale-95 transition-luxury disabled:opacity-10 shadow-xl disabled:hover:scale-100"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </form>

          <div className="mt-6 flex justify-between items-center px-4 opacity-10 md:opacity-20 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] font-mono pointer-events-none">
             <div className="flex items-center gap-3">
               <ShieldAlert size={12} />
               <span className="hidden md:inline">ENCRYPTED_SESSION: {agentId.slice(0, 16)}</span>
             </div>
             <span>LATENT_LATENCY: 24MS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
