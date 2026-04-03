import React from 'react';
import { Bot } from 'lucide-react';

export default function Header() {
  return (
    <header>
      <div className="logo">
        <Bot className="text-cyan" size={28} />
        AgentFlow
      </div>
      <nav className="links">
        <a href="#features">Features</a>
        <a href="#framework">Dynamic Generation</a>
        <a href="#pricing">Pricing</a>
      </nav>
      <button className="btn-primary" style={{ padding: '8px 20px' }}>Sign in</button>
    </header>
  );
}
