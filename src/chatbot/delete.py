import spacy
from konlpy.tag import *

hannanum = Hannanum()
kkma = Kkma()
komoran = Komoran()
okt = Okt()

def preprocess_text(text):
    # 한국어 형태소 분석 수행
    morphs = okt.morphs(text)
    #리스트를 문자열로 수정
    return ' '.join(morphs)

text = "경기도 이천시 겨울에 가기 좋은 곳 추천해줘"

# 한국어 형태소 분석을 수행한 후 텍스트 전처리
preprocessed_text = preprocess_text(text)
print(preprocessed_text)
print(type(preprocessed_text))