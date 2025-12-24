import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../App';
import { LogIn, Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email);

    const origin =
      location.state?.from?.pathname || '/';

    navigate(origin);
  };

  const handleGoogleLogin = async () => {
    await login('google.user@example.com');
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-2xl border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LogIn size={32} />
          </div>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-slate-500">
            Sign in to manage your care services
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded text-teal-600 focus:ring-teal-500"
              />
              <span className="text-slate-600">Remember me</span>
            </label>
            <a href="#" className="text-teal-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8">
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">
                Or continue with
              </span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 py-3 rounded-xl hover:bg-slate-50 transition-colors font-medium"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              className="w-5"
              alt="Google"
            />
            Sign in with Google
          </button>
        </div>

        <p className="mt-8 text-center text-slate-600">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-teal-600 font-bold hover:underline"
          >
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
