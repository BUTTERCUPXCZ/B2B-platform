export class SignupCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly fullName: string | null,
    public readonly ipAddress: string | null,
    public readonly userAgent: string | null,
  ) {}
}
