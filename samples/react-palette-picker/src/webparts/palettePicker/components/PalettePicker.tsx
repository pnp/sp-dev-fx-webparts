import * as React from 'react';
import styles from './PalettePicker.module.scss';
import { IPalettePickerProps } from './IPalettePickerProps';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';


const options: IDropdownOption[] = [
  { key: 'apple', text: 'Apple' },
  { key: 'banana', text: 'Banana' },
  { key: 'orange', text: 'Orange' },
  { key: 'grape', text: 'Grape' },
  { key: 'broccoli', text: 'Broccoli' },
  { key: 'carrot', text: 'Carrot' },
  { key: 'lettuce', text: 'Lettuce' }
];

const returnCss = (obj) => {

  let newObj = {};
  Object.keys(obj).map((key, i) => {
    newObj[`.ms-Dropdown-item:nth-of-type(${i + 1})`] = { "backgroundColor": obj[key] };
  });

  return newObj;

};


export default class PalettePicker extends React.Component<IPalettePickerProps, {}> {

  constructor(props: IPalettePickerProps) {
    super(props);


  }




  private dropdownStyles: Partial<IDropdownStyles> = {
    root: this.props.cssObject,
    label: { color: this.props.fontColor },
    /*  dropdownItem: {
        backgroundColor: 'pink'
      },  */
    /* dropdownItemsWrapper: {
       style: this.props.cssObject ? this.props.cssObject : {},
     }, */

    dropdownItems: {
      selectors: returnCss(this.props.cssObject),
      dropdown: {
        width: 300
      }

    }

  };





  public render(): React.ReactElement<IPalettePickerProps> {

    console.log("styles:", this.dropdownStyles);
    console.log("obj", returnCss(this.props.cssObject));



    return (
      <div style={this.props.cssObject} className={styles.palettePicker}>
        <div>
          <div className={styles.row} style={{ backgroundColor: this.props.cssObject["--color-1"], color: this.props.fontColor }}>
            <div className={styles.column}>
              <span className={styles.title} style={{ color: this.props.fontColor }}>Here's a Palette Picker for you!</span>
              <p className={styles.subTitle} style={{ color: this.props.fontColor }}>Allow users to select a color palette for your web part.</p>
              <div style={{ height: 'auto', minHeight: '20px', backgroundColor: this.props.fontColor }}>
                {Object.keys(this.props.cssObject).map((key, i) => {
                  return <div style={{ backgroundColor: this.props.cssObject[key], height: '10px', width: '10px', display: 'inline-block', borderRadius: '50%', left: 0, top: 0 }}></div>;
                })}
              </div>

              <Dropdown placeholder="Select an option" label="Color your dropdown options .." options={options} styles={this.dropdownStyles} />
              <div>

              </div>
              <a href="https://aka.ms/spfx" className={styles.button} style={{ backgroundColor: this.props.cssObject["--color-3"], color: this.props.fontColor }}>
                <span className={styles.label} style={{ color: this.props.fontColor }}>Learn more</span>
              </a>
              <pre style={{ font: 'courier', backgroundColor: this.props.cssObject["--color-5"], color: this.props.fontColor }}> {JSON.stringify(this.props.cssObject, null, 4)}</pre>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
