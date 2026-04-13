import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const DATE_INPUT_FORMATS = ['DD/MM/YYYY', 'D/M/YYYY', 'YYYY-MM-DD', 'MM/DD/YYYY'];
const DATE_DISPLAY_FORMAT = 'DD MMM YYYY';

export type PropertyKind = 'date' | 'number' | 'string';

export function classifyValue(key: string, value: unknown): PropertyKind {
  if (typeof value === 'number') return 'number';
  if (typeof value === 'string' && isDateLike(key, value)) return 'date';
  return 'string';
}

export function formatValue(key: string, value: unknown): string {
  const kind = classifyValue(key, value);
  if (kind === 'date' && typeof value === 'string') {
    const parsed = dayjs(value, DATE_INPUT_FORMATS, true);
    if (parsed.isValid()) return parsed.format(DATE_DISPLAY_FORMAT);
  }
  if (kind === 'number') return String(value);
  return value == null ? '' : String(value);
}

function isDateLike(key: string, value: string): boolean {
  if (!/date|time|day/i.test(key)) return false;
  return dayjs(value, DATE_INPUT_FORMATS, true).isValid();
}
