"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, User, Lock } from 'lucide-react';
import { toast } from 'react-toastify';

export default function AuthForm({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Login attempt:', loginData);
    toast.success('Logged in successfully!')
    setIsLoading(false);
    if (onClose) onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Welcome Back</h2>
        <p className="text-sm text-gray-600">Sign in to your account</p>
      </div>

      <div className="space-y-5">
        <div>
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={loginData.email}
              onChange={handleInputChange}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={loginData.password}
              onChange={handleInputChange}
              className="pl-10 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input id="remember" type="checkbox" className="h-4 w-4" />
            <Label htmlFor="remember" className="text-sm">Remember me</Label>
          </div>
          <a href="#" className="text-sm text-black hover:underline">Forgot password?</a>
        </div>

        <Button
          onClick={handleLogin}
          disabled={isLoading || !loginData.email || !loginData.password}
          className="w-full h-12"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin border-2 border-white/40 border-t-white rounded-full"></div>
              <span>Signing in...</span>
            </div>
          ) : (
            'Sign In'
          )}
        </Button>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account? <a href="#" className="text-black font-medium hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}
