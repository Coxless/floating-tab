import type React from "react";
import { useEffect, useRef } from "react";
import type { TabInfo } from "../../types";
import { TAB_LIST_MAX_HEIGHT } from "../constants";
import TabItem from "./TabItem";

interface TabListProps {
  tabs: TabInfo[];
  selectedIndex: number;
  currentTabId: number;
  onTabSelect: (tabId: number) => void;
  onSelectedIndexChange: (index: number) => void;
}

const TabList: React.FC<TabListProps> = ({
  tabs,
  selectedIndex,
  currentTabId,
  onTabSelect,
  onSelectedIndexChange,
}) => {
  const listRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to selected item
  useEffect(() => {
    if (listRef.current) {
      const selectedElement = listRef.current.children[
        selectedIndex
      ] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [selectedIndex]);

  return (
    <div
      ref={listRef}
      className="flex-1 overflow-y-auto"
      style={{ maxHeight: TAB_LIST_MAX_HEIGHT }}
    >
      {tabs.map((tab, index) => (
        <TabItem
          key={tab.id}
          tab={tab}
          isSelected={index === selectedIndex}
          isCurrentTab={tab.id === currentTabId}
          onClick={() => onTabSelect(tab.id)}
          onMouseEnter={() => onSelectedIndexChange(index)}
        />
      ))}
    </div>
  );
};

export default TabList;
