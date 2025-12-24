import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { UserPlus, Mail, Lock, User, Phone, Shield } from 'lucide-react';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    nid: '',
    contact: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters.';
    }
    if (!/[a-z]/.test(formData.password)) {
      return 'Password must contain a lowercase letter.';
    }
    if (!/[A-Z]/.test(formData.password)) {
      return 'Password must contain an uppercase letter.';
    }
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    setError('');
    await register(formData);
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-xl w-full bg-white p-8 rounded-3xl shadow-2xl border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserPlus size={32} />
          </div>
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <p className="text-slate-500">Join our community for trusted care</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Full Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Contact No
            </label>
            <div className="relative">
              <Phone
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                name="contact"
                required
                value={formData.contact}
                onChange={handleChange}
                placeholder="+880..."
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* NID */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              NID Number
            </label>
            <div className="relative">
              <Shield
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                name="nid"
                required
                value={formData.nid}
                onChange={handleChange}
                placeholder="National ID number"
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
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="md:col-span-2 mt-4 bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors"
          >
            Register Account
          </button>
        </form>

        <p className="mt-8 text-center text-slate-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-teal-600 font-bold hover:underline"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
