
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Copy, Download, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIPostBuilder = () => {
  const [postType, setPostType] = useState('linkedin');
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');
  const [industry, setIndustry] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [keywords, setKeywords] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('linkedin');
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const contentTypes = {
    linkedin: {
      title: 'LinkedIn Post',
      description: 'Professional posts for LinkedIn engagement',
      placeholder: 'Enter your professional topic, achievement, or insight...',
      icon: '💼'
    },
    twitter: {
      title: 'Twitter Post',
      description: 'Engaging tweets and threads',
      placeholder: 'What\'s trending or what would you like to share?',
      icon: '🐦'
    },
    instagram: {
      title: 'Instagram Caption',
      description: 'Creative captions for your photos',
      placeholder: 'Describe your photo or the story behind it...',
      icon: '📸'
    },
    blog: {
      title: 'Blog Post',
      description: 'Long-form content for blogs',
      placeholder: 'Enter your blog post topic or outline...',
      icon: '📝'
    },
    newsletter: {
      title: 'Newsletter',
      description: 'Email newsletter content',
      placeholder: 'What updates or insights do you want to share?',
      icon: '📧'
    }
  };

  const toneOptions = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'formal', label: 'Formal' },
    { value: 'humorous', label: 'Humorous' },
    { value: 'inspirational', label: 'Inspirational' }
  ];

  const lengthOptions = [
    { value: 'short', label: 'Short (50-100 words)' },
    { value: 'medium', label: 'Medium (100-300 words)' },
    { value: 'long', label: 'Long (300+ words)' }
  ];

  const generateContent = async () => {
    if (!topic.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please enter a topic to generate content.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setGeneratedContent('');

    // Simulate AI generation delay
    setTimeout(() => {
      const mockContent = generateMockContent();
      setGeneratedContent(mockContent);
      setLoading(false);
      
      toast({
        title: 'Content Generated!',
        description: 'Your AI-generated content is ready.',
      });
    }, 2000);
  };

  const generateMockContent = () => {
    const currentType = contentTypes[activeTab];
    
    switch (activeTab) {
      case 'linkedin':
        return `🚀 **${topic}**\n\nI'm excited to share some insights about ${topic}. In today's ${industry || 'business'} landscape, understanding this concept is crucial for ${targetAudience || 'professionals'}.\n\nKey takeaways:\n• Innovation drives success\n• Collaboration builds stronger teams\n• Continuous learning is essential\n\nWhat are your thoughts on this? I'd love to hear your perspective in the comments! 👇\n\n#${topic.replace(/\s+/g, '')} #Professional #Growth`;
        
      case 'twitter':
        return `🔥 ${topic}\n\nJust discovered something amazing about ${topic}! ${industry ? `The ${industry} industry` : 'This field'} is evolving rapidly.\n\n${keywords ? `Key points: ${keywords}` : 'Thread below 👇'}\n\n#${topic.replace(/\s+/g, '')} #Innovation`;
        
      case 'instagram':
        return `✨ ${topic} ✨\n\nCapturing this moment because ${topic} means so much to me. There's something magical about ${industry || 'this experience'} that I wanted to share with you all.\n\n${targetAudience ? `For all my ${targetAudience} friends` : 'For everyone'} who's been following my journey - this one's for you! 💫\n\nWhat does ${topic} mean to you? Tell me in the comments! 👇\n\n#${topic.replace(/\s+/g, '')} #Inspiration #Life`;
        
      case 'blog':
        return `# ${topic}: A Comprehensive Guide\n\n## Introduction\n\nIn today's ${industry || 'digital'} world, understanding ${topic} has become more important than ever. Whether you're ${targetAudience || 'a professional'} or just starting your journey, this guide will provide you with valuable insights.\n\n## Key Concepts\n\n${keywords ? keywords.split(',').map(k => `- ${k.trim()}`).join('\n') : '- Understanding the fundamentals\n- Practical applications\n- Best practices'}\n\n## Conclusion\n\n${topic} continues to evolve, and staying informed is crucial for success. By implementing these strategies, you'll be well-positioned to achieve your goals.\n\nWhat questions do you have about ${topic}? Feel free to reach out!`;
        
      case 'newsletter':
        return `Subject: ${topic} - Your Weekly Update\n\nHello ${targetAudience || 'everyone'}!\n\nWelcome to this week's newsletter. Today, we're diving deep into ${topic} and why it matters for ${industry || 'your industry'}.\n\n📰 **This Week's Highlights:**\n• Latest trends in ${topic}\n• Expert insights and analysis\n• Practical tips you can implement today\n\n💡 **Key Takeaway:**\n${topic} is reshaping how we ${industry || 'do business'}. ${keywords ? `Focus on: ${keywords}` : 'Stay ahead of the curve by keeping these principles in mind.'}\n\n🔗 **Resources:**\n- Additional reading materials\n- Upcoming webinars\n- Community discussions\n\nThank you for being part of our community!\n\nBest regards,\nYour Newsletter Team`;
        
      default:
        return `Generated content for ${topic} will appear here...`;
    }
  };

  const copyToClipboard = () => {
    if (!generatedContent) return;
    
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: 'Copied!',
      description: 'Content copied to clipboard successfully.',
    });
  };

  const downloadContent = () => {
    if (!generatedContent) return;
    
    const element = document.createElement('a');
    const file = new Blob([generatedContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${activeTab}-post-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: 'Downloaded!',
      description: 'Content downloaded successfully.',
    });
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="h-8 w-8 text-blue-500 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">AI Post Builder</h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Create engaging content for any platform with AI assistance. Generate professional posts, 
          captions, and articles tailored to your audience.
        </p>
        <Badge className="mt-4 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 px-4 py-2">
          AI-Powered Content Generation
        </Badge>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Panel */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="h-5 w-5 mr-2 text-blue-500" />
                Content Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Content Type Selection */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Content Type</Label>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 bg-gray-100 dark:bg-gray-900/70 rounded-lg p-1">
                    {Object.entries(contentTypes).map(([key, type]) => (
                      <TabsTrigger 
                        key={key} 
                        value={key} 
                        className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-md rounded-md text-xs"
                      >
                        <span className="hidden sm:inline">{type.icon}</span>
                        <span className="sm:ml-1">{type.title.split(' ')[0]}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
                <p className="text-sm text-gray-500 mt-2">
                  {contentTypes[activeTab].description}
                </p>
              </div>

              {/* Topic Input */}
              <div>
                <Label htmlFor="topic" className="text-sm font-medium mb-2 block">
                  Topic / Content Idea *
                </Label>
                <Textarea
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder={contentTypes[activeTab].placeholder}
                  className="bg-white/80 dark:bg-gray-700/80 focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                  rows={4}
                />
              </div>

              {/* Settings Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Tone</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="bg-white/80 dark:bg-gray-700/80">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {toneOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Length</Label>
                  <Select value={length} onValueChange={setLength}>
                    <SelectTrigger className="bg-white/80 dark:bg-gray-700/80">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {lengthOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Additional Fields */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="industry" className="text-sm font-medium mb-2 block">
                    Industry (Optional)
                  </Label>
                  <Input
                    id="industry"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g., Technology, Healthcare, Marketing"
                    className="bg-white/80 dark:bg-gray-700/80"
                  />
                </div>

                <div>
                  <Label htmlFor="audience" className="text-sm font-medium mb-2 block">
                    Target Audience (Optional)
                  </Label>
                  <Input
                    id="audience"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="e.g., Entrepreneurs, Students, Professionals"
                    className="bg-white/80 dark:bg-gray-700/80"
                  />
                </div>

                <div>
                  <Label htmlFor="keywords" className="text-sm font-medium mb-2 block">
                    Keywords (Optional)
                  </Label>
                  <Input
                    id="keywords"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="Separate keywords with commas"
                    className="bg-white/80 dark:bg-gray-700/80"
                  />
                </div>
              </div>

              {/* Generate Button */}
              <Button 
                onClick={generateContent} 
                disabled={loading || !topic.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                size="lg"
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="mr-2"
                    >
                      <Sparkles className="h-5 w-5" />
                    </motion.div>
                    Generating Content...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Generate Content
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Output Panel */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 shadow-xl h-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Generated Content</span>
                {generatedContent && (
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadContent}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 min-h-[400px] border border-gray-200 dark:border-gray-700">
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center h-full"
                    >
                      <div className="text-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="mb-4"
                        >
                          <Sparkles className="h-12 w-12 text-blue-500 mx-auto" />
                        </motion.div>
                        <p className="text-gray-500 dark:text-gray-400">
                          AI is crafting your content...
                        </p>
                      </div>
                    </motion.div>
                  ) : generatedContent ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 font-sans leading-relaxed">
                        {generatedContent}
                      </pre>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-center h-full"
                    >
                      <div className="text-center">
                        <Sparkles className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400 italic">
                          Your AI-generated content will appear here...
                        </p>
                        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                          Fill in the topic and click "Generate Content" to get started!
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AIPostBuilder;
