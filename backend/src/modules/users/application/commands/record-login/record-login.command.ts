export class RecordLoginCommand {
  constructor(
    public readonly userId: string,
    public readonly ip: string | null,
    public readonly at: Date = new Date(),
  ) {}
}
