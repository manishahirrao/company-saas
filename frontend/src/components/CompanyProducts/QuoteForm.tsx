
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface QuoteFormProps {
  title?: string;
  subtitle?: string;
  endpoint: string;
  companyField?: string;
  detailsPlaceholder?: string;
}

const QuoteForm = ({ 
  title = "Ready to Get Started?",
  subtitle = "Tell us about your needs and we'll send you a custom quote within 24 hours.",
  endpoint,
  companyField = "Company Size",
  detailsPlaceholder = "Tell us about your specific requirements and goals..."
}: QuoteFormProps) => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactEmail: '',
    companySize: '',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call since we don't have backend integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form submitted:', { endpoint, ...formData });
      
      // Custom success message for ads generator
      const successMessage = endpoint.includes('ads-generator') 
        ? "Thank you! Our team will send you a custom ad package within 24 hours."
        : "Thank you! Our team will send you a custom quote within 24 hours.";
      
      toast({
        title: "Request Submitted!",
        description: successMessage,
      });

      setFormData({
        companyName: '',
        contactEmail: '',
        companySize: '',
        details: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderCompanySizeOptions = () => {
    if (companyField === "Campaign Budget") {
      return (
        <>
          <SelectItem value="under-10k">Under $10,000</SelectItem>
          <SelectItem value="10k-50k">$10,000 - $50,000</SelectItem>
          <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
          <SelectItem value="100k-500k">$100,000 - $500,000</SelectItem>
          <SelectItem value="500k+">$500,000+</SelectItem>
        </>
      );
    } else {
      return (
        <>
          <SelectItem value="1-10">1-10 employees</SelectItem>
          <SelectItem value="11-50">11-50 employees</SelectItem>
          <SelectItem value="51-200">51-200 employees</SelectItem>
          <SelectItem value="201-500">201-500 employees</SelectItem>
          <SelectItem value="500+">500+ employees</SelectItem>
        </>
      );
    }
  };

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {title}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-gray-900 font-medium">
                  Company Name *
                </Label>
                <Input
                  id="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="Your company name"
                  required
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail" className="text-gray-900 font-medium">
                  Contact Email *
                </Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companySize" className="text-gray-900 font-medium">
                {companyField}
              </Label>
              <Select onValueChange={(value) => handleInputChange('companySize', value)}>
                <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder={`Select ${companyField.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent>
                  {renderCompanySizeOptions()}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="details" className="text-gray-900 font-medium">
                Project Details *
              </Label>
              <Textarea
                id="details"
                value={formData.details}
                onChange={(e) => handleInputChange('details', e.target.value)}
                placeholder={detailsPlaceholder}
                required
                rows={5}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full gradient-primary text-white py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              {isSubmitting ? 'Submitting...' : endpoint.includes('ads-generator') ? 'Request Custom Ad Package' : 'Request Custom Quote'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;
