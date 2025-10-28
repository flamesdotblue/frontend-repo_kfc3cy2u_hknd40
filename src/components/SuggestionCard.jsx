import { Gift, Star } from "lucide-react";

export default function SuggestionCard({ idea }) {
  return (
    <div className="group rounded-xl border border-black/10 bg-white shadow-sm hover:shadow-md transition overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white">
              <Gift className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold leading-tight">{idea.title}</h3>
              <p className="text-xs text-black/50 mt-0.5">
                {idea.type} • ${idea.estimate}
              </p>
            </div>
          </div>
          {idea.rating && (
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="h-4 w-4 fill-yellow-500" />
              <span className="text-sm font-medium">{idea.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        <p className="text-sm text-black/70 mt-3">{idea.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {idea.tags?.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-full text-xs bg-black/5 text-black/70"
            >
              {t}
            </span>
          ))}
        </div>

        {idea.link && (
          <div className="mt-4">
            <a
              href={idea.link}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-purple-700 hover:text-purple-800"
            >
              Explore option →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
