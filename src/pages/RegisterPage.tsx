
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    // In a real app, this would connect to a backend for registration
    // For demo purposes, we'll just redirect and show a success message
    toast.success('Registration successful! Please login.');
    navigate('/login');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-primary py-4">
          <h2 className="text-2xl font-bold text-white text-center">Register for MeterEase</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          
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
          
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 mb-2 font-medium">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          
          <div className="mb-4">
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
          
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-2 font-medium">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium"
          >
            Register
          </button>
          
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account? <Link to="/login" className="text-primary font-medium">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
