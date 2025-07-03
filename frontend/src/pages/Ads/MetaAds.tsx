import React, { useState } from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Upload, 
  Type, 
  ImageIcon,
  Link,
  MapPin,
  MessageSquare,
  Copy, 
  Download,
  AlertCircle,
  Sparkles,
  RefreshCw, 
  Check,
  Info,
  Search,
  Layout,
  Maximize,
  FileText,
  Wand2,
  X,
  Hash,
  File,
  User,
  Globe,
  Palette,
  Settings,
  Clock,
  RotateCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface FormData {
  campaignName: string;
  businessType: string;
  productService: string;
  targetAudience: string;
  callToAction: string;
  persona: string;
  keywords: string[];
  title: string;
  description: string;
  hashtags: string[];
  mediaType: string;
  aspectRatio: string;
  keyNotes: string;
  referenceFiles: File[];
  businessName: string;
  productUrl: string;
  locations: string[];
  tones: string[];
  templates: string[];
  imageVariations: number;
  videoDuration: number;
  imageStyle: string;
  contentType: string;
  mood: string;
  industryPreset: string;
  contentGenerationMode: 'normal' | 'advanced';
}

interface GeneratedContent {
  title?: string;
  description?: string;
  hashtags?: string[];
  keyNotes?: string;
}

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Italy', 'Spain', 
  'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Belgium', 'Switzerland', 'Austria',
  'Ireland', 'New Zealand', 'Japan', 'South Korea', 'Singapore', 'Hong Kong', 'UAE', 'Saudi Arabia',
  'India', 'Brazil', 'Mexico', 'Argentina', 'Chile', 'Colombia', 'South Africa', 'Nigeria', 'Kenya'
];

const professionalTones = [
  'Professional & Formal', 'Business Casual', 'Corporate Executive', 'Industry Expert', 
  'Thought Leader', 'Educational/Informative', 'Advisory/Consultative'
];

const engagingTones = [
  'Conversational & Friendly', 'Inspirational & Motivational', 'Storytelling', 
  'Personal & Authentic', 'Humorous & Light-hearted', 'Bold & Confident', 'Provocative/Controversial'
];

const specializedTones = [
  'Technical & Detailed', 'Sales-focused', 'Community Building', 'Behind-the-scenes', 
  'Achievement/Success focused', 'Problem-solving', 'Trendy/Current events'
];

const templates = [
  'Product Showcase', 'Lifestyle', 'Before/After', 'User-Generated Content', 'Behind the Scenes',
  'Educational', 'Testimonial', 'Comparison', 'Seasonal/Holiday', 'Minimalist'
];

const visualStyles = [
  'Photorealistic', 'Illustration', 'Digital Art', 'Minimalist', 'Corporate/Business',
  'Infographic Style', 'Hand-drawn/Sketch', '3D Rendered', 'Flat Design', 'Watercolor'
];

const contentTypes = [
  'Abstract/Conceptual', 'Portrait/People', 'Product Mockups', 'Data Visualization',
  'Lifestyle/Workplace', 'Technology/Digital', 'Nature/Organic', 'Architecture/Space', 'Icons/Symbols'
];

const moods = [
  'Corporate Professional', 'Creative/Innovative', 'Friendly/Approachable', 'Energetic/Dynamic',
  'Calm/Peaceful', 'Luxurious/Premium', 'Playful/Fun', 'Serious/Formal'
];

const industryPresets = [
  'Technology', 'Finance', 'Healthcare', 'Education', 'Real Estate', 'Consulting', 
  'Creative Agency', 'Startup', 'E-commerce', 'Fashion', 'Food & Beverage'
];

