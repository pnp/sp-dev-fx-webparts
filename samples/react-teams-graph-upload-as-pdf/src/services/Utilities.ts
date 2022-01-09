
export default class Utilities {
  private static validExtensions: string[] = ["csv", "doc", "docx", "odp", "ods", "odt", "pot", "potm", "potx", "pps", "ppsx", "ppsxm", "ppt", "pptm", "pptx", "rtf", "xls", "xlsx"];
  public static getFileExtension(fileName: string) {
    if (fileName.indexOf('.') > 0) {
      const extensions = fileName.split('.');
      const fileExtension = extensions[extensions.length - 1];
      return fileExtension;
    }
  }

  public static getFileNameAsPDF(fileName: string) {
    const orgExtension = this.getFileExtension(fileName);
    const extensionStarts = fileName.lastIndexOf(orgExtension);
    const namePart = fileName.substr(0, extensionStarts);
    return namePart + `pdf`;
  }

  public static validFileExtension(fileName: string) {
    const orgExtension = this.getFileExtension(fileName);
    if (this.validExtensions.indexOf(orgExtension) > -1) {
      return true;
    }
    else {
      return false;
    }
  }
}