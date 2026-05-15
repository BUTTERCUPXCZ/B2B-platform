import { Role } from '@prisma/client';

export interface AuditLogEntry {
  actorUserId?: string | null;
  actorRole?: Role | null;
  action: string;
  entityType?: string | null;
  entityId?: string | null;
  oldValues?: Record<string, unknown> | null;
  newValues?: Record<string, unknown> | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  traceId?: string | null;
  metadata?: Record<string, unknown> | null;
}

export const AUDIT_LOGGER_PORT = Symbol('AUDIT_LOGGER_PORT');

export interface AuditLoggerPort {
  log(entry: AuditLogEntry): Promise<void>;
}
