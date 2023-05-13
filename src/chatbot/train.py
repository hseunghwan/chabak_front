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

train_data = [
    ("경기도 이천시 겨울 가기 좋은 곳 추천해줘", [(8, 10, "SEASON")]),
    ("봄 가기 좋은 곳 추천해줘", [(0, 1, "SEASON")]),
    ("경기도 수원시 가을 가기 좋은 곳 추천해줘", [(8, 10, "SEASON")]),
    ("수원시 여름 가기 좋은 곳 추천해줘", [(4, 6, "SEASON")]),
    ("가을 가기 좋은 곳 추천해줘", [(0, 2, "SEASON")]),
    ("경기도 여름 가기 좋은 곳 추천해줘", [(4, 6, "SEASON")]),
    ("겨울 가기 좋은 곳 추천해줘", [(0, 2, "SEASON")]),
    ("경기도 겨울 가기 좋은 곳 추천해줘", [(4, 6, "SEASON")]),
    ("서울특별시 가을 가기 좋은 곳 추천해줘", [(6, 8, "SEASON")]),
    ("충청남도 봄 가기 좋은 곳 추천해줘", [(5, 5, "SEASON")]),
    ("대전광역시 겨울 가기 좋은 곳 추천해줘", [(6, 8, "SEASON")]),
    ("충청도 겨울 가기 좋은 곳 추천해줘", [(4, 6, "SEASON")]),
    ("용인시 봄 가기 좋은 곳 추천해줘", [(4, 4, "SEASON")]),
    ("경기도 봄 가기 좋은 곳 추천해줘", [(4, 5, "SEASON")]),
    ("강원도 가을 가기 좋은 곳 추천해줘", [(4, 6, "SEASON")]),
    ("여름 가기 좋은 곳 추천해줘", [(0, 2, "SEASON")]),
    ("가을 가기 좋은 곳 추천해줘", [(0, 2, "SEASON")]),
    ("봄 가기 좋은 곳 추천해줘", [(0, 1, "SEASON")]),
    ("겨울 가기 좋은 곳 추천해줘", [(0, 2, "SEASON")]),
    ("부산광역시 가을 가기 좋은 곳 추천해줘", [(6, 8, "SEASON")]),
    ("경상북도 여름 가기 좋은 곳 추천해줘", [(5, 7, "SEASON")]),
    ("경상남도 봄 가기 좋은 곳 추천해줘", [(5, 6, "SEASON")]),
    ("경상남도 겨울 가기 좋은 곳 추천해줘", [(5, 7, "SEASON")]),
    ("제주도 가을 가기 좋은 곳 추천해줘", [(4, 6, "SEASON")]),
    ("제주특별시 여름 가기 좋은 곳 추천해줘", [(6, 8, "SEASON")]),
    ("전라북도 봄 가기 좋은 곳 추천해줘", [(5, 5, "SEASON")]),
    ("겨울 가기 좋은 차박지 추천해줘", [(0, 2, "SEASON")]),
    ("봄 가기 좋은 차박지 추천해줘", [(0, 1, "SEASON")]),
    ("가을 가기 좋은 차박지 추천해줘", [(0, 2, "SEASON")]),
    ("여름 가기 좋은 차박지 추천해줘", [(0, 2, "SEASON")]),
    ("수원시 겨울 가기 좋은 차박지 추천해줘", [(4, 6, "SEASON")]),
    ("경기도 안산시 가을 가기 좋은 차박지 추천해줘", [(8, 10, "SEASON")]),
    ("경기도 시흥시 겨울 가기 좋은 차박지 추천해줘", [(8, 10, "SEASON")]),
    ("서울특별시 용산구 여름 가기 좋은 차박지 추천해줘", [(10, 12, "SEASON")]),
        
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
output_dir = "C:\\Users\\sunny\\Documents\\GitHub\\chabak_front\\src\\chatbot\\ner"  # 모델 저장 디렉토리 설정
nlp.to_disk(output_dir)