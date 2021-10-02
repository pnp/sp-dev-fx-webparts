export function csvCellFormatter(value: any, type: string) {
  if (!value) {
    return value;
  }
  switch (type) {
    case 'SP.FieldUrl':
      value = value.props.children;
      break;
    case 'SP.FieldUser':
      value = value.props.displayName;
      break;
    default:
      break;
  }
  return value;
}

