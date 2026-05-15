import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuditLoggerAdapter } from './audit-logger.adapter';
import { AUDIT_LOGGER_PORT } from '../../application/ports/audit-logger.port';

import { UserSignedUpAuditHandler } from './event-handlers/user-signed-up.audit-handler';
import { UserLoggedInAuditHandler } from './event-handlers/user-logged-in.audit-handler';
import { UserLoggedOutAuditHandler } from './event-handlers/user-logged-out.audit-handler';
import { RoleAssignedAuditHandler } from './event-handlers/role-assigned.audit-handler';
import { UserCreatedAuditHandler } from './event-handlers/user-created.audit-handler';

const EventHandlers = [
  UserSignedUpAuditHandler,
  UserLoggedInAuditHandler,
  UserLoggedOutAuditHandler,
  RoleAssignedAuditHandler,
  UserCreatedAuditHandler,
];

@Global()
@Module({
  imports: [CqrsModule],
  providers: [
    AuditLoggerAdapter,
    { provide: AUDIT_LOGGER_PORT, useExisting: AuditLoggerAdapter },
    ...EventHandlers,
  ],
  exports: [AUDIT_LOGGER_PORT],
})
export class AuditModule {}
