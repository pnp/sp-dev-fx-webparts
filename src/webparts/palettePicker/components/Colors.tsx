import * as React from 'react';

import { IColorsProps } from './IColorsProps';


export const Colors: React.FC<IColorsProps> = (props) => {

    return (
        <div>
        {
               Object.keys(props.colorObject).map((key) => {
                return (
                    <div style={{backgroundColor: props.colorObject[key]}} ><code>{`${key}: ${props.colorObject[key]}`};</code></div>
                )

               }) 
            }

        </div>
    );
};