import { IContract } from '../models/IContract';
import { IAlert } from '../models/IAlert';

export function generateAlerts(contracts: IContract[]): IAlert[] {
    const alerts: IAlert[] = [];

    contracts.forEach(contract => {
        // Expiring soon
        if (contract.flag === 'Expiring soon') {
            alerts.push({
                id: `expiry-${contract.id}`,
                type: 'expiry',
                severity: 'warning',
                title: 'Contract expiring soon',
                desc: `${contract.name} expires on ${contract.expiry}. Review renewal terms.`,
                time: 'Active'
            });
        }

        // Expired
        if (contract.flag === 'Expired') {
            alerts.push({
                id: `expired-${contract.id}`,
                type: 'expiry',
                severity: 'critical',
                title: 'Contract expired',
                desc: `${contract.name} expired on ${contract.expiry}. Immediate action required.`,
                time: 'Active'
            });
        }

        // High risk
        if (contract.risk >= 70) {
            alerts.push({
                id: `risk-${contract.id}`,
                type: 'conflict',
                severity: 'critical',
                title: 'High-risk contract detected',
                desc: `${contract.name} has risk score of ${contract.risk}. Review flagged clauses.`,
                time: 'Active'
            });
        }
    });

    // Duplicate parties
    const partyMap: { [key: string]: string[] } = {};
    contracts.forEach(contract => {
        const key = contract.parties.sort().join('|');
        if (!partyMap[key]) partyMap[key] = [];
        partyMap[key].push(contract.name);
    });
    Object.keys(partyMap).forEach(key => {
        if (partyMap[key].length > 1) {
            alerts.push({
                id: `duplicate-${key}`,
                type: 'duplicate',
                severity: 'warning',
                title: 'Multiple contracts with same parties',
                desc: `Contracts: ${partyMap[key].join(', ')}. Review for conflicts.`,
                time: 'Active'
            });
        }
    });

    return alerts;
}
