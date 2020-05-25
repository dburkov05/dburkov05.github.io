var keypads = document.getElementsByClassName("keypad");

var vars = document.getElementById("vars");
vars.innerHTML = "<caption>Переменные</caption><tr><th>id</th><th>value</th></tr>";//<tr><td>0</td><td>12345678</td></tr>
var keys = ["0","1","2","3","4","5","6","7","8","9","(",")","+","-","*","/","^","√"];
function press_key(){
	document.getElementsByClassName("input")[0].value=document.getElementsByClassName("input")[0].value+this.value;
}

function enter(){
	var data = document.getElementsByClassName("input")[0].value;
	if(!testing(data)){
		alert('ERROR!');
	}else{
		document.getElementsByClassName("input")[0].value = calc(data);
	}
}

for(var i=0;i<keypads.length;i++){
	var keypad = keypads[i];
	for(var j=0;j<keys.length;j++){
		var key = document.createElement("input");
		key.type = "button";
		key.value = keys[j];
		key.addEventListener("click", press_key);
		keypad.appendChild(key);
	}
	
	var key = document.createElement("input");
	key.type = "button";
	key.value = "Enter";
	key.addEventListener("click", enter);
	keypad.appendChild(key);
	
	var clear = document.createElement("input");
	clear.type = "button";
	clear.value = "Clear";
	clear.addEventListener("click", function(){document.getElementsByClassName("input")[0].value="";});
	keypad.appendChild(clear);
}