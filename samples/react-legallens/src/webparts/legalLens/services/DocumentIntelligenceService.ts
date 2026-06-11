import { IDocumentAnalysisResult, ITable, ITableCell, IKeyValuePair, IParagraph } from '../models/IDocumentAnalysisResult';

export interface IDocumentIntelligenceService {
  extractTextFromPDF(pdfBlob: Blob, fileName: string): Promise<string>;
  analyzeDocument(pdfBlob: Blob): Promise<IDocumentAnalysisResult>;
  isConfigured(): boolean;
}

export class DocumentIntelligenceService implements IDocumentIntelligenceService {
  private endpoint: string;
  private apiKey: string;
  private apiVersion: string = '2024-11-30';
  private configured: boolean;

  constructor(endpoint?: string, apiKey?: string) {
    this.endpoint = endpoint?.replace(/\/$/, '') || '';
    this.apiKey = apiKey || '';
    this.configured = !!(this.endpoint && this.apiKey);
    
    if (this.configured) {
      console.log('[DocumentIntelligence] ✓ Service configured');
      console.log('[DocumentIntelligence] Endpoint:', this.endpoint);
    } else {
      console.log('[DocumentIntelligence] ⚠ Service not configured - PDF extraction will be limited');
    }
  }

  public isConfigured(): boolean {
    return this.configured;
  }

  public async extractTextFromPDF(pdfBlob: Blob, fileName: string): Promise<string> {
    if (!this.configured) {
      throw new Error('Document Intelligence not configured. Please provide endpoint and API key in web part properties.');
    }

    console.log('[DocumentIntelligence] Extracting text from PDF:', fileName);
    console.log('[DocumentIntelligence] File size:', pdfBlob.size, 'bytes');

    try {
      // Step 1: Submit document for analysis using Read model
      const analyzeUrl = `${this.endpoint}/documentintelligence/documentModels/prebuilt-read:analyze?api-version=${this.apiVersion}`;
      
      console.log('[DocumentIntelligence] Step 1: Submitting document...');
      const submitResponse = await fetch(analyzeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/pdf',
          'Ocp-Apim-Subscription-Key': this.apiKey
        },
        body: pdfBlob
      });

      if (!submitResponse.ok) {
        const errorText = await submitResponse.text();
        console.error('[DocumentIntelligence] Submit failed:', errorText);
        throw new Error(`Document submission failed: ${submitResponse.status} ${submitResponse.statusText}`);
      }

      // Get operation location from response headers
      const operationLocation = submitResponse.headers.get('Operation-Location');
      if (!operationLocation) {
        throw new Error('No Operation-Location header in response');
      }

      console.log('[DocumentIntelligence] Step 2: Document submitted, polling for results...');

      // Step 2: Poll for results
      const result = await this.pollForResults(operationLocation);

      // Step 3: Extract text from result
      const extractedText = this.extractTextFromResult(result);

      console.log('[DocumentIntelligence] ✓ Extracted', extractedText.length, 'characters from', fileName);
      
