import type { Message, TabInfo, GetTabsResponse, SwitchTabPayload } from '../types';

console.log('FloatingTab background service worker loaded');

chrome.runtime.onInstalled.addListener(() => {
  console.log('FloatingTab installed');
});

// Alt+Space ショートカットキーの検知
chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'toggle-popup') {
    try {
      const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (activeTab?.id) {
        chrome.tabs.sendMessage(activeTab.id, { type: 'TOGGLE_POPUP' } as Message);
      }
    } catch (error) {
      console.error('Failed to send TOGGLE_POPUP message:', error);
    }
  }
});

// メッセージハンドラ
chrome.runtime.onMessage.addListener((message: Message, _sender, sendResponse) => {
  switch (message.type) {
    case 'GET_TABS':
      handleGetTabs().then(sendResponse);
      return true; // 非同期レスポンスを示す

    case 'SWITCH_TAB':
      handleSwitchTab(message.payload as SwitchTabPayload).then(sendResponse);
      return true;

    default:
      return false;
  }
});

async function handleGetTabs(): Promise<GetTabsResponse> {
  try {
    const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const allTabs = await chrome.tabs.query({});

    const tabs: TabInfo[] = allTabs.map((tab) => ({
      id: tab.id ?? 0,
      title: tab.title ?? 'Untitled',
      url: tab.url ?? '',
      favIconUrl: tab.favIconUrl,
      active: tab.active ?? false,
      windowId: tab.windowId ?? 0,
    }));

    return {
      tabs,
      currentTabId: currentTab?.id ?? 0,
    };
  } catch (error) {
    console.error('Failed to get tabs:', error);
    return { tabs: [], currentTabId: 0 };
  }
}

async function handleSwitchTab(payload: SwitchTabPayload): Promise<{ success: boolean }> {
  try {
    const tab = await chrome.tabs.get(payload.tabId);
    await chrome.tabs.update(payload.tabId, { active: true });
    await chrome.windows.update(tab.windowId, { focused: true });
    return { success: true };
  } catch (error) {
    console.error('Failed to switch tab:', error);
    return { success: false };
  }
}
