# https://python.langchain.com/v0.2/docs/tutorials/chatbot/#quickstart

import os
from dotenv import load_dotenv
import asyncio

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.messages import HumanMessage
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import SystemMessage, trim_messages


from fastapi.responses import StreamingResponse
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

class Human_Message(BaseModel):
    userInput: str

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust to your frontend's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv(dotenv_path='./.env')

if os.getenv("OPENAI_API_KEY") is None or os.getenv("OPENAI_API_KEY") == "":
  print("OPENAI_API_KEY is not included, add key to your .env ")
  exit(1)
else:
  print("API key set")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")


model = ChatOpenAI(temperature=1, model_name="gpt-4o", api_key=OPENAI_API_KEY)


# message history and how it's managed
store = {}

def get_session_history(session_id: str) -> BaseChatMessageHistory:
    if session_id not in store:
        store[session_id] = ChatMessageHistory()
    return store[session_id]

# trimmer = trim_messages(
#     max_tokens=65,
#     strategy="last",
#     token_counter=model,
#     include_system=True,
#     allow_partial=False,
#     start_on="human",
# )


prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are a helpful assistant. Answer all questions to the best of your ability.",
        ),
        MessagesPlaceholder(variable_name="messages"),
    ]
)

chain = (prompt | model)

with_message_history = RunnableWithMessageHistory(chain, get_session_history)


async def generate_chat_response(input):
   
   # session id seperates different sessions ie different convos
   config = {"configurable": {"session_id": "abc15"}}
   async for chunk in with_message_history.astream(
        {
            "messages": [HumanMessage(content=input)],
        },
        config=config,
    ):
    yield f"{chunk.content}"

@app.post("/chat_stream/")
async def chat_stream_events(text: Human_Message):
    input = text.userInput
    return StreamingResponse(generate_chat_response(input=input), media_type="text/markdown")
