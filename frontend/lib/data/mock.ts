// Mock data for the Geo-Spatial Volunteer Coordination Platform

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  skills: string[];
  availability: string;
  certificates: string[];
  preferredDomains: string[];
  matchScore?: number;
  acceptedTasks?: number;
  completedTasks?: number;
}

export interface NGO {
  id: string;
  organizationName: string;
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  description: string;
  verified: boolean;
  socialHandles: Record<string, string>;
  domainsOfWork: string[];
  tasksPosted?: number;
}

export interface CommunityNeed {
  id: string;
  title: string;
  description: string;
  category: string;
  urgency: "low" | "medium" | "high" | "critical";
  location: string;
  city: string;
  state: string;
  pincode: string;
  sourceType: "citizen" | "ngo" | "government";
  status: "open" | "adopted" | "resolved";
  coordinates?: { lat: number; lng: number };
  createdAt: string;
  adoptedBy?: string;
}

export interface Task {
  id: string;
  ngoId: string;
  ngoName: string;
  title: string;
  description: string;
  category: string;
  requiredSkills: string[];
  volunteersNeeded: number;
  acceptedCount: number;
  deadline: string;
  location: string;
  city: string;
  state: string;
  urgency: "low" | "medium" | "high" | "critical";
  status: "open" | "applied" | "accepted" | "filled" | "completed";
  createdAt: string;
  matchScore?: number;
  appliedCount?: number;
}

export interface Application {
  id: string;
  taskId: string;
  volunteerId: string;
  volunteerName: string;
  volunteerSkills: string[];
  volunteerAvailability: string;
  status: "applied" | "accepted" | "rejected" | "completed";
  appliedAt: string;
  matchScore: number;
}

// Sample Volunteers
export const mockVolunteers: Volunteer[] = [
  {
    id: "vol-1",
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91-9876543210",
    city: "Bangalore",
    state: "Karnataka",
    skills: ["teaching", "childcare", "english", "hindi"],
    availability: "weekends",
    certificates: ["TESOL", "Child Care Certification"],
    preferredDomains: ["education", "childcare"],
  },
  {
    id: "vol-2",
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "+91-9876543211",
    city: "Bangalore",
    state: "Karnataka",
    skills: ["medical", "nursing", "first-aid", "counseling"],
    availability: "evenings",
    certificates: ["Registered Nurse", "First Aid"],
    preferredDomains: ["healthcare", "disaster-relief"],
  },
  {
    id: "vol-3",
    name: "Anjali Patel",
    email: "anjali@example.com",
    phone: "+91-9876543212",
    city: "Bangalore",
    state: "Karnataka",
    skills: ["coding", "web-development", "data-analysis", "python"],
    availability: "flexible",
    certificates: ["Full Stack Developer"],
    preferredDomains: ["technology", "education"],
  },
  {
    id: "vol-4",
    name: "Vikram Singh",
    email: "vikram@example.com",
    phone: "+91-9876543213",
    city: "Bangalore",
    state: "Karnataka",
    skills: ["construction", "plumbing", "carpentry", "electrical"],
    availability: "weekends",
    certificates: ["Construction Safety"],
    preferredDomains: ["infrastructure", "sanitation"],
  },
  {
    id: "vol-5",
    name: "Deepa Menon",
    email: "deepa@example.com",
    phone: "+91-9876543214",
    city: "Bangalore",
    state: "Karnataka",
    skills: ["cooking", "nutrition", "food-safety", "social-work"],
    availability: "mornings",
    certificates: ["Nutritionist", "Food Safety Handler"],
    preferredDomains: ["food-security", "childcare"],
  },
];

