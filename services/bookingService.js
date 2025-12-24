const BOOKINGS_KEY = 'care_io_bookings';

export const bookingService = {
  getAll: (userId) => {
    const stored = localStorage.getItem(BOOKINGS_KEY);
    const all = stored ? JSON.parse(stored) : [];
    return all.filter(b => b.userId === userId);
  },

  create: async (bookingData) => {
    const newBooking = {
      ...bookingData,
      id: 'BK-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      createdAt: new Date().toISOString(),
      status: 'PENDING'
    };

    const stored = localStorage.getItem(BOOKINGS_KEY);
    const all = stored ? JSON.parse(stored) : [];
    all.push(newBooking);

    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(all));

    // Simulate email invoice
    console.log(`Invoice sent to user for booking ${newBooking.id}`);

    return newBooking;
  },

  cancel: (id) => {
    const stored = localStorage.getItem(BOOKINGS_KEY);
    let all = stored ? JSON.parse(stored) : [];

    all = all.map(b =>
      b.id === id ? { ...b, status: 'CANCELLED' } : b
    );

    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(all));
  }
};
