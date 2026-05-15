import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseClientFactory {
  private adminClient?: SupabaseClient;
  private anonClient?: SupabaseClient;

  constructor(private readonly config: ConfigService) {}

  /**
   * Service-role client — full server-side privileges. Never expose responses to untrusted callers.
   */
  admin(): SupabaseClient {
    if (!this.adminClient) {
      this.adminClient = createClient(
        this.config.getOrThrow<string>('SUPABASE_URL'),
        this.config.getOrThrow<string>('SUPABASE_SERVICE_ROLE_KEY'),
        {
          auth: { autoRefreshToken: false, persistSession: false },
        },
      );
    }
    return this.adminClient;
  }

  /**
   * Anonymous client — used to call public Supabase auth APIs (signup, signInWithPassword, etc.).
   */
  anon(): SupabaseClient {
    if (!this.anonClient) {
      this.anonClient = createClient(
        this.config.getOrThrow<string>('SUPABASE_URL'),
        this.config.getOrThrow<string>('SUPABASE_ANON_KEY'),
        {
          auth: { autoRefreshToken: false, persistSession: false },
        },
      );
    }
    return this.anonClient;
  }
}
