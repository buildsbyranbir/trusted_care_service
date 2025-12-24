import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate
} from 'react-router-dom';
import {
  Menu,
  X,
  LogOut,
  HeartPulse
} from 'lucide-react';

import { authService } from './services/authService';

// Pages
import HomePage from './pages/Home';
import ServiceDetailPage from './pages/ServiceDetail';
import BookingPage from './pages/Booking';
import MyBookingsPage from './pages/MyBookings';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import NotFoundPage from './pages/NotFound';

/* ================= AUTH CONTEXT ================= */

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (email) => {
    const loggedUser = await authService.login(email);
    setUser(loggedUser);
  };

  const register = async (data) => {
    const newUser = await authService.register(data);
    setUser(newUser);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* ================= NAVBAR ================= */

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const NavLinks = () => (
    <>
      <Link to="/" className="hover:text-teal-600">Home</Link>
      <Link to="/#services" className="hover:text-teal-600">Services</Link>

      {user ? (
        <>
          <Link to="/my-bookings" className="hover:text-teal-600">
            My Bookings
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-rose-600"
          >
            <LogOut size={18} /> Logout
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className="px-4 py-2 border border-teal-600 text-teal-600 rounded-lg"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-teal-600 text-white rounded-lg"
          >
            Register
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-teal-600 flex gap-2">
          <HeartPulse /> Care.xyz
        </Link>

        <div className="hidden md:flex gap-8">
          <NavLinks />
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden p-4 flex flex-col gap-4">
          <NavLinks />
        </div>
      )}
    </nav>
  );
};

/* ================= PRIVATE ROUTE ================= */

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

/* ================= FOOTER ================= */

const Footer = () => (
  <footer className="bg-slate-900 text-slate-300 py-12 mt-20">
    <div className="text-center">
      © {new Date().getFullYear()} Care.xyz. All rights reserved.
    </div>
  </footer>
);

/* ================= APP ================= */

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/service/:id" element={<ServiceDetailPage />} />
          <Route
            path="/booking/:id"
            element={
              <PrivateRoute>
                <BookingPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <PrivateRoute>
                <MyBookingsPage />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </HashRouter>
    </AuthProvider>
  );
}
