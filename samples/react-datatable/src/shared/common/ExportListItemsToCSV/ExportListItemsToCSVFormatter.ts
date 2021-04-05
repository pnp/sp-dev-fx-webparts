export function csvCellFormatter(value: any, type: string) {
    if (!value) {
      return value;
    }
    switch (type) {
      case 'SP.FieldUrl':
        value = value.props.children;
        break;
      default:
        break;
    }
    return value;
  }

