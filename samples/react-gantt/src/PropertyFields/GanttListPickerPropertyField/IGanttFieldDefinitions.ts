export interface IGanttFieldMappings {
  text: string;
  start: string;
  duration: string;
  progress?: string;
  type?: string;
  parent?: string;
  end?: string;
}

export interface IGanttLinkFieldMappings {
  source: string;
  target: string;
  type?: string;
}

export interface IGanttFieldDefinition {
  key: keyof IGanttFieldMappings;
  label: string;
  required: boolean;
  compatibleTypes: string[];
  autoDetectNames: string[];
}

/** All Gantt task field definitions */
export const GANTT_TASK_FIELD_DEFINITIONS: IGanttFieldDefinition[] = [
  {
    key: "text",
    label: "Task Name",
    required: true,
    compatibleTypes: ["Text", "Note", "Computed"],
    autoDetectNames: ["Title", "TaskName", "Text"],
  },
  {
    key: "start",
    label: "Start Date",
    required: true,
    compatibleTypes: ["DateTime"],
    autoDetectNames: ["StartDate", "Start", "Start_x0020_Date"],
  },
  {
    key: "duration",
    label: "Duration",
    required: true,
    compatibleTypes: ["Number", "Integer", "Counter"],
    autoDetectNames: ["Duration", "DurationDays", "TaskDuration"],
  },
  {
    key: "progress",
    label: "Progress (%)",
    required: false,
    compatibleTypes: ["Number", "Integer"],
    autoDetectNames: ["PercentComplete", "Progress", "Percent_x0020_Complete"],
  },
  {
    key: "type",
    label: "Task Type",
    required: false,
    compatibleTypes: ["Choice", "Text"],
    autoDetectNames: ["TaskType", "Type", "ItemType"],
  },
  {
    key: "parent",
    label: "Parent Task",
    required: false,
    compatibleTypes: ["Number", "Integer", "Lookup", "Counter"],
    autoDetectNames: ["ParentID", "ParentTaskId", "Parent"],
  },
  {
    key: "end",
    label: "End Date",
    required: false,
    compatibleTypes: ["DateTime"],
    autoDetectNames: ["DueDate", "EndDate", "End", "Due_x0020_Date"],
  },
];

/** Describes a SP list field returned from REST API */
export interface ISPField {
  Id: string;
  InternalName: string;
  Title: string;
  TypeAsString: string;
  Hidden: boolean;
  ReadOnlyField: boolean;
}

/** Describes a SP list returned from REST API */
export interface ISPList {
  Id: string;
  Title: string;
  ItemCount: number;
  BaseTemplate: number;
}

/** Validation result for a list's field compatibility */
export interface IFieldValidationResult {
  /** Whether all required fields can be mapped */
  isValid: boolean;
  /** Auto-detected field mappings */
  autoMappings: Partial<IGanttFieldMappings>;
  /** Fields that matched */
  matched: { key: keyof IGanttFieldMappings; field: ISPField }[];
  /** Required fields that could not be matched */
  missingRequired: IGanttFieldDefinition[];
  /** Optional fields that could not be matched */
  missingOptional: IGanttFieldDefinition[];
}
