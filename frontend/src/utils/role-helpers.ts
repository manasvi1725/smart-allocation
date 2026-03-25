import { UserRole } from '@/context/auth-context';

export function isNGO(role: UserRole): boolean {
  return role === 'ngo';
}

export function isVolunteer(role: UserRole): boolean {
  return role === 'volunteer';
}

export function isNormalUser(role: UserRole): boolean {
  return role === 'normal_user';
}

export function getRoleLabel(role: UserRole): string {
  const labels: Record<string, string> = {
    normal_user: 'Community Member',
    volunteer: 'Volunteer',
    ngo: 'NGO',
  };
  return labels[role || ''] || 'User';
}

export function getRolePath(role: UserRole): string {
  const paths: Record<string, string> = {
    normal_user: '/user-dashboard',
    volunteer: '/volunteer-dashboard',
    ngo: '/ngo-dashboard',
  };
  return paths[role || ''] || '/';
}
