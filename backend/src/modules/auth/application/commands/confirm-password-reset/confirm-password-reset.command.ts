export class ConfirmPasswordResetCommand {
  constructor(
    public readonly accessToken: string,
    public readonly newPassword: string,
  ) {}
}
