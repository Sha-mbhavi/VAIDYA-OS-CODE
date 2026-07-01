'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Shield, User, Lock, Server, Headset, ShieldCheck } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type BillingCycle = 'monthly' | 'annual';

interface PlanFeature {
  text: string;
}

interface PricingPlan {
  id: string;
  name: string;
  subName: string;
  description: string;
  price: {
    monthly: number | 'Custom';
    annual: number | 'Custom';
  };
  features: PlanFeature[];
  highlight?: boolean;
  ctaText: string;
  icon: React.ElementType;
}

const plans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    subName: 'For Individuals & Small Clinics',
    description: 'Essential AI tools to assist with daily clinical tasks.',
    price: { monthly: 0, annual: 0 },
    icon: User,
    ctaText: 'Get Started',
    features: [
      { text: 'AI Symptom Analysis (Basic)' },
      { text: 'Patient History Management' },
      { text: 'Vitals & Health Tracking' },
      { text: 'Basic Clinical Reports' },
      { text: 'Secure Data Storage (5 GB)' },
      { text: 'Email Support' },
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    subName: 'For Growing Practices',
    description: 'Advanced AI assistance for better clinical decision-making.',
    price: { monthly: 49, annual: 470 },
    icon: Star,
    highlight: true,
    ctaText: 'Upgrade to Professional ✨',
    features: [
      { text: 'Everything in Basic' },
      { text: 'AI Clinical Assistant (Advanced)' },
      { text: 'Drug Interaction Checker' },
      { text: 'Lab Test Interpretation' },
      { text: 'Clinical Decision Support' },
      { text: 'Custom Templates & Notes' },
      { text: 'Secure Data Storage (50 GB)' },
      { text: 'Priority Support' },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    subName: 'For Hospitals & Large Clinics',
    description: 'Comprehensive AI platform for large-scale clinical operations.',
    price: { monthly: 'Custom', annual: 'Custom' },
    icon: ShieldCheck,
    ctaText: 'Contact Sales',
    features: [
      { text: 'Everything in Professional' },
      { text: 'Multi-User & Role Management' },
      { text: 'Advanced Analytics & Insights' },
      { text: 'API Access & Integrations' },
      { text: 'Audit Logs & Compliance' },
      { text: 'On-Premise / Private Cloud' },
      { text: 'Dedicated Account Manager' },
      { text: '24/7 Priority Support' },
    ],
  }
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30 overflow-hidden">
      
      {/* Background Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-purple-900/20 rounded-full blur-[150px]" />
      </div>

      <section className="relative z-10 w-full py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          
          {/* Header */}
          <div className="mb-16 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-4"
            >
              Clinical Assist Plans
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-zinc-400 max-w-2xl mx-auto"
            >
              Choose the right plan to empower your clinical practice. Secure, compliant & built for healthcare.
            </motion.p>

            {/* Toggle */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 flex items-center justify-center gap-4"
            >
              <span className={cn("text-sm transition-colors", billingCycle === 'monthly' ? "text-white font-medium" : "text-zinc-500")}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(c => c === 'monthly' ? 'annual' : 'monthly')}
                className="relative h-8 w-14 rounded-full bg-zinc-800 p-1 ring-1 ring-white/10 transition-all hover:ring-purple-500/50 focus:outline-none"
              >
                <motion.div
                  className="h-6 w-6 rounded-full bg-purple-500 shadow-md"
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  animate={{ x: billingCycle === 'monthly' ? 0 : 24 }}
                />
              </button>
              <span className={cn("text-sm transition-colors flex items-center gap-3", billingCycle === 'annual' ? "text-white font-medium" : "text-zinc-500")}>
                Annual
                <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-400">
                  Save 20%
                </span>
              </span>
            </motion.div>
          </div>

          {/* Pricing Grid */}
          <div className="grid gap-8 lg:grid-cols-3 xl:gap-10 items-start">
            {plans.map((plan, index) => (
              <PriceCard 
                key={plan.id} 
                plan={plan} 
                billingCycle={billingCycle} 
                index={index} 
              />
            ))}
          </div>

          {/* Bottom Trust Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <TrustBadge icon={Lock} title="HIPAA Compliant" desc="Your data is safe & secure" />
            <TrustBadge icon={Shield} title="Clinical Grade Security" desc="End-to-end encrypted" />
            <TrustBadge icon={Server} title="99.9% Uptime" desc="Reliable & always available" />
            <TrustBadge icon={Headset} title="Trusted Support" desc="We're here to help" />
          </motion.div>

        </div>
      </section>
    </div>
  );
}

function PriceCard({ plan, billingCycle, index }: { plan: PricingPlan; billingCycle: BillingCycle; index: number }) {
  const isCustom = plan.price.monthly === 'Custom';
  const priceDisplay = isCustom 
    ? 'Custom' 
    : `$${billingCycle === 'monthly' ? plan.price.monthly : Math.floor((plan.price.annual as number) / 12)}`;
  
  const Icon = plan.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
      className={cn(
        "relative flex flex-col rounded-[2rem] p-8 backdrop-blur-xl transition-all duration-300 h-full",
        plan.highlight 
          ? "bg-zinc-900/80 border border-purple-500 ring-1 ring-purple-500/50 shadow-[0_0_40px_rgba(168,85,247,0.15)] lg:-mt-4 lg:mb-4 z-10" 
          : "bg-zinc-900/40 border border-white/10 hover:bg-zinc-900/60 hover:border-purple-500/30"
      )}
    >
      {plan.highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-purple-600 px-6 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-purple-600/30">
          Most Popular
        </div>
      )}

      {/* Card Header */}
      <div className="mb-6">
        <div className={cn("mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl", plan.highlight ? "bg-purple-600/20 text-purple-400" : "bg-white/5 text-zinc-300")}>
          <Icon className="h-7 w-7" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
        <p className="text-sm font-medium text-purple-400 mb-4">{plan.subName}</p>
        <p className="text-sm text-zinc-400 leading-relaxed min-h-[40px]">{plan.description}</p>
      </div>

      {/* Price */}
      <div className="mb-8 flex items-baseline gap-1">
        <span className="text-5xl font-bold tracking-tight text-white">
           {priceDisplay}
        </span>
        {!isCustom && (
          <span className="text-sm text-zinc-500 font-medium">
            /mo
          </span>
        )}
      </div>

      {/* Features */}
      <ul className="mb-10 flex-1 space-y-4">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
            <div className="mt-0.5 w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
              <Check className="h-3 w-3 text-purple-400" strokeWidth={3} />
            </div>
            <span className="leading-relaxed">{feature.text}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        className={cn(
          "w-full rounded-xl px-4 py-4 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black",
          plan.highlight
            ? "bg-purple-600 text-white hover:bg-purple-500 shadow-[0_0_20px_rgba(147,51,234,0.4)]"
            : "bg-transparent border border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
        )}
      >
        {plan.ctaText}
      </button>
    </motion.div>
  );
}

function TrustBadge({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/30 border border-white/5 backdrop-blur-sm">
      <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-white mb-0.5">{title}</h4>
        <p className="text-xs text-zinc-500">{desc}</p>
      </div>
    </div>
  );
}
