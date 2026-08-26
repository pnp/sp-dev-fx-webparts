export const formatString = (template: string, ...values: ReadonlyArray<string | number>): string => {
  return values.reduce<string>(
    (result, value, index) => result.split(`{${index.toString()}}`).join(String(value)),
    template
  );
};
