import * as JSZip from 'jszip';
import { IClassificationResult } from '../models/IClassificationResult';
import { IContractAnalysis } from '../models/IContractAnalysis';
import { IMultilingualAnswer } from '../models/IMultilingualAnswer';

export interface IAzureAIFoundryService {
  analyzeContract(fileBlob: Blob, fileName: string): Promise<IContractAnalysis>;
  classifyDocument(fileBlob: Blob, fileName: string, classificationType: string): Promise<IClassificationResult>;
  translate(text: string, targetLangName: string): Promise<string>;
  askQuestionMultilingual(question: string, questionLangName: string, contract: any, conversationHistory: any[]): Promise<IMultilingualAnswer>;
  extractTextFromFile(file: File | Blob): Promise<string>;
  callAI(prompt: string, maxTokens: number): Promise<string>;
}

export class AzureAIFoundryService implements IAzureAIFoundryService {
  private projectEndpoint: string;
  private apiKey: string;
  private deploymentName: string;
  private diEndpoint: string;
  private diKey: string;
  private diApiVersion: string = '2024-11-30';

  constructor(
    projectEndpoint: string,
    apiKey: string,
    deploymentName: string = 'gpt-4o',
    documentIntelligenceEndpoint?: string,
    documentIntelligenceKey?: string
  ) {
    this.projectEndpoint = projectEndpoint;
    this.apiKey = apiKey;
    this.deploymentName = deploymentName;
    this.diEndpoint = (documentIntelligenceEndpoint || '').replace(/\/$/, '');
    this.diKey = documentIntelligenceKey || '';

    console.log('[AzureAI] Initialized with:');
    console.log('  Endpoint:', projectEndpoint);
    console.log('  Deployment:', deploymentName);
    console.log('  Document Intelligence:', this.diEndpoint ? 'Enabled ✓' : 'Disabled');
  }

