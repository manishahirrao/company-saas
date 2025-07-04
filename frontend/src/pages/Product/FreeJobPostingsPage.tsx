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
import { SkeletonCard } from '../Animation/SkeletonLoader';
import HRHiringForm from '../Form/FreeJobPostingForm';

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
  const [jobs, setJobs] = useState<Job[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    employmentType: 'Full-time'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    setJobs([
      {
        id: '1',
        title: 'Senior Frontend Developer',
        location: 'San Francisco, CA',
        description: 'We are looking for an experienced frontend developer to join our innovative team. You will be responsible for building scalable web applications using React, TypeScript, and modern development practices.',
        employmentType: 'Full-time',
        status: 'Active',
        postedAt: '2024-01-15',
        views: 247,
        applications: 12
      },
      {
        id: '2',
        title: 'Product Manager',
        location: 'Remote',
        description: 'Join our product team to help shape the future of our platform. We are looking for someone with experience in product strategy, user research, and cross-functional collaboration.',
        employmentType: 'Full-time',
        status: 'Active',
        postedAt: '2024-01-10',
        views: 189,
        applications: 8
      },
      {
        id: '3',
        title: 'UX Designer',
        location: 'New York, NY',
        description: 'Creative UX designer needed to craft exceptional user experiences. Must have experience with Figma, user research, and design systems.',
        employmentType: 'Contract',
        status: 'Closed',
        postedAt: '2024-01-05',
        views: 156,
        applications: 15
      }
    ]);
  }, []);

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

  const handleCloseJob = (jobId: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, status: 'Closed' as const } : job
    ));
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
        transition={{ duration: 0.5 }}
      >
        {/* Background Grid Pattern */}
        <div className="fixed inset-0 bg-grid-light dark:bg-grid-dark opacity-50 dark:opacity-100 pointer-events-none" />
        
        {/* Main Content */}
        <main className="relative z-10">
          {/* Hero Section */}
          <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl"></div>
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
            </div>
            
            <div className="max-w-7xl mx-auto text-center relative z-10">
              <motion.div 
                className="mb-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h1 
                  className="text-7xl md:text-8xl font-space font-bold gradient-text mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  FREE JOB POSTINGS
                </motion.h1>
                
                <motion.p 
                  className="text-2xl md:text-3xl text-muted-foreground font-space font-light mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Find the best talent for your team
                </motion.p>
                
                <motion.div 
                  className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-electric-purple/20 to-neon-blue/20 rounded-full border border-electric-purple/30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <span className="text-electric-purple font-inter font-medium">NO CREDIT CARD REQUIRED</span>
                </motion.div>
              </motion.div>
              
              {/* Stats */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-6 border border-border/20 hover:border-electric-purple/30 transition-colors">
                  <div className="text-4xl font-bold text-foreground mb-2">{activeJobs}</div>
                  <div className="text-muted-foreground">Active Jobs</div>
                </div>
                <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-6 border border-border/20 hover:border-neon-blue/30 transition-colors">
                  <div className="text-4xl font-bold text-foreground mb-2">{totalViews}</div>
                  <div className="text-muted-foreground">Total Views</div>
                </div>
                <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-6 border border-border/20 hover:border-electric-green/30 transition-colors">
                  <div className="text-4xl font-bold text-foreground mb-2">{totalApplications}</div>
                  <div className="text-muted-foreground">Applications</div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Job Posting Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {/* Post New Job Form */}
              {/* <motion.div 
                className="mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="shadow-2xl border-0 bg-card/50 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-electric-purple to-neon-blue text-white p-8">
                    <CardTitle className="flex items-center gap-4 text-2xl">
                      <div className="p-3 bg-white/20 rounded-xl">
                        <Plus className="w-6 h-6" />
                      </div>
                      Post a New Job
                    </CardTitle>
                  </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-semibold text-gray-700">Job Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g. Senior Software Engineer"
                    className="h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-semibold text-gray-700">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g. San Francisco, CA or Remote"
                    className="h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="employmentType" className="text-sm font-semibold text-gray-700">Employment Type</Label>
                <Select value={formData.employmentType} onValueChange={(value) => handleInputChange('employmentType', value)}>
                  <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-semibold text-gray-700">Job Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the role, responsibilities, requirements, and benefits..."
                  rows={6}
                  className="border-2 border-gray-200 focus:border-indigo-500 rounded-xl resize-none"
                  required
                />
              </div>

              <Button 
                type="button" 
                onClick={handleSubmit}
                className="w-full h-14 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Posting Job...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Post Job Free
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

              </motion.div> */}
              <HRHiringForm/>

              {/* Job Listings */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="shadow-2xl border-0 bg-card/50 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-8">
                    <CardTitle className="flex items-center gap-4 text-2xl">
                      <div className="p-3 bg-white/20 rounded-xl">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      My Job Listings ({jobs.length})
                    </CardTitle>
                  </CardHeader>
          <CardContent className="p-8">
            {jobs.length === 0 ? (
              <div className="text-center py-20 px-4">
                <div className="w-32 h-32 bg-gradient-to-br from-electric-purple/10 to-neon-blue/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Building2 className="w-16 h-16 text-electric-purple" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">No job postings yet</h3>
                <p className="text-muted-foreground text-lg max-w-lg mx-auto mb-8">
                  Create your first job posting above to start attracting top talent to your company!
                </p>
                <div className="flex items-center justify-center gap-2 text-sm bg-gradient-to-r from-electric-purple to-neon-blue bg-clip-text text-transparent font-medium">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>It's completely free and takes less than 2 minutes</span>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {jobs.map((job) => (
                  <motion.div 
                    key={job.id} 
                    className="group bg-card/50 border border-border/20 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
                    whileHover={{ y: -5, borderColor: 'hsl(283, 91%, 57%, 0.5)' }}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                            {job.title}
                          </h3>
                          <Badge 
                            variant={job.status === 'Active' ? 'default' : 'secondary'}
                            className={`${
                              job.status === 'Active' 
                                ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                : 'bg-gray-100 text-gray-600'
                            } px-3 py-1 font-medium`}
                          >
                            {job.status}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-indigo-500" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-indigo-500" />
                            {job.employmentType}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-indigo-500" />
                            Posted {new Date(job.postedAt).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-6 mb-4">
                          <div className="flex items-center gap-1.5 text-sm">
                            <Eye className="w-4 h-4 text-blue-500" />
                            <span className="font-medium">{job.views}</span>
                            <span className="text-gray-500">views</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm">
                            <Users className="w-4 h-4 text-green-500" />
                            <span className="font-medium">{job.applications}</span>
                            <span className="text-gray-500">applications</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm">
                            <TrendingUp className="w-4 h-4 text-orange-500" />
                            <span className="text-gray-500">Growing</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        {job.status === 'Active' && (
                          <>
                            <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-300">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCloseJob(job.id)}
                              className="hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                            >
                              Close Job
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed line-clamp-2 mb-4">{job.description}</p>
                    
                    {job.status === 'Active' && (
                      <div className="mt-4 pt-4 border-t border-border/20">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="group flex items-center gap-1.5 text-electric-purple hover:text-electric-purple/80 hover:bg-electric-purple/5 p-0 h-auto font-medium"
                        >
                          <span>View Applications</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </section>
        </main>
      </motion.div>
    </AnimatePresence>
  );
};

export default FreeJobPostingsPage;