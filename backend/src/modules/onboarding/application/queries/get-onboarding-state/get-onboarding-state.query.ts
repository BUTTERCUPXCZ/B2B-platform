import { Role } from '@prisma/client';

export class GetOnboardingStateQuery {
  constructor(
    public readonly userId: string,
    public readonly role: Role,
  ) {}
}
