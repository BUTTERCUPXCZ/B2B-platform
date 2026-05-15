import { Role, UserStatus } from '@prisma/client';
import { User } from '../../../domain/entities/user.entity';

export class UserResponseDto {
  id!: string;
  email!: string;
  emailVerified!: boolean;
  fullName!: string | null;
  phone!: string | null;
  avatarUrl!: string | null;
  status!: UserStatus;
  roles!: Role[];
  createdAt!: string;

  static fromDomain(user: User): UserResponseDto {
    const dto = new UserResponseDto();
    dto.id = user.id;
    dto.email = user.email;
    dto.emailVerified = user.isEmailVerified();
    dto.fullName = user.fullName;
    dto.phone = user.phone;
    dto.avatarUrl = user.avatarUrl;
    dto.status = user.status;
    dto.roles = user.roles;
    dto.createdAt = user.createdAt.toISOString();
    return dto;
  }
}
