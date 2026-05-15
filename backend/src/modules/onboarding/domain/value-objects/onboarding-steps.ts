import { Role } from '@prisma/client';

export const ONBOARDING_STEPS: Record<Role, readonly string[]> = {
  CLIENT: ['PERSONAL_INFO', 'PREFERENCES'],
  CONTRACTOR: ['PERSONAL_INFO', 'TRADE_PROFILE', 'DOCUMENTS', 'PORTFOLIO'],
  SUPPLIER: ['PERSONAL_INFO', 'BUSINESS_INFO', 'DOCUMENTS', 'PAYOUT_INFO'],
  JOB_SEEKER: ['PERSONAL_INFO', 'SKILLS', 'PREFERENCES'],
  ADMIN: [],
  MODERATOR: [],
  SUPPORT: [],
};

export function isValidStep(role: Role, step: string): boolean {
  return ONBOARDING_STEPS[role].includes(step);
}

export function requiresVerification(role: Role): boolean {
  return role === Role.CONTRACTOR || role === Role.SUPPLIER;
}
