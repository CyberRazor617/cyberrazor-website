"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  User, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  LogOut,
  Activity,
  Zap,
  Lock,
  Calendar,
  Loader2
} from 'lucide-react';

interface User {
  id: string;
  username: string;
  email: string;
  status: string;
  subscription_plan: string;
  trial_end_date?: string;
  created_at: string;
}

const DashboardPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        localStorage.removeItem('token');
        router.push('/login');
        return;
      }

      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      setError('Failed to load user data');
      console.error('Error loading user data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const getTrialStatus = () => {
    if (!user?.trial_end_date) return null;
    
    const now = new Date();
    const trialEnd = new Date(user.trial_end_date);
    const daysLeft = Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysLeft <= 0) {
      return { status: 'expired', daysLeft: 0 };
    } else if (daysLeft <= 3) {
      return { status: 'expiring', daysLeft };
    } else {
      return { status: 'active', daysLeft };
    }
  };

  const getSubscriptionBadge = () => {
    const plan = user?.subscription_plan;
    switch (plan) {
      case 'trial':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Trial</Badge>;
      case 'free':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Free</Badge>;
      case 'pro':
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Pro</Badge>;
      case 'enterprise':
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Enterprise</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Unknown</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
          <h2 className="text-xl font-semibold text-white mb-2">Loading Dashboard...</h2>
          <p className="text-gray-400">Please wait while we load your account information</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-red-500" />
          <h2 className="text-xl font-semibold text-white mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <Button onClick={checkAuth} variant="outline">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const trialStatus = getTrialStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-3 sm:p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
            <h1 className="text-lg sm:text-2xl font-bold text-white">CyberRazor Dashboard</h1>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm" className="text-xs sm:text-sm">
            <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Logout</span>
            <span className="sm:hidden">Out</span>
          </Button>
        </div>

        {/* Welcome Section */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-4 sm:mb-6">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
              <div className="flex-1">
                <h2 className="text-lg sm:text-xl font-semibold text-white mb-1">
                  Welcome back, {user?.username}!
                </h2>
                <p className="text-gray-300 text-sm sm:text-base">
                  Your digital assets are protected with enterprise-grade security
                </p>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                {getSubscriptionBadge()}
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs sm:text-sm">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Active
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trial Status Alert */}
        {trialStatus && (
          <Alert className={`mb-4 sm:mb-6 ${
            trialStatus.status === 'expired' 
              ? 'bg-red-500/20 border-red-500/30' 
              : trialStatus.status === 'expiring'
              ? 'bg-yellow-500/20 border-yellow-500/30'
              : 'bg-blue-500/20 border-blue-500/30'
          }`}>
            <Clock className="h-4 w-4" />
            <AlertDescription className="text-white text-sm sm:text-base">
              {trialStatus.status === 'expired' && (
                'Your trial has expired. Your account has been automatically transitioned to the Free tier.'
              )}
              {trialStatus.status === 'expiring' && (
                `Your trial expires in ${trialStatus.daysLeft} day${trialStatus.daysLeft !== 1 ? 's' : ''}. Consider upgrading to Pro for continued access to advanced features.`
              )}
              {trialStatus.status === 'active' && (
                `You have ${trialStatus.daysLeft} day${trialStatus.daysLeft !== 1 ? 's' : ''} remaining in your trial.`
              )}
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-400">Account Status</p>
                  <p className="text-lg sm:text-2xl font-bold text-white capitalize">{user?.status}</p>
                </div>
                <User className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-400">Subscription Plan</p>
                  <p className="text-lg sm:text-2xl font-bold text-white capitalize">{user?.subscription_plan}</p>
                </div>
                <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-400">Security Status</p>
                  <p className="text-lg sm:text-2xl font-bold text-green-400">Protected</p>
                </div>
                <Lock className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-400">Member Since</p>
                  <p className="text-lg sm:text-2xl font-bold text-white">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Account Information */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-lg sm:text-xl">Account Information</CardTitle>
              <CardDescription className="text-gray-300 text-sm sm:text-base">
                Your account details and subscription information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm sm:text-base">Username:</span>
                <span className="text-white font-medium text-sm sm:text-base">{user?.username}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm sm:text-base">Email:</span>
                <span className="text-white font-medium text-sm sm:text-base">{user?.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm sm:text-base">Account Status:</span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs sm:text-sm">
                  {user?.status}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm sm:text-base">Subscription Plan:</span>
                {getSubscriptionBadge()}
              </div>
              {user?.trial_end_date && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm sm:text-base">Trial Ends:</span>
                  <span className="text-white font-medium text-sm sm:text-base">
                    {new Date(user.trial_end_date).toLocaleDateString()}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Security Overview */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-lg sm:text-xl">Security Overview</CardTitle>
              <CardDescription className="text-gray-300 text-sm sm:text-base">
                Real-time protection status and security metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between p-2 sm:p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                  <span className="text-white text-sm sm:text-base">Real-time Protection</span>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs sm:text-sm">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between p-2 sm:p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                  <span className="text-white text-sm sm:text-base">Threat Monitoring</span>
                </div>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs sm:text-sm">24/7</Badge>
              </div>
              
              <div className="flex items-center justify-between p-2 sm:p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                  <span className="text-white text-sm sm:text-base">AI Analysis</span>
                </div>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs sm:text-sm">Enabled</Badge>
              </div>
              
              <div className="flex items-center justify-between p-2 sm:p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400" />
                  <span className="text-white text-sm sm:text-base">System Health</span>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs sm:text-sm">Optimal</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        {trialStatus?.status === 'expiring' && (
          <Card className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/30 mt-4 sm:mt-6">
            <CardContent className="p-4 sm:p-6 text-center">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                Upgrade to Pro for Enhanced Protection
              </h3>
              <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                Get advanced threat detection, priority support, and unlimited scans
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white text-sm sm:text-base">
                Upgrade Now
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
