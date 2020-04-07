# coding:utf-8
import math
vowlist = ["a","e","i","o","u","w","y","á","à","ä","â","ā","é","è","ë","ê","ē","í","ì","ï","î","ī","ó","ò","ö","ô","ō","ú","ù","ü","û","ū"]
#【ここからメイン】
while True:
	txt = input("文章を入力: ")
	txt = txt.replace(".", "") .replace(",", "") .replace(":", "") .replace(";", "") 
	txt = txt.replace("!", "") .replace("?", "") .replace("\'", "").replace("\"", "")
	txt = txt.replace("(", "").replace(")", "").replace(" • ", " ")
	txt = txt.replace(" - "," ").replace(" — "," ").replace("«","").replace("»","")
	txt = txt.replace("0","").replace("1","").replace("2","").replace("3","").replace("4","")
	txt = txt.replace("5","").replace("6","").replace("7","").replace("8","").replace("9","")
	txt = txt.replace("  "," ").replace("  "," ").replace("  "," ").replace("  "," ")
	txt = txt.lower() #小文字に整理
	
	#無入力時の終了回避
	if txt == "":
		txt = "x"

	#単語リスト
	wordlist = txt.split(" ")
	#単語長リスト
	wordlen = list(map(len, wordlist))
	sum = 0
	for val in wordlen:
		sum += val
	ave = sum / len(wordlen) #平均

	#【語頭子音クラスタ割合】
	test1 = []
	test2 = []
	for word in wordlist:
		try: #予期せぬ記号が交ざるとここでエラーが起きる
			if word[0] in vowlist: #語頭が子音なら1を格納
				test1.append(0)
			else:
				test1.append(1)
		except:
			test1.append(0)
		
		try: #1文字単語の場合のエラー処理
			if word[1] in vowlist: #2文字目が子音なら1を格納
				test2.append(0)
			else:
				test2.append(1)
		except:
			test2.append(0)

	#配布のためnumpy使わずにリスト和を表現
	t = 0
	sum = 0
	for val	in test1:
		sum += val*test2[t]
		t +=1
	cluster = 100*sum/len(wordlist) #両者が1になる百分率を積でbool演算

	#【語末評価】
	test3 = 0
	for word in wordlist:
		try:
			if word[-1] not in vowlist: #語末が子音なら1を足す
				test3 += 1
		except:
			pass

	close = 100 * test3 / len(wordlist) #閉音節の百分率

	#【全体の子音割合】
	#単語をすべて合体した巨大な1単語を作る
	all = str(wordlist).replace("[","").replace("]","").replace("'","").replace(",","").replace(" ","")
	#処理上の都合で母音からダイアクリティカルマーク削除してaiueoに整理
	standard = all
	standard = standard.replace("á","a").replace("à","a").replace("ä","a").replace("â","a").replace("ā","a")
	standard = standard.replace("é","e").replace("è","e").replace("ë","e").replace("ê","e").replace("ē","e")
	standard = standard.replace("í","i").replace("ì","i").replace("ï","i").replace("î","i").replace("ī","i")
	standard = standard.replace("ó","o").replace("ò","o").replace("ö","o").replace("ô","o").replace("ō","o")
	standard = standard.replace("ú","u").replace("ù","u").replace("ü","u").replace("û","u").replace("ū","u")
	#母音削除した巨大単語を作り、長さの比を取る
	onlycon = standard.replace("a","").replace("e","").replace("i","").replace("o","").replace("u","")
	conrate = 100*len(onlycon)/len(all)

	#【出力】
	#オーバーフローするうえ過剰に自然言語判定するので、各係数を1/aにする
	a = 200
	exp = math.e ** (4791/a + 701.8*ave/a + 26.86*cluster/a + 2.244*close/a - 142.9*conrate/a)
	p = round(1/(1 + exp),4)
	print("自然言語らしさ： " +str(round(100 - 100*p, 2)))
	print("")