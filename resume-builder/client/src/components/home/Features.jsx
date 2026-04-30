import { Zap } from 'lucide-react';
import React from 'react'
import Title from './Title';

const Features = () => {
    const [isHover, setIsHover] = React.useState(false);
  return (
    <div id='features' className='flex flex-col items-center my-10 scroll-mt-12'>

    <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 rounded-full px-6 py-1.5 font-medium border border-indigo-500/20 mb-4">
        <Zap width={16}/>
        <span>Simple Process</span>
    </div>
    <Title title='Build your resume' description='Our streamlined process helps you create a professional resume in minutes with intelligent AI-powered tools and features.'/>

            <div className="flex flex-col md:flex-row items-center xl:-mt-10">
                <img className="max-w-2xl w-full xl:-ml-32" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png" alt="" />
                <div className="px-4 md:px-0" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                    <div className={"flex items-center justify-center gap-6 max-w-md group cursor-pointer"}>
                        <div className={`p-6 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 border border-transparent group-hover:border-indigo-200 dark:group-hover:border-indigo-800/50 flex gap-4 rounded-xl transition-all duration-300 ${!isHover ? 'border-indigo-200 dark:border-indigo-800/50 bg-indigo-50 dark:bg-indigo-900/30' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 stroke-indigo-600 dark:stroke-indigo-400"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" /><circle cx="16.5" cy="7.5" r=".5" fill="currentColor" /></svg>
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">AI-Powered Descriptions</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs">Instantly generate professional, ATS-friendly descriptions for your experience and projects.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
                        <div className="p-6 group-hover:bg-violet-50 dark:group-hover:bg-violet-900/30 border border-transparent group-hover:border-violet-200 dark:group-hover:border-violet-800/50 flex gap-4 rounded-xl transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 stroke-violet-600 dark:stroke-violet-400"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" /></svg>
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">Live Preview</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs">See your resume update in real-time as you type, ensuring perfect formatting.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
                        <div className="p-6 group-hover:bg-purple-50 dark:group-hover:bg-purple-900/30 border border-transparent group-hover:border-purple-200 dark:group-hover:border-purple-800/50 flex gap-4 rounded-xl transition-all duration-300">
                            <svg className="size-6 stroke-purple-600 dark:stroke-purple-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15V3" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /></svg>
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">Smart Analysis</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs">Get a resume score, missing skill suggestions, and actionable improvement tips.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
        </div>
  )
}

export default Features
