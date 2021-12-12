self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/sw-test/',
        '/sw-test/404.html',
        '/sw-test/index.html',
        '/sw-test/style.css',
        '/sw-test/app.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
	console.log('fetch',event.request.method, event.request.url);
	event.respondWith(caches.match(event.request).then(function(response) {
	// caches.match() always resolves
	// but in case of success response will have value
	if (response !== undefined) {
		return response;
	} else {
		return fetch(event.request).then(function (response) {
		// response may be used only once
		// we need to save clone to put one copy in cache
		// and serve second one
		let responseClone = response.clone();
		
		if(responseClone.status != "404") {
			caches.open('v1').then(function (cache) {
				cache.put(event.request, responseClone);
			});
			return response;
		}
	}).catch(function () {
	self.registration.showNotification("Сообщение от сайтика", {
		body: "Ошибочка!",
		icon: '../images/touch/chrome-touch-icon-192x192.png',
		vibrate: [200, 100, 200, 100, 200, 100, 200],
		tag: ''
        });
      
		//return new Response("Эта страница не существует или не сохранена");
		return caches.match('/sw-test/404.html');
      });
    }
  }));
});

self.addEventListener('message', function (event) {
	console.log(self.registration);
	let data = event.data;
	console.log(data);
	if(data.type == "Notification") {
		self.registration.showNotification("Сообщение от сайтика", {
		body: data.msg,
		icon: '../images/touch/chrome-touch-icon-192x192.png',
		vibrate: [200, 100, 200, 100, 200, 100, 200],
		tag: ''
        	});	
	}
	event.source.postMessage('response');
});
