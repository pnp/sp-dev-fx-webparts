import * as React from 'react';

import { IColorsProps } from './IColorsProps';


export const Colors: React.FC<IColorsProps> = (props) => {

    React.useEffect(() => {

        console.log("obj in colors", props.colorObject);

    },[]);

    return (
        <div>
            <div>:root &#123;</div>
        {
               Object.keys(props.colorObject).map((key) => {
                return (
                    <div style={{backgroundColor: props.colorObject[key]}} ><code style={{color:props.fontColor}}>{`${key}: ${props.colorObject[key]}`};</code></div>
                );

               }) 
            }

            <div>&#125;</div>

        </div>
    );
};