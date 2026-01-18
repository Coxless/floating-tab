import React, { useState } from 'react';
import type { TabInfo } from '../../types';
import { TAB_ITEM_HEIGHT } from '../constants';

interface TabItemProps {
  tab: TabInfo;
  isSelected: boolean;
  isCurrentTab: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
}

const FallbackIcon: React.FC = () => (
  <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
    />
  </svg>
);

const TabItem: React.FC<TabItemProps> = ({
  tab,
  isSelected,
  isCurrentTab,
  onClick,
  onMouseEnter,
}) => {
  const [faviconError, setFaviconError] = useState(false);

  return (
    <div
      className={`
        flex items-center gap-3 px-4 cursor-pointer transition-all duration-150
        ${
          isSelected
            ? 'bg-primary-light border-l-[3px] border-l-primary'
            : 'bg-bg-primary border-l-[3px] border-l-transparent hover:bg-bg-secondary'
        }
      `}
      style={{ height: TAB_ITEM_HEIGHT }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      {/* Favicon */}
      <div className="flex-shrink-0 w-4 h-4">
        {tab.favIconUrl && !faviconError ? (
          <img
            src={tab.favIconUrl}
            alt=""
            className="w-full h-full"
            onError={() => setFaviconError(true)}
          />
        ) : (
          <FallbackIcon />
        )}
      </div>

      {/* Title and URL */}
      <div className="flex-1 min-w-0">
        <div className="text-[15px] font-medium text-text-primary truncate">{tab.title}</div>
        <div className="text-[12px] text-text-muted truncate">{tab.url}</div>
      </div>

      {/* Current Tab Badge */}
      {isCurrentTab && (
        <div className="flex-shrink-0 px-2 py-1 bg-bg-badge rounded text-[11px] text-text-secondary">
          現在
        </div>
      )}
    </div>
  );
};

export default TabItem;
