import os
import openai
import argparse
import spacy
from spacy.tokens import Span
from dotenv import load_dotenv


class OpenAIGpt:
    def __init__(self):
        load_dotenv()
        self.nlp = spacy.load("ko_core_news_lg")
        self.nlp.add_pipe("custom_ner", last=True)

    @spacy.Language.component('custom_ner')
    def custom_ner(doc):
        for ent in doc.ents:
            if ent.label_ == "LC" and (ent.text.endswith("시") or ent.text.endswith("도")):
                ent.label_ = "CITY"
            elif ent.text in ["봄", "여름", "가을", "겨울"]:
                ent.label_ = "SEASON"
        return doc

    def run(self, args):
        question = input(" Question : ")
        prompt = f"{question}"
        openai.api_key = os.getenv("OPENAI_API_KEY")
        if "시" in prompt or "도" in prompt:
            doc = self.nlp(prompt)
            entities = [(ent.text, ent.label_) for ent in doc.ents]
            print(entities)
        else:
            response = openai.Completion.create(
                engine="davinci:ft-personal-2023-04-17-22-21-08",
                prompt=prompt,
                temperature=args.temperature,
                max_tokens=100,
                top_p=1,
                frequency_penalty=0.0,
                presence_penalty=0.0,
                stop=["\n"]
            )
            for choice in response.choices:
              text = choice.text.strip()
              if text:
                  print(text)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    # python gpt3.py --temperature 0.3
    parser.add_argument('--temperature', default=0.3)

    args = parser.parse_args()
    openai_gpt = OpenAIGpt()
    openai_gpt.run(args)