import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="h-[40px] border-t border-[#e0e0e0] flex items-center justify-center px-4">
      <div className="text-[11px] text-[#888] flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 bg-[#f5f5f5] rounded text-[10px]">↑↓</kbd>
          選択
        </span>
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 bg-[#f5f5f5] rounded text-[10px]">Enter</kbd>
          切替
        </span>
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 bg-[#f5f5f5] rounded text-[10px]">Esc</kbd>
          閉じる
        </span>
      </div>
    </div>
  );
};

export default Footer;
