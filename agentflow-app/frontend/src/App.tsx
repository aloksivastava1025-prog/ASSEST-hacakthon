import { useState } from 'react';
import LandingPage from './components/LandingPage';
import Onboarding from './components/Onboarding';
import CrewAIReport from './components/CrewAIReport';
import AgentBuilder from './components/AgentBuilder';
import WorkflowVisualizer from './components/WorkflowVisualizer';
import AgentChat from './components/AgentChat';
import Dashboard from './components/Dashboard';
import type { ProviderInfo, WorkflowGraph } from './types';

export default function App() {
  // 0: Landing → 1: Onboarding → 2: Report → 3: Agent Builder → 4: Workflow → 5: Chat → 6: Dashboard
  const [step, setStep] = useState<number>(0);
  const [businessContext, setBusinessContext] = useState('');
  const [researchReport, setResearchReport] = useState('');
  const [agentId, setAgentId] = useState('');
  const [agentName, setAgentName] = useState('');
  const [agentScript, setAgentScript] = useState('');
  const [providerInfo, setProviderInfo] = useState<ProviderInfo>({ provider: '', model: '' });
  const [workflowGraph, setWorkflowGraph] = useState<WorkflowGraph | null>(null);
  const [initialIdea, setInitialIdea] = useState<string>('');

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {step === 0 && <LandingPage onGetStarted={(idea) => { if(idea) setInitialIdea(idea); setStep(1); }} onOpenDashboard={() => setStep(6)} />}
      
      {step === 1 && (
        <Onboarding
          initialIdea={initialIdea}
          onComplete={(context, report) => {
            setBusinessContext(context);
            setResearchReport(report);
            setStep(2);
          }}
          onSkip={() => {
            setBusinessContext('Direct build mode: no onboarding context was provided.');
            setStep(3);
          }}
        />
      )}
      
      {step === 2 && (
        <CrewAIReport 
          report={researchReport} 
          onContinue={() => setStep(3)} 
        />
      )}
      
      {step === 3 && (
        <AgentBuilder
          businessContext={businessContext}
          onComplete={(id, name, workflow, script, provider, model) => {
            setAgentId(id);
            setAgentName(name);
            setWorkflowGraph(workflow);
            setAgentScript(script);
            setProviderInfo({ provider, model });
            setStep(4);
          }}
        />
      )}
      
      {step === 4 && workflowGraph && (
        <WorkflowVisualizer
          agentName={agentName}
          agentScript={agentScript}
          providerInfo={providerInfo}
          onContinue={() => setStep(5)}
        />
      )}
      
      {step === 5 && (
        <AgentChat
          agentId={agentId}
          agentName={agentName}
          providerInfo={providerInfo}
          onBack={() => setStep(6)} // Going back from chat should go to dashboard now if it's deployed! But let's leave it as 4 or 6. We can use setStep(6) to return to dashboard.
          onNewAgent={() => setStep(3)}
          onDeploy={() => setStep(6)}
        />
      )}

      {step === 6 && (
        <Dashboard
          onBack={() => setStep(0)} // Back from dashboard goes to landing
          onNew={() => setStep(3)}
          onOpenAgent={(id, name, prompt, provider, model) => {
            setAgentId(id);
            setAgentName(name);
            setProviderInfo({ provider: provider || 'groq', model: model || 'llama-3.3-70b-versatile' });
            setStep(5); // Jump straight to chat
          }}
        />
      )}
    </div>
  );
}
