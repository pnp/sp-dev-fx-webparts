import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IUserPresence, IUser } from '../types/interfaces';
import { CacheService } from './CacheService';

// Type for Microsoft Graph Client
interface IMSGraphClient {
  api(path: string): IMSGraphClientRequest;
}

interface IMSGraphClientRequest {
  select(properties: string): IMSGraphClientRequest;
  get(): Promise<{ value?: unknown[] } & Record<string, unknown>>;
}

export interface IProfileService {
  getUserPhoto(userId: string, userPrincipalName?: string): Promise<string | undefined>;
  getUserPresence(userId: string, userPrincipalName?: string): Promise<IUserPresence | undefined>;
  getBatchUserPresence(userIds: string[]): Promise<Record<string, IUserPresence>>;
  prefetchUserPhotos(users: IUser[]): Promise<void>;
  dispose(): void;
}

export class ProfileService implements IProfileService {
  private context: WebPartContext;
  private graphClient: IMSGraphClient | undefined;
  private readonly RATE_LIMIT_DELAY = 100;
  private cacheService: CacheService;

  constructor(context: WebPartContext) {
    this.context = context;
    this.cacheService = CacheService.getInstance();
  }

  private async getGraphClient(): Promise<IMSGraphClient> {
    if (!this.graphClient) {
      this.graphClient = await this.context.msGraphClientFactory.getClient('3');
    }
    return this.graphClient;
  }

  private normalizeUserIdForGraph(userId: string, userPrincipalName?: string): string | null {
    if (!userId || userId.trim() === '' || userId === 'undefined') {
      return null;
    }

    const guidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (userPrincipalName && emailRegex.test(userPrincipalName)) {
      return userPrincipalName;
    }
    
    if (guidRegex.test(userId) || emailRegex.test(userId)) {
      return userId;
    }

    if (userId.includes('|')) {
      const parts = userId.split('|');
      if (parts.length >= 3) {
        const possibleUpn = parts[parts.length - 1];
        if (emailRegex.test(possibleUpn)) {
          return possibleUpn;
        }
      }
    }

    return null;
  }

  public async getUserPhoto(userId: string, userPrincipalName?: string): Promise<string | undefined> {
    if (!userId || userId.trim() === '' || userId === 'undefined') {
      return undefined;
    }
    
    const cachedPhoto = this.cacheService.getUserPhoto(userId);
    if (cachedPhoto) {
      return cachedPhoto === 'NO_PHOTO' ? undefined : cachedPhoto;
    }

    const normalizedUserId = this.normalizeUserIdForGraph(userId, userPrincipalName);
    if (!normalizedUserId) {
      this.cacheService.setUserPhoto(userId, 'NO_PHOTO');
      return undefined;
    }

    try {
      const tokenProvider = await this.context.aadTokenProviderFactory.getTokenProvider();
      const token = await tokenProvider.getToken("https://graph.microsoft.com");
      
      const url = `https://graph.microsoft.com/v1.0/users/${normalizedUserId}/photo/$value`;
      
      const controller = new AbortController();
      const abortTimeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(url, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Accept': 'image/*'
        },
        signal: controller.signal
      });

      clearTimeout(abortTimeoutId);

      if (!response.ok) {
        if (response.status === 404) {
          this.cacheService.setUserPhoto(userId, 'NO_PHOTO');
        }
        return undefined;
      }

      const buffer = await response.arrayBuffer();
      const contentType = response.headers.get('content-type') || 'image/jpeg';
      const byteArray = new Uint8Array(buffer);
      let binary = '';
      for (const byte of byteArray) {
        binary += String.fromCharCode(byte);
      }
      const base64 = window.btoa(binary);
      const dataUrl = `data:${contentType};base64,${base64}`;

      this.cacheService.setUserPhoto(userId, dataUrl);

      return dataUrl;
    } catch {
      return undefined;
    }
  }

  public async getUserPresence(userId: string, userPrincipalName?: string): Promise<IUserPresence | undefined> {
    if (!userId || userId.trim() === '' || userId === 'undefined') {
      return undefined;
    }
    
    const cachedPresence = this.cacheService.getUserPresence(userId);
    if (cachedPresence) {
      return cachedPresence as IUserPresence;
    }

    const normalizedUserId = this.normalizeUserIdForGraph(userId, userPrincipalName);
    if (!normalizedUserId) {
      return undefined;
    }

    try {
      const client = await this.getGraphClient();
      const response = await client.api(`/users/${normalizedUserId}/presence`).get();
      const r = response as Record<string, unknown>;
      
      const presence: IUserPresence = {
        availability: r.availability as string || 'Unknown',
        activity: r.activity as string || 'Unknown',
        lastSeenDateTime: r.lastSeenDateTime as string
      };

      this.cacheService.setUserPresence(userId, presence);
      
      return presence;
    } catch {
      return undefined;
    }
  }

  public async getBatchUserPresence(userIds: string[]): Promise<Record<string, IUserPresence>> {
    const results: Record<string, IUserPresence> = {};
    const uncachedUserIds: string[] = [];

    for (const userId of userIds) {
      const cachedPresence = this.cacheService.getUserPresence(userId);
      if (cachedPresence) {
        results[userId] = cachedPresence as IUserPresence;
      } else {
        uncachedUserIds.push(userId);
      }
    }

    if (uncachedUserIds.length === 0) {
      return results;
    }

    try {
      const batchSize = 20;
      for (let i = 0; i < uncachedUserIds.length; i += batchSize) {
        const batch = uncachedUserIds.slice(i, i + batchSize);
        
        const batchPromises = batch.map(async (userId) => {
          try {
            const presence = await this.getUserPresence(userId);
            if (presence) {
              results[userId] = presence;
            }
          } catch {
            // Ignore errors
          }
        });

        // Manual Promise.allSettled equivalent for older TypeScript targets
        await Promise.all(batchPromises.map(async (promise) => {
          try {
            await promise;
          } catch {
            // Errors are already handled within individual promises
          }
        }));
        
        // Add small delay between batches to respect rate limits
        if (i + batchSize < uncachedUserIds.length) {
          await new Promise(resolve => setTimeout(resolve, this.RATE_LIMIT_DELAY));
        }
      }
    } catch {
      // Ignore batch errors
    }

    return results;
  }

  public async prefetchUserPhotos(users: IUser[]): Promise<void> {
    if (!users.length) {
      return;
    }

    await Promise.all(users.map(async (user) => {
      try {
        await this.getUserPhoto(user.id, user.userPrincipalName);
      } catch {
        // Ignore individual failures; cache miss will be handled lazily
      }
    }));
  }

  public dispose(): void {
    // Nothing to dispose – caching uses data URLs.
  }
}
