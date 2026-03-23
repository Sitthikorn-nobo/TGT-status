// Service Worker for GA Status Tracker Push Notifications
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

// รับ push notification จาก Firebase
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  const title = data.title || '🔔 GA Status Tracker';
  const options = {
    body: data.body || 'มีการอัปเดตใหม่',
    icon: data.icon || '/TGT-status/icon-192.png',
    badge: data.icon || '/TGT-status/icon-192.png',
    data: { url: data.url || 'https://sitthikorn-nobo.github.io/TGT-status/' },
    vibrate: [200, 100, 200],
    requireInteraction: false
  };
  e.waitUntil(self.registration.showNotification(title, options));
});

// กดที่ notification → เปิดแอป
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const client of list) {
        if (client.url.includes('TGT-status') && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(e.notification.data.url);
    })
  );
});

// รับ message จาก main app → แสดง notification
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SHOW_NOTIFICATION') {
    const { title, body, icon } = e.data;
    self.registration.showNotification(title, {
      body,
      icon: icon || '/TGT-status/icon-192.png',
      badge: icon || '/TGT-status/icon-192.png',
      vibrate: [200, 100, 200],
      requireInteraction: false
    });
  }
});
