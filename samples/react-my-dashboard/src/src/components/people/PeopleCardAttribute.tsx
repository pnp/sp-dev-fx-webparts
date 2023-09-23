import * as React from 'react';

import {
  Badge,
  Caption1,
  mergeClasses,
} from '@fluentui/react-components';

import { IAttribute } from '../../models/IAttribute';
import { usePeopleStyles } from './usePeopleStyles';

export interface IPeopleAttributeProps {
  attribute: IAttribute;
}

export const PeopleCardAttribute: React.FunctionComponent<IPeopleAttributeProps> = (
  props: React.PropsWithChildren<IPeopleAttributeProps>
) => {
  const { attribute } = props;
  const { icon, attributeValue, attributelink } = attribute;

  const styles = usePeopleStyles();

  if (!attribute) {
    return null;
  }

  const renderValue = React.useMemo(() => {
    if (React.isValidElement(attribute.attributeValue)) {
      return attributeValue;
    }
    return (
      <div className={styles.cardTextSubject}>
        <Caption1 block truncate wrap={false}>
          {attributeValue}
        </Caption1>
      </div>
    );
  }, [attributeValue]);

  const renderValueWithIcon = React.useMemo(() => {
    if (icon) {
      return (
        <>
          {icon}
          {renderValue}
        </>
      );
    }
    return renderValue;
  }, [icon, renderValue]);

  const renderAttribute = React.useMemo(() => {
    if (icon) {
      return <>{renderValueWithIcon}</>;
    } else {
      return renderValue;
    }
  }, [attributelink, icon, renderValueWithIcon]);

  const onClickBadge = React.useCallback(
    (ev: React.MouseEvent<HTMLElement>) => {
      if (attributelink) {
        window.open(attributelink, "_blank");
      }
    },
    [attributelink]
  );

  return (
    <>
      <div className={styles.attributeContainer}>
        <Badge
          className={mergeClasses(styles.attributeBadge, attributelink ? styles.hover : "")}
          as="div"
          appearance="outline"
          size="large"
          onClick={onClickBadge}
        >
          <div className={mergeClasses(styles.attributeLabel)}>{renderAttribute}</div>
        </Badge>
      </div>
    </>
  );
};
