export interface TabInfo {
  id: number;
  title: string;
  url: string;
  favIconUrl?: string;
  active: boolean;
  windowId: number;
}

export interface Message {
  type: 'TOGGLE_POPUP' | 'GET_TABS' | 'SWITCH_TAB' | 'CLOSE_POPUP' | 'WEB_SEARCH' | 'OPEN_URL';
  payload?: unknown;
}

export interface WebSearchPayload {
  query: string;
}

export interface OpenUrlPayload {
  url: string;
}

export interface GetTabsResponse {
  tabs: TabInfo[];
  currentTabId: number;
}

export interface SwitchTabPayload {
  tabId: number;
}
