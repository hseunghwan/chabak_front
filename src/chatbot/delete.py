import spacy

nlp = spacy.load("ko_core_news_lg")

nlp.Defaults.stop_words.add("에")
# 불용어 추가
custom_stop_words = ["에", "하기", "에서"]
for word in custom_stop_words:
    nlp.vocab[word].is_stop = True

text = "경기도 봄에 가기 좋은"

doc = nlp(text)

filtered_tokens = [token for token in doc if not token.is_stop]
# 불용어 제거
print(filtered_tokens)
stop_words = nlp.Defaults.stop_words
print(stop_words)