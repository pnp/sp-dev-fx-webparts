import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { getOTPService } from '../services/OTPService';

interface IVerifyOTPRequest {
  email: string;
  tokenId: string;
  code: string;
}

export async function verifyOTP(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log('[VerifyOTP] Request received');

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (request.method === 'OPTIONS') {
    return { status: 200, headers };
  }

  try {
    const body = await request.json() as IVerifyOTPRequest;
    const { email, tokenId, code } = body;

    if (!email || !tokenId || !code) {
      return {
        status: 400,
        headers,
        jsonBody: {
          success: false,
          error: 'Email, tokenId, and code are required',
        },
      };
    }

    if (!/^\d{6}$/.test(code)) {
      return {
        status: 400,
        headers,
        jsonBody: {
          success: false,
          error: 'Code must be 6 digits',
        },
      };
    }

    context.log('[VerifyOTP] Verifying code for:', email);

    const otpService = getOTPService();
    const result = await otpService.verifyOTP(email, tokenId, code);

    if (!result.valid) {
      context.warn('[VerifyOTP] Invalid OTP:', result.error);
      return {
        status: 401,
        headers,
        jsonBody: {
          success: false,
          error: result.error || 'Invalid verification code',
        },
      };
    }

    context.log('[VerifyOTP] ✓ OTP verified successfully');

    return {
      status: 200,
      headers,
      jsonBody: {
        success: true,
        message: 'OTP verified successfully',
        verified: true,
      },
    };

  } catch (error: any) {
    context.error('[VerifyOTP] Error:', error);

    return {
      status: 500,
      headers,
      jsonBody: {
        success: false,
        error: 'Failed to verify OTP',
        detail: error.message,
      },
    };
  }
}

app.http('verifyOTP', {
  methods: ['POST', 'OPTIONS'],
  authLevel: 'anonymous',
  route: 'verifyOTP',
  handler: verifyOTP,
});