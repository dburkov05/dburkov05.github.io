var canvas, ctx;

document.addEventListener("DOMContentLoaded", main, true);
document.addEventListener("mouseup", onmouseup, true);

function onmouseup(/*MouseEvent*/ e){
	if(e.clientX>WIDTH)return
	if(e.clientY>HEIGHT)return
    var aPoint = new Point();
    aPoint.x = e.clientX;
    aPoint.y = e.clientY;
	aPoint.team = team;
    points.push(aPoint);
	Draw();
}

var points = new Array(); // в этом массиве будут храниться все объекты

var HEIGHT = 1000; 
var WIDTH = 1200;
var timer;
var isfill = true;
var team = 0;
var teams = [];
var arcs = [];
var img;
function main(){
	document.getElementsByTagName('body')[0].style='background-color:orange;';
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
	
	document.getElementById('toolbar').style = 'position:absolute;top:'+HEIGHT+'px;';
	
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
	color = teams[points[0].team];
	data = '';
	for(var i=0;i<points.length;i++){
		if(i!=0)data+=',';
		data+='{'+points[i].x+','+points[i].y+'}';
	}
	count = points.length;
	//color,number(team),points,count(points)
	var out = '';
	out+='txSetFillColor(RGB('+color+'));\n';
	out+='POINT cord'+number+'['+count+']={'+data+'};\n';
	out+='txPolygon(cord'+number+','+count+');\n';
	return out;
}
function toCpp(){
	var out = '#include "TXLib.h"\nint main(){\ntxCreateWindow('+WIDTH+', '+HEIGHT+');\ntxClear();\ntxSetColor(RGB('+strokecolor+'));';
	for(var i=0;i<teams.length;i++){
		out+='\n'+toCppPolygon(inteam(i));
	}
	out+='return 0;}';
	console.log(out);
	
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