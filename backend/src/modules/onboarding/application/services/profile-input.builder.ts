import { Role } from '@prisma/client';
import type { ProfileInput } from '../../domain/repositories/profile.repository';

/**
 * Translates the freeform `data` blob accumulated across onboarding steps into a strongly-typed
 * profile input for the role-specific profile table. Validation of the individual fields lives
 * in the DTO layer (per-step request DTOs) — by the time we reach here, the data is assumed
 * well-formed.
 */
export function buildProfileInput(
  role: Role,
  data: Record<string, unknown>,
): ProfileInput {
  switch (role) {
    case Role.CLIENT: {
      const personal = (data['PERSONAL_INFO'] ?? {}) as Record<string, unknown>;
      const prefs = (data['PREFERENCES'] ?? {}) as Record<string, unknown>;
      return {
        role: Role.CLIENT,
        data: {
          region: (personal['region'] as string) ?? null,
          city: (personal['city'] as string) ?? null,
          address: (personal['address'] as string) ?? null,
          preferredCategories: (prefs['preferredCategories'] as string[]) ?? [],
        },
      };
    }

    case Role.CONTRACTOR: {
      const personal = (data['PERSONAL_INFO'] ?? {}) as Record<string, unknown>;
      const trade = (data['TRADE_PROFILE'] ?? {}) as Record<string, unknown>;
      return {
        role: Role.CONTRACTOR,
        data: {
          trade: (trade['trade'] as string) ?? '',
          yearsExperience: Number(trade['yearsExperience'] ?? 0),
          bio: (trade['bio'] as string) ?? null,
          expertiseTags: (trade['expertiseTags'] as string[]) ?? [],
          location: (personal['region'] as string) ?? null,
        },
      };
    }

    case Role.SUPPLIER: {
      const business = (data['BUSINESS_INFO'] ?? {}) as Record<string, unknown>;
      const payout = (data['PAYOUT_INFO'] ?? {}) as Record<string, unknown>;
      return {
        role: Role.SUPPLIER,
        data: {
          businessName: (business['businessName'] as string) ?? '',
          businessAddress: (business['businessAddress'] as string) ?? '',
          businessRegNo: (business['businessRegNo'] as string) ?? null,
          taxId: (business['taxId'] as string) ?? null,
          payoutBankName: (payout['bankName'] as string) ?? null,
          payoutAcctName: (payout['acctName'] as string) ?? null,
          payoutAcctNo: (payout['acctNo'] as string) ?? null,
        },
      };
    }

    case Role.JOB_SEEKER: {
      const skills = (data['SKILLS'] ?? {}) as Record<string, unknown>;
      const prefs = (data['PREFERENCES'] ?? {}) as Record<string, unknown>;
      return {
        role: Role.JOB_SEEKER,
        data: {
          skills: (skills['skills'] as string[]) ?? [],
          yearsExperience: Number(skills['yearsExperience'] ?? 0),
          preferredLocations: (prefs['preferredLocations'] as string[]) ?? [],
          availableFrom: prefs['availableFrom']
            ? new Date(prefs['availableFrom'] as string)
            : null,
          resumeUrl: null,
        },
      };
    }

    default:
      throw new Error(`Unsupported role for onboarding: ${role}`);
  }
}
