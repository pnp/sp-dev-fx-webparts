import * as React from 'react';
import {  EnvironmentType} from '@microsoft/sp-core-library';
import { sp } from "@pnp/sp";
 export const useAvengerCollection = (type:EnvironmentType) => {
      const [filter, setFilter] = React.useState("");
      const [avengerCollection, setAvengerCollection] = React.useState([]);  
      const loadAvengers = () => {
          if (type==EnvironmentType.Local)
          {
        fetch(`https://jsonplaceholder.typicode.com/users?name_like=${filter}`)
          .then(response => response.json())
          .then(json => setAvengerCollection(json));
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
            })
            .then(json => setAvengerCollection(json));
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
            })
            .then(json => setAvengerCollection(json));
        }
        }
    };
      return {avengerCollection, loadAvengers, filter,setFilter, setAvengerCollection};
     };
    