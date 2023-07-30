import json
import os

for filename in os.listdir("data"):
    if filename.endswith(".json"):
        with open("data/" + filename) as f:
            data = json.load(f)
            entries = []
            for idx, item in enumerate(data):
                try:
                    lemma = item["Lemma"]
                    sense = item["Sense"]

                    if type(sense) == list:
                        sense = sense[0]

                    print('processing korean word', filename, idx)
                    kor_word = None
                    if type(lemma) == list:
                        kor_word = lemma[0]["feat"]["val"]
                    else:
                        kor_word = lemma["feat"]["val"]

                    print('processing korean definition', filename, idx)
                    kor_def = None
                    if type(sense["feat"]) == list:
                        kor_def = next(x for x in sense["feat"] if x["att"] == "definition")["val"]
                    else:
                        kor_def = sense["feat"]["val"]

                    print('processing korean examples', filename, idx)
                    kor_examples = []
                    if "SenseExample" in sense:
                        sense_example = sense["SenseExample"]
                        if type(sense_example) == list:
                            for idx, e in enumerate(sense_example):
                                feat_type = e["feat"][0]
                                feat_example = e["feat"][1]

                                kor_examples.append({"type": feat_type["val"], "value": feat_example["val"]})
                        else:
                            feat_type = sense_example["feat"][0]
                            feat_example = sense_example["feat"][1]
                            kor_examples.append({"type": feat_type["val"], "value": feat_example["val"]})

                    print('processing korean pronunciation, sound', filename, idx)
                    kor_pronounciation = None
                    kor_sound = None
                    if "WordForm" in item:
                        word_form = item["WordForm"]
                        if type(word_form) == list:
                            word_form = word_form[0]
                        feat = word_form["feat"]
                        pronunciation = next((x for x in feat if x["att"] == "pronunciation"), None)
                        kor_pronounciation = pronunciation["val"] if pronunciation and "val" in pronunciation else None
                        
                        sound = next((x for x in feat if x["att"] == "sound"), None)
                        kor_sound = sound["val"] if sound and "val" in sound else None
                    
                    print('processing english, chinese', filename, idx)
                    eng_word = None
                    eng_definition = None
                    cn_word = None
                    cn_definition = None
                    if "Equivalent" in sense:
                        equivalent = sense["Equivalent"]
                        if type(equivalent) == list:
                            for idx, e in enumerate(equivalent):
                                feat = e["feat"]
                                lang = next(x for x in feat if x["att"] == "language")["val"]
                                if lang == "영어":
                                    eng_word = next(x for x in feat if x["att"] == "lemma")["val"]
                                    eng_definition = next(x for x in feat if x["att"] == "definition")["val"]
                                elif lang == "중국어":
                                    cn_word = next(x for x in feat if x["att"] == "lemma")["val"]
                                    cn_definition = next(x for x in feat if x["att"] == "definition")["val"]
                    print('processing done', filename, idx)
                    entries.append({
                        "korean": {
                            "word": kor_word,
                            "definition": kor_def,
                            "examples": kor_examples,
                            "pronounciation": kor_pronounciation,
                            "sound": kor_sound
                        },
                        "english": {
                            "word": eng_word,
                            "definition": eng_definition
                        },
                        "chinese": {
                            "word": cn_word,
                            "definition": cn_definition
                        }
                    })
                except KeyError as e:
                    print("KeyError: ",idx, e)
                    break
                except Exception as e:
                    print("Other Error: ",idx, e)
                    print(json.dumps(item, ensure_ascii=False))
                    break
            with open("processed_data/" + filename, "w") as f:
                json.dump(entries, f, ensure_ascii=False)
                


    
    