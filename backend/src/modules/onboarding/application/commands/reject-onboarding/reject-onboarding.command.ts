export class RejectOnboardingCommand {
  constructor(
    public readonly onboardingStateId: string,
    public readonly rejectedByUserId: string,
    public readonly reason: string,
  ) {}
}
