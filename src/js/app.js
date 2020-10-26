import Widget from './Widget';

const container = document.querySelector('.section');
const url = 'https://serviceworker-homework.herokuapp.com/news';

if (navigator.serviceWorker) {
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register(
        '/service.worker.js',
        { scope: './' },
      );
    } catch (e) {
      console.log(e);
    }
  });
}
const widget = new Widget(container, url);
widget.start();
