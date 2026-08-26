import { 
  ICustomAction, 
  ICustomActionFilter, 
  IPaginationInfo
} from '../../../models';

export interface ICustomActionManagerState {
  customActions: ICustomAction[];
  filteredActions: ICustomAction[];
  loading: boolean;
  error: string | null;
  filter: ICustomActionFilter;
  pagination: IPaginationInfo;
  selectedAction: ICustomAction | null;
  selectedActions: ICustomAction[];
  showCreateForm: boolean;
  showEditForm: boolean;
  showDeleteDialog: boolean;
  showBulkOperationsPanel: boolean;
  showTemplateGallery: boolean;
  operationInProgress: boolean;
  lastRefresh: Date | null;
}