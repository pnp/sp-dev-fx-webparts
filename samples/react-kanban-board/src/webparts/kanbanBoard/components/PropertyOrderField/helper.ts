export const setPropertyValue = (properties: any, targetProperty: string, value: any): void => { // eslint-disable-line @typescript-eslint/no-explicit-any
    if (!properties) {
      return;
    }
    if (targetProperty.indexOf('.') === -1) { // simple prop
      properties[targetProperty] = value;
    }
    else {
        throw new Error('Nested properties are not supported');
     // .set(properties, targetProperty, value);
    }
  };