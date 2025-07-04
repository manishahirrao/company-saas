import React, { useState } from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Upload, 
  Type, 
  Image, 
  Link, 
  Zap, 
  Target, 
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
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { GridBackground } from '@/components/GridBackground';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

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
  location: string[];
  productUrl: string;
  tones: string[];
  templateStyle: string;
  imageVariations: number;
  videoDuration: number;
  imageStyle: string;
  contentType: string;
  mood: string;
  industryPreset: string;
  templateId?: number;
}

interface GeneratedContent {
  title?: string;
  description?: string;
  hashtags?: string[];
  keyNotes?: string;
}

const templates = [
  { id: 1, name: 'The 3rd Person News Story Advertorial', description: 'Use it to mimic an objective news article---open with "According to industry insiders..." or "A recent study reveals...," then tell a compelling story about your product as if it\'s headline news. This builds authority and trust.' },
  { id: 2, name: 'The Testimonial Advertorial', description: 'Use it to weave real customer stories into a mini case study. Start by introducing the user\'s problem, cite scientific or data-backed evidence for your solution, then close with glowing quotes and concrete before-/after results.' },
  { id: 3, name: 'Advertorial Jump Page', description: 'Use it to create a high-impact gateway that teases an in-depth article. Lead with an emotional hook or provocative question ("What the beauty industry won\'t tell you..."), then invite readers to "Jump" to the full advertorial---capturing emails or clicks before revealing the full pitch.' },
  { id: 4, name: 'The False Disqualifier', description: 'Use it to own a perceived weakness ("Yes, we\'re pricier---but here\'s why that premium means better results..."), turning it into a unique selling point.' },
  { id: 5, name: 'The Damaging Admission', description: 'Use it to build credibility by admitting a hard truth ("I used to overthink every design..."), then reveal how that admission led to your superior process or product.' },
  { id: 6, name: 'The Secret Sauce', description: 'Use it to promise exclusive insight ("Our secret sauce is a proprietary step nobody else talks about..."), creating intrigue and positioning your solution as next-level.' },
  { id: 7, name: 'Sworn To Secrecy', description: 'Use it to disqualify broad audiences ("This isn\'t for everyone---only serious entrepreneurs..."), which makes the offer feel more elite and piques curiosity.' },
  { id: 8, name: 'Silencing The Doubters', description: 'Use it to frame skeptics as underestimating you ("They said it couldn\'t be done---so we did it anyway..."), tapping into underdog energy and social proof.' },
  { id: 9, name: 'The Godfather Offer', description: 'Use it to stack an irresistible bundle ("Double your leads or we\'ll give you your money back, plus $100 for wasting your time"), making refusal almost impossible.' },
  { id: 10, name: 'The Buyer State Diagnosis', description: 'Use it to ask targeted diagnostic questions ("Still struggling to convert cold traffic?"), so active buyers see their exact problem mirrored---and your solution as the cure.' },
  { id: 11, name: 'The Lost Opportunity', description: 'Use it to trigger FOMO ("Don\'t be the one who missed out on 2x growth while your competitors raced ahead"), then present your offer as their second chance.' },
  { id: 12, name: 'The "Let Me Know"', description: 'Use it to promise follow-up value ("Interested? Let me know and I\'ll send you my entire swipe file"), which builds anticipation and invites engagement.' },
  { id: 13, name: 'The Unbelievable Question', description: 'Use it to hook with a jaw-dropping question ("What if you could get 1,000 subscribers in 24 hrs---without ads?"), then deliver the method behind that claim.' },
  { id: 14, name: 'The Envisioned Outcome', description: 'Use it to paint a vivid future scene ("Picture waking up to ₹10,000 in sales before breakfast..."), helping prospects emotionally connect to the end benefit.' },
  { id: 15, name: 'The Worst Kept Secret', description: 'Use it to leverage social proof ("The industry\'s best-kept secret is out---here\'s how top brands are doing it"), making your method feel both proven and urgent.' },
  { id: 16, name: 'The Urgent Contact', description: 'Use it to create a mini quiz or checklist ("Which of these 3 mistakes is killing your click-through rate?"), diagnosing pain and prompting immediate action.' },
  { id: 17, name: 'The Time Collapse', description: 'Use it to promise rapid results ("How to write a bestselling ad in under 60 minutes"), collapsing perceived effort and time barriers.' },
  { id: 18, name: 'The Decision Maker', description: 'Use it to speak directly to those who hold the purse strings ("If you sign off on this, your team will thank you---and your boss will congratulate you"), framing benefits in terms of both professional and personal gain.' },
  { id: 19, name: 'The Embedded Error', description: 'Use it to highlight a common mistake ("Here\'s why your email blasts aren\'t converting---and the one tweak to fix them"), demonstrating expertise and offering a quick win.' },
  { id: 20, name: 'The Can\'t Get Started', description: 'Use it to empathize with paralysis ("Staring at a blank page? You\'re not alone..."), then provide your tool or framework as the kick-start they need.' },
  { id: 21, name: 'The Shame Game', description: 'Use it to gently shame in a positive way ("Don\'t let another quarter slip by..."), tapping into fear of missing out while offering you as the safeguard.' },
  { id: 22, name: 'The Gatekeeper', description: 'Use it to call out your ideal avatar ("For solo founders tired of guesswork..."), instantly filtering out non-buyers and resonating deeply with your perfect customer.' },
  { id: 23, name: 'The Silenced Story', description: 'Use it to share a controversial or little-known insider tale ("They didn\'t want you to hear this story..."), sparking curiosity and positioning your product as the behind-the-scenes hero.' },
  { id: 24, name: 'Instant Epiphany', description: 'Use it to immediately shake up expectations. Open with a provocative statement that questions a common belief, then guide readers to a new, more powerful way of seeing their problem.' },
  { id: 25, name: 'The Reverse-Goal Revelation', description: 'Use it to stop them cold. Tell prospects to "STOP chasing X the usual way," then reveal why redirecting their efforts toward your unconventional approach yields faster, better results.' },
  { id: 26, name: 'The Objection Obliterator', description: 'Use it to preempt common hesitations. Name the top 1-2 objections ("Worried it\'s too expensive?"), validate them, then flip them into reasons why buying now is smart.' },
  { id: 27, name: 'The Hidden Enemy', description: 'Use it to externalize blame. Introduce an overlooked "villain" (a process, belief, or hidden cost) that\'s sabotaging their efforts---then pitch your solution as the way to neutralize it.' },
  { id: 28, name: 'The Brutal Truth Bomb', description: 'Use it to shock with a harsh reality check. Drop a hard-hitting fact or myth-busting stat that undercuts complacency and sets the stage for your product as the antidote.' },
  { id: 29, name: 'The Cheap Trick', description: 'Use it to highlight simplicity. Showcase a low-effort, high-impact hack that resonates with people tired of complex, time-consuming solutions.' },
  { id: 30, name: 'Scarcity Accelerator', description: 'Use it to ratchet up FOMO with hard deadlines or limited quantities---"Only 5 seats remain at this price."' },
  { id: 31, name: 'The Timeline Collapse', description: 'Use it to compress time. Describe a rapid journey ("In just 7 days you could..."), creating urgency and illustrating how fast your method delivers results.' }, 
  { id: 32, name: 'Outcome-Focused Unique Solution', description: 'Use it to lead with the specific result ("Double open rates in 7 days"), then explain the singular mechanism behind it.' },
  { id: 33, name: 'The Myth Buster', description: 'Use it to debunk a common misconception. Present the myth ("You must spend thousands on ads to see ROI"), then flip it with data or a demo of your cost-efficient alternative.' },
  { id: 34, name: 'The Unexpected Delivery', description: 'Use it to promise one outcome but deliver something surprising. ("You came for faster results, but here\'s the one thing nobody talks about..."), then tie it back to your core benefit.' },
  { id: 35, name: 'The Weird Hack', description: 'Use it to reveal an offbeat shortcut. Lead with a quirky question ("What if I told you you\'ve been doing X wrong all along?"), then showcase your unconventional yet effective method.' },
  { id: 36, name: 'Opportunity Cost Motivator', description: 'Use it to highlight what they\'re missing out on by not acting ("Every day you wait costs you ₹1,000 in lost profits").' },
  { id: 37, name: 'Contrast Crafting', description: 'Use it to weave a high-stakes story that contrasts "what you have now" vs. "what you could have," then pitch your product as the bridge.' },
  { id: 38, name: 'The Curiosity Cultivator', description: 'Use it to start with a jaw-dropping fact or question ("Did you know 87% of marketers are ignoring this one metric?"), then follow with your solution.' },
  { id: 39, name: 'The Paradoxical Truth Framework', description: 'Use it to tease a paradoxical headline ("To gain more, give away first"), unpack the logic, and tie into your offering.' },
  { id: 40, name: 'PAS - Eliminate Common Problem', description: 'Use it to hook with the Problem, Agitate the pain, then Solve it with your breakthrough---classic but always effective.' },
  { id: 41, name: 'PAS - What The Hell', description: 'Use it to kick off with a blunt frustration ("What the hell is going on with X?"), then walk them through your solution.' },
  { id: 42, name: 'UMP (Unique Mechanism of the Problem)', description: 'Use it to pinpoint the real root cause ("It\'s not lack of traffic---it\'s lack of [your UMP]"), then pitch your proprietary fix.' }
];

