import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  Activity, 
  Settings, 
  LogOut, 
  Play, 
  Pause, 
  MessageSquare,
  Globe,
  Database,
  Plus,
  Target,
  TrendingUp,
  Lightbulb,
  Building2
} from 'lucide-react';
import './Dashboard.css';
import NewAgentModal from './NewAgentModal';
import InsightModal from './InsightModal';
import { AgentsView, AnalyticsView, KnowledgeBaseView, SettingsView } from './DashboardViews';

export default function Dashboard({ prompt, businessData, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [agentStatus, setAgentStatus] = useState('running');
  const [activePrompt, setActivePrompt] = useState(prompt || '');
  const [isNewAgentModalOpen, setIsNewAgentModalOpen] = useState(false);
  const [activeInsight, setActiveInsight] = useState(null);

  // Derive a fake agent title based on the activePrompt
  const agentTitle = activePrompt 
    ? (activePrompt.length > 30 ? activePrompt.substring(0, 30) + '...' : activePrompt) 
    : "Social Media Optimizer";

  const toggleStatus = () => {
    setAgentStatus(prev => prev === 'running' ? 'paused' : 'running');
  };

  const handleCreateAgent = (newPrompt) => {
    setActivePrompt(newPrompt);
    setIsNewAgentModalOpen(false);
    setAgentStatus('running');
    setActiveTab('overview');
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'agents', label: 'My Agents', icon: Bot },
    { id: 'analytics', label: 'Analytics', icon: Activity },
    { id: 'knowledge', label: 'Knowledge Base', icon: Database },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo text-cyan">
            <Bot size={24} /> BizPilot
          </div>
        </div>
        
        <nav className="sidebar-nav">
          {navItems.map(item => (
             <button 
               key={item.id} 
               className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
               onClick={() => setActiveTab(item.id)}
             >
               <item.icon size={18} />
               <span>{item.label}</span>
             </button>
          ))}
        </nav>

        <div className="sidebar-footer" style={{ marginTop: 'auto' }}>
          <button className="nav-item w-full" onClick={onLogout}>
            <LogOut size={18} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {activeTab === 'overview' && (
          <>
            <header className="dashboard-header">
              <h2>Welcome back, Creator 👋</h2>
              <button className="btn-primary" onClick={() => setIsNewAgentModalOpen(true)}>
                <Plus size={18} /> New Agent
              </button>
            </header>

            <div className="dashboard-content">
              {/* Active Agent Card */}
              <div className="agent-showcase glass-panel">
                <div className="agent-header">
                  <div className="agent-info">
                    <h3>{agentTitle}</h3>
                    <span className={`status-badge ${agentStatus}`}>
                      <span className="status-dot"></span>
                      {agentStatus === 'running' ? 'Active' : 'Paused'}
                    </span>
                  </div>
                  <button 
                    className={`btn-secondary ${agentStatus === 'running' ? 'pause-btn' : 'play-btn'}`}
                    onClick={toggleStatus}
                  >
                    {agentStatus === 'running' ? <Pause size={16} /> : <Play size={16} />}
                    {agentStatus === 'running' ? 'Pause Agent' : 'Start Agent'}
                  </button>
                </div>
                
                <p className="agent-desc text-secondary">
                  "{activePrompt || 'Automatically posting content across all social media platforms daily.'}"
                </p>

                <div className="agent-stats">
                  <div className="stat-box">
                    <span className="stat-label">Tasks Completed</span>
                    <span className="stat-value">1,492</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-label">Success Rate</span>
                    <span className="stat-value text-cyan">99.8%</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-label">Time Saved</span>
                    <span className="stat-value">45h</span>
                  </div>
                </div>
              </div>

              {/* Business Intelligence Section */}
              {businessData && (
                <div className="business-intelligence glass-panel">
                  <div className="panel-header">
                    <h4><Building2 size={18} /> Market Intelligence & Advisory</h4>
                    <div className="intelligence-badge">Based on {businessData.businessName || 'Business Profile'}</div>
                  </div>
                  <div className="intelligence-grid">
                    <div className="insight-card clickable" onClick={() => setActiveInsight('market')}>
                      <h5><TrendingUp size={16} className="text-cyan"/> Market Analysis</h5>
                      <p className="text-secondary mt-2">
                        Operating in the <strong>{businessData.industry || 'Tech'}</strong> sector using a <strong>{businessData.businessType || 'B2B'}</strong> model. 
                        We've detected a shift toward multi-touchpoint sales cadences...
                      </p>
                      <span className="click-hint">Click to expand</span>
                    </div>
                    <div className="insight-card clickable" onClick={() => setActiveInsight('audience')}>
                      <h5><Target size={16} className="text-cyan"/> Audience Research</h5>
                      <p className="text-secondary mt-2 truncate-text">
                        "{businessData.targetAudience || 'Broad consumer base'}"
                      </p>
                      <div className="tags mt-3">
                        <span className="tag">High-Intent</span>
                        <span className="tag">Mobile-First</span>
                      </div>
                      <span className="click-hint">Click to expand</span>
                    </div>
                    <div className="insight-card highlight clickable" onClick={() => setActiveInsight('advisory')}>
                      <h5><Lightbulb size={16} className="text-cyan"/> Strategic Advisory</h5>
                      <p className="text-secondary mt-2">
                        Scale top-of-funnel authority content. Prioritize automated lead nurturing over direct cold pitching to lower CAC...
                      </p>
                      <span className="click-hint" style={{ marginTop: 'auto' }}>Click to expand</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Grid */}
              <div className="dashboard-grid">
                {/* Live Logs Array */}
                <div className="glass-panel logs-panel">
                  <div className="panel-header">
                    <h4><Activity size={16} /> Live Execution Logs</h4>
                  </div>
                  <div className="logs-container">
                    <div className="log-entry">
                      <span className="log-time">10:42 AM</span>
                      <span className="log-msg">Generated 3 variants for LinkedIn post...</span>
                    </div>
                    <div className="log-entry success">
                      <span className="log-time">10:45 AM</span>
                      <span className="log-msg">Successfully published to LinkedIn.</span>
                    </div>
                    <div className="log-entry">
                      <span className="log-time">11:00 AM</span>
                      <span className="log-msg">Scanning news RSS for trending topics...</span>
                    </div>
                    <div className="log-entry pending">
                      <span className="log-time">11:05 AM</span>
                      <span className="log-msg">Synthesizing topic cluster: 'AI in Design'</span>
                    </div>
                  </div>
                </div>

                {/* Integrations */}
                <div className="glass-panel integrations-panel">
                  <div className="panel-header">
                    <h4><Globe size={16} /> Active Integrations</h4>
                  </div>
                  <div className="integration-list">
                    <div className="integration-item">
                      <div className="int-icon linkedin">in</div>
                      <div className="int-details">
                        <span className="int-name">LinkedIn</span>
                        <span className="int-status text-cyan">Connected</span>
                      </div>
                    </div>
                    <div className="integration-item">
                      <div className="int-icon twitter">X</div>
                      <div className="int-details">
                        <span className="int-name">X (Twitter)</span>
                        <span className="int-status text-cyan">Connected</span>
                      </div>
                    </div>
                    <div className="integration-item">
                      <div className="int-icon slack"><MessageSquare size={14} /></div>
                      <div className="int-details">
                        <span className="int-name">Slack Approvals</span>
                        <span className="int-status pending">Pending Auth</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="dashboard-content">
          {activeTab === 'agents' && <AgentsView agentTitle={agentTitle} agentStatus={agentStatus} activePrompt={activePrompt} toggleStatus={toggleStatus} onNewAgent={() => setIsNewAgentModalOpen(true)} />}
          {activeTab === 'analytics' && <AnalyticsView />}
          {activeTab === 'knowledge' && <KnowledgeBaseView />}
          {activeTab === 'settings' && <SettingsView />}
        </div>
      </main>

      {isNewAgentModalOpen && (
        <NewAgentModal 
          onClose={() => setIsNewAgentModalOpen(false)}
          onSubmit={handleCreateAgent}
        />
      )}

      <InsightModal 
        insightType={activeInsight} 
        businessData={businessData} 
        onClose={() => setActiveInsight(null)} 
      />
    </div>
  );
}
