'use client';

// Ported from PCA-Dashboard/src/pages/StudentLogin.tsx.
// Every button on this page comes from the shared @dreamx-tech-eduplatform/ui package.
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Eye, EyeOff, Lock, LogIn, Moon, Sun, User as UserIcon } from 'lucide-react';
import { Button, IconButton, buttonVariants } from '@dreamx-tech-eduplatform/ui';
import { loginStudent } from '@/lib/mock-auth';

export default function StudentLoginPage() {
  const router = useRouter();
  const [pcaid, setPcaid] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Read the saved theme after mount to avoid a server/client mismatch.
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(stored === 'dark' || (!stored && prefersDark) ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!pcaid.trim() || !password.trim()) {
      setError('Please enter both PCA ID and password');
      return;
    }

    setIsLoading(true);
    try {
      const res = await loginStudent(pcaid.trim(), password.trim());
      if (res.success) {
        router.push('/student-portal');
      } else {
        setError(res.error || 'Invalid PCA ID or password');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 transition-colors duration-200 dark:bg-gray-950">
      {/* Theme toggle: shared IconButton, secondary variant */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <IconButton
          variant="secondary"
          aria-label="Toggle theme"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          icon={theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
        />
      </div>

      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Logo.png" alt="Physics Cube Academy" className="mb-3 max-h-[150px] w-auto object-contain" />
          <h2 className="text-2xl font-bold tracking-tight text-brand-700 dark:text-brand-400">
            Physics Cube Academy
          </h2>
          <p className="mt-0.5 text-base tracking-wide text-gray-500 dark:text-gray-400">Student Portal Login</p>
        </div>

        <div className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-brand-900/5 transition-colors md:p-8 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="pcaid" className="ml-0.5 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Username (PCA ID)
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <UserIcon size={18} />
                </div>
                <input
                  id="pcaid"
                  type="text"
                  value={pcaid}
                  onChange={(e) => setPcaid(e.target.value.toUpperCase())}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pr-4 pl-10 font-mono text-sm font-bold text-gray-800 uppercase transition-all focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="e.g. BPM2701001"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="ml-0.5 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pr-12 pl-10 text-sm font-medium text-gray-800 transition-all focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="Enter your password"
                  required
                />
                {/* Show/hide password: shared IconButton, ghost (transparent) variant */}
                <IconButton
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((s) => !s)}
                  icon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  className="absolute inset-y-0 right-1 my-auto h-8 w-8"
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">
                {error}
              </p>
            )}

            {/* Submit: shared Button, primary (coloured) variant with loading state */}
            <Button
              type="submit"
              fullWidth
              loading={isLoading}
              leftIcon={<LogIn size={18} />}
              className="mt-4 font-bold"
            >
              Login
            </Button>
          </form>

          <div className="border-t border-gray-100 pt-4 text-center dark:border-gray-800">
            {/* Next.js Link styled with the shared buttonVariants helper */}
            <Link href="/register" className={buttonVariants({ variant: 'link', size: 'sm' })}>
              <span>New Registration</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Physics Cube Academy &bull; Student Portal
        </div>
      </div>
    </div>
  );
}
