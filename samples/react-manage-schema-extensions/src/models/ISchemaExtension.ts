/**
 * Represents a single property in a Schema Extension
 */
export interface ISchemaExtensionProperty {
  /**
   * The name of the property
   */
  name: string;
  
  /**
   * The data type of the property
   */
  type: 'Binary' | 'Boolean' | 'DateTime' | 'Integer' | 'String';
  /** Enable */
  isEnabled: boolean;
}

/**
 * Represents a complete Schema Extension definition
 */
export interface ISchemaExtension {
  /**
   * Unique identifier for the schema extension
   */
  id?: string;
  
  /**
   * Description of the schema extension
   */
  description: string;
  
  /**
   * The application ID that owns this schema extension
   */
  owner: string;
  
  /**
   * Array of properties that make up this schema extension
   */
  properties: ISchemaExtensionProperty[];
  
  /**
   * Target types that can use this schema extension
   */
  targetTypes: string[];
  
  /**
   * Current status of the schema extension
   */
  status?: 'InDevelopment' | 'Available' | 'Deprecated';
  
  /**
   * When the schema extension was created
   */
  createdDateTime?: string;
  
  /**
   * When the schema extension was last modified
   */
  lastModifiedDateTime?: string;
}

/**
 * Request payload for creating a new Schema Extension
 */
export interface ISchemaExtensionCreateRequest {
  /**
   * Unique identifier for the schema extension
   */
  id: string;
  
  /**
   * Description of the schema extension
   */
  description: string;
  
  /**
   * The application ID that owns this schema extension
   */
  owner?: string;
  
  /**
   * Array of properties that make up this schema extension
   */
  properties: ISchemaExtensionProperty[];
  
  /**
   * Target types that can use this schema extension
   */
  targetTypes: string[];
}

/**
 * Request payload for updating an existing Schema Extension
 */
export interface ISchemaExtensionUpdateRequest {
  /**
   * Description of the schema extension
   */
  description?: string;
  
  /**
   * Array of properties that make up this schema extension
   */
  properties?: ISchemaExtensionProperty[];
  
  /**
   * Current status of the schema extension
   */
  status?: 'InDevelopment' | 'Available' | 'Deprecated';
}

