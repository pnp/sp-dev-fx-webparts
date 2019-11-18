import * as jsStyles from './CheckListStyles';
import * as React from 'react';
import styles from './CheckList.module.scss';
import * as strings from 'MyTasksWebPartStrings';
import {
  Checkbox,
  Icon,
  MessageBar,
  MessageBarType,
  TextField,
  ITextFieldProps
  } from 'office-ui-fabric-react';
import { getGUID } from '@pnp/pnpjs';
import { ICheckListItem } from '../../../../services/ICheckListItem';
import { ICheckListProps } from './ICheckListProps';
import { ICheckListState } from './ICheckListState';
import { ITaskCheckListItem } from '../../../../services/ITaskCheckListItem';


export class CheckList extends React.Component<ICheckListProps, ICheckListState> {
         private _checkListItems: ICheckListItem[] = [];
         private _removedCheckListItem: ICheckListItem = {} as ICheckListItem;

         constructor(props: ICheckListProps) {
           super(props);

           this.state = {checklistChanged:false, renderCheckListItems: [], newCheckListItemTitle: '', hasError: false, messageError: undefined , taskDetails: this.props.taskDetails};
         }

         public render(): React.ReactElement<ICheckListProps> {
           return (
             <>
               {this.state.hasError ? (
                 <MessageBar messageBarType={MessageBarType.error}>{this.state.messageError}</MessageBar>
               ) : (
                 this.state.renderCheckListItems
               )}
             </>
           );
         }

         public async componentWillMount(): Promise<void> {
           try {
             await this._getCheckListItems(this.state.taskDetails.checklist);
             const renderCheckListItems = await this._renderCheckListItems(this._checkListItems);
             this.setState({
               renderCheckListItems: renderCheckListItems
             });
           } catch (error) {
             this.setState({ hasError: true, messageError: error.message });
           }
         }

         private _getCheckListItems = async (checkListItems: ITaskCheckListItem[]): Promise<void> => {
           let checkListItemsKeys: string[] = [];

           checkListItemsKeys = Object.keys(checkListItems);

           try {
             for (const checkListItemKey of checkListItemsKeys) {
               const checkListItemInfo: ICheckListItem = checkListItems[checkListItemKey] as ICheckListItem;
               checkListItemInfo.key = checkListItemKey;
               this._checkListItems.push(checkListItemInfo);
             }
           } catch (error) {
             throw new Error(error);
           }
         }

        private _onRenderTextFieldSufix = (props: ITextFieldProps) => {
          return <Icon iconName='delete' />;
        }

         /**
          * Render check list items of check list
          */
         private _renderCheckListItems = async (checkListItems: ICheckListItem[]): Promise<JSX.Element[]> => {
           const checklist: JSX.Element[] = [];
           this.props.onCheckListChanged(this._checkListItems);  // Save ListItems on Edit Form
           // Sort Checklist
           checkListItems = checkListItems.sort((a, b) => {
             if (a.orderHint < b.orderHint) return 1;
             if (a.orderHint > b.orderHint) return -1;
             return 0;
           });
           try {
             for (let index = 0; index < checkListItems.length; index++) {
               const checkListItem = checkListItems[index];
               checklist.push(
                 <div className={styles.checkListItem} key={index}>
                   <TextField

                     id={String(index)}
                     onRenderPrefix={(props: ITextFieldProps) => {
                       return (
                         <Checkbox
                           styles={{ checkbox: { height: 17, width: 17,marginRight:0 } }}
                           checked={checkListItem.isChecked}
                           onChange={this._onCheckCheckListItem}
                           id={String(index)}></Checkbox>
                       );
                     }}
                     onRenderSuffix={(props: ITextFieldProps) => {
                       return (
                         <Icon
                           id={String(index)}
                           style={{ right: 5 }}
                           iconName='delete'
                           onClick={this._onRemoveCheckListItem}></Icon>
                       );
                     }}
                     style={{ textDecoration: checkListItem.isChecked ? 'line-through' : '' }}
                     styles={jsStyles.textFieldCheckListItem}
                     borderless={true}
                     onChange={this._onChangeCheckListItemTitle}
                     onBlur={this._onCheckListItemBlur}
                     value={checkListItem.title}
                   />
                 </div>
               );
             }
             // Add new Item
             checklist.push(
               <div className={styles.checkListItem} key={getGUID()}>

                 <TextField
                 onRenderPrefix={(props: ITextFieldProps) => {
                  return (
                    <Checkbox
                      styles={{ checkbox: { height: 17, width: 17,marginRight:0 } }}
                      id={getGUID()}>
                      </Checkbox>
                  );
                }}
                   placeholder={strings.AddNewItemLabel}
                   styles={jsStyles.textFieldCheckListItem}
                   borderless={true}
                   onChange={this._onChangeNewCheckListItemTile}
                   onKeyPress={this._onKeyPressNewCheckListItemTitle}
                   onMouseLeave={this._onMouseLeaveCheckListItem}
                   value={''}
                 />
               </div>
             );
           } catch (error) {
             console.log(error);
             this.setState({hasError:true, messageError: error.message});
           }

           return checklist;
         }

