import { useMemo, useState } from "react";
import Header from "./components/Header";
import GiftForm from "./components/GiftForm";
import Suggestions from "./components/Suggestions";

function scoreIdea(idea, criteria) {
  let score = 0;
  // Budget fit
  if (
    idea.estimate >= criteria.budget.min &&
    idea.estimate <= criteria.budget.max
  ) {
    score += 2;
  } else {
    // penalize if outside budget
    score -= 2;
  }
  // Interest overlap
  const overlap = idea.tags.filter((t) => criteria.interests.includes(t)).length;
  score += overlap * 2;
  // Preference alignment
  if (criteria.preferences?.includes(idea.preference)) score += 2;
  // Occasion match
  if (!idea.occasions || idea.occasions.includes(criteria.occasion)) score += 1;
  // Relationship gentle nudge
  if (!idea.relationships || idea.relationships.includes(criteria.relationship))
    score += 1;
  // Age suitability (broad buckets)
  if (idea.ageRange) {
    const a = criteria.age;
    if (a >= idea.ageRange[0] && a <= idea.ageRange[1]) score += 1;
  }
  return score;
}

function generateSuggestions(criteria) {
  const CATALOG = [
    {
      title: "Customized Name Necklace",
      description: "Elegant personalized necklace with their name or initials.",
      estimate: 55,
      type: "Personalized jewelry",
      preference: "personalized",
      tags: ["Fashion"],
      occasions: ["Birthday", "Anniversary"],
      relationships: ["Partner", "Friend", "Sibling"],
      rating: 4.7,
    },
    {
      title: "Smart Home Speaker",
      description:
        "Voice assistant speaker for music, smart home control and routines.",
      estimate: 99,
      type: "Tech gadget",
      preference: "practical",
      tags: ["Tech", "Music"],
      occasions: ["Birthday", "Holiday"],
      rating: 4.6,
    },
    {
      title: "Gourmet Cooking Class",
      description:
        "Hands-on experience with a local chef—perfect for food lovers.",
      estimate: 120,
      type: "Experience",
      preference: "experience",
      tags: ["Cooking", "Experience"],
      occasions: ["Anniversary", "Birthday", "Graduation"],
      rating: 4.8,
    },
    {
      title: "Kindle E‑Reader",
      description: "Lightweight e-reader with weeks of battery for book lovers.",
      estimate: 139,
      type: "Tech",
      preference: "practical",
      tags: ["Books", "Tech", "Travel"],
      occasions: ["Birthday", "Graduation", "Holiday"],
      rating: 4.7,
    },
    {
      title: "Spa Day Gift Card",
      description: "Relaxing massage and spa experience for ultimate pampering.",
      estimate: 150,
      type: "Experience",
      preference: "luxury",
      tags: ["Experience"],
      occasions: ["Anniversary", "Birthday"],
      relationships: ["Partner", "Parent"],
      rating: 4.5,
    },
    {
      title: "Fitness Resistance Bands Set",
      description: "Compact workout set for strength training at home or on the go.",
      estimate: 30,
      type: "Fitness",
      preference: "practical",
      tags: ["Fitness"],
      occasions: ["Just Because", "Thank You", "Birthday"],
      rating: 4.4,
    },
    {
      title: "Artisanal Coffee Subscription",
      description: "Monthly delivery of small‑batch, single origin coffees.",
      estimate: 25,
      type: "Subscription",
      preference: "practical",
      tags: ["Cooking"],
      occasions: ["Thank You", "Holiday"],
      rating: 4.6,
    },
    {
      title: "Custom Star Map Print",
      description:
        "Beautiful print of the night sky from a meaningful date and place.",
      estimate: 65,
      type: "Personalized art",
      preference: "personalized",
      tags: ["Art", "Home"],
      occasions: ["Anniversary", "Birthday"],
      relationships: ["Partner"],
      rating: 4.7,
    },
    {
      title: "Portable Bluetooth Speaker",
      description: "Waterproof compact speaker for music anywhere.",
      estimate: 49,
      type: "Tech",
      preference: "practical",
      tags: ["Music", "Outdoors", "Travel"],
      rating: 4.5,
    },
    {
      title: "Premium Leather Wallet",
      description: "Minimal, durable wallet that ages beautifully.",
      estimate: 80,
      type: "Accessory",
      preference: "luxury",
      tags: ["Fashion"],
      rating: 4.6,
    },
    {
      title: "Board Game Night Bundle",
      description: "Modern party games that are easy to learn and fun with friends.",
      estimate: 60,
      type: "Games",
      preference: "experience",
      tags: ["Gaming", "Outdoors"],
      relationships: ["Friend", "Sibling", "Colleague"],
      rating: 4.5,
    },
    {
      title: "Hiking Day Pack",
      description:
        "Lightweight backpack with hydration sleeve for trail adventures.",
      estimate: 70,
      type: "Outdoors",
      preference: "practical",
      tags: ["Outdoors", "Travel", "Fitness"],
      rating: 4.4,
    },
    {
      title: "Noise‑Cancelling Headphones",
      description: "Immersive sound and focus—great for work and travel.",
      estimate: 199,
      type: "Tech",
      preference: "luxury",
      tags: ["Tech", "Music", "Travel"],
      rating: 4.8,
    },
    {
      title: "Watercolor Starter Kit",
      description: "Artist‑grade paints, brushes, and paper for creative flow.",
      estimate: 45,
      type: "Art",
      preference: "personalized",
      tags: ["Art"],
      rating: 4.3,
    },
    {
      title: "Gourmet Meal Kit Box",
      description: "Chef‑crafted meal kits to cook impressive dinners at home.",
      estimate: 75,
      type: "Cooking",
      preference: "experience",
      tags: ["Cooking"],
      rating: 4.4,
    },
  ];

  // Score and filter
  const scored = CATALOG.map((idea) => ({ idea, score: scoreIdea(idea, criteria) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 9)
    .map((s) => s.idea);

  return scored;
}

function App() {
  const [criteria, setCriteria] = useState(null);
  const suggestions = useMemo(() => (criteria ? generateSuggestions(criteria) : []), [criteria]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50 to-purple-50 text-black">
      <Header />

      <main>
        <section className="max-w-6xl mx-auto px-4 pt-12 pb-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Find the ideal gift with a few simple inputs
            </h1>
            <p className="mt-3 text-black/60 max-w-2xl mx-auto">
              Share the occasion, who it’s for, their interests and budget. We’ll match curated ideas—personalized, practical, luxury or experiences.
            </p>
          </div>
        </section>

        <GiftForm onSearch={setCriteria} />
        <Suggestions items={suggestions} criteria={criteria} />
      </main>

      <footer className="border-t border-black/5 py-8 text-center text-sm text-black/60">
        Crafted with care • GiftGenie
      </footer>
    </div>
  );
}

export default App;
