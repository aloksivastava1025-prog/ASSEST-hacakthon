import os
from dotenv import load_dotenv
from google import genai

load_dotenv()
api_key = os.environ.get("OPENAI_API_KEY")
print(f"Key starts with AIza? {api_key.startswith('AIza') if api_key else False}")
client = genai.Client(api_key=api_key)
try:
    resp = client.models.generate_content(model='gemini-1.5-flash', contents='hello')
    print("Success:", resp.text)
except Exception as e:
    print("Error:", repr(e))
