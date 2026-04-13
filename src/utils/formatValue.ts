import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const DATE_INPUT_FORMATS = ['DD/MM/YYYY', 'D/M/YYYY', 'YYYY-MM-DD', 'MM/DD/YYYY'];
const DATE_DISPLAY_FORMAT = 'DD MMM YYYY';

export function formatValue(key: string, value: unknown): string {
  if (typeof value === 'string' && isDateLike(key, value)) {
    const parsed = dayjs(value, DATE_INPUT_FORMATS, true);
    if (parsed.isValid()) return parsed.format(DATE_DISPLAY_FORMAT);
  }
  return value == null ? '' : String(value);
}

function isDateLike(key: string, value: string): boolean {
  if (!/date|time|day/i.test(key)) return false;
  return dayjs(value, DATE_INPUT_FORMATS, true).isValid();
}
