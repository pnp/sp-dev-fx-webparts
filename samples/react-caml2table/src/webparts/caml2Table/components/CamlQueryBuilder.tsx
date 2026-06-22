import * as React from 'react';
import {
  Stack,
  Dropdown,
  IDropdownOption,
  TextField,
  PrimaryButton,
  DefaultButton,
  Label,
  DatePicker,
  Checkbox,
  IconButton,
  MessageBar,
  Panel,
  PanelType,
  SpinButton,
  ISpinButtonStyles
} from '@fluentui/react';
import { ICamlQueryBuilderProps } from './ICamlQueryBuilderProps';
import { ICamlCondition } from '../models/ICamlCondition';
import { CamlHelpers } from '../utils/CamlHelpers';

/**
 * Component for visually building CAML queries
 */
const CamlQueryBuilder: React.FunctionComponent<ICamlQueryBuilderProps> = (props) => {
  const { fields, onGenerateQuery, initialConditions = [] } = props;
  
  const [conditions, setConditions] = React.useState<ICamlCondition[]>(
    initialConditions.length > 0 ? initialConditions : [createEmptyCondition()]
  );
  const [logicalOperator, setLogicalOperator] = React.useState<string>("And");
  const [rowLimit, setRowLimit] = React.useState<number>(100);
  const [orderByField, setOrderByField] = React.useState<string>("");
  const [orderByAscending, setOrderByAscending] = React.useState<boolean>(true);
  const [viewFields, setViewFields] = React.useState<string[]>([]);
  const [isViewFieldsOpen, setIsViewFieldsOpen] = React.useState<boolean>(false);

  const operatorOptions: IDropdownOption[] = [
    { key: 'Eq', text: 'Equals' },
    { key: 'Neq', text: 'Not Equals' },
    { key: 'Gt', text: 'Greater Than' },
    { key: 'Geq', text: 'Greater Than or Equal' },
    { key: 'Lt', text: 'Less Than' },
    { key: 'Leq', text: 'Less Than or Equal' },
    { key: 'BeginsWith', text: 'Begins With' },
    { key: 'Contains', text: 'Contains' },
    { key: 'IsNull', text: 'Is Empty' },
    { key: 'IsNotNull', text: 'Is Not Empty' },
    { key: 'In', text: 'In (Multiple Values)' }
  ];

  const specialValueOptions: IDropdownOption[] = [
    { key: 'normal', text: 'Normal Value' },
    { key: 'today', text: '[Today]' },
    { key: 'me', text: '[Me]' },
    { key: 'dateRanges', text: 'Date Ranges' }
  ];

  /**
   * Create an empty condition with default values
   */
  function createEmptyCondition(): ICamlCondition {
    return {
      id: Date.now().toString(),
      fieldName: '',
      operator: 'Eq',
      value: '',
      valueType: 'Text',
      lookupId: false,
      isRaw: false
    };
  }

  /**
   * Add a new condition to the builder
   */
  const handleAddCondition = (): void => {
    setConditions([...conditions, createEmptyCondition()]);
  };

  /**
   * Remove a condition from the builder
   */
  const handleRemoveCondition = (id: string): void => {
    if (conditions.length === 1) {
      // Don't remove the last condition, just reset it
      setConditions([createEmptyCondition()]);
    } else {
      setConditions(conditions.filter(condition => condition.id !== id));
    }
  };

  /**
   * Update a condition property
   */
  const handleConditionChange = (id: string, field: keyof ICamlCondition, value: string | boolean): void => {
    setConditions(conditions.map(condition => {
      if (condition.id === id) {
        const updatedCondition = { ...condition, [field]: value };
        
        // If field type changed, update valueType
        if (field === 'fieldName') {
          const selectedField = fields.find(f => f.InternalName === value);
          if (selectedField) {
            // Map SharePoint field types to CAML value types
            switch (selectedField.TypeAsString) {
              case 'DateTime':
                updatedCondition.valueType = 'DateTime';
                break;
              case 'Number':
              case 'Currency':
                updatedCondition.valueType = 'Number';
                break;
              case 'Boolean':
                updatedCondition.valueType = 'Boolean';
                break;
              case 'Integer':
                updatedCondition.valueType = 'Integer';
                break;
              case 'User':
              case 'UserMulti':
                updatedCondition.valueType = 'Integer';
                updatedCondition.lookupId = true;
                break;
              case 'Lookup':
              case 'LookupMulti':
                updatedCondition.valueType = 'Integer';
                updatedCondition.lookupId = true;
                break;
              default:
                updatedCondition.valueType = 'Text';
                updatedCondition.lookupId = false;
            }
          }
        }

        return updatedCondition;
      }
      return condition;
    }));
  };

  /**
   * Generate the final CAML query XML
   */
  const handleGenerateQuery = (): void => {
    const validConditions = conditions.filter(c => 
      c.fieldName && (c.operator === 'IsNull' || c.operator === 'IsNotNull' || c.value || c.isRaw)
    );
    
    if (validConditions.length === 0) {
      // Generate a query that returns all items
      const query = `<View${viewFields.length > 0 ? '>' : ''}>
  ${viewFields.length > 0 ? '<ViewFields>\n    ' + viewFields.map(field => `<FieldRef Name="${field}" />`).join('\n    ') + '\n  </ViewFields>' : ''}
  ${rowLimit > 0 ? `<RowLimit>${rowLimit}</RowLimit>` : ''}
  ${orderByField ? `<Query>
    <OrderBy>
      <FieldRef Name="${orderByField}" Ascending="${orderByAscending ? 'TRUE' : 'FALSE'}" />
    </OrderBy>
  </Query>` : ''}
</View>`;
      onGenerateQuery(query);
      return;
    }

    let whereClause = '';
    
    if (validConditions.length === 1) {
      // Single condition
      whereClause = CamlHelpers.generateConditionXml(validConditions[0]);
    } else {
      // Multiple conditions joined by logical operator
      whereClause = CamlHelpers.generateMultipleConditionsXml(validConditions, logicalOperator);
    }

    const query = `<View${viewFields.length > 0 ? '>' : ''}>
  ${viewFields.length > 0 ? '<ViewFields>\n    ' + viewFields.map(field => `<FieldRef Name="${field}" />`).join('\n    ') + '\n  </ViewFields>' : ''}
  ${rowLimit > 0 ? `<RowLimit>${rowLimit}</RowLimit>` : ''}
  <Query>
    <Where>
      ${whereClause}
    </Where>
    ${orderByField ? `<OrderBy>
      <FieldRef Name="${orderByField}" Ascending="${orderByAscending ? 'TRUE' : 'FALSE'}" />
    </OrderBy>` : ''}
  </Query>
</View>`;

    onGenerateQuery(query);
  };

  /**
   * Render appropriate input control based on field type
   */
  const renderValueInput = (condition: ICamlCondition): JSX.Element => {
    const { operator, fieldName, value, isRaw } = condition;
    
    // If operator doesn't need a value
    if (operator === 'IsNull' || operator === 'IsNotNull') {
      return null;
    }
    
    // Get field info
    const fieldInfo = fields.find(f => f.InternalName === fieldName);
    if (!fieldInfo) {
      return (
        <TextField 
          placeholder="Value" 
          value={value} 
          onChange={(_, newValue) => handleConditionChange(condition.id, 'value', newValue || '')}
        />
      );
    }
    
    switch (fieldInfo.TypeAsString) {
      case 'DateTime':
        return (
          <Stack horizontal tokens={{ childrenGap: 10 }}>
            <Dropdown
              placeholder="Value type"
              selectedKey={isRaw ? 'today' : 'normal'}
              options={specialValueOptions}
              onChange={(_, option) => {
                if (option.key === 'today') {
                  handleConditionChange(condition.id, 'value', '<Today />');
                  handleConditionChange(condition.id, 'isRaw', true);
                } else if (option.key === 'dateRanges') {
                  setIsViewFieldsOpen(true);
                } else {
                  handleConditionChange(condition.id, 'isRaw', false);
                  handleConditionChange(condition.id, 'value', '');
                }
              }}
              styles={{ root: { width: 120 } }}
            />
            {!isRaw && (
              <DatePicker
                value={value ? new Date(value) : undefined}
                onSelectDate={(date) => {
                  if (date) {
                    handleConditionChange(condition.id, 'value', date.toISOString());
                  }
                }}
                formatDate={(date) => date.toLocaleDateString()}
              />
            )}
            {isRaw && (
              <TextField
                value={value}
                onChange={(_, newValue) => handleConditionChange(condition.id, 'value', newValue || '')}
                placeholder="<Today OffsetDays='-7' />"
              />
            )}
          </Stack>
        );
      
      case 'Boolean':
        return (
          <Checkbox
            label="True"
            checked={value === 'TRUE' || value === 'true' || value === '1'}
            onChange={(_, checked) => handleConditionChange(condition.id, 'value', checked ? 'TRUE' : 'FALSE')}
          />
        );
      
      case 'Number':
      case 'Currency':
      case 'Integer':
        return (
          <TextField
            type="number"
            value={value}
            onChange={(_, newValue) => handleConditionChange(condition.id, 'value', newValue || '')}
          />
        );
      
      case 'User':
      case 'UserMulti':
        if (isRaw && value === '<UserID />') {
          return (
            <Stack horizontal tokens={{ childrenGap: 10 }}>
              <Dropdown
                placeholder="Value type"
                selectedKey="me"
                options={[
                  { key: 'normal', text: 'User ID' },
                  { key: 'me', text: 'Current User' }
                ]}
                onChange={(_, option) => {
                  if (option.key === 'me') {
                    handleConditionChange(condition.id, 'value', '<UserID />');
                    handleConditionChange(condition.id, 'isRaw', true);
                  } else {
                    handleConditionChange(condition.id, 'isRaw', false);
                    handleConditionChange(condition.id, 'value', '');
                  }
                }}
                styles={{ root: { width: 120 } }}
              />
            </Stack>
          );
        } else {
          return (
            <Stack horizontal tokens={{ childrenGap: 10 }}>
              <Dropdown
                placeholder="Value type"
                selectedKey="normal"
                options={[
                  { key: 'normal', text: 'User ID' },
                  { key: 'me', text: 'Current User' }
                ]}
                onChange={(_, option) => {
                  if (option.key === 'me') {
                    handleConditionChange(condition.id, 'value', '<UserID />');
                    handleConditionChange(condition.id, 'isRaw', true);
                  } else {
                    handleConditionChange(condition.id, 'isRaw', false);
                    handleConditionChange(condition.id, 'value', '');
                  }
                }}
                styles={{ root: { width: 120 } }}
              />
              {!isRaw && (
                <TextField
                  type="number"
                  value={value}
                  onChange={(_, newValue) => handleConditionChange(condition.id, 'value', newValue || '')}
                  placeholder="User ID"
                />
              )}
            </Stack>
          );
        }
      
      case 'Lookup':
      case 'LookupMulti':
        return (
          <TextField
            type="number"
            value={value}
            onChange={(_, newValue) => handleConditionChange(condition.id, 'value', newValue || '')}
            placeholder="Lookup ID"
          />
        );
      
      default:
        if (operator === 'In') {
          return (
            <TextField
              multiline
              rows={3}
              value={value}
              onChange={(_, newValue) => handleConditionChange(condition.id, 'value', newValue || '')}
              placeholder="Value1, Value2, Value3"
            />
          );
        }
        
        return (
          <TextField
            value={value}
            onChange={(_, newValue) => handleConditionChange(condition.id, 'value', newValue || '')}
            placeholder="Value"
          />
        );
    }
  };

  // Function to handle showing the menu
  const handleShowMenu = (): void => {
    // Function intentionally left empty as the click will trigger the menu to display
    // No additional action needed
  };

  const spinButtonStyles: Partial<ISpinButtonStyles> = {
    root: { width: 100 }
  };

  return (
    <Stack tokens={{ childrenGap: 16 }}>
      <Stack horizontal horizontalAlign="space-between">
        <Label>Build Your CAML Query</Label>
        <Stack horizontal tokens={{ childrenGap: 8 }}>
          <DefaultButton 
            text="View Fields" 
            onClick={() => setIsViewFieldsOpen(true)}
            iconProps={{ iconName: 'FieldEmpty' }}
          />
          <DefaultButton
            text={`RowLimit: ${rowLimit}`}
            onClick={handleShowMenu}
            iconProps={{ iconName: 'NumberField' }}
            menuProps={{
              items: [
                {
                  key: 'rowlimit',
                  text: 'Set Row Limit',
                  onRender: () => (
                    <Stack horizontal tokens={{ childrenGap: 8 }} styles={{ root: { padding: '8px 16px' } }}>
                      <Label>Row Limit:</Label>
                      <SpinButton
                        min={0}
                        max={5000}
                        step={10}
                        value={rowLimit.toString()}
                        onChange={(_, newValue) => setRowLimit(parseInt(newValue || '100', 10))}
                        incrementButtonAriaLabel="Increase value by 10"
                        decrementButtonAriaLabel="Decrease value by 10"
                        styles={spinButtonStyles}
                      />
                    </Stack>
                  )
                }
              ]
            }}
          />
        </Stack>
      </Stack>

      {conditions.length > 1 && (
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
          <Label>Join conditions with:</Label>
          <Dropdown
            selectedKey={logicalOperator}
            options={[
              { key: 'And', text: 'AND (all conditions must be true)' },
              { key: 'Or', text: 'OR (any condition can be true)' }
            ]}
            onChange={(_, option) => setLogicalOperator(option.key as string)}
            styles={{ root: { width: 300 } }}
          />
        </Stack>
      )}

      {conditions.map((condition, index) => (
        <Stack key={condition.id} tokens={{ childrenGap: 8 }} style={{ padding: '12px', backgroundColor: '#f8f8f8', borderRadius: '4px' }}>
          <Stack horizontal horizontalAlign="space-between">
            <Label>Condition {index + 1}</Label>
            <IconButton
              iconProps={{ iconName: 'Delete' }}
              title="Remove condition"
              onClick={() => handleRemoveCondition(condition.id)}
            />
          </Stack>
          
          <Stack horizontal tokens={{ childrenGap: 8 }} wrap>
            <Dropdown
              placeholder="Select field"
              label="Field"
              selectedKey={condition.fieldName}
              options={fields.map(field => ({
                key: field.InternalName,
                text: `${field.Title} (${field.InternalName})`
              }))}
              onChange={(_, option) => handleConditionChange(condition.id, 'fieldName', option.key as string)}
              styles={{ root: { minWidth: 200 } }}
            />
            
            <Dropdown
              placeholder="Select operator"
              label="Operator"
              selectedKey={condition.operator}
              options={operatorOptions}
              onChange={(_, option) => handleConditionChange(condition.id, 'operator', option.key as string)}
              styles={{ root: { minWidth: 150 } }}
            />
            
            <Stack.Item grow>
              <Label>Value</Label>
              {renderValueInput(condition)}
            </Stack.Item>
          </Stack>
        </Stack>
      ))}

      <Stack horizontal tokens={{ childrenGap: 10 }}>
        <DefaultButton
          text="Add Condition"
          onClick={handleAddCondition}
          iconProps={{ iconName: 'Add' }}
        />
        
        {orderByField ? (
          <DefaultButton
            text={`Sorted by: ${orderByField} (${orderByAscending ? 'Asc' : 'Desc'})`}
            onClick={() => setOrderByField('')}
            iconProps={{ iconName: 'Sort' }}
          />
        ) : (
          <DefaultButton
            text="Add Sorting"
            onClick={handleShowMenu}
            iconProps={{ iconName: 'Sort' }}
            menuProps={{
              items: fields.map(field => ({
                key: field.InternalName,
                text: field.Title,
                onClick: () => setOrderByField(field.InternalName),
                subMenuProps: {
                  items: [
                    {
                      key: 'asc',
                      text: 'Ascending',
                      onClick: () => {
                        setOrderByField(field.InternalName);
                        setOrderByAscending(true);
                      }
                    },
                    {
                      key: 'desc',
                      text: 'Descending',
                      onClick: () => {
                        setOrderByField(field.InternalName);
                        setOrderByAscending(false);
                      }
                    }
                  ]
                }
              }))
            }}
          />
        )}
      </Stack>

      <Stack horizontal horizontalAlign="end">
        <PrimaryButton
          text="Generate Query"
          onClick={handleGenerateQuery}
          iconProps={{ iconName: 'Code' }}
        />
      </Stack>

      {/* View Fields Panel */}
      <Panel
        isOpen={isViewFieldsOpen}
        onDismiss={() => setIsViewFieldsOpen(false)}
        headerText="Select Fields to Include in View"
        closeButtonAriaLabel="Close"
        type={PanelType.medium}
      >
        <MessageBar>
          Select fields to include in your query results. If none are selected, all fields will be returned.
        </MessageBar>
        
        <Stack tokens={{ childrenGap: 8 }} style={{ marginTop: 16 }}>
          {fields.map(field => (
            <Checkbox
              key={field.InternalName}
              label={`${field.Title} (${field.InternalName})`}
              checked={viewFields.includes(field.InternalName)}
              onChange={(_, checked) => {
                if (checked) {
                  setViewFields([...viewFields, field.InternalName]);
                } else {
                  setViewFields(viewFields.filter(f => f !== field.InternalName));
                }
              }}
            />
          ))}
        </Stack>
        
        <Stack horizontal horizontalAlign="end" style={{ marginTop: 20 }}>
          <DefaultButton
            text="Select All"
            onClick={() => setViewFields(fields.map(f => f.InternalName))}
            styles={{ root: { marginRight: 8 } }}
          />
          <DefaultButton
            text="Clear All"
            onClick={() => setViewFields([])}
            styles={{ root: { marginRight: 8 } }}
          />
          <PrimaryButton
            text="Apply"
            onClick={() => setIsViewFieldsOpen(false)}
          />
        </Stack>
      </Panel>
    </Stack>
  );
};

export default CamlQueryBuilder;