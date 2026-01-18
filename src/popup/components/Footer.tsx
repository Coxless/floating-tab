import React from 'react';
import { FOOTER_HEIGHT } from '../constants';
import { detectInputType, type InputType } from '../utils/inputDetection';

interface FooterProps {
  hasItems: boolean;
  searchQuery: string;
}

const Footer: React.FC<FooterProps> = ({ hasItems, searchQuery }) => {
  const getEnterLabel = (): string => {
    if (hasItems) {
      return '切替';
    }
    const query = searchQuery.trim();
    if (!query) {
      return '切替';
    }
    const inputType: InputType = detectInputType(query);
    return inputType === 'url' ? 'URL を開く' : 'Web 検索';
  };

  return (
    <div
      className="border-t border-border flex items-center justify-center px-4"
      style={{ height: FOOTER_HEIGHT }}
    >
      <div className="text-[11px] text-text-subtle flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 bg-bg-secondary rounded text-[10px]">↑↓</kbd>
          選択
        </span>
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 bg-bg-secondary rounded text-[10px]">Enter</kbd>
          {getEnterLabel()}
        </span>
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 bg-bg-secondary rounded text-[10px]">Esc</kbd>
          閉じる
        </span>
      </div>
    </div>
  );
};

export default Footer;
