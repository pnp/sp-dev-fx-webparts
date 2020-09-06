import * as React from 'react';
import styles from './Builder.module.scss';
import { IBuilderProps } from './IBuilderProps';
import { escape } from '@microsoft/sp-lodash-subset';
import MealBuilder from "./MealBuilder";
import Meal from "./Meal";
import { IPropertyPaneConfiguration } from "@microsoft/sp-webpart-base";
import {
  PropertyPaneDropdown
} from "@microsoft/sp-webpart-base";
import {Version} from "@microsoft/sp-core-library";
import { IBuilderState } from './IBuilderState';

export default class Builder extends React.Component<IBuilderProps, IBuilderState> {

  private mealBuilder: MealBuilder ;
  private items: string;
  private meal: Meal;

  constructor(props: IBuilderProps, state: IBuilderState) {
    super(props);
    this.setInitialState();
    //this.setMeal = this.setMeal.bind(this);
    this.mealBuilder = new MealBuilder();
    this.setMeal(props.selectedMeal);    
  }

  public setInitialState(): void {
    this.state = {
      items: ""
    };
  }

  public componentWillReceiveProps(nextProps: IBuilderProps): void {
    if(nextProps.selectedMeal !== this.props.selectedMeal) {
      this.setMeal(nextProps.selectedMeal);
    }
  }

  public render(): React.ReactElement<IBuilderProps> {
    return (
        <div className={styles.builder}>
          <div className={styles.container}>
            <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
              <div className="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
                <span className="ms-font-xl ms-fontColor-white">Welcome to Mac Luis!</span>
                <p className="ms-font-l ms-fontColor-white">You have selected the following.</p>
                <div> {this.state.items}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  private setMeal(selectedMeal: string): void {
    if(selectedMeal===undefined){
      this.meal = this.mealBuilder.prepareVegMeal();
    }

    if(selectedMeal === "0") {
        this.meal = this.mealBuilder.prepareVegMeal();    
    }

    if(selectedMeal === "1") {
      this.meal = this.mealBuilder.prepareNonVegMeal();
    }

    this.state = {
      items: this.meal.showItems(),
    };
  }
}
