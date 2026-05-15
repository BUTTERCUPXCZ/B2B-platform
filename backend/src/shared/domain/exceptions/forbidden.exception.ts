import { DomainException } from './domain.exception';

export class ForbiddenException extends DomainException {
  readonly code = 'FORBIDDEN';
}
