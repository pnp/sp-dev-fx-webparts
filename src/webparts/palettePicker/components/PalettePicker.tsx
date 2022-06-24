import * as React from 'react';
import styles from './PalettePicker.module.scss';
import { IPalettePickerProps } from './IPalettePickerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';


const dropdownStyles: Partial<IDropdownStyles> = {

  dropdown: { width: 300

   }
};

const options: IDropdownOption[] = [  
  { key: 'apple', text: 'Apple' },
  { key: 'banana', text: 'Banana' },
  { key: 'orange', text: 'Orange'},
  { key: 'grape', text: 'Grape' },
  { key: 'broccoli', text: 'Broccoli' },
  { key: 'carrot', text: 'Carrot' },
  { key: 'lettuce', text: 'Lettuce' }
];


export default class PalettePicker extends React.Component<IPalettePickerProps, {}> {

  public componentDidMount() {
  //  console.log("css:", JSON.parse(this.props.colorObj));
  }



//console.log(props)


  public render(): React.ReactElement<IPalettePickerProps> {
    return (
      <div className={ styles.palettePicker }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <Dropdown placeholder="Select an option" label="Basic uncontrolled example" options={options} styles={dropdownStyles} />                    
              
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
