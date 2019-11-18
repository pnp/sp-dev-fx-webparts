export const DOCICONURL_XLSX = 'https://static2.sharepointonline.com/files/fabric/assets/item-types/96/xlsx.png';
export const DOCICONURL_DOCX = 'https://static2.sharepointonline.com/files/fabric/assets/item-types/96/docx.png';
export const DOCICONURL_PPTX = 'https://static2.sharepointonline.com/files/fabric/assets/item-types/96/pptx.png';
export const DOCICONURL_MPPX = 'https://static2.sharepointonline.com/files/fabric/assets/item-types/96/mpp.png';
export const DOCICONURL_PHOTO = 'https://static2.sharepointonline.com/files/fabric/assets/item-types/96/photo.png';
export const DOCICONURL_PDF = 'https://static2.sharepointonline.com/files/fabric/assets/item-types/96/pdf.png';
export const DOCICONURL_TXT = 'https://static2.sharepointonline.com/files/fabric/assets/item-types/96/txt.png';
export const DOCICONURL_EMAIL = 'https://static2.sharepointonline.com/files/fabric/assets/item-types/96/email.png';
export const DOCICONURL_CSV = 'https://static2.sharepointonline.com/files/fabric/assets/item-types/96/csv.png';
export const DOCICONURL_ONE = 'https://static2.sharepointonline.com/files/fabric/assets/item-types/96/one.png';
export const DOCICONURL_VSDX = 'https://static2.sharepointonline.com/files/fabric/assets/item-types/96/vsdx.png';
export const DOCICONURL_VSSX = 'https://static2.sharepointonline.com/files/fabric/assets/item-types/96/vssx.png';
export const DOCICONURL_PUB = 'https://static2.sharepointonline.com/files/fabric/assets/item-types/96/pub.png';
export const DOCICONURL_ACCDB = 'https://static2.sharepointonline.com/files/fabric/assets/item-types/96/accdb.png';
export const DOCICONURL_ZIP = 'https://static2.sharepointonline.com/files/fabric/assets/item-types/96/zip.png';
export const DOCICONURL_GENERIC = 'https://static2.sharepointonline.com/files/fabric/assets/item-types/96/genericfile.png';
export const DOCICONURL_CODE = 'https://static2.sharepointonline.com/files/fabric/assets/item-types/96/code.png';
export const DOCICONURL_HTML = 'https://static2.sharepointonline.com/files/fabric/assets/item-types/96/html.png';
export const DOCICONURL_XML = 'https://static2.sharepointonline.com/files/fabric/assets/item-types/96/xml.png';
export const DOCICONURL_SPO = 'https://static2.sharepointonline.com/files/fabric/assets/item-types/96/spo.png';
export const DOCICONURL_VIDEO = 'https://static2.sharepointonline.com/files/fabric/assets/item-types/96/video.png';
const defaultLinkImg: string = require('./../../assets/mbri-link.svg');

export class utilities {
	constructor() {}

