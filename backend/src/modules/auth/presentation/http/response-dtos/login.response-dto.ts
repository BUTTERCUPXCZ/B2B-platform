import { UserResponseDto } from '../../../../users/presentation/http/response-dtos/user.response-dto';

export class LoginResponseDto {
  accessToken!: string;
  refreshToken!: string;
  expiresAt!: number;
  user!: UserResponseDto;
}
