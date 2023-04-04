import os
import openai

from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv('OPENAI_API_KEY')

response = openai.Completion.create(
    model = "text-davinci-003",
    prompt = "안녕, 내 이름은 임승진이야. \n\nQ: 이름이 뭘까?\nA:",
    temperature = 0,
    max_tokens = 100,
    top_p = 1,
    frequency_penalty = 0.0,
    presence_penalty = 0.0,
    stop = ["\n"]
)

print(response)

print(response.choices[0].text.strip())