import { Role } from '@prisma/client';

export class SaveStepCommand {
  constructor(
    public readonly userId: string,
    public readonly role: Role,
    public readonly step: string,
    public readonly stepData: Record<string, unknown>,
  ) {}
}
