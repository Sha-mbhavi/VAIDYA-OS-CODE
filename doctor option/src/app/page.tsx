'use client';

import React from 'react';
import { ArrowRight, Bot, FileText, PhoneCall, Star, Check } from 'lucide-react';

export default function Home() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
            --accent-purple: #9333ea;
            --accent-purple-glow: rgba(147, 51, 234, 0.5);
        }
        body {
            font-family: Calibri, sans-serif !important;
            font-size: 16px;
        }

        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes border-spin {
            from { --gradient-angle: 0deg; }
            to { --gradient-angle: 360deg; }
        }

        @keyframes animStar {
            from { transform: translateY(0px); }
            to { transform: translateY(-2000px); }
        }

        @property --gradient-angle { 
            syntax: "<angle>"; 
            initial-value: 0deg; 
            inherits: false; 
        }

        .animate-fade-up {
            animation: fade-in-up 0.8s ease-out forwards;
        }

        .shiny-cta {
            --gradient-angle: 0deg;
            position: relative;
            overflow: hidden;
            border-radius: 9999px;
            padding: 1rem 2.5rem;
            background: linear-gradient(#000000, #000000) padding-box,
            conic-gradient(from var(--gradient-angle), transparent 0%, var(--accent-purple) 5%, var(--accent-purple) 15%, var(--accent-purple) 30%, transparent 40%, transparent 100%) border-box;
            border: 2px solid transparent;
            cursor: pointer;
            isolation: isolate;
            animation: border-spin 2.5s linear infinite;
        }

        .shiny-cta::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at 50% 50%, white 0.5px, transparent 0);
            background-size: 4px 4px;
            opacity: 0.1;
            z-index: 0;
        }

        .stars-1 { box-shadow: 234px 124px #fff, 654px 345px #fff, 876px 12px #fff, 1200px 800px #fff, 400px 1500px #fff, 1800px 200px #fff, 100px 1000px #fff, 900px 1900px #fff, 500px 600px #fff, 1400px 100px #fff, 300px 400px #fff, 1600px 1200px #fff; }
        .stars-2 { box-shadow: 123px 456px #fff, 789px 234px #fff, 456px 890px #fff, 1100px 300px #fff, 200px 1200px #fff, 1500px 500px #fff, 600px 1700px #fff, 1300px 900px #fff; }

        .gradient-blur {
            position: fixed;
            z-index: 40;
            inset: 0 0 auto 0;
            height: 120px;
            pointer-events: none;
            background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
            backdrop-filter: blur(8px);
            mask-image: linear-gradient(to bottom, black, transparent);
            -webkit-mask-image: linear-gradient(to bottom, black, transparent);
        }

        .selection-purple::selection {
            background: var(--accent-purple);
            color: white;
        }

        .text-stroke {
            -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
            color: transparent;
        }
      `}} />

      <div className="min-h-screen bg-black text-white relative overflow-x-hidden selection-purple">
        {/* Global Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-[#11051f] to-black"></div>
            <div className="absolute top-0 left-0 w-[1px] h-[1px] bg-transparent stars-1 animate-[animStar_50s_linear_infinite]"></div>
            <div className="absolute top-0 left-0 w-[2px] h-[2px] bg-transparent stars-2 animate-[animStar_80s_linear_infinite]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_center,black_40%,transparent_80%)]"></div>
        </div>

        {/* Top Blur Header */}
        <div className="gradient-blur"></div>

        {/* Navbar */}
        <header className="fixed top-0 left-0 w-full z-50 pt-6 px-4">
            <nav className="max-w-5xl mx-auto flex items-center justify-between bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-2xl">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-purple-600 rounded-sm rotate-45"></div>
                    <span className="text-lg font-bold tracking-tight">VaidyaOS</span>
                </div>
                
                <div className="hidden md:flex items-center gap-8">
                    <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Features</a>
                    <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Patient</a>
                    <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">AI Voice</a>
                    <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Doctor</a>
                    <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">History</a>
                </div>

                <div className="flex items-center gap-4">
                    <a href="#" className="hidden md:block text-sm font-medium text-zinc-300 hover:text-white">Log out</a>
                    <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white/5 px-6 py-2 transition-transform active:scale-95">
                        <span className="absolute inset-0 border border-white/10 rounded-full"></span>
                        <span className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,#9333ea_100%)] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        <span className="absolute inset-[1px] rounded-full bg-black"></span>
                        <span className="relative z-10 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                            Get Access <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                    </button>
                </div>
            </nav>
        </header>

        <main className="relative z-10">
            {/* Hero Section */}
            <section className="min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6">
                <div className="text-center max-w-5xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-fade-up" style={{animationDelay: '0.1s'}}>
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
                        </span>
                        <span className="text-xs font-medium text-purple-100/90 tracking-wide">
                            VaidyaOS
                        </span>
                        <ArrowRight className="w-3 h-3 text-purple-400" />
                    </div>

                    <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter leading-[1.1] mb-8 animate-fade-up" style={{animationDelay: '0.2s'}}>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">Your voice , Your Health ,</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
                            <span className="text-purple-600 inline-block relative">
                                Our Care .
                                <svg className="absolute w-full h-3 -bottom-2 left-0 text-purple-600 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                                </svg>
                            </span>
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-up" style={{animationDelay: '0.3s'}}>
                        Your health journey begins with a conversation. Share your pain through our voice assistant and receive thoughtful guidance, personalized support, and better care.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 animate-fade-up" style={{animationDelay: '0.4s'}}>
                        <button className="shiny-cta group">
                            <span className="relative z-10 flex items-center gap-2 text-white font-medium">
                                Let's Start <ArrowRight className="transition-transform group-hover:translate-x-1" />
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Bento Grid */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-20 text-center max-w-3xl mx-auto animate-fade-up">
                        <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-6">
                            <span className="text-purple-600">Healing Hands</span>
                        </h2>
                        <p className="text-lg text-zinc-400 font-light">
                            Your voice tells your story. Share your symptoms, emotions, and concerns through our voice assistant to receive smarter, faster, and more personalized healthcare support.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-auto lg:h-[400px]">
                        {/* Main Feature Card */}
                        <div className="group relative overflow-hidden p-8 border border-white/10 bg-gradient-to-b from-zinc-900/50 to-black hover:border-white/20 transition-all rounded-xl">
                            <div className="relative z-10 h-full flex flex-col">
                                <div className="mb-6 inline-flex p-3 rounded-lg bg-white/5 border border-white/10 text-purple-600">
                                    <Bot className="w-6 h-6" />
                                </div>
                                <h3 className="text-3xl font-semibold text-white mb-4 tracking-tight">Register</h3>
                                <p className="text-zinc-400 text-lg leading-relaxed">Register yourself</p>
                                <div className="mt-auto flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                    <span className="text-xs font-mono text-purple-600">EXPLORE FEATURE</span>
                                    <ArrowRight className="w-4 h-4 text-purple-600" />
                                </div>
                            </div>
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" style={{background: 'radial-gradient(circle at top right, #9333ea, transparent 70%)'}}></div>
                        </div>

                        {/* Feature 2 */}
                        <div className="group relative overflow-hidden p-8 border border-white/10 bg-black hover:border-white/20 transition-all rounded-xl">
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="mb-4 inline-flex p-3 rounded-lg bg-white/5 border border-white/10 text-blue-400">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-semibold text-white mb-2">Medical Report</h3>
                                <p className="text-zinc-400">our health data transformed into clear reports and meaningful medical insights..</p>
                            </div>
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" style={{background: 'radial-gradient(circle at top right, #3b82f6, transparent 70%)'}}></div>
                        </div>

                        {/* Feature 3 */}
                        <div className="group relative overflow-hidden p-8 border border-white/10 bg-black hover:border-white/20 transition-all rounded-xl">
                            <div className="relative z-10">
                                <div className="mb-4 inline-flex p-3 rounded-lg bg-white/5 border border-white/10 text-yellow-400">
                                    <PhoneCall className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">Medical Help Line Number</h3>
                                <p className="text-sm text-zinc-400">Your Voice, Our Care</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial Banner */}
            <div className="w-full bg-purple-600 py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex justify-center gap-1 text-black mb-6">
                        <Star className="w-6 h-6 fill-current text-black" />
                        <Star className="w-6 h-6 fill-current text-black" />
                        <Star className="w-6 h-6 fill-current text-black" />
                        <Star className="w-6 h-6 fill-current text-black" />
                        <Star className="w-6 h-6 fill-current text-black" />
                    </div>
                    <h3 className="text-3xl md:text-5xl font-bold text-black leading-tight mb-8">
                        "you can see the rating and review of pateints"
                    </h3>
                </div>
            </div>

            {/* How It Works */}
            <section className="py-32 px-6 bg-black relative border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">How Its Works</h2>
                        <p className="text-zinc-400">Your's healthcare journey begins in three simple steps</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Option 1 */}
                        <div className="p-8 border border-zinc-800 bg-black hover:border-zinc-700 transition-all rounded-xl flex flex-col">
                            <h3 className="text-xl font-bold mb-4">Register yourself</h3>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center gap-3 text-sm text-zinc-300"><Check className="text-purple-600 w-5 h-5" /> Quick setup</li>
                                <li className="flex items-center gap-3 text-sm text-zinc-300"><Check className="text-purple-600 w-5 h-5" /> Secure profile</li>
                            </ul>
                            <button className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg text-sm font-bold uppercase tracking-wider transition-all">Start Here</button>
                        </div>

                        {/* Option 2 */}
                        <div className="p-8 border border-zinc-800 bg-black hover:border-zinc-700 transition-all rounded-xl flex flex-col">
                            <h3 className="text-xl font-bold mb-4">Record your voice</h3>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center gap-3 text-sm text-zinc-300"><Check className="text-purple-600 w-5 h-5" /> Describe symptoms</li>
                                <li className="flex items-center gap-3 text-sm text-zinc-300"><Check className="text-purple-600 w-5 h-5" /> Natural conversation</li>
                            </ul>
                            <button className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg text-sm font-bold uppercase tracking-wider transition-all">Record</button>
                        </div>

                        {/* Option 3 */}
                        <div className="p-8 border border-zinc-800 bg-black hover:border-zinc-700 transition-all rounded-xl flex flex-col">
                            <h3 className="text-xl font-bold mb-4">AI analyze</h3>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center gap-3 text-sm text-zinc-300"><Check className="text-purple-600 w-5 h-5" /> Instant processing</li>
                                <li className="flex items-center gap-3 text-sm text-zinc-300"><Check className="text-purple-600 w-5 h-5" /> Detailed insights</li>
                            </ul>
                            <button className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg text-sm font-bold uppercase tracking-wider transition-all">Analyze</button>
                        </div>

                        {/* Option 4 */}
                        <div className="relative p-8 border border-purple-600 bg-zinc-900/40 shadow-[0_0_30px_rgba(147,51,234,0.1)] rounded-xl flex flex-col z-10">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Recommended</div>
                            <h3 className="text-xl font-bold mb-4">Doctor preference</h3>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center gap-3 text-sm text-zinc-300"><Check className="text-purple-600 w-5 h-5" /> Get matched</li>
                                <li className="flex items-center gap-3 text-sm text-zinc-300"><Check className="text-purple-600 w-5 h-5" /> Book appointment</li>
                            </ul>
                            <button className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-bold uppercase tracking-wider transition-all">Select Doctor</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Waitlist */}
            <section className="py-32 px-6 text-center bg-zinc-950/40">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">Your Care Begins</h2>
                    <p className="text-xl text-zinc-400 mb-12">Tell about youeself , your syntoms and , your concerns . Our AI Assitant ready to listen.</p>
                    
                    <div className="max-w-md mx-auto flex flex-col sm:flex-row justify-center gap-4">
                        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full px-12 py-4 transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_40px_rgba(147,51,234,0.6)]">Let's Start</button>
                    </div>
                </div>
            </section>
        </main>

        {/* Footer */}
        <footer className="bg-black border-t border-zinc-900 pt-20 pb-10 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-24 relative z-10">
                <div className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-5 h-5 bg-purple-600 rounded-sm rotate-45"></div>
                        <span className="text-2xl font-bold tracking-tight">VaidyaOS</span>
                    </div>
                    <p className="text-zinc-500 max-w-xs leading-relaxed">Empowering healthier lives through smarter medical support.</p>
                </div>
                
                <div>
                    <h4 className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-6">Product</h4>
                    <ul className="space-y-4 text-zinc-400 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-6">Contact</h4>
                    <ul className="space-y-4 text-zinc-400 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors break-all">vaibhavgupta8890gmail.com</a></li>
                        <li><a href="#" className="hover:text-white transition-colors break-all">shambhavisrivastava909gmail.com</a></li>
                    </ul>
                </div>
            </div>

            {/* Huge Footer Text */}
            <div className="flex justify-center items-center py-10 opacity-20 pointer-events-none">
                <h1 className="text-[15vw] leading-none font-bold tracking-tighter text-stroke select-none">VAIDYAOS</h1>
            </div>

            <div className="max-w-7xl mx-auto px-6 border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between text-zinc-600 text-[10px] uppercase tracking-widest">
                <p>&copy; 2026 VaidyaOS. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-zinc-400">Twitter</a>
                    <a href="#" className="hover:text-zinc-400">LinkedIn</a>
                </div>
            </div>
        </footer>
      </div>
    </>
  );
}
