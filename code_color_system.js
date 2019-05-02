function code(str,id,language="text"){
	var elem = document.getElementById(id);
	if(language == "text"){
		elem.innerHTML = "<pre>" + str + "</pre>";
	}else if(language == "python2"){
		s = ""
		var mode = "normal";
		var tmp_s = "";
		var sl = [];
		var cl = [];
		[].forEach.call(str, function(c) {
			if(c == "\""){
				if(mode == "normal" || mode == "comment"){
					mode = "string";
					tmp_s = "";
				}else{
					mode = "normal";
					sl.push(tmp_s);
					s += "ß"
					tmp_s = "";
				};
			}else if(c == "#"){
				if(mode == "normal"){
					mode = "comment";
				};
			}else if(c == "\n" && mode == "comment"){
					mode = "normal";
					cl.push(tmp_s);
					s += "ç" + "\n";
					tmp_s = "";
			}else{
				if(mode == "normal"){
					s += c;
				}else{
					tmp_s += c;
				}
			};
		});
		if(tmp_s != ""){
			cl.push(tmp_s)
			s += "ç";
		};
		s = s.replace(/(?:\+)|(?:-)|(?:\*)|(?:\/)|(?:\=)|(?:>\=)|(?:<\=)|(?:>)|(?:<)|(?:%)/g,"<font color=red>$&</font>");
		s = s.replace(/([^a-zA-Z_]+)(\d)+/g,"$1<font color='ff9633'>$2</font>");
		s = (" "+s+" ").replace(/([^a-zA-Z_])((?:and)|(?:assert)|(?:as)|(?:break)|(?:class)|(?:continue)|(?:def)|(?:del)|(?:elif)|(?:else)|(?:except)|(?:exec)|(?:finally)|(?:for)|(?:from)|(?:global)|(?:if)|(?:import)|(?:in)|(?:is)|(?:lambda)|(?:not)|(?:or)|(?:pass)|(?:print)|(?:raise)|(?:return)|(?:try)|(?:while)|(?:with)|(?:yield))([^a-zA-Z_])/g,"$1<font color='ff00ff'>$2</font>$3").slice(1,-1);
		s = s.replace(/"(.*?)<font .*?>(.*?)<\/font>(.*?)"/,"\"$1$2$3\"");
		s = s.replace(/#.*(\n|$)/g,"<font color='606060'>$&</font>");
		var j = 0;
		for(var i=0;i < s.length;i++){
			if(s[i] == "ß"){
				var as = "<font color='4040ff'>\"" + sl[j] + "\"</font>";
				var bs = s;
				s = bs.slice(0,i) + as + bs.slice(i+1);
				j += 1
			};
		};
		j = 0;
		for(var i=0;i < s.length;i++){
			if(s[i] == "ç"){
				var as = "<font color='606060'>#" + cl[j] + "</font>";
				var bs = s;
				s = bs.slice(0,i) + as + bs.slice(i+1);
				j += 1
			};
		};
		elem.innerHTML = "<pre>" + s + "</pre>";
	}else if(language == "haskell"){
		s = ""
		var mode = "normal";
		var tmp_s = "";
		var sl = [];
		var chl = [];
		var cl = [];
		for(var i=0;i<str.length;i++) {
			c = str[i];
			if(c == "\""){
				if(mode == "normal" || mode == "comment"){
					mode = "string";
					tmp_s = "";
				}else{
					mode = "normal";
					sl.push(tmp_s);
					s += "ß"
					tmp_s = "";
				};
			}else if(c == "\'"){
				if(mode == "normal" || mode == "comment"){
					mode = "char";
					tmp_s = "";
				}else{
					mode = "normal";
					chl.push(tmp_s);
					s += "å"
					tmp_s = "";
				};
			}else if(c == "-" && str[i+1] == "-"){
				if(mode == "normal"){
					mode = "comment";
				};
			}else if(c == "\n" && mode == "comment"){
					mode = "normal";
					cl.push(tmp_s);
					s += "ç" + "\n";
					tmp_s = "";
			}else{
				if(mode == "normal"){
					s += c;
				}else{
					tmp_s += c;
				}
			};
		};
		if(tmp_s != ""){
			cl.push(tmp_s)
			s += "ç";
		};
		s = s.replace(/(?:\+)|(?:-)|(?:\*)|(?:\/)|(?:\=)|(?:>\=)|(?:<\=)|(?:>)|(?:<)|(?:%)|(?:\:\:)/g,"<font color=red>$&</font>");
		s = s.replace(/([^a-zA-Z_]+)(\d)+/g,"$1<font color='ff9633'>$2</font>");
		s = (" "+s+" ").replace(/([^a-zA-Z_])((?:case)|(?:class)|(?:data)|(?:default)|(?:deriving)|(?:do)|(?:else)|(?:foreign)|(?:if)|(?:import)|(?:in)|(?:infix)|(?:infixl)|(?:infixr)|(?:instance)|(?:let)|(?:module)|(?:newtype)|(?:of)|(?:then)|(?:type)|(?:where))([^a-zA-Z_])/g,"$1<font color='ff00ff'>$2</font>$3").slice(1,-1);
		s = s.replace(/"(.*?)<font .*?>(.*?)<\/font>(.*?)"/,"\"$1$2$3\"");
		s = s.replace(/#.*(\n|$)/g,"<font color='606060'>$&</font>");
		var j = 0;
		for(var i=0;i < s.length;i++){
			if(s[i] == "ß"){
				var as = "<font color='4040ff'>\"" + sl[j] + "\"</font>";
				var bs = s;
				s = bs.slice(0,i) + as + bs.slice(i+1);
				j += 1
			};
		};
		j = 0;
		for(var i=0;i < s.length;i++){
			if(s[i] == "å"){
				var as = "<font color='4040ff'>\'" + chl[j] + "\'</font>";
				var bs = s;
				s = bs.slice(0,i) + as + bs.slice(i+1);
				j += 1
			};
		};
		j = 0;
		for(var i=0;i < s.length;i++){
			if(s[i] == "ç"){
				var as = "<font color='606060'>-" + cl[j] + "</font>";
				var bs = s;
				s = bs.slice(0,i) + as + bs.slice(i+1);
				j += 1
			};
		};
		elem.innerHTML = "<pre>" + s + "</pre>";
	}else if(language == "bash"){
		s = str;
		s = "<font class=green>$</font> " + s;
		elem.innerHTML = "<pre>" + s + "</pre>"
	}
}