import { Gift, Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-black/5">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-sm">
            <Gift className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight">GiftGenie</p>
            <p className="text-xs text-black/50 -mt-1 flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-yellow-500" />
              Find the perfect present in minutes
            </p>
          </div>
        </div>
        <a
          href="#form"
          className="px-3.5 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-black/90 transition"
        >
          Get Started
        </a>
      </div>
    </header>
  );
}
