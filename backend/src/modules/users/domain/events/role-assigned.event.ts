import { Role } from '@prisma/client';

export class RoleAssignedEvent {
  constructor(
    public readonly userId: string,
    public readonly role: Role,
    public readonly assignedBy: string | null,
    public readonly occurredAt: Date = new Date(),
  ) {}
}
