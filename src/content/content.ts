import { createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import App from "../popup/App";
import { Z_INDEX_MAX } from "../popup/constants";
import cssContent from "../popup/index.css?inline";
import type { Message } from "../types";

const CONTAINER_ID = "floating-tab-root";
let isPopupOpen = false;
let shadowRoot: ShadowRoot | null = null;
let root: Root | null = null;

function createContainer(): HTMLElement {
  const existingContainer = document.getElementById(CONTAINER_ID);
  if (existingContainer) {
    existingContainer.remove();
  }

  const container = document.createElement("div");
  container.id = CONTAINER_ID;
  container.style.cssText = `all: initial; position: fixed; z-index: ${Z_INDEX_MAX};`;
  document.body.appendChild(container);

  shadowRoot = container.attachShadow({ mode: "open" });

  return container;
}

function mountPopup(): void {
  if (isPopupOpen) return;

  createContainer();
  if (!shadowRoot) return;

  // Inject styles into shadow DOM
  const styleElement = document.createElement("style");
  styleElement.textContent = cssContent;
  shadowRoot.appendChild(styleElement);

  // Create mount point inside shadow DOM
  const mountPoint = document.createElement("div");
  mountPoint.id = "popup-mount";
  shadowRoot.appendChild(mountPoint);

  // Mount React app
  const handleClose = () => {
    unmountPopup();
  };

  root = createRoot(mountPoint);
  root.render(createElement(App, { onClose: handleClose }));

  isPopupOpen = true;
}

function unmountPopup(): void {
  if (!isPopupOpen) return;

  root?.unmount();
  root = null;

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
  if (message.type === "TOGGLE_POPUP") {
    togglePopup();
  }
});
