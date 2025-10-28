import SuggestionCard from "./SuggestionCard";

export default function Suggestions({ items, criteria }) {
  return (
    <section id="results" className="max-w-6xl mx-auto px-4 pb-16">
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Personalized gift ideas</h2>
          {criteria && (
            <p className="text-sm text-black/60 mt-1">
              Tailored for a {criteria.age}-year-old {criteria.relationship?.toLowerCase()} who loves {criteria.interests?.slice(0,3).join(
                ", "
              )}
              {criteria.interests?.length > 3 ? "…" : ""} within ${criteria.budget?.min}–${criteria.budget?.max}
            </p>
          )}
        </div>
        <p className="text-sm text-black/50">{items.length} matches</p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-black/10 bg-white p-8 text-center text-black/70">
          No suggestions yet. Try adjusting the details above and search again.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((idea, idx) => (
            <SuggestionCard key={idx} idea={idea} />
          ))}
        </div>
      )}
    </section>
  );
}