  private async extractPDFWithDocumentIntelligence(pdfBlob: Blob, fileName: string): Promise<string> {
    console.log('[DocumentIntelligence] Submitting PDF:', fileName, '- Size:', pdfBlob.size, 'bytes');
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
      throw new Error(`Document Intelligence submit failed: ${submitResponse.status} - ${errText}`);
    }
    const operationLocation = submitResponse.headers.get('Operation-Location');
    if (!operationLocation) throw new Error('No Operation-Location header from Document Intelligence');
    console.log('[DocumentIntelligence] Step 2: Document submitted, polling for results...');
    for (let attempt = 1; attempt <= 60; attempt++) {
      await new Promise(r => setTimeout(r, 2000));
      const pollResponse = await fetch(operationLocation, {
        headers: { 'Ocp-Apim-Subscription-Key': this.diKey }
      });
      if (!pollResponse.ok) throw new Error(`DI polling failed: ${pollResponse.status}`);
      const result = await pollResponse.json();
      console.log('[DocumentIntelligence] Polling attempt', attempt, '/ 60');
      console.log('[DocumentIntelligence] Status:', result.status);
      if (result.status === 'succeeded') {
        const content = result.analyzeResult?.content || '';
        console.log('[DocumentIntelligence] ✓ Extracted', content.length, 'characters from', fileName);
        return content;
      }
      if (result.status === 'failed') {
        throw new Error(`DI analysis failed: ${result.error?.message || 'Unknown'}`);
      }
    }
    throw new Error('Document Intelligence timeout after 2 minutes');
  }

  public async analyzeContract(fileBlob: Blob, fileName: string): Promise<IContractAnalysis> {
    console.log('[AzureAI] Analyzing contract:', fileName);

    try {
      // Extract text from file
      const extractedText = await this.extractTextFromFile(fileBlob);

      // Analyze with AI
      const analysisPrompt = `Analyze this legal contract and extract key information.

Contract Text:
${extractedText}

Respond ONLY with valid JSON (no markdown, no code blocks):
{
  "parties": ["Party 1 name", "Party 2 name"],
  "effectiveDate": "YYYY-MM-DD or Not specified",
  "expiryDate": "YYYY-MM-DD or Not specified",
  "jurisdiction": "jurisdiction name",
  "contractType": "Vendor Agreement, NDA, SLA, etc",
  "clauses": [
    {
      "ref": "§1.1",
      "title": "Clause title",
      "text": "Brief clause summary (max 150 chars)",
      "riskLevel": "low",
      "riskReason": "optional reason if risky"
    }
  ],
  "overallRiskScore": 45,
  "riskFactors": [
    {
      "factor": "Limited liability cap",
      "severity": "medium",
      "description": "Liability capped at $2M",
      "recommendation": "Consider increasing cap"
    }
  ],
  "summary": "Brief 2-sentence contract summary"
}`;

      const result = await this.callAI(analysisPrompt, 2000);
      const analysis = this.parseJSON(result);

      return {
        fileName,
        parties: analysis.parties || ['Party A', 'Party B'],
        effectiveDate: analysis.effectiveDate || 'Not specified',
        expiryDate: analysis.expiryDate || 'Not specified',
        jurisdiction: analysis.jurisdiction || 'Not specified',
        contractType: analysis.contractType || 'General Agreement',
        clauses: analysis.clauses || [],
        overallRiskScore: analysis.overallRiskScore || 0,
        riskFactors: analysis.riskFactors || [],
        summary: analysis.summary || `Analysis of ${fileName}`,
        analyzedAt: new Date().toISOString()
      };

    } catch (error) {
      console.error('[AzureAI] Analysis error:', error);
      return this.getFallbackAnalysis(fileName);
    }
  }

  /**
   * Classify document
   */
  public async classifyDocument(
    fileBlob: Blob,
    fileName: string,
    classificationType: string
  ): Promise<IClassificationResult> {
    console.log('[AzureAI] Classifying:', fileName, 'Type:', classificationType);

    try {
      const text = await this.extractTextFromFile(fileBlob);

      const prompt = `Classify this document as "${classificationType}".

Text: ${text.substring(0, 2000)}

Respond with JSON only:
{
  "primaryCategory": "main category",
  "secondaryCategories": ["cat1", "cat2"],
  "confidence": 0.85,
  "detectedLanguage": "en",
  "keyTerms": ["term1", "term2"],
  "suggestedTags": ["tag1", "tag2"],
  "complianceFlags": [{"regulation": "GDPR", "applicable": true, "reason": "reason"}]
}`;

      const result = await this.callAI(prompt, 1500);
      const classification = this.parseJSON(result);

      return {
        classificationType,
        confidence: classification.confidence || 0.85,
        primaryCategory: classification.primaryCategory || 'Uncategorized',
        secondaryCategories: classification.secondaryCategories || [],
        detectedLanguage: classification.detectedLanguage || 'en',
        keyTerms: classification.keyTerms || [],
        suggestedTags: classification.suggestedTags || [],
        complianceFlags: classification.complianceFlags || [],
        classifiedAt: new Date().toISOString()
      };

    } catch (error) {
      console.error('[AzureAI] Classification error:', error);
      return {
        classificationType,
        confidence: 0.5,
        primaryCategory: 'Uncategorized',
        secondaryCategories: [],
        detectedLanguage: 'en',
        keyTerms: [],
        suggestedTags: [],
        complianceFlags: [],
        classifiedAt: new Date().toISOString()
      };
    }
  }

  public async translate(text: string, targetLangName: string): Promise<string> {
    const prompt = `Translate this legal contract text to ${targetLangName}.

Keep clause references (§) unchanged.
Maintain formal legal language.

Text: ${text}

Output ONLY the translation, no explanations.`;

    return await this.callAI(prompt, 1500);
  }

  public async askQuestionMultilingual(
    question: string,
    questionLangName: string,
    contract: any,
    conversationHistory: any[]
  ): Promise<IMultilingualAnswer> {
    console.log('[AzureAI] Q&A in', questionLangName, ':', question);

    // Build contract info - prefer full text if available
    let contractInfo = '';

    if (contract.fullText && contract.fullText.length > 100) {
      // Use actual document content
      console.log('[AzureAI] Using full document text (length:', contract.fullText.length, ')');
      contractInfo = `Contract: ${contract.name}

FULL CONTRACT TEXT:
${contract.fullText}

Basic Info:
Type: ${contract.type}
Parties: ${contract.parties.join(', ')}
Jurisdiction: ${contract.jurisdiction}`;
    } else {
      // Fallback to metadata summary
      console.log('[AzureAI] Using contract metadata/summary');
      contractInfo = `Contract: ${contract.name}
Type: ${contract.type}
Parties: ${contract.parties.join(', ')}
Jurisdiction: ${contract.jurisdiction}

Summary: ${contract.summary}

Clauses:
${contract.clauses.map((c: any) => `${c.ref} ${c.title}: ${c.text}`).join('\n')}`;
    }

    const systemPrompt = `You are a legal contract assistant. Answer questions about this contract in ${questionLangName}.

CRITICAL: Respond in ${questionLangName} (same language as question).
Use information from the contract only.
Cite clause references (§) when applicable.
Be specific and reference actual contract terms.

${contractInfo}`;

    const messages: any[] = [{ role: 'system', content: systemPrompt }];

    conversationHistory.forEach(msg => {
      messages.push({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.text
      });
    });

    messages.push({ role: 'user', content: question });

    const answer = await this.callAIWithMessages(messages, 1500);
    const citedClauses = this.extractClauseReferences(answer);

    return {
      question,
      questionLanguage: questionLangName,
      answer,
      answerLanguage: questionLangName,
      citedClauses,
      confidence: 0.9
    };
  }

  public async extractTextFromFile(fileBlob: File | Blob): Promise<string> {
    try {
      const fileName = (fileBlob as File).name || '';
      const fileType = fileBlob.type;

      console.log('[AzureAI] Extracting text from:', fileName, 'Type:', fileType);

      // For .txt files - direct text extraction
      if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
        const text = await fileBlob.text();
        console.log('[AzureAI] Text extracted (length):', text.length);
        return text;
      }

      // For .docx files - extract from XML
      if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        fileName.endsWith('.docx')) {
        console.log('[AzureAI] Extracting from .docx file...');
        return await this.extractFromDocx(fileBlob);
      }

      // For .pdf files — try DI first, then native text extraction fallback
      if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
        if (this.diEndpoint && this.diKey) {
          console.log('[AzureAI] Using Document Intelligence for PDF extraction...');
          try {
            const text = await this.extractPDFWithDocumentIntelligence(fileBlob, fileName);
            console.log('[AzureAI] ✓ Extracted', text.length, 'characters via Document Intelligence');
            return text;
          } catch (diErr: any) {
            console.error('[AzureAI] Document Intelligence failed, trying native extraction:', diErr.message);
          }
        } else {
          console.log('[AzureAI] Document Intelligence not configured, trying native PDF text extraction...');
        }
        // Native PDF text extraction — reads raw bytes, no Azure service needed
        try {
          const nativeText = await this.extractTextFromPDFNative(fileBlob, fileName);
          if (nativeText && nativeText.length > 50) {
            console.log('[AzureAI] ✓ Native PDF extraction succeeded:', nativeText.length, 'characters');
            return nativeText;
          }
        } catch (nativeErr: any) {
          console.warn('[AzureAI] Native PDF extraction failed:', nativeErr.message);
        }
        return `[PDF: ${fileName}] Unable to extract text. Enable Document Intelligence in web part settings for full PDF support.`;
      }

      // Default - try text extraction
      const text = await fileBlob.text();
      if (text && text.length > 100 && !text.startsWith('PK')) {
        console.log('[AzureAI] Text extracted (length):', text.length);
        return text;
      }

      console.warn('[AzureAI] Could not extract readable text from file');
      return `[Document: ${fileName}] - Unable to extract text. Please use .txt or .docx format.`;

    } catch (error) {
      console.error('[AzureAI] Text extraction error:', error);
      return '[Document text extraction failed - Please try .txt format]';
    }
  }

  private async extractTextFromPDFNative(pdfBlob: Blob, fileName: string): Promise<string> {
    console.log('[AzureAI] Native PDF extraction:', fileName);
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

    console.log('[AzureAI] Found', streams.length, 'PDF streams');
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
          console.warn('[AzureAI] Decompressing error:', e.message);
        }

        const content = new TextDecoder('latin1').decode(decompressed);
        const btBlocks = content.match(/BT[\s\S]*?ET/g) || [];

        for (const block of btBlocks) {
          // Tj operator — using exec loop (no matchAll needed)
          const tjRe = /\(([^)]*)\)\s*(?:Tj|'|")/g;
          let tjM: RegExpExecArray | null;
          while ((tjM = tjRe.exec(block)) !== null) {
            const decoded = this.decodePDFString(tjM[1]);
            if (decoded.trim()) allTextParts.push(decoded.trim());
          }
          // TJ array operator — using exec loops
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
        console.warn('[AzureAI] Decompressing error:', e.message);
      }
    }

    const result = allTextParts.join(' ')
      .replace(/[ \t]{2,}/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    console.log('[AzureAI] Native PDF extracted:', result.length, 'characters');
    return result;
  }

  /** Decode ASCII85 encoded bytes */
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

  /** Decompress deflate/zlib data using browser DecompressionStream */
  private async zlibDecompress(data: Uint8Array): Promise<Uint8Array> {
    const ds = new (window as any).DecompressionStream('deflate');
    const writer = ds.writable.getWriter();
    const reader = ds.readable.getReader();
    writer.write(data);
    writer.close();
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

  /** Decode PDF string escape sequences */
  private decodePDFString(s: string): string {
    return s
      .replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\t/g, '\t')
      .replace(/\\\(/g, '(').replace(/\\\)/g, ')').replace(/\\\\/g, '\\')
      .replace(/\\(\d{3})/g, (_: string, oct: string) => String.fromCharCode(parseInt(oct, 8)));
  }

  private async extractFromDocx(fileBlob: Blob): Promise<string> {
    try {
      // Read as ArrayBuffer
      const arrayBuffer = await fileBlob.arrayBuffer();

      // Use JSZip to extract the document.xml from .docx
      const zip = await JSZip.loadAsync(arrayBuffer);
      const documentXml = await zip.file('word/document.xml')?.async('text');

      if (!documentXml) {
        console.error('[AzureAI] Could not find document.xml in .docx');
        return '[Invalid .docx file format]';
      }

      // Extract text from XML (simple regex-based extraction)
      const textContent = documentXml
        .replace(/<w:t[^>]*>/g, '')
        .replace(/<\/w:t>/g, ' ')
        .replace(/<[^>]+>/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      console.log('[AzureAI] Extracted text from .docx (length):', textContent.length);
      return textContent || '[No text found in .docx file]';

    } catch (error) {
      console.error('[AzureAI] .docx extraction error:', error);
      return '[.docx extraction failed - Please try saving as .txt]';
    }
  }

  public async callAI(prompt: string, maxTokens: number = 1500): Promise<string> {
    return await this.callAIWithMessages(
      [{ role: 'user', content: prompt }],
      maxTokens
    );
  }

  private async callAIWithMessages(messages: any[], maxTokens: number = 1500): Promise<string> {

    // Extract resource name from AI Foundry endpoint
    const resourceMatch = this.projectEndpoint.match(/https:\/\/([^.]+)-resource\.services\.ai\.azure\.com/);
    const resourceName = resourceMatch ? resourceMatch[1] : 'legallex';

    // Build Azure OpenAI endpoint
    const azureOpenAIEndpoint = `https://${resourceName}-resource.openai.azure.com`;
    const url = `${azureOpenAIEndpoint}/openai/deployments/${this.deploymentName}/chat/completions?api-version=2024-08-01-preview`;

    console.log('[AzureAI] Resource:', resourceName);
    console.log('[AzureAI] Calling:', url);

    const requestBody: any = {
      messages: messages,
      max_tokens: maxTokens,
      temperature: 0.7
    };

    const userMessage = messages.find(m => m.role === 'user')?.content || '';
    if (userMessage.toLowerCase().includes('json') || userMessage.toLowerCase().includes('return only this json')) {
      requestBody.response_format = { type: "json_object" };
      console.log('[AzureAI] Using JSON mode for structured response');
    }

    console.log('[AzureAI] Request body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': this.apiKey
      },
      body: JSON.stringify(requestBody)
    });

    console.log('[AzureAI] Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[AzureAI] Error response:', errorText);
      throw new Error(`AI API failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('[AzureAI] Success! Response received');

    return data.choices[0]?.message?.content || '';
  }

  private parseJSON(text: string): any {
    try {
      // Remove markdown code blocks
      const cleaned = text
        .replace(/```json\s*/g, '')
        .replace(/```\s*/g, '')
        .trim();

      return JSON.parse(cleaned);
    } catch (error) {
      console.error('[AzureAI] JSON parse error:', error);
      return {};
    }
  }

  private extractClauseReferences(text: string): string[] {
    const regex = /§\s*[\d.]+/g;
    const matches = text.match(regex) || [];
    const unique: string[] = [];
    matches.forEach(m => {
      if (unique.indexOf(m) === -1) unique.push(m);
    });
    return unique;
  }

  private getFallbackAnalysis(fileName: string): IContractAnalysis {
    return {
      fileName,
      parties: ['Party A', 'Party B'],
      effectiveDate: 'Not specified',
      expiryDate: 'Not specified',
      jurisdiction: 'Not specified',
      contractType: 'General Agreement',
      clauses: [
        {
          ref: '§1',
          title: 'General Terms',
          text: 'Standard contract terms apply.',
          riskLevel: 'low'
        }
      ],
      overallRiskScore: 0,
      riskFactors: [],
      summary: `Contract: ${fileName}. AI analysis unavailable - manual review required.`,
      analyzedAt: new Date().toISOString()
    };
  }
}