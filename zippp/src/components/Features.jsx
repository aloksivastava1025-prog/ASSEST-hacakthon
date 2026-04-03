import React from 'react';
import { Layers, Workflow, ShieldCheck } from 'lucide-react';
import './Features.css';

const features = [
  {
    title: "Dynamic Agent Synthesis",
    desc: "We don't use templates. When you describe your need, we synthesize a bespoke agent tailored uniquely to your business tone and context.",
    icon: <Layers className="text-cyan" size={32} />
  },
  {
    title: "Self-Healing Workflows",
    desc: "If an API fails or a token limit is hit, our agents auto-correct and repair themselves. Recovery happens automatically, without manual intervention.",
    icon: <ShieldCheck className="text-cyan" size={32} />
  },
  {
    title: "Embedded Research",
    desc: "AgentFlow automatically researches your competitors and market upfront. Your custom agents use this deep knowledge to operate faster and smarter.",
    icon: <Workflow className="text-cyan" size={32} />
  }
];

export default function Features() {
  return (
    <section className="features-section" id="features">
      <div className="features-container">
        {features.map((f, i) => (
          <div className="feature-card" key={i}>
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
