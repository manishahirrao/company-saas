import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Building2, Clock, Plus, Eye, Edit, Trash2, Users, TrendingUp, Briefcase, Star } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header with gradient background */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 pt-24 pb-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-purple-600/90"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-20 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-yellow-300" />
            <span className="text-white/90 text-sm font-medium">100% Free • No Hidden Fees</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Free Job Postings
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Post unlimited job openings on our premium job board. Reach thousands of qualified candidates 
            with zero cost and maximum impact.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold text-white">{activeJobs}</div>
              <div className="text-white/80 text-sm">Active Jobs</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold text-white">{totalViews}</div>
              <div className="text-white/80 text-sm">Total Views</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold text-white">{totalApplications}</div>
              <div className="text-white/80 text-sm">Applications</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Post New Job Form */}
        <Card className="mb-8 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-white/20 rounded-lg">
                <Plus className="w-5 h-5" />
              </div>
              Post a New Job
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-semibold text-foreground/90">Job Title</Label>
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
                  <Label htmlFor="location" className="text-sm font-semibold text-foreground/90">Location</Label>
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
                <Label htmlFor="employmentType" className="text-sm font-semibold text-foreground/90">Employment Type</Label>
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
                <Label htmlFor="description" className="text-sm font-semibold text-foreground/90">Job Description</Label>
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

        {/* Job Listings */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm mb-12">
          <CardHeader className="bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Briefcase className="w-5 h-5" />
              </div>
              My Job Listings ({jobs.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {jobs.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building2 className="w-12 h-12 text-indigo-500" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No job postings yet</h3>
                <p className="text-foreground/80 mb-6">Create your first job posting above to start attracting top talent!</p>
                <div className="flex items-center justify-center gap-2 text-sm text-indigo-600">
                  <Star className="w-4 h-4" />
                  <span>It's completely free and takes less than 2 minutes</span>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {jobs.map((job) => (
                  <div key={job.id} className="group bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-xl transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
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
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/80 mb-3">
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
                            <span className="text-foreground/60">views</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm">
                            <Users className="w-4 h-4 text-green-500" />
                            <span className="font-medium">{job.applications}</span>
                            <span className="text-foreground/60">applications</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm">
                            <TrendingUp className="w-4 h-4 text-orange-500" />
                            <span className="text-foreground/60">Growing</span>
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
                    
                    <p className="text-foreground/90 leading-relaxed line-clamp-2">{job.description}</p>
                    
                    {job.status === 'Active' && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 p-0 h-auto font-medium"
                        >
                          View Applications →
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FreeJobPostingsPage;