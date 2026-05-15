export class OAuthSyncCommand {
  constructor(
    public readonly accessToken: string,
    public readonly ipAddress: string | null,
    public readonly userAgent: string | null,
  ) {}
}
