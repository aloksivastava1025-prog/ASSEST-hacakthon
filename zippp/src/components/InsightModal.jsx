import React from 'react';
import { X, TrendingUp, Target, Lightbulb, Activity, BarChart3, Users, Network, ShieldCheck } from 'lucide-react';
import './InsightModal.css';

export default function InsightModal({ insightType, businessData, onClose }) {
  if (!insightType || !businessData) return null;

  const renderMarketAnalysis = () => (
    <div className="insight-detail-content">
      <div className="insight-hero">
        <TrendingUp size={48} className="text-cyan mb-4" />
        <h2>In-Depth Market Analysis</h2>
        <p className="text-secondary">Sector: {businessData.industry || 'Tech'} | Model: {businessData.businessType}</p>
      </div>
      
      <div className="insight-grid">
        <div className="detail-card">
          <div className="detail-header">
            <Activity size={18} className="text-cyan"/> 
            <h4>Market Trajectory</h4>
          </div>
          <p>We've detected a significant 14% QOQ increase in competitor ad spend within your direct niche. The general market sentiment is shifting towards highly-personalized multi-touch engagements.</p>
          <div className="stat-row mt-4">
            <div className="stat-pill"><span className="label">Growth Rate</span><span className="value">+8.4%</span></div>
            <div className="stat-pill"><span className="label">Saturation</span><span className="value text-cyan">Moderate</span></div>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-header">
            <BarChart3 size={18} className="text-cyan"/> 
            <h4>Competitor Landscape</h4>
          </div>
          <p>Top competitors in the {businessData.industry} sector are actively investing in AI automation to reduce their customer acquisition costs (CAC).</p>
          <ul className="custom-list mt-3">
            <li>32% using automated chatbots for top-of-funnel</li>
            <li>Content frequency has increased by 1.5x</li>
            <li>Dependency on paid channels remains high (70%)</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderAudienceResearch = () => (
    <div className="insight-detail-content">
      <div className="insight-hero">
        <Target size={48} className="text-cyan mb-4" />
        <h2>Audience Intelligence</h2>
        <p className="text-secondary">"{businessData.targetAudience}"</p>
      </div>

      <div className="insight-grid">
        <div className="detail-card full-width">
          <div className="detail-header">
            <Users size={18} className="text-cyan"/> 
            <h4>Core Personas Defined</h4>
          </div>
          <div className="persona-grid mt-4">
            <div className="persona-box">
              <h5>Primary Buyer</h5>
              <p>High-intent, looking for immediate ROI. Strongly influenced by social proof and technical validation.</p>
              <div className="tags mt-2">
                <span className="tag">Results-driven</span>
                <span className="tag">Time-poor</span>
              </div>
            </div>
            <div className="persona-box">
              <h5>Secondary Stakeholder</h5>
              <p>Focused on long-term scalability and risk mitigation. Needs detailed case studies to convert.</p>
              <div className="tags mt-2">
                <span className="tag">Risk-averse</span>
                <span className="tag">Analytical</span>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-header">
            <Network size={18} className="text-cyan"/> 
            <h4>Digital Behavioral Patterns</h4>
          </div>
          <p>This audience segment aggregates heavily on industry-specific forums and professional networks (e.g. LinkedIn). They respond poorly to aggressive outbound sales, preferring inbound education.</p>
        </div>
      </div>
    </div>
  );

  const renderAdvisory = () => (
    <div className="insight-detail-content">
      <div className="insight-hero">
        <Lightbulb size={48} className="text-cyan mb-4" />
        <h2>Strategic AI Advisory</h2>
        <p className="text-secondary">Revenue Profile: {businessData.revenue}</p>
      </div>

      <div className="advisory-plan mt-6">
        <h3>Recommended 3-Phase Action Plan</h3>
        
        <div className="action-step mt-4">
          <div className="step-number">01</div>
          <div className="step-content">
            <h4>Deploy Content Authority Agents</h4>
            <p>Scale top-of-funnel engagement by deploying agents that consume industry news and draft authoritative thought leadership posts natively to your channels.</p>
          </div>
        </div>

        <div className="action-step">
          <div className="step-number">02</div>
          <div className="step-content">
            <h4>Automate Inbound Lead Nurturing</h4>
            <p>Implement an AI agent hooked to your CRM to immediately assess inbound inquiries, classify lead warmth, and trigger personalized email drip workflows.</p>
          </div>
        </div>

        <div className="action-step">
          <div className="step-number">03</div>
          <div className="step-content">
            <h4>Continuous Optimization Loop</h4>
            <p>For your revenue bracket, optimizing Client LTV is crucial. Dedicate an agent to survey active clients and predict churn risks based on engagement metrics.</p>
          </div>
        </div>
      </div>
      
      <div className="detail-card highlight full-width mt-4">
        <div className="detail-header">
          <ShieldCheck size={18} className="text-cyan"/> 
          <h4>Immediate Quick Win</h4>
        </div>
        <p>Prioritize setting up the <strong>Social Media Optimizer</strong> agent first. It requires minimal access but guarantees immediate visibility increases within 14 days.</p>
      </div>
    </div>
  );

  return (
    <div className="insight-overlay">
      <div className="insight-modal glass-panel">
        <button className="modal-close" onClick={onClose}><X size={24} /></button>
        
        {insightType === 'market' && renderMarketAnalysis()}
        {insightType === 'audience' && renderAudienceResearch()}
        {insightType === 'advisory' && renderAdvisory()}
        
      </div>
    </div>
  );
}
