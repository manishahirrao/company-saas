import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Building2, Mail, Lock, Globe, Linkedin, MapPin, Upload, Eye, EyeOff, ArrowRight, Loader2, Users } from 'lucide-react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface FormData {
  companyName: string;
  companyEmail: string;
  password: string;
  confirmPassword: string;
  companyWebsite: string;
  targetAudience: string;
  logo: File | null;
}

interface FormErrors {
  companyName?: string;
  companyEmail?: string;
  password?: string;
  confirmPassword?: string;
  companyWebsite?: string;
  targetAudience?: string;
  logo?: string;
  [key: string]: string | undefined;
}

const CompanyRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signUp, user } = useAuth();
  
  // Form state - only include fields that exist in the database schema
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    companyEmail: location.state?.email || '',
    password: '',
    confirmPassword: '',
    companyWebsite: '',
    targetAudience: '',
    logo: null
  });
  
  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    } else {
      setLoading(false);
    }
  }, [user, navigate]);
  
  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  const personalEmailDomains = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com',
    'icloud.com', 'me.com', 'mac.com', 'live.com', 'msn.com',
    'ymail.com', 'rocketmail.com', 'mail.com', 'gmx.com', 'zoho.com',
    'protonmail.com', 'tutanota.com', 'fastmail.com', '163.com', 'qq.com',
    'sina.com', 'sohu.com', 'rediffmail.com', 'yandex.com', 'mail.ru'
  ];

  const companySizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '501-1000 employees',
    '1001-5000 employees',
    '5000+ employees'
  ];
  const isPersonalEmail = (email: string): boolean => {
    const domain = email.split('@')[1]?.toLowerCase();
    return domain ? personalEmailDomains.includes(domain) : false;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          logo: 'Please upload a valid image file (JPG, PNG, or SVG)'
        }));
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          logo: 'File size must be less than 5MB'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        logo: file
      }));
      
      if (errors.logo) {
        setErrors(prev => ({
          ...prev,
          logo: undefined
        }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    
    if (!formData.companyEmail.trim()) {
      newErrors.companyEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.companyEmail)) {
      newErrors.companyEmail = 'Please enter a valid email address';
    } else if (personalEmailDomains.some(domain => formData.companyEmail.endsWith(`@${domain}`))) {
      newErrors.companyEmail = 'Please use your company email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (formData.companyWebsite && !/^https?:\/\//.test(formData.companyWebsite)) {
      newErrors.companyWebsite = 'Please enter a valid URL (include http:// or https://)';
    }
    
      newErrors.industry = 'Industry selection is required';
    }

    if (!formData.companySize) {
      newErrors.companySize = 'Company size selection is required';
    }

    if (!formData.targetAudience.trim()) {
      newErrors.targetAudience = 'Target audience is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setLoading(true);
    
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // First, check if user exists by attempting to sign in
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.companyEmail,
        password: formData.password,
      });

      // If sign in is successful, user exists with these credentials
      if (signInData.user) {
        // Redirect to dashboard since credentials are correct
        navigate('/dashboard', { replace: true });
        return;
      }
    } catch (error: any) {
      // If error is not about invalid credentials, show error
      if (!error?.message?.includes('Invalid login credentials')) {
        console.error('Error during login attempt:', error);
        setSubmitError('An error occurred during login. Please try again.');
        setLoading(false);
        return;
      }
      
      // If we get here, either user doesn't exist or password is wrong
      // Let's check if user exists with this email
      try {
        const { data: { users }, error: checkUserError } = await supabase.auth.admin.listUsers();
        
        if (checkUserError) throw checkUserError;
        
        const userExists = users.some((user: User) => user.email === formData.companyEmail);
        
        if (userExists) {
          // User exists but password is wrong
          setSubmitError('Incorrect password. Please try again or reset your password.');
          setLoading(false);
          return;
        }
      } catch (checkError) {
        console.error('Error checking user existence:', checkError);
        setSubmitError('An error occurred while checking your account. Please try again.');
        setLoading(false);
        return;
      }
      
      // If we get here, user doesn't exist, so we'll proceed with registration
    }

    try {
      let logoUrl = '';
      
      // 1. Upload logo if it exists
      if (formData.logo) {
        const fileExt = formData.logo.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `company-logos/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('company-logos')
          .upload(filePath, formData.logo);
          
        if (uploadError) throw uploadError;
        
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('company-logos')
          .getPublicUrl(filePath);
          
        logoUrl = publicUrl;
      }

      // 2. Create the user with basic information
      const result = await signUp(
        formData.companyEmail, 
        formData.password, 
        { 
          full_name: formData.companyName,
          user_type: 'employer',
          phone: '',
          company_name: formData.companyName
        }
      );

      // 3. Create company profile if user creation is successful
      if (result.user) {
        // Only include fields that exist in the database schema
        const companyData = {
          owner_id: result.user.id,
          name: formData.companyName,
          description: formData.targetAudience || '', // Using targetAudience as description
          logo_url: logoUrl || null,
          website_url: formData.companyWebsite || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        try {
          const { data, error } = await supabase
            .from('companies')
            .insert([companyData])
            .select();

          if (error) {
            console.error('Error creating company:', error);
            throw new Error('Failed to create company profile. Please try again.');
          }
          
          console.log('Company created successfully:', data);
        } catch (error) {
          console.error('Error in company creation:', error);
          // Don't fail the entire registration if company creation fails
          // The user can update their company details later
          toast.error('Account created, but there was an issue saving company details. You can update them later.');
        }
      }
      
      const { error: signUpError, userExists } = result;

      if (userExists) {
        // If user exists, redirect to login with the email pre-filled
        navigate('/login', { 
          state: { 
            email: formData.companyEmail,
            message: 'An account with this email already exists. Please log in.'
          },
          replace: true 
        });
        return;
      }

      if (signUpError) {
        // Handle specific error for existing user
        if (signUpError.message.includes('already registered') || signUpError.message.includes('already in use')) {
          navigate('/login', { 
            state: { 
              email: formData.companyEmail,
              message: 'An account with this email already exists. Please log in.'
            },
            replace: true 
          });
          return;
        }
        throw signUpError;
      }

      // On successful registration, redirect to verify page with the user's email
      // The user will be automatically redirected to the dashboard after verifying their email
      navigate('/verify-email', { 
        state: { 
          email: formData.companyEmail,
          from: '/dashboard', // Redirect to dashboard after verification
          message: 'Registration successful! Please check your email to verify your account.'
        },
        replace: true 
      });
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to register. Please try again.';
      setSubmitError(errorMessage);
      
      // Only show toast for non-user-exists errors
      if (!errorMessage.toLowerCase().includes('already exists')) {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  // Helper function to render form field with error message
  const renderFormField = (
    name: keyof FormData,
    label: string,
    type = 'text',
    placeholder = '',
    required = true,
    isSelect = false,
    options: string[] = []
  ) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {isSelect ? (
        <select
          name={name}
          value={formData[name] as string}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors[name] ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === 'file' ? (
        <div className="mt-1 flex items-center">
          <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50">
            <span>Choose file</span>
            <input
              type="file"
              name={name}
              onChange={handleFileChange}
              className="sr-only"
              accept="image/jpeg,image/jpg,image/png,image/svg+xml"
            />
          </label>
          <span className="ml-3 text-sm text-gray-500">
            {formData.logo ? formData.logo.name : 'No file chosen'}
          </span>
        </div>
      ) : (
        <div className="relative">
          <input
            type={type}
            name={name}
            value={formData[name] as string}
            onChange={handleInputChange}
            placeholder={placeholder}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors[name] ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {name.includes('password') && (
            <button
              type="button"
              onClick={() =>
                name === 'password'
                  ? setShowPassword(!showPassword)
                  : setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
            >
              {name === 'password' ? (
                showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )
              ) : showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
      )}
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 p-4 transition-colors duration-200">
      <Card className="w-full max-w-2xl shadow-xl dark:shadow-lg dark:shadow-slate-950/30 dark:border-slate-700 dark:bg-slate-800">
        <CardHeader className="space-y-1">
          <div className="flex justify-center">
            <Building2 className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            Create Company Account
          </CardTitle>
          <CardDescription className="text-center">
            Register your company to get started
          </CardDescription>
        </CardHeader>
        
        <CardContent>

          {submitError && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm rounded-md">
              {submitError}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">


            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name <span className="text-red-500">*</span></Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                <Input
                  id="companyName"
                  name="companyName"
                  type="text"
                  placeholder="Acme Inc."
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={`pl-10 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-gray-400 ${errors.companyName ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.companyName && (
                <p className="text-sm text-red-500">{errors.companyName}</p>
              )}
            </div>

            {/* Company Email */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="companyEmail">Company Email <span className="text-red-500">*</span></Label>
                <span className="text-xs text-gray-500 dark:text-gray-400">No personal emails</span>
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                <Input
                  id="companyEmail"
                  name="companyEmail"
                  type="email"
                  placeholder="company@example.com"
                  value={formData.companyEmail}
                  onChange={handleInputChange}
                  className={`pl-10 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-gray-400 ${errors.companyEmail ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.companyEmail && (
                <p className="text-sm text-red-500">{errors.companyEmail}</p>
              )}
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`pl-10 pr-10 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-gray-400 ${errors.password ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`pl-10 pr-10 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-gray-400 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Company Website */}
            <div className="space-y-2">
              <Label htmlFor="companyWebsite">Company Website <span className="text-red-500">*</span></Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                <Input
                  id="companyWebsite"
                  name="companyWebsite"
                  type="url"
                  placeholder="https://company.com"
                  value={formData.companyWebsite}
                  onChange={handleInputChange}
                  className={`pl-10 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-gray-400 ${errors.companyWebsite ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.companyWebsite && (
                <p className="text-sm text-red-500">{errors.companyWebsite}</p>
              )}
            </div>

            {/* LinkedIn URL */}
            <div className="space-y-2">
              <Label htmlFor="linkedinUrl">LinkedIn Page URL <span className="text-red-500">*</span></Label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                <Input
                  id="linkedinUrl"
                  name="linkedinUrl"
                  type="url"
                  placeholder="https://linkedin.com/company/your-company"
                  value={formData.linkedinUrl}
                  onChange={handleInputChange}
                  className={`pl-10 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-gray-400 ${errors.linkedinUrl ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.linkedinUrl && (
                <p className="text-sm text-red-500">{errors.linkedinUrl}</p>
              )}
            </div>

            {/* Industry and Company Size */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Industry <span className="text-red-500">*</span>
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.industry ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
                {errors.industry && <p className="mt-1 text-sm text-red-600">{errors.industry}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company Size <span className="text-red-500">*</span>
                </label>
                <select
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.companySize ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Company Size</option>
                  {companySizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                {errors.companySize && <p className="mt-1 text-sm text-red-600">{errors.companySize}</p>}
              </div>
            </div>

            {/* Target Audience */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Target Audience <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.targetAudience ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Software Developers, Marketing Professionals, Students"
                />
              </div>
              {errors.targetAudience && <p className="mt-1 text-sm text-red-600">{errors.targetAudience}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.location ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., New York, United States"
                />
              </div>
              {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
            </div>

            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company Logo
              </label>
              <div className="relative">
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        {formData.logo ? (
                          <span className="font-semibold text-blue-600">{formData.logo.name}</span>
                        ) : (
                          <>
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </>
                        )}
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG or SVG (MAX. 5MB)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>
              {errors.logo && <p className="mt-1 text-sm text-red-600">{errors.logo}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>

            {/* Login Link */}
            <div className="mt-4 text-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">Already have an account? </span>
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
              >
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyRegisterPage;