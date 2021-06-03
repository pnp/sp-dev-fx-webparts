export function pdfCellFormatter(value: any, type: string) {
  if (!value) {
    return value;
  }
  switch (type) {
    case 'SP.FieldUrl':
      let { children: text, href: link } = value.props;
      value = { text, link, color: 'blue' };
      break;
    case 'SP.FieldUser':
      value = value.props.displayName;
      break;
    default:
      break;
  }
  return value;
}

