# coding:utf-8

import numpy as np

vowlist = ["a","e","i","o","u","w","y","á","à","ä","â","ā","é","è","ë","ê","ē","í","ì","ï","î","ī","ó","ò","ö","ô","ō","ú","ù","ü","û","ū"]

#最頻値関数自作
#同数項目があれば小さいほうを表示
def mode(arr):
	r = [0] * (max(arr) + 1)
	for a in arr:
		r[a] += 1
	return r.index(max(r))

#【ここからメイン】
while True:
	txt = input("Input a sample text: ")
	txt = txt.replace(".", "") .replace(",", "") .replace(":", "") .replace(";", "") 
	txt = txt.replace("!", "") .replace("?", "") .replace("\'", "").replace("\"", "")
	txt = txt.replace("(", "").replace(")", "").replace(" • ", " ")
	txt = txt.replace(" - "," ").replace(" — "," ").replace("«","").replace("»","")
	txt = txt.replace("0","").replace("1","").replace("2","").replace("3","").replace("4","")
	txt = txt.replace("5","").replace("6","").replace("7","").replace("8","").replace("9","")
	txt = txt.replace("  "," ").replace("  "," ").replace("  "," ").replace("  "," ") #スペース連続混入を除外
	txt = txt.lower() #小文字に整理

	#【単語リスト】
	wordlist = txt.split(" ")

	#【文字の種類数】
	kind = len(list(set(list(txt)))) 

	#sh,th,ch,kh,ghを語末に含めば補正カウント
	#フスハー=hushaみたいな偶然の配列除外目的で語末を評価
	#ph,ngに関しては語頭語中も含めてカウント
	check = str(wordlist)
	if "sh'" in check:
		kind += 1
	if "th'" in check:
		kind += 1
	if "ch'" in check:
		kind += 1
	if "kh'" in check:
		kind += 1
	if "gh'" in check:
		kind += 1
	if "ph" in check:
		kind += 1
	if "ng" in check:
		kind += 1

	#【単語長リスト】
	wordlen = list(map(len, wordlist))

	ave = sum(wordlen)/len(wordlen) #平均
	var = np.var(wordlen) #分散
	mod = mode(wordlen) #最頻値


	#【語頭子音クラスタ割合】
	test1 = []
	test2 = []
	for word in wordlist:
		try: #カッコなど含む文入力時なぜかここでエラーが起きるので***
			if word[0] in vowlist: #語頭が子音なら1を格納
				test1.append(0)
			else:
				test1.append(1)
		except:
			test1.append(0) #理由不明だけど0を入れておく***
		
		try: #1文字単語の場合のエラー処理
			if word[1] in vowlist: #2文字目が子音なら1を格納
				test2.append(0)
			else:
				test2.append(1)
		except:
			test2.append(0)

	test1 = np.array(test1)
	test2 = np.array(test2)
	cluster = round(100*sum(test1*test2)/len(wordlist),1) #両者が1になる百分率


	#【語末評価】
	#語末子音割合
	#語末単子音割合
	test3 = []
	test4 = []
	for word in wordlist:
		try: #カッコなど含む文入力時なぜかここでエラーが起きるので***
			if word[-1] in vowlist: #語末が子音なら1を格納
				test3.append(0)
			else:
				test3.append(1)
		except:
			test3.append(0) #理由不明だけど0を入れておく***
			
		try: #1文字単語の場合のエラー処理
			if word[-2] in vowlist: #語末から2文字目が「母音」なら1を格納
				test4.append(1)
			else:
				test4.append(0)
		except:
			test4.append(0)

	close = round(100*sum(test3)/len(wordlist),1) #閉音節の百分率

	test3 = np.array(test3)
	test4 = np.array(test4)
	alone = round(100*sum(test3*test4)/len(wordlist),1) #両者が1になる百分率


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
	conrate = round(100*len(onlycon)/len(all),1)

	#【子音クラスタ長】
	constr = standard.replace("a"," ").replace("e"," ").replace("i"," ").replace("o"," ").replace("u"," ")
	constrlist = list(map(len, constr.split())) #引数なしだと重複空白を自動整理してくれる

	conave = sum(constrlist)/len(constrlist) #平均
	convar = np.var(constrlist) #分散
	conmod = mode(constrlist) #最頻値

	#【出力】
	print("文字種類数: "+str(kind))
	print("単語長平均: "+str(round(ave,2)))
	print("単語長分散: "+str(round(var,2)))
	print("単語長最頻: "+str(round(mod,2)))
	print("語頭子音クラスタ割合: "+str(cluster))
	print("閉音節単語割合: "+str(close))
	print("語末単子音割合: "+str(alone))
	print("総子音割合: "+str(conrate))
	print("子音クラスタ長平均: "+str(round(conave, 2)))
	print("子音クラスタ長分散: "+str(round(convar,2)))
	print("子音クラスタ長最頻: "+str(round(conmod,2)))
	print("")