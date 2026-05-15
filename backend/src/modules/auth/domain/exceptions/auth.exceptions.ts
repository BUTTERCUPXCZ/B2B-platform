import {
  UnauthorizedException,
  ForbiddenException,
  ConflictException,
} from '../../../../shared/domain/exceptions';

export class InvalidCredentialsException extends UnauthorizedException {
  constructor() {
    super('Invalid email or password.');
  }
}

export class EmailNotVerifiedException extends ForbiddenException {
  constructor() {
    super('Email not verified. Check your inbox for the verification link.');
  }
}

export class AccountSuspendedException extends ForbiddenException {
  constructor() {
    super('Account is suspended. Contact support.');
  }
}

export class EmailAlreadyRegisteredException extends ConflictException {
  constructor(email: string) {
    super(`Email ${email} is already registered.`);
  }
}

export class InvalidTokenException extends UnauthorizedException {
  constructor(reason = 'Invalid or expired token.') {
    super(reason);
  }
}

export class WebhookSignatureInvalidException extends UnauthorizedException {
  constructor() {
    super('Webhook signature verification failed.');
  }
}
