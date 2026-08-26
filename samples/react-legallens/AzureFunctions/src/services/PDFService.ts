import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export class PDFService {

  /**
   * Add signature to PDF in table format
   * 
   * @param pdfBuffer - PDF with signature page (page 1)
   * @param signatureB64 - Base64 signature image
   * @param signerName - Name of signer
   * @param signerEmail - Email of signer
   * @param signerIndex - Row index (0-based)
   * @param totalSigners - Total number of signers
   */
  async addSignatureToPDF(
    pdfBuffer: Buffer,
    signatureB64: string,
    signerName:   string = '',
    signerEmail:  string = '',
    signerIndex:  number = 0,
    totalSigners: number = 1
  ): Promise<Buffer> {
    try {
      const pdfDoc  = await PDFDocument.load(pdfBuffer);
      const sigPage = pdfDoc.getPage(0); 
      const { width, height } = sigPage.getSize();

      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const fontReg  = await pdfDoc.embedFont(StandardFonts.Helvetica);

      const base64Data = signatureB64.includes(',') 
        ? signatureB64.split(',')[1] 
        : signatureB64;
      
      let sigImage;
      try { 
        sigImage = await pdfDoc.embedPng(base64Data); 
      } catch { 
        sigImage = await pdfDoc.embedJpg(base64Data); 
      }

      const tableTop = height - 170;
      const tableLeft = 40;
      const tableWidth = width - 80;
      const nameColWidth = 200;
      const sigColWidth = tableWidth - nameColWidth;
      const rowHeight = 120;

      const rowTop = tableTop - (signerIndex + 1) * rowHeight;

      const sigBoxX = tableLeft + nameColWidth + 15;
      const sigBoxY = rowTop + 15;
      const sigBoxWidth = sigColWidth - 30;
      const sigBoxHeight = rowHeight - 30;

      const imgDims = sigImage.scale(1);
      const scale = Math.min(
        (sigBoxWidth - 20) / imgDims.width,
        (sigBoxHeight - 35) / imgDims.height,
        1
      );

      const imgX = sigBoxX + (sigBoxWidth - imgDims.width * scale) / 2;
      const imgY = sigBoxY + (sigBoxHeight - imgDims.height * scale) / 2 + 12;

      sigPage.drawImage(sigImage, {
        x: imgX,
        y: imgY,
        width: imgDims.width * scale,
        height: imgDims.height * scale,
      });

      sigPage.drawRectangle({
        x: sigBoxX, 
        y: sigBoxY,
        width: sigBoxWidth, 
        height: sigBoxHeight,
        borderColor: rgb(0.086, 0.73, 0.51),
        borderWidth: 2,
      });

      const badgeWidth = 58;
      const badgeHeight = 16;
      const badgeX = sigBoxX + sigBoxWidth - badgeWidth - 8;
      const badgeY = sigBoxY + sigBoxHeight - badgeHeight - 8;
      
      sigPage.drawRectangle({
        x: badgeX, 
        y: badgeY,
        width: badgeWidth, 
        height: badgeHeight,
        color: rgb(0.086, 0.73, 0.51),
      });

      sigPage.drawText('SIGNED', {
        x: badgeX + 10, 
        y: badgeY + 4,
        size: 7, 
        font: fontBold,
        color: rgb(1, 1, 1),
      });

      const timestamp = new Date().toISOString()
        .replace('T', ' ')
        .substring(0, 19) + ' UTC';
      
      sigPage.drawText(`Signed: ${timestamp}`, {
        x: sigBoxX + 10, 
        y: sigBoxY - 10,
        size: 8, 
        font: fontReg,
        color: rgb(0.39, 0.45, 0.56),
      });

      if (signerEmail) {
        sigPage.drawText(signerEmail, {
          x: sigBoxX + 10, 
          y: sigBoxY - 22,
          size: 7, 
          font: fontReg,
          color: rgb(0.39, 0.45, 0.56),
        });
      }

      const pageBadgeWidth = 158;
      const pageBadgeHeight = 26;
      const pageBadgeX = width - pageBadgeWidth - 22;
      const pageBadgeY = height - 48;

      sigPage.drawRectangle({
        x: pageBadgeX, 
        y: pageBadgeY,
        width: pageBadgeWidth, 
        height: pageBadgeHeight,
        color: rgb(0.94, 0.97, 1), 
        borderColor: rgb(0.388, 0.4, 0.945), 
        borderWidth: 1,
      });

      sigPage.drawText('Electronically Signed', {
        x: pageBadgeX + 8, 
        y: pageBadgeY + 8,
        size: 8.5, 
        font: fontBold,
        color: rgb(0.388, 0.4, 0.945),
      });

      const pdfBytes = await pdfDoc.save();
      return Buffer.from(pdfBytes);

    } catch (error) {
      console.error('[PDF] Error adding signature:', error);
      throw error;
    }
  }

  async addSignatureAtPosition(
    pdfBuffer: Buffer, 
    signatureB64: string,
    _page: number, 
    _pos: any, 
    signerName = '', 
    signerEmail = ''
  ): Promise<Buffer> {
    return this.addSignatureToPDF(
      pdfBuffer, 
      signatureB64, 
      signerName, 
      signerEmail, 
      0, 
      1
    );
  }
}