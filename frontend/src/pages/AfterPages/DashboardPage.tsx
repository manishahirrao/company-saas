import React from "react";
import { BarChart3, FileText, CheckCircle2, Users, Zap, Clock, ArrowRight, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";

const stats = [
  { name: 'Content Generated', value: '2.5k Words', change: '+20%', changeType: 'positive' },
  { name: 'Active Projects', value: '12', change: '+2', changeType: 'positive' },
  { name: 'Candidates Processed', value: '145', change: '+30', changeType: 'positive' },
  { name: 'API Calls', value: '1,500', change: '+5%', changeType: 'positive' },
];

const recentActivity = [
  { id: 1, title: 'New Blog Post Generated: "The Future of AI"', time: '15 min ago', icon: <FileText className="h-5 w-5 text-blue-500" /> },
  { id: 2, title: 'Hiring Assist: 5 new candidates for "Software Engineer"', time: '1 hour ago', icon: <Users className="h-5 w-5 text-green-500" /> },
  { id: 3, title: 'Custom LLM training completed', time: '4 hours ago', icon: <CheckCircle2 className="h-5 w-5 text-purple-500" /> },
  { id: 4, title: 'New API Key created for "Marketing Site"', time: '1 day ago', icon: <AlertCircle className="h-5 w-5 text-amber-500" /> },
];

const quickActions = [
  { id: 1, title: 'Create Blog Post', icon: <FileText className="h-6 w-6" />, color: 'bg-blue-50 text-blue-600 hover:bg-blue-100' },
  { id: 2, title: 'Analyze Candidates', icon: <Users className="h-6 w-6" />, color: 'bg-green-50 text-green-600 hover:bg-green-100' },
  { id: 3, 'title': 'Manage LLM', icon: <Zap className="h-6 w-6" />, color: 'bg-purple-50 text-purple-600 hover:bg-purple-100' },
  { id: 4, title: 'View API Keys', icon: <Clock className="h-6 w-6" />, color: 'bg-amber-50 text-amber-600 hover:bg-amber-100' },
];

const DashboardContent = () => (
  <>
    <header className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p className="text-gray-500">Welcome back, here's your performance overview.</p>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div>
            <p className="text-sm font-medium text-gray-500">{stat.name}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
          </div>
          <div className={`mt-4 text-sm font-semibold ${stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
            {stat.change} vs last month
          </div>
        </motion.div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              className={`flex items-center w-full p-3 rounded-lg transition-colors ${action.color}`}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-opacity-20 mr-3">
                {action.icon}
              </div>
              <span className="font-medium">{action.title}</span>
              <ArrowRight className="ml-auto h-4 w-4 opacity-70" />
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2 space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="bg-white border border-gray-200 rounded-xl">
            <ul className="divide-y divide-gray-200">
              {recentActivity.map((activity) => (
                <li key={activity.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="p-2 bg-gray-100 rounded-full mr-4">
                      {activity.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="px-6 py-3 text-center border-t border-gray-200">
              <button className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">
                View all activity
              </button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Overview</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-gray-500 mb-6">Your content's performance over the last 30 days.</p>
            <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <p className="text-gray-500">Interactive chart coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

const DashboardPage = () => (
  <DashboardLayout>
    <DashboardContent />
  </DashboardLayout>
);

export default DashboardPage;