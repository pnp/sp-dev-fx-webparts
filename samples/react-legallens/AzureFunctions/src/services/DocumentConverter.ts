import { PDFDocument, rgb, StandardFonts, PDFFont, PDFPage } from 'pdf-lib';

let mammoth: any;
try { mammoth = require('mammoth'); } catch { mammoth = null; }

export class DocumentConverter {


  async toPDFWithSignaturePage(
    buffer: Buffer,
    fileName: string,
    contractName: string,
    signers: Array<{ name: string; title?: string; email?: string }>
  ): Promise<Buffer> {

    const ext = fileName.split('.').pop()?.toLowerCase() ?? '';

    let bodyPDF: PDFDocument;
    if (ext === 'pdf') {
      bodyPDF = await PDFDocument.load(buffer);
    } else if (ext === 'txt') {
      const rawText = buffer.toString('utf-8');
      const safeText = this.sanitizeForWinAnsi(rawText);
      bodyPDF = await this.textToPDF(safeText);
    } else if (ext === 'docx') {
      const text = await this.docxToText(buffer);
      const safeText = this.sanitizeForWinAnsi(text);
      bodyPDF = await this.textToPDF(safeText);
    } else {
      throw new Error(`Unsupported file format: .${ext}. Supported: pdf, txt, docx`);
    }

    const sigPagePDF = await this.buildSignaturePage(contractName, signers);

    const merged = await PDFDocument.create();

    const [sigPage] = await merged.copyPages(sigPagePDF, [0]);
    merged.addPage(sigPage);

    const bodyPageCount = bodyPDF.getPageCount();
    const bodyPageIndices = Array.from({ length: bodyPageCount }, (_, i) => i);
    const copiedBodyPages = await merged.copyPages(bodyPDF, bodyPageIndices);
    copiedBodyPages.forEach(p => merged.addPage(p));

    const bytes = await merged.save();
    return Buffer.from(bytes);
  }

