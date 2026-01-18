import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { TabInfo, Message, GetTabsResponse, SwitchTabPayload, WebSearchPayload, OpenUrlPayload } from '../types';
import { useTabSearch } from './hooks/useTabSearch';
import { useKeyboardNav } from './hooks/useKeyboardNav';
import { detectInputType, normalizeUrl } from './utils/inputDetection';
import SearchInput from './components/SearchInput';
import TabList from './components/TabList';
import EmptyState from './components/EmptyState';
import Footer from './components/Footer';
import { MODAL_WIDTH, MODAL_MIN_WIDTH, MODAL_MAX_HEIGHT } from './constants';

interface AppProps {
  onClose: () => void;
}

const App: React.FC<AppProps> = ({ onClose }) => {
  const [tabs, setTabs] = useState<TabInfo[]>([]);
  const [currentTabId, setCurrentTabId] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredTabs = useTabSearch(tabs, searchQuery);

  // Fetch tabs on mount
  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const response = await chrome.runtime.sendMessage<Message, GetTabsResponse>({
          type: 'GET_TABS',
        });
        if (response) {
          setTabs(response.tabs);
          setCurrentTabId(response.currentTabId);
        }
      } catch (error) {
        console.error('Failed to fetch tabs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTabs();
  }, []);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Reset selection when search query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  const handleTabSelect = useCallback(
    async (tabId: number) => {
      try {
        await chrome.runtime.sendMessage<Message>({
          type: 'SWITCH_TAB',
          payload: { tabId } as SwitchTabPayload,
        });
        onClose();
      } catch (error) {
        console.error('Failed to switch tab:', error);
      }
    },
    [onClose]
  );

  const handleEnter = useCallback(() => {
    const selectedTab = filteredTabs[selectedIndex];
    if (selectedTab) {
      handleTabSelect(selectedTab.id);
    }
  }, [filteredTabs, selectedIndex, handleTabSelect]);

  const handleEnterEmpty = useCallback(async () => {
    const query = searchQuery.trim();
    if (!query) return;

    try {
      const inputType = detectInputType(query);
      if (inputType === 'url') {
        await chrome.runtime.sendMessage<Message>({
          type: 'OPEN_URL',
          payload: { url: normalizeUrl(query) } as OpenUrlPayload,
        });
      } else {
        await chrome.runtime.sendMessage<Message>({
          type: 'WEB_SEARCH',
          payload: { query } as WebSearchPayload,
        });
      }
      onClose();
    } catch (error) {
      console.error('Failed to perform action:', error);
    }
  }, [searchQuery, onClose]);

  useKeyboardNav({
    itemCount: filteredTabs.length,
    selectedIndex,
    onSelectedIndexChange: setSelectedIndex,
    onEnter: handleEnter,
    onEnterEmpty: handleEnterEmpty,
    onEscape: onClose,
    enabled: true,
  });

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      onClick={handleOverlayClick}
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-overlay" />

      {/* Modal */}
      <div
        className="relative bg-bg-primary rounded-xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ width: MODAL_WIDTH, minWidth: MODAL_MIN_WIDTH, maxHeight: MODAL_MAX_HEIGHT }}
      >
        <SearchInput ref={inputRef} value={searchQuery} onChange={setSearchQuery} />

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-[14px] text-text-secondary">読み込み中...</div>
          </div>
        ) : filteredTabs.length === 0 ? (
          <EmptyState searchQuery={searchQuery} />
        ) : (
          <TabList
            tabs={filteredTabs}
            selectedIndex={selectedIndex}
            currentTabId={currentTabId}
            onTabSelect={handleTabSelect}
            onSelectedIndexChange={setSelectedIndex}
          />
        )}

        <Footer hasItems={filteredTabs.length > 0} searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default App;
