export class UserCreatedEvent {
  constructor(
    public readonly userId: string,
    public readonly supabaseAuthId: string,
    public readonly email: string,
    public readonly occurredAt: Date = new Date(),
  ) {}
}
