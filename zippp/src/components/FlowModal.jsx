import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, User, KeyRound } from 'lucide-react';
import './FlowModal.css';

const steps = [
  "Parsing Intent from Description...",
  "Running Tier 1 Business Research...",
  "Analyzing Competitor Market...",
  "Synthesizing Custom Agent...",
  "Validating Agent Schema..."
];

export default function FlowModal({ prompt, onClose, onLogin }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1200); // 1.2s per step for demo speed
      return () => clearTimeout(timer);
    } else {
      setIsFinished(true);
    }
  }, [currentStep]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h2>{isFinished ? "Agent Synthesized" : "Generating Agent"}</h2>
        <p className="prompt-echo">"{prompt}"</p>
        
        <div className="timeline">
          {steps.map((step, idx) => {
            const isActive = idx === currentStep;
            const isDone = idx < currentStep;
            return (
              <div key={idx} className={`timeline-item ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}>
                <div className="indicator">
                  {isDone ? <CheckCircle2 size={18} className="text-cyan" /> : 
                   isActive ? <Loader2 size={18} className="spin text-cyan" /> : 
                   <div className="dot"></div>}
                </div>
                <span className="step-text">{step}</span>
              </div>
            );
          })}
        </div>

        {isFinished && (
          <div className="auth-prompt">
            <div className="auth-box">
              <KeyRound size={24} className="text-secondary" />
              <div className="auth-text">
                <h4>Sign in to view your Agent</h4>
                <p>Please log in or create an account to securely save and deploy your custom AI agent.</p>
              </div>
            </div>
            <div className="auth-actions">
              <button className="btn-secondary" onClick={onLogin}>Continue with Google</button>
              <button className="btn-primary" onClick={onLogin}>Sign in with Email</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
