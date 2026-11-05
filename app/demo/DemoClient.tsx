"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { DemoSubmission } from "@/lib/airtable";

// ── Voting window ─────────────────────────────────────────────────────────────
const VOTING_START = new Date("2026-01-01T00:00:00Z");
const VOTING_END   = new Date("2099-12-31T23:59:59Z");

type Filter = { target: string; publicStatus: string };

interface Props {
  submissions: DemoSubmission[];
  initialVoteCounts: Record<string, number>;
  initialEmail: string | null;
}

// ── Auth Modal ────────────────────────────────────────────────────────────────
function AuthModal({
  onSuccess,
  onClose,
}: {
  onSuccess: (email: string) => void;
  onClose: () => void;
}) {
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/demo-auth/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Something went wrong."); return; }
      setStep("code");
    } finally {
      setLoading(false);
    }
  }

  async function handleCodeSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/demo-auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Something went wrong."); return; }
      onSuccess(data.email ?? email);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(1,18,36,0.85)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl p-8"
        style={{ background: "#0a2240", border: "1px solid #c4921a44" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 text-xl leading-none"
        >
          ×
        </button>

        <div className="mb-6 text-center">
          <div className="text-sm font-bold mb-1" style={{ color: "#c4921a" }}>GTM Council</div>
          <h2 className="text-xl font-extrabold text-white">Verify to vote</h2>
          <p className="text-sm text-gray-400 mt-1">
            {step === "email"
              ? "Enter your email to get a one-time code."
              : `Enter the 6-digit code sent to ${email}`}
          </p>
        </div>

        {step === "email" ? (
          <form onSubmit={handleEmailSubmit} className="space-y-3">
            <input
              type="email"
              required
              autoFocus
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none"
              style={{ background: "#011224", border: "1px solid #c4921a55" }}
            />
            {error && <p className="text-red-400 text-xs">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-bold text-sm transition-opacity disabled:opacity-60"
              style={{ background: "#c4921a", color: "#011224" }}
            >
              {loading ? "Sending…" : "Send code"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleCodeSubmit} className="space-y-3">
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              required
              autoFocus
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              className="w-full rounded-lg px-4 py-3 text-2xl font-bold tracking-widest text-center text-white placeholder-gray-600 focus:outline-none"
              style={{ background: "#011224", border: "1px solid #c4921a55" }}
            />
            {error && <p className="text-red-400 text-xs text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-bold text-sm transition-opacity disabled:opacity-60"
              style={{ background: "#c4921a", color: "#011224" }}
            >
              {loading ? "Verifying…" : "Verify & vote"}
            </button>
            <button
              type="button"
              onClick={() => { setStep("email"); setCode(""); setError(""); }}
              className="w-full text-xs text-gray-500 hover:text-gray-300 py-1"
            >
              Use a different email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ── Submission Card ───────────────────────────────────────────────────────────
function SubmissionCard({
  submission,
  rank,
  votes,
  hasVotedToday,
  votingStatus,
  onVote,
}: {
  submission: DemoSubmission;
  rank: number;
  votes: number;
  hasVotedToday: boolean;
  votingStatus: "open" | "closed" | "upcoming";
  onVote: (id: string) => void;
}) {
  const [bumped, setBumped] = useState(false);

  function handleVote() {
    setBumped(true);
    setTimeout(() => setBumped(false), 600);
    onVote(submission.id);
  }

  const targetColors: Record<string, string> = {
    RevOps: "#2563eb",
    Marketing: "#7c3aed",
    Sales: "#059669",
    Other: "#6b7280",
  };

  const statusBadge: Record<string, { bg: string; text: string; label: string }> = {
    "Not Yet Public - Priority Listing": { bg: "#7c3aed22", text: "#a78bfa", label: "Coming Soon" },
    "Released < 90 Days Ago": { bg: "#c4921a22", text: "#c4921a", label: "New" },
    "Released > 90 Days Ago": { bg: "#05966922", text: "#34d399", label: "Available" },
  };

  const badge = statusBadge[submission.publicStatus] ?? { bg: "#ffffff11", text: "#9ca3af", label: submission.publicStatus };

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: "#0a2240",
        border: "1px solid #c4921a22",
        transition: "transform 300ms ease, box-shadow 300ms ease",
        transform: bumped ? "scale(1.02)" : "scale(1)",
        boxShadow: bumped ? "0 0 24px #c4921a44" : "none",
      }}
    >
      {/* Video */}
      <div className="relative aspect-video bg-black">
        <span
          className="absolute top-3 left-3 z-10 text-xs font-extrabold px-2 py-0.5 rounded"
          style={{ background: "#c4921a", color: "#011224" }}
        >
          #{rank}
        </span>
        {submission.embedUrl ? (
          <iframe
            src={submission.embedUrl}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
            title={submission.name}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-600 text-sm">No video</span>
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-white text-base">{submission.name}</h3>
            {submission.highlight && (
              <p className="text-gray-400 text-sm mt-0.5 leading-snug">{submission.highlight}</p>
            )}
          </div>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0"
            style={{ background: badge.bg, color: badge.text }}
          >
            {badge.label}
          </span>
        </div>

        {submission.target.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {submission.target.map((t) => (
              <span
                key={t}
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{
                  background: `${targetColors[t] ?? "#6b7280"}22`,
                  color: targetColors[t] ?? "#9ca3af",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Vote row */}
        <div className="flex items-center justify-between mt-auto pt-1">
          <span className="text-sm font-bold" style={{ color: "#c4921a" }}>
            ▲ {votes} vote{votes !== 1 ? "s" : ""}
          </span>

          {votingStatus === "open" ? (
            hasVotedToday ? (
              <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                ✓ Voted today
              </span>
            ) : (
              <button
                onClick={handleVote}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-bold transition-opacity hover:opacity-90"
                style={{ background: "#c4921a", color: "#011224" }}
              >
                ▲ Vote
              </button>
            )
          ) : votingStatus === "upcoming" ? (
            <span className="text-xs text-gray-500">Voting opens {VOTING_START.toLocaleDateString()}</span>
          ) : (
            <span className="text-xs text-gray-500">Voting closed</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function DemoClient({ submissions, initialVoteCounts, initialEmail }: Props) {
  const [voteCounts, setVoteCounts] = useState<Record<string, number>>(initialVoteCounts);
  const [userEmail, setUserEmail] = useState<string | null>(initialEmail);
  const [votedToday, setVotedToday] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<Filter>({ target: "All", publicStatus: "All" });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingVoteId, setPendingVoteId] = useState<string | null>(null);
  const [voteError, setVoteError] = useState<string | null>(null);

  const now = new Date();
  const votingStatus: "open" | "closed" | "upcoming" =
    now < VOTING_START ? "upcoming" : now > VOTING_END ? "closed" : "open";

  // Days left countdown
  const msLeft = VOTING_END.getTime() - now.getTime();
  const daysLeft = Math.max(0, Math.ceil(msLeft / (1000 * 60 * 60 * 24)));

  // Load voted-today set from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("gtmc_demo_voted");
      if (stored) {
        const data = JSON.parse(stored) as { date: string; ids: string[] };
        const todayStr = new Date().toISOString().split("T")[0];
        if (data.date === todayStr) {
          setVotedToday(new Set(data.ids));
        }
      }
    } catch {}
  }, []);

  function saveVotedToday(ids: Set<string>) {
    try {
      const todayStr = new Date().toISOString().split("T")[0];
      localStorage.setItem("gtmc_demo_voted", JSON.stringify({ date: todayStr, ids: Array.from(ids) }));
    } catch {}
  }

  // 30s polling
  useEffect(() => {
    const id = setInterval(async () => {
      try {
        const res = await fetch("/api/demo/votes");
        if (res.ok) setVoteCounts(await res.json());
      } catch {}
    }, 30_000);
    return () => clearInterval(id);
  }, []);

  async function castVote(submissionId: string) {
    setVoteError(null);
    try {
      const res = await fetch("/api/demo/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId }),
      });
      if (res.status === 401) {
        setPendingVoteId(submissionId);
        setShowAuthModal(true);
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setVoteError(data.error ?? "Vote failed.");
        return;
      }
      setVoteCounts((prev) => ({ ...prev, [submissionId]: (prev[submissionId] ?? 0) + 1 }));
      const next = new Set(votedToday).add(submissionId);
      setVotedToday(next);
      saveVotedToday(next);
    } catch {
      setVoteError("Network error. Please try again.");
    }
  }

  function handleAuthSuccess(email: string) {
    setUserEmail(email);
    setShowAuthModal(false);
    if (pendingVoteId) {
      const id = pendingVoteId;
      setPendingVoteId(null);
      castVote(id);
    }
  }

  // Filter + sort
  const allTargets = ["All", ...Array.from(new Set(submissions.flatMap((s) => s.target)))];
  const allStatuses = ["All", ...Array.from(new Set(submissions.map((s) => s.publicStatus).filter(Boolean)))];

  const displayLabel: Record<string, string> = {
    "Not Yet Public - Priority Listing": "Coming Soon",
    "Released < 90 Days Ago": "New",
    "Released > 90 Days Ago": "Available",
  };

  const filtered = submissions
    .filter((s) => {
      if (filter.target !== "All" && !s.target.includes(filter.target)) return false;
      if (filter.publicStatus !== "All" && s.publicStatus !== filter.publicStatus) return false;
      return true;
    })
    .sort((a, b) => (voteCounts[b.id] ?? 0) - (voteCounts[a.id] ?? 0));

  return (
    <div style={{ background: "#011224", minHeight: "100vh" }}>
      {showAuthModal && (
        <AuthModal
          onSuccess={handleAuthSuccess}
          onClose={() => { setShowAuthModal(false); setPendingVoteId(null); }}
        />
      )}

      {/* Header */}
      <section className="pt-16 pb-10 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-3 py-1 rounded-full"
            style={{ background: "#c4921a22", color: "#c4921a" }}>
            GTM Council
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Demo Day
          </h1>
          <p className="text-gray-400 text-lg mb-2">
            Watch demos from the best GTM vendors. Vote for your favorites.
          </p>
          {votingStatus === "open" && (
            <p className="text-sm font-semibold" style={{ color: "#c4921a" }}>
              🗳 Voting closes in {daysLeft} day{daysLeft !== 1 ? "s" : ""} · Vote once per day
            </p>
          )}
          {votingStatus === "upcoming" && (
            <p className="text-sm font-semibold" style={{ color: "#c4921a" }}>
              Voting opens {VOTING_START.toLocaleDateString("en-US", { month: "long", day: "numeric" })}
            </p>
          )}
          {votingStatus === "closed" && (
            <p className="text-sm font-semibold text-gray-500">Voting has closed</p>
          )}
          {userEmail && (
            <p className="text-xs text-gray-600 mt-2">Voting as {userEmail}</p>
          )}
          {voteError && (
            <p className="text-sm text-red-400 mt-2">{voteError}</p>
          )}
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 pb-6">
        <div className="max-w-5xl mx-auto space-y-3">
          {/* Target filter */}
          <div className="flex flex-wrap gap-2">
            {allTargets.map((t) => (
              <button
                key={t}
                onClick={() => setFilter((f) => ({ ...f, target: t }))}
                className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
                style={
                  filter.target === t
                    ? { background: "#c4921a", color: "#011224" }
                    : { background: "#c4921a1a", color: "#c4921a", border: "1px solid #c4921a33" }
                }
              >
                {t}
              </button>
            ))}
          </div>

          {/* Status filter */}
          {allStatuses.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {allStatuses.map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter((f) => ({ ...f, publicStatus: s }))}
                  className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
                  style={
                    filter.publicStatus === s
                      ? { background: "#2563eb", color: "#fff" }
                      : { background: "#2563eb1a", color: "#93c5fd", border: "1px solid #2563eb33" }
                  }
                >
                  {s === "All" ? "All Status" : (displayLabel[s] ?? s)}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-600 py-20">No demos match your filters.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filtered.map((submission, idx) => (
                <SubmissionCard
                  key={submission.id}
                  submission={submission}
                  rank={idx + 1}
                  votes={voteCounts[submission.id] ?? 0}
                  hasVotedToday={votedToday.has(submission.id)}
                  votingStatus={votingStatus}
                  onVote={castVote}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
