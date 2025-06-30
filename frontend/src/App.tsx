import React, { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider, useTheme } from "@/components/ui/theme-provider";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout/Layout";

// ===== AUTH PAGES =====

import VerifyEmailPage from './pages/Auth/VerifyEmailPage';
import LoginCompanyPage from './pages/Auth/LoginCompanyPage';
import CompanyRegisterPage from './pages/Auth/CompanyRegisterPage';
import ProtectedRoute from './pages/Auth/ProtectedRoute';

// ===== LAYOUT COMPONENTS =====
import NotFound from "./pages/NotFound";

// ===== HOME PAGES =====
import CompanyHome from "./pages/Home/CompanyHome";

// ===== PRODUCT PAGES & OTHERS... (keeping existing imports) =====
import LinkedInPostsPage from "./pages/Product/CompanyPostGeneration";
import FreeJobPostingsPage from "./pages/Product/FreeJobPostingsPage";
import HiringOutsourcingPage from "./pages/Product/HiringOutsourcingPage";
import AdsGeneratorPage from "./pages/Product/AdsGeneratorPage";
import UseCasesPage from "./pages/Solutions/UseCasesPage";
import { WhyUsPage } from "./pages/Solutions/WhyUsPage";
import AboutUsPage from "./pages/About/AboutUsPage";
import CareersPage from "./pages/About/CareersPage";
import ManagementPage from "./pages/About/ManagementPage";
import InvestorsPage from "./pages/About/InvestorsPage";
import ContactPage from "./pages/ContactPage";
import ContactSalesPage from "./pages/ContactSalesPage";
import TermsPage from "./pages/Legal/TermsPage";
import CookiePolicyPage from "./pages/Legal/CookiePolicyPage";
import PrivacyPolicyPage from "./pages/Legal/PrivacyPolicyPage";
import PricingPage from "./pages/PricingPage";
import SEOBlogPage from './pages/Product/SEOBlogPost';
import CustomLLMTrainingPage from './pages/Product/LLMPage';
import SEOBlog from './pages/Product/SEOBlog';
import AIOperationsLanding from './pages/Product/AIOperation';
import WebsiteDashboard from './pages/Product/WebsiteDashboard';
import HRHiringForm from './pages/Form/HROutSourcingForm';
import VortexContactForm from './pages/Form/AIOperationalForm';

// ===== DASHBOARD & PAGES =====
import Dashboard from './Dashboard/Dashboard';
import ResourcesPage from './pages/Resources';


// Component to handle theme class on HTML element
const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);
  return <>{children}</>;
};

// Wraps public routes that shouldn't be accessible to logged-in users
const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? <Navigate to="/dashboard" replace /> : children;
};

const App = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeWrapper>
        <TooltipProvider>
          <Routes>
            {/* Protected Dashboard Route */}
            <Route path="/dashboard/*" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            {/* Public Auth Routes */}
            <Route path="/login" element={<PublicRoute><LoginCompanyPage /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><CompanyRegisterPage /></PublicRoute>} />
            <Route path="/company/login" element={<PublicRoute><LoginCompanyPage /></PublicRoute>} />
            <Route path="/company/register" element={<PublicRoute><CompanyRegisterPage /></PublicRoute>} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />

            {/* All other public routes with Layout */}
            <Route element={<Layout><Outlet /></Layout>}>
              <Route path="/" element={<CompanyHome />} />
              <Route path="/products/linkedin-posts" element={<LinkedInPostsPage />} />
              <Route path="/products/job-postings" element={<FreeJobPostingsPage />} />
              <Route path="/products/hiring" element={<HiringOutsourcingPage />} />
              <Route path="/products/ads-generator" element={<AdsGeneratorPage />} />
              <Route path='/products/seo-blog' element={<SEOBlogPage/>}/>
              <Route path='/products/llm' element={<CustomLLMTrainingPage/>}/>
              <Route path='/products/blog' element={<SEOBlog />} />
              <Route path='/products/aioperation' element={<AIOperationsLanding/>}/>
              <Route path='/products/webdashboard' element={<WebsiteDashboard/>}/>
              <Route path="/form/hr-hiring" element={<HRHiringForm />} />
              <Route path="/form/ai-operations" element={<VortexContactForm />} />
              <Route path="/solutions/use-cases" element={<UseCasesPage />} />
              <Route path="/solutions/why-us" element={<WhyUsPage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/about/careers" element={<CareersPage />} />
              <Route path="/about/management" element={<ManagementPage />} />
              <Route path="/about/investors" element={<InvestorsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/contact/sales" element={<ContactSalesPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/cookies" element={<CookiePolicyPage />} />
              <Route path='/resources' element={<ResourcesPage/> }/>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <Toaster />
        </TooltipProvider>
      </ThemeWrapper>
    </ThemeProvider>
  );
};

export default App;
