import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import SearchClient from './SearchClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Search Threads | GTM Council',
};

export default async function SearchPage() {
  const session = await getSession();
  if (!session) redirect('/members/login?from=/search');

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-[#011224] mb-1">Search Threads</h1>
        <p className="text-sm text-gray-500 mb-6">
          Ask a question or describe a topic to find relevant Slack discussions.
        </p>
        <SearchClient />
      </div>
    </div>
  );
}
