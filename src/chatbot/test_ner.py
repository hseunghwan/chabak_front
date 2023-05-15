import spacy
from konlpy.tag import *

hannanum = Hannanum()
kkma = Kkma()
komoran = Komoran()
okt = Okt()

#한국어 형태소 분석
def preprocess_text(text):
    # 형태소 모델 사용
    morphs = komoran.morphs(text)
    #리스트를 문자열로 수정
    return ' '.join(morphs)

# 저장된 모델 로드
model_path = "C:\\Users\\sjyim\\Documents\\GitHub\\chabak_front\\src\\chatbot\\ner"
#nlp = spacy.load(model_path)
trained_ner = spacy.load(model_path)
nlp = spacy.load("ko_core_news_lg")

input_text = "경기도 여름에 가기 좋은"

#형태소 함수 실행
text = preprocess_text(input_text)
print(text)

#ner 실행
doc = nlp(text)
doc2 = trained_ner(text)

#ner 출력
for ent in doc2.ents:
    print(ent.text, ent.label_)
# Access the named entities

for ent in doc.ents:
    print(ent.text, ent.label_)
