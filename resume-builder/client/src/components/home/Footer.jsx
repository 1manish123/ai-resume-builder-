import React from 'react'
import { Github, Linkedin, Youtube } from 'lucide-react'

const Footer = () => {
  return (
    <>

<footer className="flex flex-wrap justify-center lg:justify-between overflow-hidden gap-10 md:gap-20 py-16 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-slate-500 dark:text-slate-400 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 border-t border-slate-200 dark:border-slate-800 mt-40">
        <div className="flex flex-wrap items-start gap-10 md:gap-[60px] xl:gap-[140px]">
            <a href="#">
                <img src="/logo.svg" alt="logo" className="h-11 w-auto" />
            </a>
            <div>
                <p className="text-slate-800 dark:text-slate-200 font-semibold mb-3">Product</p>
                <ul className="space-y-2">
                    <li><a href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</a></li>
                    <li><a href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Support</a></li>
                    <li><a href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Pricing</a></li>
                    <li><a href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Affiliate</a></li>
                </ul>
            </div>
            <div>
                <p className="text-slate-800 dark:text-slate-200 font-semibold mb-3">Resources</p>
                <ul className="space-y-2">
                    <li><a href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Company</a></li>
                    <li><a href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Blogs</a></li>
                    <li><a href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Community</a></li>
                    <li><a href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center">Careers<span className="text-[10px] uppercase font-bold text-white bg-indigo-600 rounded-full ml-2 px-2 py-0.5 shadow-sm shadow-indigo-500/20">We're hiring!</span></a></li>
                    <li><a href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</a></li>
                </ul>
            </div>
            <div>
                <p className="text-slate-800 dark:text-slate-200 font-semibold mb-3">Legal</p>
                <ul className="space-y-2">
                    <li><a href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy</a></li>
                    <li><a href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms</a></li>
                </ul>
            </div>
        </div>
        <div className="flex flex-col max-md:items-center max-md:text-center gap-2 items-end">
            <p className="max-w-xs text-slate-500 dark:text-slate-400 leading-relaxed md:text-right">Crafting professional resumes with the power of AI to help you land your dream job faster.</p>
            <div className="flex items-center gap-4 mt-4">
                <a href="https://github.com/1manish123" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm">
                    <Github className="size-5" />
                </a>
                <a href="https://www.linkedin.com/in/hereismanish/" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm">
                    <Linkedin className="size-5" />
                </a>
                <a href="https://youtube.com/" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-red-100 dark:hover:bg-red-900/50 hover:text-red-600 dark:hover:text-red-400 transition-all shadow-sm">
                    <Youtube className="size-5" />
                </a>
            </div>
            <p className="mt-4 text-center md:text-right font-medium">© {new Date().getFullYear()} Resume Builder</p>
        </div>
    </footer>

       <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
    
        * {
            font-family: 'Poppins', sans-serif;
        }
    `}</style>
    </>
  )
}

export default Footer
