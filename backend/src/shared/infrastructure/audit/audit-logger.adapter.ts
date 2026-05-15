import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditLogEntry, AuditLoggerPort } from '../../application/ports/audit-logger.port';

@Injectable()
export class AuditLoggerAdapter implements AuditLoggerPort {
  private readonly logger = new Logger(AuditLoggerAdapter.name);

  constructor(private readonly prisma: PrismaService) {}

  async log(entry: AuditLogEntry): Promise<void> {
    try {
      await this.prisma.auditLog.create({
        data: {
          actorUserId: entry.actorUserId ?? null,
          actorRole: entry.actorRole ?? null,
          action: entry.action,
          entityType: entry.entityType ?? null,
          entityId: entry.entityId ?? null,
          oldValues: (entry.oldValues ?? null) as any,
          newValues: (entry.newValues ?? null) as any,
          ipAddress: entry.ipAddress ?? null,
          userAgent: entry.userAgent ?? null,
          traceId: entry.traceId ?? null,
          metadata: (entry.metadata ?? null) as any,
        },
      });
    } catch (err) {
      // Audit write must never break the parent request — log + swallow.
      this.logger.error({ err, action: entry.action }, 'Failed to write audit log');
    }
  }
}
