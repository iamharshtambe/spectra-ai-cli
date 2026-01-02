'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();

  console.log(data);

  if (isPending) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (!data?.session && !data?.user) {
    router.push('/register');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 font-sans">
      <div className="w-full max-w-md">
        <div className="space-y-6">
          {/* Profile Header Card */}
          <div className="group relative overflow-hidden rounded-2xl border-2 border-dashed border-zinc-700 bg-zinc-900/50 p-8 backdrop-blur-sm transition-all hover:border-zinc-600 hover:shadow-lg hover:shadow-indigo-500/10">
            {/* Avatar */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-full bg-linear-to-tr from-indigo-500/20 to-purple-500/20 blur-xl"></div>
                <img
                  src={data?.user?.image || '/vercel.svg'}
                  alt={data?.user?.name || 'User'}
                  width={120}
                  height={120}
                  className="relative rounded-full border-4 border-zinc-800 object-cover shadow-2xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute -bottom-2 -right-2 h-7 w-7 rounded-full border-4 border-zinc-900 bg-emerald-500 shadow-lg">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="space-y-2 text-center">
              <h1 className="bg-linear-to-r from-zinc-50 via-zinc-100 to-zinc-50 bg-clip-text text-3xl font-bold text-transparent">
                Welcome, {data?.user?.name || 'User'}
              </h1>
              <div className="inline-flex items-center gap-2 rounded-full bg-zinc-800/50 px-3 py-1">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                <p className="text-xs font-medium text-zinc-400">
                  Authenticated User
                </p>
              </div>
            </div>
          </div>

          {/* User Details Card */}
          <div className="space-y-4 rounded-2xl border-2 border-dashed border-zinc-700 bg-zinc-900/50 p-6 backdrop-blur-sm transition-all hover:border-zinc-600">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-indigo-500"></div>
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Email Address
                </p>
              </div>
              <p className="break-all text-lg font-medium text-zinc-100">
                {data?.user?.email}
              </p>
            </div>
          </div>

          {/* Sign Out Button */}
          <Button
            onClick={() =>
              authClient.signOut({
                fetchOptions: {
                  onError: (ctx) => console.log(ctx),
                  onSuccess: () => router.push('/sign-in'),
                },
              })
            }
            className="group relative h-12 w-full overflow-hidden rounded-xl bg-red-600 font-semibold text-white shadow-lg shadow-red-600/20 transition-all hover:bg-red-700 hover:shadow-xl hover:shadow-red-600/30"
          >
            <span className="relative z-10">Sign Out</span>
            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full"></div>
          </Button>

          {/* Decorative divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 border-t border-dashed border-zinc-700"></div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></div>
              <span className="text-xs font-medium text-zinc-600">
                Session Active
              </span>
            </div>
            <div className="h-px flex-1 border-t border-dashed border-zinc-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
