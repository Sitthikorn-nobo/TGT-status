importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAEafNEvzFs1p_iptcPvhujggH30nkcSM8",
  authDomain: "tgt-status.firebaseapp.com",
  databaseURL: "https://tgt-status-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tgt-status",
  storageBucket: "tgt-status.firebasestorage.app",
  messagingSenderId: "148559930953",
  appId: "1:148559930953:web:65cc5ea0c6ecc7811e8198"
});

const messaging = firebase.messaging();

// รับ background notification
messaging.onBackgroundMessage(payload => {
  const { title, body } = payload.notification || {};
  self.registration.showNotification(title || '🔔 GA Status Tracker', {
    body: body || 'มีการอัปเดตใหม่',
    icon: '/TGT-status/icon-192.png',
    badge: '/TGT-status/icon-192.png',
    vibrate: [200, 100, 200],
    tag: 'new-task',
    renotify: true
  });
});

// กดที่ notification → เปิดแอป
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const c of list) {
        if (c.url.includes('TGT-status') && 'focus' in c) return c.focus();
      }
      return clients.openWindow('https://sitthikorn-nobo.github.io/TGT-status/');
    })
  );
});
