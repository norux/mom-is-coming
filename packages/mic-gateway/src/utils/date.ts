import { format } from 'date-fns';

export function getDate(timestamp) {
  return format(new Date(timestamp), 'yyyy-MM-dd');
}
