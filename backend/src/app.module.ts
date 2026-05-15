import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { LoggerModule } from 'nestjs-pino';

import { validateEnv } from './config/env.schema';
import { PrismaModule } from './shared/infrastructure/prisma/prisma.module';
import { AuditModule } from './shared/infrastructure/audit/audit.module';
import { GlobalExceptionFilter } from './shared/infrastructure/filters/global-exception.filter';

import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { OnboardingModule } from './modules/onboarding/onboarding.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE_ENV === 'development'
            ? { target: 'pino-pretty', options: { singleLine: true } }
            : undefined,
        redact: {
          paths: [
            'req.headers.authorization',
            'req.headers.cookie',
            'req.body.password',
            'req.body.newPassword',
            'req.body.accessToken',
            'req.body.refreshToken',
            'res.body.accessToken',
            'res.body.refreshToken',
          ],
          censor: '[REDACTED]',
        },
        customLogLevel(_req, res, err) {
          if (err || res.statusCode >= 500) return 'error';
          if (res.statusCode >= 400) return 'warn';
          return 'info';
        },
      },
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: Number(process.env.THROTTLE_TTL_SECONDS ?? 60) * 1000,
          limit: Number(process.env.THROTTLE_LIMIT ?? 10),
        },
      ],
    }),
    CqrsModule.forRoot(),
    PrismaModule,
    AuditModule,
    UsersModule,
    AuthModule,
    OnboardingModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
  ],
})
export class AppModule {}
