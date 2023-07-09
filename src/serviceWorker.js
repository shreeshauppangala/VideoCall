var regex = /^127(?:\.(?:25[0-5]|2[0-4]\d|[01]?\d{1,2})){3}$/;
var result = regex.exec(window.location.hostname);


const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  result
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl, config);

        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
            'worker. To learn more, visit https://goo.gl/SC7cgQ'
          );
        });
      } else {
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  const onSuccess = (registration) => {
    if (config.onSuccess) {
      config.onSuccess(registration);
    }
  };

  const onUpdate = (registration) => {
    if (config.onUpdate) {
      config.onUpdate(registration);
    }
  };

  const handleInstallingWorkerStateChange = (registration) => {
    const installingWorker = registration.installing;
    if (installingWorker.state === 'installed') {
      if (navigator.serviceWorker.controller) {
        console.log('New content is available; please refresh.');
        onUpdate(registration);
      } else {
        console.log('Content is cached for offline use.');
        onSuccess(registration);
      }
    }
  };

  const handleUpdateFound = (registration) => {
    const installingWorker = registration.installing;
    installingWorker.onstatechange = () => handleInstallingWorkerStateChange(registration);
  };

  navigator.serviceWorker.register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => handleUpdateFound(registration);
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error);
    });
}


function checkValidServiceWorker(swUrl, config) {

  fetch(swUrl)
    .then(response => {

      if (
        response.status === 404 ||
        response.headers.get('content-type').indexOf('javascript') === -1
      ) {

        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
