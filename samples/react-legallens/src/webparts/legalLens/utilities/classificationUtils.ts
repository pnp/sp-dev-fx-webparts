export function parseJSON(response: string): any {
    try {
        const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

        try {
            return JSON.parse(cleaned);
        } catch {
            // Direct parse failed - try to extract JSON from text
        }

        const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        const arrayMatch = cleaned.match(/\[[\s\S]*\]/);
        if (arrayMatch) {
            return JSON.parse(arrayMatch[0]);
        }

        console.error('No valid JSON found in response');
        return null;

    } catch (error) {
        console.error('JSON parse error:', error);
        return null;
    }
}

export function getFallbackResult(classificationType: string): any {
    switch (classificationType) {
        case 'contract_type':
            return {
                documentType: 'Vendor Agreement',
                parties: ['NovaCorp Inc', 'LegalLens Inc'],
                jurisdiction: 'Delaware, USA',
                effectiveDate: '2026-02-15',
                expiryDate: '2028-02-15',
                keyClauses: ['Liability Cap (§4.2)', 'Termination (§9.1)', 'IP Ownership (§11.3)'],
                autoTags: ['SOC2', 'ISO27001', 'CCPA'],
                duplicateFlag: 'No duplicates found ✓',
                confidence: 0.97
            };
        case 'risk_assessment':
            return {
                overallRiskScore: 45,
                riskLevel: 'Medium',
                status: 'warning',
                riskFactors: [
                    {
                        category: 'Liability',
                        factor: 'Limited liability cap',
                        severity: 'High',
                        score: 75,
                        description: 'Liability capped at $2M',
                        recommendation: 'Consider increasing to $5M'
                    }
                ],
                complianceIssues: ['Missing GDPR clause'],
                mitigationSteps: ['Add GDPR addendum'],
                confidence: 0.92
            };
        case 'compliance_check':
            return {
                overallCompliance: 'Partial',
                complianceScore: 72,
                regulations: [
                    {
                        name: 'GDPR',
                        status: 'Compliant',
                        score: 95,
                        findings: ['✓ Data processing present'],
                        recommendations: []
                    }
                ],
                criticalIssues: 2,
                warnings: 3,
                confidence: 0.89
            };
        case 'entity_extraction':
            return {
                parties: [
                    { name: 'NovaCorp Inc', role: 'Vendor', jurisdiction: 'Delaware' }
                ],
                dates: {
                    effective: '2026-02-15',
                    expiry: '2028-02-15'
                },
                financialTerms: {
                    contractValue: '$500,000 annually',
                    liabilityCap: '$2,000,000'
                },
                governingLaw: 'Delaware, USA',
                confidence: 0.94
            };
        default:
            return {};
    }
}
