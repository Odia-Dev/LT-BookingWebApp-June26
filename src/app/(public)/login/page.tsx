'use client';

import React, { useState } from 'react';
import { useAuth } from '@/modules/auth';
import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/feedback/Badge';
import { Button } from '@/components/ui/Button';
import { Mail, Phone, Lock, Eye, EyeOff, Loader2, AlertCircle, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const { loginWithEmail, loginWithOTP, user } = useAuth();
  
  const [tab, setTab] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Check if unauthorized param is present
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('unauthorized') === 'true') {
        setError('Unauthorized access! Please login with an authorized account.');
      }
    }
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const loggedIn = await loginWithEmail(email, password);
      setSuccessMsg(`Welcome back, ${loggedIn.displayName}! Redirecting...`);
      setTimeout(() => {
        if (loggedIn.role === 'CUSTOMER') {
          window.location.href = '/customer';
        } else {
          window.location.href = '/admin';
        }
      }, 1000);
    } catch (err: any) {
      setError(err?.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setLoading(true);
    try {
      // Simulate sending OTP
      await new Promise(resolve => setTimeout(resolve, 600));
      setOtpSent(true);
      setSuccessMsg('Test OTP code "123456" sent successfully.');
    } catch (err: any) {
      setError('Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const loggedIn = await loginWithOTP(phone, otp);
      setSuccessMsg(`Mobile verified successfully! Redirecting...`);
      setTimeout(() => {
        window.location.href = '/customer';
      }, 1000);
    } catch (err: any) {
      setError(err?.message || 'Invalid code. Use "123456" to verify.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 flex items-center justify-center">
      <Container className="max-w-md w-full">
        <div className="bg-white border border-gray-150 rounded-3xl p-8 shadow-xl flex flex-col gap-6">
          <div className="text-center flex flex-col gap-2">
            <Badge variant="info">Authorized Access Only</Badge>

            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Laxmi Toyota Portal</h1>
            <p className="text-xs text-gray-500">Sign in to book a vehicle, manage leads, or view dashboards.</p>
          </div>

          {/* Tab Selection */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-gray-50 rounded-2xl border border-gray-100">
            <button
              onClick={() => {
                setTab('email');
                setError(null);
                setSuccessMsg(null);
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                tab === 'email' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Email Sign In
            </button>
            <button
              onClick={() => {
                setTab('otp');
                setError(null);
                setSuccessMsg(null);
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                tab === 'otp' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Mobile OTP Sign In
            </button>
          </div>

          {/* Feedback alerts */}
          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-2xl text-xs flex gap-2 border border-red-100">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          {successMsg && (
            <div className="p-4 bg-emerald-50 text-emerald-700 rounded-2xl text-xs flex gap-2 border border-emerald-100">
              <Sparkles className="h-4 w-4 shrink-0 mt-0.5 animate-pulse" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Email Form */}
          {tab === 'email' && (
            <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="e.g. customer@laxmitoyota.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#EB0A1E] text-xs text-gray-800"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Password</label>
                  <a href="/forgot-password" className="text-[10px] font-bold text-[#EB0A1E] hover:underline">Forgot?</a>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock className="h-4 w-4" />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#EB0A1E] text-xs text-gray-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button variant="primary" type="submit" disabled={loading} className="mt-2 w-full h-11 text-xs">
                {loading ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : 'Log In'}
              </Button>
            </form>
          )}

          {/* OTP Form */}
          {tab === 'otp' && (
            <div className="flex flex-col gap-4">
              {!otpSent ? (
                <form onSubmit={handleSendOTP} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mobile Number</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Phone className="h-4 w-4" />
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="e.g. 9437012345"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#EB0A1E] text-xs text-gray-800"
                      />
                    </div>
                  </div>
                  <Button variant="primary" type="submit" disabled={loading} className="w-full h-11 text-xs">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : 'Send OTP Verification'}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Enter OTP Code</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="Use 123456"
                      value={otp}
                      onChange={e => setOtp(e.target.value)}
                      className="w-full text-center tracking-widest text-lg font-bold border border-gray-250 py-2.5 bg-gray-50 rounded-xl focus:outline-none focus:border-[#EB0A1E]"
                    />
                  </div>
                  <Button variant="primary" type="submit" disabled={loading} className="w-full h-11 text-xs">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : 'Verify & Sign In'}
                  </Button>
                  <button 
                    type="button" 
                    onClick={() => {
                      setOtpSent(false);
                      setSuccessMsg(null);
                    }}
                    className="text-center text-[10px] text-gray-400 hover:text-gray-600 hover:underline"
                  >
                    Change Phone Number
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Test Credentials Box */}
          <div className="bg-gray-50 p-4 border border-gray-150 rounded-2xl flex flex-col gap-1 text-[10px] text-gray-500 leading-normal text-left">
            <h4 className="font-bold text-gray-700">Test Credentials:</h4>
            <p>• Customer: <strong>customer@laxmitoyota.com</strong> / <strong>Customer12345</strong></p>
            <p>• Super Admin: <strong>admin@laxmitoyota.com</strong> / <strong>Admin12345</strong></p>
            <p>• OTP Code: Use any 10-digit number & code <strong>123456</strong></p>
          </div>
        </div>
      </Container>
    </div>
  );
}
