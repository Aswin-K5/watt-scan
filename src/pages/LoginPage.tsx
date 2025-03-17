
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would connect to a backend for authentication
    // For demo purposes, we'll just redirect and show a success message
    toast.success('Login successful!');
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-primary py-4">
          <h2 className="text-2xl font-bold text-white text-center">Login to MeterEase</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2 font-medium">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium"
          >
            Login
          </button>
          
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don't have an account? <Link to="/register" className="text-primary font-medium">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
