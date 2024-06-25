from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
app = FastAPI()

from pydantic import BaseModel
import requests
from pprint import pprint

from langchain_openai import ChatOpenAI
from langchain.chains import ConversationChain
from langchain.memory import ConversationEntityMemory
from langchain.memory.prompt import ENTITY_MEMORY_CONVERSATION_TEMPLATE
from langchain.callbacks import AsyncIteratorCallbackHandler
import asyncio
from typing import AsyncIterable
from fastapi.responses import StreamingResponse


load_dotenv(dotenv_path='./.env')

if os.getenv("OPENAI_API_KEY") is None or os.getenv("OPENAI_API_KEY") == "":
  print("OPENAI_API_KEY is not included, add key to your .env ")
  exit(1)
else:
  print("API key set")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust to your frontend's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Human_Message(BaseModel):
    userInput: str

@app.post("/get_llm_response/")
async def get_llm_response(text: Human_Message):
      input = text.userInput

      llm = ChatOpenAI(temperature=1, model_name="gpt-4o", api_key=OPENAI_API_KEY)
      conversation = ConversationChain(
        llm = llm,
        memory = ConversationEntityMemory(llm = llm),
        prompt = ENTITY_MEMORY_CONVERSATION_TEMPLATE,
        verbose = False
      )

      ai_response = conversation.predict(input = input)
      return {"response": {"content": ai_response}}


async def send_message(userInput: str) -> AsyncIterable[str]:
    callback = AsyncIteratorCallbackHandler()
    model = ChatOpenAI(
        streaming=True,
        verbose=True,
        callbacks=[callback],
    )

    task = asyncio.create_task(
        model.agenerate(messages=[userInput])
    )

    try:
        async for token in callback.aiter():
            yield token
    except Exception as e:
        print(f"Caught exception: {e}")
    finally:
        callback.done.set()

    await task

@app.post("/stream_chat/")
async def stream_chat(message: Human_Message):
    generator = send_message(message.userInput)
    return StreamingResponse(generator, media_type="text/event-stream")

# @app.post("/get_llm_response_streaming/")
# async def get_llm_response(text: Human_Message):
#     input = text.userInput

#     llm = ChatOpenAI(temperature=1, model_name="gpt-4o", api_key=OPENAI_API_KEY)
#     for chunk in llm.stream(input=input):
#       print(chunk, end="", flush=True)


