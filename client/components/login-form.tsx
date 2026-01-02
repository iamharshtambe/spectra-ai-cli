'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { authClient } from '@/lib/auth-client';
import { useState } from 'react';

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  async function login() {
    setIsLoading(true);

    await authClient.signIn.social({
      provider: 'github',
      callbackURL: 'http://localhost:3000',
    });

    setIsLoading(false);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-4">
      <div className="flex flex-col items-center justify-center space-y-6 text-center">
        <div className="relative">
          <Image
            src="/spectra-img.png"
            alt="Orbital CLI"
            height={450}
            width={450}
            className="drop-shadow-2xl"
            priority
          />
        </div>
        <div className="space-y-3">
          <h1 className="bg-linear-to-r from-indigo-400 via-purple-400 to-indigo-500 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl">
            Welcome Back to Spectra AI CLI
          </h1>
          <p className="text-lg text-zinc-400">
            Login to your account to enable device flow authentication
          </p>
        </div>
      </div>

      <Card className="w-full max-w-md border-2 border-dashed border-zinc-700 bg-zinc-900/50 backdrop-blur-sm">
        <CardContent>
          <Button
            variant="outline"
            className="group relative h-12 w-full overflow-hidden border-zinc-700 bg-zinc-800/50 transition-all hover:bg-zinc-800 hover:shadow-lg hover:shadow-indigo-500/20"
            type="button"
            onClick={login}
            disabled={isLoading}
          >
            <div className="flex items-center justify-center gap-3">
              <Image
                src="/github.svg"
                alt="GitHub"
                height={20}
                width={20}
                className="size-5 transition-transform group-hover:scale-110 dark:invert"
              />
              <span className="font-semibold">
                {isLoading ? 'Connecting...' : 'Continue with GitHub'}
              </span>
            </div>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
