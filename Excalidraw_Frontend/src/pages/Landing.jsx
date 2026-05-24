import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const features = [
  {
    title: "Live collaboration",
    copy: "Create, sketch, and discuss ideas together on a shared board.",
    icon: "LC",
  },
  {
    title: "Fast visual tools",
    copy: "Move between shapes, freehand drawing, undo, redo, and cleanup quickly.",
    icon: "FT",
  },
  {
    title: "Board access control",
    copy: "Keep shared work organized with clear owner, editor, and viewer roles.",
    icon: "AC",
  },
  {
    title: "Team chat",
    copy: "Keep context next to the canvas with board-level conversation.",
    icon: "TC",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-950">
      <Header />

      <main>
        <section className="relative overflow-hidden border-b border-gray-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1fr_0.9fr] md:items-center md:py-24 lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-semibold uppercase text-blue-600">
                Modern collaborative whiteboarding
              </p>
              <h1 className="text-4xl font-bold leading-tight text-gray-950 sm:text-5xl lg:text-6xl">
                Turn team ideas into clear visual plans.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                Excaliboard gives your team a polished canvas for brainstorming,
                planning, sketching flows, and keeping the conversation close to
                the work.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/dashboard"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:bg-blue-800"
                >
                  Open dashboard
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-800 shadow-sm transition hover:bg-gray-50"
                >
                  Create account
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-3 shadow-xl">
              <div className="overflow-hidden rounded-xl bg-white">
                <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400" />
                    <span className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-xs font-semibold text-gray-500">
                    Strategy board
                  </span>
                </div>
                <div className="grid min-h-80 grid-cols-3 gap-3 bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] bg-[size:28px_28px] p-5">
                  <div className="col-span-2 h-24 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm font-semibold text-blue-900 shadow-sm">
                    Product launch map
                  </div>
                  <div className="h-24 rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-sm font-semibold text-indigo-900 shadow-sm">
                    Risks
                  </div>
                  <div className="h-28 rounded-xl border border-purple-200 bg-purple-50 p-4 text-sm font-semibold text-purple-900 shadow-sm">
                    Ideas
                  </div>
                  <div className="col-span-2 h-28 rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-600 shadow-sm">
                    Team notes, sketches, shapes, and decisions stay together.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-950 sm:text-3xl">
              Everything your board needs to feel production-ready.
            </h2>
            <p className="mt-3 text-gray-600">
              A focused interface for creating, sharing, and discussing visual work.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-blue-50 text-sm font-bold text-blue-700">
                  {feature.icon}
                </div>
                <h3 className="mt-5 text-base font-semibold text-gray-950">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {feature.copy}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Landing;
