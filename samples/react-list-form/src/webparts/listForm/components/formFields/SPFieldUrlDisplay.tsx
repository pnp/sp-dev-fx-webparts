import * as React from 'react';
import { ISPFormFieldProps } from './SPFormField';
import { Link } from 'office-ui-fabric-react/lib/Link';

const SPFieldUrlDisplay: React.SFC<ISPFormFieldProps> = (props) => {
    if (props.value) {
        if (props.fieldSchema.DisplayFormat === 1) { // picture field
            return <div><img src={props.value} title={(props.extraData) ? props.extraData.desc : ''}></img></div>;
        } else {
            return <div><Link target='_blank' href={props.value}>{(props.extraData && props.extraData.desc)
                ? props.extraData.desc : props.value}</Link></div>;
        }
    } else {
        return <div></div>;
    }
};

export default SPFieldUrlDisplay;
