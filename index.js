// при регистрации указываем на js-файл с кодом serviceWorker’а
// получаем Promise объект
navigator.serviceWorker.register(
   '/sw.js'
).then(function(registration) {
    // при удачной регистрации имеем объект типа ServiceWorkerRegistration  
    console.log('ServiceWorker registration', registration);
    // строкой ниже можно прекратить работу serviceWorker’а
    //registration.unregister();
	registration.update();
}).catch(function(err) {
    throw new Error('ServiceWorker error: ' + err);
});

