import { SPFI, spfi, SPFx as spSPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IContract } from "../models/IContract";
import { IClause } from "../models/IClause";
import * as JSZip from 'jszip';

export interface ISharePointService {
  getContracts(): Promise<IContract[]>;
  getContractFile(fileUrl: string): Promise<File>;
  saveAnalyzedContract(fileName: string, fileBlob: Blob, analysisResult: any): Promise<void>;
  saveSignedDocument(fileName: string, pdfBlob: Blob, metadata: ISignedDocMetadata): Promise<void>;
  getSignedDocuments(): Promise<Array<{ contractName: string; signedAt: string; signerNames: string; fileRef: string; fileName: string }>>;
  getSignedDocumentFile(contractName: string): Promise<Blob>;
  createSignatureToken(params: ISignatureTokenParams): Promise<string>;
  getContractDriveItemId(fileUrl: string): Promise<string>;
  getSignatureTokens(): Promise<Array<{ id: string; tokenId: string; contractId: number; contractName: string; signerEmail: string; signerName: string; used: boolean; expires: string; signedDate?: string; }>>;
}

export interface ISignatureTokenParams {
  contractId: number;
  contractName: string;
  fileName: string;
  signerEmail: string;
  signerName: string;
  signerId: string;
  driveItemId?: string;
}

export interface ISignedDocMetadata {
  contractName: string;
  signerNames: string;
  signedAt: string;
}

export class SharePointService implements ISharePointService {
  private sp: SPFI;
  private libraryUrl: string;
  private diEndpoint: string;
  private diKey: string;
  private diApiVersion: string = '2024-11-30';

  constructor(
    context: WebPartContext,
    libraryUrl: string,
    documentIntelligenceEndpoint?: string,
    documentIntelligenceKey?: string
  ) {
    this.sp = spfi().using(spSPFx(context));
    this.libraryUrl = libraryUrl;
    this.diEndpoint = (documentIntelligenceEndpoint || '').replace(/\/$/, '');
    this.diKey = documentIntelligenceKey || '';
    console.log('[SharePoint] Initialized with library:', libraryUrl);
    console.log('[SharePoint] Document Intelligence:', this.diEndpoint ? 'Enabled ✓' : 'Disabled');
  }

