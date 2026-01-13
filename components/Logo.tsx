'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';

export default function Logo() {
  return (
    <Link href="/home" className="flex items-center gap-2 group transition-all">
      <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-blue-200">
        <Home className="text-white" size={24} />
      </div>
      <span className="text-2xl font-black text-gray-900 tracking-tighter italic">
        Bhara <span className="text-blue-600">Chai?</span>
      </span>
    </Link>
  );
}