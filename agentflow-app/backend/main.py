import sys
import os
import json
import traceback
from pathlib import Path
import uvicorn
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Automatically load the .env if present
load_dotenv()

# We point to the local multi-agent-research-system-2 folder to import its actual crew logic
BASE_DIR = Path(__file__).resolve().parent.parent.parent
RESEARCH_DIR = BASE_DIR / "multi-agent-research-system-2"
if str(RESEARCH_DIR) not in sys.path:
    sys.path.append(str(RESEARCH_DIR))

# Directory where generated agent scripts + registry live
AGENTS_DIR = Path(__file__).resolve().parent / "generated_agents"
AGENTS_DIR.mkdir(exist_ok=True)
REGISTRY_FILE = AGENTS_DIR / "registry.json"


def _load_registry() -> list:
    if REGISTRY_FILE.exists():
        return json.loads(REGISTRY_FILE.read_text(encoding="utf-8"))
    return []


def _save_registry(data: list):
    REGISTRY_FILE.write_text(json.dumps(data, indent=2), encoding="utf-8")


app = FastAPI(title="AI Factory — AutoGen & CrewAI Agent Platform")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])


class ResearchRequest(BaseModel):
    business_context: str


class AgentCreateRequest(BaseModel):
    name: str
    prompt: str
    business_context: str = ""
    target_provider: str = "gemini"


# ---------------------------------------------------------------------------
# Helpers: detect LLM provider from keys
# ---------------------------------------------------------------------------
# ---------------------------------------------------------------------------
# Helpers: detect LLM provider from keys
# ---------------------------------------------------------------------------
def _detect_llm(pref: str = "groq"):
    """Returns (api_key, gemini_key, base_url, model_name, api_type, provider_label)"""
    groq_key = os.getenv("GROQ_API_KEY", "")
    gemini_key = os.getenv("GEMINI_API_KEY", "")
    openai_key = os.getenv("OPENAI_API_KEY", "")

    # Auto-fix for AIzasy keys in OPENAI_API_KEY slot
    if openai_key and openai_key.startswith("AIza"):
        gemini_key = openai_key
        openai_key = ""

    # Priority 1: Groq (Now default as per user request)
    if groq_key:
        return groq_key, "", "https://api.groq.com/openai/v1", "llama-3.3-70b-versatile", None, "Groq (Llama 3.3)"
    
    # Priority 2: Gemini
    elif gemini_key:
        return "", gemini_key, None, "gemini-1.5-flash", "google", "Google Gemini (1.5 Flash)"
    
    # Fallback: NVIDIA NIM
    elif openai_key and openai_key.startswith("nvapi-"):
        return openai_key, "", "https://integrate.api.nvidia.com/v1", "meta/llama-3.1-70b-instruct", None, "NVIDIA NIM"
    
    return "", "", None, "", None, "None"


# ---------------------------------------------------------------------------
# 1) Research endpoint (CrewAI)
# ---------------------------------------------------------------------------
@app.post("/api/research")
def run_market_research(req: ResearchRequest):
    api_key, gemini_key, base_url, model_name, api_type, provider = _detect_llm("groq")

    # Dynamic LLM generation to bypass python 3.14 crewai dependency issues
    if api_key or gemini_key:
        try:
            from openai import OpenAI
            client = OpenAI(api_key=api_key or gemini_key, base_url=base_url)
            
            resp = client.chat.completions.create(
                model=model_name,
                messages=[
                    {"role": "system", "content": "You are an elite Market Research Analyst team at a top-tier consulting firm. The user will provide a business outline. Generate a highly professional, comprehensive Strategic Advisory Report using Markdown with clear headers. Include 3 distinct sections: 1. Deep Market Outlook 2. Core Competitor Heatmap 3. Target User Persona Deep-Dive. Use bullet points and precise business language."},
                    {"role": "user", "content": f"Business Context: {req.business_context}"}
                ]
            )
            report = resp.choices[0].message.content.strip()
            return {"status": "success", "report": report}
        except Exception as e:
            traceback.print_exc()

    # Absolute Fallback
    return {
        "status": "simulated",
        "report": f"# Market Research \n\n*Note: Please add a valid API key to enable AI generation.*\n\nYou requested research on: **{req.business_context}**"
    }


