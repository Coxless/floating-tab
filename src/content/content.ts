import type { Message } from '../types';
import { Z_INDEX_MAX } from '../popup/constants';

console.log('FloatingTab content script loaded');

const CONTAINER_ID = 'floating-tab-root';
let isPopupOpen = false;
let shadowRoot: ShadowRoot | null = null;
let cleanup: (() => void) | null = null;

function createContainer(): HTMLElement {
  const existingContainer = document.getElementById(CONTAINER_ID);
  if (existingContainer) {
    existingContainer.remove();
  }

  const container = document.createElement('div');
  container.id = CONTAINER_ID;
  container.style.cssText = `all: initial; position: fixed; z-index: ${Z_INDEX_MAX};`;
  document.body.appendChild(container);

  shadowRoot = container.attachShadow({ mode: 'open' });

  return container;
}

async function mountPopup(): Promise<void> {
  if (isPopupOpen) return;

  createContainer();
  if (!shadowRoot) return;

  // Create mount point inside shadow DOM
  const mountPoint = document.createElement('div');
  mountPoint.id = 'popup-mount';
  shadowRoot.appendChild(mountPoint);

  try {
    // Dynamically import and mount React app
    const [{ createRoot }, { default: App }, cssModule] = await Promise.all([
      import('react-dom/client'),
      import('../popup/App'),
      import('../popup/index.css?inline'),
    ]);

    // Inject styles into shadow DOM
    const styleElement = document.createElement('style');
    styleElement.textContent = cssModule.default;
    shadowRoot.insertBefore(styleElement, mountPoint);

    // Mount React app
    const root = createRoot(mountPoint);
    const { createElement } = await import('react');

    const handleClose = () => {
      unmountPopup();
    };

    root.render(createElement(App, { onClose: handleClose }));

    cleanup = () => {
      root.unmount();
    };

    isPopupOpen = true;
  } catch (error) {
    console.error('Failed to mount FloatingTab popup:', error);
    // Clean up the container if mounting failed
    const container = document.getElementById(CONTAINER_ID);
    if (container) {
      container.remove();
    }
    shadowRoot = null;
  }
}

function unmountPopup(): void {
  if (!isPopupOpen) return;

  cleanup?.();
  cleanup = null;

  const container = document.getElementById(CONTAINER_ID);
  if (container) {
    container.remove();
  }

  shadowRoot = null;
  isPopupOpen = false;
}

function togglePopup(): void {
  if (isPopupOpen) {
    unmountPopup();
  } else {
    mountPopup();
  }
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message: Message) => {
  if (message.type === 'TOGGLE_POPUP') {
    togglePopup();
  }
});
