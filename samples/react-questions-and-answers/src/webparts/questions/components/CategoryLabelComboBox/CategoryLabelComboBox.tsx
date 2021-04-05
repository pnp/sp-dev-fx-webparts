import * as React from 'react';
import { ComboBox, IComboBox, IComboBoxOption } from 'office-ui-fabric-react/lib/ComboBox';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { ICategoryLabelItem } from '../../../../models';
import { QuestionService } from '../../../../services/questions.service';
import styles from './CategoryLabelComboBox.module.scss';

export interface ICategoryLabelComboBoxProps
{
  label: string;
  selectedCategory: string;
  maxFillInLength: number | undefined;
  showTooltip: boolean;
  tooltipText: string;
  onCategoryChanged: (category: string | undefined) => void;
}

interface ICategoryLabelComboBoxState {
  categories: IComboBoxOption[];
  selectedCategory: string | undefined;
}

/**
 * @classdesc Very basic component to wrap visual display of category labeling wherever it may appear
 */
class CategoryLabelComboBox extends React.Component<ICategoryLabelComboBoxProps, ICategoryLabelComboBoxState> {

  private readonly logStyle: string = "background: dodgerblue; padding: 5px; border-radius: 5px; color: white";

  protected box: React.RefObject<IComboBox>;
  protected service: QuestionService;

  /**
   *
   */
  constructor(props: ICategoryLabelComboBoxProps) {
    super(props);

    this.box = React.createRef();
    this.service = new QuestionService();

    this.state = {
      categories: [],
      selectedCategory: props.selectedCategory
    };

    this.reloadCategories(props.selectedCategory);
  }

  // handles category change
  public categoryChanged(event: React.FormEvent<IComboBox>, option?: IComboBoxOption | undefined, index?: number | undefined, value?: string | undefined) : void {
    //Determine if the option was selected or if a new value was added
    var cat: string | undefined;
    if (option !== undefined) {
      //An option was selected
      cat = option.text;

      this.setState({selectedCategory: cat});
    } else {
      //A new option was provided
      cat = value;

      //Add the new category to the list, if it is not undefined and then reload the list
      if (cat !== undefined && cat !== '') {
        this.log(`${cat} is being added to the list of categories...`);
        this.service.addCategory(cat)
          .then(() => {
            this.log(`${cat} was successfully added!`);
            this.reloadCategories(cat);
        });
      } else if (cat === '') {
        this.setState({selectedCategory: cat});
        this.log(`Selected category state blanked out`);
      }
    }
    this.log(`${cat} was selected!`);
    this.props.onCategoryChanged(cat);
  }

  protected onKeyDown(event: React.KeyboardEvent<IComboBox>): void {
    if (this.props.maxFillInLength !== undefined) {
      if (event.key.toLowerCase() !== 'backspace') {
        let text = (event.target as HTMLInputElement).value;
        if (text !== undefined && text !== null) {
          if (text.length >= this.props.maxFillInLength) {
            this.log(`Max character length hit!!! [${this.props.maxFillInLength.toString()}] : Stopping new characters.`);
            event.preventDefault();
          }
        }
      }
    }
  }

  public render(): React.ReactElement<ICategoryLabelComboBoxProps> {
    return (
      <>
        <div className={styles.catLabelContainer}>
          <Label>{this.props.label}</Label>
          {(this.props.showTooltip ? 
          <TooltipHost
            content={this.props.tooltipText}
            className={styles.tooltip}
          >
            <FontIcon iconName="Info" className={styles.fontIcon}></FontIcon>
          </TooltipHost>
            : null)}
        </div>
        <ComboBox
          componentRef={this.box}
          onChange={(event, option, index, value) => this.categoryChanged(event, option, index, value)}
          text={this.state.selectedCategory}
          allowFreeform
          autoComplete="on"
          onKeyDown={(event) => this.onKeyDown(event)}
          options={this.state.categories}></ComboBox>
      </>
    );
  }

  private reloadCategories(selectedCategory: string | undefined): void {
    this.log("Getting categories...");
    this.log(`Incoming category to select: ${selectedCategory}`);

    this.service.getAllCategories()
      .then((items: ICategoryLabelItem[]) => {
        this.log(`${items.length} category label items found.`);
        var categories: IComboBoxOption[] = [];
        items.forEach((value: ICategoryLabelItem): void => {
          categories.push({
            key: (value.title !== undefined ? value.title : ''),
            text: (value.title !== undefined ? value.title : '')
          });
        });
        this.setState({categories: categories});
        this.log("Category list state renewed");
        this.setState({selectedCategory: selectedCategory});
        this.log(`Selected category state renewed with ${selectedCategory}`);
      });
  }

  private log(val: string) {
    console.log(`%c>> ${val}`, this.logStyle);
  }
}

export default CategoryLabelComboBox;
