'use client';

import React from 'react';
import CardSwap, { Card } from '@/components/ui/card-swap';
import { Search } from 'lucide-react';

export default function PatientRecordsPage() {
  const cards = [
    {
      id: 1,
      title: "Sarah Jenkins",
      description: "Critical Case - ICU Ward 4. Immediate attention required for vital signs monitoring.",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Robert Chen",
      description: "Post-Op Recovery - Recovering from appendectomy. Stable condition.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Emily Davis",
      description: "Follow Up - Routine check up scheduled for 2:00 PM today.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Michael Brown",
      description: "Emergency - Admitted 2 hours ago. Awaiting lab results.",
      image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Jessica Taylor",
      description: "Pediatrics - 6 year old female. Monitoring fever and respiratory distress.",
      image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "David Wilson",
      description: "Neurology - Scheduled for MRI scan at 4:30 PM.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 7,
      title: "Amanda Garcia",
      description: "Maternity - Ward 2. Expecting mother, currently in first stage of labor.",
      image: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 8,
      title: "James Miller",
      description: "Cardiology - Routine ECG evaluation. Resting heart rate elevated.",
      image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-start relative overflow-hidden">
      {/* Deep Violet/Purple Radial Highlights */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-violet-900/20 rounded-full blur-[150px] pointer-events-none" />

      {/* Header & Search */}
      <div className="w-full max-w-2xl mt-12 mb-16 relative z-10 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500 tracking-tight text-center">
          Patient Records
        </h1>
        
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-purple-400">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            className="w-full bg-white/5 border border-purple-500/30 rounded-full py-4 pl-12 pr-6 text-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all shadow-[0_0_15px_rgba(147,51,234,0.1)] group-hover:shadow-[0_0_25px_rgba(147,51,234,0.2)]"
            placeholder="Search for a patient..."
          />
        </div>
      </div>

      {/* CardSwap Component */}
      <div className="relative z-10 flex flex-col items-center mt-4">
        <div className="relative w-[350px] h-[450px] md:w-[450px] md:h-[550px]">
          <CardSwap
            width="100%"
            height="100%"
            cardDistance={40}
            verticalDistance={30}
            delay={3500}
            pauseOnHover={true}
            skewAmount={4}
          >
            {cards.map((card) => (
              <Card key={card.id} className="p-0 overflow-hidden group border-purple-500/20 shadow-[0_0_30px_rgba(147,51,234,0.15)] bg-black">
                <div className="relative h-full w-full flex flex-col">
                  <div className="flex-1 overflow-hidden">
                    <img 
                      src={card.image} 
                      alt={card.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                      <h3 className="text-2xl font-bold text-white tracking-wide">{card.title}</h3>
                    </div>
                    <p className="text-base text-purple-200/80 leading-relaxed font-light">
                      {card.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>
        
        <p className="mt-16 text-purple-400/50 text-sm tracking-widest uppercase font-semibold">
          Auto-Syncing Live Records...
        </p>
      </div>
    </div>
  );
}
