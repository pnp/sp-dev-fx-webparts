export function toLocaleDateString(date: Date | null): string {
    if (!date) {
        return '';
    }    
    const defaultOptions: Intl.DateTimeFormatOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour12: false };

    return date.toLocaleString("en-GB", defaultOptions);
}

export function parseDateSafely(dateString:string) {
    try {
      return new Date(dateString);
    } catch (error) {
      return null;
    }
  }


