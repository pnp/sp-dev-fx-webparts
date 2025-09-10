export interface IBulkOperation {
  id: string;
  name: string;
  description: string;
  targetActions: string[];
  operation: BulkOperationType;
  parameters?: any;
  createdBy: string;
  createdDate: Date;
  status: BulkOperationStatus;
  results?: IBulkOperationResult[];
}

export enum BulkOperationType {
  Enable = 'Enable',
  Disable = 'Disable', 
  Delete = 'Delete',
  Export = 'Export',
  Import = 'Import',
  Deploy = 'Deploy',
  UpdateProperty = 'UpdateProperty'
}

export enum BulkOperationStatus {
  Pending = 'Pending',
  InProgress = 'InProgress', 
  Completed = 'Completed',
  Failed = 'Failed',
  PartiallyCompleted = 'PartiallyCompleted'
}

export interface IBulkOperationResult {
  actionId: string;
  actionName: string;
  success: boolean;
  message: string;
  error?: string;
}

export interface IBulkExportOptions {
  format: 'JSON' | 'CSV' | 'XML';
  includeInactive: boolean;
  includeSystemActions: boolean;
  scope: 'Selected' | 'Filtered' | 'All';
  fields: string[];
}

export interface IBulkImportOptions {
  format: 'JSON' | 'CSV' | 'XML';
  conflictResolution: 'Skip' | 'Overwrite' | 'CreateNew';
  validateOnly: boolean;
  targetScope: 'Web' | 'Site';
  batchSize: number;
}

export interface IDeploymentTarget {
  siteUrl: string;
  siteName: string;
  selected: boolean;
  status?: 'Pending' | 'Success' | 'Failed';
  message?: string;
}