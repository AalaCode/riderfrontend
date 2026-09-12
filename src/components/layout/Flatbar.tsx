import Link from 'next/link';

// 1. Data ka structure (TypeScript Types) define karein
export interface NavItem {
  id: string | number;
  label: string;
  desc: string;
  path: string;
}

interface NavListProps {
  items: NavItem[];
}

// 2. Reusable Component Function
export default function NavList({ items }: NavListProps) {
  return (
    <main className="flex-1 overflow-y-auto p-4 space-y-2 pb-20">
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.path}
          className="flex items-center justify-between p-4 bg-base-100 rounded-xl shadow-sm border border-base-300 hover:bg-base-300 active:scale-[0.98] transition-all cursor-pointer"
        >
          <div>
            <h3 className="font-semibold text-md">{item.label}</h3>
            <p className="text-xs opacity-60 mt-0.5">{item.desc}</p>
          </div>
          
          {/* Arrow Icon */}
          <div className="text-base-content opacity-40">
            <svg
              xmlns="http://w3.org"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </Link>
      ))}
    </main>
  );
}
