import { DomainException } from './domain.exception';

export class UnauthorizedException extends DomainException {
  readonly code = 'UNAUTHORIZED';
}
