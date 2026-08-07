import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
import remarkGfm from 'remark-gfm'

const Dashboard = () => {
  const chat = useChat()
  const [chatInput, setChatInput] = useState('')
  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)

  useEffect(() => {
    chat.initializeSocketConnection()
    chat.handleGetChats()
  }, [])

  const handleSubmitMessage = (event) => {
    event.preventDefault()

    const trimmedMessage = chatInput.trim()
    if (!trimmedMessage) {
      return
    }

    chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId })
    setChatInput('')
  }

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats)
  }

  const activeChat = chats[currentChatId]
  const chatList = Object.values(chats)

  return (
    <main className="min-h-screen bg-[#050816] p-3 text-slate-100 md:p-5">
      <div className="mx-auto flex h-[calc(100vh-1.5rem)] max-w-[1600px] gap-4 rounded-[30px] border border-white/10 bg-[#0b1122]/90 p-2 shadow-[0_30px_80px_rgba(15,23,42,0.7)] md:h-[calc(100vh-2.5rem)] md:gap-5">
        <aside className="hidden w-80 shrink-0 flex-col rounded-[26px] border border-white/10 bg-[#0a1020] p-4 md:flex">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 via-sky-500 to-indigo-500 text-sm font-bold text-slate-950">
                P
              </div>
              <span className="text-xl font-semibold tracking-tight">Perplexity</span>
            </div>
            <button
              type="button"
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200"
            >
              New
            </button>
          </div>

          <div className="mb-4 rounded-2xl border border-cyan-400/30 bg-cyan-500/8 px-3 py-2 text-sm text-cyan-100">
            Explore AI answers
          </div>

          <div className="space-y-2 overflow-y-auto pr-1">
            {chatList.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/15 bg-white/3 p-4 text-sm text-slate-400">
                No chats yet. Start a new conversation.
              </div>
            ) : (
              chatList.map((chatItem) => (
                <button
                  key={chatItem.id}
                  type="button"
                  onClick={() => openChat(chatItem.id)}
                  className={`w-full rounded-2xl border px-3 py-3 text-left transition ${
                    chatItem.id === currentChatId
                      ? 'border-cyan-400/40 bg-cyan-500/10 text-white'
                      : 'border-white/10 bg-transparent text-slate-300 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <div className="truncate text-sm font-medium">{chatItem.title}</div>
                </button>
              ))
            )}
          </div>
        </aside>

        <section className="relative flex min-w-0 flex-1 flex-col overflow-hidden rounded-[26px] border border-white/10 bg-[#0a1020]">
          <header className="flex items-center justify-between border-b border-white/10 px-4 py-4 md:px-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Research workspace</p>
              <h1 className="mt-1 text-xl font-semibold text-white">
                {activeChat ? activeChat.title : 'New conversation'}
              </h1>
            </div>
            <button
              type="button"
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/10"
            >
              Share
            </button>
          </header>

          <div className="messages flex-1 overflow-y-auto px-4 pb-32 pt-5 md:px-6">
            {activeChat?.messages.length ? (
              <div className="mx-auto max-w-4xl space-y-4">
                {activeChat.messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-7 md:text-base ${
                        message.role === 'user'
                          ? 'bg-cyan-400/15 text-cyan-50 ring-1 ring-cyan-400/30'
                          : 'bg-white/5 text-slate-100 ring-1 ring-white/10'
                      }`}
                    >
                      {message.role === 'user' ? (
                        <p>{message.content}</p>
                      ) : (
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                            ul: ({ children }) => <ul className="mb-2 list-disc pl-5">{children}</ul>,
                            ol: ({ children }) => <ol className="mb-2 list-decimal pl-5">{children}</ol>,
                            code: ({ children }) => <code className="rounded bg-slate-900 px-1 py-0.5 text-cyan-200">{children}</code>,
                            pre: ({ children }) => <pre className="mb-3 overflow-x-auto rounded-xl bg-slate-950 p-3">{children}</pre>,
                          }}
                          remarkPlugins={[remarkGfm]}
                        >
                          {message.content}
                        </ReactMarkdown>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mx-auto flex h-full max-w-3xl items-center justify-center">
                <div className="rounded-[28px] border border-dashed border-white/15 bg-white/5 p-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/20 to-sky-500/20 text-2xl">
                    ✦
                  </div>
                  <h2 className="text-2xl font-bold text-white">Start asking questions</h2>
                  <p className="mt-3 max-w-md text-sm leading-7 text-slate-300">
                    Explore topics, compare ideas, and turn scattered research into clear answers in one workspace.
                  </p>
                </div>
              </div>
            )}
          </div>

          <footer className="absolute inset-x-4 bottom-4 rounded-[24px] border border-white/10 bg-[#0b1122]/90 p-3 shadow-[0_18px_40px_rgba(15,23,42,0.7)] backdrop-blur md:inset-x-6 md:bottom-6 md:p-4">
            <form onSubmit={handleSubmitMessage} className="flex flex-col gap-3 md:flex-row">
              <input
                type="text"
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder="Ask anything..."
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.15)]"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </footer>
        </section>
      </div>
    </main>
  )
}

export default Dashboard