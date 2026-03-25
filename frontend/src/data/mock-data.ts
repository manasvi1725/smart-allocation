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
  avatar?: string;
  rating: number;
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
  verificationStatus: 'verified' | 'pending' | 'unverified';
  socialHandles: { platform: string; url: string }[];
  domainsOfWork: string[];
  logo?: string;
}

export interface CommunityNeed {
  id: string;
  title: string;
  description: string;
  category: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  pincode: string;
  status: 'open' | 'adopted' | 'resolved';
  source: 'citizen' | 'ngo' | 'social_media';
  adoptedBy?: string;
  submittedBy: string;
  submittedDate: string;
  image?: string;
}

export interface VolunteerTask {
  id: string;
  title: string;
  description: string;
  ngoId: string;
  ngoName: string;
  category: string;
  requiredSkills: string[];
  volunteersNeeded: number;
  acceptedCount: number;
  deadline: string;
  location: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'filled' | 'completed';
  createdDate: string;
  matchScore?: number;
  applicants?: string[];
}

export interface TaskApplication {
  id: string;
  taskId: string;
  volunteerId: string;
  status: 'applied' | 'accepted' | 'rejected' | 'completed';
  appliedDate: string;
  matchScore: number;
}

// Mock Volunteers
export const mockVolunteers: Volunteer[] = [
  {
    id: 'vol-1',
    name: 'Aisha Patel',
    email: 'aisha@email.com',
    phone: '9876543210',
    city: 'Mumbai',
    state: 'Maharashtra',
    skills: ['First Aid', 'Community Mobilization', 'Teaching'],
    availability: 'weekends',
    certificates: ['First Aid Certified', 'CPR Certified'],
    preferredDomains: ['Medical', 'Education'],
    rating: 4.8,
  },
  {
    id: 'vol-2',
    name: 'Rajesh Kumar',
    email: 'rajesh@email.com',
    phone: '9876543211',
    city: 'Bangalore',
    state: 'Karnataka',
    skills: ['Data Analysis', 'Web Development', 'Project Management'],
    availability: 'evenings',
    certificates: ['Project Management Certified'],
    preferredDomains: ['Technology', 'Education'],
    rating: 4.6,
  },
  {
    id: 'vol-3',
    name: 'Priya Singh',
    email: 'priya@email.com',
    phone: '9876543212',
    city: 'Delhi',
    state: 'Delhi',
    skills: ['Social Work', 'Counseling', 'Advocacy'],
    availability: 'flexible',
    certificates: ['Social Work Degree', 'Counselor Certified'],
    preferredDomains: ['Social Welfare', 'Mental Health'],
    rating: 4.9,
  },
  {
    id: 'vol-4',
    name: 'Amit Sharma',
    email: 'amit@email.com',
    phone: '9876543213',
    city: 'Chennai',
    state: 'Tamil Nadu',
    skills: ['Construction', 'Civil Works', 'Supervision'],
    availability: 'weekdays',
    certificates: ['Construction Safety', 'Site Engineer'],
    preferredDomains: ['Infrastructure', 'Disaster Relief'],
    rating: 4.5,
  },
  {
    id: 'vol-5',
    name: 'Neha Gupta',
    email: 'neha@email.com',
    phone: '9876543214',
    city: 'Hyderabad',
    state: 'Telangana',
    skills: ['Marketing', 'Social Media', 'Communications'],
    availability: 'flexible',
    certificates: ['Digital Marketing Certified'],
    preferredDomains: ['Communications', 'Marketing'],
    rating: 4.7,
  },
];

// Mock NGOs
export const mockNGOs: NGO[] = [
  {
    id: 'ngo-1',
    organizationName: 'Hope for All',
    contactPerson: 'Dr. Vikram Desai',
    email: 'contact@hopeforall.org',
    phone: '9876543220',
    city: 'Mumbai',
    state: 'Maharashtra',
    description: 'Leading NGO focused on healthcare and education for underprivileged communities',
    verificationStatus: 'verified',
    socialHandles: [
      { platform: 'twitter', url: 'https://twitter.com/hopeforall' },
      { platform: 'facebook', url: 'https://facebook.com/hopeforall' },
    ],
    domainsOfWork: ['Medical', 'Education'],
  },
  {
    id: 'ngo-2',
    organizationName: 'Green Earth Initiative',
    contactPerson: 'Arjun Reddy',
    email: 'contact@greenearthinitiative.org',
    phone: '9876543221',
    city: 'Bangalore',
    state: 'Karnataka',
    description: 'Environmental conservation and sustainable development organization',
    verificationStatus: 'verified',
    socialHandles: [
      { platform: 'instagram', url: 'https://instagram.com/greenearthinitiative' },
    ],
    domainsOfWork: ['Environment', 'Sustainability'],
  },
  {
    id: 'ngo-3',
    organizationName: 'Community Care Foundation',
    contactPerson: 'Meera Nair',
    email: 'contact@communitycarefd.org',
    phone: '9876543222',
    city: 'Delhi',
    state: 'Delhi',
    description: 'Providing social welfare services to marginalized communities',
    verificationStatus: 'verified',
    socialHandles: [
      { platform: 'twitter', url: 'https://twitter.com/communitycarefd' },
    ],
    domainsOfWork: ['Social Welfare', 'Education'],
  },
];

