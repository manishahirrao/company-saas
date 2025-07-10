import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardNavbar from './DashboardNavbar';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

// Import role-specific dashboard pages
import ContentCreatorDashboard from '@/pages/AfterPages/Dashboard/Roles/ContentCreatorDashboard';
import JobSeekerDashboard from '@/pages/AfterPages/Dashboard/Roles/JobSeekerDashboard';
import EmployerDashboard from '@/pages/AfterPages/Dashboard/Roles/EmployerDashboard';
import HrAgencyDashboard from '@/pages/AfterPages/Dashboard/Roles/HrAgencyDashboard';


//import form
import AdsForm from '@/pages/Product/AdsForm';

// Import common page components
import PostBuilderPage from '@/pages/AfterPages/Content/PostBuilderPage';
import SeoBlogPage from '@/pages/AfterPages/Content/SeoBlogPage';
import AdsCopyPage from '@/pages/AfterPages/Content/AdsCopyPage';
import PostJobPage from '@/pages/AfterPages/PostJob';
import HireAssistPage from '@/pages/AfterPages/Hiring/HireAssistPage';
import AiOperationsPage from '@/pages/AfterPages/Advanced/AiOperationsPage';
import CustomLlmPage from '@/pages/AfterPages/Advanced/CustomLlmPage';
import ProfilePage from '@/pages/AfterPages/Settings/ProfilePage';
import SubscriptionPage from '@/pages/AfterPages/Settings/SubscriptionPage';
import ApiKeysPage from '@/pages/AfterPages/Settings/ApiKeysPage';
import { ContentGenerator } from '@/pages/Product/SocialMediaForm';
import HRHiringForm from '@/pages/Form/JobPostingForm';
import VortexContactForm from '@/pages/Form/AIOperationalForm';
import CompanyProfile from '@/pages/Profile/CompanyProfile';
import Pricing from '@/pages/Pricing';
import JobPostingForm from '@/pages/Form/JobPostingForm';

// This component determines which dashboard to show based on user role
const RoleSpecificDashboard = () => {
  const { profile, loading } = useAuth();

  if (loading) {
    return <div>Loading dashboard...</div>; // Or a spinner component
  }

  switch (profile?.user_type) {
    case 'content_creator':
      return <ContentCreatorDashboard />;
    case 'job_seeker':
      return <JobSeekerDashboard />;
    case 'employer':
      return <EmployerDashboard />;
    case 'hr_agency':
      return <HrAgencyDashboard />;
    default:
      // Fallback for unknown roles or if profile is not loaded
      return <div>Welcome! Your dashboard is being set up.</div>;
  }
};

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <DashboardNavbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        <main className={cn(
          "transition-all duration-300 ease-in-out flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900",
          sidebarCollapsed ? "ml-20" : "ml-64"
        )}>
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <Routes>
              {/* The index route now renders the role-specific dashboard */}
              <Route path="/" element={<RoleSpecificDashboard />} />
              
              {/* Common routes accessible to all roles */}
              <Route path="/content/post-builder" element={<ContentGenerator/>} />
              <Route path="/content/seo-blog" element={<SeoBlogPage />} />
              <Route path="/content/ads-copy" element={<AdsForm />} />
              <Route path="/hiring/post-job" element={<JobPostingForm />} />
              <Route path="/hiring/assist" element={<HRHiringForm/>} />
              <Route path="/advanced/operations" element={<VortexContactForm />} />
              <Route path="/advanced/custom-llm" element={<VortexContactForm />} />
              <Route path="/settings/profile" element={<CompanyProfile />} />
              <Route path="/settings/subscription" element={<Pricing />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
