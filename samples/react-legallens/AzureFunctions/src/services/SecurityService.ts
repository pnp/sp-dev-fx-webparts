import axios from 'axios';

export interface ISecurityData {
  ipAddress: string;
  geolocation: IGeolocation;
  deviceFingerprint: string;
  userAgent: string;
  browser: IBrowserInfo;
  os: IOSInfo;
  screen: IScreenInfo;
  timestamp: string;
}

export interface IGeolocation {
  ip: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  timezone: string;
  org: string;
}

export interface IBrowserInfo {
  name: string;
  version: string;
  engine: string;
}

export interface IOSInfo {
  name: string;
  version: string;
  platform: string;
}

export interface IScreenInfo {
  width: number;
  height: number;
  colorDepth: number;
}

export class SecurityService {

  async getGeolocation(ipAddress: string): Promise<IGeolocation> {
    try {
      const apiKey = process.env.IPINFO_API_KEY;
      
      if (!apiKey) {
        console.warn('[Security] IPINFO_API_KEY not set, returning default location');
        return this.getDefaultGeolocation(ipAddress);
      }

      const url = `https://ipinfo.io/${ipAddress}?token=${apiKey}`;
      const response = await axios.get(url, { timeout: 5000 });
      const data = response.data;

      const [latitude, longitude] = (data.loc || '0,0').split(',').map(Number);

      return {
        ip: data.ip || ipAddress,
        city: data.city || 'Unknown',
        region: data.region || 'Unknown',
        country: data.country || 'Unknown',
        countryCode: data.country || 'XX',
        latitude: latitude || 0,
        longitude: longitude || 0,
        timezone: data.timezone || 'UTC',
        org: data.org || 'Unknown',
      };

    } catch (error: any) {
      console.error('[Security] Geolocation error:', error.message);
      return this.getDefaultGeolocation(ipAddress);
    }
  }

  parseBrowserInfo(userAgent: string): IBrowserInfo {
    try {
      let name = 'Unknown';
      let version = '';
      let engine = 'Unknown';

      if (userAgent.includes('Edg/')) {
        name = 'Edge';
        version = this.extractVersion(userAgent, 'Edg/');
        engine = 'Chromium';
      } else if (userAgent.includes('Chrome/') && !userAgent.includes('Edg/')) {
        name = 'Chrome';
        version = this.extractVersion(userAgent, 'Chrome/');
        engine = 'Blink';
      } else if (userAgent.includes('Safari/') && !userAgent.includes('Chrome')) {
        name = 'Safari';
        version = this.extractVersion(userAgent, 'Version/');
        engine = 'WebKit';
      } else if (userAgent.includes('Firefox/')) {
        name = 'Firefox';
        version = this.extractVersion(userAgent, 'Firefox/');
        engine = 'Gecko';
      } else if (userAgent.includes('MSIE') || userAgent.includes('Trident/')) {
        name = 'Internet Explorer';
        version = this.extractVersion(userAgent, 'MSIE ') || this.extractVersion(userAgent, 'rv:');
        engine = 'Trident';
      }

      return { name, version, engine };

    } catch (error) {
      console.error('[Security] Browser parsing error:', error);
      return { name: 'Unknown', version: '', engine: 'Unknown' };
    }
  }

