export type UserRole = 'user' | 'volunteer' | 'ngo';

export type CommunityNeedCategory =
  | 'Food'
  | 'Medical'
  | 'Education'
  | 'Sanitation'
  | 'Disaster Relief'
  | 'Infrastructure'
  | 'Environmental'
  | 'Social Support';

export type TaskStatus = 'Open' | 'Filled' | 'Completed' | 'Cancelled';
export type ApplicationStatus = 'Applied' | 'Accepted' | 'Rejected' | 'Completed';
export type NeedStatus = 'Open' | 'In Progress' | 'Resolved' | 'Urgent';
export type UrgencyLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  city: string;
  state: string;
  avatar?: string;
  createdAt: Date;
}

export interface Volunteer extends User {
  skills: string[];
  availability: string;
  certificates: string[];
  domains: string[];
  tasksCompleted: number;
  rating: number;
  hoursContributed: number;
}

export interface NGO extends User {
  organizationName: string;
  description: string;
  verificationStatus: 'Verified' | 'Pending' | 'Rejected';
  socialHandles: Record<string, string>;
  domains: string[];
  volunteersManaged: number;
  tasksCreated: number;
  logo?: string;
}

export interface NormalUser extends User {
  reportedNeeds: number;
}

export interface CommunityNeed {
  id: string;
  title: string;
  description: string;
  category: CommunityNeedCategory;
  urgency: UrgencyLevel;
  status: NeedStatus;
  location: Location;
  source: 'Citizen Report' | 'NGO Input' | 'Government Data' | 'Social Media';
  reports: number;
  adoptedByNGO?: string;
  relatedTasks: string[];
  createdAt: Date;
  resolvedAt?: Date;
}

export interface VolunteerTask {
  id: string;
  ngoId: string;
  ngoName: string;
  title: string;
  description: string;
  category: CommunityNeedCategory;
  requiredSkills: string[];
  volunteersNeeded: number;
  volunteersAccepted: number;
  acceptedVolunteers: Volunteer[];
  applicants: VolunteerApplication[];
  deadline: Date;
  location: Location;
  urgency: UrgencyLevel;
  status: TaskStatus;
  matchingScore?: number;
  createdAt: Date;
  completedAt?: Date;
}

export interface VolunteerApplication {
  id: string;
  taskId: string;
  volunteerId: string;
  volunteerName: string;
  status: ApplicationStatus;
  appliedAt: Date;
  respondedAt?: Date;
  matchScore: number;
  volunteerSkills: string[];
  volunteerAvailability: string;
}

export interface Location {
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
  address: string;
}

export interface DashboardStats {
  total: number;
  active: number;
  completed: number;
  pending: number;
}

export interface AuthContextType {
  user: User | null;
  userRole: UserRole | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (userData: Partial<User>, role: UserRole) => Promise<void>;
  logout: () => void;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}
