import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { getOTPService } from '../services/OTPService';
import { GmailService } from '../services/GmailService';
import { generateOTPEmail } from '../utils/EmailTemplates';

interface ISendOTPRequest {
  email: string;
  tokenId: string;
  signerName?: string;
}

export async function sendOTP(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log('[SendOTP] Request received');

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
    const body = await request.json() as ISendOTPRequest;
    const { email, tokenId, signerName } = body;

    if (!email || !tokenId) {
      return {
        status: 400,
        headers,
        jsonBody: {
          success: false,
          error: 'Email and tokenId are required',
        },
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        status: 400,
        headers,
        jsonBody: {
          success: false,
          error: 'Invalid email format',
        },
      };
    }

    context.log('[SendOTP] Generating OTP for:', email);

    const otpService = getOTPService();
    const otpCode = await otpService.createOTP(email, tokenId);

    context.log('[SendOTP] OTP generated:', otpCode.substring(0, 2) + '****');

    const gmailService = new GmailService();
    const emailHtml = generateOTPEmail(otpCode, signerName || 'User');

    await gmailService.sendEmail(
      email,
      '🔐 Your LegalLens Verification Code',
      emailHtml
    );

    context.log('[SendOTP] ✓ OTP email sent to:', email);

    const remainingSeconds = await otpService.getRemainingTime(email, tokenId);

    return {
      status: 200,
      headers,
      jsonBody: {
        success: true,
        message: 'OTP sent successfully',
        expiresIn: remainingSeconds,
        expiresInMinutes: Math.ceil(remainingSeconds / 60),
      },
    };

  } catch (error: any) {
    context.error('[SendOTP] Error:', error);

    if (error.message && error.message.includes('Failed to send email')) {
      return {
        status: 500,
        headers,
        jsonBody: {
          success: false,
          error: 'Failed to send OTP email. Please check Gmail configuration.',
          detail: error.message,
        },
      };
    }

    return {
      status: 500,
      headers,
      jsonBody: {
        success: false,
        error: 'Failed to send OTP',
        detail: error.message,
      },
    };
  }
}

app.http('sendOTP', {
  methods: ['POST', 'OPTIONS'],
  authLevel: 'anonymous',
  route: 'sendOTP',
  handler: sendOTP,
});