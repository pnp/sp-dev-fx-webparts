# Builder Design Pattern

## Summary
Builder pattern builds a complex object using simple objects and using a step by step approach. This type of design pattern comes under creational pattern as this pattern provides one of the best ways to create an object.

## Compatibility

![SPFx 1.4.1](https://img.shields.io/badge/SPFx-1.4.1-green.svg)
![Node.js v6 | v8](https://img.shields.io/badge/Node.js-LTS%206.x%20%7C%20v8-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Compatible SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Compatible-green.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)


## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)


## Prerequisites
 
> N/A

## Solution

Solution|Author(s)
--------|---------
react-designpatterns-typescript\builder | [Luis Valencia](https://github.com/levalencia) [@levalencia](https://www.twitter.com/levalencia)

## Version history

Version|Date|Comments
-------|----|--------
1.0|May 15, 2018|Initial release

## Builder pattern

A Builder class builds the final object step by step. This builder is independent of other objects.

For this pattern, we have taken an existing example https://www.tutorialspoint.com/design_pattern/builder_pattern.htm and translated it to Typescript.  Data Access implementation details are left to the reader.

The idea on this example is to show how you can build a Complex object from single objects, a Meal from (burger, fries, soda).  Suppose you have a SharePoint List for Burgers, another list for Sodas, another one for desserts, and you want to build different Meals (Menus), so this would be a perfect sample.

### UML
This is more or less the diagram of the classes were are coding below.

![](http://www.luisevalencia.com/content/images/2018/02/builder_pattern_uml_diagram.jpg/content/images/2018/02/builder_pattern_uml_diagram.jpg)


### Project structure
We have created a component with all the needed class, lets discuss them one by one.

![](http://www.luisevalencia.com/content/images/2018/02/builder_pattern_uml_diagram.jpg/content/images/2018/02/typescript.png)


### IItem.ts

This interface is the one that every item needs to implement to come with a common structure for all products.

```typescript
import IPacking from "./IPacking";

interface IItem {
    name(): string;
    packing(): IPacking;
    price(): number;
}

export default IItem;
```

### IPacking.ts

This interface is the one that all packaging will use, eg: Bottle, Wrapper, etc, its the way to define common behavior and properties for each product packing.

```typescript
interface IPacking {
    pack(): string;
}

export default IPacking;
```

### Bottle.ts
This is one type of packing, it implements the IPacking interface.

```typescript
import IPacking from "./IPacking";

class Bottle implements IPacking {
    public pack(): string {
       return "Bottle";
    }
}

export default Bottle;
```


### Wrapper.ts

```typescript
import IPacking from "./IPacking";

class Wrapper implements IPacking {
    public pack(): string {
       return "Wrapper";
    }
}

export default Wrapper;
```

### Burger.ts
This is an abstract class from which all our specific burgers need to implement, its there to have a common structure for name, packing and pricing.

```typescript
import IItem from "./IItem";
import Wrapper from "./Wrapper";
import IPacking from "./IPacking";

abstract class Burger implements IItem {
    public name(): string {
        throw new Error("Method not implemented.");
    }

    public packing(): IPacking {
        return new Wrapper();
    }

    public abstract price(): number ;

}

export default Burger;
```

### ChickenBurger.ts
```typescript
import Burger from "./Burger";

class ChickenBurger extends Burger {
    public price(): number {
        return 15;
    }

    public name(): string {
        return "Chicken Burger";
    }
}

export default ChickenBurger;

```

### VegBurger.ts
```typescript
import Burger from "./Burger";

class VegBurger extends Burger {
    public price(): number {
        return 11;
    }

    public name(): string {
        return "Veg Burger";
    }
}

export default VegBurger;

```
### Colddrink.ts
```typescript
import IItem from "./IItem";
import IPacking from "./IPacking";
import Bottle from "./Bottle";

abstract class ColdDrink implements IItem {
    public name(): string {
        throw new Error("Method not implemented.");
    }
    public packing(): IPacking {
        return new Bottle();
    }

    public abstract price(): number ;

}

export default ColdDrink;

```
### Coke.ts
```typescript
import ColdDrink from "./ColdDrink";

class Coke extends ColdDrink {
    public price(): number {
       return 2.5;
    }

    public name(): string {
        return "Coca Cola";
    }
}

export default Coke;


```
### Pepsi.ts
```typescript
import ColdDrink from "./ColdDrink";

class Pepsi extends ColdDrink {
    public price(): number {
       return 1.5;
    }

    public name(): string {
        return "Pepsi Cola";
    }
}

export default Pepsi;

```
### Meal.ts

This class will represent a full meal behavior, here we have the methods to add items to the Meal, get the cost and show the items belonging to the Meal.

```typescript
import IItem from "./IItem";

class Meal {
    private items: IItem[] = [];

    public addItem(item: IItem): void {
        this.items.push(item);
    }

    public getCost(): number {
        let cost: number  = 0;
        for(let item of this.items) {
            cost+= item.price();
        }

        return cost;
    }

    public showItems(): string {
        let returnStr: string = "";
        for(let item of this.items) {
            returnStr +="Item:" + item.name();
            returnStr +=", Packing:" + item.packing().pack();
            returnStr +=", Price: " + item.price();
        }

        returnStr += ", Total: " + this.getCost();
        return returnStr;
    }
}

export default Meal;
```

### MealBuilder.ts

Mealbuilder its just the class that uses the classes explained before to construct any type of meal, for sake of simplicity, we created only 2 meals here.

```typescript
import Meal from "./Meal";
import VegBurger from "./VegBurger";
import Coke from "./Coke";
import ChickenBurger from "./ChickenBurger";

class MealBuilder {
    public prepareVegMeal(): Meal {
        let meal: Meal= new Meal();
        meal.addItem(new VegBurger());
        meal.addItem(new Coke());
        return meal;
    }

    public prepareNonVegMeal(): Meal {
        let meal: Meal= new Meal();
        meal.addItem(new ChickenBurger());
        meal.addItem(new Coke());
        return meal;
    }
}

export default MealBuilder;
```

### IBuilderProps.ts
We created a selectedMeal string property to take the decision on which meal to build.

```typescript
export interface IBuilderProps {
  selectedMeal: string;
}

```

### Builder.tsx

This is our component class, here we have a constructor and in the constructor we call the setMeal method, with the selected meal option as a parameter, and then we can define which meal to prepare.  Once the meal is prepared, in the render method we can use the showItems method
```typescript
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



```

And finally
### BuilderWebPart.ts

Here what we do is just to use our component and sending the parameter of the selected meal, which is just a normal dropdown with 2 hardcoded values.


```typescript
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from "@microsoft/sp-webpart-base";


import * as strings from 'BuilderWebPartStrings';
import Builder from './components/Builder';
import { IBuilderProps } from './components/IBuilderProps';

export interface IBuilderWebPartProps {
  selectedMeal: string;
}

export default class BuilderWebPart extends BaseClientSideWebPart<IBuilderWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IBuilderProps > = React.createElement(
      Builder,
      {
       
        selectedMeal: this.properties.selectedMeal
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    this.properties[this.properties.selectedMeal] = newValue;
    this.render();   
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected get disableReactivePropertyChanges(): boolean { 
    return true; 
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration  {
    return {
      pages: [
        {
          header: {
            description: "Header"
          },
          groups: [
            {
              groupName: "Group",
              groupFields: [
                PropertyPaneDropdown("selectedMeal", {
                  label: "Select meal",
                  options: [
                    { key: "0", text: "Veg" },
                    { key: "1", text: "Nonveg" }
                  ],
                  selectedKey: 0
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

```

Data source implementation is left to the reader

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-designpatterns-typescript%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-designpatterns-typescript) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-designpatterns-typescript&template=bug-report.yml&sample=react-designpatterns-typescript&authors=@levalencia&title=react-designpatterns-typescript%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-designpatterns-typescript&template=question.yml&sample=react-designpatterns-typescript&authors=@levalencia&title=react-designpatterns-typescript%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-designpatterns-typescript&template=suggestion.yml&sample=react-designpatterns-typescript&authors=@levalencia&title=react-designpatterns-typescript%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-designpatterns-typescript/builder" />
