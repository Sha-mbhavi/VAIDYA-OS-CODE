'use client';

import React from 'react';
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal';
import Image from 'next/image';

const content = [
  {
    title: "Personal Information",
    description:
      "Begin by entering the patient's basic demographic data. This includes their full name, date of birth, contact information, and residential address. Accurate personal info ensures smooth communication.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white relative">
        <img
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop"
          className="h-full w-full object-cover opacity-80"
          alt="Personal Info"
        />
        <div className="absolute inset-0 bg-purple-900/40 mix-blend-multiply" />
      </div>
    ),
  },
  {
    title: "Medical History",
    description:
      "Record any past illnesses, surgeries, chronic conditions, and family medical history. Documenting these details is critical for doctors to make informed decisions about future treatments.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white relative">
        <img
          src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1000&auto=format&fit=crop"
          className="h-full w-full object-cover opacity-80"
          alt="Medical History"
        />
        <div className="absolute inset-0 bg-purple-900/40 mix-blend-multiply" />
      </div>
    ),
  },
  {
    title: "Current Medications",
    description:
      "Note down all active prescriptions, over-the-counter medications, and supplements the patient is currently taking to prevent any severe drug interactions.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white relative">
        <img
          src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000&auto=format&fit=crop"
          className="h-full w-full object-cover opacity-80"
          alt="Medications"
        />
        <div className="absolute inset-0 bg-purple-900/40 mix-blend-multiply" />
      </div>
    ),
  },
  {
    title: "Emergency Contacts",
    description:
      "Provide details for at least two trusted emergency contacts, including their relationship to the patient. This ensures we can quickly reach out if an urgent situation arises.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white relative">
        <img
          src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1000&auto=format&fit=crop"
          className="h-full w-full object-cover opacity-80"
          alt="Emergency Contact"
        />
        <div className="absolute inset-0 bg-purple-900/40 mix-blend-multiply" />
      </div>
    ),
  },
];

export default function NewPatientRegister() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-start py-20 relative overflow-hidden">
      {/* Deep Violet/Purple Radial Highlights */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-violet-900/20 rounded-full blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col items-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500 tracking-tight text-center">
          New Patient Register
        </h1>
        <p className="text-purple-300/50 text-lg tracking-wide max-w-2xl text-center px-4">
          Scroll down to seamlessly navigate the patient onboarding process. The form will guide you step by step.
        </p>
      </div>

      {/* Sticky Scroll Reveal */}
      <div className="relative z-10 w-full px-4">
        <StickyScroll content={content} />
      </div>
    </div>
  );
}
