import React, { useState } from 'react';
import { BotMessageSquare, ArrowRight, Activity, Zap } from 'lucide-react';
import './Hero.css';

export default function Hero({ onStartFlow }) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(prompt.trim()) {
      onStartFlow(prompt);
    }
  };

  return (
    <section className="hero">
      <div className="glow-bg"></div>
      
      <div className="hero-content">
        <div className="hero-icon-container">
          <BotMessageSquare size={48} className="hero-icon" />
          <div className="icon-pulse"></div>
        </div>
        
        <h1 className="hero-title">What agent do you want to create?</h1>
        <p className="hero-subtitle">Describe your business need in plain English. We'll build the perfect AI agent tailored to your workflow.</p>
        
        <form className="prompt-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            className="prompt-input"
            placeholder="e.g. Post on my LinkedIn every day about my bakery"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          />
          <button type="submit" className="prompt-submit">
             <ArrowRight size={20} />
          </button>
        </form>
        
        <div className="hero-tags">
          <span><Zap size={14} className="text-cyan" /> Zero Templates</span>
          <span><Activity size={14} className="text-cyan" /> Self-Healing Core</span>
        </div>
      </div>
    </section>
  );
}
