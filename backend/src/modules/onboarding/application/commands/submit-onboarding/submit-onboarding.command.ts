import { Role } from '@prisma/client';

export class SubmitOnboardingCommand {
  constructor(
    public readonly userId: string,
    public readonly role: Role,
  ) {}
}
