export interface ProviderInfo {
  provider: string;
  model: string;
}

export interface WorkflowNodeData {
  label: string;
  sublabel?: string;
  icon?: string;
}

export interface WorkflowNode {
  id: string;
  kind?: 'input' | 'hub' | 'provider' | 'context' | 'agent' | 'output';
  data: WorkflowNodeData;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
  style?: Record<string, string | number>;
}

export interface WorkflowGraph {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}