  private sanitizeForWinAnsi(text: string): string {
    return text
      .replace(/\uFFFD/g, '?')
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/[\u2013\u2014]/g, '-')
      .replace(/\u2026/g, '...')
      .replace(/[\u2022\u2023\u2043\u25E6\u2219]/g, '*')
      .replace(/\u00A0/g, ' ')
      .replace(/\u00AD/g, '')
      .replace(/\u2122/g, '(TM)')
      .replace(/\u00AE/g, '(R)')
      .replace(/\u00A9/g, '(c)')
      .replace(/\u20AC/g, 'EUR')
      .replace(/\u00A3/g, 'GBP')
      .replace(/\u00A5/g, 'JPY')
      .replace(/[^\x00-\xFF]/g, '')
      .replace(/\x00/g, '');
  }


  private async buildSignaturePage(
    contractName: string,
    signers: Array<{ name: string; title?: string; email?: string }>
  ): Promise<PDFDocument> {

    const doc = await PDFDocument.create();
    const page = doc.addPage([612, 792]); 
    const { width, height } = page.getSize();

    const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
    const fontReg  = await doc.embedFont(StandardFonts.Helvetica);

    const indigo: [number, number, number]      = [0.388, 0.4, 0.945];
    const darkText: [number, number, number]    = [0.059, 0.09, 0.16];
    const muted: [number, number, number]       = [0.39, 0.45, 0.56];
    const lightBorder: [number, number, number] = [0.88, 0.9, 0.95];

    page.drawRectangle({
      x: 0, y: height - 90,
      width, height: 90,
      color: rgb(...indigo),
    });

    page.drawText('LEGALLENS E-SIGNATURE', {
      x: 40, y: height - 34,
      size: 11, font: fontBold,
      color: rgb(1, 1, 1),
      opacity: 0.7,
    });

    page.drawText('Signature Page', {
      x: 40, y: height - 58,
      size: 22, font: fontBold,
      color: rgb(1, 1, 1),
    });

    page.drawText('Document', {
      x: 40, y: height - 118,
      size: 8, font: fontBold,
      color: rgb(...muted),
      opacity: 0.9,
    });
    const safeContractName = this.sanitizeForWinAnsi(contractName).substring(0, 80);
    page.drawText(safeContractName, {
      x: 40, y: height - 134,
      size: 15, font: fontBold,
      color: rgb(...darkText),
    });

    const tableTop     = height - 170;
    const tableLeft    = 40;
    const tableWidth   = width - 80;
    const nameColWidth = 200;
    const sigColWidth  = tableWidth - nameColWidth;
    const rowHeight    = 120;

    page.drawRectangle({
      x: tableLeft, y: tableTop,
      width: tableWidth, height: 35,
      color: rgb(...indigo),
    });

    page.drawText('NAME', {
      x: tableLeft + 15, y: tableTop + 12,
      size: 10, font: fontBold,
      color: rgb(1, 1, 1),
    });

    page.drawText('SIGNATURE & DATE', {
      x: tableLeft + nameColWidth + 15, y: tableTop + 12,
      size: 10, font: fontBold,
      color: rgb(1, 1, 1),
    });

    signers.forEach((signer, i) => {
      const rowTop = tableTop - (i + 1) * rowHeight;

      page.drawRectangle({
        x: tableLeft, y: rowTop,
        width: tableWidth, height: rowHeight,
        borderColor: rgb(...lightBorder),
        borderWidth: 1.5,
      });

      page.drawLine({
        start: { x: tableLeft + nameColWidth, y: rowTop + rowHeight },
        end:   { x: tableLeft + nameColWidth, y: rowTop },
        thickness: 1.5,
        color: rgb(...lightBorder),
      });

      const nameX = tableLeft + 15;
      const nameY = rowTop + rowHeight - 25;

      const safeName = this.sanitizeForWinAnsi(signer.name).substring(0, 40);
      page.drawText(safeName, {
        x: nameX, y: nameY,
        size: 13, font: fontBold,
        color: rgb(...darkText),
      });

      if (signer.title) {
        const safeTitle = this.sanitizeForWinAnsi(signer.title).substring(0, 40);
        page.drawText(safeTitle, {
          x: nameX, y: nameY - 18,
          size: 10, font: fontReg,
          color: rgb(...muted),
        });
      }

      const sigBoxX      = tableLeft + nameColWidth + 15;
      const sigBoxY      = rowTop + 15;
      const sigBoxWidth  = sigColWidth - 30;
      const sigBoxHeight = rowHeight - 30;

      page.drawRectangle({
        x: sigBoxX, y: sigBoxY,
        width: sigBoxWidth, height: sigBoxHeight,
        borderColor: rgb(...lightBorder),
        borderWidth: 1,
        color: rgb(0.98, 0.99, 1),
      });

      page.drawText('Signature will appear here', {
        x: sigBoxX + sigBoxWidth / 2 - 65,
        y: sigBoxY + sigBoxHeight / 2 - 5,
        size: 9, font: fontReg,
        color: rgb(...muted),
        opacity: 0.5,
      });
    });

    const footerY = 60;

    page.drawLine({
      start: { x: 40, y: footerY + 24 },
      end:   { x: width - 40, y: footerY + 24 },
      thickness: 1, color: rgb(...lightBorder),
    });

    page.drawText(`Generated: ${new Date().toUTCString()}`, {
      x: 40, y: footerY + 10,
      size: 8, font: fontReg,
      color: rgb(...muted),
    });

    page.drawText('This page will be completed upon electronic signing via LegalLens.', {
      x: 40, y: footerY - 4,
      size: 7.5, font: fontReg,
      color: rgb(...muted),
      opacity: 0.8,
    });

    page.drawRectangle({
      x: 0, y: 0, width, height: 44,
      color: rgb(0.97, 0.98, 1),
    });

    page.drawText('Powered by LegalLens - Budvik', {
      x: 40, y: 16,
      size: 8, font: fontReg,
      color: rgb(...muted),
    });

    page.drawText('Page 1', {
      x: width - 70, y: 16,
      size: 8, font: fontReg,
      color: rgb(...muted),
    });

    return doc;
  }


  private async textToPDF(text: string): Promise<PDFDocument> {
    const doc      = await PDFDocument.create();
    const font     = await doc.embedFont(StandardFonts.Courier);
    const fontSize = 10;
    const lineH    = fontSize * 1.5;
    const margin   = 50;
    const pageW    = 612;
    const pageH    = 792;
    const usableW  = pageW - margin * 2;
    const usableH  = pageH - margin * 2;
    const linesPerPage = Math.floor(usableH / lineH);

    const allLines: string[] = [];
    for (const raw of text.split('\n')) {
      if (raw.trim() === '') { allLines.push(''); continue; }
      let line = '';
      for (const word of raw.split(' ')) {
        const test = line ? `${line} ${word}` : word;
        try {
          if (font.widthOfTextAtSize(test, fontSize) > usableW) {
            allLines.push(line);
            line = word;
          } else {
            line = test;
          }
        } catch {
          console.error('[DocumentConverter] Skipping unprintable word');
        }
      }
      if (line) allLines.push(line);
    }

    for (let i = 0; i < allLines.length; i += linesPerPage) {
      const page  = doc.addPage([pageW, pageH]);
      const chunk = allLines.slice(i, i + linesPerPage);
      chunk.forEach((ln, j) => {
        if (!ln) return;
        try {
          page.drawText(ln, {
            x: margin,
            y: pageH - margin - j * lineH,
            size: fontSize,
            font,
            color: rgb(0.1, 0.1, 0.1),
          });
        } catch (e) {
          console.error('[DocumentConverter] drawText error on line:', ln.substring(0, 30), e);
        }
      });
    }

    if (doc.getPageCount() === 0) doc.addPage([612, 792]);
    return doc;
  }


  private async docxToText(buffer: Buffer): Promise<string> {
    if (!mammoth) {
      throw new Error(
        'mammoth package is required for .docx support. Run: npm install mammoth'
      );
    }
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }
}