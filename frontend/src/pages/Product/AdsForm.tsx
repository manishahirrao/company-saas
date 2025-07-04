import React from "react";
import { useState } from "react";
import GoogleAdsForm from "../Ads/GoogleAds";
import MetaAdsForm from "../Ads/MetaAds";
import LinkedInAdsForm from "../Ads/LinkedInAds";
import YouTubeAdsForm from "../Ads/YouTubeAds";


const AdsForm=()=>{
    const [activeTab, setActiveTab] = useState('Google Ads');

   const tabs = [
     { name: 'Google Ads', component: <GoogleAdsForm /> },
     { name: 'Meta Ads', component: <MetaAdsForm /> },
     { name: 'LinkedIn Ads', component: <LinkedInAdsForm /> },
     { name: 'YouTube Ads', component: <YouTubeAdsForm /> },
   ];

   return(
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Generate Ads for Any Platform</h2>
        <p className="text-lg text-muted-foreground text-center max-w-2xl">
          Create optimized ads for all major advertising platforms with just a few clicks.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === tab.name
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                : 'text-muted-foreground hover:bg-accent'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border">
        {renderActiveTab()}
      </div>
    </div>
  </section>
   )
}