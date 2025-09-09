"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Mail, AlertCircle } from "lucide-react";

export default function UnsubscribePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState("");

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    try {
      const response = await fetch('/api/email/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message);
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to unsubscribe');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  const handleResubscribe = async () => {
    if (!email.trim()) return;

    setStatus('loading');
    try {
      const response = await fetch('/api/email/unsubscribe', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Successfully subscribed to marketing emails');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to subscribe');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="py-12">
        <div className="max-w-md mx-auto px-4">
          <Card className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Email Preferences Updated
            </h1>
            <p className="text-gray-600 mb-6">
              {message}
            </p>
            <div className="space-y-3">
              <Button 
                onClick={() => {
                  setStatus('idle');
                  setEmail('');
                  setMessage('');
                }}
                variant="outline"
                className="w-full"
              >
                Modify Preferences Again
              </Button>
              <p className="text-xs text-gray-500">
                Note: You will still receive important order notifications and medical communications.
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-md mx-auto px-4">
        <Card className="p-8">
          <div className="text-center mb-6">
            <Mail className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Email Preferences
            </h1>
            <p className="text-gray-600">
              Manage your email communication preferences
            </p>
          </div>

          <form onSubmit={handleUnsubscribe} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@nhs.net"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            {status === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-red-800 text-sm">{message}</span>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <Button 
                type="submit" 
                disabled={status === 'loading' || !email.trim()}
                className="w-full"
              >
                {status === 'loading' ? 'Processing...' : 'Unsubscribe from Marketing'}
              </Button>
              
              <Button 
                type="button"
                variant="outline"
                onClick={handleResubscribe}
                disabled={status === 'loading' || !email.trim()}
                className="w-full"
              >
                {status === 'loading' ? 'Processing...' : 'Subscribe to Marketing'}
              </Button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h3 className="font-medium text-amber-800 mb-2">
              Important Note
            </h3>
            <p className="text-sm text-amber-700">
              Even if you unsubscribe from marketing emails, you will still receive:
            </p>
            <ul className="text-sm text-amber-700 mt-2 space-y-1">
              <li>• Order confirmations</li>
              <li>• Shipping notifications</li>
              <li>• Medical review communications</li>
              <li>• Important account updates</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}