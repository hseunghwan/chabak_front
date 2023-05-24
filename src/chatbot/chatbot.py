import os
import openai
import spacy
import requests
from dotenv import load_dotenv
from konlpy.tag import Komoran
import sys

#typescript에 리턴할 때 문자를 'utf-8'로 인코딩해서 전달
sys.stdout.reconfigure(encoding='utf-8')

load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

class OpenAIGpt:
    #초기 설정
    def __init__(self):
        self.nlp = spacy.load("C:\\Users\\sunny\\Documents\\ner")  
        self.loc = set(["제주", "경기", "충청", "강원", "경상", "전라", "서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종", "시"])
        #사용할 형태소 분석 모델
        self.komoran = Komoran()
    
    #형태소 분석
    def preprocess_text(self, text, konlpy):
        # 형태소 모델 사용
        morphs = konlpy.morphs(text)
        #리스트를 문자열로 수정
        return ' '.join(morphs)

    #json을 백엔드에 전송
    def to_back(self, path):
        #json을 백엔드에 전송
        response = requests.get(path)
        
        '''
        if response.status_code == 200:
            print("파일 전송 성공")
        else:
            print("파일 전송 실패")
            print(response.status_code)
        '''
        #백엔드에서 받은 json 파일을 리스트로 변환해서 리턴
        return response.json()    

    #인공지능 실행 코드 -> 백엔드에 보내야하는 경우에는 보내고 프론트에 보내기 (결국 프론트로 보내는거는 함수 호출로 해야함)
    def run(self):
        #입력을 typescript로부터 받아온다. 
        prompt = f"{sys.argv[1]}"

        openai.api_key = os.getenv("OPENAI_API_KEY")

        #차박지 관련 정보 물어보는 경우 / self.loc 안 돌아가는거 해결해야함 / for문 안에 인공지능 넣어두면 안 됨 빼는거 생각해야함.
        for loc in self.loc:
            if loc in prompt:
                #형태소 분석
                text = self.preprocess_text(prompt, self.komoran)
    
                #분석한 text ner 처리
                doc = self.nlp(text)
                
                #label로 백엔드에 보낼 url 만들기
                url = 'http://3.34.98.222:8080/api/chatbot/place?'
                for ent in doc.ents:
                    url += ent.label_ + "=" + ent.text + "&"
                url = url[:-1]
                id_lists = self.to_back(url)
                
                #Node.js의 exec는 print를 stdout에 저장한다. -> 처음 나오는 print가 stdout에 저장됨
                print(id_lists)
                #print(len(id_lists))
                break
         
        #백엔드에 정보 json으로 보낸 후에 프론트에는 처리 되었음을 알리는 문자를 보내야함
        #예) 네, 해당 차박 리스트를 보여드릴게요 같이
            
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
              return text
              if text:
                  print(text)

#최초 실행
if __name__ == '__main__':
    openai_gpt = OpenAIGpt()
    openai_gpt.run()