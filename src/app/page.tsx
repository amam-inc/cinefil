import Search from "@/app/client";
import MoviesGrid from "@/app/server";
import { Suspense } from "react";

export default function HomePage({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query ?? "";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] p-4 text-white">
      <Search placeholder={"Search movies..."} />

      <Suspense key={query} fallback={<div>Loading...</div>}>
        <MoviesGrid query={query} />
      </Suspense>
    </main>
  );
}
