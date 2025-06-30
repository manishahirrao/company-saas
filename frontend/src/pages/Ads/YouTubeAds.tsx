
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Upload, 
  Play, 
  Image as ImageIcon, 
  Type, 
  FileText, 
  Zap, 
  Eye, 
  Target, 
  Download, 
  Copy,
  Sparkles,
  Wand2,
  X,
  Check,
  MousePointer,
  Hash,
  File,
  MapPin,
  Globe,
  Palette,
  Camera,
  Clock,
  Monitor,
  Sliders
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';

interface FormData {
  campaignName: string;
  adType: string;
  businessType: string;
  targetAudience: string;
  callToAction: string;
  productService: string;
  keyMessage: string;
  customHeadline: string;
  customDescription: string;
  landingPageUrl: string;
  additionalNotes: string;
  businessName: string;
  productPageUrl: string;
  selectedCountries: string[];
  selectedTones: string[];
  templateOption: string;
  imageVariations: number;
  videoDuration: number;
  aspectRatio: string;
  imageGenerationStyle: string;
  contentType: string;
  mood: string;
  industryPreset: string;
  keywords: string[];
  hashtags: string[];
  referenceFiles: File[];
}

interface GeneratedContent {
  videoScript?: string;
  headline?: string;
  description?: string;
  descriptionLine1?: string;
  descriptionLine2?: string;
  companionBannerSpecs?: string;
  thumbnailSpecs?: string;
  videoSpecs?: string;
  bumperAdScript?: string;
  discoveryAdContent?: {
    headline: string;
    descriptionLine1: string;
    descriptionLine2: string;
  };
}

