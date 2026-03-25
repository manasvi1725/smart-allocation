'use client';

import { useAuth } from '@/context/auth-context';
import { isNGO, isVolunteer, isNormalUser, getRoleLabel } from '@/utils/role-helpers';

export function useRole() {
  const { userRole } = useAuth();

  return {
    role: userRole,
    isNGO: isNGO(userRole),
    isVolunteer: isVolunteer(userRole),
    isNormalUser: isNormalUser(userRole),
    roleLabel: getRoleLabel(userRole),
  };
}
