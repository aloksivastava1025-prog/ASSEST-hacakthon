"""
AutoGen Multi-Agent Research System
------------------------------------
Uses Groq (free, fast) or Gemini as LLM backend.

Usage:
    python run_autogen.py
    python run_autogen.py --topic "AI agents in 2025"
    python run_autogen.py --provider gemini --api-key YOUR_GEMINI_KEY
"""

import asyncio
import argparse
import os
import sys

from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.teams import RoundRobinGroupChat
from autogen_agentchat.conditions import TextMentionTermination, MaxMessageTermination
from autogen_agentchat.ui import Console
from autogen_ext.models.openai import OpenAIChatCompletionClient


# ── LLM Provider configs ────────────────────────────────────────────────
PROVIDERS = {
    "groq": {
        "base_url": "https://api.groq.com/openai/v1",
        "model": "llama-3.3-70b-versatile",
        "api_key_env": "GROQ_API_KEY",
        "default_key": os.getenv("GROQ_API_KEY", ""),
    },
    "gemini": {
        "base_url": "https://generativelanguage.googleapis.com/v1beta/openai/",
        "model": "gemini-2.0-flash",
        "api_key_env": "GEMINI_API_KEY",
        "default_key": None,
    },
}


def build_client(provider: str, api_key: str | None = None) -> OpenAIChatCompletionClient:
    """Build an OpenAI-compatible LLM client for the chosen provider."""
    cfg = PROVIDERS[provider]
    key = api_key or os.getenv(cfg["api_key_env"]) or cfg.get("default_key")
    if not key:
        print(f"❌ No API key for {provider}. Set {cfg['api_key_env']} or pass --api-key")
        sys.exit(1)

    print(f"🤖 Using {provider.upper()} → model: {cfg['model']}")
    return OpenAIChatCompletionClient(
        model=cfg["model"],
        base_url=cfg["base_url"],
        api_key=key,
        model_info={
            "vision": False,
            "function_calling": True,
            "json_output": True,
            "family": "unknown",
            "structured_output": True,
        },
    )


async def run_research(topic: str, provider: str, api_key: str | None = None):
    """Run the multi-agent research pipeline."""
    client = build_client(provider, api_key)

    # ── Agent 1: Research Planner ────────────────────────────────────────
    planner = AssistantAgent(
        name="ResearchPlanner",
        model_client=client,
        system_message="""You are a Research Planner. When given a topic:
1. Break it into 3-4 key research questions
2. For each question, suggest what kind of information to look for
3. Prioritize the most important aspects
4. Output a clear research plan

Keep your response concise and structured. Use bullet points.""",
        description="Plans and structures the research approach for a given topic.",
    )

    # ── Agent 2: Research Analyst ────────────────────────────────────────
    analyst = AssistantAgent(
        name="ResearchAnalyst",
        model_client=client,
        system_message="""You are a Research Analyst. Based on the research plan provided:
1. Analyze each research question deeply
2. Provide key findings, facts, and insights for each area
3. Include relevant statistics, trends, and expert opinions where possible
4. Cite your reasoning and note any areas of uncertainty

Be thorough but concise. Focus on accuracy and depth.""",
        description="Analyzes research questions and provides detailed findings.",
    )

    # ── Agent 3: Report Writer ───────────────────────────────────────────
    writer = AssistantAgent(
        name="ReportWriter",
        model_client=client,
        system_message="""You are a Report Writer. Based on the analysis provided:
1. Write a well-structured research report in Markdown format
2. Include: Executive Summary, Key Findings, Detailed Analysis, and Conclusion
3. Use clear headings, bullet points, and tables where appropriate
4. End with 'TERMINATE' after the report is complete

Make the report professional and easy to read.""",
        description="Writes the final structured research report.",
    )

    # ── Team: Round-Robin Group Chat ─────────────────────────────────────
    termination = TextMentionTermination("TERMINATE") | MaxMessageTermination(10)

    team = RoundRobinGroupChat(
        participants=[planner, analyst, writer],
        termination_condition=termination,
    )

    # ── Execute ──────────────────────────────────────────────────────────
    print(f"\n{'='*70}")
    print(f"📚 RESEARCH TOPIC: {topic}")
    print(f"{'='*70}\n")

    stream = team.run_stream(task=f"Research this topic thoroughly: {topic}")
    result = await Console(stream)

    # Save report
    report_text = ""
    for msg in result.messages:
        if hasattr(msg, 'content') and isinstance(msg.content, str):
            report_text = msg.content  # Get last message content

    output_file = "research_report.md"
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(f"# Research Report: {topic}\n\n")
        f.write(report_text.replace("TERMINATE", "").strip())
    print(f"\n✅ Report saved to: {os.path.abspath(output_file)}")

    await client.close()


def main():
    parser = argparse.ArgumentParser(description="AutoGen Multi-Agent Research System")
    parser.add_argument("--topic", type=str, default=None, help="Research topic")
    parser.add_argument(
        "--provider",
        type=str,
        default="groq",
        choices=["groq", "gemini"],
        help="LLM provider (default: groq)",
    )
    parser.add_argument("--api-key", type=str, default=None, help="API key override")
    args = parser.parse_args()

    topic = args.topic
    if not topic:
        topic = input("\n🔍 Enter research topic: ").strip()
    if not topic:
        print("No topic provided. Exiting.")
        sys.exit(1)

    asyncio.run(run_research(topic, args.provider, args.api_key))


if __name__ == "__main__":
    main()
