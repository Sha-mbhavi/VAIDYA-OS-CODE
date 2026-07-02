'use client';

import React from 'react';
import { HeroSection } from '@/components/ui/feature-carousel';

export default function Home() {
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=900&auto=format&fit=crop&q=60',
      alt: 'Doctors in discussion',
      label: 'Total appointments'
    },
    {
      src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=900&auto=format&fit=crop&q=60',
      alt: 'Stethoscope on a laptop with medical records',
      label: 'New patients'
    },
    {
      src: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=900&auto=format&fit=crop&q=60',
      alt: 'Doctor showing patient data on a tablet',
      label: 'Critical cases'
    },
    {
      src: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=900&auto=format&fit=crop&q=60',
      alt: 'Medical professional team looking at charts',
      label: 'Emergency cases'
    },
    {
      src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&auto=format&fit=crop&q=60',
      alt: 'Doctor taking clinical notes during an appointment',
      label: 'Patient history'
    },
  ];

  const title = (
    <>
      Manage your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">appointments & patients</span>
    </>
  );

  return (
    <div className="w-full dark">
      <HeroSection
        title={title}
        subtitle=""
        images={images}
      />
    </div>
  );
}

 
