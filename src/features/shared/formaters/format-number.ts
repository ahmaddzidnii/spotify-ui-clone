export const formatNumber = (value: number, locale = "en-US") => new Intl.NumberFormat(locale).format(value);
