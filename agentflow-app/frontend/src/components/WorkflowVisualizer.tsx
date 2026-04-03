import { useState } from 'react';
import { ArrowRight, Bot, Code, Layout, Boxes, Inbox, Laptop, Send, Share2 } from 'lucide-react';

interface Props {
  agentName: string;
  agentScript: string;
  providerInfo: { provider: string; model: string };
  onContinue: () => void;
}

export default function WorkflowVisualizer({
  agentName,
  agentScript,
  providerInfo,
  onContinue,
}: Props) {
  const [activeTab, setActiveTab] = useState<'visual' | 'code'>('visual');

  // Hardcore Logic Nodes based on user request (n8n style)
  const logicalNodes = [
    { id: 'start', label: 'INQUIRY RECEIVED', icon: <Inbox size={24} />, sub: 'Trigger Event' },
    { id: 'process', label: 'INQUIRY PROCESSING', icon: <Bot size={24} />, sub: 'AutoGen Logic' },
    { id: 'output', label: 'RESPONSE GENERATION', icon: <Send size={24} />, sub: 'LLM Synthesis' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col font-sans p-6 md:p-12 relative overflow-hidden animate-fade-in">
      {/* Background Atmosphere */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 z-0 pointer-events-none" 
        style={{ backgroundImage: "url('https://framerusercontent.com/images/EqTvMX987cRyoYGTSVcaTDhwgWM.jpg')" }}
      />
      
      <div className="max-w-7xl mx-auto w-full flex flex-col h-full gap-10 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b border-white/[0.04] pb-10">
          <div className="max-w-3xl">
            <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase mb-6 w-fit">
              Architecture Logic
            </div>
            <h1 className="text-5xl font-serif text-white mb-4 tracking-tight leading-none">{agentName} Pipeline</h1>
            <p className="text-white/50 font-light text-lg tracking-wide leading-relaxed">
              Autonomous execution flow for {providerInfo.model}.
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
             <button 
               onClick={() => setActiveTab(activeTab === 'visual' ? 'code' : 'visual')}
               className="flex-1 md:flex-none glass-panel border-white/[0.05] bg-white/[0.03] text-white/60 hover:text-white px-8 py-4 rounded-2xl transition-luxury flex items-center justify-center gap-3"
             >
               {activeTab === 'visual' ? <Code size={18} /> : <Layout size={18} />}
               {activeTab === 'visual' ? 'View Source' : 'View Logic'}
             </button>
             <button 
               onClick={onContinue}
               className="flex-1 md:flex-none bg-white text-black font-bold px-10 py-4 rounded-2xl hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center justify-center gap-3 shadow-2xl group"
             >
               Start Live Chat <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        </div>

        {/* Content Area - n8n style Logic Flow */}
        <div className="flex-1 glass-panel rounded-[3rem] bg-[#080808]/40 border-white/[0.05] overflow-hidden flex flex-col min-h-[650px] mb-12 shadow-2xl relative">
          
          <div className="px-10 py-5 border-b border-white/[0.04] flex items-center justify-between opacity-30 select-none">
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                <span className="text-[11px] font-mono tracking-[0.3em] uppercase font-bold text-white">PIPELINE_STATUS: ACTIVE</span>
             </div>
             <div className="flex gap-2">
                <Laptop size={14} />
                <span className="text-[10px] font-mono">127.0.0.1:8000</span>
             </div>
          </div>

          <div className="flex-1 relative overflow-hidden flex items-center justify-center">
            {activeTab === 'visual' ? (
              <div className="w-full h-full flex flex-col items-center justify-center p-32 animate-fade-in relative">
                
                {/* Connection Line */}
                <div className="absolute top-1/2 left-[20%] right-[20%] h-[1px] bg-white/10 z-0">
                  {/* Signal Pulse */}
                  <div className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-ticker" />
                </div>

                <div className="flex justify-between items-center w-full max-w-5xl relative z-10">
                  {logicalNodes.map((node, i) => (
                    <div key={node.id} className="flex flex-col items-center gap-8 group">
                      {/* Circular Glass Node */}
                      <div className="relative">
                        <div className="absolute -inset-4 bg-white/[0.02] rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-28 h-28 rounded-full bg-[#111] border border-white/10 flex items-center justify-center relative shadow-2xl transition-luxury hover:scale-110 hover:border-white/30 cursor-pointer">
                           <div className="text-white/40 group-hover:text-white transition-colors drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                              {node.icon}
                           </div>
                        </div>
                        {/* Status Pulse */}
                        {i < logicalNodes.length - 1 && (
                          <div className="absolute top-1/2 -right-24 md:-right-32 w-16 h-16 pointer-events-none opacity-20">
                             <ArrowRight className="text-white animate-pulse" />
                          </div>
                        )}
                      </div>

                      {/* Node Text */}
                      <div className="text-center">
                        <h3 className="text-[11px] font-bold text-white tracking-[0.3em] uppercase mb-2 drop-shadow-md">
                          {node.label}
                        </h3>
                        <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">
                          {node.sub}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Floating Meta Boxes */}
                <div className="absolute bottom-20 left-10 md:left-20 glass-panel border-white/[0.05] p-5 rounded-2xl animate-float opacity-30 hover:opacity-100 transition-opacity w-64 backdrop-blur-3xl">
                   <div className="text-[10px] font-mono text-white/50 mb-3 tracking-widest uppercase">Node_Config</div>
                   <div className="space-y-2">
                       <div className="flex justify-between text-[11px] font-light">
                          <span className="text-white/30">Latency</span>
                          <span className="text-cyan-400">0.4ms</span>
                       </div>
                       <div className="flex justify-between text-[11px] font-light">
                          <span className="text-white/30">Protocol</span>
                          <span className="text-white/50">WebSocket</span>
                       </div>
                   </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full p-16 overflow-auto bg-black/10 flex flex-col scroll-pane animate-fade-in">
                <pre className="text-[15px] leading-relaxed font-mono opacity-60 hover:opacity-100 transition-luxury">
                  <code className="selection:bg-white selection:text-black">{agentScript}</code>
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 py-6 border-t border-white/[0.04] animate-fade-in">
          <div className="flex items-center gap-4 text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] font-mono pointer-events-none">
            <Boxes size={14} className="text-white/30" />
            SYNTH_ENGINE: {providerInfo.model}
          </div>
          <div className="flex items-center gap-12 text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] font-mono">
            <button className="flex items-center gap-3 hover:text-white transition-luxury">
              <Share2 size={13} /> Export Logic
            </button>
            <div className="flex items-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
               Artifact_Checksum: OK
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
