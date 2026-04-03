import os
from dotenv import load_dotenv
import traceback
import autogen

load_dotenv()
api_key = os.environ.get("OPENAI_API_KEY", "")
if api_key.startswith("AIza"):
    gemini_key = api_key
else:
    gemini_key = ""

model_name = "gemini-2.5-flash"
api_type = "google"

config_dict = {"model": model_name, "api_key": gemini_key, "api_type": api_type}
llm_config = {"config_list": [config_dict]}

try:
    custom_agent = autogen.AssistantAgent(
        name="test_agent",
        system_message="You are a helpful customer support agent.",
        llm_config=llm_config,
    )
    user_proxy = autogen.UserProxyAgent(name="user", max_consecutive_auto_reply=1, code_execution_config=False)
    print("Agent created successfully.")
    try:
        user_proxy.initiate_chat(custom_agent, message="Hello")
    except Exception as e:
        print("Chat failed:", type(e), str(e))
        traceback.print_exc()
except Exception as e:
    print("Generation failed:", type(e), str(e))
    traceback.print_exc()
