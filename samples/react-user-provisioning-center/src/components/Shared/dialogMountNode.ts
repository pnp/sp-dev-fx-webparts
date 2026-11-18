export function getDialogMountNode(): HTMLElement | undefined {
  if (typeof document === 'undefined') {
    return undefined;
  }
  return (document.getElementById('upc-dialog-root') as HTMLElement | null) ?? document.body;
}
