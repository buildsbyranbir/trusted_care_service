import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SERVICES, DIVISIONS } from '../constants';
import { bookingService } from '../services/bookingService';
import { useAuth } from '../App';
import {
  Calendar,
  MapPin,
  CreditCard,
  ChevronRight,
  CheckCircle
} from 'lucide-react';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const service = SERVICES.find(s => s.id === id);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    duration: 1,
    durationUnit: 'hours',
    division: '',
    district: '',
    city: '',
    area: '',
    address: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!service) {
      navigate('/');
    }
  }, [service, navigate]);

  const totalCost = service
    ? formData.durationUnit === 'hours'
      ? service.pricePerHour * formData.duration
      : service.pricePerHour * 8 * formData.duration
    : 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !service) return;

    setIsSubmitting(true);
    try {
      await bookingService.create({
        userId: user.id,
        serviceId: service.id,
        serviceName: service.name,
        duration: Number(formData.duration),
        durationUnit: formData.durationUnit,
        location: {
          division: formData.division,
          district: formData.district,
          city: formData.city,
          area: formData.area,
          address: formData.address
        },
        totalCost
      });

      setIsSuccess(true);
      setTimeout(() => navigate('/my-bookings'), 2000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!service) return null;

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 text-center animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={48} />
        </div>
        <h2 className="text-3xl font-bold mb-4">Booking Successful!</h2>
        <p className="text-slate-600 mb-8">
          An invoice has been sent to your email. Redirecting to your bookings...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Book {service.name}</h1>

      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10 -translate-y-1/2" />
        {[1, 2, 3].map(s => (
          <div
            key={s}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-colors ${
              step >= s
                ? 'bg-teal-600 border-teal-600 text-white'
                : 'bg-white border-slate-200 text-slate-400'
            }`}
          >
            {s}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100"
      >
        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Calendar className="text-teal-600" /> Duration Details
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="duration"
                min="1"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full p-4 border rounded-xl"
                required
              />

              <select
                name="durationUnit"
                value={formData.durationUnit}
                onChange={handleInputChange}
                className="w-full p-4 border rounded-xl"
              >
                <option value="hours">Hours</option>
                <option value="days">Days</option>
              </select>
            </div>

            <div className="flex justify-between bg-teal-50 p-4 rounded-xl">
              <span>Estimated Cost</span>
              <span className="font-bold">${totalCost}</span>
            </div>

            <button type="button" onClick={handleNext} className="btn-primary">
              Next <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <MapPin className="text-teal-600" /> Location Info
            </h3>

            <select
              name="division"
              value={formData.division}
              onChange={handleInputChange}
              className="w-full p-4 border rounded-xl"
              required
            >
              <option value="">Select Division</option>
              {DIVISIONS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <input name="district" value={formData.district} onChange={handleInputChange} placeholder="District" className="input" />
            <input name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className="input" />
            <input name="area" value={formData.area} onChange={handleInputChange} placeholder="Area" className="input" />

            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Detailed Address"
              className="input"
            />

            <div className="flex gap-4">
              <button type="button" onClick={handleBack} className="btn-secondary">Back</button>
              <button type="button" onClick={handleNext} className="btn-primary">
                Review <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CreditCard className="text-teal-600" /> Confirm
            </h3>

            <div className="bg-slate-50 p-6 rounded-xl">
              <p><b>Service:</b> {service.name}</p>
              <p><b>Duration:</b> {formData.duration} {formData.durationUnit}</p>
              <p><b>Address:</b> {formData.address}</p>
              <p className="text-xl font-bold mt-2">${totalCost}</p>
            </div>

            <div className="flex gap-4">
              <button type="button" onClick={handleBack} className="btn-secondary">Back</button>
              <button type="submit" disabled={isSubmitting} className="btn-primary">
                {isSubmitting ? 'Confirming...' : 'Confirm & Book'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default BookingPage;