// Mock Community Needs
export const mockCommunityNeeds: CommunityNeed[] = [
  {
    id: 'need-1',
    title: 'Medical Camp Required for Rural Community',
    description: 'A small village in the outskirts needs urgent medical attention and health check-ups for children and elderly',
    category: 'Medical',
    urgency: 'high',
    location: 'Nashik District',
    latitude: 19.9975,
    longitude: 73.7898,
    city: 'Nashik',
    state: 'Maharashtra',
    pincode: '422001',
    status: 'open',
    source: 'ngo',
    submittedBy: 'ngo-1',
    submittedDate: '2024-03-20',
  },
  {
    id: 'need-2',
    title: 'Food Distribution for Flood-Affected Areas',
    description: 'Recent flooding has left many families without food supplies. Urgent need for food packages and water',
    category: 'Food',
    urgency: 'critical',
    location: 'Raigad District',
    latitude: 18.2401,
    longitude: 73.3119,
    city: 'Raigad',
    state: 'Maharashtra',
    pincode: '402201',
    status: 'adopted',
    adoptedBy: 'ngo-1',
    source: 'ngo',
    submittedBy: 'ngo-1',
    submittedDate: '2024-03-19',
  },
  {
    id: 'need-3',
    title: 'Education Support for Underprivileged Children',
    description: 'Local school lacks basic educational materials and teaching resources. Help needed to provide books and supplies',
    category: 'Education',
    urgency: 'medium',
    location: 'Thane District',
    latitude: 19.2183,
    longitude: 72.9781,
    city: 'Thane',
    state: 'Maharashtra',
    pincode: '400601',
    status: 'open',
    source: 'citizen',
    submittedBy: 'user-1',
    submittedDate: '2024-03-18',
  },
  {
    id: 'need-4',
    title: 'Water Purification System Installation',
    description: 'Community needs safe drinking water. Water purification system needs to be installed',
    category: 'Sanitation',
    urgency: 'high',
    location: 'Satara District',
    latitude: 17.6869,
    longitude: 73.9299,
    city: 'Satara',
    state: 'Maharashtra',
    pincode: '415001',
    status: 'open',
    source: 'social_media',
    submittedBy: 'social-volunteer-1',
    submittedDate: '2024-03-17',
  },
  {
    id: 'need-5',
    title: 'Disaster Relief - Shelter Construction',
    description: 'Earthquake victims need emergency shelter. Construction materials and skilled labor required',
    category: 'Disaster Relief',
    urgency: 'critical',
    location: 'Aurangabad District',
    latitude: 19.8762,
    longitude: 75.3433,
    city: 'Aurangabad',
    state: 'Maharashtra',
    pincode: '431001',
    status: 'adopted',
    adoptedBy: 'ngo-2',
    source: 'ngo',
    submittedBy: 'ngo-2',
    submittedDate: '2024-03-16',
  },
];

