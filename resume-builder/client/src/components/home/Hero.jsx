import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Hero = () => {

    const {user} = useSelector(state => state.auth)

    const [menuOpen, setMenuOpen] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(true);

    React.useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down
                setIsVisible(false);
            } else {
                // Scrolling up
                setIsVisible(true);
            }
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logos = [
        'https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/framer.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg',
    ]

  return (
    <>
    <div className="min-h-screen pb-20">
        {/* Navbar */}
        <nav className={`z-50 sticky top-4 mx-4 md:mx-16 lg:mx-24 xl:mx-40 rounded-full border border-slate-200/50 dark:border-slate-800/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md shadow-sm flex items-center justify-between py-3 px-6 text-sm transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-[150%]'}`}>
            <a href="/" className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <span className="text-white font-bold text-xl leading-none">r</span>
                </div>
                <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-slate-100">resume.</span>
            </a>

            <div className="hidden md:flex items-center gap-8 font-medium text-slate-600 dark:text-slate-300">
                <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</a>
                <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Features</a>
                <a href="#testimonials" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Testimonials</a>
                <a href="#cta" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</a>
            </div>

            <div className="flex gap-3">
                <Link to='/app?state=register' className="hidden md:flex items-center justify-center px-6 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 active:scale-95 shadow-lg shadow-indigo-500/20 transition-all rounded-full text-white font-medium" hidden={user}>
                    Get started
                </Link>
                <Link to='/app?state=login' className="hidden md:flex items-center justify-center px-6 py-2 border border-slate-200 dark:border-slate-700 active:scale-95 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all rounded-full text-slate-700 dark:text-slate-300 font-medium" hidden={user}>
                    Login
                </Link>
                <Link to='/app' className='hidden md:flex items-center justify-center px-8 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 active:scale-95 shadow-lg shadow-indigo-500/20 transition-all rounded-full text-white font-medium' hidden={!user}>
                    Dashboard
                </Link>
            </div>

            <button onClick={() => setMenuOpen(true)} className="md:hidden active:scale-90 transition" >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-menu" >
                    <path d="M4 5h16M4 12h16M4 19h16" />
                </svg>
            </button>
        </nav>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 z-[100] bg-slate-900/95 text-white backdrop-blur-md flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-all duration-500 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} >
            <a href="#" className="hover:text-indigo-400 transition-colors">Home</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#testimonials" className="hover:text-indigo-400 transition-colors">Testimonials</a>
            <a href="#contact" className="hover:text-indigo-400 transition-colors">Contact</a>
            <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-800 transition-colors text-slate-400 hover:text-white" >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
        </div>

        {/* Hero Section */}
        <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-slate-900 dark:text-slate-100 mt-20">
            <div className="absolute top-20 xl:-top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-indigo-500/20 dark:bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute top-40 xl:top-10 -z-10 right-1/4 size-72 sm:size-96 xl:size-120 bg-violet-500/20 dark:bg-violet-500/10 blur-[100px] rounded-full pointer-events-none"></div>

            {/* Avatars + Stars */}
            <div className="flex items-center mt-24">
                <div className="flex -space-x-3 pr-3">
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="user3" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[1]" />
                    <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="user1" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-2" />
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="user2" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[3]" />
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="user3" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[4]" />
                    <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="user5" className="size-8 rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[5]" />
                </div>

                <div>
                    <div className="flex gap-1 mb-1">
                        {Array(5).fill(0).map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-yellow-400 drop-shadow-sm"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                        ))}
                    </div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Used by 10,000+ users
                    </p>
                </div>
            </div>

            {/* Headline + CTA */}
            <h1 className="text-5xl md:text-7xl font-bold max-w-5xl text-center mt-6 md:leading-[1.1] tracking-tight">
                Land your dream job with <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 bg-clip-text text-transparent text-nowrap">AI-powered </span> resumes.
            </h1>

            <p className="max-w-2xl text-center text-lg text-slate-600 dark:text-slate-400 my-8 leading-relaxed">
                Create, edit, and download professional resumes in minutes. Our AI-powered builder gives you actionable insights and perfectly crafted descriptions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                <Link to='/app' className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-lg shadow-indigo-500/25 text-white rounded-full px-10 h-14 flex items-center justify-center font-medium transition-all hover:scale-105 active:scale-95 w-full sm:w-auto">
                    Get started for free
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </Link>
                <a href="#features" className="flex items-center justify-center gap-2 border-2 border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all rounded-full px-8 h-14 text-slate-700 dark:text-slate-300 font-medium w-full sm:w-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500 dark:text-slate-400" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                    <span>Watch demo</span>
                </a>
            </div>

            <p className="py-6 text-sm font-medium text-slate-500 dark:text-slate-500 mt-16 uppercase tracking-widest">Trusted by industry leaders</p>

            <div className="flex flex-wrap justify-center gap-8 md:gap-12 w-full mx-auto py-4 opacity-60 grayscale hover:grayscale-0 transition-all duration-500" id="logo-container">
                {logos.map((logo, index) => <img key={index} src={logo} alt="logo" className="h-7 w-auto transition-transform hover:scale-110 duration-300 dark:invert" />)}
            </div>
        </div>
    </div>
    <style>
        {`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

            * {
                font-family: 'Poppins', sans-serif;
            }
        `}
    </style>
    </>
  )
}

export default Hero
