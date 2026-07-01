'use client';

import React from 'react';
import { Search, Bell, Grid, BarChart2, MessageSquare, Wallet, Settings, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PatientDashboard() {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex overflow-hidden">
      {/* Background Mesh (Dark Mode) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-pink-900/10 rounded-full blur-[150px]" />
        <div className="absolute top-[30%] left-[40%] w-[40vw] h-[40vw] bg-violet-900/15 rounded-full blur-[150px]" />
      </div>

      {/* Sidebar */}
      <nav className="relative z-10 w-24 h-screen border-r border-white/10 bg-white/5 backdrop-blur-[20px] flex flex-col items-center py-8 justify-between shrink-0">
        <div className="flex flex-col items-center gap-8 w-full">
          {/* Logo */}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          
          {/* Nav Icons */}
          <div className="flex flex-col gap-4 w-full px-4">
            <button className="w-full aspect-square rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
              <Grid size={24} />
            </button>
            <button className="w-full aspect-square rounded-2xl hover:bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-colors">
              <BarChart2 size={24} />
            </button>
            <button className="w-full aspect-square rounded-2xl hover:bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-colors">
              <MessageSquare size={24} />
            </button>
            <button className="w-full aspect-square rounded-2xl hover:bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-colors">
              <Wallet size={24} />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 w-full px-4">
          <button className="w-full aspect-square rounded-2xl hover:bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-colors">
            <Settings size={24} />
          </button>
          <button className="w-full aspect-square rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center text-white">
            <User size={24} />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex-1 h-screen overflow-y-auto p-8 custom-scrollbar">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1 font-['Cabinet_Grotesk']">Dashboard Overview</h1>
            <p className="text-zinc-400">Welcome back, <span className="text-indigo-400 font-medium">Sarah J.</span> 👋</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
              <input 
                type="text" 
                placeholder="Search records..." 
                className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 backdrop-blur-md"
              />
            </div>
            <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors backdrop-blur-md">
              <Bell size={20} />
            </button>
          </div>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Active Projects (Sidebar card) */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.005 }}
            className="col-span-12 xl:col-span-3 row-span-2 bg-white/5 backdrop-blur-[28px] border border-white/10 rounded-[2rem] p-6 shadow-2xl flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold font-['Cabinet_Grotesk']">Active Projects</h2>
              <button className="text-zinc-500">⋮</button>
            </div>
            <p className="text-sm text-zinc-400 mb-8">Average <span className="text-indigo-400 font-medium">72%</span> completed</p>
            
            <div className="flex flex-col gap-6 flex-1">
              {/* Proj 1 */}
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">Laravel</h3>
                    <p className="text-xs text-zinc-500">E-commerce App</p>
                  </div>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 w-[85%] shadow-[0_0_10px_rgba(234,179,8,0.5)] rounded-full" />
                </div>
              </div>

              {/* Proj 2 */}
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">Figma</h3>
                    <p className="text-xs text-zinc-500">App UI Kit</p>
                  </div>
                  <span className="text-sm font-medium">42%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[42%] shadow-[0_0_10px_rgba(34,197,94,0.5)] rounded-full" />
                </div>
              </div>

              {/* Proj 3 */}
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">VueJS</h3>
                    <p className="text-xs text-zinc-500">Calendar Dashboard</p>
                  </div>
                  <span className="text-sm font-medium">90%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[90%] shadow-[0_0_10px_rgba(239,68,68,0.5)] rounded-full" />
                </div>
              </div>

              {/* Proj 4 */}
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">React</h3>
                    <p className="text-xs text-zinc-500">Admin Console</p>
                  </div>
                  <span className="text-sm font-medium">67%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 w-[67%] shadow-[0_0_10px_rgba(250,204,21,0.5)] rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Top Metrics Row */}
          <div className="col-span-12 xl:col-span-9 grid grid-cols-4 gap-6">
            {/* Metric 1 - Yellow Bars */}
            <motion.div whileHover={{ y: -6, scale: 1.01 }} className="col-span-1 bg-white/5 backdrop-blur-[28px] border border-white/10 rounded-3xl p-5 shadow-xl flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">SUGAR LEVEL</h3>
                  <p className="text-[10px] text-zinc-500">Last check</p>
                </div>
                <span className="bg-green-500/10 text-green-400 text-[10px] px-2 py-1 rounded-md font-medium">Normal</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold font-['Cabinet_Grotesk'] mb-1">96</div>
                  <div className="text-xs text-zinc-500">mg/dL</div>
                </div>
                <div className="flex items-end gap-1 h-8">
                  {[40, 70, 50, 100, 60, 80].map((h, i) => (
                    <div key={i} className="w-1.5 bg-yellow-500 rounded-t-full shadow-[0_0_5px_rgba(234,179,8,0.5)]" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Metric 2 - Green Bars */}
            <motion.div whileHover={{ y: -6, scale: 1.01 }} className="col-span-1 bg-white/5 backdrop-blur-[28px] border border-white/10 rounded-3xl p-5 shadow-xl flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">BP LEVEL</h3>
                  <p className="text-[10px] text-zinc-500">Last check</p>
                </div>
                <span className="bg-green-500/10 text-green-400 text-[10px] px-2 py-1 rounded-md font-medium">Normal</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold font-['Cabinet_Grotesk'] mb-1">120/80</div>
                  <div className="text-xs text-zinc-500">mmHg</div>
                </div>
                <div className="flex items-end gap-1 h-8">
                  {[50, 80, 60, 40, 90, 70].map((h, i) => (
                    <div key={i} className="w-1.5 bg-green-500 rounded-t-full shadow-[0_0_5px_rgba(34,197,94,0.5)]" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Metric 3 - Red Sparkline */}
            <motion.div whileHover={{ y: -6, scale: 1.01 }} className="col-span-1 bg-white/5 backdrop-blur-[28px] border border-white/10 rounded-3xl p-5 shadow-xl flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">HEART RATE</h3>
                  <p className="text-[10px] text-zinc-500">Last check</p>
                </div>
                <span className="bg-green-500/10 text-green-400 text-[10px] px-2 py-1 rounded-md font-medium">Normal</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold font-['Cabinet_Grotesk'] mb-1">72</div>
                  <div className="text-xs text-zinc-500">bpm</div>
                </div>
                <div className="w-16 h-8">
                  <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <path d="M0 20 Q 10 20, 20 10 T 40 30 T 60 20 T 80 15 T 100 25" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" className="drop-shadow-[0_0_3px_rgba(239,68,68,0.8)]"/>
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Statistics Mini */}
            <motion.div whileHover={{ y: -6, scale: 1.01 }} className="col-span-1 bg-white/5 backdrop-blur-[28px] border border-white/10 rounded-3xl p-5 shadow-xl flex flex-col justify-between">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider">STATISTICS</h3>
                <button className="text-zinc-500">⋮</button>
              </div>
              
              <div className="mb-2">
                <p className="text-[10px] text-zinc-400 mb-1">Overall Status</p>
                <p className="text-sm font-semibold text-green-400">Good</p>
              </div>
              
              <div>
                <p className="text-[10px] text-zinc-400 mb-1">Next Checkup</p>
                <p className="text-sm font-semibold text-yellow-500 mb-2">In 25 days</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-white/10 rounded-full">
                    <div className="w-[78%] h-full bg-yellow-500 rounded-full shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
                  </div>
                  <span className="text-[10px] font-medium">78%</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Large Charts Row */}
          <div className="col-span-12 xl:col-span-9 grid grid-cols-2 gap-6 -mt-2">
            
            {/* Blood Sugar Line Chart - Yellow */}
            <motion.div whileHover={{ y: -6, scale: 1.01 }} className="bg-white/5 backdrop-blur-[28px] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col h-64">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-bold uppercase tracking-wider">BLOOD SUGAR (FASTING)</h3>
                <span className="bg-green-500/10 text-green-400 text-xs px-2 py-1 rounded-md font-medium">Normal</span>
              </div>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-4xl font-bold font-['Cabinet_Grotesk']">96</span>
                <span className="text-sm text-zinc-400 mb-1">mg/dL</span>
              </div>
              <p className="text-xs text-zinc-500 mb-4">Reference Range: 70 - 100 mg/dL</p>
              
              <div className="flex-1 relative w-full mt-2">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-zinc-500">
                  <span>150</span>
                  <span>100</span>
                  <span>50</span>
                  <span>0</span>
                </div>
                
                {/* Chart Area */}
                <div className="absolute left-6 right-0 top-2 bottom-6">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    <div className="w-full h-px bg-white/5" />
                    <div className="w-full h-px bg-white/5" />
                    <div className="w-full h-px bg-white/5" />
                    <div className="w-full h-px bg-white/5" />
                  </div>
                  
                  {/* SVG Chart */}
                  <svg width="100%" height="100%" preserveAspectRatio="none" className="overflow-visible absolute inset-0">
                    <defs>
                      <linearGradient id="gradYellow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(234,179,8,0.3)" />
                        <stop offset="100%" stopColor="rgba(234,179,8,0)" />
                      </linearGradient>
                    </defs>
                    <path 
                      d="M 0 50 C 50 60, 100 50, 150 55 S 250 40, 300 50 S 400 60, 450 55" 
                      fill="none" 
                      stroke="#eab308" 
                      strokeWidth="3" 
                      strokeLinecap="round"
                      className="drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]"
                      vectorEffect="non-scaling-stroke"
                    />
                    <path 
                      d="M 0 50 C 50 60, 100 50, 150 55 S 250 40, 300 50 S 400 60, 450 55 L 450 100 L 0 100 Z" 
                      fill="url(#gradYellow)" 
                      vectorEffect="non-scaling-stroke"
                    />
                    {/* Points */}
                    <circle cx="0" cy="50" r="4" fill="#000" stroke="#eab308" strokeWidth="2" />
                    <circle cx="100" cy="50" r="4" fill="#000" stroke="#eab308" strokeWidth="2" />
                    <circle cx="200" cy="55" r="4" fill="#000" stroke="#eab308" strokeWidth="2" />
                    <circle cx="300" cy="50" r="4" fill="#000" stroke="#eab308" strokeWidth="2" />
                    <circle cx="450" cy="55" r="4" fill="#000" stroke="#eab308" strokeWidth="2" />
                  </svg>
                </div>
                
                {/* X-axis labels */}
                <div className="absolute left-6 right-0 bottom-0 flex justify-between text-[10px] text-zinc-500">
                  <span>12 May</span>
                  <span>13 May</span>
                  <span>14 May</span>
                  <span>15 May</span>
                  <span>16 May</span>
                  <span>17 May</span>
                  <span>18 May</span>
                </div>
              </div>
            </motion.div>

            {/* Blood Pressure Line Chart - Green and Red */}
            <motion.div whileHover={{ y: -6, scale: 1.01 }} className="bg-white/5 backdrop-blur-[28px] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col h-64">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-bold uppercase tracking-wider">BLOOD PRESSURE</h3>
                <div className="flex flex-col gap-1 text-[10px] text-zinc-400">
                  <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]"/> Systolic</div>
                  <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]"/> Diastolic</div>
                </div>
              </div>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-4xl font-bold font-['Cabinet_Grotesk']">120/80</span>
                <span className="text-sm text-zinc-400 mb-1">mmHg</span>
              </div>
              <p className="text-xs text-zinc-500 mb-4">Reference Range: {'<'} 130/85 mmHg</p>
              
              <div className="flex-1 relative w-full mt-2">
                {/* Y-axis */}
                <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-zinc-500">
                  <span>150</span>
                  <span>100</span>
                  <span>50</span>
                  <span>0</span>
                </div>
                
                {/* Chart Area */}
                <div className="absolute left-6 right-0 top-2 bottom-6">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    <div className="w-full h-px bg-white/5" />
                    <div className="w-full h-px bg-white/5" />
                    <div className="w-full h-px bg-white/5" />
                    <div className="w-full h-px bg-white/5" />
                  </div>
                  
                  {/* SVG Chart */}
                  <svg width="100%" height="100%" preserveAspectRatio="none" className="overflow-visible absolute inset-0">
                    <defs>
                      <linearGradient id="gradGreen" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(34,197,94,0.2)" />
                        <stop offset="100%" stopColor="rgba(34,197,94,0)" />
                      </linearGradient>
                      <linearGradient id="gradRed" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(239,68,68,0.2)" />
                        <stop offset="100%" stopColor="rgba(239,68,68,0)" />
                      </linearGradient>
                    </defs>
                    
                    {/* Systolic (Green) */}
                    <path 
                      d="M 0 30 C 50 35, 100 25, 150 25 S 250 35, 300 30 S 400 35, 450 35" 
                      fill="none" 
                      stroke="#22c55e" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                      className="drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]"
                      vectorEffect="non-scaling-stroke"
                    />
                    <path 
                      d="M 0 30 C 50 35, 100 25, 150 25 S 250 35, 300 30 S 400 35, 450 35 L 450 100 L 0 100 Z" 
                      fill="url(#gradGreen)" 
                      vectorEffect="non-scaling-stroke"
                    />

                    {/* Diastolic (Red) */}
                    <path 
                      d="M 0 70 C 50 75, 100 65, 150 70 S 250 80, 300 70 S 400 75, 450 75" 
                      fill="none" 
                      stroke="#ef4444" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                      className="drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                      vectorEffect="non-scaling-stroke"
                    />
                    <path 
                      d="M 0 70 C 50 75, 100 65, 150 70 S 250 80, 300 70 S 400 75, 450 75 L 450 100 L 0 100 Z" 
                      fill="url(#gradRed)" 
                      vectorEffect="non-scaling-stroke"
                    />

                    {/* Points Green */}
                    <circle cx="0" cy="30" r="3" fill="#000" stroke="#22c55e" strokeWidth="2" />
                    <circle cx="150" cy="25" r="3" fill="#000" stroke="#22c55e" strokeWidth="2" />
                    <circle cx="300" cy="30" r="3" fill="#000" stroke="#22c55e" strokeWidth="2" />
                    <circle cx="450" cy="35" r="3" fill="#000" stroke="#22c55e" strokeWidth="2" />
                    
                    {/* Points Red */}
                    <circle cx="0" cy="70" r="3" fill="#000" stroke="#ef4444" strokeWidth="2" />
                    <circle cx="150" cy="70" r="3" fill="#000" stroke="#ef4444" strokeWidth="2" />
                    <circle cx="300" cy="70" r="3" fill="#000" stroke="#ef4444" strokeWidth="2" />
                    <circle cx="450" cy="75" r="3" fill="#000" stroke="#ef4444" strokeWidth="2" />
                  </svg>
                </div>
                
                {/* X-axis labels */}
                <div className="absolute left-6 right-0 bottom-0 flex justify-between text-[10px] text-zinc-500">
                  <span>12 May</span>
                  <span>13 May</span>
                  <span>14 May</span>
                  <span>15 May</span>
                  <span>16 May</span>
                  <span>17 May</span>
                  <span>18 May</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Statistics Section */}
          <motion.div whileHover={{ y: -4, scale: 1.002 }} className="col-span-12 bg-white/5 backdrop-blur-[28px] border border-white/10 rounded-[2rem] p-8 shadow-xl flex items-center justify-between">
            
            {/* Left Stats */}
            <div className="flex gap-16">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4">STATISTICS</h3>
                <p className="text-xs text-zinc-400 mb-1">Overall Progress</p>
                <p className="text-lg font-semibold text-green-400 mb-4">Good</p>
                <p className="text-xs text-zinc-400 mb-1">Total Records</p>
                <p className="text-lg font-semibold text-yellow-400">128</p>
              </div>
              
              {/* Radial Progress */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Background Track */}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                  {/* Active Track (Yellow) */}
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="none" 
                    stroke="#eab308" 
                    strokeWidth="10" 
                    strokeLinecap="round"
                    strokeDasharray="251.2"
                    strokeDashoffset="55.264" // (1 - 0.78) * 251.2
                    className="drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]"
                  />
                </svg>
                <span className="absolute text-2xl font-bold font-['Cabinet_Grotesk']">78%</span>
              </div>
            </div>

            {/* Right Info */}
            <div className="flex gap-24 pr-12">
              <div>
                <p className="text-xs text-zinc-400 mb-2">Health Score</p>
                <div className="flex items-center gap-2 text-yellow-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  <span className="font-semibold text-white">18 May 2025</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-zinc-400 mb-2">Next Checkup</p>
                <div className="flex items-center gap-2 text-yellow-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  <span className="font-semibold text-white">12 June 2025</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
