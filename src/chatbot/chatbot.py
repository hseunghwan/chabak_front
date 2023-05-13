import os
import openai
import argparse
import spacy
import re
from spacy.tokens import Span
from dotenv import load_dotenv


class OpenAIGpt:
    def __init__(self):
        load_dotenv()
        self.nlp = spacy.load("ko_core_news_lg")
        self.nlp.add_pipe("custom_ner", last=True)
        self.loc = ["제주", "경기도", "충청남도", "충청북도", "강원도", "경상남도", "경상북도", "전라남도", "전라남도", "전라북도", "서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종", "시"]
        self.pattern1 = r'도\s\w{2,3}시'
        self.pattern2 = r'시\s\w{2,3}구'
        
    @spacy.Language.component("custom_ner")
    def custom_ner(doc):
        print(f'first doc: {doc}')
        
        for token in doc:
            print(f'{token} token')
            if token.text in ['봄', '여름', '가을', '겨울']:
                token.ent_type_ = 'SEASON'
                
            if token.text in "수원시":
                token.ent_type_ = "CITY"
                
            print(f'{token.ent_type_} type')
        print(f'second doc: {doc}')
        
        for ent in doc.ents:
            print(ent)
            print(f'value = {ent} label = {ent.label_}')
            if ent.label_ == "DT":
                ent.label_ = "SEASON"
                '''
            elif ent.text in ["봄", "여름", "가을", "겨울"]: 
                span = Span(doc, ent.start, ent.end, label='season')
                doc.ents = list(doc.ents) + [span]
                '''
                #doc.ent.label_ = ent.label_
                
        for ent in doc.ents:
            print(ent.text, ent.label_)
        print(f'doc.ents = {doc.ents}, doc = {doc}')
        return doc

    def run(self, args):
        question = input(" Question : ")
        prompt = f"{question}"
        openai.api_key = os.getenv("OPENAI_API_KEY")
        match1 = re.search(self.pattern1, prompt)
        match2 = re.search(self.pattern2, prompt)
        if match1 or match2 or prompt in self.loc:
            self.nlp.Defaults.stop_words.add("에")
            print("1\n")
            doc = self.nlp(prompt)
            print(f'불용어 처리 이전: {doc}')
            filtered_tokens = [token for token in doc if not token.is_stop]
            print(f'불용아처러: {filtered_tokens}')
            print("2\n")
            print(ent.label_ for ent in doc.ents)
            entities = [(ent.text, ent.label_) for ent in doc.ents]
            stop_words = self.nlp.Defaults.stop_words
            print(stop_words)
            print(entities)
            
            
        else:
            response = openai.Completion.create(
                engine="davinci:ft-personal-2023-04-17-22-21-08",
                prompt=prompt,
                temperature=args.temperature,
                max_tokens=512,
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