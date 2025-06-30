import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Cpu, 
  BarChart3, 
  CheckCircle2, 
  Bot, 
  Workflow, 
  Settings, 
  Zap, 
  Shield, 
  Clock,
  TrendingUp,
  Users,
  Target
} from 'lucide-react';

interface OperationItem {
  name: string;
  status: 'Running' | 'Completed' | 'Failed' | 'Pending';
  time: string;
  progress?: number;
}

interface MetricItem {
  metric: string;
  value: string;
  status: 'good' | 'warning' | 'critical';
  trend?: 'up' | 'down' | 'stable';
  change?: string;
}

const AIOperations = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [realTimeData, setRealTimeData] = useState({
    activeModels: 8,
    apiCalls: 2400,
    successRate: 98.5,
    responseTime: 120
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        activeModels: prev.activeModels + Math.floor(Math.random() * 3) - 1,
        apiCalls: prev.apiCalls + Math.floor(Math.random() * 50),
        successRate: Math.max(95, Math.min(100, prev.successRate + (Math.random() - 0.5) * 0.5)),
        responseTime: Math.max(80, Math.min(200, prev.responseTime + (Math.random() - 0.5) * 20))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const operations: OperationItem[] = [
    { name: "Content Generation", status: "Running", time: "2 min ago", progress: 75 },
    { name: "Resume Analysis", status: "Completed", time: "5 min ago", progress: 100 },
    { name: "SEO Optimization", status: "Running", time: "8 min ago", progress: 45 },
    { name: "Ad Copy Generation", status: "Completed", time: "15 min ago", progress: 100 },
    { name: "Data Processing", status: "Pending", time: "Just now", progress: 0 },
    { name: "Model Training", status: "Running", time: "1 hour ago", progress: 30 }
  ];

  const systemMetrics: MetricItem[] = [
    { metric: "CPU Usage", value: "45%", status: "good", trend: "stable", change: "+2%" },
    { metric: "Memory Usage", value: "62%", status: "good", trend: "up", change: "+5%" },
    { metric: "API Response Time", value: `${realTimeData.responseTime}ms`, status: "good", trend: "down", change: "-3%" },
    { metric: "Error Rate", value: "0.02%", status: "good", trend: "down", change: "-0.01%" },
    { metric: "Queue Length", value: "23", status: "warning", trend: "up", change: "+8" },
    { metric: "Active Connections", value: "1,247", status: "good", trend: "up", change: "+12%" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Running': return 'bg-blue-500';
      case 'Completed': return 'bg-green-500';
      case 'Failed': return 'bg-red-500';
      case 'Pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Running': return 'default';
      case 'Completed': return 'secondary';
      case 'Failed': return 'destructive';
      case 'Pending': return 'outline';
      default: return 'secondary';
    }
  };

  const getHealthStatus = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getTrendIcon = (trend: string | undefined) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default: return <div className="w-4 h-4 bg-gray-300 rounded-full" />;
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Pattern */}
      <div className="fixed inset-0 grid-pattern dark:grid-pattern opacity-30 pointer-events-none" />
      
      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <Badge variant="outline" className="mb-3 bg-background/80 backdrop-blur-sm border-primary/20 text-primary">
                <Bot className="w-4 h-4 mr-2" /> AI Operations Dashboard
              </Badge>
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                AI Operations
              </h1>
              <p className="text-lg text-foreground/80 mt-2">
                Monitor and manage your AI workflows in real-time
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-foreground/80">Live</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-border/30 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground/80">Active Models</p>
                  <p className="text-3xl font-bold text-foreground">{realTimeData.activeModels}</p>
                </div>
                <div className="p-3 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20">
                  <Cpu className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-border/30 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground/80">API Calls Today</p>
                  <p className="text-3xl font-bold text-foreground">{realTimeData.apiCalls.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-border/30 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground/80">Success Rate</p>
                  <p className="text-3xl font-bold text-foreground">{realTimeData.successRate.toFixed(1)}%</p>
                </div>
                <div className="p-3 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20">
                  <CheckCircle2 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-border/30 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground/80">Avg Response Time</p>
                  <p className="text-3xl font-bold text-foreground">{realTimeData.responseTime.toFixed(0)}ms</p>
                </div>
                <div className="p-3 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-background/50 backdrop-blur-sm">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="operations">Operations</TabsTrigger>
              <TabsTrigger value="system">System Health</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Operations */}
                <Card className="bg-background/50 backdrop-blur-sm border-border/30">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Workflow className="w-5 h-5 mr-2 text-purple-600" />
                      Recent Operations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {operations.slice(0, 4).map((op, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(op.status)}`} />
                            <div>
                              <p className="font-medium">{op.name}</p>
                              <p className="text-sm text-foreground/70">{op.time}</p>
                            </div>
                          </div>
                          <Badge variant={getStatusBadgeVariant(op.status)}>
                            {op.status}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* System Performance */}
                <Card className="bg-background/50 backdrop-blur-sm border-border/30">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-green-600" />
                      System Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">CPU Usage</span>
                          <span className="text-sm text-foreground/70">45%</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Memory Usage</span>
                          <span className="text-sm text-foreground/70">62%</span>
                        </div>
                        <Progress value={62} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Network I/O</span>
                          <span className="text-sm text-foreground/70">38%</span>
                        </div>
                        <Progress value={38} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Disk Usage</span>
                          <span className="text-sm text-foreground/70">71%</span>
                        </div>
                        <Progress value={71} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="operations" className="space-y-6">
              <Card className="bg-background/50 backdrop-blur-sm border-border/30">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bot className="w-5 h-5 mr-2 text-blue-600" />
                    All Operations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {operations.map((op, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(op.status)}`} />
                          <div>
                            <p className="font-medium">{op.name}</p>
                            <p className="text-sm text-foreground/70">{op.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          {op.progress !== undefined && (
                            <div className="w-24">
                              <Progress value={op.progress} className="h-2" />
                            </div>
                          )}
                          <Badge variant={getStatusBadgeVariant(op.status)}>
                            {op.status}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="system" className="space-y-6">
              <Card className="bg-background/50 backdrop-blur-sm border-border/30">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-orange-600" />
                    System Health Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {systemMetrics.map((metric, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-sm">{metric.metric}</p>
                          {getTrendIcon(metric.trend)}
                        </div>
                        <div className="flex items-center justify-between">
                          <p className={`text-2xl font-bold ${getHealthStatus(metric.status)}`}>
                            {metric.value}
                          </p>
                          {metric.change && (
                            <span className="text-sm text-foreground/70">{metric.change}</span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default AIOperations;
