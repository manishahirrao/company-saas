import React from 'react';
import { Filter,Search } from 'lucide-react';
import { useState } from 'react';
import { DefaultSerializer } from 'node:v8';

const HiringAssist = () => {
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  
  const candidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Frontend Developer",
      experience: "5 years",
      skills: ["React", "TypeScript", "Node.js"],
      score: 92,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Full Stack Engineer",
      experience: "7 years",
      skills: ["Python", "Django", "React"],
      score: 88,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "DevOps Engineer",
      experience: "4 years",
      skills: ["AWS", "Docker", "Kubernetes"],
      score: 85,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Hire Assist AI</h1>
        <p className="text-gray-500">AI-powered candidate matching and screening</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option>All Roles</option>
                  <option>Frontend Developer</option>
                  <option>Backend Developer</option>
                  <option>Full Stack</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option>All Levels</option>
                  <option>0-2 years</option>
                  <option>3-5 years</option>
                  <option>5+ years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                <input
                  type="text"
                  placeholder="e.g. React, Python"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Top Candidates</h3>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Filter className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Search className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {candidates.map((candidate) => (
                <div key={candidate.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={candidate.avatar}
                        alt={candidate.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{candidate.name}</h4>
                        <p className="text-gray-600">{candidate.role}</p>
                        <p className="text-sm text-gray-500">{candidate.experience} experience</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm text-gray-500">AI Score:</span>
                        <span className="text-lg font-bold text-green-500">{candidate.score}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
                          View Profile
                        </button>
                        <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                          Interview
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HiringAssist;