import { DomainException } from './domain.exception';

export class BadRequestException extends DomainException {
  readonly code = 'BAD_REQUEST';
}
