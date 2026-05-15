import { OnboardingState as PrismaOnboardingState } from '@prisma/client';
import { OnboardingState } from '../../domain/entities/onboarding-state.entity';

export class OnboardingStateMapper {
  static toDomain(record: PrismaOnboardingState): OnboardingState {
    return OnboardingState.create({
      id: record.id,
      userId: record.userId,
      role: record.role,
      status: record.status,
      currentStep: record.currentStep,
      data: (record.data as Record<string, unknown>) ?? {},
      startedAt: record.startedAt,
      completedAt: record.completedAt,
      rejectedAt: record.rejectedAt,
      rejectReason: record.rejectReason,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
}
