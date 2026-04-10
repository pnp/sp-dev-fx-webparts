export interface IOTPData {
  code: string;
  email: string;
  tokenId: string;
  expiresAt: string;
  createdAt: string;
}

export class OTPService {
  private otpStore: Map<string, IOTPData> = new Map();
  private readonly OTP_EXPIRY_MINUTES = 5;

  generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async createOTP(email: string, tokenId: string): Promise<string> {
    const code = this.generateOTP();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + this.OTP_EXPIRY_MINUTES * 60 * 1000);

    const otpData: IOTPData = {
      code,
      email: email.toLowerCase(),
      tokenId,
      expiresAt: expiresAt.toISOString(),
      createdAt: now.toISOString(),
    };

    const key = this.getKey(email, tokenId);
    this.otpStore.set(key, otpData);

    console.log('[OTP] Created OTP for:', email, 'expires:', expiresAt.toISOString());

    setTimeout(() => {
      this.otpStore.delete(key);
      console.log('[OTP] Auto-cleaned expired OTP for:', email);
    }, (this.OTP_EXPIRY_MINUTES + 1) * 60 * 1000);

    return code;
  }

  async verifyOTP(email: string, tokenId: string, code: string): Promise<{
    valid: boolean;
    error?: string;
  }> {
    const key = this.getKey(email, tokenId);
    const otpData = this.otpStore.get(key);

    if (!otpData) {
      console.warn('[OTP] No OTP found for:', email, tokenId);
      return {
        valid: false,
        error: 'OTP not found. Please request a new code.',
      };
    }

    const now = new Date();
    const expiresAt = new Date(otpData.expiresAt);

    if (now > expiresAt) {
      this.otpStore.delete(key);
      console.warn('[OTP] Expired OTP for:', email);
      return {
        valid: false,
        error: 'OTP has expired. Please request a new code.',
      };
    }

    if (otpData.code !== code) {
      console.warn('[OTP] Invalid code attempt for:', email);
      return {
        valid: false,
        error: 'Invalid verification code. Please try again.',
      };
    }

    this.otpStore.delete(key);
    console.log('[OTP] ✓ Verified OTP for:', email);

    return {
      valid: true,
    };
  }

  async checkOTPExists(email: string, tokenId: string): Promise<boolean> {
    const key = this.getKey(email, tokenId);
    const otpData = this.otpStore.get(key);

    if (!otpData) {
      return false;
    }

    const now = new Date();
    const expiresAt = new Date(otpData.expiresAt);

    if (now > expiresAt) {
      this.otpStore.delete(key);
      return false;
    }

    return true;
  }

  async getRemainingTime(email: string, tokenId: string): Promise<number> {
    const key = this.getKey(email, tokenId);
    const otpData = this.otpStore.get(key);

    if (!otpData) {
      return 0;
    }

    const now = new Date();
    const expiresAt = new Date(otpData.expiresAt);
    const remaining = Math.max(0, Math.floor((expiresAt.getTime() - now.getTime()) / 1000));

    return remaining;
  }

  async deleteOTP(email: string, tokenId: string): Promise<void> {
    const key = this.getKey(email, tokenId);
    this.otpStore.delete(key);
    console.log('[OTP] Deleted OTP for:', email);
  }

  getStats(): {
    totalActive: number;
    oldestCreated: string | null;
  } {
    const entries = Array.from(this.otpStore.values());
    
    return {
      totalActive: entries.length,
      oldestCreated: entries.length > 0
        ? entries.reduce((oldest, curr) => 
            curr.createdAt < oldest ? curr.createdAt : oldest, 
            entries[0].createdAt
          )
        : null,
    };
  }


  private getKey(email: string, tokenId: string): string {
    return `${email.toLowerCase()}:${tokenId}`;
  }
}

let otpServiceInstance: OTPService | null = null;

export function getOTPService(): OTPService {
  if (!otpServiceInstance) {
    otpServiceInstance = new OTPService();
    console.log('[OTP] Initialized OTPService singleton');
  }
  return otpServiceInstance;
}