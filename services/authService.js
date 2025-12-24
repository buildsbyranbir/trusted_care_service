const USER_KEY = 'care_io_user';

export const authService = {
  login: async (email, password) => {
    // Simulated API call
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email: email
    };

    localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
    return mockUser;
  },

  register: async (data) => {
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      email: data.email,
      nid: data.nid,
      contact: data.contact
    };

    localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
    return mockUser;
  },

  logout: () => {
    localStorage.removeItem(USER_KEY);
  },

  getCurrentUser: () => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  }
};