// Mock Volunteer Tasks
export const mockVolunteerTasks: VolunteerTask[] = [
  {
    id: 'task-1',
    title: 'Medical Volunteer for Health Camp',
    description: 'Assist in conducting medical camp and health check-ups for underprivileged children',
    ngoId: 'ngo-1',
    ngoName: 'Hope for All',
    category: 'Medical',
    requiredSkills: ['First Aid', 'Medical Knowledge', 'Community Mobilization'],
    volunteersNeeded: 5,
    acceptedCount: 2,
    deadline: '2024-04-15',
    location: 'Mumbai',
    latitude: 19.0760,
    longitude: 72.8777,
    city: 'Mumbai',
    state: 'Maharashtra',
    urgency: 'high',
    status: 'open',
    createdDate: '2024-03-20',
    matchScore: 92,
    applicants: ['vol-1', 'vol-3'],
  },
  {
    id: 'task-2',
    title: 'Teacher for Weekend Education Program',
    description: 'Help teach mathematics and English to underprivileged children on weekends',
    ngoId: 'ngo-1',
    ngoName: 'Hope for All',
    category: 'Education',
    requiredSkills: ['Teaching', 'Communication', 'Patience'],
    volunteersNeeded: 3,
    acceptedCount: 1,
    deadline: '2024-05-01',
    location: 'Bangalore',
    latitude: 12.9716,
    longitude: 77.5946,
    city: 'Bangalore',
    state: 'Karnataka',
    urgency: 'medium',
    status: 'open',
    createdDate: '2024-03-18',
    matchScore: 85,
    applicants: ['vol-2'],
  },
  {
    id: 'task-3',
    title: 'Social Worker for Community Program',
    description: 'Conduct awareness sessions and provide counseling support to community members',
    ngoId: 'ngo-3',
    ngoName: 'Community Care Foundation',
    category: 'Social Welfare',
    requiredSkills: ['Social Work', 'Counseling', 'Advocacy'],
    volunteersNeeded: 2,
    acceptedCount: 1,
    deadline: '2024-04-30',
    location: 'Delhi',
    latitude: 28.6139,
    longitude: 77.2090,
    city: 'Delhi',
    state: 'Delhi',
    urgency: 'medium',
    status: 'open',
    createdDate: '2024-03-19',
    matchScore: 95,
    applicants: ['vol-3'],
  },
  {
    id: 'task-4',
    title: 'Tech Volunteer - Website Development',
    description: 'Help develop and maintain the NGO website and portal',
    ngoId: 'ngo-2',
    ngoName: 'Green Earth Initiative',
    category: 'Technology',
    requiredSkills: ['Web Development', 'UI/UX Design', 'Problem Solving'],
    volunteersNeeded: 2,
    acceptedCount: 0,
    deadline: '2024-05-15',
    location: 'Bangalore',
    latitude: 12.9716,
    longitude: 77.5946,
    city: 'Bangalore',
    state: 'Karnataka',
    urgency: 'low',
    status: 'open',
    createdDate: '2024-03-20',
    matchScore: 88,
    applicants: [],
  },
  {
    id: 'task-5',
    title: 'Construction Volunteer for Community Center',
    description: 'Help in construction and repair work for community center infrastructure',
    ngoId: 'ngo-2',
    ngoName: 'Green Earth Initiative',
    category: 'Infrastructure',
    requiredSkills: ['Construction', 'Civil Works', 'Supervision'],
    volunteersNeeded: 8,
    acceptedCount: 4,
    deadline: '2024-04-20',
    location: 'Chennai',
    latitude: 13.0827,
    longitude: 80.2707,
    city: 'Chennai',
    state: 'Tamil Nadu',
    urgency: 'high',
    status: 'open',
    createdDate: '2024-03-15',
    matchScore: 90,
    applicants: ['vol-4'],
  },
];

// Mock Task Applications
export const mockTaskApplications: TaskApplication[] = [
  {
    id: 'app-1',
    taskId: 'task-1',
    volunteerId: 'vol-1',
    status: 'accepted',
    appliedDate: '2024-03-21',
    matchScore: 92,
  },
  {
    id: 'app-2',
    taskId: 'task-1',
    volunteerId: 'vol-3',
    status: 'applied',
    appliedDate: '2024-03-22',
    matchScore: 88,
  },
  {
    id: 'app-3',
    taskId: 'task-2',
    volunteerId: 'vol-2',
    status: 'accepted',
    appliedDate: '2024-03-20',
    matchScore: 85,
  },
  {
    id: 'app-4',
    taskId: 'task-3',
    volunteerId: 'vol-3',
    status: 'accepted',
    appliedDate: '2024-03-23',
    matchScore: 95,
  },
];

// Categories
export const CATEGORIES = [
  'Medical',
  'Education',
  'Food',
  'Sanitation',
  'Disaster Relief',
  'Social Welfare',
  'Environment',
  'Infrastructure',
  'Technology',
  'Shelter',
];

// Skills
export const SKILLS = [
  'First Aid',
  'Medical Knowledge',
  'Teaching',
  'Communication',
  'Social Work',
  'Counseling',
  'Construction',
  'Web Development',
  'Data Analysis',
  'Project Management',
  'Advocacy',
  'Community Mobilization',
  'Civil Works',
  'UI/UX Design',
  'Marketing',
  'Social Media',
];

// Urgency levels
export const URGENCY_LEVELS = ['Low', 'Medium', 'High', 'Critical'];

// Status types
export const STATUS_TYPES = ['Open', 'Applied', 'Accepted', 'Rejected', 'Completed', 'Filled'];