      return extractedText;

    } catch (error) {
      console.error('[DocumentIntelligence] Error extracting PDF:', error);
      throw new Error(`Failed to extract text from PDF: ${error.message}`);
    }
  }

  public async analyzeDocument(pdfBlob: Blob): Promise<IDocumentAnalysisResult> {
    if (!this.configured) {
      throw new Error('Document Intelligence not configured');
    }

    console.log('[DocumentIntelligence] Analyzing document structure...');

    try {
      // Use prebuilt-document model for comprehensive analysis
      const analyzeUrl = `${this.endpoint}/documentintelligence/documentModels/prebuilt-document:analyze?api-version=${this.apiVersion}`;
      
      const submitResponse = await fetch(analyzeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/pdf',
          'Ocp-Apim-Subscription-Key': this.apiKey
        },
        body: pdfBlob
      });

      if (!submitResponse.ok) {
        throw new Error(`Analysis submission failed: ${submitResponse.status}`);
      }

      const operationLocation = submitResponse.headers.get('Operation-Location');
      if (!operationLocation) {
        throw new Error('No Operation-Location header in response');
      }

      const result = await this.pollForResults(operationLocation);

      // Extract structured data
      const analysis: IDocumentAnalysisResult = {
        content: this.extractTextFromResult(result),
        pages: result.analyzeResult?.pages?.length || 0,
        tables: this.extractTables(result),
        keyValuePairs: this.extractKeyValuePairs(result),
        paragraphs: this.extractParagraphs(result)
      };

      console.log('[DocumentIntelligence] ✓ Analysis complete');
      console.log('[DocumentIntelligence]   Pages:', analysis.pages);
      console.log('[DocumentIntelligence]   Tables:', analysis.tables.length);
      console.log('[DocumentIntelligence]   Key-Value Pairs:', analysis.keyValuePairs.length);
      console.log('[DocumentIntelligence]   Paragraphs:', analysis.paragraphs.length);

      return analysis;

    } catch (error) {
      console.error('[DocumentIntelligence] Analysis error:', error);
      throw new Error(`Document analysis failed: ${error.message}`);
    }
  }

  private async pollForResults(operationLocation: string, maxAttempts: number = 60): Promise<any> {
    let attempts = 0;
    const pollInterval = 2000; // 2 seconds

    while (attempts < maxAttempts) {
      attempts++;

      console.log('[DocumentIntelligence] Polling attempt', attempts, '/', maxAttempts);

      const response = await fetch(operationLocation, {
        method: 'GET',
        headers: {
          'Ocp-Apim-Subscription-Key': this.apiKey
        }
      });

      if (!response.ok) {
        throw new Error(`Polling failed: ${response.status}`);
      }

      const result = await response.json();
      const status = result.status;

      console.log('[DocumentIntelligence] Status:', status);

      if (status === 'succeeded') {
        return result;
      } else if (status === 'failed') {
        const errorMsg = result.error?.message || result.analyzeResult?.errors?.[0]?.message || 'Unknown error';
        throw new Error(`Analysis failed: ${errorMsg}`);
      }

      // Still running, wait before next poll
      if (attempts < maxAttempts) {
        await this.sleep(pollInterval);
      }
    }

    throw new Error('Analysis timeout - maximum polling attempts reached (2 minutes)');
  }

  private extractTextFromResult(result: any): string {
    try {
      const analyzeResult = result.analyzeResult;
      if (!analyzeResult) {
        throw new Error('No analyzeResult in response');
      }

      // Extract text from content field (most comprehensive)
      if (analyzeResult.content) {
        return analyzeResult.content;
      }

      // Fallback: Extract from paragraphs
      if (analyzeResult.paragraphs && analyzeResult.paragraphs.length > 0) {
        return analyzeResult.paragraphs.map((p: any) => p.content).join('\n\n');
      }

      // Fallback: Extract from pages
      if (analyzeResult.pages && analyzeResult.pages.length > 0) {
        const textParts: string[] = [];
        
        for (const page of analyzeResult.pages) {
          if (page.lines && page.lines.length > 0) {
            const pageText = page.lines.map((line: any) => line.content).join('\n');
            textParts.push(pageText);
          }
        }

        return textParts.join('\n\n');
      }

      throw new Error('No text content found in analysis result');

    } catch (error) {
      console.error('[DocumentIntelligence] Error extracting text:', error);
      throw error;
    }
  }

  private extractTables(result: any): ITable[] {
    const tables: ITable[] = [];

    try {
      const analyzeResult = result.analyzeResult;
      if (!analyzeResult?.tables) {
        return tables;
      }

      for (const table of analyzeResult.tables) {
        const cells: ITableCell[] = [];

        if (table.cells) {
          for (const cell of table.cells) {
            cells.push({
              rowIndex: cell.rowIndex,
              columnIndex: cell.columnIndex,
              content: cell.content || ''
            });
          }
        }

        tables.push({
          rowCount: table.rowCount || 0,
          columnCount: table.columnCount || 0,
          cells: cells
        });
      }

    } catch (error) {
      console.warn('[DocumentIntelligence] Error extracting tables:', error);
    }

    return tables;
  }

  private extractKeyValuePairs(result: any): IKeyValuePair[] {
    const pairs: IKeyValuePair[] = [];

    try {
      const analyzeResult = result.analyzeResult;
      if (!analyzeResult?.keyValuePairs) {
        return pairs;
      }

      for (const pair of analyzeResult.keyValuePairs) {
        if (pair.key && pair.value) {
          pairs.push({
            key: pair.key.content || '',
            value: pair.value.content || '',
            confidence: pair.confidence || 0
          });
        }
      }

    } catch (error) {
      console.warn('[DocumentIntelligence] Error extracting key-value pairs:', error);
    }

    return pairs;
  }

  private extractParagraphs(result: any): IParagraph[] {
    const paragraphs: IParagraph[] = [];

    try {
      const analyzeResult = result.analyzeResult;
      if (!analyzeResult?.paragraphs) {
        return paragraphs;
      }

      for (const para of analyzeResult.paragraphs) {
        paragraphs.push({
          content: para.content || '',
          role: para.role,
          boundingBox: para.boundingRegions?.[0]?.polygon
        });
      }

    } catch (error) {
      console.warn('[DocumentIntelligence] Error extracting paragraphs:', error);
    }

    return paragraphs;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}