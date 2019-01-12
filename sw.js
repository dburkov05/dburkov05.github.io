self.addEventListener('install', (event) => {
    console.log('Установлен');
});

self.addEventListener('activate', (event) => {
    console.log('Активирован');
	event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    console.log('Происходит запрос на сервер');
	//new Response('Hello from your friendly neighbourhood service worker!');
});
self.addEventListener('message', function(event){
    //Message received from client
    console.log(event.data);
    //Send response to client using the port that was sent with the message
	console.log(event);
	event.ports[0].postMessage("SW Says Hello back!");
});