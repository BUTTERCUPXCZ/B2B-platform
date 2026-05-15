import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../shared/infrastructure/prisma/prisma.service';
import {
  ProfileInput,
  ProfileRepository,
} from '../../domain/repositories/profile.repository';

@Injectable()
export class ProfilePrismaRepository implements ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async upsertProfile(userId: string, input: ProfileInput): Promise<void> {
    switch (input.role) {
      case 'CLIENT':
        await this.prisma.clientProfile.upsert({
          where: { userId },
          create: {
            userId,
            region: input.data.region ?? null,
            city: input.data.city ?? null,
            address: input.data.address ?? null,
            preferredCategories: input.data.preferredCategories ?? [],
          },
          update: {
            region: input.data.region ?? null,
            city: input.data.city ?? null,
            address: input.data.address ?? null,
            preferredCategories: input.data.preferredCategories ?? [],
          },
        });
        return;

      case 'CONTRACTOR':
        await this.prisma.contractorProfile.upsert({
          where: { userId },
          create: {
            userId,
            trade: input.data.trade,
            yearsExperience: input.data.yearsExperience,
            bio: input.data.bio ?? null,
            expertiseTags: input.data.expertiseTags ?? [],
            location: input.data.location ?? null,
          },
          update: {
            trade: input.data.trade,
            yearsExperience: input.data.yearsExperience,
            bio: input.data.bio ?? null,
            expertiseTags: input.data.expertiseTags ?? [],
            location: input.data.location ?? null,
          },
        });
        return;

      case 'SUPPLIER':
        await this.prisma.supplierProfile.upsert({
          where: { userId },
          create: {
            userId,
            businessName: input.data.businessName,
            businessAddress: input.data.businessAddress,
            businessRegNo: input.data.businessRegNo ?? null,
            taxId: input.data.taxId ?? null,
            payoutBankName: input.data.payoutBankName ?? null,
            payoutAcctName: input.data.payoutAcctName ?? null,
            payoutAcctNo: input.data.payoutAcctNo ?? null,
          },
          update: {
            businessName: input.data.businessName,
            businessAddress: input.data.businessAddress,
            businessRegNo: input.data.businessRegNo ?? null,
            taxId: input.data.taxId ?? null,
            payoutBankName: input.data.payoutBankName ?? null,
            payoutAcctName: input.data.payoutAcctName ?? null,
            payoutAcctNo: input.data.payoutAcctNo ?? null,
          },
        });
        return;

      case 'JOB_SEEKER':
        await this.prisma.jobSeekerProfile.upsert({
          where: { userId },
          create: {
            userId,
            skills: input.data.skills,
            yearsExperience: input.data.yearsExperience,
            preferredLocations: input.data.preferredLocations ?? [],
            availableFrom: input.data.availableFrom ?? null,
            resumeUrl: input.data.resumeUrl ?? null,
          },
          update: {
            skills: input.data.skills,
            yearsExperience: input.data.yearsExperience,
            preferredLocations: input.data.preferredLocations ?? [],
            availableFrom: input.data.availableFrom ?? null,
            resumeUrl: input.data.resumeUrl ?? null,
          },
        });
        return;
    }
  }
}
