import React from 'react';
import { Link } from 'react-router-dom';
import { Home, HelpCircle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="relative mb-8">
        <h1 className="text-[150px] font-black text-slate-200 leading-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <HelpCircle size={80} className="text-teal-500 animate-bounce" />
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
      <p className="text-slate-500 mb-8 max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
        Let's get you back on track.
      </p>

      <Link
        to="/"
        className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl"
      >
        <Home size={20} /> Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
