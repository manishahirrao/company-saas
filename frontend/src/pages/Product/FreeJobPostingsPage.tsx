import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Building2, Clock, Plus, Eye, Edit, Trash2, Users, TrendingUp, Briefcase, Star, ArrowRight } from 'lucide-react';
import { AIPoweredHelpSystem } from '../Animation/AIPoweredHelpSystem';

interface Job {
  id: string;
  title: string;
  location: string;
  description: string;
  employmentType: string;
  status: 'Active' | 'Closed';
  postedAt: string;
  views?: number;
  applications?: number;
}

const FreeJobPostingsPage: React.FC = () => {
  useEffect(() => {
    document.title = 'VORTEX - Free Job Postings';
    // Parallax effect for background elements
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-bg');
      parallaxElements.forEach((el) => {
        const speed = 0.5;
        const element = el as HTMLElement;
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    employmentType: 'Full-time'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.location || !formData.description) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newJob: Job = {
        id: Date.now().toString(),
        ...formData,
        status: 'Active',
        postedAt: new Date().toISOString().split('T')[0],
        views: 0,
        applications: 0
      };
      setJobs(prev => [newJob, ...prev]);
      setFormData({
        title: '',
        location: '',
        description: '',
        employmentType: 'Full-time'
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const deleteJob = (id: string) => {
    setJobs(prev => prev.filter(job => job.id !== id));
  };

  const activeJobs = jobs.filter(job => job.status === 'Active').length;
  const totalViews = jobs.reduce((sum, job) => sum + (job.views || 0), 0);
  const totalApplications = jobs.reduce((sum, job) => sum + (job.applications || 0), 0);

  return (
    <AnimatePresence>
      <motion.div 
        className="min-h-screen bg-background relative" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background Grid Pattern */}
        <div className="fixed inset-0 bg-grid-light dark:bg-grid-dark opacity-20 dark:opacity-10 pointer-events-none parallax-bg" />
        <main className="relative z-10">
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 pt-24 pb-16">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-purple-600/90"></div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                className="text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Free Job Postings</h1>
                <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
                  Post your job openings for free and find the best talent for your company.
                </p>
              </motion.div>
              
              {/* Stats */}
              <motion.div 
                className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-white">{activeJobs}</div>
                  <div className="text-indigo-100 mt-2">Active Jobs</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-white">{totalViews}</div>
                  <div className="text-indigo-100 mt-2">Total Views</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-white">{totalApplications}</div>
                  <div className="text-indigo-100 mt-2">Applications</div>
                </div>
              </motion.div>
            </div>
          
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute top-20 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-12 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Job Posting Form */}
                <motion.div 
                  className="lg:col-span-1"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="sticky top-6">
                    <CardHeader>
                      <CardTitle className="text-xl">Post a New Job</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="title">Job Title</Label>
                          <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            placeholder="e.g. Senior Frontend Developer"
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            placeholder="e.g. Remote, San Francisco, etc."
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="employmentType">Employment Type</Label>
                          <Select 
                            value={formData.employmentType}
                            onValueChange={(value) => handleInputChange('employmentType', value)}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select employment type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Full-time">Full-time</SelectItem>
                              <SelectItem value="Part-time">Part-time</SelectItem>
                              <SelectItem value="Contract">Contract</SelectItem>
                              <SelectItem value="Internship">Internship</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="description">Job Description</Label>
                          <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            placeholder="Describe the job responsibilities, requirements, and benefits..."
                            className="mt-1 min-h-[150px]"
                          />
                        </div>
                        
                        <Button 
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="w-full bg-indigo-600 hover:bg-indigo-700"
                        >
                          {isSubmitting ? (
                            <>
                              <Clock className="w-4 h-4 mr-2 animate-spin" />
                              Posting...
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 mr-2" />
                              Post Job
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                {/* Job Listings */}
                <motion.div 
                  className="lg:col-span-2 space-y-6"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Your Job Postings</h2>
                    <div className="text-sm text-gray-500">
                      Showing {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'}
                    </div>
                  </div>
                  
                  {jobs.length === 0 ? (
                    <motion.div 
                      className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Briefcase className="w-12 h-12 mx-auto text-gray-400" />
                      <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No jobs posted yet</h3>
                      <p className="mt-1 text-gray-500 dark:text-gray-400">Get started by posting your first job opening.</p>
                    </motion.div>
                  ) : (
                    <div className="space-y-4">
                      {jobs.map((job, index) => (
                        <motion.div
                          key={job.id}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{job.title}</h3>
                                    <Badge 
                                      variant={job.status === 'Active' ? 'default' : 'secondary'}
                                      className={job.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' : ''}
                                    >
                                      {job.status}
                                    </Badge>
                                  </div>
                                  
                                  <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/80 mb-3">
                                    <span className="flex items-center gap-1.5">
                                      <MapPin className="w-4 h-4 text-indigo-500" />
                                      {job.location}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                      <Briefcase className="w-4 h-4 text-indigo-500" />
                                      {job.employmentType}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                      <Calendar className="w-4 h-4 text-indigo-500" />
                                      Posted on {new Date(job.postedAt).toLocaleDateString()}
                                    </span>
                                  </div>
                                  
                                  <p className="text-foreground/70 line-clamp-2">
                                    {job.description}
                                  </p>
                                </div>
                                
                                <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                                    <Eye className="w-4 h-4" />
                                    <span>{job.views || 0} views</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                                    <Users className="w-4 h-4" />
                                    <span>{job.applications || 0} applications</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <Button variant="outline" size="sm" className="gap-1.5">
                                    <Edit className="w-4 h-4" />
                                    Edit
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/30"
                                    onClick={() => deleteJob(job.id)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                  </Button>
                                </div>
                                
                                <Button size="sm" variant="ghost" className="text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/30">
                                  View Details
                                  <ArrowRight className="w-4 h-4 ml-1.5" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </section>
          
          {/* AI Help System */}
          <AIPoweredHelpSystem />
        </main>
      </motion.div>
    </AnimatePresence>
  );
};

export default FreeJobPostingsPage;