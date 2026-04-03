import { ArrowRight, FileText, CheckCircle2 } from 'lucide-react';

interface Props {
  report: string;
  onContinue: () => void;
}

export default function CrewAIReport({ report, onContinue }: Props) {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden animate-fade-in">
       <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 z-0" 
        style={{ backgroundImage: "url('https://framerusercontent.com/images/EqTvMX987cRyoYGTSVcaTDhwgWM.jpg')" }}
      />
      
      <div className="glass-panel p-10 md:p-16 max-w-6xl w-full relative z-10 rounded-[3rem] border-white/[0.05]">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-16">
          <div className="max-w-xl">
            <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono tracking-widest text-white/40 uppercase mb-8 w-fit">
              Strategic Insight
            </div>
            <h1 className="text-5xl md:text-6xl font-serif text-white mb-8 tracking-tight leading-tight">
               Market Research <br />
               Protocol
            </h1>
            <p className="text-white/50 font-light text-lg leading-relaxed mb-10">
              The autonomous research pipeline has synthesized the provided business context into a strategic briefing. 
              This intelligence will be used as the logic for your AutoGen agents.
            </p>
            
            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-5 text-white/40">
                <CheckCircle2 size={18} className="text-white/30" />
                <span className="text-[15px] font-medium tracking-wide">Mapping target segments</span>
              </div>
              <div className="flex items-center gap-5 text-white/40">
                <CheckCircle2 size={18} className="text-white/30" />
                <span className="text-[15px] font-medium tracking-wide">Synthesizing category signals</span>
              </div>
              <div className="flex items-center gap-5 text-white/40">
                <CheckCircle2 size={18} className="text-white/30" />
                <span className="text-[15px] font-medium tracking-wide">Finalizing behavioral constraints</span>
              </div>
            </div>

            <button 
              onClick={onContinue}
              className="w-full bg-white text-black font-bold py-5 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 shadow-2xl text-lg group"
            >
              Enter Asset Forge <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex-1 w-full glass-panel border-white/[0.03] bg-black/40 rounded-[2rem] overflow-hidden p-10 flex flex-col h-[600px] shadow-2xl">
            <div className="flex items-center gap-4 mb-8 pb-5 border-b border-white/5 opacity-30">
              <FileText size={20} />
              <span className="text-[11px] font-mono tracking-widest uppercase">RESEARCH_INTEL.md</span>
            </div>
            <div className="flex-1 overflow-auto pr-6 scroll-pane">
               <div className="whitespace-pre-wrap text-[16px] leading-[1.8] text-white/70 font-light selection:bg-white selection:text-black">
                {report}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
