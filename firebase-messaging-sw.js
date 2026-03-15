// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyDREED85Ig_NLyLEMzLtjRLwrYPZn1Em0g",
    authDomain: "registro-binomio.firebaseapp.com",
    projectId: "registro-binomio",
    storageBucket: "registro-binomio.firebasestorage.app",
    messagingSenderId: "1005145229027",
    appId: "1:1005145229027:web:e8f6a5c7027d33ed7727d6",
    measurementId: "G-TRYZPKQG0J"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('📱 Notificación en segundo plano:', payload);
    
    const notificationTitle = payload.notification?.title || 'Editorial Binomio';
    const notificationOptions = {
        body: payload.notification?.body || 'Tienes una nueva notificación',
        icon: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'45\' fill=\'%23FF9800\'/%3E%3Ctext x=\'50\' y=\'70\' font-size=\'70\' text-anchor=\'middle\' fill=\'white\'%3E📊%3C/text%3E%3C/svg%3E',
        badge: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'10\' fill=\'%23FF9800\'/%3E%3C/svg%3E',
        vibrate: [200, 100, 200],
        data: payload.data,
        actions: [
            {
                action: 'abrir',
                title: '📝 ABRIR'
            }
        ]
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
    console.log('🔔 Clic en notificación:', event);
    event.notification.close();
    
    if (event.action === 'abrir' || !event.action) {
        event.waitUntil(
            clients.matchAll({ type: 'window', includeUncontrolled: true })
                .then((clientList) => {
                    for (const client of clientList) {
                        if (client.url.includes('/Binomio-26/') && 'focus' in client) {
                            return client.focus();
                        }
                    }
                    return clients.openWindow('/Binomio-26/');
                })
        );
    }
});
