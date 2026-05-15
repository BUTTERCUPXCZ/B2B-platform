import { Role } from '@prisma/client';

export { Role };

export const PUBLIC_ROLES: ReadonlyArray<Role> = [
  Role.CLIENT,
  Role.CONTRACTOR,
  Role.SUPPLIER,
  Role.JOB_SEEKER,
] as const;

export const INTERNAL_ROLES: ReadonlyArray<Role> = [
  Role.ADMIN,
  Role.MODERATOR,
  Role.SUPPORT,
] as const;

export function isPublicRole(role: Role): boolean {
  return PUBLIC_ROLES.includes(role);
}

export function isInternalRole(role: Role): boolean {
  return INTERNAL_ROLES.includes(role);
}

export function requiresAdminApproval(role: Role): boolean {
  return role === Role.CONTRACTOR || role === Role.SUPPLIER;
}
