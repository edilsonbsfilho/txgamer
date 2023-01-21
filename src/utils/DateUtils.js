import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export const formatDateISO = (date, pattern) => {
    if (date !== null) {
        return format(parseISO(date), pattern)
    } else {
        return ""
    }
}