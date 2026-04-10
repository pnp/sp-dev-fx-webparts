import { jsPDF } from 'jspdf';
import { IContract } from '../models/IContract';
import { ISigner, ISignatureField } from '../models/ISignature';

export async function generateSignedPDF(
  contract: IContract,
  fields: ISignatureField[],
  signers: ISigner[]
): Promise<jsPDF> {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  let yPos = margin;

  // ─── SIGNATURE TABLE AT TOP ───
  const tableStartY = yPos;
  const nameColWidth = 60;
  const rowHeight = 35;
  const headerHeight = 10;

  // Table border
  pdf.setDrawColor(99, 102, 241);
  pdf.setLineWidth(0.5);
  const tableHeight = headerHeight + (signers.length * rowHeight);
  pdf.rect(margin, tableStartY, contentWidth, tableHeight);

  // Header background
  pdf.setFillColor(99, 102, 241);
  pdf.rect(margin, tableStartY, contentWidth, headerHeight, 'F');

  // Header text
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.text('NAME', margin + 3, tableStartY + 7);
  pdf.text('SIGNATURE & DATE', margin + nameColWidth + 3, tableStartY + 7);

  // Column separator
  pdf.line(margin + nameColWidth, tableStartY, margin + nameColWidth, tableStartY + tableHeight);

  pdf.setTextColor(0, 0, 0);

  // Data rows
  const signatureFields = fields.filter(f => f.type === 'signature' && f.value);
  
  signers.forEach((signer, index) => {
    const rowY = tableStartY + headerHeight + (index * rowHeight);
    const sigField = signatureFields.find(f => f.signer === signer.id);
    
    if (index < signers.length - 1) {
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.3);
      pdf.line(margin, rowY + rowHeight, margin + contentWidth, rowY + rowHeight);
    }
    
    // Name column
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text(signer.name, margin + 3, rowY + 8);
    
    if (signer.title) {
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(80, 80, 80);
      pdf.text(signer.title, margin + 3, rowY + 13);
    }
    
    if (signer.email) {
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.text(signer.email, margin + 3, rowY + 18);
    }
    
    pdf.setTextColor(0, 0, 0);
    
    // Signature column
    if (sigField && sigField.value) {
      try {
        pdf.addImage(sigField.value, 'PNG', margin + nameColWidth + 5, rowY + 3, 50, 15);
        
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(80, 80, 80);
        const signDate = new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
        pdf.text(`Signed: ${signDate}`, margin + nameColWidth + 5, rowY + 22);
        pdf.setTextColor(0, 0, 0);
      } catch (e) {
        console.warn('Signature image error:', e);
      }
    }
  });

  yPos = tableStartY + tableHeight + 15;

  // ─── DOCUMENT TITLE ───
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  const docTitle = contract.name.replace(/\.(docx|pdf|txt)$/i, '').toUpperCase();
  pdf.text(docTitle, margin, yPos);
  yPos += 12;

  // ─── DOCUMENT CONTENT ───
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  
  const contractText = (contract as any).fullText || contract.summary || '';
  
  // Split by double newlines first (paragraph breaks)
  const blocks = contractText.split(/\n\n+/);
  
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i].trim();
    
    // Skip empty blocks
    if (!block) {
      continue;
    }
    
    // Check for page break
    if (yPos > pageHeight - 30) {
      pdf.addPage();
      yPos = margin;
    }
    
    // Detect section headers and metadata
    const isSectionHeader = /^§\d+\./.test(block);
    const isMetadataLine = /^(Contract Reference|Prepared by|Effective Date|Expiry Date|Client|Service Provider|Jurisdiction|Contract Type):/.test(block);
    const isAllCapsHeader = block === block.toUpperCase() && block.length < 100 && block.length > 3 && !/\d{4}/.test(block);
    const isSignatureLine = /^(CLIENT|SERVICE PROVIDER|Authorized Signatory|Name:|Title:|Date:)/.test(block);
    
    const isHeader = isSectionHeader || isMetadataLine || isAllCapsHeader || isSignatureLine;
    
    if (isHeader) {
      // Add spacing before header (unless at top of page)
      if (yPos > margin + 5) {
        yPos += 5;
      }
      
      pdf.setFont('helvetica', 'bold');
      
      if (isSectionHeader) {
        pdf.setFontSize(12);
      } else if (isAllCapsHeader) {
        pdf.setFontSize(13);
      } else {
        pdf.setFontSize(11);
      }
      
      const headerLines = pdf.splitTextToSize(block, contentWidth);
      for (const line of headerLines) {
        if (yPos > pageHeight - 30) {
          pdf.addPage();
          yPos = margin;
        }
        pdf.text(line, margin, yPos);
        yPos += 6.5;
      }
      
      // Add spacing after header
      yPos += 3;
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
    } else {
      // Regular paragraph - check if it contains single line breaks
      const lines = block.split(/\n/);
      
      for (let j = 0; j < lines.length; j++) {
        const line = lines[j].trim();
        if (!line) continue;
        
        const wrappedLines = pdf.splitTextToSize(line, contentWidth);
        
        for (const wrappedLine of wrappedLines) {
          if (yPos > pageHeight - 30) {
            pdf.addPage();
            yPos = margin;
          }
          pdf.text(wrappedLine, margin, yPos);
          yPos += 5.5;
        }
        
        // Small space between lines within same paragraph
        if (j < lines.length - 1) {
          yPos += 1;
        }
      }
      
      // Larger space between paragraphs
      yPos += 5;
    }
  }

  // ─── FOOTER ───
  const pageCount = (pdf as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    const footerY = pageHeight - 15;
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'italic');
    pdf.setTextColor(120, 120, 120);
    pdf.text('This document has been electronically signed. All signatures are legally binding.', 
             pageWidth / 2, footerY, { align: 'center' });
    pdf.setFontSize(7);
    pdf.text(`Page ${i} of ${pageCount}`, pageWidth / 2, footerY + 4, { align: 'center' });
  }

  return pdf;
}