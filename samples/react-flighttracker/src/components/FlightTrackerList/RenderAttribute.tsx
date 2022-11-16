import * as React from "react";
import { Text } from "office-ui-fabric-react";
export interface IRenderAttributeProps {}

export const RenderAttribute: React.FunctionComponent<IRenderAttributeProps> = (
  props: React.PropsWithChildren<IRenderAttributeProps>
) => {
  const { children } = props;
  const childrens = React.Children.toArray(children);
  return (
    <>
      {childrens.map((child) => {
        return React.isValidElement(child) ? child : <Text>{child}</Text>;
      })}
    </>
  );
};
