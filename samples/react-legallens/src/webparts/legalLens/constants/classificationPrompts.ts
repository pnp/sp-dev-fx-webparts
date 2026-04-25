const MAX_DOCUMENT_LENGTH = 3000;

const truncate = (text: string): string => text.substring(0, MAX_DOCUMENT_LENGTH);

export const buildContractTypePrompt = (documentText: string): string =>
  `Analyze this legal contract and classify its type.

Document Text:
${truncate(documentText)}

CRITICAL: Respond with ONLY valid JSON. No explanation, no markdown, no preamble.

Return this exact JSON structure:
{
  "documentType": "SaaS Agreement | Vendor Agreement | NDA | SLA | DPA | MSA | etc.",
  "parties": ["Party 1 Name", "Party 2 Name"],
  "jurisdiction": "Washington, USA | Delaware, USA | California, USA | UK | EU (GDPR)",
  "effectiveDate": "YYYY-MM-DD",
  "expiryDate": "YYYY-MM-DD",
  "keyClauses": ["Service Level (§3)", "Liability Cap (§5.1)", "Termination (§7)"],
  "autoTags": ["SaaS", "Cloud", "Enterprise", "Data Processing"],
  "duplicateFlag": "No duplicates found ✓",
  "confidence": 0.95
}`;

export const buildRiskAssessmentPrompt = (documentText: string): string =>
  `Perform a comprehensive risk assessment of this legal contract.

Document Text:
${truncate(documentText)}

Analyze risk factors and provide assessment in JSON format:
{
  "overallRiskScore": 45,
  "riskLevel": "Medium",
  "status": "warning",
  "riskFactors": [
    {
      "category": "Liability",
      "factor": "Limited liability cap",
      "severity": "High",
      "score": 75,
      "description": "Liability capped at $2M, may be insufficient",
      "recommendation": "Consider increasing cap to $5M"
    },
    {
      "category": "Termination",
      "factor": "Long notice period",
      "severity": "Medium",
      "score": 45,
      "description": "90-day termination notice required",
      "recommendation": "Negotiate down to 60 days"
    }
  ],
  "complianceIssues": [
    "Missing GDPR data retention clause",
    "Weak indemnification language"
  ],
  "mitigationSteps": [
    "Add GDPR-compliant data processing addendum",
    "Strengthen liability and indemnification clauses",
    "Review insurance coverage requirements"
  ],
  "confidence": 0.92
}`;

export const buildCompliancePrompt = (documentText: string): string =>
  `Check this contract for compliance with major regulations.

Document Text:
${truncate(documentText)}

Provide compliance assessment in JSON format:
{
  "overallCompliance": "Partial",
  "complianceScore": 72,
  "regulations": [
    {
      "name": "GDPR",
      "status": "Compliant",
      "score": 95,
      "findings": [
        "✓ Data processing agreement present",
        "✓ Subject rights specified",
        "⚠ Data retention period unclear"
      ],
      "recommendations": ["Specify data retention timeline"]
    },
    {
      "name": "CCPA",
      "status": "Non-Compliant",
      "score": 45,
      "findings": [
        "✗ Missing California consumer rights clause",
        "✗ No opt-out mechanism specified"
      ],
      "recommendations": [
        "Add CCPA consumer rights addendum",
        "Implement opt-out procedures"
      ]
    },
    {
      "name": "SOC 2",
      "status": "Compliant",
      "score": 88,
      "findings": [
        "✓ Security controls referenced",
        "✓ Audit rights included"
      ],
      "recommendations": []
    }
  ],
  "criticalIssues": 2,
  "warnings": 3,
  "confidence": 0.89
}`;

export const buildEntityExtractionPrompt = (documentText: string): string =>
  `You are a JSON-only API. Return ONLY valid JSON with no explanation.

Extract entities from this contract and return ONLY this JSON structure (no text before or after):

Document Text:
${truncate(documentText)}

RETURN ONLY THIS JSON:
{
  "parties": [
    {
      "name": "NovaCorp Inc",
      "role": "Vendor",
      "jurisdiction": "Delaware",
      "contact": "legal@novacorp.com"
    },
    {
      "name": "LegalLens Inc",
      "role": "Client",
      "jurisdiction": "California",
      "contact": "contracts@legallens.io"
    }
  ],
  "dates": {
    "effective": "2026-02-15",
    "expiry": "2028-02-15",
    "renewal": "Auto-renew unless terminated",
    "noticePeriod": "90 days"
  },
  "financialTerms": {
    "contractValue": "$500,000 annually",
    "paymentTerms": "Net 30",
    "liabilityCap": "$2,000,000",
    "insuranceRequired": "$5,000,000 general liability"
  },
  "keyObligations": [
    "Vendor must maintain SOC 2 Type II certification",
    "Client must provide 90-day termination notice",
    "Both parties must maintain confidentiality"
  ],
  "governingLaw": "Delaware, USA",
  "disputeResolution": "Binding arbitration in Delaware",
  "confidence": 0.94
}`;
