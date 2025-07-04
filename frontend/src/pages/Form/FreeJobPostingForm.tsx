import React, { useState, useEffect } from 'react';

declare module 'react' {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}

interface FormData {
  companyName: string;
  jobType: string;
  jobTitle: string;
  department: string;
  experienceLevel: string;
  roleDescription: string;
  budgetRange: string;
  location: string;
  hiringPriority: string;
  contactPerson: string;
  contactEmail: string;
  additionalRequirements: string;
}

const HRHiringForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    jobType: '',
    jobTitle: '',
    department: '',
    experienceLevel: '',
    roleDescription: '',
    budgetRange: '',
    location: '',
    hiringPriority: '',
    contactPerson: '',
    contactEmail: '',
    additionalRequirements: '',
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      
      // Reset form after submission
      setTimeout(() => {
        setSubmitStatus('idle');
        setFormData({
          companyName: '',
          jobType: '',
          jobTitle: '',
          department: '',
          experienceLevel: '',
          roleDescription: '',
          budgetRange: '',
          location: '',
          hiringPriority: '',
          contactPerson: '',
          contactEmail: '',
          additionalRequirements: '',
        });
      }, 3000);
    }, 1000);
  };

  // Particle animation effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const particles = document.querySelectorAll('.particle');
      particles.forEach(particle => {
        const speed = Math.random() * 0.5;
        const x = (e.clientX * speed) / 100;
        const y = (e.clientY * speed) / 100;
        
        if (particle instanceof HTMLElement) {
          particle.style.transform = `translate(${x}px, ${y}px)`;
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen relative" style={{
      fontFamily: "'Arial', sans-serif",
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f1419 100%)',
      color: 'white',
      overflowX: 'hidden'
    }}>
      {/* Grid Background */}
      <div className="grid-background absolute top-0 left-0 w-full h-full pointer-events-none" style={{
        backgroundImage: 
          'linear-gradient(rgba(64, 224, 208, 0.1) 1px, transparent 1px), ' +
          'linear-gradient(90deg, rgba(64, 224, 208, 0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      {/* Floating Particles */}
      <div className="floating-particles absolute w-full h-full pointer-events-none overflow-hidden">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="particle absolute w-1 h-1 rounded-full" style={{
            background: 'linear-gradient(45deg, #3a86ff, #06ffa5)',
            left: `${(i + 1) * 10}%`,
            animation: 'float 6s ease-in-out infinite',
            animationDelay: `${i * 0.5}s`
          }}></div>
        ))}
      </div>

      {/* Main Container */}
      <div className="container relative max-w-md mx-auto px-5 py-10 flex flex-col justify-center" style={{ minHeight: '100vh' }}>
        {/* Header */}
        <div className="header text-center mb-10">
          <div className="logo flex items-center justify-center mb-5">
            <div className="logo-icon w-14 h-14 rounded-full mr-4 flex items-center justify-center relative" style={{
              background: 'linear-gradient(45deg, #ff006e, #8338ec, #3a86ff, #06ffa5)',
              animation: 'rotate 10s linear infinite'
            }}>
              <div className="absolute w-7 h-7 rounded-full" style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.1) 100%)'
              }}></div>
            </div>
            <div className="logo-text text-3xl font-bold" style={{
              background: 'linear-gradient(45deg, #ff006e, #8338ec, #3a86ff, #06ffa5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>VORTEX</div>
          </div>
          <div className="subtitle text-gray-400 mb-2 text-sm uppercase tracking-wider">AI Operations</div>
          <div className="enterprise-badge inline-block px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider" style={{
            background: 'linear-gradient(45deg, #3a86ff, #06ffa5)'
          }}>HR Outsourcing</div>
        </div>

        {/* Heading */}
        <h1 className="main-heading text-2xl font-bold mb-5 text-center">
          Let Vortex AI find your <span className="highlight" style={{
            background: 'linear-gradient(45deg, #3a86ff, #06ffa5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>perfect talent</span> faster than ever
        </h1>

        {/* Description */}
        <p className="description text-gray-300 mb-8 text-center leading-relaxed">
          Fill out your hiring requirements and let our AI-powered recruitment system connect you with the best candidates.
        </p>

        {/* Form Container */}
        <div className="form-container rounded-xl p-6 mb-10" style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
        }}>
          <form id="hiringForm" onSubmit={handleSubmit}>
            {/* Company Name */}
            <div className="form-group mb-5">
              <label className="form-label block text-gray-200 mb-2 text-sm font-medium">Company Name</label>
              <input 
                type="text" 
                name="companyName"
                placeholder="Enter your company name" 
                className="w-full px-5 py-4 rounded-xl bg-gray-800 bg-opacity-50 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:bg-gray-700 transition-all duration-300"
                value={formData.companyName}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Job Type */}
            <div className="form-group mb-5">
              <label className="form-label block text-gray-200 mb-2 text-sm font-medium">Job Type</label>
              <div className="job-type-group flex gap-3">
                {['intern', 'freelancer', 'fulltime'].map((type) => (
                  <div key={type} className="job-type-option flex-1">
                    <input 
                      type="radio" 
                      id={type}
                      name="jobType" 
                      value={type}
                      checked={formData.jobType === type}
                      onChange={handleRadioChange}
                      className="hidden"
                      required
                    />
                    <label 
                      htmlFor={type}
                      className={`block px-4 py-3 rounded-xl text-center font-medium cursor-pointer transition-all duration-300 ${
                        formData.jobType === type 
                          ? 'bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-lg'
                          : 'bg-gray-800 bg-opacity-50 border border-gray-700 hover:bg-gray-700'
                      }`}
                    >
                      {type === 'intern' ? 'Intern' : type === 'freelancer' ? 'Freelancer' : 'Full Time'}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Job Title */}
            <div className="form-group mb-5">
              <label className="form-label block text-gray-200 mb-2 text-sm font-medium">Job Title</label>
              <input 
                type="text" 
                name="jobTitle"
                placeholder="e.g. Senior Software Engineer" 
                className="w-full px-5 py-4 rounded-xl bg-gray-800 bg-opacity-50 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:bg-gray-700 transition-all duration-300"
                value={formData.jobTitle}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Department and Experience Level */}
            <div className="form-row flex gap-3 mb-5">
              <div className="form-group flex-1">
                <label className="form-label block text-gray-200 mb-2 text-sm font-medium">Department</label>
                <select 
                  name="department"
                  className="w-full px-5 py-4 rounded-xl bg-gray-800 bg-opacity-50 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:bg-gray-700 transition-all duration-300"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="engineering">Engineering</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                  <option value="hr">Human Resources</option>
                  <option value="finance">Finance</option>
                  <option value="operations">Operations</option>
                  <option value="product">Product</option>
                  <option value="customer-success">Customer Success</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group flex-1">
                <label className="form-label block text-gray-200 mb-2 text-sm font-medium">Experience Level</label>
                <select 
                  name="experienceLevel"
                  className="w-full px-5 py-4 rounded-xl bg-gray-800 bg-opacity-50 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:bg-gray-700 transition-all duration-300"
                  value={formData.experienceLevel}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Level</option>
                  <option value="entry">Entry Level (0-2 years)</option>
                  <option value="mid">Mid Level (3-5 years)</option>
                  <option value="senior">Senior Level (6-10 years)</option>
                  <option value="lead">Lead/Principal (10+ years)</option>
                </select>
              </div>
            </div>

            {/* Role Description */}
            <div className="form-group mb-5">
              <label className="form-label block text-gray-200 mb-2 text-sm font-medium">Role & Responsibilities</label>
              <textarea 
                name="roleDescription"
                placeholder="Describe the key responsibilities, required skills, and qualifications for this role..." 
                className="w-full px-5 py-4 rounded-xl bg-gray-800 bg-opacity-50 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:bg-gray-700 transition-all duration-300 min-h-[120px]"
                value={formData.roleDescription}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            {/* Budget and Location */}
            <div className="form-row flex gap-3 mb-5">
              <div className="form-group flex-1">
                <label className="form-label block text-gray-200 mb-2 text-sm font-medium">Budget Range</label>
                <select 
                  name="budgetRange"
                  className="w-full px-5 py-4 rounded-xl bg-gray-800 bg-opacity-50 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:bg-gray-700 transition-all duration-300"
                  value={formData.budgetRange}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Budget</option>
                  <option value="under-50k">Under $50K</option>
                  <option value="50k-100k">$50K - $100K</option>
                  <option value="100k-150k">$100K - $150K</option>
                  <option value="150k-200k">$150K - $200K</option>
                  <option value="200k-plus">$200K+</option>
                  <option value="negotiable">Negotiable</option>
                </select>
              </div>
              <div className="form-group flex-1">
                <label className="form-label block text-gray-200 mb-2 text-sm font-medium">Location</label>
                <select 
                  name="location"
                  className="w-full px-5 py-4 rounded-xl bg-gray-800 bg-opacity-50 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:bg-gray-700 transition-all duration-300"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Location</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="onsite">On-site</option>
                </select>
              </div>
            </div>

            {/* Hiring Priority */}
            <div className="form-group mb-5">
              <label className="form-label block text-gray-200 mb-2 text-sm font-medium">Hiring Priority</label>
              <div className="priority-group flex gap-2">
                {['urgent', 'high', 'medium', 'low'].map((priority) => (
                  <div key={priority} className="priority-option flex-1">
                    <input 
                      type="radio" 
                      id={priority}
                      name="hiringPriority" 
                      value={priority}
                      checked={formData.hiringPriority === priority}
                      onChange={handleRadioChange}
                      className="hidden"
                      required
                    />
                    <label 
                      htmlFor={priority}
                      className={`block px-3 py-2 rounded-lg text-center text-sm font-medium cursor-pointer transition-all duration-300 ${
                        formData.hiringPriority === priority 
                          ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white'
                          : 'bg-gray-800 bg-opacity-50 border border-gray-700 hover:bg-gray-700'
                      }`}
                    >
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="form-row flex gap-3 mb-5">
              <div className="form-group flex-1">
                <label className="form-label block text-gray-200 mb-2 text-sm font-medium">Contact Person</label>
                <input 
                  type="text" 
                  name="contactPerson"
                  placeholder="Hiring Manager Name" 
                  className="w-full px-5 py-4 rounded-xl bg-gray-800 bg-opacity-50 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:bg-gray-700 transition-all duration-300"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group flex-1">
                <label className="form-label block text-gray-200 mb-2 text-sm font-medium">Contact Email</label>
                <input 
                  type="email" 
                  name="contactEmail"
                  placeholder="hiring@company.com" 
                  className="w-full px-5 py-4 rounded-xl bg-gray-800 bg-opacity-50 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:bg-gray-700 transition-all duration-300"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Additional Requirements */}
            <div className="form-group mb-5">
              <label className="form-label block text-gray-200 mb-2 text-sm font-medium">Additional Requirements (Optional)</label>
              <textarea 
                name="additionalRequirements"
                placeholder="Any specific requirements, benefits, or additional information about the role..." 
                className="w-full px-5 py-4 rounded-xl bg-gray-800 bg-opacity-50 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:bg-gray-700 transition-all duration-300 min-h-[100px]"
                value={formData.additionalRequirements}
                onChange={handleInputChange}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="submit-btn w-full px-6 py-4 rounded-full font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-lg"
              style={{
                background: submitStatus === 'success' 
                  ? 'linear-gradient(45deg, #06ffa5, #3a86ff)'
                  : 'linear-gradient(45deg, #3a86ff, #06ffa5)'
              }}
              disabled={submitStatus === 'submitting'}
            >
              {submitStatus === 'submitting' ? 'Submitting...' : 
               submitStatus === 'success' ? 'Request Submitted!' : 
               'Submit Hiring Request'}
            </button>
          </form>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(100vh) scale(0); }
          50% { transform: translateY(-10px) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default HRHiringForm;