'use client';

import React, { useState } from 'react';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/common/navbar';
import { Footer } from '@/components/common/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/lib/context/auth-context';
import { mockSkills, mockCategories } from '@/lib/mock-data';
import { ArrowRight, ChevronRight, Check } from 'lucide-react';
import { toast } from 'sonner';

type SignupRole = 'user' | 'volunteer' | 'ngo';

const STEPS = [
  { id: 1, label: 'Choose Role' },
  { id: 2, label: 'Basic Info' },
  { id: 3, label: 'Details' },
  { id: 4, label: 'Complete' },
];

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<SignupRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signup } = useAuth();

  // Common fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  // Volunteer specific
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [availability, setAvailability] = useState('weekends');
  const [certificateUrl, setCertificateUrl] = useState('');
  const [preferredDomains, setPreferredDomains] = useState<string[]>([]);

  // NGO specific
  const [orgName, setOrgName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [socialHandles, setSocialHandles] = useState('');

  const handleRoleSelect = (role: SignupRole) => {
    setSelectedRole(role);
    setCurrentStep(2);
  };

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleDomainToggle = (domain: string, isVolunteer = false) => {
    if (isVolunteer) {
      setPreferredDomains((prev) =>
        prev.includes(domain) ? prev.filter((d) => d !== domain) : [...prev, domain]
      );
    } else {
      setSelectedDomains((prev) =>
        prev.includes(domain) ? prev.filter((d) => d !== domain) : [...prev, domain]
      );
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameToCheck = selectedRole === 'ngo' ? contactPerson : name;
    
    if (!email || !nameToCheck || !phone || !city || !state) {
      toast.error('Please fill in all basic fields');
      return;
    }

    if (!password || password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (selectedRole === 'volunteer' && selectedSkills.length === 0) {
      toast.error('Please select at least one skill');
      return;
    }

    if (selectedRole === 'ngo' && !orgName) {
      toast.error('Please enter organization name');
      return;
    }

    setIsLoading(true);
    try {
      await signup({
        name: selectedRole === 'ngo' ? contactPerson : name,
        email,
        phone,
        city,
        state,
      }, selectedRole!);

      toast.success('Account created successfully!');
      
      const pathMap: { [key: string]: string } = {
        'user': '/user-dashboard',
        'volunteer': '/volunteer-dashboard',
        'ngo': '/ngo-dashboard',
      };
      
      router.push(pathMap[selectedRole!]);
    } catch (err: any) {
      toast.error(err.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          <Card className="p-8">
            {/* Progress Stepper */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {STEPS.map((step, idx) => (
                  <div
                    key={step.id}
                    className="flex items-center flex-1"
                  >
                    <div
                      className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center font-semibold text-xs transition-all ${
                        step.id < currentStep
                          ? 'bg-primary text-primary-foreground'
                          : step.id === currentStep
                          ? 'bg-primary text-primary-foreground ring-4 ring-primary/30'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {step.id < currentStep ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        step.id
                      )}
                    </div>
                    {idx < STEPS.length - 1 && (
                      <div
                        className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                          step.id < currentStep ? 'bg-primary' : 'bg-muted'
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-foreground text-center">
                {STEPS[currentStep - 1].label}
              </p>
            </div>

            {/* Step 1: Role Selection */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Choose Your Role
                  </h2>
                  <p className="text-muted-foreground">
                    Select how you want to participate
                  </p>
                </div>

                <div className="grid gap-4">
                  {[
                    {
                      value: 'user',
                      label: 'Community Member',
                      description: 'Report issues and explore community needs',
                    },
                    {
                      value: 'volunteer',
                      label: 'Volunteer',
                      description: 'Contribute skills and help with initiatives',
                    },
                    {
                      value: 'ngo',
                      label: 'NGO/Organization',
                      description: 'Create tasks and manage volunteers',
                    },
                  ].map((role) => (
                    <button
                      key={role.value}
                      onClick={() => handleRoleSelect(role.value as SignupRole)}
                      className="p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-accent/50 transition-all text-left group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition">
                            {role.label}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {role.description}
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition" />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Basic Info */}
            {currentStep === 2 && selectedRole && (
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {selectedRole === 'ngo' ? 'Organization Info' : 'Basic Information'}
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  {selectedRole === 'ngo' ? (
                    <>
                      <div className="col-span-2 space-y-2">
                        <Label>Organization Name</Label>
                        <Input
                          placeholder="Your NGO name"
                          value={orgName}
                          onChange={(e) => setOrgName(e.target.value)}
                        />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label>Contact Person Name</Label>
                        <Input
                          placeholder="Your name"
                          value={contactPerson}
                          onChange={(e) => setContactPerson(e.target.value)}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="col-span-2 space-y-2">
                      <Label>Full Name</Label>
                      <Input
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  )}

                  <div className="col-span-2 space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      placeholder="+91 XXXXX XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input
                      placeholder="Mumbai"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>

                  <div className="col-span-2 space-y-2">
                    <Label>State</Label>
                    <Input
                      placeholder="Maharashtra"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>

                  <div className="col-span-2 space-y-2">
                    <Label>Password</Label>
                    <Input
                      type="password"
                      placeholder="Create a password (min 6 characters)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="col-span-2 space-y-2">
                    <Label>Confirm Password</Label>
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-border">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    disabled={!name && selectedRole !== 'ngo' || (selectedRole === 'ngo' && (!orgName || !contactPerson))}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.form>
            )}

            {/* Step 3: Role-Specific Details */}
            {currentStep === 3 && selectedRole && (
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {selectedRole === 'volunteer' 
                    ? 'Your Skills & Availability' 
                    : selectedRole === 'ngo' 
                    ? 'Organization Details' 
                    : 'Preferences'}
                </h2>

                {selectedRole === 'user' && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      As a community member, you can report issues and explore community needs.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      No additional details are required. Click Review to continue.
                    </p>
                  </div>
                )}

                {selectedRole === 'volunteer' && (
                  <>
                    <div className="space-y-3">
                      <Label>Select Your Skills</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {mockSkills.slice(0, 12).map((skill) => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => handleSkillToggle(skill)}
                            className={`px-3 py-2 rounded-lg text-sm transition-all ${
                              selectedSkills.includes(skill)
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-foreground hover:bg-muted/80'
                            }`}
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Availability</Label>
                      <select
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                      >
                        <option value="weekdays">Weekdays</option>
                        <option value="weekends">Weekends</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <Label>Preferred Domains</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {mockCategories.map((domain) => (
                          <button
                            key={domain}
                            type="button"
                            onClick={() => handleDomainToggle(domain, true)}
                            className={`px-3 py-2 rounded-lg text-sm transition-all ${
                              preferredDomains.includes(domain)
                                ? 'bg-accent text-accent-foreground'
                                : 'bg-muted text-foreground hover:bg-muted/80'
                            }`}
                          >
                            {domain}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {selectedRole === 'ngo' && (
                  <>
                    <div className="space-y-2">
                      <Label>Organization Description</Label>
                      <Textarea
                        placeholder="Tell us about your organization..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                      />
                    </div>

                    <div className="space-y-3">
                      <Label>Domains of Work</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {mockCategories.map((domain) => (
                          <button
                            key={domain}
                            type="button"
                            onClick={() => handleDomainToggle(domain)}
                            className={`px-3 py-2 rounded-lg text-sm transition-all ${
                              selectedDomains.includes(domain)
                                ? 'bg-accent text-accent-foreground'
                                : 'bg-muted text-foreground hover:bg-muted/80'
                            }`}
                          >
                            {domain}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Social Media Links (Optional)</Label>
                      <Input
                        placeholder="Twitter, Facebook, Instagram URLs (comma separated)"
                        value={socialHandles}
                        onChange={(e) => setSocialHandles(e.target.value)}
                      />
                    </div>
                  </>
                )}

                <div className="flex gap-4 pt-4 border-t border-border">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Review
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.form>
            )}

            {/* Step 4: Review & Complete */}
            {currentStep === 4 && selectedRole && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Review Your Information
                </h2>

                <div className="space-y-4 bg-accent/30 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Name</p>
                      <p className="font-medium text-foreground">
                        {selectedRole === 'ngo' ? contactPerson : name}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">{email}</p>
                    </div>
                    {selectedRole === 'ngo' && (
                      <div className="col-span-2">
                        <p className="text-xs text-muted-foreground">Organization</p>
                        <p className="font-medium text-foreground">{orgName}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-lg border-2 border-dashed border-border">
                  <p className="text-xs text-muted-foreground mb-2">Role</p>
                  <p className="font-semibold text-foreground capitalize">
                    {selectedRole === 'user'
                      ? 'Community Member'
                      : selectedRole === 'volunteer'
                      ? 'Volunteer'
                      : 'NGO'}
                  </p>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    size="lg"
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>

                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link href="/login" className="text-primary font-medium hover:underline">
                    Sign in
                  </Link>
                </div>

                <div className="p-3 rounded-lg bg-accent/50 border border-border">
                  <p className="text-xs text-muted-foreground text-center">
                    By creating an account, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

