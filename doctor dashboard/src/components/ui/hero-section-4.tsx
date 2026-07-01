'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { 
    Cpu, 
    Database, 
    Globe, 
    Activity, 
    Cloud, 
    Layers, 
    Box, 
    Code 
} from 'lucide-react'

export function HeroSection() {
    return (
        <div className="relative dark:bg-black bg-white dark:text-white text-black min-h-screen">
            <header className="absolute top-0 w-full z-50 px-6 py-6 flex justify-end max-w-6xl mx-auto left-0 right-0">
                <Link href="/login">
                    <Button variant="outline" className="bg-transparent border-white/20 hover:bg-white/10 text-white rounded-full px-6">
                        Login
                    </Button>
                </Link>
            </header>
            <main className="overflow-x-hidden">
                <section>
                    <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-24">
                        <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
                            <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left bg-zinc-900/50 p-8 sm:p-10 rounded-2xl border border-white/10 backdrop-blur-md relative z-10 mt-16 lg:mt-32">
                                <h2 className="text-3xl sm:text-4xl font-medium mb-8 text-white text-left">Get Started</h2>
                                <form className="flex flex-col gap-6 text-left">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                                        <input type="text" placeholder="John Doe" className="w-full bg-black border border-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-300">Email Address</label>
                                        <input type="email" placeholder="john@example.com" className="w-full bg-black border border-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-300">Mobile Number</label>
                                        <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-black border border-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors" />
                                    </div>
                                    <Button size="lg" className="mt-2 w-full bg-white text-black hover:bg-gray-200 py-6 text-lg">
                                        Request Access
                                    </Button>
                                </form>
                            </div>
                            <img
                                className="pointer-events-none order-first ml-auto h-56 w-full object-cover invert sm:h-96 lg:absolute lg:inset-0 lg:-right-20 lg:-top-96 lg:order-last lg:h-max lg:w-2/3 lg:object-contain dark:mix-blend-lighten dark:invert-0"
                                src="https://ik.imagekit.io/lrigu76hy/tailark/abstract-bg.jpg?updatedAt=1745733473768"
                                alt="Abstract Object"
                                height="4000"
                                width="3000"
                            />
                        </div>
                    </div>
                </section>
                <section className="pb-16 md:pb-32 relative z-10">
                    <div className="group relative m-auto max-w-6xl px-6">
                        <div className="flex flex-col items-center md:flex-row">
                            <div className="md:max-w-44 md:border-r md:pr-6 border-white/20">
                                <p className="text-end text-sm">Powering the best teams</p>
                            </div>
                            <div className="relative py-6 md:w-[calc(100%-11rem)]">
                                <InfiniteSlider
                                    durationOnHover={20}
                                    duration={40}
                                    gap={112}>
                                    <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                                        <Cpu className="h-6 w-6" />
                                        <span className="font-semibold tracking-wider">NVIDIA</span>
                                    </div>

                                    <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                                        <Database className="h-6 w-6" />
                                        <span className="font-semibold tracking-wider">COLUMN</span>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                                        <Globe className="h-6 w-6" />
                                        <span className="font-semibold tracking-wider">GITHUB</span>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                                        <Activity className="h-6 w-6" />
                                        <span className="font-semibold tracking-wider">NIKE</span>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                                        <Cloud className="h-6 w-6" />
                                        <span className="font-semibold tracking-wider">LEMONSQUEEZY</span>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                                        <Layers className="h-6 w-6" />
                                        <span className="font-semibold tracking-wider">LARAVEL</span>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                                        <Box className="h-6 w-6" />
                                        <span className="font-semibold tracking-wider">LILLY</span>
                                    </div>

                                    <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                                        <Code className="h-6 w-6" />
                                        <span className="font-semibold tracking-wider">OPENAI</span>
                                    </div>
                                </InfiniteSlider>

                                <div className="bg-gradient-to-r from-black absolute inset-y-0 left-0 w-20 z-10"></div>
                                <div className="bg-gradient-to-l from-black absolute inset-y-0 right-0 w-20 z-10"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
