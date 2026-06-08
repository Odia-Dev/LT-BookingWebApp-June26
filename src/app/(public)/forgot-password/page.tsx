'use client';

import React, { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/feedback/Badge';
import { Button } from '@/components/ui/Button';
import { Mail, ArrowLeft, Loader2, Sparkles, AlertCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setSuccess(true);
    } catch (err) {
      setError('Failed to send reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 flex items-center justify-center">
      <Container className="max-w-md w-full">
        <div className="bg-white border border-gray-150 rounded-3xl p-8 shadow-xl flex flex-col gap-6">
          <div className="text-center flex flex-col gap-2">
            <Badge variant="info">Password recovery</Badge>

            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Forgot Password?</h1>
            <p className="text-xs text-gray-500">Provide your verified email and we will send a password reset link.</p>
          </div>

          {success ? (
            <div className="flex flex-col gap-4 text-center">
              <div className="p-4 bg-emerald-50 text-emerald-700 rounded-2xl text-xs border border-emerald-100 flex gap-2 justify-center">
                <Sparkles className="h-4 w-4 shrink-0" />
                <span>Password recovery instructions sent successfully!</span>
              </div>
              <a href="/login">
                <Button variant="secondary" className="w-full h-11 text-xs">
                  <ArrowLeft className="h-4 w-4 mr-2 inline" /> Return to Login
                </Button>
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && (
                <div className="p-4 bg-red-50 text-red-700 rounded-2xl text-xs border border-red-100 flex gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#EB0A1E] text-xs text-gray-800"
                  />
                </div>
              </div>

              <Button variant="primary" type="submit" disabled={loading} className="w-full h-11 text-xs mt-2">
                {loading ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : 'Send Reset Link'}
              </Button>

              <a href="/login" className="text-center text-xs font-bold text-gray-500 hover:text-gray-900 flex items-center justify-center gap-1.5 mt-2">
                <ArrowLeft className="h-4 w-4" /> Back to Login
              </a>
            </form>
          )}
        </div>
      </Container>
    </div>
  );
}
