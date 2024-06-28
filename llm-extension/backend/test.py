import os
from dotenv import load_dotenv
import asyncio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from fastapi.responses import StreamingResponse
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
prompt_not_cleaned = ChatPromptTemplate.from_template("tell me a joke about dragons. 400 words")
prompt = prompt_not_cleaned.messages[0].prompt.template
# prompt = "tell me a joke about cats. 200 words"
parser = StrOutputParser()


async def generate_chat_responses(input:str):
   async for chunk in model.pipe(parser).astream(input):
    #   content = chunk.replace("\n", "<br>")
      yield f"{chunk}"
      


@app.post("/chat_stream/")
async def chat_stream_events(text: Human_Message):
    input = text.userInput
    return StreamingResponse(generate_chat_responses(input=input), media_type="text/markdown")



# @app.get("/test")
# async def test():

#     chunks = []

#     async for chunk in llm.astream("hello. tell me something about yourself"):
#         chunks.append(chunk)
#         print(chunk.content, end="|", flush=True)
#         # return(chunk.content, end="|", flush=True)

# # asyncio.run(test())