# ---------------------------------------------------------------------------
# 2) Agent generation endpoint (AutoGen)
# ---------------------------------------------------------------------------
@app.post("/api/agents/generate")
def generate_agent(req: AgentCreateRequest):
    api_key, gemini_key, base_url, model_name, api_type, provider = _detect_llm(req.target_provider)

    if not api_key and not gemini_key:
        return {
            "status": "simulated",
            "agent_id": "auto-gen-simulated-123",
            "message": f"Successfully simulated creation of agent '{req.name}'. (No valid API Key found to run true AutoGen inference)."
        }

    # Build the config dictionary for this agent
    config_dict = {"model": model_name}
    if gemini_key:
        config_dict["api_key"] = gemini_key
        config_dict["api_type"] = api_type
    else:
        config_dict["api_key"] = api_key
    if base_url:
        config_dict["base_url"] = base_url

    llm_config = {"config_list": [config_dict]}
    safe_name = req.name.replace(" ", "_").replace("-", "_")

    try:
        # Generate the standalone deployable Python script
        script_content = f'''#!/usr/bin/env python3
"""
AutoGen Agent: {req.name}
Generated by AI Factory
Provider: {provider} | Model: {model_name}

Usage:
  1. pip install pyautogen google-generativeai google-cloud-aiplatform
  2. Set your API key as an environment variable
  3. Run: python {safe_name.lower()}_agent.py
"""
import os
import autogen

# ── LLM Configuration ─────────────────────────────────────────────────
# Replace with your own API key or set via environment variable
API_KEY = os.getenv("AGENT_API_KEY", "{gemini_key or api_key}")

llm_config = {{
    "config_list": [{{
        "model": "{model_name}",
        "api_key": API_KEY,
{f'        "api_type": "{api_type}",' if api_type else ""}
{f'        "base_url": "{base_url}",' if base_url else ""}
    }}],
    "cache_seed": None,  # Disable caching for fresh responses
}}

# ── Agent Definition ───────────────────────────────────────────────────
assistant = autogen.AssistantAgent(
    name="{safe_name}",
    system_message="""{req.prompt.replace('"', "'").replace(chr(10), " ")}""",
    llm_config=llm_config,
)

user_proxy = autogen.UserProxyAgent(
    name="customer",
    human_input_mode="ALWAYS",
    max_consecutive_auto_reply=10,
    code_execution_config=False,
)

# ── Run ────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print(f"\\n{'='*60}")
    print(f"  AI Factory Agent: {req.name}")
    print(f"  Model: {model_name} via {provider}")
    print(f"{'='*60}\\n")
    print("Type your messages below. Type 'exit' to quit.\\n")
    user_proxy.initiate_chat(assistant, message="Hello! How can I help you today?")
'''

        # Persist the script
        agent_filename = f"{safe_name.lower()}_agent.py"
        agent_filepath = AGENTS_DIR / agent_filename
        agent_filepath.write_text(script_content, encoding="utf-8")

        # Persist to registry
        agent_id = f"autogen-{safe_name.lower()}"
        registry = _load_registry()

        # Remove existing entry if re-generating same agent
        registry = [a for a in registry if a["agent_id"] != agent_id]
        registry.append({
            "agent_id": agent_id,
            "name": req.name,
            "prompt": req.prompt,
            "model": model_name,
            "provider": provider,
            "filename": agent_filename,
        })
        _save_registry(registry)

        # Generate dynamic workflow using the LLM
        dynamic_workflow = None
        try:
            from openai import OpenAI
            import json
            client = OpenAI(api_key=api_key or gemini_key, base_url=base_url)
            
            wf_response = client.chat.completions.create(
                model=model_name,
                messages=[
                    {"role": "system", "content": "You are a workflow architecture designer for React Flow. Return strictly a JSON object with 'nodes' and 'edges' arrays. Node format: {\"id\": \"...\", \"type\": \"customNode\", \"data\": {\"label\": \"...\", \"icon\": \"bot\" (valid: user, bot, cpu, database, server, file), \"sublabel\": \"...\"}, \"position\": {\"x\": int, \"y\": int}}. Edge format: {\"id\": \"...\", \"source\": \"...\", \"target\": \"...\", \"animated\": true}. Create 3-6 nodes flowing left to right (x: 100, 400, 700) that perfectly represent the requested agent architecture. OUTPUT RAW JSON ONLY, NO markdown blocks."},
                    {"role": "user", "content": f"Agent Name: {req.name}\\nRequirement: {req.prompt}"}
                ]
            )
            raw_text = wf_response.choices[0].message.content.strip()
            if raw_text.startswith("```"):
                raw_text = raw_text.split("\n", 1)[-1] if len(raw_text.split("\n")) == 1 else raw_text.split("\n", 1)[1].rsplit("\n", 1)[0]
            if raw_text.startswith("json"):
                raw_text = raw_text[4:].strip()
            dynamic_workflow = json.loads(raw_text)
            
            # basic validation
            if "nodes" not in dynamic_workflow or "edges" not in dynamic_workflow:
                raise ValueError("Missing nodes/edges")
        except Exception as e:
            print(f"Workflow generation fallback: {e}")
            dynamic_workflow = {
                "nodes": [
                    {"id": "1", "data": {"label": "Customer Chat", "icon": "user", "sublabel": "UserProxyAgent"}, "type": "customNode", "position": {"x": 100, "y": 200}},
                    {"id": "2", "data": {"label": req.name, "icon": "bot", "sublabel": "AssistantAgent"}, "type": "customNode", "position": {"x": 450, "y": 200}},
                    {"id": "3", "data": {"label": f"{model_name}", "icon": "cpu", "sublabel": f"{provider}"}, "type": "customNode", "position": {"x": 450, "y": 50}}
                ],
                "edges": [
                    {"id": "e1-2", "source": "1", "target": "2", "animated": True},
                    {"id": "e3-2", "source": "3", "target": "2", "animated": True, "style": {"strokeDasharray": "5,5"}}
                ]
            }

        return {
            "status": "success",
            "agent_id": agent_id,
            "message": f"AutoGen agent '{req.name}' compiled and saved!",
            "provider": provider,
            "model": model_name,
            "script_preview": script_content,
            "workflow": dynamic_workflow
        }
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


