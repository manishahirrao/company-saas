import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Lightbulb, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HelpMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface ContextualHint {
  id: string;
  element: string;
  title: string;
  description: string;
  type: 'tip' | 'warning' | 'info';
  position: { x: number; y: number };
}

export function AIPoweredHelpSystem() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<HelpMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [contextualHints, setContextualHints] = useState<ContextualHint[]>([]);

  const predefinedResponses = {
    'design tokens': {
      content: "Design tokens are the foundational elements of our design system. They include colors, spacing, typography, and animations. You can export them in various formats (CSS, SCSS, JS, JSON) using our token export tool.",
      suggestions: ["Show me color tokens", "How to export tokens", "Typography system"]
    },
    'accessibility': {
      content: "Our accessibility features include contrast checking, keyboard navigation, and screen reader support. The contrast checker helps ensure WCAG compliance for all color combinations.",
      suggestions: ["Check color contrast", "Keyboard shortcuts", "Screen reader support"]
    },
    'animations': {
      content: "We provide various animation patterns including orbital motions, pulse effects, and spring animations. You can customize complexity, speed, and interactivity levels.",
      suggestions: ["Orbital animations", "Animation performance", "Custom animations"]
    },
    'components': {
      content: "Our component system includes interactive elements with hover effects, tooltips, and customizable properties. Each component can be generated with custom code output.",
      suggestions: ["Button variations", "Card components", "Form elements"]
    }
  };

  const getAIResponse = (userMessage: string): { content: string; suggestions?: string[] } => {
    const message = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (message.includes(key)) {
        return response;
      }
    }

    if (message.includes('how') || message.includes('help')) {
      return {
        content: "I'm here to help you navigate the VORTEX design system. I can assist with design tokens, accessibility guidelines, animation patterns, and component usage.",
        suggestions: ["Design tokens", "Accessibility features", "Animation guide", "Component library"]
      };
    }

    if (message.includes('error') || message.includes('problem')) {
      return {
        content: "I can help troubleshoot issues. Common problems include contrast ratios, animation performance, or component integration. What specific issue are you experiencing?",
        suggestions: ["Contrast issues", "Animation lag", "Component errors"]
      };
    }

    return {
      content: "I understand you're looking for help with the VORTEX design system. Could you be more specific about what you'd like to know?",
      suggestions: ["Getting started", "Design principles", "Best practices", "Troubleshooting"]
    };
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: HelpMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getAIResponse(inputValue);
      const aiMessage: HelpMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.content,
        suggestions: aiResponse.suggestions,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const sendSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    sendMessage();
  };

  useEffect(() => {
    // Generate contextual hints based on page elements
    const hints: ContextualHint[] = [
      {
        id: '1',
        element: 'theme-toggle',
        title: 'Theme Toggle',
        description: 'Switch between dark and light modes to see how design tokens adapt',
        type: 'tip',
        position: { x: 100, y: 50 }
      },
      {
        id: '2',
        element: 'orbital-animation',
        title: 'Interactive Animation',
        description: 'Hover over animations to see interactive effects and performance optimizations',
        type: 'info',
        position: { x: 200, y: 150 }
      }
    ];

    setContextualHints(hints);

    // Add welcome message
    if (messages.length === 0) {
      const welcomeMessage: HelpMessage = {
        id: 'welcome',
        type: 'ai',
        content: "Hello! I'm your AI assistant for the VORTEX design system. I can help you with design tokens, accessibility, animations, and component usage. What would you like to explore?",
        suggestions: ["Show design tokens", "Check accessibility", "Learn about animations", "Browse components"],
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  return (
    <>
      {/* Contextual Hints */}
      <AnimatePresence>
        {contextualHints.map((hint) => (
          <motion.div
            key={hint.id}
            className="fixed z-40 pointer-events-none"
            style={{ left: hint.position.x, top: hint.position.y }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 2 }}
          >
            <div className="bg-card/90 backdrop-blur-sm border border-electric-purple/30 rounded-lg p-3 max-w-xs">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-electric-purple flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium mb-1">{hint.title}</h4>
                  <p className="text-xs text-muted-foreground">{hint.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Help Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-electric-purple to-neon-blue hover:shadow-lg hover:shadow-electric-purple/25 transition-all duration-200"
          size="icon"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      </motion.div>

      {/* Help Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-end p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div 
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              className="relative w-full max-w-md h-[600px] bg-card border border-electric-purple/20 rounded-lg shadow-2xl flex flex-col"
              initial={{ scale: 0.8, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 100 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Header */}
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-electric-purple" />
                  AI Assistant
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto space-y-4 pb-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {message.type === 'ai' && (
                      <div className="w-8 h-8 bg-gradient-to-br from-electric-purple to-neon-blue rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    
                    <div className={`max-w-[80%] ${message.type === 'user' ? 'order-1' : ''}`}>
                      <div className={`p-3 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-electric-purple text-white' 
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                      </div>
                      
                      {message.suggestions && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs h-7"
                              onClick={() => sendSuggestion(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>

                    {message.type === 'user' && (
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    className="flex gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-electric-purple to-neon-blue rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-electric-purple rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-electric-purple rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-electric-purple rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>

              {/* Input */}
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Ask me about the design system..."
                    className="flex-1 px-3 py-2 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-electric-purple/50"
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    size="icon"
                    className="bg-electric-purple hover:bg-electric-purple/90"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}