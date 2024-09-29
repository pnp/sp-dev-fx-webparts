import * as React from 'react';
import { useEffect, useState } from 'react';
import { IChecklistProps } from './IChecklistProps';
import { IChecklistItem } from './IChecklistItem';
import { Checkbox, ProgressIndicator, Text, Stack, Persona, PersonaSize, Icon, Slider } from '@fluentui/react';

const Checklist: React.FC<IChecklistProps> = ({ userId, sp, selectedList  }) => {
    
  const [items, setItems] = useState<IChecklistItem[]>([]);

  useEffect(() => {
    if (!selectedList) {
        return;
      }
    const fetchItems = async () => {
      try {
        const items = await sp.web.lists.getById(selectedList).items
          .filter(`AssignedToId eq ${userId}`)
          .select("Id", "Title", "Description", "Status", "Progress", "DueDate", "CompletionDate", "AssignedTo/Title", "AssignedTo/EMail", "AssignedTo/Id")
          .expand("AssignedTo")();
          
        setItems(items);
      } catch (error) {
        console.error("Error fetching checklist items:", error);
      }
    };

    fetchItems();
  }, [userId, sp, selectedList]);

  const handleCheckboxChange = async (itemId: number, isChecked: boolean) => {
    const updatedStatus = isChecked ? "Completed" : "In Progress";
    const updatedCompletionDate = isChecked ? new Date() : null;
  
    try {

        await sp.web.lists.getById(selectedList).items.getById(itemId).update({
          Status: updatedStatus,
          CompletionDate: updatedCompletionDate
        });

        setItems(prevItems =>
          prevItems.map(item => {
            if (item.Id === itemId) {
              const updatedItem: IChecklistItem = { 
                ...item, 
                Status: updatedStatus, 
                CompletionDate: updatedCompletionDate 
              };
              return updatedItem;
            }
            return item;
          })
        );
    } catch (error) {
      console.error("Error updating checklist item status:", error);
    }
  };
  
  const handleProgressChange = async (itemId: number, newValue: number) => {
    try {

      await sp.web.lists.getById(selectedList).items.getById(itemId).update({
        Progress: newValue
      }, "*");
      setItems(prevItems =>
        prevItems.map(item =>
          item.Id === itemId ? { ...item, Progress: newValue } : item
        )
      );
    } catch (error) {
        if (error.message && error.message.includes('Save Conflict')) {
            console.error("Save Conflict: Please try again.");
          } else {
            console.error("Error updating checklist item progress:", error);
          }
    }
  };

  return (
    <div>
      {!selectedList ? (<Text>Please select a list from the web part properties.</Text>
      ):(
      <>
        <Text variant="xLarge">Training Checklist</Text>
        <ProgressIndicator label="Overall Progress" percentComplete={items.filter(item => item.Status === "Completed").length / items.length} />
        <Stack tokens={{ childrenGap: 20 }}>
          {items.map(item => (
            <Stack key={item.Id} style={{ padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: '#fff' }} tokens={{ childrenGap: 10 }}>
              <Stack horizontal tokens={{ childrenGap: 10 }} horizontalAlign="space-between">
                <Text variant="large">{item.Title}</Text>
                <Persona text={item.AssignedTo.Title} size={PersonaSize.size32} />
              </Stack>
              <Text>{item.Description}</Text>
              <Checkbox
                label="Completed"
                checked={item.Status === "Completed"}
                onChange={(_, isChecked) => handleCheckboxChange(item.Id, isChecked || false)}
              />        
              <Slider
                label={`Progress (${Math.round(item.Progress)}%)`}
                min={0}
                max={100}
                step={1}
                value={item.Progress}
                onChange={(newValue) => handleProgressChange(item.Id, newValue)}
              />
              
              <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
                {new Date(item.DueDate) < new Date() ? (
                  <Icon iconName="Warning" styles={{ root: { color: 'red' } }} />
                ) : (
                  <Icon iconName="Calendar" />
                )}
                <Text>{new Date(item.DueDate).toLocaleDateString()}</Text>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </>)}
    </div>
  );
};

export default Checklist;