// Sample NGOs
export const mockNGOs: NGO[] = [
  {
    id: "ngo-1",
    organizationName: "HelpIndia Foundation",
    contactPerson: "Amrita Bhat",
    email: "contact@helpindia.org",
    phone: "+91-8765432100",
    city: "Bangalore",
    state: "Karnataka",
    description: "Working towards education and childcare in underserved communities",
    verified: true,
    socialHandles: { twitter: "@helpindia", facebook: "HelpIndiaFdn" },
    domainsOfWork: ["education", "childcare"],
    tasksPosted: 12,
  },
  {
    id: "ngo-2",
    organizationName: "Health Across Borders",
    contactPerson: "Dr. Rajesh Mehta",
    email: "contact@healthacrossbordera.org",
    phone: "+91-8765432101",
    city: "Bangalore",
    state: "Karnataka",
    description: "Providing healthcare services to rural communities",
    verified: true,
    socialHandles: { twitter: "@health4all", facebook: "HealthAcrossBorders" },
    domainsOfWork: ["healthcare", "disaster-relief"],
    tasksPosted: 8,
  },
  {
    id: "ngo-3",
    organizationName: "Tech for Good",
    contactPerson: "Arjun Desai",
    email: "contact@techforgood.org",
    phone: "+91-8765432102",
    city: "Bangalore",
    state: "Karnataka",
    description: "Empowering underprivileged communities through technology",
    verified: true,
    socialHandles: { twitter: "@techforgood", facebook: "TechForGood" },
    domainsOfWork: ["technology", "education"],
    tasksPosted: 15,
  },
  {
    id: "ngo-4",
    organizationName: "Build Better Futures",
    contactPerson: "Neha Singh",
    email: "contact@buildsbf.org",
    phone: "+91-8765432103",
    city: "Bangalore",
    state: "Karnataka",
    description: "Improving infrastructure in underserved areas",
    verified: false,
    socialHandles: { twitter: "@buildbetter", facebook: "BuildBetterFutures" },
    domainsOfWork: ["infrastructure", "sanitation"],
    tasksPosted: 6,
  },
];

// Sample Community Needs
export const mockCommunityNeeds: CommunityNeed[] = [
  {
    id: "need-1",
    title: "School in Slum Area Needs Educational Support",
    description: "Local school requires volunteer teachers for English and Mathematics",
    category: "education",
    urgency: "high",
    location: "Chikkabanawara, Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560064",
    sourceType: "citizen",
    status: "open",
    coordinates: { lat: 13.1939, lng: 77.7597 },
    createdAt: "2026-03-20",
  },
  {
    id: "need-2",
    title: "Medical Camp Required in Rural Area",
    description: "Rural village needs free medical check-up camp for residents",
    category: "healthcare",
    urgency: "critical",
    location: "Kanakapura, Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "562112",
    sourceType: "ngo",
    status: "open",
    coordinates: { lat: 12.8556, lng: 77.3257 },
    createdAt: "2026-03-18",
  },
  {
    id: "need-3",
    title: "Sanitation Drive in Shanty Town",
    description: "Community needs help organizing waste management and cleaning",
    category: "sanitation",
    urgency: "medium",
    location: "Yeshwanthpur, Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560022",
    sourceType: "citizen",
    status: "adopted",
    coordinates: { lat: 13.3589, lng: 77.5885 },
    createdAt: "2026-03-15",
    adoptedBy: "ngo-4",
  },
  {
    id: "need-4",
    title: "Food Distribution in Slum Settlement",
    description: "Support needed for food distribution to underprivileged families",
    category: "food-security",
    urgency: "high",
    location: "Koramangala, Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560034",
    sourceType: "ngo",
    status: "open",
    coordinates: { lat: 12.9352, lng: 77.6245 },
    createdAt: "2026-03-19",
  },
  {
    id: "need-5",
    title: "Disaster Relief Support Needed",
    description: "Emergency support required for flood-affected community",
    category: "disaster-relief",
    urgency: "critical",
    location: "Whitefield, Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560066",
    sourceType: "government",
    status: "open",
    coordinates: { lat: 12.9698, lng: 77.7499 },
    createdAt: "2026-03-21",
  },
];

