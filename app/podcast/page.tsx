import Image from "next/image";

export const metadata = {
  title: "Stacked GTM Podcast | GTM Council",
  description: "A podcast for senior GTM leaders to get smart on how GTM tech is changing.",
};

export default function PodcastPage() {
  return (
    <div>
      {/* ── Hero graphic ──────────────────────────────────────────── */}
      <section className="py-16 px-4 flex justify-center">
        <Image
          src="/podcast-stacked-gtm.jpg"
          alt="Stacked GTM — a show by GTM Council"
          width={320}
          height={320}
          className="rounded-2xl shadow-lg"
          priority
        />
      </section>

      {/* ── Format ────────────────────────────────────────────────── */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3" style={{ color: "#c4921a" }}>
            We dive deep on topics
          </h2>
          <p className="text-gray-600 text-lg">
            Each series looks at the topic from the perspective of vendors AND practitioners
          </p>
        </div>
      </section>
    </div>
  );
}