const GoogleAdsForm: React.FC = () => {
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
    location: [],
    productUrl: '',
    tones: [],
    templateStyle: '',
    imageVariations: 2,
    videoDuration: 20,
    imageStyle: '',
    contentType: '',
    mood: '',
    industryPreset: '',
    templateId: undefined
  });

  const [generatedContent, setGeneratedContent] = useState<GeneratedContent>({});
  const [showGenerated, setShowGenerated] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedField, setCopiedField] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [locationSearch, setLocationSearch] = useState('');
  const [showGenerationOptions, setShowGenerationOptions] = useState(false);
  const [generationMode, setGenerationMode] = useState<'normal' | 'advanced'>('normal');
  const [generationType, setGenerationType] = useState<'normal' | 'advanced'>('normal');

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

  const mediaTypes = ['Content Only', 'Image', 'Video', 'Image & Video'];

  const aspectRatios = [
    { value: '1:1', label: '1:1 (Square)', description: 'Standard posts, profile content' },
    { value: '16:9', label: '16:9 (Landscape)', description: 'Video content, presentations' },
    { value: '4:5', label: '4:5 (Portrait)', description: 'Mobile-optimized posts' },
    { value: '9:16', label: '9:16 (Story)', description: 'LinkedIn Stories, mobile video' },
    { value: '1.91:1', label: '1.91:1 (Banner)', description: 'Cover images, headers' }
  ];

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Italy', 'Spain',
    'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Switzerland', 'Austria', 'Belgium',
    'Portugal', 'Ireland', 'New Zealand', 'Japan', 'South Korea', 'Singapore', 'India', 'Brazil',
    'Mexico', 'Argentina', 'Chile', 'Colombia', 'South Africa', 'Egypt', 'Turkey', 'Israel',
    'United Arab Emirates', 'Saudi Arabia', 'Thailand', 'Vietnam', 'Philippines', 'Malaysia',
    'Indonesia', 'China', 'Taiwan', 'Hong Kong', 'Russia', 'Poland', 'Czech Republic', 'Hungary',
    'Greece', 'Cyprus', 'Malta', 'Luxembourg', 'Iceland', 'Estonia', 'Latvia', 'Lithuania'
  ];

  const professionalTones = [
    'Professional & Formal', 'Business Casual', 'Corporate Executive', 'Industry Expert',
    'Thought Leader', 'Educational/Informative', 'Advisory/Consultative'
  ];

  const engagingTones = [
    'Conversational & Friendly', 'Inspirational & Motivational', 'Storytelling',
    'Personal & Authentic', 'Humorous & Light-hearted', 'Bold & Confident',
    'Provocative/Controversial'
  ];

  const specializedTones = [
    'Technical & Detailed', 'Sales-focused', 'Community Building', 'Behind-the-scenes',
    'Achievement/Success focused', 'Problem-solving', 'Trendy/Current events'
  ];

  const templateStyles = [
    'Modern Minimalist', 'Corporate Professional', 'Creative Bold', 'Clean & Simple',
    'Elegant Premium', 'Tech Focused', 'Lifestyle Oriented', 'Data Driven'
  ];

  const imageStyles = [
    'Photorealistic', 'Illustration', 'Digital Art', 'Minimalist', 'Corporate/Business',
    'Infographic Style', 'Hand-drawn/Sketch', '3D Rendered', 'Flat Design', 'Watercolor'
  ];

  const contentTypes = [
    'Abstract/Conceptual', 'Portrait/People', 'Product Mockups', 'Data Visualization',
    'Lifestyle/Workplace', 'Technology/Digital', 'Nature/Organic', 'Architecture/Space',
    'Icons/Symbols'
  ];

  const moods = [
    'Corporate Professional', 'Creative/Innovative', 'Friendly/Approachable', 'Energetic/Dynamic',
    'Calm/Peaceful', 'Luxurious/Premium', 'Playful/Fun', 'Serious/Formal'
  ];

  const industryPresets = [
    'Technology', 'Finance', 'Healthcare', 'Education', 'Real Estate', 'Consulting',
    'Creative Agency', 'Startup'
  ];

  const variationOptions = [1, 2, 3, 4, 5, 6, 8];
  const durationPresets = [
    { value: 15, label: '15s (Quick tip)' },
    { value: 30, label: '30s (Standard post)' },
    { value: 45, label: '45s (Detailed explanation)' },
    { value: 60, label: '60s (Story/Case study)' }
  ];

  const filteredCountries = countries.filter(country =>
    country.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as string]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleMultiSelect = (field: keyof FormData, value: string) => {
    const currentArray = formData[field] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    handleInputChange(field, newArray);
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'reference') => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (type === 'reference') {
        handleInputChange('referenceFiles', [...formData.referenceFiles, ...files]);
      }
    }
  };

  const removeFile = (index: number) => {
    const newFiles = formData.referenceFiles.filter((_, i) => i !== index);
    handleInputChange('referenceFiles', newFiles);
  };

  const generateWithAI = async (field: 'title' | 'description' | 'hashtags' | 'keyNotes') => {
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let generatedText = '';
      switch(field) {
        case 'title':
          generatedText = generationType === 'normal'
            ? `Engaging ${formData.productService || 'Product'} Title`
            : `Premium ${formData.productService || 'Product'} Solution - ${formData.targetAudience || 'Your Needs'}`;
          break;
        case 'description':
          generatedText = generationType === 'normal'
            ? `This is an AI-generated description for your ${formData.productService || 'product/service'}. It highlights key benefits and features to attract your target audience.`
            : `Experience the next level of ${formData.productService || 'product/service'} with our cutting-edge solution. Key benefits include:\n\n• Enhanced performance\n• Premium features\n• Tailored for ${formData.targetAudience || 'your needs'}\n\n${formData.callToAction ? `${formData.callToAction} now!` : ''}`;
          break;
        case 'hashtags':
          const tags = generationType === 'normal'
            ? formData.productService 
              ? [`#${formData.productService.replace(/\s+/g, '')}`, `#${formData.businessType.replace(/\s+/g, '')}`, '#DigitalMarketing']
              : ['#Marketing', '#AdCampaign', '#Promotion']
            : formData.productService 
              ? [`#${formData.productService.replace(/\s+/g, '')}Pro`, `#${formData.businessType.replace(/\s+/g, '')}Solutions`, '#Premium', '#BusinessGrowth']
              : ['#Professional', '#BusinessSolution', '#Enterprise'];
          handleInputChange('hashtags', tags);
          break;
        case 'keyNotes':
          generatedText = generationType === 'normal'
            ? `Key notes for ${formData.campaignName || 'your campaign'}:
- Target audience: ${formData.targetAudience || 'general'}
- Primary CTA: ${formData.callToAction || 'none'}
- Main message: ${formData.productService || 'product/service'}`
            : `Advanced Campaign Strategy:
            
Product: ${formData.productService}
Audience: ${formData.targetAudience}
Persona: ${formData.persona}

Key Differentiators:
• Premium features and benefits
• Competitive advantages
• ROI-focused messaging

Keywords: ${formData.keywords.join(', ')}`;
          break;
      }

      if (field !== 'hashtags') {
        handleInputChange(field, generatedText);
      }

      toast({
        title: "Success",
        description: `${field.charAt(0).toUpperCase() + field.slice(1)} generated in ${generationType} mode!`
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
    if (!validateForm()) return;
    setShowGenerationOptions(true);
  };

  const handleGenerateConfirm = (mode: 'normal' | 'advanced') => {
    setGenerationMode(mode);
    setShowGenerationOptions(false);
    setIsGenerating(true);
    
    setTimeout(() => {
      const generated: GeneratedContent = {
        title: mode === 'normal' 
          ? `Engaging ${formData.productService} for ${formData.targetAudience || 'Your Audience'}`
          : `Premium ${formData.productService} Solution for ${formData.targetAudience || 'Professionals'}`,
        description: mode === 'normal'
          ? `Discover our amazing ${formData.productService} designed specifically for ${formData.targetAudience || 'your needs'}. ${formData.callToAction ? `${formData.callToAction} today!` : ''}`
          : `Experience the next level of ${formData.productService} with our cutting-edge solution tailored for ${formData.targetAudience || 'your professional needs'}. Key benefits include:\n\n• Enhanced performance metrics\n• Streamlined workflow integration\n• Premium support options\n\n${formData.callToAction ? `${formData.callToAction} now to unlock exclusive benefits!` : ''}`,
        hashtags: mode === 'normal'
          ? formData.productService 
            ? [`#${formData.productService.replace(/\s+/g, '')}`, `#${formData.businessType.replace(/\s+/g, '')}`, '#BestDeal']
            : ['#Promotion', '#SpecialOffer', '#LimitedTime']
          : formData.productService 
            ? [
                `#${formData.productService.replace(/\s+/g, '')}Pro`, 
                `#${formData.businessType.replace(/\s+/g, '')}Solutions`,
                '#BusinessGrowth',
                '#IndustryLeaders',
                '#PremiumService'
              ]
            : ['#Professional', '#BusinessSolution', '#Enterprise'],
        keyNotes: mode === 'normal'
          ? `Campaign Focus:
- Primary Product: ${formData.productService}
- Target: ${formData.targetAudience}
- Persona: ${formData.persona}
- Keywords: ${formData.keywords.join(', ')}`
          : `Advanced Campaign Strategy:
          
Product: ${formData.productService}
Audience: ${formData.targetAudience}
Persona: ${formData.persona}

Key Differentiators:
• Premium features and benefits
• Competitive advantages
• ROI-focused messaging

Keywords: ${formData.keywords.join(', ')}`
      };

      setGeneratedContent(generated);
      setShowGenerated(true);
      setIsGenerating(false);
      
      toast({
        title: "Success",
        description: `Content generated in ${mode} mode!`
      });
    }, 1500);
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
          <label className="block text-sm font-semibold text-gray-700 mb-2">Product Page URL</label>
          <Input
            value={formData.productUrl}
            onChange={(e) => handleInputChange('productUrl', e.target.value)}
            placeholder="https://example.com/product"
            className="w-full"
          />
        </div>

        <div>
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
          <label className="block text-sm font-semibold text-gray-700 mb-2">Target Locations</label>
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                placeholder="Search countries..."
                className="pl-10"
              />
            </div>
            <div className="max-h-40 overflow-y-auto border rounded-lg p-3 bg-gray-50">
              {filteredCountries.map(country => (
                <div key={country} className="flex items-center space-x-2 py-1">
                  <Checkbox
                    checked={formData.location.includes(country)}
                    onCheckedChange={() => handleMultiSelect('location', country)}
                  />
                  <span className="text-sm">{country}</span>
                </div>
              ))}
            </div>
            {formData.location.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.location.map(loc => (
                  <Badge key={loc} variant="secondary" className="flex items-center gap-1">
                    {loc}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => handleMultiSelect('location', loc)} />
                  </Badge>
                ))}
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
        <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
          Next: Content & Tone
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 p-6 bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl border-l-4 border-purple-500">
      <h3 className="text-xl font-bold text-gray-800 flex items-center">
        <Type className="mr-2 text-purple-600" size={24} />
        Content & Tone Selection
      </h3>

      {/* Tone Selection */}
      <div className="bg-white p-4 rounded-lg border">
        <label className="block text-sm font-semibold text-gray-700 mb-3">Content Tone (Select Multiple)</label>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">Professional Tones</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {professionalTones.map(tone => (
                <div key={tone} className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.tones.includes(tone)}
                    onCheckedChange={() => handleMultiSelect('tones', tone)}
                  />
                  <span className="text-sm">{tone}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">Engaging Tones</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {engagingTones.map(tone => (
                <div key={tone} className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.tones.includes(tone)}
                    onCheckedChange={() => handleMultiSelect('tones', tone)}
                  />
                  <span className="text-sm">{tone}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">Specialized Tones</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {specializedTones.map(tone => (
                <div key={tone} className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.tones.includes(tone)}
                    onCheckedChange={() => handleMultiSelect('tones', tone)}
                  />
                  <span className="text-sm">{tone}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {formData.tones.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {formData.tones.map(tone => (
              <Badge key={tone} variant="outline" className="flex items-center gap-1">
                {tone}
                <X className="w-3 h-3 cursor-pointer" onClick={() => handleMultiSelect('tones', tone)} />
              </Badge>
            ))}
          </div>
        )}
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-semibold text-gray-700">Title</label>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => generateWithAI('title')}
              disabled={isGenerating}
              className="flex items-center gap-1"
            >
              <Wand2 className="w-4 h-4" />
              {isGenerating ? 'Generating...' : 'Generate with AI'}
            </Button>
          </div>
          <Input
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Enter your ad title"
            className="w-full"
          />
        </div>

        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-semibold text-gray-700">Description</label>
            <Button
              variant="outline" 
              size="sm"
              onClick={() => generateWithAI('description')}
              disabled={isGenerating}
              className="flex items-center gap-1"
            >
              <Wand2 className="w-4 h-4" />
              {isGenerating ? 'Generating...' : 'Generate with AI'}
            </Button>
          </div>
          <Textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Enter your ad description"
            rows={4}
            className="w-full"
          />
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

        {(formData.mediaType === 'Image' || formData.mediaType === 'Video' || formData.mediaType === 'Image & Video') && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Template Style</label>
            <div className="flex items-center gap-2">
              <Select
                value={formData.templateStyle}
                onValueChange={(value) => handleInputChange('templateStyle', value)}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select template style" />
                </SelectTrigger>
                <SelectContent>
                  {templateStyles.map(style => (
                    <SelectItem key={style} value={style}>{style}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                Recommended
              </Badge>
            </div>
          </div>
        )}

        {(formData.mediaType === 'Image' || formData.mediaType === 'Video' || formData.mediaType === 'Image & Video') && (
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Aspect Ratio</label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {aspectRatios.map(ratio => (
                <div
                  key={ratio.value}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    formData.aspectRatio === ratio.value 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleInputChange('aspectRatio', ratio.value)}
                >
                  <div className="font-medium text-sm">{ratio.label}</div>
                  <div className="text-xs text-gray-500">{ratio.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {formData.mediaType === 'Image' && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Variations</label>
            <Select
              value={formData.imageVariations.toString()}
              onValueChange={(value) => handleInputChange('imageVariations', parseInt(value))}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {variationOptions.map(option => (
                  <SelectItem key={option} value={option.toString()}>
                    {option} variation{option > 1 ? 's' : ''} {option === 2 ? '(Recommended)' : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {formData.mediaType === 'Video' && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Video Duration (seconds)</label>
            <div className="space-y-3">
              <div className="px-3">
                <Slider
                  value={[formData.videoDuration]}
                  onValueChange={(value) => handleInputChange('videoDuration', value[0])}
                  max={60}
                  min={10}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>10s</span>
                  <span className="font-medium">{formData.videoDuration}s</span>
                  <span>60s</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {durationPresets.map(preset => (
                  <Button
                    key={preset.value}
                    variant={formData.videoDuration === preset.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleInputChange('videoDuration', preset.value)}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep} className="bg-purple-600 hover:bg-purple-700">
          Next: Templates
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 p-6 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl border-l-4 border-indigo-500">
      <h3 className="text-xl font-bold text-gray-800 flex items-center">
        <Layout className="mr-2 text-indigo-600" size={24} />
        Template Selection
      </h3>

      <div className="space-y-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Pro Tip</AlertTitle>
          <AlertDescription>
            Select a template that matches your campaign goals. Each template is optimized for different conversion objectives.
          </AlertDescription>
        </Alert>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Select Template</label>
          <Select
            value={formData.templateId?.toString() || ''}
            onValueChange={(value) => handleInputChange('templateId', parseInt(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a template..." />
            </SelectTrigger>
            <SelectContent className="max-h-[400px] overflow-y-auto">
              {templates.map(template => (
                <SelectItem key={template.id} value={template.id.toString()}>
                  <div className="flex flex-col">
                    <span className="font-medium">{template.name}</span>
                    <span className="text-xs text-gray-500">{template.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {formData.templateId && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">
                {templates.find(t => t.id === formData.templateId)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                {templates.find(t => t.id === formData.templateId)?.description}
              </p>
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    const template = templates.find(t => t.id === formData.templateId);
                    if (template) {
                      handleInputChange('title', `[${template.name}] ${formData.title || ''}`);
                      toast({
                        title: "Template Applied",
                        description: "Template has been applied to your content"
                      });
                    }
                  }}
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  Apply Template to Content
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep} className="bg-indigo-600 hover:bg-indigo-700">
          Next: Visual Style
        </Button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6 p-6 bg-gradient-to-r from-gray-50 to-green-50 rounded-xl border-l-4 border-green-500">
      <h3 className="text-xl font-bold text-gray-800 flex items-center">
        <Image className="mr-2 text-green-600" size={24} />
        Visual Style & Options
      </h3>

      {(formData.mediaType === 'Image' || formData.mediaType === 'Image & Video') && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Image Style</label>
              <Select
                value={formData.imageStyle}
                onValueChange={(value) => handleInputChange('imageStyle', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select image style" />
                </SelectTrigger>
                <SelectContent>
                  {imageStyles.map(style => (
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
                  <SelectValue placeholder="Select industry preset" />
                </SelectTrigger>
                <SelectContent>
                  {industryPresets.map(preset => (
                    <SelectItem key={preset} value={preset}>{preset}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      <div className="md:col-span-2">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Reference Images/PDF</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <div className="flex flex-col items-center justify-center py-4">
            <Upload className="w-8 h-8 mb-2 text-gray-400" />
            <p className="text-sm text-gray-500 mb-2">Drag & drop files here or click to browse</p>
            <Input
              type="file"
              onChange={(e) => handleFileUpload(e, 'reference')}
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

      {/* New Content Generation Type Selection */}
      <div className="md:col-span-2">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Content Generation Type</label>
        <div className="grid grid-cols-2 gap-4">
          <div
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              generationType === 'normal' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setGenerationType('normal')}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                generationType === 'normal' ? 'border-blue-600 bg-blue-600' : 'border-gray-400'
              }`}>
                {generationType === 'normal' && <Check className="w-3 h-3 text-white" />}
              </div>
              <div>
                <h4 className="font-medium">Normal (1x)</h4>
                <p className="text-sm text-gray-500">Standard quality content</p>
              </div>
            </div>
          </div>
          <div
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              generationType === 'advanced' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setGenerationType('advanced')}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                generationType === 'advanced' ? 'border-blue-600 bg-blue-600' : 'border-gray-400'
              }`}>
                {generationType === 'advanced' && <Check className="w-3 h-3 text-white" />}
              </div>
              <div>
                <h4 className="font-medium">Advanced (2x)</h4>
                <p className="text-sm text-gray-500">Higher quality, more detailed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:col-span-2">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-semibold text-gray-700">Key Notes</label>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => generateWithAI('keyNotes')}
            disabled={isGenerating}
            className="flex items-center gap-1"
          >
            <Wand2 className="w-4 h-4" />
            {isGenerating ? 'Generating...' : 'Generate with AI'}
          </Button>
        </div>
        <Textarea
          value={formData.keyNotes}
          onChange={(e) => handleInputChange('keyNotes', e.target.value)}
          placeholder="Any important notes or special instructions"
          rows={4}
          className="w-full"
        />
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={generateContent}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate Content
          </Button>
          <Button onClick={nextStep} className="bg-green-600 hover:bg-green-700">
            Next: Review & Submit
          </Button>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
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
              Generated Content
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {generatedContent.title && (
              <div>
                <h4 className="text-sm font-medium mb-2">Title</h4>
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <p>{generatedContent.title}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(generatedContent.title || '', 'title')}
                  >
                    {copiedField === 'title' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            )}

            {generatedContent.description && (
              <div>
                <h4 className="text-sm font-medium mb-2">Description</h4>
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <p className="whitespace-pre-line">{generatedContent.description}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(generatedContent.description || '', 'description')}
                  >
                    {copiedField === 'description' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            )}

            {generatedContent.hashtags && generatedContent.hashtags.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Hashtags</h4>
                <div className="flex flex-wrap gap-2 bg-gray-50 p-3 rounded">
                  {generatedContent.hashtags.map((hashtag, index) => (
                    <div key={index} className="flex items-center bg-white px-2 py-1 rounded">
                      <span>{hashtag}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(hashtag, `hashtag-${index}`)}
                        className="ml-1 p-1 h-auto"
                      >
                        {copiedField === `hashtag-${index}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {generatedContent.keyNotes && (
              <div>
                <h4 className="text-sm font-medium mb-2">Key Notes</h4>
                <div className="flex items-start justify-between bg-gray-50 p-3 rounded">
                  <p className="whitespace-pre-line">{generatedContent.keyNotes}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(generatedContent.keyNotes || '', 'keyNotes')}
                  >
                    {copiedField === 'keyNotes' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
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
                <p className="text-sm font-medium text-gray-500">Product URL</p>
                <p className="text-blue-600 break-all">{formData.productUrl || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Target Audience</p>
                <p>{formData.targetAudience || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Call to Action</p>
                <p>{formData.callToAction || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Persona</p>
                <p>{formData.persona || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Media Type</p>
                <p>{formData.mediaType || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Selected Template</p>
                <p>{formData.templateId ? templates.find(t => t.id === formData.templateId)?.name : '-'}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-500">Target Locations</p>
                <div className="flex flex-wrap gap-1">
                  {formData.location.length > 0 
                    ? formData.location.map((loc, i) => <Badge key={i} variant="secondary">{loc}</Badge>)
                    : '-'}
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-500">Selected Tones</p>
                <div className="flex flex-wrap gap-1">
                  {formData.tones.length > 0 
                    ? formData.tones.map((tone, i) => <Badge key={i} variant="outline">{tone}</Badge>)
                    : '-'}
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-500">Keywords</p>
                <div className="flex flex-wrap gap-2">
                  {formData.keywords.length > 0 
                    ? formData.keywords.map((kw, i) => <span key={i} className="bg-gray-100 px-2 py-1 rounded text-sm">{kw}</span>)
                    : '-'}
                </div>
              </div>
             
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium mb-2">Content Details</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Title</p>
                  <p>{formData.title || '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Template Style</p>
                  <p>{formData.templateStyle || '-'}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-gray-500">Description</p>
                  <p className="whitespace-pre-line">{formData.description || '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Aspect Ratio</p>
                  <p>{formData.aspectRatio || '-'}</p>
                </div>
                {formData.mediaType === 'Image' && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Image Variations</p>
                    <p>{formData.imageVariations} variations</p>
                  </div>
                )}
                {formData.mediaType === 'Video' && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Video Duration</p>
                    <p>{formData.videoDuration} seconds</p>
                  </div>
                )}
                {formData.imageStyle && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Image Style</p>
                    <p>{formData.imageStyle}</p>
                  </div>
                )}
                {formData.contentType && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Content Type</p>
                    <p>{formData.contentType}</p>
                  </div>
                )}
                {formData.mood && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Mood</p>
                    <p>{formData.mood}</p>
                  </div>
                )}
                {formData.industryPreset && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Industry Preset</p>
                    <p>{formData.industryPreset}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-500">Hashtags</p>
                  <div className="flex flex-wrap gap-1">
                    {formData.hashtags.length > 0 
                      ? formData.hashtags.map((ht, i) => <span key={i} className="text-blue-600">{ht}</span>)
                      : '-'}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-gray-500">Reference Files</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.referenceFiles.length > 0 
                      ? formData.referenceFiles.map((file, i) => (
                          <span key={i} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-sm">
                            <File className="w-3 h-3" />
                            {file.name}
                          </span>
                        ))
                      : '-'}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-gray-500">Key Notes</p>
                  <p className="whitespace-pre-line">{formData.keyNotes || '-'}</p>
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
              description: "Campaign submitted successfully!"
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
    <GridBackground>
      <div className="min-h-screen">
        <AnimatePresence>
          <motion.div 
            className="relative z-10 px-4 sm:px-6 lg:px-8 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Background Grid Pattern */}
            <div className="fixed inset-0 grid-pattern dark:grid-pattern opacity-30 pointer-events-none" />
           
            <main className="relative z-10">
              <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 text-center">
                    <h1 className="text-4xl font-bold mb-2">Campaign Content Forge</h1>
                    <p className="text-xl opacity-90">Complete Campaign Specifications & AI-Generated Content</p>
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
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-blue-600 text-white' : currentStep === 2 ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'}`}>
                          2
                        </div>
                        <span className={`text-sm ${currentStep >= 2 ? 'font-semibold text-blue-600' : 'text-gray-500'}`}>Content & Tone</span>
                      </div>
                      <div className="h-px flex-1 bg-gray-200 mx-2"></div>
                      <div className="flex items-center gap-2">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-blue-600 text-white' : currentStep === 3 ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'}`}>
                          3
                        </div>
                        <span className={`text-sm ${currentStep >= 3 ? 'font-semibold text-blue-600' : 'text-gray-500'}`}>Template</span>
                      </div>
                      <div className="h-px flex-1 bg-gray-200 mx-2"></div>
                      <div className="flex items-center gap-2">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 4 ? 'bg-blue-600 text-white' : currentStep === 4 ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'}`}>
                          4
                        </div>
                        <span className={`text-sm ${currentStep >= 4 ? 'font-semibold text-blue-600' : 'text-gray-500'}`}>Visual Style</span>
                      </div>
                      <div className="h-px flex-1 bg-gray-200 mx-2"></div>
                      <div className="flex items-center gap-2">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 5 ? 'bg-blue-600 text-white' : currentStep === 5 ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'}`}>
                          5
                        </div>
                        <span className={`text-sm ${currentStep >= 5 ? 'font-semibold text-blue-600' : 'text-gray-500'}`}>Review</span>
                      </div>
                    </div>

                    {currentStep === 1 && renderStep1()}
                    {currentStep === 2 && renderStep2()}
                    {currentStep === 3 && renderStep3()}
                    {currentStep === 4 && renderStep4()}
                    {currentStep === 5 && renderStep5()}
                  </div>
                </div>
              </div>
            </main>

            {/* Generation Options Dialog */}
            <Dialog open={showGenerationOptions} onOpenChange={setShowGenerationOptions}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Select Generation Mode</DialogTitle>
                  <DialogDescription>
                    Choose between normal (1x) or advanced (2x) content generation.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => handleGenerateConfirm('normal')}
                    className="flex flex-col items-center justify-center h-32"
                  >
                    <div className="text-2xl font-bold mb-2">1x</div>
                    <div className="text-lg">Normal</div>
                    <p className="text-sm text-gray-500 mt-1">Standard quality content</p>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleGenerateConfirm('advanced')}
                    className="flex flex-col items-center justify-center h-32 border-blue-500 bg-blue-50 hover:bg-blue-100"
                  >
                    <div className="text-2xl font-bold mb-2">2x</div>
                    <div className="text-lg">Advanced</div>
                    <p className="text-sm text-gray-500 mt-1">Higher quality, more detailed</p>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </AnimatePresence>
      </div>
    </GridBackground>
  );
};

export default GoogleAdsForm;