// Sample Tasks
export const mockTasks: Task[] = [
  {
    id: "task-1",
    ngoId: "ngo-1",
    ngoName: "HelpIndia Foundation",
    title: "English Language Tutoring for School Children",
    description: "Teach English to 50 students at local school, 3 days a week",
    category: "education",
    requiredSkills: ["teaching", "english", "childcare"],
    volunteersNeeded: 3,
    acceptedCount: 1,
    deadline: "2026-04-30",
    location: "Chikkabanawara, Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    urgency: "high",
    status: "open",
    createdAt: "2026-03-10",
    matchScore: 92,
  },
  {
    id: "task-2",
    ngoId: "ngo-2",
    ngoName: "Health Across Borders",
    title: "Organize Health Camp at Rural Village",
    description: "Conduct free medical check-up camp in Kanakapura area",
    category: "healthcare",
    requiredSkills: ["medical", "first-aid", "nursing"],
    volunteersNeeded: 5,
    acceptedCount: 2,
    deadline: "2026-04-15",
    location: "Kanakapura, Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    urgency: "critical",
    status: "open",
    createdAt: "2026-03-12",
    matchScore: 88,
  },
  {
    id: "task-3",
    ngoId: "ngo-3",
    ngoName: "Tech for Good",
    title: "Digital Literacy Training Program",
    description: "Teach basic computer skills to underprivileged youth",
    category: "technology",
    requiredSkills: ["coding", "teaching", "patience"],
    volunteersNeeded: 4,
    acceptedCount: 3,
    deadline: "2026-05-10",
    location: "Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    urgency: "medium",
    status: "open",
    createdAt: "2026-03-05",
    matchScore: 85,
  },
  {
    id: "task-4",
    ngoId: "ngo-4",
    ngoName: "Build Better Futures",
    title: "Sanitation Infrastructure Development",
    description: "Help build toilets and water systems in slum area",
    category: "sanitation",
    requiredSkills: ["construction", "plumbing", "carpentry"],
    volunteersNeeded: 6,
    acceptedCount: 2,
    deadline: "2026-05-20",
    location: "Yeshwanthpur, Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    urgency: "high",
    status: "open",
    createdAt: "2026-03-08",
    matchScore: 90,
  },
  {
    id: "task-5",
    ngoId: "ngo-1",
    ngoName: "HelpIndia Foundation",
    title: "Childcare Support Program",
    description: "Support childcare activities and meal preparation",
    category: "childcare",
    requiredSkills: ["childcare", "cooking", "social-work"],
    volunteersNeeded: 2,
    acceptedCount: 2,
    deadline: "2026-04-25",
    location: "Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    urgency: "medium",
    status: "filled",
    createdAt: "2026-03-03",
  },
];

// Sample Applications
export const mockApplications: Application[] = [
  {
    id: "app-1",
    taskId: "task-1",
    volunteerId: "vol-1",
    volunteerName: "Priya Sharma",
    volunteerSkills: ["teaching", "childcare", "english", "hindi"],
    volunteerAvailability: "weekends",
    status: "accepted",
    appliedAt: "2026-03-15",
    matchScore: 92,
  },
  {
    id: "app-2",
    taskId: "task-2",
    volunteerId: "vol-2",
    volunteerName: "Rajesh Kumar",
    volunteerSkills: ["medical", "nursing", "first-aid", "counseling"],
    volunteerAvailability: "evenings",
    status: "accepted",
    appliedAt: "2026-03-16",
    matchScore: 94,
  },
  {
    id: "app-3",
    taskId: "task-3",
    volunteerId: "vol-3",
    volunteerName: "Anjali Patel",
    volunteerSkills: ["coding", "web-development", "data-analysis", "python"],
    volunteerAvailability: "flexible",
    status: "accepted",
    appliedAt: "2026-03-17",
    matchScore: 88,
  },
  {
    id: "app-4",
    taskId: "task-4",
    volunteerId: "vol-4",
    volunteerName: "Vikram Singh",
    volunteerSkills: ["construction", "plumbing", "carpentry", "electrical"],
    volunteerAvailability: "weekends",
    status: "accepted",
    appliedAt: "2026-03-18",
    matchScore: 96,
  },
];

// Mock user for demo
export interface User {
  id: string;
  name: string;
  email: string;
  role: "normal-user" | "volunteer" | "ngo";
  onboardingComplete: boolean;
}

export const mockCurrentUser: User = {
  id: "user-1",
  name: "Demo User",
  email: "demo@example.com",
  role: "volunteer",
  onboardingComplete: true,
};
