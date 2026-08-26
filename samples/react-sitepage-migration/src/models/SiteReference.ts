export interface SiteReference {
  readonly id: string;
  readonly displayName: string;
  readonly webUrl: string;
  readonly hostname: string;
  readonly path: string;
  readonly description?: string;
}
