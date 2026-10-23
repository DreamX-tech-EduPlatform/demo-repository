import Link from 'next/link';
import { buttonVariants } from '@dreamx-tech-eduplatform/ui';

export default function StudentPortalPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 p-4 dark:bg-gray-950">
      <h1 className="text-2xl font-bold text-brand-700 dark:text-brand-400">Signed in (placeholder portal)</h1>
      <Link href="/student-login" className={buttonVariants({ variant: 'primary' })}>
        Sign out
      </Link>
    </main>
  );
}
