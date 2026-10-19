import React, { useMemo, useState } from "react";
import Navbar from "../components/navbar";
import { ResourceKind } from "../interfaces/savedResource";
import { useSavedResources } from "../context/SavedResources-Context";

const KIND_LABEL: Record<ResourceKind, string> = {
  notes: "Notes",
  pyq: "PYQ",
};

const SavedResources = () => {
  const { items, removeSaved } = useSavedResources();
  const [filter, setFilter] = useState<"all" | ResourceKind>("all");

  const visible = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((item) => item.kind === filter);
  }, [filter, items]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <section className="py-12 flex-grow flex flex-col items-center px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Saved materials
        </h2>
        <p className="text-gray-600 mb-6 text-center max-w-xl">
          Bookmarks stay on this browser so you can reopen notes and PYQs
          without walking through year, stream, and subject again.
        </p>

        <div className="flex gap-3 mb-8">
          {(["all", "notes", "pyq"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === option
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 shadow"
              }`}
            >
              {option === "all" ? "All" : KIND_LABEL[option]}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <div className="text-center text-gray-700 mt-6">
            Nothing saved yet. Open a notes or PYQ list and tap Save.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-screen-lg">
            {visible.map((item) => (
              <div
                key={`${item.kind}-${item.id}`}
                className="bg-white rounded-lg shadow-md flex flex-col items-center p-6"
              >
                <span className="text-xs uppercase tracking-wide text-blue-700 mb-2">
                  {KIND_LABEL[item.kind]}
                  {item.subject ? ` · ${item.subject}` : ""}
                </span>
                <h3 className="text-lg font-semibold text-gray-800 text-center mb-4">
                  {item.title}
                </h3>
                <button
                  type="button"
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 mb-2"
                  onClick={() => window.open(item.contentUrl, "_blank")}
                >
                  Open
                </button>
                <button
                  type="button"
                  className="text-sm text-red-600 hover:text-red-800"
                  onClick={() => removeSaved(item.id, item.kind)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default SavedResources;