	/**
   * GetFileImageUrl
   */
	public GetFileImageUrl(_file: string): Promise<string> {

    _file = _file.replace('?web=1','');
    let _fileImageUrl: string = defaultLinkImg;

    try {
      const url = new URL(_file);
      _fileImageUrl  = `${url.origin}/favicon.ico`;
    } catch (error) {
       _fileImageUrl= defaultLinkImg;
    }
		const _fileTypes = _file.split('.');
		const fileType = _fileTypes[_fileTypes.length - 1];
		if (!fileType) {
			return Promise.resolve(_fileImageUrl);
		}
		switch (fileType.toLowerCase()) {
			case 'xlsx':
				_fileImageUrl = DOCICONURL_XLSX;
				break;
			case 'xls':
				_fileImageUrl = DOCICONURL_XLSX;
				break;
			case 'docx':
				_fileImageUrl = DOCICONURL_DOCX;
				break;
			case 'doc':
				_fileImageUrl = DOCICONURL_DOCX;
				break;
			case 'pptx':
				_fileImageUrl = DOCICONURL_PPTX;
				break;
			case 'ppt':
				_fileImageUrl = DOCICONURL_PPTX;
				break;
			case 'mppx':
				_fileImageUrl = DOCICONURL_MPPX;
				break;
			case 'mpp':
				_fileImageUrl = DOCICONURL_MPPX;
				break;
			case 'csv':
				_fileImageUrl = DOCICONURL_CSV;
				break;
			case 'pdf':
				_fileImageUrl = DOCICONURL_PDF;
				break;
			case 'txt':
				_fileImageUrl = DOCICONURL_TXT;
				break;
			case 'jpg':
				_fileImageUrl = DOCICONURL_PHOTO;
				break;
			case 'msg':
				_fileImageUrl = DOCICONURL_EMAIL;
				break;
			case 'jpeg':
				_fileImageUrl = DOCICONURL_PHOTO;
				break;
			case 'png':
				_fileImageUrl = DOCICONURL_PHOTO;
				break;
			case 'ico':
				_fileImageUrl = DOCICONURL_PHOTO;
				break;
			case 'tiff':
				_fileImageUrl = DOCICONURL_PHOTO;
				break;
			case 'eml':
				_fileImageUrl = DOCICONURL_EMAIL;
				break;
			case 'pub':
				_fileImageUrl = DOCICONURL_PUB;
				break;
			case 'accdb':
				_fileImageUrl = DOCICONURL_ACCDB;
				break;
			case 'zip':
				_fileImageUrl = DOCICONURL_ZIP;
				break;
			case '7z':
				_fileImageUrl = DOCICONURL_ZIP;
				break;
			case 'tar':
				_fileImageUrl = DOCICONURL_ZIP;
				break;
			case 'js':
				_fileImageUrl = DOCICONURL_CODE;
				break;
			case 'html':
				_fileImageUrl = DOCICONURL_HTML;
				break;
			case 'xml':
				_fileImageUrl = DOCICONURL_XML;
				break;
			case 'aspx':
				_fileImageUrl = DOCICONURL_SPO;
				break;
			case 'mp4':
				_fileImageUrl = DOCICONURL_VIDEO;
				break;
			case 'mov':
				_fileImageUrl = DOCICONURL_VIDEO;
				break;
			case 'wmv':
				_fileImageUrl = DOCICONURL_VIDEO;
				break;
			case 'ogg':
				_fileImageUrl = DOCICONURL_VIDEO;
				break;
			case 'webm':
				_fileImageUrl = DOCICONURL_VIDEO;
        break;
      case 'pkg':
        	_fileImageUrl = DOCICONURL_ZIP;
          break;
			default:

				break;
		}
		return Promise.resolve(_fileImageUrl);
	}

	public getFileType(_file: string): Promise<string> {
		let _fileType: string = 'Other';
    _file = _file.replace('?web=1','');
		const _fileTypes = _file.split('.');
		const fileType = _fileTypes[_fileTypes.length - 1];
		if (!fileType) {
			return Promise.resolve(_fileType);
		}
		switch (fileType.toLowerCase()) {
			case 'xlsx':
				_fileType = 'Excel';
				break;
			case 'xls':
				_fileType = 'Excel';
				break;
			case 'docx':
				_fileType = 'Word';
				break;
			case 'doc':
				_fileType = 'Word';
				break;
			case 'pptx':
				_fileType = 'PowerPoint';
				break;
			case 'ppt':
				_fileType = 'PowerPoint';
				break;
			case 'pdf':
				_fileType = 'Pdf';
				break;
			case 'one':
				_fileType = 'OneNote';
				break;
			case 'mppx':
				_fileType = 'Project';
				break;
			case 'mpp':
				_fileType = 'Project';
				break;
			case 'vsdx':
				_fileType = 'Visio';
				break;
			case 'vsd':
				_fileType = 'Visio';
				break;
			case 'vdx':
				_fileType = 'Visio';
				break;

			default:
				_fileType = 'Other';
				break;
		}
		return Promise.resolve(_fileType);
	}
}
