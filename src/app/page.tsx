import MoviesGrid from "@/app/server";
import { Suspense } from "react";

export default function HomePage({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query ?? "";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 pt-20">
      <Suspense key={query} fallback={<div>Loading...</div>}>
        <MoviesGrid query={query} />
      </Suspense>
    </main>
  );
}
