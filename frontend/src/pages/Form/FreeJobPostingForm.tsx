import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Building2, Mail, MapPin, User, DollarSign, Clock, Sparkles, Zap, Loader2, CheckCircle, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FormData {
  companyName: string;
  jobType: string;
  jobTitle: string;
  department: string;
  experienceLevel: string;
  roleDescription: string;
  budgetRange: string;
  location: string;
  hiringPriority: string;
  contactPerson: string;
  contactEmail: string;
  additionalRequirements: string;
}

const jobTypes = [
  'Full-time',
  'Part-time',
  'Contract',
  'Temporary',
  'Internship',
  'Freelance'
];

const experienceLevels = [
  'Entry Level',
  'Junior',
  'Mid Level',
  'Senior',
  'Lead',
  'Executive'
];

const hiringPriorities = [
  { value: 'urgent', label: 'Urgent (within 1 week)' },
  { value: 'normal', label: 'Normal (2-4 weeks)' },
  { value: 'flexible', label: 'Flexible (1-3 months)' }
];

const HRHiringForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    jobType: '',
    jobTitle: '',
    department: '',
    experienceLevel: '',
    roleDescription: '',
    budgetRange: '',
    location: '',
    hiringPriority: '',
    contactPerson: '',
    contactEmail: '',
    additionalRequirements: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [currentStep, setCurrentStep] = useState(1);

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep < 3) {
      handleNext();
      return;
    }
    
    setSubmitStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
    }, 1500);
  };

  const renderStepIndicator = () => (
    <div className="flex flex-col space-y-2 mb-8">
      <h2 className="text-2xl font-bold tracking-tight">Post a New Job</h2>
      <p className="text-muted-foreground">
        Fill in the details below to find the perfect candidate for your open position.
      </p>
      <div className="flex items-center justify-between mt-6 max-w-md">
        {[1, 2, 3].map((step) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  currentStep >= step 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step}
              </div>
              <span className="text-xs mt-2 text-muted-foreground">
                {step === 1 ? 'Details' : step === 2 ? 'Requirements' : 'Finalize'}
              </span>
            </div>
            {step < 3 && (
              <div className="flex-1 h-0.5 bg-muted mx-2"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Job Information</CardTitle>
              <CardDescription>Tell us about the position you're hiring for</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Company Name <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="Company name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Job Title <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="e.g., Senior Frontend Developer"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Job Type <span className="text-destructive">*</span>
                  </label>
                  <Select
                    name="jobType"
                    value={formData.jobType}
                    onValueChange={(value) => setFormData({...formData, jobType: value})}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Department <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    placeholder="e.g., Engineering, Marketing"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Location <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="e.g., New York, NY or Remote"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Experience Level <span className="text-destructive">*</span>
                  </label>
                  <Select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onValueChange={(value) => setFormData({...formData, experienceLevel: value})}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Position Details</CardTitle>
              <CardDescription>Describe the role and requirements</CardDescription>
            </CardHeader>
            <CardContent>
            
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Role Description <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    name="roleDescription"
                    value={formData.roleDescription}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Describe the key responsibilities and day-to-day tasks..."
                    className="min-h-[120px]"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Tip: Include key responsibilities, daily tasks, and who they'll work with
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">
                      Budget Range
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        name="budgetRange"
                        value={formData.budgetRange}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="e.g., $80,000 - $100,000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">
                      Hiring Priority <span className="text-destructive">*</span>
                    </label>
                    <Select
                      name="hiringPriority"
                      value={formData.hiringPriority}
                      onValueChange={(value) => setFormData({...formData, hiringPriority: value})}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select hiring priority" />
                      </SelectTrigger>
                      <SelectContent>
                        {hiringPriorities.map((priority) => (
                          <SelectItem key={priority.value} value={priority.value}>
                            {priority.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">
                      Additional Requirements
                    </label>
                    <Textarea
                      name="additionalRequirements"
                      value={formData.additionalRequirements}
                      onChange={handleInputChange}
                      rows={3}
                      className="min-h-[100px]"
                      placeholder="Any other important information or requirements..."
                    />
                  </div>
                </div>
              </div>
          </CardContent>
        </Card>
      );

    case 3:
      return (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Contact Information</CardTitle>
            <CardDescription>How can candidates reach you?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Contact Person <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    className="pl-10"
                    placeholder="Full name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Contact Email <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    className="pl-10"
                    placeholder="email@company.com"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6 space-y-4 mt-6">
              <h3 className="font-medium flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-primary" />
                AI-Powered Matching
              </h3>
              <p className="text-sm text-muted-foreground">
                Our AI will analyze your requirements and match you with the most suitable candidates from our database of top talent.
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                <span>Average time to first match: 24-48 hours</span>
              </div>
            </div>
          </CardContent>
        </Card>
      );

    default:
      return null;
  }
};

  if (submitStatus === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-green-100 p-4 mb-6">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Job Posting Submitted!</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          We've received your job posting. Our team will review it and start matching you with qualified candidates shortly.
        </p>
        <Button
          onClick={() => {
            setSubmitStatus('idle');
            setCurrentStep(1);
            setFormData({
              companyName: '',
              jobType: '',
              jobTitle: '',
              department: '',
              experienceLevel: '',
              roleDescription: '',
              budgetRange: '',
              location: '',
              hiringPriority: '',
              contactPerson: '',
              contactEmail: '',
              additionalRequirements: '',
            });
          }}
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Post Another Job
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 xl:p-8">
      {renderStepIndicator()}
      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderFormStep()}
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <Button
              type="button"
              onClick={handlePrevious}
              variant="outline"
              className="inline-flex items-center justify-center px-6 py-3"
            >
              Back
            </Button>
          )}
          <Button
            type="submit"
            className="ml-auto inline-flex items-center justify-center bg-primary px-6 py-3 text-white hover:bg-primary/90"
          >
            {currentStep < 3 ? (
              <>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              'Submit Job Posting'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HRHiringForm;