import React from 'react'

const Banner = () => {
  return ( 
    <div className="w-full py-3 font-medium text-sm text-indigo-100 text-center bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-indigo-500/20">
        <p className="flex items-center justify-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-indigo-500/20 border border-indigo-400/30 backdrop-blur-sm shadow-[0_0_15px_rgba(99,102,241,0.2)]">New Feature</span>
          <span className="opacity-90">AI-Powered Resume Analysis is now live!</span>
          <span className="hidden sm:inline-block ml-2 text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer">Try it out &rarr;</span>
        </p>
    </div>
  )
}

export default Banner
