"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Something went wrong</h2>
      <p className="text-sm text-gray-500">{error.digest}</p>
      <button
        onClick={() => reset()}
        className="mt-2 rounded cursor-pointer bg-black px-3 py-1 text-white"
      >
        Try again
      </button>
    </div>
  );
}