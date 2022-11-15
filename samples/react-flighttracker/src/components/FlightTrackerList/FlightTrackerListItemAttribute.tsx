import * as React from 'react';

import { useAtomValue } from 'jotai';
import {
  Icon,
  Text,
} from 'office-ui-fabric-react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

import { globalState } from '../../jotai/atoms';
import { IAttribute } from '../../models';
import { useFlightTrackerStyles } from './useFlightTrackerStyles';

export interface IFlightTrackerListItemAttributeProps {
  attribute: IAttribute;

}

export const FlightTrackerListItemAttribute: React.FunctionComponent<IFlightTrackerListItemAttributeProps> = (
  props: React.PropsWithChildren<IFlightTrackerListItemAttributeProps>
) => {
  const { attribute } = props;
  const appState = useAtomValue(globalState);
  const { controlStyles } = useFlightTrackerStyles();
  const { webpartContainerWidth } = appState;
  const [renderAttribute, setRenderAttribute] = React.useState<JSX.Element | null>(null);

  const renderSeparator = React.useMemo(() => {

    if (webpartContainerWidth && webpartContainerWidth <= 454) {
      return <div className={controlStyles.separator} />;
   }
    return null;
  }, [controlStyles.separator, webpartContainerWidth]);

  React.useEffect(() => {
    setRenderAttribute(null);

      setRenderAttribute(
        <Stack verticalAlign="center" tokens={{ childrenGap: 10 }}>
          <Text variant="smallPlus">{attribute.attributeName}</Text>
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
            {attribute?.iconProps ? <Icon {...attribute.iconProps} /> : null}
            {React.isValidElement(attribute.attributeValue) ? (
              attribute.attributeValue
            ) : (
              <Text variant="mediumPlus" styles={{ root: { fontWeight: 600 } }}>
                {attribute.attributeValue}
              </Text>
            )}
          </Stack>
          {renderSeparator}
        </Stack>
      );

  }, [attribute, renderSeparator]);

  if (!attribute) {
    return null;
  }

  return <>{renderAttribute}</>;
};
