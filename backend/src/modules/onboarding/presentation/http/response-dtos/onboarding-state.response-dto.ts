import { OnboardingStatus, Role } from '@prisma/client';
import { OnboardingState } from '../../../domain/entities/onboarding-state.entity';
import { ONBOARDING_STEPS } from '../../../domain/value-objects/onboarding-steps';

export class OnboardingStateResponseDto {
  id!: string;
  userId!: string;
  role!: Role;
  status!: OnboardingStatus;
  currentStep!: string | null;
  data!: Record<string, unknown>;
  steps!: readonly string[];
  missingSteps!: string[];
  startedAt!: string | null;
  completedAt!: string | null;
  rejectedAt!: string | null;
  rejectReason!: string | null;

  static fromDomain(state: OnboardingState): OnboardingStateResponseDto {
    const dto = new OnboardingStateResponseDto();
    dto.id = state.id;
    dto.userId = state.userId;
    dto.role = state.role;
    dto.status = state.status;
    dto.currentStep = state.currentStep;
    dto.data = state.data;
    dto.steps = ONBOARDING_STEPS[state.role];
    dto.missingSteps = state.missingSteps();
    dto.startedAt = state.startedAt?.toISOString() ?? null;
    dto.completedAt = state.completedAt?.toISOString() ?? null;
    dto.rejectedAt = state.rejectedAt?.toISOString() ?? null;
    dto.rejectReason = state.rejectReason;
    return dto;
  }
}