# ---------------------------------------------------------------------------
# 3) List all generated agents
# ---------------------------------------------------------------------------
@app.get("/api/agents")
def list_agents():
    return {"agents": _load_registry()}


# ---------------------------------------------------------------------------
# 4) Download a generated agent script
# ---------------------------------------------------------------------------
@app.get("/api/agents/{agent_id}/download")
def download_agent(agent_id: str):
    registry = _load_registry()
    entry = next((a for a in registry if a["agent_id"] == agent_id), None)
    if not entry:
        raise HTTPException(status_code=404, detail="Agent not found")
    filepath = AGENTS_DIR / entry["filename"]
    if not filepath.exists():
        raise HTTPException(status_code=404, detail="Agent script file not found")
    return FileResponse(
        path=str(filepath),
        filename=entry["filename"],
        media_type="text/x-python",
    )


# ---------------------------------------------------------------------------
# 5) Get agent script content (for preview)
# ---------------------------------------------------------------------------
@app.get("/api/agents/{agent_id}/script")
def get_agent_script(agent_id: str):
    registry = _load_registry()
    entry = next((a for a in registry if a["agent_id"] == agent_id), None)
    if not entry:
        raise HTTPException(status_code=404, detail="Agent not found")
    filepath = AGENTS_DIR / entry["filename"]
    if not filepath.exists():
        raise HTTPException(status_code=404, detail="Agent script file not found")
    return {
        "agent_id": agent_id,
        "name": entry["name"],
        "filename": entry["filename"],
        "script": filepath.read_text(encoding="utf-8"),
    }


# ---------------------------------------------------------------------------
# 6) Chat with a generated agent (live test sandbox)
# ---------------------------------------------------------------------------
@app.post("/api/agents/{agent_id}/chat")
async def chat_with_agent(agent_id: str, request: Request):
    data = await request.json()
    user_message = data.get("message", "Hello")

    try:
        # Look up original system prompt from registry
        registry = _load_registry()
        entry = next((a for a in registry if a["agent_id"] == agent_id), None)
        system_msg = entry["prompt"] if entry else "You are a helpful customer support agent."
        system_msg += "\n\n[CRITICAL INSTRUCTION: You are speaking verbally in a voice conversation. Keep your responses at a medium natural conversational length (around 2 to 4 sentences). DO NOT output markdown, bold text, bullet points, or emojis, as a machine will be reading this text out loud.]"
        pref = "groq" if (entry and "Groq" in entry.get("provider", "")) else "gemini"

        api_key, gemini_key, base_url, model_name, api_type, provider = _detect_llm(pref)

        from openai import OpenAI
        client = OpenAI(api_key=api_key or gemini_key, base_url=base_url)

        response = client.chat.completions.create(
            model=model_name,
            messages=[
                {"role": "system", "content": system_msg},
                {"role": "user", "content": user_message}
            ]
        )
        
        reply_str = response.choices[0].message.content
        return {"status": "success", "reply": reply_str, "provider": provider, "model": model_name}

    except Exception as e:
        traceback.print_exc()
        error_msg = str(e)
        if "429" in error_msg or "RESOURCE_EXHAUSTED" in error_msg:
            return {"status": "rate_limited", "reply": "⏳ Gemini free-tier rate limit hit (5 req/min). Wait 60 seconds and try again."}
        raise HTTPException(status_code=500, detail=error_msg)


# ---------------------------------------------------------------------------
# 7) Health / info endpoint
# ---------------------------------------------------------------------------
@app.get("/api/health")
def health():
    _, _, _, model_name, _, provider = _detect_llm("gemini")
    return {
        "status": "ok",
        "provider": provider,
        "model": model_name,
        "agents_count": len(_load_registry()),
    }


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
