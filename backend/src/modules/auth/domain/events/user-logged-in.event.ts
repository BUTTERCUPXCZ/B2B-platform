export class UserLoggedInEvent {
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly ipAddress: string | null,
    public readonly userAgent: string | null,
    public readonly occurredAt: Date = new Date(),
  ) {}
}