  parseOSInfo(userAgent: string): IOSInfo {
    try {
      let name = 'Unknown';
      let version = '';
      let platform = 'Unknown';

      if (userAgent.includes('Windows NT 10.0')) {
        name = 'Windows';
        version = '10/11';
        platform = 'Desktop';
      } else if (userAgent.includes('Windows NT 6.3')) {
        name = 'Windows';
        version = '8.1';
        platform = 'Desktop';
      } else if (userAgent.includes('Windows NT 6.2')) {
        name = 'Windows';
        version = '8';
        platform = 'Desktop';
      } else if (userAgent.includes('Windows NT 6.1')) {
        name = 'Windows';
        version = '7';
        platform = 'Desktop';
      } else if (userAgent.includes('Mac OS X')) {
        name = 'macOS';
        const match = userAgent.match(/Mac OS X (\d+[._]\d+[._]\d+)/);
        version = match ? match[1].replace(/_/g, '.') : '';
        platform = 'Desktop';
      } else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
        name = userAgent.includes('iPad') ? 'iPadOS' : 'iOS';
        const match = userAgent.match(/OS (\d+[._]\d+)/);
        version = match ? match[1].replace(/_/g, '.') : '';
        platform = 'Mobile';
      } else if (userAgent.includes('Android')) {
        name = 'Android';
        const match = userAgent.match(/Android (\d+\.?\d*)/);
        version = match ? match[1] : '';
        platform = 'Mobile';
      } else if (userAgent.includes('Linux')) {
        name = 'Linux';
        platform = 'Desktop';
      }

      return { name, version, platform };

    } catch (error) {
      console.error('[Security] OS parsing error:', error);
      return { name: 'Unknown', version: '', platform: 'Unknown' };
    }
  }

  async collectSecurityData(
    ipAddress: string,
    userAgent: string,
    deviceFingerprint?: string,
    screenInfo?: IScreenInfo
  ): Promise<ISecurityData> {
    
    const geolocation = await this.getGeolocation(ipAddress);
    const browser = this.parseBrowserInfo(userAgent);
    const os = this.parseOSInfo(userAgent);

    return {
      ipAddress,
      geolocation,
      deviceFingerprint: deviceFingerprint || 'not-provided',
      userAgent,
      browser,
      os,
      screen: screenInfo || { width: 0, height: 0, colorDepth: 0 },
      timestamp: new Date().toISOString(),
    };
  }

  formatForSharePoint(securityData: ISecurityData, signerEmail: string, tokenId: string): any {
    return {
      Title: `Security Log - ${signerEmail}`,
      TokenID: tokenId,
      SignerEmail: signerEmail,
      IPAddress: securityData.ipAddress,
      City: securityData.geolocation.city,
      Region: securityData.geolocation.region,
      Country: securityData.geolocation.country,
      CountryCode: securityData.geolocation.countryCode,
      Latitude: securityData.geolocation.latitude,
      Longitude: securityData.geolocation.longitude,
      Timezone: securityData.geolocation.timezone,
      ISP: securityData.geolocation.org,
      DeviceFingerprint: securityData.deviceFingerprint,
      UserAgent: securityData.userAgent,
      BrowserName: securityData.browser.name,
      BrowserVersion: securityData.browser.version,
      BrowserEngine: securityData.browser.engine,
      OSName: securityData.os.name,
      OSVersion: securityData.os.version,
      Platform: securityData.os.platform,
      ScreenWidth: securityData.screen.width,
      ScreenHeight: securityData.screen.height,
      ScreenColorDepth: securityData.screen.colorDepth,
      Timestamp: securityData.timestamp,
    };
  }

  formatAsString(securityData: ISecurityData): string {
    const loc = securityData.geolocation;
    const browser = securityData.browser;
    const os = securityData.os;
    const screen = securityData.screen;

    return `IP: ${securityData.ipAddress} | Location: ${loc.city}, ${loc.region}, ${loc.country} | Device: ${os.name} ${os.version} | Browser: ${browser.name} ${browser.version} | Screen: ${screen.width}x${screen.height}`;
  }


  private extractVersion(userAgent: string, prefix: string): string {
    const index = userAgent.indexOf(prefix);
    if (index === -1) return '';
    
    const start = index + prefix.length;
    const end = userAgent.indexOf(' ', start);
    const version = userAgent.substring(start, end === -1 ? undefined : end);
    
    return version.split('.').slice(0, 2).join('.');
  }

  private getDefaultGeolocation(ipAddress: string): IGeolocation {
    return {
      ip: ipAddress,
      city: 'Unknown',
      region: 'Unknown',
      country: 'Unknown',
      countryCode: 'XX',
      latitude: 0,
      longitude: 0,
      timezone: 'UTC',
      org: 'Unknown ISP',
    };
  }
}