const YouTubeAdsForm: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    campaignName: '',
    adType: '',
    businessType: '',
    targetAudience: '',
    callToAction: '',
    productService: '',
    keyMessage: '',
    customHeadline: '',
    customDescription: '',
    landingPageUrl: '',
    additionalNotes: '',
    businessName: '',
    productPageUrl: '',
    selectedCountries: [],
    selectedTones: [],
    templateOption: '',
    imageVariations: 2,
    videoDuration: 20,
    aspectRatio: '',
    imageGenerationStyle: '',
    contentType: '',
    mood: '',
    industryPreset: '',
    keywords: [],
    hashtags: [],
    referenceFiles: []
  });

  const [generatedContent, setGeneratedContent] = useState<GeneratedContent>({});
  const [showGenerated, setShowGenerated] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedField, setCopiedField] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [countrySearch, setCountrySearch] = useState('');

  const adTypes = [
    { value: 'trueview-instream', label: 'TrueView In-Stream' },
    { value: 'bumper-ads', label: 'Bumper Ads' },
    { value: 'discovery-ads', label: 'Discovery Ads' },
    { value: 'video-action-ads', label: 'Video Action Ads' }
  ];

  const businessTypes = [
    'E-commerce', 'SaaS/Software', 'Healthcare', 'Education', 'Real Estate', 
    'Restaurant/Food', 'Fitness/Wellness', 'Finance', 'Travel', 'Fashion', 'Other'
  ];

  const ctaOptions = [
    'Shop Now', 'Learn More', 'Sign Up', 'Get Quote', 'Download', 
    'Book Now', 'Start Free Trial', 'Call Now', 'Visit Site'
  ];

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Japan', 'Brazil', 'India', 'China',
    'Spain', 'Italy', 'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Belgium', 'Switzerland', 'Austria',
    'Portugal', 'Greece', 'Ireland', 'Poland', 'Czech Republic', 'Hungary', 'Romania', 'Bulgaria', 'Croatia', 'Slovenia',
    'Slovakia', 'Lithuania', 'Latvia', 'Estonia', 'Malta', 'Cyprus', 'Luxembourg', 'Iceland', 'South Korea', 'Singapore',
    'Thailand', 'Malaysia', 'Indonesia', 'Philippines', 'Vietnam', 'Taiwan', 'Hong Kong', 'New Zealand', 'South Africa',
    'Mexico', 'Argentina', 'Chile', 'Colombia', 'Peru', 'Venezuela', 'Ecuador', 'Bolivia', 'Paraguay', 'Uruguay',
    'Russia', 'Ukraine', 'Belarus', 'Kazakhstan', 'Turkey', 'Israel', 'Saudi Arabia', 'UAE', 'Egypt', 'Nigeria'
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

  const templateOptions = ['Template A', 'Template B', 'Template C', 'Custom'];
  const aspectRatios = ['1:1 (Square)', '16:9 (Landscape)', '4:5 (Portrait)', '9:16 (Story)', '1.91:1 (Banner)'];
  const imageStyles = ['Photorealistic', 'Illustration', 'Digital Art', 'Minimalist', 'Corporate/Business'];
  const contentTypes = ['Abstract/Conceptual', 'Portrait/People', 'Product Mockups', 'Data Visualization', 'Lifestyle/Workplace'];
  const moods = ['Corporate Professional', 'Creative/Innovative', 'Friendly/Approachable', 'Energetic/Dynamic', 'Calm/Peaceful'];
  const industryPresets = ['Technology', 'Finance', 'Healthcare', 'Education', 'Real Estate', 'Consulting'];

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as string]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleKeywordChange = (index: number, value: string) => {
    const newKeywords = [...formData.keywords];
    newKeywords[index] = value;
    handleInputChange('keywords', newKeywords);
  };

  const addKeyword = () => {
    handleInputChange('keywords', [...formData.keywords, '']);
  };

  const removeKeyword = (index: number) => {
    const newKeywords = formData.keywords.filter((_, i) => i !== index);
    handleInputChange('keywords', newKeywords);
  };

  const handleHashtagChange = (index: number, value: string) => {
    const newHashtags = [...formData.hashtags];
    newHashtags[index] = value;
    handleInputChange('hashtags', newHashtags);
  };

  const addHashtag = () => {
    handleInputChange('hashtags', [...formData.hashtags, '']);
  };

  const removeHashtag = (index: number) => {
    const newHashtags = formData.hashtags.filter((_, i) => i !== index);
    handleInputChange('hashtags', newHashtags);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleInputChange('referenceFiles', [...formData.referenceFiles, ...files]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = formData.referenceFiles.filter((_, i) => i !== index);
    handleInputChange('referenceFiles', newFiles);
  };

  const handleCountryToggle = (country: string) => {
    const newCountries = formData.selectedCountries.includes(country)
      ? formData.selectedCountries.filter(c => c !== country)
      : [...formData.selectedCountries, country];
    handleInputChange('selectedCountries', newCountries);
  };

  const handleToneToggle = (tone: string) => {
    const newTones = formData.selectedTones.includes(tone)
      ? formData.selectedTones.filter(t => t !== tone)
      : [...formData.selectedTones, tone];
    handleInputChange('selectedTones', newTones);
  };

  const filteredCountries = countries.filter(country =>
    country.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const generateWithAI = async (field: 'customHeadline' | 'customDescription' | 'hashtags' | 'additionalNotes') => {
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let generatedText = '';
      switch(field) {
        case 'customHeadline':
          generatedText = `AI-Generated Headline for ${formData.productService || 'your product'}`;
          break;
        case 'customDescription':
          generatedText = `This is an AI-generated description for your YouTube ad about ${formData.productService || 'your product/service'}.`;
          break;
        case 'hashtags':
          const tags = formData.productService 
            ? [`#${formData.productService.replace(/\s+/g, '')}`, `#${formData.businessType.replace(/\s+/g, '')}`, '#YouTubeAds']
            : ['#Marketing', '#Video', '#Advertising'];
          handleInputChange('hashtags', tags);
          break;
        case 'additionalNotes':
          generatedText = `Key notes for ${formData.campaignName || 'your YouTube campaign'}:
- Target: ${formData.targetAudience || 'viewers'}
- Primary CTA: ${formData.callToAction || 'Learn More'}
- Ad Type: ${formData.adType || 'TrueView'}`;
          break;
      }

      if (field !== 'hashtags') {
        handleInputChange(field, generatedText);
      }

      toast({
        title: "Success",
        description: `${field.charAt(0).toUpperCase() + field.slice(1)} generated!`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate content",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
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

  const generateContent = () => {
    // ... keep existing code (generateContent function implementation)
    const { adType, businessType, targetAudience, productService, keyMessage, callToAction } = formData;
    
    if (!adType || !businessType || !productService) {
      toast({
        title: "Error",
        description: "Please fill in basic campaign information first",
        variant: "destructive"
      });
      return;
    }

    let generated: GeneratedContent = {};

    switch (adType) {
      case 'trueview-instream':
        generated = {
          videoScript: `HOOK (0-3s): "${getHook(businessType, productService)}"
          
BODY (4-15s): ${getBody(businessType, productService, keyMessage, targetAudience)}

CTA (16-20s): "${callToAction || 'Learn more'} - Visit our website today!"

SCRIPT NOTES:
• Keep energy high throughout
• Show product/service benefits visually  
• Include brand logo in first 3 seconds
• End with clear next step`,
          
          companionBannerSpecs: `COMPANION BANNER SPECIFICATIONS:
• Dimensions: 300×60 pixels
• Format: JPG or PNG
• File size: Under 150KB recommended
• Include: Logo, key message, CTA button
• Colors: Match video branding
• Text: Large, readable font (min 12px)`,
          
          videoSpecs: `TRUEVIEW VIDEO SPECIFICATIONS:
• Resolution: 1920×1080 pixels (Full HD)
• Format: MP4 or MOV
• File size: Maximum 4 GB
• Frame rate: 24, 25, or 30 fps
• Aspect ratio: 16:9
• Duration: 15-60 seconds recommended
• Audio: Clear, balanced levels
• Branding: Include logo in first 3 seconds
• Captions: Include for accessibility
• Safe area: Keep important content in center 80%`
        };
        break;

      case 'bumper-ads':
        generated = {
          bumperAdScript: `6-SECOND SCRIPT:
"${getBumperScript(businessType, productService, callToAction)}"

TIMING BREAKDOWN:
• 0-1s: Brand/product reveal
• 2-4s: Key benefit/message  
• 5-6s: Logo + CTA

PRODUCTION NOTES:
• Use bold, high-contrast visuals
• Ensure logo is visible throughout
• No complex messaging - one clear point
• Test readability on mobile devices`,
          
          videoSpecs: `BUMPER AD SPECIFICATIONS:
• Resolution: 1920×1080 pixels (Full HD)
• Format: MP4 or MOV
• File size: Maximum 4 GB
• Frame rate: 24, 25, or 30 fps
• Aspect ratio: 16:9
• Duration: Exactly 6 seconds
• Audio: Clear, balanced levels
• Branding: Include throughout video
• Text: Minimal, large and readable`
        };
        break;

      case 'discovery-ads':
        const headline = generateDiscoveryHeadline(businessType, productService);
        const desc1 = generateDescriptionLine(businessType, productService, 1);
        const desc2 = generateDescriptionLine(businessType, productService, 2);
        
        generated = {
          discoveryAdContent: {
            headline,
            descriptionLine1: desc1,
            descriptionLine2: desc2
          },
          thumbnailSpecs: `DISCOVERY AD THUMBNAIL SPECS:
• Dimensions: 1280×720 pixels (16:9)
• Format: JPG or PNG
• File size: Maximum 2 MB
• Quality: High resolution, crisp details
• Content: Eye-catching visuals of product/service
• Text overlay: Minimal, readable (max 20% of image)
• Branding: Include subtle logo placement
• Safe area: Keep key content in center 80%`
        };
        break;

      case 'video-action-ads':
        generated = {
          headline: generateActionHeadline(businessType, productService),
          description: generateActionDescription(businessType, productService),
          videoSpecs: `VIDEO ACTION AD SPECS:
• Video: Same as TrueView specs
• Thumbnail: Same as Discovery specs
• Recommended length: 15-30 seconds
• Strong visual call-to-action overlay
• Mobile-optimized design
• Clear value proposition in first 5 seconds
• End with strong CTA and branding`
        };
        break;
    }

    setGeneratedContent(generated);
    setShowGenerated(true);
    toast({
      title: "Success",
      description: "YouTube ad content generated successfully!"
    });
  };

  const getHook = (businessType: string, product: string): string => {
    const hooks = {
      'E-commerce': `Tired of overpriced ${product}?`,
      'SaaS/Software': `${product} in just 30 seconds?`,
      'Healthcare': `Better ${product} is possible`,
      'Education': `Master ${product} faster`,
      'Real Estate': `Your dream ${product} awaits`,
      'Restaurant/Food': `Craving amazing ${product}?`,
      'Fitness/Wellness': `Transform with ${product}`,
      'Finance': `Smart ${product} solutions`,
      'Travel': `Discover ${product} deals`,
      'Fashion': `Style meets ${product}`
    };
    return hooks[businessType as keyof typeof hooks] || `Discover amazing ${product}`;
  };

  const getBody = (businessType: string, product: string, message: string, audience: string): string => {
    const base = message || `Our ${product} helps ${audience || 'people'} achieve their goals faster and easier.`;
    return `${base} With proven results and thousands of satisfied customers, we're the trusted choice for quality and value.`;
  };

  const getBumperScript = (businessType: string, product: string, cta: string): string => {
    const scripts = {
      'E-commerce': `${product} - 50% off today only! ${cta || 'Shop now'}!`,
      'SaaS/Software': `${product} - Free trial starts now! ${cta || 'Sign up'}!`,
      'Healthcare': `Better ${product} is here. ${cta || 'Learn more'} today!`,
      'Education': `Master ${product} in minutes. ${cta || 'Start now'}!`,
      'Real Estate': `Find your perfect ${product}. ${cta || 'Browse now'}!`,
      'Restaurant/Food': `Fresh ${product} delivered fast! ${cta || 'Order now'}!`
    };
    return scripts[businessType as keyof typeof scripts] || `Amazing ${product} awaits. ${cta || 'Get started'}!`;
  };

  const generateDiscoveryHeadline = (businessType: string, product: string): string => {
    const headlines = {
      'E-commerce': `Best ${product} Deals Online`,
      'SaaS/Software': `${product} Made Simple`,
      'Healthcare': `Advanced ${product} Care`,
      'Education': `Learn ${product} Fast`,
      'Real Estate': `Perfect ${product} Found`,
      'Restaurant/Food': `Fresh ${product} Daily`
    };
    return (headlines[businessType as keyof typeof headlines] || `Quality ${product} Here`).substring(0, 100);
  };

  const generateDescriptionLine = (businessType: string, product: string, line: number): string => {
    if (line === 1) {
      return `Top-rated ${product}`.substring(0, 35);
    } else {
      return `Trusted by thousands`.substring(0, 35);
    }
  };

  const generateActionHeadline = (businessType: string, product: string): string => {
    const headlines = {
      'E-commerce': 'Shop Now',
      'SaaS/Software': 'Try Free',
      'Healthcare': 'Book Now',
      'Education': 'Learn Now',
      'Real Estate': 'View Now',
      'Restaurant/Food': 'Order Now'
    };
    return headlines[businessType as keyof typeof headlines] || 'Get Started';
  };

  const generateActionDescription = (businessType: string, product: string): string => {
    return `Best ${product} deals`.substring(0, 25);
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast({
        title: "Success",
        description: "Content copied to clipboard!"
      });
      setTimeout(() => setCopiedField(''), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy content",
        variant: "destructive"
      });
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6 p-6 bg-gradient-to-r from-gray-50 to-red-50 rounded-xl border-l-4 border-red-500">
      <h3 className="text-xl font-bold text-gray-800 flex items-center">
        <FileText className="mr-2 text-red-600" size={24} />
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
            value={formData.productPageUrl}
            onChange={(e) => handleInputChange('productPageUrl', e.target.value)}
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
            placeholder="Who is your ideal viewer?"
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
          <label className="block text-sm font-semibold text-gray-700 mb-2">Landing Page URL</label>
          <Input
            value={formData.landingPageUrl}
            onChange={(e) => handleInputChange('landingPageUrl', e.target.value)}
            placeholder="https://your-landing-page.com"
            type="url"
            className="w-full"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            Location Targeting
          </label>
          <div className="border rounded-lg p-4 bg-white">
            <div className="mb-3">
              <Input
                placeholder="Search countries..."
                value={countrySearch}
                onChange={(e) => setCountrySearch(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="max-h-32 overflow-y-auto space-y-2">
              {filteredCountries.slice(0, 10).map(country => (
                <div key={country} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={country}
                    checked={formData.selectedCountries.includes(country)}
                    onChange={() => handleCountryToggle(country)}
                    className="rounded"
                  />
                  <label htmlFor={country} className="text-sm cursor-pointer">{country}</label>
                </div>
              ))}
            </div>
            {formData.selectedCountries.length > 0 && (
              <div className="mt-3 pt-3 border-t">
                <p className="text-sm font-medium mb-2">Selected: {formData.selectedCountries.length} countries</p>
                <div className="flex flex-wrap gap-1">
                  {formData.selectedCountries.slice(0, 5).map(country => (
                    <span key={country} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {country}
                    </span>
                  ))}
                  {formData.selectedCountries.length > 5 && (
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                      +{formData.selectedCountries.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Keywords</label>
          <div className="space-y-2">
            {formData.keywords.map((keyword, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={keyword}
                  onChange={(e) => handleKeywordChange(index, e.target.value)}
                  placeholder={`Keyword ${index + 1}`}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeKeyword(index)}
                  className="text-red-500"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={addKeyword}
              className="mt-2"
            >
              + Add Keyword
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={nextStep} className="bg-red-600 hover:bg-red-700">
          Next: Tone & Content
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 p-6 bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl border-l-4 border-purple-500">
      <h3 className="text-xl font-bold text-gray-800 flex items-center">
        <Palette className="mr-2 text-purple-600" size={24} />
        Tone & Content Selection
      </h3>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">YouTube Ad Type</h4>
          <Tabs
            value={formData.adType}
            onValueChange={(value) => handleInputChange('adType', value)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="trueview-instream" className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                TrueView
              </TabsTrigger>
              <TabsTrigger value="bumper-ads" className="flex items-center gap-2">
                <MousePointer className="w-4 h-4" />
                Bumper
              </TabsTrigger>
              <TabsTrigger value="discovery-ads" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Discovery
              </TabsTrigger>
              <TabsTrigger value="video-action-ads" className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                Action
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Professional Tones</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {professionalTones.map(tone => (
                <div key={tone} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={tone}
                    checked={formData.selectedTones.includes(tone)}
                    onChange={() => handleToneToggle(tone)}
                    className="rounded"
                  />
                  <label htmlFor={tone} className="text-sm cursor-pointer">{tone}</label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Engaging Tones</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {engagingTones.map(tone => (
                <div key={tone} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={tone}
                    checked={formData.selectedTones.includes(tone)}
                    onChange={() => handleToneToggle(tone)}
                    className="rounded"
                  />
                  <label htmlFor={tone} className="text-sm cursor-pointer">{tone}</label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Specialized Tones</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {specializedTones.map(tone => (
                <div key={tone} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={tone}
                    checked={formData.selectedTones.includes(tone)}
                    onChange={() => handleToneToggle(tone)}
                    className="rounded"
                  />
                  <label htmlFor={tone} className="text-sm cursor-pointer">{tone}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {formData.selectedTones.length > 0 && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm font-medium mb-2">Selected Tones:</p>
            <div className="flex flex-wrap gap-2">
              {formData.selectedTones.map(tone => (
                <span key={tone} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {tone}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Template Option</label>
            <div className="flex items-center gap-2">
              <Select
                value={formData.templateOption}
                onValueChange={(value) => handleInputChange('templateOption', value)}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  {templateOptions.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                Recommended
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep} className="bg-purple-600 hover:bg-purple-700">
          Next: Media Settings
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 p-6 bg-gradient-to-r from-gray-50 to-green-50 rounded-xl border-l-4 border-green-500">
      <h3 className="text-xl font-bold text-gray-800 flex items-center">
        <Camera className="mr-2 text-green-600" size={24} />
        Media & Content Settings
      </h3>

      <div className="space-y-6">
        {(formData.adType === 'discovery-ads' || formData.adType === 'video-action-ads') && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Image Variations</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Number of variations: {formData.imageVariations}</span>
                <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  Recommended: 2 variations
                </div>
              </div>
              <Slider
                value={[formData.imageVariations]}
                onValueChange={(value) => handleInputChange('imageVariations', value[0])}
                max={8}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>8</span>
              </div>
            </div>
          </div>
        )}

        {(formData.adType === 'trueview-instream' || formData.adType === 'video-action-ads') && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Video Duration</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Duration: {formData.videoDuration} seconds</span>
                <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Recommended: 20s
                </div>
              </div>
              <Slider
                value={[formData.videoDuration]}
                onValueChange={(value) => handleInputChange('videoDuration', value[0])}
                max={60}
                min={10}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>10s</span>
                <span>20s</span>
                <span>30s</span>
                <span>45s</span>
                <span>60s</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleInputChange('videoDuration', 15)}>
                  15s (Quick tip)
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleInputChange('videoDuration', 30)}>
                  30s (Standard)
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleInputChange('videoDuration', 45)}>
                  45s (Detailed)
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleInputChange('videoDuration', 60)}>
                  60s (Story)
                </Button>
              </div>
            </div>
          </div>
        )}

        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Aspect Ratio</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {aspectRatios.map(ratio => (
              <div
                key={ratio}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  formData.aspectRatio === ratio
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleInputChange('aspectRatio', ratio)}
              >
                <div className="text-sm font-medium">{ratio}</div>
                {ratio === '16:9 (Landscape)' && (
                  <div className="text-xs text-green-600 mt-1">Recommended</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Image Generation Style</h4>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h5 className="text-xs font-medium text-gray-600 mb-2">Visual Style</h5>
              <Select
                value={formData.imageGenerationStyle}
                onValueChange={(value) => handleInputChange('imageGenerationStyle', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  {imageStyles.map(style => (
                    <SelectItem key={style} value={style}>{style}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <h5 className="text-xs font-medium text-gray-600 mb-2">Content Type</h5>
              <Select
                value={formData.contentType}
                onValueChange={(value) => handleInputChange('contentType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select content" />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <h5 className="text-xs font-medium text-gray-600 mb-2">Mood</h5>
              <Select
                value={formData.mood}
                onValueChange={(value) => handleInputChange('mood', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select mood" />
                </SelectTrigger>
                <SelectContent>
                  {moods.map(mood => (
                    <SelectItem key={mood} value={mood}>{mood}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div>
          <h5 className="text-sm font-semibold text-gray-700 mb-2">Industry Preset</h5>
          <Select
            value={formData.industryPreset}
            onValueChange={(value) => handleInputChange('industryPreset', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select industry preset" />
            </SelectTrigger>
            <SelectContent>
              {industryPresets.map(preset => (
                <SelectItem key={preset} value={preset}>{preset}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Hashtags</label>
          <div className="space-y-2">
            {formData.hashtags.map((hashtag, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={hashtag}
                  onChange={(e) => handleHashtagChange(index, e.target.value)}
                  placeholder={`Hashtag ${index + 1}`}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeHashtag(index)}
                  className="text-red-500"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={addHashtag}
              >
                <Hash className="w-4 h-4 mr-2" />
                Add Hashtag
              </Button>
              <Button
                variant="outline"
                onClick={() => generateWithAI('hashtags')}
                disabled={isGenerating}
              >
                <Wand2 className="w-4 h-4 mr-2" />
                {isGenerating ? 'Generating...' : 'Generate Hashtags'}
              </Button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Reference Images/Video</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <div className="flex flex-col items-center justify-center py-4">
              <Upload className="w-8 h-8 mb-2 text-gray-400" />
              <p className="text-sm text-gray-500 mb-2">Drag & drop files here or click to browse</p>
              <Input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                id="reference-upload"
                multiple
                accept="image/*,video/*,.pdf"
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
                      onClick={() => removeFile(index)}
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

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold text-gray-700">Custom Headline</label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => generateWithAI('customHeadline')}
                disabled={isGenerating}
                className="flex items-center gap-1"
              >
                <Wand2 className="w-4 h-4" />
                {isGenerating ? 'Generating...' : 'Generate with AI'}
              </Button>
            </div>
            <Input
              value={formData.customHeadline}
              onChange={(e) => handleInputChange('customHeadline', e.target.value)}
              placeholder="Enter custom headline or generate with AI"
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold text-gray-700">Custom Description</label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => generateWithAI('customDescription')}
                disabled={isGenerating}
                className="flex items-center gap-1"
              >
                <Wand2 className="w-4 h-4" />
                {isGenerating ? 'Generating...' : 'Generate with AI'}
              </Button>
            </div>
            <Textarea
              value={formData.customDescription}
              onChange={(e) => handleInputChange('customDescription', e.target.value)}
              placeholder="Enter custom description or generate with AI"
              rows={3}
              className="w-full"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes</label>
          <Textarea
            value={formData.additionalNotes}
            onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
            placeholder="Any additional notes or requirements"
            rows={2}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={generateContent}>
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Content
          </Button>
          <Button onClick={nextStep} className="bg-green-600 hover:bg-green-700">
            Next: Review & Submit
          </Button>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 flex items-center">
        <Check className="mr-2 text-green-600" size={24} />
        Review & Submit
      </h3>

      {showGenerated && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              Generated YouTube Ad Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* ... keep existing code (renderGeneratedContent implementation) */}
            {formData.adType === 'trueview-instream' && generatedContent.videoScript && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">TrueView In-Stream Ad</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Video Script</h4>
                      <div className="flex items-center justify-between bg-gray-50 p-2 rounded mb-2">
                        <div className="flex-1">
                          <pre className="text-sm whitespace-pre-wrap">{generatedContent.videoScript}</pre>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(generatedContent.videoScript || '', 'video-script')}
                        >
                          {copiedField === 'video-script' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Companion Banner Specifications</h4>
                      <div className="flex items-center justify-between bg-gray-50 p-2 rounded mb-2">
                        <div className="flex-1">
                          <pre className="text-sm whitespace-pre-wrap">{generatedContent.companionBannerSpecs}</pre>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(generatedContent.companionBannerSpecs || '', 'banner-specs')}
                        >
                          {copiedField === 'banner-specs' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Video Specifications</h4>
                      <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <div className="flex-1">
                          <pre className="text-sm whitespace-pre-wrap">{generatedContent.videoSpecs}</pre>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(generatedContent.videoSpecs || '', 'video-specs')}
                        >
                          {copiedField === 'video-specs' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {formData.adType === 'bumper-ads' && generatedContent.bumperAdScript && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Bumper Ad Content</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">6-Second Script</h4>
                      <div className="flex items-center justify-between bg-gray-50 p-2 rounded mb-2">
                        <div className="flex-1">
                          <pre className="text-sm whitespace-pre-wrap">{generatedContent.bumperAdScript}</pre>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(generatedContent.bumperAdScript || '', 'bumper-script')}
                        >
                          {copiedField === 'bumper-script' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Video Specifications</h4>
                      <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <div className="flex-1">
                          <pre className="text-sm whitespace-pre-wrap">{generatedContent.videoSpecs}</pre>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(generatedContent.videoSpecs || '', 'bumper-specs')}
                        >
                          {copiedField === 'bumper-specs' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {formData.adType === 'discovery-ads' && generatedContent.discoveryAdContent && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Discovery Ad Content</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Headline (100 characters max)</h4>
                      <div className="flex items-center justify-between bg-gray-50 p-2 rounded mb-2">
                        <div className="flex-1">
                          <span className="text-sm">{generatedContent.discoveryAdContent.headline}</span>
                          <span className="text-xs text-gray-500 ml-2">({generatedContent.discoveryAdContent.headline.length}/100)</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(generatedContent.discoveryAdContent?.headline || '', 'discovery-headline')}
                        >
                          {copiedField === 'discovery-headline' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Description Line 1 (35 characters max)</h4>
                      <div className="flex items-center justify-between bg-gray-50 p-2 rounded mb-2">
                        <div className="flex-1">
                          <span className="text-sm">{generatedContent.discoveryAdContent.descriptionLine1}</span>
                          <span className="text-xs text-gray-500 ml-2">({generatedContent.discoveryAdContent.descriptionLine1.length}/35)</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(generatedContent.discoveryAdContent?.descriptionLine1 || '', 'discovery-desc1')}
                        >
                          {copiedField === 'discovery-desc1' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Description Line 2 (35 characters max)</h4>
                      <div className="flex items-center justify-between bg-gray-50 p-2 rounded mb-2">
                        <div className="flex-1">
                          <span className="text-sm">{generatedContent.discoveryAdContent.descriptionLine2}</span>
                          <span className="text-xs text-gray-500 ml-2">({generatedContent.discoveryAdContent.descriptionLine2.length}/35)</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(generatedContent.discoveryAdContent?.descriptionLine2 || '', 'discovery-desc2')}
                        >
                          {copiedField === 'discovery-desc2' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Thumbnail Specifications</h4>
                      <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <div className="flex-1">
                          <pre className="text-sm whitespace-pre-wrap">{generatedContent.thumbnailSpecs}</pre>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(generatedContent.thumbnailSpecs || '', 'thumbnail-specs')}
                        >
                          {copiedField === 'thumbnail-specs' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {formData.adType === 'video-action-ads' && generatedContent.headline && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Video Action Ad Content</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Headline</h4>
                      <div className="flex items-center justify-between bg-gray-50 p-2 rounded mb-2">
                        <div className="flex-1">
                          <span className="text-sm">{generatedContent.headline}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(generatedContent.headline || '', 'action-headline')}
                        >
                          {copiedField === 'action-headline' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Description (25 characters max)</h4>
                      <div className="flex items-center justify-between bg-gray-50 p-2 rounded mb-2">
                        <div className="flex-1">
                          <span className="text-sm">{generatedContent.description}</span>
                          <span className="text-xs text-gray-500 ml-2">({generatedContent.description?.length || 0}/25)</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(generatedContent.description || '', 'action-description')}
                        >
                          {copiedField === 'action-description' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Video Specifications</h4>
                      <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <div className="flex-1">
                          <pre className="text-sm whitespace-pre-wrap">{generatedContent.videoSpecs}</pre>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(generatedContent.videoSpecs || '', 'action-specs')}
                        >
                          {copiedField === 'action-specs' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

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
                <p className="text-sm font-medium text-gray-500">Target Audience</p>
                <p>{formData.targetAudience || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Ad Type</p>
                <p>{formData.adType ? adTypes.find(t => t.value === formData.adType)?.label : '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Call to Action</p>
                <p>{formData.callToAction || '-'}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-500">Selected Countries</p>
                <div className="flex flex-wrap gap-2">
                  {formData.selectedCountries.length > 0 
                    ? formData.selectedCountries.slice(0, 10).map((country, i) => (
                        <span key={i} className="bg-gray-100 px-2 py-1 rounded text-sm">{country}</span>
                      ))
                    : '-'}
                  {formData.selectedCountries.length > 10 && (
                    <span className="bg-gray-200 px-2 py-1 rounded text-sm">
                      +{formData.selectedCountries.length - 10} more
                    </span>
                  )}
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-500">Selected Tones</p>
                <div className="flex flex-wrap gap-2">
                  {formData.selectedTones.length > 0 
                    ? formData.selectedTones.map((tone, i) => (
                        <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{tone}</span>
                      ))
                    : '-'}
                </div>
              </div>
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
              description: "YouTube campaign submitted successfully!"
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
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-8 text-center">
            <h1 className="text-4xl font-bold mb-2">YouTube Ads Generator</h1>
            <p className="text-xl opacity-90">Complete Campaign Specifications & Content</p>
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  1
                </div>
                <span className={`text-sm ${currentStep >= 1 ? 'font-semibold text-red-600' : 'text-gray-500'}`}>Basic Info</span>
              </div>
              <div className="h-px flex-1 bg-gray-200 mx-2"></div>
              <div className="flex items-center gap-2">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-red-600 text-white' : currentStep === 2 ? 'bg-red-100 text-red-600' : 'bg-gray-200 text-gray-600'}`}>
                  2
                </div>
                <span className={`text-sm ${currentStep >= 2 ? 'font-semibold text-red-600' : 'text-gray-500'}`}>Tone & Content</span>
              </div>
              <div className="h-px flex-1 bg-gray-200 mx-2"></div>
              <div className="flex items-center gap-2">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-red-600 text-white' : currentStep === 3 ? 'bg-red-100 text-red-600' : 'bg-gray-200 text-gray-600'}`}>
                  3
                </div>
                <span className={`text-sm ${currentStep >= 3 ? 'font-semibold text-red-600' : 'text-gray-500'}`}>Media Settings</span>
              </div>
              <div className="h-px flex-1 bg-gray-200 mx-2"></div>
              <div className="flex items-center gap-2">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 4 ? 'bg-red-600 text-white' : currentStep === 4 ? 'bg-red-100 text-red-600' : 'bg-gray-200 text-gray-600'}`}>
                  4
                </div>
                <span className={`text-sm ${currentStep >= 4 ? 'font-semibold text-red-600' : 'text-gray-500'}`}>Review</span>
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

export default YouTubeAdsForm;
