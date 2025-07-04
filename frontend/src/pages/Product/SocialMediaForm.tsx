import React from "react";
import { useState } from "react";
import { Tabs,TabsList,TabsTrigger,TabsContent } from "@/components/ui/tabs";
import { Sparkles } from "lucide-react";
import { ContentGenerator } from "./PostGeneration";

const SocialMediaForm=()=>{
   const [activeTab, setActiveTab] = useState('linkedin');

    const socialPlatforms = [
        { 
          name: 'LinkedIn', 
          icon: '💼', 
          description: 'Professional networking posts',
          color: 'from-blue-500 to-blue-600',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700'
        },
        { 
          name: 'Facebook', 
          icon: '👥', 
          description: 'Community engagement content',
          color: 'from-blue-600 to-blue-700',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700'
        },
        { 
          name: 'Instagram', 
          icon: '📸', 
          description: 'Visual storytelling posts',
          color: 'from-pink-500 to-purple-600',
          bgColor: 'bg-gradient-to-r from-pink-50 to-purple-50',
          textColor: 'text-purple-700'
        },
        { 
          name: 'Pinterest', 
          icon: '📌', 
          description: 'Creative inspiration boards',
          color: 'from-red-500 to-red-600',
          bgColor: 'bg-red-50',
          textColor: 'text-red-700'
        },
      ];

   return(
    <section className="py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-100 p-1 rounded-2xl">
          {socialPlatforms.map((platform) => (
            <TabsTrigger 
              key={platform.name}
              value={platform.name.toLowerCase()} 
              className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-xl py-4 px-6 font-semibold transition-all duration-200"
            >
              <div className="flex items-center space-x-2">
                <span className="text-xl">{platform.icon}</span>
                <span>{platform.name}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {socialPlatforms.map((platform) => (
          <TabsContent key={platform.name} value={platform.name.toLowerCase()} className="mt-8">
            <div className={`p-6 rounded-2xl ${platform.bgColor} border border-gray-200/50 mb-8`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-2xl font-bold ${platform.textColor} mb-2`}>
                    {platform.icon} {platform.name} Content Generator
                  </h3>
                  <p className="text-gray-600">{platform.description}</p>
                </div>
                <div className={`p-4 bg-gradient-to-r ${platform.color} rounded-xl text-white`}>
                  <Sparkles className="w-8 h-8" />
                </div>
              </div>
            </div>
            <ContentGenerator selectedAdType={platform.name} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  </section>
   )
}