var funcs = {
	"+":[function(a,b){return a+b;},0],
	"-":[function(a,b){return a-b;},0],
	"*":[function(a,b){return a*b;},1],
	"/":[function(a,b){return a/b;},1],
	"^":[function(a,b){return a**b;},2],
	"√":[function(a,b){return a ** (1/b);},2]
};
function calc(input){
function parser_part_1(str){
	var out = [];
	
	var temp = "";
	var flag = 0;
	for(var i=0;i<str.length;i++){
		if(str[i].match(/[0-9.]/) != null){
			if(flag==1){
				temp+=str[i];
			}
			if(flag==0){
				flag=1;
				temp+=str[i];
			}
		}else{
			if(flag==1){
				out.push(temp);
				temp = "";
				flag=0;
			}
			out.push(str[i]);
		}
	}
	if(flag==1){
		out.push(temp);
		temp = "";
		flag=0;
	}
	return out;
}

function parser_part_2(input) {
 var count = 0;
 var temp_all = [];
 for (var i = 0; i < input.length; i++) {
   temp_all.push(input [i]);
   if(input[i]=="(")count++;
 }
 for (var k = 0; k < count; k++) {
  var start = -1;
  var end = -1;
  
  for (var i = 0; i < temp_all.length; i++) {
   if(temp_all[i]==")"){
    end=i;
    break;
   }
  }
   
  for (var j = i; j >=0; j--) {
   if(temp_all[j]=="("){
    start=j;
    break;
   }
  }
   var temp = [];
   var temp2 = [];
   
  for (var i = 0; i < temp_all.length; i++) {
    if(i<start||i>end){
      temp.push(temp_all[i]);
    }
    if(i>start && i<end){
      temp2.push(temp_all[i]);
    }
	if(i==end){
		temp.push(temp2);
	}
  }
	temp_all = temp;
 }
  return temp_all;
}

function end_part(input){
	var temp = [];
	
	for(var i=0;i<input.length;i++){
		if(Array.isArray(input[i])){
			temp.push(end_part(input[i]));
		}else{
			temp.push(input[i]);
		}
	}
	return end_calc(temp);
}
function swap(arr,pos1,pos2,insert){
		var temp = [];
		for(var i=0;i<arr.length;i++){
			if(i<pos1||i>pos2)temp.push(arr[i]);
			if(i==pos1){
				for(var j=0;j<insert.length;j++){
					temp.push(insert[j]);
				}
			}
		}
		return temp;
	}
function end_calc(input){
	var out = 0;
	var temp = [];
	var max_level = 0;
	var count = 0;
	for(var i=0;i<input.length;i++){
		temp.push(input[i]);
		if(input[i] in funcs){
			count++;
			if(funcs[input[i]][1]>max_level){
				max_level = funcs[input[i]][1];
			}
		}
	}
	for(var k=0;k<count;k++){
		for(var i=0;i<temp.length;i++){
			if(temp[i] in funcs){
				if(funcs[temp[i]][1]==max_level){
					var result = funcs[temp[i]][0](Number(temp[i-1]),Number(temp[i+1]));
					temp = swap(temp,i-1,i+1,[result]);
				}
			}
		}
		max_level = 0;
		for(var i=0;i<temp.length;i++){
			if(temp[i] in funcs && funcs[temp[i]][1]>max_level)max_level = funcs[temp[i]][1];
		}
	
	}
	
	out = temp[0];
	return out;
}

var part_1 = parser_part_1(input);
var part_2 = parser_part_2(part_1);
var part_3 = end_part(part_2);
console.log(part_1,"->",part_2,"->",part_3);
return part_3;
}

function testing(input){
	var out = true;
	return out;
}