  private async extractPDFWithDocumentIntelligence(pdfBlob: Blob, fileName: string): Promise<string> {
    console.log('[DocumentIntelligence] Submitting PDF from library:', fileName);
    const analyzeUrl = `${this.diEndpoint}/documentintelligence/documentModels/prebuilt-read:analyze?api-version=${this.diApiVersion}`;
    const submitResponse = await fetch(analyzeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/pdf',
        'Ocp-Apim-Subscription-Key': this.diKey
      },
      body: pdfBlob
    });
    if (!submitResponse.ok) {
      const errText = await submitResponse.text();
      throw new Error(`DI submit failed: ${submitResponse.status} - ${errText}`);
    }
    const operationLocation = submitResponse.headers.get('Operation-Location');
    if (!operationLocation) throw new Error('No Operation-Location header from Document Intelligence');
    for (let attempt = 1; attempt <= 60; attempt++) {
      await new Promise(r => setTimeout(r, 2000));
      const pollResponse = await fetch(operationLocation, {
        headers: { 'Ocp-Apim-Subscription-Key': this.diKey }
      });
      if (!pollResponse.ok) throw new Error(`DI polling failed: ${pollResponse.status}`);
      const result = await pollResponse.json();
      console.log('[DocumentIntelligence] Attempt', attempt, '- Status:', result.status);
      if (result.status === 'succeeded') {
        const content = result.analyzeResult?.content || '';
        console.log('[DocumentIntelligence] ✓ Extracted', content.length, 'characters from', fileName);
        return content;
      }
      if (result.status === 'failed') throw new Error(`DI failed: ${result.error?.message || 'Unknown'}`);
    }
    throw new Error('Document Intelligence timeout');
  }


  public async getContracts(): Promise<IContract[]> {
    try {
      const listTitle = this.getListTitleFromUrl(this.libraryUrl);
      console.log('[SharePoint] Fetching contracts from:', listTitle);

      const items = await this.sp.web.lists
        .getByTitle(listTitle)
        .items
        .select(
          'Id', 'Title', 'FileRef', 'FileLeafRef',
          'ContractType', 'Jurisdiction', 'Status',
          'Parties', 'ExpiryDate', 'Tags', 'RiskScore', 'Created'
        )
        .expand('File')
        .orderBy('Created', false)
        .top(100)();

      console.log('[SharePoint] Found', items.length, 'contracts');

      const contracts: IContract[] = [];

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const contract = this.mapItemToContract(item);

        if (item.FileRef) {
          try {
            console.log(`[SharePoint] Extracting content from: ${contract.name}`);
            const fullText = await this.extractDocumentContent(item.FileRef);
            (contract as any).fullText = fullText;
            console.log(`[SharePoint] ✓ Extracted ${fullText.length} characters from ${contract.name}`);
          } catch (error) {
            console.warn(`[SharePoint] Could not extract content from ${contract.name}:`, error);
            (contract as any).fullText = '';
          }
        }

        contracts.push(contract);
      }

      return contracts;

    } catch (error) {
      console.error('[SharePoint] Error fetching contracts:', error);
      throw new Error('Failed to load contracts from SharePoint library');
    }
  }


  private async extractDocumentContent(fileUrl: string): Promise<string> {
    try {
      const file = this.sp.web.getFileByServerRelativePath(fileUrl);
      const blob = await file.getBlob();
      const fileName = fileUrl.split('/').pop() || '';

      const fileType = blob.type;

      if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
        return await blob.text();
      }

      if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        fileName.endsWith('.docx')) {
        return await this.extractFromDocx(blob);
      }

      if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
        if (this.diEndpoint && this.diKey) {
          console.log('[SharePoint] Using Document Intelligence for PDF:', fileName);
          try {
            return await this.extractPDFWithDocumentIntelligence(blob, fileName);
          } catch (diErr: any) {
            console.error('[SharePoint] Document Intelligence failed for', fileName, ':', (diErr as any).message);
          }
        } else {
          console.log('[SharePoint] DI not configured, trying native PDF extraction for:', fileName);
        }
        // Native PDF text extraction fallback (no Azure service required)
        try {
          const nativeText = await this.extractTextFromPDFNative(blob, fileName);
          if (nativeText && nativeText.length > 50) {
            console.log('[SharePoint] ✓ Native PDF extraction:', nativeText.length, 'characters from', fileName);
            return nativeText;
          }
        } catch (nativeErr: any) {
          console.warn('[SharePoint] Native PDF extraction failed for', fileName, ':', nativeErr.message);
        }
        return `[PDF: ${fileName}] Enable Document Intelligence in web part settings for full PDF support.`;
      }

      const text = await blob.text();
      if (text && text.length > 50 && !text.startsWith('PK')) {
        return text;
      }

      return `[Document: ${fileName}]\n\nUnable to extract text. Supported formats: .txt, .docx`;

    } catch (error) {
      console.error('[SharePoint] Document content extraction error:', error);
      return '[Document content unavailable]';
    }
  }


  private async extractTextFromPDFNative(pdfBlob: Blob, fileName: string): Promise<string> {
    console.log('[SharePoint] Native PDF extraction:', fileName);
    const arrayBuffer = await pdfBlob.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    const textDecoder = new TextDecoder('latin1');
    const pdfText = textDecoder.decode(bytes);

    const streamRegex = /stream\n([\s\S]*?)endstream/g;
    const streams: Uint8Array[] = [];
    let streamMatch: RegExpExecArray | null;
    while ((streamMatch = streamRegex.exec(pdfText)) !== null) {
      const streamStr = streamMatch[1];
      const streamBytes = new Uint8Array(streamStr.length);
      for (let i = 0; i < streamStr.length; i++) {
        streamBytes[i] = streamStr.charCodeAt(i) & 0xff;
      }
      streams.push(streamBytes);
    }

    const allTextParts: string[] = [];
    for (const streamBytes of streams) {
      try {
        let contentBytes = streamBytes;
        const startStr = textDecoder.decode(streamBytes.slice(0, 4));
        if (/^[!-u~]/.test(startStr)) {
          contentBytes = this.decodeAscii85(streamBytes);
        }
        let decompressed: Uint8Array;
        try {
          decompressed = await this.zlibDecompress(contentBytes);
        } catch (e) {
          decompressed = contentBytes;
          console.warn('[SharePoint] decompression error:', e.message);
        }
        const content = new TextDecoder('latin1').decode(decompressed);
        const btBlocks = content.match(/BT[\s\S]*?ET/g) || [];
        for (const block of btBlocks) {
          // Tj operator — exec loop (ES5-compatible, no matchAll)
          const tjRe = /\(([^)]*)\)\s*(?:Tj|'|")/g;
          let tjM: RegExpExecArray | null;
          while ((tjM = tjRe.exec(block)) !== null) {
            const decoded = this.decodePDFString(tjM[1]);
            if (decoded.trim()) allTextParts.push(decoded.trim());
          }
          // TJ array operator — exec loop
          const tjArrRe = /\[([^\]]*)\]\s*TJ/g;
          let tjArrM: RegExpExecArray | null;
          while ((tjArrM = tjArrRe.exec(block)) !== null) {
            const innerRe = /\(([^)]*)\)/g;
            let innerM: RegExpExecArray | null;
            while ((innerM = innerRe.exec(tjArrM[1])) !== null) {
              const decoded = this.decodePDFString(innerM[1]);
              if (decoded.trim()) allTextParts.push(decoded.trim());
            }
          }
        }
      } catch (e: any) {
        console.warn('[SharePoint] decompression error:', e.message);
      }
    }

    const result = allTextParts.join(' ').replace(/[ \t]{2,}/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
    console.log('[SharePoint] Native PDF extracted:', result.length, 'characters');
    return result;
  }

  private decodeAscii85(input: Uint8Array): Uint8Array {
    const text = new TextDecoder('ascii').decode(input);
    const cleaned = text.replace(/\s/g, '').replace(/~>$/, '');
    const output: number[] = [];
    let i = 0;
    while (i < cleaned.length) {
      if (cleaned[i] === 'z') { output.push(0, 0, 0, 0); i++; continue; }
      const group = cleaned.slice(i, i + 5).padEnd(5, 'u');
      let val = 0;
      for (const ch of group) val = val * 85 + (ch.charCodeAt(0) - 33);
      const padding = Math.max(0, 5 - (cleaned.length - i));
      const b = [(val >> 24) & 0xff, (val >> 16) & 0xff, (val >> 8) & 0xff, val & 0xff];
      output.push(...b.slice(0, 4 - padding));
      i += 5;
    }
    return new Uint8Array(output);
  }

  private async zlibDecompress(data: Uint8Array): Promise<Uint8Array> {
    const ds = new (window as any).DecompressionStream('deflate');
    const writer = ds.writable.getWriter();
    const reader = ds.readable.getReader();
    writer.write(data); writer.close();
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
    const totalLen = chunks.reduce((s: number, c: Uint8Array) => s + c.length, 0);
    const result = new Uint8Array(totalLen);
    let offset = 0;
    for (const chunk of chunks) { result.set(chunk, offset); offset += chunk.length; }
    return result;
  }

  private decodePDFString(s: string): string {
    return s
      .replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\t/g, '\t')
      .replace(/\\\(/g, '(').replace(/\\\)/g, ')').replace(/\\\\/g, '\\')
      .replace(/\\(\d{3})/g, (_: string, oct: string) => String.fromCharCode(parseInt(oct, 8)));
  }


  private async extractFromDocx(blob: Blob): Promise<string> {
    try {
      const arrayBuffer = await blob.arrayBuffer();
      const zip = await JSZip.loadAsync(arrayBuffer);
      const documentXml = await zip.file('word/document.xml')?.async('text');

      if (!documentXml) {
        throw new Error('Invalid .docx format - missing document.xml');
      }


      const textContent = documentXml
        .replace(/<w:p[^>]*>/g, '\n\n')
        .replace(/<w:br[^>]*\/>/g, '\n')
        .replace(/<w:t[^>]*>/g, '')
        .replace(/<\/w:t>/g, '')
        .replace(/<[^>]+>/g, '')
        .replace(/[ \t]+/g, ' ')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

      return textContent || '[No text found in document]';

    } catch (error) {
      console.error('[SharePoint] .docx extraction error:', error);
      throw error;
    }
  }


  public async getContractFile(fileUrl: string): Promise<File> {
    try {
      console.log('[SharePoint] Fetching file from:', fileUrl);

      const file = this.sp.web.getFileByServerRelativePath(fileUrl);
      const blob = await file.getBlob();

      const fileName = fileUrl.split('/').pop() || 'contract.docx';

      console.log('[SharePoint] Downloaded file:', fileName, 'Size:', blob.size);

      const fileObject = new File([blob], fileName, {
        type: blob.type,
        lastModified: Date.now()
      });

      return fileObject;
    } catch (error) {
      console.error('[SharePoint] Error downloading file:', error);
      throw new Error('Failed to download contract file');
    }
  }


  public async saveAnalyzedContract(
    fileName: string,
    fileBlob: Blob,
    analysisResult: any
  ): Promise<void> {
    try {
      const listTitle = this.getListTitleFromUrl(this.libraryUrl);
      console.log('[SharePoint] Uploading to library:', listTitle);
      console.log('[SharePoint] File:', fileName);
      console.log('[SharePoint] Analysis result:', analysisResult);

      console.log('[SharePoint] Step 1: Uploading file...');
      await this.sp.web.lists
        .getByTitle(listTitle)
        .rootFolder
        .files
        .addUsingPath(fileName, fileBlob, { Overwrite: true });

      console.log('[SharePoint] Step 1: File uploaded successfully');

      console.log('[SharePoint] Step 2: Getting uploaded file...');
      const file = await this.sp.web.lists
        .getByTitle(listTitle)
        .rootFolder
        .files
        .getByUrl(fileName);

      console.log('[SharePoint] Step 2: File retrieved');

      console.log('[SharePoint] Step 3: Getting list item...');
      const item = await file.getItem();
      console.log('[SharePoint] Step 3: List item retrieved');

      console.log('[SharePoint] Step 4: Updating metadata...');
      const metadata = {
        Title: analysisResult.fileName || fileName,
        ContractType: analysisResult.contractType || 'General Agreement',
        Jurisdiction: analysisResult.jurisdiction || 'Not specified',
        Status: analysisResult.overallRiskScore >= 70 ? 'Critical' :
          analysisResult.overallRiskScore >= 40 ? 'Warning' : 'Compliant',
        Parties: analysisResult.parties ? analysisResult.parties.join(';') : '',
        ExpiryDate: analysisResult.expiryDate && analysisResult.expiryDate !== 'Not specified' ?
          analysisResult.expiryDate : null,
        Tags: analysisResult.riskFactors && analysisResult.riskFactors.length > 0 ?
          analysisResult.riskFactors.map((f: any) => f.factor).join(';') : '',
        RiskScore: analysisResult.overallRiskScore || 0
      };

      console.log('[SharePoint] Metadata to update:', metadata);

      await item.update(metadata);

      console.log('[SharePoint] ✓ Contract saved successfully:', fileName);

    } catch (error) {
      console.error('[SharePoint] ✗ Error saving contract:', error);
      console.error('[SharePoint] Error details:', JSON.stringify(error, null, 2));
      throw new Error(`Failed to save contract: ${error.message || error}`);
    }
  }


  private getListTitleFromUrl(url: string): string {
    const segments = url.split('/').filter(s => s.length > 0);
    return segments[segments.length - 1];
  }


  private mapItemToContract(item: any): IContract {
    const parties = this.parseMultiValue(item.Parties);
    const tags = this.parseMultiValue(item.Tags);
    const clauses = this.generateSampleClauses(item.ContractType || 'General Agreement');
    const flag = this.calculateFlag(item.ExpiryDate);

    return {
      id: item.Id,
      name: item.Title || item.FileLeafRef || `Contract ${item.Id}`,
      type: item.ContractType || 'General Agreement',
      jurisdiction: item.Jurisdiction || 'Not specified',
      status: (item.Status?.toLowerCase() as 'compliant' | 'warning' | 'critical') || 'compliant',
      parties: parties.length > 0 ? parties : ['Party A', 'Party B'],
      expiry: item.ExpiryDate ? new Date(item.ExpiryDate).toISOString().split('T')[0] : '2027-12-31',
      tags: tags.length > 0 ? tags : ['untagged'],
      risk: item.RiskScore ?? 0,
      uploaded: item.Created ? new Date(item.Created).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      summary: this.generateSummary(item),
      clauses: clauses,
      flag: flag,
      fileUrl: item.FileRef || item.File?.ServerRelativeUrl
    };
  }

  private parseMultiValue(value: string | null | undefined): string[] {
    if (!value) return [];
    return value.split(';').map(v => v.trim()).filter(v => v.length > 0);
  }

  private calculateFlag(expiryDate: string | null | undefined): string | undefined {
    if (!expiryDate) return undefined;
    const expiry = new Date(expiryDate);
    const now = new Date();
    const daysUntilExpiry = Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (daysUntilExpiry < 0) return 'Expired';
    if (daysUntilExpiry < 90) return 'Expiring soon';
    return undefined;
  }

  private generateSummary(item: any): string {
    const type = item.ContractType || 'agreement';
    const parties = this.parseMultiValue(item.Parties);
    const jurisdiction = item.Jurisdiction || 'unspecified jurisdiction';
    if (parties.length >= 2) {
      return `${type} between ${parties.join(' and ')}. Governing law: ${jurisdiction}.`;
    }
    return `${type} governing business relationship. Jurisdiction: ${jurisdiction}.`;
  }

  private generateSampleClauses(contractType: string): IClause[] {
    const templates: { [key: string]: IClause[] } = {
      'Vendor Agreement': [
        { ref: '§1.1', title: 'Scope of Services', text: 'Vendor shall provide services as outlined in Statement of Work.' },
        { ref: '§4.2', title: 'Liability Cap', text: 'Total liability not to exceed $2,000,000 per year.' }
      ],
      'NDA': [
        { ref: '§1', title: 'Confidential Information', text: 'All non-public business and technical information.' },
        { ref: '§4', title: 'Term', text: 'Agreement effective for three (3) years.' }
      ]
    };
    return templates[contractType] || [
      { ref: '§1', title: 'General Terms', text: 'Standard terms and conditions apply.' }
    ];
  }

  public async saveSignedDocument(
    fileName: string,
    pdfBlob: Blob,
    metadata: ISignedDocMetadata
  ): Promise<void> {
    try {
      const signedLibrary = 'Signed Documents';
      console.log('[SharePoint] Saving signed PDF to:', signedLibrary);
      console.log('[SharePoint] File:', fileName);

      // Upload PDF file
      await this.sp.web.lists
        .getByTitle(signedLibrary)
        .rootFolder
        .files
        .addUsingPath(fileName, pdfBlob, { Overwrite: true });

      // Get file and update metadata
      const file = await this.sp.web.lists
        .getByTitle(signedLibrary)
        .rootFolder
        .files
        .getByUrl(fileName);

      const item = await file.getItem();

      await item.update({
        Title: 'Signed – ' + metadata.contractName,
        ContractType: 'Signed Document',
        Parties: metadata.signerNames,
        Status: 'Completed',
        Tags: 'Signed;E-Signature;Completed',
        RiskScore: 0,
      });

      console.log('[SharePoint] ✓ Signed PDF saved:', fileName);
    } catch (error: any) {
      console.error('[SharePoint] ✗ Signed document save error:', error);
      if (error.message && error.message.includes('does not exist')) {
        throw new Error('Signed Documents library not found. Create it in SharePoint with columns: Title, ContractType, Parties, Status, Tags, RiskScore');
      }
      throw new Error(`Failed to save signed document: ${error.message || error}`);
    }
  }

  public async getSignedDocuments(): Promise<Array<{
    contractName: string;
    signedAt: string;
    signerNames: string;
    fileRef: string;
    fileName: string;
  }>> {
    try {
      const signedLibrary = 'Signed Documents';
      console.log('[SharePoint] Fetching signed documents from:', signedLibrary);

      const items = await this.sp.web.lists
        .getByTitle(signedLibrary)
        .items
        .select('Title', 'Parties', 'Created', 'FileRef', 'FileLeafRef')
        .orderBy('Created', false)
        .top(100)();

      console.log('[SharePoint] Found', items.length, 'signed documents');

      return items.map(item => ({
        contractName: (item.Title || '').replace('Signed – ', ''),
        signedAt: item.Created || '',
        signerNames: item.Parties || '',
        fileRef: item.FileRef || '',
        fileName: item.FileLeafRef || '',
      }));
    } catch (error: any) {
      console.error('[SharePoint] Error fetching signed documents:', error);
      // Return empty array if library doesn't exist yet
      if (error.message && error.message.includes('does not exist')) {
        console.warn('[SharePoint] Signed Documents library not found - assuming no signed docs');
        return [];
      }
      throw new Error(`Failed to fetch signed documents: ${error.message || error}`);
    }
  }

  public async getSignedDocumentFile(contractName: string): Promise<Blob> {
    try {
      const signedLibrary = 'Signed Documents';
      console.log('[SharePoint] Downloading signed document:', contractName);

      // Find files that start with the contract name (they have _signed_timestamp suffix)
      const items = await this.sp.web.lists
        .getByTitle(signedLibrary)
        .items
        .select('Title', 'FileRef', 'FileLeafRef')
        .filter(`substringof('${contractName.replace(/\.[^.]+$/, '')}', FileLeafRef)`)
        .top(10)();

      if (items.length === 0) {
        throw new Error(`No signed version found for "${contractName}"`);
      }

      // Get the most recent signed version
      const latestItem = items[items.length - 1];
      const fileUrl = latestItem.FileRef;

      console.log('[SharePoint] Found signed file:', fileUrl);

      const file = this.sp.web.getFileByServerRelativePath(fileUrl);
      const blob = await file.getBlob();

      console.log('[SharePoint] ✓ Downloaded signed PDF:', blob.size, 'bytes');
      return blob;
    } catch (error: any) {
      console.error('[SharePoint] Error downloading signed document:', error);
      throw new Error(`Failed to download signed document: ${error.message || error}`);
    }
  }


  public async getContractDriveItemId(fileUrl: string): Promise<string> {
    try {
      console.log('[SharePoint] Getting drive item ID for:', fileUrl);

      const file = this.sp.web.getFileByServerRelativePath(fileUrl);
      const listItem = await file.getItem();

      //FIX: Cast to any to access UniqueId property
      const uniqueId = (listItem as any).UniqueId || '';

      if (!uniqueId) {
        console.warn('[SharePoint] No UniqueId found for file:', fileUrl);
        return '';
      }

      console.log('[SharePoint] Drive Item ID:', uniqueId);
      return uniqueId;

    } catch (error: any) {
      console.error('[SharePoint] Error getting drive item ID:', error);
      return ''; // Return empty instead of throwing - this is non-critical
    }
  }


  public async createSignatureToken(params: ISignatureTokenParams): Promise<string> {
    try {
      const tokensListTitle = 'Signature Tokens';
      console.log('[SharePoint] Creating signature token for:', params.signerEmail);

      // Generate a cryptographically safe random token ID
      const tokenId = this.generateTokenId();

      // Token expires in 7 days
      const expires = new Date();
      expires.setDate(expires.getDate() + 7);

      await this.sp.web.lists
        .getByTitle(tokensListTitle)
        .items
        .add({
          Title: tokenId,          // Title doubles as a display label
          TokenID: tokenId,
          ContractID: params.contractId,
          ContractName: params.contractName,
          FileName: params.fileName,
          SignerEmail: params.signerEmail,
          SignerName: params.signerName,
          SignerID: params.signerId,
          DriveItemID: params.driveItemId || '',
          Expires: expires.toISOString(),
          Used: false,
        });

      console.log('[SharePoint] ✓ Signature token created:', tokenId, 'expires:', expires.toISOString());
      return tokenId;
    } catch (error: any) {
      console.error('[SharePoint] ✗ Error creating signature token:', error);
      if (error.message && error.message.includes('does not exist')) {
        throw new Error(
          `"Signature Tokens" list not found. ` +
          `Create it in SharePoint with columns: TokenID, ContractID, ContractName, ` +
          `FileName, SignerEmail, SignerName, SignerID, DriveItemID, Expires, Used.`
        );
      }
      throw new Error(`Failed to create signature token: ${error.message || error}`);
    }
  }

 public async getSignatureTokens(): Promise<Array<{
  id: string;
  tokenId: string;
  contractId: number;
  contractName: string;
  signerEmail: string;
  signerName: string;
  used: boolean;
  expires: string;
  signedDate?: string;
}>> {
  try {
    console.log('[SharePoint] Fetching signature tokens...');

    const items = await this.sp.web.lists
      .getByTitle('Signature Tokens')
      .items
      .select(
        'Id',
        'TokenID',
        'ContractID',
        'ContractName',
        'SignerEmail',
        'SignerName',
        'Used',
        'Expires',
        'SignedDate'
      )
      .orderBy('Created', false)
      .top(500)();

    console.log('[SharePoint] Found', items.length, 'tokens');

    return items.map(item => ({
      id: item.Id?.toString() || '',
      tokenId: item.TokenID || '',
      contractId: item.ContractID || 0,
      contractName: item.ContractName || '',
      signerEmail: item.SignerEmail || '',
      signerName: item.SignerName || '',
      used: item.Used === true,
      expires: item.Expires || '',
      signedDate: item.SignedDate || undefined,
    }));
  } catch (error: any) {
    console.error('[SharePoint] Error fetching tokens:', error);
    
    // If list doesn't exist yet, return empty array (don't throw)
    if (error.message && error.message.includes('does not exist')) {
      console.warn('[SharePoint] Signature Tokens list not found - returning empty array');
      return [];
    }
    
    throw new Error(`Failed to fetch signature tokens: ${error.message || error}`);
  }
}

  /** Generates a URL-safe random token (48 hex chars = 24 random bytes) */
  private generateTokenId(): string {
    const array = new Uint8Array(24);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }


}