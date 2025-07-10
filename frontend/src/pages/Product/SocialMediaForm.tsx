import React, { useState, useEffect, useRef } from 'react';
import { 
  Wand2Icon, RefreshCwIcon, LightbulbIcon, ClipboardCopy, 
  Sparkles, Download, Eye, Share2, Image as ImageIcon, 
  Music, FileText, Hash, Upload, Zap, CheckCircle, Copy,
  Search, ChevronDown, MapPin, ArrowRight, ArrowLeft,
  PlayCircle, Clock, Palette, Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Country {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
  continent: string;
  capital?: string;
}

const COUNTRIES: Country[] = [
  { name: 'United States', code: 'US', dialCode: '+1', flag: '🇺🇸', continent: 'North America', capital: 'Washington, D.C.' },
  { name: 'United Kingdom', code: 'GB', dialCode: '+44', flag: '🇬🇧', continent: 'Europe', capital: 'London' },
  { name: 'Canada', code: 'CA', dialCode: '+1', flag: '🇨🇦', continent: 'North America', capital: 'Ottawa' },
  { name: 'Australia', code: 'AU', dialCode: '+61', flag: '🇦🇺', continent: 'Oceania', capital: 'Canberra' },
  { name: 'India', code: 'IN', dialCode: '+91', flag: '🇮🇳', continent: 'Asia', capital: 'New Delhi' },
  { name: 'Germany', code: 'DE', dialCode: '+49', flag: '🇩🇪', continent: 'Europe', capital: 'Berlin' },
  { name: 'France', code: 'FR', dialCode: '+33', flag: '🇫🇷', continent: 'Europe', capital: 'Paris' },
  { name: 'Japan', code: 'JP', dialCode: '+81', flag: '🇯🇵', continent: 'Asia', capital: 'Tokyo' },
];

const LINKEDIN_TEMPLATES = [
  { id: 1, name: 'The Epiphany Pattern', description: 'Use it to dramatize a "light-bulb" moment. Lead with a mini story that ends in a sudden insight---then introduce your solution as the key to unlock that aha! feeling.' },
  { id: 2, name: 'Instant Epiphany', description: 'Use it to immediately shake up expectations. Open with a provocative statement that questions a common belief, then guide readers to a new, more powerful way of seeing their problem.' },
  { id: 3, name: 'Future Flashback', description: 'Use it to paint a vivid "future you" scenario. Start by describing life after success (e.g. "Imagine waking up debt-free..."), then loop back to present-day steps to get there---your product being one of them.' },
  { id: 4, name: 'The Forbidden Reversal', description: 'Use it to spark righteous indignation. Call out how big players or "the system" make things worse, then position your brand as the underdog delivering the real fix.' },
  { id: 5, name: 'Insider Revelation', description: 'Use it to whet curiosity with behind-the-scenes access. Promise exclusive tips or "trade secrets" that only insiders know---then deliver value that builds trust and desire.' },
  { id: 6, name: 'The Pattern Interrupt Prophecy', description: 'Use it to jolt scrollers. Open with an unexpected claim or image that shatters their mental script, then guide them into a narrative that connects to your solution.' },
  { id: 7, name: 'The Dark Horse Discovery', description: 'Use it to tease a contrarian insight ("Why the #1 strategy you\'ve heard about is holding you back") and invite them to learn more.' },
  { id: 8, name: 'Counterintuitive Discovery', description: 'Use it to upend expectations with a headline like "Why working harder is slowing you down," then explain your counter-strategy.' },
  { id: 9, name: 'The Paradigm Shatter', description: 'Use it to completely dismantle an industry myth, then rebuild their understanding around your product\'s unique framework.' },
  { id: 10, name: 'The Socratic Teaser', description: 'Use it to pose a series of rhetorical questions that guide them to the conclusion that your product is the logical answer.' },
];

const TONE_CATEGORIES = {
  Professional: ['Professional & Formal', 'Business Casual', 'Corporate Executive', 'Industry Expert', 'Thought Leader', 'Educational/Informative', 'Advisory/Consultative'],
  Engaging: ['Conversational & Friendly', 'Inspirational & Motivational', 'Storytelling', 'Personal & Authentic', 'Humorous & Light-hearted', 'Bold & Confident', 'Provocative/Controversial'],
  Specialized: ['Technical & Detailed', 'Sales-focused', 'Community Building', 'Behind-the-Scenes', 'Achievement/Success-focused', 'Problem-Solving', 'Trendy/Current Events']
};

const ASPECT_RATIOS = [
  { name: 'Square', value: '1:1', recommended: true },
  { name: 'Landscape', value: '16:9', recommended: false },
  { name: 'Portrait', value: '4:5', recommended: false },
  { name: 'Story', value: '9:16', recommended: false },
  { name: 'Banner', value: '1.91:1', recommended: false }
];

const VISUAL_STYLES = ['Photorealistic', 'Illustration', 'Digital Art', 'Minimalist', 'Corporate/Business', 'Infographic', 'Hand-drawn', '3D Rendered', 'Flat Design', 'Watercolor'];

const CONTENT_TYPES = ['Abstract/Conceptual', 'Portrait/People', 'Product Mockups', 'Data Visualization', 'Lifestyle/Workplace', 'Technology/Digital', 'Nature/Organic', 'Architecture/Space', 'Icons/Symbols'];

const MOODS = ['Corporate Professional', 'Creative/Innovative', 'Friendly/Approachable', 'Energetic/Dynamic', 'Calm/Peaceful', 'Luxurious/Premium', 'Playful/Fun', 'Serious/Formal'];

const INDUSTRY_PRESETS = ['Tech', 'Finance', 'Healthcare', 'Education', 'Real Estate', 'Consulting', 'Creative Agency', 'Startup'];

interface ContentGeneratorProps {
  selectedAdType?: string;
}

const FieldWithControls = ({ 
  label, 
  value, 
  setValue, 
  placeholder, 
  rows = 3, 
  icon 
}: { 
  label: string; 
  value: string; 
  setValue: (val: string) => void; 
  placeholder?: string;
  rows?: number;
  icon?: React.ReactNode;
}) => (
  <div className="space-y-3 relative group">
    <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
      {icon && <span className="text-indigo-500">{icon}</span>}
      <span>{label}</span>
    </Label>
    <div className="relative">
      <Textarea
        placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pr-20 resize-none border-2 border-gray-200 focus:border-indigo-500 rounded-xl transition-all duration-200 bg-white/50 backdrop-blur-sm"
        rows={rows}
      />
      <div className="absolute right-3 top-3 flex gap-2 items-center">
        {value ? (
          <div className="flex space-x-1">
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setValue('')}
              className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 rounded-lg"
            >
              <RefreshCwIcon className="w-4 h-4" />
            </Button>
            <Button 
              size="sm"
              variant="ghost"
              className="h-8 px-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 rounded-lg text-xs font-medium"
              onClick={() => alert(`Enhancing ${label}...`)}
            >
              <Wand2Icon className="w-3 h-3 mr-1" /> AI
            </Button>
          </div>
        ) : (
          <div className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 transition-colors duration-200 cursor-pointer">
            <LightbulbIcon className="w-4 h-4 text-yellow-600" />
          </div>
        )}
      </div>
    </div>
  </div>
);

