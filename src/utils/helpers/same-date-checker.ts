import { isSameDay, isSameYear, isSameMonth } from 'date-fns';

export const isSameDate = (end: Date, start: Date): boolean => {
    const sameDate = isSameDay(start, end) && isSameMonth(start, end) && isSameYear(start, end);
    return sameDate;
};
