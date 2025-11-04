"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CalendarIcon, Clock, CheckCircle, Mail, User, Phone, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AppointmentData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  date: Date | undefined;
  time: string;
}

export default function AppointmentPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    date: undefined,
    time: "",
  });
  const [appointmentNumber, setAppointmentNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM"
  ];

  const generateAppointmentNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `APPT-${timestamp}-${random}`;
  };

  const handleFormSubmit = async () => {
    setIsLoading(true);
    
    try {
      const appointmentId = generateAppointmentNumber();
      setAppointmentNumber(appointmentId);

      // Send email to technical support
      const response = await fetch('/api/send-appointment-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...appointmentData,
          appointmentNumber: appointmentId,
        }),
      });

      if (response.ok) {
        toast.success('Appointment booked successfully! Email sent to our team.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setCurrentStep(4); // Show confirmation
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to book appointment. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateAppointmentData = (field: keyof AppointmentData, value: any) => {
    setAppointmentData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return appointmentData.name && appointmentData.email && appointmentData.phone;
      case 2:
        return appointmentData.date;
      case 3:
        return appointmentData.time;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-black/20">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Image
                src="/logo.png"
                alt="CYBERRAZOR Logo"
                width={580}
                height={185}
                className="rounded-lg w-16 h-16 sm:w-20 sm:h-20 object-contain"
              />
            </div>
            <Link
              href="/"
              className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-200 backdrop-blur-sm"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={cn(
                    "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300",
                    currentStep >= step
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-400"
                  )}
                >
                  {currentStep > step ? <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" /> : step}
                </div>
                {step < 4 && (
                  <div
                    className={cn(
                      "w-8 sm:w-16 h-0.5 mx-1 sm:mx-2 transition-all duration-300",
                      currentStep > step ? "bg-blue-500" : "bg-gray-700"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-3 sm:mt-4 space-x-8 sm:space-x-16">
            <span className={cn("text-xs sm:text-sm", currentStep >= 1 ? "text-blue-400" : "text-gray-500")}>
              Contact Info
            </span>
            <span className={cn("text-xs sm:text-sm", currentStep >= 2 ? "text-blue-400" : "text-gray-500")}>
              Select Date
            </span>
            <span className={cn("text-xs sm:text-sm", currentStep >= 3 ? "text-blue-400" : "text-gray-500")}>
              Select Time
            </span>
            <span className={cn("text-xs sm:text-sm", currentStep >= 4 ? "text-blue-400" : "text-gray-500")}>
              Confirmation
            </span>
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-2xl mx-auto">
          {/* Step 1: Contact Form */}
          {currentStep === 1 && (
            <Card className="bg-gray-900/50 border-blue-500/20 backdrop-blur-xl shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-blue-400">Contact Information</CardTitle>
                <CardDescription className="text-gray-400">
                  Please provide your details so we can get in touch with you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">Full Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        value={appointmentData.name}
                        onChange={(e) => updateAppointmentData('name', e.target.value)}
                        className="pl-10 bg-gray-800/50 border-gray-600 text-white"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={appointmentData.email}
                        onChange={(e) => updateAppointmentData('email', e.target.value)}
                        className="pl-10 bg-gray-800/50 border-gray-600 text-white"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-300">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        value={appointmentData.phone}
                        onChange={(e) => updateAppointmentData('phone', e.target.value)}
                        className="pl-10 bg-gray-800/50 border-gray-600 text-white"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-gray-300">Company (Optional)</Label>
                    <Input
                      id="company"
                      value={appointmentData.company}
                      onChange={(e) => updateAppointmentData('company', e.target.value)}
                      className="bg-gray-800/50 border-gray-600 text-white"
                      placeholder="Enter your company name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-300">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    value={appointmentData.message}
                    onChange={(e) => updateAppointmentData('message', e.target.value)}
                    className="bg-gray-800/50 border-gray-600 text-white min-h-[100px]"
                    placeholder="Tell us about your cybersecurity needs..."
                  />
                </div>
                <Button
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Continue to Date Selection
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Calendar */}
          {currentStep === 2 && (
            <Card className="bg-gray-900/50 border-blue-500/20 backdrop-blur-xl shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-blue-400">Select Meeting Date</CardTitle>
                <CardDescription className="text-gray-400">
                  Choose a convenient date for your appointment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center">
                  <div className="bg-gray-800/80 border border-gray-600 rounded-lg p-4 shadow-lg">
                    <Calendar
                      mode="single"
                      selected={appointmentData.date}
                      onSelect={(date) => updateAppointmentData('date', date)}
                      className="rounded-md border-0 bg-transparent text-white"
                      captionLayout="dropdown"
                      disabled={(date) => date < new Date()}
                    />
                  </div>
                </div>
                {appointmentData.date && (
                  <div className="text-center">
                    <p className="text-gray-400">Selected Date:</p>
                    <p className="text-blue-400 font-semibold">
                      {format(appointmentData.date, "EEEE, MMMM do, yyyy")}
                    </p>
                  </div>
                )}
                <div className="flex space-x-4">
                  <Button
                    onClick={prevStep}
                    variant="outline"
                    className="flex-1 border-gray-600 text-white hover:bg-gray-700 hover:text-white bg-gray-800/50"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Continue to Time Selection
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Time Selection */}
          {currentStep === 3 && (
            <Card className="bg-gray-900/50 border-blue-500/20 backdrop-blur-xl shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-blue-400">Select Meeting Time</CardTitle>
                <CardDescription className="text-gray-400">
                  Choose a convenient time for your appointment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center mb-4">
                  <p className="text-gray-400">Selected Date:</p>
                  <p className="text-blue-400 font-semibold">
                    {appointmentData.date && format(appointmentData.date, "EEEE, MMMM do, yyyy")}
                  </p>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      onClick={() => updateAppointmentData('time', time)}
                      variant={appointmentData.time === time ? "default" : "outline"}
                      className={cn(
                        "text-sm py-3 px-4 transition-all duration-200",
                        appointmentData.time === time
                          ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/25"
                          : "border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500 bg-gray-800/30"
                      )}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
                {appointmentData.time && (
                  <div className="text-center">
                    <p className="text-gray-400">Selected Time:</p>
                    <p className="text-blue-400 font-semibold">{appointmentData.time}</p>
                  </div>
                )}
                <div className="flex space-x-4">
                  <Button
                    onClick={prevStep}
                    variant="outline"
                    className="flex-1 border-gray-600 text-white hover:bg-gray-700 hover:text-white bg-gray-800/50"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleFormSubmit}
                    disabled={!isStepValid() || isLoading}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isLoading ? "Booking..." : "Confirm Appointment"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <Card className="bg-gray-900/50 border-green-500/20 backdrop-blur-xl shadow-2xl">
              <CardHeader className="text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <CardTitle className="text-2xl text-green-400">Appointment Confirmed!</CardTitle>
                <CardDescription className="text-gray-400">
                  Your appointment has been successfully booked
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6 space-y-4">
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Appointment Number</p>
                    <p className="text-2xl font-bold text-blue-400">{appointmentNumber}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-400 text-sm">Meeting Details:</p>
                    <div className="space-y-1">
                      <p className="text-white"><strong>Name:</strong> {appointmentData.name}</p>
                      <p className="text-white"><strong>Email:</strong> {appointmentData.email}</p>
                      <p className="text-white"><strong>Phone:</strong> {appointmentData.phone}</p>
                      {appointmentData.company && (
                        <p className="text-white"><strong>Company:</strong> {appointmentData.company}</p>
                      )}
                      <p className="text-white"><strong>Date:</strong> {appointmentData.date && format(appointmentData.date, "EEEE, MMMM do, yyyy")}</p>
                      <p className="text-white"><strong>Time:</strong> {appointmentData.time}</p>
                    </div>
                  </div>
                </div>
                <div className="text-center space-y-4">
                  <p className="text-gray-400 text-sm">
                    A confirmation email has been sent to our technical support team.
                    We will contact you shortly to finalize the meeting details.
                  </p>
                  <Button
                    onClick={() => window.location.href = '/'}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Return to Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
