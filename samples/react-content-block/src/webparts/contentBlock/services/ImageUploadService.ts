import { WebPartContext } from '@microsoft/sp-webpart-base';
import { spfi, SPFI, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/folders';
import '@pnp/sp/files';
import '@pnp/sp/files/folder';

export interface IImageUploadResult {
  success: boolean;
  serverRelativeUrl?: string;
  absoluteUrl?: string;
  error?: string;
}

export class ImageUploadService {
  private sp: SPFI;
  private context: WebPartContext;
  private assetsLibraryName: string = 'SiteAssets';
  private folderName: string = 'ProjectImages';

  constructor(context: WebPartContext) {
    this.context = context;
    this.sp = spfi().using(SPFx(context));
    console.log('ImageUploadService initialized with context:', context);
  }

  /**
   * Upload image to SharePoint SiteAssets library
   */
  public async uploadImage(file: File): Promise<IImageUploadResult> {
    try {
      console.log('Starting image upload...', file.name);
      
      // Validate file
      if (!file.type.startsWith('image/')) {
        console.error('Invalid file type:', file.type);
        return {
          success: false,
          error: 'Only image files are allowed'
        };
      }

      // Check file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        console.error('File too large:', file.size);
        return {
          success: false,
          error: 'Image size must be less than 10MB'
        };
      }

      console.log('Ensuring folder exists...');
      // Ensure folder exists
      await this.ensureFolder();

      // Generate unique filename
      const timestamp = new Date().getTime();
      const sanitizedFileName = this.sanitizeFileName(file.name);
      const fileName = `${timestamp}_${sanitizedFileName}`;
      const folderPath = `${this.assetsLibraryName}/${this.folderName}`;

      console.log('Uploading to folder:', folderPath);
      console.log('File name:', fileName);

      // Read file as array buffer
      const arrayBuffer = await this.readFileAsArrayBuffer(file);
      console.log('File read as array buffer, size:', arrayBuffer.byteLength);

      // Upload file (PnPjs v3 returns IFileInfo directly)
      const uploadResult = await this.sp.web
        .getFolderByServerRelativePath(folderPath)
        .files
        .addUsingPath(fileName, arrayBuffer, { Overwrite: true });

      console.log('Upload result:', uploadResult);

      // PnPjs v3 returns ServerRelativeUrl directly—no .file()
      const serverRelativeUrl = uploadResult.ServerRelativeUrl;

      // Construct absolute URL
      const siteUrl = this.context.pageContext.web.absoluteUrl;
      const absoluteUrl = `${siteUrl}/${this.assetsLibraryName}/${this.folderName}/${fileName}`;

      console.log('Upload successful!');
      console.log('Server relative URL:', serverRelativeUrl);
      console.log('Absolute URL:', absoluteUrl);

      return {
        success: true,
        serverRelativeUrl,
        absoluteUrl
      };

    } catch (error: unknown) {
      const err = error as Error;
      console.error('Error uploading image:', err);
      console.error('Error details:', {
        message: err.message,
        stack: err.stack
      });
      return {
        success: false,
        error: err.message || 'Failed to upload image'
      };
    }
  }

  /**
   * Ensure the folder exists in SiteAssets
   */
  private async ensureFolder(): Promise<void> {
    try {
      console.log('Checking if folders exist...');
      
      // Check if SiteAssets exists
      const folders = await this.sp.web.folders();
      const siteAssetsExists = folders.some(f => f.Name === this.assetsLibraryName);

      console.log('SiteAssets exists:', siteAssetsExists);

      if (!siteAssetsExists) {
        console.log('Creating SiteAssets library...');
        await this.sp.web.folders.addUsingPath(this.assetsLibraryName);
      }

      // Check if ProjectImages folder exists
      const assetsLibrary = this.sp.web.getFolderByServerRelativePath(this.assetsLibraryName);
      const subFolders = await assetsLibrary.folders();
      const projectFolderExists = subFolders.some(f => f.Name === this.folderName);

      console.log('ProjectImages folder exists:', projectFolderExists);

      if (!projectFolderExists) {
        console.log('Creating ProjectImages folder...');
        await assetsLibrary.folders.addUsingPath(this.folderName);
      }

      console.log('Folder structure ready!');
    } catch (error) {
      console.error('Error ensuring folder:', error);
    }
  }

  /**
   * Sanitize filename to remove special characters
   */
  private sanitizeFileName(fileName: string): string {
    const sanitized = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
    return sanitized.startsWith('.') ? sanitized.substring(1) : sanitized;
  }

  /**
   * Read file as array buffer
   */
  private readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(e.target.result as ArrayBuffer);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = () => reject(new Error('File reading failed'));
      reader.readAsArrayBuffer(file);
    });
  }

  /**
   * Delete image from SharePoint
   */
  public async deleteImage(serverRelativeUrl: string): Promise<boolean> {
    try {
      await this.sp.web.getFileByServerRelativePath(serverRelativeUrl).delete();
      console.log('Image deleted successfully:', serverRelativeUrl);
      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      return false;
    }
  }
}