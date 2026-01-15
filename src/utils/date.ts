export const formatDateEt = (value: string | Date) => {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return new Intl.DateTimeFormat("et-EE", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date);
};
