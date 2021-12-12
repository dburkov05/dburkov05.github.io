// register service worker

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw-test/sw.js', { scope: '/sw-test/' }).then(function(reg) {

    if(reg.installing) {
      console.log('Service worker installing');
    } else if(reg.waiting) {
      console.log('Service worker installed');
    } else if(reg.active) {
      console.log('Service worker active');
    }

  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}

function getPremNotification() {
  Notification.requestPermission(function(result) {
    if (result === 'granted') {
      console.log("Разрешение получено!");
    }
    navigator.serviceWorker.ready.then(function(registration) {
    	console.log("registration",registration);
    });
  });
}

function showNotif(msg) {
	navigator.serviceWorker.controller.postMessage({
		"type": 'Notification',
		"msg": msg
	});
}
