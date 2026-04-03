import React, { useState } from 'react';
import { X, Send, Bot, User } from 'lucide-react';
import './NewAgentModal.css';

export default function ChatUI({ agentId, onClose }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: `Hello! I am your agent. Send me a message to verify my logic.` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch(`http://localhost:8000/api/agents/${agentId}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply || "Error: No reply found." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Error connecting to Autogen backend." }]);
    }
    setIsTyping(false);
  };

  return (
    <div className="new-agent-overlay">
      <div className="new-agent-content glass-panel" style={{ height: '80vh', display: 'flex', flexDirection: 'column', padding: 0 }}>
        <button className="modal-close" onClick={onClose} style={{ zIndex: 10 }}><X size={24} /></button>
        
        <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'rgba(20, 184, 166, 0.1)', padding: '12px', borderRadius: '50%' }}>
            <Bot size={24} className="text-cyan" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px' }}>Deployed Agent Workspace</h3>
            <p className="text-secondary" style={{ margin: '4px 0 0 0', fontSize: '13px' }}>Simulating real-time communication with the python backbone</p>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
                <div style={{ background: msg.role === 'user' ? 'var(--primary-color)' : 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '50%', border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.1)' }}>
                  {msg.role === 'user' ? <User size={16} color="white"/> : <Bot size={16} className="text-cyan"/>}
                </div>
                <div style={{ background: msg.role === 'user' ? 'rgba(20, 184, 166, 0.15)' : 'rgba(0,0,0,0.3)', border: msg.role === 'user' ? '1px solid rgba(20, 184, 166, 0.3)' : '1px solid rgba(255,255,255,0.05)', padding: '16px 20px', borderRadius: '16px', borderTopRightRadius: msg.role === 'user' ? '4px' : '16px', borderTopLeftRadius: msg.role === 'assistant' ? '4px' : '16px', color: '#e2e8f0', fontSize: '15px', lineHeight: '1.6' }}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
             <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '12px', maxWidth: '85%' }}>
               <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)' }}><Bot size={16} className="text-cyan"/></div>
               <div style={{ background: 'rgba(0,0,0,0.3)', padding: '14px 20px', borderRadius: '16px', borderTopLeftRadius: '4px', fontSize: '14px', border: '1px solid rgba(255,255,255,0.05)' }}><span style={{ animation: 'pulse 1s infinite' }}>Agent is computing...</span></div>
             </div>
          )}
        </div>

        <form onSubmit={handleSend} style={{ padding: '24px 32px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '12px', background: 'rgba(0,0,0,0.2)' }}>
          <input 
            type="text" 
            placeholder="Send a test message to your deployed agent..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            style={{ flex: 1, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', padding: '16px 20px', borderRadius: '12px', color: 'white', fontSize: '15px', outline: 'none' }}
          />
          <button type="submit" disabled={isTyping} style={{ background: 'var(--primary-color)', border: 'none', borderRadius: '12px', width: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'box-shadow 0.2s', boxShadow: '0 0 15px rgba(20, 184, 166, 0.4)' }}>
            <Send size={20} color="white" />
          </button>
        </form>
      </div>
    </div>
  );
}
