import { useMemo, useState } from "react";
import { Search, Heart, Wallet } from "lucide-react";

const OCCASIONS = [
  "Birthday",
  "Anniversary",
  "Graduation",
  "Holiday",
  "Thank You",
  "Just Because",
];

const RELATIONSHIPS = [
  "Partner",
  "Friend",
  "Parent",
  "Child",
  "Sibling",
  "Colleague",
];

const INTERESTS = [
  "Tech",
  "Cooking",
  "Fitness",
  "Art",
  "Music",
  "Books",
  "Outdoors",
  "Gaming",
  "Fashion",
  "Travel",
];

const PREFERENCES = [
  { key: "personalized", label: "Personalized" },
  { key: "practical", label: "Practical" },
  { key: "luxury", label: "Luxury" },
  { key: "experience", label: "Experience" },
];

export default function GiftForm({ onSearch }) {
  const [occasion, setOccasion] = useState("Birthday");
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState("Unspecified");
  const [relationship, setRelationship] = useState("Friend");
  const [selectedInterests, setSelectedInterests] = useState(["Tech"]);
  const [budgetMin, setBudgetMin] = useState(25);
  const [budgetMax, setBudgetMax] = useState(100);
  const [preferences, setPreferences] = useState(["practical"]);

  const interestChips = useMemo(() => INTERESTS, []);

  const toggleInterest = (item) => {
    setSelectedInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const togglePreference = (key) => {
    setPreferences((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      occasion,
      age: Number(age),
      gender,
      relationship,
      interests: selectedInterests,
      budget: { min: Number(budgetMin), max: Number(budgetMax) },
      preferences,
    };
    onSearch?.(payload);
    const anchor = document.getElementById("results");
    if (anchor) anchor.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="form" className="max-w-6xl mx-auto px-4 py-10">
      <div className="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
        <div className="p-6 border-b border-black/5 bg-gradient-to-r from-pink-50 to-purple-50">
          <h2 className="text-xl font-semibold">Tell us about the recipient</h2>
          <p className="text-sm text-black/60 mt-1">
            Share a few details and we’ll curate spot-on gift ideas.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Occasion</label>
              <select
                className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500/30"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
              >
                {OCCASIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Age</label>
                <input
                  type="number"
                  min={0}
                  className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500/30"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Gender</label>
                <select
                  className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500/30"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  {[
                    "Unspecified",
                    "Female",
                    "Male",
                    "Non-binary",
                    "Prefer not to say",
                  ].map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Relationship</label>
              <select
                className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500/30"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
              >
                {RELATIONSHIPS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Interests</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {interestChips.map((item) => {
                  const active = selectedInterests.includes(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => toggleInterest(item)}
                      className={`px-3 py-1.5 rounded-full text-sm border transition flex items-center gap-1.5 ${
                        active
                          ? "bg-pink-600 text-white border-pink-600"
                          : "bg-white text-black/80 border-black/10 hover:border-black/20"
                      }`}
                    >
                      <Heart
                        className={`h-4 w-4 ${active ? "opacity-100" : "opacity-60"}`}
                      />
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Budget range ($)</label>
              <div className="mt-2 grid grid-cols-2 gap-3 items-center">
                <div className="relative">
                  <Wallet className="h-4 w-4 text-black/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min={0}
                    className="w-full rounded-lg border border-black/10 pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500/30"
                    value={budgetMin}
                    onChange={(e) => setBudgetMin(e.target.value)}
                    placeholder="Min"
                  />
                </div>
                <div className="relative">
                  <Wallet className="h-4 w-4 text-black/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min={0}
                    className="w-full rounded-lg border border-black/10 pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500/30"
                    value={budgetMax}
                    onChange={(e) => setBudgetMax(e.target.value)}
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Gift preferences</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {PREFERENCES.map((p) => {
                  const active = preferences.includes(p.key);
                  return (
                    <button
                      type="button"
                      key={p.key}
                      onClick={() => togglePreference(p.key)}
                      className={`px-3 py-1.5 rounded-full text-sm border transition ${
                        active
                          ? "bg-purple-600 text-white border-purple-600"
                          : "bg-white text-black/80 border-black/10 hover:border-black/20"
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="md:col-span-2 flex items-center justify-between pt-2">
            <p className="text-sm text-black/60">
              We’ll match ideas to their interests, occasion, style and budget.
            </p>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white font-medium hover:bg-black/90 transition"
            >
              <Search className="h-4 w-4" /> Find gifts
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
