"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="px-5 py-2.5 rounded-lg border border-white/30 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
    >
      Log Out
    </button>
  );
}
