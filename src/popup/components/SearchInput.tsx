import { forwardRef } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange }, ref) => {
    return (
      <div className="flex items-center gap-3 px-4 h-[60px] border-b border-[#e0e0e0]">
        {/* Search Icon */}
        <svg
          className="w-5 h-5 text-[#666] flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          ref={ref}
          type="text"
          placeholder="タブを検索... (タイトルまたはURL)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 outline-none text-[16px] text-[#222] placeholder:text-[#666] bg-transparent"
        />

        {value && (
          <button
            onClick={() => onChange('')}
            className="p-1 hover:bg-[#f5f5f5] rounded transition-colors duration-150"
          >
            <svg className="w-4 h-4 text-[#999]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
