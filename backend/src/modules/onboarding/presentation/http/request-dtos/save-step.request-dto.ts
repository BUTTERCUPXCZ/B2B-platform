import { IsObject, IsString, MaxLength, MinLength } from 'class-validator';

export class SaveStepRequestDto {
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  step!: string;

  @IsObject()
  data!: Record<string, unknown>;
}
