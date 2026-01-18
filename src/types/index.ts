export interface TabInfo {
  id: number;
  title: string;
  url: string;
  favIconUrl?: string;
  active: boolean;
  windowId: number;
}

export interface Message {
  type: 'TOGGLE_POPUP' | 'GET_TABS' | 'SWITCH_TAB' | 'CLOSE_POPUP';
  payload?: unknown;
}
