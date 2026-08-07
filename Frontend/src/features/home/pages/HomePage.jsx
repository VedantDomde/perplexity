import React from 'react'
import { Link } from 'react-router'
import { useSelector } from 'react-redux'

const featureCards = [
  {
    title: 'Research on demand',
    text: 'Ask complex questions and get grounded answers with fast, concise summaries.',
  },
  {
    title: 'Build ideas faster',
    text: 'Turn a vague thought into structured direction, plans, and quick comparisons.',
  },
  {
    title: 'Work in one place',
    text: 'Keep your AI conversations, discoveries, and follow-ups in a clean workspace.',
  },
]

const sampleQuestions = [
  'How can I grow a SaaS from 0 to 10k users?',
  'Compare Next.js and Vite for product frontend setup',
  'Plan a 30-day content strategy for a startup brand',
]

const HomePage = () => {
  const user = useSelector((state) => state.auth.user)

  return (
    <div className="min-h-screen bg-[#050816] text-slate-100">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 shadow-[0_0_40px_rgba(86,123,255,0.18)] backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-500 text-sm font-bold text-slate-950">
              P
            </div>
            <div>
              <p className="text-base font-semibold tracking-tight">Perplexity</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#features" className="transition hover:text-white">Features</a>
            <a href="#about" className="transition hover:text-white">About</a>
            <a href="#discover" className="transition hover:text-white">Discover</a>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <Link
                to="/dashboard"
                className="rounded-full border border-cyan-400/60 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-400/20"
              >
                Open dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition hover:text-white">
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </header>

        <main className="mt-14 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <section>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-cyan-200">
              AI search workspace
            </div>

            <h1 className="mt-6 max-w-xl text-4xl font-black tracking-[-0.07em] text-white sm:text-5xl lg:text-7xl">
              Ask better questions.
              <span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                Learn faster.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Perplexity helps you explore ideas, gather answers, and turn rough research into clear decisions.
              It is built for curious users who want focused knowledge, quick insight, and a cleaner workflow.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to={user ? '/dashboard' : '/register'}
                className="rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 px-6 py-3 text-center text-sm font-semibold text-slate-950 shadow-[0_15px_35px_rgba(34,211,238,0.35)] transition hover:translate-y-[-1px]"
              >
                {user ? 'Go to dashboard' : 'Create free account'}
              </Link>
              <Link
                to="/login"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
              >
                Sign in
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-slate-300">
              <div>
                <span className="block text-2xl font-bold text-white">10k+</span>
                <span>Insights created</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-white">4.9/5</span>
                <span>User satisfaction</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-white">24/7</span>
                <span>Smart assistance</span>
              </div>
            </div>
          </section>

          <aside className="rounded-[32px] border border-white/10 bg-[#0b1122]/80 p-4 shadow-[0_30px_80px_rgba(15,23,42,0.7)] backdrop-blur-xl">
            <div className="rounded-[26px] border border-white/10 bg-slate-950/80 p-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  Ready to answer
                </div>
                <button type="button" className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-slate-300">
                  Live
                </button>
              </div>

              <div className="mt-4 space-y-3">
                {sampleQuestions.map((question, index) => (
                  <button
                    key={question}
                    type="button"
                    className={`flex w-full items-center justify-between rounded-2xl border px-3 py-3 text-left text-sm transition ${
                      index === 0
                        ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-100'
                        : 'border-white/10 bg-slate-900/70 text-slate-200 hover:border-white/20 hover:bg-slate-800/80'
                    }`}
                  >
                    <span>{question}</span>
                    <span className="text-xs text-slate-400">↗</span>
                  </button>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Answer preview</p>
                <p className="mt-3 text-sm leading-7 text-slate-200">
                  Start with a sharp problem statement, validate the market, and build content around the jobs customers
                  are trying to solve. That gives you a faster path to traction and clearer product messaging.
                </p>
              </div>
            </div>
          </aside>
        </main>

        <section id="features" className="mt-24">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Why people use it</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.05em] text-white sm:text-4xl">Everything you need for better answers</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featureCards.map((feature) => (
              <article key={feature.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_30px_rgba(15,23,42,0.5)]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/30 to-sky-500/30 text-xl text-cyan-200">
                  ✦
                </div>
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{feature.text}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomePage
