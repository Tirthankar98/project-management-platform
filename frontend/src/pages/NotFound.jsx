import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink-50 px-4 text-center dark:bg-ink-950">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cobalt-50 text-cobalt-500 dark:bg-cobalt-900/40 dark:text-cobalt-300">
        <Compass size={26} />
      </div>
      <h1 className="font-display text-6xl font-semibold text-ink-900 dark:text-white">404</h1>
      <p className="mt-3 max-w-sm text-sm text-ink-500 dark:text-ink-400">
        This page doesn&apos;t exist, or may have moved. Let&apos;s get you back on track.
      </p>
      <Link to="/dashboard" className="mt-6">
        <Button>Back to Dashboard</Button>
      </Link>
    </div>
  );
}
