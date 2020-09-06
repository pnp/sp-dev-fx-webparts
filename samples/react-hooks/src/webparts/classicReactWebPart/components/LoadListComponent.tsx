import * as React from 'react';
import { sp } from "@pnp/sp";
import { Environment,EnvironmentType} from '@microsoft/sp-core-library';

export interface ILoadListComponentProps{

}
export interface ILoadListComponentState {
filter:string;
avengerCollection:any[];
}
export default class LoadListComponent extends React.Component<ILoadListComponentProps, ILoadListComponentState> {
    public constructor(props: any) {
        super(props);
        this.setFilter=this.setFilter.bind(this);
        this.state={
            filter:'',
            avengerCollection:[]
        };
    }

    public  loadAvengers (filter:string){
        if (Environment.type==EnvironmentType.Local)
        {
      return fetch(`https://jsonplaceholder.typicode.com/users?name_like=${filter}`)
        .then(response => response.json())
        .then(json => this.setAvengerCollection(json));
        }
        else
        {
            if (filter=="")
            {
           sp.web.lists.getByTitle("AvengersList").items.select('Title', 'Id').get().then((items) => {
              let result:any[]=[];
              items.forEach(element => {result.push({"id":element["Id"], "name":element["Title"]
                     });
              });
             
              return result;
          }).then(json => this.setAvengerCollection(json));;
      }
      else{
        sp.web.lists.getByTitle("AvengersList").items.select('Title', 'Id').filter("substringof('" + filter + "',Title)")
          .get().then((items) => {
              let result:any[]=[];
              items.forEach(element => {
                                   result.push({
                                                "id":element["Id"],
                                                "name":element["Title"]
                                                });
                                        }); 
              return result;
          }).then(json => this.setAvengerCollection(json));
      }
      }
    }

    public componentWillMount(){
        this.loadAvengers(this.state.filter);
    }

    public componentDidUpdate(prevProps, prevState) {
        if (prevState.filter!==this.state.filter){
            this.loadAvengers(prevState.filter);
        }
    }

    private setAvengerCollection(json:any)
    {
        this.setState({
             filter: json
        });
    }
    private  setFilter(event: any) {
        this.setState({
            filter: event.target.value
        });
    }

    public render() {    
      return  <div>
      <input value={this.state.filter} onChange={this.setFilter} />
      <ul>
        {this.state.avengerCollection.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </div>;
    }
}