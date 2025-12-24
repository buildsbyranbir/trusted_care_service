import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';
import { bookingService } from '../services/bookingService';
import {
  Clock,
  MapPin,
  Package,
  XCircle
} from 'lucide-react';

const MyBookingsPage = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (user) {
      setBookings(bookingService.getAll(user.id));
    }
  }, [user]);

  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      bookingService.cancel(id);
      setBookings(prev =>
        prev.map(b =>
          b.id === id ? { ...b, status: 'CANCELLED' } : b
        )
      );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-amber-100 text-amber-700';
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-700';
      case 'COMPLETED':
        return 'bg-green-100 text-green-700';
      case 'CANCELLED':
        return 'bg-slate-100 text-slate-600';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const filteredBookings = bookings.filter(
    b =>
      filter === 'all' ||
      b.status.toLowerCase() === filter.toLowerCase()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <p className="text-slate-500 mt-1">
            Track and manage your care service requests.
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                filter === f
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredBookings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
          <Package size={64} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-900">
            No bookings found
          </h3>
          <p className="text-slate-500 mt-2">
            You haven't made any {filter !== 'all' ? filter : ''} bookings yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBookings.map(booking => (
            <div
              key={booking.id}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg hover:shadow-xl transition-all"
            >
              {/* Top */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    ID: {booking.id}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {booking.serviceName}
                  </h3>
                </div>
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-bold ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>
              </div>

              {/* Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-slate-600 text-sm">
                  <Clock size={16} />
                  <span>
                    {booking.duration} {booking.durationUnit}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-slate-600 text-sm">
                  <Package size={16} />
                  <span>
                    Total:{' '}
                    <span className="font-bold text-slate-900">
                      ${booking.totalCost}
                    </span>
                  </span>
                </div>

                <div className="flex items-start gap-2 text-slate-600 text-sm col-span-2">
                  <MapPin size={16} className="mt-1 flex-shrink-0" />
                  <span className="line-clamp-2">
                    {booking.location.address},{' '}
                    {booking.location.area},{' '}
                    {booking.location.city}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Booked on:{' '}
                  {new Date(booking.createdAt).toLocaleDateString()}
                </span>

                <div className="flex gap-2">
                  <button className="text-xs font-bold text-teal-600 hover:bg-teal-50 px-3 py-1.5 rounded-lg transition-colors">
                    View Invoice
                  </button>

                  {booking.status === 'PENDING' && (
                    <button
                      onClick={() => handleCancel(booking.id)}
                      className="text-xs font-bold text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <XCircle size={14} /> Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
