export class ApproveOnboardingCommand {
  constructor(
    public readonly onboardingStateId: string,
    public readonly approvedByUserId: string,
  ) {}
}
