export class MarkEmailVerifiedCommand {
  constructor(
    public readonly supabaseAuthId: string,
    public readonly verifiedAt: Date = new Date(),
  ) {}
}
