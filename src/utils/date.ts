import {format} from "date-fns";
import {fr} from "date-fns/locale/fr";

/**
 * Output: 'mercredi 9 octobre 2024'
 * @param date
 */
export const getHumanReadableDate = (date: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return format(new Date(date), 'EEEE d MMMM yyyy', { locale: fr });
}

/**
 * Output: '09/10/2024'
 * @param date
 */
export const getShortHumanReadableDate = (date: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return format(new Date(date), 'P', { locale: fr });
}

/**
 * Output: '2024'
 * @param date
 */
export const getDateOnly = (date: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return format(new Date(date), 'yyyy');
}