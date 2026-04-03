import { useEffect, useState } from 'react';
import {
  LayoutDashboard, Bot, Sparkles, Activity, FileText,
  Settings, LogOut, Search, Bell, SearchCode,
  ChevronRight, MoreHorizontal,
  Plus
} from 'lucide-react';

interface Agent {
  agent_id: string;
  name: string;
  prompt: string;
  model: string;
  provider: string;
  filename: string;
}

interface DashboardProps {
  onBack: () => void;
  onNew: () => void;
  onOpenAgent: (id: string, name: string, prompt: string, provider: string, model: string) => void;
}

export default function Dashboard({ onBack, onNew, onOpenAgent }: DashboardProps) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Quick Create Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPrompt, setNewPrompt] = useState('');
  const [newProvider, setNewProvider] = useState('groq');
  const [isCompiling, setIsCompiling] = useState(false);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = () => {
    setIsLoading(true);
    fetch('/api/agents')
      .then(res => res.json())
      .then(data => {
        setAgents(data.agents || []);
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  };

  const handleQuickCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPrompt.trim()) return;

    setIsCompiling(true);
    try {
      const response = await fetch('/api/agents/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName,
          prompt: newPrompt,
          business_context: "Direct deployment via Dashboard Quick-Start.",
          target_provider: newProvider,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Compilation failed');

      // Refresh the table with the new agent
      await fetchAgents();

      // Close and reset
      setIsCreateModalOpen(false);
      setNewName('');
      setNewPrompt('');

    } catch (err) {
      console.error(err);
      alert('Failed to deploy agent. Check console for logs.');
    } finally {
      setIsCompiling(false);
    }
  };

  return (
    <div className="h-screen bg-[#050505] flex font-sans text-white overflow-hidden selection:bg-white/20">
      {/* Background Atmosphere - Solid Dark No Gradient No Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 z-0 pointer-events-none"
        style={{ backgroundImage: "url('https://framerusercontent.com/images/EqTvMX987cRyoYGTSVcaTDhwgWM.jpg')" }}
      />
      <div className="absolute inset-0 bg-[#050505]/95 z-0 pointer-events-none" />

      {/* --- Sidebar --- */}
      <aside className="w-[260px] border-r border-[#1a1a1a] bg-[#050505] hidden md:flex flex-col relative z-10 transition-all">
        {/* Logo */}
        <div className="h-20 flex items-center px-8 border-b border-[#1a1a1a] shrink-0">
          <button onClick={onBack} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-white flex items-center justify-center">
              <Bot size={18} className="text-black" />
            </div>
            <span className="font-serif text-lg tracking-tight uppercase">AgentFlow</span>
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-8 px-4 space-y-8">
          <div>
            <div className="text-[10px] font-mono tracking-widest text-[#666666] uppercase px-4 mb-4">General</div>
            <nav className="space-y-1">
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#111111] text-white font-medium border border-[#333333]">
                <LayoutDashboard size={18} className="text-white" />
                <span className="text-[13px] uppercase tracking-wider">Dashboard</span>
              </button>
              <button onClick={() => setIsCreateModalOpen(true)} className="w-full flex items-center justify-between px-4 py-3 text-[#aaaaaa] hover:bg-[#111111] hover:text-white transition-none group">
                <div className="flex items-center gap-3">
                  <Bot size={18} className="group-hover:text-white transition-none" />
                  <span className="text-[13px] uppercase tracking-wider">Agents</span>
                </div>
                <div className="px-2 py-0.5 bg-[#1a1a1a] text-[10px] border border-[#333333] font-mono">{agents.length}</div>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-[#aaaaaa] hover:bg-[#111111] hover:text-white transition-none">
                <Sparkles size={18} />
                <span className="text-[13px] uppercase tracking-wider">Workflows</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-[#aaaaaa] hover:bg-[#111111] hover:text-white transition-none">
                <Activity size={18} />
                <span className="text-[13px] uppercase tracking-wider">Inference Logs</span>
              </button>
            </nav>
          </div>

          <div>
            <div className="text-[10px] font-mono tracking-widest text-[#666666] uppercase px-4 mb-4">Tools</div>
            <nav className="space-y-1">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-[#aaaaaa] hover:bg-[#111111] hover:text-white transition-none">
                <SearchCode size={18} />
                <span className="text-[13px] uppercase tracking-wider">Analytics</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-[#aaaaaa] hover:bg-[#111111] hover:text-white transition-none">
                <FileText size={18} />
                <span className="text-[13px] uppercase tracking-wider">Documentation</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Profile Bottom */}
        <div className="p-4 border-t border-[#1a1a1a] shrink-0">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-[#aaaaaa] hover:bg-[#111111] hover:text-white transition-none mb-1">
            <Settings size={18} />
            <span className="text-[13px] uppercase tracking-wider">Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-[#aa4444] hover:bg-[#111111] hover:text-red-400 transition-none">
            <LogOut size={18} />
            <span className="text-[13px] uppercase tracking-wider">Log out</span>
          </button>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 flex flex-col relative z-10 w-full overflow-hidden bg-[#050505]">
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-8 border-b border-[#1a1a1a] shrink-0">
          <div className="flex items-center gap-3 text-[13px] text-[#666666] uppercase tracking-wider font-mono">
            <LayoutDashboard size={14} />
            <ChevronRight size={14} />
            <span className="text-white">Dashboard</span>
          </div>

          <div className="flex items-center gap-5">
            <div className="relative hidden md:block">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666666]" />
              <input
                type="text"
                placeholder="Search..."
                className="w-64 bg-[#0a0a0a] border border-[#333333] py-2 pl-10 pr-4 text-[13px] outline-none focus:border-white transition-none text-white font-mono uppercase placeholder:text-[#666666]"
              />
            </div>
            <button className="relative w-9 h-9 border border-[#333333] bg-[#0a0a0a] flex items-center justify-center hover:bg-[#111111] transition-none text-[#aaaaaa] hover:text-white">
              <Bell size={18} />
              <div className="absolute top-2 right-2 w-2 h-2 bg-white" />
            </button>
            <div className="w-9 h-9 bg-white flex items-center justify-center">
              <span className="text-[12px] font-bold text-black font-mono">CM</span>
            </div>
          </div>
        </header>

        {/* Scrollable Dashboard Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 scroll-pane">
          <div className="max-w-[1400px] mx-auto space-y-8">

            {/* Promo Banner - Flat Strict UI */}
            <div className="bg-[#0f0f0f] border border-[#333333] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-[#cccccc] mb-2 font-mono">
                  <Sparkles size={16} />
                  <span className="text-[12px] uppercase tracking-widest">Premium Allocation</span>
                </div>
                <h2 className="text-xl md:text-2xl font-serif text-white uppercase tracking-wider">Execute high-frequency inference logic streams</h2>
              </div>
              <button className="whitespace-nowrap bg-white text-black px-8 py-3 border border-white font-mono text-[13px] hover:bg-[#050505] hover:text-white transition-none uppercase tracking-widest">
                Upgrade Access
              </button>
            </div>

            {/* Real Network Status (Replaces all Fake KPI Data) */}
            <div>
              <div className="flex items-center justify-between mb-5 border-b border-[#1a1a1a] pb-4">
                <h3 className="text-lg font-serif uppercase tracking-widest">Network Status</h3>
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-2 border border-[#333333] bg-[#0a0a0a] px-4 py-2 text-[12px] hover:bg-[#111111] transition-none font-mono uppercase tracking-wider text-white">
                    <Plus size={14} /> Initialize Agent
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="bg-[#080808] border border-[#222222] p-6 hover:border-[#444444] transition-none">
                  <div className="flex items-center justify-between text-[#888888] mb-4 font-mono uppercase text-[10px] tracking-widest">
                     <span>Total Deployed Nodes</span>
                     <Bot size={14} />
                  </div>
                  <div className="text-3xl font-serif tracking-tight text-white mb-2">{isLoading ? '-' : agents.length}</div>
                </div>

                <div className="bg-[#080808] border border-[#222222] p-6 hover:border-[#444444] transition-none">
                  <div className="flex items-center justify-between text-[#888888] mb-4 font-mono uppercase text-[10px] tracking-widest">
                     <span>Compute Providers</span>
                     <Activity size={14} />
                  </div>
                  <div className="text-3xl font-serif tracking-tight text-white mb-2">{isLoading ? '-' : new Set(agents.map(a => a.provider)).size}</div>
                </div>

                <div className="bg-[#080808] border border-[#222222] p-6 hover:border-[#444444] transition-none">
                  <div className="flex items-center justify-between text-[#888888] mb-4 font-mono uppercase text-[10px] tracking-widest">
                     <span>System State</span>
                     <Activity size={14} />
                  </div>
                  <div className="text-3xl font-serif tracking-tight text-[#ffffff] mb-2 font-mono flex items-center gap-3">
                    <div className="w-3 h-3 bg-white" />
                    ONLINE
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Agents Table */}
            <div>
              <div className="flex items-center justify-between mb-5 border-b border-[#1a1a1a] pb-4">
                <h3 className="text-lg font-serif uppercase tracking-widest">System Index</h3>
              </div>

              <div className="bg-[#080808] border border-[#222222]">
                <div className="flex items-center gap-8 border-b border-[#222222] px-8 pt-6 pb-0">
                  <div className="text-[12px] font-mono uppercase tracking-widest bg-white text-black px-4 py-2">All Agents</div>
                  <div className="text-[12px] font-mono uppercase tracking-widest text-[#666666] px-4 py-2 hover:text-white cursor-pointer">Running</div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#222222] text-[10px] text-[#666666] uppercase tracking-[0.2em] font-mono bg-[#050505]">
                        <th className="px-8 py-4 font-normal">Identifier</th>
                        <th className="px-6 py-4 font-normal">Created</th>
                        <th className="px-6 py-4 font-normal">Compute</th>
                        <th className="px-6 py-4 font-normal">Directive</th>
                        <th className="px-6 py-4 font-normal">State</th>
                        <th className="px-8 py-4 font-normal text-right">Sys</th>
                      </tr>
                    </thead>
                    <tbody className="text-[13px] font-mono divide-y divide-[#222222]">
                      {isLoading ? (
                        <tr><td colSpan={6} className="text-center py-12 text-[#666666] uppercase tracking-widest">Allocating...</td></tr>
                      ) : agents.length === 0 ? (
                        <tr><td colSpan={6} className="text-center py-12 text-[#666666] uppercase tracking-widest">Index empty. Initialize node.</td></tr>
                      ) : agents.map((agent, i) => (
                        <tr
                          key={i}
                          className="hover:bg-[#111111] transition-none group cursor-pointer"
                          onClick={() => onOpenAgent(agent.agent_id, agent.name, agent.prompt, agent.provider, agent.model)}
                        >
                          <td className="px-8 py-4">
                            <span className="font-bold uppercase tracking-wider text-white">{agent.name}</span>
                          </td>
                          <td className="px-6 py-4 text-[#888888] text-[11px] uppercase">{agent.agent_id.split("-")[1] || 'Today'}</td>
                          <td className="px-6 py-4 text-[#888888] text-[11px] uppercase">{agent.provider || agent.model}</td>
                          <td className="px-6 py-4 text-[#888888] text-[11px] truncate max-w-[200px]" title={agent.prompt}>{agent.prompt}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-white" />
                              <span className="text-[10px] uppercase tracking-widest text-white">UP</span>
                            </div>
                          </td>
                          <td className="px-8 py-4 text-right opacity-0 group-hover:opacity-100 transition-none">
                            <button className="text-white hover:text-[#cccccc]">
                              <MoreHorizontal size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Quick Create Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]/95 backdrop-blur-sm p-6 overflow-y-auto">
          <div className="bg-[#080808] border border-[#333333] w-full max-w-2xl mt-auto mb-auto relative shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="border-b border-[#222222] p-6 flex justify-between items-center">
              <div className="flex items-center gap-3 text-white font-mono uppercase tracking-widest text-[13px]">
                <Bot size={16} /> Quick Deploy Agent
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-[#666666] hover:text-white font-mono text-[20px] leading-none"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleQuickCreate} className="p-8 pb-10 space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-mono tracking-widest uppercase text-[#888888]">Agent Designation Name</label>
                <input
                  type="text"
                  autoFocus
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g. Sales_Executive_Bot"
                  className="w-full bg-[#111111] border border-[#333333] p-4 text-white font-mono text-[14px] outline-none focus:border-white transition-none placeholder:text-[#444444]"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-mono tracking-widest uppercase text-[#888888]">System Prompt / Primary Directive</label>
                <textarea
                  required
                  value={newPrompt}
                  onChange={e => setNewPrompt(e.target.value)}
                  placeholder="Define exactly what this agent should do. Keep it highly specific."
                  className="w-full h-32 bg-[#111111] border border-[#333333] p-4 text-white font-mono text-[14px] outline-none focus:border-white transition-none placeholder:text-[#444444] resize-none"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-mono tracking-widest uppercase text-[#888888]">Compute Provider</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setNewProvider('groq')}
                    className={`flex-1 p-4 border font-mono uppercase tracking-widest text-[11px] transition-none ${newProvider === 'groq' ? 'bg-white text-black border-white' : 'bg-[#111111] text-[#888888] border-[#333333] hover:border-[#666666]'}`}
                  >
                    Groq Engine
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewProvider('openai')}
                    className={`flex-1 p-4 border font-mono uppercase tracking-widest text-[11px] transition-none ${newProvider === 'openai' ? 'bg-white text-black border-white' : 'bg-[#111111] text-[#888888] border-[#333333] hover:border-[#666666]'}`}
                  >
                    OpenAI Engine
                  </button>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-6 py-3 border border-[#333333] text-[#888888] hover:text-white hover:bg-[#111111] font-mono uppercase tracking-widest text-[11px] transition-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCompiling}
                  className="px-8 py-3 bg-white text-black border border-white hover:bg-[#cccccc] hover:border-[#cccccc] disabled:opacity-50 disabled:cursor-not-allowed font-mono uppercase tracking-widest text-[11px] flex items-center gap-2 transition-none"
                >
                  {isCompiling ? (
                    <><Activity size={14} className="animate-spin" /> Compiling...</>
                  ) : 'Initialize Deployment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
