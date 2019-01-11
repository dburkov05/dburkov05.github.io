var reg = false;
navigator.serviceWorker.getRegistrations().then(function(registrations) {
 for(let registration of registrations) {
  var url = registration.active.scriptURL
  if(url == 'https://dburkov05.github.io/sw.js'){
	  reg = true
  }
} })
if(!reg){
// при регистрации указываем на js-файл с кодом serviceWorker’а
// получаем Promise объект
navigator.serviceWorker.register(
   '/sw.js'
).then(function(registration) {
    // при удачной регистрации имеем объект типа ServiceWorkerRegistration  
    console.log('ServiceWorker registration', registration);
    // строкой ниже можно прекратить работу serviceWorker’а
    //registration.unregister();
}).catch(function(err) {
    throw new Error('ServiceWorker error: ' + err);
});
}

