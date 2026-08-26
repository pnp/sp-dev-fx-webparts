import { IClause } from "./IClause";

export interface IContract {
  id: number;
  name: string;
  type: string;
  jurisdiction: string;
  status: 'compliant' | 'warning' | 'critical';
  parties: string[];
  expiry: string;
  tags: string[];
  risk: number;
  uploaded: string;
  summary: string;
  clauses: IClause[];
  flag?: string;
  fileUrl?: string;
  fullText?: string;
}