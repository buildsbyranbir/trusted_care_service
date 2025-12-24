import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Star,
  ShieldCheck,
  Clock,
  MessageSquare,
} from 'lucide-react';

import { SERVICES, SERVICE_ICONS } from '../constants';
import { getCareAdvice } from '../services/geminiService';

const Home = () => {
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiAsk = async (e) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setIsAiLoading(true);
    try {
      const response = await getCareAdvice(aiPrompt);
      setAiResponse(response);
    } catch (error) {
      setAiResponse('Something went wrong. Please try again.');
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="space-y-20">
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 to-transparent z-10" />
        <img
          src="https://picsum.photos/id/1/1600/900"
          alt="Care Service"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-20 max-w-7xl mx-auto px-4 text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 max-w-2xl">
            Trusted Care for Those You Love Most
          </h1>
          <p className="text-xl mb-8 max-w-xl text-slate-100">
            Find trusted caregivers for children, elderly, and home care needs.
          </p>

          <div className="flex gap-4">
            <a
              href="#services"
              className="bg-teal-500 hover:bg-teal-600 px-8 py-4 rounded-xl font-bold"
            >
              Explore Services
            </a>
            <Link
              to="/register"
              className="bg-white/10 border border-white/20 px-8 py-4 rounded-xl font-bold"
            >
              Join as Caregiver
            </Link>
          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-teal-600 font-bold text-sm uppercase">
            About Care.xyz
          </span>
          <h2 className="text-4xl font-bold mt-4 mb-6">
            Making Caregiving Easy & Secure
          </h2>
          <p className="text-slate-600 text-lg mb-8">
            Care.xyz connects families with trusted caregivers through a secure
            and simple booking platform.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex gap-3">
              <ShieldCheck className="text-teal-600 w-6 h-6" />
              <div>
                <h4 className="font-bold">Verified Caregivers</h4>
                <p className="text-sm text-slate-500">
                  Background checked professionals
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Clock className="text-teal-600 w-6 h-6" />
              <div>
                <h4 className="font-bold">24/7 Support</h4>
                <p className="text-sm text-slate-500">
                  Always here when you need help
                </p>
              </div>
            </div>
          </div>
        </div>

        <img
          src="https://picsum.photos/id/10/800/600"
          alt="Care Team"
          className="rounded-2xl shadow-xl"
        />
      </section>

      {/* ================= SERVICES SECTION ================= */}
      <section id="services" className="bg-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Our Care Services
            </h2>
            <p className="text-slate-600">
              Choose the right service for your family
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition"
              >
                <div className="mb-6 p-4 bg-slate-50 inline-block rounded-xl">
                  {SERVICE_ICONS[service.icon]}
                </div>

                <h3 className="text-2xl font-bold mb-4">
                  {service.name}
                </h3>
                <p className="text-slate-600 mb-6">
                  {service.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className="font-bold text-teal-600">
                    ${service.pricePerHour}/hr
                  </span>
                  <Link
                    to={`/service/${service.id}`}
                    className="flex items-center gap-2 font-bold"
                  >
                    View <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= AI ADVISOR ================= */}
      <section className="max-w-5xl mx-auto px-4 bg-white rounded-3xl shadow-xl border p-8 relative">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <MessageSquare size={180} />
        </div>

        <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
          <Star className="text-teal-600" />
          Smart Care Advisor
        </h2>

        <form onSubmit={handleAiAsk} className="flex flex-col md:flex-row gap-4">
          <input
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="Describe your care needs..."
            className="flex-grow p-4 border rounded-xl"
          />

          <button
            type="submit"
            disabled={isAiLoading}
            className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold disabled:opacity-50"
          >
            {isAiLoading ? 'Analyzing...' : 'Get Advice'}
          </button>
        </form>

        {aiResponse && (
          <div className="mt-6 p-6 bg-teal-50 rounded-xl">
            <p className="italic text-teal-800">
              "{aiResponse}"
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
