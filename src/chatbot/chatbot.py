import os
import openai
import spacy
import requests
from dotenv import load_dotenv
from konlpy.tag import Komoran


load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

class OpenAIGpt:
    #초기 설정
    def __init__(self):
        self.nlp = spacy.load("C:\\Users\\sunny\\Documents\\ner")  
        self.loc = set(["제주", "경기", "충청", "강원", "경상", "전라", "서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종", "시"])
        #사용할 형태소 분석 모델
        self.komoran = Komoran()
    
        #한국어 형태소 분석
    
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

        #차박지 관련 정보 물어보는 경우 / self.loc 안 돌아가는거 해결해야함
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
                print(url)
                print(id_lists)
                print(len(id_lists))
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
              if text:
                  print(text)

#최초 실행
if __name__ == '__main__':
    openai_gpt = OpenAIGpt()

    for i in range(5):
        openai_gpt.run()
        i += 1