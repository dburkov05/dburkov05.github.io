 Проверка того, что наш браузер поддерживает Service Worker API.
if ('serviceWorker' in navigator) {
     Весь код регистрации у нас асинхронный.
    navigator.serviceWorker.register('.sw.js')
      .then(() = navigator.serviceWorker.ready.then((worker) = {
        worker.sync.register('syncdata');
      }))
      .catch((err) = console.log(err));
}