import spacy
import random
from spacy.training import Example

def train_ner_model(train_data, n_iter):
    # Spacy 모델 초기화
    nlp = spacy.load('ko_core_news_lg')
    
    ner = nlp.get_pipe("ner")
    
    # 개체명 레이블 설정
    for text, annotations in train_data:
        for ent in annotations:
            ner.add_label(ent[2])

    # 훈련 데이터로부터 Example 객체 생성
    examples = []
    for text, annotations in train_data:
        doc = nlp.make_doc(text)
        example_dict = {"text": doc.text, "entities": annotations}
        example = Example.from_dict(doc, example_dict)
        examples.append(example)
    
    # 모델 훈련
    nlp.begin_training()
    for itn in range(n_iter):
        random.shuffle(examples)
        losses = {}
        for example in examples:
            nlp.update([example], losses=losses)
        print("Iteration:", itn, "Loss:", losses)
    
    return nlp

#훈련 데이터셋
train_data = [
    ("경기도 수원시 가을 에 별 보 러 가 기 좋 은 차 박 지 추천 해줘", [(0, 3, "GPE"), (4, 7, "CITY"), (8, 10, "SEASON"), (13, 14, "THEME")]),
    ("경기도 이천시 겨울 에 힐링 하러 가 기 좋 은 차 박 지 추천 해줘", [(0, 3, "GPE"), (4, 7, "CITY"), (8, 10, "SEASON"), (13, 15, "THEME")]),
    ("봄 에 반려 동물 이랑 가기 좋 은 곳 추천해줘", [(0, 1, "SEASON"), (4, 6, "THEME") ]),
    ("경기도 수원시 가을 에 가족 이랑 가 기 좋 은 곳 추천 해줘", [(0, 3, "GPE"), (4, 7, "CITY"), (8, 10, "SEASON"), (13, 15, "THEME")]),
    ("수원시 여름 에 커플 끼리 가 기 좋 은 곳 추천 해줘", [(0, 3, "CITY"), (4, 6, "SEASON"), (9, 11, "THEME")]),
    ("충청남도 금산군 가을 에 커플 이서 가 기 좋 은 곳 추천 해줘", [(0, 4, "GPE"), (5, 8, "CITY"), (9, 11, "SEASON"), (14, 16, "THEME")]),
    ("강원도 여름 에 바다 보 러 가 기 좋 은 곳 추천해줘", [(0, 3, "GPE"), (4, 6, "SEASON"), (9, 11, "THEME")]),
    ("울산광역시 중구 겨울 에 별 보 러 가 기 좋 은 차 박 지 추천 해줘", [(0, 5, "GPE"), (6, 8, "CITY"), (9, 11, "SEASON"), (14, 15, "THEME")]),
    ("경기도 용인시 겨울 에 가족 끼리 가 기 좋 은 곳 추천 해줘", [(0, 3, "GPE"), (4, 7, "CITY"), (8, 10, "SEASON"), (13, 15, "THEME")]),
    ("서울특별시 커플 끼리 가을 에 가 기 좋 은 차 박 지 추천 해줘", [(0, 5, "GPE"), (6, 8, "THEME"), (12, 14, "SEASON")]),
    ("충청남도 공주시 봄 에 반려 동물 데리고 가 기 좋 은 곳 추천 해줘", [(0, 4, "GPE"), (5, 8, "CITY"), (9, 10, "SEASON"), (13, 15, "THEME")]),
    ("대전광역시 유성구 겨울 에 바다 근처 가 기 좋 은 곳 추천 해줘", [(0, 5, "GPE"), (6, 9, "CITY"), (10, 12, "SEASON"), (15, 17, "THEME")]),
    ("충청도 세종시 겨울 에 별 보 러 가 기 좋 은 곳 추천 해줘", [(0, 3, "GPE"), (4, 7, "CITY"), (8, 10, "SEASON"), (13, 14, "THEME")]),
    ("용인시 봄 에 가족 이랑 가 기 좋 은 곳 추천 해줘", [(0, 3, "CITY"), (4, 5, "SEASON"), (8, 10, "THEME")]),
    ("경상도 겨울 에 가 기 좋 은 차 박 지 추천 해줘", [(0, 3, "GPE"), (4, 6, "SEASON"), ]),
    ("강원도 강릉시 가을 에 힐링 하기 좋 은 곳 추천 해줘", [(0, 3, "GPE"), (4, 7, "CITY"), (8, 10, "SEASON"), (13, 15, "THEME")]),
    ("전라남도 여수시 여름 에 바다 근처 가 기 좋은 곳 추천 해줘", [(0, 4, "GPE"), (5, 8, "CITY"), (9, 11, "SEASON"), (14, 16, "THEME")]),
    ("전라북도 전주시 겨울 에 별 보 기 좋 은 차 박 지 추천 해줘", [(0, 4, "GPE"), (5, 8, "CITY"), (9, 11, "SEASON"), (14, 15, "THEME")]),
    ("경상남도 봄 에 커플 이 가 기 좋 은 곳 추천 해줘", [(0, 4, "GPE"), (5, 6, "SEASON"), (9, 11, "THEME")]),
    ("경상북도 군위군 겨울 에 바다 보 러 가 기 좋 은 곳 추천 해줘", [(0, 4, "GPE"), (5, 8, "CITY"), (9, 11, "SEASON"), (14, 16, "THEME")]),
    ("부산광역시 기장군 가을 에 가족 끼리 가 기 좋 은 곳 추천 해줘", [(0, 5, "GPE"), (6, 9, "CITY"), (10, 12, "SEASON"), (15, 17, "THEME")]),
    ("제주특별시 제주시 겨울 에 반려 동물 이랑 가 기 좋 은 곳 추천 해줘", [(0, 5, "GPE"), (6, 9, "CITY"), (10, 12, "SEASON"), (15, 17, "THEME")]),
    ("경상북도 경산시 봄 에 산 가 기 좋 은 곳 추천 해줘", [(0, 4, "GPE"), (5, 8, "CITY"), (9, 10, "SEASON"), (13, 14, "THEME")]),
    ("경상남도 창원시 여름 에 가 기 좋 은 계곡 근처 차 박 지 추천 해줘", [(0, 4, "GPE"), (5, 8, "CITY"), (9, 11, "SEASON"), (22, 24, "THEME")]),
    ("경상남도 진주시 겨울 에 가 기 좋 은 계곡 있 는 차 박 지 추천 해줘", [(0, 4, "GPE"), (5, 8, "CITY"), (9, 11, "SEASON"), (22, 24, "THEME")]),
    ("제주도 가을 에 가 기 좋 은 바다 근처 차 박 지 추천 해줘", [(0, 3, "CITY"), (4, 6, "SEASON"), (17, 19, "THEME")]),
    ("인천광역시 부평구 여름 에 가족 끼리 가 기 좋 은 곳 추천 해줘", [(0, 5, "GPE"), (6, 9, "CITY"), (10, 12, "SEASON"), (15, 17, "THEME")]),
    ("인천광역시 남동구 봄 에 별 보 러 가 기 좋 은 곳 추천 해줘", [(0, 5, "GPE"), (6, 9, "CITY"), (10, 11, "SEASON"), (14, 15, "THEME")]),
    ("전라북도 남원시 겨울 에 산 보 러 가 기 좋 은 곳 추천 해줘", [(0, 4, "GPE"), (5, 8, "CITY"), (9, 11, "SEASON"), (14, 15, "THEME")]),
    ("강원도 추천시 겨울 에 산 근처 좋 은 차 박 지 추천 해줘", [(0, 3, "GPE"), (4, 7, "CITY"), (8, 10, "SEASON"), (13, 14, "THEME")]),
    ("강원도 속초시 봄 에 힐링 하러 가 기 좋 은 차 박 지 추천 해줘", [(0, 3, "GPE"), (4, 7, "CITY"), (8, 9, "SEASON"), (12, 14, "THEME")]),
    ("광주광역시 동구 가을 에 힐링 하기 좋 은 차 박 지 추천 해줘", [(0, 5, "GPE"), (6, 8, "CITY"), (9, 11, "SEASON"), (14, 16, "THEME")]),
    ("광주광역시 광산구 여름 에 반려 동물 이랑 가 기 좋 은 차 박 지 추천 해줘", [(0, 5, "GPE"), (6, 9, "CITY"), (10, 12, "SEASON"), (15, 17, "THEME")]),
    ("경기도 파주시 겨울 에 커플 이 가 기 좋 은 차 박 지 추천 해줘", [(0, 3, "GPE"), (4, 7, "CITY"), (8, 10, "SEASON"), (13, 15, "THEME")]),
    ("경기도 안산시 가을 에 가 기 좋 은 계곡 근처 차 박 지 추천 해줘", [(0, 3, "GPE"), (4, 7, "CITY"), (8, 10, "SEASON"), (21, 23, "THEME")]),
    ("경기도 시흥시 봄 에 가 기 좋 은 산 근처 차 박 지 추천 해줘", [(0, 3, "GPE"), (4, 7, "CITY"), (8, 9, "SEASON"), (20, 21, "THEME")]),
    ("서울특별시 용산구 여름 에 힐링 하러 가 기 좋 은 곳 추천 해줘", [(0, 5, "GPE"), (6, 9, "CITY"), (10, 12, "SEASON"), (15, 17, "THEME")]),
    ("서울특별시 잠실구 여름 에 가족 끼리 가 기 좋 은 곳 추천 해줘", [(0, 5, "GPE"), (6, 9, "CITY"), (10, 12, "SEASON"), (15, 17, "THEME")]),
    ("강원도 횡성군 봄 에 계곡 근처 좋 은 곳 추천 해줘", [(0, 3, "GPE"), (4, 7, "CITY"), (8, 9, "SEASON"), (12, 14, "THEME")]),
    ("강원도 인제군 봄 에 반려 동물 이랑 가 기 좋 은 차 박 지 추천 해줘.", [(0, 3, "GPE"), (4, 7, "CITY"), (8, 9, "SEASON"), (12, 14, "THEME")]),
    ("경상북도 포항시 여름 에 산 쪽 차 박 지 추천 해줘.", [(0, 4, "GPE"), (5, 8, "CITY"), (9, 11, "SEASON"), (14, 15, "THEME")]),
    ("충청북도 제천시 가을 에 힐링 할 수 있 는 차 박 지 추천 해줘.", [(0, 4, "GPE"), (5, 8, "CITY"), (9, 11, "SEASON"), (14, 16, "THEME")]),
    ("충청북도 음성군 여름 에 커플 끼리 가 기 좋 은 차 박 지 추천 해줘.", [(0, 4, "GPE"), (5, 8, "CITY"), (9, 11, "SEASON"), (14, 16, "THEME")]),
    ("전라남도 목포시 봄 에 가족 끼리 가 기 좋 은 차 박 지 추천 해줘.", [(0, 4, "GPE"), (5, 8, "CITY"), (9, 10, "SEASON"), (13, 15, "THEME")]),
    ("전라남도 담양군 여름 에 반려 동물 이랑 가 기 좋 은 곳 추천 해줘.", [(0, 4, "GPE"), (5, 8, "CITY"), (9, 11, "SEASON"), (14, 16, "THEME")]),
    ("전라남도 보성군 가을 에 바다 보 러 가 기 좋 은 차 박 지 추천 해줘.", [(0, 4, "GPE"), (5, 8, "CITY"), (9, 11, "SEASON"), (14, 16, "THEME")]),
    ("전라북도 고창군 봄 에 계곡 근처 차 박 지 추천 해줘.", [(0, 4, "GPE"), (5, 8, "CITY"), (9, 10, "SEASON"), (13, 15, "THEME")]),
    ("전라북도 무주군 가을 에 가 기 좋 은 산 근처 차 박 지 추천 해줘", [(0, 4, "GPE"), (5, 8, "CITY"), (9, 11, "SEASON"), (22, 23, "THEME")]),
    ("울산광역시 울주군 봄 에 가 기 좋 은 계곡 추천 해줘", [(0, 5, "GPE"), (6, 9, "CITY"), (10, 11, "SEASON"), (22, 24, "THEME")]),
]

# 모델 훈련
nlp = train_ner_model(train_data, n_iter=10)

# 예시 문장에 대해 개체명 인식 수행
text = "경기도 여름 가기 좋은"
doc = nlp(text)
for ent in doc.ents:
    print(ent.text, ent.label_)
text = "경기도 수원시 봄 가기 좋은"
doc = nlp(text)
for ent in doc.ents:
    print(ent.text, ent.label_)
text = "충청남도 겨울 가기 좋은"
doc = nlp(text)
for ent in doc.ents:
    print(ent.text, ent.label_)
text = "서울특별시 장안구 가을 가기 좋은"
doc = nlp(text)
for ent in doc.ents:
    print(ent.text, ent.label_)
    
# 학습된 모델 저장
output_dir = "C:\\Users\\sjyim\\Documents\\GitHub\\chabak_front\\src\\chatbot\\ner"  # 모델 저장 디렉토리 설정
nlp.to_disk(output_dir)