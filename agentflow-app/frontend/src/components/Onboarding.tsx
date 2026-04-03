import { useState, useEffect } from 'react';
import { ArrowRight, BriefcaseBusiness, Globe, Zap, Target, CircleDollarSign } from 'lucide-react';

interface OnboardingProps {
  onComplete: (context: string, report: string) => void;
  onSkip?: () => void;
  initialIdea?: string;
}

const STEPS = [
  'Analyzing business profile...',
  'Mapping market segments...',
  'Synthesizing strategic brief...',
  'Finalizing research package...',
];

export default function Onboarding({ onComplete, onSkip, initialIdea }: OnboardingProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    revenue: '10k_50k',
    targetAudience: '',
  });

  // Handle immediate submission if initialIdea is provided
  useEffect(() => {
    if (initialIdea) {
      setIsSubmitting(true);
      submitResearch(initialIdea);
    }
  }, [initialIdea]);

  useEffect(() => {
    if (!isSubmitting) return;
    const interval = window.setInterval(() => {
      setCurrentStep(prev => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 2000);
    return () => window.clearInterval(interval);
  }, [isSubmitting]);

  const submitResearch = async (contextStr: string) => {
    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ business_context: contextStr }),
      });
      const data = await response.json();
      onComplete(contextStr, data.report);
    } catch (error) {
      console.error(error);
      onComplete(contextStr, '# Error\n\nFailed to reach research backend.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const contextStr = `${formData.businessName} is in ${formData.industry}, targeting: ${formData.targetAudience}. Revenue bracket: ${formData.revenue}`;
    submitResearch(contextStr);
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 relative overflow-hidden animate-fade-in">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 z-0 scale-105 transition-all" 
          style={{ backgroundImage: "url('https://framerusercontent.com/images/EqTvMX987cRyoYGTSVcaTDhwgWM.jpg')" }}
        />
        <div className="glass-panel p-12 md:p-20 max-w-xl w-full text-center rounded-[3rem] animate-float relative z-10 border-white/[0.05]">
          <div className="w-24 h-24 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mx-auto mb-10">
            <Zap size={40} className="text-white/50 animate-pulse" />
          </div>
          <h2 className="text-4xl font-serif text-white mb-8 tracking-tight">Building Intelligence</h2>
          <div className="space-y-5">
            {STEPS.map((step, index) => (
              <div key={index} className="flex items-center gap-5 text-left">
                <div className={`w-2.5 h-2.5 rounded-full transition-all duration-1000 ${index <= currentStep ? 'bg-white shadow-[0_0_15px_white]' : 'bg-white/10'}`} />
                <span className={`text-[15px] font-medium tracking-wide ${index === currentStep ? 'text-white' : 'text-white/20'}`}>{step}</span>
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
      
      <div className="glass-panel p-10 md:p-16 max-w-2xl w-full relative z-10 rounded-[3rem] animate-fade-in border-white/[0.05]">
        <div className="text-center mb-12">
          <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono tracking-widest text-white/40 uppercase mb-6 mx-auto w-fit">
            Onboarding Protocol
          </div>
          <h1 className="text-5xl font-serif text-white mb-4 tracking-tight">Strategic Context</h1>
          <p className="text-white/50 font-light text-lg">Tell us about your business to synchronize our agents.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-3">
              <label className="text-[11px] uppercase tracking-widest text-white/30 font-bold mb-1 flex items-center gap-2">
                <BriefcaseBusiness size={12} /> Business Name
              </label>
              <input 
                className="bg-black/40 border border-white/5 text-white rounded-2xl px-6 py-4 focus:border-white/20 outline-none transition-luxury placeholder:text-white/10 text-[15px]"
                placeholder="Sam Project Studio" 
                value={formData.businessName} 
                onChange={e => setFormData({...formData, businessName: e.target.value})} 
                required 
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[11px] uppercase tracking-widest text-white/30 font-bold mb-1 flex items-center gap-2">
                <Globe size={12} /> Industry
              </label>
              <input 
                className="bg-black/40 border border-white/5 text-white rounded-2xl px-6 py-4 focus:border-white/20 outline-none transition-luxury placeholder:text-white/10 text-[15px]"
                placeholder="AI Research SaaS" 
                value={formData.industry} 
                onChange={e => setFormData({...formData, industry: e.target.value})} 
                required 
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[11px] uppercase tracking-widest text-white/30 font-bold mb-1 flex items-center gap-2">
              <CircleDollarSign size={12} /> Revenue Bracket
            </label>
            <select 
              className="bg-black/40 border border-white/5 text-white rounded-2xl px-6 py-4 focus:border-white/20 outline-none transition-luxury appearance-none cursor-pointer text-[15px]" 
              value={formData.revenue} 
              onChange={e => setFormData({...formData, revenue: e.target.value})}
            >
              <option value="pre-revenue">Pre-revenue</option>
              <option value="1k_10k">$1k - $10k /mo</option>
              <option value="10k_50k">$10k - $50k /mo</option>
              <option value="over_50k">Over $50k /mo</option>
            </select>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[11px] uppercase tracking-widest text-white/30 font-bold mb-1 flex items-center gap-2">
              <Target size={12} /> Target Audience
            </label>
            <textarea 
              className="bg-black/40 border border-white/5 text-white rounded-2xl px-6 py-5 focus:border-white/20 outline-none transition-luxury min-h-[140px] placeholder:text-white/10 text-[15px] leading-relaxed"
              placeholder="Who are your primary users?" 
              value={formData.targetAudience} 
              onChange={e => setFormData({...formData, targetAudience: e.target.value})} 
              required 
            />
          </div>

          <div className="flex flex-col gap-5 mt-6">
            <button 
              type="submit" 
              className="w-full bg-white text-black font-bold py-5 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 shadow-2xl text-lg animate-float"
            >
              Analyze & Research <ArrowRight size={20} />
            </button>
            <button 
              type="button" 
              onClick={onSkip} 
              className="text-white/20 text-sm hover:text-white transition-colors uppercase tracking-widest font-bold text-[10px]"
            >
              Skip to Builder (Direct Mode)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
