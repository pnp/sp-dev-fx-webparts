import * as React from "react";
import { Stack, css } from "@fluentui/react";
import { ProductivityStudioLogo as strings } from "ComponentStrings";
const ProductivityStudioLogoImg = require('assets/onboarding/ProductivityStudioLogo.png');

import styles from './ProductivityStudioLogo.module.scss';

export interface IProductivityStudioLogoProps {
    className?: string;
}

export const ProductivityStudioLogo: React.SFC<IProductivityStudioLogoProps> = (props: IProductivityStudioLogoProps) => {
    return (   
        <p className={css(styles.productivityStudioLogo, props.className)}>
            
            {<span> Created by the  </span>}
            <a tabIndex={0} href="mailto:ProdStudioHarvesting@microsoft.com">
                {strings.Command_ProductivityLogoLink}
            </a>
            <a tabIndex={0} href="mailto:ProdStudioHarvesting@microsoft.com">
                <img src={ProductivityStudioLogoImg} alt="Productivity Studio Logo" width={16} />
            </a>
        
        </p>
     
    );
};