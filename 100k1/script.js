var all_answs = [["Кто ходит в форме?",{
	"военный":4,
	"полиция/миллиция":3,
	"школьник/ученик":2,
	"пожарник":1,
	"спортсмен":-1,
	"врач":-2,
	"стюардесса":-3,
	"охранник":-4
	}],
	["Дураки и дороги - какие еще беды в России?",{
	"алкоголь/ пьяницы/ водка":3,
	"коррупция":2,
	"чиновники":1,
	"депутаты":-1,
	"президент":-2
	}],
	["Я не иду сегодня на работу потому что я?",{
	"болею":3,
	"отпуск":2,
	"пьяный":1,
	"проспал":0,
	"не хочу":-1,
	"безработный":-2,
	"могу не ходить":-3
	}],
	["Кто спит стоя?",{
	"лошадь/конь":4,
	"солдат/часовой":3,
	"слон":2,
	"жираф":1,
	"цапля":-1,
	"сова":-2,
	"студент":-3,
	"лунатик":-4
	}],
	["Какой бывает музыка?",{
	"Красивая":3,
	"Танцевальная ":2,
	"Веселая ":1,
	"Популярная ":-1,
	"Громкая ":-2,
	"Классическая ":-3
	}]
	];
	var answs = {};
function ask_question(inp_ask,inp_answs){
	answs = inp_answs;
	document.getElementById("window").innerHTML='<br><div id="score">0</div><br><div id="ask"></div><br>';
	document.getElementById("ask").innerHTML = inp_ask;
	var elems = [];
	for(var key in inp_answs){
		elems.push(key);
	}
	elems.sort();
	for(var i=0;i<elems.length;i++){
	document.getElementById("window").innerHTML+='<div class="answ-elem" ><input class="answ" type="checkbox" value="'+elems[i]+'">'+elems[i]+'</div><br>'
	}
	document.getElementById("window").innerHTML+='<div align="right"><a onclick="run();" class="button7">Ответить</a><br><br></div>';
	document.getElementById('score').innerHTML=score;
}

var score = 0;
var ask_index = 0;
function run(){
	
	var checks = [];
	var checkboxs = document.getElementsByClassName("answ");
	for(var i=0;i<checkboxs.length;i++){
		var elem = checkboxs[i];
		if(elem.checked){
			checks.push(answs[elem.value]);
		}
	}
	
	var out = '';
	for(var i=0;i<checks.length;i++){
		score+=checks[i];
		out+=' '+checks[i]+'(checks[i])';
	}
	document.getElementById('score').innerHTML=score;
	ask_index++;
	if(ask_index<all_answs.length){
		ask_question(all_answs[ask_index][0],all_answs[ask_index][1]);
	}else{
		end();
	}
}

function end(){
	document.getElementById("window").innerHTML='<div id="end"><span class="shiny"><span class="inner-shiny">Конец!<br>У вас '+score+' Очков!</span></span><br><br><br><a href="" class="button1">Ещё раз</a></div>';
}
ask_question(all_answs[ask_index][0],all_answs[ask_index][1]);