         /**
          * Determines whether change check list item title on
          */
         private _onChangeCheckListItemTitle = async (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,newValue?: string) => {
          const  inputElement: any  = event.target;
          const index = Number(inputElement.id);  // Get element id attribute
           this._checkListItems[index].title = newValue;
           const renderCheckListItems = await this._renderCheckListItems(this._checkListItems);

           this.setState({renderCheckListItems: renderCheckListItems, checklistChanged:true});
         }

         /**
          * Determines whether check check list item on
          */
         private _onCheckCheckListItem = async (event?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
           const index = Number(event.currentTarget.getAttribute('id'));

           this._checkListItems[index].isChecked = checked;
           const renderCheckListItems = await this._renderCheckListItems(this._checkListItems);
           await this._updateChecklistItems();
           this.setState({
             renderCheckListItems: renderCheckListItems
           });
         }

         /**
          * Determines whether remove check list item on
          */
         private _onRemoveCheckListItem = async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
           const index = Number(event.currentTarget.getAttribute('id'));
          this._removedCheckListItem = this._checkListItems[index];
          await this._updateChecklistItems();
          this._checkListItems.splice(index, 1);
          const renderCheckListItems = await this._renderCheckListItems(this._checkListItems);
           this.setState({renderCheckListItems: renderCheckListItems});
         }

         /**
          * Determines whether key press new check list item title on
          */
         private _onKeyPressNewCheckListItemTitle = async (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
           let { newCheckListItemTitle } = this.state;

           if (event.key === 'Enter' && newCheckListItemTitle.length > 0) {
             const key: string = getGUID();
             const newCheckListItem: ICheckListItem = { title: this.state.newCheckListItemTitle, key: key, isChecked: false };
             this._checkListItems.push(newCheckListItem);
             const renderCheckListItems = await this._renderCheckListItems(this._checkListItems);
             await this._updateChecklistItems();
             this.setState({renderCheckListItems: renderCheckListItems});
           }
         }

         private _onMouseLeaveCheckListItem = async (event: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement, MouseEvent>) => {

         let   newCheckListItemTitle = (event.target) as any;
          if (  newCheckListItemTitle.value.length > 0) {
            const key: string = getGUID();
            const newCheckListItem: ICheckListItem = { title: this.state.newCheckListItemTitle, key: key, isChecked: false };
            this._checkListItems.push(newCheckListItem);
            const renderCheckListItems = await this._renderCheckListItems(this._checkListItems);
            await this._updateChecklistItems();
            this.setState({renderCheckListItems: renderCheckListItems});
         }
        }


          /**
           * Update checklist items of check list
           */
          private _updateChecklistItems = async ():Promise<void> => {
            try {
              let checklist: ITaskCheckListItem = {} as ITaskCheckListItem;
              for (const checklistItem of this._checkListItems){
                // Test if Checklist Item was removed , to remove CheclistItem we must set null to the correspondent key on checklist object
                // Required to GRAPH API to work
                if ( checklistItem.key === this._removedCheckListItem.key) {
                  checklist[checklistItem.key] = null;
                }else{
                  checklist[checklistItem.key] = { title: checklistItem.title, "@odata.type": "microsoft.graph.plannerChecklistItem", orderHint: " !", isChecked: checklistItem.isChecked} ;
                }
              }
              this._removedCheckListItem = {} as ICheckListItem;
              const updateTaskDetails = await  this.props.spservice.updateTaskDetailsProperty(this.state.taskDetails.id, 'checklist',checklist, this.state.taskDetails["@odata.etag"] );
              this.setState({hasError:false, messageError:'', taskDetails: updateTaskDetails});
            } catch (error) {
              console.log(error);
              this.setState({hasError:true, messageError: error.message, checklistChanged:false});
            }
          }
         /**
          * Determines whether change new check list item tile on
          */
         private  _onChangeNewCheckListItemTile = async (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,newValue: string) => {
          this.setState({ newCheckListItemTitle: newValue });
        }

        /**
         * Determines whether check list item blur on
         */
        private _onCheckListItemBlur =  async (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          event.preventDefault();
          this._updateChecklistItems();
        }
      }
