function download(path, filename){
    // Create a new link
    const anchor = document.createElement('a');
    anchor.href = path;
    anchor.download = filename;

    // Append to the DOM
    document.body.appendChild(anchor);

    // Trigger `click` event
    anchor.click();

    // Remove element from DOM
    document.body.removeChild(anchor);
}

function save() {
	let formData = new FormData(document.getElementById("test"));
	let data = {};
	for(let [name, value] of formData) {
		data[name] = value;
	}
	for(let key in data) {
		console.log(key, data[key]);
	}
	console.log(JSON.stringify(data));
	
	let blob = new Blob([JSON.stringify(data, null, 2)], {type : 'application/json'});
	let url = URL.createObjectURL(blob);
	download(url, data['name']+'.json');
}

let drg = function(e){
	e.stopPropagation();
	e.preventDefault();
	console.log('event ',e);
}

function read(file,callback){
	let fReader = new FileReader();
	fReader.addEventListener('load', function(){
		let data = JSON.parse(fReader.result);
		for(let key in data) {
			if(document.getElementsByName(key).length == 1) {
				document.getElementsByName(key)[0].value = data[key];
			} else {
				if(data[key] != "") {
					document.getElementsByName(key)[data[key]-1].checked = true;
				}
			}
		}
	}, false);
	fReader.readAsText(file);
}
let element = document.body;
element.addEventListener("dragenter", drg, false);
element.addEventListener("dragover", drg, false);
element.addEventListener("drop", function(e){
    if(!e.dataTransfer.files) return;
    e.stopPropagation();
    e.preventDefault();
	let files = e.dataTransfer.files;
	read(files[0]);
	console.log(files);
}, false);
