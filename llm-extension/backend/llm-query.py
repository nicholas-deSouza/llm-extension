from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust to your frontend's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LLM_Key_and_Query(BaseModel):
    api_key: str
    query: str

# for now just use OpenAI API, eventually use Langchain to allow for multiple LLMs
@app.post("/run_query/")
async def LLM_Response(key_and_query: LLM_Key_and_Query):
    api_key = key_and_query.api_key
    query = key_and_query.query

    # create the OpenAI chat completions 
    client = OpenAI(api_key=api_key)

    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "user", "content": query}
    ]
    )

    print(completion.choices[0].message)

    return{
        "response":completion.choices[0].message
    }