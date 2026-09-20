import { makeStyles, tokens } from '@fluentui/react-components';

export const useBooleanCellStyles = makeStyles({
  truthy: { color: tokens.colorPaletteGreenForeground1, display: 'inline-flex', alignItems: 'center' },
  falsy: { color: tokens.colorPaletteRedForeground1, display: 'inline-flex', alignItems: 'center' }
});
