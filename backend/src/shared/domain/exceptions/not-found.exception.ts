import { DomainException } from './domain.exception';

export class NotFoundException extends DomainException {
  readonly code = 'RESOURCE_NOT_FOUND';
}
