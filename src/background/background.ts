// Service Worker - ショートカットキーリスナーなどを後で実装
console.log('FloatingTab background service worker loaded');

chrome.runtime.onInstalled.addListener(() => {
  console.log('FloatingTab installed');
});
