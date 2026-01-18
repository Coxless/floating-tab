import { useMemo } from 'react';
import type { TabInfo } from '../../types';

export function useTabSearch(tabs: TabInfo[], searchQuery: string): TabInfo[] {
  return useMemo(() => {
    if (!searchQuery.trim()) {
      return tabs;
    }

    const query = searchQuery.toLowerCase();
    return tabs.filter(
      (tab) =>
        tab.title.toLowerCase().includes(query) || tab.url.toLowerCase().includes(query)
    );
  }, [tabs, searchQuery]);
}
