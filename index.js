// при регистрации указываем на js-файл с кодом serviceWorker’а
// получаем Promise объект
function reg(){
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
}
function del(){
	navigator.serviceWorker.getRegistrations().then(function(registrations) {
 for(let registration of registrations) {
  registration.unregister()
  onsole.log('Сервис-Воркер Удалён')
} })
}

var messageChannel = new MessageChannel();
messageChannel.port1.addEventListener('message', replyHandler);
worker.postMessage('Test', [messageChannel.port2]);
function replyHandler (event) {
  console.log(event.data); // this comes from the ServiceWorker
}