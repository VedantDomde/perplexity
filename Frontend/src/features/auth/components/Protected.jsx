import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const Protected = ({ children }) => {
    const user = useSelector((state) => state.auth.user)
    const loading = useSelector((state) => state.auth.loading)

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#050816] text-slate-100">
                <div className="flex items-center gap-3 rounded-full border border-cyan-400/30 bg-white/5 px-5 py-3 text-sm text-cyan-100">
                    <span className="h-3 w-3 animate-pulse rounded-full bg-cyan-300" />
                    Loading your workspace...
                </div>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/" replace />
    }

    return children
}

export default Protected