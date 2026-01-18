import type React from "react";
import { detectInputType } from "../utils/inputDetection";

interface EmptyStateProps {
  searchQuery: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ searchQuery }) => {
  const query = searchQuery.trim();
  const inputType = query ? detectInputType(query) : null;

  const getHintText = () => {
    if (!query) {
      return "別のキーワードで検索してみてください";
    }
    if (inputType === "url") {
      return "Enter を押して URL を開く";
    }
    return `Enter を押して「${query}」を検索`;
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 rounded-full bg-bg-secondary flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <p className="text-[16px] text-text-primary mb-2">タブが見つかりません</p>
      <p className="text-[12px] text-text-muted">{getHintText()}</p>
    </div>
  );
};

export default EmptyState;
