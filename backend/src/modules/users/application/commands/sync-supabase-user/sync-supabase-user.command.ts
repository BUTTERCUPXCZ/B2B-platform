export class SyncSupabaseUserCommand {
  constructor(
    public readonly supabaseAuthId: string,
    public readonly email: string,
    public readonly fullName?: string | null,
    public readonly emailVerifiedAt?: Date | null,
  ) {}
}
