"use client";
import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") ?? "/members";

  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleEmailSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Something went wrong.");
      return;
    }

    setMessage(data.message);
    setStep("code");
  }

  async function handleCodeSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Something went wrong.");
      return;
    }

    router.push(from);
    router.refresh();
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#011224" }}>
                <span className="text-white font-bold">G</span>
              </div>
              <div>
                <div className="font-extrabold leading-none text-lg tracking-wide" style={{ color: "#011224" }}>GTM</div>
                <div className="text-xs tracking-[0.18em] font-medium" style={{ color: "#011224" }}>COUNCIL</div>
              </div>
            </div>
          </div>

          {step === "email" ? (
            <>
              <h1 className="text-2xl font-extrabold text-center mb-2" style={{ color: "#011224" }}>
                Member Login
              </h1>
              <p className="text-gray-500 text-sm text-center mb-8">
                Enter your email address and we&apos;ll send you a 6-digit code.
              </p>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent text-sm"
                    style={{ "--tw-ring-color": "#011224" } as React.CSSProperties}
                  />
                </div>

                {error && (
                  <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 rounded-lg text-white font-semibold text-sm transition-opacity disabled:opacity-60"
                  style={{ backgroundColor: "#011224" }}
                >
                  {loading ? "Sending…" : "Send Code"}
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-extrabold text-center mb-2" style={{ color: "#011224" }}>
                Check your email
              </h1>
              {message && (
                <p className="text-gray-500 text-sm text-center mb-2">{message}</p>
              )}
              <p className="text-gray-400 text-xs text-center mb-8">
                Sent to <span className="font-medium text-gray-600">{email}</span>
              </p>

              <form onSubmit={handleCodeSubmit} className="space-y-4">
                <div>
                  <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                    6-digit code
                  </label>
                  <input
                    id="code"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    required
                    autoFocus
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="000000"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 text-center text-2xl tracking-widest font-mono focus:outline-none focus:ring-2 focus:border-transparent"
                  />
                </div>

                {error && (
                  <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading || code.length !== 6}
                  className="w-full py-3 px-6 rounded-lg text-white font-semibold text-sm transition-opacity disabled:opacity-60"
                  style={{ backgroundColor: "#011224" }}
                >
                  {loading ? "Verifying…" : "Log In"}
                </button>

                <button
                  type="button"
                  onClick={() => { setStep("email"); setCode(""); setError(""); }}
                  className="w-full text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ← Use a different email
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Not a member?{" "}
          <a href="https://www.gtmcouncil.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">
            Apply to join
          </a>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
