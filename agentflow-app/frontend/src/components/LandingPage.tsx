import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Bot, FileText, Search, Languages, MousePointer2, Inbox, Send, Check, X } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: (idea?: string) => void;
  onOpenDashboard: () => void;
}

export default function LandingPage({ onGetStarted, onOpenDashboard }: LandingPageProps) {
  const [idea, setIdea] = useState("");
  const pageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // If the video section is revealed, play the video
            if (entry.target.getAttribute('id') === 'video-demo' && videoRef.current) {
              videoRef.current.play().catch(err => console.log("Video play blocked:", err));
            }
          } else {
            // Pause if it scrolls out of view
            if (entry.target.getAttribute('id') === 'video-demo' && videoRef.current) {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const els = pageRef.current?.querySelectorAll('.reveal');
    els?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen relative font-sans antialiased flex flex-col bg-[#050505] selection:bg-white selection:text-black">
      
      {/* Hero Background Atmosphere */}
      <div 
        className="absolute top-0 left-0 w-full h-[110vh] bg-cover bg-center bg-no-repeat z-0 opacity-100" 
        style={{ backgroundImage: "url('https://framerusercontent.com/images/EqTvMX987cRyoYGTSVcaTDhwgWM.jpg')" }}
      >
        <div className="absolute inset-x-0 bottom-0 h-[30vh] bg-gradient-to-t from-[#050505] to-transparent"></div>
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 w-full z-50 px-6 py-8 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
            <div className="w-8 h-8 text-white">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z"/>
              </svg>
            </div>
            <span className="font-semibold tracking-wide text-lg text-white">AgentFlow AI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-white/70">
            <button onClick={onOpenDashboard} className="hover:text-white transition-colors">Dashboard</button>
            <a href="#flow" className="hover:text-white transition-colors">Product</a>
            <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="hidden sm:block text-sm font-medium px-4 py-2 text-white/80 hover:text-white transition-colors">
              Contact Us
            </button>
            <button 
              onClick={() => onGetStarted()}
              className="text-sm font-semibold px-6 py-2.5 rounded-full bg-white text-black hover:bg-gray-200 transition-all shadow-lg active:scale-95"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 w-full flex flex-col">
        
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center px-6 pt-36 pb-10 max-w-5xl mx-auto w-full min-h-[100vh]">
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-center tracking-tight text-white leading-[1.1] mb-6 drop-shadow-2xl">
            Empowering SMBs with <br className="hidden md:block" />
            Autonomous AI Agents
          </h1>

          <p className="text-sm md:text-base text-white/85 text-center max-w-2xl mb-8 font-light tracking-wide drop-shadow-lg leading-relaxed">
            Not just another Copilot. Our agentic AI doesn't wait for instructions — it autonomously researches your market, analyzes competitors, and delivers expert strategies to scale your business from zero.
          </p>

          <div className="flex items-center gap-6 mb-10">
            <button 
              onClick={() => onGetStarted()}
              className="bg-white text-black font-semibold px-8 py-3 rounded-full shadow-2xl hover:bg-gray-100 hover:scale-105 transition-all active:scale-95 text-base"
            >
              Launch Your Agent
            </button>
          </div>
          
          {/* Floating Prompt Builder UI */}
          <div className="w-full max-w-4xl glass-panel rounded-2xl p-2.5 animate-float mb-auto relative z-20">
            <div className="bg-black/20 border border-white/10 rounded-xl p-5 md:p-8 flex flex-col gap-8 backdrop-blur-md">
              <div className="flex items-center justify-center min-h-[3rem] w-full text-white/70 text-xl font-light">
                <input 
                  type="text"
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="Describe your business — our AI agents will handle the rest..."
                  className="w-full bg-transparent border-none outline-none text-white placeholder-white/50"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') onGetStarted(idea);
                  }}
                />
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-[13px] text-white/80">
                    Market Research
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-[13px] text-white/80">
                    Competitor Analysis
                  </div>
                </div>
                <div 
                  onClick={() => onGetStarted(idea)}
                  className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer group shrink-0"
                >
                  <ArrowRight size={22} className="text-black group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-3xl mx-auto mt-20 mb-auto text-center px-4 relative z-20">
            <h3 className="text-2xl md:text-4xl font-serif text-white/90 leading-relaxed font-light drop-shadow-md">
              Built for Small & Medium Businesses — our multi-agent system does market research, competitor analysis, and expert consulting autonomously, so you can focus on building.
            </h3>
          </div>

          {/* Brand Ticker */}
          <div className="w-full overflow-hidden mask-edges mt-32 relative z-20 pb-20">
            <div className="flex w-[200%] animate-ticker items-center justify-around opacity-40 grayscale">
              <div className="flex items-center gap-20 md:gap-32 px-10">
                <img src="https://framerusercontent.com/images/5dbO7v7TkGBMjafqgHw5w48FYvg.svg" className="h-7" alt="Slack" />
                <img src="https://framerusercontent.com/images/hxgY1hBe8mAUAWJdv4uoF8ha4Yc.svg" className="h-7" alt="Skype" />
                <img src="https://framerusercontent.com/images/GycJjoOkRvOUSdg4GQ03UeBgV24.svg" className="h-7" alt="Pinterest" />
                <img src="https://framerusercontent.com/images/1vwmXr0hxn0Lfa105l4yodaG9w.svg" className="h-7" alt="Shutter" />
                <img src="https://framerusercontent.com/images/DL5ZwfuL9zsuViXrD8gInVBMbD4.svg" className="h-7" alt="Mailchimp" />
                <img src="https://framerusercontent.com/images/mMOMa8GmHj0OgL0nPE6ordWmFg.svg" className="h-7" alt="Jira" />
                <img src="https://framerusercontent.com/images/2sz190lEi7Dq8xk2YFN1VzfDSo.svg" className="h-7" alt="GDrive" />
              </div>
              <div className="flex items-center gap-20 md:gap-32 px-10">
                <img src="https://framerusercontent.com/images/5dbO7v7TkGBMjafqgHw5w48FYvg.svg" className="h-7" alt="Slack" />
                <img src="https://framerusercontent.com/images/hxgY1hBe8mAUAWJdv4uoF8ha4Yc.svg" className="h-7" alt="Skype" />
                <img src="https://framerusercontent.com/images/GycJjoOkRvOUSdg4GQ03UeBgV24.svg" className="h-7" alt="Pinterest" />
                <img src="https://framerusercontent.com/images/1vwmXr0hxn0Lfa105l4yodaG9w.svg" className="h-7" alt="Shutter" />
                <img src="https://framerusercontent.com/images/DL5ZwfuL9zsuViXrD8gInVBMbD4.svg" className="h-7" alt="Mailchimp" />
                <img src="https://framerusercontent.com/images/mMOMa8GmHj0OgL0nPE6ordWmFg.svg" className="h-7" alt="Jira" />
                <img src="https://framerusercontent.com/images/2sz190lEi7Dq8xk2YFN1VzfDSo.svg" className="h-7" alt="GDrive" />
              </div>
            </div>
          </div>
        </section>

        {/* Feature Sections */}
        <section id="flow" className="py-32 px-6 md:px-12 w-full max-w-[1400px] mx-auto flex flex-col gap-10">
          
          {/* Block 1: Competitor Analysis */}
          <div className="reveal flex flex-col md:flex-row items-center justify-between gap-16 bg-[#080808] border border-white/[0.04] rounded-[3rem] p-10 md:p-16">
            <div className="flex-1 max-w-xl">
              <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono tracking-widest text-white/50 uppercase mb-8 w-fit reveal-delay-1">
                MARKET INTELLIGENCE
              </div>
              <div className="clip-reveal mb-8">
                <h2 className="text-5xl md:text-6xl font-serif text-white tracking-tight leading-tight clip-reveal-text">
                  Autonomous Market <br/>Intelligence
                </h2>
              </div>
              <p className="text-[#a1a1a1] text-lg font-light leading-relaxed mb-10 reveal-delay-2">
                Our AI agents autonomously scan your industry, identify competitors, analyze pricing strategies, and surface opportunities you'd miss manually.
              </p>
              <button 
                onClick={() => onGetStarted()}
                className="px-8 py-4 rounded-full border border-white/20 text-sm font-medium text-white hover:bg-white hover:text-black transition-all duration-500 reveal-delay-3"
              >
                Run Deep Analysis
              </button>
            </div>

            <div className="flex-1 w-full relative h-[400px] md:h-[550px] rounded-[2rem] overflow-hidden group shadow-2xl">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-105 opacity-40 grayscale" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[520px] card-solid-black animate-border-pulse rounded-[1.5rem] shadow-2xl p-8 z-30">
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <div className="flex gap-2.5 mb-10">
                   <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-white/70 flex items-center gap-2"><Search size={12}/> Search</div>
                   <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-white/70 flex items-center gap-2"><Languages size={12}/> Translate</div>
                </div>
                <div className="text-[14px] text-green-500/80 mb-10 font-mono typing-line tracking-tight inline-block">
                  Synthesizing market intelligence...
                </div>
                <div className="flex items-center gap-4 border-t border-white/5 pt-8 mt-auto">
                  <Bot size={20} className="text-white/40" />
                  <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Protocol: RESEARCH_v4</span>
                  <div className="ml-auto w-10 h-10 rounded-full bg-white flex items-center justify-center text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                     <MousePointer2 size={18} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Block 2: Expert Reports */}
          <div className="reveal flex flex-col md:flex-row-reverse items-center justify-between gap-16 bg-[#080808] border border-white/[0.04] rounded-[3rem] p-10 md:p-16">
            <div className="flex-1 max-w-xl text-right md:text-left">
              <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono tracking-widest text-white/50 uppercase mb-8 md:ml-0 ml-auto w-fit reveal-delay-1">
                STRATEGIC ADVISOR
              </div>
              <div className="clip-reveal mb-8">
                <h2 className="text-5xl md:text-6xl font-serif text-white tracking-tight leading-tight clip-reveal-text">
                  Executive Strategy <br/>Synthesis
                </h2>
              </div>
              <p className="text-[#a1a1a1] text-lg font-light leading-relaxed mb-10 reveal-delay-2">
                Get executive-ready reports with actionable growth strategies, revenue projections, and market positioning — all generated autonomously by multi-agent collaboration.
              </p>
              <button 
                onClick={() => onGetStarted()}
                className="px-8 py-4 rounded-full border border-white/20 text-sm font-medium text-white hover:bg-white hover:text-black transition-all duration-500 reveal-delay-3"
              >
                Synthesize Strategy
              </button>
            </div>

            <div className="flex-1 w-full relative h-[400px] md:h-[550px] rounded-[2rem] overflow-hidden group shadow-2xl">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-105 opacity-40 grayscale" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=1200&auto=format')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[520px] card-solid-black animate-border-pulse rounded-[1.5rem] shadow-2xl p-10 z-30">
                 <div className="flex items-center gap-2 mb-10 opacity-50">
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                 </div>
                 <div className="space-y-5 mb-12">
                    <div className="h-2 w-3/4 bg-white/20 rounded-full overflow-hidden relative">
                       <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-white/20 animate-pulse" />
                    </div>
                    <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                    <div className="h-2 w-2/3 bg-white/10 rounded-full" />
                    <div className="h-2 w-5/6 bg-white/10 rounded-full" />
                 </div>
                 <div className="flex items-center gap-3 border-t border-white/5 pt-8">
                    <FileText size={20} className="text-white/40" />
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em]">STRATEGY_DECODED.pdf</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Block 3: Autonomous Agent Builder */}
          <div className="reveal flex flex-col md:flex-row items-center justify-between gap-16 bg-[#080808] border border-white/[0.04] rounded-[3rem] p-10 md:p-16">
            <div className="flex-1 max-w-xl">
              <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono tracking-widest text-white/50 uppercase mb-8 w-fit reveal-delay-1">
                ZERO-PROMPT BUILDER
              </div>
              <div className="clip-reveal mb-8">
                <h2 className="text-5xl md:text-6xl font-serif text-white tracking-tight leading-tight clip-reveal-text">
                  Self-Evolving Agentic <br/>Architectures
                </h2>
              </div>
              <p className="text-[#a1a1a1] text-lg font-light leading-relaxed mb-10 reveal-delay-2">
                Just describe your business in plain language. Our system autonomously architects, configures, and deploys multi-agent workflows — no coding, no manual setup.
              </p>
              <button 
                onClick={() => onGetStarted()}
                className="px-8 py-4 rounded-full border border-white/20 text-sm font-medium text-white hover:bg-white hover:text-black transition-all duration-500 reveal-delay-3"
              >
                Deploy Engine
              </button>
            </div>

            <div className="flex-1 w-full relative h-[400px] md:h-[550px] rounded-[2rem] overflow-hidden group shadow-2xl">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-105 opacity-40 grayscale" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507400492013-162706c8c05e?q=80&w=1200&auto=format')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[520px] card-solid-black animate-border-pulse rounded-[1.5rem] shadow-2xl p-10 z-30">
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">System_Active</span>
                </div>
                <div className="text-[14px] text-white/90 mb-6 font-mono leading-relaxed">
                   <div className="flex items-center gap-3 text-green-400/80 mb-2 font-bold">$ agent --deploy --autonomous</div>
                   <div className="typing-line text-white/40 mb-1">» Initializing research_node... [OK]</div>
                   <div className="typing-line text-white/40 mb-1" style={{ animationDelay: '1s' }}>» Mounting strategy_brain... [OK]</div>
                   <div className="typing-line text-white/40 mb-1" style={{ animationDelay: '2s' }}>» Connecting SMB_logic_gate... [READY]</div>
                </div>
                <div className="flex items-center gap-4 border-t border-white/5 pt-8 mt-10">
                  <Bot size={20} className="text-white/40 animate-float" />
                  <span className="text-[9px] font-mono text-white/15 uppercase tracking-[0.4em]">DEPLOY_LOG_UNIFIED_v2</span>
                </div>
              </div>
            </div>
          </div>

          {/* Block 4: Live Dashboard Monitor */}
          <div className="reveal flex flex-col md:flex-row-reverse items-center justify-between gap-16 bg-[#080808] border border-white/[0.04] rounded-[3rem] p-10 md:p-16">
            <div className="flex-1 max-w-xl text-right md:text-left">
              <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono tracking-widest text-white/50 uppercase mb-8 md:ml-0 ml-auto w-fit reveal-delay-1">
                COMMAND CENTER
              </div>
              <div className="clip-reveal mb-8">
                <h2 className="text-5xl md:text-6xl font-serif text-white tracking-tight leading-tight clip-reveal-text">
                  Unified Command <br/>& Control
                </h2>
              </div>
              <p className="text-[#a1a1a1] text-lg font-light leading-relaxed mb-10 reveal-delay-2">
                Monitor every deployed agent in real-time. Track active nodes, conversation history, compute usage, and system health — all from a single brutalist command center.
              </p>
              <button 
                onClick={onOpenDashboard}
                className="px-8 py-4 rounded-full border border-white/20 text-sm font-medium text-white hover:bg-white hover:text-black transition-all duration-500 reveal-delay-3"
              >
                Access Dashboard
              </button>
            </div>

            <div className="flex-1 w-full relative h-[400px] md:h-[550px] rounded-[2rem] overflow-hidden group shadow-2xl">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-105 opacity-40 grayscale" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[520px] card-solid-black animate-border-pulse rounded-[1.5rem] shadow-2xl p-8 z-30">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Master_Watch</span>
                  </div>
                  <div className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-green-400">ENCRYPTED_STREAM</div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/[0.02] border border-white/5 p-4 flex flex-col gap-1">
                    <div className="text-[9px] text-white/20 uppercase tracking-widest">Active_Nodes</div>
                    <div className="text-2xl text-white font-mono font-bold">128</div>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 p-4 flex flex-col gap-1">
                    <div className="text-[9px] text-white/20 uppercase tracking-widest">System_Health</div>
                    <div className="text-2xl text-green-500 font-mono font-bold">STABLE</div>
                  </div>
                </div>
                <div className="space-y-3 opacity-60">
                   {[1, 2, 3].map(i => (
                     <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.03]">
                        <div className="h-1.5 w-24 bg-white/10 rounded-full animate-pulse" />
                        <div className="h-1.5 w-10 bg-green-500/20 rounded-full" />
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Section - n8n Logic Flow */}
        <section id="architecture" className="py-40 px-6 md:px-12 w-full max-w-[1400px] mx-auto flex flex-col items-center">
            <div className="text-center mb-20 max-w-3xl">
                <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono tracking-widest text-white/50 uppercase mb-8 mx-auto w-fit">
                    3 SIMPLE STEPS
                </div>
                <h2 className="text-5xl md:text-6xl font-serif text-white mb-6 tracking-tight">How It Works</h2>
                <p className="text-[#a1a1a1] font-light text-xl leading-relaxed">No coding. No setup. Just describe your business and our AI agents do everything for you.</p>
            </div>

            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 pb-20">
                {[
                  { step: "01", title: "Describe Your Business", desc: "Tell us your industry, target audience, and goals in plain language. That's the only input we need — our agents take it from here.", icon: <Inbox size={48} /> },
                  { step: "02", title: "AI Agents Get to Work", desc: "Multiple autonomous agents collaborate to research your market, analyze competitors, identify trends, and build a complete business intelligence report.", icon: <Bot size={48} /> },
                  { step: "03", title: "Get Expert Strategy", desc: "Receive actionable growth plans, revenue projections, competitive positioning, and next steps — ready to execute immediately.", icon: <Send size={48} /> }
                ].map((item, i) => (
                  <div key={i} className="reveal bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-10 flex flex-col gap-8 group hover:border-white/15 transition-all duration-500 hover:bg-[#0e0e0e]">
                    <div className="flex items-center justify-between">
                      <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-white/[0.06] transition-all">
                        <div className="text-white/50 group-hover:text-white transition-colors">
                          {item.icon}
                        </div>
                      </div>
                      <span className="text-5xl font-serif text-white/[0.06] group-hover:text-white/10 transition-colors">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif text-white mb-4">{item.title}</h3>
                      <p className="text-[#888] font-light leading-relaxed text-[15px]">{item.desc}</p>
                    </div>
                  </div>
                ))}
            </div>
        </section>

        {/* Redesigned Video Demo Section - True Black */}
        <section id="video-demo" className="reveal py-24 px-4 md:px-6 relative z-20 bg-black overflow-hidden">
          <div className="max-w-[1440px] mx-auto relative z-10">
            {/* Header Area */}
            <div className="md:pt-8 px-4 sm:px-6 pb-9 sm:pb-16 text-center max-w-4xl mx-auto">
              <div className="px-5 py-2 rounded-full border border-white/5 bg-white/[0.02] text-[10px] font-mono tracking-[0.3em] text-white/30 uppercase mb-8 mx-auto w-fit">
                SYSTEM_ENGINE_CORE_v4
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-medium tracking-tighter text-white leading-[1.05] mb-6">
                Your Always-On <br/>
                <span className="inline-flex items-center">
                  <span className="relative inline-block w-9 sm:w-16 h-6 sm:h-10 mx-2">
                    <svg width="100%" height="100%" viewBox="0 0 70 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 20C0 8.95431 8.95431 0 20 0H49.3333C60.379 0 69.3333 8.95431 69.3333 20C69.3333 31.0457 60.379 40 49.3333 40H20C8.9543 40 0 31.0457 0 20Z" fill="white" fillOpacity="0.05"></path>
                      <circle cx="20" cy="20" r="4" fill="white" fillOpacity="0.5" />
                      <rect x="34.667" y="5.33325" width="29.3333" height="29.3333" rx="14.6667" fill="white"></rect>
                    </svg>
                  </span>
                </span>
                Autonomous Engine
              </h2>
              <p className="text-base sm:text-xl text-white/40 max-w-[640px] mx-auto leading-relaxed text-balance font-light">
                One unified system that researches, strategizes, builds, and monitores high-performing AI agents.
              </p>
            </div>

            {/* Dashboard Mockup Container */}
            <div className="relative w-full rounded-[2.5rem] bg-black border border-white/10 overflow-hidden flex flex-col items-center shadow-[0_0_100px_rgba(255,255,255,0.02)]">
              {/* Internal Toggle Header */}
              <div className="relative z-10 flex flex-col items-center gap-8 pt-12 lg:pt-20 pb-12 px-4 md:px-6 w-full">
                <div className="relative flex items-center gap-1 rounded-full bg-white/[0.02] p-1 border border-white/5">
                  <div className="absolute top-1 h-[calc(100%-8px)] rounded-full bg-white shadow-2xl" style={{ left: '4px', width: '92px' }}></div>
                  <button className="cursor-pointer relative z-10 px-4 md:px-6 py-2.5 rounded-full text-[11px] font-mono uppercase tracking-widest transition-colors duration-300 text-black">Research</button>
                  <button className="cursor-pointer relative z-10 px-4 md:px-6 py-2.5 rounded-full text-[11px] font-mono uppercase tracking-widest transition-colors duration-300 text-white/30">Synthesize</button>
                  <button className="cursor-pointer relative z-10 px-4 md:px-6 py-2.5 rounded-full text-[11px] font-mono uppercase tracking-widest transition-colors duration-300 text-white/30">Build</button>
                  <button className="cursor-pointer relative z-10 px-4 md:px-6 py-2.5 rounded-full text-[11px] font-mono uppercase tracking-widest transition-colors duration-300 text-white/30">Monitor</button>
                </div>
              </div>

              {/* VIDEO AREA */}
              <div className="w-full px-5 pb-12 lg:px-16 lg:pb-20 max-w-6xl mx-auto">
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black shadow-3xl group">
                  <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent_70%)]" />
                  
                  <video 
                    ref={videoRef}
                    src="/demo.mp4" 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-1000"
                  />

                  {/* Indicators */}
                  <div className="absolute top-8 left-8 z-30 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-white/40 tracking-[0.4em] uppercase">Engine_Stream_v4.2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why We're Different Section - Next-Gen Grid */}
        <section id="comparison" className="py-40 px-6 md:px-12 w-full max-w-[1440px] mx-auto relative z-20">
          <div className="reveal text-center mb-28">
            <h2 className="text-5xl md:text-9xl font-medium tracking-tighter text-white mb-8">Performance Gap.</h2>
            <p className="text-white/30 font-light text-xl max-w-2xl mx-auto">Compare the industry standard against the next generation of autonomous business engines.</p>
          </div>

          <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AgentFlow Lane - The Winner */}
            <div className="flex flex-col bg-[#020202] comparison-card highlight rounded-[3rem] p-12 relative group">
               <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
               <div className="mb-12">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-white">AgentFlow AI</span>
                    <div className="px-3 py-1 rounded bg-green-500/10 text-[9px] font-mono text-green-500 uppercase tracking-widest border border-green-500/20">Market Leader</div>
                  </div>
                  <p className="text-white/40 text-sm">Autonomous Engine Architecture</p>
               </div>
               
               <div className="space-y-6">
                 {[
                   "Zero-Prompt Creation", "Autonomous Market Intelligence", "No-Code Enterprise Deployment", "Real-time Command Dashboard", "SMB-Specific Logic Layer", "Production-Ready Scalability"
                 ].map((text, i) => (
                   <div key={i} className="flex items-center gap-4 py-2 border-b border-white/[0.03]">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                         <Check size={12} className="text-green-400" />
                      </div>
                      <span className="text-sm text-white/80 font-light">{text}</span>
                   </div>
                 ))}
               </div>
            </div>

            {/* Competitor Lane: BuildMyAgent.io */}
            <div className="flex flex-col bg-black comparison-card rounded-[3rem] p-12 border border-white/5 opacity-60 hover:opacity-100 transition-opacity">
               <div className="mb-12">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-white/60">BuildMyAgent</span>
                  </div>
                  <p className="text-white/20 text-sm">Traditional Agency Model</p>
               </div>
               
               <div className="space-y-6">
                 {[
                   { t: "Requires Manual Input", v: false },
                   { t: "Semi-Autonomous Research", v: true },
                   { t: "Manual Coding Required", v: false },
                   { t: "Standard Reporting", v: false },
                   { t: "General Business Logic", v: true },
                   { t: "Limited Scalability", v: false }
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-4 py-2 border-b border-white/[0.03]">
                      {item.v ? <Check size={12} className="text-white/20" /> : <X size={12} className="text-red-500/20" />}
                      <span className="text-sm text-white/30 font-light">{item.t}</span>
                   </div>
                 ))}
               </div>
            </div>

            {/* Competitor Lane: CrewAI */}
            <div className="flex flex-col bg-black comparison-card rounded-[3rem] p-12 border border-white/5 opacity-40 hover:opacity-100 transition-opacity">
               <div className="mb-12">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-white/40">CrewAI</span>
                  </div>
                  <p className="text-white/20 text-sm">Developer Framework</p>
               </div>
               
               <div className="space-y-6">
                 {[
                   { t: "Pure Coding Framework", v: false },
                   { t: "No Built-in Intelligence", v: false },
                   { t: "Infrastructure Required", v: false },
                   { t: "No Dashboard", v: false },
                   { t: "Raw Logic Layer", v: false },
                   { t: "Developer Needed", v: true }
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-4 py-2 border-b border-white/[0.03]">
                      {item.v ? <Check size={12} className="text-white/10" /> : <X size={12} className="text-red-500/10" />}
                      <span className="text-sm text-white/20 font-light">{item.t}</span>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="py-16 border-t border-white/5 w-full bg-[#030303] relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-[13px] text-[#8c94a5] flex items-center gap-3 uppercase tracking-widest font-bold">
             © 2026 AgentFlow AI — Built for SMBs
          </div>
          <div className="flex gap-10 text-[13px] text-[#8c94a5] font-semibold">
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">Docs</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
