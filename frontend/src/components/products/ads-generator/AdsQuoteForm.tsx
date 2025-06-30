
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AdsQuoteFormProps {
  onSuccess?: (message: string) => void;
}

const AdsQuoteForm: React.FC<AdsQuoteFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactEmail: '',
    campaignBudget: '',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact/ads-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setFormData({
          companyName: '',
          contactEmail: '',
          campaignBudget: '',
          details: ''
        });
        onSuccess?.(result.message || 'Thanks! We\'ll reach out with your custom ad package.');
      } else {
        alert(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">Get Your Custom Ad Package</CardTitle>
            <p className="text-center text-gray-600">
              Tell us about your campaign goals and we'll create a tailored solution for you.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="campaignBudget">Campaign Budget</Label>
                <Select value={formData.campaignBudget} onValueChange={(value) => handleInputChange('campaignBudget', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select campaign budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-5k">Under $5,000</SelectItem>
                    <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
                    <SelectItem value="15k-50k">$15,000 - $50,000</SelectItem>
                    <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                    <SelectItem value="over-100k">Over $100,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="details">Describe your campaign goals</Label>
                <Textarea
                  id="details"
                  value={formData.details}
                  onChange={(e) => handleInputChange('details', e.target.value)}
                  placeholder="Tell us about your target audience, campaign objectives, preferred platforms, and any specific creative requirements..."
                  rows={4}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Get Custom Quote'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AdsQuoteForm;
