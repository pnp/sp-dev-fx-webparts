import * as React from 'react';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import { Icon, IIconStyles } from 'office-ui-fabric-react/lib/Icon';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import styles from './PropertyMapping.module.scss';
import { IPropertyMappings } from '../../../../Common/IModel';

const iconStyles: IIconStyles = {
	root: {
		fontSize: '24px',
		height: '24px',
		width: '24px'
	}
};

export interface IPropertyMappingItemProps {
	items: IPropertyMappings[];
	onEnableOrDisableProperty: (item: IPropertyMappings, checked: boolean) => void;
}

export default class PropertyMappingItem extends React.Component<IPropertyMappingItemProps, {}> {
	constructor(props: IPropertyMappingItemProps) {
		super(props);
	}

	public render(): JSX.Element {
		const { items } = this.props;
		return (
			<>
				{items.map((item: IPropertyMappings) => {
					return (
						<div className={styles.mappingcontainer} data-is-focusable={true}>
							<div className={styles.propertydiv}>{item.AzProperty}</div>
							<Separator className={styles.separator}>
								<Icon iconName="DoubleChevronRight8" styles={iconStyles} />
							</Separator>
							<div className={styles.propertydiv}>{item.SPProperty}</div>
							<div className={styles.togglediv}>
								<Toggle label="" checked={item.IsIncluded} onChange={(e, checked) => { this.props.onEnableOrDisableProperty(item, checked); }} />
							</div>
						</div>
					);
				})}
			</>
		);
	}
}