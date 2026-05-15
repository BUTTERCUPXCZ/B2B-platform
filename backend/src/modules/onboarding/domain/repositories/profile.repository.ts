export const PROFILE_REPOSITORY = Symbol('PROFILE_REPOSITORY');

export interface ClientProfileInput {
  region?: string | null;
  city?: string | null;
  address?: string | null;
  preferredCategories?: string[];
}

export interface ContractorProfileInput {
  trade: string;
  yearsExperience: number;
  bio?: string | null;
  expertiseTags?: string[];
  location?: string | null;
}

export interface SupplierProfileInput {
  businessName: string;
  businessAddress: string;
  businessRegNo?: string | null;
  taxId?: string | null;
  payoutBankName?: string | null;
  payoutAcctName?: string | null;
  payoutAcctNo?: string | null;
}

export interface JobSeekerProfileInput {
  skills: string[];
  yearsExperience: number;
  preferredLocations?: string[];
  availableFrom?: Date | null;
  resumeUrl?: string | null;
}

export type ProfileInput =
  | { role: 'CLIENT'; data: ClientProfileInput }
  | { role: 'CONTRACTOR'; data: ContractorProfileInput }
  | { role: 'SUPPLIER'; data: SupplierProfileInput }
  | { role: 'JOB_SEEKER'; data: JobSeekerProfileInput };

export interface ProfileRepository {
  upsertProfile(userId: string, input: ProfileInput): Promise<void>;
}
