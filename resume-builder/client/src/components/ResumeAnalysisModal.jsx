import React from 'react'
import { X, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react'

const ResumeAnalysisModal = ({ isOpen, onClose, analysisData }) => {
  if (!isOpen) return null;

  const { score, missing_skills, improvement_tips } = analysisData || {};

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  }

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  }

  return (
    <div className='fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4' onClick={onClose}>
      <div className='bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col' onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-10 rounded-t-2xl'>
          <h2 className='text-2xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100'>
            <TrendingUp className="size-6 text-indigo-500" />
            Resume Analysis
          </h2>
          <button onClick={onClose} className='p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500'>
            <X className='size-5' />
          </button>
        </div>

        {/* Content */}
        <div className='p-6 space-y-8'>
          
          {/* Score Section */}
          <div className='flex flex-col items-center justify-center space-y-4'>
            <div className='relative size-32 flex items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 shadow-inner'>
              <svg className="w-full h-full transform -rotate-90 absolute inset-0">
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-200 dark:text-slate-700" />
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="364.4" strokeDashoffset={364.4 - (364.4 * (score || 0)) / 100} className={`transition-all duration-1000 ease-out ${getScoreColor(score)}`} />
              </svg>
              <div className='text-center'>
                <span className={`text-4xl font-bold ${getScoreColor(score)}`}>{score || 0}</span>
                <span className='text-sm text-slate-400 block'>/ 100</span>
              </div>
            </div>
            <p className='text-slate-600 dark:text-slate-300 font-medium text-center max-w-sm'>
              {score >= 80 ? "Great job! Your resume is looking strong." : score >= 60 ? "Good start, but there's room for improvement." : "Your resume needs significant updates to stand out."}
            </p>
          </div>

          {/* Missing Skills */}
          {missing_skills && missing_skills.length > 0 && (
            <div className='space-y-3'>
              <h3 className='text-lg font-semibold flex items-center gap-2 text-slate-800 dark:text-slate-100'>
                <AlertCircle className="size-5 text-yellow-500" />
                Suggested Skills to Add
              </h3>
              <div className='flex flex-wrap gap-2'>
                {missing_skills.map((skill, index) => (
                  <span key={index} className='px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full text-sm font-medium border border-yellow-200 dark:border-yellow-800/50'>
                    + {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Improvement Tips */}
          {improvement_tips && improvement_tips.length > 0 && (
            <div className='space-y-3'>
              <h3 className='text-lg font-semibold flex items-center gap-2 text-slate-800 dark:text-slate-100'>
                <CheckCircle2 className="size-5 text-indigo-500" />
                Actionable Improvements
              </h3>
              <ul className='space-y-3'>
                {improvement_tips.map((tip, index) => (
                  <li key={index} className='flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800'>
                    <div className='mt-0.5 size-2 rounded-full bg-indigo-500 flex-shrink-0'></div>
                    <p className='text-slate-700 dark:text-slate-300 text-sm leading-relaxed'>{tip}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
        
        {/* Footer */}
        <div className='p-6 border-t border-gray-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 rounded-b-2xl flex justify-end'>
          <button onClick={onClose} className='px-6 py-2 bg-slate-800 hover:bg-slate-900 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 rounded-lg transition-colors font-medium'>
            Close
          </button>
        </div>

      </div>
    </div>
  )
}

export default ResumeAnalysisModal
