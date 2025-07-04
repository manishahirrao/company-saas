import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Wand2Icon, 
  RefreshCwIcon, 
  LightbulbIcon, 
  ClipboardCopy, 
  Sparkles, 
  Download, 
  Eye, 
  Share2, 
  Image as ImageIcon, 
  Music, 
  FileText, 
  Hash,
  Upload,
  Zap,
  CheckCircle,
  Copy
} from 'lucide-react';

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

interface ContentGeneratorProps {
  selectedAdType?: string;
}

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

  const { toast } = useToast();
  const { user } = useAuth();

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
      const proposal = `🎯 Generated ${selectedAdType} Post Preview:

${title ? `✨ Title: ${title}\n\n` : ''}${description ? `📝 Description: ${description}\n\n` : ''}${postContent ? `💬 Post Content: ${postContent}\n\n` : ''}${hashtags ? `🏷️ Hashtags: ${hashtags}\n\n` : ''}${songSuggestions ? `🎵 Music Suggestions: ${songSuggestions}\n\n` : ''}${notes ? `📋 Additional Notes: ${notes}` : ''}`;
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
    { 
      id: 'Content', 
      label: 'Content Creation', 
      icon: <FileText className="w-4 h-4" />,
      description: 'Create your main content'
    },
    { 
      id: 'Media', 
      label: 'Media & Assets', 
      icon: <ImageIcon className="w-4 h-4" />,
      description: 'Add images and media'
    },
    { 
      id: 'Advanced', 
      label: 'Advanced Options', 
      icon: <Zap className="w-4 h-4" />,
      description: 'Fine-tune your content'
    }
  ];

  const platformFeatures = {
    LinkedIn: {
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-indigo-50',
      features: ['Professional networking', 'Industry insights', 'Career updates', 'Business content']
    },
    Facebook: {
      color: 'from-blue-600 to-blue-700',
      bgColor: 'from-blue-50 to-blue-100',
      features: ['Community engagement', 'Personal updates', 'Event promotion', 'Brand awareness']
    },
    Instagram: {
      color: 'from-pink-500 to-purple-600',
      bgColor: 'from-pink-50 to-purple-50',
      features: ['Visual storytelling', 'Behind-the-scenes', 'Product showcase', 'Lifestyle content']
    },
    Pinterest: {
      color: 'from-red-500 to-red-600',
      bgColor: 'from-red-50 to-pink-50',
      features: ['Creative inspiration', 'DIY tutorials', 'Product discovery', 'Visual boards']
    }
  };

  const currentPlatform = platformFeatures[selectedAdType as keyof typeof platformFeatures] || platformFeatures.LinkedIn;

  return (
    <div className="space-y-8 px-4 py-8 max-w-7xl mx-auto">
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
                      <Label className="text-sm font-semibold text-gray-700">Content Tone</Label>
                      <select className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 bg-white">
                        <option>Professional</option>
                        <option>Casual</option>
                        <option>Inspirational</option>
                        <option>Humorous</option>
                        <option>Educational</option>
                      </select>
                    </div>
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
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Button 
                onClick={generateProposal} 
                className={`w-full py-4 bg-gradient-to-r ${currentPlatform.color} hover:opacity-90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200`}
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