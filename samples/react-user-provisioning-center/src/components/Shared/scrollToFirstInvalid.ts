export function scrollToFirstInvalidField(fromElement: Element | null): void {
  window.setTimeout(() => {
    const scope: ParentNode = fromElement?.closest('form') ?? document;
    const invalid = scope.querySelector<HTMLElement>('[aria-invalid="true"]');
    if (!invalid) {
      return;
    }
    invalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
    invalid.focus({ preventScroll: true });
  }, 0);
}
