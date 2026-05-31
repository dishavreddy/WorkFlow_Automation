import React from 'react';
import { Item } from '../lib/mockData';

export function ItemCard({ item, onOpen }: { item: Item; onOpen?: () => void }) {
  return (
    <div className="bg-[#1A1D2E] border border-[#252840] rounded-2xl p-5 hover:shadow-[0_0_20px_rgba(79,110,247,0.15)] transition-all group relative">
      <button
        type="button"
        aria-label={`Open ${item.title}`}
        onClick={onOpen}
        className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-lg text-[#8B8FA8] transition-colors hover:bg-[#141720] hover:text-[#F0F0F0] disabled:pointer-events-none"
        disabled={!onOpen}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6h8v8M18 6L6 18" />
        </svg>
      </button>
      <h4 className="font-semibold text-lg text-[#F0F0F0] mb-1 pr-8">{item.title}</h4>
      <p className="text-sm text-[#8B8FA8] mb-4">{item.subtitle}</p>
      <div className="flex justify-between items-center text-xs font-medium text-[#8B8FA8]">
        <span>{item.timestamp}</span>
        <span className="text-[#4F6EF7]">{item.status}</span>
      </div>
    </div>
  );
}
