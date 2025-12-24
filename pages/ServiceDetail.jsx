import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  Clock,
  Users
} from 'lucide-react';
import { SERVICES, SERVICE_ICONS } from '../constants';

const ServiceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const service = SERVICES.find(s => s.id === id);

  useEffect(() => {
    if (service) {
      document.title = `${service.name} - Care.xyz`;
    }
  }, [service]);

  if (!service) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Service not found</h2>
        <Link to="/" className="text-teal-600 mt-4 underline">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-600 hover:text-teal-600 mb-8 font-medium transition-colors"
      >
        <ArrowLeft size={20} /> Back to Services
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center gap-6">
            <div className="p-6 bg-white rounded-3xl shadow-lg border border-slate-100">
              {SERVICE_ICONS[service.icon]}
            </div>
            <div>
              <h1 className="text-4xl font-bold">{service.name}</h1>
              <p className="text-teal-600 font-bold text-xl mt-1">
                ${service.pricePerHour}/hour
              </p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Service Overview
            </h3>
            <p className="mb-6">{service.longDescription}</p>

            <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
              What is Included?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm"
                >
                  <CheckCircle2 className="text-teal-500 w-6 h-6 flex-shrink-0" />
                  <span className="font-medium text-slate-800">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 text-white p-8 rounded-3xl flex flex-wrap gap-8 justify-between items-center">
            <div>
              <h3 className="text-xl font-bold mb-1">
                Still Have Questions?
              </h3>
              <p className="text-slate-400">
                Our care team is available for a free consultation.
              </p>
            </div>
            <button className="bg-teal-500 hover:bg-teal-600 px-6 py-3 rounded-xl font-bold transition-colors">
              Request Callback
            </button>
          </div>
        </div>

        {/* Sidebar / Booking Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 sticky top-24">
            <h3 className="text-2xl font-bold mb-6">
              Book this Service
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <ShieldCheck className="text-teal-600" />
                <span className="text-sm font-medium">
                  Verified Professional
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <Clock className="text-teal-600" />
                <span className="text-sm font-medium">
                  Available 24/7
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <Users className="text-teal-600" />
                <span className="text-sm font-medium">
                  Insurance Covered
                </span>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-500 font-medium">
                  Starting from
                </span>
                <span className="text-2xl font-bold">
                  ${service.pricePerHour}/hr
                </span>
              </div>

              <Link
                to={`/booking/${service.id}`}
                className="block w-full text-center bg-teal-600 text-white py-4 rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-100"
              >
                Proceed to Booking
              </Link>

              <p className="text-center text-slate-400 text-xs mt-4">
                Free cancellation within 24 hours of booking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
