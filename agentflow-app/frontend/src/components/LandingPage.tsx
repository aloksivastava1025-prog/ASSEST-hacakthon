import { useState } from 'react';
import { ArrowRight, Bot, FileText, Search, Languages, MousePointer2, Inbox, Send } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: (idea?: string) => void;
  onOpenDashboard: () => void;
}

export default function LandingPage({ onGetStarted, onOpenDashboard }: LandingPageProps) {
  const [idea, setIdea] = useState("");

  return (
    <div className="min-h-screen relative font-sans antialiased flex flex-col bg-[#050505] selection:bg-white selection:text-black">
      
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
            <span className="font-semibold tracking-wide text-lg text-white">Sam Project</span>
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
              Try Free
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 w-full flex flex-col">
        
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center px-6 pt-52 pb-20 max-w-5xl mx-auto w-full min-h-[100vh]">
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-center tracking-tight text-white leading-[1.05] mb-8 drop-shadow-2xl">
            AI research and analysis for <br className="hidden md:block" />
            modern teams
          </h1>

          <p className="text-base md:text-xl text-white/85 text-center max-w-3xl mb-12 font-light tracking-wide drop-shadow-lg leading-relaxed">
            Analyze documents, generate reports, and produce executive-ready summaries — all in one tool. Powered by autonomous multi-agent systems.
          </p>

          <div className="flex items-center gap-6 mb-16">
            <button 
              onClick={() => onGetStarted()}
              className="bg-white text-black font-semibold px-10 py-4 rounded-full shadow-2xl hover:bg-gray-100 hover:scale-105 transition-all active:scale-95 text-lg"
            >
              Try for Free
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
                  placeholder="Got an idea? Describe your agent, I'll build it..."
                  className="w-full bg-transparent border-none outline-none text-white placeholder-white/50"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') onGetStarted(idea);
                  }}
                />
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-[13px] text-white/80">
                    Prompt Builder
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-[13px] text-white/80">
                    AutoGen Intel Core
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
              From market research to internal reviews, we bring all your analysis into one place so you can go deeper without juggling doc tabs.
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
          
          {/* Block 1: Source Correlation */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-16 bg-[#080808] border border-white/[0.04] rounded-[3rem] p-10 md:p-16">
            <div className="flex-1 max-w-xl">
              <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono tracking-widest text-white/50 uppercase mb-8 w-fit">
                LINKED SOURCES
              </div>
              <h2 className="text-5xl md:text-6xl font-serif text-white mb-8 tracking-tight leading-tight">
                Source Correlation
              </h2>
              <p className="text-[#a1a1a1] text-lg font-light leading-relaxed mb-10">
                Explore reports and complex documents with structured extraction, section-level comparison, and clear highlights.
              </p>
              <button 
                onClick={() => onGetStarted()}
                className="px-8 py-4 rounded-full border border-white/20 text-sm font-medium text-white hover:bg-white hover:text-black transition-all duration-500"
              >
                Access Protocol
              </button>
            </div>

            <div className="flex-1 w-full relative h-[400px] md:h-[550px] rounded-[2rem] overflow-hidden group shadow-2xl">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-105 opacity-80" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-[400px] bg-[#1c1c1c]/40 backdrop-blur-2xl border border-white/10 rounded-[1.5rem] shadow-2xl p-6">
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                </div>
                <div className="flex gap-2.5 mb-10">
                   <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[11px] text-white/70 flex items-center gap-2"><Search size={12}/> Search</div>
                   <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[11px] text-white/70 flex items-center gap-2"><Languages size={12}/> Translate</div>
                </div>
                <div className="text-[13px] text-white/40 mb-10 font-light italic">Synthesizing intelligence...</div>
                <div className="flex items-center gap-4">
                  <Bot size={20} className="text-white/20" />
                  <div className="ml-auto w-10 h-10 rounded-full bg-white flex items-center justify-center text-black">
                     <MousePointer2 size={18} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Block 2: Report Generation */}
          <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-16 bg-[#080808] border border-white/[0.04] rounded-[3rem] p-10 md:p-16">
            <div className="flex-1 max-w-xl text-right md:text-left">
              <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono tracking-widest text-white/50 uppercase mb-8 md:ml-0 ml-auto w-fit">
                REPORT BUILDER
              </div>
              <h2 className="text-5xl md:text-6xl font-serif text-white mb-8 tracking-tight leading-tight">
                Report Generation
              </h2>
              <p className="text-[#a1a1a1] text-lg font-light leading-relaxed mb-10">
                Synthesis lengths into dense, guided summaries with side-by-side comparison. Let teams surface key insights without manual doc juggling.
              </p>
              <button 
                onClick={() => onGetStarted()}
                className="px-8 py-4 rounded-full border border-white/20 text-sm font-medium text-white hover:bg-white hover:text-black transition-all duration-500"
              >
                Initalize Synthesis
              </button>
            </div>

            <div className="flex-1 w-full relative h-[400px] md:h-[550px] rounded-[2rem] overflow-hidden group shadow-2xl">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-105 opacity-80" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=1200&auto=format')" }}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-[400px] bg-[#1c1c1c]/40 backdrop-blur-2xl border border-white/10 rounded-[1.5rem] shadow-2xl p-8">
                 <div className="flex items-center gap-2 mb-10 opacity-30">
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                 </div>
                 <div className="space-y-4 mb-10">
                    <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                    <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                    <div className="h-2 w-2/3 bg-white/10 rounded-full" />
                 </div>
                 <div className="flex items-center gap-3">
                    <FileText size={20} className="text-white/40" />
                    <span className="text-xs font-mono text-white/30 uppercase tracking-[0.2em]">AUTOGEN_REPORT.md</span>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Section - n8n Logic Flow */}
        <section id="architecture" className="py-40 px-6 md:px-12 w-full max-w-[1400px] mx-auto flex flex-col items-center">
            <div className="text-center mb-24 max-w-2xl">
                <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono tracking-widest text-white/50 uppercase mb-8 mx-auto w-fit">
                    HOW IT WORKS
                </div>
                <h2 className="text-5xl md:text-6xl font-serif text-white mb-6 tracking-tight">Multi-Agent Pipeline</h2>
                <p className="text-[#a1a1a1] font-light text-xl leading-relaxed">Watch our agents collaborate, write, and execute autonomously from a single business prompt.</p>
            </div>

            <div className="w-full max-w-5xl relative pb-20">
                {/* Horizontal Line Connector */}
                <div className="absolute top-[4.5rem] left-[15%] right-[15%] h-[1px] bg-white/10 hidden md:block" />
                
                <div className="flex flex-col md:flex-row justify-between items-center gap-20 md:gap-32 w-full">
                    {[
                      { title: "Task Decomposition", desc: "Break objectives into discrete, assigned sub-tasks.", icon: <Inbox size={32} /> },
                      { title: "Code Generation", desc: "Generate production-grade Python scripts autonomously.", icon: <Bot size={32} /> },
                      { title: "Review & Verify", desc: "Inspect and test code for 100% quality results.", icon: <Send size={32} /> }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center gap-10 group relative z-10 w-full md:w-auto">
                        <div className="w-36 h-36 rounded-full bg-[#111] border border-white/10 flex items-center justify-center relative shadow-2xl transition-luxury hover:scale-110 hover:border-white/30 cursor-pointer group-hover:bg-[#161616]">
                           <div className="text-white/40 group-hover:text-white transition-colors drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                              {item.icon}
                           </div>
                        </div>
                        <div className="text-center max-w-[240px]">
                           <h3 className="text-xl font-serif mb-4 selection:bg-white selection:text-black">{item.title}</h3>
                           <p className="text-[#a1a1a1] font-light leading-relaxed text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                </div>
            </div>
        </section>

      </main>

      <footer className="py-16 border-t border-white/5 w-full bg-[#030303] relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-[13px] text-[#8c94a5] flex items-center gap-3 uppercase tracking-widest font-bold">
             © 2026 Sam Project Research
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