const MetaAdsForm: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    campaignName: '',
    businessType: '',
    productService: '',
    targetAudience: '',
    callToAction: '',
    persona: '',
    keywords: [],
    title: '',
    description: '',
    hashtags: [],
    mediaType: '',
    aspectRatio: '',
    keyNotes: '',
    referenceFiles: [],
    businessName: '',
    productUrl: '',
    locations: [],
    tones: [],
    templates: [],
    imageVariations: 2,
    videoDuration: 20,
    imageStyle: '',
    contentType: '',
    mood: '',
    industryPreset: '',
    contentGenerationMode: 'normal'
  });

  const [generatedContent, setGeneratedContent] = useState<GeneratedContent>({});
  const [showGenerated, setShowGenerated] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedField, setCopiedField] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [locationSearch, setLocationSearch] = useState('');
  const [toneCategory, setToneCategory] = useState('professional');

  const businessTypes = [
    'E-commerce', 'SaaS/Software', 'Healthcare', 'Education', 'Real Estate', 
    'Restaurant/Food', 'Fitness/Wellness', 'Finance', 'Travel', 'Fashion', 'Other'
  ];

  const ctaOptions = [
    'Shop Now', 'Learn More', 'Sign Up', 'Get Quote', 'Download', 
    'Book Now', 'Start Free Trial', 'Call Now', 'Visit Site'
  ];

  const personas = [
    'Decision Maker', 'Influencer', 'User', 'Technical', 'Non-Technical',
    'Budget Holder', 'End Consumer', 'Business Owner'
  ];

  const mediaTypes = ['Image', 'Video', 'Image & Video'];
  const aspectRatios = [
    '1:1 (Square)', '16:9 (Widescreen)', '4:5 (Portrait)', '9:16 (Story)', '1.91:1 (Landscape)'
  ];

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as string]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleArrayChange = (field: keyof FormData, value: string, action: 'add' | 'remove') => {
    const currentArray = formData[field] as string[];
    if (action === 'add' && !currentArray.includes(value)) {
      handleInputChange(field, [...currentArray, value]);
    } else if (action === 'remove') {
      handleInputChange(field, currentArray.filter(item => item !== value));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.campaignName) newErrors.campaignName = 'Campaign name is required';
    if (!formData.businessType) newErrors.businessType = 'Business type is required';
    if (!formData.productService) newErrors.productService = 'Product/service is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateForm()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const filteredCountries = countries.filter(country =>
    country.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const getCurrentTones = () => {
    switch(toneCategory) {
      case 'engaging': return engagingTones;
      case 'specialized': return specializedTones;
      default: return professionalTones;
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border-l-4 border-blue-500">
      <h3 className="text-xl font-bold text-gray-800 flex items-center">
        <FileText className="mr-2 text-blue-600" size={24} />
        Basic Information
      </h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Campaign Name *</label>
          <Input
            value={formData.campaignName}
            onChange={(e) => handleInputChange('campaignName', e.target.value)}
            placeholder="Enter campaign name"
            className="w-full"
          />
          {errors.campaignName && <p className="text-red-500 text-sm mt-1">{errors.campaignName}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Business Type *</label>
          <Select
            value={formData.businessType}
            onValueChange={(value) => handleInputChange('businessType', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select business type" />
            </SelectTrigger>
            <SelectContent>
              {businessTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.businessType && <p className="text-red-500 text-sm mt-1">{errors.businessType}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Product/Service *</label>
          <Input
            value={formData.productService}
            onChange={(e) => handleInputChange('productService', e.target.value)}
            placeholder="What are you promoting?"
            className="w-full"
          />
          {errors.productService && <p className="text-red-500 text-sm mt-1">{errors.productService}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name</label>
          <Input
            value={formData.businessName}
            onChange={(e) => handleInputChange('businessName', e.target.value)}
            placeholder="Your company name"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Product Page URL</label>
          <Input
            value={formData.productUrl}
            onChange={(e) => handleInputChange('productUrl', e.target.value)}
            placeholder="https://your-product-page.com"
            type="url"
            className="w-full"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Target Audience</label>
          <Input
            value={formData.targetAudience}
            onChange={(e) => handleInputChange('targetAudience', e.target.value)}
            placeholder="Who is your ideal customer?"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Call to Action</label>
          <Select
            value={formData.callToAction}
            onValueChange={(value) => handleInputChange('callToAction', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select CTA" />
            </SelectTrigger>
            <SelectContent>
              {ctaOptions.map(cta => (
                <SelectItem key={cta} value={cta}>{cta}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Persona</label>
          <Select
            value={formData.persona}
            onValueChange={(value) => handleInputChange('persona', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select persona" />
            </SelectTrigger>
            <SelectContent>
              {personas.map(persona => (
                <SelectItem key={persona} value={persona}>{persona}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            Location Targeting
          </label>
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                placeholder="Search countries..."
                className="pl-10"
              />
            </div>
            <div className="max-h-32 overflow-y-auto border rounded-lg p-2 bg-white">
              {filteredCountries.map(country => (
                <div key={country} className="flex items-center space-x-2 p-1">
                  <input
                    type="checkbox"
                    id={country}
                    checked={formData.locations.includes(country)}
                    onChange={(e) => 
                      handleArrayChange('locations', country, e.target.checked ? 'add' : 'remove')
                    }
                    className="rounded"
                  />
                  <label htmlFor={country} className="text-sm cursor-pointer flex-1">
                    {country}
                  </label>
                </div>
              ))}
            </div>
            {formData.locations.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.locations.map(location => (
                  <span
                    key={location}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center"
                  >
                    {location}
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer"
                      onClick={() => handleArrayChange('locations', location, 'remove')}
                    />
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
          Next: Content & Tone
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 p-6 bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl border-l-4 border-purple-500">
      <h3 className="text-xl font-bold text-gray-800 flex items-center">
        <MessageSquare className="mr-2 text-purple-600" size={24} />
        Content & Tone Selection
      </h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <MessageSquare className="w-4 h-4 mr-2" />
            Tone Selection
          </label>
          <Tabs value={toneCategory} onValueChange={setToneCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="professional">Professional</TabsTrigger>
              <TabsTrigger value="engaging">Engaging</TabsTrigger>
              <TabsTrigger value="specialized">Specialized</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {getCurrentTones().map(tone => (
              <div key={tone} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={tone}
                  checked={formData.tones.includes(tone)}
                  onChange={(e) => 
                    handleArrayChange('tones', tone, e.target.checked ? 'add' : 'remove')
                  }
                  className="rounded"
                />
                <label htmlFor={tone} className="text-sm cursor-pointer flex-1">
                  {tone}
                </label>
              </div>
            ))}
          </div>
          {formData.tones.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.tones.map(tone => (
                <span
                  key={tone}
                  className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs flex items-center"
                >
                  {tone}
                  <X
                    className="w-3 h-3 ml-1 cursor-pointer"
                    onClick={() => handleArrayChange('tones', tone, 'remove')}
                  />
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
            <Input
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter your ad title"
              className="w-full"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter your ad description"
              rows={4}
              className="w-full"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Keywords</label>
            <div className="space-y-2">
              {formData.keywords.map((keyword, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={keyword}
                    onChange={(e) => {
                      const newKeywords = [...formData.keywords];
                      newKeywords[index] = e.target.value;
                      handleInputChange('keywords', newKeywords);
                    }}
                    placeholder={`Keyword ${index + 1}`}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newKeywords = formData.keywords.filter((_, i) => i !== index);
                      handleInputChange('keywords', newKeywords);
                    }}
                    className="text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => handleInputChange('keywords', [...formData.keywords, ''])}
                className="mt-2"
              >
                + Add Keyword
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep} className="bg-purple-600 hover:bg-purple-700">
          Next: Media & Styling
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 p-6 bg-gradient-to-r from-gray-50 to-green-50 rounded-xl border-l-4 border-green-500">
      <h3 className="text-xl font-bold text-gray-800 flex items-center">
        <Palette className="mr-2 text-green-600" size={24} />
        Media & Creative Styling
      </h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Media Type</label>
          <Select
            value={formData.mediaType}
            onValueChange={(value) => handleInputChange('mediaType', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select media type" />
            </SelectTrigger>
            <SelectContent>
              {mediaTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {formData.mediaType && (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Template Options</label>
              <div className="grid grid-cols-2 gap-2">
                {templates.map(template => (
                  <div key={template} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={template}
                      checked={formData.templates.includes(template)}
                      onChange={(e) => 
                        handleArrayChange('templates', template, e.target.checked ? 'add' : 'remove')
                      }
                      className="rounded"
                    />
                    <label htmlFor={template} className="text-sm cursor-pointer flex-1">
                      {template}
                    </label>
                  </div>
                ))}
              </div>
              {formData.templates.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.templates.map(template => (
                    <span
                      key={template}
                      className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center"
                    >
                      {template}
                      <X
                        className="w-3 h-3 ml-1 cursor-pointer"
                        onClick={() => handleArrayChange('templates', template, 'remove')}
                      />
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Aspect Ratio</label>
              <Select
                value={formData.aspectRatio}
                onValueChange={(value) => handleInputChange('aspectRatio', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select aspect ratio" />
                </SelectTrigger>
                <SelectContent>
                  {aspectRatios.map(ratio => (
                    <SelectItem key={ratio} value={ratio}>{ratio}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {(formData.mediaType === 'Image' || formData.mediaType === 'Image & Video') && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Image Variations: {formData.imageVariations}
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={8}
                    value={formData.imageVariations}
                    onChange={(e) => handleInputChange('imageVariations', parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1</span>
                    <span>2 (Recommended)</span>
                    <span>8</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Visual Style</label>
                    <Select
                      value={formData.imageStyle}
                      onValueChange={(value) => handleInputChange('imageStyle', value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select visual style" />
                      </SelectTrigger>
                      <SelectContent>
                        {visualStyles.map(style => (
                          <SelectItem key={style} value={style}>{style}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Content Type</label>
                    <Select
                      value={formData.contentType}
                      onValueChange={(value) => handleInputChange('contentType', value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent>
                        {contentTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mood/Atmosphere</label>
                    <Select
                      value={formData.mood}
                      onValueChange={(value) => handleInputChange('mood', value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select mood" />
                      </SelectTrigger>
                      <SelectContent>
                        {moods.map(mood => (
                          <SelectItem key={mood} value={mood}>{mood}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Industry Preset</label>
                    <Select
                      value={formData.industryPreset}
                      onValueChange={(value) => handleInputChange('industryPreset', value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industryPresets.map(preset => (
                          <SelectItem key={preset} value={preset}>{preset}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}

            {(formData.mediaType === 'Video' || formData.mediaType === 'Image & Video') && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Video Duration: {formData.videoDuration}s
                </label>
                <input
                  type="range"
                  min={10}
                  max={60}
                  step={5}
                  value={formData.videoDuration}
                  onChange={(e) => handleInputChange('videoDuration', parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleInputChange('videoDuration', 15)}
                    className={formData.videoDuration === 15 ? 'bg-blue-100' : ''}
                  >
                    15s (Quick tip)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleInputChange('videoDuration', 30)}
                    className={formData.videoDuration === 30 ? 'bg-blue-100' : ''}
                  >
                    30s (Standard)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleInputChange('videoDuration', 45)}
                    className={formData.videoDuration === 45 ? 'bg-blue-100' : ''}
                  >
                    45s (Detailed)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleInputChange('videoDuration', 60)}
                    className={formData.videoDuration === 60 ? 'bg-blue-100' : ''}
                  >
                    60s (Story)
                  </Button>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Reference Files</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div className="flex flex-col items-center justify-center py-4">
                  <Upload className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500 mb-2">Drag & drop files here or click to browse</p>
                  <Input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files) {
                        const files = Array.from(e.target.files);
                        handleInputChange('referenceFiles', [...formData.referenceFiles, ...files]);
                      }
                    }}
                    className="hidden"
                    id="reference-upload"
                    multiple
                    accept="image/*,.pdf"
                  />
                  <Button variant="outline" asChild>
                    <label htmlFor="reference-upload" className="cursor-pointer">
                      Select Files
                    </label>
                  </Button>
                </div>
                {formData.referenceFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {formData.referenceFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <File className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{file.name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newFiles = formData.referenceFiles.filter((_, i) => i !== index);
                            handleInputChange('referenceFiles', newFiles);
                          }}
                          className="text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Key Notes</label>
          <Textarea
            value={formData.keyNotes}
            onChange={(e) => handleInputChange('keyNotes', e.target.value)}
            placeholder="Any important notes or special instructions"
            rows={4}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Content Generation Mode</label>
          <RadioGroup 
            defaultValue="normal"
            value={formData.contentGenerationMode}
            onValueChange={(value: 'normal' | 'advanced') => handleInputChange('contentGenerationMode', value)}
            className="grid grid-cols-2 gap-4"
          >
            <div>
              <RadioGroupItem value="normal" id="normal" className="peer sr-only" />
              <Label
                htmlFor="normal"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  <span>Normal (1x)</span>
                </div>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Standard content generation with basic variations
                </p>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="advanced" id="advanced" className="peer sr-only" />
              <Label
                htmlFor="advanced"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <div className="flex items-center gap-2">
                  <Wand2 className="h-4 w-4 text-purple-500" />
                  <span>Advanced (2x)</span>
                </div>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Enhanced generation with more creative variations
                </p>
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep} className="bg-green-600 hover:bg-green-700">
          Next: Review & Submit
        </Button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 flex items-center">
        <Check className="mr-2 text-green-600" size={24} />
        Review & Submit
      </h3>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Campaign Name</p>
                <p>{formData.campaignName || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Business Type</p>
                <p>{formData.businessType || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Product/Service</p>
                <p>{formData.productService || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Business Name</p>
                <p>{formData.businessName || '-'}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-500">Product URL</p>
                <p>{formData.productUrl || '-'}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-500">Target Locations</p>
                <div className="flex flex-wrap gap-1">
                  {formData.locations.length > 0 
                    ? formData.locations.map((location, i) => (
                        <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          {location}
                        </span>
                      ))
                    : '-'}
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-500">Selected Tones</p>
                <div className="flex flex-wrap gap-1">
                  {formData.tones.length > 0 
                    ? formData.tones.map((tone, i) => (
                        <span key={i} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                          {tone}
                        </span>
                      ))
                    : '-'}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Media Type</p>
                <p>{formData.mediaType || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Aspect Ratio</p>
                <p>{formData.aspectRatio || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Content Generation</p>
                <p className="capitalize">{formData.contentGenerationMode || '-'}</p>
              </div>
              {(formData.mediaType === 'Image' || formData.mediaType === 'Image & Video') && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Image Variations</p>
                  <p>{formData.imageVariations}</p>
                </div>
              )}
              {(formData.mediaType === 'Video' || formData.mediaType === 'Image & Video') && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Video Duration</p>
                  <p>{formData.videoDuration}s</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button
          onClick={() => {
            toast({
              title: "Success",
              description: "Meta Ads campaign submitted successfully!"
            });
          }}
          className="bg-green-600 hover:bg-green-700"
        >
          Submit Campaign
        </Button>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div 
        className="min-h-screen bg-background relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background Grid Pattern */}
        <div className="fixed inset-0 grid-pattern dark:grid-pattern opacity-30 pointer-events-none" />
      
        <main className="relative z-10 px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 text-center">
                <h1 className="text-4xl font-bold mb-2">Meta Ads Generator</h1>
                <p className="text-xl opacity-90">Complete Facebook & Instagram Ad Campaigns</p>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      1
                    </div>
                    <span className={`text-sm ${currentStep >= 1 ? 'font-semibold text-blue-600' : 'text-gray-500'}`}>Basic Info</span>
                  </div>
                  <div className="h-px flex-1 bg-gray-200 mx-2"></div>
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      2
                    </div>
                    <span className={`text-sm ${currentStep >= 2 ? 'font-semibold text-blue-600' : 'text-gray-500'}`}>Content</span>
                  </div>
                  <div className="h-px flex-1 bg-gray-200 mx-2"></div>
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      3
                    </div>
                    <span className={`text-sm ${currentStep >= 3 ? 'font-semibold text-blue-600' : 'text-gray-500'}`}>Media</span>
                  </div>
                  <div className="h-px flex-1 bg-gray-200 mx-2"></div>
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      4
                    </div>
                    <span className={`text-sm ${currentStep >= 4 ? 'font-semibold text-blue-600' : 'text-gray-500'}`}>Review</span>
                  </div>
                </div>

                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
                {currentStep === 4 && renderStep4()}
              </div>
            </div>
          </div>
        </main>
      </motion.div>
    </AnimatePresence>
  );
};

export default MetaAdsForm;