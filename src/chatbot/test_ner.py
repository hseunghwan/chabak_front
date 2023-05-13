import spacy

# 저장된 모델 로드
model_path = "C:\\Users\\sunny\\Documents\\GitHub\\chabak_front\\src\\chatbot\\ner"
#nlp = spacy.load(model_path)
nlp = spacy.load('ko_core_news_lg')
trained_ner = spacy.load(model_path)

# Add your trained model as a new pipeline component
#nlp.add_pipe('custom_ner', source=trained_ner)

# Process text with the combined model
text = "경기도 봄 가기 좋은"

doc = nlp(text)
doc2 = trained_ner(text)

for ent in doc2.ents:
    print(ent.text, ent.label_)
# Access the named entities
for ent in doc.ents:
    print(ent.text, ent.label_)
