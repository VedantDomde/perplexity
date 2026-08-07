import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { useAuth } from '../hook/useAuth'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [notice, setNotice] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const authError = useSelector((state) => state.auth.error)
  const auth = useAuth()
  const navigate = useNavigate()

  const submitForm = async (event) => {
    event.preventDefault()
    setNotice({ type: '', message: '' })
    setIsSubmitting(true)

    const payload = { username, email, password }
    const success = await auth.handleRegister(payload)

    if (success) {
      setNotice({ type: 'success', message: 'Account created. Redirecting to login...' })
      setTimeout(() => navigate('/login'), 800)
    } else {
      setNotice({ type: 'error', message: authError || 'Registration failed. Please try again.' })
    }

    setIsSubmitting(false)
  }

  return (
    <section className="min-h-screen bg-[#050816] px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[85vh] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-[#0b1122]/80 shadow-[0_30px_80px_rgba(15,23,42,0.75)] backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr]">
          <div className="hidden bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.2),_transparent_35%),linear-gradient(135deg,_rgba(15,23,42,0.9),_rgba(15,23,42,0.7))] p-10 lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 via-sky-500 to-indigo-500 text-sm font-bold text-slate-950">
                  P
                </div>
                <span className="text-xl font-semibold">Perplexity</span>
              </div>
              <h1 className="mt-10 text-4xl font-black tracking-[-0.07em] text-white">Create your workspace.</h1>
              <p className="mt-5 max-w-md text-base leading-7 text-slate-300">
                Sign up to ask smarter questions, organize discovery, and turn information into action faster.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
              “Your ideas deserve a better place to grow.”
            </div>
          </div>

          <div className="w-full max-w-md p-8 sm:p-10">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Join free</p>
                <h2 className="mt-2 text-3xl font-bold text-white">Create account</h2>
              </div>
              <Link to="/" className="text-sm text-slate-300 transition hover:text-white">
                Home
              </Link>
            </div>

            <form onSubmit={submitForm} className="space-y-5">
              <div>
                <label htmlFor="username" className="mb-2 block text-sm font-medium text-slate-200">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Choose a username"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.2)]"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.2)]"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-200">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Create a password"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.2)]"
                />
              </div>

              {notice.message && (
                <div
                  className={`rounded-xl border px-3 py-2 text-sm ${
                    notice.type === 'success'
                      ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200'
                      : 'border-red-400/30 bg-red-500/10 text-red-200'
                  }`}
                >
                  {notice.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 px-4 py-3 font-semibold text-slate-950 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Creating account…' : 'Register'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-300">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-cyan-300 transition hover:text-cyan-200">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register