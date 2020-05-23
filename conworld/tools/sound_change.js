var sounds_num = 1;

function applyAll(){
	var sounds_text = document.getElementById("sounds").value;
	var sound_changes_texts = [];
	for (var i=1;i<=sounds_num;i++) {
		sound_changes_texts.push(document.getElementById("sound_changes" + i).value);
	};
	var words = document.getElementById("words").value.split("\n");
	var output_area = document.getElementById("output");
	var sounds = parseSounds(sounds_text);
	var rules_dicts = sound_changes_texts.map(sound_change_text => parseSoundChanges(sound_change_text));
	output_area.value = "";
	words.forEach(word => {
		output_area.value += apply(word,sounds,rules_dicts) + "\n";
	});
};

function apply(word,sounds,rules_dicts){
	rules_dicts.forEach(rules_dic => {
		Object.keys(rules_dic).forEach(key => {
			rules_dic[key].forEach(right => {
				var after = right[0];
				alert(after);
				after = after.replace("∅","");
				var cond = right[1];
				var acond = cond.replace("#","");
				cond = cond.replace("#_","^_");
				cond = cond.replace("_#","_$");
				n = 1;
				Object.keys(sounds).forEach(sound_key => {
					cond = cond.replace(sound_key,"(" + sounds[sound_key].join("|") + ")");
					acond = acond.replace(sound_key,"$"+n);
					if(acond.match(sound_key)){
						n++;
					};
				});
				after = acond.replace("_",after);
				var before = cond.replace("_",key);
				alert(before);
				alert(after);
				word = word.replace(new RegExp(before),after);
			});
		});
	});
	return word;
};

function parseSounds(text){
	if(text == ""){
		return {};
	};
	var rows = text.split("\n");
	rows = rows.map(x => x.replace(/\s+/g,""));
	var sounds_dic = {};
	rows.forEach(row => {
		var pair = row.split("=");
		sounds_dic[pair[0]] = pair[1].split(",");
	});
	return sounds_dic;
};

function parseSoundChanges(text){
	if(text == ""){
		return {};
	};
	var rows = text.split("\n");
	rows = rows.map(x => x.replace(/\s+/g,""));
	var rules_dic = {};
	rows.forEach(row => {
		var pair = row.split("/");
		var expr = pair[0];
		var cond = pair[1];
		pair = expr.split("→");
		var before = pair[0];
		var after = pair[1];
		if(rules_dic[before] == undefined){
			rules_dic[before] = [];
		};
		rules_dic[before].push([after,cond]);
	});
	return rules_dic;
};

function addSounds(){
	var sound_changes_texts = [];
	for (var i=1;i<=sounds_num;i++) {
		sound_changes_texts.push(document.getElementById("sound_changes" + i).value);
	};
	document.documentElement.innerHTML = document.documentElement.innerHTML.replace(
		new RegExp('<textarea rows="10" cols="30" id="sound_changes' + sounds_num + '">(.*?)</textarea>'),
		'<textarea rows="10" cols="30" id="sound_changes' + sounds_num + '"></textarea>' + 
			'<textarea rows="10" cols="30" id="sound_changes' + (sounds_num+1) + '"></textarea>'
	);
	for (var i=1;i<=sounds_num;i++) {
		document.getElementById("sound_changes" + i).value = sound_changes_texts[i-1];
	};
	sounds_num += 1;
};

function deleteSounds(){
	if(sounds_num != 1){
			document.documentElement.innerHTML = document.documentElement.innerHTML.replace(
			new RegExp('<textarea rows="10" cols="30" id="sound_changes' + sounds_num + '">(.*?)</textarea>'),
			""
		);
		sounds_num -= 1;
	}
}