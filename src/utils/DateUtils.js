import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export const formatDateISO = (date, pattern) => {
    return date !== null ? format(parseISO(date), pattern) : "";
}