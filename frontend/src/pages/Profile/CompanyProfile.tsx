
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Mail, Phone, Globe, MapPin, Upload, Users, Briefcase, CheckCircle } from 'lucide-react';


const defaultProfile = {
  companyName: 'Acme Corporation',
  website: 'acme.example.com',
  industry: 'Technology',
  companySize: '51-200',
  rolesToHire: 'Software Engineers, Product Managers, UX Designers',
  hiringType: 'full-time',
  description: 'Leading provider of innovative solutions for modern businesses.',
  location: 'San Francisco, CA',
  email: 'contact@acme.example.com',
  phone: '+1 (555) 123-4567',
  logo: '',
};

const CompanyProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(defaultProfile);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Simulated stats
  const stats = [
    { label: 'Active Job Posts', value: 5, icon: <Briefcase className="w-5 h-5 text-indigo-600" /> },
    { label: 'Applications', value: 142, icon: <Users className="w-5 h-5 text-indigo-600" /> },
    { label: 'Successful Hires', value: 8, icon: <CheckCircle className="w-5 h-5 text-green-600" /> },
  ];

  // Profile completion (simulate)
  const profileCompletion = Math.round(
    [profile.companyName, profile.website, profile.industry, profile.companySize, profile.rolesToHire, profile.hiringType, profile.description, profile.location, profile.email, profile.phone].filter(Boolean).length / 10 * 100
  );


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        setProfile(prev => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Here you could send data to an API
  };


  return (
    <div className="min-h-screen bg-background py-10 px-2 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header & Profile Completion */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Company Profile</h1>
            <p className="text-muted-foreground">Manage your company information and settings</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2 items-center">
              <span className="text-sm text-muted-foreground">Profile completion</span>
              <Progress value={profileCompletion} className="w-32 h-2" />
              <span className="text-sm font-medium text-foreground">{profileCompletion}%</span>
            </div>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} size="sm">Edit Profile</Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button type="submit" form="profile-form" size="sm" className="bg-primary">Save Changes</Button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Info */}
          <form id="profile-form" onSubmit={handleSubmit} className="md:col-span-2 space-y-6">
            <Card className="mt-6 bg-card text-card-foreground">
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Update your company details and description</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" name="companyName" value={profile.companyName} onChange={handleInputChange} disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input id="website" name="website" value={profile.website} onChange={handleInputChange} className="pl-10" disabled={!isEditing} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select onValueChange={(value) => handleSelectChange('industry', value)} value={profile.industry} disabled={!isEditing}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Retail">Retail</SelectItem>
                        <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companySize">Company Size</Label>
                    <Select onValueChange={(value) => handleSelectChange('companySize', value)} value={profile.companySize} disabled={!isEditing}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-500">201-500 employees</SelectItem>
                        <SelectItem value="501-1000">501-1000 employees</SelectItem>
                        <SelectItem value="1000+">1000+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input id="location" name="location" value={profile.location} onChange={handleInputChange} className="pl-10" disabled={!isEditing} />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea id="description" name="description" value={profile.description} onChange={handleInputChange} disabled={!isEditing} className="min-h-[100px]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rolesToHire">Roles You're Hiring For</Label>
                  <Textarea id="rolesToHire" name="rolesToHire" value={profile.rolesToHire} onChange={handleInputChange} disabled={!isEditing} className="min-h-[60px]" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Update your company's contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input id="email" name="email" value={profile.email} onChange={handleInputChange} className="pl-10" disabled={!isEditing} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input id="phone" name="phone" value={profile.phone} onChange={handleInputChange} className="pl-10" disabled={!isEditing} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6 bg-card text-card-foreground">
              <CardHeader>
                <CardTitle>Company Logo</CardTitle>
                <CardDescription>Upload your company logo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-6 border-2 border-dashed rounded-lg border-muted-foreground/25">
                  <Avatar className="h-28 w-28">
                    <AvatarImage src={logoPreview || profile.logo} alt={profile.companyName} />
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                      {profile.companyName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button variant="outline" className="w-full" asChild>
                      <Label htmlFor="logo-upload" className="cursor-pointer">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Logo
                      </Label>
                    </Button>
                  )}
                  <Input id="logo-upload" type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} disabled={!isEditing} />
                  <p className="text-xs text-muted-foreground text-center">PNG, JPG, GIF up to 2MB</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Stats</CardTitle>
                <CardDescription>Quick overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {stats.map(stat => (
                  <div key={stat.label} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <span className="flex items-center gap-2">{stat.icon}{stat.label}</span>
                    <span className="font-semibold text-lg">{stat.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;

