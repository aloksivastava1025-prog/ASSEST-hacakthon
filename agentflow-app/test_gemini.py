import os
import json
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI

# Load .env
load_dotenv(Path(__file__).parent / "backend" / ".env")

def test_inference():
    gemini_key = os.getenv("GEMINI_API_KEY", "")
    if not gemini_key:
        print("❌ No GEMINI_API_KEY found")
        return

    # Mock the detection logic
    model_name = "models/gemini-1.5-flash"
    actual_base_url = "https://generativelanguage.googleapis.com/v1beta/openai/"

    try:
        client = OpenAI(api_key=gemini_key, base_url=actual_base_url)
        print(f"Testing Gemini 1.5 Flash at {actual_base_url}...")
        
        response = client.chat.completions.create(
            model=model_name,
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "Hello, are you there?"}
            ]
        )
        print("✅ Response received:")
        print(response.choices[0].message.content)
    except Exception as e:
        print(f"❌ Inference Failed: {e}")

if __name__ == "__main__":
    test_inference()
