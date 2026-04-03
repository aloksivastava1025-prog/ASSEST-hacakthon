import React, { useState, useRef, useEffect } from 'react';
import { Bot, Play, Pause, Activity, Database, Settings, BarChart2, Plus, FileText, Globe, UploadCloud, Users, TrendingUp, CheckCircle2, MoreVertical, Edit2, RotateCcw, Trash2 } from 'lucide-react';

function AgentCard({ title, description, status, updated, isActiveAgent, onToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const transformStyle = isHovered ? 'translateY(-4px)' : 'translateY(0)';

  return (
    <div 
      className="agent-showcase glass-panel" 
      style={{ 
        padding: '24px', 
        position: 'relative', 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: isHovered ? '0 8px 32px rgba(0, 0, 0, 0.3)' : 'none',
        transform: transformStyle,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: 1
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="agent-header mb-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="agent-info pr-4">
          <h3 style={{ fontSize: '20px', marginBottom: '8px', fontWeight: '600' }}>{title}</h3>
          <span className={`status-badge ${status === 'running' ? 'running' : 'paused'} ${status === 'running' ? 'bg-opacity-20 text-green-400' : ''}`} style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: '12px', fontSize: '12px' }}>
              <span className="status-dot"></span>
              {status === 'running' ? 'Active & Processing' : 'Standby / Paused'}
          </span>
        </div>

        <div className="agent-actions-menu" ref={menuRef} style={{ position: 'relative' }}>
          <button 
            className="text-secondary hover:text-white transition-colors"
            style={{ 
              padding: '6px', 
              background: menuOpen ? 'rgba(255,255,255,0.1)' : 'transparent', 
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MoreVertical size={20} />
          </button>
          
          {menuOpen && (
            <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: '4px', width: '192px', background: '#13161c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden', zIndex: 100, boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <button 
                  style={{ display: 'flex', gap: '10px', alignItems: 'center', width: '100%', padding: '12px 16px', background: 'transparent', border: 'none', color: '#e2e8f0', cursor: 'pointer', fontSize: '14px', textAlign: 'left' }} 
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                  onClick={() => setMenuOpen(false)}>
                  <Edit2 size={16} /> Edit Agent
                </button>
                <button 
                  style={{ display: 'flex', gap: '10px', alignItems: 'center', width: '100%', padding: '12px 16px', background: 'transparent', border: 'none', color: '#e2e8f0', cursor: 'pointer', fontSize: '14px', textAlign: 'left' }} 
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                  onClick={() => setMenuOpen(false)}>
                  <FileText size={16} /> View Logs
                </button>
                <button 
                  style={{ display: 'flex', gap: '10px', alignItems: 'center', width: '100%', padding: '12px 16px', background: 'transparent', border: 'none', color: '#e2e8f0', cursor: 'pointer', fontSize: '14px', textAlign: 'left' }} 
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                  onClick={() => { if(onToggle) onToggle(); setMenuOpen(false); }}>
                  <RotateCcw size={16} /> Restart Agent
                </button>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', margin: '4px 0' }}></div>
                <button 
                  style={{ display: 'flex', gap: '10px', alignItems: 'center', width: '100%', padding: '12px 16px', background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: '14px', textAlign: 'left' }} 
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(248, 113, 113, 0.1)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                  onClick={() => setMenuOpen(false)}>
                  <Trash2 size={16} /> Delete Agent
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="text-secondary mb-6 text-sm flex-grow" style={{ lineHeight: '1.6' }}>"{description}"</p>
      
      {/* Advanced Features Row */}
      <div className="advanced-metrics mb-6" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '6px' }}>
          <span className="text-secondary">Next Run:</span> <b style={{ color: '#fff' }}>{status === 'running' ? '2 hrs' : 'On Trigger'}</b>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '6px' }}>
          <span className="text-secondary">Success Rate:</span> <b className="text-cyan">99.8%</b>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px', marginTop: 'auto' }}>
        <span className="text-xs text-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
           <Activity size={12} /> Updated {updated}
        </span>
        <button 
           className={`btn-secondary`} 
           onClick={onToggle} 
           style={{ 
             padding: '10px 20px', 
             fontSize: '13px', 
             display: 'flex', 
             alignItems: 'center', 
             gap: '8px',
             background: status === 'running' ? 'rgba(239, 68, 68, 0.1)' : 'var(--primary-color)',
             color: status === 'running' ? '#f87171' : '#fff',
             border: status === 'running' ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid transparent',
             fontWeight: '600'
           }}
        >
          {status === 'running' ? <Pause size={14} /> : <Play size={14} />}
          {status === 'running' ? 'Pause Execution' : 'Start Agent'}
        </button>
      </div>
    </div>
  );
}

export function AgentsView({ agentTitle, agentStatus, activePrompt, toggleStatus, onNewAgent }) {
  return (
    <div className="view-container">
      <div className="view-header mb-8" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 className="text-2xl font-bold mb-2">My Agents</h2>
          <p className="text-secondary">Manage and deploy your autonomous workforce.</p>
        </div>
        <button className="btn-primary" onClick={onNewAgent} style={{ alignSelf: 'center' }}>
          <Plus size={18} /> Create Agent
        </button>
      </div>

      <div className="agents-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
        {/* Active Custom Agent */}
        <AgentCard 
          title={agentTitle}
          description={activePrompt || 'Automated social posting and outreach strategy.'}
          status={agentStatus}
          updated="2m ago"
          isActiveAgent={true}
          onToggle={toggleStatus}
        />

        {/* Mock Agent 1 */}
        <AgentCard 
          title="Customer Support Bot"
          description="Handles tier-1 inquiries, assesses sentiment, and processes automated standard refunds."
          status="running"
          updated="1d ago"
          isActiveAgent={false}
          onToggle={() => {}}
        />

        {/* Mock Agent 2 */}
        <AgentCard 
          title="Lead Scraper"
          description="Weekly LinkedIn outbound generation. Identifies target roles and exports to CRM."
          status="paused"
          updated="3w ago"
          isActiveAgent={false}
          onToggle={() => {}}
        />
      </div>
    </div>
  );
}

export function AnalyticsView() {
  return (
    <div className="view-container">
      <div className="view-header mb-8">
        <h2 className="text-2xl font-bold mb-2">Performance Analytics</h2>
        <p className="text-secondary">Track the real-time computational and financial impact of your automated workforce.</p>
      </div>

      {/* Top Value Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
         <div className="glass-panel" style={{ padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="text-secondary mb-2" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Tasks Executed</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>14,293</div>
            <div style={{ color: '#10b981', fontSize: '13px', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}><TrendingUp size={14}/> +12.5% vs last week</div>
         </div>
         <div className="glass-panel" style={{ padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="text-secondary mb-2" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Compute Credits Used</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>42.8k</div>
            <div style={{ color: '#f59e0b', fontSize: '13px', marginTop: '8px' }}>Approaching usage limit (50k)</div>
         </div>
         <div className="glass-panel" style={{ padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="text-secondary mb-2" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Avg. Response Time</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--primary-color)' }}>1.2s</div>
            <div style={{ color: '#10b981', fontSize: '13px', marginTop: '8px' }}>Optimal Infrastructure Performance</div>
         </div>
         <div className="glass-panel" style={{ padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="text-secondary mb-2" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Estimated ROI Saved</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>$3,400</div>
            <div style={{ color: '#10b981', fontSize: '13px', marginTop: '8px' }}>Based on $24/hr manual equivalent</div>
         </div>
      </div>

      <div className="dashboard-grid">
        <div className="glass-panel" style={{ gridColumn: '1 / -1', padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
             <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px' }}><BarChart2 size={18} className="text-cyan"/> Task Volume & Traffic Pattern (30 Days)</h4>
             <select className="btn-secondary" style={{ padding: '6px 16px', background: 'rgba(255,255,255,0.05)' }}><option>All Active Agents</option><option>Primary Agent</option></select>
          </div>
          <div style={{ height: '240px', width: '100%', background: 'linear-gradient(180deg, rgba(20, 184, 166, 0.05) 0%, transparent 100%)', borderBottom: '1px solid var(--border-glass)', position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 10px' }}>
             {/* Fake Dynamic Chart Bars */}
             {[40, 60, 45, 80, 50, 65, 45, 30, 70, 100, 85, 95, 60, 50, 70].map((h, i) => (
                <div key={i} style={{ width: '4%', height: `${h}%`, background: h > 85 ? 'var(--primary-color)' : 'rgba(20, 184, 166, 0.3)', borderRadius: '4px 4px 0 0', position: 'relative', transition: 'height 1s ease-out' }}></div>
             ))}
          </div>
        </div>
      </div>

      {/* Model Breakdown and Cost Analysis */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '24px' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h4 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' }}><Database size={16} className="text-cyan"/> LLM Model Usage Routing</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
             <div>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}><span>GPT-4o (Complex Tasks)</span> <span>65%</span></div>
               <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}><div style={{ width: '65%', height: '100%', background: 'var(--primary-color)', borderRadius: '4px' }}></div></div>
             </div>
             <div>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}><span>Claude 3.5 Sonnet (Coding/Logic)</span> <span>25%</span></div>
               <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}><div style={{ width: '25%', height: '100%', background: '#8b5cf6', borderRadius: '4px' }}></div></div>
             </div>
             <div>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}><span>Llama-3 (Fast Local Triage)</span> <span>10%</span></div>
               <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}><div style={{ width: '10%', height: '100%', background: '#ec4899', borderRadius: '4px' }}></div></div>
             </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <h4 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' }}><Activity size={16} className="text-cyan"/> API Error Diagnostics</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
             <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                <span className="text-secondary text-sm">Rate Limits Hit (HTTP 429)</span> <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>12 events</span>
             </li>
             <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                <span className="text-secondary text-sm">Timeout Failures (&gt;10s)</span> <span style={{ color: '#ef4444', fontWeight: 'bold' }}>3 events</span>
             </li>
             <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                <span className="text-secondary text-sm">Tool Execution Errors</span> <span style={{ color: '#ef4444', fontWeight: 'bold' }}>1 event</span>
             </li>
             <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-secondary text-sm">Total System Uptime</span> <span style={{ color: '#10b981', fontWeight: 'bold' }}>99.98%</span>
             </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function KnowledgeBaseView() {
  return (
    <div className="view-container">
      <div className="view-header mb-8" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 className="text-2xl font-bold mb-2">Knowledge Base</h2>
          <p className="text-secondary">Train your agents with custom datasets, URLs, and CRM data.</p>
        </div>
        <button className="btn-primary"><UploadCloud size={18} /> Upload Data</button>
      </div>

      <div className="glass-panel p-6">
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
              <th style={{ padding: '16px', color: 'var(--text-secondary)' }}>Source Name</th>
              <th style={{ padding: '16px', color: 'var(--text-secondary)' }}>Type</th>
              <th style={{ padding: '16px', color: 'var(--text-secondary)' }}>Size / Status</th>
              <th style={{ padding: '16px', color: 'var(--text-secondary)' }}>Date Added</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}><FileText size={18} className="text-cyan"/> Q4_Financial_Report.pdf</td>
              <td style={{ padding: '16px' }}>Document</td>
              <td style={{ padding: '16px' }}><span className="status-badge running bg-transparent">Embedded</span></td>
              <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>Oct 12, 2026</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}><Globe size={18} className="text-cyan"/> https://mybusiness.com/docs</td>
              <td style={{ padding: '16px' }}>Website Scrape</td>
              <td style={{ padding: '16px' }}><span className="status-badge running bg-transparent">842 Pages Syncing...</span></td>
              <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>Yesterday</td>
            </tr>
            <tr>
              <td style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}><Database size={18} className="text-cyan"/> HubSpot CRM</td>
              <td style={{ padding: '16px' }}>Integration</td>
              <td style={{ padding: '16px' }}><span className="status-badge running bg-transparent">Live Connection</span></td>
              <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>Oct 01, 2026</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function SettingsView() {
  return (
    <div className="view-container" style={{ maxWidth: '800px' }}>
      <div className="view-header mb-8">
        <h2 className="text-2xl font-bold mb-2">Settings</h2>
        <p className="text-secondary">Manage your account, API keys, and platform preferences.</p>
      </div>

      <div className="glass-panel" style={{ padding: '32px', marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}><Settings size={18} /> General Preferences</h3>
        
        <div style={{ display: 'grid', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Workspace Name</label>
            <input type="text" className="new-agent-input" style={{ minHeight: '48px', padding: '12px' }} defaultValue="My Company Workspace" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Default Agent Tone</label>
            <select className="new-agent-input" style={{ minHeight: '48px', padding: '12px' }}>
               <option>Professional & Corporate</option>
               <option>Friendly & Casual</option>
               <option>Direct & Concise</option>
            </select>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '32px' }}>
        <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}><Globe size={18} /> Provider API Keys</h3>
        <p className="text-secondary mb-4">Connect external LLMs if you don't want to use the default BizPilot cluster.</p>
        
        <div style={{ display: 'grid', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>OpenAI API Key</label>
            <input type="password" className="new-agent-input" style={{ minHeight: '48px', padding: '12px' }} defaultValue="sk-xxxx-xxxx-xxxx" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Anthropic API Key</label>
            <input type="password" className="new-agent-input" style={{ minHeight: '48px', padding: '12px' }} placeholder="Enter api key..." />
          </div>
          <button className="btn-primary mt-4" style={{ alignSelf: 'flex-start' }}><CheckCircle2 size={16}/> Save Keys</button>
        </div>
      </div>
    </div>
  );
}
