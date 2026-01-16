"use client";

import { useEffect, useState } from "react";

export default function BlogListControls() {
  const [query, setQuery] = useState("");
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(".blog-card")
    );
    setCount(cards.length);
    const q = query.trim().toLowerCase();
    let visible = 0;

    cards.forEach((card) => {
      const title = (card.dataset.title ?? "").toLowerCase();
      const excerpt = (card.dataset.excerpt ?? "").toLowerCase();
      const categories = (card.dataset.categories ?? "").toLowerCase();
      const text = `${title} ${excerpt} ${categories}`;
      const match = q === "" || text.includes(q);
      card.style.display = match ? "" : "none";
      if (match) visible++;
    });

    const noEl = document.getElementById("blog-no-results");
    if (noEl) {
      noEl.style.display = visible === 0 ? "block" : "none";
    }
  }, [query]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold">All Posts</h2>
        {count !== null && (
          <span className="text-sm text-muted-foreground">({count})</span>
        )}
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts by title, excerpt or tags..."
          className="w-full sm:w-80 rounded-md border border-slate-200 px-3 py-2 text-sm bg-white"
        />
        <button
          type="button"
          onClick={() => setQuery("")}
          className="ml-2 text-sm text-muted-foreground hover:underline"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
