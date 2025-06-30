import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles, Bot, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hi! I\'m PostPilot\'s AI Assistant. How can I help you today? I can answer questions about our LinkedIn automation features, pricing, or anything else you\'d like to know!',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsTyping(false);
    
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('pricing') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
      return "We offer three pricing tiers: Free (basic features, 5 posts/month), Professional ($29/month - unlimited posts, resume builder, job matcher), and Business ($99/month - all features plus AI video generation and advanced analytics). Annual billing saves 20%! Would you like to see our detailed pricing page?";
    }
    
    if (lowerMessage.includes('linkedin') || lowerMessage.includes('post')) {
      return "Our LinkedIn post generation feature uses AI to create engaging content tailored to your professional background. It can generate titles, write compelling content, create images with DALL-E, and even help with posting directly to LinkedIn. Would you like to try it out?";
    }
    
    if (lowerMessage.includes('resume')) {
      return "Our resume builder can enhance your existing resume using AI to make it more ATS-friendly and compelling to employers. Just upload your current resume and our AI will suggest improvements to highlight your achievements better.";
    }
    
    if (lowerMessage.includes('job') || lowerMessage.includes('match')) {
      return "Our job matcher analyzes your profile and finds the best job opportunities for you using AI embeddings to match your skills with job requirements. It can also help tailor your resume for specific positions.";
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
      return "I'm here to help! You can also visit our Support page for detailed guides, contact our support team directly, or check out our Help Center. Is there something specific you'd like assistance with?";
    }
    
    if (lowerMessage.includes('feature') || lowerMessage.includes('what')) {
      return "PostPilot offers four main features: 1) LinkedIn Post Generation with AI-powered content and images, 2) Resume Builder/Enhancer for ATS optimization, 3) Profile-Job Matcher to find relevant opportunities, and 4) Career Analytics for insights and improvement tips. Which one interests you most?";
    }
    
    return "That's a great question! I'd be happy to help you learn more about PostPilot. Our platform specializes in LinkedIn automation and career advancement tools. Feel free to ask about specific features, pricing, or how we can help with your professional growth. You can also contact our sales team for a personalized demo!";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const aiResponse = await simulateAIResponse(inputValue);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'I apologize, but I\'m having trouble responding right now. Please try again in a moment or contact our support team for immediate assistance.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "What features does PostPilot offer?",
    "How much does it cost?",
    "How does the LinkedIn post generator work?",
    "Can you help me with my resume?"
  ];

  return (
    <>
      {/* Chat Toggle Button with enhanced styling */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-16 h-16 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 
            relative overflow-hidden group
            ${isOpen 
              ? 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' 
              : 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700'
            }
          `}
          size="sm"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          
          {/* Icon with animation */}
          <div className="relative z-10">
            {isOpen ? (
              <X className="w-7 h-7 transition-transform duration-300" />
            ) : (
              <div className="relative">
                <MessageCircle className="w-7 h-7 transition-transform duration-300" />
                {/* Pulse animation for new messages */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
        </Button>
      </div>

      {/* Chat Window with enhanced design */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden transition-all duration-300 animate-in slide-in-from-bottom-8">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-6 relative overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=)]"></div>
            </div>
            
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">PostPilot Assistant</h3>
                  <p className="text-sm text-white/80 flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    Online & ready to help
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 rounded-full w-8 h-8 p-0 transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages with improved styling */}
          <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-gray-50/50 to-white">
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in-0 slide-in-from-bottom-4`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`flex max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600 ml-2' 
                        : 'bg-gradient-to-br from-gray-100 to-gray-200 mr-2'
                    }`}>
                      {message.type === 'user' ? (
                        <UserIcon className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                    
                    {/* Message bubble */}
                    <div className={`relative group ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white' 
                        : 'bg-white border border-gray-200 text-gray-900 shadow-sm'
                    } rounded-2xl px-4 py-3 transition-all duration-200 hover:shadow-md`}>
                      {/* Message content */}
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      
                      {/* Timestamp */}
                      <p className={`text-xs mt-2 ${
                        message.type === 'user' ? 'text-white/70' : 'text-gray-500'
                      } opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      
                      {/* Message tail */}
                      <div className={`absolute bottom-2 ${
                        message.type === 'user' 
                          ? 'right-0 translate-x-1/2' 
                          : 'left-0 -translate-x-1/2'
                      } w-3 h-3 ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-br from-indigo-600 to-purple-600' 
                          : 'bg-white border-l border-b border-gray-200'
                      } rotate-45`}></div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {(isLoading || isTyping) && (
                <div className="flex justify-start animate-in fade-in-0 slide-in-from-bottom-4">
                  <div className="flex items-end space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 flex items-center space-x-2 shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm text-gray-500">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Suggested questions */}
              {messages.length === 1 && (
                <div className="space-y-3 animate-in fade-in-0 slide-in-from-bottom-4" style={{ animationDelay: '500ms' }}>
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                    <p className="text-sm text-gray-600 font-medium">Quick questions to get started:</p>
                  </div>
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInputValue(question)}
                      className="block w-full text-left p-3 text-sm text-indigo-600 hover:text-indigo-700 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 rounded-xl border border-indigo-200 hover:border-indigo-300 transition-all duration-200 hover:shadow-sm hover:scale-[1.02]"
                      style={{ animationDelay: `${600 + index * 100}ms` }}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Input area with enhanced design */}
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="flex space-x-3 items-end">
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="resize-none border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 pr-12"
                />
                {inputValue && (
                  <button
                    onClick={() => setInputValue('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                size="sm"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 rounded-xl px-4 py-2 h-auto transition-all duration-200 hover:scale-105 disabled:scale-100"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            
            {/* Powered by indicator */}
            <div className="mt-2 text-center">
              <p className="text-xs text-gray-400 flex items-center justify-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>Powered by PostPilot AI</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;