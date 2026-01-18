import React from 'react';
import { FOOTER_HEIGHT } from '../constants';

const Footer: React.FC = () => {
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
          切替
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
