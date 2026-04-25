import * as XLSX from 'xlsx';
import type { IPrincipalListItem } from '../../../../common/interfaces';
import { EMAIL_REGEX } from './constants';
import type { IImportResult } from './types';

export const toUniqueEmails = (values: string[]): string[] => {
  const result: string[] = [];
  const seen = new Set<string>();

  values.forEach((value) => {
    const normalized = value.trim().toLowerCase();
    if (!normalized || seen.has(normalized)) return;
    seen.add(normalized);
    result.push(normalized);
  });

  return result;
};

export const parseCsvEmails = (text: string): string[] =>
  text
    .split(/\r?\n/)
    .map((line) => line.split(',')[0]?.trim() ?? '')
    .filter(Boolean);

export const parseCsvRows = (text: string): string[][] =>
  text
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0)
    .map((line) => line.split(',').map((cell) => cell.trim()));

export const parseWorksheetEmails = (sheet: XLSX.WorkSheet): string[] => {
  const rows = XLSX.utils.sheet_to_json<(string | number | undefined)[]>(sheet, {
    header: 1,
    raw: false
  });
  return rows.map((row) => String(row?.[0] ?? '').trim()).filter(Boolean);
};

export const parseWorksheetRows = (sheet: XLSX.WorkSheet): string[][] => {
  const rows = XLSX.utils.sheet_to_json<(string | number | undefined)[]>(sheet, {
    header: 1,
    raw: false
  });

  return rows
    .map((row) => row.map((cell) => String(cell ?? '').trim()))
    .filter((row) => row.some((cell) => cell.length > 0));
};

export const extractColumnValues = (rows: string[][], columnIndex: number): string[] => {
  if (rows.length === 0 || columnIndex < 0) {
    return [];
  }

  const firstCell = rows[0]?.[columnIndex]?.trim() ?? '';
  const hasEmailHeader = firstCell.length > 0 && /email/i.test(firstCell) && !EMAIL_REGEX.test(firstCell);
  const sourceRows = hasEmailHeader ? rows.slice(1) : rows;

  return sourceRows
    .map((row) => String(row[columnIndex] ?? '').trim())
    .filter(Boolean);
};

export const validateEmails = (values: string[]): IImportResult => {
  const unique = toUniqueEmails(values);
  return {
    validEmails: unique.filter((v) => EMAIL_REGEX.test(v)),
    invalidEmails: unique.filter((v) => !EMAIL_REGEX.test(v))
  };
};

export const principalToEmail = (principal: IPrincipalListItem): string => {
  if (principal.email?.trim()) return principal.email.trim();
  const loginName = principal.loginName?.trim() ?? '';
  if (loginName.includes('|')) {
    const parts = loginName.split('|');
    return parts[parts.length - 1].trim();
  }
  return loginName;
};
