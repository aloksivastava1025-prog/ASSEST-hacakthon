import React, { useState } from 'react';
import { Bot, ArrowRight, ShieldCheck, Terminal, Cpu, Zap } from 'lucide-react';
import type { WorkflowGraph } from '../types';

interface Props {
  businessContext: string;
  onComplete: (
    agentId: string,
    agentName: string,
    workflow: WorkflowGraph,
    script: string,
    provider: string,
    model: string,
  ) => void;
}

const STEPS = [
  'Parsing business logic...',
  'Injecting context into prompt...',
  'Generating AutoGen agent core...',
  'Compiling executable script...',
  'Writing workflow metadata...',
];

export default function AgentBuilder({ businessContext, onComplete }: Props) {
  const [phase, setPhase] = useState<'prompt' | 'synth' | 'error'>('prompt');
  const [prompt, setPrompt] = useState('');
  const [name, setName] = useState('');
  const [providerPref, setProviderPref] = useState<'gemini' | 'groq'>('gemini');
  const [logs, setLogs] = useState<string[]>([]);
  const [errorTitle, setErrorTitle] = useState('Compilation Failed');
  const [errorMsg, setErrorMsg] = useState('');

  const contextPreview = businessContext.trim()
    || 'No onboarding context provided. Focusing on behavioral prompt only.';

  const handleBuild = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !name.trim()) return;

    setPhase('synth');
    setLogs([]);
    setErrorTitle('Compilation Failed');
    setErrorMsg('');

    let step = 0;
    const intervalId = window.setInterval(() => {
      if (step < STEPS.length) {
        setLogs((previous) => [...previous, `[compiler] ${STEPS[step]}`]);
        step += 1;
      }
    }, 800);

    try {
      const response = await fetch('/api/agents/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          prompt,
          business_context: businessContext,
          target_provider: providerPref,
        }),
      });
      const data = await response.json();
      window.clearInterval(intervalId);

      if (!response.ok) {
        throw new Error(data.detail || data.message || 'The backend could not compile this agent.');
      }

      if (data.status === 'success' || data.status === 'simulated') {
        setLogs((previous) => [...previous, `[compiler] OK Agent "${data.agent_id}" compiled.`]);
        window.setTimeout(() => {
          onComplete(
            data.agent_id,
            name,
            data.workflow,
            data.script_preview || '',
            data.provider || 'Simulation',
            data.model || '',
          );
        }, 1200);
        return;
      }

      throw new Error(data.message || 'Unknown build status returned by the backend.');
    } catch (error) {
      window.clearInterval(intervalId);
      setErrorTitle('Compilation Failed');
      setErrorMsg(error instanceof Error ? error.message : 'Backend unreachable.');
      setPhase('error');
    }
  };

  if (phase === 'error') {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 animate-fade-in relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 z-0" 
          style={{ backgroundImage: "url('https://framerusercontent.com/images/EqTvMX987cRyoYGTSVcaTDhwgWM.jpg')" }}
        />
        <div className="glass-panel p-12 max-w-lg w-full text-center rounded-[3rem] animate-float relative z-10 border-white/[0.05]">
          <h2 className="text-3xl font-serif text-white mb-6 leading-tight tracking-tight">{errorTitle}</h2>
          <p className="text-white/40 mb-10 font-light text-lg leading-relaxed">{errorMsg}</p>
          <button 
            className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            onClick={() => setPhase('prompt')}
          >
            Back to Asset Forge
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'synth') {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 animate-fade-in relative overflow-hidden text-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 z-0" 
          style={{ backgroundImage: "url('https://framerusercontent.com/images/EqTvMX987cRyoYGTSVcaTDhwgWM.jpg')" }}
        />
        <div className="glass-panel p-12 md:p-16 max-w-2xl w-full rounded-[3rem] animate-float relative z-10 border-white/[0.05]">
          <div className="w-24 h-24 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mx-auto mb-10">
            <Cpu size={40} className="text-white/50 animate-pulse" />
          </div>
          <h2 className="text-4xl font-serif text-white mb-8 tracking-tight">Synthesizing Asset</h2>
          <div className="bg-black/40 border border-white/5 p-8 rounded-[1.5rem] min-h-[250px] text-left overflow-auto scroll-pane shadow-inner">
            {logs.map((line, index) => (
              <div
                key={index}
                className={`font-mono text-[13px] mb-3 leading-relaxed ${line.includes('OK') ? 'text-white font-bold' : 'text-white/30'}`}
              >
                {index === logs.length - 1 ? <span className="animate-blink mr-2">|</span> : '> '}
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
       <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 z-0" 
        style={{ backgroundImage: "url('https://framerusercontent.com/images/EqTvMX987cRyoYGTSVcaTDhwgWM.jpg')" }}
      />
      
      <div className="glass-panel p-10 md:p-16 max-w-3xl w-full relative z-10 rounded-[3rem] animate-slide-up border-white/[0.05]">
        <div className="text-center mb-12">
          <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono tracking-widest text-white/40 uppercase mb-6 mx-auto w-fit">
            AGENT SYNTHESIZER
          </div>
          <h1 className="text-5xl font-serif text-white mb-4 tracking-tight">Autonomous Assembly</h1>
          <p className="text-white/50 font-light text-lg">Define the behavioral constraints for your autonomous agent asset.</p>
        </div>

        <form onSubmit={handleBuild} className="flex flex-col gap-8">
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 shadow-inner">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck size={18} className="text-white/20" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-white/30 font-bold">Synchronized Context</span>
            </div>
            <p className="text-[15px] font-light text-white/50 leading-relaxed italic">"{contextPreview}"</p>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[11px] uppercase tracking-widest text-white/30 font-bold mb-1 flex items-center gap-2">
               <Terminal size={14} /> Agent Identifier
            </label>
            <input 
              type="text" 
              className="bg-black/40 border border-white/5 text-white rounded-2xl px-6 py-4 focus:border-white/20 outline-none transition-luxury placeholder:text-white/10 text-[15px]"
              placeholder="e.g. Asset_Forge_Agent" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[11px] uppercase tracking-widest text-white/30 font-bold mb-1 flex items-center gap-2">
               <Bot size={14} /> System behavior Prompt
            </label>
            <textarea 
              className="bg-black/40 border border-white/5 text-white rounded-2xl px-6 py-5 focus:border-white/20 outline-none transition-luxury min-h-[160px] placeholder:text-white/10 font-mono text-[15px] leading-relaxed"
              placeholder="Inject rules, goals, and behavioral constraints..." 
              value={prompt} 
              onChange={(e) => setPrompt(e.target.value)} 
              required 
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[11px] uppercase tracking-widest text-white/30 font-bold mb-1 flex items-center gap-2">
               <Zap size={14} /> Model Inference Engine
            </label>
            <select 
              className="bg-black/40 border border-white/5 text-white rounded-2xl px-6 py-4 focus:border-white/20 outline-none transition-luxury appearance-none cursor-pointer text-[15px]" 
              value={providerPref} 
              onChange={(e) => setProviderPref(e.target.value as any)}
            >
              <option value="gemini">Google Gemini 3 Pro (High Context)</option>
              <option value="groq">Groq Llama 3.3 (High Performance)</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="w-full bg-white text-black font-bold py-5 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 shadow-2xl text-lg mt-4 group"
          >
            Compile Agent Asset <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}
