import React, { useState, useEffect } from 'react';
import { Bot, ArrowRight, X, Terminal, CheckCircle2, RefreshCw, Play } from 'lucide-react';
import './NewAgentModal.css';

const SYNTHESIS_STEPS = [
  "Parsing business logic...",
  "Loading industry datasets...",
  "Generating multi-step workflows...",
  "Running adversarial testing...",
  "Integrating APIs...",
  "Agent compiled successfully."
];

export default function NewAgentModal({ onClose, onSubmit }) {
  const [phase, setPhase] = useState('prompt'); // 'prompt' | 'synthesizing' | 'testing'
  const [prompt, setPrompt] = useState("");
  const [synthLogs, setSynthLogs] = useState([]);
  
  // Testing Sandbox States
  const [testInput, setTestInput] = useState('');
  const [executionLogs, setExecutionLogs] = useState([
    { time: new Date().toLocaleTimeString(), msg: "Agent compiled. Ready for simulated dry run.", status: "info" }
  ]);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleBuild = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      setPhase('synthesizing');
      setSynthLogs([]);
    }
  };

  useEffect(() => {
    if (phase === 'synthesizing') {
      let currentStep = 0;
      const interval = setInterval(() => {
        if (currentStep < SYNTHESIS_STEPS.length) {
          setSynthLogs(prev => [...prev, `[system] ${SYNTHESIS_STEPS[currentStep]}`]);
          currentStep++;
        } else {
          clearInterval(interval);
          setTimeout(() => setPhase('testing'), 1000);
        }
      }, 800);

      return () => clearInterval(interval);
    }
  }, [phase]);

  const handleTestSubmit = (e) => {
    e.preventDefault();
    if (isExecuting) return;
    
    setIsExecuting(true);
    setExecutionLogs(prev => [...prev, { 
      time: new Date().toLocaleTimeString(), 
      msg: `Triggering workflow with parameters: "${testInput || 'Default Trigger'}"`,
      status: "info"
    }]);

    const steps = [
      { msg: "Connecting to required platform APIs...", status: "pending" },
      { msg: "Running context analysis and agentic reasoning...", status: "pending" },
      { msg: "Synthesizing payload and drafting outputs...", status: "pending" },
      { msg: "Dry run successful! Outputs validated. No external actions taken.", status: "success" }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setExecutionLogs(prev => [...prev, { 
          time: new Date().toLocaleTimeString(), 
          ...steps[currentStep]
        }]);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsExecuting(false);
      }
    }, 1200);

    setTestInput('');
  };

  return (
    <div className="new-agent-overlay">
      <div className="new-agent-content">
        <button className="modal-close" onClick={onClose}><X size={24} /></button>
        
        {phase === 'prompt' && (
          <div className="wizard-container">
            <div className="new-agent-header">
              <Bot size={64} className="text-cyan mb-4 mx-auto" style={{ margin: '0 auto 20px' }} />
              <h2>Architect Your Agent</h2>
              <p className="text-secondary">Describe your workflow, task, or business goal in plain English. We'll instantly compile a custom AI agent mapped exactly to your prompt.</p>
            </div>
            
            <form className="new-agent-form" onSubmit={handleBuild}>
              <textarea 
                className="new-agent-input"
                placeholder="e.g. Scan customer support emails for refund requests, classify the severity, and automatically draft apologies with discount codes..."
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                autoFocus
              ></textarea>
              <button type="submit" className="btn-primary btn-xl w-full">
                Generate Architecture <ArrowRight size={20} className="ml-2" />
              </button>
            </form>
          </div>
        )}

        {phase === 'synthesizing' && (
          <div className="synthesizing-state">
             <div className="pulse-bot">
                <Bot size={80} className="text-cyan" />
             </div>
             <h3 style={{ fontSize: '28px', marginBottom: '16px' }}>Synthesizing Agent...</h3>
             <p className="text-secondary" style={{ fontSize: '18px' }}>Processing your logic and weaving neural schemas.</p>
             
             <div className="processing-visual">
                {synthLogs.map((log, i) => (
                   <div key={i} className="code-line">{log}</div>
                ))}
             </div>
          </div>
        )}

        {phase === 'testing' && (
          <div className="testing-sandbox">
             <div className="testing-header">
                <h3><Terminal size={20} className="text-cyan inline-block mr-2" style={{ verticalAlign: 'middle', marginRight: '8px' }}/> Workflow Simulator</h3>
                <p className="text-secondary mt-2">Test your new task agent via a dry-run execution. No external posts or emails will actually be sent yet.</p>
             </div>
             
             <div className="testing-terminal">
                {executionLogs.map((log, i) => (
                  <div key={i} className={`terminal-log ${log.status}`}>
                     <span className="log-timestamp">[{log.time}]</span> {log.msg}
                  </div>
                ))}
                {isExecuting && (
                  <div className="terminal-log processing">
                    <span className="log-timestamp">[{new Date().toLocaleTimeString()}]</span> Executing current block<span className="cursor-blink">...</span>
                  </div>
                )}
             </div>

             <form className="testing-input-area" onSubmit={handleTestSubmit}>
               <input 
                 type="text" 
                 placeholder="Input optional test variables (e.g. 'Use recent blog post')"
                 value={testInput}
                 onChange={e => setTestInput(e.target.value)}
                 disabled={isExecuting}
               />
               <button type="submit" disabled={isExecuting}>
                 <Play size={16} style={{ display: 'inline', marginRight: '6px' }} />
                 Execute Dry Run
               </button>
             </form>

             <div className="testing-actions">
               <button className="btn-secondary py-3 px-6" onClick={() => {
                 setPhase('prompt'); 
                 setExecutionLogs([{ time: new Date().toLocaleTimeString(), msg: "Agent compiled. Ready for simulated dry run.", status: "info" }]);
               }}>
                 <RefreshCw size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }}/>
                 Refine Prompt
               </button>
               <button className="btn-primary py-3 px-6" onClick={() => onSubmit(prompt)} disabled={isExecuting}>
                 <CheckCircle2 size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }}/>
                 Accept & Deploy Agent
               </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
