import os
import openai
import spacy
import re
import json
import requests
from dotenv import load_dotenv
from konlpy.tag import Komoran
import time
#from flask import Flask, request, jsonify

#app = Flask(__name__)

class OpenAIGpt:
    #초기 설정
    def __init__(self):
        load_dotenv()
        self.nlp = spacy.load("C:\\Users\\sjyim\\Documents\\ner")  
        self.loc = ["제주", "경기", "충청", "강원", "경상", "전라", "서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종", "시"]
        self.pattern1 = r'도\s\w{2,3}시'
        self.pattern2 = r'시\s\w{1,3}구'
        #사용할 형태소 분석 모델
        self.komoran = Komoran()
        #백엔드 주소
        self.back_url = "http://3.34.98.222:8080/api/chatbot/place?"
    
        #한국어 형태소 분석
    
    #형태소 분석
    def preprocess_text(self, text, konlpy):
        # 형태소 모델 사용
        morphs = konlpy.morphs(text)
        #리스트를 문자열로 수정
        return ' '.join(morphs)
    
    #json을 백엔드에 전송
    def to_back(self, json_data):
        #json을 백엔드에 전송
        response = requests.get(self.back_url, json=json_data)

        if response.status_code == 200:
            print("파일 전송 성공")
        else:
            print("파일 전송 실패")
            print(response.status_code)

        #백엔드에서 받은 json 파일 리턴
        return response.json()
    
    #프론트엔드에서 prompt 받아오기
    #@app.route('/api/prompt', methods=['POST'])
    #def prompt(self):
        prompt = request.json['prompt']

        result = self.run(prompt)

        response = {'result': result}

        return jsonify(response)

    #프론트엔드에 completion 보내기
    

    #인공지능 실행 코드 -> 백엔드에 보내야하는 경우에는 보내고 프론트에 보내기 (결국 프론트로 보내는거는 함수 호출로 해야함)
    def run(self):
        question = input(" Question : ")
        prompt = f"{question}"
        openai.api_key = os.getenv("OPENAI_API_KEY")

        #차박지 검색용 패턴
        match1 = re.search(self.pattern1, prompt)
        match2 = re.search(self.pattern2, prompt)

        #차박지 관련 정보 물어보는 경우
        if match1 or match2 or prompt in self.loc:
            #형태소 분석
            text = self.preprocess_text(prompt, self.komoran)
            print(text)
            #분석한 text ner 처리
            doc = self.nlp(text)
            
            entities = self.back_url+''
            for ent in doc.ents:
                entities += ent.label_ + "=" + ent.text + "&"
            entities = entities[:-1]
            print(entities)
            json_data = json.dumps(entities)
            a = self.to_back(json_data)
            #print(a)
            print(type(a))

# 변환된 데이터를 확인합니다.

            
            
        #백엔드에 정보 json으로 보낸 후에 프론트에는 처리 되었음을 알리는 문자를 보내야함
            
        #그 외에 차박 관련 정보 물어볼 때
        else:
            response = openai.Completion.create(
                engine="curie:ft-personal-2023-04-10-06-39-38",
                prompt=prompt,
                temperature=0.3,
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

#최초 실행
if __name__ == '__main__':
    openai_gpt = OpenAIGpt()

    for i in range(5):
        openai_gpt.run()
        i += 1

    #app.run()