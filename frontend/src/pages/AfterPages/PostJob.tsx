import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  Users, 
  Star,
  Plus,
  X,
  Save,
  Eye,
  Send,
  AlertCircle,
  CheckCircle2,
  Building,
  Calendar,
  GraduationCap,
  Zap
} from 'lucide-react';

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    locationType: 'remote',
    jobType: 'full-time',
    experience: 'mid',
    salary: {
      min: '',
      max: '',
      currency: 'USD',
      period: 'yearly'
    },
    description: '',
    requirements: [''],
    benefits: [''],
    skills: [],
    department: '',
    deadline: ''
  });

  const [currentSkill, setCurrentSkill] = useState('');
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const addSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill('');
    }
  };

  const removeSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const generateDescription = async () => {
    setIsGeneratingDescription(true);
    // Simulate AI generation
    setTimeout(() => {
      const generatedDescription = `We are seeking a talented ${formData.title} to join our ${formData.department || 'dynamic'} team. In this role, you will be responsible for developing innovative solutions and contributing to our company's growth.

Key Responsibilities:
• Lead development of scalable applications and systems
• Collaborate with cross-functional teams to deliver high-quality products
• Mentor junior team members and contribute to technical decisions
• Stay updated with latest technologies and industry best practices

What We Offer:
• Competitive salary and comprehensive benefits package
• Flexible work arrangements and professional development opportunities
• Collaborative work environment with cutting-edge technology
• Opportunity to make a significant impact on our products and services`;
      
      setFormData(prev => ({
        ...prev,
        description: generatedDescription
      }));
      setIsGeneratingDescription(false);
    }, 2000);
  };

  const handleSubmit = (action) => {
    console.log(`${action} job posting:`, formData);
    // Handle form submission
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Post a Job</h1>
        <p className="text-gray-500 mt-2">Create and publish your job posting to attract top talent.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <motion.div
            className="bg-white border border-gray-200 rounded-xl p-6 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-blue-500" />
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. Senior Software Engineer"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your company name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. Engineering, Marketing"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => handleInputChange('deadline', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Location & Work Type */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-green-500" />
                Location & Work Type
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="City, Country"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location Type
                  </label>
                  <select
                    value={formData.locationType}
                    onChange={(e) => handleInputChange('locationType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="remote">Remote</option>
                    <option value="onsite">On-site</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type
                  </label>
                  <select
                    value={formData.jobType}
                    onChange={(e) => handleInputChange('jobType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Salary & Experience */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-amber-500" />
                Salary & Experience
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Level
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="entry">Entry Level (0-2 years)</option>
                    <option value="mid">Mid Level (3-5 years)</option>
                    <option value="senior">Senior Level (6+ years)</option>
                    <option value="lead">Lead/Principal (8+ years)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salary Range
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={formData.salary.min}
                      onChange={(e) => handleInputChange('salary.min', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Min"
                    />
                    <span className="py-2 text-gray-500">to</span>
                    <input
                      type="number"
                      value={formData.salary.max}
                      onChange={(e) => handleInputChange('salary.max', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Max"
                    />
                    <select
                      value={formData.salary.currency}
                      onChange={(e) => handleInputChange('salary.currency', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="INR">INR</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="h-5 w-5 mr-2 text-purple-500" />
                Required Skills
              </h3>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add a skill (e.g. React, Python, Design)"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Job Description */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-indigo-500" />
                  Job Description
                </h3>
                <button
                  type="button"
                  onClick={generateDescription}
                  disabled={isGeneratingDescription || !formData.title}
                  className="flex items-center px-3 py-1.5 text-sm bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Zap className="h-4 w-4 mr-1" />
                  {isGeneratingDescription ? 'Generating...' : 'AI Generate'}
                </button>
              </div>
              
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
              />
            </div>

            {/* Requirements */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                Requirements
              </h3>
              
              {formData.requirements.map((req, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. Bachelor's degree in Computer Science"
                  />
                  {formData.requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('requirements', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => addArrayItem('requirements')}
                className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Requirement
              </button>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="h-5 w-5 mr-2 text-yellow-500" />
                Benefits & Perks
              </h3>
              
              {formData.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. Health insurance, Flexible work hours"
                  />
                  {formData.benefits.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('benefits', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => addArrayItem('benefits')}
                className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Benefit
              </button>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* Preview Card */}
            <motion.div
              className="bg-white border border-gray-200 rounded-xl p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Eye className="h-5 w-5 mr-2 text-blue-500" />
                Job Preview
              </h3>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900">
                    {formData.title || 'Job Title'}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {formData.company || 'Company Name'}
                  </p>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  {formData.location || 'Location'} • {formData.locationType}
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {formData.jobType}
                </div>
                
                {(formData.salary.min || formData.salary.max) && (
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {formData.salary.min && formData.salary.max
                      ? `${formData.salary.min} - ${formData.salary.max} ${formData.salary.currency}`
                      : `${formData.salary.min || formData.salary.max} ${formData.salary.currency}`
                    }
                  </div>
                )}
                
                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {formData.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                    {formData.skills.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
                        +{formData.skills.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              className="bg-white border border-gray-200 rounded-xl p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="space-y-3">
                <button
                  onClick={() => handleSubmit('publish')}
                  className="w-full bg-blue-500 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Publish Job
                </button>
                
                <button
                  onClick={() => handleSubmit('draft')}
                  className="w-full bg-gray-100 text-gray-700 font-medium py-2.5 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save as Draft
                </button>
                
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-start space-x-2 text-sm text-gray-600">
                    <AlertCircle className="h-4 w-4 mt-0.5 text-amber-500 flex-shrink-0" />
                    <p>Your job will be reviewed and published within 24 hours.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tips */}
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Zap className="h-5 w-5 mr-2 text-blue-500" />
                Pro Tips
              </h3>
              
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Include specific skills and technologies</li>
                <li>• Mention company culture and values</li>
                <li>• Be clear about remote work policies</li>
                <li>• Add salary range to attract quality candidates</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;