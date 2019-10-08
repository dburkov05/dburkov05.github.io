var canvas, ctx;

document.addEventListener("DOMContentLoaded", main, true);
document.addEventListener("mouseup", onmouseup, true);

function onmouseup(/*MouseEvent*/ e){
	if(e.clientX>WIDTH)return
	if(e.clientY>HEIGHT)return
    var aPoint = new Point();
    aPoint.x = e.clientX-5;
    aPoint.y = e.clientY-5;
	aPoint.team = team;
    points.push(aPoint);
	Draw();
}

var points = new Array(); // в этом массиве будут храниться все объекты

var HEIGHT = 500; 
var WIDTH = 800;
var timer;
var isfill = true;
var team = 0;
var teams = [];
var img;
function main(){
    // создаём холст на весь экран и прикрепляем его на страницу
	canvas = document.createElement('canvas');
	canvas.height = HEIGHT;
	canvas.width = WIDTH;
	canvas.id = 'canvas';
	canvas.style.position = 'absolute';
	canvas.style.top = '0';
	canvas.style.left = '0';
	document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
	
	canvas2 = document.createElement('canvas');
	canvas2.height = HEIGHT;
	canvas2.width = WIDTH;
	canvas2.id = 'canvas2';
	canvas.style.position = 'relative';
	canvas.style.top = '0';
	canvas.style.left = '0';
	document.body.appendChild(canvas2);
    ctx2 = canvas2.getContext("2d");
	img = document.getElementById('img1');
	Draw();
}

function Point(){
    this.x = 0;
    this.y = 0;
	this.team = 0;
}
var screencolor = 'rgb(200,200,200)';
var strokecolor = '0,0,0';
var r = 1; 
function Draw_past(ctx){
	for(var i = 0; i < points.length; i++){
		ctx.fillStyle = 'rgb('+teams[points[i].team]+')';
        ctx.beginPath();
        ctx.arc(
            points[i].x - r,
            points[i].y - r,
            r,
            0,
            Math.PI * 2
        );
        
        ctx.closePath();
        ctx.fill();
    }
    for(var j=0;j<teams.length;j++){
		var team = teams[j];
		var count = 0;
		ctx.fillStyle = 'rgb('+team+')';
		ctx.strokeStyle = 'rgb('+strokecolor+')';
		ctx.beginPath();
		for(var i = 0; i < points.length; i++){
			if(points[i].team != j)continue
			count++;
			if(count==1){
				ctx.moveTo(points[i].x,points[i].y);
				}else{
			ctx.lineTo(points[i].x,points[i].y);
}
		}
		ctx.closePath();
		ctx.stroke();
		if(isfill)ctx.fill();
	}
}
function Draw(){
	document.title = points.length;
    // очищение экрана
    ctx.fillStyle = screencolor;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
	
	ctx.drawImage(img,0,0);
	Draw_past(ctx);
	
}
function inteam(key){
	var out = [];
	for(var i = 0; i < points.length; i++){
			if(points[i].team != key)continue
			out.push(points[i]);
		}
	return out;
}
function toCppPolygon(points){
	number = points[0].team;
	color = teams[points[0].team].color;
	data = '';
	for(var i=0;i<points.length;i++){
		if(i!=0)data+=',';
		data+='{'+points[i].x+','+points[i].y+'}';
	}
	count = points.length;
	//color,number(team),points,count(points)
	var out = '';
	out+='txSetFillColor(RGB('+color+'));';
	out+='POINT cord'+number+'['+count+']={'+data+'};';
	out+='txPolygon(cord'+number+','+count+');';
	return out;
}
function toCpp(){
	var out = 'int main(){txCreateWindow('+WIDTH+', '+HEIGHT+');txClear();txSetColor(RGB('+strokecolor+'));';
	for(var i=0;i<teams.length;i++){
		out+=toCppPolygon(inteam(i));
	}
	out+='return 0;}';
	prompt("Paste to programm ", out);
	
}
function addTeam(color){
	teams.push(color);
	var out = "<input value='"+(teams.length-1)+"' onclick='{team = parseInt(this.value);document.getElementById("+'"team"'+").innerHTML = team;}' type='button'>";
	document.getElementById('teams').innerHTML +=out;
}
function cancel_point(){
	var out = [];
	for(var i=0;i<points.length-1;i++){
		out.push(points[i]);
	}
	points = out;
}