export const ContentGenerator: React.FC<ContentGeneratorProps> = ({ selectedAdType = "LinkedIn" }) => {
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [songSuggestions, setSongSuggestions] = useState('');
  const [notes, setNotes] = useState('');
  const [postContent, setPostContent] = useState('');
  const [activeContentTab, setActiveContentTab] = useState('Content');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [productUrl, setProductUrl] = useState('');
  
  // Tone Selection States
  const [primaryTone, setPrimaryTone] = useState('');
  const [selectedSubTones, setSelectedSubTones] = useState<string[]>([]);
  const [toneIntensity, setToneIntensity] = useState([2]); // 1: Subtle, 2: Moderate, 3: Strong
  
  // Content Type States
  const [contentType, setContentType] = useState('Content');
  
  // Image/Video Settings
  const [numberOfVariations, setNumberOfVariations] = useState(2);
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [videoDuration, setVideoDuration] = useState(20);
  const [visualStyle, setVisualStyle] = useState('');
  const [contentTypeStyle, setContentTypeStyle] = useState('');
  const [mood, setMood] = useState('');
  const [industryPreset, setIndustryPreset] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const filteredCountries = COUNTRIES.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.continent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleCountrySelection = (country: Country) => {
    setSelectedCountries(prev => {
      const isSelected = prev.some(c => c.code === country.code);
      if (isSelected) {
        return prev.filter(c => c.code !== country.code);
      } else {
        return [...prev, country];
      }
    });
  };

  const removeCountry = (countryCode: string) => {
    setSelectedCountries(prev => prev.filter(c => c.code !== countryCode));
  };

  const clearAllCountries = () => {
    setSelectedCountries([]);
  };

  const toggleSubTone = (subTone: string) => {
    setSelectedSubTones(prev => {
      if (prev.includes(subTone)) {
        return prev.filter(tone => tone !== subTone);
      } else {
        return [...prev, subTone];
      }
    });
  };

  const getEstimatedWords = (duration: number) => {
    return Math.round(duration * 3); // ~3 words per second
  };

  const getIntensityLabel = (value: number) => {
    switch(value) {
      case 1: return 'Subtle';
      case 2: return 'Moderate';
      case 3: return 'Strong';
      default: return 'Moderate';
    }
  };

  const generateProposal = async () => {
    if (!title && !description && !postContent) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in at least one content field.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const toneInfo = primaryTone && selectedSubTones.length > 0 
        ? `🎭 Tone: ${primaryTone} (${selectedSubTones.join(', ')}) - ${getIntensityLabel(toneIntensity[0])}\n\n`
        : '';

      const contentTypeInfo = contentType !== 'Content' 
        ? `📱 Content Type: ${contentType}${contentType === 'Image' ? ` (${numberOfVariations} variations, ${aspectRatio})` : contentType === 'Video' ? ` (${videoDuration}s, ${aspectRatio})` : ''}\n\n`
        : '';

      const templateInfo = selectedTemplate 
        ? `📋 Template: ${LINKEDIN_TEMPLATES.find(t => t.id === selectedTemplate)?.name}\n\n`
        : '';

      const proposal = `🎯 Generated ${selectedAdType} Post Preview:

${productUrl ? `🔗 Product URL: ${productUrl}\n\n` : ''}${toneInfo}${contentTypeInfo}${templateInfo}${title ? `✨ Title: ${title}\n\n` : ''}${description ? `📝 Description: ${description}\n\n` : ''}${postContent ? `💬 Post Content: ${postContent}\n\n` : ''}${hashtags ? `🏷️ Hashtags: ${hashtags}\n\n` : ''}${songSuggestions ? `🎵 Music Suggestions: ${songSuggestions}\n\n` : ''}${notes ? `📋 Additional Notes: ${notes}\n\n` : ''}${selectedCountries.length > 0 ? `📍 Target Countries: ${selectedCountries.map(c => c.name).join(', ')}` : ''}`;
      
      setGeneratedContent(proposal);
      setLoading(false);
      toast({ 
        title: 'Content Generated Successfully!', 
        description: `Your ${selectedAdType} content is ready for review.`,
        duration: 3000
      });
    }, 2000);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent);
      toast({
        title: 'Copied to Clipboard!',
        description: 'Generated content has been copied successfully.',
      });
    } catch (err) {
      toast({
        title: 'Copy Failed',
        description: 'Please try copying manually.',
        variant: 'destructive',
      });
    }
  };

  const downloadContent = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedAdType}_post_${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast({
      title: 'Downloaded!',
      description: 'Content has been saved to your device.',
    });
  };

  const contentTabs = [
    { id: 'Content', label: 'Content Creation', icon: <FileText className="w-4 h-4" /> },
    { id: 'Media', label: 'Media & Assets', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'Advanced', label: 'Advanced Options', icon: <Zap className="w-4 h-4" /> }
  ];

  const platformFeatures = {
    LinkedIn: {
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-indigo-50',
      features: ['Professional networking', 'Industry insights', 'Career updates']
    },
    Facebook: {
      color: 'from-blue-600 to-blue-700',
      bgColor: 'from-blue-50 to-blue-100',
      features: ['Community engagement', 'Personal updates', 'Event promotion']
    },
    Instagram: {
      color: 'from-pink-500 to-purple-600',
      bgColor: 'from-pink-50 to-purple-50',
      features: ['Visual storytelling', 'Behind-the-scenes', 'Product showcase']
    },
    Pinterest: {
      color: 'from-red-500 to-red-600',
      bgColor: 'from-red-50 to-pink-50',
      features: ['Creative inspiration', 'DIY tutorials', 'Product discovery']
    }
  };

  const currentPlatform = platformFeatures[selectedAdType as keyof typeof platformFeatures] || platformFeatures.LinkedIn;

  const handleContinue = () => {
    if (activeContentTab === 'Content') {
      setActiveContentTab('Media');
    } else if (activeContentTab === 'Media') {
      setActiveContentTab('Advanced');
    }
  };

  const handleBack = () => {
    if (activeContentTab === 'Media') {
      setActiveContentTab('Content');
    } else if (activeContentTab === 'Advanced') {
      setActiveContentTab('Media');
    }
  };

  return (
    <div className="space-y-8 px-4 py-8 max-w-7xl mx-auto">
      {/* Tone Selection Section */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-50 to-indigo-50">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg">
          <CardTitle className="text-xl flex items-center space-x-3">
            <Palette className="w-6 h-6" />
            <span>Tone Selection</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700">Tone Category</Label>
              <Select value={primaryTone} onValueChange={setPrimaryTone}>
                <SelectTrigger className="w-full border-2 border-gray-200 focus:border-purple-500 rounded-xl">
                  <SelectValue placeholder="Select primary tone" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                  {Object.keys(TONE_CATEGORIES).map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {primaryTone && (
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">Sub-Categories (Multi-select)</Label>
                <div className="max-h-32 overflow-y-auto border-2 border-gray-200 rounded-xl p-3 bg-white">
                  {TONE_CATEGORIES[primaryTone as keyof typeof TONE_CATEGORIES]?.map(subTone => (
                    <div key={subTone} className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id={subTone}
                        checked={selectedSubTones.includes(subTone)}
                        onCheckedChange={() => toggleSubTone(subTone)}
                      />
                      <Label htmlFor={subTone} className="text-sm cursor-pointer">{subTone}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {selectedSubTones.length > 0 && (
            <div className="mt-6 space-y-4">
              <div className="flex flex-wrap gap-2">
                {selectedSubTones.map(tone => (
                  <Badge key={tone} variant="secondary" className="bg-purple-100 text-purple-800">
                    {tone}
                    <button 
                      onClick={() => toggleSubTone(tone)}
                      className="ml-2 text-purple-600 hover:text-purple-800"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">
                  Intensity: {getIntensityLabel(toneIntensity[0])}
                </Label>
                <Slider
                  value={toneIntensity}
                  onValueChange={setToneIntensity}
                  max={3}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Subtle</span>
                  <span>Moderate</span>
                  <span>Strong</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Content Type Selection */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-lg">
          <CardTitle className="text-xl flex items-center space-x-3">
            <Settings className="w-6 h-6" />
            <span>Content Type Selection</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <RadioGroup value={contentType} onValueChange={setContentType} className="flex space-x-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Content" id="content" />
              <Label htmlFor="content" className="flex items-center space-x-2 cursor-pointer">
                <FileText className="w-4 h-4" />
                <span>Content</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Image" id="image" />
              <Label htmlFor="image" className="flex items-center space-x-2 cursor-pointer">
                <ImageIcon className="w-4 h-4" />
                <span>Image</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Video" id="video" />
              <Label htmlFor="video" className="flex items-center space-x-2 cursor-pointer">
                <PlayCircle className="w-4 h-4" />
                <span>Video</span>
              </Label>
            </div>
          </RadioGroup>

          {/* Image Settings */}
          {contentType === 'Image' && (
            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700">Number of Variations</Label>
                  <Select value={numberOfVariations.toString()} onValueChange={(value) => setNumberOfVariations(parseInt(value))}>
                    <SelectTrigger className="w-full border-2 border-gray-200 focus:border-indigo-500 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                      {[1, 2, 3, 4, 5, 6, 8].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num} variation{num > 1 ? 's' : ''}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700">Aspect Ratio</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {ASPECT_RATIOS.map(ratio => (
                      <button
                        key={ratio.value}
                        onClick={() => setAspectRatio(ratio.value)}
                        className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                          aspectRatio === ratio.value 
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {ratio.name}
                        <br />
                        <span className="text-xs text-gray-500">{ratio.value}</span>
                        {ratio.recommended && <br />}
                        {ratio.recommended && <Badge variant="secondary" className="text-xs">Recommended</Badge>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Video Settings */}
          {contentType === 'Video' && (
            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700">
                    Duration: {videoDuration}s (~{getEstimatedWords(videoDuration)} words)
                  </Label>
                  <Slider
                    value={[videoDuration]}
                    onValueChange={(value) => setVideoDuration(value[0])}
                    max={60}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex space-x-2 mt-2">
                    {[15, 30, 45, 60].map(duration => (
                      <Button
                        key={duration}
                        size="sm"
                        variant={videoDuration === duration ? "default" : "outline"}
                        onClick={() => setVideoDuration(duration)}
                        className="text-xs"
                      >
                        {duration}s
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700">Aspect Ratio</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {ASPECT_RATIOS.map(ratio => (
                      <button
                        key={ratio.value}
                        onClick={() => setAspectRatio(ratio.value)}
                        className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                          aspectRatio === ratio.value 
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {ratio.name}
                        <br />
                        <span className="text-xs text-gray-500">{ratio.value}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-blue-700">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">Real-Time Estimation</span>
                </div>
                <p className="text-sm text-blue-600 mt-1">
                  For {videoDuration}s video: ~{getEstimatedWords(videoDuration)} words recommended
                </p>
              </div>
            </div>
          )}

          {/* Visual Style Options for Image & Video */}
          {(contentType === 'Image' || contentType === 'Video') && (
            <div className="mt-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Generation Style</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700">Visual Styles</Label>
                  <Select value={visualStyle} onValueChange={setVisualStyle}>
                    <SelectTrigger className="w-full border-2 border-gray-200 focus:border-indigo-500 rounded-xl">
                      <SelectValue placeholder="Select visual style" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                      {VISUAL_STYLES.map(style => (
                        <SelectItem key={style} value={style}>{style}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700">Content Types</Label>
                  <Select value={contentTypeStyle} onValueChange={setContentTypeStyle}>
                    <SelectTrigger className="w-full border-2 border-gray-200 focus:border-indigo-500 rounded-xl">
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                      {CONTENT_TYPES.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700">Mood/Atmosphere</Label>
                  <Select value={mood} onValueChange={setMood}>
                    <SelectTrigger className="w-full border-2 border-gray-200 focus:border-indigo-500 rounded-xl">
                      <SelectValue placeholder="Select mood" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                      {MOODS.map(moodOption => (
                        <SelectItem key={moodOption} value={moodOption}>{moodOption}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700">Industry Presets</Label>
                  <Select value={industryPreset} onValueChange={setIndustryPreset}>
                    <SelectTrigger className="w-full border-2 border-gray-200 focus:border-indigo-500 rounded-xl">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                      {INDUSTRY_PRESETS.map(industry => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Platform Info Banner */}
      <div className={`p-6 rounded-2xl bg-gradient-to-r ${currentPlatform.bgColor} border border-gray-200/50`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Creating content for {selectedAdType}
            </h3>
            <div className="flex flex-wrap gap-2">
              {currentPlatform.features.map((feature, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-white/70 text-gray-700 rounded-full text-sm font-medium"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
          <div className={`p-4 bg-gradient-to-r ${currentPlatform.color} rounded-xl text-white`}>
            <Sparkles className="w-8 h-8" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Content Generator Card */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className={`bg-gradient-to-r ${currentPlatform.color} text-white rounded-t-lg`}>
            <CardTitle className="text-xl flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Wand2Icon className="w-6 h-6" />
              </div>
              <span>AI Content Generator</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <Tabs value={activeContentTab} onValueChange={setActiveContentTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-100 p-1 rounded-xl">
                {contentTabs.map((tab) => (
                  <TabsTrigger 
                    key={tab.id}
                    value={tab.id} 
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg py-3 px-4 font-medium transition-all duration-200"
                  >
                    <div className="flex items-center space-x-2">
                      {tab.icon}
                      <span className="hidden sm:inline">{tab.label}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="Content" className="space-y-6">
                <div className="space-y-6">
                  {/* Product URL Input */}
              
<div className="space-y-3">
  <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
    <span className="text-indigo-500">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    </span>
    <span>LinkedIn Profile/Post URL</span>
  </Label>
  <div className="relative">
    <Input
      type="url"
      placeholder="https://linkedin.com/in/your-profile or https://linkedin.com/post/12345"
      value={productUrl}
      onChange={(e) => setProductUrl(e.target.value)}
      className="pr-20 border-2 border-gray-200 focus:border-indigo-500 rounded-xl transition-all duration-200 bg-white/50 backdrop-blur-sm"
    />
    {productUrl && (
      <Button 
        size="sm" 
        variant="ghost" 
        onClick={() => setProductUrl('')}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 rounded-lg"
      >
        <RefreshCwIcon className="w-4 h-4" />
      </Button>
    )}
  </div>
</div>
                  
                  {/* Country Dropdown */}
                  <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                    <div className="relative" ref={dropdownRef}>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-blue-500" />
                          Target Countries
                        </Label>
                        {selectedCountries.length > 0 && (
                          <button
                            onClick={clearAllCountries}
                            className="text-xs text-red-600 hover:text-red-800 underline"
                          >
                            Clear All
                          </button>
                        )}
                      </div>
                      
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          className="w-full pl-9 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                          placeholder="Search countries..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          onFocus={() => setIsCountryDropdownOpen(true)}
                        />
                        <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                          <ChevronDown 
                            className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isCountryDropdownOpen ? 'rotate-180' : ''}`}
                          />
                        </div>
                      </div>

                      {isCountryDropdownOpen && (
                        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {filteredCountries.length > 0 ? (
                            filteredCountries.map(country => {
                              const isSelected = selectedCountries.some(c => c.code === country.code);
                              return (
                                <div
                                  key={country.code}
                                  className={`px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 text-sm ${
                                    isSelected ? 'bg-blue-50' : ''
                                  }`}
                                  onClick={() => toggleCountrySelection(country)}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <span className="text-lg">{country.flag}</span>
                                      <span>{country.name}</span>
                                    </div>
                                    {isSelected && (
                                      <div className="w-3 h-3 bg-blue-600 rounded-full flex items-center justify-center">
                                        <div className="w-1 h-1 bg-white rounded-full"></div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="px-3 py-3 text-center text-gray-500 text-sm">
                              No countries found
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {selectedCountries.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {selectedCountries.map(country => (
                          <div
                            key={country.code}
                            className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs"
                          >
                            <span>{country.flag}</span>
                            <span>{country.name}</span>
                            <button
                              onClick={() => removeCountry(country.code)}
                              className="ml-0.5 text-blue-600 hover:text-blue-800 font-bold text-xs"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <FieldWithControls 
                    label="Title" 
                    value={title} 
                    setValue={setTitle}
                    placeholder="Create an engaging title for your post..."
                    rows={2}
                    icon={<FileText className="w-4 h-4" />}
                  />
                  
                  <FieldWithControls 
                    label="Description" 
                    value={description} 
                    setValue={setDescription}
                    placeholder="Provide a detailed description or context..."
                    rows={3}
                    icon={<FileText className="w-4 h-4" />}
                  />
                  
                  <FieldWithControls 
                    label="Post Content" 
                    value={postContent} 
                    setValue={setPostContent}
                    placeholder="Write your main post content here..."
                    rows={4}
                    icon={<FileText className="w-4 h-4" />}
                  />
                  
                  <FieldWithControls 
                    label="Hashtags" 
                    value={hashtags} 
                    setValue={setHashtags}
                    placeholder="#socialmedia #content #marketing #ai"
                    rows={2}
                    icon={<Hash className="w-4 h-4" />}
                  />
                </div>
              </TabsContent>

              <TabsContent value="Media" className="space-y-6">
                <div className="space-y-6">
                  {/* LinkedIn Templates */}
                  {selectedAdType === 'LinkedIn' && (
                    <div className="space-y-4">
                      <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-indigo-500" />
                        <span>LinkedIn Templates</span>
                      </Label>
                      <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
                        {LINKEDIN_TEMPLATES.map(template => (
                          <div
                            key={template.id}
                            className={`p-4 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors ${
                              selectedTemplate === template.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                            }`}
                            onClick={() => setSelectedTemplate(selectedTemplate === template.id ? null : template.id)}
                          >
                            <h4 className="font-medium text-gray-800 mb-2">{template.name}</h4>
                            <p className="text-sm text-gray-600">{template.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                      <ImageIcon className="w-4 h-4 text-indigo-500" />
                      <span>Upload Images/Videos</span>
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors duration-200 bg-gray-50/50">
                      <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                          <Upload className="w-8 h-8 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-gray-600 font-medium">Drop files here or click to upload</p>
                          <p className="text-sm text-gray-500">PNG, JPG, GIF, MP4 up to 10MB</p>
                        </div>
                        <Input type="file" className="hidden" accept="image/*,video/*" multiple />
                        <Button variant="outline" className="border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                          Choose Files
                        </Button>
                      </div>
                    </div>
                  </div>

                  <FieldWithControls 
                    label="Song Suggestions" 
                    value={songSuggestions} 
                    setValue={setSongSuggestions}
                    placeholder="Suggest background music or audio for video content..."
                    rows={2}
                    icon={<Music className="w-4 h-4" />}
                  />
                </div>
              </TabsContent>

              <TabsContent value="Advanced" className="space-y-6">
                <div className="space-y-6">
                  <FieldWithControls 
                    label="Additional Notes" 
                    value={notes} 
                    setValue={setNotes}
                    placeholder="Any specific requirements, tone, or style preferences..."
                    rows={4}
                    icon={<FileText className="w-4 h-4" />}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-700">Target Audience</Label>
                      <select className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 bg-white">
                        <option>General</option>
                        <option>Entrepreneurs</option>
                        <option>Students</option>
                        <option>Professionals</option>
                        <option>Consumers</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-700">Post Timing</Label>
                      <select className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 bg-white">
                        <option>Immediate</option>
                        <option>Peak Hours</option>
                        <option>Weekend</option>
                        <option>Custom Schedule</option>
                      </select>
                    </div>
                  </div>

                  {/* Recommendations Sidebar */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <LightbulbIcon className="w-5 h-5 text-green-600 mr-2" />
                      Recommended Defaults
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Image Variations:</span>
                        <span className="font-medium">2 (Standard)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Video Duration:</span>
                        <span className="font-medium">20s (Optimal)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Aspect Ratio:</span>
                        <span className="font-medium">Square 1:1 (Most Popular)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tone Intensity:</span>
                        <span className="font-medium">Moderate (Balanced)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Estimated Generation:</span>
                        <span className="font-medium">30-45 seconds</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
              {activeContentTab !== 'Content' && (
                <Button 
                  onClick={handleBack}
                  variant="outline"
                  className="flex items-center gap-2 px-6 py-4 border-2 border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 rounded-xl"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </Button>
              )}
              
              {activeContentTab !== 'Advanced' ? (
                <Button 
                  onClick={handleContinue}
                  className={`flex-1 ml-auto flex items-center justify-center gap-2 py-4 bg-gradient-to-r ${currentPlatform.color} hover:opacity-90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl`}
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </Button>
              ) : (
                <Button 
                  onClick={generateProposal} 
                  className={`flex-1 ml-auto py-4 bg-gradient-to-r ${currentPlatform.color} hover:opacity-90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200`}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Generating Amazing Content...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-5 h-5" />
                      <span>Generate {selectedAdType} Content</span>
                    </div>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Generated Content Preview Card */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Eye className="w-6 h-6" />
                </div>
                <span>Content Preview</span>
              </CardTitle>
              {generatedContent && (
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={copyToClipboard}
                    className="text-white hover:bg-white/20 rounded-lg"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={downloadContent}
                    className="text-white hover:bg-white/20 rounded-lg"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-8">
            {loading ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500"></div>
                  <span className="text-indigo-600 font-medium">AI is crafting your content...</span>
                </div>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse space-y-2">
                    <div className="bg-gray-200 h-4 rounded w-full"></div>
                    <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                    {i < 4 && <div className="bg-gray-200 h-4 rounded w-1/2 mb-4"></div>}
                  </div>
                ))}
              </div>
            ) : generatedContent ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <div className="flex items-center space-x-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">Content Generated Successfully!</span>
                  </div>
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
                    {generatedContent}
                  </pre>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={copyToClipboard}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl py-3"
                  >
                    <ClipboardCopy className="w-4 h-4 mr-2" />
                    Copy Content
                  </Button>
                  <Button 
                    onClick={downloadContent}
                    variant="outline"
                    className="flex-1 border-2 border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 rounded-xl py-3"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1 border-2 border-green-300 text-green-600 hover:bg-green-50 rounded-xl py-3"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Publish
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 space-y-6">
                <div className="mx-auto w-24 h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-indigo-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-800">Ready to Create Amazing Content?</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Fill in your content details and let our AI generate engaging {selectedAdType} posts that resonate with your audience.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>AI-Powered</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Instant Results</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Platform Optimized</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Ready to Publish</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
