import { Role } from '@prisma/client';

export class AssignRoleCommand {
  constructor(
    public readonly userId: string,
    public readonly role: Role,
    public readonly assignedBy?: string | null,
  ) {}
}
