// Status string (Compliant/Partial/Non-Compliant) → solid color
export const statusColor = (status: string): string =>
    status === 'Compliant' ? '#10b981' : status === 'Partial' ? '#f59e0b' : '#ef4444';

// Status string → transparent background
export const statusBgColor = (status: string): string =>
    status === 'Compliant' ? 'rgba(16,185,129,0.15)' :
    status === 'Partial' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)';

// Severity/risk level (High/Medium/Low) → solid color
export const severityColor = (level: string): string =>
    level === 'High' ? '#ef4444' : level === 'Medium' ? '#f59e0b' : '#10b981';

// Severity/risk level → transparent background
export const severityBgColor = (level: string): string =>
    level === 'High' ? 'rgba(239,68,68,0.15)' :
    level === 'Medium' ? 'rgba(245,158,11,0.15)' : 'rgba(16,185,129,0.15)';

// Finding prefix (✓/⚠/✗) → color
export const findingColor = (finding: string): string =>
    finding.startsWith('✓') ? '#10b981' : finding.startsWith('⚠') ? '#f59e0b' : '#ef4444';

// Clause risk level (lowercase: 'high'|'medium'|'low') → transparent background
export const clauseRiskBgColor = (level: string): string => {
    switch (level) {
        case 'high': return 'rgba(239,68,68,0.15)';
        case 'medium': return 'rgba(245,158,11,0.15)';
        case 'low': return 'rgba(16,185,129,0.15)';
        default: return 'rgba(255,255,255,0.05)';
    }
};

// Clause risk level (lowercase: 'high'|'medium'|'low') → solid color
export const clauseRiskTextColor = (level: string): string => {
    switch (level) {
        case 'high': return '#ef4444';
        case 'medium': return '#f59e0b';
        default: return '#10b981';
    }
};

// Risk score (0–100) → transparent background
export const riskScoreBgColor = (score: number): string => {
    if (score >= 70) return 'rgba(239,68,68,0.2)';
    if (score >= 40) return 'rgba(245,158,11,0.2)';
    return 'rgba(16,185,129,0.2)';
};

// Risk score (0–100) → solid color
export const riskScoreTextColor = (score: number): string => {
    if (score >= 70) return '#ef4444';
    if (score >= 40) return '#f59e0b';
    return '#10b981';
};
